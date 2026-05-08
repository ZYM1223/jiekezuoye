// 初始化地图
const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([114.48, 38.03]),
        zoom: 14
    }),
    controls: ol.control.defaults({
        attribution: false
    })
});

// 实时显示坐标
const coordElement = document.getElementById('coord');
map.on('pointermove', function (e) {
    const coord = ol.proj.toLonLat(e.coordinate);
    coordElement.innerText = `经度: ${coord[0].toFixed(4)} 纬度: ${coord[1].toFixed(4)}`;
});

// 绘图层
const source = new ol.source.Vector();
const drawLayer = new ol.layer.Vector({
    source: source
});
map.addLayer(drawLayer);

let drawInteraction;

// 绘制点
document.getElementById('drawPoint').onclick = function () {
    removeDrawInteraction();
    drawInteraction = new ol.interaction.Draw({
        source: source,
        type: 'Point'
    });
    map.addInteraction(drawInteraction);
};

// 绘制线
document.getElementById('drawLine').onclick = function () {
    removeDrawInteraction();
    drawInteraction = new ol.interaction.Draw({
        source: source,
        type: 'LineString'
    });
    map.addInteraction(drawInteraction);
};

// 绘制面
document.getElementById('drawPolygon').onclick = function () {
    removeDrawInteraction();
    drawInteraction = new ol.interaction.Draw({
        source: source,
        type: 'Polygon'
    });
    map.addInteraction(drawInteraction);
};

// 清除图形
document.getElementById('clearDraw').onclick = function () {
    source.clear();
    removeDrawInteraction();
};

// 移除工具
function removeDrawInteraction() {
    if (drawInteraction) {
        map.removeInteraction(drawInteraction);
    }
}