//https://practice.geeksforgeeks.org/problems/maximum-tip-calculator/0

const findMaxTip = function(total,x,y,tipsa,tipsb){
    let ix = 0;
    let jy = 0;
    let totalTip = 0;
    for(let i=0;i<total;i++){
        let a = tipsa[i];
        let b = tipsb[i];
        if(ix+jy === total){
            break;
        }
        if(a>b && ix<=x){
            ix++;
            totalTip += a;
        }else if(jy<=y){
            jy++;
            totalTip += b;
        }
    }
    return totalTip;
}

console.log(findMaxTip(5,3,3,[1,2,3,4,5],[5,4,3,2,1]));

console.log(findMaxTip(8,4,4,[1,4,3,2,7,5,9,6],[1,2,3,6,5,4,9,8]));

