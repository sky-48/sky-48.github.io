window.onload = function() {
    let team_colors_container = document.getElementById('team_colors_container');
    for(let group of dataObj) {
        // group name:
        let title = document.createElement("h4");
        title.innerHTML = group.gname + ":";
        team_colors_container.appendChild(title);
        
        for (let team of group.teams) {
            // team name:
            let div_name = document.createElement("div");
            div_name.setAttribute('class', 'col-sm-4 well well-lg');
            div_name.setAttribute('style', 'color:white; background-color:' + team.color);
            div_name.innerHTML = 'Team ' + team.name;
            
            // color hex code:
            let div_color = document.createElement("div");
            div_color.setAttribute('class', 'col-sm-8 well well-lg');
            div_color.setAttribute('style', 'color:white; background-color:' + team.color);
            div_color.innerHTML = team.color;
            
            // add both <div> to the container and append a line break:
            team_colors_container.appendChild(div_name);
            team_colors_container.appendChild(div_color);
        }
    }
}