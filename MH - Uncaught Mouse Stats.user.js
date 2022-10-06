// ==UserScript==
// @name         MH - Uncaught Mouse Stats
// @namespace    http://tampermonkey.net/
// @version      0.21
// @description  Displays any uncaught mice in a location.
// @author       MI
// @match        https://www.mousehuntgame.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mousehuntgame.com
// @grant        none
// ==/UserScript==

$(document).ready(function(){
    addPoint()
    var data = localStorage.getItem("Chro-travel-location")
    data? null: getData()
})

function getData(){
    postReq("https://www.mousehuntgame.com/managers/ajax/pages/page.php",
            `sn=Hitgrab&hg_is_ajax=1&page_class=Travel&last_read_journal_entry_id=${lastReadJournalEntryId}&uh=${user.unique_hash}`)
    .then(res=>{
        try{
            var data = JSON.parse(res.responseText);
            if (data){
                var location = data.page.tabs[0].regions
                var locationData = {}
                location.forEach(el=>{
                    el.environments.forEach(el2=>{
                        var locationName = el2.name
                        var locationType = el2.type
                        locationData[locationName] = locationType
                    })
                })
                localStorage.setItem("Chro-travel-location",JSON.stringify(locationData))
            }
        } catch (error){
            console.log(error)
        }
    })
}