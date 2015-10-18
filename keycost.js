#!/usr/bin/env node
/* global console */

'use strict';

var fs = require('fs')
  , path = require('path')
  , u = require('lodash')
  , log = console.log
  , printf = require('printf')
  , nomnom = require('nomnom')

var sh = 0.5
  , lp = 1.5       //left pinky
  , lr = 1         //left ring
  , lm = 1         //left middle
  , li = 1         //left index
  , th = 0         //thumb
  , ri = 1         //right index
  , rm = 1         //right middle
  , rr = 1         //right ring
  , rp = 1.5       //right pinky
  , one = 0.5      //one away from base
  , two = one+1    //two away from base
  , thr = two+1    //three away from base
  , fou = thr+1.5  //four away from base
  , big = -2

              //BASE4L
var COSTS = { 'a':lp
            , 'A':lp+sh

            , 's':lr
            , 'S':lr+sh

            , 'd':lm
            , 'D':lm+sh

            , 'f':li
            , 'F':li+sh

              //BASE4R
            , 'j':ri
            , 'J':ri+sh

            , 'k':rm
            , 'K':rm+sh

            , 'l':rr
            , 'L':rr+sh

            , ';':rp
            , ':':rp+sh

              //HOMEROW
            , 'g':li
            , 'G':li+sh

            , 'h':ri
            , 'H':ri+sh

            , '\'':rp
            , '"':rp+sh

              //ONEAWAYTOPL
            , 'q':lr+two
            , 'Q':lr+two+sh

            , 'w':lr+one
            , 'W':lr+one+sh

            , 'e':lm+one
            , 'E':lm+one+sh

            , 'r':li+one
            , 'R':li+one+sh

            , 't':li+one
            , 'T':li+one+sh

              //ONEAWAYTOPR
            , 'y':ri+two
            , 'Y':ri+two+sh

            , 'u':ri+one
            , 'U':ri+one+sh

            , 'i':rm+one
            , 'I':rm+one+sh

            , 'o':rr+one
            , 'O':rr+one+sh

            , 'p':rr+one
            , 'P':rr+one+sh

            , '[':rr+two        //non-standard
            , '{':rr+two+sh

            , ']':rr+thr        //non-standard
            , '}':rr+thr+sh

              //ONEAWAYBOTL
            , 'z':lr+one
            , 'Z':lr+one+sh

            , 'x':lm+one        //non-standard
            , 'X':lm+one+sh

            , 'c':li+one
            , 'C':li+one+sh

            , 'v':li+one
            , 'V':li+one+sh

              //ONEAWAYBOTR
            , 'n':ri+one
            , 'N':ri+one+sh

            , 'm':ri+one
            , 'M':ri+one+sh

            , ',':rm+one
            , '<':rm+one+sh

            , '.':rr+one
            , '>':rr+one+sh

            , '/':rr+two        //non-standard
            , '?':rr+two+sh

              //TWOAWAYBOT
            , 'b':ri+two
            , 'B':ri+two+sh

              //TWOAWAYTOPR
            , '1':lr+thr
            , '!':lr+thr+sh

            , '2':lr+two
            , '@':lr+two+sh

            , '3':lm+two
            , '#':lm+two+sh

            , '4':lm+two        //non-standard?
            , '$':lm+two+sh

            , '5':li+two
            , '%':li+two+sh

            , '6':li+thr        //three cuz it's a bit of a streach
            , '^':li+thr+sh

              //TWOAWAYTOPL
            , '7':ri+two
            , '&':ri+two+sh

            , '8':rm+two
            , '*':rm+two+sh

            , '9':rm+two
            , '(':rm+two+sh

            , '0':rm+two
            , ')':rm+two+sh

            , '-':rm+thr        //non-standard
            , '_':rm+thr+sh

            , '=':lr+thr        //non-standard
            , '+':lr+thr+sh

            , '`':lr+fou        //non-standard
            , '~':lr+fou+sh

            , '\\':rr+fou       //non-standard
            , '|':rr+fou+sh

            , '\n':rp+two+big
            , ' ':0 //th+big   // aka negligible
            , '\t':lr+thr+big  //non-standard
            }

/*
function ord(c) { return c.charCodeAt(0) }
function chr(n) { return String.fromCharCode(n) }
*/

//log(module.filename)
//log(process.argv)
//log(process.execPath)
//var exec = process.execPath.split(path.sep).pop()
//  , args = process.argv.filter(function(e,i,a){
//             if (i == 0 && e == exec) return false
//             if (i == 1 && e == module.filename) return false
//             return true
//           })
var opts = nomnom.parse()
  , args = opts._

log(args)

var scores = []

args.forEach(function (fn, idx, a) {
  var code = fs.readFileSync(fn, 'utf8')
    , score = 0

  for (var i=0; i<code.length; i++) {
    score += COSTS[code[i]]
  }

  scores[idx] = score

  log(fn, score)
})
