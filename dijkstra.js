function PriorityQueue () {
  this._nodes = [];

  this.enqueue = function (priority, key) {
    this._nodes.push({key: key, priority: priority });
    this.sort();
  }
  this.dequeue = function () {
    return this._nodes.shift().key;
  }
  this.sort = function () {
    this._nodes.sort(function (a, b) {
      return a.priority - b.priority;
    });
  }
  this.isEmpty = function () {
    return !this._nodes.length;
  }
}

/**
 * Pathfinding starts here
 */
function Graph(){
  var INFINITY = 1/0;
  this.vertices = {};

  this.addVertex = function(name, edges){
    this.vertices[name] = edges;
  }

  this.shortestPath = function(start, finish) {
    var nodes = new PriorityQueue(),
        distances = {},
        previous = {},
        path = [],
        distance = 0,
        smallest, vertex, neighbor, alt;

    for(vertex in this.vertices) {
      if(vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      }
      else {
        distances[vertex] = INFINITY;
        nodes.enqueue(INFINITY, vertex);
      }

      previous[vertex] = null;
    }

    while(!nodes.isEmpty()) {
      smallest = nodes.dequeue();

      if(smallest === finish) {
        path;

        while(previous[smallest]) {
          path.push(smallest);
          distance += this.vertices[previous[smallest]][smallest];
          smallest = previous[smallest];
        }

        break;
      }

      if(!smallest || distances[smallest] === INFINITY){
        continue;
      }

      for(neighbor in this.vertices[smallest]) {
        alt = distances[smallest] + this.vertices[smallest][neighbor];

        if(alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;

          nodes.enqueue(alt, neighbor);
        }
      }
    }

    return {path: path.concat(start).reverse(), distance: distance};
  }

  this.cycles = function(begin, current, path = [], paths = []) {
    path.push(current);
    for(related in this.vertices[current]) {

      if((related == begin) && (path.length >= 2)) {
          paths.push(path.slice());
      }

      if(!path.some(function(E) { return E == related })) {
        paths = this.cycles(begin, related, path, paths);
      }
    }

    path.pop();

    return paths;
  }

  this.allCycles = function() {
    var paths = [], vertex, path;

    for(vertex in this.vertices) {
      var one_vertex_paths = this.cycles(vertex, vertex).slice();
      for(var i = 0; i < one_vertex_paths.length; i++) {
        paths.push(one_vertex_paths[i]);
      }
    }

    return paths;
  }

  this.mayson = function() {

  }
}
