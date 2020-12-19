/* realtime chart */
var data = [], totalPoints = 300;
function getRandomData() {
    if (data.length > 0)
        data = data.slice(1);

    // do a random walk
    while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50;
        var y = prev + Math.random() * 10 - 5;
        if (y < 0)
            y = 0;
        if (y > 100)
            y = 100;
        data.push(y);
    }

    // zip the generated y values with the x values
    var res = [];
    for (var i = 0; i < data.length; ++i)
        res.push([i, data[i]])
    return res;
}

// setup control widget
var updateInterval = 30;
$("#updateInterval").val(updateInterval).change(function () {
    var v = $(this).val();
    if (v && !isNaN(+v)) {
        updateInterval = +v;
        if (updateInterval < 1)
            updateInterval = 1;
        if (updateInterval > 2000)
            updateInterval = 2000;
        $(this).val("" + updateInterval);
    }
});


if($("#realtimechart").length)
{
    var options = {
        series: { shadowSize: 1 },
        lines: { fill: true, fillColor: { colors: [ { opacity: 1 }, { opacity: 0.1 } ] }},
        yaxis: { min: 0, max: 100 },
        xaxis: { show: false },
        colors: ["rgba(65,139,202,0.5)"],
        grid: { tickColor: "#dddddd",
            borderWidth: 0
        }
    };
    var plot = $.plot($("#realtimechart"), [ getRandomData() ], options);
    function update() {
        plot.setData([ getRandomData() ]);
        // since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();

        setTimeout(update, updateInterval);
    }

    update();
}
// top menu

var useOnComplete = false,
    useEasing = false,
    useGrouping = false,
    options = {
        useEasing : useEasing, // toggle easing
        useGrouping : useGrouping, // 1,000,000 vs 1000000
        separator : ',', // character to use as a separator
        decimal : '.' // character to use as a decimal
    };

var demo = new CountUp("myTargetElement1", 12.52, 9500, 0, 6, options);
demo.start();
var demo = new CountUp("myTargetElement2", 1, 100, 0, 6, options);
demo.start();
var demo = new CountUp("myTargetElement3", 24.02, 5000, 0, 6, options);
demo.start();
var demo = new CountUp("myTargetElement4", 1254, 8000, 0, 6, options);
demo.start();
var demo = new CountUp("myTargetElement1.1", 1254, 98000, 0, 6, options);
demo.start();
var demo = new CountUp("myTargetElement1.2", 1254, 396000, 0, 6, options);
demo.start();
var demo = new CountUp("myTargetElement2.1", 154, 920, 0, 6, options);
demo.start();
var demo = new CountUp("myTargetElement2.2", 2582, 3929, 0, 6, options);
demo.start();
var demo = new CountUp("myTargetElement3.1", 2582, 42000, 0, 6, options);
demo.start();
var demo = new CountUp("myTargetElement3.2", 25858, 173929, 0, 6, options);
demo.start();
var demo = new CountUp("myTargetElement4.1", 2544, 56000, 0, 6, options);
demo.start();
var demo = new CountUp("myTargetElement4.2", 1584, 219864, 0, 6, options);
demo.start();
var my_posts = $("[rel=tooltip]");

var size = $(window).width();
for (i = 0; i < my_posts.length; i++) {
    the_post = $(my_posts[i]);

    if (the_post.hasClass('invert') && size >= 767) {
        the_post.tooltip({
            placement: 'left'
        });
        the_post.css("cursor", "pointer");
    } else {
        the_post.tooltip({
            placement: 'right'
        });
        the_post.css("cursor", "pointer");
    }
}
//Percentage Monitor
$(document).ready(function()

{

    /** BEGIN WIDGET PIE FUNCTION **/
    if ($('.widget-easy-pie-1').length > 0)
    {
        $('.widget-easy-pie-1').easyPieChart({
            easing: 'easeOutBounce',
            barColor : '#F9AE43',
            lineWidth: 5
        });
    }
    if ($('.widget-easy-pie-2').length > 0)
    {
        $('.widget-easy-pie-2').easyPieChart({
            easing: 'easeOutBounce',
            barColor : '#F9AE43',
            lineWidth: 5,
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
    }

    if ($('.widget-easy-pie-3').length > 0)
    {
        $('.widget-easy-pie-3').easyPieChart({
            easing: 'easeOutBounce',
            barColor : '#EF6F6C',
            lineWidth: 5
        });
    }
    /** END WIDGET PIE FUNCTION **/
});
