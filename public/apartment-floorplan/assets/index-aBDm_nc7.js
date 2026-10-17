(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Co="184",je={ROTATE:0,DOLLY:1,PAN:2},pn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},th=0,ml=1,eh=2,Ms=1,nh=2,xs=3,ui=0,Ke=1,Vn=2,Xn=0,ji=1,gl=2,_l=3,xl=4,ih=5,xi=100,sh=101,rh=102,ah=103,oh=104,lh=200,ch=201,uh=202,hh=203,Ca=204,Pa=205,dh=206,fh=207,ph=208,mh=209,gh=210,_h=211,xh=212,vh=213,Mh=214,La=0,Da=1,Ia=2,Ji=3,Ua=4,Na=5,Fa=6,Oa=7,Po=0,Sh=1,bh=2,Pn=0,$c=1,jc=2,Kc=3,Zc=4,Jc=5,Qc=6,Lo=7,tu=300,bi=301,Qi=302,Gr=303,Hr=304,Cr=306,gr=1e3,Wn=1001,Ba=1002,ze=1003,yh=1004,Ps=1005,We=1006,Vr=1007,Mi=1008,cn=1009,eu=1010,nu=1011,ys=1012,Do=1013,Dn=1014,Mn=1015,$n=1016,Io=1017,Uo=1018,Es=1020,iu=35902,su=35899,ru=1021,au=1022,Sn=1023,jn=1026,Si=1027,No=1028,Fo=1029,yi=1030,Oo=1031,Bo=1033,cr=33776,ur=33777,hr=33778,dr=33779,za=35840,ka=35841,Ga=35842,Ha=35843,Va=36196,Wa=37492,Xa=37496,qa=37488,Ya=37489,_r=37490,$a=37491,ja=37808,Ka=37809,Za=37810,Ja=37811,Qa=37812,to=37813,eo=37814,no=37815,io=37816,so=37817,ro=37818,ao=37819,oo=37820,lo=37821,co=36492,uo=36494,ho=36495,fo=36283,po=36284,xr=36285,mo=36286,Eh=3200,vr=0,Th=1,ai="",Qe="srgb",Mr="srgb-linear",Sr="linear",ie="srgb",Ri=7680,vl=519,wh=512,Ah=513,Rh=514,zo=515,Ch=516,Ph=517,ko=518,Lh=519,Ml=35044,Sl="300 es",Cn=2e3,Ts=2001;function Dh(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function br(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ih(){const n=br("canvas");return n.style.display="block",n}const bl={};function yl(...n){const t="THREE."+n.shift();console.log(t,...n)}function ou(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Dt(...n){n=ou(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Jt(...n){n=ou(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function go(...n){const t=n.join(" ");t in bl||(bl[t]=!0,Dt(...n))}function Uh(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const Nh={[La]:Da,[Ia]:Fa,[Ua]:Oa,[Ji]:Na,[Da]:La,[Fa]:Ia,[Oa]:Ua,[Na]:Ji};class hi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ge=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let El=1234567;const Ss=Math.PI/180,ws=180/Math.PI;function is(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ge[n&255]+Ge[n>>8&255]+Ge[n>>16&255]+Ge[n>>24&255]+"-"+Ge[t&255]+Ge[t>>8&255]+"-"+Ge[t>>16&15|64]+Ge[t>>24&255]+"-"+Ge[e&63|128]+Ge[e>>8&255]+"-"+Ge[e>>16&255]+Ge[e>>24&255]+Ge[i&255]+Ge[i>>8&255]+Ge[i>>16&255]+Ge[i>>24&255]).toLowerCase()}function qt(n,t,e){return Math.max(t,Math.min(e,n))}function Go(n,t){return(n%t+t)%t}function Fh(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Oh(n,t,e){return n!==t?(e-n)/(t-n):0}function bs(n,t,e){return(1-e)*n+e*t}function Bh(n,t,e,i){return bs(n,t,1-Math.exp(-e*i))}function zh(n,t=1){return t-Math.abs(Go(n,t*2)-t)}function kh(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Gh(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Hh(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Vh(n,t){return n+Math.random()*(t-n)}function Wh(n){return n*(.5-Math.random())}function Xh(n){n!==void 0&&(El=n);let t=El+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function qh(n){return n*Ss}function Yh(n){return n*ws}function $h(n){return(n&n-1)===0&&n!==0}function jh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Kh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Zh(n,t,e,i,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+i)/2),h=a((t+i)/2),p=r((t-i)/2),u=a((t-i)/2),_=r((i-t)/2),g=a((i-t)/2);switch(s){case"XYX":n.set(o*h,c*p,c*u,o*l);break;case"YZY":n.set(c*u,o*h,c*p,o*l);break;case"ZXZ":n.set(c*p,c*u,o*h,o*l);break;case"XZX":n.set(o*h,c*g,c*_,o*l);break;case"YXY":n.set(c*_,o*h,c*g,o*l);break;case"ZYZ":n.set(c*g,c*_,o*h,o*l);break;default:Dt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Xi(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ye(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const tn={DEG2RAD:Ss,RAD2DEG:ws,generateUUID:is,clamp:qt,euclideanModulo:Go,mapLinear:Fh,inverseLerp:Oh,lerp:bs,damp:Bh,pingpong:zh,smoothstep:kh,smootherstep:Gh,randInt:Hh,randFloat:Vh,randFloatSpread:Wh,seededRandom:Xh,degToRad:qh,radToDeg:Yh,isPowerOfTwo:$h,ceilPowerOfTwo:jh,floorPowerOfTwo:Kh,setQuaternionFromProperEuler:Zh,normalize:Ye,denormalize:Xi},nl=class nl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};nl.prototype.isVector2=!0;let Nt=nl;class Kn{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let c=i[s+0],l=i[s+1],h=i[s+2],p=i[s+3],u=r[a+0],_=r[a+1],g=r[a+2],x=r[a+3];if(p!==x||c!==u||l!==_||h!==g){let f=c*u+l*_+h*g+p*x;f<0&&(u=-u,_=-_,g=-g,x=-x,f=-f);let d=1-o;if(f<.9995){const M=Math.acos(f),w=Math.sin(M);d=Math.sin(d*M)/w,o=Math.sin(o*M)/w,c=c*d+u*o,l=l*d+_*o,h=h*d+g*o,p=p*d+x*o}else{c=c*d+u*o,l=l*d+_*o,h=h*d+g*o,p=p*d+x*o;const M=1/Math.sqrt(c*c+l*l+h*h+p*p);c*=M,l*=M,h*=M,p*=M}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=p}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],p=r[a],u=r[a+1],_=r[a+2],g=r[a+3];return t[e]=o*g+h*p+c*_-l*u,t[e+1]=c*g+h*u+l*p-o*_,t[e+2]=l*g+h*_+o*u-c*p,t[e+3]=h*g-o*p-c*u-l*_,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),p=o(r/2),u=c(i/2),_=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=u*h*p+l*_*g,this._y=l*_*p-u*h*g,this._z=l*h*g+u*_*p,this._w=l*h*p-u*_*g;break;case"YXZ":this._x=u*h*p+l*_*g,this._y=l*_*p-u*h*g,this._z=l*h*g-u*_*p,this._w=l*h*p+u*_*g;break;case"ZXY":this._x=u*h*p-l*_*g,this._y=l*_*p+u*h*g,this._z=l*h*g+u*_*p,this._w=l*h*p-u*_*g;break;case"ZYX":this._x=u*h*p-l*_*g,this._y=l*_*p+u*h*g,this._z=l*h*g-u*_*p,this._w=l*h*p+u*_*g;break;case"YZX":this._x=u*h*p+l*_*g,this._y=l*_*p+u*h*g,this._z=l*h*g-u*_*p,this._w=l*h*p-u*_*g;break;case"XZY":this._x=u*h*p-l*_*g,this._y=l*_*p-u*h*g,this._z=l*h*g+u*_*p,this._w=l*h*p+u*_*g;break;default:Dt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],p=e[10],u=i+o+p;if(u>0){const _=.5/Math.sqrt(u+1);this._w=.25/_,this._x=(h-c)*_,this._y=(r-l)*_,this._z=(a-s)*_}else if(i>o&&i>p){const _=2*Math.sqrt(1+i-o-p);this._w=(h-c)/_,this._x=.25*_,this._y=(s+a)/_,this._z=(r+l)/_}else if(o>p){const _=2*Math.sqrt(1+o-i-p);this._w=(r-l)/_,this._x=(s+a)/_,this._y=.25*_,this._z=(c+h)/_}else{const _=2*Math.sqrt(1+p-i-o);this._w=(a-s)/_,this._x=(r+l)/_,this._y=(c+h)/_,this._z=.25*_}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-s*o,this._w=a*h-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const il=class il{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Tl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Tl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*i),h=2*(o*e-r*s),p=2*(r*i-a*e);return this.x=e+c*l+a*p-o*h,this.y=i+c*h+o*l-r*p,this.z=s+c*p+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Wr.copy(this).projectOnVector(t),this.sub(Wr)}reflect(t){return this.sub(Wr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};il.prototype.isVector3=!0;let D=il;const Wr=new D,Tl=new Kn,sl=class sl{constructor(t,e,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l)}set(t,e,i,s,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],p=i[7],u=i[2],_=i[5],g=i[8],x=s[0],f=s[3],d=s[6],M=s[1],w=s[4],T=s[7],P=s[2],A=s[5],y=s[8];return r[0]=a*x+o*M+c*P,r[3]=a*f+o*w+c*A,r[6]=a*d+o*T+c*y,r[1]=l*x+h*M+p*P,r[4]=l*f+h*w+p*A,r[7]=l*d+h*T+p*y,r[2]=u*x+_*M+g*P,r[5]=u*f+_*w+g*A,r[8]=u*d+_*T+g*y,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-i*r*h+i*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],p=h*a-o*l,u=o*c-h*r,_=l*r-a*c,g=e*p+i*u+s*_;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=p*x,t[1]=(s*l-h*i)*x,t[2]=(o*i-s*a)*x,t[3]=u*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-o*e)*x,t[6]=_*x,t[7]=(i*c-l*e)*x,t[8]=(a*e-i*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Xr.makeScale(t,e)),this}rotate(t){return this.premultiply(Xr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Xr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};sl.prototype.isMatrix3=!0;let kt=sl;const Xr=new kt,wl=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Al=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Jh(){const n={enabled:!0,workingColorSpace:Mr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ie&&(s.r=qn(s.r),s.g=qn(s.g),s.b=qn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ie&&(s.r=Ki(s.r),s.g=Ki(s.g),s.b=Ki(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ai?Sr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return go("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return go("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Mr]:{primaries:t,whitePoint:i,transfer:Sr,toXYZ:wl,fromXYZ:Al,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Qe},outputColorSpaceConfig:{drawingBufferColorSpace:Qe}},[Qe]:{primaries:t,whitePoint:i,transfer:ie,toXYZ:wl,fromXYZ:Al,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Qe}}}),n}const Kt=Jh();function qn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ki(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ci;class Qh{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Ci===void 0&&(Ci=br("canvas")),Ci.width=t.width,Ci.height=t.height;const s=Ci.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Ci}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=br("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=qn(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(qn(e[i]/255)*255):e[i]=qn(e[i]);return{data:e,width:t.width,height:t.height}}else return Dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let td=0;class Ho{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=is(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(qr(s[a].image)):r.push(qr(s[a]))}else r=qr(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function qr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Qh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Dt("Texture: Unable to serialize Texture."),{})}let ed=0;const Yr=new D;class qe extends hi{constructor(t=qe.DEFAULT_IMAGE,e=qe.DEFAULT_MAPPING,i=Wn,s=Wn,r=We,a=Mi,o=Sn,c=cn,l=qe.DEFAULT_ANISOTROPY,h=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=is(),this.name="",this.source=new Ho(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Nt(0,0),this.repeat=new Nt(1,1),this.center=new Nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Yr).x}get height(){return this.source.getSize(Yr).y}get depth(){return this.source.getSize(Yr).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Dt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==tu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case gr:t.x=t.x-Math.floor(t.x);break;case Wn:t.x=t.x<0?0:1;break;case Ba:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case gr:t.y=t.y-Math.floor(t.y);break;case Wn:t.y=t.y<0?0:1;break;case Ba:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}qe.DEFAULT_IMAGE=null;qe.DEFAULT_MAPPING=tu;qe.DEFAULT_ANISOTROPY=1;const rl=class rl{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],h=c[4],p=c[8],u=c[1],_=c[5],g=c[9],x=c[2],f=c[6],d=c[10];if(Math.abs(h-u)<.01&&Math.abs(p-x)<.01&&Math.abs(g-f)<.01){if(Math.abs(h+u)<.1&&Math.abs(p+x)<.1&&Math.abs(g+f)<.1&&Math.abs(l+_+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(l+1)/2,T=(_+1)/2,P=(d+1)/2,A=(h+u)/4,y=(p+x)/4,m=(g+f)/4;return w>T&&w>P?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=A/i,r=y/i):T>P?T<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),i=A/s,r=m/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=y/r,s=m/r),this.set(i,s,r,e),this}let M=Math.sqrt((f-g)*(f-g)+(p-x)*(p-x)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(f-g)/M,this.y=(p-x)/M,this.z=(u-h)/M,this.w=Math.acos((l+_+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this.w=qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this.w=qt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};rl.prototype.isVector4=!0;let Ee=rl;class nd extends hi{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:We,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ee(0,0,t,e),this.scissorTest=!1,this.viewport=new Ee(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new qe(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:We,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ho(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ln extends nd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class lu extends qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class id extends qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Rr=class Rr{constructor(t,e,i,s,r,a,o,c,l,h,p,u,_,g,x,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l,h,p,u,_,g,x,f)}set(t,e,i,s,r,a,o,c,l,h,p,u,_,g,x,f){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=p,d[14]=u,d[3]=_,d[7]=g,d[11]=x,d[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Rr().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,i=t.elements,s=1/Pi.setFromMatrixColumn(t,0).length(),r=1/Pi.setFromMatrixColumn(t,1).length(),a=1/Pi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){const u=a*h,_=a*p,g=o*h,x=o*p;e[0]=c*h,e[4]=-c*p,e[8]=l,e[1]=_+g*l,e[5]=u-x*l,e[9]=-o*c,e[2]=x-u*l,e[6]=g+_*l,e[10]=a*c}else if(t.order==="YXZ"){const u=c*h,_=c*p,g=l*h,x=l*p;e[0]=u+x*o,e[4]=g*o-_,e[8]=a*l,e[1]=a*p,e[5]=a*h,e[9]=-o,e[2]=_*o-g,e[6]=x+u*o,e[10]=a*c}else if(t.order==="ZXY"){const u=c*h,_=c*p,g=l*h,x=l*p;e[0]=u-x*o,e[4]=-a*p,e[8]=g+_*o,e[1]=_+g*o,e[5]=a*h,e[9]=x-u*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const u=a*h,_=a*p,g=o*h,x=o*p;e[0]=c*h,e[4]=g*l-_,e[8]=u*l+x,e[1]=c*p,e[5]=x*l+u,e[9]=_*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const u=a*c,_=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=x-u*p,e[8]=g*p+_,e[1]=p,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=_*p+g,e[10]=u-x*p}else if(t.order==="XZY"){const u=a*c,_=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=-p,e[8]=l*h,e[1]=u*p+x,e[5]=a*h,e[9]=_*p-g,e[2]=g*p-_,e[6]=o*h,e[10]=x*p+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(sd,t,rd)}lookAt(t,e,i){const s=this.elements;return rn.subVectors(t,e),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),ti.crossVectors(i,rn),ti.lengthSq()===0&&(Math.abs(i.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),ti.crossVectors(i,rn)),ti.normalize(),Ls.crossVectors(rn,ti),s[0]=ti.x,s[4]=Ls.x,s[8]=rn.x,s[1]=ti.y,s[5]=Ls.y,s[9]=rn.y,s[2]=ti.z,s[6]=Ls.z,s[10]=rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],p=i[5],u=i[9],_=i[13],g=i[2],x=i[6],f=i[10],d=i[14],M=i[3],w=i[7],T=i[11],P=i[15],A=s[0],y=s[4],m=s[8],S=s[12],C=s[1],R=s[5],I=s[9],G=s[13],X=s[2],U=s[6],H=s[10],O=s[14],Q=s[3],nt=s[7],ft=s[11],wt=s[15];return r[0]=a*A+o*C+c*X+l*Q,r[4]=a*y+o*R+c*U+l*nt,r[8]=a*m+o*I+c*H+l*ft,r[12]=a*S+o*G+c*O+l*wt,r[1]=h*A+p*C+u*X+_*Q,r[5]=h*y+p*R+u*U+_*nt,r[9]=h*m+p*I+u*H+_*ft,r[13]=h*S+p*G+u*O+_*wt,r[2]=g*A+x*C+f*X+d*Q,r[6]=g*y+x*R+f*U+d*nt,r[10]=g*m+x*I+f*H+d*ft,r[14]=g*S+x*G+f*O+d*wt,r[3]=M*A+w*C+T*X+P*Q,r[7]=M*y+w*R+T*U+P*nt,r[11]=M*m+w*I+T*H+P*ft,r[15]=M*S+w*G+T*O+P*wt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],p=t[6],u=t[10],_=t[14],g=t[3],x=t[7],f=t[11],d=t[15],M=c*_-l*u,w=o*_-l*p,T=o*u-c*p,P=a*_-l*h,A=a*u-c*h,y=a*p-o*h;return e*(x*M-f*w+d*T)-i*(g*M-f*P+d*A)+s*(g*w-x*P+d*y)-r*(g*T-x*A+f*y)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],p=t[9],u=t[10],_=t[11],g=t[12],x=t[13],f=t[14],d=t[15],M=e*o-i*a,w=e*c-s*a,T=e*l-r*a,P=i*c-s*o,A=i*l-r*o,y=s*l-r*c,m=h*x-p*g,S=h*f-u*g,C=h*d-_*g,R=p*f-u*x,I=p*d-_*x,G=u*d-_*f,X=M*G-w*I+T*R+P*C-A*S+y*m;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/X;return t[0]=(o*G-c*I+l*R)*U,t[1]=(s*I-i*G-r*R)*U,t[2]=(x*y-f*A+d*P)*U,t[3]=(u*A-p*y-_*P)*U,t[4]=(c*C-a*G-l*S)*U,t[5]=(e*G-s*C+r*S)*U,t[6]=(f*T-g*y-d*w)*U,t[7]=(h*y-u*T+_*w)*U,t[8]=(a*I-o*C+l*m)*U,t[9]=(i*C-e*I-r*m)*U,t[10]=(g*A-x*T+d*M)*U,t[11]=(p*T-h*A-_*M)*U,t[12]=(o*S-a*R-c*m)*U,t[13]=(e*R-i*S+s*m)*U,t[14]=(x*w-g*P-f*M)*U,t[15]=(h*P-p*w+u*M)*U,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,p=o+o,u=r*l,_=r*h,g=r*p,x=a*h,f=a*p,d=o*p,M=c*l,w=c*h,T=c*p,P=i.x,A=i.y,y=i.z;return s[0]=(1-(x+d))*P,s[1]=(_+T)*P,s[2]=(g-w)*P,s[3]=0,s[4]=(_-T)*A,s[5]=(1-(u+d))*A,s[6]=(f+M)*A,s[7]=0,s[8]=(g+w)*y,s[9]=(f-M)*y,s[10]=(1-(u+x))*y,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),e.identity(),this;let a=Pi.set(s[0],s[1],s[2]).length();const o=Pi.set(s[4],s[5],s[6]).length(),c=Pi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),gn.copy(this);const l=1/a,h=1/o,p=1/c;return gn.elements[0]*=l,gn.elements[1]*=l,gn.elements[2]*=l,gn.elements[4]*=h,gn.elements[5]*=h,gn.elements[6]*=h,gn.elements[8]*=p,gn.elements[9]*=p,gn.elements[10]*=p,e.setFromRotationMatrix(gn),i.x=a,i.y=o,i.z=c,this}makePerspective(t,e,i,s,r,a,o=Cn,c=!1){const l=this.elements,h=2*r/(e-t),p=2*r/(i-s),u=(e+t)/(e-t),_=(i+s)/(i-s);let g,x;if(c)g=r/(a-r),x=a*r/(a-r);else if(o===Cn)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Ts)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=p,l[9]=_,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Cn,c=!1){const l=this.elements,h=2/(e-t),p=2/(i-s),u=-(e+t)/(e-t),_=-(i+s)/(i-s);let g,x;if(c)g=1/(a-r),x=a/(a-r);else if(o===Cn)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===Ts)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=p,l[9]=0,l[13]=_,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Rr.prototype.isMatrix4=!0;let ce=Rr;const Pi=new D,gn=new ce,sd=new D(0,0,0),rd=new D(1,1,1),ti=new D,Ls=new D,rn=new D,Rl=new ce,Cl=new Kn;class In{constructor(t=0,e=0,i=0,s=In.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],p=s[2],u=s[6],_=s[10];switch(e){case"XYZ":this._y=Math.asin(qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,_),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,_),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,_),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-qt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,_),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(o,_));break;case"XZY":this._z=Math.asin(-qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,_),this._y=0);break;default:Dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Rl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Rl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Cl.setFromEuler(this),this.setFromQuaternion(Cl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}In.DEFAULT_ORDER="XYZ";class Vo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ad=0;const Pl=new D,Li=new Kn,On=new ce,Ds=new D,ls=new D,od=new D,ld=new Kn,Ll=new D(1,0,0),Dl=new D(0,1,0),Il=new D(0,0,1),Ul={type:"added"},cd={type:"removed"},Di={type:"childadded",child:null},$r={type:"childremoved",child:null};class Re extends hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=is(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Re.DEFAULT_UP.clone();const t=new D,e=new In,i=new Kn,s=new D(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ce},normalMatrix:{value:new kt}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=Re.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.multiply(Li),this}rotateOnWorldAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.premultiply(Li),this}rotateX(t){return this.rotateOnAxis(Ll,t)}rotateY(t){return this.rotateOnAxis(Dl,t)}rotateZ(t){return this.rotateOnAxis(Il,t)}translateOnAxis(t,e){return Pl.copy(t).applyQuaternion(this.quaternion),this.position.add(Pl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ll,t)}translateY(t){return this.translateOnAxis(Dl,t)}translateZ(t){return this.translateOnAxis(Il,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ds.copy(t):Ds.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?On.lookAt(ls,Ds,this.up):On.lookAt(Ds,ls,this.up),this.quaternion.setFromRotationMatrix(On),s&&(On.extractRotation(s.matrixWorld),Li.setFromRotationMatrix(On),this.quaternion.premultiply(Li.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ul),Di.child=t,this.dispatchEvent(Di),Di.child=null):Jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(cd),$r.child=t,this.dispatchEvent($r),$r.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),On.multiply(t.parent.matrixWorld)),t.applyMatrix4(On),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ul),Di.child=t,this.dispatchEvent(Di),Di.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,t,od),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,ld,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const p=c[l];r(t.shapes,p)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),p=a(t.shapes),u=a(t.skeletons),_=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),p.length>0&&(i.shapes=p),u.length>0&&(i.skeletons=u),_.length>0&&(i.animations=_),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Re.DEFAULT_UP=new D(0,1,0);Re.DEFAULT_MATRIX_AUTO_UPDATE=!0;Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Zt extends Re{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ud={type:"move"};class jr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const f=e.getJointPose(x,i),d=this._getHandJoint(l,x);f!==null&&(d.matrix.fromArray(f.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=f.radius),d.visible=f!==null}const h=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],u=h.position.distanceTo(p.position),_=.02,g=.005;l.inputState.pinching&&u>_+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=_-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ud)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Zt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const cu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ei={h:0,s:0,l:0},Is={h:0,s:0,l:0};function Kr(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Bt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Kt.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=Kt.workingColorSpace){if(t=Go(t,1),e=qt(e,0,1),i=qt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Kr(a,r,t+1/3),this.g=Kr(a,r,t),this.b=Kr(a,r,t-1/3)}return Kt.colorSpaceToWorking(this,s),this}setStyle(t,e=Qe){function i(r){r!==void 0&&parseFloat(r)<1&&Dt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Dt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Dt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qe){const i=cu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Dt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=qn(t.r),this.g=qn(t.g),this.b=qn(t.b),this}copyLinearToSRGB(t){return this.r=Ki(t.r),this.g=Ki(t.g),this.b=Ki(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qe){return Kt.workingToColorSpace(He.copy(this),t),Math.round(qt(He.r*255,0,255))*65536+Math.round(qt(He.g*255,0,255))*256+Math.round(qt(He.b*255,0,255))}getHexString(t=Qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.workingToColorSpace(He.copy(this),e);const i=He.r,s=He.g,r=He.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const p=a-o;switch(l=h<=.5?p/(a+o):p/(2-a-o),a){case i:c=(s-r)/p+(s<r?6:0);break;case s:c=(r-i)/p+2;break;case r:c=(i-s)/p+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.workingToColorSpace(He.copy(this),e),t.r=He.r,t.g=He.g,t.b=He.b,t}getStyle(t=Qe){Kt.workingToColorSpace(He.copy(this),t);const e=He.r,i=He.g,s=He.b;return t!==Qe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(ei),this.setHSL(ei.h+t,ei.s+e,ei.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ei),t.getHSL(Is);const i=bs(ei.h,Is.h,e),s=bs(ei.s,Is.s,e),r=bs(ei.l,Is.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const He=new Bt;Bt.NAMES=cu;class Wo{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Bt(t),this.near=e,this.far=i}clone(){return new Wo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class uu extends Re{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const _n=new D,Bn=new D,Zr=new D,zn=new D,Ii=new D,Ui=new D,Nl=new D,Jr=new D,Qr=new D,ta=new D,ea=new Ee,na=new Ee,ia=new Ee;class vn{constructor(t=new D,e=new D,i=new D){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),_n.subVectors(t,e),s.cross(_n);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){_n.subVectors(s,e),Bn.subVectors(i,e),Zr.subVectors(t,e);const a=_n.dot(_n),o=_n.dot(Bn),c=_n.dot(Zr),l=Bn.dot(Bn),h=Bn.dot(Zr),p=a*l-o*o;if(p===0)return r.set(0,0,0),null;const u=1/p,_=(l*c-o*h)*u,g=(a*h-o*c)*u;return r.set(1-_-g,g,_)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(t,e,i,s,r,a,o,c){return this.getBarycoord(t,e,i,s,zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,zn.x),c.addScaledVector(a,zn.y),c.addScaledVector(o,zn.z),c)}static getInterpolatedAttribute(t,e,i,s,r,a){return ea.setScalar(0),na.setScalar(0),ia.setScalar(0),ea.fromBufferAttribute(t,e),na.fromBufferAttribute(t,i),ia.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(ea,r.x),a.addScaledVector(na,r.y),a.addScaledVector(ia,r.z),a}static isFrontFacing(t,e,i,s){return _n.subVectors(i,e),Bn.subVectors(t,e),_n.cross(Bn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return _n.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),_n.cross(Bn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return vn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return vn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return vn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return vn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return vn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;Ii.subVectors(s,i),Ui.subVectors(r,i),Jr.subVectors(t,i);const c=Ii.dot(Jr),l=Ui.dot(Jr);if(c<=0&&l<=0)return e.copy(i);Qr.subVectors(t,s);const h=Ii.dot(Qr),p=Ui.dot(Qr);if(h>=0&&p<=h)return e.copy(s);const u=c*p-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(i).addScaledVector(Ii,a);ta.subVectors(t,r);const _=Ii.dot(ta),g=Ui.dot(ta);if(g>=0&&_<=g)return e.copy(r);const x=_*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(i).addScaledVector(Ui,o);const f=h*g-_*p;if(f<=0&&p-h>=0&&_-g>=0)return Nl.subVectors(r,s),o=(p-h)/(p-h+(_-g)),e.copy(s).addScaledVector(Nl,o);const d=1/(f+x+u);return a=x*d,o=u*d,e.copy(i).addScaledVector(Ii,a).addScaledVector(Ui,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class bn{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(xn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(xn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,xn):xn.fromBufferAttribute(r,a),xn.applyMatrix4(t.matrixWorld),this.expandByPoint(xn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Us.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Us.copy(i.boundingBox)),Us.applyMatrix4(t.matrixWorld),this.union(Us)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xn),xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(cs),Ns.subVectors(this.max,cs),Ni.subVectors(t.a,cs),Fi.subVectors(t.b,cs),Oi.subVectors(t.c,cs),ni.subVectors(Fi,Ni),ii.subVectors(Oi,Fi),fi.subVectors(Ni,Oi);let e=[0,-ni.z,ni.y,0,-ii.z,ii.y,0,-fi.z,fi.y,ni.z,0,-ni.x,ii.z,0,-ii.x,fi.z,0,-fi.x,-ni.y,ni.x,0,-ii.y,ii.x,0,-fi.y,fi.x,0];return!sa(e,Ni,Fi,Oi,Ns)||(e=[1,0,0,0,1,0,0,0,1],!sa(e,Ni,Fi,Oi,Ns))?!1:(Fs.crossVectors(ni,ii),e=[Fs.x,Fs.y,Fs.z],sa(e,Ni,Fi,Oi,Ns))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const kn=[new D,new D,new D,new D,new D,new D,new D,new D],xn=new D,Us=new bn,Ni=new D,Fi=new D,Oi=new D,ni=new D,ii=new D,fi=new D,cs=new D,Ns=new D,Fs=new D,pi=new D;function sa(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){pi.fromArray(n,r);const o=s.x*Math.abs(pi.x)+s.y*Math.abs(pi.y)+s.z*Math.abs(pi.z),c=t.dot(pi),l=e.dot(pi),h=i.dot(pi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Pe=new D,Os=new Nt;let hd=0;class mn extends hi{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ml,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Os.fromBufferAttribute(this,e),Os.applyMatrix3(t),this.setXY(e,Os.x,Os.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix3(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix4(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyNormalMatrix(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.transformDirection(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Xi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ye(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Xi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Xi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Xi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Xi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ye(e,this.array),i=Ye(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ye(e,this.array),i=Ye(i,this.array),s=Ye(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Ye(e,this.array),i=Ye(i,this.array),s=Ye(s,this.array),r=Ye(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ml&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class hu extends mn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class du extends mn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Ce extends mn{constructor(t,e,i){super(new Float32Array(t),e,i)}}const dd=new bn,us=new D,ra=new D;class ss{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):dd.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;us.subVectors(t,this.center);const e=us.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(us,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ra.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(us.copy(t.center).add(ra)),this.expandByPoint(us.copy(t.center).sub(ra))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let fd=0;const fn=new ce,aa=new Re,Bi=new D,an=new bn,hs=new bn,Fe=new D;class Ze extends hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=is(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Dh(t)?du:hu)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new kt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return fn.makeRotationFromQuaternion(t),this.applyMatrix4(fn),this}rotateX(t){return fn.makeRotationX(t),this.applyMatrix4(fn),this}rotateY(t){return fn.makeRotationY(t),this.applyMatrix4(fn),this}rotateZ(t){return fn.makeRotationZ(t),this.applyMatrix4(fn),this}translate(t,e,i){return fn.makeTranslation(t,e,i),this.applyMatrix4(fn),this}scale(t,e,i){return fn.makeScale(t,e,i),this.applyMatrix4(fn),this}lookAt(t){return aa.lookAt(t),aa.updateMatrix(),this.applyMatrix4(aa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ce(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];an.setFromBufferAttribute(r),this.morphTargetsRelative?(Fe.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(Fe),Fe.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(Fe)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ss);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const i=this.boundingSphere.center;if(an.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];hs.setFromBufferAttribute(o),this.morphTargetsRelative?(Fe.addVectors(an.min,hs.min),an.expandByPoint(Fe),Fe.addVectors(an.max,hs.max),an.expandByPoint(Fe)):(an.expandByPoint(hs.min),an.expandByPoint(hs.max))}an.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Fe.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Fe));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Fe.fromBufferAttribute(o,l),c&&(Bi.fromBufferAttribute(t,l),Fe.add(Bi)),s=Math.max(s,i.distanceToSquared(Fe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let m=0;m<i.count;m++)o[m]=new D,c[m]=new D;const l=new D,h=new D,p=new D,u=new Nt,_=new Nt,g=new Nt,x=new D,f=new D;function d(m,S,C){l.fromBufferAttribute(i,m),h.fromBufferAttribute(i,S),p.fromBufferAttribute(i,C),u.fromBufferAttribute(r,m),_.fromBufferAttribute(r,S),g.fromBufferAttribute(r,C),h.sub(l),p.sub(l),_.sub(u),g.sub(u);const R=1/(_.x*g.y-g.x*_.y);isFinite(R)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(p,-_.y).multiplyScalar(R),f.copy(p).multiplyScalar(_.x).addScaledVector(h,-g.x).multiplyScalar(R),o[m].add(x),o[S].add(x),o[C].add(x),c[m].add(f),c[S].add(f),c[C].add(f))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let m=0,S=M.length;m<S;++m){const C=M[m],R=C.start,I=C.count;for(let G=R,X=R+I;G<X;G+=3)d(t.getX(G+0),t.getX(G+1),t.getX(G+2))}const w=new D,T=new D,P=new D,A=new D;function y(m){P.fromBufferAttribute(s,m),A.copy(P);const S=o[m];w.copy(S),w.sub(P.multiplyScalar(P.dot(S))).normalize(),T.crossVectors(A,S);const R=T.dot(c[m])<0?-1:1;a.setXYZW(m,w.x,w.y,w.z,R)}for(let m=0,S=M.length;m<S;++m){const C=M[m],R=C.start,I=C.count;for(let G=R,X=R+I;G<X;G+=3)y(t.getX(G+0)),y(t.getX(G+1)),y(t.getX(G+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new mn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,_=i.count;u<_;u++)i.setXYZ(u,0,0,0);const s=new D,r=new D,a=new D,o=new D,c=new D,l=new D,h=new D,p=new D;if(t)for(let u=0,_=t.count;u<_;u+=3){const g=t.getX(u+0),x=t.getX(u+1),f=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,f),h.subVectors(a,r),p.subVectors(s,r),h.cross(p),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,f),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(f,l.x,l.y,l.z)}else for(let u=0,_=e.count;u<_;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),p.subVectors(s,r),h.cross(p),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Fe.fromBufferAttribute(t,e),Fe.normalize(),t.setXYZ(e,Fe.x,Fe.y,Fe.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,p=o.normalized,u=new l.constructor(c.length*h);let _=0,g=0;for(let x=0,f=c.length;x<f;x++){o.isInterleavedBufferAttribute?_=c[x]*o.data.stride+o.offset:_=c[x]*h;for(let d=0;d<h;d++)u[g++]=l[_++]}return new mn(u,h,p)}if(this.index===null)return Dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ze,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,i);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,p=l.length;h<p;h++){const u=l[h],_=t(u,i);c.push(_)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let p=0,u=l.length;p<u;p++){const _=l[p];h.push(_.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],p=r[l];for(let u=0,_=p.length;u<_;u++)h.push(p[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const p=a[l];this.addGroup(p.start,p.count,p.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let pd=0;class Ti extends hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pd++}),this.uuid=is(),this.name="",this.type="Material",this.blending=ji,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ca,this.blendDst=Pa,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=Ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ri,this.stencilZFail=Ri,this.stencilZPass=Ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Dt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ji&&(i.blending=this.blending),this.side!==ui&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ca&&(i.blendSrc=this.blendSrc),this.blendDst!==Pa&&(i.blendDst=this.blendDst),this.blendEquation!==xi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ji&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ri&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ri&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ri&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Gn=new D,oa=new D,Bs=new D,si=new D,la=new D,zs=new D,ca=new D;class Pr{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Gn.copy(this.origin).addScaledVector(this.direction,e),Gn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){oa.copy(t).add(e).multiplyScalar(.5),Bs.copy(e).sub(t).normalize(),si.copy(this.origin).sub(oa);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Bs),o=si.dot(this.direction),c=-si.dot(Bs),l=si.lengthSq(),h=Math.abs(1-a*a);let p,u,_,g;if(h>0)if(p=a*c-o,u=a*o-c,g=r*h,p>=0)if(u>=-g)if(u<=g){const x=1/h;p*=x,u*=x,_=p*(p+a*u+2*o)+u*(a*p+u+2*c)+l}else u=r,p=Math.max(0,-(a*u+o)),_=-p*p+u*(u+2*c)+l;else u=-r,p=Math.max(0,-(a*u+o)),_=-p*p+u*(u+2*c)+l;else u<=-g?(p=Math.max(0,-(-a*r+o)),u=p>0?-r:Math.min(Math.max(-r,-c),r),_=-p*p+u*(u+2*c)+l):u<=g?(p=0,u=Math.min(Math.max(-r,-c),r),_=u*(u+2*c)+l):(p=Math.max(0,-(a*r+o)),u=p>0?r:Math.min(Math.max(-r,-c),r),_=-p*p+u*(u+2*c)+l);else u=a>0?-r:r,p=Math.max(0,-(a*u+o)),_=-p*p+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(oa).addScaledVector(Bs,u),_}intersectSphere(t,e){Gn.subVectors(t.center,this.origin);const i=Gn.dot(this.direction),s=Gn.dot(Gn)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,u=this.origin;return l>=0?(i=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(i=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),p>=0?(o=(t.min.z-u.z)*p,c=(t.max.z-u.z)*p):(o=(t.max.z-u.z)*p,c=(t.min.z-u.z)*p),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Gn)!==null}intersectTriangle(t,e,i,s,r){la.subVectors(e,t),zs.subVectors(i,t),ca.crossVectors(la,zs);let a=this.direction.dot(ca),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;si.subVectors(this.origin,t);const c=o*this.direction.dot(zs.crossVectors(si,zs));if(c<0)return null;const l=o*this.direction.dot(la.cross(si));if(l<0||c+l>a)return null;const h=-o*si.dot(ca);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xo extends Ti{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Po,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Fl=new ce,mi=new Pr,ks=new ss,Ol=new D,Gs=new D,Hs=new D,Vs=new D,ua=new D,Ws=new D,Bl=new D,Xs=new D;class Qt extends Re{constructor(t=new Ze,e=new Xo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Ws.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],p=r[c];h!==0&&(ua.fromBufferAttribute(p,t),a?Ws.addScaledVector(ua,h):Ws.addScaledVector(ua.sub(e),h))}e.add(Ws)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ks.copy(i.boundingSphere),ks.applyMatrix4(r),mi.copy(t.ray).recast(t.near),!(ks.containsPoint(mi.origin)===!1&&(mi.intersectSphere(ks,Ol)===null||mi.origin.distanceToSquared(Ol)>(t.far-t.near)**2))&&(Fl.copy(r).invert(),mi.copy(t.ray).applyMatrix4(Fl),!(i.boundingBox!==null&&mi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,mi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,p=r.attributes.normal,u=r.groups,_=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const f=u[g],d=a[f.materialIndex],M=Math.max(f.start,_.start),w=Math.min(o.count,Math.min(f.start+f.count,_.start+_.count));for(let T=M,P=w;T<P;T+=3){const A=o.getX(T),y=o.getX(T+1),m=o.getX(T+2);s=qs(this,d,t,i,l,h,p,A,y,m),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{const g=Math.max(0,_.start),x=Math.min(o.count,_.start+_.count);for(let f=g,d=x;f<d;f+=3){const M=o.getX(f),w=o.getX(f+1),T=o.getX(f+2);s=qs(this,a,t,i,l,h,p,M,w,T),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const f=u[g],d=a[f.materialIndex],M=Math.max(f.start,_.start),w=Math.min(c.count,Math.min(f.start+f.count,_.start+_.count));for(let T=M,P=w;T<P;T+=3){const A=T,y=T+1,m=T+2;s=qs(this,d,t,i,l,h,p,A,y,m),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{const g=Math.max(0,_.start),x=Math.min(c.count,_.start+_.count);for(let f=g,d=x;f<d;f+=3){const M=f,w=f+1,T=f+2;s=qs(this,a,t,i,l,h,p,M,w,T),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}}}function md(n,t,e,i,s,r,a,o){let c;if(t.side===Ke?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,t.side===ui,o),c===null)return null;Xs.copy(o),Xs.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Xs);return l<e.near||l>e.far?null:{distance:l,point:Xs.clone(),object:n}}function qs(n,t,e,i,s,r,a,o,c,l){n.getVertexPosition(o,Gs),n.getVertexPosition(c,Hs),n.getVertexPosition(l,Vs);const h=md(n,t,e,i,Gs,Hs,Vs,Bl);if(h){const p=new D;vn.getBarycoord(Bl,Gs,Hs,Vs,p),s&&(h.uv=vn.getInterpolatedAttribute(s,o,c,l,p,new Nt)),r&&(h.uv1=vn.getInterpolatedAttribute(r,o,c,l,p,new Nt)),a&&(h.normal=vn.getInterpolatedAttribute(a,o,c,l,p,new D),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new D,materialIndex:0};vn.getNormal(Gs,Hs,Vs,u.normal),h.face=u,h.barycoord=p}return h}class fu extends qe{constructor(t=null,e=1,i=1,s,r,a,o,c,l=ze,h=ze,p,u){super(null,a,o,c,l,h,s,r,p,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zl extends mn{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const zi=new ce,kl=new ce,Ys=[],Gl=new bn,gd=new ce,ds=new Qt,fs=new ss;class _d extends Qt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new zl(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,gd)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new bn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,zi),Gl.copy(t.boundingBox).applyMatrix4(zi),this.boundingBox.union(Gl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ss),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,zi),fs.copy(t.boundingSphere).applyMatrix4(zi),this.boundingSphere.union(fs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=t.previousInstanceMatrix.clone()),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(ds.geometry=this.geometry,ds.material=this.material,ds.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fs.copy(this.boundingSphere),fs.applyMatrix4(i),t.ray.intersectsSphere(fs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,zi),kl.multiplyMatrices(i,zi),ds.matrixWorld=kl,ds.raycast(t,Ys);for(let a=0,o=Ys.length;a<o;a++){const c=Ys[a];c.instanceId=r,c.object=this,e.push(c)}Ys.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new zl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new fu(new Float32Array(s*this.count),s,this.count,No,Mn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<i.length;l++)a+=i[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;return r[c]=o,r.set(i,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ha=new D,xd=new D,vd=new kt;class Hn{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=ha.subVectors(i,e).cross(xd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(ha),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||vd.getNormalMatrix(t),s=this.coplanarPoint(ha).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const gi=new ss,Md=new Nt(.5,.5),$s=new D;class qo{constructor(t=new Hn,e=new Hn,i=new Hn,s=new Hn,r=new Hn,a=new Hn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Cn,i=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],p=r[5],u=r[6],_=r[7],g=r[8],x=r[9],f=r[10],d=r[11],M=r[12],w=r[13],T=r[14],P=r[15];if(s[0].setComponents(l-a,_-h,d-g,P-M).normalize(),s[1].setComponents(l+a,_+h,d+g,P+M).normalize(),s[2].setComponents(l+o,_+p,d+x,P+w).normalize(),s[3].setComponents(l-o,_-p,d-x,P-w).normalize(),i)s[4].setComponents(c,u,f,T).normalize(),s[5].setComponents(l-c,_-u,d-f,P-T).normalize();else if(s[4].setComponents(l-c,_-u,d-f,P-T).normalize(),e===Cn)s[5].setComponents(l+c,_+u,d+f,P+T).normalize();else if(e===Ts)s[5].setComponents(c,u,f,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),gi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),gi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(gi)}intersectsSprite(t){gi.center.set(0,0,0);const e=Md.distanceTo(t.center);return gi.radius=.7071067811865476+e,gi.applyMatrix4(t.matrixWorld),this.intersectsSphere(gi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if($s.x=s.normal.x>0?t.max.x:t.min.x,$s.y=s.normal.y>0?t.max.y:t.min.y,$s.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint($s)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class pu extends Ti{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Bt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const yr=new D,Er=new D,Hl=new ce,ps=new Pr,js=new ss,da=new D,Vl=new D;class Sd extends Re{constructor(t=new Ze,e=new pu){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)yr.fromBufferAttribute(e,s-1),Er.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=yr.distanceTo(Er);t.setAttribute("lineDistance",new Ce(i,1))}else Dt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),js.copy(i.boundingSphere),js.applyMatrix4(s),js.radius+=r,t.ray.intersectsSphere(js)===!1)return;Hl.copy(s).invert(),ps.copy(t.ray).applyMatrix4(Hl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const _=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=_,f=g-1;x<f;x+=l){const d=h.getX(x),M=h.getX(x+1),w=Ks(this,t,ps,c,d,M,x);w&&e.push(w)}if(this.isLineLoop){const x=h.getX(g-1),f=h.getX(_),d=Ks(this,t,ps,c,x,f,g-1);d&&e.push(d)}}else{const _=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=_,f=g-1;x<f;x+=l){const d=Ks(this,t,ps,c,x,x+1,x);d&&e.push(d)}if(this.isLineLoop){const x=Ks(this,t,ps,c,g-1,_,g-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ks(n,t,e,i,s,r,a){const o=n.geometry.attributes.position;if(yr.fromBufferAttribute(o,s),Er.fromBufferAttribute(o,r),e.distanceSqToSegment(yr,Er,da,Vl)>i)return;da.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(da);if(!(l<t.near||l>t.far))return{distance:l,point:Vl.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Wl=new D,Xl=new D;class bd extends Sd{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Wl.fromBufferAttribute(e,s),Xl.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Wl.distanceTo(Xl);t.setAttribute("lineDistance",new Ce(i,1))}else Dt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class mu extends qe{constructor(t=[],e=bi,i,s,r,a,o,c,l,h){super(t,e,i,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class yd extends qe{constructor(t,e,i,s,r,a,o,c,l){super(t,e,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ts extends qe{constructor(t,e,i=Dn,s,r,a,o=ze,c=ze,l,h=jn,p=1){if(h!==jn&&h!==Si)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:p};super(u,s,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ho(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Ed extends ts{constructor(t,e=Dn,i=bi,s,r,a=ze,o=ze,c,l=jn){const h={width:t,height:t,depth:1},p=[h,h,h,h,h,h];super(t,t,e,i,s,r,a,o,c,l),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class gu extends qe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Oe extends Ze{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],p=[];let u=0,_=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,s,a,2),g("x","z","y",1,-1,t,i,-e,s,a,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Ce(l,3)),this.setAttribute("normal",new Ce(h,3)),this.setAttribute("uv",new Ce(p,2));function g(x,f,d,M,w,T,P,A,y,m,S){const C=T/y,R=P/m,I=T/2,G=P/2,X=A/2,U=y+1,H=m+1;let O=0,Q=0;const nt=new D;for(let ft=0;ft<H;ft++){const wt=ft*R-G;for(let Rt=0;Rt<U;Rt++){const it=Rt*C-I;nt[x]=it*M,nt[f]=wt*w,nt[d]=X,l.push(nt.x,nt.y,nt.z),nt[x]=0,nt[f]=0,nt[d]=A>0?1:-1,h.push(nt.x,nt.y,nt.z),p.push(Rt/y),p.push(1-ft/m),O+=1}}for(let ft=0;ft<m;ft++)for(let wt=0;wt<y;wt++){const Rt=u+wt+U*ft,it=u+wt+U*(ft+1),Mt=u+(wt+1)+U*(ft+1),xt=u+(wt+1)+U*ft;c.push(Rt,it,xt),c.push(it,Mt,xt),Q+=6}o.addGroup(_,Q,S),_+=Q,u+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Yo extends Ze{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new D,h=new Nt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let p=0,u=3;p<=e;p++,u+=3){const _=i+p/e*s;l.x=t*Math.cos(_),l.y=t*Math.sin(_),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,c.push(h.x,h.y)}for(let p=1;p<=e;p++)r.push(p,p+1,0);this.setIndex(r),this.setAttribute("position",new Ce(a,3)),this.setAttribute("normal",new Ce(o,3)),this.setAttribute("uv",new Ce(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yo(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class $o extends Ze{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],p=[],u=[],_=[];let g=0;const x=[],f=i/2;let d=0;M(),a===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new Ce(p,3)),this.setAttribute("normal",new Ce(u,3)),this.setAttribute("uv",new Ce(_,2));function M(){const T=new D,P=new D;let A=0;const y=(e-t)/i;for(let m=0;m<=r;m++){const S=[],C=m/r,R=C*(e-t)+t;for(let I=0;I<=s;I++){const G=I/s,X=G*c+o,U=Math.sin(X),H=Math.cos(X);P.x=R*U,P.y=-C*i+f,P.z=R*H,p.push(P.x,P.y,P.z),T.set(U,y,H).normalize(),u.push(T.x,T.y,T.z),_.push(G,1-C),S.push(g++)}x.push(S)}for(let m=0;m<s;m++)for(let S=0;S<r;S++){const C=x[S][m],R=x[S+1][m],I=x[S+1][m+1],G=x[S][m+1];(t>0||S!==0)&&(h.push(C,R,G),A+=3),(e>0||S!==r-1)&&(h.push(R,I,G),A+=3)}l.addGroup(d,A,0),d+=A}function w(T){const P=g,A=new Nt,y=new D;let m=0;const S=T===!0?t:e,C=T===!0?1:-1;for(let I=1;I<=s;I++)p.push(0,f*C,0),u.push(0,C,0),_.push(.5,.5),g++;const R=g;for(let I=0;I<=s;I++){const X=I/s*c+o,U=Math.cos(X),H=Math.sin(X);y.x=S*H,y.y=f*C,y.z=S*U,p.push(y.x,y.y,y.z),u.push(0,C,0),A.x=U*.5+.5,A.y=H*.5*C+.5,_.push(A.x,A.y),g++}for(let I=0;I<s;I++){const G=P+I,X=R+I;T===!0?h.push(X,X+1,G):h.push(X+1,X,G),m+=3}l.addGroup(d,m,T===!0?1:2),d+=m}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $o(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Lr extends Ze{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,p=t/o,u=e/c,_=[],g=[],x=[],f=[];for(let d=0;d<h;d++){const M=d*u-a;for(let w=0;w<l;w++){const T=w*p-r;g.push(T,-M,0),x.push(0,0,1),f.push(w/o),f.push(1-d/c)}}for(let d=0;d<c;d++)for(let M=0;M<o;M++){const w=M+l*d,T=M+l*(d+1),P=M+1+l*(d+1),A=M+1+l*d;_.push(w,T,A),_.push(T,P,A)}this.setIndex(_),this.setAttribute("position",new Ce(g,3)),this.setAttribute("normal",new Ce(x,3)),this.setAttribute("uv",new Ce(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lr(t.width,t.height,t.widthSegments,t.heightSegments)}}class jo extends Ze{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const h=[],p=new D,u=new D,_=[],g=[],x=[],f=[];for(let d=0;d<=i;d++){const M=[],w=d/i;let T=0;d===0&&a===0?T=.5/e:d===i&&c===Math.PI&&(T=-.5/e);for(let P=0;P<=e;P++){const A=P/e;p.x=-t*Math.cos(s+A*r)*Math.sin(a+w*o),p.y=t*Math.cos(a+w*o),p.z=t*Math.sin(s+A*r)*Math.sin(a+w*o),g.push(p.x,p.y,p.z),u.copy(p).normalize(),x.push(u.x,u.y,u.z),f.push(A+T,1-w),M.push(l++)}h.push(M)}for(let d=0;d<i;d++)for(let M=0;M<e;M++){const w=h[d][M+1],T=h[d][M],P=h[d+1][M],A=h[d+1][M+1];(d!==0||a>0)&&_.push(w,T,A),(d!==i-1||c<Math.PI)&&_.push(T,P,A)}this.setIndex(_),this.setAttribute("position",new Ce(g,3)),this.setAttribute("normal",new Ce(x,3)),this.setAttribute("uv",new Ce(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jo(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function es(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(ql(s))s.isRenderTargetTexture?(Dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(ql(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function $e(n){const t={};for(let e=0;e<n.length;e++){const i=es(n[e]);for(const s in i)t[s]=i[s]}return t}function ql(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Td(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function _u(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const wd={clone:es,merge:$e};var Ad=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Rd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Un extends Ti{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ad,this.fragmentShader=Rd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=es(t.uniforms),this.uniformsGroups=Td(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Cd extends Un{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Tr extends Ti{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Bt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vr,this.normalScale=new Nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Pd extends Ti{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vr,this.normalScale=new Nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Po,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ld extends Ti{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Eh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Dd extends Ti{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ko extends Re{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Bt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Id extends Ko{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Re.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Bt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const fa=new ce,Yl=new D,$l=new D;class xu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Nt(512,512),this.mapType=cn,this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qo,this._frameExtents=new Nt(1,1),this._viewportCount=1,this._viewports=[new Ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Yl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Yl),$l.setFromMatrixPosition(t.target.matrixWorld),e.lookAt($l),e.updateMatrixWorld(),fa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fa,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Ts||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(fa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Zs=new D,Js=new Kn,wn=new D;class vu extends Re{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=Cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Zs,Js,wn),wn.x===1&&wn.y===1&&wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zs,Js,wn.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(Zs,Js,wn),wn.x===1&&wn.y===1&&wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zs,Js,wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ri=new D,jl=new Nt,Kl=new Nt;class on extends vu{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ws*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ss*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ws*2*Math.atan(Math.tan(Ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ri.x,ri.y).multiplyScalar(-t/ri.z),ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ri.x,ri.y).multiplyScalar(-t/ri.z)}getViewSize(t,e){return this.getViewBounds(t,jl,Kl),e.subVectors(Kl,jl)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ss*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Ud extends xu{constructor(){super(new on(90,1,.5,500)),this.isPointLightShadow=!0}}class Mu extends Ko{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Ud}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class Zo extends vu{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Nd extends xu{constructor(){super(new Zo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fd extends Ko{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Re.DEFAULT_UP),this.updateMatrix(),this.target=new Re,this.shadow=new Nd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const ki=-90,Gi=1;class Od extends Re{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new on(ki,Gi,t,e);s.layers=this.layers,this.add(s);const r=new on(ki,Gi,t,e);r.layers=this.layers,this.add(r);const a=new on(ki,Gi,t,e);a.layers=this.layers,this.add(a);const o=new on(ki,Gi,t,e);o.layers=this.layers,this.add(o);const c=new on(ki,Gi,t,e);c.layers=this.layers,this.add(c);const l=new on(ki,Gi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===Cn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ts)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,p=t.getRenderTarget(),u=t.getActiveCubeFace(),_=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let f=!1;t.isWebGLRenderer===!0?f=t.state.buffers.depth.getReversed():f=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(p,u,_),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Bd extends on{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Zl=new ce;class Su{constructor(t,e,i=0,s=1/0){this.ray=new Pr(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Vo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Jt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Zl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Zl),this}intersectObject(t,e=!0,i=[]){return _o(t,this,i,e),i.sort(Jl),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)_o(t[s],this,i,e);return i.sort(Jl),i}}function Jl(n,t){return n.distance-t.distance}function _o(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)_o(r[a],t,e,!0)}}class zd{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Dt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class xo{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const al=class al{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};al.prototype.isMatrix2=!0;let Ql=al;class kd extends hi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Dt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function tc(n,t,e,i){const s=Gd(i);switch(e){case ru:return n*t;case No:return n*t/s.components*s.byteLength;case Fo:return n*t/s.components*s.byteLength;case yi:return n*t*2/s.components*s.byteLength;case Oo:return n*t*2/s.components*s.byteLength;case au:return n*t*3/s.components*s.byteLength;case Sn:return n*t*4/s.components*s.byteLength;case Bo:return n*t*4/s.components*s.byteLength;case cr:case ur:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case hr:case dr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ka:case Ha:return Math.max(n,16)*Math.max(t,8)/4;case za:case Ga:return Math.max(n,8)*Math.max(t,8)/2;case Va:case Wa:case qa:case Ya:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Xa:case _r:case $a:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ja:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ka:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Za:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Ja:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Qa:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case to:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case eo:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case no:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case io:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case so:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ro:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ao:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case oo:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case lo:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case co:case uo:case ho:return Math.ceil(n/4)*Math.ceil(t/4)*16;case fo:case po:return Math.ceil(n/4)*Math.ceil(t/4)*8;case xr:case mo:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Gd(n){switch(n){case cn:case eu:return{byteLength:1,components:1};case ys:case nu:case $n:return{byteLength:2,components:1};case Io:case Uo:return{byteLength:2,components:4};case Dn:case Do:case Mn:return{byteLength:4,components:1};case iu:case su:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Co}}));typeof window<"u"&&(window.__THREE__?Dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Co);function bu(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Hd(n){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,p=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,h),o.onUploadCallback();let _;if(l instanceof Float32Array)_=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)_=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?_=n.HALF_FLOAT:_=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)_=n.SHORT;else if(l instanceof Uint32Array)_=n.UNSIGNED_INT;else if(l instanceof Int32Array)_=n.INT;else if(l instanceof Int8Array)_=n.BYTE;else if(l instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:_,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,c,l){const h=c.array,p=c.updateRanges;if(n.bindBuffer(l,o),p.length===0)n.bufferSubData(l,0,h);else{p.sort((_,g)=>_.start-g.start);let u=0;for(let _=1;_<p.length;_++){const g=p[u],x=p[_];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,p[u]=x)}p.length=u+1;for(let _=0,g=p.length;_<g;_++){const x=p[_];n.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(n.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Vd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Xd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$d=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Kd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Jd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,tf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ef=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,nf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,sf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,af=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,uf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,hf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,df=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,ff=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,pf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,mf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,gf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_f=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Mf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Sf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,yf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Ef=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Tf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Af=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Cf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Pf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Lf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Df=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,If=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Uf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Nf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Ff=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Of=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Hf=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Vf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Wf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Xf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qf=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Yf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$f=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Zf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,tp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ep=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,np=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ip=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ap=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,op=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,pp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_p=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Mp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ep=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Ap=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Rp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Cp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Pp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Dp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ip=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Up=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Np=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Fp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Op=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,zp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,kp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Vp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Wp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Zp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Jp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Qp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,tm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,em=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,im=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,rm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,am=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,om=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,um=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,hm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,dm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,mm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_m=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,vm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Mm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ym=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wt={alphahash_fragment:Vd,alphahash_pars_fragment:Wd,alphamap_fragment:Xd,alphamap_pars_fragment:qd,alphatest_fragment:Yd,alphatest_pars_fragment:$d,aomap_fragment:jd,aomap_pars_fragment:Kd,batching_pars_vertex:Zd,batching_vertex:Jd,begin_vertex:Qd,beginnormal_vertex:tf,bsdfs:ef,iridescence_fragment:nf,bumpmap_pars_fragment:sf,clipping_planes_fragment:rf,clipping_planes_pars_fragment:af,clipping_planes_pars_vertex:of,clipping_planes_vertex:lf,color_fragment:cf,color_pars_fragment:uf,color_pars_vertex:hf,color_vertex:df,common:ff,cube_uv_reflection_fragment:pf,defaultnormal_vertex:mf,displacementmap_pars_vertex:gf,displacementmap_vertex:_f,emissivemap_fragment:xf,emissivemap_pars_fragment:vf,colorspace_fragment:Mf,colorspace_pars_fragment:Sf,envmap_fragment:bf,envmap_common_pars_fragment:yf,envmap_pars_fragment:Ef,envmap_pars_vertex:Tf,envmap_physical_pars_fragment:Ff,envmap_vertex:wf,fog_vertex:Af,fog_pars_vertex:Rf,fog_fragment:Cf,fog_pars_fragment:Pf,gradientmap_pars_fragment:Lf,lightmap_pars_fragment:Df,lights_lambert_fragment:If,lights_lambert_pars_fragment:Uf,lights_pars_begin:Nf,lights_toon_fragment:Of,lights_toon_pars_fragment:Bf,lights_phong_fragment:zf,lights_phong_pars_fragment:kf,lights_physical_fragment:Gf,lights_physical_pars_fragment:Hf,lights_fragment_begin:Vf,lights_fragment_maps:Wf,lights_fragment_end:Xf,lightprobes_pars_fragment:qf,logdepthbuf_fragment:Yf,logdepthbuf_pars_fragment:$f,logdepthbuf_pars_vertex:jf,logdepthbuf_vertex:Kf,map_fragment:Zf,map_pars_fragment:Jf,map_particle_fragment:Qf,map_particle_pars_fragment:tp,metalnessmap_fragment:ep,metalnessmap_pars_fragment:np,morphinstance_vertex:ip,morphcolor_vertex:sp,morphnormal_vertex:rp,morphtarget_pars_vertex:ap,morphtarget_vertex:op,normal_fragment_begin:lp,normal_fragment_maps:cp,normal_pars_fragment:up,normal_pars_vertex:hp,normal_vertex:dp,normalmap_pars_fragment:fp,clearcoat_normal_fragment_begin:pp,clearcoat_normal_fragment_maps:mp,clearcoat_pars_fragment:gp,iridescence_pars_fragment:_p,opaque_fragment:xp,packing:vp,premultiplied_alpha_fragment:Mp,project_vertex:Sp,dithering_fragment:bp,dithering_pars_fragment:yp,roughnessmap_fragment:Ep,roughnessmap_pars_fragment:Tp,shadowmap_pars_fragment:wp,shadowmap_pars_vertex:Ap,shadowmap_vertex:Rp,shadowmask_pars_fragment:Cp,skinbase_vertex:Pp,skinning_pars_vertex:Lp,skinning_vertex:Dp,skinnormal_vertex:Ip,specularmap_fragment:Up,specularmap_pars_fragment:Np,tonemapping_fragment:Fp,tonemapping_pars_fragment:Op,transmission_fragment:Bp,transmission_pars_fragment:zp,uv_pars_fragment:kp,uv_pars_vertex:Gp,uv_vertex:Hp,worldpos_vertex:Vp,background_vert:Wp,background_frag:Xp,backgroundCube_vert:qp,backgroundCube_frag:Yp,cube_vert:$p,cube_frag:jp,depth_vert:Kp,depth_frag:Zp,distance_vert:Jp,distance_frag:Qp,equirect_vert:tm,equirect_frag:em,linedashed_vert:nm,linedashed_frag:im,meshbasic_vert:sm,meshbasic_frag:rm,meshlambert_vert:am,meshlambert_frag:om,meshmatcap_vert:lm,meshmatcap_frag:cm,meshnormal_vert:um,meshnormal_frag:hm,meshphong_vert:dm,meshphong_frag:fm,meshphysical_vert:pm,meshphysical_frag:mm,meshtoon_vert:gm,meshtoon_frag:_m,points_vert:xm,points_frag:vm,shadow_vert:Mm,shadow_frag:Sm,sprite_vert:bm,sprite_frag:ym},mt={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new Nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new Nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},Rn={basic:{uniforms:$e([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:$e([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Bt(0)},envMapIntensity:{value:1}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:$e([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:$e([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:$e([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Bt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:$e([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:$e([mt.points,mt.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:$e([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:$e([mt.common,mt.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:$e([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:$e([mt.sprite,mt.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distance:{uniforms:$e([mt.common,mt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distance_vert,fragmentShader:Wt.distance_frag},shadow:{uniforms:$e([mt.lights,mt.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};Rn.physical={uniforms:$e([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new Nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new Nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new Nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const Qs={r:0,b:0,g:0},Em=new ce,yu=new kt;yu.set(-1,0,0,0,1,0,0,0,1);function Tm(n,t,e,i,s,r){const a=new Bt(0);let o=s===!0?0:1,c,l,h=null,p=0,u=null;function _(M){let w=M.isScene===!0?M.background:null;if(w&&w.isTexture){const T=M.backgroundBlurriness>0;w=t.get(w,T)}return w}function g(M){let w=!1;const T=_(M);T===null?f(a,o):T&&T.isColor&&(f(T,1),w=!0);const P=n.xr.getEnvironmentBlendMode();P==="additive"?e.buffers.color.setClear(0,0,0,1,r):P==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(M,w){const T=_(w);T&&(T.isCubeTexture||T.mapping===Cr)?(l===void 0&&(l=new Qt(new Oe(1,1,1),new Un({name:"BackgroundCubeMaterial",uniforms:es(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:Ke,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(P,A,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=T,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Em.makeRotationFromEuler(w.backgroundRotation)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(yu),l.material.toneMapped=Kt.getTransfer(T.colorSpace)!==ie,(h!==T||p!==T.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=T,p=T.version,u=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Qt(new Lr(2,2),new Un({name:"BackgroundMaterial",uniforms:es(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(T.colorSpace)!==ie,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(h!==T||p!==T.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=T,p=T.version,u=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function f(M,w){M.getRGB(Qs,_u(n)),e.buffers.color.setClear(Qs.r,Qs.g,Qs.b,w,r)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,w=1){a.set(M),o=w,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,f(a,o)},render:g,addToRenderList:x,dispose:d}}function wm(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(R,I,G,X,U){let H=!1;const O=p(R,X,G,I);r!==O&&(r=O,l(r.object)),H=_(R,X,G,U),H&&g(R,X,G,U),U!==null&&t.update(U,n.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,T(R,I,G,X),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function c(){return n.createVertexArray()}function l(R){return n.bindVertexArray(R)}function h(R){return n.deleteVertexArray(R)}function p(R,I,G,X){const U=X.wireframe===!0;let H=i[I.id];H===void 0&&(H={},i[I.id]=H);const O=R.isInstancedMesh===!0?R.id:0;let Q=H[O];Q===void 0&&(Q={},H[O]=Q);let nt=Q[G.id];nt===void 0&&(nt={},Q[G.id]=nt);let ft=nt[U];return ft===void 0&&(ft=u(c()),nt[U]=ft),ft}function u(R){const I=[],G=[],X=[];for(let U=0;U<e;U++)I[U]=0,G[U]=0,X[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:G,attributeDivisors:X,object:R,attributes:{},index:null}}function _(R,I,G,X){const U=r.attributes,H=I.attributes;let O=0;const Q=G.getAttributes();for(const nt in Q)if(Q[nt].location>=0){const wt=U[nt];let Rt=H[nt];if(Rt===void 0&&(nt==="instanceMatrix"&&R.instanceMatrix&&(Rt=R.instanceMatrix),nt==="instanceColor"&&R.instanceColor&&(Rt=R.instanceColor)),wt===void 0||wt.attribute!==Rt||Rt&&wt.data!==Rt.data)return!0;O++}return r.attributesNum!==O||r.index!==X}function g(R,I,G,X){const U={},H=I.attributes;let O=0;const Q=G.getAttributes();for(const nt in Q)if(Q[nt].location>=0){let wt=H[nt];wt===void 0&&(nt==="instanceMatrix"&&R.instanceMatrix&&(wt=R.instanceMatrix),nt==="instanceColor"&&R.instanceColor&&(wt=R.instanceColor));const Rt={};Rt.attribute=wt,wt&&wt.data&&(Rt.data=wt.data),U[nt]=Rt,O++}r.attributes=U,r.attributesNum=O,r.index=X}function x(){const R=r.newAttributes;for(let I=0,G=R.length;I<G;I++)R[I]=0}function f(R){d(R,0)}function d(R,I){const G=r.newAttributes,X=r.enabledAttributes,U=r.attributeDivisors;G[R]=1,X[R]===0&&(n.enableVertexAttribArray(R),X[R]=1),U[R]!==I&&(n.vertexAttribDivisor(R,I),U[R]=I)}function M(){const R=r.newAttributes,I=r.enabledAttributes;for(let G=0,X=I.length;G<X;G++)I[G]!==R[G]&&(n.disableVertexAttribArray(G),I[G]=0)}function w(R,I,G,X,U,H,O){O===!0?n.vertexAttribIPointer(R,I,G,U,H):n.vertexAttribPointer(R,I,G,X,U,H)}function T(R,I,G,X){x();const U=X.attributes,H=G.getAttributes(),O=I.defaultAttributeValues;for(const Q in H){const nt=H[Q];if(nt.location>=0){let ft=U[Q];if(ft===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(ft=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(ft=R.instanceColor)),ft!==void 0){const wt=ft.normalized,Rt=ft.itemSize,it=t.get(ft);if(it===void 0)continue;const Mt=it.buffer,xt=it.type,q=it.bytesPerElement,gt=xt===n.INT||xt===n.UNSIGNED_INT||ft.gpuType===Do;if(ft.isInterleavedBufferAttribute){const ot=ft.data,Ut=ot.stride,zt=ft.offset;if(ot.isInstancedInterleavedBuffer){for(let Ft=0;Ft<nt.locationSize;Ft++)d(nt.location+Ft,ot.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Ft=0;Ft<nt.locationSize;Ft++)f(nt.location+Ft);n.bindBuffer(n.ARRAY_BUFFER,Mt);for(let Ft=0;Ft<nt.locationSize;Ft++)w(nt.location+Ft,Rt/nt.locationSize,xt,wt,Ut*q,(zt+Rt/nt.locationSize*Ft)*q,gt)}else{if(ft.isInstancedBufferAttribute){for(let ot=0;ot<nt.locationSize;ot++)d(nt.location+ot,ft.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let ot=0;ot<nt.locationSize;ot++)f(nt.location+ot);n.bindBuffer(n.ARRAY_BUFFER,Mt);for(let ot=0;ot<nt.locationSize;ot++)w(nt.location+ot,Rt/nt.locationSize,xt,wt,Rt*q,Rt/nt.locationSize*ot*q,gt)}}else if(O!==void 0){const wt=O[Q];if(wt!==void 0)switch(wt.length){case 2:n.vertexAttrib2fv(nt.location,wt);break;case 3:n.vertexAttrib3fv(nt.location,wt);break;case 4:n.vertexAttrib4fv(nt.location,wt);break;default:n.vertexAttrib1fv(nt.location,wt)}}}}M()}function P(){S();for(const R in i){const I=i[R];for(const G in I){const X=I[G];for(const U in X){const H=X[U];for(const O in H)h(H[O].object),delete H[O];delete X[U]}}delete i[R]}}function A(R){if(i[R.id]===void 0)return;const I=i[R.id];for(const G in I){const X=I[G];for(const U in X){const H=X[U];for(const O in H)h(H[O].object),delete H[O];delete X[U]}}delete i[R.id]}function y(R){for(const I in i){const G=i[I];for(const X in G){const U=G[X];if(U[R.id]===void 0)continue;const H=U[R.id];for(const O in H)h(H[O].object),delete H[O];delete U[R.id]}}}function m(R){for(const I in i){const G=i[I],X=R.isInstancedMesh===!0?R.id:0,U=G[X];if(U!==void 0){for(const H in U){const O=U[H];for(const Q in O)h(O[Q].object),delete O[Q];delete U[H]}delete G[X],Object.keys(G).length===0&&delete i[I]}}}function S(){C(),a=!0,r!==s&&(r=s,l(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:S,resetDefaultState:C,dispose:P,releaseStatesOfGeometry:A,releaseStatesOfObject:m,releaseStatesOfProgram:y,initAttributes:x,enableAttribute:f,disableUnusedAttributes:M}}function Am(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function a(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),e.update(l,i,h))}function o(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let u=0;for(let _=0;_<h;_++)u+=l[_];e.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Rm(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const y=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(y){return!(y!==Sn&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(y){const m=y===$n&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(y!==cn&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&y!==Mn&&!m)}function c(y){if(y==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(Dt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const p=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Dt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const _=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),T=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:_,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:f,maxAttributes:d,maxVertexUniforms:M,maxVaryings:w,maxFragmentUniforms:T,maxSamples:P,samples:A}}function Cm(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new Hn,o=new kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){const _=p.length!==0||u||i!==0||s;return s=u,i=p.length,_},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,u){e=h(p,u,0)},this.setState=function(p,u,_){const g=p.clippingPlanes,x=p.clipIntersection,f=p.clipShadows,d=n.get(p);if(!s||g===null||g.length===0||r&&!f)r?h(null):l();else{const M=r?0:i,w=M*4;let T=d.clippingState||null;c.value=T,T=h(g,u,w,_);for(let P=0;P!==w;++P)T[P]=e[P];d.clippingState=T,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(p,u,_,g){const x=p!==null?p.length:0;let f=null;if(x!==0){if(f=c.value,g!==!0||f===null){const d=_+x*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(f===null||f.length<d)&&(f=new Float32Array(d));for(let w=0,T=_;w!==x;++w,T+=4)a.copy(p[w]).applyMatrix4(M,o),a.normal.toArray(f,T),f[T+3]=a.constant}c.value=f,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,f}}const ci=4,ec=[.125,.215,.35,.446,.526,.582],vi=20,Pm=256,ms=new Zo,nc=new Bt;let pa=null,ma=0,ga=0,_a=!1;const Lm=new D;class vo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:a=256,position:o=Lm}=r;pa=this._renderer.getRenderTarget(),ma=this._renderer.getActiveCubeFace(),ga=this._renderer.getActiveMipmapLevel(),_a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=sc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(pa,ma,ga),this._renderer.xr.enabled=_a,t.scissorTest=!1,Hi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===bi||t.mapping===Qi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),pa=this._renderer.getRenderTarget(),ma=this._renderer.getActiveCubeFace(),ga=this._renderer.getActiveMipmapLevel(),_a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:We,minFilter:We,generateMipmaps:!1,type:$n,format:Sn,colorSpace:Mr,depthBuffer:!1},s=ic(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ic(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Dm(r)),this._blurMaterial=Um(r,t,e),this._ggxMaterial=Im(r,t,e)}return s}_compileMaterial(t){const e=new Qt(new Ze,t);this._renderer.compile(e,ms)}_sceneToCubeUV(t,e,i,s,r){const c=new on(90,1,e,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,_=p.toneMapping;p.getClearColor(nc),p.toneMapping=Pn,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Qt(new Oe,new Xo({name:"PMREM.Background",side:Ke,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,f=x.material;let d=!1;const M=t.background;M?M.isColor&&(f.color.copy(M),t.background=null,d=!0):(f.color.copy(nc),d=!0);for(let w=0;w<6;w++){const T=w%3;T===0?(c.up.set(0,l[w],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[w],r.y,r.z)):T===1?(c.up.set(0,0,l[w]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[w],r.z)):(c.up.set(0,l[w],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[w]));const P=this._cubeSize;Hi(s,T*P,w>2?P:0,P,P),p.setRenderTarget(s),d&&p.render(x,c),p.render(t,c)}p.toneMapping=_,p.autoClear=u,t.background=M}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===bi||t.mapping===Qi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=rc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=sc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Hi(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(a,ms)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),p=Math.sqrt(l*l-h*h),u=0+l*1.25,_=p*u,{_lodMax:g}=this,x=this._sizeLods[i],f=3*x*(i>g-ci?i-g+ci:0),d=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=_,c.mipInt.value=g-e,Hi(r,f,d,3*x,2*x),s.setRenderTarget(r),s.render(o,ms),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-i,Hi(t,f,d,3*x,2*x),s.setRenderTarget(t),s.render(o,ms)}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Jt("blur direction must be either latitudinal or longitudinal!");const h=3,p=this._lodMeshes[s];p.material=l;const u=l.uniforms,_=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*_):2*Math.PI/(2*vi-1),x=r/g,f=isFinite(r)?1+Math.floor(h*x):vi;f>vi&&Dt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${vi}`);const d=[];let M=0;for(let y=0;y<vi;++y){const m=y/x,S=Math.exp(-m*m/2);d.push(S),y===0?M+=S:y<f&&(M+=2*S)}for(let y=0;y<d.length;y++)d[y]=d[y]/M;u.envMap.value=t.texture,u.samples.value=f,u.weights.value=d,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:w}=this;u.dTheta.value=g,u.mipInt.value=w-i;const T=this._sizeLods[s],P=3*T*(s>w-ci?s-w+ci:0),A=4*(this._cubeSize-T);Hi(e,P,A,3*T,2*T),c.setRenderTarget(e),c.render(p,ms)}}function Dm(n){const t=[],e=[],i=[];let s=n;const r=n-ci+1+ec.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>n-ci?c=ec[a-n+ci-1]:a===0&&(c=0),e.push(c);const l=1/(o-2),h=-l,p=1+l,u=[h,h,p,h,p,p,h,h,p,p,h,p],_=6,g=6,x=3,f=2,d=1,M=new Float32Array(x*g*_),w=new Float32Array(f*g*_),T=new Float32Array(d*g*_);for(let A=0;A<_;A++){const y=A%3*2/3-1,m=A>2?0:-1,S=[y,m,0,y+2/3,m,0,y+2/3,m+1,0,y,m,0,y+2/3,m+1,0,y,m+1,0];M.set(S,x*g*A),w.set(u,f*g*A);const C=[A,A,A,A,A,A];T.set(C,d*g*A)}const P=new Ze;P.setAttribute("position",new mn(M,x)),P.setAttribute("uv",new mn(w,f)),P.setAttribute("faceIndex",new mn(T,d)),i.push(new Qt(P,null)),s>ci&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function ic(n,t,e){const i=new Ln(n,t,e);return i.texture.mapping=Cr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Hi(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Im(n,t,e){return new Un({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Pm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Dr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Um(n,t,e){const i=new Float32Array(vi),s=new D(0,1,0);return new Un({name:"SphericalGaussianBlur",defines:{n:vi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Dr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function sc(){return new Un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function rc(){return new Un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Dr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Eu extends Ln{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new mu(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Oe(5,5,5),r=new Un({name:"CubemapFromEquirect",uniforms:es(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ke,blending:Xn});r.uniforms.tEquirect.value=e;const a=new Qt(s,r),o=e.minFilter;return e.minFilter===Mi&&(e.minFilter=We),new Od(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}function Nm(n){let t=new WeakMap,e=new WeakMap,i=null;function s(u,_=!1){return u==null?null:_?a(u):r(u)}function r(u){if(u&&u.isTexture){const _=u.mapping;if(_===Gr||_===Hr)if(t.has(u)){const g=t.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const x=new Eu(g.height);return x.fromEquirectangularTexture(n,u),t.set(u,x),u.addEventListener("dispose",l),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const _=u.mapping,g=_===Gr||_===Hr,x=_===bi||_===Qi;if(g||x){let f=e.get(u);const d=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return i===null&&(i=new vo(n)),f=g?i.fromEquirectangular(u,f):i.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,e.set(u,f),f.texture;if(f!==void 0)return f.texture;{const M=u.image;return g&&M&&M.height>0||x&&M&&c(M)?(i===null&&(i=new vo(n)),f=g?i.fromEquirectangular(u):i.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,e.set(u,f),u.addEventListener("dispose",h),f.texture):null}}}return u}function o(u,_){return _===Gr?u.mapping=bi:_===Hr&&(u.mapping=Qi),u}function c(u){let _=0;const g=6;for(let x=0;x<g;x++)u[x]!==void 0&&_++;return _===g}function l(u){const _=u.target;_.removeEventListener("dispose",l);const g=t.get(_);g!==void 0&&(t.delete(_),g.dispose())}function h(u){const _=u.target;_.removeEventListener("dispose",h);const g=e.get(_);g!==void 0&&(e.delete(_),g.dispose())}function p(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:p}}function Fm(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&go("WebGLRenderer: "+i+" extension not supported."),s}}}function Om(n,t,e,i){const s={},r=new WeakMap;function a(p){const u=p.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const _=r.get(u);_&&(t.remove(_),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(p,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function c(p){const u=p.attributes;for(const _ in u)t.update(u[_],n.ARRAY_BUFFER)}function l(p){const u=[],_=p.index,g=p.attributes.position;let x=0;if(g===void 0)return;if(_!==null){const M=_.array;x=_.version;for(let w=0,T=M.length;w<T;w+=3){const P=M[w+0],A=M[w+1],y=M[w+2];u.push(P,A,A,y,y,P)}}else{const M=g.array;x=g.version;for(let w=0,T=M.length/3-1;w<T;w+=3){const P=w+0,A=w+1,y=w+2;u.push(P,A,A,y,y,P)}}const f=new(g.count>=65535?du:hu)(u,1);f.version=x;const d=r.get(p);d&&t.remove(d),r.set(p,f)}function h(p){const u=r.get(p);if(u){const _=p.index;_!==null&&u.version<_.version&&l(p)}else l(p);return r.get(p)}return{get:o,update:c,getWireframeAttribute:h}}function Bm(n,t,e){let i;function s(p){i=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function c(p,u){n.drawElements(i,u,r,p*a),e.update(u,i,1)}function l(p,u,_){_!==0&&(n.drawElementsInstanced(i,u,r,p*a,_),e.update(u,i,_))}function h(p,u,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,p,0,_);let x=0;for(let f=0;f<_;f++)x+=u[f];e.update(x,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function zm(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:Jt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function km(n,t,e){const i=new WeakMap,s=new Ee;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==p){let C=function(){m.dispose(),i.delete(o),o.removeEventListener("dispose",C)};var _=C;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,f=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let T=0;g===!0&&(T=1),x===!0&&(T=2),f===!0&&(T=3);let P=o.attributes.position.count*T,A=1;P>t.maxTextureSize&&(A=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const y=new Float32Array(P*A*4*p),m=new lu(y,P,A,p);m.type=Mn,m.needsUpdate=!0;const S=T*4;for(let R=0;R<p;R++){const I=d[R],G=M[R],X=w[R],U=P*A*4*R;for(let H=0;H<I.count;H++){const O=H*S;g===!0&&(s.fromBufferAttribute(I,H),y[U+O+0]=s.x,y[U+O+1]=s.y,y[U+O+2]=s.z,y[U+O+3]=0),x===!0&&(s.fromBufferAttribute(G,H),y[U+O+4]=s.x,y[U+O+5]=s.y,y[U+O+6]=s.z,y[U+O+7]=0),f===!0&&(s.fromBufferAttribute(X,H),y[U+O+8]=s.x,y[U+O+9]=s.y,y[U+O+10]=s.z,y[U+O+11]=X.itemSize===4?s.w:1)}}u={count:p,texture:m,size:new Nt(P,A)},i.set(o,u),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let g=0;for(let f=0;f<l.length;f++)g+=l[f];const x=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function Gm(n,t,e,i,s){let r=new WeakMap;function a(l){const h=s.render.frame,p=l.geometry,u=t.get(l,p);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const _=l.skeleton;r.get(_)!==h&&(_.update(),r.set(_,h))}return u}function o(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const Hm={[$c]:"LINEAR_TONE_MAPPING",[jc]:"REINHARD_TONE_MAPPING",[Kc]:"CINEON_TONE_MAPPING",[Zc]:"ACES_FILMIC_TONE_MAPPING",[Qc]:"AGX_TONE_MAPPING",[Lo]:"NEUTRAL_TONE_MAPPING",[Jc]:"CUSTOM_TONE_MAPPING"};function Vm(n,t,e,i,s){const r=new Ln(t,e,{type:n,depthBuffer:i,stencilBuffer:s,depthTexture:i?new ts(t,e):void 0}),a=new Ln(t,e,{type:$n,depthBuffer:!1,stencilBuffer:!1}),o=new Ze;o.setAttribute("position",new Ce([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ce([0,2,0,0,2,0],2));const c=new Cd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new Qt(o,c),h=new Zo(-1,1,1,-1,0,1);let p=null,u=null,_=!1,g,x=null,f=[],d=!1;this.setSize=function(M,w){r.setSize(M,w),a.setSize(M,w);for(let T=0;T<f.length;T++){const P=f[T];P.setSize&&P.setSize(M,w)}},this.setEffects=function(M){f=M,d=f.length>0&&f[0].isRenderPass===!0;const w=r.width,T=r.height;for(let P=0;P<f.length;P++){const A=f[P];A.setSize&&A.setSize(w,T)}},this.begin=function(M,w){if(_||M.toneMapping===Pn&&f.length===0)return!1;if(x=w,w!==null){const T=w.width,P=w.height;(r.width!==T||r.height!==P)&&this.setSize(T,P)}return d===!1&&M.setRenderTarget(r),g=M.toneMapping,M.toneMapping=Pn,!0},this.hasRenderPass=function(){return d},this.end=function(M,w){M.toneMapping=g,_=!0;let T=r,P=a;for(let A=0;A<f.length;A++){const y=f[A];if(y.enabled!==!1&&(y.render(M,P,T,w),y.needsSwap!==!1)){const m=T;T=P,P=m}}if(p!==M.outputColorSpace||u!==M.toneMapping){p=M.outputColorSpace,u=M.toneMapping,c.defines={},Kt.getTransfer(p)===ie&&(c.defines.SRGB_TRANSFER="");const A=Hm[u];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,M.setRenderTarget(x),M.render(l,h),x=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),a.dispose(),o.dispose(),c.dispose()}}const Tu=new qe,Mo=new ts(1,1),wu=new lu,Au=new id,Ru=new mu,ac=[],oc=[],lc=new Float32Array(16),cc=new Float32Array(9),uc=new Float32Array(4);function rs(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=ac[s];if(r===void 0&&(r=new Float32Array(s),ac[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Ue(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ne(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ir(n,t){let e=oc[t];e===void 0&&(e=new Int32Array(t),oc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Wm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Xm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;n.uniform2fv(this.addr,t),Ne(e,t)}}function qm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ue(e,t))return;n.uniform3fv(this.addr,t),Ne(e,t)}}function Ym(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;n.uniform4fv(this.addr,t),Ne(e,t)}}function $m(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ue(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ne(e,t)}else{if(Ue(e,i))return;uc.set(i),n.uniformMatrix2fv(this.addr,!1,uc),Ne(e,i)}}function jm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ue(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ne(e,t)}else{if(Ue(e,i))return;cc.set(i),n.uniformMatrix3fv(this.addr,!1,cc),Ne(e,i)}}function Km(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ue(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ne(e,t)}else{if(Ue(e,i))return;lc.set(i),n.uniformMatrix4fv(this.addr,!1,lc),Ne(e,i)}}function Zm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Jm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;n.uniform2iv(this.addr,t),Ne(e,t)}}function Qm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;n.uniform3iv(this.addr,t),Ne(e,t)}}function t0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;n.uniform4iv(this.addr,t),Ne(e,t)}}function e0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function n0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;n.uniform2uiv(this.addr,t),Ne(e,t)}}function i0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;n.uniform3uiv(this.addr,t),Ne(e,t)}}function s0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;n.uniform4uiv(this.addr,t),Ne(e,t)}}function r0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Mo.compareFunction=e.isReversedDepthBuffer()?ko:zo,r=Mo):r=Tu,e.setTexture2D(t||r,s)}function a0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Au,s)}function o0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Ru,s)}function l0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||wu,s)}function c0(n){switch(n){case 5126:return Wm;case 35664:return Xm;case 35665:return qm;case 35666:return Ym;case 35674:return $m;case 35675:return jm;case 35676:return Km;case 5124:case 35670:return Zm;case 35667:case 35671:return Jm;case 35668:case 35672:return Qm;case 35669:case 35673:return t0;case 5125:return e0;case 36294:return n0;case 36295:return i0;case 36296:return s0;case 35678:case 36198:case 36298:case 36306:case 35682:return r0;case 35679:case 36299:case 36307:return a0;case 35680:case 36300:case 36308:case 36293:return o0;case 36289:case 36303:case 36311:case 36292:return l0}}function u0(n,t){n.uniform1fv(this.addr,t)}function h0(n,t){const e=rs(t,this.size,2);n.uniform2fv(this.addr,e)}function d0(n,t){const e=rs(t,this.size,3);n.uniform3fv(this.addr,e)}function f0(n,t){const e=rs(t,this.size,4);n.uniform4fv(this.addr,e)}function p0(n,t){const e=rs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function m0(n,t){const e=rs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function g0(n,t){const e=rs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function _0(n,t){n.uniform1iv(this.addr,t)}function x0(n,t){n.uniform2iv(this.addr,t)}function v0(n,t){n.uniform3iv(this.addr,t)}function M0(n,t){n.uniform4iv(this.addr,t)}function S0(n,t){n.uniform1uiv(this.addr,t)}function b0(n,t){n.uniform2uiv(this.addr,t)}function y0(n,t){n.uniform3uiv(this.addr,t)}function E0(n,t){n.uniform4uiv(this.addr,t)}function T0(n,t,e){const i=this.cache,s=t.length,r=Ir(e,s);Ue(i,r)||(n.uniform1iv(this.addr,r),Ne(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Mo:a=Tu;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function w0(n,t,e){const i=this.cache,s=t.length,r=Ir(e,s);Ue(i,r)||(n.uniform1iv(this.addr,r),Ne(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Au,r[a])}function A0(n,t,e){const i=this.cache,s=t.length,r=Ir(e,s);Ue(i,r)||(n.uniform1iv(this.addr,r),Ne(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Ru,r[a])}function R0(n,t,e){const i=this.cache,s=t.length,r=Ir(e,s);Ue(i,r)||(n.uniform1iv(this.addr,r),Ne(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||wu,r[a])}function C0(n){switch(n){case 5126:return u0;case 35664:return h0;case 35665:return d0;case 35666:return f0;case 35674:return p0;case 35675:return m0;case 35676:return g0;case 5124:case 35670:return _0;case 35667:case 35671:return x0;case 35668:case 35672:return v0;case 35669:case 35673:return M0;case 5125:return S0;case 36294:return b0;case 36295:return y0;case 36296:return E0;case 35678:case 36198:case 36298:case 36306:case 35682:return T0;case 35679:case 36299:case 36307:return w0;case 35680:case 36300:case 36308:case 36293:return A0;case 36289:case 36303:case 36311:case 36292:return R0}}class P0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=c0(e.type)}}class L0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=C0(e.type)}}class D0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const xa=/(\w+)(\])?(\[|\.)?/g;function hc(n,t){n.seq.push(t),n.map[t.id]=t}function I0(n,t,e){const i=n.name,s=i.length;for(xa.lastIndex=0;;){const r=xa.exec(i),a=xa.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){hc(e,l===void 0?new P0(o,n,t):new L0(o,n,t));break}else{let p=e.map[o];p===void 0&&(p=new D0(o),hc(e,p)),e=p}}}class fr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);I0(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function dc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const U0=37297;let N0=0;function F0(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const fc=new kt;function O0(n){Kt._getMatrix(fc,Kt.workingColorSpace,n);const t=`mat3( ${fc.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(n)){case Sr:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return Dt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function pc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+F0(n.getShaderSource(t),o)}else return r}function B0(n,t){const e=O0(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const z0={[$c]:"Linear",[jc]:"Reinhard",[Kc]:"Cineon",[Zc]:"ACESFilmic",[Qc]:"AgX",[Lo]:"Neutral",[Jc]:"Custom"};function k0(n,t){const e=z0[t];return e===void 0?(Dt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const tr=new D;function G0(){Kt.getLuminanceCoefficients(tr);const n=tr.x.toFixed(4),t=tr.y.toFixed(4),e=tr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function H0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vs).join(`
`)}function V0(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function W0(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function vs(n){return n!==""}function mc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function gc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const X0=/^[ \t]*#include +<([\w\d./]+)>/gm;function So(n){return n.replace(X0,Y0)}const q0=new Map;function Y0(n,t){let e=Wt[t];if(e===void 0){const i=q0.get(t);if(i!==void 0)e=Wt[i],Dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return So(e)}const $0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _c(n){return n.replace($0,j0)}function j0(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function xc(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const K0={[Ms]:"SHADOWMAP_TYPE_PCF",[xs]:"SHADOWMAP_TYPE_VSM"};function Z0(n){return K0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const J0={[bi]:"ENVMAP_TYPE_CUBE",[Qi]:"ENVMAP_TYPE_CUBE",[Cr]:"ENVMAP_TYPE_CUBE_UV"};function Q0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":J0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const tg={[Qi]:"ENVMAP_MODE_REFRACTION"};function eg(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":tg[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const ng={[Po]:"ENVMAP_BLENDING_MULTIPLY",[Sh]:"ENVMAP_BLENDING_MIX",[bh]:"ENVMAP_BLENDING_ADD"};function ig(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":ng[n.combine]||"ENVMAP_BLENDING_NONE"}function sg(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function rg(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=Z0(e),l=Q0(e),h=eg(e),p=ig(e),u=sg(e),_=H0(e),g=V0(r),x=s.createProgram();let f,d,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(vs).join(`
`),f.length>0&&(f+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(vs).join(`
`),d.length>0&&(d+=`
`)):(f=[xc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vs).join(`
`),d=[xc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Pn?"#define TONE_MAPPING":"",e.toneMapping!==Pn?Wt.tonemapping_pars_fragment:"",e.toneMapping!==Pn?k0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,B0("linearToOutputTexel",e.outputColorSpace),G0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(vs).join(`
`)),a=So(a),a=mc(a,e),a=gc(a,e),o=So(o),o=mc(o,e),o=gc(o,e),a=_c(a),o=_c(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,f=[_,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,d=["#define varying in",e.glslVersion===Sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const w=M+f+a,T=M+d+o,P=dc(s,s.VERTEX_SHADER,w),A=dc(s,s.FRAGMENT_SHADER,T);s.attachShader(x,P),s.attachShader(x,A),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function y(R){if(n.debug.checkShaderErrors){const I=s.getProgramInfoLog(x)||"",G=s.getShaderInfoLog(P)||"",X=s.getShaderInfoLog(A)||"",U=I.trim(),H=G.trim(),O=X.trim();let Q=!0,nt=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,P,A);else{const ft=pc(s,P,"vertex"),wt=pc(s,A,"fragment");Jt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+U+`
`+ft+`
`+wt)}else U!==""?Dt("WebGLProgram: Program Info Log:",U):(H===""||O==="")&&(nt=!1);nt&&(R.diagnostics={runnable:Q,programLog:U,vertexShader:{log:H,prefix:f},fragmentShader:{log:O,prefix:d}})}s.deleteShader(P),s.deleteShader(A),m=new fr(s,x),S=W0(s,x)}let m;this.getUniforms=function(){return m===void 0&&y(this),m};let S;this.getAttributes=function(){return S===void 0&&y(this),S};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(x,U0)),C},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=N0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=P,this.fragmentShader=A,this}let ag=0;class og{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new lg(t),e.set(t,i)),i}}class lg{constructor(t){this.id=ag++,this.code=t,this.usedTimes=0}}function cg(n){return n===yi||n===_r||n===xr}function ug(n,t,e,i,s,r){const a=new Vo,o=new og,c=new Set,l=[],h=new Map,p=i.logarithmicDepthBuffer;let u=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(m){return c.add(m),m===0?"uv":`uv${m}`}function x(m,S,C,R,I,G){const X=R.fog,U=I.geometry,H=m.isMeshStandardMaterial||m.isMeshLambertMaterial||m.isMeshPhongMaterial?R.environment:null,O=m.isMeshStandardMaterial||m.isMeshLambertMaterial&&!m.envMap||m.isMeshPhongMaterial&&!m.envMap,Q=t.get(m.envMap||H,O),nt=Q&&Q.mapping===Cr?Q.image.height:null,ft=_[m.type];m.precision!==null&&(u=i.getMaxPrecision(m.precision),u!==m.precision&&Dt("WebGLProgram.getParameters:",m.precision,"not supported, using",u,"instead."));const wt=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Rt=wt!==void 0?wt.length:0;let it=0;U.morphAttributes.position!==void 0&&(it=1),U.morphAttributes.normal!==void 0&&(it=2),U.morphAttributes.color!==void 0&&(it=3);let Mt,xt,q,gt;if(ft){const Gt=Rn[ft];Mt=Gt.vertexShader,xt=Gt.fragmentShader}else Mt=m.vertexShader,xt=m.fragmentShader,o.update(m),q=o.getVertexShaderID(m),gt=o.getFragmentShaderID(m);const ot=n.getRenderTarget(),Ut=n.state.buffers.depth.getReversed(),zt=I.isInstancedMesh===!0,Ft=I.isBatchedMesh===!0,xe=!!m.map,$t=!!m.matcap,re=!!Q,me=!!m.aoMap,Yt=!!m.lightMap,Le=!!m.bumpMap,ve=!!m.normalMap,nn=!!m.displacementMap,N=!!m.emissiveMap,De=!!m.metalnessMap,jt=!!m.roughnessMap,fe=m.anisotropy>0,pt=m.clearcoat>0,Se=m.dispersion>0,E=m.iridescence>0,v=m.sheen>0,B=m.transmission>0,j=fe&&!!m.anisotropyMap,et=pt&&!!m.clearcoatMap,st=pt&&!!m.clearcoatNormalMap,ht=pt&&!!m.clearcoatRoughnessMap,Y=E&&!!m.iridescenceMap,Z=E&&!!m.iridescenceThicknessMap,St=v&&!!m.sheenColorMap,Et=v&&!!m.sheenRoughnessMap,lt=!!m.specularMap,rt=!!m.specularColorMap,Ot=!!m.specularIntensityMap,Vt=B&&!!m.transmissionMap,ne=B&&!!m.thicknessMap,L=!!m.gradientMap,at=!!m.alphaMap,$=m.alphaTest>0,bt=!!m.alphaHash,ct=!!m.extensions;let tt=Pn;m.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(tt=n.toneMapping);const Ct={shaderID:ft,shaderType:m.type,shaderName:m.name,vertexShader:Mt,fragmentShader:xt,defines:m.defines,customVertexShaderID:q,customFragmentShaderID:gt,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:u,batching:Ft,batchingColor:Ft&&I._colorsTexture!==null,instancing:zt,instancingColor:zt&&I.instanceColor!==null,instancingMorph:zt&&I.morphTexture!==null,outputColorSpace:ot===null?n.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Kt.workingColorSpace,alphaToCoverage:!!m.alphaToCoverage,map:xe,matcap:$t,envMap:re,envMapMode:re&&Q.mapping,envMapCubeUVHeight:nt,aoMap:me,lightMap:Yt,bumpMap:Le,normalMap:ve,displacementMap:nn,emissiveMap:N,normalMapObjectSpace:ve&&m.normalMapType===Th,normalMapTangentSpace:ve&&m.normalMapType===vr,packedNormalMap:ve&&m.normalMapType===vr&&cg(m.normalMap.format),metalnessMap:De,roughnessMap:jt,anisotropy:fe,anisotropyMap:j,clearcoat:pt,clearcoatMap:et,clearcoatNormalMap:st,clearcoatRoughnessMap:ht,dispersion:Se,iridescence:E,iridescenceMap:Y,iridescenceThicknessMap:Z,sheen:v,sheenColorMap:St,sheenRoughnessMap:Et,specularMap:lt,specularColorMap:rt,specularIntensityMap:Ot,transmission:B,transmissionMap:Vt,thicknessMap:ne,gradientMap:L,opaque:m.transparent===!1&&m.blending===ji&&m.alphaToCoverage===!1,alphaMap:at,alphaTest:$,alphaHash:bt,combine:m.combine,mapUv:xe&&g(m.map.channel),aoMapUv:me&&g(m.aoMap.channel),lightMapUv:Yt&&g(m.lightMap.channel),bumpMapUv:Le&&g(m.bumpMap.channel),normalMapUv:ve&&g(m.normalMap.channel),displacementMapUv:nn&&g(m.displacementMap.channel),emissiveMapUv:N&&g(m.emissiveMap.channel),metalnessMapUv:De&&g(m.metalnessMap.channel),roughnessMapUv:jt&&g(m.roughnessMap.channel),anisotropyMapUv:j&&g(m.anisotropyMap.channel),clearcoatMapUv:et&&g(m.clearcoatMap.channel),clearcoatNormalMapUv:st&&g(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ht&&g(m.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&g(m.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&g(m.iridescenceThicknessMap.channel),sheenColorMapUv:St&&g(m.sheenColorMap.channel),sheenRoughnessMapUv:Et&&g(m.sheenRoughnessMap.channel),specularMapUv:lt&&g(m.specularMap.channel),specularColorMapUv:rt&&g(m.specularColorMap.channel),specularIntensityMapUv:Ot&&g(m.specularIntensityMap.channel),transmissionMapUv:Vt&&g(m.transmissionMap.channel),thicknessMapUv:ne&&g(m.thicknessMap.channel),alphaMapUv:at&&g(m.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(ve||fe),vertexNormals:!!U.attributes.normal,vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!U.attributes.uv&&(xe||at),fog:!!X,useFog:m.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:m.wireframe===!1&&(m.flatShading===!0||U.attributes.normal===void 0&&ve===!1&&(m.isMeshLambertMaterial||m.isMeshPhongMaterial||m.isMeshStandardMaterial||m.isMeshPhysicalMaterial)),sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Ut,skinning:I.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Rt,morphTextureStride:it,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:m.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:tt,decodeVideoTexture:xe&&m.map.isVideoTexture===!0&&Kt.getTransfer(m.map.colorSpace)===ie,decodeVideoTextureEmissive:N&&m.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(m.emissiveMap.colorSpace)===ie,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===Vn,flipSided:m.side===Ke,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:ct&&m.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ct&&m.extensions.multiDraw===!0||Ft)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return Ct.vertexUv1s=c.has(1),Ct.vertexUv2s=c.has(2),Ct.vertexUv3s=c.has(3),c.clear(),Ct}function f(m){const S=[];if(m.shaderID?S.push(m.shaderID):(S.push(m.customVertexShaderID),S.push(m.customFragmentShaderID)),m.defines!==void 0)for(const C in m.defines)S.push(C),S.push(m.defines[C]);return m.isRawShaderMaterial===!1&&(d(S,m),M(S,m),S.push(n.outputColorSpace)),S.push(m.customProgramCacheKey),S.join()}function d(m,S){m.push(S.precision),m.push(S.outputColorSpace),m.push(S.envMapMode),m.push(S.envMapCubeUVHeight),m.push(S.mapUv),m.push(S.alphaMapUv),m.push(S.lightMapUv),m.push(S.aoMapUv),m.push(S.bumpMapUv),m.push(S.normalMapUv),m.push(S.displacementMapUv),m.push(S.emissiveMapUv),m.push(S.metalnessMapUv),m.push(S.roughnessMapUv),m.push(S.anisotropyMapUv),m.push(S.clearcoatMapUv),m.push(S.clearcoatNormalMapUv),m.push(S.clearcoatRoughnessMapUv),m.push(S.iridescenceMapUv),m.push(S.iridescenceThicknessMapUv),m.push(S.sheenColorMapUv),m.push(S.sheenRoughnessMapUv),m.push(S.specularMapUv),m.push(S.specularColorMapUv),m.push(S.specularIntensityMapUv),m.push(S.transmissionMapUv),m.push(S.thicknessMapUv),m.push(S.combine),m.push(S.fogExp2),m.push(S.sizeAttenuation),m.push(S.morphTargetsCount),m.push(S.morphAttributeCount),m.push(S.numDirLights),m.push(S.numPointLights),m.push(S.numSpotLights),m.push(S.numSpotLightMaps),m.push(S.numHemiLights),m.push(S.numRectAreaLights),m.push(S.numDirLightShadows),m.push(S.numPointLightShadows),m.push(S.numSpotLightShadows),m.push(S.numSpotLightShadowsWithMaps),m.push(S.numLightProbes),m.push(S.shadowMapType),m.push(S.toneMapping),m.push(S.numClippingPlanes),m.push(S.numClipIntersection),m.push(S.depthPacking)}function M(m,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),m.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),m.push(a.mask)}function w(m){const S=_[m.type];let C;if(S){const R=Rn[S];C=wd.clone(R.uniforms)}else C=m.uniforms;return C}function T(m,S){let C=h.get(S);return C!==void 0?++C.usedTimes:(C=new rg(n,S,m,s),l.push(C),h.set(S,C)),C}function P(m){if(--m.usedTimes===0){const S=l.indexOf(m);l[S]=l[l.length-1],l.pop(),h.delete(m.cacheKey),m.destroy()}}function A(m){o.remove(m)}function y(){o.dispose()}return{getParameters:x,getProgramCacheKey:f,getUniforms:w,acquireProgram:T,releaseProgram:P,releaseShaderCache:A,programs:l,dispose:y}}function hg(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function dg(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function vc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Mc(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u){let _=0;return u.isInstancedMesh&&(_+=2),u.isSkinnedMesh&&(_+=1),_}function o(u,_,g,x,f,d){let M=n[t];return M===void 0?(M={id:u.id,object:u,geometry:_,material:g,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:f,group:d},n[t]=M):(M.id=u.id,M.object=u,M.geometry=_,M.material=g,M.materialVariant=a(u),M.groupOrder=x,M.renderOrder=u.renderOrder,M.z=f,M.group=d),t++,M}function c(u,_,g,x,f,d){const M=o(u,_,g,x,f,d);g.transmission>0?i.push(M):g.transparent===!0?s.push(M):e.push(M)}function l(u,_,g,x,f,d){const M=o(u,_,g,x,f,d);g.transmission>0?i.unshift(M):g.transparent===!0?s.unshift(M):e.unshift(M)}function h(u,_){e.length>1&&e.sort(u||dg),i.length>1&&i.sort(_||vc),s.length>1&&s.sort(_||vc)}function p(){for(let u=t,_=n.length;u<_;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:p,sort:h}}function fg(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new Mc,n.set(i,[a])):s>=r.length?(a=new Mc,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function pg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Bt};break;case"SpotLight":e={position:new D,direction:new D,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":e={color:new Bt,position:new D,halfWidth:new D,halfHeight:new D};break}return n[t.id]=e,e}}}function mg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let gg=0;function _g(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function xg(n){const t=new pg,e=mg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new D);const s=new D,r=new ce,a=new ce;function o(l){let h=0,p=0,u=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let _=0,g=0,x=0,f=0,d=0,M=0,w=0,T=0,P=0,A=0,y=0;l.sort(_g);for(let S=0,C=l.length;S<C;S++){const R=l[S],I=R.color,G=R.intensity,X=R.distance;let U=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===yi?U=R.shadow.map.texture:U=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=I.r*G,p+=I.g*G,u+=I.b*G;else if(R.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(R.sh.coefficients[H],G);y++}else if(R.isDirectionalLight){const H=t.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const O=R.shadow,Q=e.get(R);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,i.directionalShadow[_]=Q,i.directionalShadowMap[_]=U,i.directionalShadowMatrix[_]=R.shadow.matrix,M++}i.directional[_]=H,_++}else if(R.isSpotLight){const H=t.get(R);H.position.setFromMatrixPosition(R.matrixWorld),H.color.copy(I).multiplyScalar(G),H.distance=X,H.coneCos=Math.cos(R.angle),H.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),H.decay=R.decay,i.spot[x]=H;const O=R.shadow;if(R.map&&(i.spotLightMap[P]=R.map,P++,O.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[x]=O.matrix,R.castShadow){const Q=e.get(R);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,i.spotShadow[x]=Q,i.spotShadowMap[x]=U,T++}x++}else if(R.isRectAreaLight){const H=t.get(R);H.color.copy(I).multiplyScalar(G),H.halfWidth.set(R.width*.5,0,0),H.halfHeight.set(0,R.height*.5,0),i.rectArea[f]=H,f++}else if(R.isPointLight){const H=t.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),H.distance=R.distance,H.decay=R.decay,R.castShadow){const O=R.shadow,Q=e.get(R);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,Q.shadowCameraNear=O.camera.near,Q.shadowCameraFar=O.camera.far,i.pointShadow[g]=Q,i.pointShadowMap[g]=U,i.pointShadowMatrix[g]=R.shadow.matrix,w++}i.point[g]=H,g++}else if(R.isHemisphereLight){const H=t.get(R);H.skyColor.copy(R.color).multiplyScalar(G),H.groundColor.copy(R.groundColor).multiplyScalar(G),i.hemi[d]=H,d++}}f>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=mt.LTC_FLOAT_1,i.rectAreaLTC2=mt.LTC_FLOAT_2):(i.rectAreaLTC1=mt.LTC_HALF_1,i.rectAreaLTC2=mt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=p,i.ambient[2]=u;const m=i.hash;(m.directionalLength!==_||m.pointLength!==g||m.spotLength!==x||m.rectAreaLength!==f||m.hemiLength!==d||m.numDirectionalShadows!==M||m.numPointShadows!==w||m.numSpotShadows!==T||m.numSpotMaps!==P||m.numLightProbes!==y)&&(i.directional.length=_,i.spot.length=x,i.rectArea.length=f,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=T+P-A,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=y,m.directionalLength=_,m.pointLength=g,m.spotLength=x,m.rectAreaLength=f,m.hemiLength=d,m.numDirectionalShadows=M,m.numPointShadows=w,m.numSpotShadows=T,m.numSpotMaps=P,m.numLightProbes=y,i.version=gg++)}function c(l,h){let p=0,u=0,_=0,g=0,x=0;const f=h.matrixWorldInverse;for(let d=0,M=l.length;d<M;d++){const w=l[d];if(w.isDirectionalLight){const T=i.directional[p];T.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(f),p++}else if(w.isSpotLight){const T=i.spot[_];T.position.setFromMatrixPosition(w.matrixWorld),T.position.applyMatrix4(f),T.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(f),_++}else if(w.isRectAreaLight){const T=i.rectArea[g];T.position.setFromMatrixPosition(w.matrixWorld),T.position.applyMatrix4(f),a.identity(),r.copy(w.matrixWorld),r.premultiply(f),a.extractRotation(r),T.halfWidth.set(w.width*.5,0,0),T.halfHeight.set(0,w.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),g++}else if(w.isPointLight){const T=i.point[u];T.position.setFromMatrixPosition(w.matrixWorld),T.position.applyMatrix4(f),u++}else if(w.isHemisphereLight){const T=i.hemi[x];T.direction.setFromMatrixPosition(w.matrixWorld),T.direction.transformDirection(f),x++}}}return{setup:o,setupView:c,state:i}}function Sc(n){const t=new xg(n),e=[],i=[],s=[];function r(u){p.camera=u,e.length=0,i.length=0,s.length=0}function a(u){e.push(u)}function o(u){i.push(u)}function c(u){s.push(u)}function l(){t.setup(e)}function h(u){t.setupView(e,u)}const p={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function vg(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Sc(n),t.set(s,[o])):r>=a.length?(o=new Sc(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const Mg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,bg=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],yg=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],bc=new ce,gs=new D,va=new D;function Eg(n,t,e){let i=new qo;const s=new Nt,r=new Nt,a=new Ee,o=new Ld,c=new Dd,l={},h=e.maxTextureSize,p={[ui]:Ke,[Ke]:ui,[Vn]:Vn},u=new Un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Nt},radius:{value:4}},vertexShader:Mg,fragmentShader:Sg}),_=u.clone();_.defines.HORIZONTAL_PASS=1;const g=new Ze;g.setAttribute("position",new mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Qt(g,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ms;let d=this.type;this.render=function(A,y,m){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||A.length===0)return;this.type===nh&&(Dt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ms);const S=n.getRenderTarget(),C=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),I=n.state;I.setBlending(Xn),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const G=d!==this.type;G&&y.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(U=>U.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,U=A.length;X<U;X++){const H=A[X],O=H.shadow;if(O===void 0){Dt("WebGLShadowMap:",H,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const Q=O.getFrameExtents();s.multiply(Q),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,O.mapSize.y=r.y));const nt=n.state.buffers.depth.getReversed();if(O.camera._reversedDepth=nt,O.map===null||G===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===xs){if(H.isPointLight){Dt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new Ln(s.x,s.y,{format:yi,type:$n,minFilter:We,magFilter:We,generateMipmaps:!1}),O.map.texture.name=H.name+".shadowMap",O.map.depthTexture=new ts(s.x,s.y,Mn),O.map.depthTexture.name=H.name+".shadowMapDepth",O.map.depthTexture.format=jn,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=ze,O.map.depthTexture.magFilter=ze}else H.isPointLight?(O.map=new Eu(s.x),O.map.depthTexture=new Ed(s.x,Dn)):(O.map=new Ln(s.x,s.y),O.map.depthTexture=new ts(s.x,s.y,Dn)),O.map.depthTexture.name=H.name+".shadowMap",O.map.depthTexture.format=jn,this.type===Ms?(O.map.depthTexture.compareFunction=nt?ko:zo,O.map.depthTexture.minFilter=We,O.map.depthTexture.magFilter=We):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=ze,O.map.depthTexture.magFilter=ze);O.camera.updateProjectionMatrix()}const ft=O.map.isWebGLCubeRenderTarget?6:1;for(let wt=0;wt<ft;wt++){if(O.map.isWebGLCubeRenderTarget)n.setRenderTarget(O.map,wt),n.clear();else{wt===0&&(n.setRenderTarget(O.map),n.clear());const Rt=O.getViewport(wt);a.set(r.x*Rt.x,r.y*Rt.y,r.x*Rt.z,r.y*Rt.w),I.viewport(a)}if(H.isPointLight){const Rt=O.camera,it=O.matrix,Mt=H.distance||Rt.far;Mt!==Rt.far&&(Rt.far=Mt,Rt.updateProjectionMatrix()),gs.setFromMatrixPosition(H.matrixWorld),Rt.position.copy(gs),va.copy(Rt.position),va.add(bg[wt]),Rt.up.copy(yg[wt]),Rt.lookAt(va),Rt.updateMatrixWorld(),it.makeTranslation(-gs.x,-gs.y,-gs.z),bc.multiplyMatrices(Rt.projectionMatrix,Rt.matrixWorldInverse),O._frustum.setFromProjectionMatrix(bc,Rt.coordinateSystem,Rt.reversedDepth)}else O.updateMatrices(H);i=O.getFrustum(),T(y,m,O.camera,H,this.type)}O.isPointLightShadow!==!0&&this.type===xs&&M(O,m),O.needsUpdate=!1}d=this.type,f.needsUpdate=!1,n.setRenderTarget(S,C,R)};function M(A,y){const m=t.update(x);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,_.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,_.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Ln(s.x,s.y,{format:yi,type:$n})),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(y,null,m,u,x,null),_.uniforms.shadow_pass.value=A.mapPass.texture,_.uniforms.resolution.value=A.mapSize,_.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(y,null,m,_,x,null)}function w(A,y,m,S){let C=null;const R=m.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)C=R;else if(C=m.isPointLight===!0?c:o,n.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){const I=C.uuid,G=y.uuid;let X=l[I];X===void 0&&(X={},l[I]=X);let U=X[G];U===void 0&&(U=C.clone(),X[G]=U,y.addEventListener("dispose",P)),C=U}if(C.visible=y.visible,C.wireframe=y.wireframe,S===xs?C.side=y.shadowSide!==null?y.shadowSide:y.side:C.side=y.shadowSide!==null?y.shadowSide:p[y.side],C.alphaMap=y.alphaMap,C.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,C.map=y.map,C.clipShadows=y.clipShadows,C.clippingPlanes=y.clippingPlanes,C.clipIntersection=y.clipIntersection,C.displacementMap=y.displacementMap,C.displacementScale=y.displacementScale,C.displacementBias=y.displacementBias,C.wireframeLinewidth=y.wireframeLinewidth,C.linewidth=y.linewidth,m.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const I=n.properties.get(C);I.light=m}return C}function T(A,y,m,S,C){if(A.visible===!1)return;if(A.layers.test(y.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&C===xs)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(m.matrixWorldInverse,A.matrixWorld);const G=t.update(A),X=A.material;if(Array.isArray(X)){const U=G.groups;for(let H=0,O=U.length;H<O;H++){const Q=U[H],nt=X[Q.materialIndex];if(nt&&nt.visible){const ft=w(A,nt,S,C);A.onBeforeShadow(n,A,y,m,G,ft,Q),n.renderBufferDirect(m,null,G,ft,A,Q),A.onAfterShadow(n,A,y,m,G,ft,Q)}}}else if(X.visible){const U=w(A,X,S,C);A.onBeforeShadow(n,A,y,m,G,U,null),n.renderBufferDirect(m,null,G,U,A,null),A.onAfterShadow(n,A,y,m,G,U,null)}}const I=A.children;for(let G=0,X=I.length;G<X;G++)T(I[G],y,m,S,C)}function P(A){A.target.removeEventListener("dispose",P);for(const m in l){const S=l[m],C=A.target.uuid;C in S&&(S[C].dispose(),delete S[C])}}}function Tg(n,t){function e(){let L=!1;const at=new Ee;let $=null;const bt=new Ee(0,0,0,0);return{setMask:function(ct){$!==ct&&!L&&(n.colorMask(ct,ct,ct,ct),$=ct)},setLocked:function(ct){L=ct},setClear:function(ct,tt,Ct,Gt,Te){Te===!0&&(ct*=Gt,tt*=Gt,Ct*=Gt),at.set(ct,tt,Ct,Gt),bt.equals(at)===!1&&(n.clearColor(ct,tt,Ct,Gt),bt.copy(at))},reset:function(){L=!1,$=null,bt.set(-1,0,0,0)}}}function i(){let L=!1,at=!1,$=null,bt=null,ct=null;return{setReversed:function(tt){if(at!==tt){const Ct=t.get("EXT_clip_control");tt?Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT):Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT),at=tt;const Gt=ct;ct=null,this.setClear(Gt)}},getReversed:function(){return at},setTest:function(tt){tt?ot(n.DEPTH_TEST):Ut(n.DEPTH_TEST)},setMask:function(tt){$!==tt&&!L&&(n.depthMask(tt),$=tt)},setFunc:function(tt){if(at&&(tt=Nh[tt]),bt!==tt){switch(tt){case La:n.depthFunc(n.NEVER);break;case Da:n.depthFunc(n.ALWAYS);break;case Ia:n.depthFunc(n.LESS);break;case Ji:n.depthFunc(n.LEQUAL);break;case Ua:n.depthFunc(n.EQUAL);break;case Na:n.depthFunc(n.GEQUAL);break;case Fa:n.depthFunc(n.GREATER);break;case Oa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}bt=tt}},setLocked:function(tt){L=tt},setClear:function(tt){ct!==tt&&(ct=tt,at&&(tt=1-tt),n.clearDepth(tt))},reset:function(){L=!1,$=null,bt=null,ct=null,at=!1}}}function s(){let L=!1,at=null,$=null,bt=null,ct=null,tt=null,Ct=null,Gt=null,Te=null;return{setTest:function(ae){L||(ae?ot(n.STENCIL_TEST):Ut(n.STENCIL_TEST))},setMask:function(ae){at!==ae&&!L&&(n.stencilMask(ae),at=ae)},setFunc:function(ae,Fn,En){($!==ae||bt!==Fn||ct!==En)&&(n.stencilFunc(ae,Fn,En),$=ae,bt=Fn,ct=En)},setOp:function(ae,Fn,En){(tt!==ae||Ct!==Fn||Gt!==En)&&(n.stencilOp(ae,Fn,En),tt=ae,Ct=Fn,Gt=En)},setLocked:function(ae){L=ae},setClear:function(ae){Te!==ae&&(n.clearStencil(ae),Te=ae)},reset:function(){L=!1,at=null,$=null,bt=null,ct=null,tt=null,Ct=null,Gt=null,Te=null}}}const r=new e,a=new i,o=new s,c=new WeakMap,l=new WeakMap;let h={},p={},u={},_=new WeakMap,g=[],x=null,f=!1,d=null,M=null,w=null,T=null,P=null,A=null,y=null,m=new Bt(0,0,0),S=0,C=!1,R=null,I=null,G=null,X=null,U=null;const H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,Q=0;const nt=n.getParameter(n.VERSION);nt.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(nt)[1]),O=Q>=1):nt.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(nt)[1]),O=Q>=2);let ft=null,wt={};const Rt=n.getParameter(n.SCISSOR_BOX),it=n.getParameter(n.VIEWPORT),Mt=new Ee().fromArray(Rt),xt=new Ee().fromArray(it);function q(L,at,$,bt){const ct=new Uint8Array(4),tt=n.createTexture();n.bindTexture(L,tt),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ct=0;Ct<$;Ct++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(at,0,n.RGBA,1,1,bt,0,n.RGBA,n.UNSIGNED_BYTE,ct):n.texImage2D(at+Ct,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ct);return tt}const gt={};gt[n.TEXTURE_2D]=q(n.TEXTURE_2D,n.TEXTURE_2D,1),gt[n.TEXTURE_CUBE_MAP]=q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),gt[n.TEXTURE_2D_ARRAY]=q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),gt[n.TEXTURE_3D]=q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ot(n.DEPTH_TEST),a.setFunc(Ji),Le(!1),ve(ml),ot(n.CULL_FACE),me(Xn);function ot(L){h[L]!==!0&&(n.enable(L),h[L]=!0)}function Ut(L){h[L]!==!1&&(n.disable(L),h[L]=!1)}function zt(L,at){return u[L]!==at?(n.bindFramebuffer(L,at),u[L]=at,L===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=at),L===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=at),!0):!1}function Ft(L,at){let $=g,bt=!1;if(L){$=_.get(at),$===void 0&&($=[],_.set(at,$));const ct=L.textures;if($.length!==ct.length||$[0]!==n.COLOR_ATTACHMENT0){for(let tt=0,Ct=ct.length;tt<Ct;tt++)$[tt]=n.COLOR_ATTACHMENT0+tt;$.length=ct.length,bt=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,bt=!0);bt&&n.drawBuffers($)}function xe(L){return x!==L?(n.useProgram(L),x=L,!0):!1}const $t={[xi]:n.FUNC_ADD,[sh]:n.FUNC_SUBTRACT,[rh]:n.FUNC_REVERSE_SUBTRACT};$t[ah]=n.MIN,$t[oh]=n.MAX;const re={[lh]:n.ZERO,[ch]:n.ONE,[uh]:n.SRC_COLOR,[Ca]:n.SRC_ALPHA,[gh]:n.SRC_ALPHA_SATURATE,[ph]:n.DST_COLOR,[dh]:n.DST_ALPHA,[hh]:n.ONE_MINUS_SRC_COLOR,[Pa]:n.ONE_MINUS_SRC_ALPHA,[mh]:n.ONE_MINUS_DST_COLOR,[fh]:n.ONE_MINUS_DST_ALPHA,[_h]:n.CONSTANT_COLOR,[xh]:n.ONE_MINUS_CONSTANT_COLOR,[vh]:n.CONSTANT_ALPHA,[Mh]:n.ONE_MINUS_CONSTANT_ALPHA};function me(L,at,$,bt,ct,tt,Ct,Gt,Te,ae){if(L===Xn){f===!0&&(Ut(n.BLEND),f=!1);return}if(f===!1&&(ot(n.BLEND),f=!0),L!==ih){if(L!==d||ae!==C){if((M!==xi||P!==xi)&&(n.blendEquation(n.FUNC_ADD),M=xi,P=xi),ae)switch(L){case ji:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gl:n.blendFunc(n.ONE,n.ONE);break;case _l:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case xl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Jt("WebGLState: Invalid blending: ",L);break}else switch(L){case ji:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case _l:Jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case xl:Jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Jt("WebGLState: Invalid blending: ",L);break}w=null,T=null,A=null,y=null,m.set(0,0,0),S=0,d=L,C=ae}return}ct=ct||at,tt=tt||$,Ct=Ct||bt,(at!==M||ct!==P)&&(n.blendEquationSeparate($t[at],$t[ct]),M=at,P=ct),($!==w||bt!==T||tt!==A||Ct!==y)&&(n.blendFuncSeparate(re[$],re[bt],re[tt],re[Ct]),w=$,T=bt,A=tt,y=Ct),(Gt.equals(m)===!1||Te!==S)&&(n.blendColor(Gt.r,Gt.g,Gt.b,Te),m.copy(Gt),S=Te),d=L,C=!1}function Yt(L,at){L.side===Vn?Ut(n.CULL_FACE):ot(n.CULL_FACE);let $=L.side===Ke;at&&($=!$),Le($),L.blending===ji&&L.transparent===!1?me(Xn):me(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const bt=L.stencilWrite;o.setTest(bt),bt&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),N(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ot(n.SAMPLE_ALPHA_TO_COVERAGE):Ut(n.SAMPLE_ALPHA_TO_COVERAGE)}function Le(L){R!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),R=L)}function ve(L){L!==th?(ot(n.CULL_FACE),L!==I&&(L===ml?n.cullFace(n.BACK):L===eh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ut(n.CULL_FACE),I=L}function nn(L){L!==G&&(O&&n.lineWidth(L),G=L)}function N(L,at,$){L?(ot(n.POLYGON_OFFSET_FILL),(X!==at||U!==$)&&(X=at,U=$,a.getReversed()&&(at=-at),n.polygonOffset(at,$))):Ut(n.POLYGON_OFFSET_FILL)}function De(L){L?ot(n.SCISSOR_TEST):Ut(n.SCISSOR_TEST)}function jt(L){L===void 0&&(L=n.TEXTURE0+H-1),ft!==L&&(n.activeTexture(L),ft=L)}function fe(L,at,$){$===void 0&&(ft===null?$=n.TEXTURE0+H-1:$=ft);let bt=wt[$];bt===void 0&&(bt={type:void 0,texture:void 0},wt[$]=bt),(bt.type!==L||bt.texture!==at)&&(ft!==$&&(n.activeTexture($),ft=$),n.bindTexture(L,at||gt[L]),bt.type=L,bt.texture=at)}function pt(){const L=wt[ft];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Se(){try{n.compressedTexImage2D(...arguments)}catch(L){Jt("WebGLState:",L)}}function E(){try{n.compressedTexImage3D(...arguments)}catch(L){Jt("WebGLState:",L)}}function v(){try{n.texSubImage2D(...arguments)}catch(L){Jt("WebGLState:",L)}}function B(){try{n.texSubImage3D(...arguments)}catch(L){Jt("WebGLState:",L)}}function j(){try{n.compressedTexSubImage2D(...arguments)}catch(L){Jt("WebGLState:",L)}}function et(){try{n.compressedTexSubImage3D(...arguments)}catch(L){Jt("WebGLState:",L)}}function st(){try{n.texStorage2D(...arguments)}catch(L){Jt("WebGLState:",L)}}function ht(){try{n.texStorage3D(...arguments)}catch(L){Jt("WebGLState:",L)}}function Y(){try{n.texImage2D(...arguments)}catch(L){Jt("WebGLState:",L)}}function Z(){try{n.texImage3D(...arguments)}catch(L){Jt("WebGLState:",L)}}function St(L){return p[L]!==void 0?p[L]:n.getParameter(L)}function Et(L,at){p[L]!==at&&(n.pixelStorei(L,at),p[L]=at)}function lt(L){Mt.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Mt.copy(L))}function rt(L){xt.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),xt.copy(L))}function Ot(L,at){let $=l.get(at);$===void 0&&($=new WeakMap,l.set(at,$));let bt=$.get(L);bt===void 0&&(bt=n.getUniformBlockIndex(at,L.name),$.set(L,bt))}function Vt(L,at){const bt=l.get(at).get(L);c.get(at)!==bt&&(n.uniformBlockBinding(at,bt,L.__bindingPointIndex),c.set(at,bt))}function ne(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},p={},ft=null,wt={},u={},_=new WeakMap,g=[],x=null,f=!1,d=null,M=null,w=null,T=null,P=null,A=null,y=null,m=new Bt(0,0,0),S=0,C=!1,R=null,I=null,G=null,X=null,U=null,Mt.set(0,0,n.canvas.width,n.canvas.height),xt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ot,disable:Ut,bindFramebuffer:zt,drawBuffers:Ft,useProgram:xe,setBlending:me,setMaterial:Yt,setFlipSided:Le,setCullFace:ve,setLineWidth:nn,setPolygonOffset:N,setScissorTest:De,activeTexture:jt,bindTexture:fe,unbindTexture:pt,compressedTexImage2D:Se,compressedTexImage3D:E,texImage2D:Y,texImage3D:Z,pixelStorei:Et,getParameter:St,updateUBOMapping:Ot,uniformBlockBinding:Vt,texStorage2D:st,texStorage3D:ht,texSubImage2D:v,texSubImage3D:B,compressedTexSubImage2D:j,compressedTexSubImage3D:et,scissor:lt,viewport:rt,reset:ne}}function wg(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Nt,h=new WeakMap,p=new Set;let u;const _=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(E,v){return g?new OffscreenCanvas(E,v):br("canvas")}function f(E,v,B){let j=1;const et=Se(E);if((et.width>B||et.height>B)&&(j=B/Math.max(et.width,et.height)),j<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const st=Math.floor(j*et.width),ht=Math.floor(j*et.height);u===void 0&&(u=x(st,ht));const Y=v?x(st,ht):u;return Y.width=st,Y.height=ht,Y.getContext("2d").drawImage(E,0,0,st,ht),Dt("WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+st+"x"+ht+")."),Y}else return"data"in E&&Dt("WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),E;return E}function d(E){return E.generateMipmaps}function M(E){n.generateMipmap(E)}function w(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(E,v,B,j,et,st=!1){if(E!==null){if(n[E]!==void 0)return n[E];Dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ht;j&&(ht=t.get("EXT_texture_norm16"),ht||Dt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=v;if(v===n.RED&&(B===n.FLOAT&&(Y=n.R32F),B===n.HALF_FLOAT&&(Y=n.R16F),B===n.UNSIGNED_BYTE&&(Y=n.R8),B===n.UNSIGNED_SHORT&&ht&&(Y=ht.R16_EXT),B===n.SHORT&&ht&&(Y=ht.R16_SNORM_EXT)),v===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(Y=n.R8UI),B===n.UNSIGNED_SHORT&&(Y=n.R16UI),B===n.UNSIGNED_INT&&(Y=n.R32UI),B===n.BYTE&&(Y=n.R8I),B===n.SHORT&&(Y=n.R16I),B===n.INT&&(Y=n.R32I)),v===n.RG&&(B===n.FLOAT&&(Y=n.RG32F),B===n.HALF_FLOAT&&(Y=n.RG16F),B===n.UNSIGNED_BYTE&&(Y=n.RG8),B===n.UNSIGNED_SHORT&&ht&&(Y=ht.RG16_EXT),B===n.SHORT&&ht&&(Y=ht.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(Y=n.RG8UI),B===n.UNSIGNED_SHORT&&(Y=n.RG16UI),B===n.UNSIGNED_INT&&(Y=n.RG32UI),B===n.BYTE&&(Y=n.RG8I),B===n.SHORT&&(Y=n.RG16I),B===n.INT&&(Y=n.RG32I)),v===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),B===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),B===n.UNSIGNED_INT&&(Y=n.RGB32UI),B===n.BYTE&&(Y=n.RGB8I),B===n.SHORT&&(Y=n.RGB16I),B===n.INT&&(Y=n.RGB32I)),v===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),B===n.UNSIGNED_INT&&(Y=n.RGBA32UI),B===n.BYTE&&(Y=n.RGBA8I),B===n.SHORT&&(Y=n.RGBA16I),B===n.INT&&(Y=n.RGBA32I)),v===n.RGB&&(B===n.UNSIGNED_SHORT&&ht&&(Y=ht.RGB16_EXT),B===n.SHORT&&ht&&(Y=ht.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(Y=n.R11F_G11F_B10F)),v===n.RGBA){const Z=st?Sr:Kt.getTransfer(et);B===n.FLOAT&&(Y=n.RGBA32F),B===n.HALF_FLOAT&&(Y=n.RGBA16F),B===n.UNSIGNED_BYTE&&(Y=Z===ie?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&ht&&(Y=ht.RGBA16_EXT),B===n.SHORT&&ht&&(Y=ht.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function P(E,v){let B;return E?v===null||v===Dn||v===Es?B=n.DEPTH24_STENCIL8:v===Mn?B=n.DEPTH32F_STENCIL8:v===ys&&(B=n.DEPTH24_STENCIL8,Dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Dn||v===Es?B=n.DEPTH_COMPONENT24:v===Mn?B=n.DEPTH_COMPONENT32F:v===ys&&(B=n.DEPTH_COMPONENT16),B}function A(E,v){return d(E)===!0||E.isFramebufferTexture&&E.minFilter!==ze&&E.minFilter!==We?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function y(E){const v=E.target;v.removeEventListener("dispose",y),S(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&p.delete(v)}function m(E){const v=E.target;v.removeEventListener("dispose",m),R(v)}function S(E){const v=i.get(E);if(v.__webglInit===void 0)return;const B=E.source,j=_.get(B);if(j){const et=j[v.__cacheKey];et.usedTimes--,et.usedTimes===0&&C(E),Object.keys(j).length===0&&_.delete(B)}i.remove(E)}function C(E){const v=i.get(E);n.deleteTexture(v.__webglTexture);const B=E.source,j=_.get(B);delete j[v.__cacheKey],a.memory.textures--}function R(E){const v=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(v.__webglFramebuffer[j]))for(let et=0;et<v.__webglFramebuffer[j].length;et++)n.deleteFramebuffer(v.__webglFramebuffer[j][et]);else n.deleteFramebuffer(v.__webglFramebuffer[j]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[j])}else{if(Array.isArray(v.__webglFramebuffer))for(let j=0;j<v.__webglFramebuffer.length;j++)n.deleteFramebuffer(v.__webglFramebuffer[j]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let j=0;j<v.__webglColorRenderbuffer.length;j++)v.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[j]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const B=E.textures;for(let j=0,et=B.length;j<et;j++){const st=i.get(B[j]);st.__webglTexture&&(n.deleteTexture(st.__webglTexture),a.memory.textures--),i.remove(B[j])}i.remove(E)}let I=0;function G(){I=0}function X(){return I}function U(E){I=E}function H(){const E=I;return E>=s.maxTextures&&Dt("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),I+=1,E}function O(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function Q(E,v){const B=i.get(E);if(E.isVideoTexture&&fe(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&B.__version!==E.version){const j=E.image;if(j===null)Dt("WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)Dt("WebGLRenderer: Texture marked for update but image is incomplete");else{Ut(B,E,v);return}}else E.isExternalTexture&&(B.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+v)}function nt(E,v){const B=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&B.__version!==E.version){Ut(B,E,v);return}else E.isExternalTexture&&(B.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+v)}function ft(E,v){const B=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&B.__version!==E.version){Ut(B,E,v);return}e.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+v)}function wt(E,v){const B=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&B.__version!==E.version){zt(B,E,v);return}e.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+v)}const Rt={[gr]:n.REPEAT,[Wn]:n.CLAMP_TO_EDGE,[Ba]:n.MIRRORED_REPEAT},it={[ze]:n.NEAREST,[yh]:n.NEAREST_MIPMAP_NEAREST,[Ps]:n.NEAREST_MIPMAP_LINEAR,[We]:n.LINEAR,[Vr]:n.LINEAR_MIPMAP_NEAREST,[Mi]:n.LINEAR_MIPMAP_LINEAR},Mt={[wh]:n.NEVER,[Lh]:n.ALWAYS,[Ah]:n.LESS,[zo]:n.LEQUAL,[Rh]:n.EQUAL,[ko]:n.GEQUAL,[Ch]:n.GREATER,[Ph]:n.NOTEQUAL};function xt(E,v){if(v.type===Mn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===We||v.magFilter===Vr||v.magFilter===Ps||v.magFilter===Mi||v.minFilter===We||v.minFilter===Vr||v.minFilter===Ps||v.minFilter===Mi)&&Dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,Rt[v.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,Rt[v.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,Rt[v.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,it[v.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,it[v.minFilter]),v.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,Mt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===ze||v.minFilter!==Ps&&v.minFilter!==Mi||v.type===Mn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");n.texParameterf(E,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function q(E,v){let B=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",y));const j=v.source;let et=_.get(j);et===void 0&&(et={},_.set(j,et));const st=O(v);if(st!==E.__cacheKey){et[st]===void 0&&(et[st]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),et[st].usedTimes++;const ht=et[E.__cacheKey];ht!==void 0&&(et[E.__cacheKey].usedTimes--,ht.usedTimes===0&&C(v)),E.__cacheKey=st,E.__webglTexture=et[st].texture}return B}function gt(E,v,B){return Math.floor(Math.floor(E/B)/v)}function ot(E,v,B,j){const st=E.updateRanges;if(st.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,B,j,v.data);else{st.sort((Et,lt)=>Et.start-lt.start);let ht=0;for(let Et=1;Et<st.length;Et++){const lt=st[ht],rt=st[Et],Ot=lt.start+lt.count,Vt=gt(rt.start,v.width,4),ne=gt(lt.start,v.width,4);rt.start<=Ot+1&&Vt===ne&&gt(rt.start+rt.count-1,v.width,4)===Vt?lt.count=Math.max(lt.count,rt.start+rt.count-lt.start):(++ht,st[ht]=rt)}st.length=ht+1;const Y=e.getParameter(n.UNPACK_ROW_LENGTH),Z=e.getParameter(n.UNPACK_SKIP_PIXELS),St=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Et=0,lt=st.length;Et<lt;Et++){const rt=st[Et],Ot=Math.floor(rt.start/4),Vt=Math.ceil(rt.count/4),ne=Ot%v.width,L=Math.floor(Ot/v.width),at=Vt,$=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,ne),e.pixelStorei(n.UNPACK_SKIP_ROWS,L),e.texSubImage2D(n.TEXTURE_2D,0,ne,L,at,$,B,j,v.data)}E.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Y),e.pixelStorei(n.UNPACK_SKIP_PIXELS,Z),e.pixelStorei(n.UNPACK_SKIP_ROWS,St)}}function Ut(E,v,B){let j=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(j=n.TEXTURE_3D);const et=q(E,v),st=v.source;e.bindTexture(j,E.__webglTexture,n.TEXTURE0+B);const ht=i.get(st);if(st.version!==ht.__version||et===!0){if(e.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const $=Kt.getPrimaries(Kt.workingColorSpace),bt=v.colorSpace===ai?null:Kt.getPrimaries(v.colorSpace),ct=v.colorSpace===ai||$===bt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct)}e.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let Z=f(v.image,!1,s.maxTextureSize);Z=pt(v,Z);const St=r.convert(v.format,v.colorSpace),Et=r.convert(v.type);let lt=T(v.internalFormat,St,Et,v.normalized,v.colorSpace,v.isVideoTexture);xt(j,v);let rt;const Ot=v.mipmaps,Vt=v.isVideoTexture!==!0,ne=ht.__version===void 0||et===!0,L=st.dataReady,at=A(v,Z);if(v.isDepthTexture)lt=P(v.format===Si,v.type),ne&&(Vt?e.texStorage2D(n.TEXTURE_2D,1,lt,Z.width,Z.height):e.texImage2D(n.TEXTURE_2D,0,lt,Z.width,Z.height,0,St,Et,null));else if(v.isDataTexture)if(Ot.length>0){Vt&&ne&&e.texStorage2D(n.TEXTURE_2D,at,lt,Ot[0].width,Ot[0].height);for(let $=0,bt=Ot.length;$<bt;$++)rt=Ot[$],Vt?L&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,rt.width,rt.height,St,Et,rt.data):e.texImage2D(n.TEXTURE_2D,$,lt,rt.width,rt.height,0,St,Et,rt.data);v.generateMipmaps=!1}else Vt?(ne&&e.texStorage2D(n.TEXTURE_2D,at,lt,Z.width,Z.height),L&&ot(v,Z,St,Et)):e.texImage2D(n.TEXTURE_2D,0,lt,Z.width,Z.height,0,St,Et,Z.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Vt&&ne&&e.texStorage3D(n.TEXTURE_2D_ARRAY,at,lt,Ot[0].width,Ot[0].height,Z.depth);for(let $=0,bt=Ot.length;$<bt;$++)if(rt=Ot[$],v.format!==Sn)if(St!==null)if(Vt){if(L)if(v.layerUpdates.size>0){const ct=tc(rt.width,rt.height,v.format,v.type);for(const tt of v.layerUpdates){const Ct=rt.data.subarray(tt*ct/rt.data.BYTES_PER_ELEMENT,(tt+1)*ct/rt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,tt,rt.width,rt.height,1,St,Ct)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,rt.width,rt.height,Z.depth,St,rt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,lt,rt.width,rt.height,Z.depth,0,rt.data,0,0);else Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?L&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,rt.width,rt.height,Z.depth,St,Et,rt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,$,lt,rt.width,rt.height,Z.depth,0,St,Et,rt.data)}else{Vt&&ne&&e.texStorage2D(n.TEXTURE_2D,at,lt,Ot[0].width,Ot[0].height);for(let $=0,bt=Ot.length;$<bt;$++)rt=Ot[$],v.format!==Sn?St!==null?Vt?L&&e.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,rt.width,rt.height,St,rt.data):e.compressedTexImage2D(n.TEXTURE_2D,$,lt,rt.width,rt.height,0,rt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?L&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,rt.width,rt.height,St,Et,rt.data):e.texImage2D(n.TEXTURE_2D,$,lt,rt.width,rt.height,0,St,Et,rt.data)}else if(v.isDataArrayTexture)if(Vt){if(ne&&e.texStorage3D(n.TEXTURE_2D_ARRAY,at,lt,Z.width,Z.height,Z.depth),L)if(v.layerUpdates.size>0){const $=tc(Z.width,Z.height,v.format,v.type);for(const bt of v.layerUpdates){const ct=Z.data.subarray(bt*$/Z.data.BYTES_PER_ELEMENT,(bt+1)*$/Z.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,bt,Z.width,Z.height,1,St,Et,ct)}v.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,St,Et,Z.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,lt,Z.width,Z.height,Z.depth,0,St,Et,Z.data);else if(v.isData3DTexture)Vt?(ne&&e.texStorage3D(n.TEXTURE_3D,at,lt,Z.width,Z.height,Z.depth),L&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,St,Et,Z.data)):e.texImage3D(n.TEXTURE_3D,0,lt,Z.width,Z.height,Z.depth,0,St,Et,Z.data);else if(v.isFramebufferTexture){if(ne)if(Vt)e.texStorage2D(n.TEXTURE_2D,at,lt,Z.width,Z.height);else{let $=Z.width,bt=Z.height;for(let ct=0;ct<at;ct++)e.texImage2D(n.TEXTURE_2D,ct,lt,$,bt,0,St,Et,null),$>>=1,bt>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const $=n.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),Z.parentNode!==$){$.appendChild(Z),p.add(v),$.onpaint=Gt=>{const Te=Gt.changedElements;for(const ae of p)Te.includes(ae.image)&&(ae.needsUpdate=!0)},$.requestPaint();return}const bt=0,ct=n.RGBA,tt=n.RGBA,Ct=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,bt,ct,tt,Ct,Z),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ot.length>0){if(Vt&&ne){const $=Se(Ot[0]);e.texStorage2D(n.TEXTURE_2D,at,lt,$.width,$.height)}for(let $=0,bt=Ot.length;$<bt;$++)rt=Ot[$],Vt?L&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,St,Et,rt):e.texImage2D(n.TEXTURE_2D,$,lt,St,Et,rt);v.generateMipmaps=!1}else if(Vt){if(ne){const $=Se(Z);e.texStorage2D(n.TEXTURE_2D,at,lt,$.width,$.height)}L&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,St,Et,Z)}else e.texImage2D(n.TEXTURE_2D,0,lt,St,Et,Z);d(v)&&M(j),ht.__version=st.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function zt(E,v,B){if(v.image.length!==6)return;const j=q(E,v),et=v.source;e.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+B);const st=i.get(et);if(et.version!==st.__version||j===!0){e.activeTexture(n.TEXTURE0+B);const ht=Kt.getPrimaries(Kt.workingColorSpace),Y=v.colorSpace===ai?null:Kt.getPrimaries(v.colorSpace),Z=v.colorSpace===ai||ht===Y?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const St=v.isCompressedTexture||v.image[0].isCompressedTexture,Et=v.image[0]&&v.image[0].isDataTexture,lt=[];for(let tt=0;tt<6;tt++)!St&&!Et?lt[tt]=f(v.image[tt],!0,s.maxCubemapSize):lt[tt]=Et?v.image[tt].image:v.image[tt],lt[tt]=pt(v,lt[tt]);const rt=lt[0],Ot=r.convert(v.format,v.colorSpace),Vt=r.convert(v.type),ne=T(v.internalFormat,Ot,Vt,v.normalized,v.colorSpace),L=v.isVideoTexture!==!0,at=st.__version===void 0||j===!0,$=et.dataReady;let bt=A(v,rt);xt(n.TEXTURE_CUBE_MAP,v);let ct;if(St){L&&at&&e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,ne,rt.width,rt.height);for(let tt=0;tt<6;tt++){ct=lt[tt].mipmaps;for(let Ct=0;Ct<ct.length;Ct++){const Gt=ct[Ct];v.format!==Sn?Ot!==null?L?$&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,0,0,Gt.width,Gt.height,Ot,Gt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,ne,Gt.width,Gt.height,0,Gt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,0,0,Gt.width,Gt.height,Ot,Vt,Gt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,ne,Gt.width,Gt.height,0,Ot,Vt,Gt.data)}}}else{if(ct=v.mipmaps,L&&at){ct.length>0&&bt++;const tt=Se(lt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,ne,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(Et){L?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,lt[tt].width,lt[tt].height,Ot,Vt,lt[tt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,ne,lt[tt].width,lt[tt].height,0,Ot,Vt,lt[tt].data);for(let Ct=0;Ct<ct.length;Ct++){const Te=ct[Ct].image[tt].image;L?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,0,0,Te.width,Te.height,Ot,Vt,Te.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,ne,Te.width,Te.height,0,Ot,Vt,Te.data)}}else{L?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Ot,Vt,lt[tt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,ne,Ot,Vt,lt[tt]);for(let Ct=0;Ct<ct.length;Ct++){const Gt=ct[Ct];L?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,0,0,Ot,Vt,Gt.image[tt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,ne,Ot,Vt,Gt.image[tt])}}}d(v)&&M(n.TEXTURE_CUBE_MAP),st.__version=et.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function Ft(E,v,B,j,et,st){const ht=r.convert(B.format,B.colorSpace),Y=r.convert(B.type),Z=T(B.internalFormat,ht,Y,B.normalized,B.colorSpace),St=i.get(v),Et=i.get(B);if(Et.__renderTarget=v,!St.__hasExternalTextures){const lt=Math.max(1,v.width>>st),rt=Math.max(1,v.height>>st);et===n.TEXTURE_3D||et===n.TEXTURE_2D_ARRAY?e.texImage3D(et,st,Z,lt,rt,v.depth,0,ht,Y,null):e.texImage2D(et,st,Z,lt,rt,0,ht,Y,null)}e.bindFramebuffer(n.FRAMEBUFFER,E),jt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,et,Et.__webglTexture,0,De(v)):(et===n.TEXTURE_2D||et>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,et,Et.__webglTexture,st),e.bindFramebuffer(n.FRAMEBUFFER,null)}function xe(E,v,B){if(n.bindRenderbuffer(n.RENDERBUFFER,E),v.depthBuffer){const j=v.depthTexture,et=j&&j.isDepthTexture?j.type:null,st=P(v.stencilBuffer,et),ht=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;jt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,De(v),st,v.width,v.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,De(v),st,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,st,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ht,n.RENDERBUFFER,E)}else{const j=v.textures;for(let et=0;et<j.length;et++){const st=j[et],ht=r.convert(st.format,st.colorSpace),Y=r.convert(st.type),Z=T(st.internalFormat,ht,Y,st.normalized,st.colorSpace);jt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,De(v),Z,v.width,v.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,De(v),Z,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Z,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function $t(E,v,B){const j=v.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const et=i.get(v.depthTexture);if(et.__renderTarget=v,(!et.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),j){if(et.__webglInit===void 0&&(et.__webglInit=!0,v.depthTexture.addEventListener("dispose",y)),et.__webglTexture===void 0){et.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,et.__webglTexture),xt(n.TEXTURE_CUBE_MAP,v.depthTexture);const St=r.convert(v.depthTexture.format),Et=r.convert(v.depthTexture.type);let lt;v.depthTexture.format===jn?lt=n.DEPTH_COMPONENT24:v.depthTexture.format===Si&&(lt=n.DEPTH24_STENCIL8);for(let rt=0;rt<6;rt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,lt,v.width,v.height,0,St,Et,null)}}else Q(v.depthTexture,0);const st=et.__webglTexture,ht=De(v),Y=j?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,Z=v.depthTexture.format===Si?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===jn)jt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,Y,st,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,Z,Y,st,0);else if(v.depthTexture.format===Si)jt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,Y,st,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,Z,Y,st,0);else throw new Error("Unknown depthTexture format")}function re(E){const v=i.get(E),B=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){const j=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),j){const et=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,j.removeEventListener("dispose",et)};j.addEventListener("dispose",et),v.__depthDisposeCallback=et}v.__boundDepthTexture=j}if(E.depthTexture&&!v.__autoAllocateDepthBuffer)if(B)for(let j=0;j<6;j++)$t(v.__webglFramebuffer[j],E,j);else{const j=E.texture.mipmaps;j&&j.length>0?$t(v.__webglFramebuffer[0],E,0):$t(v.__webglFramebuffer,E,0)}else if(B){v.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[j]),v.__webglDepthbuffer[j]===void 0)v.__webglDepthbuffer[j]=n.createRenderbuffer(),xe(v.__webglDepthbuffer[j],E,!1);else{const et=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=v.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,st),n.framebufferRenderbuffer(n.FRAMEBUFFER,et,n.RENDERBUFFER,st)}}else{const j=E.texture.mipmaps;if(j&&j.length>0?e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),xe(v.__webglDepthbuffer,E,!1);else{const et=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,st),n.framebufferRenderbuffer(n.FRAMEBUFFER,et,n.RENDERBUFFER,st)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function me(E,v,B){const j=i.get(E);v!==void 0&&Ft(j.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&re(E)}function Yt(E){const v=E.texture,B=i.get(E),j=i.get(v);E.addEventListener("dispose",m);const et=E.textures,st=E.isWebGLCubeRenderTarget===!0,ht=et.length>1;if(ht||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=v.version,a.memory.textures++),st){B.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[Y]=[];for(let Z=0;Z<v.mipmaps.length;Z++)B.__webglFramebuffer[Y][Z]=n.createFramebuffer()}else B.__webglFramebuffer[Y]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let Y=0;Y<v.mipmaps.length;Y++)B.__webglFramebuffer[Y]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(ht)for(let Y=0,Z=et.length;Y<Z;Y++){const St=i.get(et[Y]);St.__webglTexture===void 0&&(St.__webglTexture=n.createTexture(),a.memory.textures++)}if(E.samples>0&&jt(E)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Y=0;Y<et.length;Y++){const Z=et[Y];B.__webglColorRenderbuffer[Y]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[Y]);const St=r.convert(Z.format,Z.colorSpace),Et=r.convert(Z.type),lt=T(Z.internalFormat,St,Et,Z.normalized,Z.colorSpace,E.isXRRenderTarget===!0),rt=De(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,rt,lt,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Y,n.RENDERBUFFER,B.__webglColorRenderbuffer[Y])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),xe(B.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(st){e.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),xt(n.TEXTURE_CUBE_MAP,v);for(let Y=0;Y<6;Y++)if(v.mipmaps&&v.mipmaps.length>0)for(let Z=0;Z<v.mipmaps.length;Z++)Ft(B.__webglFramebuffer[Y][Z],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Z);else Ft(B.__webglFramebuffer[Y],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);d(v)&&M(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ht){for(let Y=0,Z=et.length;Y<Z;Y++){const St=et[Y],Et=i.get(St);let lt=n.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(lt=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(lt,Et.__webglTexture),xt(lt,St),Ft(B.__webglFramebuffer,E,St,n.COLOR_ATTACHMENT0+Y,lt,0),d(St)&&M(lt)}e.unbindTexture()}else{let Y=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Y=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Y,j.__webglTexture),xt(Y,v),v.mipmaps&&v.mipmaps.length>0)for(let Z=0;Z<v.mipmaps.length;Z++)Ft(B.__webglFramebuffer[Z],E,v,n.COLOR_ATTACHMENT0,Y,Z);else Ft(B.__webglFramebuffer,E,v,n.COLOR_ATTACHMENT0,Y,0);d(v)&&M(Y),e.unbindTexture()}E.depthBuffer&&re(E)}function Le(E){const v=E.textures;for(let B=0,j=v.length;B<j;B++){const et=v[B];if(d(et)){const st=w(E),ht=i.get(et).__webglTexture;e.bindTexture(st,ht),M(st),e.unbindTexture()}}}const ve=[],nn=[];function N(E){if(E.samples>0){if(jt(E)===!1){const v=E.textures,B=E.width,j=E.height;let et=n.COLOR_BUFFER_BIT;const st=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=i.get(E),Y=v.length>1;if(Y)for(let St=0;St<v.length;St++)e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer);const Z=E.texture.mipmaps;Z&&Z.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let St=0;St<v.length;St++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(et|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(et|=n.STENCIL_BUFFER_BIT)),Y){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ht.__webglColorRenderbuffer[St]);const Et=i.get(v[St]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Et,0)}n.blitFramebuffer(0,0,B,j,0,0,B,j,et,n.NEAREST),c===!0&&(ve.length=0,nn.length=0,ve.push(n.COLOR_ATTACHMENT0+St),E.depthBuffer&&E.resolveDepthBuffer===!1&&(ve.push(st),nn.push(st),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,nn)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ve))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Y)for(let St=0;St<v.length;St++){e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.RENDERBUFFER,ht.__webglColorRenderbuffer[St]);const Et=i.get(v[St]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.TEXTURE_2D,Et,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){const v=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function De(E){return Math.min(s.maxSamples,E.samples)}function jt(E){const v=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function fe(E){const v=a.render.frame;h.get(E)!==v&&(h.set(E,v),E.update())}function pt(E,v){const B=E.colorSpace,j=E.format,et=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||B!==Mr&&B!==ai&&(Kt.getTransfer(B)===ie?(j!==Sn||et!==cn)&&Dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Jt("WebGLTextures: Unsupported texture color space:",B)),v}function Se(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=G,this.getTextureUnits=X,this.setTextureUnits=U,this.setTexture2D=Q,this.setTexture2DArray=nt,this.setTexture3D=ft,this.setTextureCube=wt,this.rebindTextures=me,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=Le,this.updateMultisampleRenderTarget=N,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=Ft,this.useMultisampledRTT=jt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Ag(n,t){function e(i,s=ai){let r;const a=Kt.getTransfer(s);if(i===cn)return n.UNSIGNED_BYTE;if(i===Io)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Uo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===iu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===su)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===eu)return n.BYTE;if(i===nu)return n.SHORT;if(i===ys)return n.UNSIGNED_SHORT;if(i===Do)return n.INT;if(i===Dn)return n.UNSIGNED_INT;if(i===Mn)return n.FLOAT;if(i===$n)return n.HALF_FLOAT;if(i===ru)return n.ALPHA;if(i===au)return n.RGB;if(i===Sn)return n.RGBA;if(i===jn)return n.DEPTH_COMPONENT;if(i===Si)return n.DEPTH_STENCIL;if(i===No)return n.RED;if(i===Fo)return n.RED_INTEGER;if(i===yi)return n.RG;if(i===Oo)return n.RG_INTEGER;if(i===Bo)return n.RGBA_INTEGER;if(i===cr||i===ur||i===hr||i===dr)if(a===ie)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===cr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===cr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ur)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===hr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===dr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===za||i===ka||i===Ga||i===Ha)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===za)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ka)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ga)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ha)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Va||i===Wa||i===Xa||i===qa||i===Ya||i===_r||i===$a)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Va||i===Wa)return a===ie?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Xa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===qa)return r.COMPRESSED_R11_EAC;if(i===Ya)return r.COMPRESSED_SIGNED_R11_EAC;if(i===_r)return r.COMPRESSED_RG11_EAC;if(i===$a)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ja||i===Ka||i===Za||i===Ja||i===Qa||i===to||i===eo||i===no||i===io||i===so||i===ro||i===ao||i===oo||i===lo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ja)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ka)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Za)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ja)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Qa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===to)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===eo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===no)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===io)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===so)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ro)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ao)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===oo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===lo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===co||i===uo||i===ho)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===co)return a===ie?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===uo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ho)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===fo||i===po||i===xr||i===mo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===fo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===po)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===mo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Es?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const Rg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Pg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new gu(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Un({vertexShader:Rg,fragmentShader:Cg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Qt(new Lr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Lg extends hi{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,p=null,u=null,_=null,g=null;const x=typeof XRWebGLBinding<"u",f=new Pg,d={},M=e.getContextAttributes();let w=null,T=null;const P=[],A=[],y=new Nt;let m=null;const S=new on;S.viewport=new Ee;const C=new on;C.viewport=new Ee;const R=[S,C],I=new Bd;let G=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let gt=P[q];return gt===void 0&&(gt=new jr,P[q]=gt),gt.getTargetRaySpace()},this.getControllerGrip=function(q){let gt=P[q];return gt===void 0&&(gt=new jr,P[q]=gt),gt.getGripSpace()},this.getHand=function(q){let gt=P[q];return gt===void 0&&(gt=new jr,P[q]=gt),gt.getHandSpace()};function U(q){const gt=A.indexOf(q.inputSource);if(gt===-1)return;const ot=P[gt];ot!==void 0&&(ot.update(q.inputSource,q.frame,l||a),ot.dispatchEvent({type:q.type,data:q.inputSource}))}function H(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",O);for(let q=0;q<P.length;q++){const gt=A[q];gt!==null&&(A[q]=null,P[q].disconnect(gt))}G=null,X=null,f.reset();for(const q in d)delete d[q];t.setRenderTarget(w),_=null,u=null,p=null,s=null,T=null,xt.stop(),i.isPresenting=!1,t.setPixelRatio(m),t.setSize(y.width,y.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&Dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&Dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return u!==null?u:_},this.getBinding=function(){return p===null&&x&&(p=new XRWebGLBinding(s,e)),p},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",H),s.addEventListener("inputsourceschange",O),M.xrCompatible!==!0&&await e.makeXRCompatible(),m=t.getPixelRatio(),t.getSize(y),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ot=null,Ut=null,zt=null;M.depth&&(zt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=M.stencil?Si:jn,Ut=M.stencil?Es:Dn);const Ft={colorFormat:e.RGBA8,depthFormat:zt,scaleFactor:r};p=this.getBinding(),u=p.createProjectionLayer(Ft),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),T=new Ln(u.textureWidth,u.textureHeight,{format:Sn,type:cn,depthTexture:new ts(u.textureWidth,u.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ot={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};_=new XRWebGLLayer(s,e,ot),s.updateRenderState({baseLayer:_}),t.setPixelRatio(1),t.setSize(_.framebufferWidth,_.framebufferHeight,!1),T=new Ln(_.framebufferWidth,_.framebufferHeight,{format:Sn,type:cn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),xt.setContext(s),xt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function O(q){for(let gt=0;gt<q.removed.length;gt++){const ot=q.removed[gt],Ut=A.indexOf(ot);Ut>=0&&(A[Ut]=null,P[Ut].disconnect(ot))}for(let gt=0;gt<q.added.length;gt++){const ot=q.added[gt];let Ut=A.indexOf(ot);if(Ut===-1){for(let Ft=0;Ft<P.length;Ft++)if(Ft>=A.length){A.push(ot),Ut=Ft;break}else if(A[Ft]===null){A[Ft]=ot,Ut=Ft;break}if(Ut===-1)break}const zt=P[Ut];zt&&zt.connect(ot)}}const Q=new D,nt=new D;function ft(q,gt,ot){Q.setFromMatrixPosition(gt.matrixWorld),nt.setFromMatrixPosition(ot.matrixWorld);const Ut=Q.distanceTo(nt),zt=gt.projectionMatrix.elements,Ft=ot.projectionMatrix.elements,xe=zt[14]/(zt[10]-1),$t=zt[14]/(zt[10]+1),re=(zt[9]+1)/zt[5],me=(zt[9]-1)/zt[5],Yt=(zt[8]-1)/zt[0],Le=(Ft[8]+1)/Ft[0],ve=xe*Yt,nn=xe*Le,N=Ut/(-Yt+Le),De=N*-Yt;if(gt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(De),q.translateZ(N),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),zt[10]===-1)q.projectionMatrix.copy(gt.projectionMatrix),q.projectionMatrixInverse.copy(gt.projectionMatrixInverse);else{const jt=xe+N,fe=$t+N,pt=ve-De,Se=nn+(Ut-De),E=re*$t/fe*jt,v=me*$t/fe*jt;q.projectionMatrix.makePerspective(pt,Se,E,v,jt,fe),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function wt(q,gt){gt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(gt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let gt=q.near,ot=q.far;f.texture!==null&&(f.depthNear>0&&(gt=f.depthNear),f.depthFar>0&&(ot=f.depthFar)),I.near=C.near=S.near=gt,I.far=C.far=S.far=ot,(G!==I.near||X!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),G=I.near,X=I.far),I.layers.mask=q.layers.mask|6,S.layers.mask=I.layers.mask&-5,C.layers.mask=I.layers.mask&-3;const Ut=q.parent,zt=I.cameras;wt(I,Ut);for(let Ft=0;Ft<zt.length;Ft++)wt(zt[Ft],Ut);zt.length===2?ft(I,S,C):I.projectionMatrix.copy(S.projectionMatrix),Rt(q,I,Ut)};function Rt(q,gt,ot){ot===null?q.matrix.copy(gt.matrixWorld):(q.matrix.copy(ot.matrixWorld),q.matrix.invert(),q.matrix.multiply(gt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(gt.projectionMatrix),q.projectionMatrixInverse.copy(gt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ws*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(u===null&&_===null))return c},this.setFoveation=function(q){c=q,u!==null&&(u.fixedFoveation=q),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=q)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(I)},this.getCameraTexture=function(q){return d[q]};let it=null;function Mt(q,gt){if(h=gt.getViewerPose(l||a),g=gt,h!==null){const ot=h.views;_!==null&&(t.setRenderTargetFramebuffer(T,_.framebuffer),t.setRenderTarget(T));let Ut=!1;ot.length!==I.cameras.length&&(I.cameras.length=0,Ut=!0);for(let $t=0;$t<ot.length;$t++){const re=ot[$t];let me=null;if(_!==null)me=_.getViewport(re);else{const Le=p.getViewSubImage(u,re);me=Le.viewport,$t===0&&(t.setRenderTargetTextures(T,Le.colorTexture,Le.depthStencilTexture),t.setRenderTarget(T))}let Yt=R[$t];Yt===void 0&&(Yt=new on,Yt.layers.enable($t),Yt.viewport=new Ee,R[$t]=Yt),Yt.matrix.fromArray(re.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(re.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(me.x,me.y,me.width,me.height),$t===0&&(I.matrix.copy(Yt.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Ut===!0&&I.cameras.push(Yt)}const zt=s.enabledFeatures;if(zt&&zt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){p=i.getBinding();const $t=p.getDepthInformation(ot[0]);$t&&$t.isValid&&$t.texture&&f.init($t,s.renderState)}if(zt&&zt.includes("camera-access")&&x){t.state.unbindTexture(),p=i.getBinding();for(let $t=0;$t<ot.length;$t++){const re=ot[$t].camera;if(re){let me=d[re];me||(me=new gu,d[re]=me);const Yt=p.getCameraImage(re);me.sourceTexture=Yt}}}}for(let ot=0;ot<P.length;ot++){const Ut=A[ot],zt=P[ot];Ut!==null&&zt!==void 0&&zt.update(Ut,gt,l||a)}it&&it(q,gt),gt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:gt}),g=null}const xt=new bu;xt.setAnimationLoop(Mt),this.setAnimationLoop=function(q){it=q},this.dispose=function(){}}}const Dg=new ce,Cu=new kt;Cu.set(-1,0,0,0,1,0,0,0,1);function Ig(n,t){function e(f,d){f.matrixAutoUpdate===!0&&f.updateMatrix(),d.value.copy(f.matrix)}function i(f,d){d.color.getRGB(f.fogColor.value,_u(n)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function s(f,d,M,w,T){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(f,d):d.isMeshLambertMaterial?(r(f,d),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(f,d),p(f,d)):d.isMeshPhongMaterial?(r(f,d),h(f,d),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(f,d),u(f,d),d.isMeshPhysicalMaterial&&_(f,d,T)):d.isMeshMatcapMaterial?(r(f,d),g(f,d)):d.isMeshDepthMaterial?r(f,d):d.isMeshDistanceMaterial?(r(f,d),x(f,d)):d.isMeshNormalMaterial?r(f,d):d.isLineBasicMaterial?(a(f,d),d.isLineDashedMaterial&&o(f,d)):d.isPointsMaterial?c(f,d,M,w):d.isSpriteMaterial?l(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map,e(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,e(d.alphaMap,f.alphaMapTransform)),d.bumpMap&&(f.bumpMap.value=d.bumpMap,e(d.bumpMap,f.bumpMapTransform),f.bumpScale.value=d.bumpScale,d.side===Ke&&(f.bumpScale.value*=-1)),d.normalMap&&(f.normalMap.value=d.normalMap,e(d.normalMap,f.normalMapTransform),f.normalScale.value.copy(d.normalScale),d.side===Ke&&f.normalScale.value.negate()),d.displacementMap&&(f.displacementMap.value=d.displacementMap,e(d.displacementMap,f.displacementMapTransform),f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,f.emissiveMapTransform)),d.specularMap&&(f.specularMap.value=d.specularMap,e(d.specularMap,f.specularMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);const M=t.get(d),w=M.envMap,T=M.envMapRotation;w&&(f.envMap.value=w,f.envMapRotation.value.setFromMatrix4(Dg.makeRotationFromEuler(T)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(Cu),f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap&&(f.lightMap.value=d.lightMap,f.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,f.lightMapTransform)),d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,f.aoMapTransform))}function a(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,d.map&&(f.map.value=d.map,e(d.map,f.mapTransform))}function o(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function c(f,d,M,w){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*M,f.scale.value=w*.5,d.map&&(f.map.value=d.map,e(d.map,f.uvTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,e(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function l(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map,e(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,e(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function h(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function p(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function u(f,d){f.metalness.value=d.metalness,d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,f.metalnessMapTransform)),f.roughness.value=d.roughness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,f.roughnessMapTransform)),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function _(f,d,M){f.ior.value=d.ior,d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,f.sheenColorMapTransform)),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,f.sheenRoughnessMapTransform))),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,f.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(f.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ke&&f.clearcoatNormalScale.value.negate())),d.dispersion>0&&(f.dispersion.value=d.dispersion),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,f.iridescenceMapTransform)),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=M.texture,f.transmissionSamplerSize.value.set(M.width,M.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,f.transmissionMapTransform)),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(f.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(f.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,f.specularColorMapTransform)),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,d){d.matcap&&(f.matcap.value=d.matcap)}function x(f,d){const M=t.get(d).light;f.referencePosition.value.setFromMatrixPosition(M.matrixWorld),f.nearDistance.value=M.shadow.camera.near,f.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Ug(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,w){const T=w.program;i.uniformBlockBinding(M,T)}function l(M,w){let T=s[M.id];T===void 0&&(g(M),T=h(M),s[M.id]=T,M.addEventListener("dispose",f));const P=w.program;i.updateUBOMapping(M,P);const A=t.render.frame;r[M.id]!==A&&(u(M),r[M.id]=A)}function h(M){const w=p();M.__bindingPointIndex=w;const T=n.createBuffer(),P=M.__size,A=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,P,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,T),T}function p(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Jt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const w=s[M.id],T=M.uniforms,P=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let A=0,y=T.length;A<y;A++){const m=Array.isArray(T[A])?T[A]:[T[A]];for(let S=0,C=m.length;S<C;S++){const R=m[S];if(_(R,A,S,P)===!0){const I=R.__offset,G=Array.isArray(R.value)?R.value:[R.value];let X=0;for(let U=0;U<G.length;U++){const H=G[U],O=x(H);typeof H=="number"||typeof H=="boolean"?(R.__data[0]=H,n.bufferSubData(n.UNIFORM_BUFFER,I+X,R.__data)):H.isMatrix3?(R.__data[0]=H.elements[0],R.__data[1]=H.elements[1],R.__data[2]=H.elements[2],R.__data[3]=0,R.__data[4]=H.elements[3],R.__data[5]=H.elements[4],R.__data[6]=H.elements[5],R.__data[7]=0,R.__data[8]=H.elements[6],R.__data[9]=H.elements[7],R.__data[10]=H.elements[8],R.__data[11]=0):ArrayBuffer.isView(H)?R.__data.set(new H.constructor(H.buffer,H.byteOffset,R.__data.length)):(H.toArray(R.__data,X),X+=O.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,I,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function _(M,w,T,P){const A=M.value,y=w+"_"+T;if(P[y]===void 0)return typeof A=="number"||typeof A=="boolean"?P[y]=A:ArrayBuffer.isView(A)?P[y]=A.slice():P[y]=A.clone(),!0;{const m=P[y];if(typeof A=="number"||typeof A=="boolean"){if(m!==A)return P[y]=A,!0}else{if(ArrayBuffer.isView(A))return!0;if(m.equals(A)===!1)return m.copy(A),!0}}return!1}function g(M){const w=M.uniforms;let T=0;const P=16;for(let y=0,m=w.length;y<m;y++){const S=Array.isArray(w[y])?w[y]:[w[y]];for(let C=0,R=S.length;C<R;C++){const I=S[C],G=Array.isArray(I.value)?I.value:[I.value];for(let X=0,U=G.length;X<U;X++){const H=G[X],O=x(H),Q=T%P,nt=Q%O.boundary,ft=Q+nt;T+=nt,ft!==0&&P-ft<O.storage&&(T+=P-ft),I.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=T,T+=O.storage}}}const A=T%P;return A>0&&(T+=P-A),M.__size=T,M.__cache={},this}function x(M){const w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?Dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(w.boundary=16,w.storage=M.byteLength):Dt("WebGLRenderer: Unsupported uniform value type.",M),w}function f(M){const w=M.target;w.removeEventListener("dispose",f);const T=a.indexOf(w.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function d(){for(const M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:d}}const Ng=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let An=null;function Fg(){return An===null&&(An=new fu(Ng,16,16,yi,$n),An.name="DFG_LUT",An.minFilter=We,An.magFilter=We,An.wrapS=Wn,An.wrapT=Wn,An.generateMipmaps=!1,An.needsUpdate=!0),An}class Og{constructor(t={}){const{canvas:e=Ih(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:_=cn}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const x=_,f=new Set([Bo,Oo,Fo]),d=new Set([cn,Dn,ys,Es,Io,Uo]),M=new Uint32Array(4),w=new Int32Array(4),T=new D;let P=null,A=null;const y=[],m=[];let S=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let R=!1,I=null;this._outputColorSpace=Qe;let G=0,X=0,U=null,H=-1,O=null;const Q=new Ee,nt=new Ee;let ft=null;const wt=new Bt(0);let Rt=0,it=e.width,Mt=e.height,xt=1,q=null,gt=null;const ot=new Ee(0,0,it,Mt),Ut=new Ee(0,0,it,Mt);let zt=!1;const Ft=new qo;let xe=!1,$t=!1;const re=new ce,me=new D,Yt=new Ee,Le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ve=!1;function nn(){return U===null?xt:1}let N=i;function De(b,F){return e.getContext(b,F)}try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Co}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",Ct,!1),e.addEventListener("webglcontextcreationerror",Gt,!1),N===null){const F="webgl2";if(N=De(F,b),N===null)throw De(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw Jt("WebGLRenderer: "+b.message),b}let jt,fe,pt,Se,E,v,B,j,et,st,ht,Y,Z,St,Et,lt,rt,Ot,Vt,ne,L,at,$;function bt(){jt=new Fm(N),jt.init(),L=new Ag(N,jt),fe=new Rm(N,jt,t,L),pt=new Tg(N,jt),fe.reversedDepthBuffer&&u&&pt.buffers.depth.setReversed(!0),Se=new zm(N),E=new hg,v=new wg(N,jt,pt,E,fe,L,Se),B=new Nm(C),j=new Hd(N),at=new wm(N,j),et=new Om(N,j,Se,at),st=new Gm(N,et,j,at,Se),Ot=new km(N,fe,v),Et=new Cm(E),ht=new ug(C,B,jt,fe,at,Et),Y=new Ig(C,E),Z=new fg,St=new vg(jt),rt=new Tm(C,B,pt,st,g,c),lt=new Eg(C,st,fe),$=new Ug(N,Se,fe,pt),Vt=new Am(N,jt,Se),ne=new Bm(N,jt,Se),Se.programs=ht.programs,C.capabilities=fe,C.extensions=jt,C.properties=E,C.renderLists=Z,C.shadowMap=lt,C.state=pt,C.info=Se}bt(),x!==cn&&(S=new Vm(x,e.width,e.height,s,r));const ct=new Lg(C,N);this.xr=ct,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const b=jt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=jt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return xt},this.setPixelRatio=function(b){b!==void 0&&(xt=b,this.setSize(it,Mt,!1))},this.getSize=function(b){return b.set(it,Mt)},this.setSize=function(b,F,V=!0){if(ct.isPresenting){Dt("WebGLRenderer: Can't change size while VR device is presenting.");return}it=b,Mt=F,e.width=Math.floor(b*xt),e.height=Math.floor(F*xt),V===!0&&(e.style.width=b+"px",e.style.height=F+"px"),S!==null&&S.setSize(e.width,e.height),this.setViewport(0,0,b,F)},this.getDrawingBufferSize=function(b){return b.set(it*xt,Mt*xt).floor()},this.setDrawingBufferSize=function(b,F,V){it=b,Mt=F,xt=V,e.width=Math.floor(b*V),e.height=Math.floor(F*V),this.setViewport(0,0,b,F)},this.setEffects=function(b){if(x===cn){Jt("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let F=0;F<b.length;F++)if(b[F].isOutputPass===!0){Dt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(Q)},this.getViewport=function(b){return b.copy(ot)},this.setViewport=function(b,F,V,z){b.isVector4?ot.set(b.x,b.y,b.z,b.w):ot.set(b,F,V,z),pt.viewport(Q.copy(ot).multiplyScalar(xt).round())},this.getScissor=function(b){return b.copy(Ut)},this.setScissor=function(b,F,V,z){b.isVector4?Ut.set(b.x,b.y,b.z,b.w):Ut.set(b,F,V,z),pt.scissor(nt.copy(Ut).multiplyScalar(xt).round())},this.getScissorTest=function(){return zt},this.setScissorTest=function(b){pt.setScissorTest(zt=b)},this.setOpaqueSort=function(b){q=b},this.setTransparentSort=function(b){gt=b},this.getClearColor=function(b){return b.copy(rt.getClearColor())},this.setClearColor=function(){rt.setClearColor(...arguments)},this.getClearAlpha=function(){return rt.getClearAlpha()},this.setClearAlpha=function(){rt.setClearAlpha(...arguments)},this.clear=function(b=!0,F=!0,V=!0){let z=0;if(b){let k=!1;if(U!==null){const vt=U.texture.format;k=f.has(vt)}if(k){const vt=U.texture.type,Tt=d.has(vt),_t=rt.getClearColor(),At=rt.getClearAlpha(),Pt=_t.r,Ht=_t.g,Xt=_t.b;Tt?(M[0]=Pt,M[1]=Ht,M[2]=Xt,M[3]=At,N.clearBufferuiv(N.COLOR,0,M)):(w[0]=Pt,w[1]=Ht,w[2]=Xt,w[3]=At,N.clearBufferiv(N.COLOR,0,w))}else z|=N.COLOR_BUFFER_BIT}F&&(z|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&N.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),I=b},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",Ct,!1),e.removeEventListener("webglcontextcreationerror",Gt,!1),rt.dispose(),Z.dispose(),St.dispose(),E.dispose(),B.dispose(),st.dispose(),at.dispose(),$.dispose(),ht.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",ol),ct.removeEventListener("sessionend",ll),di.stop()};function tt(b){b.preventDefault(),yl("WebGLRenderer: Context Lost."),R=!0}function Ct(){yl("WebGLRenderer: Context Restored."),R=!1;const b=Se.autoReset,F=lt.enabled,V=lt.autoUpdate,z=lt.needsUpdate,k=lt.type;bt(),Se.autoReset=b,lt.enabled=F,lt.autoUpdate=V,lt.needsUpdate=z,lt.type=k}function Gt(b){Jt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Te(b){const F=b.target;F.removeEventListener("dispose",Te),ae(F)}function ae(b){Fn(b),E.remove(b)}function Fn(b){const F=E.get(b).programs;F!==void 0&&(F.forEach(function(V){ht.releaseProgram(V)}),b.isShaderMaterial&&ht.releaseShaderCache(b))}this.renderBufferDirect=function(b,F,V,z,k,vt){F===null&&(F=Le);const Tt=k.isMesh&&k.matrixWorld.determinant()<0,_t=$u(b,F,V,z,k);pt.setMaterial(z,Tt);let At=V.index,Pt=1;if(z.wireframe===!0){if(At=et.getWireframeAttribute(V),At===void 0)return;Pt=2}const Ht=V.drawRange,Xt=V.attributes.position;let Lt=Ht.start*Pt,oe=(Ht.start+Ht.count)*Pt;vt!==null&&(Lt=Math.max(Lt,vt.start*Pt),oe=Math.min(oe,(vt.start+vt.count)*Pt)),At!==null?(Lt=Math.max(Lt,0),oe=Math.min(oe,At.count)):Xt!=null&&(Lt=Math.max(Lt,0),oe=Math.min(oe,Xt.count));const we=oe-Lt;if(we<0||we===1/0)return;at.setup(k,z,_t,V,At);let be,ue=Vt;if(At!==null&&(be=j.get(At),ue=ne,ue.setIndex(be)),k.isMesh)z.wireframe===!0?(pt.setLineWidth(z.wireframeLinewidth*nn()),ue.setMode(N.LINES)):ue.setMode(N.TRIANGLES);else if(k.isLine){let ke=z.linewidth;ke===void 0&&(ke=1),pt.setLineWidth(ke*nn()),k.isLineSegments?ue.setMode(N.LINES):k.isLineLoop?ue.setMode(N.LINE_LOOP):ue.setMode(N.LINE_STRIP)}else k.isPoints?ue.setMode(N.POINTS):k.isSprite&&ue.setMode(N.TRIANGLES);if(k.isBatchedMesh)if(jt.get("WEBGL_multi_draw"))ue.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const ke=k._multiDrawStarts,yt=k._multiDrawCounts,sn=k._multiDrawCount,te=At?j.get(At).bytesPerElement:1,dn=E.get(z).currentProgram.getUniforms();for(let Tn=0;Tn<sn;Tn++)dn.setValue(N,"_gl_DrawID",Tn),ue.render(ke[Tn]/te,yt[Tn])}else if(k.isInstancedMesh)ue.renderInstances(Lt,we,k.count);else if(V.isInstancedBufferGeometry){const ke=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,yt=Math.min(V.instanceCount,ke);ue.renderInstances(Lt,we,yt)}else ue.render(Lt,we)};function En(b,F,V){b.transparent===!0&&b.side===Vn&&b.forceSinglePass===!1?(b.side=Ke,b.needsUpdate=!0,Cs(b,F,V),b.side=ui,b.needsUpdate=!0,Cs(b,F,V),b.side=Vn):Cs(b,F,V)}this.compile=function(b,F,V=null){V===null&&(V=b),A=St.get(V),A.init(F),m.push(A),V.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(A.pushLight(k),k.castShadow&&A.pushShadow(k))}),b!==V&&b.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(A.pushLight(k),k.castShadow&&A.pushShadow(k))}),A.setupLights();const z=new Set;return b.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const vt=k.material;if(vt)if(Array.isArray(vt))for(let Tt=0;Tt<vt.length;Tt++){const _t=vt[Tt];En(_t,V,k),z.add(_t)}else En(vt,V,k),z.add(vt)}),A=m.pop(),z},this.compileAsync=function(b,F,V=null){const z=this.compile(b,F,V);return new Promise(k=>{function vt(){if(z.forEach(function(Tt){E.get(Tt).currentProgram.isReady()&&z.delete(Tt)}),z.size===0){k(b);return}setTimeout(vt,10)}jt.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let zr=null;function qu(b){zr&&zr(b)}function ol(){di.stop()}function ll(){di.start()}const di=new bu;di.setAnimationLoop(qu),typeof self<"u"&&di.setContext(self),this.setAnimationLoop=function(b){zr=b,ct.setAnimationLoop(b),b===null?di.stop():di.start()},ct.addEventListener("sessionstart",ol),ct.addEventListener("sessionend",ll),this.render=function(b,F){if(F!==void 0&&F.isCamera!==!0){Jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;I!==null&&I.renderStart(b,F);const V=ct.enabled===!0&&ct.isPresenting===!0,z=S!==null&&(U===null||V)&&S.begin(C,U);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(F),F=ct.getCamera()),b.isScene===!0&&b.onBeforeRender(C,b,F,U),A=St.get(b,m.length),A.init(F),A.state.textureUnits=v.getTextureUnits(),m.push(A),re.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ft.setFromProjectionMatrix(re,Cn,F.reversedDepth),$t=this.localClippingEnabled,xe=Et.init(this.clippingPlanes,$t),P=Z.get(b,y.length),P.init(),y.push(P),ct.enabled===!0&&ct.isPresenting===!0){const Tt=C.xr.getDepthSensingMesh();Tt!==null&&kr(Tt,F,-1/0,C.sortObjects)}kr(b,F,0,C.sortObjects),P.finish(),C.sortObjects===!0&&P.sort(q,gt),ve=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,ve&&rt.addToRenderList(P,b),this.info.render.frame++,xe===!0&&Et.beginShadows();const k=A.state.shadowsArray;if(lt.render(k,b,F),xe===!0&&Et.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&S.hasRenderPass())===!1){const Tt=P.opaque,_t=P.transmissive;if(A.setupLights(),F.isArrayCamera){const At=F.cameras;if(_t.length>0)for(let Pt=0,Ht=At.length;Pt<Ht;Pt++){const Xt=At[Pt];ul(Tt,_t,b,Xt)}ve&&rt.render(b);for(let Pt=0,Ht=At.length;Pt<Ht;Pt++){const Xt=At[Pt];cl(P,b,Xt,Xt.viewport)}}else _t.length>0&&ul(Tt,_t,b,F),ve&&rt.render(b),cl(P,b,F)}U!==null&&X===0&&(v.updateMultisampleRenderTarget(U),v.updateRenderTargetMipmap(U)),z&&S.end(C),b.isScene===!0&&b.onAfterRender(C,b,F),at.resetDefaultState(),H=-1,O=null,m.pop(),m.length>0?(A=m[m.length-1],v.setTextureUnits(A.state.textureUnits),xe===!0&&Et.setGlobalState(C.clippingPlanes,A.state.camera)):A=null,y.pop(),y.length>0?P=y[y.length-1]:P=null,I!==null&&I.renderEnd()};function kr(b,F,V,z){if(b.visible===!1)return;if(b.layers.test(F.layers)){if(b.isGroup)V=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(F);else if(b.isLightProbeGrid)A.pushLightProbeGrid(b);else if(b.isLight)A.pushLight(b),b.castShadow&&A.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Ft.intersectsSprite(b)){z&&Yt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(re);const Tt=st.update(b),_t=b.material;_t.visible&&P.push(b,Tt,_t,V,Yt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Ft.intersectsObject(b))){const Tt=st.update(b),_t=b.material;if(z&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Yt.copy(b.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),Yt.copy(Tt.boundingSphere.center)),Yt.applyMatrix4(b.matrixWorld).applyMatrix4(re)),Array.isArray(_t)){const At=Tt.groups;for(let Pt=0,Ht=At.length;Pt<Ht;Pt++){const Xt=At[Pt],Lt=_t[Xt.materialIndex];Lt&&Lt.visible&&P.push(b,Tt,Lt,V,Yt.z,Xt)}}else _t.visible&&P.push(b,Tt,_t,V,Yt.z,null)}}const vt=b.children;for(let Tt=0,_t=vt.length;Tt<_t;Tt++)kr(vt[Tt],F,V,z)}function cl(b,F,V,z){const{opaque:k,transmissive:vt,transparent:Tt}=b;A.setupLightsView(V),xe===!0&&Et.setGlobalState(C.clippingPlanes,V),z&&pt.viewport(Q.copy(z)),k.length>0&&Rs(k,F,V),vt.length>0&&Rs(vt,F,V),Tt.length>0&&Rs(Tt,F,V),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function ul(b,F,V,z){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[z.id]===void 0){const Lt=jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[z.id]=new Ln(1,1,{generateMipmaps:!0,type:Lt?$n:cn,minFilter:Mi,samples:Math.max(4,fe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}const vt=A.state.transmissionRenderTarget[z.id],Tt=z.viewport||Q;vt.setSize(Tt.z*C.transmissionResolutionScale,Tt.w*C.transmissionResolutionScale);const _t=C.getRenderTarget(),At=C.getActiveCubeFace(),Pt=C.getActiveMipmapLevel();C.setRenderTarget(vt),C.getClearColor(wt),Rt=C.getClearAlpha(),Rt<1&&C.setClearColor(16777215,.5),C.clear(),ve&&rt.render(V);const Ht=C.toneMapping;C.toneMapping=Pn;const Xt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),A.setupLightsView(z),xe===!0&&Et.setGlobalState(C.clippingPlanes,z),Rs(b,V,z),v.updateMultisampleRenderTarget(vt),v.updateRenderTargetMipmap(vt),jt.has("WEBGL_multisampled_render_to_texture")===!1){let Lt=!1;for(let oe=0,we=F.length;oe<we;oe++){const be=F[oe],{object:ue,geometry:ke,material:yt,group:sn}=be;if(yt.side===Vn&&ue.layers.test(z.layers)){const te=yt.side;yt.side=Ke,yt.needsUpdate=!0,hl(ue,V,z,ke,yt,sn),yt.side=te,yt.needsUpdate=!0,Lt=!0}}Lt===!0&&(v.updateMultisampleRenderTarget(vt),v.updateRenderTargetMipmap(vt))}C.setRenderTarget(_t,At,Pt),C.setClearColor(wt,Rt),Xt!==void 0&&(z.viewport=Xt),C.toneMapping=Ht}function Rs(b,F,V){const z=F.isScene===!0?F.overrideMaterial:null;for(let k=0,vt=b.length;k<vt;k++){const Tt=b[k],{object:_t,geometry:At,group:Pt}=Tt;let Ht=Tt.material;Ht.allowOverride===!0&&z!==null&&(Ht=z),_t.layers.test(V.layers)&&hl(_t,F,V,At,Ht,Pt)}}function hl(b,F,V,z,k,vt){b.onBeforeRender(C,F,V,z,k,vt),b.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),k.onBeforeRender(C,F,V,z,b,vt),k.transparent===!0&&k.side===Vn&&k.forceSinglePass===!1?(k.side=Ke,k.needsUpdate=!0,C.renderBufferDirect(V,F,z,k,b,vt),k.side=ui,k.needsUpdate=!0,C.renderBufferDirect(V,F,z,k,b,vt),k.side=Vn):C.renderBufferDirect(V,F,z,k,b,vt),b.onAfterRender(C,F,V,z,k,vt)}function Cs(b,F,V){F.isScene!==!0&&(F=Le);const z=E.get(b),k=A.state.lights,vt=A.state.shadowsArray,Tt=k.state.version,_t=ht.getParameters(b,k.state,vt,F,V,A.state.lightProbeGridArray),At=ht.getProgramCacheKey(_t);let Pt=z.programs;z.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?F.environment:null,z.fog=F.fog;const Ht=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;z.envMap=B.get(b.envMap||z.environment,Ht),z.envMapRotation=z.environment!==null&&b.envMap===null?F.environmentRotation:b.envMapRotation,Pt===void 0&&(b.addEventListener("dispose",Te),Pt=new Map,z.programs=Pt);let Xt=Pt.get(At);if(Xt!==void 0){if(z.currentProgram===Xt&&z.lightsStateVersion===Tt)return fl(b,_t),Xt}else _t.uniforms=ht.getUniforms(b),I!==null&&b.isNodeMaterial&&I.build(b,V,_t),b.onBeforeCompile(_t,C),Xt=ht.acquireProgram(_t,At),Pt.set(At,Xt),z.uniforms=_t.uniforms;const Lt=z.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Lt.clippingPlanes=Et.uniform),fl(b,_t),z.needsLights=Ku(b),z.lightsStateVersion=Tt,z.needsLights&&(Lt.ambientLightColor.value=k.state.ambient,Lt.lightProbe.value=k.state.probe,Lt.directionalLights.value=k.state.directional,Lt.directionalLightShadows.value=k.state.directionalShadow,Lt.spotLights.value=k.state.spot,Lt.spotLightShadows.value=k.state.spotShadow,Lt.rectAreaLights.value=k.state.rectArea,Lt.ltc_1.value=k.state.rectAreaLTC1,Lt.ltc_2.value=k.state.rectAreaLTC2,Lt.pointLights.value=k.state.point,Lt.pointLightShadows.value=k.state.pointShadow,Lt.hemisphereLights.value=k.state.hemi,Lt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Lt.spotLightMatrix.value=k.state.spotLightMatrix,Lt.spotLightMap.value=k.state.spotLightMap,Lt.pointShadowMatrix.value=k.state.pointShadowMatrix),z.lightProbeGrid=A.state.lightProbeGridArray.length>0,z.currentProgram=Xt,z.uniformsList=null,Xt}function dl(b){if(b.uniformsList===null){const F=b.currentProgram.getUniforms();b.uniformsList=fr.seqWithValue(F.seq,b.uniforms)}return b.uniformsList}function fl(b,F){const V=E.get(b);V.outputColorSpace=F.outputColorSpace,V.batching=F.batching,V.batchingColor=F.batchingColor,V.instancing=F.instancing,V.instancingColor=F.instancingColor,V.instancingMorph=F.instancingMorph,V.skinning=F.skinning,V.morphTargets=F.morphTargets,V.morphNormals=F.morphNormals,V.morphColors=F.morphColors,V.morphTargetsCount=F.morphTargetsCount,V.numClippingPlanes=F.numClippingPlanes,V.numIntersection=F.numClipIntersection,V.vertexAlphas=F.vertexAlphas,V.vertexTangents=F.vertexTangents,V.toneMapping=F.toneMapping}function Yu(b,F){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;T.setFromMatrixPosition(F.matrixWorld);for(let V=0,z=b.length;V<z;V++){const k=b[V];if(k.texture!==null&&k.boundingBox.containsPoint(T))return k}return null}function $u(b,F,V,z,k){F.isScene!==!0&&(F=Le),v.resetTextureUnits();const vt=F.fog,Tt=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?F.environment:null,_t=U===null?C.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Kt.workingColorSpace,At=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Pt=B.get(z.envMap||Tt,At),Ht=z.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Xt=!!V.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Lt=!!V.morphAttributes.position,oe=!!V.morphAttributes.normal,we=!!V.morphAttributes.color;let be=Pn;z.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(be=C.toneMapping);const ue=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ke=ue!==void 0?ue.length:0,yt=E.get(z),sn=A.state.lights;if(xe===!0&&($t===!0||b!==O)){const pe=b===O&&z.id===H;Et.setState(z,b,pe)}let te=!1;z.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==sn.state.version||yt.outputColorSpace!==_t||k.isBatchedMesh&&yt.batching===!1||!k.isBatchedMesh&&yt.batching===!0||k.isBatchedMesh&&yt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&yt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&yt.instancing===!1||!k.isInstancedMesh&&yt.instancing===!0||k.isSkinnedMesh&&yt.skinning===!1||!k.isSkinnedMesh&&yt.skinning===!0||k.isInstancedMesh&&yt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&yt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&yt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&yt.instancingMorph===!1&&k.morphTexture!==null||yt.envMap!==Pt||z.fog===!0&&yt.fog!==vt||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==Et.numPlanes||yt.numIntersection!==Et.numIntersection)||yt.vertexAlphas!==Ht||yt.vertexTangents!==Xt||yt.morphTargets!==Lt||yt.morphNormals!==oe||yt.morphColors!==we||yt.toneMapping!==be||yt.morphTargetsCount!==ke||!!yt.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(te=!0):(te=!0,yt.__version=z.version);let dn=yt.currentProgram;te===!0&&(dn=Cs(z,F,k),I&&z.isNodeMaterial&&I.onUpdateProgram(z,dn,yt));let Tn=!1,Zn=!1,wi=!1;const he=dn.getUniforms(),Ae=yt.uniforms;if(pt.useProgram(dn.program)&&(Tn=!0,Zn=!0,wi=!0),z.id!==H&&(H=z.id,Zn=!0),yt.needsLights){const pe=Yu(A.state.lightProbeGridArray,k);yt.lightProbeGrid!==pe&&(yt.lightProbeGrid=pe,Zn=!0)}if(Tn||O!==b){pt.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),he.setValue(N,"projectionMatrix",b.projectionMatrix),he.setValue(N,"viewMatrix",b.matrixWorldInverse);const Qn=he.map.cameraPosition;Qn!==void 0&&Qn.setValue(N,me.setFromMatrixPosition(b.matrixWorld)),fe.logarithmicDepthBuffer&&he.setValue(N,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&he.setValue(N,"isOrthographic",b.isOrthographicCamera===!0),O!==b&&(O=b,Zn=!0,wi=!0)}if(yt.needsLights&&(sn.state.directionalShadowMap.length>0&&he.setValue(N,"directionalShadowMap",sn.state.directionalShadowMap,v),sn.state.spotShadowMap.length>0&&he.setValue(N,"spotShadowMap",sn.state.spotShadowMap,v),sn.state.pointShadowMap.length>0&&he.setValue(N,"pointShadowMap",sn.state.pointShadowMap,v)),k.isSkinnedMesh){he.setOptional(N,k,"bindMatrix"),he.setOptional(N,k,"bindMatrixInverse");const pe=k.skeleton;pe&&(pe.boneTexture===null&&pe.computeBoneTexture(),he.setValue(N,"boneTexture",pe.boneTexture,v))}k.isBatchedMesh&&(he.setOptional(N,k,"batchingTexture"),he.setValue(N,"batchingTexture",k._matricesTexture,v),he.setOptional(N,k,"batchingIdTexture"),he.setValue(N,"batchingIdTexture",k._indirectTexture,v),he.setOptional(N,k,"batchingColorTexture"),k._colorsTexture!==null&&he.setValue(N,"batchingColorTexture",k._colorsTexture,v));const Jn=V.morphAttributes;if((Jn.position!==void 0||Jn.normal!==void 0||Jn.color!==void 0)&&Ot.update(k,V,dn),(Zn||yt.receiveShadow!==k.receiveShadow)&&(yt.receiveShadow=k.receiveShadow,he.setValue(N,"receiveShadow",k.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&F.environment!==null&&(Ae.envMapIntensity.value=F.environmentIntensity),Ae.dfgLUT!==void 0&&(Ae.dfgLUT.value=Fg()),Zn){if(he.setValue(N,"toneMappingExposure",C.toneMappingExposure),yt.needsLights&&ju(Ae,wi),vt&&z.fog===!0&&Y.refreshFogUniforms(Ae,vt),Y.refreshMaterialUniforms(Ae,z,xt,Mt,A.state.transmissionRenderTarget[b.id]),yt.needsLights&&yt.lightProbeGrid){const pe=yt.lightProbeGrid;Ae.probesSH.value=pe.texture,Ae.probesMin.value.copy(pe.boundingBox.min),Ae.probesMax.value.copy(pe.boundingBox.max),Ae.probesResolution.value.copy(pe.resolution)}fr.upload(N,dl(yt),Ae,v)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(fr.upload(N,dl(yt),Ae,v),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&he.setValue(N,"center",k.center),he.setValue(N,"modelViewMatrix",k.modelViewMatrix),he.setValue(N,"normalMatrix",k.normalMatrix),he.setValue(N,"modelMatrix",k.matrixWorld),z.uniformsGroups!==void 0){const pe=z.uniformsGroups;for(let Qn=0,Ai=pe.length;Qn<Ai;Qn++){const pl=pe[Qn];$.update(pl,dn),$.bind(pl,dn)}}return dn}function ju(b,F){b.ambientLightColor.needsUpdate=F,b.lightProbe.needsUpdate=F,b.directionalLights.needsUpdate=F,b.directionalLightShadows.needsUpdate=F,b.pointLights.needsUpdate=F,b.pointLightShadows.needsUpdate=F,b.spotLights.needsUpdate=F,b.spotLightShadows.needsUpdate=F,b.rectAreaLights.needsUpdate=F,b.hemisphereLights.needsUpdate=F}function Ku(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(b,F,V){const z=E.get(b);z.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),E.get(b.texture).__webglTexture=F,E.get(b.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:V,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,F){const V=E.get(b);V.__webglFramebuffer=F,V.__useDefaultFramebuffer=F===void 0};const Zu=N.createFramebuffer();this.setRenderTarget=function(b,F=0,V=0){U=b,G=F,X=V;let z=null,k=!1,vt=!1;if(b){const _t=E.get(b);if(_t.__useDefaultFramebuffer!==void 0){pt.bindFramebuffer(N.FRAMEBUFFER,_t.__webglFramebuffer),Q.copy(b.viewport),nt.copy(b.scissor),ft=b.scissorTest,pt.viewport(Q),pt.scissor(nt),pt.setScissorTest(ft),H=-1;return}else if(_t.__webglFramebuffer===void 0)v.setupRenderTarget(b);else if(_t.__hasExternalTextures)v.rebindTextures(b,E.get(b.texture).__webglTexture,E.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ht=b.depthTexture;if(_t.__boundDepthTexture!==Ht){if(Ht!==null&&E.has(Ht)&&(b.width!==Ht.image.width||b.height!==Ht.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");v.setupDepthRenderbuffer(b)}}const At=b.texture;(At.isData3DTexture||At.isDataArrayTexture||At.isCompressedArrayTexture)&&(vt=!0);const Pt=E.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Pt[F])?z=Pt[F][V]:z=Pt[F],k=!0):b.samples>0&&v.useMultisampledRTT(b)===!1?z=E.get(b).__webglMultisampledFramebuffer:Array.isArray(Pt)?z=Pt[V]:z=Pt,Q.copy(b.viewport),nt.copy(b.scissor),ft=b.scissorTest}else Q.copy(ot).multiplyScalar(xt).floor(),nt.copy(Ut).multiplyScalar(xt).floor(),ft=zt;if(V!==0&&(z=Zu),pt.bindFramebuffer(N.FRAMEBUFFER,z)&&pt.drawBuffers(b,z),pt.viewport(Q),pt.scissor(nt),pt.setScissorTest(ft),k){const _t=E.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,_t.__webglTexture,V)}else if(vt){const _t=F;for(let At=0;At<b.textures.length;At++){const Pt=E.get(b.textures[At]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+At,Pt.__webglTexture,V,_t)}}else if(b!==null&&V!==0){const _t=E.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,_t.__webglTexture,V)}H=-1},this.readRenderTargetPixels=function(b,F,V,z,k,vt,Tt,_t=0){if(!(b&&b.isWebGLRenderTarget)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let At=E.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Tt!==void 0&&(At=At[Tt]),At){pt.bindFramebuffer(N.FRAMEBUFFER,At);try{const Pt=b.textures[_t],Ht=Pt.format,Xt=Pt.type;if(b.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+_t),!fe.textureFormatReadable(Ht)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!fe.textureTypeReadable(Xt)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=b.width-z&&V>=0&&V<=b.height-k&&N.readPixels(F,V,z,k,L.convert(Ht),L.convert(Xt),vt)}finally{const Pt=U!==null?E.get(U).__webglFramebuffer:null;pt.bindFramebuffer(N.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(b,F,V,z,k,vt,Tt,_t=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let At=E.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Tt!==void 0&&(At=At[Tt]),At)if(F>=0&&F<=b.width-z&&V>=0&&V<=b.height-k){pt.bindFramebuffer(N.FRAMEBUFFER,At);const Pt=b.textures[_t],Ht=Pt.format,Xt=Pt.type;if(b.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+_t),!fe.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!fe.textureTypeReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Lt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Lt),N.bufferData(N.PIXEL_PACK_BUFFER,vt.byteLength,N.STREAM_READ),N.readPixels(F,V,z,k,L.convert(Ht),L.convert(Xt),0);const oe=U!==null?E.get(U).__webglFramebuffer:null;pt.bindFramebuffer(N.FRAMEBUFFER,oe);const we=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Uh(N,we,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Lt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,vt),N.deleteBuffer(Lt),N.deleteSync(we),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,F=null,V=0){const z=Math.pow(2,-V),k=Math.floor(b.image.width*z),vt=Math.floor(b.image.height*z),Tt=F!==null?F.x:0,_t=F!==null?F.y:0;v.setTexture2D(b,0),N.copyTexSubImage2D(N.TEXTURE_2D,V,0,0,Tt,_t,k,vt),pt.unbindTexture()};const Ju=N.createFramebuffer(),Qu=N.createFramebuffer();this.copyTextureToTexture=function(b,F,V=null,z=null,k=0,vt=0){let Tt,_t,At,Pt,Ht,Xt,Lt,oe,we;const be=b.isCompressedTexture?b.mipmaps[vt]:b.image;if(V!==null)Tt=V.max.x-V.min.x,_t=V.max.y-V.min.y,At=V.isBox3?V.max.z-V.min.z:1,Pt=V.min.x,Ht=V.min.y,Xt=V.isBox3?V.min.z:0;else{const Ae=Math.pow(2,-k);Tt=Math.floor(be.width*Ae),_t=Math.floor(be.height*Ae),b.isDataArrayTexture?At=be.depth:b.isData3DTexture?At=Math.floor(be.depth*Ae):At=1,Pt=0,Ht=0,Xt=0}z!==null?(Lt=z.x,oe=z.y,we=z.z):(Lt=0,oe=0,we=0);const ue=L.convert(F.format),ke=L.convert(F.type);let yt;F.isData3DTexture?(v.setTexture3D(F,0),yt=N.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(v.setTexture2DArray(F,0),yt=N.TEXTURE_2D_ARRAY):(v.setTexture2D(F,0),yt=N.TEXTURE_2D),pt.activeTexture(N.TEXTURE0),pt.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),pt.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),pt.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment);const sn=pt.getParameter(N.UNPACK_ROW_LENGTH),te=pt.getParameter(N.UNPACK_IMAGE_HEIGHT),dn=pt.getParameter(N.UNPACK_SKIP_PIXELS),Tn=pt.getParameter(N.UNPACK_SKIP_ROWS),Zn=pt.getParameter(N.UNPACK_SKIP_IMAGES);pt.pixelStorei(N.UNPACK_ROW_LENGTH,be.width),pt.pixelStorei(N.UNPACK_IMAGE_HEIGHT,be.height),pt.pixelStorei(N.UNPACK_SKIP_PIXELS,Pt),pt.pixelStorei(N.UNPACK_SKIP_ROWS,Ht),pt.pixelStorei(N.UNPACK_SKIP_IMAGES,Xt);const wi=b.isDataArrayTexture||b.isData3DTexture,he=F.isDataArrayTexture||F.isData3DTexture;if(b.isDepthTexture){const Ae=E.get(b),Jn=E.get(F),pe=E.get(Ae.__renderTarget),Qn=E.get(Jn.__renderTarget);pt.bindFramebuffer(N.READ_FRAMEBUFFER,pe.__webglFramebuffer),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,Qn.__webglFramebuffer);for(let Ai=0;Ai<At;Ai++)wi&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,E.get(b).__webglTexture,k,Xt+Ai),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,E.get(F).__webglTexture,vt,we+Ai)),N.blitFramebuffer(Pt,Ht,Tt,_t,Lt,oe,Tt,_t,N.DEPTH_BUFFER_BIT,N.NEAREST);pt.bindFramebuffer(N.READ_FRAMEBUFFER,null),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(k!==0||b.isRenderTargetTexture||E.has(b)){const Ae=E.get(b),Jn=E.get(F);pt.bindFramebuffer(N.READ_FRAMEBUFFER,Ju),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,Qu);for(let pe=0;pe<At;pe++)wi?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ae.__webglTexture,k,Xt+pe):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ae.__webglTexture,k),he?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Jn.__webglTexture,vt,we+pe):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Jn.__webglTexture,vt),k!==0?N.blitFramebuffer(Pt,Ht,Tt,_t,Lt,oe,Tt,_t,N.COLOR_BUFFER_BIT,N.NEAREST):he?N.copyTexSubImage3D(yt,vt,Lt,oe,we+pe,Pt,Ht,Tt,_t):N.copyTexSubImage2D(yt,vt,Lt,oe,Pt,Ht,Tt,_t);pt.bindFramebuffer(N.READ_FRAMEBUFFER,null),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else he?b.isDataTexture||b.isData3DTexture?N.texSubImage3D(yt,vt,Lt,oe,we,Tt,_t,At,ue,ke,be.data):F.isCompressedArrayTexture?N.compressedTexSubImage3D(yt,vt,Lt,oe,we,Tt,_t,At,ue,be.data):N.texSubImage3D(yt,vt,Lt,oe,we,Tt,_t,At,ue,ke,be):b.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,vt,Lt,oe,Tt,_t,ue,ke,be.data):b.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,vt,Lt,oe,be.width,be.height,ue,be.data):N.texSubImage2D(N.TEXTURE_2D,vt,Lt,oe,Tt,_t,ue,ke,be);pt.pixelStorei(N.UNPACK_ROW_LENGTH,sn),pt.pixelStorei(N.UNPACK_IMAGE_HEIGHT,te),pt.pixelStorei(N.UNPACK_SKIP_PIXELS,dn),pt.pixelStorei(N.UNPACK_SKIP_ROWS,Tn),pt.pixelStorei(N.UNPACK_SKIP_IMAGES,Zn),vt===0&&F.generateMipmaps&&N.generateMipmap(yt),pt.unbindTexture()},this.initRenderTarget=function(b){E.get(b).__webglFramebuffer===void 0&&v.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?v.setTextureCube(b,0):b.isData3DTexture?v.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?v.setTexture2DArray(b,0):v.setTexture2D(b,0),pt.unbindTexture()},this.resetState=function(){G=0,X=0,U=null,pt.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}const yc={type:"change"},Jo={type:"start"},Pu={type:"end"},er=new Pr,Ec=new Hn,Bg=Math.cos(70*tn.DEG2RAD),Ie=new D,Je=2*Math.PI,le={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ma=1e-6;class zg extends kd{constructor(t,e=null){super(t,e),this.state=le.NONE,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:je.ROTATE,MIDDLE:je.DOLLY,RIGHT:je.PAN},this.touches={ONE:pn.ROTATE,TWO:pn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new Kn,this._lastTargetPosition=new D,this._quat=new Kn().setFromUnitVectors(t.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new xo,this._sphericalDelta=new xo,this._scale=1,this._panOffset=new D,this._rotateStart=new Nt,this._rotateEnd=new Nt,this._rotateDelta=new Nt,this._panStart=new Nt,this._panEnd=new Nt,this._panDelta=new Nt,this._dollyStart=new Nt,this._dollyEnd=new Nt,this._dollyDelta=new Nt,this._dollyDirection=new D,this._mouse=new Nt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Gg.bind(this),this._onPointerDown=kg.bind(this),this._onPointerUp=Hg.bind(this),this._onContextMenu=jg.bind(this),this._onMouseWheel=Xg.bind(this),this._onKeyDown=qg.bind(this),this._onTouchStart=Yg.bind(this),this._onTouchMove=$g.bind(this),this._onMouseDown=Vg.bind(this),this._onMouseMove=Wg.bind(this),this._interceptControlDown=Kg.bind(this),this._interceptControlUp=Zg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(yc),this.update(),this.state=le.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;Ie.copy(e).sub(this.target),Ie.applyQuaternion(this._quat),this._spherical.setFromVector3(Ie),this.autoRotate&&this.state===le.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Je:i>Math.PI&&(i-=Je),s<-Math.PI?s+=Je:s>Math.PI&&(s-=Je),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ie.setFromSpherical(this._spherical),Ie.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ie),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ie.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new D(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new D(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Ie.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(er.origin.copy(this.object.position),er.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(er.direction))<Bg?this.object.lookAt(this.target):(Ec.setFromNormalAndCoplanarPoint(this.object.up,this.target),er.intersectPlane(Ec,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ma||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ma||this._lastTargetPosition.distanceToSquared(this.target)>Ma?(this.dispatchEvent(yc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Je/60*this.autoRotateSpeed*t:Je/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ie.setFromMatrixColumn(e,0),Ie.multiplyScalar(-t),this._panOffset.add(Ie)}_panUp(t,e){this.screenSpacePanning===!0?Ie.setFromMatrixColumn(e,1):(Ie.setFromMatrixColumn(e,0),Ie.crossVectors(this.object.up,Ie)),Ie.multiplyScalar(t),this._panOffset.add(Ie)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ie.copy(s).sub(this.target);let r=Ie.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Je*this._rotateDelta.x/e.clientHeight),this._rotateUp(Je*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Je*this._rotateDelta.x/e.clientHeight),this._rotateUp(Je*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Nt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function kg(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Gg(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Hg(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Pu),this.state=le.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Vg(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case je.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=le.DOLLY;break;case je.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=le.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=le.ROTATE}break;case je.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=le.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=le.PAN}break;default:this.state=le.NONE}this.state!==le.NONE&&this.dispatchEvent(Jo)}function Wg(n){switch(this.state){case le.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case le.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case le.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Xg(n){this.enabled===!1||this.enableZoom===!1||this.state!==le.NONE||(n.preventDefault(),this.dispatchEvent(Jo),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Pu))}function qg(n){this.enabled!==!1&&this._handleKeyDown(n)}function Yg(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case pn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=le.TOUCH_ROTATE;break;case pn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=le.TOUCH_PAN;break;default:this.state=le.NONE}break;case 2:switch(this.touches.TWO){case pn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=le.TOUCH_DOLLY_PAN;break;case pn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=le.TOUCH_DOLLY_ROTATE;break;default:this.state=le.NONE}break;default:this.state=le.NONE}this.state!==le.NONE&&this.dispatchEvent(Jo)}function $g(n){switch(this._trackPointer(n),this.state){case le.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case le.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case le.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case le.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=le.NONE}}function jg(n){this.enabled!==!1&&n.preventDefault()}function Kg(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Zg(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Lu extends Re{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Nt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element&&e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const Vi=new D,Tc=new ce,wc=new ce,Ac=new D,Rc=new D;class Jg{constructor(t={}){const e=this;let i,s,r,a;const o={objects:new WeakMap},c=t.element!==void 0?t.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.sortObjects=!0,this.getSize=function(){return{width:i,height:s}},this.render=function(g,x){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),x.parent===null&&x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),Tc.copy(x.matrixWorldInverse),wc.multiplyMatrices(x.projectionMatrix,Tc),h(g,g,x),this.sortObjects&&_(g)},this.setSize=function(g,x){i=g,s=x,r=i/2,a=s/2,c.style.width=g+"px",c.style.height=x+"px"};function l(g){g.isCSS2DObject&&(g.element.style.display="none");for(let x=0,f=g.children.length;x<f;x++)l(g.children[x])}function h(g,x,f){if(g.visible===!1){l(g);return}if(g.isCSS2DObject){Vi.setFromMatrixPosition(g.matrixWorld),Vi.applyMatrix4(wc);const d=Vi.z>=-1&&Vi.z<=1&&g.layers.test(f.layers)===!0,M=g.element;M.style.display=d===!0?"":"none",d===!0&&(g.onBeforeRender(e,x,f),M.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(Vi.x*r+r)+"px,"+(-Vi.y*a+a)+"px)",M.parentNode!==c&&c.appendChild(M),g.onAfterRender(e,x,f));const w={distanceToCameraSquared:p(f,g)};o.objects.set(g,w)}for(let d=0,M=g.children.length;d<M;d++)h(g.children[d],x,f)}function p(g,x){return Ac.setFromMatrixPosition(g.matrixWorld),Rc.setFromMatrixPosition(x.matrixWorld),Ac.distanceToSquared(Rc)}function u(g){const x=[];return g.traverseVisible(function(f){f.isCSS2DObject&&x.push(f)}),x}function _(g){const x=u(g).sort(function(d,M){if(d.renderOrder!==M.renderOrder)return M.renderOrder-d.renderOrder;const w=o.objects.get(d).distanceToCameraSquared,T=o.objects.get(M).distanceToCameraSquared;return w-T}),f=x.length;for(let d=0,M=x.length;d<M;d++)x[d].element.style.zIndex=f-d}}}class Qg extends uu{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const t=new Oe;t.deleteAttribute("uv");const e=new Tr({side:Ke}),i=new Tr,s=new Mu(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Qt(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new _d(t,i,6),o=new Re;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const c=new Qt(t,Wi(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new Qt(t,Wi(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const h=new Qt(t,Wi(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const p=new Qt(t,Wi(43));p.position.set(-.462,8.89,14.52),p.scale.set(4.38,5.441,.088),this.add(p);const u=new Qt(t,Wi(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const _=new Qt(t,Wi(100));_.position.set(0,20,0),_.scale.set(1,.1,1),this.add(_)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function Wi(n){return new Pd({color:0,emissive:16777215,emissiveIntensity:n})}const W={sky:15985891,ground:15392723,wall:16052714,wallExt:15526628,trim:16777215,doorLeaf:13215612,doorEntrance:3494010,glass:11130101,frame:4871528,floorWood:13608570,woodLight:14201994,woodMid:12159838,woodDark:8017462,tileFloor:15331058,tileGrout:13489886,sofa:6258598,sofaDark:4612223,fabricBeige:14931392,fabricGrey:11844806,bedding:16118766,blanket:8298639,rug:14272942,black:2303533,steel:12831443,white:16448250,counter:15856372,cabinet:14341062,cabinetDark:7174792,leaf:5810286,leafDark:4163670,pot:13616307,accent:15246141,label:12999226},Sa={...W},_i=(n,t,e)=>new Bt(n).lerp(new Bt(t),e).getHex();function t_(n){Object.assign(W,Sa),W.floorWood=n.floor,W.wall=n.wall,W.wallExt=_i(n.wall,0,.04),W.woodMid=n.wood,W.woodLight=_i(n.wood,16777215,.22),W.woodDark=_i(n.wood,0,.35),W.cabinet=_i(Sa.cabinet,n.wood,.18),W.sofa=n.sofa,W.sofaDark=_i(n.sofa,0,.25),W.accent=n.accent,W.blanket=_i(n.accent,16777215,.3),W.rug=_i(Sa.rug,n.floor,.25)}const ba=new Map;function yn(n,t={}){const e=`${n}|${JSON.stringify(t)}`;return ba.has(e)||ba.set(e,new Tr({color:n,roughness:.78,metalness:0,...t})),ba.get(e)}function bo(){return yn(W.glass,{transparent:!0,opacity:.28,roughness:.05,depthWrite:!1})}const yo=30,Cc=72,ya=[4.5,34],Ea=[.15,1.35],Ta=new D(5,0,3.5),Pc=Math.PI*2,e_=n=>n<.5?4*n*n*n:1-(-2*n+2)**3/2;function n_(){const n=window.matchMedia?.("(pointer: coarse)").matches||Math.min(window.innerWidth,window.innerHeight)<640;return{coarse:n,maxDpr:n?1.5:2,shadowSize:n?1024:2048,pointLights:!n}}function i_(n,t=n_()){const e=new Og({antialias:!0,powerPreference:"high-performance",stencil:!1});let i=Math.min(window.devicePixelRatio||1,t.maxDpr);e.setPixelRatio(i),e.outputColorSpace=Qe,e.toneMapping=Lo,e.toneMappingExposure=1,e.shadowMap.enabled=!0,e.shadowMap.type=Ms,e.shadowMap.autoUpdate=!1,e.shadowMap.needsUpdate=!0,Object.assign(e.domElement.style,{display:"block",width:"100%",height:"100%",touchAction:"none",outline:"none"});const s=new uu;s.background=new Bt(W.sky),s.fog=new Wo(W.sky,40,120);const r=new on(yo,1,.05,300);r.rotation.order="YXZ";const a=new Jg;Object.assign(a.domElement.style,{position:"absolute",left:"0",top:"0",pointerEvents:"none",overflow:"hidden"}),getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.append(e.domElement,a.domElement);const o=new zg(r,e.domElement);o.enableDamping=!0,o.dampingFactor=.1,o.rotateSpeed=.6,o.zoomSpeed=.9,o.minDistance=ya[0],o.maxDistance=ya[1],o.minPolarAngle=Ea[0],o.maxPolarAngle=Ea[1],o.screenSpacePanning=!1,o.touches={ONE:pn.ROTATE,TWO:pn.DOLLY_PAN},o.mouseButtons={LEFT:je.ROTATE,MIDDLE:je.DOLLY,RIGHT:je.PAN},o.target.copy(Ta);const c=new Id(16774118,15787736,1.1);s.add(c);const l=new Fd(16777215,2.4);l.castShadow=!0,l.shadow.mapSize.set(t.shadowSize,t.shadowSize),l.shadow.bias=-5e-4,l.shadow.normalBias=.03,l.shadow.radius=4;const h=l.shadow.camera;h.left=-9,h.right=9,h.top=9,h.bottom=-9,h.near=1,h.far=60,l.target.position.copy(Ta),s.add(l,l.target);const p=new vo(e),u=new Qg;s.environment=p.fromScene(u,.04).texture,s.environmentIntensity=.25,u.dispose(),p.dispose();const _={left:0,right:0,top:0,bottom:0},g={..._};let x={w:1,h:1};function f(){const it=(g.left-g.right)/2,Mt=(g.top-g.bottom)/2;Math.abs(it)<.5&&Math.abs(Mt)<.5?r.clearViewOffset():r.setViewOffset(x.w,x.h,-it,-Mt,x.w,x.h),r.updateProjectionMatrix()}const d=new Set,M=new zd;let w=3,T=!1,P=0,A=0;function y(it=2){it>w&&(w=it)}const m=()=>{const it=n.clientWidth||window.innerWidth,Mt=n.clientHeight||window.innerHeight;x={w:it,h:Mt},e.setSize(it,Mt,!1),a.setSize(it,Mt),r.aspect=it/Mt,f(),y()};function S(it){if(!T){A=0,P=0;return}A++,it>.03&&P++,A>=40&&(P>28&&i>.9&&(i=Math.max(.9,i-.25),e.setPixelRatio(i),e.setSize(x.w,x.h,!1)),A=0,P=0)}function C(){const it=Math.min(.1,M.getDelta());for(const xt of d)xt(it);let Mt=!1;for(const xt of["left","right","top","bottom"]){const q=_[xt]-g[xt];Math.abs(q)>.4?(g[xt]+=q*Math.min(1,it*10),Mt=!0):g[xt]=_[xt]}Mt&&(f(),y()),w>0?(w--,e.render(s,r),a.render(s,r),S(it),T=!0):T=!1}o.addEventListener("change",()=>y());const R=new D,I=new xo;function G(){return I.setFromVector3(R.copy(r.position).sub(o.target)),{target:o.target.clone(),distance:I.radius,azimuth:I.theta,polar:I.phi}}function X({target:it,distance:Mt,azimuth:xt,polar:q}){o.target.set(it.x,it.y??0,it.z),r.position.copy(o.target).add(R.setFromSphericalCoords(Mt,q,xt)),r.lookAt(o.target)}const U=it=>it-Pc*Math.floor((it+Math.PI)/Pc);function H(it){const Mt=new D(it.target.x,it.target.y??0,it.target.z),xt=new D().setFromSphericalCoords(it.distance,it.polar,it.azimuth).add(Mt),q=new Re;return q.position.copy(xt),q.lookAt(Mt),{pos:xt,quat:q.quaternion.clone(),fov:yo}}let O=null;function Q(){o._sphericalDelta?.set(0,0,0),o._panOffset?.set(0,0,0),"_scale"in o&&(o._scale=1)}function nt(){if(!O)return;const it=O;O=null,Q(),it.resolve(!1)}o.addEventListener("start",nt);function ft(it,{duration:Mt=1.1}={}){nt();const xt=G(),q={target:new D(it.target?.x??xt.target.x,it.target?.y??0,it.target?.z??xt.target.z),distance:tn.clamp(it.distance??xt.distance,...ya),azimuth:it.azimuth??xt.azimuth,polar:tn.clamp(it.polar??xt.polar,...Ea)};return Mt>0?new Promise(gt=>{O={kind:"view",from:xt,to:q,duration:Mt,resolve:gt,t:0,dAz:U(q.azimuth-xt.azimuth),d0:Math.log(xt.distance),d1:Math.log(q.distance)},y(3)}):(X(q),Q(),y(),Promise.resolve(!0))}function wt(it,{duration:Mt=1.2}={}){return nt(),Mt>0?new Promise(xt=>{O={kind:"pose",pose:it,duration:Mt,resolve:xt,t:0,fromPos:r.position.clone(),fromQuat:r.quaternion.clone(),fromFov:r.fov},y(3)}):(r.position.copy(it.pos),r.quaternion.copy(it.quat),r.fov=it.fov,r.updateProjectionMatrix(),y(),Promise.resolve(!0))}function Rt(it){if(!O)return;const Mt=O;Mt.t=Math.min(1,Mt.t+it/Mt.duration);const xt=e_(Mt.t);if(Mt.kind==="view")R.lerpVectors(Mt.from.target,Mt.to.target,xt),X({target:R.clone(),distance:Math.exp(tn.lerp(Mt.d0,Mt.d1,xt)),azimuth:Mt.from.azimuth+Mt.dAz*xt,polar:tn.lerp(Mt.from.polar,Mt.to.polar,xt)});else{r.position.lerpVectors(Mt.fromPos,Mt.pose.pos,xt),r.quaternion.slerpQuaternions(Mt.fromQuat,Mt.pose.quat,xt);const q=tn.lerp(Mt.fromFov,Mt.pose.fov,xt);q!==r.fov&&(r.fov=q,r.updateProjectionMatrix())}y(),Mt.t>=1&&(O=null,Q(),Mt.resolve(!0))}return d.add(Rt),m(),new ResizeObserver(m).observe(n),document.addEventListener("visibilitychange",()=>y(3)),{renderer:e,scene:s,camera:r,controls:o,labelRenderer:a,hemi:c,sun:l,center:Ta,quality:t,insets:_,invalidate:y,invalidateShadows(){e.shadowMap.needsUpdate=!0,y()},onFrame(it){return d.add(it),()=>d.delete(it)},flyView:ft,flyPose:wt,viewPose:H,cancelFlight:nt,getView:G,get flying(){return!!O},setInsets(it){Object.assign(_,it),y()},start(){e.setAnimationLoop(C)},pause(){e.setAnimationLoop(null)},resume(){M.getDelta(),e.setAnimationLoop(C),y(3)}}}function Du(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},a={},o=n[0].morphTargetsRelative,c=new Ze;let l=0;for(let h=0;h<n.length;++h){const p=n[h];let u=0;if(e!==(p.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const _ in p.attributes){if(!i.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+_+'" attribute exists among all geometries, or in none of them.'),null;r[_]===void 0&&(r[_]=[]),r[_].push(p.attributes[_]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==p.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const _ in p.morphAttributes){if(!s.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[_]===void 0&&(a[_]=[]),a[_].push(p.morphAttributes[_])}if(t){let _;if(e)_=p.index.count;else if(p.attributes.position!==void 0)_=p.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,_,h),l+=_}}if(e){let h=0;const p=[];for(let u=0;u<n.length;++u){const _=n[u].index;for(let g=0;g<_.count;++g)p.push(_.getX(g)+h);h+=n[u].attributes.position.count}c.setIndex(p)}for(const h in r){const p=Lc(r[h]);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,p)}for(const h in a){const p=a[h][0].length;if(p!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<p;++u){const _=[];for(let x=0;x<a[h].length;++x)_.push(a[h][x][u]);const g=Lc(_);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}}return c}function Lc(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){const h=n[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new mn(a,e,i);let c=0;for(let l=0;l<n.length;++l){const h=n[l];if(h.isInterleavedBufferAttribute){const p=c/e;for(let u=0,_=h.count;u<_;u++)for(let g=0;g<e;g++){const x=h.getComponent(u,g);o.setComponent(u+p,g,x)}}else a.set(h.array,c);c+=h.count*e}return s!==void 0&&(o.gpuType=s),o}const oi=2.7,s_=.2,r_=.12,Ur=n=>(n.x1-n.x0)*(n.z1-n.z0),It={templateId:"",bedrooms:2,scale:1,size:{w:10,d:7},rooms:[],walls:[],placements:[],area:0};function Iu(n){It.templateId=n.templateId,It.bedrooms=n.bedrooms,It.scale=n.scale??1,It.size=n.size,It.rooms=n.rooms,It.walls=n.walls,It.placements=n.placements,It.area=n.rooms.reduce((t,e)=>t+Ur(e),0)}const Eo=2.1,a_=.9,Uu=2.1,o_=2.3;function Nu(n,t=256){const e=document.createElement("canvas");e.width=e.height=t,n(e.getContext("2d"),t);const i=new yd(e);return i.wrapS=i.wrapT=gr,i.colorSpace=Qe,i.anisotropy=8,i}const l_=()=>{const n={h:0,s:0,l:0};return new Bt(W.floorWood).getHSL(n),Nu((t,e)=>{const s=e/8;for(let r=0;r<8;r++){const a=Math.round(n.l*100)-3+r*37%7;t.fillStyle=`hsl(${Math.round(n.h*360)} ${Math.round(n.s*100)}% ${a}%)`,t.fillRect(0,r*s,e,s),t.fillStyle="rgba(60,35,15,0.07)";for(let o=0;o<14;o++)t.fillRect((r*53+o*37)%e,r*s+o*29%s,30+o*17%60,1);t.fillStyle="rgba(60,35,15,0.30)",t.fillRect(0,r*s,e,1.5),t.fillRect(r*97%e,r*s,1.5,s)}})},c_=()=>Nu((n,t)=>{n.fillStyle="#e9eef2",n.fillRect(0,0,t,t),n.strokeStyle="#c8d1da",n.lineWidth=3,n.strokeRect(0,0,t,t),n.strokeRect(t/2,0,.1,t),n.strokeRect(0,t/2,t,.1)});function u_(n){const t=n.floor==="wood"?l_():c_(),e=n.floor==="wood"?2.2:1.2;return t.repeat.set((n.x1-n.x0)/e,(n.z1-n.z0)/e),new Tr({map:t,roughness:n.floor==="wood"?.55:.3})}const pr=[];function Dc(n,t,e,i,s,r,a,o,c,l){if(i-e<1e-4||r-s<1e-4||o-a<1e-4)return;const h=new Oe(i-e,r-s,o-a);h.translate((e+i)/2,(s+r)/2,(a+o)/2),pr.push({material:c,geo:h}),l&&t.push({x0:e,x1:i,z0:a,z1:o})}function h_(n){const t=yn(W.frame);for(const i of[...n.children])if(i.isMesh&&i.material===t){i.updateMatrix();const s=i.geometry.clone().applyMatrix4(i.matrix);pr.push({material:t,geo:s}),i.geometry.dispose(),n.remove(i)}const e=new Map;for(const{material:i,geo:s}of pr)e.has(i)||e.set(i,[]),e.get(i).push(s);for(const[i,s]of e){const r=new Qt(Du(s,!1),i);r.castShadow=!0,r.receiveShadow=!0,r.userData.blocker=!0,n.add(r);for(const a of s)a.dispose()}pr.length=0}function d_(n,t,e){const{dir:i,at:s,t:r}=n,a=r/2,o=n.from-a,c=n.to+a,l=r>=.2,h=yn(l?W.wallExt:W.wall),p=[...n.openings].map(g=>({...g,s:g.c-g.w/2,e:g.c+g.w/2})).sort((g,x)=>g.s-x.s),u=(g,x,f,d,M)=>{i==="x"?Dc(t,e,g,x,f,d,s-a,s+a,h,M):Dc(t,e,s-a,s+a,f,d,g,x,h,M)};let _=o;for(const g of p){if(u(_,g.s,0,oi,!0),g.type==="window"){const x=g.sill??a_;u(g.s,g.e,0,x,!0),u(g.s,g.e,Uu,oi,!1),f_(t,i,s,g,x)}else g.type==="door"?(u(g.s,g.e,Eo,oi,!1),p_(t,i,s,g,l)):u(g.s,g.e,o_,oi,!1);_=g.e}u(_,c,0,oi,!0)}function f_(n,t,e,i,s){const r=Uu-s,a=t==="x"?[i.w,r,.03]:[.03,r,i.w],o=new Qt(new Oe(...a),bo()),c=s+r/2;t==="x"?o.position.set(i.c,c,e):o.position.set(e,c,i.c),n.add(o);const l=i.w>1.1?1:0,h=yn(W.frame);for(let u=-1;u<=l;u+=2){const _=l?0:u<0?-i.w/2:i.w/2,g=new Qt(new Oe(...t==="x"?[.04,r,.06]:[.06,r,.04]),h);t==="x"?g.position.set(i.c+_,c,e):g.position.set(e,c,i.c+_),n.add(g)}const p=new Qt(new Oe(...t==="x"?[i.w,.04,.08]:[.08,.04,i.w]),h);t==="x"?p.position.set(i.c,s+.02,e):p.position.set(e,s+.02,i.c),n.add(p)}function p_(n,t,e,i,s){const r=i.w-.04,a=new Qt(new Oe(r,Eo-.03,.045),yn(s?W.doorEntrance:W.doorLeaf,{roughness:.5}));a.position.set(r/2,(Eo-.03)/2,0),a.castShadow=!0;const o=new Zt;o.add(a),t==="x"?(o.position.set(i.s+.02,0,e),o.rotation.y=s?0:-1.3):(o.position.set(e,0,i.s+.02),o.rotation.y=-Math.PI/2+(s?0:1.3)),n.add(o)}function m_(n){const t=document.createElement("button");t.type="button",t.className="room-label",t.dataset.room=n.id,t.innerHTML=`<b>${n.name}</b><span>${Ur(n).toFixed(0)} m²</span>`;const e=new Lu(t);return e.position.set((n.x0+n.x1)/2,.5,(n.z0+n.z1)/2),e}function g_(){const n=new Zt,t=new Zt,e=[],i=new Qt(new Yo(60,48),yn(W.ground,{roughness:1}));i.rotation.x=-Math.PI/2,i.position.set(It.size.w/2,-.21,It.size.d/2),i.receiveShadow=!0,n.add(i);const s=new Qt(new Oe(It.size.w+.9,.2,It.size.d+.9),yn(14932176));s.position.set(It.size.w/2,-.1,It.size.d/2),s.receiveShadow=!0,s.castShadow=!0,n.add(s);const r=[],a=new Map;for(const l of It.rooms){const h=new Qt(new Oe(l.x1-l.x0,.04,l.z1-l.z0),u_(l));h.position.set((l.x0+l.x1)/2,.02,(l.z0+l.z1)/2),h.receiveShadow=!0,h.userData.ref={type:"room",id:l.id},a.set(l.id,h),n.add(h);const p=m_(l);n.add(p),r.push(p)}for(const l of It.walls)d_(l,t,e);h_(t),n.add(t);const o=new Qt(new Oe(It.size.w+.2,.1,It.size.d+.2),yn(W.trim,{roughness:.95}));o.position.set(It.size.w/2,oi+.05,It.size.d/2),o.castShadow=!0,o.receiveShadow=!0,o.visible=!1,n.add(o);const c=It.rooms.map(l=>{const h=new Mu(16773336,7,8,2);return h.position.set((l.x0+l.x1)/2,oi-.3,(l.z0+l.z1)/2),n.add(h),h});return{root:n,walls:t,ceiling:o,labels:r,lamps:c,colliders:e,floors:a}}function dt(n,t,e,i,s,r,a,o,c){const l=new Qt(new Oe(t,e,i),typeof s=="object"?s:yn(s,c));return l.position.set(r,a+e/2,o),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function Me(n,t,e,i,s,r,a,o,c,l=24){const h=new Qt(new $o(t,e,i,l),yn(s,c));return h.position.set(r,a+i/2,o),h.castShadow=!0,h.receiveShadow=!0,n.add(h),h}function mr(n,t,e,i,s,r,a=1,o=1,c=1){const l=new Qt(new jo(t,16,12),yn(e));return l.position.set(i,s,r),l.scale.set(a,o,c),l.castShadow=!0,n.add(l),l}const ge=(n,t,e,i={})=>({group:n,w:t,d:e,...i});function __(n=2.4){const t=new Zt,e=.95;dt(t,n,.16,e,W.sofaDark,0,.08,0);const i=3,s=(n-.3)/i;for(let r=0;r<i;r++)dt(t,s-.02,.2,.68,W.sofa,-n/2+.15+s*(r+.5),.24,.1);dt(t,n,.5,.22,W.sofa,0,.24,-e/2+.11);for(const r of[-1,1])dt(t,.15,.36,e,W.sofa,r*(n/2-.075),.24,0);return dt(t,.45,.4,.12,W.accent,-n/2+.55,.44,-.2),dt(t,.45,.4,.12,W.fabricBeige,n/2-.55,.44,-.2),ge(t,n,e)}function x_(){const n=new Zt;dt(n,.85,.16,.85,W.sofaDark,0,.08,0),dt(n,.6,.18,.6,W.fabricBeige,0,.24,.07),dt(n,.85,.5,.2,W.fabricBeige,0,.24,-.325);for(const t of[-1,1])dt(n,.13,.34,.85,W.fabricBeige,t*.36,.24,0);return ge(n,.85,.85)}function v_(){const n=new Zt;dt(n,1.1,.04,.6,W.woodLight,0,.38,0);for(const t of[-1,1])for(const e of[-1,1])dt(n,.05,.38,.05,W.woodDark,t*.5,0,e*.25);return dt(n,.3,.05,.2,W.white,-.2,.42,0),Me(n,.06,.05,.1,W.accent,.25,.42,.05),ge(n,1.1,.6)}function M_(n=1.8){const t=new Zt;return dt(t,n,.45,.4,W.woodMid,0,0,0),dt(t,n-.1,.02,.38,W.woodDark,0,.22,.01),dt(t,1.35,.78,.05,W.black,0,.55,0),dt(t,.25,.1,.12,W.black,0,.45,0),ge(t,n,.4)}function S_(n,t,e=W.rug){e==="beige"&&(e=W.fabricBeige);const i=new Zt;return dt(i,n,.015,t,e,0,.04,0),dt(i,n-.3,.017,t-.3,W.fabricGrey,0,.04,0),ge(i,n,t,{solid:!1})}function b_(n=1){const t=new Zt;return Me(t,.18*n,.13*n,.32*n,W.pot,0,0,0),mr(t,.3*n,W.leaf,0,.62*n,0,1,1.2,1),mr(t,.2*n,W.leafDark,.12*n,.85*n,.05*n),mr(t,.18*n,W.leaf,-.1*n,.95*n,-.05*n),ge(t,.4*n,.4*n)}function y_(){const n=new Zt;Me(n,.12,.12,.03,W.black,0,0,0),Me(n,.012,.012,1.5,W.black,0,.03,0);const t=Me(n,.15,.22,.28,16773590,0,1.45,0,{emissive:16769704,emissiveIntensity:.6});return t.castShadow=!1,ge(n,.3,.3)}function E_(n=1){const t=new Zt;dt(t,n,.04,.3,W.woodMid,0,.78,0),dt(t,n-.04,.5,.28,W.cabinet,0,.28,0);for(const e of[-1,1])dt(t,.04,.28,.04,W.woodDark,e*(n/2-.05),0,0);return Me(t,.07,.05,.16,W.pot,-.25,.82,0),dt(t,.22,.02,.15,W.accent,.2,.82,0),ge(t,n,.3)}function T_(n=1.6,t=2){const e=new Zt;dt(e,n+.1,.25,t+.05,W.woodDark,0,0,0),dt(e,n,.22,t,W.bedding,0,.25,.02),dt(e,n,.04,t*.55,W.blanket,0,.46,t*.2),dt(e,n+.1,.95,.08,W.woodMid,0,0,-t/2-0);for(const i of[-1,1])dt(e,.55,.12,.35,W.white,i*n*.25,.47,-t/2+.3);return ge(e,n+.1,t+.05)}function w_(){const n=new Zt;dt(n,.45,.5,.4,W.woodLight,0,0,0),dt(n,.4,.01,.01,W.woodDark,0,.3,.2);const t=Me(n,.09,.12,.16,16773590,0,.5,0,{emissive:16769704,emissiveIntensity:.5});return t.castShadow=!1,ge(n,.45,.4)}function A_(n=1.4,t=2.2){const e=new Zt;dt(e,n,t,.6,W.cabinet,0,0,0);const i=Math.max(2,Math.round(n/.7));for(let s=1;s<i;s++)dt(e,.012,t-.1,.01,W.cabinetDark,-n/2+n/i*s,.05,.305);for(let s=0;s<i;s++){const r=-n/2+n/i*(s+.5);dt(e,.025,.28,.02,W.steel,r+(s%2?-.1:.1),1,.31)}return ge(e,n,.6)}function R_(){const n=new Zt;dt(n,1.2,.04,.6,W.woodLight,0,.72,0);for(const t of[-1,1])dt(n,.04,.72,.55,W.woodDark,t*.56,0,0);return dt(n,.5,.3,.03,W.black,0,.9,-.12),dt(n,.06,.18,.06,W.black,0,.76,-.12),dt(n,.4,.015,.14,W.white,0,.76,.1),ge(n,1.2,.6)}function C_(){const n=new Zt;dt(n,.42,.04,.42,W.woodLight,0,.44,0);for(const t of[-1,1])for(const e of[-1,1])dt(n,.035,.44,.035,W.woodDark,t*.18,0,e*.18);return dt(n,.42,.42,.04,W.woodLight,0,.48,-.19),ge(n,.42,.42)}function P_(){const n=new Zt;dt(n,1.4,.05,.8,W.woodLight,0,.72,0);for(const t of[-1,1])for(const e of[-1,1])dt(n,.06,.72,.06,W.woodDark,t*.64,0,e*.34);return Me(n,.11,.08,.16,W.white,0,.77,0),mr(n,.1,W.accent,0,1,0),ge(n,1.4,.8)}function L_(n=3,t=!0){const e=new Zt,i=.6;dt(e,n,.86,i,W.cabinet,0,0,0),dt(e,n+.02,.04,i+.04,W.counter,0,.86,.02);for(let s=1;s<Math.round(n/.6);s++)dt(e,.01,.8,.01,W.cabinetDark,-n/2+s*.6,.03,i/2+.005);dt(e,.7,.012,.42,W.steel,-n*.25,.9,.02),Me(e,.015,.015,.28,W.steel,-n*.25,.9,-.2),dt(e,.012,.012,.14,W.steel,-n*.25,1.17,-.13),dt(e,.6,.012,.5,W.black,n*.2,.9,.02);for(const[s,r]of[[-.14,-.1],[.14,-.1],[-.14,.12],[.14,.12]])Me(e,.08,.08,.008,W.cabinetDark,n*.2+s,.9,.02+r,{},20);return dt(e,n,.7,.35,W.cabinet,0,1.5,-.125),dt(e,.75,.12,.4,W.steel,n*.2,1.38,-.1),ge(e,n,i)}function D_(){const n=new Zt;return dt(n,.7,1.85,.7,W.steel,0,0,0,{metalness:.35,roughness:.4}),dt(n,.68,.012,.01,W.cabinetDark,0,.62,.355),dt(n,.025,.5,.03,W.cabinetDark,.28,1.1,.36),dt(n,.025,.3,.03,W.cabinetDark,.28,.25,.36),ge(n,.7,.7)}function I_(n=1.2){const t=new Zt,e=.32,i=2;dt(t,.03,i,e,W.woodMid,-n/2+.015,0,0),dt(t,.03,i,e,W.woodMid,n/2-.015,0,0),dt(t,n,.02,.01,W.woodDark,0,0,-e/2+.005),dt(t,n,i,.015,W.woodDark,0,0,-e/2+.01);const s=5,r=[W.accent,W.sofa,W.fabricBeige,W.leaf,W.blanket];for(let a=0;a<=s;a++)dt(t,n,.025,e,W.woodMid,0,(i-.025)*(a/s),0);for(let a=0;a<s;a++){const o=(i-.025)*(a/s)+.025;let c=-n/2+.07;for(let l=0;c<n/2-.12;l++){const h=.04+(a*7+l*5)%4*.012,p=.22+(a*3+l*7)%5*.025;dt(t,h,p,e*.7,r[(a+l)%r.length],c+h/2,o,.02),c+=h+.008,l%6===5&&(c+=.18)}}return ge(t,n,e)}function U_(){const n=new Zt;dt(n,1,.8,.45,W.woodLight,0,.05,0);for(const t of[-1,1])for(const e of[-1,1])dt(n,.04,.05,.04,W.woodDark,t*.45,0,e*.19);for(let t=0;t<3;t++)dt(n,.92,.002,.01,W.woodDark,0,.05+.26*(t+1)-.02,.226),dt(n,.1,.02,.025,W.steel,0,.05+.26*t+.13,.235);return Me(n,.07,.06,.12,W.pot,-.3,.85,0),dt(n,.22,.03,.16,W.accent,.25,.85,0),ge(n,1,.45)}function N_(){const n=new Zt;return Me(n,.24,.24,.03,W.woodLight,0,.47,0,{},28),Me(n,.015,.015,.47,W.black,0,0,0),Me(n,.15,.15,.02,W.black,0,0,0),Me(n,.05,.04,.09,W.pot,.06,.5,.03),ge(n,.5,.5)}function F_(){const n=new Zt;return Me(n,.28,.3,.38,W.fabricBeige,0,.02,0,{},28),Me(n,.29,.29,.04,W.sofaDark,0,.38,0,{},28),ge(n,.6,.6)}function O_(){const n=new Zt;return Me(n,.17,.17,.05,W.woodLight,0,.62,0,{},24),Me(n,.014,.014,.62,W.black,0,0,0),Me(n,.15,.15,.02,W.black,0,0,0),ge(n,.36,.36)}function B_(){const n=new Zt;return dt(n,.6,1.7,.04,W.woodDark,0,.05,0),dt(n,.5,1.6,.012,13624303,0,.1,.022,{metalness:.9,roughness:.08}),dt(n,.04,.5,.2,W.woodDark,-.2,0,-.12),dt(n,.04,.5,.2,W.woodDark,.2,0,-.12),ge(n,.6,.3)}function z_(){const n=new Zt;return dt(n,.38,.4,.2,W.white,0,.35,-.2),dt(n,.36,.38,.5,W.white,0,0,0),dt(n,.36,.04,.4,W.white,0,.38,.05),ge(n,.4,.62)}function k_(){const n=new Zt;return dt(n,.6,.78,.5,W.cabinet,0,0,0),dt(n,.64,.04,.54,W.counter,0,.78,0),dt(n,.34,.01,.28,W.white,0,.82,.02),Me(n,.012,.012,.16,W.steel,0,.82,-.18),dt(n,.5,.7,.02,W.glass,0,1.15,-.24,{transparent:!0,opacity:.55,metalness:.8,roughness:.05}),ge(n,.64,.54)}function G_(){const n=new Zt;dt(n,.9,.06,.9,W.white,0,0,0);const t=new Qt(new Oe(.9,1.95,.025),bo());t.position.set(0,.06+.975,.45),n.add(t);const e=new Qt(new Oe(.025,1.95,.9),bo());return e.position.set(.45,.06+.975,0),n.add(e),Me(n,.012,.012,1.1,W.steel,-.38,1,-.38),Me(n,.09,.09,.015,W.steel,-.3,2.05,-.38),ge(n,.9,.9)}function H_(n,t,e,i,s,r=0){if(e.group.position.set(i,0,s),e.group.rotation.y=r,n.add(e.group),e.solid===!1)return e.group;const a=Math.abs(Math.sin(r))>.5,o=a?e.d:e.w,c=a?e.w:e.d;return t.push({x0:i-o/2,x1:i+o/2,z0:s-c/2,z1:s+c/2}),e.group}const V_={sofa:__,armchair:x_,coffeeTable:v_,tvUnit:M_,rug:S_,plant:b_,floorLamp:y_,console:E_,bed:T_,nightstand:w_,wardrobe:A_,desk:R_,chair:C_,diningTable:P_,kitchenRun:L_,fridge:D_,toilet:z_,vanity:k_,shower:G_,bookshelf:I_,dresser:U_,sideTable:N_,ottoman:F_,barStool:O_,standingMirror:B_};function W_(n){n.updateMatrixWorld(!0);const t=new Map;for(const e of[...n.children]){if(!e.isMesh)continue;const i=e.material.uuid+(e.castShadow?"c":"n");t.has(i)||t.set(i,{material:e.material,cast:e.castShadow,geos:[]});const s=e.geometry.clone();s.applyMatrix4(e.matrix),t.get(i).geos.push(s),e.geometry.dispose(),n.remove(e)}for(const e of t.values()){const i=e.geos.length>1?Du(e.geos,!1):e.geos[0];if(e.geos.length>1)for(const r of e.geos)r.dispose();const s=new Qt(i,e.material);s.castShadow=e.cast,s.receiveShadow=!0,n.add(s)}}function X_(){const n=new Zt,t=[],e=new Map;for(const i of It.placements){const s=V_[i.kind];if(!s)throw new Error("Thiếu builder nội thất: "+i.kind);const r=s(...i.args??[]);(i.pick===!1||i.hidden)&&(r.solid=!1),W_(r.group);const a=H_(n,t,r,i.x,i.z,i.rot??0);a.name=i.id,i.hidden&&(a.visible=!1),e.set(i.id,a)}return{root:n,colliders:t,groups:e}}const qi={room:new Map,item:new Map};function Fu(n,t){return It.rooms.find(e=>n>=e.x0&&n<=e.x1&&t>=e.z0&&t<=e.z1)??null}function Ou(){qi.room=new Map(It.rooms.map(n=>[n.id,{...n,type:"room",area:Ur(n)}])),qi.item=new Map(It.placements.filter(n=>n.pick).map(n=>[n.id,{...n,type:"item",roomId:Fu(n.x,n.z)?.id??null,dims:null}]))}const _e={get:(n,t)=>qi[n]?.get(t)??null,list:n=>[...qi[n]?.values()??[]],itemsIn:n=>[...qi.item.values()].filter(t=>t.roomId===n),room:n=>qi.room.get(n)??null},nr=.14,q_=new Bt(15985891),Y_=new Bt(15913909),$_=new Bt(16758904),j_=new Bt(16775406);function K_(n){n.traverse(t=>{t.isMesh&&(t.geometry?.dispose(),t.material?.map&&(t.material.map.dispose(),t.material.dispose()))})}function Z_(n){const{scene:t,sun:e,hemi:i,quality:s}=n;let r=null,a=null,o=[];const c=new Map,l=new Map,h=[],p=[],u=[],_=(y,m)=>`${y}:${m}`;let g=nr,x=nr,f=1.5,d=!1,M=10;function w(){for(const y of[r?.root,a?.root])y&&(t.remove(y),K_(y));r=a=null,o=[],c.clear(),l.clear(),h.length=0,p.length=0,u.length=0}function T(){const y=It.size.w,m=It.size.d;n.center.set(y/2,0,m/2),e.target.position.copy(n.center);const S=Math.max(y,m)*.9,C=e.shadow.camera;C.left=-S,C.right=S,C.top=S,C.bottom=-S,C.updateProjectionMatrix()}function P(){if(r=g_(),a=X_(),t.add(r.root,a.root),!s.pointLights)for(const m of r.lamps)r.root.remove(m);o=s.pointLights?r.lamps:[];for(const m of _e.list("room")){const S=r.floors.get(m.id);c.set(_("room",m.id),S),h.push(S),l.set(_("room",m.id),new bn(new D(m.x0,0,m.z0),new D(m.x1,.08,m.z1)))}const y=new D;for(const m of _e.list("item")){const S=a.groups.get(m.id);if(!S)continue;S.userData.ref={type:"item",id:m.id},c.set(_("item",m.id),S),h.push(S);const C=new bn().setFromObject(S);l.set(_("item",m.id),C),C.getSize(y),m.dims={w:y.x,d:y.z,h:y.y}}p.push(...r.walls.children.filter(m=>m.isMesh)),u.push(...r.colliders,...a.colliders),T(),A.snapWalking(d),A.setHour(M)}const A={pickables:h,blockers:p,colliders:u,get walls(){return r?.walls},get ceiling(){return r?.ceiling},get labels(){return r?.labels??[]},getObject:(y,m)=>c.get(_(y,m))??null,getBox:(y,m=new bn)=>{const S=l.get(_(y.type,y.id));return S?m.copy(S):null},getEntityPosition(y,m,S=new D){const C=l.get(_(y,m));return C?C.getCenter(S):null},moveItem(y,m,S){const C=c.get(_("item",y));if(!C)return;C.position.x=m,C.position.z=S;const R=l.get(_("item",y));R&&R.setFromObject(C),n.invalidate()},rebuild(){w(),P(),n.invalidateShadows()},setWalking(y){d=y,g=y?1:nr,f=y?16:1.5,t.environmentIntensity=y?.8:.25,!y&&r&&(r.ceiling.visible=!1),n.invalidate(3)},setCeiling(y){r&&(r.ceiling.visible=y),n.invalidateShadows()},setHour(y){M=y;const S=tn.clamp((y-6)/12,0,1)*Math.PI,C=Math.sin(S),R=n.center;e.position.set(R.x-Math.cos(S)*16,3+C*15,R.z+8),e.intensity=.7+2.3*C,e.color.lerpColors($_,j_,Math.min(1,C*1.6)),i.intensity=.7+.6*C,t.background.lerpColors(Y_,q_,Math.min(1,C*1.6)),t.fog.color.copy(t.background),n.invalidateShadows()},update(y){r&&x!==g&&(x+=(g-x)*Math.min(1,y*5),Math.abs(g-x)<.002&&(x=g),r.walls.scale.y=x,n.invalidateShadows());for(const m of o)m.intensity!==f&&(m.intensity+=(f-m.intensity)*Math.min(1,y*4),Math.abs(f-m.intensity)<.02&&(m.intensity=f),n.invalidate())},snapWalking(y){d=y,x=g=y?1:nr,f=y?16:1.5,t.environmentIntensity=y?.8:.25,r&&(r.walls.scale.y=x,r.ceiling.visible=y);for(const m of o)m.intensity=f;n.invalidateShadows()},wallHeight:oi};return P(),A}const Bu=1.62,Ic=.28,J_=1.9,Q_=3.4,Uc=.0036,ir=.3,Nc={KeyW:[0,-1],ArrowUp:[0,-1],KeyS:[0,1],ArrowDown:[0,1],KeyA:[-1,0],KeyD:[1,0]},wa={ArrowLeft:1,ArrowRight:-1,KeyQ:1,KeyE:-1};function Aa(n,t,e){for(const i of n){const s=Math.max(i.x0,Math.min(t,i.x1)),r=Math.max(i.z0,Math.min(e,i.z1)),a=t-s,o=e-r;if(a*a+o*o<Ic*Ic)return!0}return!1}function tx({camera:n,dom:t,colliders:e}){const i={x:5,z:.7,yaw:Math.PI,pitch:0,enabled:!1},s=new Set;let r=null;const a={x:0,z:0},o=u=>{!i.enabled||/^(INPUT|TEXTAREA|SELECT)$/.test(u.target?.tagName??"")||(Nc[u.code]||wa[u.code]||u.code==="ShiftLeft")&&(s.add(u.code),u.preventDefault())},c=u=>s.delete(u.code),l=()=>s.clear();window.addEventListener("keydown",o),window.addEventListener("keyup",c),window.addEventListener("blur",l),t.addEventListener("pointerdown",u=>{i.enabled&&(r={id:u.pointerId,x:u.clientX,y:u.clientY},t.setPointerCapture(u.pointerId))}),t.addEventListener("pointermove",u=>{!r||u.pointerId!==r.id||(i.yaw-=(u.clientX-r.x)*Uc,i.pitch=tn.clamp(i.pitch-(u.clientY-r.y)*Uc,-1.25,1.25),r.x=u.clientX,r.y=u.clientY)});const h=u=>{r&&u.pointerId===r.id&&(r=null)};t.addEventListener("pointerup",h),t.addEventListener("pointercancel",h);function p(){n.position.set(i.x,Bu,i.z),n.rotation.set(i.pitch,i.yaw,0,"YXZ")}return{state:i,set(u,_,g,x=0){i.x=u,i.z=_,i.yaw=g,i.pitch=x},setEnabled(u){i.enabled=u,u||(s.clear(),r=null,a.x=a.z=0)},setAxis(u,_){a.x=u,a.z=_},press(u,_){_?s.add(u):s.delete(u)},update(u){if(!i.enabled)return!1;const _=i.x+i.z*31+i.yaw*57+i.pitch*91;for(const f of s)wa[f]&&(i.yaw+=wa[f]*1.8*u);let g=a.x,x=a.z;for(const f of s){const d=Nc[f];d&&(g+=d[0],x+=d[1])}if(g||x){const f=Math.max(1,Math.hypot(g,x));g/=f,x/=f;const d=(s.has("ShiftLeft")?Q_:J_)*u,M=Math.sin(i.yaw),w=Math.cos(i.yaw),T=(g*w+x*M)*d,P=(-g*M+x*w)*d,A=tn.clamp(i.x+T,ir,It.size.w-ir),y=tn.clamp(i.z+P,ir,It.size.d-ir),m=Aa(e,i.x,i.z);(m||!Aa(e,A,i.z))&&(i.x=A),(m||!Aa(e,i.x,y))&&(i.z=y)}return p(),i.x+i.z*31+i.yaw*57+i.pitch*91!==_},applyToCamera:p,dispose(){window.removeEventListener("keydown",o),window.removeEventListener("keyup",c),window.removeEventListener("blur",l)}}}const ex={mode:"overview",roomId:null,selection:null,hover:null,hour:10,playing:!1,menu:null,searchQuery:"",editable:!1,editing:!1,editPanel:null,designs:[],designId:null};function nx(n){let t={...n};const e=new Set;return{get state(){return t},set(i){const s=t,r=Object.keys(i).filter(a=>!Object.is(s[a],i[a]));if(r.length){t={...s,...i};for(const a of[...e])a(t,s,r)}},subscribe(i){return e.add(i),()=>e.delete(i)}}}const J=nx(ex);J.select=function(t){if(!t)return J.set({selection:null});const e=_e.get(t.type,t.id);e&&J.set({selection:{type:t.type,id:t.id},roomId:e.roomId??e.id,menu:null})};function ix(){const n=new Map;return{on(t,e){return n.has(t)||n.set(t,new Set),n.get(t).add(e),()=>n.get(t)?.delete(e)},emit(t,e){for(const i of[...n.get(t)??[]])i(e)}}}const se=ix();function sr(){const{w:n,d:t}=It.size;return{target:{x:n/2,y:0,z:t/2},distance:Math.max(n,t)*1.1+7.5,azimuth:Math.PI-.5,polar:.95}}function sx(){for(const n of It.walls){const t=n.openings.find(e=>e.entrance);if(t)return n.dir==="x"?{x:t.c,z:n.at+.75,yaw:n.at===0?Math.PI:0}:{x:n.at+.75,z:t.c,yaw:n.at===0?-Math.PI/2:Math.PI/2}}return{x:It.size.w/2,z:It.size.d/2,yaw:Math.PI}}const rx={zoomIn:.75,zoomOut:1.33},rr=Math.PI/6,ar=.12;function ax(n,t,e){const{camera:i,controls:s}=n,r=new D;let a=!1,o=null;const c=()=>o??n.getView();function l(y,m){const S={...n.getView(),...y,target:y.target??s.target.clone()};o=S,n.flyView(y,m).then(()=>{o===S&&(o=null)})}function h(y){const m=c(),S=y.x1-y.x0,C=y.z1-y.z0;return{target:{x:(y.x0+y.x1)/2,y:0,z:(y.z0+y.z1)/2},distance:Math.max(S,C)*1.45+3.5,azimuth:m.azimuth,polar:tn.clamp(m.polar,.7,1.1)}}function p(y,m=8){const S=t.getEntityPosition(y.type,y.id,new D);if(!S)return null;const C=c();return{target:{x:S.x,y:0,z:S.z},distance:m,azimuth:C.azimuth,polar:tn.clamp(C.polar,.7,1.1)}}function u({x:y,z:m,yaw:S,pitch:C=0}){const R=new Kn().setFromEuler(new In(C,S,0,"YXZ"));return{pos:new D(y,Bu,m),quat:R,fov:Cc}}async function _(y,m=1.4){s.enabled=!1,e.setEnabled(!1),t.setWalking(!0),e.set(y.x,y.z,y.yaw,0),!(!await n.flyPose(u(y),{duration:m})||J.state.mode!=="walk")&&(t.setCeiling(!0),e.setEnabled(!0),n.invalidate())}async function g(y=sr(),m=1.4){e.setEnabled(!1),t.setWalking(!1);const S=n.viewPose({...y,target:y.target});!await n.flyPose(S,{duration:m})||J.state.mode!=="overview"||(n.camera.fov=S.fov,n.camera.updateProjectionMatrix(),s.target.set(y.target.x,0,y.target.z),s.enabled=!0,s.update(),n.invalidate())}function x(y){return y?.stand??sx()}function f(y){const m=_e.room(J.state.roomId);y==="walk"?_(x(m)):g(m?h(m):sr())}function d(y){const m=_e.room(y);if(m)if(J.set({roomId:y}),J.state.mode==="walk"){e.setEnabled(!1);const S=x(m);e.set(S.x,S.z,S.yaw,0),n.flyPose(u(S),{duration:1}).then(C=>{C&&J.state.mode==="walk"&&e.setEnabled(!0)})}else l(h(m),{duration:1.1})}function M(y){if(i.updateMatrixWorld(),r.copy(y).project(i),r.z>1)return null;const m=n.renderer.domElement.clientWidth,S=n.renderer.domElement.clientHeight,{left:C,right:R,top:I,bottom:G}=n.insets,X=(r.x+1)/2*m,U=(1-r.y)/2*S,H=Math.max(1,m-C-R),O=Math.max(1,S-I-G);return{fx:(X-C)/H,fy:(U-I)/O}}function w(y){if(J.state.mode!=="overview"||n.flying)return;const m=t.getEntityPosition(y.type,y.id,new D);if(!m)return;const S=n.getView(),C=M(m.clone().setY(.4));if(C&&C.fx>ar&&C.fx<1-ar&&C.fy>ar&&C.fy<1-ar&&S.distance<22)return;const I=p(y,Math.min(S.distance,9));I&&l(I,{duration:.9})}function T(y){const m=t.getEntityPosition(y.type,y.id,new D);if(m)if(J.state.mode==="walk"){const S=_e.room(J.state.roomId)??_e.room(Fu(m.x,m.z)?.id),C=S?(S.x0+S.x1)/2:m.x,R=S?(S.z0+S.z1)/2:m.z,I=new Nt(C-m.x,R-m.z);I.lengthSq()<1e-4&&I.set(0,1),I.normalize();const G={x:tn.clamp(m.x+I.x*1.9,.35,9.65),z:tn.clamp(m.z+I.y*1.9,.35,6.65)},X=Math.atan2(-(m.x-G.x),-(m.z-G.z));e.setEnabled(!1),e.set(G.x,G.z,X,-.12),n.flyPose(u({...G,yaw:X,pitch:-.12}),{duration:.9}).then(U=>{U&&J.state.mode==="walk"&&e.setEnabled(!0)})}else{const S=p(y,y.type==="room"?12:6.5);S&&l(S,{duration:1})}}function P({cmd:y}={}){if(J.state.mode==="walk"){y==="rotateLeft"||y==="rotateRight"?(e.state.yaw+=y==="rotateLeft"?rr:-rr,n.invalidate()):y==="home"&&d(J.state.roomId??"living");return}const m=c(),S={target:m.target,distance:m.distance,azimuth:m.azimuth,polar:m.polar};switch(y){case"zoomIn":case"zoomOut":return l({...S,distance:m.distance*rx[y]},{duration:.45});case"rotateLeft":case"rotateRight":return l({...S,azimuth:m.azimuth+(y==="rotateLeft"?-rr:rr)},{duration:.6});case"home":return l(sr(),{duration:1.1})}}const A=[J.subscribe((y,m,S)=>{n.invalidate(),S.includes("mode")&&!a?f(y.mode):S.includes("selection")&&y.selection&&y.selection.type==="item"&&w(y.selection)}),se.on("room:go",({id:y})=>d(y)),se.on("camera:locate",y=>y.type==="room"?d(y.id):T(y)),se.on("camera:cmd",P)];return{start({walk:y=!1,room:m=null}={}){o=null;const S=m?_e.room(m):null;if(S&&J.set({roomId:S.id}),y){a=!0,J.set({mode:"walk"}),a=!1,s.enabled=!1;const C=x(S);e.set(C.x,C.z,C.yaw,0),e.applyToCamera(),i.fov=Cc,i.updateProjectionMatrix(),t.snapWalking(!0),e.setEnabled(!0)}else a=!0,J.set({mode:"overview"}),a=!1,e.setEnabled(!1),i.fov=yo,i.updateProjectionMatrix(),t.snapWalking(!1),s.enabled=!0,n.flyView(S?h(S):sr(),{duration:0})},update(){J.state.mode==="overview"&&s.enabled&&!n.flying&&s.update()},dispose(){A.forEach(y=>y())}}}const Fc=6,ox=.12,lx=.05,zu=(n,t)=>n===t||!!n&&!!t&&n.type===t.type&&n.id===t.id;function cx(n,t){const e=new Zt;e.name="interaction-overlay",n.scene.add(e);const i=ux(n,t),s=Oc(e,"selected"),r=Oc(e,"hover"),a=()=>{const{hover:c,selection:l}=J.state;s.show(l,t),r.show(zu(c,l)?null:c,t),n.invalidate()},o=J.subscribe((c,l,h)=>{(h.includes("selection")||h.includes("hover"))&&a()});return{refresh:a,update(c){i.update(c)},dispose(){o(),i.dispose(),n.scene.remove(e)}}}function ux(n,t){const e=n.renderer.domElement,i=new Su,s=new Nt;let r=null,a=null,o=!1,c=0;function l(d,M){const w=e.getBoundingClientRect();s.set((d-w.left)/w.width*2-1,-((M-w.top)/w.height)*2+1),i.setFromCamera(s,n.camera);const T=i.intersectObjects([...t.pickables,...t.blockers],!0);for(const P of T){if(P.object.userData.blocker)return null;const A=hx(P.object);if(A)return A}return null}function h(d){zu(d,J.state.hover)||J.set({hover:d?{type:d.type,id:d.id}:null})}const p=d=>{d.pointerType==="mouse"&&(r={x:d.clientX,y:d.clientY},o=!0,a&&!a.dragging&&Math.hypot(d.clientX-a.x,d.clientY-a.y)>Fc&&(a.dragging=!0,h(null)))},u=d=>{a={id:d.pointerId,x:d.clientX,y:d.clientY,button:d.button,dragging:!1}},_=d=>{const M=a;if(a=null,!M||M.id!==d.pointerId||M.dragging||M.button!==0||Math.hypot(d.clientX-M.x,d.clientY-M.y)>Fc)return;const w=l(d.clientX,d.clientY);w?J.select(w):d.pointerType!=="mouse"&&J.select(null)},g=()=>{a=null},x=()=>{r=null,a||h(null)},f=d=>{d.key!=="Escape"||/^(INPUT|TEXTAREA|SELECT)$/.test(d.target?.tagName??"")||J.state.selection&&J.select(null)};return e.addEventListener("pointermove",p),e.addEventListener("pointerdown",u),e.addEventListener("pointerup",_),e.addEventListener("pointercancel",g),e.addEventListener("pointerleave",x),window.addEventListener("keydown",f),{update(d){if(c+=d,!r||a?.dragging||!o||c<ox||n.flying)return;o=!1,c=0;const M=l(r.x,r.y);h(M),a||(e.style.cursor=M?"pointer":"")},dispose(){e.removeEventListener("pointermove",p),e.removeEventListener("pointerdown",u),e.removeEventListener("pointerup",_),e.removeEventListener("pointercancel",g),e.removeEventListener("pointerleave",x),window.removeEventListener("keydown",f)}}}function hx(n){for(let t=n;t;t=t.parent){if(t.visible===!1)return null;if(t.userData?.ref&&_e.get(t.userData.ref.type,t.userData.ref.id))return t.userData.ref}return null}function dx(n=.22){const t=[];for(const i of[-.5,.5])for(const s of[-.5,.5])for(const r of[-.5,.5])t.push(i,s,r,i-Math.sign(i)*n,s,r),t.push(i,s,r,i,s-Math.sign(s)*n,r),t.push(i,s,r,i,s,r-Math.sign(r)*n);const e=new Ze;return e.setAttribute("position",new Ce(t,3)),e}const fx=dx(),px=new Oe(1,1,1),mx={hover:{color:14262412,opacity:.6,fill:.06},selected:{color:12999226,opacity:1,fill:.14}};function Oc(n,t){const e=mx[t],i=new Zt;i.visible=!1;const s=new bd(fx,new pu({color:e.color,transparent:!0,opacity:e.opacity,depthTest:!1,toneMapped:!1}));s.renderOrder=20;const r=new Qt(px,new Xo({color:e.color,transparent:!0,opacity:e.fill,depthWrite:!1,toneMapped:!1}));r.renderOrder=19,i.add(r,s),n.add(i);const a=document.createElement("div");a.className=`pill pill--${t}`;const o=new Lu(a);o.visible=!1,n.add(o);const c=new bn,l=new D,h=new D;let p=null;return{show(u,_){if(!u||!_.getBox(u,c)){p=null,i.visible=!1,o.visible=!1;return}p=u,c.getSize(l).addScalar(lx*2),c.getCenter(h),i.position.copy(h),i.scale.copy(l),i.visible=!0;const g=_e.get(u.type,u.id);a.textContent=g?.name??"",o.visible=u.type==="item",o.position.set(h.x,c.max.y+.18,h.z)},get current(){return p}}}const Bc={bare:0,partial:1,full:2},Zi={sofa:[2.2],armchair:[],ottoman:[],coffeeTable:[],sideTable:[],tvUnit:[1.5],bookshelf:[1.2],dresser:[],wardrobe:[1.2,2.2],bed:[],nightstand:[],desk:[],chair:[],diningTable:[],barStool:[],console:[1],plant:[1],floorLamp:[],standingMirror:[]},To={sofa:{name:"Sofa 3 chỗ",category:"Sofa & ghế",material:"Vải bọc, khung gỗ",note:"Đệm dày, hai gối tựa kèm theo.",tier:1},armchair:{name:"Ghế bành",category:"Sofa & ghế",material:"Vải bọc",note:"Góc thư giãn trong phòng khách.",tier:2},coffeeTable:{name:"Bàn trà",category:"Bàn",material:"Gỗ sồi",note:"Đặt giữa sofa và kệ TV.",tier:1},tvUnit:{name:'Kệ TV + TV 55"',category:"Điện tử",material:"Gỗ công nghiệp",note:"TV đặt trên kệ thấp, đối diện sofa.",tier:1},rug:{name:"Thảm",category:"Trang trí",material:"Sợi dệt",note:"",tier:2,pick:!1},plant:{name:"Cây trong nhà",category:"Trang trí",material:"Chậu gốm",note:"Cây lá lớn tạo điểm nhấn xanh.",tier:2},floorLamp:{name:"Đèn cây",category:"Chiếu sáng",material:"Kim loại đen",note:"Ánh sáng vàng ấm buổi tối.",tier:2},console:{name:"Bàn console",category:"Bàn",material:"Gỗ + tủ thấp",note:"Để chìa khoá, thư từ ở lối vào.",tier:2},bed:{name:"Giường đôi 1m6",category:"Giường",material:"Khung gỗ, nệm bông ép",note:"Kèm ga gối và chăn.",tier:1},nightstand:{name:"Tab đầu giường",category:"Tủ",material:"Gỗ sồi",note:"Kèm đèn ngủ.",tier:2},wardrobe:{name:"Tủ quần áo",category:"Tủ",material:"Gỗ công nghiệp",note:"Tủ cao sát trần, nhiều ngăn.",tier:0},desk:{name:"Bàn làm việc",category:"Bàn",material:"Gỗ sồi",note:"Kèm màn hình.",tier:2},chair:{name:"Ghế",category:"Sofa & ghế",material:"Gỗ sồi",note:"",tier:1},diningTable:{name:"Bàn ăn 4 chỗ",category:"Bàn",material:"Gỗ sồi",note:"Gần cửa sổ, đón sáng buổi sáng.",tier:1},kitchenRun:{name:"Bộ bếp",category:"Bếp",material:"Tủ gỗ + mặt đá",note:"Bồn rửa inox, bếp từ, tủ treo phía trên.",tier:0},fridge:{name:"Tủ lạnh",category:"Bếp",material:"Inox",note:"Tủ lạnh hai cánh đặt cuối dãy bếp.",tier:1},bookshelf:{name:"Tủ sách",category:"Tủ",material:"Gỗ công nghiệp",note:"Nhiều ngăn mở cho sách và đồ trang trí.",tier:2},dresser:{name:"Tủ ngăn kéo",category:"Tủ",material:"Gỗ sồi",note:"Cất đồ lặt vặt, đặt thêm gương hoặc đèn.",tier:2},sideTable:{name:"Bàn phụ",category:"Bàn",material:"Gỗ + kim loại",note:"Đặt cạnh sofa hoặc đầu giường.",tier:2},ottoman:{name:"Ghế đôn",category:"Sofa & ghế",material:"Vải bọc",note:"Kê chân hoặc ngồi thêm khi có khách.",tier:2},barStool:{name:"Ghế quầy bar",category:"Sofa & ghế",material:"Gỗ + kim loại",note:"Ngồi bên quầy bếp.",tier:2},standingMirror:{name:"Gương đứng",category:"Trang trí",material:"Kính + khung gỗ",note:"Gương soi toàn thân.",tier:2},toilet:{name:"Bệ xí",category:"Vệ sinh",material:"Sứ",note:"Két nước liền khối.",tier:0},vanity:{name:"Tủ lavabo + gương",category:"Vệ sinh",material:"Tủ gỗ + mặt đá",note:"Gương treo trên lavabo.",tier:0},shower:{name:"Buồng tắm kính",category:"Vệ sinh",material:"Kính cường lực",note:"Vòi sen cây, khay đáy thấp.",tier:0}},ns={modern:{label:"Hiện đại",palette:{floor:13608570,wall:16052714,wood:12159838,sofa:6258598,accent:15246141}},nordic:{label:"Bắc Âu",palette:{floor:14929832,wall:16316662,wood:13808780,sofa:9414844,accent:7317664}},warm:{label:"Ấm cúng",palette:{floor:12158040,wall:15918287,wood:10251075,sofa:12874842,accent:14254635}},luxury:{label:"Sang trọng",palette:{floor:9069892,wall:15262422,wood:7031344,sofa:3096149,accent:13214282}},industrial:{label:"Công nghiệp",palette:{floor:9271911,wall:13817305,wood:8216387,sofa:4869975,accent:14250795}}},wr=Object.keys(ns),gx=["floor","wall","wood","sofa","accent"],_x=/^#?([0-9a-f]{6})$/i;function xx(n){if(typeof n=="number"&&Number.isInteger(n)&&n>=0&&n<=16777215)return n;if(typeof n!="string")return null;const t=_x.exec(n.trim());return t?parseInt(t[1],16):null}function Qo(n){if(!n||typeof n!="object")return null;const t=typeof n.id=="string"?n.id.trim():"",e=typeof n.name=="string"?n.name.trim().slice(0,60):"";if(!t||!e)return null;const i={};if(n.palette&&typeof n.palette=="object")for(const r of gx){const a=xx(n.palette[r]);a!==null&&(i[r]=a)}const s=Number(n.defaultHour);return{id:t,name:e,description:typeof n.description=="string"?n.description.slice(0,200):"",theme:wr.includes(n.theme)?n.theme:"modern",palette:i,furnishing:["bare","partial","full"].includes(n.furnishing)?n.furnishing:null,defaultHour:Number.isFinite(s)?Math.min(18,Math.max(6,s)):10,layout:un(n.layout)}}const zc=/^[A-Za-z0-9_-]{1,48}$/,vx=120,Mx=60,Sx=-2,bx=40,or=n=>typeof n=="number"&&Number.isFinite(n)&&n>=Sx&&n<=bx?Math.round(n*1e3)/1e3:void 0,kc=n=>{if(typeof n!="number"||!Number.isFinite(n))return;const t=n%(Math.PI*2);return Math.round(t*1e4)/1e4};function un(n){const t={items:{},extras:[]};if(!n||typeof n!="object")return t;if(n.items&&typeof n.items=="object")for(const[e,i]of Object.entries(n.items).slice(0,vx)){if(!zc.test(e)||!i||typeof i!="object")continue;const s={},r=or(i.x),a=or(i.z),o=kc(i.rot);r!==void 0&&(s.x=r),a!==void 0&&(s.z=a),o!==void 0&&(s.rot=o),i.hidden===!0&&(s.hidden=!0),Object.keys(s).length&&(t.items[e]=s)}if(Array.isArray(n.extras)){const e=new Set;for(const i of n.extras.slice(0,Mx)){if(!i||typeof i!="object"||!zc.test(i.id??"")||e.has(i.id)||!Object.prototype.hasOwnProperty.call(Zi,i.kind))continue;const s=or(i.x),r=or(i.z);if(s===void 0||r===void 0)continue;e.add(i.id);const a={id:i.id,kind:i.kind,x:s,z:r,rot:kc(i.rot)??0};i.hidden===!0&&(a.hidden=!0),t.extras.push(a)}}return t}function ku(n){return{...ns[n?.theme]?.palette??ns.modern.palette,...n?.palette??{}}}function yx(n){let t=0;for(const i of String(n))t=t*31+i.charCodeAt(0)>>>0;const e=wr[t%wr.length];return Qo({id:"default",name:`Phong cách ${ns[e].label}`,theme:e})}const Ex=60,Gc=.25,Hc=.05,Tx=Math.PI*2,as=n=>un(JSON.parse(JSON.stringify(un(n)))),Yi=(n,t)=>n/(t||1);function Vc(n,t){const e=Math.min(t-Gc,Math.max(Gc,n));return Math.round(e/Hc)*Hc}function wx(n,t){return n.extras.some(e=>e.id===t)}function Ax(n,t,e,i,s){const r=as(n),a=r.extras.find(o=>o.id===t);if(a)a.x=Yi(e,s),a.z=Yi(i,s);else{const o=r.items[t]??={};o.x=Yi(e,s),o.z=Yi(i,s)}return un(r)}function Rx(n,t,e=0){const i=as(n),s=(e+Math.PI/2)%Tx,r=i.extras.find(a=>a.id===t);return r?r.rot=s:(i.items[t]??={}).rot=s,un(i)}function Cx(n,t){const e=as(n),i=e.extras.find(s=>s.id===t)??(e.items[t]??={});return i.hidden?delete i.hidden:i.hidden=!0,un(e)}function Px(n,t){const e=as(n);return e.extras.some(i=>i.id===t)?(e.extras=e.extras.filter(i=>i.id!==t),un(e)):e}function Lx(n,t){const e=as(n),i=e.items[t];return i&&(delete i.x,delete i.z,delete i.rot),un(e)}function Dx(n,t,e,i,s,r,a=Math.random){if(!Object.prototype.hasOwnProperty.call(Zi,t))return null;const o=as(n);if(o.extras.length>=Ex)return null;const c=new Set([...r,...o.extras.map(h=>h.id)]);let l;do l=`extra-${a().toString(36).slice(2,8).padEnd(6,"0")}`;while(c.has(l));return o.extras.push({id:l,kind:t,x:Yi(e,s),z:Yi(i,s),rot:0}),{layout:un(o),id:l}}const Ix=.03;function Ux(n,t,e,i){const s=n.renderer.domElement,r=n.controls,a=new Su,o=new Nt,c=new Hn(new D(0,1,0),0),l=new D;let h=null;function p(f,d){const M=s.getBoundingClientRect();return o.set((f.clientX-M.left)/M.width*2-1,-((f.clientY-M.top)/M.height)*2+1),a.setFromCamera(o,n.camera),a.ray.intersectPlane(c,d)}function u(f){const d=s.getBoundingClientRect();o.set((f.clientX-d.left)/d.width*2-1,-((f.clientY-d.top)/d.height)*2+1),a.setFromCamera(o,n.camera);const M=a.intersectObjects(t.pickables,!0);for(const w of M)for(let T=w.object;T&&T.visible!==!1;T=T.parent){const P=T.userData?.ref;if(P?.type==="item"&&_e.get("item",P.id))return P}return null}const _=f=>{if(!J.state.editing||J.state.mode!=="overview"||f.button!==0)return;const d=u(f);if(!d)return;const M=t.getObject("item",d.id);!M||!p(f,l)||(h={id:d.id,group:M,pointerId:f.pointerId,offsetX:M.position.x-l.x,offsetZ:M.position.z-l.z,startX:M.position.x,startZ:M.position.z},r.enabled=!1,n.cancelFlight(),J.select(d),s.setPointerCapture(f.pointerId),s.style.cursor="grabbing")},g=f=>{if(!h||f.pointerId!==h.pointerId||!p(f,l))return;const d=Vc(l.x+h.offsetX,It.size.w),M=Vc(l.z+h.offsetZ,It.size.d);t.moveItem(h.id,d,M),e.refresh()},x=f=>{if(!h||f.pointerId!==h.pointerId)return;const{id:d,group:M,startX:w,startZ:T}=h;h=null,r.enabled=J.state.mode==="overview",s.style.cursor="";const P=M.position.x,A=M.position.z;Math.hypot(P-w,A-T)>=Ix&&i.onMove(d,P,A)};return s.addEventListener("pointerdown",_,{capture:!0}),s.addEventListener("pointermove",g),s.addEventListener("pointerup",x),s.addEventListener("pointercancel",x),{setEditing(f){r.mouseButtons=f?{LEFT:je.PAN,MIDDLE:je.DOLLY,RIGHT:je.ROTATE}:{LEFT:je.ROTATE,MIDDLE:je.DOLLY,RIGHT:je.PAN},r.touches=f?{ONE:pn.PAN,TWO:pn.DOLLY_ROTATE}:{ONE:pn.ROTATE,TWO:pn.DOLLY_PAN},r.screenSpacePanning=f},dispose(){s.removeEventListener("pointerdown",_,{capture:!0}),s.removeEventListener("pointermove",g),s.removeEventListener("pointerup",x),s.removeEventListener("pointercancel",x)}}}const Ra=n=>String(n??"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d");function Nx(n,t=8){const e=Ra(n).trim();if(!e)return[];const i=[];for(const s of _e.list("room"))Ra(s.name).includes(e)&&i.push({type:"room",id:s.id,title:s.name,sub:`${s.area.toFixed(0)} m²`});for(const s of _e.list("item")){const r=_e.room(s.roomId);if(Ra(`${s.name} ${s.category} ${r?.name??""} ${s.material??""}`).includes(e)&&i.push({type:"item",id:s.id,title:s.name,sub:`${s.category} · ${r?.name??""}`}),i.length>=t)break}return i.slice(0,t)}const Fx=n=>n?`${n.w.toFixed(2)} × ${n.d.toFixed(2)} × ${n.h.toFixed(2)} m`:"",Ox={plus:"M12 5v14M5 12h14",minus:"M5 12h14",rotateLeft:"M3 12a9 9 0 1 0 3-6.7M3 4v5h5",rotateRight:"M21 12a9 9 0 1 1-3-6.7M21 4v5h-5",home:"M4 11 12 4l8 7M6 10v10h12V10",close:"M6 6l12 12M18 6 6 18",search:"M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",sun:"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4",play:"M7 5v14l11-7z",pause:"M8 5v14M16 5v14",walk:"M13 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM10 21l2-6-3-2 1-5 3 2 2 3M12 15l3 6",cube:"M12 3 4 7.5v9L12 21l8-4.5v-9zM4 7.5 12 12l8-4.5M12 12v9",pin:"M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10zM12 8.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",expand:"M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",shrink:"M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5",pencil:"M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16zM13.5 6.5l4 4",eyeOff:"M3 3l18 18M10.6 5.2A10 10 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 4M6.2 6.2A17 17 0 0 0 2 12s4 7 10 7a9.7 9.7 0 0 0 4.2-1M9.9 9.9a3 3 0 0 0 4.2 4.2",trash:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",list:"M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",undo:"M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3",eye:"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"};function ye(n,t=18,e=1.8){return`<svg class="ico" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${Ox[n]??""}"/></svg>`}const de=n=>String(n??"").replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`),wo=1,Wc=8,Bx=1e3,zx=20,Ar=()=>!!window.ReactNativeWebView,Gu=()=>Ar()||window.parent!==window;function Ei(n,t){const e=t===void 0?{version:wo,type:n}:{version:wo,type:n,payload:t};if(window.ReactNativeWebView){window.ReactNativeWebView.postMessage(JSON.stringify(e));return}window.parent!==window&&window.parent.postMessage(e,window.location.origin)}function Hu(n){if(!n||typeof n!="object")return null;const t=typeof n.apartmentId=="string"?n.apartmentId.trim():"",e=Number(n.bedrooms),i=Number(n.bathrooms),s=Number(n.areaM2);if(!t||!Number.isFinite(e)||e<0||e>Wc||!Number.isFinite(i)||i<0||i>Wc||!Number.isFinite(s)||s<=0||s>Bx||!["bare","partial","full"].includes(n.furnishing))return null;const r=Array.isArray(n.designs)?n.designs.slice(0,zx).map(Qo).filter(Boolean):[];return{apartmentId:t,bedrooms:Math.floor(e),bathrooms:Math.floor(i),areaM2:s,furnishing:n.furnishing,designs:r,designId:typeof n.designId=="string"?n.designId:null,editable:n.editable===!0&&!Ar()}}function kx(n){const t=window.location.origin,e=i=>{if(!(!!window.ReactNativeWebView&&(!i.origin||i.origin==="null"))&&(i.origin!==t||i.source!==window.parent))return;let r=i.data;if(typeof r=="string")try{r=JSON.parse(r)}catch{return}if(!(!r||r.version!==wo))if(r.type==="FLOORPLAN_INIT"){const a=Hu(r.payload);a?n.init(a):Ei("FLOORPLAN_ERROR",{code:"INVALID_CONFIG"})}else r.type==="FLOORPLAN_EXPANDED"?n.expanded?.(!!r.payload?.expanded):r.type==="FLOORPLAN_PAUSE"?n.pause():r.type==="FLOORPLAN_RESUME"?n.resume():r.type==="FLOORPLAN_RESET"&&n.reset()};return window.addEventListener("message",e),document.addEventListener("message",e),()=>{window.removeEventListener("message",e),document.removeEventListener("message",e)}}function Gx(n,t){const e=(s,r)=>n.has(s)?Number(n.get(s)):r,i=["bare","partial","full"].includes(n.get("furnishing"))?n.get("furnishing"):"full";return Hu({apartmentId:n.get("id")??"demo",bedrooms:e("bedrooms",2),bathrooms:e("bathrooms",1),areaM2:e("area",70),furnishing:i,designs:t,designId:n.get("design")})}const Hx=n=>{const t=Math.floor(n),e=Math.round((n-t)*60);return`${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`};function Vx(n){n.innerHTML=`
    <div class="brand">
      <span class="brand__mark">${ye("cube",18,2)}</span>
      <div class="brand__text"><b id="brand-title"></b><small id="brand-sub"></small></div>
    </div>

    <div class="search">
      <span class="search__icon">${ye("search",16)}</span>
      <input id="q" type="search" placeholder="Tìm phòng, sofa, giường..." autocomplete="off" aria-label="Tìm trong căn hộ" />
      <ul class="search__menu card" role="listbox" hidden></ul>
    </div>

    <div class="designwrap" id="design-wrap" hidden>
      <button class="iconbtn" id="design-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Chọn thiết kế">
        <span class="swatches" id="design-swatch"></span><span id="design-name"></span>
      </button>
      <ul class="designpop card" id="design-pop" role="listbox" hidden></ul>
    </div>

    <div class="sunwrap">
      <button class="iconbtn" id="sun-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Giờ trong ngày">
        ${ye("sun",18)}<span id="hour-text"></span>
      </button>
      <div class="sunpop card" id="sun-pop" hidden>
        <label for="hour">Giờ trong ngày</label>
        <input id="hour" type="range" min="6" max="18" step="0.25" />
        <button class="chipbtn" id="play" type="button"></button>
      </div>
    </div>

    <button class="iconbtn" id="edit-btn" type="button" aria-pressed="false" hidden></button>
    <button class="iconbtn" id="fs-btn" type="button" hidden></button>

    <div class="seg" role="tablist" aria-label="Chế độ xem">
      <button role="tab" data-mode="overview" type="button">${ye("cube",15)}<span>Tổng quan</span></button>
      <button role="tab" data-mode="walk" type="button">${ye("walk",15)}<span>Đi vào</span></button>
    </div>`;const t=n.querySelector("#q"),e=n.querySelector(".search__menu"),i=n.querySelector("#hour"),s=n.querySelector("#sun-pop"),r=n.querySelector("#sun-btn"),a=n.querySelector("#play");function o(){const m=J.state.searchQuery,S=Nx(m);e.hidden=!m.trim(),e.innerHTML=S.length?S.map(C=>`
        <li><button type="button" data-type="${C.type}" data-id="${de(C.id)}">
          <span class="res__ico">${ye(C.type==="room"?"home":"pin",15)}</span>
          <span class="res__txt"><b>${de(C.title)}</b><small>${de(C.sub)}</small></span>
        </button></li>`).join(""):'<li class="res__empty">Không tìm thấy</li>'}t.addEventListener("input",()=>{J.set({searchQuery:t.value}),o()}),t.addEventListener("focus",o),t.addEventListener("keydown",m=>{m.key==="Escape"&&(t.value="",J.set({searchQuery:""}),e.hidden=!0,t.blur()),m.key==="Enter"&&e.querySelector("button")?.click()}),e.addEventListener("click",m=>{const S=m.target.closest("button[data-id]");if(!S)return;const C={type:S.dataset.type,id:S.dataset.id};t.value="",J.set({searchQuery:""}),e.hidden=!0,t.blur(),C.type==="room"&&se.emit("room:go",{id:C.id}),J.select(C),C.type==="item"&&se.emit("camera:locate",C)}),document.addEventListener("pointerdown",m=>{n.querySelector(".search").contains(m.target)||(e.hidden=!0),n.querySelector(".sunwrap").contains(m.target)||n.querySelector("#design-wrap").contains(m.target)||J.set({menu:null})}),r.addEventListener("click",()=>J.set({menu:J.state.menu==="sun"?null:"sun"})),i.addEventListener("input",()=>J.set({hour:Number(i.value),playing:!1})),a.addEventListener("click",()=>J.set({playing:!J.state.playing})),n.querySelector(".seg").addEventListener("click",m=>{const S=m.target.closest("[data-mode]");S&&S.dataset.mode!==J.state.mode&&J.set({mode:S.dataset.mode})});const c=n.querySelector("#fs-btn"),l=!!(document.fullscreenEnabled||document.webkitFullscreenEnabled),h=Gu()&&!Ar();let p=!1;function u(){c.innerHTML=ye(p?"shrink":"expand",18);const m=p?"Thoát toàn màn hình":"Toàn màn hình";c.setAttribute("aria-label",m),c.title=m}c.hidden=Ar()||!(l||h),c.addEventListener("click",()=>{if(l){const m=document.documentElement.requestFullscreen??document.documentElement.webkitRequestFullscreen,S=document.exitFullscreen??document.webkitExitFullscreen;document.fullscreenElement??document.webkitFullscreenElement?S.call(document):m.call(document.documentElement)}else Ei("FLOORPLAN_EXPAND_TOGGLE")});const _=()=>{p=!!(document.fullscreenElement??document.webkitFullscreenElement),u()};document.addEventListener("fullscreenchange",_),document.addEventListener("webkitfullscreenchange",_),se.on("host:expanded",({expanded:m})=>{p=m,u()}),u();const g=n.querySelector("#edit-btn");g.addEventListener("click",()=>J.set({editing:!J.state.editing}));function x(m){g.hidden=!(m.editable&&m.mode==="overview"),g.setAttribute("aria-pressed",String(m.editing)),g.classList.toggle("active",m.editing);const S=m.editing?"Xong chỉnh sửa":"Chỉnh bố cục";g.innerHTML=`${ye("pencil",18)}<span>${S}</span>`,g.setAttribute("aria-label",S),g.title=S}const f=n.querySelector("#design-wrap"),d=n.querySelector("#design-btn"),M=n.querySelector("#design-pop");let w="";function T(m){const S=ku(m);return[S.floor,S.wall,S.sofa,S.accent].map(C=>`<i style="background:#${C.toString(16).padStart(6,"0")}"></i>`).join("")}function P(m){const{designs:S,designId:C}=m;f.hidden=S.length<2;const R=S.find(G=>G.id===C)??S[0];n.querySelector("#design-name").textContent=R?.name??"",n.querySelector("#design-swatch").innerHTML=R?T(R):"",d.setAttribute("aria-expanded",String(m.menu==="designs")),M.hidden=m.menu!=="designs";const I=S.map(G=>G.id+G.name).join("|")+"#"+C;I!==w&&(w=I,M.innerHTML=S.map(G=>`<li><button type="button" role="option" data-design="${de(G.id)}" aria-selected="${G.id===C}" class="${G.id===C?"active":""}">
          <span class="swatches">${T(G)}</span>
          <span class="res__txt"><b>${de(G.name)}</b><small>${de(G.description||ns[G.theme]?.label||"")}</small></span>
        </button></li>`).join(""))}d.addEventListener("click",()=>J.set({menu:J.state.menu==="designs"?null:"designs"})),M.addEventListener("click",m=>{const S=m.target.closest("[data-design]");S&&(J.set({menu:null}),se.emit("design:select",{id:S.dataset.design}))});function A(){n.querySelector("#brand-title").textContent=It.bedrooms===0?"Căn hộ studio":`Căn hộ ${It.bedrooms} phòng ngủ`,n.querySelector("#brand-sub").textContent=`${It.area.toFixed(0)} m² · Bố cục minh hoạ`}se.on("plan:loaded",A),A();function y(m){P(m),x(m);for(const S of n.querySelectorAll("[data-mode]")){const C=S.dataset.mode===m.mode;S.classList.toggle("active",C),S.setAttribute("aria-selected",String(C))}n.querySelector("#hour-text").textContent=Hx(m.hour),document.activeElement!==i&&(i.value=String(m.hour)),s.hidden=m.menu!=="sun",r.setAttribute("aria-expanded",String(m.menu==="sun")),a.innerHTML=`${ye(m.playing?"pause":"play",14)}<span>${m.playing?"Dừng":"Tua ngày"}</span>`}J.subscribe(m=>y(m)),y(J.state)}function Wx(n){n.innerHTML=`
    <div class="card rooms" data-inset="rooms">
      <button type="button" class="rooms__title" aria-expanded="true" aria-controls="rooms-list">Các phòng <span aria-hidden="true">▾</span></button>
      <ul class="rooms__list" id="rooms-list" role="list"></ul>
    </div>`;const t=n.querySelector(".rooms__list");function e(){t.innerHTML=_e.list("room").map(a=>`
          <li><button type="button" class="room" data-room="${de(a.id)}">
            <span class="room__row"><b>${de(a.name)}</b><span>${a.area.toFixed(0)} m²</span></span>
            <small>${de(a.note)}</small>
          </button></li>`).join(""),r(J.state)}const i=n.querySelector(".rooms"),s=n.querySelector(".rooms__title");s.addEventListener("click",()=>{const a=i.classList.toggle("is-collapsed");s.setAttribute("aria-expanded",String(!a))}),n.addEventListener("click",a=>{const o=a.target.closest("[data-room]");o&&(J.set({selection:null}),se.emit("room:go",{id:o.dataset.room}))});function r(a){for(const o of n.querySelectorAll("[data-room]")){const c=o.dataset.room===a.roomId;o.classList.toggle("active",c),c&&window.matchMedia("(max-width: 899px)").matches&&o.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"})}}J.subscribe((a,o,c)=>c.includes("roomId")&&r(a)),se.on("plan:loaded",e),e()}const Xc=(n,t)=>t?`<div class="kv"><dt>${n}</dt><dd>${de(t)}</dd></div>`:"";function Xx(n){const t=_e.room(n.roomId);return`
    <header class="detail__head">
      <div>
        <span class="tag">${de(n.category)}</span>
        <h2>${de(n.name)}</h2>
        ${t?`<button type="button" class="link" data-go-room="${de(t.id)}">${ye("pin",13)} ${de(t.name)}</button>`:""}
      </div>
      <button type="button" class="iconbtn" data-close aria-label="Đóng">${ye("close",18)}</button>
    </header>
    <dl class="kvs">
      ${Xc("Kích thước",Fx(n.dims))}
      ${Xc("Chất liệu",n.material)}
    </dl>
    ${n.note?`<p class="detail__note">${de(n.note)}</p>`:""}
    <div class="detail__actions">
      <button type="button" class="btn btn--primary" data-locate>${ye("eye",16)} Xem gần</button>
    </div>`}function qx(n){const t=_e.itemsIn(n.id);return`
    <header class="detail__head">
      <div>
        <span class="tag">Phòng</span>
        <h2>${de(n.name)}</h2>
        <small class="muted">${n.area.toFixed(0)} m² · ${t.length} món nội thất</small>
      </div>
      <button type="button" class="iconbtn" data-close aria-label="Đóng">${ye("close",18)}</button>
    </header>
    <p class="detail__note">${de(n.note)}</p>
    <ul class="chips" role="list">
      ${t.map(e=>`<li><button type="button" class="chip" data-item="${de(e.id)}">${de(e.name)}</button></li>`).join("")}
    </ul>
    <div class="detail__actions">
      <button type="button" class="btn btn--primary" data-go-room="${de(n.id)}">${ye("eye",16)} Đến phòng này</button>
    </div>`}function Yx(n){n.innerHTML='<aside class="card detail" data-inset="detail" hidden aria-live="polite"></aside>';const t=n.firstElementChild;t.addEventListener("click",i=>{if(i.target.closest("[data-close]"))return J.select(null);const s=i.target.closest("[data-go-room]");if(s)return se.emit("room:go",{id:s.dataset.goRoom});const r=i.target.closest("[data-item]");if(r){const a={type:"item",id:r.dataset.item};return J.select(a),se.emit("camera:locate",a)}i.target.closest("[data-locate]")&&J.state.selection&&se.emit("camera:locate",J.state.selection)});function e(i){const s=i.selection,r=s&&_e.get(s.type,s.id);if(!r){t.hidden=!0,t.innerHTML="";return}t.innerHTML=r.type==="room"?qx(r):Xx(r),t.hidden=!1}J.subscribe((i,s,r)=>r.includes("selection")&&e(i)),e(J.state)}const $x=[[{cmd:"zoomIn",icon:"plus",label:"Phóng to"},{cmd:"zoomOut",icon:"minus",label:"Thu nhỏ"}],[{cmd:"rotateLeft",icon:"rotateLeft",label:"Xoay trái"},{cmd:"rotateRight",icon:"rotateRight",label:"Xoay phải"}],[{cmd:"home",icon:"home",label:"Về góc nhìn ban đầu"}]];function jx(n){n.innerHTML=`<nav class="card mapctl" aria-label="Điều khiển camera">${$x.map(t=>t.map(e=>`<button class="mapctl__btn" type="button" data-cmd="${e.cmd}" title="${e.label}" aria-label="${e.label}">${ye(e.icon,17)}</button>`).join("")).join('<span class="mapctl__sep" aria-hidden="true"></span>')}</nav>`,n.addEventListener("click",t=>{const e=t.target.closest("[data-cmd]");e&&se.emit("camera:cmd",{cmd:e.dataset.cmd})})}const _s=46;function Kx(n,t){n.innerHTML=`
    <canvas class="minimap card" width="220" height="154" aria-label="Sơ đồ vị trí"></canvas>
    <div class="joy" aria-hidden="true"><div class="joy__knob"></div></div>
    <p class="toast" role="status" hidden></p>`;const e=n.querySelector(".minimap"),i=e.getContext("2d"),s=n.querySelector(".joy"),r=n.querySelector(".joy__knob"),a=n.querySelector(".toast");let o=null;const c=(x,f)=>{r.style.transform=`translate(${x}px, ${f}px)`};function l(x){const f=s.getBoundingClientRect();let d=x.clientX-(f.left+f.width/2),M=x.clientY-(f.top+f.height/2);const w=Math.hypot(d,M);w>_s&&(d=d/w*_s,M=M/w*_s),c(d,M),t.setAxis(d/_s,M/_s)}s.addEventListener("pointerdown",x=>{o=x.pointerId,s.setPointerCapture(o),l(x)}),s.addEventListener("pointermove",x=>x.pointerId===o&&l(x));const h=x=>{x.pointerId===o&&(o=null,c(0,0),t.setAxis(0,0))};s.addEventListener("pointerup",h),s.addEventListener("pointercancel",h);function p(){const{width:x,height:f}=e,d=12,M=Math.min((x-d*2)/It.size.w,(f-d*2)/It.size.d),w=(x-It.size.w*M)/2,T=(f-It.size.d*M)/2;i.clearRect(0,0,x,f),i.font="11px system-ui, sans-serif",i.textAlign="center";for(const R of It.rooms){const I=R.id===J.state.roomId;i.fillStyle=I?"#f5e3dc":"#fffdf9",i.strokeStyle="#c9b8ae",i.lineWidth=1.5,i.fillRect(w+R.x0*M,T+R.z0*M,(R.x1-R.x0)*M,(R.z1-R.z0)*M),i.strokeRect(w+R.x0*M,T+R.z0*M,(R.x1-R.x0)*M,(R.z1-R.z0)*M),i.fillStyle="#7a6a61",i.fillText(R.name,w+(R.x0+R.x1)/2*M,T+(R.z0+R.z1)/2*M+4)}const{x:P,z:A,yaw:y}=t.state,m=w+P*M,S=T+A*M,C=Math.atan2(-Math.cos(y),-Math.sin(y));i.fillStyle="rgba(198,90,58,0.25)",i.beginPath(),i.moveTo(m,S),i.arc(m,S,26,C-.6,C+.6),i.closePath(),i.fill(),i.fillStyle="#c65a3a",i.beginPath(),i.arc(m,S,5,0,Math.PI*2),i.fill()}let u=0;function _(x){a.textContent=x,a.hidden=!1,clearTimeout(u),u=setTimeout(()=>{a.hidden=!0},5e3)}function g(x){const f=x.mode==="walk";if(n.hidden=!f,document.body.classList.toggle("walking",f),f){const d=window.matchMedia("(pointer: coarse)").matches;_(d?"Dùng cần bên trái để đi, kéo màn hình để nhìn quanh.":"WASD hoặc phím mũi tên để đi, Shift để chạy, kéo chuột để nhìn quanh.")}}return J.subscribe((x,f,d)=>d.includes("mode")&&g(x)),g(J.state),{draw:p}}const Zx=60;function Jx(){const n=new Map;for(const t of Object.keys(Zi)){const e=To[t];e&&(n.has(e.category)||n.set(e.category,[]),n.get(e.category).push({kind:t,name:e.name}))}return[...n].map(([t,e])=>({category:t,kinds:e}))}function Qx(n){const t=Jx();n.innerHTML=`
    <div class="rail" role="toolbar" aria-label="Công cụ chỉnh bố cục" hidden>
      <div class="drawer" data-drawer="catalog" role="dialog" aria-label="Danh mục đồ nội thất" hidden>
        ${t.map(g=>`<section><h3>${de(g.category)}</h3><div class="drawer__grid">${g.kinds.map(x=>`<button type="button" class="tile" data-add="${de(x.kind)}">${de(x.name)}</button>`).join("")}</div></section>`).join("")}
      </div>
      <div class="drawer" data-drawer="inventory" role="dialog" aria-label="Danh sách đồ trong căn hộ" hidden>
        <ul class="inv" role="list"></ul>
      </div>
      <div class="rail__row">
        <button type="button" class="rbtn" data-panel="catalog" aria-expanded="false">${ye("plus",18)}<span>Thêm đồ</span></button>
        <button type="button" class="rbtn" data-panel="inventory" aria-expanded="false">${ye("list",18)}<span>Danh sách đồ</span></button>
        <span class="rail__ctx" hidden>
          <b class="rail__name"></b>
          <button type="button" class="rbtn rbtn--icon" data-act="rotate" aria-label="Xoay 90 độ" title="Xoay 90°">${ye("rotateRight",18)}</button>
          <button type="button" class="rbtn rbtn--icon" data-act="toggle" aria-label="Ẩn đồ" title="Ẩn / hiện"></button>
          <button type="button" class="rbtn rbtn--icon" data-act="reset" aria-label="Đặt lại vị trí" title="Đặt lại vị trí" hidden>${ye("undo",18)}</button>
          <button type="button" class="rbtn rbtn--icon rbtn--danger" data-act="remove" aria-label="Xoá đồ đã thêm" title="Xoá" hidden>${ye("trash",18)}</button>
        </span>
        <p class="rail__hint">Kéo đồ để dời · kéo nền để dịch khung · chuột phải để xoay</p>
      </div>
    </div>`;const e=n.querySelector(".rail"),i=n.querySelector(".rail__ctx"),s=n.querySelector(".rail__hint"),r=n.querySelector(".rail__name"),a=n.querySelector('[data-act="toggle"]'),o=n.querySelector('[data-act="reset"]'),c=n.querySelector('[data-act="remove"]'),l=n.querySelector(".inv");let h="";const p=()=>{const g=J.state.selection;return g?.type==="item"?_e.get("item",g.id):null};function u(){const g=_e.list("item"),x=g.map(d=>`${d.id}:${d.hidden?1:0}`).join("|");if(x===h)return;h=x;const f=g.filter(d=>d.extra).length;l.innerHTML=g.map(d=>`<li class="inv__row${d.hidden?" is-hidden":""}">
            <button type="button" class="inv__name" data-pick="${de(d.id)}">${de(d.name)}${d.extra?" <small>(thêm)</small>":""}</button>
            <button type="button" class="rbtn rbtn--icon" data-vis="${de(d.id)}" aria-label="${d.hidden?"Hiện":"Ẩn"} ${de(d.name)}">${ye(d.hidden?"eyeOff":"eye",18)}</button>
          </li>`).join("")+`<li class="inv__foot">${g.length} món · ${f}/${Zx} đồ thêm</li>`}function _(g){const x=g.editing&&g.editable&&g.mode==="overview";if(e.hidden=!x,!x)return;const f=p();i.hidden=!f,s.hidden=!!f,f&&(r.textContent=f.name,a.innerHTML=ye(f.hidden?"eyeOff":"eye",18),a.setAttribute("aria-label",f.hidden?`Hiện ${f.name}`:`Ẩn ${f.name}`),o.hidden=!f.moved,c.hidden=!f.extra);for(const d of n.querySelectorAll("[data-panel]")){const M=g.editPanel===d.dataset.panel;d.setAttribute("aria-expanded",String(M)),d.classList.toggle("active",M)}for(const d of n.querySelectorAll("[data-drawer]"))d.hidden=d.dataset.drawer!==g.editPanel;g.editPanel==="inventory"&&u()}n.addEventListener("click",g=>{const x=g.target.closest("[data-panel]");if(x){J.set({editPanel:J.state.editPanel===x.dataset.panel?null:x.dataset.panel});return}const f=g.target.closest("[data-add]");if(f)return se.emit("edit:add",{kind:f.dataset.add});const d=g.target.closest("[data-pick]");if(d){const P={type:"item",id:d.dataset.pick};return J.select(P),se.emit("camera:locate",P)}const M=g.target.closest("[data-vis]");if(M)return h="",se.emit("edit:toggle",{id:M.dataset.vis});const w=g.target.closest("[data-act]"),T=p();w&&T&&se.emit(`edit:${w.dataset.act}`,{id:T.id})}),n.addEventListener("keydown",g=>{g.key==="Escape"&&J.state.editPanel&&J.set({editPanel:null})}),J.subscribe((g,x,f)=>{["editing","editable","mode","selection","editPanel"].some(d=>f.includes(d))&&_(g)}),se.on("plan:loaded",()=>{h="",_(J.state)}),_(J.state)}const tv=[["header","ui-topbar"],["nav","ui-rooms"],["div","ui-detail"],["div","ui-mapctl"],["div","ui-hud"],["div","ui-edit"]];function ev(n,{app:t,walker:e}){const i={};for(const[c,l]of tv){const h=document.createElement(c);h.id=l,h.className="region",n.append(h),i[l]=h}Vx(i["ui-topbar"]),Wx(i["ui-rooms"]),Yx(i["ui-detail"]),jx(i["ui-mapctl"]);const s=Kx(i["ui-hud"],e);Qx(i["ui-edit"]);let r=0;function a(){r=0;const c=window.innerWidth,l=window.innerHeight,h={left:0,right:0,top:0,bottom:0},p=c>=900,u=i["ui-topbar"].getBoundingClientRect();h.top=Math.max(0,u.bottom);const _=n.querySelector('[data-inset="rooms"]')?.getBoundingClientRect();_&&_.width&&(p?h.left=_.right:h.bottom=Math.max(h.bottom,l-_.top));const g=n.querySelector('[data-inset="detail"]');if(g&&!g.hidden){const x=g.getBoundingClientRect();p?h.right=c-x.left:h.bottom=Math.max(h.bottom,l-x.top)}t.setInsets(h)}const o=()=>{r||(r=requestAnimationFrame(a))};return window.addEventListener("resize",o),J.subscribe((c,l,h)=>{(h.includes("selection")||h.includes("mode"))&&(o(),setTimeout(o,320))}),o(),setTimeout(o,400),{hud:s,els:i}}const ut=Math.PI,ee=(n,t,e)=>({c:n,w:t,type:"window",...e?{sill:e}:{}}),ln=(n,t=.9)=>({c:n,w:t,type:"door"}),Nr=(n,t=1)=>({c:n,w:t,type:"door",entrance:!0}),Fr=(n,t)=>({c:n,w:t,type:"open"}),K=(n,t,e,i=0,s,r)=>({kind:n,x:t,z:e,rot:i,...s?{args:s}:{},...r?{name:r}:{}}),Xe=(n,t,e,i,s)=>({dir:n,at:t,from:e,to:i,t:s_,openings:s}),Be=(n,t,e,i,s=[])=>({dir:n,at:t,from:e,to:i,t:r_,openings:s}),nv={id:"studio",bedrooms:0,bathrooms:1,size:{w:7,d:5.5},rooms:[{id:"living",name:"Phòng ở & ngủ",x0:0,x1:7,z0:0,z1:3.5,floor:"wood",stand:{x:3.4,z:.7,yaw:ut},note:"Khu ngủ và tiếp khách chung một không gian"},{id:"kitchen",name:"Bếp",x0:0,x1:4,z0:3.5,z1:5.5,floor:"tile",stand:{x:2.2,z:4.3,yaw:ut/2+.5},note:"Bếp một dãy, lối vào căn hộ"},{id:"bath",name:"Vệ sinh",x0:4,x1:7,z0:3.5,z1:5.5,floor:"tile",stand:{x:5.5,z:4,yaw:ut},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[Xe("x",0,0,7,[ee(2.2,2.4)]),Xe("x",5.5,0,7,[ee(5.5,.6,1.5)]),Xe("z",0,0,5.5,[ee(1.75,1.6),Nr(4.5)]),Xe("z",7,0,5.5,[ee(1.75,1.6)]),Be("x",3.5,0,7,[Fr(1.3,2),ln(5.5)]),Be("z",4,3.5,5.5)],placements:[K("rug",3.05,2,0,[2.6,1.8]),K("sofa",3.05,1.5,0,[2.2]),K("coffeeTable",3.05,2.5),K("tvUnit",3.05,3.24,ut,[1.2]),K("bed",5.6,1.17,0),K("nightstand",4.4,.35,0),K("wardrobe",6.64,2.8,-ut/2,[1.2,2.3]),K("plant",.5,.5,0,[1]),K("floorLamp",.5,3),K("kitchenRun",1.9,5.1,ut,[2.6]),K("fridge",3.55,5.06,ut),K("shower",6.4,5,0),K("toilet",4.8,5.08,ut),K("vanity",4.33,4.2,ut/2)]},iv={id:"1pn",bedrooms:1,bathrooms:1,size:{w:8,d:6.5},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:5,z0:0,z1:4,floor:"wood",stand:{x:3.4,z:.7,yaw:ut},note:"Sofa, TV, cửa sổ đón sáng"},{id:"kitchen",name:"Bếp & ăn",x0:5,x1:8,z0:0,z1:3,floor:"tile",stand:{x:5.8,z:.9,yaw:-ut/2-.4},note:"Bếp chữ I, bàn ăn 4 chỗ"},{id:"study",name:"Góc làm việc",x0:5,x1:8,z0:3,z1:6.5,floor:"wood",stand:{x:5.7,z:3.6,yaw:-ut/2+.3},note:"Bàn làm việc, tủ sách"},{id:"bed1",name:"Phòng ngủ",x0:0,x1:3.4,z0:4,z1:6.5,floor:"wood",stand:{x:2.6,z:4.5,yaw:ut/2+.3},note:"Giường đôi, tủ áo"},{id:"bath",name:"Vệ sinh",x0:3.4,x1:5,z0:4,z1:6.5,floor:"tile",stand:{x:4.2,z:4.6,yaw:ut},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[Xe("x",0,0,8,[ee(1.6,2.2),Nr(4.2),ee(6.5,1.6)]),Xe("x",6.5,0,8,[ee(1.7,1.4),ee(4.2,.6,1.5),ee(6.5,1.8)]),Xe("z",0,0,6.5,[ee(2,1.8),ee(5.25,1.4)]),Xe("z",8,0,6.5,[ee(1.5,1.2),ee(4.75,1.6)]),Be("z",5,0,6.5,[Fr(1.5,2),ln(3.5)]),Be("x",3,5,8),Be("x",4,0,5,[ln(1.7),ln(3.95)]),Be("z",3.4,4,6.5)],placements:[K("rug",2.8,2.7,0,[3,2]),K("sofa",2.8,1.6,0,[2.2]),K("coffeeTable",2.8,2.8),K("tvUnit",2.8,3.74,ut,[1.2]),K("armchair",.9,2.75,ut/2),K("plant",.4,3.7,0,[1.1]),K("floorLamp",4.55,3.1),K("console",1.5,.28,0,[1]),K("plant",.45,.45,0,[.8],"Cây lối vào"),K("kitchenRun",6.2,2.64,ut,[1.9]),K("fridge",7.55,2.58,ut),K("diningTable",6.8,1),K("chair",6.35,.4,0),K("chair",7.25,.4,0),K("chair",6.35,1.6,ut),K("chair",7.25,1.6,ut),K("rug",1.7,5.5,ut/2,[2.2,1.6,"beige"]),K("bed",1.17,5.5,ut/2),K("nightstand",.33,4.42,ut/2),K("wardrobe",3.04,5.5,-ut/2,[1.4,2.3]),K("toilet",3.8,6.09,ut),K("shower",4.47,5.6,0),K("vanity",4.66,4.6,-ut/2),K("desk",7.6,4.75,-ut/2),K("chair",7.1,4.75,ut/2,void 0,"Ghế làm việc"),K("bookshelf",6.4,6.24,ut,[1.4]),K("plant",5.3,6.1,0,[1])]},sv={id:"2pn",bedrooms:2,bathrooms:1,size:{w:10,d:7},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:6,z0:0,z1:4.5,floor:"wood",stand:{x:3.4,z:.7,yaw:ut},note:"Sofa, TV, cửa sổ đón sáng hướng Nam"},{id:"kitchen",name:"Bếp & ăn",x0:6,x1:10,z0:0,z1:3,floor:"tile",stand:{x:6.8,z:.9,yaw:-ut/2-.4},note:"Bếp chữ I, bàn ăn 4 chỗ"},{id:"bed2",name:"Phòng ngủ 2",x0:6,x1:10,z0:3,z1:7,floor:"wood",stand:{x:6.9,z:3.9,yaw:-ut/2+.2},note:"Giường đôi, tủ áo, bàn làm việc"},{id:"bed1",name:"Phòng ngủ 1",x0:0,x1:4,z0:4.5,z1:7,floor:"wood",stand:{x:2.8,z:5.1,yaw:ut/2+.3},note:"Giường đôi, tủ áo âm tường"},{id:"bath",name:"Vệ sinh",x0:4,x1:6,z0:4.5,z1:7,floor:"tile",stand:{x:5,z:5.2,yaw:ut},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[Xe("x",0,0,10,[ee(2.2,2.4),Nr(5),ee(8,1.6)]),Xe("x",7,0,10,[ee(2,1.4),ee(5,.6,1.5),ee(8,2)]),Xe("z",0,0,7,[ee(2.5,1.8),ee(5.75,1.4)]),Xe("z",10,0,7,[ee(1.5,1.2),ee(5,1.6)]),Be("z",6,0,7,[Fr(1.5,2),ln(3.9)]),Be("x",3,6,10),Be("x",4.5,0,6,[ln(2),ln(5)]),Be("z",4,4.5,7)],placements:[K("rug",3.5,2.7,0,[3,2]),K("sofa",3.5,1.6,0,[2.4]),K("coffeeTable",3.5,2.9),K("ottoman",2.2,2.9),K("tvUnit",3.5,4.24,ut,[1.8]),K("armchair",1,3.3,ut/2),K("plant",.5,4,0,[1.1]),K("floorLamp",5.5,3.3),K("console",3.9,.3,0,[1]),K("plant",5.55,.45,0,[.8],"Cây lối vào"),K("kitchenRun",7.63,2.64,ut,[2.95]),K("fridge",9.5,2.58,ut),K("diningTable",8,1.1),K("chair",7.55,.5,0),K("chair",8.45,.5,0),K("chair",7.55,1.7,ut),K("chair",8.45,1.7,ut),K("rug",1.7,6.05,ut/2,[2.2,1.6,"beige"]),K("bed",1.17,6.05,ut/2),K("nightstand",.33,5,ut/2),K("wardrobe",3.64,5.75,-ut/2,[1.4,2.3]),K("shower",4.55,6.5,0),K("toilet",5.5,6.62,ut),K("vanity",5.69,5.3,-ut/2),K("rug",8,4.4,0,[2.4,1.6,"beige"]),K("bed",8,4.1,0),K("nightstand",6.95,3.35,0),K("nightstand",9.05,3.35,0),K("wardrobe",6.36,6,ut/2,[1.4,2.3]),K("desk",9.6,5,-ut/2),K("chair",9.1,5,ut/2,void 0,"Ghế làm việc"),K("dresser",9.55,6.45,-ut/2)]},rv={id:"3pn",bedrooms:3,bathrooms:2,size:{w:13,d:8},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:7,z0:0,z1:5,floor:"wood",stand:{x:5.8,z:.8,yaw:ut-.5},note:"Phòng khách rộng, kết hợp bàn ăn"},{id:"kitchen",name:"Bếp",x0:7,x1:13,z0:0,z1:3.5,floor:"tile",stand:{x:7.9,z:.9,yaw:-ut/2-.4},note:"Bếp chữ I, bàn ăn"},{id:"hall",name:"Sảnh",x0:7,x1:9,z0:3.5,z1:5.5,floor:"wood",stand:{x:7.6,z:4,yaw:-ut/2},note:"Sảnh trung tâm dẫn tới phòng ngủ chính"},{id:"master",name:"Phòng ngủ chính",x0:9,x1:13,z0:3.5,z1:8,floor:"wood",stand:{x:9.7,z:4.4,yaw:-ut/2-.2},note:"Giường đôi, tủ áo lớn"},{id:"bath2",name:"Vệ sinh chung",x0:7,x1:9,z0:5.5,z1:8,floor:"tile",stand:{x:8,z:6,yaw:ut},note:"Buồng tắm kính, bồn rửa"},{id:"bed2",name:"Phòng ngủ 2",x0:0,x1:3.5,z0:5,z1:8,floor:"wood",stand:{x:2.7,z:5.5,yaw:ut/2+.3},note:"Giường đôi, tủ áo"},{id:"bed3",name:"Phòng ngủ 3",x0:3.5,x1:5.6,z0:5,z1:8,floor:"wood",stand:{x:4.55,z:5.5,yaw:ut},note:"Phòng ngủ nhỏ cho con / khách"},{id:"bath1",name:"Vệ sinh 2",x0:5.6,x1:7,z0:5,z1:8,floor:"tile",stand:{x:6.3,z:5.5,yaw:ut},note:"Vệ sinh gần phòng khách"}],walls:[Xe("x",0,0,13,[ee(2.5,2.6),Nr(5.8),ee(10,2)]),Xe("x",8,0,13,[ee(1.75,1.6),ee(4.5,1.2),ee(6.3,.6,1.5),ee(8,.6,1.5),ee(11.6,1.6)]),Xe("z",0,0,8,[ee(2.5,2),ee(6.5,1.6)]),Xe("z",13,0,8,[ee(1.75,1.4),ee(5.75,1.6)]),Be("z",7,0,8,[Fr(1.75,2.2),ln(4.2)]),Be("x",3.5,7,13),Be("z",9,3.5,8,[ln(4.4)]),Be("x",5.5,7,9,[ln(8)]),Be("x",5,0,7,[ln(1.6),ln(4.55),ln(6.3)]),Be("z",3.5,5,8),Be("z",5.6,5,8)],placements:[K("rug",3.1,3,0,[3,2]),K("sofa",3.1,1.9,0,[2.4]),K("coffeeTable",3.1,3.1),K("ottoman",1.95,3.1),K("tvUnit",3.1,4.74,ut,[1.8]),K("armchair",1,3.6,ut/2),K("armchair",5.3,3.6,-ut/2),K("plant",.5,4.5,0,[1.1]),K("floorLamp",5.9,4.4),K("console",4.3,.3,0,[1]),K("plant",6.6,.5,0,[.8],"Cây lối vào"),K("diningTable",5.2,1.9),K("chair",4.75,1.3,0),K("chair",5.65,1.3,0),K("chair",4.75,2.5,ut),K("chair",5.65,2.5,ut),K("kitchenRun",9.6,3.14,ut,[3.6]),K("fridge",11.85,3.08,ut),K("diningTable",9.8,1.3),K("chair",9.35,.7,0),K("chair",10.25,.7,0),K("chair",9.35,1.9,ut),K("chair",10.25,1.9,ut),K("plant",8.6,3.9,0,[.9]),K("rug",11.9,5.75,-ut/2,[2.4,1.6,"beige"]),K("bed",11.87,5.75,-ut/2),K("nightstand",12.7,4.7,-ut/2),K("nightstand",12.7,6.8,-ut/2),K("wardrobe",9.8,7.65,ut,[1.4,2.3]),K("plant",12.55,7.5,0,[1]),K("dresser",9.35,6.2,ut/2),K("toilet",7.5,7.6,ut),K("shower",8.45,7.45,0),K("vanity",7.33,6.4,ut/2),K("rug",1.8,6.5,ut/2,[2.2,1.6,"beige"]),K("bed",1.17,6.5,ut/2),K("nightstand",.33,5.35,ut/2),K("wardrobe",3.14,6.5,-ut/2,[1.2,2.3]),K("bed",4.55,6.85,ut),K("toilet",5.97,6.4,ut/2),K("vanity",6.67,6.6,-ut/2),K("shower",6.4,7.4,0)]},qc=[nv,iv,sv,rv],av=.9,ov=1.3;function lv(n){const t=Math.max(0,Math.min(3,Math.floor(n)));return qc.find(e=>e.bedrooms===t)??qc[2]}const Ve=(n,t)=>Math.round(n*t*1e3)/1e3;function cv(n,t){return n.map(e=>({...e,at:Ve(e.at,t),from:Ve(e.from,t),to:Ve(e.to,t),openings:e.openings.map(i=>({...i,c:Ve(i.c,t)}))}))}function uv(n,t){return n.map(e=>({...e,x0:Ve(e.x0,t),x1:Ve(e.x1,t),z0:Ve(e.z0,t),z1:Ve(e.z1,t),stand:{...e.stand,x:Ve(e.stand.x,t),z:Ve(e.stand.z,t)}}))}function hv(n,t,{editable:e=!1}={}){const i=lv(n.bedrooms),s=i.rooms.reduce((p,u)=>p+Ur(u),0),r=Math.sqrt(Math.max(1,n.areaM2)/s),a=Math.min(ov,Math.max(av,r)),o=Bc[t?.furnishing??n.furnishing]??Bc.full,c=t?.layout?.items??{},l=new Map,h=[];for(const p of i.placements){const u=To[p.kind];if(!u)continue;const _=(l.get(p.kind)??0)+1;if(l.set(p.kind,_),u.tier>o)continue;const g=`${p.kind}-${_}`,x=c[g],f=!!x?.hidden;f&&!e||h.push({id:g,kind:p.kind,args:p.args,x:Ve(x?.x??p.x,a),z:Ve(x?.z??p.z,a),rot:x?.rot??p.rot,name:p.name??u.name,category:u.category,material:u.material,note:u.note,pick:u.pick!==!1,hidden:f,moved:x!==void 0&&(x.x!==void 0||x.z!==void 0||x.rot!==void 0),extra:!1})}for(const p of t?.layout?.extras??[]){const u=To[p.kind];if(!u||!Object.prototype.hasOwnProperty.call(Zi,p.kind))continue;const _=!!p.hidden;_&&!e||h.push({id:p.id,kind:p.kind,args:Zi[p.kind].length?Zi[p.kind]:void 0,x:Ve(p.x,a),z:Ve(p.z,a),rot:p.rot??0,name:u.name,category:u.category,material:u.material,note:u.note,pick:!0,hidden:_,moved:!1,extra:!0})}return{templateId:i.id,bedrooms:i.bedrooms,size:{w:Ve(i.size.w,a),d:Ve(i.size.d,a)},rooms:uv(i.rooms,a),walls:cv(i.walls,a),placements:h,scale:a}}const $i=new URLSearchParams(location.search),en=i_(document.getElementById("viewport"));Iu({templateId:"",bedrooms:2,size:{w:10,d:7},rooms:[],walls:[],placements:[]});Ou();const Nn=Z_(en),li=tx({camera:en.camera,dom:en.renderer.domElement,colliders:Nn.colliders}),Or=ax(en,Nn,li),tl=cx(en,Nn),el=ev(document.getElementById("ui"),{app:en,walker:li});let As=null,Yn=[],Ao="",hn=un(null);const Yc=n=>JSON.stringify(un(n)),Vu=()=>Yn.find(n=>n.id===J.state.designId)??Yn[0];function Br(){const n=Vu(),t=hv(As,{...n,layout:hn},{editable:J.state.editing});t_(ku(n)),Iu(t),Ou(),Nn.rebuild(),se.emit("plan:loaded"),en.invalidateShadows(),el.hud.draw()}function Wu(n,{keepView:t=!1}={}){const e=Yn.find(s=>s.id===n)??Yn[0];hn=un(e.layout);const i=J.state.mode==="walk";return J.set({designs:Yn,designId:e.id,selection:null,hover:null,roomId:null,menu:null,editPanel:null}),Br(),t||J.set({hour:e.defaultHour}),Nn.setHour(J.state.hour),Or.start({walk:i}),e}function Ro(n,t,e){return JSON.stringify([{...n,designs:void 0},t.map(i=>i.id===e?{...i,layout:void 0}:i)])}function Xu(n){const t=n.designs.length?n.designs:[yx(n.apartmentId)],e=!As,i=e?null:J.state.designId;if(J.set({editable:n.editable}),!n.editable&&J.state.editing&&J.set({editing:!1}),!e&&Ro(n,t,i)===Ao){const o=t.find(c=>c.id===i);o&&Yc(o.layout)!==Yc(hn)&&(Yn=t,hn=un(o.layout),J.set({designs:Yn}),Br());return}As=n,Yn=t;const s=!e&&J.state.designs.some(a=>a.id===J.state.designId),r=Wu(n.designId??(s?J.state.designId:null),{keepView:!e});Ao=Ro(n,t,r.id),e&&dv()}function dv(){const n=Number($i.get("hour"));n>=6&&n<=18&&J.set({hour:n}),Nn.setHour(J.state.hour);const t=$i.get("room"),e=$i.get("mode")==="walk";(e||t)&&Or.start({walk:e,room:t});const i=$i.get("select");i&&_e.get("item",i)&&J.select({type:"item",id:i})}se.on("design:select",({id:n})=>{const t=Wu(n,{keepView:!1});Ao=Ro(As,Yn,t.id),Ei("FLOORPLAN_DESIGN_SELECTED",{designId:t.id})});const fv=Ux(en,Nn,tl,{onMove:(n,t,e)=>os(Ax(hn,n,t,e,It.scale))});function os(n,{select:t}={}){if(!J.state.editable)return;const e=t!==void 0?t:J.state.selection;hn=n,Br(),e?.type==="item"&&_e.get("item",e.id)?J.set({selection:e}):J.set({selection:null}),tl.refresh(),Ei("FLOORPLAN_LAYOUT_CHANGED",{designId:Vu().id,layout:hn})}se.on("edit:rotate",({id:n})=>{const t=It.placements.find(e=>e.id===n);t&&os(Rx(hn,n,t.rot??0))});se.on("edit:toggle",({id:n})=>os(Cx(hn,n)));se.on("edit:reset",({id:n})=>os(Lx(hn,n)));se.on("edit:remove",({id:n})=>{wx(hn,n)&&os(Px(hn,n),{select:null})});se.on("edit:add",({kind:n})=>{const t=_e.room(J.state.roomId)??It.rooms[0],e=t?(t.x0+t.x1)/2:It.size.w/2,i=t?(t.z0+t.z1)/2:It.size.d/2,s=It.placements.map(a=>a.id),r=Dx(hn,n,e,i,It.scale,s);r&&(os(r.layout,{select:{type:"item",id:r.id}}),J.set({editPanel:null}))});J.subscribe((n,t,e)=>{e.includes("mode")&&n.mode==="walk"&&n.editing&&J.set({editing:!1}),e.includes("editing")&&(document.body.classList.toggle("editing",n.editing),fv.setEditing(n.editing),J.set({editPanel:null,selection:null}),As&&Br())});J.subscribe((n,t,e)=>{e.includes("hour")&&Nn.setHour(n.hour),(e.includes("mode")||e.includes("roomId"))&&el.hud.draw(),e.includes("selection")&&n.selection?.type==="room"&&Ei("FLOORPLAN_ROOM_SELECTED",{roomId:n.selection.id})});document.addEventListener("click",n=>{const t=n.target.closest?.(".room-label");t&&(se.emit("room:go",{id:t.dataset.room}),J.select({type:"room",id:t.dataset.room}))});let lr=0;en.onFrame(n=>{if(Nn.update(n),tl.update(n),Or.update(n),J.state.playing&&(lr+=n,lr>.05)){let t=J.state.hour+lr*.75;t>18&&(t=6),lr=0,J.set({hour:Math.round(t*100)/100})}if(J.state.mode==="walk"&&li.update(n)){en.invalidate(),el.hud.draw();const t=_e.list("room").find(e=>li.state.x>=e.x0&&li.state.x<=e.x1&&li.state.z>=e.z0&&li.state.z<=e.z1);t&&t.id!==J.state.roomId&&J.set({roomId:t.id})}});kx({init:Xu,pause:()=>en.pause(),resume:()=>en.resume(),reset:()=>se.emit("camera:cmd",{cmd:"home"}),expanded:n=>se.emit("host:expanded",{expanded:n})});en.start();try{Ei("FLOORPLAN_READY")}catch{Ei("FLOORPLAN_ERROR",{code:"WEBGL_INIT_FAILED"})}if(!Gu()){const n=wr.map(e=>Qo({id:e,name:ns[e].label,theme:e})),t=Gx($i,n);t&&Xu({...t,editable:$i.get("edit")==="1"})}window.__apt={app:en,world:Nn,walker:li,director:Or,store:J};
