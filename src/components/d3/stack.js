// 直方图   给定系列数据 按x 组合

export default class StackChart {
    constructor(svg, data, getX = d => d.x, getY = d => d.y, height = 400, width = 400, margin = { left: 25, top: 10, right: 10, bottom: 25 }) {
        this.svg = svg;
        this.margin = margin
        this.data = data;

        let bins = d3.histogram()./**分组依据 */value(d => d.x)(data)



        let v0 = getX(data[0])
        let t = typeof v0
        if (t == "number") {
            this.x = d3.scaleLinear(data).domain([d3.min(data, getX), d3.max(data, getX)]).nice()
                .range([margin.left, width - margin.right])
        }
        else if (/\d{4}/.test(v0)) {
            this.x = d3.scaleTime(data).domain(d3.extent(data, d => getX(d))).nice().range([margin.left, width - margin.right])
        }
        else {
            this.x = d3.scaleIdentity(data).domain(d3.extent(data, d => getX(d))).nice().range([margin.left, width - margin.right])
        }

        this.y = d3.scaleLinear(data).domain([d3.min(data, getY), d3.max(data, getY)]).nice()
            .range([height - margin.bottom, margin.top])



        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .attr("fill", "steelblue")
            .selectAll("rect")
            .data(bins)
            .enter().append("rect")
            .attr("x", d => this.x(d.x0) + 1)
            .attr("width", d => Math.max(0, this.x(d.x1) - this.x(d.x0) - 1))
            .attr("y", d => (d.length ? this.y(d[0].y) : 0))
            .attr("height", d => d.length ? (this.y(0) - this.y(d[0].y)) : 0);


        svg.append('g').call((g) => {
            this.drawX(g, width / 80, margin, width, height)
        })

        svg.append('g').call((g) => {
            this.drawY(g, height / 80, margin, width, height)
        })

        this.color = d3.scaleOrdinal()
            .unknown("#ccc")
            .domain(data.map(d => d.x))
            .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())

        // this.area = d3.area()
        //     .curve(d3.curveStep)
        //     .x(d => this.x(d.x))
        //     .y0(d => this.y(d.y))
        //     .y1(d => this.y(d.y))

        this.drawLegend(svg)



        svg.node();
    }

    drawX(g, ticks, margin, width, height) {
        g.attr("transform", `translate(${margin.left},${height - margin.bottom})`)
            .call(d3.axisBottom(this.x).tickSizeOuter(0))
            .call(g => {
                g.append("text")
                    .attr("x", width - margin.right)
                    .attr("y", -4)
                    .attr("fill", "#000")
                    .attr("font-weight", "bold")
                    .attr("text-anchor", "end")
                    .text('年份')
            })
        // .call(g => g.selectAll(".domain").remove())
    }

    drawY(g, ticks, margin, width, height) {
        g.attr("transform", `translate(${margin.left * 2},0)`)
            .call(d3.axisLeft(this.y).tickSizeOuter(0))
            .call(g => g.selectAll(".domain").remove())
            .call(g => {
                g.append("text")
                    .attr("x", 4)
                    .attr("fill", "#000")
                    .attr("font-weight", "bold")
                    .attr("text-anchor", "start")
                    .text('y值')
            })
        // .text('Y值')
    }

    drawLegend(svg) {
        svg
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(this.data.map(d => d.x).reverse())
            .enter().append("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`)
            .call(g => {
                g.append("rect")
                    .attr("x", -19)
                    .attr("width", 19)
                    .attr("height", 19)
                    .attr("fill", this.color);

                g.append("text")
                    .attr("x", -24)
                    .attr("y", 9.5)
                    .attr("dy", "0.35em")
                    .text(d => d.y);
            })


    }
}