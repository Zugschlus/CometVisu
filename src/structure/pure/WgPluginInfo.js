/* WgPluginInfo.js 
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
 * TODO: complete docs
 *
 * @module structure/pure/WgPluginInfo
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common', 'lib/cv/role/Update'], function() {
  "use strict";

  Class('cv.structure.pure.Wgplugininfo', {
    isa: cv.structure.pure.AbstractWidget,
    does: cv.role.Update,

    has: {
      variable   : { is: 'r' }
    },

    my : {
      methods: {
        getAttributeToPropertyMappings: function () {
          return {
            'variable' : {}
          };
        }
      }
    },

    augment: {
      getDomString: function () {
        return '<div class="actor"><div class="value">-</div></div>';
      }
    },

    methods: {
      handleUpdate: function(value) {
        var that = this;
        $.getJSON('/wg-plugindb.pl?name=' + this.getVariable(), function(data) {
          that.defaultUpdate( undefined, data[that.getVariable()], that.getValueElement(), true, that.getPath());
        });
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("wgplugin_info", cv.structure.pure.Wgplugininfo);
}); // end define