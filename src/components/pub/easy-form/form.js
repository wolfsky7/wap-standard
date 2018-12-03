/**
* 对antd form 的简单封装  直接把 table 的columns 拿来用
*  <>-----}|------------------------------->
* 
*/
import * as React from 'react'
import * as PropTypes from 'prop-types'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Validator from 'async-validator'
import { on, fireDelay } from '../../../libs/tools/notify'



const FormItem = Form.Item;

const _formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const getInitialValues = (fields) => {
    return fields.reduce((last, now) => {
        if (now.dataIndex) {
            last[now.dataIndex] = (now._fieldProps || {}).defaultValue;
        }
        return last;
    }, {})
}



class EasyForm extends React.PureComponent {
    static defaultProps = {
        fields: PropTypes.array.isRequired,
        showChange: false,
    }

    static getDerivedStateFromProps(nextProps, preState) {
        if (preState.lastFields != nextProps.fields) {
            return {
                fields: preState.formatFields(nextProps.fields),
                value: getInitialValues(nextProps.fields),
                dirty: {}
            };
        }

        return null
    }

    constructor(props) {
        super();
        this.state = {
            dirty: {

            },
            value: getInitialValues(props.fields),
            error: {

            },
            lastFields: props.fields,
            fields: this.formatFields(props.fields),
            formatFields: this.formatFields,
            getInitialValues: this.getInitialValues
        }
    }

    componentDidMount() {
        let id = Date.now() + '-' + parseInt(Math.random() * 1000)
        this.unChange = on(id, () => {
            let dirty = this.state.dirty;
            this.validator.validate(this.state.dirty, (errors, fields) => {
                if (errors && errors.length) {
                    let errs = {};
                    Object.keys(fields).forEach(k => {
                        if (k in dirty)
                            errs[k] = fields[k][0].message;
                    })

                    this.setState({
                        error: errs
                    })
                }
                else {
                    this.setState({
                        error: null
                    })
                }
            })
        })

        this.id = id;
    }

    componentWillUnmount() {
        this.unChange();
    }

    formatFields = (fields) => {
        let rules = fields.reduce((last, now) => {
            if (now.dataIndex && now.rules) {
                last[now.dataIndex] = now.rules
            }
            return last;
        }, {})
        this.validator = new Validator(rules)
        return fields.map(item => {
            let { _fieldProps = {}, ...others } = item;
            let { ...fs } = _fieldProps;
            let onChange = _fieldProps.onChange;
            fs.onChange = this.onChange(item)
            return {
                ...others,
                _fieldProps: fs
            }
        });
    }



    getFieldValue(field, ...args) {
        if (field.getValue) {
            return field.getValue()
        }
        let type = field.type || 'input'
        switch (type) {
            case "datePicker":
            case "timePicker": {
                // date datestring
                return args[1]
            }
            case "input":
            case "radio":
            case "checkbox": {
                let target = args[0].target;
                if (!target) {
                    return args[0];
                }
                if (target.type == "checkbox") return target.checked;
                return target.value
            }
            default: {
                return args[0]
            }
        }
    }

    getFields() {
        return Object.assign(this.state.value, this.state.dirty);
    }
    commit() {
        let nv = this.getFields();

        this.setState({
            value: nv
        })
    }

    onChange = (field) => {
        return (...args) => {
            let v = this.getFieldValue(field, ...args)
            this.state.dirty[field.dataIndex] = v;
            this.setState({
                dirty: { ...this.state.dirty }
            })

            fireDelay(this.id, 250)
        }
    }

    renderInput(field) {
        let { type = "input", title, _formItem, render, _fieldProps = {} } = field || {};

        let passed = {
            ..._fieldProps,
            name: field.dataIndex,
        }

        if (render) {
            return render(passed, field)
        }
        if (cachedRenders[type]) {
            return cachedRenders[type](passed, field)
        }

        return <Input {...passed}></Input>
    }

    renderFields(fields) {
        const { dirty, error } = this.state;
        const { showChange, labelCol = _formItemLayout.labelCol, wrapperCol = _formItemLayout.wrapperCol } = this.props
        return fields.map((item, index) => {
            const { _formItem = {}, title = "" } = item
            let fPs = { validateStatus: '', help: '', label: title }
            if (error && error[item.dataIndex]) {
                fPs.validateStatus = "error"
                fPs.help = error[item.dataIndex]
            }
            if (showChange && !fPs.validateStatus && item.dataIndex in dirty) {
                fPs.validateStatus = "warning"
            }
            if (!title) {
                fPs.colon = false
                fPs.label = " ";
            }

            return <FormItem labelCol={labelCol} wrapperCol={wrapperCol}  {...fPs} {..._formItem} key={item.key || item.dataIndex || ('f-' + index)}>
                {this.renderInput(item)}
            </FormItem>

        })
    }

    render() {
        let { children, showChange, fields, ...others } = this.props;
        return <Form  {...others}>
            {
                this.renderFields(this.state.fields)
            }
            {children}
        </Form>
    }
}

export default EasyForm;

const cachedRenders = {}
export const registerFormItem = (type, render) => {
    cachedRenders[type] = render
}