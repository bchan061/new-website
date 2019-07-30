ig.module( 'game.levels.level26' )
.requires( 'impact.image','game.entities.evil01','game.entities.player','game.entities.levelexit','game.entities.debriscontainer','game.entities.timer' )
.defines(function(){
LevelLevel26=/*JSON[*/{"entities":[{"type":"EntityEvil01","x":260,"y":242},{"type":"EntityEvil01","x":116,"y":146},{"type":"EntityEvil01","x":56,"y":178},{"type":"EntityEvil01","x":224,"y":178},{"type":"EntityEvil01","x":80,"y":210},{"type":"EntityPlayer","x":261,"y":290},{"type":"EntityEvil01","x":68,"y":242},{"type":"EntityLevelexit","x":16,"y":16,"settings":{"level":"level27"}},{"type":"EntityDebriscontainer","x":16,"y":16,"settings":{"size":{"x":304,"y":8},"name":"debris2","colorOffset":1}},{"type":"EntityDebriscontainer","x":16,"y":272,"settings":{"size":{"x":320,"y":8},"name":"debris","colorOffset":1}},{"type":"EntityTimer","x":16,"y":0,"settings":{"delta":4,"target":{"1":"debris","2":"debris2"}}}],"layer":[{"name":"background","width":23,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"media/tileset.png","repeat":false,"preRender":true,"distance":"1","tilesize":16,"foreground":false,"data":[[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26],[26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26]]},{"name":"main","width":25,"height":20,"linkWithCollision":true,"visible":1,"tilesetName":"media/tileset.png","repeat":false,"preRender":true,"distance":"1","tilesize":16,"foreground":false,"data":[[12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12],[12,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,12,12,12,12],[12,4,4,4,0,0,0,0,0,4,0,4,0,4,0,4,0,4,0,4,12,12,12,12,12],[12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,12,12,12,12],[12,0,4,4,4,4,4,0,0,0,4,0,4,0,4,0,4,0,4,0,12,12,12,12,12],[12,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,12,12,12,12,12],[12,4,0,4,0,4,12,4,0,4,0,4,0,4,0,4,0,4,0,4,12,12,12,12,12],[12,0,0,12,0,0,12,0,0,0,0,0,0,0,0,0,0,12,0,0,12,12,12,12,12],[12,0,4,12,4,0,12,0,4,0,4,0,4,0,4,0,4,12,4,0,12,12,12,12,12],[12,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,12,0,0,12,12,12,12,12],[12,4,0,0,0,4,4,4,4,4,12,4,0,4,0,4,0,12,0,4,12,12,12,12,12],[12,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,12,12,12,12,12],[12,0,4,4,4,4,4,4,4,0,12,0,4,0,4,0,4,0,4,0,0,12,12,12,12],[12,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,12,12,12,12],[13,5,5,5,5,5,0,0,0,5,13,5,0,5,0,5,0,5,0,5,0,13,13,13,13],[13,0,0,0,0,0,0,0,0,0,13,0,0,0,0,0,0,0,0,0,0,13,13,13,13],[13,0,5,5,5,5,5,5,5,0,13,0,5,5,5,5,5,5,5,0,5,13,13,13,13],[13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,13,13,13],[13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,13,13,13],[13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13]]},{"name":"collision","width":25,"height":20,"linkWithCollision":false,"visible":0,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":16,"foreground":false,"data":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],[1,1,1,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],[1,0,1,1,1,1,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1],[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],[1,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1],[1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1],[1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,1,1,1,1],[1,1,0,0,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1],[1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,0,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,1,0,0,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1],[1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]}]}/*]JSON*/;
LevelLevel26Resources=[new ig.Image('media/tileset.png'), new ig.Image('media/tileset.png')];
});