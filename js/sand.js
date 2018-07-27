var canvas,ctx,tim,tx,ty,brs,trs;
canvas = document.getElementsByTagName('canvas')[0];
ctx = canvas.getContext('2d');
canvas.width=window.innerWidth,
canvas.height=window.innerHeight-120;
tx=canvas.width/2;
ty=canvas.height/2;
aaa();

function dro(pt){
    var a,b,c,d,e,p,r,x,y,ebs,eds,q,o;
    for(a=0;a<pt.length;a++)pt[a].ch=0;
    q=[];
    for(a=0;a<pt.length;a++){
        b=pt[a];
        if(b.ch)continue;
        for(c=a+1;c<pt.length;c++){
            d=pt[c];
            if(b[0]==d[0] && b[1]==d[1]){
                d.ch=1;
                //b.ch=1;
            }
        }
        q.push([b[0],b[1],q.length,[],0,b]);
    }
    
    pt=q;
    
    
    a=10000;
    p=[];
    r=0;
    for(b=0;b<3;b++){
        x=tx+Math.cos(r)*a;
        y=ty+Math.sin(r)*a;
        p.push([x,y,-1]);
        r+=Math.PI*2/3;
    }
    
    trs=[tri(p)];
    for(a=0;a<pt.length;a++){
        b=pt[a];
        eds=[];
        
        q=[];
        for(c=0;c<trs.length;c++){
            d=trs[c];
            if(kyo(b,[d.x,d.y])<d.han){
                for(e=0;e<3;e++)eds.push(d.ed[e]);
            }else{
                q.push(d);
            }
            
        }
        
        trs=q;
        
        q=[];
        for(c=0;c<eds.length;c++){
            for(e=0;e<eds.length;e++){
                if(c!=e && iseq(eds[c],eds[e]))break;
                
            }//e
            if(e==eds.length)q.push(eds[c]);
            
        }//c
        
        for(c=0;c<q.length;c++){
            trs.push(tri([q[c][0],q[c][1],b]));
        }
    }//a
    
    
    q=[];
    
    for(a=0;a<trs.length;a++){
        
        b=trs[a].p;
        
        for(c=0;c<3;c++){
            if(b[c][2]==-1)break;
        }
        
        if(c==3)q.push(trs[a]);
    }
    
    trs=q;
    for(a=0;a<trs.length;a++){
        b=trs[a];
        b.ban=a;
        b.ch=[];
        for(c=0;c<3;c++){
            b.p[c][3].push(b);
            b.ch[b.p[c][2]]=1;
        }
    }
    
    for(a=0;a<pt.length;a++)junban(pt[a]);
    
    brs=[];
    for(a=0;a<pt.length;a++){
        p=[];
        b=pt[a][4];
        o={};
        for(c=0;c<b.length;c++){
            d=b[c];
            if(!d)break;
            p.push([d.x,d.y]);
        }
        
        if(!d)continue;
        o.p=p;
        o.m=pt[a][5];
        brs.push(o);
    }
}

function junban(u){
    var a,b,c,d,e,p,o,q,v;
    v=u[3];
    q=v[v.length-1];
    v.pop();
    p=[q];
    
    for(;;){
        e=0;
        for(a=0;a<v.length;a++){
            
            o=v[a];
            
            c=0;
            for(b=0;b<3;b++){
                d=q.p[b][2];
                if(o.ch[d])c++;
            }
            
            if(c>=2){
                e=1;
                p.push(o);
                v[a]=v[v.length-1];
                v.pop();
                q=o;
                break;
            }
        }//a
        if(!e || !v.length)break;
    }
    u[4]=p;
}

function iseq(p1,p2){
    if((p1[0]==p2[0] && p1[1]==p2[1]) || (p1[0]==p2[1] && p1[1]==p2[0]))return 1;
}

function tri(p){
    var a,b,c,o;
    o={};
    a=nai(p[0],p[1],p[2]);
    o.x=a[0];o.y=a[1];o.han=a[2];
    o.p=p;
    o.ed=[
        [p[0],p[1]],
        [p[1],p[2]],
        [p[2],p[0]]
    ];
    return o;
}

