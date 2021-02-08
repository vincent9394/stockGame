// // kafka setup
// module.exports = {
//     kafka: {
//         TOPIC: 'mouseInfo',
//         BROKERS: ['localhost:9092'],
//         GROUPID: 'bills-consumer-group',
//         CLIENTID: 'sample-kafka-client'
//     }
// }

// // kafka producer
// const client = new Kafka({ brokers: config.kafka.BROKERS, clientId: config.kafka.CLIENTID })
// const topic = config.kafka.TOPIC
// const producer = client.producer()



var timeStart = Date.now()
timeStartFormat = moment(timeStart).format("YYYY-MM-DD h:mm:ss")
console.log(timeStartFormat)
var mouseTime;

function countTime() {
    var timer = setInterval(function() {
        mouseTime = Date.now() - timeStart;
        mouseTime = moment(mouseTime).format("ss")

    }, 1000);
}
countTime();

t = 0

function startTimer() {

    var countdownTimer = setInterval(function() {

        // console.log("the time interval is 100 millsec" +t);
        t = t + 1;

    }, 100);

}

startTimer();


window.onload = function() {
    // create a heatmap instance
    var heatmap = h337.create({
        container: document.getElementById('heatmapContainer'),
        maxOpacity: .6,
        radius: 50,
        blur: .90,
        // backgroundColor with alpha so you can see through it
        backgroundColor: 'rgba(0, 0, 58, 0.96)'
    });
    var heatmapContainer = document.getElementById('heatmapContainerWrapper');

    heatmapContainer.onmousemove = heatmapContainer.ontouchmove = function(e) {
        // we need preventDefault for the touchmove
        e.preventDefault();
        var x = e.layerX;
        var y = e.layerY;
        if (e.touches) {
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
        }
        console.log(" x: " + x + " y: " + y + "  time: " + mouseTime)
        heatmap.addData({ x: x, y: y, value: 1 });

    };

    heatmapContainer.onclick = function(e) {
        var x = e.layerX;
        var y = e.layerY;
        heatmap.addData({ x: x, y: y, value: 1 });
    };

};