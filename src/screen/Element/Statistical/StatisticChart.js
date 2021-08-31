// import React from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   processColor,
//   ScrollView,
// } from 'react-native';
// import {BarChart} from 'react-native-charts-wrapper';
// class StatisticChart extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       legend: {
//         enabled: true,
//         textSize: 10,
//         form: 'SQUARE',
//         formSize: 10,
//         xEntrySpace: 20,
//         yEntrySpace: 5,
//         wordWrapEnabled: true,
//       },
//       data: {
//         dataSets: [
//           {
//             values: [40, 40, 40, 40, 20,12],
//             label: 'Doanh thu dự kiến',
//             config: {
//               drawValues: false,
//               colors: [processColor('red')],
//             },
//           },
//           {
//             values: [50, 50, 50, 50, 60,34],
//             label: 'Số lượng',
//             config: {
//               drawValues: false,
//               colors: [processColor('blue')],
//             },
//           },
//           // {
//           //   values: [10, 10, 10, 10, 20],
//           //   label: 'Doanh thu về',
//           //   config: {
//           //     drawValues: false,
//           //     colors: [processColor('green')],
//           //   },
//           // },
//         ],
//         config: {
//           barWidth: 0.3,
//           group: {
//             fromX: 0,
//             groupSpace: 0,
//             barSpace: 0.2,
//           },
//         },
//       },
//       xAxis: {
//         valueFormatter: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
//         granularityEnabled: true,
//         granularity: 1,
//         axisMaximum: 7,
//         axisMinimum: 0,
//         centerAxisLabels: true,
//       },

//       marker: {
//         enabled: true,
//         markerColor: processColor('#9EF72B8C'),
//         textColor: processColor('red'),
//         markerFontSize: 20,
//       },
//     };
//   }

//   componentDidMount() {
//     this.setState({
//       ...this.state,
//       highlights: [
//         {x: 1, y: 40},
//         {x: 2, y: 50},
//       ],
//     });
//   }

//   handleSelect(event) {
//     let entry = event.nativeEvent;
//     if (entry == null) {
//       this.setState({...this.state, selectedEntry: null});
//     } else {
//       this.setState({...this.state, selectedEntry: JSON.stringify(entry)});
//     }

//     console.log(event.nativeEvent);
//   }

//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <View style={{height: 80}}>
//           <Text> selected entry</Text>
//           <Text> {this.state.selectedEntry}</Text>
//         </View>

//         <View style={styles.container}>
//           <BarChart
//             style={styles.chart}
//             xAxis={this.state.xAxis}
//             data={this.state.data}
//             legend={this.state.legend}
//             drawValueAboveBar={false}
//             onSelect={this.handleSelect.bind(this)}
//             onChange={event => console.log(event.nativeEvent)}
//             highlights={this.state.highlights}
//             marker={this.state.marker}
//           />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },
//   chart: {
//     flex: 1,
//   },
// });
// export default StatisticChart;
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {ToastAndroidShort} from '../../../component/ToastAndroid';
export default function StatisticChart() {
  const [netState, setNetState] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      return setNetState(state.isConnected);
    });
  }, []);

  return (
    <View>
      <Text>Hello{netState.toString()}</Text>
      <Button title="xin chao"></Button>
    </View>
  );
}

const styles = StyleSheet.create({});
