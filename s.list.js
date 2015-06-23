var S = require('s');

function arr( value ) {
  return Array.isArray(value)?value:[value];
}

function pushObjField( obj, field, value ) {
  if ( obj[ field ] ) {
    obj[ field ].push( value );
  } else {
    obj[ field ] = [ value ];
  }
};

var list = {
  length        : function( list ) { return (list)?list.length:0; },
  uniqueValues  : S.curry( function( getField, list ) { return list.map( getField ).filter( function( item, pos, self ) { return self.indexOf(item) == pos; }); } ),

  filter        : S.curry( function( fn, list ) { return list.filter(fn); } ),
  sort          : S.curry( function( fn, list ) { return list.sort( function(a,b) { return fn(a)<fn(b)?-1:(fn(a)>fn(b)?1:0); } ); } ),
  alphaSort     : function( list ) { return list.sort(); },

  map           : S.curry( function( fn, list ) { return list.map( function( obj ) { return S.cv( fn, obj ); } ) } ),
  fmap          : S.curry( function( obj, list ) { return list.map( function( fn ) { return S.cv( fn, obj ); } ) } ),

  back          : S.curry( function( count, list ) { return list.slice( -S.cv(count, list) ); } ),
  front         : S.curry( function( index, list ) { return list.slice( S.cv(index, list) ); } ),
  first         : function( list ) { list?return list[0]:null; },
  last          : function( list ) { list?return list[ list.length-1 ]:null; },

  hashBy        : S.curry( function( hash, list ) { var obj = {}; list.forEach( function( value ) { pushObjField( obj, S.cv(hash,value), value ); }); return obj; } ),
  merge         : S.curry( function( a, b ) { return arr(a).concat( arr(b) ); } ),
  reduce        : S.curry( function( fn, initial, list ) { return list.reduce( fn, initial ); } ),
  forEach       : S.curry( function( fn, list ) { list.forEach( fn ); } ),

  max           : S.curry( function( fn, list ) { return list?list.reduce(function( prev, value ) { var count = S.cv( fn, value ); return (count>prev)?count:prev; },0):0; } ),
  min           : S.curry( function( fn, list ) { return list?list.reduce(function( prev, value ) { var count = S.cv( fn, value ); return (count<prev)?count:prev; },0):0; } ),
};

exports = module.exports = list;
