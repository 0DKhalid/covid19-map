import * as am4maps from '@amcharts/amcharts4/maps';

export class MapData {
  constructor(polygonSeries, measelsSeries) {
    this.polygonSeries = polygonSeries;
    this.measelsSeries = measelsSeries;
  }

  _numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  mapDataToMap(data) {
    this.polygonSeries.events.on('inited', () => {
      this.polygonSeries.mapPolygons.each((mapPolygon) => {
        let cases = data[mapPolygon.id];

        if (cases?.confirmed > 0) {
          let polygon = this.measelsSeries.mapPolygons.create();
          polygon.multiPolygon = am4maps.getCircle(
            mapPolygon.visualLongitude,
            mapPolygon.visualLatitude,
            Math.max(0.2, (Math.log(cases.confirmed) * Math.LN10) / 10)
          );
          polygon.tooltipText = `${mapPolygon.dataItem.dataContext.name}: 
             الحالات المُسجلة : ${this._numberWithCommas(cases.confirmed)}
             حالات التعافي : ${this._numberWithCommas(cases.recovered)}
             حالات الوفاة : ${this._numberWithCommas(cases.deaths)}
            `;
          mapPolygon.dummyData = polygon;
          polygon.events.on('over', function () {
            mapPolygon.isHover = true;
          });
          polygon.events.on('out', function () {
            mapPolygon.isHover = false;
          });
        } else {
          mapPolygon.tooltipText =
            mapPolygon.dataItem.dataContext.name + ': لا توجد بيانات مٌسجلة';
          mapPolygon.fillOpacity = 0.9;
        }
      });
    });
  }
}
