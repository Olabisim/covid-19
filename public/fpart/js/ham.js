




var screeen = window.innerWidth;
console.log("this is the width screen:: "+ screeen);

window.addEventListener("scroll", function()
{
        const parallax1 =document.getElementById("parallax1");
        let offset = window.pageYOffset;
        parallax1.style.backgroundPositionY = offset + "px";
        var screeen = window.innerWidth;
        console.log("this is the width screen:: "+ screeen);

})
window.addEventListener("scroll", function()
{
        const parallax3 =document.getElementById("parallax3");
        let offset = window.pageYOffset;
        parallax3.style.backgroundPositionY = offset * 0.1 + "px";
})
window.addEventListener("scroll", function()
{
        const parallax4 =document.getElementById("parallax4");
        let offset = window.pageYOffset;
        parallax4.style.backgroundPositionY = offset * 0.1 + "px";
})
window.addEventListener("scroll", function()
{
        const parallax5 =document.getElementById("parallax5");
        let offset = window.pageYOffset;
        parallax5.style.backgroundPositionY = offset * 0.05 + "px";
})





// for the world wide web parallax
const test = document.getElementById("test");
document.addEventListener('scroll', () => {
        const MOUNT = 50;
        const yoff = window.pageYOffset;
        let divYoff = yoff/6;
        if (yoff > MOUNT){
                test.style.transform = ` rotateZ(${divYoff}deg)`;
        
        }
        else  {
                test.style.transform = ` rotateZ(0deg) rotateX(0deg)`;
        }

})




//FOR THE VIRUS
//IT WILL STILL TAKE THREE STEPS SE
document.addEventListener('scroll', () => {
        const yoff = window.pageYOffset;
        console.log("yoff:: " + yoff);
        const MOUNT_SCALE_END = 250;
        if (yoff < MOUNT_SCALE_END){
                sampup.style.transition = `all 0.5s ease`;
                sampup.style.transform = `translate(0px, 0px)`;
                sampup.style.backgroundColor = `none`;
        }
        else if (yoff > MOUNT_SCALE_END){
                sampup.style.transition = `all 0.5s ease`;
                sampup.style.transform = `translate(170px, 860px)`;
                sampup.style.backgroundColor = `white`;
                sampup.style.height = `50px`;
                sampup.style.width = `50px`;
                sampup.style.borderRadius = `50%`;
        }
        else if (yoff == 0){
                sampup.style.backgroundColor = `none`;
        }
}) 







//ENDING OF WORLD WIDE PARALLAX
        // BEGINNING OF GETTING THE CIRCLE DONE
document.addEventListener('scroll', () => {
        const circle1 = document.getElementById("circle1");
        const yoff = window.pageYOffset;
        console.log("yoff:: " + yoff);
        const MOUNT_SCALE_END = 150;
        if (yoff + 100 < MOUNT_SCALE_END){
                circle1.style.transition = `all 0.5s ease`;
                circle1.style.transform = `translate(0px, 0px)`;
        }
        else if (yoff > MOUNT_SCALE_END){
                circle1.style.opacity = `1`;
                circle1.style.transition = `all 0.5s ease`;
                circle1.style.transform = `translate(120px, -120px)`;
        }
}) 
document.addEventListener('scroll', () => {
        const circle2 = document.getElementById("circle2");
        const yoff = window.pageYOffset;
        console.log("yoff:: " + yoff);
        const MOUNT_SCALE_END = 150;

        if (yoff + 100 < MOUNT_SCALE_END){
                circle2.style.transition = `all 0.5s ease`;
                circle2.style.transform = `translate(0px, 0px)`;
        }
        else if (yoff > MOUNT_SCALE_END){
                circle2.style.transition = `all 0.5s ease`;
                circle2.style.transform = `translate(0px, 250px)`;
        }
}) 
document.addEventListener('scroll', () => {
        const circle3 = document.getElementById("circle3");
        const yoff = window.pageYOffset;
        console.log("yoff:: " + yoff);
        const MOUNT_SCALE_END = 150;
        if (yoff + 100 < MOUNT_SCALE_END){
                circle3.style.transition = `all 0.5s ease`;
                circle3.style.transform = `translate(0px, 0px)`;
        }
        else if (yoff > MOUNT_SCALE_END){
                circle3.style.opacity = `1`;
                circle3.style.transition = `all 0.5s ease`;
                circle3.style.transform = `translate(-120px, -120px)`;
        }
}) 
document.addEventListener('scroll', () => {
        const circle4 = document.getElementById("circle4");
        const yoff = window.pageYOffset;
        console.log("yoff:: " + yoff);
        const MOUNT_SCALE_END = 250;
        if (yoff + 100 < MOUNT_SCALE_END){
                circle4.style.transition = `all 0.5s ease`;
                circle4.style.transform = `translate(0px, 0px)`;
        }
        else if (yoff > MOUNT_SCALE_END){
                circle4.style.opacity = `1`;
                circle4.style.transition = `all 0.5s ease`;
                circle4.style.transform = `translate(0px, -120px)`;
        }
}) 
document.addEventListener('scroll', () => {
        const circle5 = document.getElementById("circle5");
        const yoff = window.pageYOffset;
        console.log("yoff:: " + yoff);
        const MOUNT_SCALE_END = 250;
        if (yoff + 100 < MOUNT_SCALE_END){
                circle5.style.transition = `all 0.5s ease`;
                circle5.style.transform = `translate(0px, 0px)`;
        }
        else if (yoff > MOUNT_SCALE_END){
                circle5.style.opacity = `1`;
                circle5.style.transition = `all 0.5s ease`;
                circle5.style.transform = `translate(0px, -120px)`;
        }
}) 








