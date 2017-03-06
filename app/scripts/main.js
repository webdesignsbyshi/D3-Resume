/*Nav Collapse*/
$('.button-collapse').sideNav();

/*Carousel*/
$('.carousel').carousel();

/*Page Nav*/
$(document).ready(function (){
  $('nav a').pageNav({'scroll_shift': $('nav').outerHeight() + 20});
});

/*Name*/
var text = 'Shianne';

var curr = 0;
var Write = function write(){
    var elem = document.getElementById('target');
    elem.textContent += text.charAt(curr);
    curr++;
    if (curr < text.length)
        window.setTimeout(write, 150);
};
Write();

/*Toggle Skills*/
$('.skills-btns > a').click(function() {
    var ix = $(this).index();
    
    $('#development').toggle( ix === 0 );
    $('#design').toggle( ix === 1 );
});

/*Development Bar Graph*/
var svg = d3.select('#dev'),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr('width') - margin.left - margin.right,
    height = +svg.attr('height') - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.2),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.tsv('devdata.tsv', function(d) {
  d.percent = +d.percent;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, 100]);

  g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

  g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10))
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Percent');

  g.selectAll('.bar')
    .data(data)
    .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return x(d.name); })
      .attr('y', function(d) { return y(d.percent); })
      .attr('width', x.bandwidth())
      .attr('height', function(d) { return height - y(d.percent); });
});