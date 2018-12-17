# NgxOlTest

## 如何使用openlayer js package制作一个简单的地图

```js
var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
  });
```

使用上述代码可以使用OSM层创造一个地图对象，地图中心点为非洲东海岸，放大地图四倍

```js
 var map = new ol.Map({ ... });
```

上述代码创建了一个OpenLayers地图对象，但是该对象并不能显示地图或其他因为图层和交互尚未加入其中

```js
   target: 'map'
```

为了将地图对象绑定到div上，地图对象接受一个target属性作为参数，其值为<div>的id值

```js
 layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ]
```

`layers: [ ... ]`数组用于定义地图中可用的图层组，上述代码中只包含一个瓦片图层

OpenLayers中的图层使用包含源的类型（图像，瓦片或向量）定义。源是用于获取地图图块的协议。

```js
  view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
```

map也包含view属性，用于指定地图的中心，分辨率和旋转等特殊属性。定义视图最简配置是定义中心点和缩放级别。

值得注意的是指定的中心位于经/纬坐标（EPSG：4326），由于使用的唯一图层是球形墨卡托投影（EPSG：3857），我们可以动态重新投影它们，以便能够在正确的坐标上缩放地图
