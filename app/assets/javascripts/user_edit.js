// BigBlueButton open source conferencing system - http://www.bigbluebutton.org/.
//
// Copyright (c) 2018 BigBlueButton Inc. and by respective authors (see below).
//
// This program is free software; you can redistribute it and/or modify it under the
// terms of the GNU Lesser General Public License as published by the Free Software
// Foundation; either version 3.0 of the License, or (at your option) any later
// version.
//
// BigBlueButton is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License along
// with BigBlueButton; if not, see <http://www.gnu.org/licenses/>.

$(document).on('turbolinks:load', function(){
    var controller = $("body").data('controller');
    var action = $("body").data('action');
    if ((controller == "admins" && action == "edit_user") || (controller == "users" && action == "edit")) {
        $(".setting-btn").click(function(data){
            var url = $("body").data("relative-root")
            if (!url.endsWith("/")) {
                url += "/"
            }
            url += "admins?setting=" + data.target.id

            window.location.href = url
        })

        $(".clear-role").click(clearRole)

        $("#role-select-dropdown").change(function(data){
            var dropdown = $("#role-select-dropdown");
            var select_role_id = dropdown.val();

            if(select_role_id){
                var selected_role = dropdown.find('[value=\"' + select_role_id + '\"]');
                selected_role.prop("disabled", true)

                var tag_container = $("#role-tag-container");
                tag_container.append("<span id=\"user-role-tag_" + select_role_id + "\" style=\"background-color:" + selected_role.data("colour") + ";\" class=\"tag\">" + 
                    selected_role.text() + "<a data-role-id=\"" + select_role_id + "\" class=\"tag-addon clear-role\"><i data-role-id=\"" + select_role_id + "\" class=\"fas fa-times\"></i></a></span>");

                var role_ids = $("#user_role_ids").val()
                role_ids += " " + select_role_id
                $("#user_role_ids").val(role_ids)
                
                $("#user-role-tag_" + select_role_id).click(clearRole);
                dropdown.val(null)
            }
        })
    }
})

function clearRole(data){
    var role_id = $(data.target).data("role-id");
    var role_tag = $("#user-role-tag_" + role_id);
    $(role_tag).remove()
  
    var role_ids = $("#user_role_ids").val()
    var parsed_ids = role_ids.split(' ')
  
    var index = parsed_ids.indexOf(role_id.toString());
  
    if (index > -1) {
        parsed_ids.splice(index, 1);
    }
  
    $("#user_role_ids").val(parsed_ids.join(' '))
  
    var selected_role = $("#role-select-dropdown").find('[value=\"' + role_id + '\"]');
    selected_role.prop("disabled", false)
}