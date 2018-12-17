# NgxOlTest

OpenLayer Angular version, currently not supporting < IE9 and Android 4.x 

## OpenLayer是什么

OpenLayers可以轻松地将动态地图放在任何网页中。它可以显示从任何来源加载的地图瓦片图层，矢量数据和标记。

### 支持瓦片层

OpenLayer 可以以从OSM，Bing，MapBox，Stamen以及可以找到的任何其他地图源中获取瓦片数据(前提是配合得当)。Open Layer还支持OGC映射服务和未经处理的层

### 支持矢量图层

OpenLayer支持利用GeoJSON，TopoJSON，KML，GML，Mapbox矢量瓦片和其他格式渲染矢量数据

### 高效且移动适配

OpenLayer利用Canvas 2D，WebGL以及HTML5的新特性进行地图渲染且移动端支持开箱即用。

### 易于定制和扩展

OpenLayer使用直接CSS为地图控件设置样式允许挂钩到不同级别的API或使用第三方库来定制和扩展功能

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

## 基本概念

### 地图

- OpenLayers的核心组件是地图，地图被渲染到目标容器中（比如网页上包含地图的div元素）
- 所有地图属性都可以在通过属性配置在构造时配置，或者使用setter方法配置如`setTarget()`函数

> 下面的HTML可用于创建包含地图的<div>

```html
<div id="map" style="width: 100%, height: 400px"></div>
```

> 下述的js脚本使用元素的map id作为选择器以在上面的<div>中构造地图

```js
import Map from 'ol/Map';

var map = new Map({target: 'map'});
```

### 视图

地图本身不对中心，缩放级别和地图投影等内容负责，这些是View实例的属性。

```js
import View from 'ol/View';

map.setView(new View({
  center: [0, 0],
  zoom: 2
}));
```

需要注意的是，视图拥有投影属性，其用于确定中心的坐标系和用于地图分辨率计算的单位。
如果投影属性未指定（如上面的代码段所示），则默认投影为Spherical Mercator（EPSG：3857），其中使用米为地图单位

zoom（缩放选项）是指定地图分辨率的简单方式，可用的缩放级别由maxZoom（默认值：28），zoomFactor（默认值：2）和maxResolution决定（其默认值的计算方式是投影的有效范围适合256x256像素的图块
）。从缩放级别0开始，每像素的分辨率为maxResolution单位，后续缩放级别将通过前一个缩放级别的分辨率除以zoomFactor来计算直到达到maxZoom缩放级别。

### 源（source）

OpenLayers使用`ol/source/Source`子类获取图层的远程数据，这些可用于免费和商业地图图块服务，如OpenStreetMap或Bing，用于OGC源（如WMS或WMTS），以及用于GeoJSON或KML等格式的矢量数据

```js
import OSM from 'ol/source/OSM';

var osmSource = OSM();
```

### 图层

图层是来自source的数据的直观表示，OpenLayers有四种基本类型的图层：

1. `ol/layer/Tile`（瓦片层）用于在网格中渲染源提供瓦片图像，这些网格由特定分辨率的缩放级别组合
2. `ol/layer/Image`（图片层）以任意的分辨率和范围渲染源提供的图片地图
3. `ol/layer/Vector`（矢量层）渲染矢量数据客户端 
4. `ol/layer/VectorTile`（矢量瓦片层）渲染源提供的矢量瓦片

```js
import TileLayer from 'ol/layer/Tile';

var osmLayer = new TileLayer({source: osmSource});
map.addLayer(osmLayer);
```

### 将上述概念放在一起

> 上面的代码段可以合并为一个js脚本，该脚本使用单个瓦片图层呈现地图：

```js
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/source/Tile';

new Map({
  layers: [
    new TileLayer({source: new OSM()})
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  }),
  target: 'map'
});
```

