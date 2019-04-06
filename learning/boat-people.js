var p = [1,1,2,2,3];

const weight = 3;

const findCount = function(people,maxWeight){
    let i = 0;
    let d = people.length -1;
    let count = 0;
    while(i<=d){
        if(i==d){
            count++;
            break;
        }
        let w1 = people[i];
        let w2 = people[d];
        if(w1+w2>maxWeight){
            count++;
            d--;
        }else {
            count++;
            i++;
            d--;
        }
    }
    return count;
}

console.log(findCount(p,weight));
