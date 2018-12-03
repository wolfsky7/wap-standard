import { registerFormItem } from './form'

import fetchable from '../able/fetchable';
import Input from 'antd/lib/input'
import Mention from 'antd/lib/mention'
import Rate from 'antd/lib/rate'
import Radio from 'antd/lib/radio'
import Switch from 'antd/lib/switch'
import Select from 'antd/lib/select'
import TreeSelect from 'antd/lib/tree-select'
import Transfer from 'antd/lib/transfer'
import TimePicker from 'antd/lib/time-picker'
// import Upload from 'antd/lib/upload'
import Upload from './upload'
import Slider from 'antd/lib/slider'
import DatePicker from 'antd/lib/date-picker'
import Checkbox from 'antd/lib/checkbox'
import Button from 'antd/lib/button'

const easyAdd = ({ dataIndex, children, ...others }, El) => {
    return <El {...others}>{children}</El>
}

registerFormItem('input', (args) => easyAdd(args, Input))
registerFormItem('mention', (args) => easyAdd(args, Mention))
registerFormItem('rate', (args) => easyAdd(args, Rate))
registerFormItem('radio', (args) => easyAdd(args, Radio))
registerFormItem('switch', (args) => easyAdd(args, Switch))

const Option = Select.Option;
registerFormItem('select', ({ dataIndex, ...others }, { data, api, children }) => {
    if (children)
        return <Select {...others}>{children}</Select>
    if (data) {
        return <Select {...others}>
            {
                data.map(item => {
                    return <Option key={item.value} value={item.value}>{item.text}</Option>
                })
            }
        </Select>
    }
    if (api) {
        return fetchable(api, data => {
            return <Select {...others}>
                {
                    (data || []).map((item, index) => {
                        return <Option key={item.text} value={item.value}>{item.text}</Option>
                    })
                }
            </Select>
        })
    }
})

registerFormItem('treeSelect', (args) => easyAdd(args, TreeSelect))
registerFormItem('transfer', (args) => easyAdd(args, Transfer))
registerFormItem('timePicker', (args) => easyAdd(args, TimePicker))
registerFormItem('upload', (args) => easyAdd(args, Upload))
registerFormItem('slider', (args) => easyAdd(args, Slider))
registerFormItem('datePicker', (args) => easyAdd(args, DatePicker))
registerFormItem('checkbox', (args) => easyAdd(args, Checkbox))


registerFormItem('button', ({ name, children, ...others }, { text, handler }) => {

    return <Button onClick={handler} {...others}>
        {children || text || '保存'}
    </Button>
})