document.addEventListener('scroll', () => {
        const parallax2 = document.querySelector('#parallax2');
        const yoff = window.pageYOffset;
        const yoff2 = yoff * 2;
        const limit = 188;
        /*
        function some() {
                if (limit > yoff){ 
                        parallax2.style.transform = `translate(${yoff2}%, 0px)`;
                }
                else if (limit < yoff){ 
                        parallax2.style.marginTop = `${yoff2/2}px`;
                }
        }
        */
        
        if (limit > yoff){ 
                        parallax2.style.transform = `translate(${yoff}%, 0px)`;
                }
})

document.addEventListener('scroll', () => {
        
        //         transform: translate(-300px, 0px);
        //                      to
        //         transform: translate(20px, 0px);
        //transform: translate(-300px, 0px);
        //what i want to do is to make -300px to 20px by adding something that will be increasing a little
        const yoff = window.pageYOffset;
        //for (var i = 0; i < 9; i++){
        var me = document.querySelector('.work1');

        if (yoff < 1520){
                me.style.opacity = `0`;
        }
        else if (yoff >= 1520 && yoff < 1570){
                me.style.opacity = `1`;
                me.style.transform = `translate(-300px, 0px)`;
                //use opacity = 0 to test very well
        }
        else if (yoff > 1570 && yoff < 1620){
                var add = -300;
                var perform = add + (yoff/400);
                me.style.transform = `translate(${perform}px, 0px)`;
                me.style.transition = `2s`;
        }
        else if (yoff > 1620){
                var add = -300;
                var perform = add + (yoff/3);
                me.style.transform = `translate(${perform}px, 0px)`;
                me.style.transition = `2s`;
        }
        // console.log("yoff/30:: " + yoff/30);
        // if ( yoff < 900 ){
        //         me.style.transform = `translate(-${yoff/9}%, 0px)`;
        // }
        // else{
        //         me.style.transform = `translate(${yoff/20}%, 0px)`;
        // }
        //}
})

document.addEventListener('scroll', () => {

        var athird_div = document.querySelector(".athird_div");
        const yoff = window.pageYOffset;

        if (yoff < 1650){
                athird_div.style.opacity = `0`;
                athird_div.style.transform = `translateX(250px)`;
        }
        else {
                athird_div.style.opacity = `1`;
                athird_div.style.transform = `translate(0px, 0px)`;
                athird_div.style.transition = `0.7s`;
                //use opacity = 0 to test very well
        }

})
document.addEventListener('scroll', () => {

        var athird_pill = document.querySelector(".athird_pill");
        const yoff = window.pageYOffset;

        if (yoff < 2050){
                athird_pill.style.opacity = `0`;
                athird_pill.style.transform = `translateY(300px)`;
        }
        else {
                athird_pill.style.opacity = `1`;
                athird_pill.style.transform = `translate(0px, 0px)`;
                athird_pill.style.transition = `0.7s`;
                //use opacity = 0 to test very well
        }
})

document.addEventListener('scroll', () => {

        var athird_ill = document.querySelector(".athird_ill");
        const yoff = window.pageYOffset;

        if (yoff < 2350){
                athird_ill.style.opacity = `0`;
                athird_ill.style.transform = `translateX(-250px)`;
        }
        else {
                athird_ill.style.opacity = `1`;
                athird_ill.style.transform = `translate(0px, 0px)`;
                athird_ill.style.transition = `0.7s`;
                //use opacity = 0 to test very well
        }

})


// getting people who can get tested poaitively and negatively



function incrementValue()
{
    var demo_id = document.getElementById('demo')
    var value = parseInt(demo_id.value, 10);
    // if NaN, set to 0, else, keep the current value
    value = isNaN(value) ? 0 : value;
    value++;
    demo_id.value = value;

    if ((value%2)==0){
        demo_id.innerHTML = value;
        demo_id.style.fontSize = "15px"; 
        demo_id.style.color = "white";
        demo_id.style.backgroundColor = "none";   
    } 
    else {
        demo_id.innerHTML = value.toString() ;
        demo_id.style.fontSize = "15px"; 
        demo_id.style.color = "white";
        demo_id.style.backgroundColor = "none";
    }
}


function incrementValuee()
{
    var demo_id = document.getElementById('demo1')
    var value = parseInt(demo_id.value, 10);
    // if NaN, set to 0, else, keep the current value
    value = isNaN(value) ? 0 : value;
    value++;
    demo_id.value = value;

    if ((value%2)==0){
        demo_id.innerHTML = value;
        demo_id.style.fontSize = "15px"; 
        demo_id.style.color = "white";
        demo_id.style.backgroundColor = "none";   
    } 
    else {
        demo_id.innerHTML = value.toString() ;
        demo_id.style.fontSize = "15px"; 
        demo_id.style.color = "white";
        demo_id.style.backgroundColor = "none";
    }
}





//