import { useFont } from '@shopify/react-native-skia';
import * as React from 'react'
import { View } from "react-native"
import { CartesianChart, Bar } from "victory-native"
import { format } from 'date-fns'

export default function Reports() {

    const font = useFont(require("../../assets/fonts/Open_Sans/static/OpenSans_Condensed-Regular.ttf")) 

    const DATA = [
        { day: new Date("2024-11-01").getTime(), price: 200 },
        { day: new Date("2024-11-02").getTime(), price: 700 },
        { day: new Date("2024-11-03").getTime(), price: 600 },
        { day: new Date("2024-11-04").getTime(), price: 200 },
        { day: new Date("2024-11-05").getTime(), price: 900 },
        { day: new Date("2024-11-06").getTime(), price: 20 }
    ];

    return (
        <View style={{ height: 300 }}>
            <CartesianChart
                data={DATA}
                xKey="day"
                yKeys={["price"]}
                // xAxis={{ 
                //     labelColor: "#000000", 
                //     lineColor: "black" 
                // }}
                // labels={() => ["This is a", "multi-line", "label"]}

                axisOptions={{
                    tickCount: 5,
                    font: font,
                    labelOffset: {x: 2, y: 2},
                    labelPosition: 'outset',
                    formatYLabel: (value) => `${value}`,
                    formatXLabel: (value) => format(new Date(), "dd/MM/yy")
                }}
            >
                {({ points, chartBounds }) => (
                    <Bar 
                        points={points.price} 
                        chartBounds={chartBounds}
                        color="red"
                        
                    />
                )}
            </CartesianChart>
        </View>
    )
}