function nai(p1,p2,p3){
    var x,y,x1,y1,x2,y2,x3,y3,px,py,han;
    x1=p1[0];y1=p1[1];
    x2=p2[0];y2=p2[1];
    x3=p3[0];y3=p3[1];
    y=(x1-x3)*(x1*x1-x2*x2+y1*y1-y2*y2)-(x1-x2)*(x1*x1-x3*x3+y1*y1-y3*y3);
    y=y/(2*(x1-x3)*(y1-y2)-2*(x1-x2)*(y1-y3));
    x=(y1-y3)*(y1*y1-y2*y2+x1*x1-x2*x2)-(y1-y2)*(y1*y1-y3*y3+x1*x1-x3*x3);
    x=x/(2*(y1-y3)*(x1-x2)-2*(y1-y2)*(x1-x3));
    px=x-x1;py=y-y1;
    han=Math.pow(px*px+py*py,0.5);
    return [x,y,han];
}


function kyo(p1,p2){
    var x,y;
    x=p1[0]-p2[0];
    y=p1[1]-p2[1];
    return Math.pow(x*x+y*y,0.5);
}

function aaa(){
    var a,b,c,d,e,s,x,y,r,pt,max;
    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    tim=new Date().getTime()/300;
    
    pt=[];
    max=17;
    
    d=0;
    for(c=0;c<3;c++){
        r=(c-1.3)*tim/37*Math.PI*2+Math.E;
        for(a=0;a<max;a++){
            s=((a+c/3)/max-tim/49)%1;
            if(s<0)s+=1;
            s*=s;
            x=tx+Math.cos(r)*600*s;
            y=ty+Math.sin(r)*600*s;
            pt.push([x,y,a%2,s,d]);
            d++;
            r+=Math.PI*2/max*(5-c/3);
        }
    }
    
    dro(pt);
    
    for(a=0;a<brs.length;a++){
        b=brs[a];
        m=b.m;
        nnsen(b,m[4]);
    }
    requestAnimationFrame(aaa);
}


function getp(a,b,c){
    var x,y,d,e;
    if(c===undefined)c=0.5;
    e=[];
    for(d=0;d<a.length;d++){
        e.push((b[d]-a[d])*c+a[d]);
    }
    return e;
}

function hyouri(q){
    var a,b,c,d,e,h;
    a=q[0];b=q[1];c=q[2];
    d=[b[0]-a[0],b[1]-a[1],b[2]-a[2]];
    e=[c[0]-b[0],c[1]-b[1],c[2]-b[2]];
    h=d[0]*e[1]-d[1]*e[0];
    return h;
}

function nnsen(o,ban){
    var a,b,c,d,e,x,y,kx,ky,m,p,q,s;
    
    m=o.m;
    p=o.p;
    if(p.length<3)return;
    
    x=y=0;
    for(a=0;a<p.length;a++){
        b=p[a];
        x+=b[0];
        y+=b[1];
    }
    
    kx=x/p.length;
    ky=y/p.length;
    
    q=[];
    for(a=0;a<p.length;a++){
        b=p[a];
        x=b[0]-kx;
        y=b[1]-ky;
        q.push([x,y]);
    }
    
    e=Math.sin(ban+tim/129)*1.5;
    
    
    for(c=0;c<13;c++){
        s=1-(c+0.5)/13;
        ctx.save();
        ctx.translate(kx,ky);
        ctx.rotate(c/13*e);
        ctx.translate(-kx,-ky);
        ctx.beginPath();
        for(a=0;a<q.length;a++){
            b=q[a];
            ctx.lineTo(kx+b[0]*s,ky+b[1]*s);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
}

function kouten(p1,p2,p3,p4){
    var a,b,x,y;
    b=(p2[0]-p1[0])*(p4[1]-p3[1])-(p2[1]-p1[1])*(p4[0]-p3[0]);
    a=((p3[0]-p1[0])*(p4[1]-p3[1])-(p3[1]-p1[1])*(p4[0]-p3[0]))/b;
    x=p1[0]+(p2[0]-p1[0])*a;
    y=p1[1]+(p2[1]-p1[1])*a;
    return [x,y];
}