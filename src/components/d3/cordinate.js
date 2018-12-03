class Cordiate {
    constructor(svg, data, height = 400, width = 400, margin = { left: 10, top: 10, right: 10, bottom: 10 }) {
        this.svg = svg;
        this.margin = margin
        this.data = data;

        this.x=d3.

        d3.append('g').call((g) => {
            this.drawX(g, height - margin.bottom)
        })

        d3.append('g').call(() => {
            this.drawY(g)
        })
    }

    drawAxis(g, transY) {
        g.attr("transform", `translate(0,${transY})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    }

    drawX(g, maxXValue, minXValue, maxXLength, dis) {

    }

    drawY() {

    }
}