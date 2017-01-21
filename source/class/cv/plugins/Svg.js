/* structure_plugin.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


/**
 * @author christian523
 * @since 2012
 */
qx.Class.define('cv.plugins.Svg', {
  extend: cv.structure.AbstractWidget,
  include: [cv.role.Update, cv.role.Refresh],

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    _getInnerDomString: function() {
      return '<div class="actor"></div>';
    },

    _onDomReady: function() {
      // TODO: replace jquery
      var actor = $(this.getActor());
      actor.svg({loadURL: qx.util.ResourceManager.getInstance().toUri('plugins/svg/rollo.svg')});
    },

    handleUpdate: function(value) {
      var element = this.getDomElement();
      var linewidth=3;
      var space = 1;
      var total = linewidth + space;
      var line_qty = 48 / total;
      var line, i, l;
      for(i = 0, l = Math.floor(value/line_qty); i<=l;i++) {
        line = qx.bom.Selector.query('#line'+(i+1), element);
        qx.bom.element.Attribute.set(line, 'y1', 9+total*(i)+((value%line_qty)/line_qty)*total);
        qx.bom.element.Attribute.set(line, 'y2', 9+total*(i)+((value%line_qty)/line_qty)*total);
      }
      for(i = Math.floor(value/line_qty)+1; i<=line_qty;i++) {
        line = qx.bom.Selector.query('#line'+(i+1), element);
        qx.bom.element.Attribute.set(line, 'y1', 9);
        qx.bom.element.Attribute.set(line, 'y2', 9);
      }
    }
  },

  defer: function(statics) {
    // register the parser
    cv.xml.Parser.addHandler("svg", cv.plugins.Svg);
    cv.structure.WidgetFactory.registerClass("svg", statics);
  }
});