import Plot from 'react-plotly.js';
import React from 'react';

const ItemPlotly = (props) => {
    return (
        <>
            <div id="plot_div">
                <Plot
                    data={props.data} layout={props.layout}
                />
            </div>
        </>
    )
}
export default ItemPlotly
