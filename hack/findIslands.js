let a= [
        [0,1,0,1],
        [1,1,0,1],
        [0,0,0,1],
        [0,0,1,1]];

const findIslands = function(a){
    let traversal = [
        [],
        [],
        [],
        []
    ]
    let islands = 0;
    for(let i=0;i<a.length;i++){
        for(let j=0;j<a.length;j++){
            if(a[i][j] == 1 && !traversal[i][j]){
                traversal[i][j] == true;
                let q = [];
                q.push({i:i,j:j});
                while(q.length){
                    let ind = q.shift();
                    if(ind.i<a.length-1 && a[ind.i+1][j] ==1 && !traversal[ind.i+1][ind.j]){
                        traversal[ind.i+1][ind.j] = true;
                        q.push({i:ind.i+1,j:ind.j});
                    }
                    if(ind.j<a.length-1 && a[ind.i][j+1] ==1 && !traversal[ind.i][ind.j+1]){
                        traversal[ind.i][ind.j+1] = true;
                        q.push({i:ind.i,j:ind.j+1});
                    }
                    if(ind.i<a.length-1 && ind.j<a.length-1 && a[ind.i+1][ind.j+1] ==1 && !traversal[ind.i+1][ind.j+1]){
                        traversal[ind.i+1][ind.j+1] = true;
                        q.push({i:ind.i+1,j:ind.j+1});
                    }
                    if(ind.i>0 && a[ind.i-1][ind.j] ==1 && !traversal[ind.i-1][ind.j]){
                        traversal[ind.i-1][ind.j] = true;
                        q.push({i:ind.i-1,j:ind.j});
                    }
                    if(ind.j>0 && a[ind.i][ind.j-1] ==1 && !traversal[ind.i][ind.j-1]){
                        traversal[ind.i][ind.j-1] = true;
                        q.push({i:ind.i,j:ind.j-1});
                    }
                    if(ind.i>0 && ind.j>0 && a[ind.i-1][ind.j-1] ==1 && !traversal[ind.i-1][ind.j-1]){
                        traversal[ind.i-1][ind.j-1] = true;
                        q.push({i:ind.i-1,j:ind.j-1});
                    }
                    if(ind.j>0 && ind.i<a.length-1 && a[ind.i+1][ind.j-1] && !traversal[ind.i+1][ind.j-1]){
                        traversal[ind.i+1][ind.j-1] = true;
                        q.push({i:ind.i+1,j:ind.j-1});
                    }
                    if(ind.i>0 && ind.j<a.length-1 && a[ind.i-1][ind.j+1] && !traversal[ind.i-1][ind.j+1]){
                        traversal[ind.i-1][ind.j+1] = true;
                        q.push({i:ind.i-1,j:ind.j+1});
                    }
                }
                islands++;
            }

        }
    }
    return islands;
}

console.log(findIslands(a));