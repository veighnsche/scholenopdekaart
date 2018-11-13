import React, { Component } from 'react'
import { connect } from 'react-redux'

import { checkPoindAvailability } from '../../utilities'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more'

HighchartsMore(Highcharts)

class Eindtoets extends Component {

  // constructor(props) {
  //   super(props)
  //   this.props = props
  //
  // }

  render() {

    const { available, unavailable } = checkPoindAvailability(this.props.selectedSchools, 'eindtoets')
    // console.log({ available, unavailable })
    const schools = available.map(school => school.eindtoets.rapport.versie1.datasetEindtoets.rij)

    const options = {
      chart: {
        zoomType: 'xy',
      },
      xAxis: [{
        categories: available.map(school => school.school.N),
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        title: {
          text: 'Eindtoets',
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
      }],

      tooltip: {
        shared: true,
      },

      series: [{
        name: 'eindtoets',
        type: 'line',
        lineWidth: 0,
        data: schools.map(school => school.score),
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f}°C</b> ',
        },
      }, {
        name: 'ondergrens',
        type: 'errorbar',
        data: schools.map(school => [school.ondergrensVergelijking, school.ondergrensVergelijking]),
        tooltip: {
          pointFormat: '(error range: {point.low}-{point.high}°C)<br/>',
        },
      }],
    }

    return <HighchartsReact highcharts={Highcharts} options={options}/>
  }
}

const mapStateToProps = ({ selectedSchools }) => ({ selectedSchools })

export default connect(mapStateToProps)(Eindtoets)