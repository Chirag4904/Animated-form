const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");
const tl = gsap.timeline({defaults: {duration:1}});

//line
const start = "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const end = "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

containers.forEach((container) => {
    const input = container.querySelector(".input");
    const line = container.querySelector(".elastic-line");
    const placeholder = container.querySelector(".placeholder");

    input.addEventListener('focus',()=>{
        if(!input.value){
            tl.fromTo(
                line,
                { attr : { d : start } },
                { attr : { d : end } , ease : 'Power2.easeOut', duration : 0.65 } );
            tl.to(
                line,
                { attr: {d : start },ease: "elastic.out(3,0.5)" },"<50%" );

            tl.to(placeholder,{top:-15,left:0,duration:0.5,ease:"Power2.easeOut",scale:0.8},'<15%')
        }
    })
    // tl.to(placeholder,{top:0,left:0,duration:0.2,scale:1},'>1')
});

form.addEventListener('click',()=>{
    containers.forEach((container)=>{
        const input = container.querySelector(".input");
        const line = container.querySelector(".elastic-line");
        const placeholder = container.querySelector(".placeholder");

        if (document.activeElement !== input){
            if(!input.value){
                gsap.to(placeholder,{top:0,left:0,scale:1,duration:0.5,ease:"Power2.easeOut"})
            }
        }
        //Validation
        //NAME VALIDATION
        input.addEventListener('input',(e)=>{
            if(e.target.type === 'text'){
                let inputText = e.target.value;
                if(inputText.length >2){
                    //colorize
                    colorize('#6391e8',line,placeholder);
                }else{
                        colorize('#FE8C99',line,placeholder);
                    }
                }
            }
        );

        //Email VALIDATION
        input.addEventListener('input',(e)=>{
            if(e.target.type === 'email'){
                let inputText = e.target.value;
                if(validateEmail(inputText)){
                    //colorize
                    colorize('#6391e8',line,placeholder);
                }else{
                        colorize('#FE8C99',line,placeholder);
                    }
                }
            }
        );

        input.addEventListener('input',(e)=>{
            if(e.target.type === 'tel'){
                let inputText = e.target.value;
                if(validatePhone(inputText)){
                    //colorize
                    colorize('#6391e8',line,placeholder);
                }else{
                        colorize('#FE8C99',line,placeholder)
                    }
                }
            }
        )
    })
})

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

function validatePhone(phone) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
  }

function colorize(color,line,placeholder){
    gsap.to(line,{stroke:color,duration:0.75});
    gsap.to(placeholder,{color:color,duration:0.75})
}

//checkbox animation
const checkbox = document.querySelector('.checkbox');
const tl2 = gsap.timeline({defaults:{duration:0.5,ease:"Power2.easeOut"}});
const tickMarkPath = document.querySelector(".tick-mark path");
const pathLength = tickMarkPath.getTotalLength();

gsap.set(tickMarkPath,{strokeDashoffset:pathLength,strokeDasharray:pathLength});
checkbox.addEventListener('click',()=>{
    if (checkbox.checked){
        tl2.to('.checkbox-fill',{top:"0%    "});
        tl2.fromTo(tickMarkPath,{strokeDashoffset:pathLength},{strokeDashoffset:0},"<50%");
        tl2.to('.checkbox-label',{color:'#6391e8'},'<')
    }else{
        tl2.fromTo(tickMarkPath,{strokeDashoffset:0},{strokeDashoffset:pathLength},);
        tl2.to('.checkbox-fill',{top:"100%"},"<50%");
        
        tl2.to('.checkbox-label',{color:'#c5c5c5'},'<')
    }
})

//Animating character
const tl3 = gsap.timeline({defaults:{duration:0.5,ease:"Power2.easeOut"}});
gsap.set('#eye',{transformOrigin:'center'})
tl3.fromTo('#eye',{scale:1},{scale:0.7,repeat:-1,yoyo:true,repeatDelay:0.5,ease:"Power2.easeOut"});

tl3.fromTo('#eyebrow',{y:0},{y:-1,repeat:-1,yoyo:true,repeatDelay:0.5,ease:"Power2.easeOut"},'<');

//Submit
const button = document.querySelector('button');
const tl4 = gsap.timeline({defaults:{duration:0.5,ease:"Power2.easeOut"}});

button.addEventListener('click',(e)=>{
    e.preventDefault();
    tl4.to('.contact-right, .contact-left',{y:30,opacity:0,pointerEvents:"none"});
    tl4.to('form',{scale:0.8},'<');
    tl4.fromTo('.submitted',{opacity:0,y:30},{y:0,opacity:1});
    gsap.set('#hand',{transformOrigin:'left'})
    gsap.fromTo('#hand',{rotation:0,y:0},{rotation:-10,y:2,ease:'elastic(3,0.3)',duration:2,delay:1})
});