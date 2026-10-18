(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const rl="184",Qe={ROTATE:0,DOLLY:1,PAN:2},vn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},rh=0,Zl=1,oh=2,Bs=1,ah=2,Fs=3,Si=0,en=1,Zn=2,Qn=0,hs=1,Jl=2,Ql=3,tc=4,lh=5,Li=100,ch=101,dh=102,uh=103,hh=104,fh=200,ph=201,mh=202,gh=203,aa=204,la=205,_h=206,xh=207,vh=208,Mh=209,Sh=210,bh=211,yh=212,Eh=213,Th=214,ca=0,da=1,ua=2,ps=3,ha=4,fa=5,pa=6,ma=7,ol=0,wh=1,Ah=2,Bn=0,kd=1,Gd=2,Hd=3,Vd=4,Wd=5,Xd=6,al=7,qd=300,Oi=301,ms=302,_o=303,xo=304,so=306,Wr=1e3,Jn=1001,ga=1002,We=1003,Rh=1004,nr=1005,Ye=1006,vo=1007,Ii=1008,pn=1009,$d=1010,Yd=1011,Vs=1012,ll=1013,Gn=1014,wn=1015,ii=1016,cl=1017,dl=1018,Ws=1020,jd=35902,Kd=35899,Zd=1021,Jd=1022,An=1023,si=1026,Ui=1027,ul=1028,hl=1029,zi=1030,fl=1031,pl=1033,Or=33776,zr=33777,Br=33778,kr=33779,_a=35840,xa=35841,va=35842,Ma=35843,Sa=36196,ba=37492,ya=37496,Ea=37488,Ta=37489,Xr=37490,wa=37491,Aa=37808,Ra=37809,Ca=37810,Pa=37811,La=37812,Da=37813,Ia=37814,Ua=37815,Na=37816,Fa=37817,Oa=37818,za=37819,Ba=37820,ka=37821,Ga=36492,Ha=36494,Va=36495,Wa=36283,Xa=36284,qr=36285,qa=36286,Ch=3200,$r=0,Ph=1,_i="",on="srgb",Yr="srgb-linear",jr="linear",le="srgb",Xi=7680,ec=519,Lh=512,Dh=513,Ih=514,ml=515,Uh=516,Nh=517,gl=518,Fh=519,nc=35044,ic="300 es",zn=2e3,Xs=2001;function Oh(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Kr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function zh(){const n=Kr("canvas");return n.style.display="block",n}const sc={};function rc(...n){const t="THREE."+n.shift();console.log(t,...n)}function Qd(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ut(...n){n=Qd(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function ne(...n){n=Qd(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function $a(...n){const t=n.join(" ");t in sc||(sc[t]=!0,Ut(...n))}function Bh(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const kh={[ca]:da,[ua]:pa,[ha]:ma,[ps]:fa,[da]:ca,[pa]:ua,[ma]:ha,[fa]:ps};class Ei{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let oc=1234567;const ks=Math.PI/180,qs=180/Math.PI;function Ss(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(qe[n&255]+qe[n>>8&255]+qe[n>>16&255]+qe[n>>24&255]+"-"+qe[t&255]+qe[t>>8&255]+"-"+qe[t>>16&15|64]+qe[t>>24&255]+"-"+qe[e&63|128]+qe[e>>8&255]+"-"+qe[e>>16&255]+qe[e>>24&255]+qe[i&255]+qe[i>>8&255]+qe[i>>16&255]+qe[i>>24&255]).toLowerCase()}function Yt(n,t,e){return Math.max(t,Math.min(e,n))}function _l(n,t){return(n%t+t)%t}function Gh(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Hh(n,t,e){return n!==t?(e-n)/(t-n):0}function Gs(n,t,e){return(1-e)*n+e*t}function Vh(n,t,e,i){return Gs(n,t,1-Math.exp(-e*i))}function Wh(n,t=1){return t-Math.abs(_l(n,t*2)-t)}function Xh(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function qh(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function $h(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Yh(n,t){return n+Math.random()*(t-n)}function jh(n){return n*(.5-Math.random())}function Kh(n){n!==void 0&&(oc=n);let t=oc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Zh(n){return n*ks}function Jh(n){return n*qs}function Qh(n){return(n&n-1)===0&&n!==0}function tf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function ef(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function nf(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+i)/2),d=o((t+i)/2),f=r((t-i)/2),u=o((t-i)/2),m=r((i-t)/2),p=o((i-t)/2);switch(s){case"XYX":n.set(a*d,c*f,c*u,a*l);break;case"YZY":n.set(c*u,a*d,c*f,a*l);break;case"ZXZ":n.set(c*f,c*u,a*d,a*l);break;case"XZX":n.set(a*d,c*p,c*m,a*l);break;case"YXY":n.set(c*m,a*d,c*p,a*l);break;case"ZYZ":n.set(c*p,c*m,a*d,a*l);break;default:Ut("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ls(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ze(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const an={DEG2RAD:ks,RAD2DEG:qs,generateUUID:Ss,clamp:Yt,euclideanModulo:_l,mapLinear:Gh,inverseLerp:Hh,lerp:Gs,damp:Vh,pingpong:Wh,smoothstep:Xh,smootherstep:qh,randInt:$h,randFloat:Yh,randFloatSpread:jh,seededRandom:Kh,degToRad:Zh,radToDeg:Jh,isPowerOfTwo:Qh,ceilPowerOfTwo:tf,floorPowerOfTwo:ef,setQuaternionFromProperEuler:nf,normalize:Ze,denormalize:ls},zl=class zl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Yt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Yt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};zl.prototype.isVector2=!0;let Ft=zl;class ri{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],d=i[s+2],f=i[s+3],u=r[o+0],m=r[o+1],p=r[o+2],x=r[o+3];if(f!==x||c!==u||l!==m||d!==p){let g=c*u+l*m+d*p+f*x;g<0&&(u=-u,m=-m,p=-p,x=-x,g=-g);let h=1-a;if(g<.9995){const M=Math.acos(g),E=Math.sin(M);h=Math.sin(h*M)/E,a=Math.sin(a*M)/E,c=c*h+u*a,l=l*h+m*a,d=d*h+p*a,f=f*h+x*a}else{c=c*h+u*a,l=l*h+m*a,d=d*h+p*a,f=f*h+x*a;const M=1/Math.sqrt(c*c+l*l+d*d+f*f);c*=M,l*=M,d*=M,f*=M}}t[e]=c,t[e+1]=l,t[e+2]=d,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],d=i[s+3],f=r[o],u=r[o+1],m=r[o+2],p=r[o+3];return t[e]=a*p+d*f+c*m-l*u,t[e+1]=c*p+d*u+l*f-a*m,t[e+2]=l*p+d*m+a*u-c*f,t[e+3]=d*p-a*f-c*u-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),d=a(s/2),f=a(r/2),u=c(i/2),m=c(s/2),p=c(r/2);switch(o){case"XYZ":this._x=u*d*f+l*m*p,this._y=l*m*f-u*d*p,this._z=l*d*p+u*m*f,this._w=l*d*f-u*m*p;break;case"YXZ":this._x=u*d*f+l*m*p,this._y=l*m*f-u*d*p,this._z=l*d*p-u*m*f,this._w=l*d*f+u*m*p;break;case"ZXY":this._x=u*d*f-l*m*p,this._y=l*m*f+u*d*p,this._z=l*d*p+u*m*f,this._w=l*d*f-u*m*p;break;case"ZYX":this._x=u*d*f-l*m*p,this._y=l*m*f+u*d*p,this._z=l*d*p-u*m*f,this._w=l*d*f+u*m*p;break;case"YZX":this._x=u*d*f+l*m*p,this._y=l*m*f+u*d*p,this._z=l*d*p-u*m*f,this._w=l*d*f-u*m*p;break;case"XZY":this._x=u*d*f-l*m*p,this._y=l*m*f-u*d*p,this._z=l*d*p+u*m*f,this._w=l*d*f+u*m*p;break;default:Ut("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],d=e[6],f=e[10],u=i+a+f;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(d-c)*m,this._y=(r-l)*m,this._z=(o-s)*m}else if(i>a&&i>f){const m=2*Math.sqrt(1+i-a-f);this._w=(d-c)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+l)/m}else if(a>f){const m=2*Math.sqrt(1+a-i-f);this._w=(r-l)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(c+d)/m}else{const m=2*Math.sqrt(1+f-i-a);this._w=(o-s)/m,this._x=(r+l)/m,this._y=(c+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,d=e._w;return this._x=i*d+o*a+s*l-r*c,this._y=s*d+o*c+r*a-i*l,this._z=r*d+o*l+i*c-s*a,this._w=o*d-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),d=Math.sin(l);c=Math.sin(c*l)/d,e=Math.sin(e*l)/d,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Bl=class Bl{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ac.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ac.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),d=2*(a*e-r*s),f=2*(r*i-o*e);return this.x=e+c*l+o*f-a*d,this.y=i+c*d+a*l-r*f,this.z=s+c*f+r*d-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Yt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Mo.copy(this).projectOnVector(t),this.sub(Mo)}reflect(t){return this.sub(Mo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Yt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Bl.prototype.isVector3=!0;let N=Bl;const Mo=new N,ac=new ri,kl=class kl{constructor(t,e,i,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){const d=this.elements;return d[0]=t,d[1]=s,d[2]=a,d[3]=e,d[4]=r,d[5]=c,d[6]=i,d[7]=o,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],d=i[4],f=i[7],u=i[2],m=i[5],p=i[8],x=s[0],g=s[3],h=s[6],M=s[1],E=s[4],w=s[7],D=s[2],P=s[5],y=s[8];return r[0]=o*x+a*M+c*D,r[3]=o*g+a*E+c*P,r[6]=o*h+a*w+c*y,r[1]=l*x+d*M+f*D,r[4]=l*g+d*E+f*P,r[7]=l*h+d*w+f*y,r[2]=u*x+m*M+p*D,r[5]=u*g+m*E+p*P,r[8]=u*h+m*w+p*y,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8];return e*o*d-e*a*l-i*r*d+i*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],f=d*o-a*l,u=a*c-d*r,m=l*r-o*c,p=e*f+i*u+s*m;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/p;return t[0]=f*x,t[1]=(s*l-d*i)*x,t[2]=(a*i-s*o)*x,t[3]=u*x,t[4]=(d*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=m*x,t[7]=(i*c-l*e)*x,t[8]=(o*e-i*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(So.makeScale(t,e)),this}rotate(t){return this.premultiply(So.makeRotation(-t)),this}translate(t,e){return this.premultiply(So.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};kl.prototype.isMatrix3=!0;let Gt=kl;const So=new Gt,lc=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cc=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sf(){const n={enabled:!0,workingColorSpace:Yr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===le&&(s.r=ti(s.r),s.g=ti(s.g),s.b=ti(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===le&&(s.r=fs(s.r),s.g=fs(s.g),s.b=fs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===_i?jr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return $a("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return $a("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Yr]:{primaries:t,whitePoint:i,transfer:jr,toXYZ:lc,fromXYZ:cc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:on},outputColorSpaceConfig:{drawingBufferColorSpace:on}},[on]:{primaries:t,whitePoint:i,transfer:le,toXYZ:lc,fromXYZ:cc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:on}}}),n}const ee=sf();function ti(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function fs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let qi;class rf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{qi===void 0&&(qi=Kr("canvas")),qi.width=t.width,qi.height=t.height;const s=qi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=qi}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Kr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ti(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ti(e[i]/255)*255):e[i]=ti(e[i]);return{data:e,width:t.width,height:t.height}}else return Ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let of=0;class xl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=Ss(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(bo(s[o].image)):r.push(bo(s[o]))}else r=bo(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function bo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?rf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ut("Texture: Unable to serialize Texture."),{})}let af=0;const yo=new N;class Ke extends Ei{constructor(t=Ke.DEFAULT_IMAGE,e=Ke.DEFAULT_MAPPING,i=Jn,s=Jn,r=Ye,o=Ii,a=An,c=pn,l=Ke.DEFAULT_ANISOTROPY,d=_i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:af++}),this.uuid=Ss(),this.name="",this.source=new xl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ft(0,0),this.repeat=new Ft(1,1),this.center=new Ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(yo).x}get height(){return this.source.getSize(yo).y}get depth(){return this.source.getSize(yo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Ut(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ut(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==qd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wr:t.x=t.x-Math.floor(t.x);break;case Jn:t.x=t.x<0?0:1;break;case ga:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wr:t.y=t.y-Math.floor(t.y);break;case Jn:t.y=t.y<0?0:1;break;case ga:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ke.DEFAULT_IMAGE=null;Ke.DEFAULT_MAPPING=qd;Ke.DEFAULT_ANISOTROPY=1;const Gl=class Gl{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],d=c[4],f=c[8],u=c[1],m=c[5],p=c[9],x=c[2],g=c[6],h=c[10];if(Math.abs(d-u)<.01&&Math.abs(f-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(f+x)<.1&&Math.abs(p+g)<.1&&Math.abs(l+m+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,w=(m+1)/2,D=(h+1)/2,P=(d+u)/4,y=(f+x)/4,_=(p+g)/4;return E>w&&E>D?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=P/i,r=y/i):w>D?w<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),i=P/s,r=_/s):D<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),i=y/r,s=_/r),this.set(i,s,r,e),this}let M=Math.sqrt((g-p)*(g-p)+(f-x)*(f-x)+(u-d)*(u-d));return Math.abs(M)<.001&&(M=1),this.x=(g-p)/M,this.y=(f-x)/M,this.z=(u-d)/M,this.w=Math.acos((l+m+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this.w=Yt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this.w=Yt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Yt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Gl.prototype.isVector4=!0;let Re=Gl;class lf extends Ei{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ye,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Re(0,0,t,e),this.scissorTest=!1,this.viewport=new Re(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new Ke(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Ye,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new xl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class kn extends lf{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class tu extends Ke{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class cf extends Ke{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const io=class io{constructor(t,e,i,s,r,o,a,c,l,d,f,u,m,p,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,d,f,u,m,p,x,g)}set(t,e,i,s,r,o,a,c,l,d,f,u,m,p,x,g){const h=this.elements;return h[0]=t,h[4]=e,h[8]=i,h[12]=s,h[1]=r,h[5]=o,h[9]=a,h[13]=c,h[2]=l,h[6]=d,h[10]=f,h[14]=u,h[3]=m,h[7]=p,h[11]=x,h[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new io().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,i=t.elements,s=1/$i.setFromMatrixColumn(t,0).length(),r=1/$i.setFromMatrixColumn(t,1).length(),o=1/$i.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const u=o*d,m=o*f,p=a*d,x=a*f;e[0]=c*d,e[4]=-c*f,e[8]=l,e[1]=m+p*l,e[5]=u-x*l,e[9]=-a*c,e[2]=x-u*l,e[6]=p+m*l,e[10]=o*c}else if(t.order==="YXZ"){const u=c*d,m=c*f,p=l*d,x=l*f;e[0]=u+x*a,e[4]=p*a-m,e[8]=o*l,e[1]=o*f,e[5]=o*d,e[9]=-a,e[2]=m*a-p,e[6]=x+u*a,e[10]=o*c}else if(t.order==="ZXY"){const u=c*d,m=c*f,p=l*d,x=l*f;e[0]=u-x*a,e[4]=-o*f,e[8]=p+m*a,e[1]=m+p*a,e[5]=o*d,e[9]=x-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const u=o*d,m=o*f,p=a*d,x=a*f;e[0]=c*d,e[4]=p*l-m,e[8]=u*l+x,e[1]=c*f,e[5]=x*l+u,e[9]=m*l-p,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const u=o*c,m=o*l,p=a*c,x=a*l;e[0]=c*d,e[4]=x-u*f,e[8]=p*f+m,e[1]=f,e[5]=o*d,e[9]=-a*d,e[2]=-l*d,e[6]=m*f+p,e[10]=u-x*f}else if(t.order==="XZY"){const u=o*c,m=o*l,p=a*c,x=a*l;e[0]=c*d,e[4]=-f,e[8]=l*d,e[1]=u*f+x,e[5]=o*d,e[9]=m*f-p,e[2]=p*f-m,e[6]=a*d,e[10]=x*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(df,t,uf)}lookAt(t,e,i){const s=this.elements;return dn.subVectors(t,e),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),ui.crossVectors(i,dn),ui.lengthSq()===0&&(Math.abs(i.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),ui.crossVectors(i,dn)),ui.normalize(),ir.crossVectors(dn,ui),s[0]=ui.x,s[4]=ir.x,s[8]=dn.x,s[1]=ui.y,s[5]=ir.y,s[9]=dn.y,s[2]=ui.z,s[6]=ir.z,s[10]=dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],d=i[1],f=i[5],u=i[9],m=i[13],p=i[2],x=i[6],g=i[10],h=i[14],M=i[3],E=i[7],w=i[11],D=i[15],P=s[0],y=s[4],_=s[8],S=s[12],A=s[1],R=s[5],C=s[9],L=s[13],V=s[2],I=s[6],B=s[10],z=s[14],K=s[3],nt=s[7],ft=s[11],Et=s[15];return r[0]=o*P+a*A+c*V+l*K,r[4]=o*y+a*R+c*I+l*nt,r[8]=o*_+a*C+c*B+l*ft,r[12]=o*S+a*L+c*z+l*Et,r[1]=d*P+f*A+u*V+m*K,r[5]=d*y+f*R+u*I+m*nt,r[9]=d*_+f*C+u*B+m*ft,r[13]=d*S+f*L+u*z+m*Et,r[2]=p*P+x*A+g*V+h*K,r[6]=p*y+x*R+g*I+h*nt,r[10]=p*_+x*C+g*B+h*ft,r[14]=p*S+x*L+g*z+h*Et,r[3]=M*P+E*A+w*V+D*K,r[7]=M*y+E*R+w*I+D*nt,r[11]=M*_+E*C+w*B+D*ft,r[15]=M*S+E*L+w*z+D*Et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],d=t[2],f=t[6],u=t[10],m=t[14],p=t[3],x=t[7],g=t[11],h=t[15],M=c*m-l*u,E=a*m-l*f,w=a*u-c*f,D=o*m-l*d,P=o*u-c*d,y=o*f-a*d;return e*(x*M-g*E+h*w)-i*(p*M-g*D+h*P)+s*(p*E-x*D+h*y)-r*(p*w-x*P+g*y)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],f=t[9],u=t[10],m=t[11],p=t[12],x=t[13],g=t[14],h=t[15],M=e*a-i*o,E=e*c-s*o,w=e*l-r*o,D=i*c-s*a,P=i*l-r*a,y=s*l-r*c,_=d*x-f*p,S=d*g-u*p,A=d*h-m*p,R=f*g-u*x,C=f*h-m*x,L=u*h-m*g,V=M*L-E*C+w*R+D*A-P*S+y*_;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/V;return t[0]=(a*L-c*C+l*R)*I,t[1]=(s*C-i*L-r*R)*I,t[2]=(x*y-g*P+h*D)*I,t[3]=(u*P-f*y-m*D)*I,t[4]=(c*A-o*L-l*S)*I,t[5]=(e*L-s*A+r*S)*I,t[6]=(g*w-p*y-h*E)*I,t[7]=(d*y-u*w+m*E)*I,t[8]=(o*C-a*A+l*_)*I,t[9]=(i*A-e*C-r*_)*I,t[10]=(p*P-x*w+h*M)*I,t[11]=(f*w-d*P-m*M)*I,t[12]=(a*S-o*R-c*_)*I,t[13]=(e*R-i*S+s*_)*I,t[14]=(x*E-p*D-g*M)*I,t[15]=(d*D-f*E+u*M)*I,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,d=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,d*a+i,d*c-s*o,0,l*c-s*a,d*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,d=o+o,f=a+a,u=r*l,m=r*d,p=r*f,x=o*d,g=o*f,h=a*f,M=c*l,E=c*d,w=c*f,D=i.x,P=i.y,y=i.z;return s[0]=(1-(x+h))*D,s[1]=(m+w)*D,s[2]=(p-E)*D,s[3]=0,s[4]=(m-w)*P,s[5]=(1-(u+h))*P,s[6]=(g+M)*P,s[7]=0,s[8]=(p+E)*y,s[9]=(g-M)*y,s[10]=(1-(u+x))*y,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),e.identity(),this;let o=$i.set(s[0],s[1],s[2]).length();const a=$i.set(s[4],s[5],s[6]).length(),c=$i.set(s[8],s[9],s[10]).length();r<0&&(o=-o),bn.copy(this);const l=1/o,d=1/a,f=1/c;return bn.elements[0]*=l,bn.elements[1]*=l,bn.elements[2]*=l,bn.elements[4]*=d,bn.elements[5]*=d,bn.elements[6]*=d,bn.elements[8]*=f,bn.elements[9]*=f,bn.elements[10]*=f,e.setFromRotationMatrix(bn),i.x=o,i.y=a,i.z=c,this}makePerspective(t,e,i,s,r,o,a=zn,c=!1){const l=this.elements,d=2*r/(e-t),f=2*r/(i-s),u=(e+t)/(e-t),m=(i+s)/(i-s);let p,x;if(c)p=r/(o-r),x=o*r/(o-r);else if(a===zn)p=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===Xs)p=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=zn,c=!1){const l=this.elements,d=2/(e-t),f=2/(i-s),u=-(e+t)/(e-t),m=-(i+s)/(i-s);let p,x;if(c)p=1/(o-r),x=o/(o-r);else if(a===zn)p=-2/(o-r),x=-(o+r)/(o-r);else if(a===Xs)p=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};io.prototype.isMatrix4=!0;let pe=io;const $i=new N,bn=new pe,df=new N(0,0,0),uf=new N(1,1,1),ui=new N,ir=new N,dn=new N,dc=new pe,uc=new ri;class Hn{constructor(t=0,e=0,i=0,s=Hn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],d=s[9],f=s[2],u=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Yt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Yt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return dc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(dc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return uc.setFromEuler(this),this.setFromQuaternion(uc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Hn.DEFAULT_ORDER="XYZ";class vl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let hf=0;const hc=new N,Yi=new ri,Xn=new pe,sr=new N,ws=new N,ff=new N,pf=new ri,fc=new N(1,0,0),pc=new N(0,1,0),mc=new N(0,0,1),gc={type:"added"},mf={type:"removed"},ji={type:"childadded",child:null},Eo={type:"childremoved",child:null};class De extends Ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=Ss(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=De.DEFAULT_UP.clone();const t=new N,e=new Hn,i=new ri,s=new N(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pe},normalMatrix:{value:new Gt}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=De.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.multiply(Yi),this}rotateOnWorldAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.premultiply(Yi),this}rotateX(t){return this.rotateOnAxis(fc,t)}rotateY(t){return this.rotateOnAxis(pc,t)}rotateZ(t){return this.rotateOnAxis(mc,t)}translateOnAxis(t,e){return hc.copy(t).applyQuaternion(this.quaternion),this.position.add(hc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(fc,t)}translateY(t){return this.translateOnAxis(pc,t)}translateZ(t){return this.translateOnAxis(mc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?sr.copy(t):sr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(ws,sr,this.up):Xn.lookAt(sr,ws,this.up),this.quaternion.setFromRotationMatrix(Xn),s&&(Xn.extractRotation(s.matrixWorld),Yi.setFromRotationMatrix(Xn),this.quaternion.premultiply(Yi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(ne("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(gc),ji.child=t,this.dispatchEvent(ji),ji.child=null):ne("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(mf),Eo.child=t,this.dispatchEvent(Eo),Eo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(gc),ji.child=t,this.dispatchEvent(ji),ji.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,t,ff),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,pf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),d=o(t.images),f=o(t.shapes),u=o(t.skeletons),m=o(t.animations),p=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),m.length>0&&(i.animations=m),p.length>0&&(i.nodes=p)}return i.object=s,i;function o(a){const c=[];for(const l in a){const d=a[l];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}De.DEFAULT_UP=new N(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Jt extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gf={type:"move"};class To{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const x of t.hand.values()){const g=e.getJointPose(x,i),h=this._getHandJoint(l,x);g!==null&&(h.matrix.fromArray(g.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=g.radius),h.visible=g!==null}const d=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=d.position.distanceTo(f.position),m=.02,p=.005;l.inputState.pinching&&u>m+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=m-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(gf)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Jt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const eu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},rr={h:0,s:0,l:0};function wo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Bt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=on){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=i,ee.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=ee.workingColorSpace){if(t=_l(t,1),e=Yt(e,0,1),i=Yt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=wo(o,r,t+1/3),this.g=wo(o,r,t),this.b=wo(o,r,t-1/3)}return ee.colorSpaceToWorking(this,s),this}setStyle(t,e=on){function i(r){r!==void 0&&parseFloat(r)<1&&Ut("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ut("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Ut("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=on){const i=eu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Ut("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ti(t.r),this.g=ti(t.g),this.b=ti(t.b),this}copyLinearToSRGB(t){return this.r=fs(t.r),this.g=fs(t.g),this.b=fs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=on){return ee.workingToColorSpace($e.copy(this),t),Math.round(Yt($e.r*255,0,255))*65536+Math.round(Yt($e.g*255,0,255))*256+Math.round(Yt($e.b*255,0,255))}getHexString(t=on){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.workingToColorSpace($e.copy(this),e);const i=$e.r,s=$e.g,r=$e.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const d=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=d<=.5?f/(o+a):f/(2-o-a),o){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=d,t}getRGB(t,e=ee.workingColorSpace){return ee.workingToColorSpace($e.copy(this),e),t.r=$e.r,t.g=$e.g,t.b=$e.b,t}getStyle(t=on){ee.workingToColorSpace($e.copy(this),t);const e=$e.r,i=$e.g,s=$e.b;return t!==on?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(hi),this.setHSL(hi.h+t,hi.s+e,hi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(hi),t.getHSL(rr);const i=Gs(hi.h,rr.h,e),s=Gs(hi.s,rr.s,e),r=Gs(hi.l,rr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $e=new Bt;Bt.NAMES=eu;class Ml{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Bt(t),this.near=e,this.far=i}clone(){return new Ml(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class nu extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hn,this.environmentIntensity=1,this.environmentRotation=new Hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const yn=new N,qn=new N,Ao=new N,$n=new N,Ki=new N,Zi=new N,_c=new N,Ro=new N,Co=new N,Po=new N,Lo=new Re,Do=new Re,Io=new Re;class Tn{constructor(t=new N,e=new N,i=new N){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),yn.subVectors(t,e),s.cross(yn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){yn.subVectors(s,e),qn.subVectors(i,e),Ao.subVectors(t,e);const o=yn.dot(yn),a=yn.dot(qn),c=yn.dot(Ao),l=qn.dot(qn),d=qn.dot(Ao),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;const u=1/f,m=(l*c-a*d)*u,p=(o*d-a*c)*u;return r.set(1-m-p,p,m)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,$n)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,$n.x),c.addScaledVector(o,$n.y),c.addScaledVector(a,$n.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return Lo.setScalar(0),Do.setScalar(0),Io.setScalar(0),Lo.fromBufferAttribute(t,e),Do.fromBufferAttribute(t,i),Io.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Lo,r.x),o.addScaledVector(Do,r.y),o.addScaledVector(Io,r.z),o}static isFrontFacing(t,e,i,s){return yn.subVectors(i,e),qn.subVectors(t,e),yn.cross(qn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return yn.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),yn.cross(qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Tn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Tn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Tn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Tn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Tn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;Ki.subVectors(s,i),Zi.subVectors(r,i),Ro.subVectors(t,i);const c=Ki.dot(Ro),l=Zi.dot(Ro);if(c<=0&&l<=0)return e.copy(i);Co.subVectors(t,s);const d=Ki.dot(Co),f=Zi.dot(Co);if(d>=0&&f<=d)return e.copy(s);const u=c*f-d*l;if(u<=0&&c>=0&&d<=0)return o=c/(c-d),e.copy(i).addScaledVector(Ki,o);Po.subVectors(t,r);const m=Ki.dot(Po),p=Zi.dot(Po);if(p>=0&&m<=p)return e.copy(r);const x=m*l-c*p;if(x<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(i).addScaledVector(Zi,a);const g=d*p-m*f;if(g<=0&&f-d>=0&&m-p>=0)return _c.subVectors(r,s),a=(f-d)/(f-d+(m-p)),e.copy(s).addScaledVector(_c,a);const h=1/(g+x+u);return o=x*h,a=u*h,e.copy(i).addScaledVector(Ki,o).addScaledVector(Zi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Mn{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(En.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(En.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=En.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,En):En.fromBufferAttribute(r,o),En.applyMatrix4(t.matrixWorld),this.expandByPoint(En);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),or.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),or.copy(i.boundingBox)),or.applyMatrix4(t.matrixWorld),this.union(or)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,En),En.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(As),ar.subVectors(this.max,As),Ji.subVectors(t.a,As),Qi.subVectors(t.b,As),ts.subVectors(t.c,As),fi.subVectors(Qi,Ji),pi.subVectors(ts,Qi),wi.subVectors(Ji,ts);let e=[0,-fi.z,fi.y,0,-pi.z,pi.y,0,-wi.z,wi.y,fi.z,0,-fi.x,pi.z,0,-pi.x,wi.z,0,-wi.x,-fi.y,fi.x,0,-pi.y,pi.x,0,-wi.y,wi.x,0];return!Uo(e,Ji,Qi,ts,ar)||(e=[1,0,0,0,1,0,0,0,1],!Uo(e,Ji,Qi,ts,ar))?!1:(lr.crossVectors(fi,pi),e=[lr.x,lr.y,lr.z],Uo(e,Ji,Qi,ts,ar))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,En).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(En).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Yn=[new N,new N,new N,new N,new N,new N,new N,new N],En=new N,or=new Mn,Ji=new N,Qi=new N,ts=new N,fi=new N,pi=new N,wi=new N,As=new N,ar=new N,lr=new N,Ai=new N;function Uo(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Ai.fromArray(n,r);const a=s.x*Math.abs(Ai.x)+s.y*Math.abs(Ai.y)+s.z*Math.abs(Ai.z),c=t.dot(Ai),l=e.dot(Ai),d=i.dot(Ai);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>a)return!1}return!0}const Ue=new N,cr=new Ft;let _f=0;class Sn extends Ei{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_f++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=nc,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)cr.fromBufferAttribute(this,e),cr.applyMatrix3(t),this.setXY(e,cr.x,cr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix3(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ls(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ze(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ls(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ls(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ls(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ls(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ze(e,this.array),i=Ze(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ze(e,this.array),i=Ze(i,this.array),s=Ze(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Ze(e,this.array),i=Ze(i,this.array),s=Ze(s,this.array),r=Ze(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==nc&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class iu extends Sn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class su extends Sn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Ie extends Sn{constructor(t,e,i){super(new Float32Array(t),e,i)}}const xf=new Mn,Rs=new N,No=new N;class bs{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):xf.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Rs.subVectors(t,this.center);const e=Rs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Rs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(No.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Rs.copy(t.center).add(No)),this.expandByPoint(Rs.copy(t.center).sub(No))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let vf=0;const xn=new pe,Fo=new De,es=new N,un=new Mn,Cs=new Mn,Ge=new N;class sn extends Ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vf++}),this.uuid=Ss(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Oh(t)?su:iu)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Gt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return xn.makeRotationFromQuaternion(t),this.applyMatrix4(xn),this}rotateX(t){return xn.makeRotationX(t),this.applyMatrix4(xn),this}rotateY(t){return xn.makeRotationY(t),this.applyMatrix4(xn),this}rotateZ(t){return xn.makeRotationZ(t),this.applyMatrix4(xn),this}translate(t,e,i){return xn.makeTranslation(t,e,i),this.applyMatrix4(xn),this}scale(t,e,i){return xn.makeScale(t,e,i),this.applyMatrix4(xn),this}lookAt(t){return Fo.lookAt(t),Fo.updateMatrix(),this.applyMatrix4(Fo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(es).negate(),this.translate(es.x,es.y,es.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ie(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ne("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];un.setFromBufferAttribute(r),this.morphTargetsRelative?(Ge.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Ge),Ge.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Ge)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ne('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ne("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const i=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Cs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ge.addVectors(un.min,Cs.min),un.expandByPoint(Ge),Ge.addVectors(un.max,Cs.max),un.expandByPoint(Ge)):(un.expandByPoint(Cs.min),un.expandByPoint(Cs.max))}un.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ge.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ge));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,d=a.count;l<d;l++)Ge.fromBufferAttribute(a,l),c&&(es.fromBufferAttribute(t,l),Ge.add(es)),s=Math.max(s,i.distanceToSquared(Ge))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ne('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){ne("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Sn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let _=0;_<i.count;_++)a[_]=new N,c[_]=new N;const l=new N,d=new N,f=new N,u=new Ft,m=new Ft,p=new Ft,x=new N,g=new N;function h(_,S,A){l.fromBufferAttribute(i,_),d.fromBufferAttribute(i,S),f.fromBufferAttribute(i,A),u.fromBufferAttribute(r,_),m.fromBufferAttribute(r,S),p.fromBufferAttribute(r,A),d.sub(l),f.sub(l),m.sub(u),p.sub(u);const R=1/(m.x*p.y-p.x*m.y);isFinite(R)&&(x.copy(d).multiplyScalar(p.y).addScaledVector(f,-m.y).multiplyScalar(R),g.copy(f).multiplyScalar(m.x).addScaledVector(d,-p.x).multiplyScalar(R),a[_].add(x),a[S].add(x),a[A].add(x),c[_].add(g),c[S].add(g),c[A].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let _=0,S=M.length;_<S;++_){const A=M[_],R=A.start,C=A.count;for(let L=R,V=R+C;L<V;L+=3)h(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const E=new N,w=new N,D=new N,P=new N;function y(_){D.fromBufferAttribute(s,_),P.copy(D);const S=a[_];E.copy(S),E.sub(D.multiplyScalar(D.dot(S))).normalize(),w.crossVectors(P,S);const R=w.dot(c[_])<0?-1:1;o.setXYZW(_,E.x,E.y,E.z,R)}for(let _=0,S=M.length;_<S;++_){const A=M[_],R=A.start,C=A.count;for(let L=R,V=R+C;L<V;L+=3)y(t.getX(L+0)),y(t.getX(L+1)),y(t.getX(L+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Sn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,m=i.count;u<m;u++)i.setXYZ(u,0,0,0);const s=new N,r=new N,o=new N,a=new N,c=new N,l=new N,d=new N,f=new N;if(t)for(let u=0,m=t.count;u<m;u+=3){const p=t.getX(u+0),x=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,g),d.subVectors(o,r),f.subVectors(s,r),d.cross(f),a.fromBufferAttribute(i,p),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,g),a.add(d),c.add(d),l.add(d),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,m=e.count;u<m;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),d.subVectors(o,r),f.subVectors(s,r),d.cross(f),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ge.fromBufferAttribute(t,e),Ge.normalize(),t.setXYZ(e,Ge.x,Ge.y,Ge.z)}toNonIndexed(){function t(a,c){const l=a.array,d=a.itemSize,f=a.normalized,u=new l.constructor(c.length*d);let m=0,p=0;for(let x=0,g=c.length;x<g;x++){a.isInterleavedBufferAttribute?m=c[x]*a.data.stride+a.offset:m=c[x]*d;for(let h=0;h<d;h++)u[p++]=l[m++]}return new Sn(u,d,f)}if(this.index===null)return Ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new sn,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,i);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let d=0,f=l.length;d<f;d++){const u=l[d],m=t(u,i);c.push(m)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let f=0,u=l.length;f<u;f++){const m=l[f];d.push(m.toJSON(t.data))}d.length>0&&(s[c]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const d=s[l];this.setAttribute(l,d.clone(e))}const r=t.morphAttributes;for(const l in r){const d=[],f=r[l];for(let u=0,m=f.length;u<m;u++)d.push(f[u].clone(e));this.morphAttributes[l]=d}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,d=o.length;l<d;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Mf=0;class Gi extends Ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=Ss(),this.name="",this.type="Material",this.blending=hs,this.side=Si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=aa,this.blendDst=la,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ec,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xi,this.stencilZFail=Xi,this.stencilZPass=Xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Ut(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ut(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==hs&&(i.blending=this.blending),this.side!==Si&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==aa&&(i.blendSrc=this.blendSrc),this.blendDst!==la&&(i.blendDst=this.blendDst),this.blendEquation!==Li&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ps&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ec&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Xi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Xi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const jn=new N,Oo=new N,dr=new N,mi=new N,zo=new N,ur=new N,Bo=new N;class ro{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,jn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=jn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(jn.copy(this.origin).addScaledVector(this.direction,e),jn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Oo.copy(t).add(e).multiplyScalar(.5),dr.copy(e).sub(t).normalize(),mi.copy(this.origin).sub(Oo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(dr),a=mi.dot(this.direction),c=-mi.dot(dr),l=mi.lengthSq(),d=Math.abs(1-o*o);let f,u,m,p;if(d>0)if(f=o*c-a,u=o*a-c,p=r*d,f>=0)if(u>=-p)if(u<=p){const x=1/d;f*=x,u*=x,m=f*(f+o*u+2*a)+u*(o*f+u+2*c)+l}else u=r,f=Math.max(0,-(o*u+a)),m=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(o*u+a)),m=-f*f+u*(u+2*c)+l;else u<=-p?(f=Math.max(0,-(-o*r+a)),u=f>0?-r:Math.min(Math.max(-r,-c),r),m=-f*f+u*(u+2*c)+l):u<=p?(f=0,u=Math.min(Math.max(-r,-c),r),m=u*(u+2*c)+l):(f=Math.max(0,-(o*r+a)),u=f>0?r:Math.min(Math.max(-r,-c),r),m=-f*f+u*(u+2*c)+l);else u=o>0?-r:r,f=Math.max(0,-(o*u+a)),m=-f*f+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Oo).addScaledVector(dr,u),m}intersectSphere(t,e){jn.subVectors(t.center,this.origin);const i=jn.dot(this.direction),s=jn.dot(jn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c;const l=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(i=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(i=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),d>=0?(r=(t.min.y-u.y)*d,o=(t.max.y-u.y)*d):(r=(t.max.y-u.y)*d,o=(t.min.y-u.y)*d),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-u.z)*f,c=(t.max.z-u.z)*f):(a=(t.max.z-u.z)*f,c=(t.min.z-u.z)*f),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,jn)!==null}intersectTriangle(t,e,i,s,r){zo.subVectors(e,t),ur.subVectors(i,t),Bo.crossVectors(zo,ur);let o=this.direction.dot(Bo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;mi.subVectors(this.origin,t);const c=a*this.direction.dot(ur.crossVectors(mi,ur));if(c<0)return null;const l=a*this.direction.dot(zo.cross(mi));if(l<0||c+l>o)return null;const d=-a*mi.dot(Bo);return d<0?null:this.at(d/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class gs extends Gi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=ol,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const xc=new pe,Ri=new ro,hr=new bs,vc=new N,fr=new N,pr=new N,mr=new N,ko=new N,gr=new N,Mc=new N,_r=new N;class Kt extends De{constructor(t=new sn,e=new gs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){gr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const d=a[c],f=r[c];d!==0&&(ko.fromBufferAttribute(f,t),o?gr.addScaledVector(ko,d):gr.addScaledVector(ko.sub(e),d))}e.add(gr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),hr.copy(i.boundingSphere),hr.applyMatrix4(r),Ri.copy(t.ray).recast(t.near),!(hr.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(hr,vc)===null||Ri.origin.distanceToSquared(vc)>(t.far-t.near)**2))&&(xc.copy(r).invert(),Ri.copy(t.ray).applyMatrix4(xc),!(i.boundingBox!==null&&Ri.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ri)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,u=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,x=u.length;p<x;p++){const g=u[p],h=o[g.materialIndex],M=Math.max(g.start,m.start),E=Math.min(a.count,Math.min(g.start+g.count,m.start+m.count));for(let w=M,D=E;w<D;w+=3){const P=a.getX(w),y=a.getX(w+1),_=a.getX(w+2);s=xr(this,h,t,i,l,d,f,P,y,_),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,m.start),x=Math.min(a.count,m.start+m.count);for(let g=p,h=x;g<h;g+=3){const M=a.getX(g),E=a.getX(g+1),w=a.getX(g+2);s=xr(this,o,t,i,l,d,f,M,E,w),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,x=u.length;p<x;p++){const g=u[p],h=o[g.materialIndex],M=Math.max(g.start,m.start),E=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let w=M,D=E;w<D;w+=3){const P=w,y=w+1,_=w+2;s=xr(this,h,t,i,l,d,f,P,y,_),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,m.start),x=Math.min(c.count,m.start+m.count);for(let g=p,h=x;g<h;g+=3){const M=g,E=g+1,w=g+2;s=xr(this,o,t,i,l,d,f,M,E,w),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Sf(n,t,e,i,s,r,o,a){let c;if(t.side===en?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===Si,a),c===null)return null;_r.copy(a),_r.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(_r);return l<e.near||l>e.far?null:{distance:l,point:_r.clone(),object:n}}function xr(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,fr),n.getVertexPosition(c,pr),n.getVertexPosition(l,mr);const d=Sf(n,t,e,i,fr,pr,mr,Mc);if(d){const f=new N;Tn.getBarycoord(Mc,fr,pr,mr,f),s&&(d.uv=Tn.getInterpolatedAttribute(s,a,c,l,f,new Ft)),r&&(d.uv1=Tn.getInterpolatedAttribute(r,a,c,l,f,new Ft)),o&&(d.normal=Tn.getInterpolatedAttribute(o,a,c,l,f,new N),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new N,materialIndex:0};Tn.getNormal(fr,pr,mr,u.normal),d.face=u,d.barycoord=f}return d}class ru extends Ke{constructor(t=null,e=1,i=1,s,r,o,a,c,l=We,d=We,f,u){super(null,o,a,c,l,d,s,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Sc extends Sn{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ns=new pe,bc=new pe,vr=[],yc=new Mn,bf=new pe,Ps=new Kt,Ls=new bs;class yf extends Kt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Sc(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,bf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Mn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ns),yc.copy(t.boundingBox).applyMatrix4(ns),this.boundingBox.union(yc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new bs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ns),Ls.copy(t.boundingSphere).applyMatrix4(ns),this.boundingSphere.union(Ls)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=t.previousInstanceMatrix.clone()),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(Ps.geometry=this.geometry,Ps.material=this.material,Ps.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ls.copy(this.boundingSphere),Ls.applyMatrix4(i),t.ray.intersectsSphere(Ls)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ns),bc.multiplyMatrices(i,ns),Ps.matrixWorld=bc,Ps.raycast(t,vr);for(let o=0,a=vr.length;o<a;o++){const c=vr[o];c.instanceId=r,c.object=this,e.push(c)}vr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Sc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new ru(new Float32Array(s*this.count),s,this.count,ul,wn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(i,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Go=new N,Ef=new N,Tf=new Gt;class Kn{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Go.subVectors(i,e).cross(Ef.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(Go),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Tf.getNormalMatrix(t),s=this.coplanarPoint(Go).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ci=new bs,wf=new Ft(.5,.5),Mr=new N;class Sl{constructor(t=new Kn,e=new Kn,i=new Kn,s=new Kn,r=new Kn,o=new Kn){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=zn,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],d=r[4],f=r[5],u=r[6],m=r[7],p=r[8],x=r[9],g=r[10],h=r[11],M=r[12],E=r[13],w=r[14],D=r[15];if(s[0].setComponents(l-o,m-d,h-p,D-M).normalize(),s[1].setComponents(l+o,m+d,h+p,D+M).normalize(),s[2].setComponents(l+a,m+f,h+x,D+E).normalize(),s[3].setComponents(l-a,m-f,h-x,D-E).normalize(),i)s[4].setComponents(c,u,g,w).normalize(),s[5].setComponents(l-c,m-u,h-g,D-w).normalize();else if(s[4].setComponents(l-c,m-u,h-g,D-w).normalize(),e===zn)s[5].setComponents(l+c,m+u,h+g,D+w).normalize();else if(e===Xs)s[5].setComponents(c,u,g,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(t){Ci.center.set(0,0,0);const e=wf.distanceTo(t.center);return Ci.radius=.7071067811865476+e,Ci.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Mr.x=s.normal.x>0?t.max.x:t.min.x,Mr.y=s.normal.y>0?t.max.y:t.min.y,Mr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Mr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ou extends Gi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Bt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Zr=new N,Jr=new N,Ec=new pe,Ds=new ro,Sr=new bs,Ho=new N,Tc=new N;class Af extends De{constructor(t=new sn,e=new ou){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Zr.fromBufferAttribute(e,s-1),Jr.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Zr.distanceTo(Jr);t.setAttribute("lineDistance",new Ie(i,1))}else Ut("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Sr.copy(i.boundingSphere),Sr.applyMatrix4(s),Sr.radius+=r,t.ray.intersectsSphere(Sr)===!1)return;Ec.copy(s).invert(),Ds.copy(t.ray).applyMatrix4(Ec);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const m=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let x=m,g=p-1;x<g;x+=l){const h=d.getX(x),M=d.getX(x+1),E=br(this,t,Ds,c,h,M,x);E&&e.push(E)}if(this.isLineLoop){const x=d.getX(p-1),g=d.getX(m),h=br(this,t,Ds,c,x,g,p-1);h&&e.push(h)}}else{const m=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let x=m,g=p-1;x<g;x+=l){const h=br(this,t,Ds,c,x,x+1,x);h&&e.push(h)}if(this.isLineLoop){const x=br(this,t,Ds,c,p-1,m,p-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function br(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(Zr.fromBufferAttribute(a,s),Jr.fromBufferAttribute(a,r),e.distanceSqToSegment(Zr,Jr,Ho,Tc)>i)return;Ho.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Ho);if(!(l<t.near||l>t.far))return{distance:l,point:Tc.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const wc=new N,Ac=new N;class Rf extends Af{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)wc.fromBufferAttribute(e,s),Ac.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+wc.distanceTo(Ac);t.setAttribute("lineDistance",new Ie(i,1))}else Ut("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class au extends Ke{constructor(t=[],e=Oi,i,s,r,o,a,c,l,d){super(t,e,i,s,r,o,a,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Cf extends Ke{constructor(t,e,i,s,r,o,a,c,l){super(t,e,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _s extends Ke{constructor(t,e,i=Gn,s,r,o,a=We,c=We,l,d=si,f=1){if(d!==si&&d!==Ui)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:f};super(u,s,r,o,a,c,d,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new xl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Pf extends _s{constructor(t,e=Gn,i=Oi,s,r,o=We,a=We,c,l=si){const d={width:t,height:t,depth:1},f=[d,d,d,d,d,d];super(t,t,e,i,s,r,o,a,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class lu extends Ke{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ne extends sn{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],d=[],f=[];let u=0,m=0;p("z","y","x",-1,-1,i,e,t,o,r,0),p("z","y","x",1,-1,i,e,-t,o,r,1),p("x","z","y",1,1,t,i,e,s,o,2),p("x","z","y",1,-1,t,i,-e,s,o,3),p("x","y","z",1,-1,t,e,i,s,r,4),p("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Ie(l,3)),this.setAttribute("normal",new Ie(d,3)),this.setAttribute("uv",new Ie(f,2));function p(x,g,h,M,E,w,D,P,y,_,S){const A=w/y,R=D/_,C=w/2,L=D/2,V=P/2,I=y+1,B=_+1;let z=0,K=0;const nt=new N;for(let ft=0;ft<B;ft++){const Et=ft*R-L;for(let Ct=0;Ct<I;Ct++){const st=Ct*A-C;nt[x]=st*M,nt[g]=Et*E,nt[h]=V,l.push(nt.x,nt.y,nt.z),nt[x]=0,nt[g]=0,nt[h]=P>0?1:-1,d.push(nt.x,nt.y,nt.z),f.push(Ct/y),f.push(1-ft/_),z+=1}}for(let ft=0;ft<_;ft++)for(let Et=0;Et<y;Et++){const Ct=u+Et+I*ft,st=u+Et+I*(ft+1),St=u+(Et+1)+I*(ft+1),vt=u+(Et+1)+I*ft;c.push(Ct,st,vt),c.push(st,St,vt),K+=6}a.addGroup(m,K,S),m+=K,u+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ne(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class bl extends sn{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new N,d=new Ft;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,u=3;f<=e;f++,u+=3){const m=i+f/e*s;l.x=t*Math.cos(m),l.y=t*Math.sin(m),o.push(l.x,l.y,l.z),a.push(0,0,1),d.x=(o[u]/t+1)/2,d.y=(o[u+1]/t+1)/2,c.push(d.x,d.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Ie(o,3)),this.setAttribute("normal",new Ie(a,3)),this.setAttribute("uv",new Ie(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class yl extends sn{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const d=[],f=[],u=[],m=[];let p=0;const x=[],g=i/2;let h=0;M(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(d),this.setAttribute("position",new Ie(f,3)),this.setAttribute("normal",new Ie(u,3)),this.setAttribute("uv",new Ie(m,2));function M(){const w=new N,D=new N;let P=0;const y=(e-t)/i;for(let _=0;_<=r;_++){const S=[],A=_/r,R=A*(e-t)+t;for(let C=0;C<=s;C++){const L=C/s,V=L*c+a,I=Math.sin(V),B=Math.cos(V);D.x=R*I,D.y=-A*i+g,D.z=R*B,f.push(D.x,D.y,D.z),w.set(I,y,B).normalize(),u.push(w.x,w.y,w.z),m.push(L,1-A),S.push(p++)}x.push(S)}for(let _=0;_<s;_++)for(let S=0;S<r;S++){const A=x[S][_],R=x[S+1][_],C=x[S+1][_+1],L=x[S][_+1];(t>0||S!==0)&&(d.push(A,R,L),P+=3),(e>0||S!==r-1)&&(d.push(R,C,L),P+=3)}l.addGroup(h,P,0),h+=P}function E(w){const D=p,P=new Ft,y=new N;let _=0;const S=w===!0?t:e,A=w===!0?1:-1;for(let C=1;C<=s;C++)f.push(0,g*A,0),u.push(0,A,0),m.push(.5,.5),p++;const R=p;for(let C=0;C<=s;C++){const V=C/s*c+a,I=Math.cos(V),B=Math.sin(V);y.x=S*B,y.y=g*A,y.z=S*I,f.push(y.x,y.y,y.z),u.push(0,A,0),P.x=I*.5+.5,P.y=B*.5*A+.5,m.push(P.x,P.y),p++}for(let C=0;C<s;C++){const L=D+C,V=R+C;w===!0?d.push(V,V+1,L):d.push(V+1,V,L),_+=3}l.addGroup(h,_,w===!0?1:2),h+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yl(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class oo extends sn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,d=c+1,f=t/a,u=e/c,m=[],p=[],x=[],g=[];for(let h=0;h<d;h++){const M=h*u-o;for(let E=0;E<l;E++){const w=E*f-r;p.push(w,-M,0),x.push(0,0,1),g.push(E/a),g.push(1-h/c)}}for(let h=0;h<c;h++)for(let M=0;M<a;M++){const E=M+l*h,w=M+l*(h+1),D=M+1+l*(h+1),P=M+1+l*h;m.push(E,w,P),m.push(w,D,P)}this.setIndex(m),this.setAttribute("position",new Ie(p,3)),this.setAttribute("normal",new Ie(x,3)),this.setAttribute("uv",new Ie(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oo(t.width,t.height,t.widthSegments,t.heightSegments)}}class ao extends sn{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const d=[],f=new N,u=new N,m=[],p=[],x=[],g=[];for(let h=0;h<=i;h++){const M=[],E=h/i;let w=0;h===0&&o===0?w=.5/e:h===i&&c===Math.PI&&(w=-.5/e);for(let D=0;D<=e;D++){const P=D/e;f.x=-t*Math.cos(s+P*r)*Math.sin(o+E*a),f.y=t*Math.cos(o+E*a),f.z=t*Math.sin(s+P*r)*Math.sin(o+E*a),p.push(f.x,f.y,f.z),u.copy(f).normalize(),x.push(u.x,u.y,u.z),g.push(P+w,1-E),M.push(l++)}d.push(M)}for(let h=0;h<i;h++)for(let M=0;M<e;M++){const E=d[h][M+1],w=d[h][M],D=d[h+1][M],P=d[h+1][M+1];(h!==0||o>0)&&m.push(E,w,P),(h!==i-1||c<Math.PI)&&m.push(w,D,P)}this.setIndex(m),this.setAttribute("position",new Ie(p,3)),this.setAttribute("normal",new Ie(x,3)),this.setAttribute("uv",new Ie(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ao(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function xs(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(Rc(s))s.isRenderTargetTexture?(Ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(Rc(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function Je(n){const t={};for(let e=0;e<n.length;e++){const i=xs(n[e]);for(const s in i)t[s]=i[s]}return t}function Rc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Lf(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function cu(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const Df={clone:xs,merge:Je};var If=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Uf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends Gi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=If,this.fragmentShader=Uf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=xs(t.uniforms),this.uniformsGroups=Lf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Nf extends Vn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Qr extends Gi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Bt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$r,this.normalScale=new Ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ff extends Gi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$r,this.normalScale=new Ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=ol,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Of extends Gi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ch,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class zf extends Gi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class El extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Bt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Bf extends El{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Bt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Vo=new pe,Cc=new N,Pc=new N;class du{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ft(512,512),this.mapType=pn,this.map=null,this.mapPass=null,this.matrix=new pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sl,this._frameExtents=new Ft(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Cc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Cc),Pc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Pc),e.updateMatrixWorld(),Vo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vo,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Xs||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Vo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const yr=new N,Er=new ri,Nn=new N;class uu extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(yr,Er,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(yr,Er,Nn.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(yr,Er,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(yr,Er,Nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const gi=new N,Lc=new Ft,Dc=new Ft;class hn extends uu{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=qs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ks*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return qs*2*Math.atan(Math.tan(ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(gi.x,gi.y).multiplyScalar(-t/gi.z),gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(gi.x,gi.y).multiplyScalar(-t/gi.z)}getViewSize(t,e){return this.getViewBounds(t,Lc,Dc),e.subVectors(Dc,Lc)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ks*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class kf extends du{constructor(){super(new hn(90,1,.5,500)),this.isPointLightShadow=!0}}class hu extends El{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new kf}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class Tl extends uu{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=d*this.view.offsetY,c=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Gf extends du{constructor(){super(new Tl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hf extends El{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new Gf}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const is=-90,ss=1;class Vf extends De{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new hn(is,ss,t,e);s.layers=this.layers,this.add(s);const r=new hn(is,ss,t,e);r.layers=this.layers,this.add(r);const o=new hn(is,ss,t,e);o.layers=this.layers,this.add(o);const a=new hn(is,ss,t,e);a.layers=this.layers,this.add(a);const c=new hn(is,ss,t,e);c.layers=this.layers,this.add(c);const l=new hn(is,ss,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===zn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Xs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,d]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,d),t.setRenderTarget(f,u,m),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class Wf extends hn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Ic=new pe;class fu{constructor(t,e,i=0,s=1/0){this.ray=new ro(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new vl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):ne("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ic.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ic),this}intersectObject(t,e=!0,i=[]){return Ya(t,this,i,e),i.sort(Uc),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Ya(t[s],this,i,e);return i.sort(Uc),i}}function Uc(n,t){return n.distance-t.distance}function Ya(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Ya(r[o],t,e,!0)}}class Xf{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ut("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class ja{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Yt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Yt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Hl=class Hl{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};Hl.prototype.isMatrix2=!0;let Nc=Hl;class qf extends Ei{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Ut("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Fc(n,t,e,i){const s=$f(i);switch(e){case Zd:return n*t;case ul:return n*t/s.components*s.byteLength;case hl:return n*t/s.components*s.byteLength;case zi:return n*t*2/s.components*s.byteLength;case fl:return n*t*2/s.components*s.byteLength;case Jd:return n*t*3/s.components*s.byteLength;case An:return n*t*4/s.components*s.byteLength;case pl:return n*t*4/s.components*s.byteLength;case Or:case zr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Br:case kr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case xa:case Ma:return Math.max(n,16)*Math.max(t,8)/4;case _a:case va:return Math.max(n,8)*Math.max(t,8)/2;case Sa:case ba:case Ea:case Ta:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ya:case Xr:case wa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Aa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ra:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Ca:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Pa:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case La:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Da:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Ia:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Ua:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Na:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Fa:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Oa:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case za:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Ba:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ka:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ga:case Ha:case Va:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Wa:case Xa:return Math.ceil(n/4)*Math.ceil(t/4)*8;case qr:case qa:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function $f(n){switch(n){case pn:case $d:return{byteLength:1,components:1};case Vs:case Yd:case ii:return{byteLength:2,components:1};case cl:case dl:return{byteLength:2,components:4};case Gn:case ll:case wn:return{byteLength:4,components:1};case jd:case Kd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rl}}));typeof window<"u"&&(window.__THREE__?Ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rl);function pu(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Yf(n){const t=new WeakMap;function e(a,c){const l=a.array,d=a.usage,f=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,d),a.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,c,l){const d=c.array,f=c.updateRanges;if(n.bindBuffer(l,a),f.length===0)n.bufferSubData(l,0,d);else{f.sort((m,p)=>m.start-p.start);let u=0;for(let m=1;m<f.length;m++){const p=f[u],x=f[m];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++u,f[u]=x)}f.length=u+1;for(let m=0,p=f.length;m<p;m++){const x=f[m];n.bufferSubData(l,x.start*d.BYTES_PER_ELEMENT,d,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=t.get(a);(!d||d.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var jf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kf=`#ifdef USE_ALPHAHASH
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
#endif`,Zf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,tp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ep=`#ifdef USE_AOMAP
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
#endif`,np=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ip=`#ifdef USE_BATCHING
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
#endif`,sp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,op=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ap=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,lp=`#ifdef USE_IRIDESCENCE
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
#endif`,cp=`#ifdef USE_BUMPMAP
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
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,mp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,gp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,_p=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,xp=`#define PI 3.141592653589793
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
} // validated`,vp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Mp=`vec3 transformedNormal = objectNormal;
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
#endif`,Sp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ep=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tp="gl_FragColor = linearToOutputTexel( gl_FragColor );",wp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ap=`#ifdef USE_ENVMAP
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
#endif`,Rp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Cp=`#ifdef USE_ENVMAP
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
#endif`,Pp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lp=`#ifdef USE_ENVMAP
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
#endif`,Dp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ip=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Up=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Np=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fp=`#ifdef USE_GRADIENTMAP
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
}`,Op=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Gp=`#ifdef USE_ENVMAP
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
#endif`,Hp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qp=`PhysicalMaterial material;
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
#endif`,$p=`uniform sampler2D dfgLUT;
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
}`,Yp=`
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
#endif`,jp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Kp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Jp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,em=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,nm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,im=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,rm=`#if defined( USE_POINTS_UV )
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
#endif`,om=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,am=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,lm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,um=`#ifdef USE_MORPHTARGETS
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
#endif`,hm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,pm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_m=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xm=`#ifdef USE_NORMALMAP
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
#endif`,vm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ym=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Em=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Tm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Am=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Dm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Im=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Um=`float getShadowMask() {
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
}`,Nm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fm=`#ifdef USE_SKINNING
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
#endif`,Om=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zm=`#ifdef USE_SKINNING
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
#endif`,Bm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,km=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vm=`#ifdef USE_TRANSMISSION
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
#endif`,Wm=`#ifdef USE_TRANSMISSION
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
#endif`,Xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ym=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const jm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Km=`uniform sampler2D t2D;
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
}`,Zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Qm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,t0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e0=`#include <common>
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
}`,n0=`#if DEPTH_PACKING == 3200
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
}`,i0=`#define DISTANCE
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
}`,s0=`#define DISTANCE
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
}`,r0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,o0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a0=`uniform float scale;
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
}`,l0=`uniform vec3 diffuse;
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
}`,c0=`#include <common>
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
}`,d0=`uniform vec3 diffuse;
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
}`,u0=`#define LAMBERT
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
}`,h0=`#define LAMBERT
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
}`,f0=`#define MATCAP
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
}`,p0=`#define MATCAP
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
}`,m0=`#define NORMAL
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
}`,g0=`#define NORMAL
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
}`,_0=`#define PHONG
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
}`,x0=`#define PHONG
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
}`,v0=`#define STANDARD
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
}`,M0=`#define STANDARD
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
}`,S0=`#define TOON
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
}`,b0=`#define TOON
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
}`,y0=`uniform float size;
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
}`,E0=`uniform vec3 diffuse;
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
}`,T0=`#include <common>
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
}`,w0=`uniform vec3 color;
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
}`,A0=`uniform float rotation;
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
}`,R0=`uniform vec3 diffuse;
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
}`,qt={alphahash_fragment:jf,alphahash_pars_fragment:Kf,alphamap_fragment:Zf,alphamap_pars_fragment:Jf,alphatest_fragment:Qf,alphatest_pars_fragment:tp,aomap_fragment:ep,aomap_pars_fragment:np,batching_pars_vertex:ip,batching_vertex:sp,begin_vertex:rp,beginnormal_vertex:op,bsdfs:ap,iridescence_fragment:lp,bumpmap_pars_fragment:cp,clipping_planes_fragment:dp,clipping_planes_pars_fragment:up,clipping_planes_pars_vertex:hp,clipping_planes_vertex:fp,color_fragment:pp,color_pars_fragment:mp,color_pars_vertex:gp,color_vertex:_p,common:xp,cube_uv_reflection_fragment:vp,defaultnormal_vertex:Mp,displacementmap_pars_vertex:Sp,displacementmap_vertex:bp,emissivemap_fragment:yp,emissivemap_pars_fragment:Ep,colorspace_fragment:Tp,colorspace_pars_fragment:wp,envmap_fragment:Ap,envmap_common_pars_fragment:Rp,envmap_pars_fragment:Cp,envmap_pars_vertex:Pp,envmap_physical_pars_fragment:Gp,envmap_vertex:Lp,fog_vertex:Dp,fog_pars_vertex:Ip,fog_fragment:Up,fog_pars_fragment:Np,gradientmap_pars_fragment:Fp,lightmap_pars_fragment:Op,lights_lambert_fragment:zp,lights_lambert_pars_fragment:Bp,lights_pars_begin:kp,lights_toon_fragment:Hp,lights_toon_pars_fragment:Vp,lights_phong_fragment:Wp,lights_phong_pars_fragment:Xp,lights_physical_fragment:qp,lights_physical_pars_fragment:$p,lights_fragment_begin:Yp,lights_fragment_maps:jp,lights_fragment_end:Kp,lightprobes_pars_fragment:Zp,logdepthbuf_fragment:Jp,logdepthbuf_pars_fragment:Qp,logdepthbuf_pars_vertex:tm,logdepthbuf_vertex:em,map_fragment:nm,map_pars_fragment:im,map_particle_fragment:sm,map_particle_pars_fragment:rm,metalnessmap_fragment:om,metalnessmap_pars_fragment:am,morphinstance_vertex:lm,morphcolor_vertex:cm,morphnormal_vertex:dm,morphtarget_pars_vertex:um,morphtarget_vertex:hm,normal_fragment_begin:fm,normal_fragment_maps:pm,normal_pars_fragment:mm,normal_pars_vertex:gm,normal_vertex:_m,normalmap_pars_fragment:xm,clearcoat_normal_fragment_begin:vm,clearcoat_normal_fragment_maps:Mm,clearcoat_pars_fragment:Sm,iridescence_pars_fragment:bm,opaque_fragment:ym,packing:Em,premultiplied_alpha_fragment:Tm,project_vertex:wm,dithering_fragment:Am,dithering_pars_fragment:Rm,roughnessmap_fragment:Cm,roughnessmap_pars_fragment:Pm,shadowmap_pars_fragment:Lm,shadowmap_pars_vertex:Dm,shadowmap_vertex:Im,shadowmask_pars_fragment:Um,skinbase_vertex:Nm,skinning_pars_vertex:Fm,skinning_vertex:Om,skinnormal_vertex:zm,specularmap_fragment:Bm,specularmap_pars_fragment:km,tonemapping_fragment:Gm,tonemapping_pars_fragment:Hm,transmission_fragment:Vm,transmission_pars_fragment:Wm,uv_pars_fragment:Xm,uv_pars_vertex:qm,uv_vertex:$m,worldpos_vertex:Ym,background_vert:jm,background_frag:Km,backgroundCube_vert:Zm,backgroundCube_frag:Jm,cube_vert:Qm,cube_frag:t0,depth_vert:e0,depth_frag:n0,distance_vert:i0,distance_frag:s0,equirect_vert:r0,equirect_frag:o0,linedashed_vert:a0,linedashed_frag:l0,meshbasic_vert:c0,meshbasic_frag:d0,meshlambert_vert:u0,meshlambert_frag:h0,meshmatcap_vert:f0,meshmatcap_frag:p0,meshnormal_vert:m0,meshnormal_frag:g0,meshphong_vert:_0,meshphong_frag:x0,meshphysical_vert:v0,meshphysical_frag:M0,meshtoon_vert:S0,meshtoon_frag:b0,points_vert:y0,points_frag:E0,shadow_vert:T0,shadow_frag:w0,sprite_vert:A0,sprite_frag:R0},gt={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new Ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new Ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},On={basic:{uniforms:Je([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:Je([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Bt(0)},envMapIntensity:{value:1}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:Je([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:Je([gt.common,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.roughnessmap,gt.metalnessmap,gt.fog,gt.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:Je([gt.common,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.gradientmap,gt.fog,gt.lights,{emissive:{value:new Bt(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:Je([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:Je([gt.points,gt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:Je([gt.common,gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:Je([gt.common,gt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:Je([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:Je([gt.sprite,gt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distance:{uniforms:Je([gt.common,gt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distance_vert,fragmentShader:qt.distance_frag},shadow:{uniforms:Je([gt.lights,gt.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};On.physical={uniforms:Je([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new Ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new Ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new Ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};const Tr={r:0,b:0,g:0},C0=new pe,mu=new Gt;mu.set(-1,0,0,0,1,0,0,0,1);function P0(n,t,e,i,s,r){const o=new Bt(0);let a=s===!0?0:1,c,l,d=null,f=0,u=null;function m(M){let E=M.isScene===!0?M.background:null;if(E&&E.isTexture){const w=M.backgroundBlurriness>0;E=t.get(E,w)}return E}function p(M){let E=!1;const w=m(M);w===null?g(o,a):w&&w.isColor&&(g(w,1),E=!0);const D=n.xr.getEnvironmentBlendMode();D==="additive"?e.buffers.color.setClear(0,0,0,1,r):D==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(M,E){const w=m(E);w&&(w.isCubeTexture||w.mapping===so)?(l===void 0&&(l=new Kt(new Ne(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:xs(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(D,P,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=w,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(C0.makeRotationFromEuler(E.backgroundRotation)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(mu),l.material.toneMapped=ee.getTransfer(w.colorSpace)!==le,(d!==w||f!==w.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,d=w,f=w.version,u=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new Kt(new oo(2,2),new Vn({name:"BackgroundMaterial",uniforms:xs(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:Si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=ee.getTransfer(w.colorSpace)!==le,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(d!==w||f!==w.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=w,f=w.version,u=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function g(M,E){M.getRGB(Tr,cu(n)),e.buffers.color.setClear(Tr.r,Tr.g,Tr.b,E,r)}function h(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,E=1){o.set(M),a=E,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,g(o,a)},render:p,addToRenderList:x,dispose:h}}function L0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,o=!1;function a(R,C,L,V,I){let B=!1;const z=f(R,V,L,C);r!==z&&(r=z,l(r.object)),B=m(R,V,L,I),B&&p(R,V,L,I),I!==null&&t.update(I,n.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,w(R,C,L,V),I!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(I).buffer))}function c(){return n.createVertexArray()}function l(R){return n.bindVertexArray(R)}function d(R){return n.deleteVertexArray(R)}function f(R,C,L,V){const I=V.wireframe===!0;let B=i[C.id];B===void 0&&(B={},i[C.id]=B);const z=R.isInstancedMesh===!0?R.id:0;let K=B[z];K===void 0&&(K={},B[z]=K);let nt=K[L.id];nt===void 0&&(nt={},K[L.id]=nt);let ft=nt[I];return ft===void 0&&(ft=u(c()),nt[I]=ft),ft}function u(R){const C=[],L=[],V=[];for(let I=0;I<e;I++)C[I]=0,L[I]=0,V[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:L,attributeDivisors:V,object:R,attributes:{},index:null}}function m(R,C,L,V){const I=r.attributes,B=C.attributes;let z=0;const K=L.getAttributes();for(const nt in K)if(K[nt].location>=0){const Et=I[nt];let Ct=B[nt];if(Ct===void 0&&(nt==="instanceMatrix"&&R.instanceMatrix&&(Ct=R.instanceMatrix),nt==="instanceColor"&&R.instanceColor&&(Ct=R.instanceColor)),Et===void 0||Et.attribute!==Ct||Ct&&Et.data!==Ct.data)return!0;z++}return r.attributesNum!==z||r.index!==V}function p(R,C,L,V){const I={},B=C.attributes;let z=0;const K=L.getAttributes();for(const nt in K)if(K[nt].location>=0){let Et=B[nt];Et===void 0&&(nt==="instanceMatrix"&&R.instanceMatrix&&(Et=R.instanceMatrix),nt==="instanceColor"&&R.instanceColor&&(Et=R.instanceColor));const Ct={};Ct.attribute=Et,Et&&Et.data&&(Ct.data=Et.data),I[nt]=Ct,z++}r.attributes=I,r.attributesNum=z,r.index=V}function x(){const R=r.newAttributes;for(let C=0,L=R.length;C<L;C++)R[C]=0}function g(R){h(R,0)}function h(R,C){const L=r.newAttributes,V=r.enabledAttributes,I=r.attributeDivisors;L[R]=1,V[R]===0&&(n.enableVertexAttribArray(R),V[R]=1),I[R]!==C&&(n.vertexAttribDivisor(R,C),I[R]=C)}function M(){const R=r.newAttributes,C=r.enabledAttributes;for(let L=0,V=C.length;L<V;L++)C[L]!==R[L]&&(n.disableVertexAttribArray(L),C[L]=0)}function E(R,C,L,V,I,B,z){z===!0?n.vertexAttribIPointer(R,C,L,I,B):n.vertexAttribPointer(R,C,L,V,I,B)}function w(R,C,L,V){x();const I=V.attributes,B=L.getAttributes(),z=C.defaultAttributeValues;for(const K in B){const nt=B[K];if(nt.location>=0){let ft=I[K];if(ft===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(ft=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(ft=R.instanceColor)),ft!==void 0){const Et=ft.normalized,Ct=ft.itemSize,st=t.get(ft);if(st===void 0)continue;const St=st.buffer,vt=st.type,$=st.bytesPerElement,_t=vt===n.INT||vt===n.UNSIGNED_INT||ft.gpuType===ll;if(ft.isInterleavedBufferAttribute){const lt=ft.data,Nt=lt.stride,kt=ft.offset;if(lt.isInstancedInterleavedBuffer){for(let Ot=0;Ot<nt.locationSize;Ot++)h(nt.location+Ot,lt.meshPerAttribute);R.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Ot=0;Ot<nt.locationSize;Ot++)g(nt.location+Ot);n.bindBuffer(n.ARRAY_BUFFER,St);for(let Ot=0;Ot<nt.locationSize;Ot++)E(nt.location+Ot,Ct/nt.locationSize,vt,Et,Nt*$,(kt+Ct/nt.locationSize*Ot)*$,_t)}else{if(ft.isInstancedBufferAttribute){for(let lt=0;lt<nt.locationSize;lt++)h(nt.location+lt,ft.meshPerAttribute);R.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let lt=0;lt<nt.locationSize;lt++)g(nt.location+lt);n.bindBuffer(n.ARRAY_BUFFER,St);for(let lt=0;lt<nt.locationSize;lt++)E(nt.location+lt,Ct/nt.locationSize,vt,Et,Ct*$,Ct/nt.locationSize*lt*$,_t)}}else if(z!==void 0){const Et=z[K];if(Et!==void 0)switch(Et.length){case 2:n.vertexAttrib2fv(nt.location,Et);break;case 3:n.vertexAttrib3fv(nt.location,Et);break;case 4:n.vertexAttrib4fv(nt.location,Et);break;default:n.vertexAttrib1fv(nt.location,Et)}}}}M()}function D(){S();for(const R in i){const C=i[R];for(const L in C){const V=C[L];for(const I in V){const B=V[I];for(const z in B)d(B[z].object),delete B[z];delete V[I]}}delete i[R]}}function P(R){if(i[R.id]===void 0)return;const C=i[R.id];for(const L in C){const V=C[L];for(const I in V){const B=V[I];for(const z in B)d(B[z].object),delete B[z];delete V[I]}}delete i[R.id]}function y(R){for(const C in i){const L=i[C];for(const V in L){const I=L[V];if(I[R.id]===void 0)continue;const B=I[R.id];for(const z in B)d(B[z].object),delete B[z];delete I[R.id]}}}function _(R){for(const C in i){const L=i[C],V=R.isInstancedMesh===!0?R.id:0,I=L[V];if(I!==void 0){for(const B in I){const z=I[B];for(const K in z)d(z[K].object),delete z[K];delete I[B]}delete L[V],Object.keys(L).length===0&&delete i[C]}}}function S(){A(),o=!0,r!==s&&(r=s,l(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:S,resetDefaultState:A,dispose:D,releaseStatesOfGeometry:P,releaseStatesOfObject:_,releaseStatesOfProgram:y,initAttributes:x,enableAttribute:g,disableUnusedAttributes:M}}function D0(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function o(c,l,d){d!==0&&(n.drawArraysInstanced(i,c,l,d),e.update(l,i,d))}function a(c,l,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,d);let u=0;for(let m=0;m<d;m++)u+=l[m];e.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function I0(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const y=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(y){return!(y!==An&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(y){const _=y===ii&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(y!==pn&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&y!==wn&&!_)}function c(y){if(y==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const d=c(l);d!==l&&(Ut("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const f=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Ut("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),w=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),D=n.getParameter(n.MAX_SAMPLES),P=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:h,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:w,maxSamples:D,samples:P}}function U0(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new Kn,a=new Gt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const m=f.length!==0||u||i!==0||s;return s=u,i=f.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=d(f,u,0)},this.setState=function(f,u,m){const p=f.clippingPlanes,x=f.clipIntersection,g=f.clipShadows,h=n.get(f);if(!s||p===null||p.length===0||r&&!g)r?d(null):l();else{const M=r?0:i,E=M*4;let w=h.clippingState||null;c.value=w,w=d(p,u,E,m);for(let D=0;D!==E;++D)w[D]=e[D];h.clippingState=w,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(f,u,m,p){const x=f!==null?f.length:0;let g=null;if(x!==0){if(g=c.value,p!==!0||g===null){const h=m+x*4,M=u.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<h)&&(g=new Float32Array(h));for(let E=0,w=m;E!==x;++E,w+=4)o.copy(f[E]).applyMatrix4(M,a),o.normal.toArray(g,w),g[w+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}const Mi=4,Oc=[.125,.215,.35,.446,.526,.582],Di=20,N0=256,Is=new Tl,zc=new Bt;let Wo=null,Xo=0,qo=0,$o=!1;const F0=new N;class Ka{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=F0}=r;Wo=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),qo=this._renderer.getActiveMipmapLevel(),$o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Wo,Xo,qo),this._renderer.xr.enabled=$o,t.scissorTest=!1,rs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Oi||t.mapping===ms?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Wo=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),qo=this._renderer.getActiveMipmapLevel(),$o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ye,minFilter:Ye,generateMipmaps:!1,type:ii,format:An,colorSpace:Yr,depthBuffer:!1},s=Bc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bc(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=O0(r)),this._blurMaterial=B0(r,t,e),this._ggxMaterial=z0(r,t,e)}return s}_compileMaterial(t){const e=new Kt(new sn,t);this._renderer.compile(e,Is)}_sceneToCubeUV(t,e,i,s,r){const c=new hn(90,1,e,i),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,m=f.toneMapping;f.getClearColor(zc),f.toneMapping=Bn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Kt(new Ne,new gs({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let h=!1;const M=t.background;M?M.isColor&&(g.color.copy(M),t.background=null,h=!0):(g.color.copy(zc),h=!0);for(let E=0;E<6;E++){const w=E%3;w===0?(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+d[E],r.y,r.z)):w===1?(c.up.set(0,0,l[E]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+d[E],r.z)):(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+d[E]));const D=this._cubeSize;rs(s,w*D,E>2?D:0,D,D),f.setRenderTarget(s),h&&f.render(x,c),f.render(t,c)}f.toneMapping=m,f.autoClear=u,t.background=M}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Oi||t.mapping===ms;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;rs(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,Is)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const c=o.uniforms,l=i/(this._lodMeshes.length-1),d=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-d*d),u=0+l*1.25,m=f*u,{_lodMax:p}=this,x=this._sizeLods[i],g=3*x*(i>p-Mi?i-p+Mi:0),h=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=m,c.mipInt.value=p-e,rs(r,g,h,3*x,2*x),s.setRenderTarget(r),s.render(a,Is),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=p-i,rs(t,g,h,3*x,2*x),s.setRenderTarget(t),s.render(a,Is)}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&ne("blur direction must be either latitudinal or longitudinal!");const d=3,f=this._lodMeshes[s];f.material=l;const u=l.uniforms,m=this._sizeLods[i]-1,p=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Di-1),x=r/p,g=isFinite(r)?1+Math.floor(d*x):Di;g>Di&&Ut(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Di}`);const h=[];let M=0;for(let y=0;y<Di;++y){const _=y/x,S=Math.exp(-_*_/2);h.push(S),y===0?M+=S:y<g&&(M+=2*S)}for(let y=0;y<h.length;y++)h[y]=h[y]/M;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=h,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:E}=this;u.dTheta.value=p,u.mipInt.value=E-i;const w=this._sizeLods[s],D=3*w*(s>E-Mi?s-E+Mi:0),P=4*(this._cubeSize-w);rs(e,D,P,3*w,2*w),c.setRenderTarget(e),c.render(f,Is)}}function O0(n){const t=[],e=[],i=[];let s=n;const r=n-Mi+1+Oc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>n-Mi?c=Oc[o-n+Mi-1]:o===0&&(c=0),e.push(c);const l=1/(a-2),d=-l,f=1+l,u=[d,d,f,d,f,f,d,d,f,f,d,f],m=6,p=6,x=3,g=2,h=1,M=new Float32Array(x*p*m),E=new Float32Array(g*p*m),w=new Float32Array(h*p*m);for(let P=0;P<m;P++){const y=P%3*2/3-1,_=P>2?0:-1,S=[y,_,0,y+2/3,_,0,y+2/3,_+1,0,y,_,0,y+2/3,_+1,0,y,_+1,0];M.set(S,x*p*P),E.set(u,g*p*P);const A=[P,P,P,P,P,P];w.set(A,h*p*P)}const D=new sn;D.setAttribute("position",new Sn(M,x)),D.setAttribute("uv",new Sn(E,g)),D.setAttribute("faceIndex",new Sn(w,h)),i.push(new Kt(D,null)),s>Mi&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function Bc(n,t,e){const i=new kn(n,t,e);return i.texture.mapping=so,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function rs(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function z0(n,t,e){return new Vn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:N0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:lo(),fragmentShader:`

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
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function B0(n,t,e){const i=new Float32Array(Di),s=new N(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:lo(),fragmentShader:`

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
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function kc(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lo(),fragmentShader:`

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
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Gc(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function lo(){return`

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
	`}class gu extends kn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new au(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ne(5,5,5),r=new Vn({name:"CubemapFromEquirect",uniforms:xs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:en,blending:Qn});r.uniforms.tEquirect.value=e;const o=new Kt(s,r),a=e.minFilter;return e.minFilter===Ii&&(e.minFilter=Ye),new Vf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}function k0(n){let t=new WeakMap,e=new WeakMap,i=null;function s(u,m=!1){return u==null?null:m?o(u):r(u)}function r(u){if(u&&u.isTexture){const m=u.mapping;if(m===_o||m===xo)if(t.has(u)){const p=t.get(u).texture;return a(p,u.mapping)}else{const p=u.image;if(p&&p.height>0){const x=new gu(p.height);return x.fromEquirectangularTexture(n,u),t.set(u,x),u.addEventListener("dispose",l),a(x.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){const m=u.mapping,p=m===_o||m===xo,x=m===Oi||m===ms;if(p||x){let g=e.get(u);const h=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==h)return i===null&&(i=new Ka(n)),g=p?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{const M=u.image;return p&&M&&M.height>0||x&&M&&c(M)?(i===null&&(i=new Ka(n)),g=p?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",d),g.texture):null}}}return u}function a(u,m){return m===_o?u.mapping=Oi:m===xo&&(u.mapping=ms),u}function c(u){let m=0;const p=6;for(let x=0;x<p;x++)u[x]!==void 0&&m++;return m===p}function l(u){const m=u.target;m.removeEventListener("dispose",l);const p=t.get(m);p!==void 0&&(t.delete(m),p.dispose())}function d(u){const m=u.target;m.removeEventListener("dispose",d);const p=e.get(m);p!==void 0&&(e.delete(m),p.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function G0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&$a("WebGLRenderer: "+i+" extension not supported."),s}}}function H0(n,t,e,i){const s={},r=new WeakMap;function o(f){const u=f.target;u.index!==null&&t.remove(u.index);for(const p in u.attributes)t.remove(u.attributes[p]);u.removeEventListener("dispose",o),delete s[u.id];const m=r.get(u);m&&(t.remove(m),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(f,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function c(f){const u=f.attributes;for(const m in u)t.update(u[m],n.ARRAY_BUFFER)}function l(f){const u=[],m=f.index,p=f.attributes.position;let x=0;if(p===void 0)return;if(m!==null){const M=m.array;x=m.version;for(let E=0,w=M.length;E<w;E+=3){const D=M[E+0],P=M[E+1],y=M[E+2];u.push(D,P,P,y,y,D)}}else{const M=p.array;x=p.version;for(let E=0,w=M.length/3-1;E<w;E+=3){const D=E+0,P=E+1,y=E+2;u.push(D,P,P,y,y,D)}}const g=new(p.count>=65535?su:iu)(u,1);g.version=x;const h=r.get(f);h&&t.remove(h),r.set(f,g)}function d(f){const u=r.get(f);if(u){const m=f.index;m!==null&&u.version<m.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:d}}function V0(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,u){n.drawElements(i,u,r,f*o),e.update(u,i,1)}function l(f,u,m){m!==0&&(n.drawElementsInstanced(i,u,r,f*o,m),e.update(u,i,m))}function d(f,u,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,f,0,m);let x=0;for(let g=0;g<m;g++)x+=u[g];e.update(x,i,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function W0(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:ne("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function X0(n,t,e){const i=new WeakMap,s=new Re;function r(o,a,c){const l=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=d!==void 0?d.length:0;let u=i.get(a);if(u===void 0||u.count!==f){let A=function(){_.dispose(),i.delete(a),a.removeEventListener("dispose",A)};var m=A;u!==void 0&&u.texture.dispose();const p=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let w=0;p===!0&&(w=1),x===!0&&(w=2),g===!0&&(w=3);let D=a.attributes.position.count*w,P=1;D>t.maxTextureSize&&(P=Math.ceil(D/t.maxTextureSize),D=t.maxTextureSize);const y=new Float32Array(D*P*4*f),_=new tu(y,D,P,f);_.type=wn,_.needsUpdate=!0;const S=w*4;for(let R=0;R<f;R++){const C=h[R],L=M[R],V=E[R],I=D*P*4*R;for(let B=0;B<C.count;B++){const z=B*S;p===!0&&(s.fromBufferAttribute(C,B),y[I+z+0]=s.x,y[I+z+1]=s.y,y[I+z+2]=s.z,y[I+z+3]=0),x===!0&&(s.fromBufferAttribute(L,B),y[I+z+4]=s.x,y[I+z+5]=s.y,y[I+z+6]=s.z,y[I+z+7]=0),g===!0&&(s.fromBufferAttribute(V,B),y[I+z+8]=s.x,y[I+z+9]=s.y,y[I+z+10]=s.z,y[I+z+11]=V.itemSize===4?s.w:1)}}u={count:f,texture:_,size:new Ft(D,P)},i.set(a,u),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let p=0;for(let g=0;g<l.length;g++)p+=l[g];const x=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function q0(n,t,e,i,s){let r=new WeakMap;function o(l){const d=s.render.frame,f=l.geometry,u=t.get(l,f);if(r.get(u)!==d&&(t.update(u),r.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==d&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){const m=l.skeleton;r.get(m)!==d&&(m.update(),r.set(m,d))}return u}function a(){r=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),i.releaseStatesOfObject(d),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:o,dispose:a}}const $0={[kd]:"LINEAR_TONE_MAPPING",[Gd]:"REINHARD_TONE_MAPPING",[Hd]:"CINEON_TONE_MAPPING",[Vd]:"ACES_FILMIC_TONE_MAPPING",[Xd]:"AGX_TONE_MAPPING",[al]:"NEUTRAL_TONE_MAPPING",[Wd]:"CUSTOM_TONE_MAPPING"};function Y0(n,t,e,i,s){const r=new kn(t,e,{type:n,depthBuffer:i,stencilBuffer:s,depthTexture:i?new _s(t,e):void 0}),o=new kn(t,e,{type:ii,depthBuffer:!1,stencilBuffer:!1}),a=new sn;a.setAttribute("position",new Ie([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Ie([0,2,0,0,2,0],2));const c=new Nf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new Kt(a,c),d=new Tl(-1,1,1,-1,0,1);let f=null,u=null,m=!1,p,x=null,g=[],h=!1;this.setSize=function(M,E){r.setSize(M,E),o.setSize(M,E);for(let w=0;w<g.length;w++){const D=g[w];D.setSize&&D.setSize(M,E)}},this.setEffects=function(M){g=M,h=g.length>0&&g[0].isRenderPass===!0;const E=r.width,w=r.height;for(let D=0;D<g.length;D++){const P=g[D];P.setSize&&P.setSize(E,w)}},this.begin=function(M,E){if(m||M.toneMapping===Bn&&g.length===0)return!1;if(x=E,E!==null){const w=E.width,D=E.height;(r.width!==w||r.height!==D)&&this.setSize(w,D)}return h===!1&&M.setRenderTarget(r),p=M.toneMapping,M.toneMapping=Bn,!0},this.hasRenderPass=function(){return h},this.end=function(M,E){M.toneMapping=p,m=!0;let w=r,D=o;for(let P=0;P<g.length;P++){const y=g[P];if(y.enabled!==!1&&(y.render(M,D,w,E),y.needsSwap!==!1)){const _=w;w=D,D=_}}if(f!==M.outputColorSpace||u!==M.toneMapping){f=M.outputColorSpace,u=M.toneMapping,c.defines={},ee.getTransfer(f)===le&&(c.defines.SRGB_TRANSFER="");const P=$0[u];P&&(c.defines[P]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,M.setRenderTarget(x),M.render(l,d),x=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),a.dispose(),c.dispose()}}const _u=new Ke,Za=new _s(1,1),xu=new tu,vu=new cf,Mu=new au,Hc=[],Vc=[],Wc=new Float32Array(16),Xc=new Float32Array(9),qc=new Float32Array(4);function ys(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Hc[s];if(r===void 0&&(r=new Float32Array(s),Hc[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Be(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function ke(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function co(n,t){let e=Vc[t];e===void 0&&(e=new Int32Array(t),Vc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function j0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function K0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2fv(this.addr,t),ke(e,t)}}function Z0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;n.uniform3fv(this.addr,t),ke(e,t)}}function J0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4fv(this.addr,t),ke(e,t)}}function Q0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),ke(e,t)}else{if(Be(e,i))return;qc.set(i),n.uniformMatrix2fv(this.addr,!1,qc),ke(e,i)}}function tg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),ke(e,t)}else{if(Be(e,i))return;Xc.set(i),n.uniformMatrix3fv(this.addr,!1,Xc),ke(e,i)}}function eg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),ke(e,t)}else{if(Be(e,i))return;Wc.set(i),n.uniformMatrix4fv(this.addr,!1,Wc),ke(e,i)}}function ng(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function ig(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2iv(this.addr,t),ke(e,t)}}function sg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;n.uniform3iv(this.addr,t),ke(e,t)}}function rg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4iv(this.addr,t),ke(e,t)}}function og(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function ag(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2uiv(this.addr,t),ke(e,t)}}function lg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;n.uniform3uiv(this.addr,t),ke(e,t)}}function cg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4uiv(this.addr,t),ke(e,t)}}function dg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Za.compareFunction=e.isReversedDepthBuffer()?gl:ml,r=Za):r=_u,e.setTexture2D(t||r,s)}function ug(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||vu,s)}function hg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Mu,s)}function fg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||xu,s)}function pg(n){switch(n){case 5126:return j0;case 35664:return K0;case 35665:return Z0;case 35666:return J0;case 35674:return Q0;case 35675:return tg;case 35676:return eg;case 5124:case 35670:return ng;case 35667:case 35671:return ig;case 35668:case 35672:return sg;case 35669:case 35673:return rg;case 5125:return og;case 36294:return ag;case 36295:return lg;case 36296:return cg;case 35678:case 36198:case 36298:case 36306:case 35682:return dg;case 35679:case 36299:case 36307:return ug;case 35680:case 36300:case 36308:case 36293:return hg;case 36289:case 36303:case 36311:case 36292:return fg}}function mg(n,t){n.uniform1fv(this.addr,t)}function gg(n,t){const e=ys(t,this.size,2);n.uniform2fv(this.addr,e)}function _g(n,t){const e=ys(t,this.size,3);n.uniform3fv(this.addr,e)}function xg(n,t){const e=ys(t,this.size,4);n.uniform4fv(this.addr,e)}function vg(n,t){const e=ys(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Mg(n,t){const e=ys(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Sg(n,t){const e=ys(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function bg(n,t){n.uniform1iv(this.addr,t)}function yg(n,t){n.uniform2iv(this.addr,t)}function Eg(n,t){n.uniform3iv(this.addr,t)}function Tg(n,t){n.uniform4iv(this.addr,t)}function wg(n,t){n.uniform1uiv(this.addr,t)}function Ag(n,t){n.uniform2uiv(this.addr,t)}function Rg(n,t){n.uniform3uiv(this.addr,t)}function Cg(n,t){n.uniform4uiv(this.addr,t)}function Pg(n,t,e){const i=this.cache,s=t.length,r=co(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ke(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Za:o=_u;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function Lg(n,t,e){const i=this.cache,s=t.length,r=co(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ke(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||vu,r[o])}function Dg(n,t,e){const i=this.cache,s=t.length,r=co(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ke(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Mu,r[o])}function Ig(n,t,e){const i=this.cache,s=t.length,r=co(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ke(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||xu,r[o])}function Ug(n){switch(n){case 5126:return mg;case 35664:return gg;case 35665:return _g;case 35666:return xg;case 35674:return vg;case 35675:return Mg;case 35676:return Sg;case 5124:case 35670:return bg;case 35667:case 35671:return yg;case 35668:case 35672:return Eg;case 35669:case 35673:return Tg;case 5125:return wg;case 36294:return Ag;case 36295:return Rg;case 36296:return Cg;case 35678:case 36198:case 36298:case 36306:case 35682:return Pg;case 35679:case 36299:case 36307:return Lg;case 35680:case 36300:case 36308:case 36293:return Dg;case 36289:case 36303:case 36311:case 36292:return Ig}}class Ng{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=pg(e.type)}}class Fg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ug(e.type)}}class Og{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const Yo=/(\w+)(\])?(\[|\.)?/g;function $c(n,t){n.seq.push(t),n.map[t.id]=t}function zg(n,t,e){const i=n.name,s=i.length;for(Yo.lastIndex=0;;){const r=Yo.exec(i),o=Yo.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){$c(e,l===void 0?new Ng(a,n,t):new Fg(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new Og(a),$c(e,f)),e=f}}}class Gr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);zg(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Yc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Bg=37297;let kg=0;function Gg(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const jc=new Gt;function Hg(n){ee._getMatrix(jc,ee.workingColorSpace,n);const t=`mat3( ${jc.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(n)){case jr:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return Ut("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Kc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Gg(n.getShaderSource(t),a)}else return r}function Vg(n,t){const e=Hg(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const Wg={[kd]:"Linear",[Gd]:"Reinhard",[Hd]:"Cineon",[Vd]:"ACESFilmic",[Xd]:"AgX",[al]:"Neutral",[Wd]:"Custom"};function Xg(n,t){const e=Wg[t];return e===void 0?(Ut("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const wr=new N;function qg(){ee.getLuminanceCoefficients(wr);const n=wr.x.toFixed(4),t=wr.y.toFixed(4),e=wr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $g(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Os).join(`
`)}function Yg(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function jg(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Os(n){return n!==""}function Zc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Jc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Kg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ja(n){return n.replace(Kg,Jg)}const Zg=new Map;function Jg(n,t){let e=qt[t];if(e===void 0){const i=Zg.get(t);if(i!==void 0)e=qt[i],Ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ja(e)}const Qg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qc(n){return n.replace(Qg,t_)}function t_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function td(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}const e_={[Bs]:"SHADOWMAP_TYPE_PCF",[Fs]:"SHADOWMAP_TYPE_VSM"};function n_(n){return e_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const i_={[Oi]:"ENVMAP_TYPE_CUBE",[ms]:"ENVMAP_TYPE_CUBE",[so]:"ENVMAP_TYPE_CUBE_UV"};function s_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":i_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const r_={[ms]:"ENVMAP_MODE_REFRACTION"};function o_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":r_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const a_={[ol]:"ENVMAP_BLENDING_MULTIPLY",[wh]:"ENVMAP_BLENDING_MIX",[Ah]:"ENVMAP_BLENDING_ADD"};function l_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":a_[n.combine]||"ENVMAP_BLENDING_NONE"}function c_(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function d_(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=n_(e),l=s_(e),d=o_(e),f=l_(e),u=c_(e),m=$g(e),p=Yg(r),x=s.createProgram();let g,h,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Os).join(`
`),g.length>0&&(g+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Os).join(`
`),h.length>0&&(h+=`
`)):(g=[td(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Os).join(`
`),h=[td(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+d:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Bn?"#define TONE_MAPPING":"",e.toneMapping!==Bn?qt.tonemapping_pars_fragment:"",e.toneMapping!==Bn?Xg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,Vg("linearToOutputTexel",e.outputColorSpace),qg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Os).join(`
`)),o=Ja(o),o=Zc(o,e),o=Jc(o,e),a=Ja(a),a=Zc(a,e),a=Jc(a,e),o=Qc(o),a=Qc(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,h=["#define varying in",e.glslVersion===ic?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ic?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const E=M+g+o,w=M+h+a,D=Yc(s,s.VERTEX_SHADER,E),P=Yc(s,s.FRAGMENT_SHADER,w);s.attachShader(x,D),s.attachShader(x,P),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function y(R){if(n.debug.checkShaderErrors){const C=s.getProgramInfoLog(x)||"",L=s.getShaderInfoLog(D)||"",V=s.getShaderInfoLog(P)||"",I=C.trim(),B=L.trim(),z=V.trim();let K=!0,nt=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,D,P);else{const ft=Kc(s,D,"vertex"),Et=Kc(s,P,"fragment");ne("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+I+`
`+ft+`
`+Et)}else I!==""?Ut("WebGLProgram: Program Info Log:",I):(B===""||z==="")&&(nt=!1);nt&&(R.diagnostics={runnable:K,programLog:I,vertexShader:{log:B,prefix:g},fragmentShader:{log:z,prefix:h}})}s.deleteShader(D),s.deleteShader(P),_=new Gr(s,x),S=jg(s,x)}let _;this.getUniforms=function(){return _===void 0&&y(this),_};let S;this.getAttributes=function(){return S===void 0&&y(this),S};let A=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(x,Bg)),A},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=kg++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=D,this.fragmentShader=P,this}let u_=0;class h_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new f_(t),e.set(t,i)),i}}class f_{constructor(t){this.id=u_++,this.code=t,this.usedTimes=0}}function p_(n){return n===zi||n===Xr||n===qr}function m_(n,t,e,i,s,r){const o=new vl,a=new h_,c=new Set,l=[],d=new Map,f=i.logarithmicDepthBuffer;let u=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return c.add(_),_===0?"uv":`uv${_}`}function x(_,S,A,R,C,L){const V=R.fog,I=C.geometry,B=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?R.environment:null,z=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,K=t.get(_.envMap||B,z),nt=K&&K.mapping===so?K.image.height:null,ft=m[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&Ut("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const Et=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Ct=Et!==void 0?Et.length:0;let st=0;I.morphAttributes.position!==void 0&&(st=1),I.morphAttributes.normal!==void 0&&(st=2),I.morphAttributes.color!==void 0&&(st=3);let St,vt,$,_t;if(ft){const Ht=On[ft];St=Ht.vertexShader,vt=Ht.fragmentShader}else St=_.vertexShader,vt=_.fragmentShader,a.update(_),$=a.getVertexShaderID(_),_t=a.getFragmentShaderID(_);const lt=n.getRenderTarget(),Nt=n.state.buffers.depth.getReversed(),kt=C.isInstancedMesh===!0,Ot=C.isBatchedMesh===!0,ye=!!_.map,Qt=!!_.matcap,de=!!K,ve=!!_.aoMap,jt=!!_.lightMap,Fe=!!_.bumpMap,Ee=!!_.normalMap,ln=!!_.displacementMap,F=!!_.emissiveMap,Oe=!!_.metalnessMap,te=!!_.roughnessMap,_e=_.anisotropy>0,mt=_.clearcoat>0,we=_.dispersion>0,T=_.iridescence>0,v=_.sheen>0,k=_.transmission>0,Z=_e&&!!_.anisotropyMap,it=mt&&!!_.clearcoatMap,rt=mt&&!!_.clearcoatNormalMap,ht=mt&&!!_.clearcoatRoughnessMap,Y=T&&!!_.iridescenceMap,Q=T&&!!_.iridescenceThicknessMap,bt=v&&!!_.sheenColorMap,wt=v&&!!_.sheenRoughnessMap,ct=!!_.specularMap,ot=!!_.specularColorMap,zt=!!_.specularIntensityMap,Wt=k&&!!_.transmissionMap,oe=k&&!!_.thicknessMap,U=!!_.gradientMap,at=!!_.alphaMap,j=_.alphaTest>0,yt=!!_.alphaHash,dt=!!_.extensions;let et=Bn;_.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(et=n.toneMapping);const Lt={shaderID:ft,shaderType:_.type,shaderName:_.name,vertexShader:St,fragmentShader:vt,defines:_.defines,customVertexShaderID:$,customFragmentShaderID:_t,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:Ot,batchingColor:Ot&&C._colorsTexture!==null,instancing:kt,instancingColor:kt&&C.instanceColor!==null,instancingMorph:kt&&C.morphTexture!==null,outputColorSpace:lt===null?n.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:ee.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ye,matcap:Qt,envMap:de,envMapMode:de&&K.mapping,envMapCubeUVHeight:nt,aoMap:ve,lightMap:jt,bumpMap:Fe,normalMap:Ee,displacementMap:ln,emissiveMap:F,normalMapObjectSpace:Ee&&_.normalMapType===Ph,normalMapTangentSpace:Ee&&_.normalMapType===$r,packedNormalMap:Ee&&_.normalMapType===$r&&p_(_.normalMap.format),metalnessMap:Oe,roughnessMap:te,anisotropy:_e,anisotropyMap:Z,clearcoat:mt,clearcoatMap:it,clearcoatNormalMap:rt,clearcoatRoughnessMap:ht,dispersion:we,iridescence:T,iridescenceMap:Y,iridescenceThicknessMap:Q,sheen:v,sheenColorMap:bt,sheenRoughnessMap:wt,specularMap:ct,specularColorMap:ot,specularIntensityMap:zt,transmission:k,transmissionMap:Wt,thicknessMap:oe,gradientMap:U,opaque:_.transparent===!1&&_.blending===hs&&_.alphaToCoverage===!1,alphaMap:at,alphaTest:j,alphaHash:yt,combine:_.combine,mapUv:ye&&p(_.map.channel),aoMapUv:ve&&p(_.aoMap.channel),lightMapUv:jt&&p(_.lightMap.channel),bumpMapUv:Fe&&p(_.bumpMap.channel),normalMapUv:Ee&&p(_.normalMap.channel),displacementMapUv:ln&&p(_.displacementMap.channel),emissiveMapUv:F&&p(_.emissiveMap.channel),metalnessMapUv:Oe&&p(_.metalnessMap.channel),roughnessMapUv:te&&p(_.roughnessMap.channel),anisotropyMapUv:Z&&p(_.anisotropyMap.channel),clearcoatMapUv:it&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:rt&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ht&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:bt&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:wt&&p(_.sheenRoughnessMap.channel),specularMapUv:ct&&p(_.specularMap.channel),specularColorMapUv:ot&&p(_.specularColorMap.channel),specularIntensityMapUv:zt&&p(_.specularIntensityMap.channel),transmissionMapUv:Wt&&p(_.transmissionMap.channel),thicknessMapUv:oe&&p(_.thicknessMap.channel),alphaMapUv:at&&p(_.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Ee||_e),vertexNormals:!!I.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!I.attributes.uv&&(ye||at),fog:!!V,useFog:_.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||I.attributes.normal===void 0&&Ee===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Nt,skinning:C.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:st,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:L.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:et,decodeVideoTexture:ye&&_.map.isVideoTexture===!0&&ee.getTransfer(_.map.colorSpace)===le,decodeVideoTextureEmissive:F&&_.emissiveMap.isVideoTexture===!0&&ee.getTransfer(_.emissiveMap.colorSpace)===le,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Zn,flipSided:_.side===en,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:dt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(dt&&_.extensions.multiDraw===!0||Ot)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Lt.vertexUv1s=c.has(1),Lt.vertexUv2s=c.has(2),Lt.vertexUv3s=c.has(3),c.clear(),Lt}function g(_){const S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(const A in _.defines)S.push(A),S.push(_.defines[A]);return _.isRawShaderMaterial===!1&&(h(S,_),M(S,_),S.push(n.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function h(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function M(_,S){o.disableAll(),S.instancing&&o.enable(0),S.instancingColor&&o.enable(1),S.instancingMorph&&o.enable(2),S.matcap&&o.enable(3),S.envMap&&o.enable(4),S.normalMapObjectSpace&&o.enable(5),S.normalMapTangentSpace&&o.enable(6),S.clearcoat&&o.enable(7),S.iridescence&&o.enable(8),S.alphaTest&&o.enable(9),S.vertexColors&&o.enable(10),S.vertexAlphas&&o.enable(11),S.vertexUv1s&&o.enable(12),S.vertexUv2s&&o.enable(13),S.vertexUv3s&&o.enable(14),S.vertexTangents&&o.enable(15),S.anisotropy&&o.enable(16),S.alphaHash&&o.enable(17),S.batching&&o.enable(18),S.dispersion&&o.enable(19),S.batchingColor&&o.enable(20),S.gradientMap&&o.enable(21),S.packedNormalMap&&o.enable(22),S.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),S.numLightProbeGrids>0&&o.enable(22),_.push(o.mask)}function E(_){const S=m[_.type];let A;if(S){const R=On[S];A=Df.clone(R.uniforms)}else A=_.uniforms;return A}function w(_,S){let A=d.get(S);return A!==void 0?++A.usedTimes:(A=new d_(n,S,_,s),l.push(A),d.set(S,A)),A}function D(_){if(--_.usedTimes===0){const S=l.indexOf(_);l[S]=l[l.length-1],l.pop(),d.delete(_.cacheKey),_.destroy()}}function P(_){a.remove(_)}function y(){a.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:E,acquireProgram:w,releaseProgram:D,releaseShaderCache:P,programs:l,dispose:y}}function g_(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function __(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function ed(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function nd(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function a(u,m,p,x,g,h){let M=n[t];return M===void 0?(M={id:u.id,object:u,geometry:m,material:p,materialVariant:o(u),groupOrder:x,renderOrder:u.renderOrder,z:g,group:h},n[t]=M):(M.id=u.id,M.object=u,M.geometry=m,M.material=p,M.materialVariant=o(u),M.groupOrder=x,M.renderOrder=u.renderOrder,M.z=g,M.group=h),t++,M}function c(u,m,p,x,g,h){const M=a(u,m,p,x,g,h);p.transmission>0?i.push(M):p.transparent===!0?s.push(M):e.push(M)}function l(u,m,p,x,g,h){const M=a(u,m,p,x,g,h);p.transmission>0?i.unshift(M):p.transparent===!0?s.unshift(M):e.unshift(M)}function d(u,m){e.length>1&&e.sort(u||__),i.length>1&&i.sort(m||ed),s.length>1&&s.sort(m||ed)}function f(){for(let u=t,m=n.length;u<m;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:d}}function x_(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new nd,n.set(i,[o])):s>=r.length?(o=new nd,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function v_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Bt};break;case"SpotLight":e={position:new N,direction:new N,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":e={color:new Bt,position:new N,halfWidth:new N,halfHeight:new N};break}return n[t.id]=e,e}}}function M_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let S_=0;function b_(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function y_(n){const t=new v_,e=M_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new N);const s=new N,r=new pe,o=new pe;function a(l){let d=0,f=0,u=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let m=0,p=0,x=0,g=0,h=0,M=0,E=0,w=0,D=0,P=0,y=0;l.sort(b_);for(let S=0,A=l.length;S<A;S++){const R=l[S],C=R.color,L=R.intensity,V=R.distance;let I=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===zi?I=R.shadow.map.texture:I=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)d+=C.r*L,f+=C.g*L,u+=C.b*L;else if(R.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(R.sh.coefficients[B],L);y++}else if(R.isDirectionalLight){const B=t.get(R);if(B.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const z=R.shadow,K=e.get(R);K.shadowIntensity=z.intensity,K.shadowBias=z.bias,K.shadowNormalBias=z.normalBias,K.shadowRadius=z.radius,K.shadowMapSize=z.mapSize,i.directionalShadow[m]=K,i.directionalShadowMap[m]=I,i.directionalShadowMatrix[m]=R.shadow.matrix,M++}i.directional[m]=B,m++}else if(R.isSpotLight){const B=t.get(R);B.position.setFromMatrixPosition(R.matrixWorld),B.color.copy(C).multiplyScalar(L),B.distance=V,B.coneCos=Math.cos(R.angle),B.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),B.decay=R.decay,i.spot[x]=B;const z=R.shadow;if(R.map&&(i.spotLightMap[D]=R.map,D++,z.updateMatrices(R),R.castShadow&&P++),i.spotLightMatrix[x]=z.matrix,R.castShadow){const K=e.get(R);K.shadowIntensity=z.intensity,K.shadowBias=z.bias,K.shadowNormalBias=z.normalBias,K.shadowRadius=z.radius,K.shadowMapSize=z.mapSize,i.spotShadow[x]=K,i.spotShadowMap[x]=I,w++}x++}else if(R.isRectAreaLight){const B=t.get(R);B.color.copy(C).multiplyScalar(L),B.halfWidth.set(R.width*.5,0,0),B.halfHeight.set(0,R.height*.5,0),i.rectArea[g]=B,g++}else if(R.isPointLight){const B=t.get(R);if(B.color.copy(R.color).multiplyScalar(R.intensity),B.distance=R.distance,B.decay=R.decay,R.castShadow){const z=R.shadow,K=e.get(R);K.shadowIntensity=z.intensity,K.shadowBias=z.bias,K.shadowNormalBias=z.normalBias,K.shadowRadius=z.radius,K.shadowMapSize=z.mapSize,K.shadowCameraNear=z.camera.near,K.shadowCameraFar=z.camera.far,i.pointShadow[p]=K,i.pointShadowMap[p]=I,i.pointShadowMatrix[p]=R.shadow.matrix,E++}i.point[p]=B,p++}else if(R.isHemisphereLight){const B=t.get(R);B.skyColor.copy(R.color).multiplyScalar(L),B.groundColor.copy(R.groundColor).multiplyScalar(L),i.hemi[h]=B,h++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=gt.LTC_FLOAT_1,i.rectAreaLTC2=gt.LTC_FLOAT_2):(i.rectAreaLTC1=gt.LTC_HALF_1,i.rectAreaLTC2=gt.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=u;const _=i.hash;(_.directionalLength!==m||_.pointLength!==p||_.spotLength!==x||_.rectAreaLength!==g||_.hemiLength!==h||_.numDirectionalShadows!==M||_.numPointShadows!==E||_.numSpotShadows!==w||_.numSpotMaps!==D||_.numLightProbes!==y)&&(i.directional.length=m,i.spot.length=x,i.rectArea.length=g,i.point.length=p,i.hemi.length=h,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=w+D-P,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=y,_.directionalLength=m,_.pointLength=p,_.spotLength=x,_.rectAreaLength=g,_.hemiLength=h,_.numDirectionalShadows=M,_.numPointShadows=E,_.numSpotShadows=w,_.numSpotMaps=D,_.numLightProbes=y,i.version=S_++)}function c(l,d){let f=0,u=0,m=0,p=0,x=0;const g=d.matrixWorldInverse;for(let h=0,M=l.length;h<M;h++){const E=l[h];if(E.isDirectionalLight){const w=i.directional[f];w.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),f++}else if(E.isSpotLight){const w=i.spot[m];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),m++}else if(E.isRectAreaLight){const w=i.rectArea[p];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(g),o.identity(),r.copy(E.matrixWorld),r.premultiply(g),o.extractRotation(r),w.halfWidth.set(E.width*.5,0,0),w.halfHeight.set(0,E.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),p++}else if(E.isPointLight){const w=i.point[u];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(g),u++}else if(E.isHemisphereLight){const w=i.hemi[x];w.direction.setFromMatrixPosition(E.matrixWorld),w.direction.transformDirection(g),x++}}}return{setup:a,setupView:c,state:i}}function id(n){const t=new y_(n),e=[],i=[],s=[];function r(u){f.camera=u,e.length=0,i.length=0,s.length=0}function o(u){e.push(u)}function a(u){i.push(u)}function c(u){s.push(u)}function l(){t.setup(e)}function d(u){t.setupView(e,u)}const f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:d,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function E_(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new id(n),t.set(s,[a])):r>=o.length?(a=new id(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const T_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,w_=`uniform sampler2D shadow_pass;
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
}`,A_=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],R_=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],sd=new pe,Us=new N,jo=new N;function C_(n,t,e){let i=new Sl;const s=new Ft,r=new Ft,o=new Re,a=new Of,c=new zf,l={},d=e.maxTextureSize,f={[Si]:en,[en]:Si,[Zn]:Zn},u=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ft},radius:{value:4}},vertexShader:T_,fragmentShader:w_}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const p=new sn;p.setAttribute("position",new Sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Kt(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bs;let h=this.type;this.render=function(P,y,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||P.length===0)return;this.type===ah&&(Ut("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Bs);const S=n.getRenderTarget(),A=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),C=n.state;C.setBlending(Qn),C.buffers.depth.getReversed()===!0?C.buffers.color.setClear(0,0,0,0):C.buffers.color.setClear(1,1,1,1),C.buffers.depth.setTest(!0),C.setScissorTest(!1);const L=h!==this.type;L&&y.traverse(function(V){V.material&&(Array.isArray(V.material)?V.material.forEach(I=>I.needsUpdate=!0):V.material.needsUpdate=!0)});for(let V=0,I=P.length;V<I;V++){const B=P[V],z=B.shadow;if(z===void 0){Ut("WebGLShadowMap:",B,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const K=z.getFrameExtents();s.multiply(K),r.copy(z.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/K.x),s.x=r.x*K.x,z.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/K.y),s.y=r.y*K.y,z.mapSize.y=r.y));const nt=n.state.buffers.depth.getReversed();if(z.camera._reversedDepth=nt,z.map===null||L===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Fs){if(B.isPointLight){Ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new kn(s.x,s.y,{format:zi,type:ii,minFilter:Ye,magFilter:Ye,generateMipmaps:!1}),z.map.texture.name=B.name+".shadowMap",z.map.depthTexture=new _s(s.x,s.y,wn),z.map.depthTexture.name=B.name+".shadowMapDepth",z.map.depthTexture.format=si,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=We,z.map.depthTexture.magFilter=We}else B.isPointLight?(z.map=new gu(s.x),z.map.depthTexture=new Pf(s.x,Gn)):(z.map=new kn(s.x,s.y),z.map.depthTexture=new _s(s.x,s.y,Gn)),z.map.depthTexture.name=B.name+".shadowMap",z.map.depthTexture.format=si,this.type===Bs?(z.map.depthTexture.compareFunction=nt?gl:ml,z.map.depthTexture.minFilter=Ye,z.map.depthTexture.magFilter=Ye):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=We,z.map.depthTexture.magFilter=We);z.camera.updateProjectionMatrix()}const ft=z.map.isWebGLCubeRenderTarget?6:1;for(let Et=0;Et<ft;Et++){if(z.map.isWebGLCubeRenderTarget)n.setRenderTarget(z.map,Et),n.clear();else{Et===0&&(n.setRenderTarget(z.map),n.clear());const Ct=z.getViewport(Et);o.set(r.x*Ct.x,r.y*Ct.y,r.x*Ct.z,r.y*Ct.w),C.viewport(o)}if(B.isPointLight){const Ct=z.camera,st=z.matrix,St=B.distance||Ct.far;St!==Ct.far&&(Ct.far=St,Ct.updateProjectionMatrix()),Us.setFromMatrixPosition(B.matrixWorld),Ct.position.copy(Us),jo.copy(Ct.position),jo.add(A_[Et]),Ct.up.copy(R_[Et]),Ct.lookAt(jo),Ct.updateMatrixWorld(),st.makeTranslation(-Us.x,-Us.y,-Us.z),sd.multiplyMatrices(Ct.projectionMatrix,Ct.matrixWorldInverse),z._frustum.setFromProjectionMatrix(sd,Ct.coordinateSystem,Ct.reversedDepth)}else z.updateMatrices(B);i=z.getFrustum(),w(y,_,z.camera,B,this.type)}z.isPointLightShadow!==!0&&this.type===Fs&&M(z,_),z.needsUpdate=!1}h=this.type,g.needsUpdate=!1,n.setRenderTarget(S,A,R)};function M(P,y){const _=t.update(x);u.defines.VSM_SAMPLES!==P.blurSamples&&(u.defines.VSM_SAMPLES=P.blurSamples,m.defines.VSM_SAMPLES=P.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new kn(s.x,s.y,{format:zi,type:ii})),u.uniforms.shadow_pass.value=P.map.depthTexture,u.uniforms.resolution.value=P.mapSize,u.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(y,null,_,u,x,null),m.uniforms.shadow_pass.value=P.mapPass.texture,m.uniforms.resolution.value=P.mapSize,m.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(y,null,_,m,x,null)}function E(P,y,_,S){let A=null;const R=_.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(R!==void 0)A=R;else if(A=_.isPointLight===!0?c:a,n.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){const C=A.uuid,L=y.uuid;let V=l[C];V===void 0&&(V={},l[C]=V);let I=V[L];I===void 0&&(I=A.clone(),V[L]=I,y.addEventListener("dispose",D)),A=I}if(A.visible=y.visible,A.wireframe=y.wireframe,S===Fs?A.side=y.shadowSide!==null?y.shadowSide:y.side:A.side=y.shadowSide!==null?y.shadowSide:f[y.side],A.alphaMap=y.alphaMap,A.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,A.map=y.map,A.clipShadows=y.clipShadows,A.clippingPlanes=y.clippingPlanes,A.clipIntersection=y.clipIntersection,A.displacementMap=y.displacementMap,A.displacementScale=y.displacementScale,A.displacementBias=y.displacementBias,A.wireframeLinewidth=y.wireframeLinewidth,A.linewidth=y.linewidth,_.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const C=n.properties.get(A);C.light=_}return A}function w(P,y,_,S,A){if(P.visible===!1)return;if(P.layers.test(y.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&A===Fs)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,P.matrixWorld);const L=t.update(P),V=P.material;if(Array.isArray(V)){const I=L.groups;for(let B=0,z=I.length;B<z;B++){const K=I[B],nt=V[K.materialIndex];if(nt&&nt.visible){const ft=E(P,nt,S,A);P.onBeforeShadow(n,P,y,_,L,ft,K),n.renderBufferDirect(_,null,L,ft,P,K),P.onAfterShadow(n,P,y,_,L,ft,K)}}}else if(V.visible){const I=E(P,V,S,A);P.onBeforeShadow(n,P,y,_,L,I,null),n.renderBufferDirect(_,null,L,I,P,null),P.onAfterShadow(n,P,y,_,L,I,null)}}const C=P.children;for(let L=0,V=C.length;L<V;L++)w(C[L],y,_,S,A)}function D(P){P.target.removeEventListener("dispose",D);for(const _ in l){const S=l[_],A=P.target.uuid;A in S&&(S[A].dispose(),delete S[A])}}}function P_(n,t){function e(){let U=!1;const at=new Re;let j=null;const yt=new Re(0,0,0,0);return{setMask:function(dt){j!==dt&&!U&&(n.colorMask(dt,dt,dt,dt),j=dt)},setLocked:function(dt){U=dt},setClear:function(dt,et,Lt,Ht,Ce){Ce===!0&&(dt*=Ht,et*=Ht,Lt*=Ht),at.set(dt,et,Lt,Ht),yt.equals(at)===!1&&(n.clearColor(dt,et,Lt,Ht),yt.copy(at))},reset:function(){U=!1,j=null,yt.set(-1,0,0,0)}}}function i(){let U=!1,at=!1,j=null,yt=null,dt=null;return{setReversed:function(et){if(at!==et){const Lt=t.get("EXT_clip_control");et?Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.ZERO_TO_ONE_EXT):Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.NEGATIVE_ONE_TO_ONE_EXT),at=et;const Ht=dt;dt=null,this.setClear(Ht)}},getReversed:function(){return at},setTest:function(et){et?lt(n.DEPTH_TEST):Nt(n.DEPTH_TEST)},setMask:function(et){j!==et&&!U&&(n.depthMask(et),j=et)},setFunc:function(et){if(at&&(et=kh[et]),yt!==et){switch(et){case ca:n.depthFunc(n.NEVER);break;case da:n.depthFunc(n.ALWAYS);break;case ua:n.depthFunc(n.LESS);break;case ps:n.depthFunc(n.LEQUAL);break;case ha:n.depthFunc(n.EQUAL);break;case fa:n.depthFunc(n.GEQUAL);break;case pa:n.depthFunc(n.GREATER);break;case ma:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}yt=et}},setLocked:function(et){U=et},setClear:function(et){dt!==et&&(dt=et,at&&(et=1-et),n.clearDepth(et))},reset:function(){U=!1,j=null,yt=null,dt=null,at=!1}}}function s(){let U=!1,at=null,j=null,yt=null,dt=null,et=null,Lt=null,Ht=null,Ce=null;return{setTest:function(ue){U||(ue?lt(n.STENCIL_TEST):Nt(n.STENCIL_TEST))},setMask:function(ue){at!==ue&&!U&&(n.stencilMask(ue),at=ue)},setFunc:function(ue,Wn,In){(j!==ue||yt!==Wn||dt!==In)&&(n.stencilFunc(ue,Wn,In),j=ue,yt=Wn,dt=In)},setOp:function(ue,Wn,In){(et!==ue||Lt!==Wn||Ht!==In)&&(n.stencilOp(ue,Wn,In),et=ue,Lt=Wn,Ht=In)},setLocked:function(ue){U=ue},setClear:function(ue){Ce!==ue&&(n.clearStencil(ue),Ce=ue)},reset:function(){U=!1,at=null,j=null,yt=null,dt=null,et=null,Lt=null,Ht=null,Ce=null}}}const r=new e,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let d={},f={},u={},m=new WeakMap,p=[],x=null,g=!1,h=null,M=null,E=null,w=null,D=null,P=null,y=null,_=new Bt(0,0,0),S=0,A=!1,R=null,C=null,L=null,V=null,I=null;const B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,K=0;const nt=n.getParameter(n.VERSION);nt.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(nt)[1]),z=K>=1):nt.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(nt)[1]),z=K>=2);let ft=null,Et={};const Ct=n.getParameter(n.SCISSOR_BOX),st=n.getParameter(n.VIEWPORT),St=new Re().fromArray(Ct),vt=new Re().fromArray(st);function $(U,at,j,yt){const dt=new Uint8Array(4),et=n.createTexture();n.bindTexture(U,et),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Lt=0;Lt<j;Lt++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(at,0,n.RGBA,1,1,yt,0,n.RGBA,n.UNSIGNED_BYTE,dt):n.texImage2D(at+Lt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,dt);return et}const _t={};_t[n.TEXTURE_2D]=$(n.TEXTURE_2D,n.TEXTURE_2D,1),_t[n.TEXTURE_CUBE_MAP]=$(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),_t[n.TEXTURE_2D_ARRAY]=$(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),_t[n.TEXTURE_3D]=$(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),lt(n.DEPTH_TEST),o.setFunc(ps),Fe(!1),Ee(Zl),lt(n.CULL_FACE),ve(Qn);function lt(U){d[U]!==!0&&(n.enable(U),d[U]=!0)}function Nt(U){d[U]!==!1&&(n.disable(U),d[U]=!1)}function kt(U,at){return u[U]!==at?(n.bindFramebuffer(U,at),u[U]=at,U===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=at),U===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=at),!0):!1}function Ot(U,at){let j=p,yt=!1;if(U){j=m.get(at),j===void 0&&(j=[],m.set(at,j));const dt=U.textures;if(j.length!==dt.length||j[0]!==n.COLOR_ATTACHMENT0){for(let et=0,Lt=dt.length;et<Lt;et++)j[et]=n.COLOR_ATTACHMENT0+et;j.length=dt.length,yt=!0}}else j[0]!==n.BACK&&(j[0]=n.BACK,yt=!0);yt&&n.drawBuffers(j)}function ye(U){return x!==U?(n.useProgram(U),x=U,!0):!1}const Qt={[Li]:n.FUNC_ADD,[ch]:n.FUNC_SUBTRACT,[dh]:n.FUNC_REVERSE_SUBTRACT};Qt[uh]=n.MIN,Qt[hh]=n.MAX;const de={[fh]:n.ZERO,[ph]:n.ONE,[mh]:n.SRC_COLOR,[aa]:n.SRC_ALPHA,[Sh]:n.SRC_ALPHA_SATURATE,[vh]:n.DST_COLOR,[_h]:n.DST_ALPHA,[gh]:n.ONE_MINUS_SRC_COLOR,[la]:n.ONE_MINUS_SRC_ALPHA,[Mh]:n.ONE_MINUS_DST_COLOR,[xh]:n.ONE_MINUS_DST_ALPHA,[bh]:n.CONSTANT_COLOR,[yh]:n.ONE_MINUS_CONSTANT_COLOR,[Eh]:n.CONSTANT_ALPHA,[Th]:n.ONE_MINUS_CONSTANT_ALPHA};function ve(U,at,j,yt,dt,et,Lt,Ht,Ce,ue){if(U===Qn){g===!0&&(Nt(n.BLEND),g=!1);return}if(g===!1&&(lt(n.BLEND),g=!0),U!==lh){if(U!==h||ue!==A){if((M!==Li||D!==Li)&&(n.blendEquation(n.FUNC_ADD),M=Li,D=Li),ue)switch(U){case hs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Jl:n.blendFunc(n.ONE,n.ONE);break;case Ql:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case tc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:ne("WebGLState: Invalid blending: ",U);break}else switch(U){case hs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Jl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ql:ne("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case tc:ne("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ne("WebGLState: Invalid blending: ",U);break}E=null,w=null,P=null,y=null,_.set(0,0,0),S=0,h=U,A=ue}return}dt=dt||at,et=et||j,Lt=Lt||yt,(at!==M||dt!==D)&&(n.blendEquationSeparate(Qt[at],Qt[dt]),M=at,D=dt),(j!==E||yt!==w||et!==P||Lt!==y)&&(n.blendFuncSeparate(de[j],de[yt],de[et],de[Lt]),E=j,w=yt,P=et,y=Lt),(Ht.equals(_)===!1||Ce!==S)&&(n.blendColor(Ht.r,Ht.g,Ht.b,Ce),_.copy(Ht),S=Ce),h=U,A=!1}function jt(U,at){U.side===Zn?Nt(n.CULL_FACE):lt(n.CULL_FACE);let j=U.side===en;at&&(j=!j),Fe(j),U.blending===hs&&U.transparent===!1?ve(Qn):ve(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const yt=U.stencilWrite;a.setTest(yt),yt&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),F(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?lt(n.SAMPLE_ALPHA_TO_COVERAGE):Nt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(U){R!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),R=U)}function Ee(U){U!==rh?(lt(n.CULL_FACE),U!==C&&(U===Zl?n.cullFace(n.BACK):U===oh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Nt(n.CULL_FACE),C=U}function ln(U){U!==L&&(z&&n.lineWidth(U),L=U)}function F(U,at,j){U?(lt(n.POLYGON_OFFSET_FILL),(V!==at||I!==j)&&(V=at,I=j,o.getReversed()&&(at=-at),n.polygonOffset(at,j))):Nt(n.POLYGON_OFFSET_FILL)}function Oe(U){U?lt(n.SCISSOR_TEST):Nt(n.SCISSOR_TEST)}function te(U){U===void 0&&(U=n.TEXTURE0+B-1),ft!==U&&(n.activeTexture(U),ft=U)}function _e(U,at,j){j===void 0&&(ft===null?j=n.TEXTURE0+B-1:j=ft);let yt=Et[j];yt===void 0&&(yt={type:void 0,texture:void 0},Et[j]=yt),(yt.type!==U||yt.texture!==at)&&(ft!==j&&(n.activeTexture(j),ft=j),n.bindTexture(U,at||_t[U]),yt.type=U,yt.texture=at)}function mt(){const U=Et[ft];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function we(){try{n.compressedTexImage2D(...arguments)}catch(U){ne("WebGLState:",U)}}function T(){try{n.compressedTexImage3D(...arguments)}catch(U){ne("WebGLState:",U)}}function v(){try{n.texSubImage2D(...arguments)}catch(U){ne("WebGLState:",U)}}function k(){try{n.texSubImage3D(...arguments)}catch(U){ne("WebGLState:",U)}}function Z(){try{n.compressedTexSubImage2D(...arguments)}catch(U){ne("WebGLState:",U)}}function it(){try{n.compressedTexSubImage3D(...arguments)}catch(U){ne("WebGLState:",U)}}function rt(){try{n.texStorage2D(...arguments)}catch(U){ne("WebGLState:",U)}}function ht(){try{n.texStorage3D(...arguments)}catch(U){ne("WebGLState:",U)}}function Y(){try{n.texImage2D(...arguments)}catch(U){ne("WebGLState:",U)}}function Q(){try{n.texImage3D(...arguments)}catch(U){ne("WebGLState:",U)}}function bt(U){return f[U]!==void 0?f[U]:n.getParameter(U)}function wt(U,at){f[U]!==at&&(n.pixelStorei(U,at),f[U]=at)}function ct(U){St.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),St.copy(U))}function ot(U){vt.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),vt.copy(U))}function zt(U,at){let j=l.get(at);j===void 0&&(j=new WeakMap,l.set(at,j));let yt=j.get(U);yt===void 0&&(yt=n.getUniformBlockIndex(at,U.name),j.set(U,yt))}function Wt(U,at){const yt=l.get(at).get(U);c.get(at)!==yt&&(n.uniformBlockBinding(at,yt,U.__bindingPointIndex),c.set(at,yt))}function oe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},f={},ft=null,Et={},u={},m=new WeakMap,p=[],x=null,g=!1,h=null,M=null,E=null,w=null,D=null,P=null,y=null,_=new Bt(0,0,0),S=0,A=!1,R=null,C=null,L=null,V=null,I=null,St.set(0,0,n.canvas.width,n.canvas.height),vt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:lt,disable:Nt,bindFramebuffer:kt,drawBuffers:Ot,useProgram:ye,setBlending:ve,setMaterial:jt,setFlipSided:Fe,setCullFace:Ee,setLineWidth:ln,setPolygonOffset:F,setScissorTest:Oe,activeTexture:te,bindTexture:_e,unbindTexture:mt,compressedTexImage2D:we,compressedTexImage3D:T,texImage2D:Y,texImage3D:Q,pixelStorei:wt,getParameter:bt,updateUBOMapping:zt,uniformBlockBinding:Wt,texStorage2D:rt,texStorage3D:ht,texSubImage2D:v,texSubImage3D:k,compressedTexSubImage2D:Z,compressedTexSubImage3D:it,scissor:ct,viewport:ot,reset:oe}}function L_(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ft,d=new WeakMap,f=new Set;let u;const m=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(T,v){return p?new OffscreenCanvas(T,v):Kr("canvas")}function g(T,v,k){let Z=1;const it=we(T);if((it.width>k||it.height>k)&&(Z=k/Math.max(it.width,it.height)),Z<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const rt=Math.floor(Z*it.width),ht=Math.floor(Z*it.height);u===void 0&&(u=x(rt,ht));const Y=v?x(rt,ht):u;return Y.width=rt,Y.height=ht,Y.getContext("2d").drawImage(T,0,0,rt,ht),Ut("WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+rt+"x"+ht+")."),Y}else return"data"in T&&Ut("WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),T;return T}function h(T){return T.generateMipmaps}function M(T){n.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(T,v,k,Z,it,rt=!1){if(T!==null){if(n[T]!==void 0)return n[T];Ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ht;Z&&(ht=t.get("EXT_texture_norm16"),ht||Ut("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=v;if(v===n.RED&&(k===n.FLOAT&&(Y=n.R32F),k===n.HALF_FLOAT&&(Y=n.R16F),k===n.UNSIGNED_BYTE&&(Y=n.R8),k===n.UNSIGNED_SHORT&&ht&&(Y=ht.R16_EXT),k===n.SHORT&&ht&&(Y=ht.R16_SNORM_EXT)),v===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.R8UI),k===n.UNSIGNED_SHORT&&(Y=n.R16UI),k===n.UNSIGNED_INT&&(Y=n.R32UI),k===n.BYTE&&(Y=n.R8I),k===n.SHORT&&(Y=n.R16I),k===n.INT&&(Y=n.R32I)),v===n.RG&&(k===n.FLOAT&&(Y=n.RG32F),k===n.HALF_FLOAT&&(Y=n.RG16F),k===n.UNSIGNED_BYTE&&(Y=n.RG8),k===n.UNSIGNED_SHORT&&ht&&(Y=ht.RG16_EXT),k===n.SHORT&&ht&&(Y=ht.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.RG8UI),k===n.UNSIGNED_SHORT&&(Y=n.RG16UI),k===n.UNSIGNED_INT&&(Y=n.RG32UI),k===n.BYTE&&(Y=n.RG8I),k===n.SHORT&&(Y=n.RG16I),k===n.INT&&(Y=n.RG32I)),v===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),k===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),k===n.UNSIGNED_INT&&(Y=n.RGB32UI),k===n.BYTE&&(Y=n.RGB8I),k===n.SHORT&&(Y=n.RGB16I),k===n.INT&&(Y=n.RGB32I)),v===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),k===n.UNSIGNED_INT&&(Y=n.RGBA32UI),k===n.BYTE&&(Y=n.RGBA8I),k===n.SHORT&&(Y=n.RGBA16I),k===n.INT&&(Y=n.RGBA32I)),v===n.RGB&&(k===n.UNSIGNED_SHORT&&ht&&(Y=ht.RGB16_EXT),k===n.SHORT&&ht&&(Y=ht.RGB16_SNORM_EXT),k===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),k===n.UNSIGNED_INT_10F_11F_11F_REV&&(Y=n.R11F_G11F_B10F)),v===n.RGBA){const Q=rt?jr:ee.getTransfer(it);k===n.FLOAT&&(Y=n.RGBA32F),k===n.HALF_FLOAT&&(Y=n.RGBA16F),k===n.UNSIGNED_BYTE&&(Y=Q===le?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT&&ht&&(Y=ht.RGBA16_EXT),k===n.SHORT&&ht&&(Y=ht.RGBA16_SNORM_EXT),k===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function D(T,v){let k;return T?v===null||v===Gn||v===Ws?k=n.DEPTH24_STENCIL8:v===wn?k=n.DEPTH32F_STENCIL8:v===Vs&&(k=n.DEPTH24_STENCIL8,Ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Gn||v===Ws?k=n.DEPTH_COMPONENT24:v===wn?k=n.DEPTH_COMPONENT32F:v===Vs&&(k=n.DEPTH_COMPONENT16),k}function P(T,v){return h(T)===!0||T.isFramebufferTexture&&T.minFilter!==We&&T.minFilter!==Ye?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function y(T){const v=T.target;v.removeEventListener("dispose",y),S(v),v.isVideoTexture&&d.delete(v),v.isHTMLTexture&&f.delete(v)}function _(T){const v=T.target;v.removeEventListener("dispose",_),R(v)}function S(T){const v=i.get(T);if(v.__webglInit===void 0)return;const k=T.source,Z=m.get(k);if(Z){const it=Z[v.__cacheKey];it.usedTimes--,it.usedTimes===0&&A(T),Object.keys(Z).length===0&&m.delete(k)}i.remove(T)}function A(T){const v=i.get(T);n.deleteTexture(v.__webglTexture);const k=T.source,Z=m.get(k);delete Z[v.__cacheKey],o.memory.textures--}function R(T){const v=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(v.__webglFramebuffer[Z]))for(let it=0;it<v.__webglFramebuffer[Z].length;it++)n.deleteFramebuffer(v.__webglFramebuffer[Z][it]);else n.deleteFramebuffer(v.__webglFramebuffer[Z]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[Z])}else{if(Array.isArray(v.__webglFramebuffer))for(let Z=0;Z<v.__webglFramebuffer.length;Z++)n.deleteFramebuffer(v.__webglFramebuffer[Z]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Z=0;Z<v.__webglColorRenderbuffer.length;Z++)v.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[Z]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const k=T.textures;for(let Z=0,it=k.length;Z<it;Z++){const rt=i.get(k[Z]);rt.__webglTexture&&(n.deleteTexture(rt.__webglTexture),o.memory.textures--),i.remove(k[Z])}i.remove(T)}let C=0;function L(){C=0}function V(){return C}function I(T){C=T}function B(){const T=C;return T>=s.maxTextures&&Ut("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),C+=1,T}function z(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function K(T,v){const k=i.get(T);if(T.isVideoTexture&&_e(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&k.__version!==T.version){const Z=T.image;if(Z===null)Ut("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Ut("WebGLRenderer: Texture marked for update but image is incomplete");else{Nt(k,T,v);return}}else T.isExternalTexture&&(k.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+v)}function nt(T,v){const k=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){Nt(k,T,v);return}else T.isExternalTexture&&(k.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+v)}function ft(T,v){const k=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){Nt(k,T,v);return}e.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+v)}function Et(T,v){const k=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&k.__version!==T.version){kt(k,T,v);return}e.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+v)}const Ct={[Wr]:n.REPEAT,[Jn]:n.CLAMP_TO_EDGE,[ga]:n.MIRRORED_REPEAT},st={[We]:n.NEAREST,[Rh]:n.NEAREST_MIPMAP_NEAREST,[nr]:n.NEAREST_MIPMAP_LINEAR,[Ye]:n.LINEAR,[vo]:n.LINEAR_MIPMAP_NEAREST,[Ii]:n.LINEAR_MIPMAP_LINEAR},St={[Lh]:n.NEVER,[Fh]:n.ALWAYS,[Dh]:n.LESS,[ml]:n.LEQUAL,[Ih]:n.EQUAL,[gl]:n.GEQUAL,[Uh]:n.GREATER,[Nh]:n.NOTEQUAL};function vt(T,v){if(v.type===wn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Ye||v.magFilter===vo||v.magFilter===nr||v.magFilter===Ii||v.minFilter===Ye||v.minFilter===vo||v.minFilter===nr||v.minFilter===Ii)&&Ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,Ct[v.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,Ct[v.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,Ct[v.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,st[v.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,st[v.minFilter]),v.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,St[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===We||v.minFilter!==nr&&v.minFilter!==Ii||v.type===wn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");n.texParameterf(T,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function $(T,v){let k=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",y));const Z=v.source;let it=m.get(Z);it===void 0&&(it={},m.set(Z,it));const rt=z(v);if(rt!==T.__cacheKey){it[rt]===void 0&&(it[rt]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,k=!0),it[rt].usedTimes++;const ht=it[T.__cacheKey];ht!==void 0&&(it[T.__cacheKey].usedTimes--,ht.usedTimes===0&&A(v)),T.__cacheKey=rt,T.__webglTexture=it[rt].texture}return k}function _t(T,v,k){return Math.floor(Math.floor(T/k)/v)}function lt(T,v,k,Z){const rt=T.updateRanges;if(rt.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,k,Z,v.data);else{rt.sort((wt,ct)=>wt.start-ct.start);let ht=0;for(let wt=1;wt<rt.length;wt++){const ct=rt[ht],ot=rt[wt],zt=ct.start+ct.count,Wt=_t(ot.start,v.width,4),oe=_t(ct.start,v.width,4);ot.start<=zt+1&&Wt===oe&&_t(ot.start+ot.count-1,v.width,4)===Wt?ct.count=Math.max(ct.count,ot.start+ot.count-ct.start):(++ht,rt[ht]=ot)}rt.length=ht+1;const Y=e.getParameter(n.UNPACK_ROW_LENGTH),Q=e.getParameter(n.UNPACK_SKIP_PIXELS),bt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let wt=0,ct=rt.length;wt<ct;wt++){const ot=rt[wt],zt=Math.floor(ot.start/4),Wt=Math.ceil(ot.count/4),oe=zt%v.width,U=Math.floor(zt/v.width),at=Wt,j=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,oe),e.pixelStorei(n.UNPACK_SKIP_ROWS,U),e.texSubImage2D(n.TEXTURE_2D,0,oe,U,at,j,k,Z,v.data)}T.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Y),e.pixelStorei(n.UNPACK_SKIP_PIXELS,Q),e.pixelStorei(n.UNPACK_SKIP_ROWS,bt)}}function Nt(T,v,k){let Z=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Z=n.TEXTURE_3D);const it=$(T,v),rt=v.source;e.bindTexture(Z,T.__webglTexture,n.TEXTURE0+k);const ht=i.get(rt);if(rt.version!==ht.__version||it===!0){if(e.activeTexture(n.TEXTURE0+k),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const j=ee.getPrimaries(ee.workingColorSpace),yt=v.colorSpace===_i?null:ee.getPrimaries(v.colorSpace),dt=v.colorSpace===_i||j===yt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt)}e.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let Q=g(v.image,!1,s.maxTextureSize);Q=mt(v,Q);const bt=r.convert(v.format,v.colorSpace),wt=r.convert(v.type);let ct=w(v.internalFormat,bt,wt,v.normalized,v.colorSpace,v.isVideoTexture);vt(Z,v);let ot;const zt=v.mipmaps,Wt=v.isVideoTexture!==!0,oe=ht.__version===void 0||it===!0,U=rt.dataReady,at=P(v,Q);if(v.isDepthTexture)ct=D(v.format===Ui,v.type),oe&&(Wt?e.texStorage2D(n.TEXTURE_2D,1,ct,Q.width,Q.height):e.texImage2D(n.TEXTURE_2D,0,ct,Q.width,Q.height,0,bt,wt,null));else if(v.isDataTexture)if(zt.length>0){Wt&&oe&&e.texStorage2D(n.TEXTURE_2D,at,ct,zt[0].width,zt[0].height);for(let j=0,yt=zt.length;j<yt;j++)ot=zt[j],Wt?U&&e.texSubImage2D(n.TEXTURE_2D,j,0,0,ot.width,ot.height,bt,wt,ot.data):e.texImage2D(n.TEXTURE_2D,j,ct,ot.width,ot.height,0,bt,wt,ot.data);v.generateMipmaps=!1}else Wt?(oe&&e.texStorage2D(n.TEXTURE_2D,at,ct,Q.width,Q.height),U&&lt(v,Q,bt,wt)):e.texImage2D(n.TEXTURE_2D,0,ct,Q.width,Q.height,0,bt,wt,Q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Wt&&oe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,at,ct,zt[0].width,zt[0].height,Q.depth);for(let j=0,yt=zt.length;j<yt;j++)if(ot=zt[j],v.format!==An)if(bt!==null)if(Wt){if(U)if(v.layerUpdates.size>0){const dt=Fc(ot.width,ot.height,v.format,v.type);for(const et of v.layerUpdates){const Lt=ot.data.subarray(et*dt/ot.data.BYTES_PER_ELEMENT,(et+1)*dt/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,et,ot.width,ot.height,1,bt,Lt)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,ot.width,ot.height,Q.depth,bt,ot.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,j,ct,ot.width,ot.height,Q.depth,0,ot.data,0,0);else Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?U&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,ot.width,ot.height,Q.depth,bt,wt,ot.data):e.texImage3D(n.TEXTURE_2D_ARRAY,j,ct,ot.width,ot.height,Q.depth,0,bt,wt,ot.data)}else{Wt&&oe&&e.texStorage2D(n.TEXTURE_2D,at,ct,zt[0].width,zt[0].height);for(let j=0,yt=zt.length;j<yt;j++)ot=zt[j],v.format!==An?bt!==null?Wt?U&&e.compressedTexSubImage2D(n.TEXTURE_2D,j,0,0,ot.width,ot.height,bt,ot.data):e.compressedTexImage2D(n.TEXTURE_2D,j,ct,ot.width,ot.height,0,ot.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?U&&e.texSubImage2D(n.TEXTURE_2D,j,0,0,ot.width,ot.height,bt,wt,ot.data):e.texImage2D(n.TEXTURE_2D,j,ct,ot.width,ot.height,0,bt,wt,ot.data)}else if(v.isDataArrayTexture)if(Wt){if(oe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,at,ct,Q.width,Q.height,Q.depth),U)if(v.layerUpdates.size>0){const j=Fc(Q.width,Q.height,v.format,v.type);for(const yt of v.layerUpdates){const dt=Q.data.subarray(yt*j/Q.data.BYTES_PER_ELEMENT,(yt+1)*j/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,yt,Q.width,Q.height,1,bt,wt,dt)}v.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,bt,wt,Q.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,ct,Q.width,Q.height,Q.depth,0,bt,wt,Q.data);else if(v.isData3DTexture)Wt?(oe&&e.texStorage3D(n.TEXTURE_3D,at,ct,Q.width,Q.height,Q.depth),U&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,bt,wt,Q.data)):e.texImage3D(n.TEXTURE_3D,0,ct,Q.width,Q.height,Q.depth,0,bt,wt,Q.data);else if(v.isFramebufferTexture){if(oe)if(Wt)e.texStorage2D(n.TEXTURE_2D,at,ct,Q.width,Q.height);else{let j=Q.width,yt=Q.height;for(let dt=0;dt<at;dt++)e.texImage2D(n.TEXTURE_2D,dt,ct,j,yt,0,bt,wt,null),j>>=1,yt>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const j=n.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),Q.parentNode!==j){j.appendChild(Q),f.add(v),j.onpaint=Ht=>{const Ce=Ht.changedElements;for(const ue of f)Ce.includes(ue.image)&&(ue.needsUpdate=!0)},j.requestPaint();return}const yt=0,dt=n.RGBA,et=n.RGBA,Lt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,yt,dt,et,Lt,Q),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(zt.length>0){if(Wt&&oe){const j=we(zt[0]);e.texStorage2D(n.TEXTURE_2D,at,ct,j.width,j.height)}for(let j=0,yt=zt.length;j<yt;j++)ot=zt[j],Wt?U&&e.texSubImage2D(n.TEXTURE_2D,j,0,0,bt,wt,ot):e.texImage2D(n.TEXTURE_2D,j,ct,bt,wt,ot);v.generateMipmaps=!1}else if(Wt){if(oe){const j=we(Q);e.texStorage2D(n.TEXTURE_2D,at,ct,j.width,j.height)}U&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,bt,wt,Q)}else e.texImage2D(n.TEXTURE_2D,0,ct,bt,wt,Q);h(v)&&M(Z),ht.__version=rt.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function kt(T,v,k){if(v.image.length!==6)return;const Z=$(T,v),it=v.source;e.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+k);const rt=i.get(it);if(it.version!==rt.__version||Z===!0){e.activeTexture(n.TEXTURE0+k);const ht=ee.getPrimaries(ee.workingColorSpace),Y=v.colorSpace===_i?null:ee.getPrimaries(v.colorSpace),Q=v.colorSpace===_i||ht===Y?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const bt=v.isCompressedTexture||v.image[0].isCompressedTexture,wt=v.image[0]&&v.image[0].isDataTexture,ct=[];for(let et=0;et<6;et++)!bt&&!wt?ct[et]=g(v.image[et],!0,s.maxCubemapSize):ct[et]=wt?v.image[et].image:v.image[et],ct[et]=mt(v,ct[et]);const ot=ct[0],zt=r.convert(v.format,v.colorSpace),Wt=r.convert(v.type),oe=w(v.internalFormat,zt,Wt,v.normalized,v.colorSpace),U=v.isVideoTexture!==!0,at=rt.__version===void 0||Z===!0,j=it.dataReady;let yt=P(v,ot);vt(n.TEXTURE_CUBE_MAP,v);let dt;if(bt){U&&at&&e.texStorage2D(n.TEXTURE_CUBE_MAP,yt,oe,ot.width,ot.height);for(let et=0;et<6;et++){dt=ct[et].mipmaps;for(let Lt=0;Lt<dt.length;Lt++){const Ht=dt[Lt];v.format!==An?zt!==null?U?j&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt,0,0,Ht.width,Ht.height,zt,Ht.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt,oe,Ht.width,Ht.height,0,Ht.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?j&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt,0,0,Ht.width,Ht.height,zt,Wt,Ht.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt,oe,Ht.width,Ht.height,0,zt,Wt,Ht.data)}}}else{if(dt=v.mipmaps,U&&at){dt.length>0&&yt++;const et=we(ct[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,yt,oe,et.width,et.height)}for(let et=0;et<6;et++)if(wt){U?j&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,ct[et].width,ct[et].height,zt,Wt,ct[et].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,oe,ct[et].width,ct[et].height,0,zt,Wt,ct[et].data);for(let Lt=0;Lt<dt.length;Lt++){const Ce=dt[Lt].image[et].image;U?j&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt+1,0,0,Ce.width,Ce.height,zt,Wt,Ce.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt+1,oe,Ce.width,Ce.height,0,zt,Wt,Ce.data)}}else{U?j&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,zt,Wt,ct[et]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,oe,zt,Wt,ct[et]);for(let Lt=0;Lt<dt.length;Lt++){const Ht=dt[Lt];U?j&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt+1,0,0,zt,Wt,Ht.image[et]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt+1,oe,zt,Wt,Ht.image[et])}}}h(v)&&M(n.TEXTURE_CUBE_MAP),rt.__version=it.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function Ot(T,v,k,Z,it,rt){const ht=r.convert(k.format,k.colorSpace),Y=r.convert(k.type),Q=w(k.internalFormat,ht,Y,k.normalized,k.colorSpace),bt=i.get(v),wt=i.get(k);if(wt.__renderTarget=v,!bt.__hasExternalTextures){const ct=Math.max(1,v.width>>rt),ot=Math.max(1,v.height>>rt);it===n.TEXTURE_3D||it===n.TEXTURE_2D_ARRAY?e.texImage3D(it,rt,Q,ct,ot,v.depth,0,ht,Y,null):e.texImage2D(it,rt,Q,ct,ot,0,ht,Y,null)}e.bindFramebuffer(n.FRAMEBUFFER,T),te(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,it,wt.__webglTexture,0,Oe(v)):(it===n.TEXTURE_2D||it>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,it,wt.__webglTexture,rt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ye(T,v,k){if(n.bindRenderbuffer(n.RENDERBUFFER,T),v.depthBuffer){const Z=v.depthTexture,it=Z&&Z.isDepthTexture?Z.type:null,rt=D(v.stencilBuffer,it),ht=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;te(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Oe(v),rt,v.width,v.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Oe(v),rt,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,rt,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ht,n.RENDERBUFFER,T)}else{const Z=v.textures;for(let it=0;it<Z.length;it++){const rt=Z[it],ht=r.convert(rt.format,rt.colorSpace),Y=r.convert(rt.type),Q=w(rt.internalFormat,ht,Y,rt.normalized,rt.colorSpace);te(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Oe(v),Q,v.width,v.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Oe(v),Q,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Q,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Qt(T,v,k){const Z=v.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const it=i.get(v.depthTexture);if(it.__renderTarget=v,(!it.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Z){if(it.__webglInit===void 0&&(it.__webglInit=!0,v.depthTexture.addEventListener("dispose",y)),it.__webglTexture===void 0){it.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,it.__webglTexture),vt(n.TEXTURE_CUBE_MAP,v.depthTexture);const bt=r.convert(v.depthTexture.format),wt=r.convert(v.depthTexture.type);let ct;v.depthTexture.format===si?ct=n.DEPTH_COMPONENT24:v.depthTexture.format===Ui&&(ct=n.DEPTH24_STENCIL8);for(let ot=0;ot<6;ot++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,ct,v.width,v.height,0,bt,wt,null)}}else K(v.depthTexture,0);const rt=it.__webglTexture,ht=Oe(v),Y=Z?n.TEXTURE_CUBE_MAP_POSITIVE_X+k:n.TEXTURE_2D,Q=v.depthTexture.format===Ui?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===si)te(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,Y,rt,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,Q,Y,rt,0);else if(v.depthTexture.format===Ui)te(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,Y,rt,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,Q,Y,rt,0);else throw new Error("Unknown depthTexture format")}function de(T){const v=i.get(T),k=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const Z=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Z){const it=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Z.removeEventListener("dispose",it)};Z.addEventListener("dispose",it),v.__depthDisposeCallback=it}v.__boundDepthTexture=Z}if(T.depthTexture&&!v.__autoAllocateDepthBuffer)if(k)for(let Z=0;Z<6;Z++)Qt(v.__webglFramebuffer[Z],T,Z);else{const Z=T.texture.mipmaps;Z&&Z.length>0?Qt(v.__webglFramebuffer[0],T,0):Qt(v.__webglFramebuffer,T,0)}else if(k){v.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[Z]),v.__webglDepthbuffer[Z]===void 0)v.__webglDepthbuffer[Z]=n.createRenderbuffer(),ye(v.__webglDepthbuffer[Z],T,!1);else{const it=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=v.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,rt),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,rt)}}else{const Z=T.texture.mipmaps;if(Z&&Z.length>0?e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),ye(v.__webglDepthbuffer,T,!1);else{const it=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,rt),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,rt)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function ve(T,v,k){const Z=i.get(T);v!==void 0&&Ot(Z.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&de(T)}function jt(T){const v=T.texture,k=i.get(T),Z=i.get(v);T.addEventListener("dispose",_);const it=T.textures,rt=T.isWebGLCubeRenderTarget===!0,ht=it.length>1;if(ht||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=v.version,o.memory.textures++),rt){k.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer[Y]=[];for(let Q=0;Q<v.mipmaps.length;Q++)k.__webglFramebuffer[Y][Q]=n.createFramebuffer()}else k.__webglFramebuffer[Y]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer=[];for(let Y=0;Y<v.mipmaps.length;Y++)k.__webglFramebuffer[Y]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(ht)for(let Y=0,Q=it.length;Y<Q;Y++){const bt=i.get(it[Y]);bt.__webglTexture===void 0&&(bt.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&te(T)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Y=0;Y<it.length;Y++){const Q=it[Y];k.__webglColorRenderbuffer[Y]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[Y]);const bt=r.convert(Q.format,Q.colorSpace),wt=r.convert(Q.type),ct=w(Q.internalFormat,bt,wt,Q.normalized,Q.colorSpace,T.isXRRenderTarget===!0),ot=Oe(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,ot,ct,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Y,n.RENDERBUFFER,k.__webglColorRenderbuffer[Y])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),ye(k.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(rt){e.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),vt(n.TEXTURE_CUBE_MAP,v);for(let Y=0;Y<6;Y++)if(v.mipmaps&&v.mipmaps.length>0)for(let Q=0;Q<v.mipmaps.length;Q++)Ot(k.__webglFramebuffer[Y][Q],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Q);else Ot(k.__webglFramebuffer[Y],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);h(v)&&M(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ht){for(let Y=0,Q=it.length;Y<Q;Y++){const bt=it[Y],wt=i.get(bt);let ct=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ct=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ct,wt.__webglTexture),vt(ct,bt),Ot(k.__webglFramebuffer,T,bt,n.COLOR_ATTACHMENT0+Y,ct,0),h(bt)&&M(ct)}e.unbindTexture()}else{let Y=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(Y=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Y,Z.__webglTexture),vt(Y,v),v.mipmaps&&v.mipmaps.length>0)for(let Q=0;Q<v.mipmaps.length;Q++)Ot(k.__webglFramebuffer[Q],T,v,n.COLOR_ATTACHMENT0,Y,Q);else Ot(k.__webglFramebuffer,T,v,n.COLOR_ATTACHMENT0,Y,0);h(v)&&M(Y),e.unbindTexture()}T.depthBuffer&&de(T)}function Fe(T){const v=T.textures;for(let k=0,Z=v.length;k<Z;k++){const it=v[k];if(h(it)){const rt=E(T),ht=i.get(it).__webglTexture;e.bindTexture(rt,ht),M(rt),e.unbindTexture()}}}const Ee=[],ln=[];function F(T){if(T.samples>0){if(te(T)===!1){const v=T.textures,k=T.width,Z=T.height;let it=n.COLOR_BUFFER_BIT;const rt=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=i.get(T),Y=v.length>1;if(Y)for(let bt=0;bt<v.length;bt++)e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer);const Q=T.texture.mipmaps;Q&&Q.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let bt=0;bt<v.length;bt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(it|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(it|=n.STENCIL_BUFFER_BIT)),Y){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ht.__webglColorRenderbuffer[bt]);const wt=i.get(v[bt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,wt,0)}n.blitFramebuffer(0,0,k,Z,0,0,k,Z,it,n.NEAREST),c===!0&&(Ee.length=0,ln.length=0,Ee.push(n.COLOR_ATTACHMENT0+bt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Ee.push(rt),ln.push(rt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ln)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ee))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Y)for(let bt=0;bt<v.length;bt++){e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.RENDERBUFFER,ht.__webglColorRenderbuffer[bt]);const wt=i.get(v[bt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.TEXTURE_2D,wt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const v=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function Oe(T){return Math.min(s.maxSamples,T.samples)}function te(T){const v=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function _e(T){const v=o.render.frame;d.get(T)!==v&&(d.set(T,v),T.update())}function mt(T,v){const k=T.colorSpace,Z=T.format,it=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||k!==Yr&&k!==_i&&(ee.getTransfer(k)===le?(Z!==An||it!==pn)&&Ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ne("WebGLTextures: Unsupported texture color space:",k)),v}function we(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=L,this.getTextureUnits=V,this.setTextureUnits=I,this.setTexture2D=K,this.setTexture2DArray=nt,this.setTexture3D=ft,this.setTextureCube=Et,this.rebindTextures=ve,this.setupRenderTarget=jt,this.updateRenderTargetMipmap=Fe,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=Ot,this.useMultisampledRTT=te,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function D_(n,t){function e(i,s=_i){let r;const o=ee.getTransfer(s);if(i===pn)return n.UNSIGNED_BYTE;if(i===cl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===dl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===jd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Kd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===$d)return n.BYTE;if(i===Yd)return n.SHORT;if(i===Vs)return n.UNSIGNED_SHORT;if(i===ll)return n.INT;if(i===Gn)return n.UNSIGNED_INT;if(i===wn)return n.FLOAT;if(i===ii)return n.HALF_FLOAT;if(i===Zd)return n.ALPHA;if(i===Jd)return n.RGB;if(i===An)return n.RGBA;if(i===si)return n.DEPTH_COMPONENT;if(i===Ui)return n.DEPTH_STENCIL;if(i===ul)return n.RED;if(i===hl)return n.RED_INTEGER;if(i===zi)return n.RG;if(i===fl)return n.RG_INTEGER;if(i===pl)return n.RGBA_INTEGER;if(i===Or||i===zr||i===Br||i===kr)if(o===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Or)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Or)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===zr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Br)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===kr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===_a||i===xa||i===va||i===Ma)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===_a)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===xa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===va)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ma)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Sa||i===ba||i===ya||i===Ea||i===Ta||i===Xr||i===wa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Sa||i===ba)return o===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ya)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ea)return r.COMPRESSED_R11_EAC;if(i===Ta)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Xr)return r.COMPRESSED_RG11_EAC;if(i===wa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Aa||i===Ra||i===Ca||i===Pa||i===La||i===Da||i===Ia||i===Ua||i===Na||i===Fa||i===Oa||i===za||i===Ba||i===ka)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Aa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ra)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ca)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Pa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===La)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Da)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ia)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ua)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Na)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Fa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Oa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===za)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ba)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ka)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ga||i===Ha||i===Va)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Ga)return o===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ha)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Va)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Wa||i===Xa||i===qr||i===qa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Wa)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Xa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===qr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===qa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ws?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const I_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,U_=`
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

}`;class N_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new lu(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Vn({vertexShader:I_,fragmentShader:U_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Kt(new oo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class F_ extends Ei{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,d=null,f=null,u=null,m=null,p=null;const x=typeof XRWebGLBinding<"u",g=new N_,h={},M=e.getContextAttributes();let E=null,w=null;const D=[],P=[],y=new Ft;let _=null;const S=new hn;S.viewport=new Re;const A=new hn;A.viewport=new Re;const R=[S,A],C=new Wf;let L=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let _t=D[$];return _t===void 0&&(_t=new To,D[$]=_t),_t.getTargetRaySpace()},this.getControllerGrip=function($){let _t=D[$];return _t===void 0&&(_t=new To,D[$]=_t),_t.getGripSpace()},this.getHand=function($){let _t=D[$];return _t===void 0&&(_t=new To,D[$]=_t),_t.getHandSpace()};function I($){const _t=P.indexOf($.inputSource);if(_t===-1)return;const lt=D[_t];lt!==void 0&&(lt.update($.inputSource,$.frame,l||o),lt.dispatchEvent({type:$.type,data:$.inputSource}))}function B(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",z);for(let $=0;$<D.length;$++){const _t=P[$];_t!==null&&(P[$]=null,D[$].disconnect(_t))}L=null,V=null,g.reset();for(const $ in h)delete h[$];t.setRenderTarget(E),m=null,u=null,f=null,s=null,w=null,vt.stop(),i.isPresenting=!1,t.setPixelRatio(_),t.setSize(y.width,y.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,i.isPresenting===!0&&Ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,i.isPresenting===!0&&Ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",B),s.addEventListener("inputsourceschange",z),M.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(y),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let lt=null,Nt=null,kt=null;M.depth&&(kt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,lt=M.stencil?Ui:si,Nt=M.stencil?Ws:Gn);const Ot={colorFormat:e.RGBA8,depthFormat:kt,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Ot),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),w=new kn(u.textureWidth,u.textureHeight,{format:An,type:pn,depthTexture:new _s(u.textureWidth,u.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,lt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const lt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,lt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),w=new kn(m.framebufferWidth,m.framebufferHeight,{format:An,type:pn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),vt.setContext(s),vt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function z($){for(let _t=0;_t<$.removed.length;_t++){const lt=$.removed[_t],Nt=P.indexOf(lt);Nt>=0&&(P[Nt]=null,D[Nt].disconnect(lt))}for(let _t=0;_t<$.added.length;_t++){const lt=$.added[_t];let Nt=P.indexOf(lt);if(Nt===-1){for(let Ot=0;Ot<D.length;Ot++)if(Ot>=P.length){P.push(lt),Nt=Ot;break}else if(P[Ot]===null){P[Ot]=lt,Nt=Ot;break}if(Nt===-1)break}const kt=D[Nt];kt&&kt.connect(lt)}}const K=new N,nt=new N;function ft($,_t,lt){K.setFromMatrixPosition(_t.matrixWorld),nt.setFromMatrixPosition(lt.matrixWorld);const Nt=K.distanceTo(nt),kt=_t.projectionMatrix.elements,Ot=lt.projectionMatrix.elements,ye=kt[14]/(kt[10]-1),Qt=kt[14]/(kt[10]+1),de=(kt[9]+1)/kt[5],ve=(kt[9]-1)/kt[5],jt=(kt[8]-1)/kt[0],Fe=(Ot[8]+1)/Ot[0],Ee=ye*jt,ln=ye*Fe,F=Nt/(-jt+Fe),Oe=F*-jt;if(_t.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Oe),$.translateZ(F),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),kt[10]===-1)$.projectionMatrix.copy(_t.projectionMatrix),$.projectionMatrixInverse.copy(_t.projectionMatrixInverse);else{const te=ye+F,_e=Qt+F,mt=Ee-Oe,we=ln+(Nt-Oe),T=de*Qt/_e*te,v=ve*Qt/_e*te;$.projectionMatrix.makePerspective(mt,we,T,v,te,_e),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Et($,_t){_t===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(_t.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let _t=$.near,lt=$.far;g.texture!==null&&(g.depthNear>0&&(_t=g.depthNear),g.depthFar>0&&(lt=g.depthFar)),C.near=A.near=S.near=_t,C.far=A.far=S.far=lt,(L!==C.near||V!==C.far)&&(s.updateRenderState({depthNear:C.near,depthFar:C.far}),L=C.near,V=C.far),C.layers.mask=$.layers.mask|6,S.layers.mask=C.layers.mask&-5,A.layers.mask=C.layers.mask&-3;const Nt=$.parent,kt=C.cameras;Et(C,Nt);for(let Ot=0;Ot<kt.length;Ot++)Et(kt[Ot],Nt);kt.length===2?ft(C,S,A):C.projectionMatrix.copy(S.projectionMatrix),Ct($,C,Nt)};function Ct($,_t,lt){lt===null?$.matrix.copy(_t.matrixWorld):($.matrix.copy(lt.matrixWorld),$.matrix.invert(),$.matrix.multiply(_t.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(_t.projectionMatrix),$.projectionMatrixInverse.copy(_t.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=qs*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(u===null&&m===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(C)},this.getCameraTexture=function($){return h[$]};let st=null;function St($,_t){if(d=_t.getViewerPose(l||o),p=_t,d!==null){const lt=d.views;m!==null&&(t.setRenderTargetFramebuffer(w,m.framebuffer),t.setRenderTarget(w));let Nt=!1;lt.length!==C.cameras.length&&(C.cameras.length=0,Nt=!0);for(let Qt=0;Qt<lt.length;Qt++){const de=lt[Qt];let ve=null;if(m!==null)ve=m.getViewport(de);else{const Fe=f.getViewSubImage(u,de);ve=Fe.viewport,Qt===0&&(t.setRenderTargetTextures(w,Fe.colorTexture,Fe.depthStencilTexture),t.setRenderTarget(w))}let jt=R[Qt];jt===void 0&&(jt=new hn,jt.layers.enable(Qt),jt.viewport=new Re,R[Qt]=jt),jt.matrix.fromArray(de.transform.matrix),jt.matrix.decompose(jt.position,jt.quaternion,jt.scale),jt.projectionMatrix.fromArray(de.projectionMatrix),jt.projectionMatrixInverse.copy(jt.projectionMatrix).invert(),jt.viewport.set(ve.x,ve.y,ve.width,ve.height),Qt===0&&(C.matrix.copy(jt.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),Nt===!0&&C.cameras.push(jt)}const kt=s.enabledFeatures;if(kt&&kt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const Qt=f.getDepthInformation(lt[0]);Qt&&Qt.isValid&&Qt.texture&&g.init(Qt,s.renderState)}if(kt&&kt.includes("camera-access")&&x){t.state.unbindTexture(),f=i.getBinding();for(let Qt=0;Qt<lt.length;Qt++){const de=lt[Qt].camera;if(de){let ve=h[de];ve||(ve=new lu,h[de]=ve);const jt=f.getCameraImage(de);ve.sourceTexture=jt}}}}for(let lt=0;lt<D.length;lt++){const Nt=P[lt],kt=D[lt];Nt!==null&&kt!==void 0&&kt.update(Nt,_t,l||o)}st&&st($,_t),_t.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:_t}),p=null}const vt=new pu;vt.setAnimationLoop(St),this.setAnimationLoop=function($){st=$},this.dispose=function(){}}}const O_=new pe,Su=new Gt;Su.set(-1,0,0,0,1,0,0,0,1);function z_(n,t){function e(g,h){g.matrixAutoUpdate===!0&&g.updateMatrix(),h.value.copy(g.matrix)}function i(g,h){h.color.getRGB(g.fogColor.value,cu(n)),h.isFog?(g.fogNear.value=h.near,g.fogFar.value=h.far):h.isFogExp2&&(g.fogDensity.value=h.density)}function s(g,h,M,E,w){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(g,h):h.isMeshLambertMaterial?(r(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(g,h),f(g,h)):h.isMeshPhongMaterial?(r(g,h),d(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(g,h),u(g,h),h.isMeshPhysicalMaterial&&m(g,h,w)):h.isMeshMatcapMaterial?(r(g,h),p(g,h)):h.isMeshDepthMaterial?r(g,h):h.isMeshDistanceMaterial?(r(g,h),x(g,h)):h.isMeshNormalMaterial?r(g,h):h.isLineBasicMaterial?(o(g,h),h.isLineDashedMaterial&&a(g,h)):h.isPointsMaterial?c(g,h,M,E):h.isSpriteMaterial?l(g,h):h.isShadowMaterial?(g.color.value.copy(h.color),g.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(g,h){g.opacity.value=h.opacity,h.color&&g.diffuse.value.copy(h.color),h.emissive&&g.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(g.map.value=h.map,e(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,e(h.alphaMap,g.alphaMapTransform)),h.bumpMap&&(g.bumpMap.value=h.bumpMap,e(h.bumpMap,g.bumpMapTransform),g.bumpScale.value=h.bumpScale,h.side===en&&(g.bumpScale.value*=-1)),h.normalMap&&(g.normalMap.value=h.normalMap,e(h.normalMap,g.normalMapTransform),g.normalScale.value.copy(h.normalScale),h.side===en&&g.normalScale.value.negate()),h.displacementMap&&(g.displacementMap.value=h.displacementMap,e(h.displacementMap,g.displacementMapTransform),g.displacementScale.value=h.displacementScale,g.displacementBias.value=h.displacementBias),h.emissiveMap&&(g.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,g.emissiveMapTransform)),h.specularMap&&(g.specularMap.value=h.specularMap,e(h.specularMap,g.specularMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest);const M=t.get(h),E=M.envMap,w=M.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(O_.makeRotationFromEuler(w)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Su),g.reflectivity.value=h.reflectivity,g.ior.value=h.ior,g.refractionRatio.value=h.refractionRatio),h.lightMap&&(g.lightMap.value=h.lightMap,g.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,g.lightMapTransform)),h.aoMap&&(g.aoMap.value=h.aoMap,g.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,g.aoMapTransform))}function o(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,h.map&&(g.map.value=h.map,e(h.map,g.mapTransform))}function a(g,h){g.dashSize.value=h.dashSize,g.totalSize.value=h.dashSize+h.gapSize,g.scale.value=h.scale}function c(g,h,M,E){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.size.value=h.size*M,g.scale.value=E*.5,h.map&&(g.map.value=h.map,e(h.map,g.uvTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,e(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function l(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.rotation.value=h.rotation,h.map&&(g.map.value=h.map,e(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,e(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function d(g,h){g.specular.value.copy(h.specular),g.shininess.value=Math.max(h.shininess,1e-4)}function f(g,h){h.gradientMap&&(g.gradientMap.value=h.gradientMap)}function u(g,h){g.metalness.value=h.metalness,h.metalnessMap&&(g.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,g.metalnessMapTransform)),g.roughness.value=h.roughness,h.roughnessMap&&(g.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,g.roughnessMapTransform)),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)}function m(g,h,M){g.ior.value=h.ior,h.sheen>0&&(g.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),g.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(g.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,g.sheenColorMapTransform)),h.sheenRoughnessMap&&(g.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,g.sheenRoughnessMapTransform))),h.clearcoat>0&&(g.clearcoat.value=h.clearcoat,g.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(g.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,g.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(g.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===en&&g.clearcoatNormalScale.value.negate())),h.dispersion>0&&(g.dispersion.value=h.dispersion),h.iridescence>0&&(g.iridescence.value=h.iridescence,g.iridescenceIOR.value=h.iridescenceIOR,g.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(g.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,g.iridescenceMapTransform)),h.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),h.transmission>0&&(g.transmission.value=h.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),h.transmissionMap&&(g.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,g.transmissionMapTransform)),g.thickness.value=h.thickness,h.thicknessMap&&(g.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=h.attenuationDistance,g.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(g.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(g.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=h.specularIntensity,g.specularColor.value.copy(h.specularColor),h.specularColorMap&&(g.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,g.specularColorMapTransform)),h.specularIntensityMap&&(g.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,h){h.matcap&&(g.matcap.value=h.matcap)}function x(g,h){const M=t.get(h).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function B_(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,E){const w=E.program;i.uniformBlockBinding(M,w)}function l(M,E){let w=s[M.id];w===void 0&&(p(M),w=d(M),s[M.id]=w,M.addEventListener("dispose",g));const D=E.program;i.updateUBOMapping(M,D);const P=t.render.frame;r[M.id]!==P&&(u(M),r[M.id]=P)}function d(M){const E=f();M.__bindingPointIndex=E;const w=n.createBuffer(),D=M.__size,P=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,D,P),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,w),w}function f(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return ne("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const E=s[M.id],w=M.uniforms,D=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let P=0,y=w.length;P<y;P++){const _=Array.isArray(w[P])?w[P]:[w[P]];for(let S=0,A=_.length;S<A;S++){const R=_[S];if(m(R,P,S,D)===!0){const C=R.__offset,L=Array.isArray(R.value)?R.value:[R.value];let V=0;for(let I=0;I<L.length;I++){const B=L[I],z=x(B);typeof B=="number"||typeof B=="boolean"?(R.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,C+V,R.__data)):B.isMatrix3?(R.__data[0]=B.elements[0],R.__data[1]=B.elements[1],R.__data[2]=B.elements[2],R.__data[3]=0,R.__data[4]=B.elements[3],R.__data[5]=B.elements[4],R.__data[6]=B.elements[5],R.__data[7]=0,R.__data[8]=B.elements[6],R.__data[9]=B.elements[7],R.__data[10]=B.elements[8],R.__data[11]=0):ArrayBuffer.isView(B)?R.__data.set(new B.constructor(B.buffer,B.byteOffset,R.__data.length)):(B.toArray(R.__data,V),V+=z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,C,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(M,E,w,D){const P=M.value,y=E+"_"+w;if(D[y]===void 0)return typeof P=="number"||typeof P=="boolean"?D[y]=P:ArrayBuffer.isView(P)?D[y]=P.slice():D[y]=P.clone(),!0;{const _=D[y];if(typeof P=="number"||typeof P=="boolean"){if(_!==P)return D[y]=P,!0}else{if(ArrayBuffer.isView(P))return!0;if(_.equals(P)===!1)return _.copy(P),!0}}return!1}function p(M){const E=M.uniforms;let w=0;const D=16;for(let y=0,_=E.length;y<_;y++){const S=Array.isArray(E[y])?E[y]:[E[y]];for(let A=0,R=S.length;A<R;A++){const C=S[A],L=Array.isArray(C.value)?C.value:[C.value];for(let V=0,I=L.length;V<I;V++){const B=L[V],z=x(B),K=w%D,nt=K%z.boundary,ft=K+nt;w+=nt,ft!==0&&D-ft<z.storage&&(w+=D-ft),C.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=w,w+=z.storage}}}const P=w%D;return P>0&&(w+=D-P),M.__size=w,M.__cache={},this}function x(M){const E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?Ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(E.boundary=16,E.storage=M.byteLength):Ut("WebGLRenderer: Unsupported uniform value type.",M),E}function g(M){const E=M.target;E.removeEventListener("dispose",g);const w=o.indexOf(E.__bindingPointIndex);o.splice(w,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function h(){for(const M in s)n.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:h}}const k_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Fn=null;function G_(){return Fn===null&&(Fn=new ru(k_,16,16,zi,ii),Fn.name="DFG_LUT",Fn.minFilter=Ye,Fn.magFilter=Ye,Fn.wrapS=Jn,Fn.wrapT=Jn,Fn.generateMipmaps=!1,Fn.needsUpdate=!0),Fn}class H_{constructor(t={}){const{canvas:e=zh(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:m=pn}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const x=m,g=new Set([pl,fl,hl]),h=new Set([pn,Gn,Vs,Ws,cl,dl]),M=new Uint32Array(4),E=new Int32Array(4),w=new N;let D=null,P=null;const y=[],_=[];let S=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const A=this;let R=!1,C=null;this._outputColorSpace=on;let L=0,V=0,I=null,B=-1,z=null;const K=new Re,nt=new Re;let ft=null;const Et=new Bt(0);let Ct=0,st=e.width,St=e.height,vt=1,$=null,_t=null;const lt=new Re(0,0,st,St),Nt=new Re(0,0,st,St);let kt=!1;const Ot=new Sl;let ye=!1,Qt=!1;const de=new pe,ve=new N,jt=new Re,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ee=!1;function ln(){return I===null?vt:1}let F=i;function Oe(b,O){return e.getContext(b,O)}try{const b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${rl}`),e.addEventListener("webglcontextlost",et,!1),e.addEventListener("webglcontextrestored",Lt,!1),e.addEventListener("webglcontextcreationerror",Ht,!1),F===null){const O="webgl2";if(F=Oe(O,b),F===null)throw Oe(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw ne("WebGLRenderer: "+b.message),b}let te,_e,mt,we,T,v,k,Z,it,rt,ht,Y,Q,bt,wt,ct,ot,zt,Wt,oe,U,at,j;function yt(){te=new G0(F),te.init(),U=new D_(F,te),_e=new I0(F,te,t,U),mt=new P_(F,te),_e.reversedDepthBuffer&&u&&mt.buffers.depth.setReversed(!0),we=new W0(F),T=new g_,v=new L_(F,te,mt,T,_e,U,we),k=new k0(A),Z=new Yf(F),at=new L0(F,Z),it=new H0(F,Z,we,at),rt=new q0(F,it,Z,at,we),zt=new X0(F,_e,v),wt=new U0(T),ht=new m_(A,k,te,_e,at,wt),Y=new z_(A,T),Q=new x_,bt=new E_(te),ot=new P0(A,k,mt,rt,p,c),ct=new C_(A,rt,_e),j=new B_(F,we,_e,mt),Wt=new D0(F,te,we),oe=new V0(F,te,we),we.programs=ht.programs,A.capabilities=_e,A.extensions=te,A.properties=T,A.renderLists=Q,A.shadowMap=ct,A.state=mt,A.info=we}yt(),x!==pn&&(S=new Y0(x,e.width,e.height,s,r));const dt=new F_(A,F);this.xr=dt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const b=te.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=te.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return vt},this.setPixelRatio=function(b){b!==void 0&&(vt=b,this.setSize(st,St,!1))},this.getSize=function(b){return b.set(st,St)},this.setSize=function(b,O,W=!0){if(dt.isPresenting){Ut("WebGLRenderer: Can't change size while VR device is presenting.");return}st=b,St=O,e.width=Math.floor(b*vt),e.height=Math.floor(O*vt),W===!0&&(e.style.width=b+"px",e.style.height=O+"px"),S!==null&&S.setSize(e.width,e.height),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(st*vt,St*vt).floor()},this.setDrawingBufferSize=function(b,O,W){st=b,St=O,vt=W,e.width=Math.floor(b*W),e.height=Math.floor(O*W),this.setViewport(0,0,b,O)},this.setEffects=function(b){if(x===pn){ne("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let O=0;O<b.length;O++)if(b[O].isOutputPass===!0){Ut("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(K)},this.getViewport=function(b){return b.copy(lt)},this.setViewport=function(b,O,W,G){b.isVector4?lt.set(b.x,b.y,b.z,b.w):lt.set(b,O,W,G),mt.viewport(K.copy(lt).multiplyScalar(vt).round())},this.getScissor=function(b){return b.copy(Nt)},this.setScissor=function(b,O,W,G){b.isVector4?Nt.set(b.x,b.y,b.z,b.w):Nt.set(b,O,W,G),mt.scissor(nt.copy(Nt).multiplyScalar(vt).round())},this.getScissorTest=function(){return kt},this.setScissorTest=function(b){mt.setScissorTest(kt=b)},this.setOpaqueSort=function(b){$=b},this.setTransparentSort=function(b){_t=b},this.getClearColor=function(b){return b.copy(ot.getClearColor())},this.setClearColor=function(){ot.setClearColor(...arguments)},this.getClearAlpha=function(){return ot.getClearAlpha()},this.setClearAlpha=function(){ot.setClearAlpha(...arguments)},this.clear=function(b=!0,O=!0,W=!0){let G=0;if(b){let H=!1;if(I!==null){const Mt=I.texture.format;H=g.has(Mt)}if(H){const Mt=I.texture.type,At=h.has(Mt),xt=ot.getClearColor(),Pt=ot.getClearAlpha(),Dt=xt.r,Vt=xt.g,$t=xt.b;At?(M[0]=Dt,M[1]=Vt,M[2]=$t,M[3]=Pt,F.clearBufferuiv(F.COLOR,0,M)):(E[0]=Dt,E[1]=Vt,E[2]=$t,E[3]=Pt,F.clearBufferiv(F.COLOR,0,E))}else G|=F.COLOR_BUFFER_BIT}O&&(G|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(G|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&F.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),C=b},this.dispose=function(){e.removeEventListener("webglcontextlost",et,!1),e.removeEventListener("webglcontextrestored",Lt,!1),e.removeEventListener("webglcontextcreationerror",Ht,!1),ot.dispose(),Q.dispose(),bt.dispose(),T.dispose(),k.dispose(),rt.dispose(),at.dispose(),j.dispose(),ht.dispose(),dt.dispose(),dt.removeEventListener("sessionstart",Vl),dt.removeEventListener("sessionend",Wl),Ti.stop()};function et(b){b.preventDefault(),rc("WebGLRenderer: Context Lost."),R=!0}function Lt(){rc("WebGLRenderer: Context Restored."),R=!1;const b=we.autoReset,O=ct.enabled,W=ct.autoUpdate,G=ct.needsUpdate,H=ct.type;yt(),we.autoReset=b,ct.enabled=O,ct.autoUpdate=W,ct.needsUpdate=G,ct.type=H}function Ht(b){ne("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Ce(b){const O=b.target;O.removeEventListener("dispose",Ce),ue(O)}function ue(b){Wn(b),T.remove(b)}function Wn(b){const O=T.get(b).programs;O!==void 0&&(O.forEach(function(W){ht.releaseProgram(W)}),b.isShaderMaterial&&ht.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,W,G,H,Mt){O===null&&(O=Fe);const At=H.isMesh&&H.matrixWorld.determinant()<0,xt=Qu(b,O,W,G,H);mt.setMaterial(G,At);let Pt=W.index,Dt=1;if(G.wireframe===!0){if(Pt=it.getWireframeAttribute(W),Pt===void 0)return;Dt=2}const Vt=W.drawRange,$t=W.attributes.position;let It=Vt.start*Dt,he=(Vt.start+Vt.count)*Dt;Mt!==null&&(It=Math.max(It,Mt.start*Dt),he=Math.min(he,(Mt.start+Mt.count)*Dt)),Pt!==null?(It=Math.max(It,0),he=Math.min(he,Pt.count)):$t!=null&&(It=Math.max(It,0),he=Math.min(he,$t.count));const Pe=he-It;if(Pe<0||Pe===1/0)return;at.setup(H,G,xt,W,Pt);let Ae,me=Wt;if(Pt!==null&&(Ae=Z.get(Pt),me=oe,me.setIndex(Ae)),H.isMesh)G.wireframe===!0?(mt.setLineWidth(G.wireframeLinewidth*ln()),me.setMode(F.LINES)):me.setMode(F.TRIANGLES);else if(H.isLine){let Xe=G.linewidth;Xe===void 0&&(Xe=1),mt.setLineWidth(Xe*ln()),H.isLineSegments?me.setMode(F.LINES):H.isLineLoop?me.setMode(F.LINE_LOOP):me.setMode(F.LINE_STRIP)}else H.isPoints?me.setMode(F.POINTS):H.isSprite&&me.setMode(F.TRIANGLES);if(H.isBatchedMesh)if(te.get("WEBGL_multi_draw"))me.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Xe=H._multiDrawStarts,Tt=H._multiDrawCounts,cn=H._multiDrawCount,se=Pt?Z.get(Pt).bytesPerElement:1,_n=T.get(G).currentProgram.getUniforms();for(let Un=0;Un<cn;Un++)_n.setValue(F,"_gl_DrawID",Un),me.render(Xe[Un]/se,Tt[Un])}else if(H.isInstancedMesh)me.renderInstances(It,Pe,H.count);else if(W.isInstancedBufferGeometry){const Xe=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Tt=Math.min(W.instanceCount,Xe);me.renderInstances(It,Pe,Tt)}else me.render(It,Pe)};function In(b,O,W){b.transparent===!0&&b.side===Zn&&b.forceSinglePass===!1?(b.side=en,b.needsUpdate=!0,er(b,O,W),b.side=Si,b.needsUpdate=!0,er(b,O,W),b.side=Zn):er(b,O,W)}this.compile=function(b,O,W=null){W===null&&(W=b),P=bt.get(W),P.init(O),_.push(P),W.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(P.pushLight(H),H.castShadow&&P.pushShadow(H))}),b!==W&&b.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(P.pushLight(H),H.castShadow&&P.pushShadow(H))}),P.setupLights();const G=new Set;return b.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const Mt=H.material;if(Mt)if(Array.isArray(Mt))for(let At=0;At<Mt.length;At++){const xt=Mt[At];In(xt,W,H),G.add(xt)}else In(Mt,W,H),G.add(Mt)}),P=_.pop(),G},this.compileAsync=function(b,O,W=null){const G=this.compile(b,O,W);return new Promise(H=>{function Mt(){if(G.forEach(function(At){T.get(At).currentProgram.isReady()&&G.delete(At)}),G.size===0){H(b);return}setTimeout(Mt,10)}te.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let mo=null;function Zu(b){mo&&mo(b)}function Vl(){Ti.stop()}function Wl(){Ti.start()}const Ti=new pu;Ti.setAnimationLoop(Zu),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(b){mo=b,dt.setAnimationLoop(b),b===null?Ti.stop():Ti.start()},dt.addEventListener("sessionstart",Vl),dt.addEventListener("sessionend",Wl),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){ne("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;C!==null&&C.renderStart(b,O);const W=dt.enabled===!0&&dt.isPresenting===!0,G=S!==null&&(I===null||W)&&S.begin(A,I);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),dt.enabled===!0&&dt.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(dt.cameraAutoUpdate===!0&&dt.updateCamera(O),O=dt.getCamera()),b.isScene===!0&&b.onBeforeRender(A,b,O,I),P=bt.get(b,_.length),P.init(O),P.state.textureUnits=v.getTextureUnits(),_.push(P),de.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Ot.setFromProjectionMatrix(de,zn,O.reversedDepth),Qt=this.localClippingEnabled,ye=wt.init(this.clippingPlanes,Qt),D=Q.get(b,y.length),D.init(),y.push(D),dt.enabled===!0&&dt.isPresenting===!0){const At=A.xr.getDepthSensingMesh();At!==null&&go(At,O,-1/0,A.sortObjects)}go(b,O,0,A.sortObjects),D.finish(),A.sortObjects===!0&&D.sort($,_t),Ee=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,Ee&&ot.addToRenderList(D,b),this.info.render.frame++,ye===!0&&wt.beginShadows();const H=P.state.shadowsArray;if(ct.render(H,b,O),ye===!0&&wt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(G&&S.hasRenderPass())===!1){const At=D.opaque,xt=D.transmissive;if(P.setupLights(),O.isArrayCamera){const Pt=O.cameras;if(xt.length>0)for(let Dt=0,Vt=Pt.length;Dt<Vt;Dt++){const $t=Pt[Dt];ql(At,xt,b,$t)}Ee&&ot.render(b);for(let Dt=0,Vt=Pt.length;Dt<Vt;Dt++){const $t=Pt[Dt];Xl(D,b,$t,$t.viewport)}}else xt.length>0&&ql(At,xt,b,O),Ee&&ot.render(b),Xl(D,b,O)}I!==null&&V===0&&(v.updateMultisampleRenderTarget(I),v.updateRenderTargetMipmap(I)),G&&S.end(A),b.isScene===!0&&b.onAfterRender(A,b,O),at.resetDefaultState(),B=-1,z=null,_.pop(),_.length>0?(P=_[_.length-1],v.setTextureUnits(P.state.textureUnits),ye===!0&&wt.setGlobalState(A.clippingPlanes,P.state.camera)):P=null,y.pop(),y.length>0?D=y[y.length-1]:D=null,C!==null&&C.renderEnd()};function go(b,O,W,G){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)W=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLightProbeGrid)P.pushLightProbeGrid(b);else if(b.isLight)P.pushLight(b),b.castShadow&&P.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Ot.intersectsSprite(b)){G&&jt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(de);const At=rt.update(b),xt=b.material;xt.visible&&D.push(b,At,xt,W,jt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Ot.intersectsObject(b))){const At=rt.update(b),xt=b.material;if(G&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),jt.copy(b.boundingSphere.center)):(At.boundingSphere===null&&At.computeBoundingSphere(),jt.copy(At.boundingSphere.center)),jt.applyMatrix4(b.matrixWorld).applyMatrix4(de)),Array.isArray(xt)){const Pt=At.groups;for(let Dt=0,Vt=Pt.length;Dt<Vt;Dt++){const $t=Pt[Dt],It=xt[$t.materialIndex];It&&It.visible&&D.push(b,At,It,W,jt.z,$t)}}else xt.visible&&D.push(b,At,xt,W,jt.z,null)}}const Mt=b.children;for(let At=0,xt=Mt.length;At<xt;At++)go(Mt[At],O,W,G)}function Xl(b,O,W,G){const{opaque:H,transmissive:Mt,transparent:At}=b;P.setupLightsView(W),ye===!0&&wt.setGlobalState(A.clippingPlanes,W),G&&mt.viewport(K.copy(G)),H.length>0&&tr(H,O,W),Mt.length>0&&tr(Mt,O,W),At.length>0&&tr(At,O,W),mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function ql(b,O,W,G){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(P.state.transmissionRenderTarget[G.id]===void 0){const It=te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float");P.state.transmissionRenderTarget[G.id]=new kn(1,1,{generateMipmaps:!0,type:It?ii:pn,minFilter:Ii,samples:Math.max(4,_e.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace})}const Mt=P.state.transmissionRenderTarget[G.id],At=G.viewport||K;Mt.setSize(At.z*A.transmissionResolutionScale,At.w*A.transmissionResolutionScale);const xt=A.getRenderTarget(),Pt=A.getActiveCubeFace(),Dt=A.getActiveMipmapLevel();A.setRenderTarget(Mt),A.getClearColor(Et),Ct=A.getClearAlpha(),Ct<1&&A.setClearColor(16777215,.5),A.clear(),Ee&&ot.render(W);const Vt=A.toneMapping;A.toneMapping=Bn;const $t=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),P.setupLightsView(G),ye===!0&&wt.setGlobalState(A.clippingPlanes,G),tr(b,W,G),v.updateMultisampleRenderTarget(Mt),v.updateRenderTargetMipmap(Mt),te.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let he=0,Pe=O.length;he<Pe;he++){const Ae=O[he],{object:me,geometry:Xe,material:Tt,group:cn}=Ae;if(Tt.side===Zn&&me.layers.test(G.layers)){const se=Tt.side;Tt.side=en,Tt.needsUpdate=!0,$l(me,W,G,Xe,Tt,cn),Tt.side=se,Tt.needsUpdate=!0,It=!0}}It===!0&&(v.updateMultisampleRenderTarget(Mt),v.updateRenderTargetMipmap(Mt))}A.setRenderTarget(xt,Pt,Dt),A.setClearColor(Et,Ct),$t!==void 0&&(G.viewport=$t),A.toneMapping=Vt}function tr(b,O,W){const G=O.isScene===!0?O.overrideMaterial:null;for(let H=0,Mt=b.length;H<Mt;H++){const At=b[H],{object:xt,geometry:Pt,group:Dt}=At;let Vt=At.material;Vt.allowOverride===!0&&G!==null&&(Vt=G),xt.layers.test(W.layers)&&$l(xt,O,W,Pt,Vt,Dt)}}function $l(b,O,W,G,H,Mt){b.onBeforeRender(A,O,W,G,H,Mt),b.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),H.onBeforeRender(A,O,W,G,b,Mt),H.transparent===!0&&H.side===Zn&&H.forceSinglePass===!1?(H.side=en,H.needsUpdate=!0,A.renderBufferDirect(W,O,G,H,b,Mt),H.side=Si,H.needsUpdate=!0,A.renderBufferDirect(W,O,G,H,b,Mt),H.side=Zn):A.renderBufferDirect(W,O,G,H,b,Mt),b.onAfterRender(A,O,W,G,H,Mt)}function er(b,O,W){O.isScene!==!0&&(O=Fe);const G=T.get(b),H=P.state.lights,Mt=P.state.shadowsArray,At=H.state.version,xt=ht.getParameters(b,H.state,Mt,O,W,P.state.lightProbeGridArray),Pt=ht.getProgramCacheKey(xt);let Dt=G.programs;G.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?O.environment:null,G.fog=O.fog;const Vt=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;G.envMap=k.get(b.envMap||G.environment,Vt),G.envMapRotation=G.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,Dt===void 0&&(b.addEventListener("dispose",Ce),Dt=new Map,G.programs=Dt);let $t=Dt.get(Pt);if($t!==void 0){if(G.currentProgram===$t&&G.lightsStateVersion===At)return jl(b,xt),$t}else xt.uniforms=ht.getUniforms(b),C!==null&&b.isNodeMaterial&&C.build(b,W,xt),b.onBeforeCompile(xt,A),$t=ht.acquireProgram(xt,Pt),Dt.set(Pt,$t),G.uniforms=xt.uniforms;const It=G.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(It.clippingPlanes=wt.uniform),jl(b,xt),G.needsLights=eh(b),G.lightsStateVersion=At,G.needsLights&&(It.ambientLightColor.value=H.state.ambient,It.lightProbe.value=H.state.probe,It.directionalLights.value=H.state.directional,It.directionalLightShadows.value=H.state.directionalShadow,It.spotLights.value=H.state.spot,It.spotLightShadows.value=H.state.spotShadow,It.rectAreaLights.value=H.state.rectArea,It.ltc_1.value=H.state.rectAreaLTC1,It.ltc_2.value=H.state.rectAreaLTC2,It.pointLights.value=H.state.point,It.pointLightShadows.value=H.state.pointShadow,It.hemisphereLights.value=H.state.hemi,It.directionalShadowMatrix.value=H.state.directionalShadowMatrix,It.spotLightMatrix.value=H.state.spotLightMatrix,It.spotLightMap.value=H.state.spotLightMap,It.pointShadowMatrix.value=H.state.pointShadowMatrix),G.lightProbeGrid=P.state.lightProbeGridArray.length>0,G.currentProgram=$t,G.uniformsList=null,$t}function Yl(b){if(b.uniformsList===null){const O=b.currentProgram.getUniforms();b.uniformsList=Gr.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function jl(b,O){const W=T.get(b);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.batchingColor=O.batchingColor,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.instancingMorph=O.instancingMorph,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}function Ju(b,O){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;w.setFromMatrixPosition(O.matrixWorld);for(let W=0,G=b.length;W<G;W++){const H=b[W];if(H.texture!==null&&H.boundingBox.containsPoint(w))return H}return null}function Qu(b,O,W,G,H){O.isScene!==!0&&(O=Fe),v.resetTextureUnits();const Mt=O.fog,At=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?O.environment:null,xt=I===null?A.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ee.workingColorSpace,Pt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Dt=k.get(G.envMap||At,Pt),Vt=G.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,$t=!!W.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),It=!!W.morphAttributes.position,he=!!W.morphAttributes.normal,Pe=!!W.morphAttributes.color;let Ae=Bn;G.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Ae=A.toneMapping);const me=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Xe=me!==void 0?me.length:0,Tt=T.get(G),cn=P.state.lights;if(ye===!0&&(Qt===!0||b!==z)){const xe=b===z&&G.id===B;wt.setState(G,b,xe)}let se=!1;G.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==cn.state.version||Tt.outputColorSpace!==xt||H.isBatchedMesh&&Tt.batching===!1||!H.isBatchedMesh&&Tt.batching===!0||H.isBatchedMesh&&Tt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Tt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Tt.instancing===!1||!H.isInstancedMesh&&Tt.instancing===!0||H.isSkinnedMesh&&Tt.skinning===!1||!H.isSkinnedMesh&&Tt.skinning===!0||H.isInstancedMesh&&Tt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Tt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Tt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Tt.instancingMorph===!1&&H.morphTexture!==null||Tt.envMap!==Dt||G.fog===!0&&Tt.fog!==Mt||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==wt.numPlanes||Tt.numIntersection!==wt.numIntersection)||Tt.vertexAlphas!==Vt||Tt.vertexTangents!==$t||Tt.morphTargets!==It||Tt.morphNormals!==he||Tt.morphColors!==Pe||Tt.toneMapping!==Ae||Tt.morphTargetsCount!==Xe||!!Tt.lightProbeGrid!=P.state.lightProbeGridArray.length>0)&&(se=!0):(se=!0,Tt.__version=G.version);let _n=Tt.currentProgram;se===!0&&(_n=er(G,O,H),C&&G.isNodeMaterial&&C.onUpdateProgram(G,_n,Tt));let Un=!1,li=!1,Vi=!1;const ge=_n.getUniforms(),Le=Tt.uniforms;if(mt.useProgram(_n.program)&&(Un=!0,li=!0,Vi=!0),G.id!==B&&(B=G.id,li=!0),Tt.needsLights){const xe=Ju(P.state.lightProbeGridArray,H);Tt.lightProbeGrid!==xe&&(Tt.lightProbeGrid=xe,li=!0)}if(Un||z!==b){mt.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ge.setValue(F,"projectionMatrix",b.projectionMatrix),ge.setValue(F,"viewMatrix",b.matrixWorldInverse);const di=ge.map.cameraPosition;di!==void 0&&di.setValue(F,ve.setFromMatrixPosition(b.matrixWorld)),_e.logarithmicDepthBuffer&&ge.setValue(F,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ge.setValue(F,"isOrthographic",b.isOrthographicCamera===!0),z!==b&&(z=b,li=!0,Vi=!0)}if(Tt.needsLights&&(cn.state.directionalShadowMap.length>0&&ge.setValue(F,"directionalShadowMap",cn.state.directionalShadowMap,v),cn.state.spotShadowMap.length>0&&ge.setValue(F,"spotShadowMap",cn.state.spotShadowMap,v),cn.state.pointShadowMap.length>0&&ge.setValue(F,"pointShadowMap",cn.state.pointShadowMap,v)),H.isSkinnedMesh){ge.setOptional(F,H,"bindMatrix"),ge.setOptional(F,H,"bindMatrixInverse");const xe=H.skeleton;xe&&(xe.boneTexture===null&&xe.computeBoneTexture(),ge.setValue(F,"boneTexture",xe.boneTexture,v))}H.isBatchedMesh&&(ge.setOptional(F,H,"batchingTexture"),ge.setValue(F,"batchingTexture",H._matricesTexture,v),ge.setOptional(F,H,"batchingIdTexture"),ge.setValue(F,"batchingIdTexture",H._indirectTexture,v),ge.setOptional(F,H,"batchingColorTexture"),H._colorsTexture!==null&&ge.setValue(F,"batchingColorTexture",H._colorsTexture,v));const ci=W.morphAttributes;if((ci.position!==void 0||ci.normal!==void 0||ci.color!==void 0)&&zt.update(H,W,_n),(li||Tt.receiveShadow!==H.receiveShadow)&&(Tt.receiveShadow=H.receiveShadow,ge.setValue(F,"receiveShadow",H.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&O.environment!==null&&(Le.envMapIntensity.value=O.environmentIntensity),Le.dfgLUT!==void 0&&(Le.dfgLUT.value=G_()),li){if(ge.setValue(F,"toneMappingExposure",A.toneMappingExposure),Tt.needsLights&&th(Le,Vi),Mt&&G.fog===!0&&Y.refreshFogUniforms(Le,Mt),Y.refreshMaterialUniforms(Le,G,vt,St,P.state.transmissionRenderTarget[b.id]),Tt.needsLights&&Tt.lightProbeGrid){const xe=Tt.lightProbeGrid;Le.probesSH.value=xe.texture,Le.probesMin.value.copy(xe.boundingBox.min),Le.probesMax.value.copy(xe.boundingBox.max),Le.probesResolution.value.copy(xe.resolution)}Gr.upload(F,Yl(Tt),Le,v)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Gr.upload(F,Yl(Tt),Le,v),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ge.setValue(F,"center",H.center),ge.setValue(F,"modelViewMatrix",H.modelViewMatrix),ge.setValue(F,"normalMatrix",H.normalMatrix),ge.setValue(F,"modelMatrix",H.matrixWorld),G.uniformsGroups!==void 0){const xe=G.uniformsGroups;for(let di=0,Wi=xe.length;di<Wi;di++){const Kl=xe[di];j.update(Kl,_n),j.bind(Kl,_n)}}return _n}function th(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function eh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(b,O,W){const G=T.get(b);G.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),T.get(b.texture).__webglTexture=O,T.get(b.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:W,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,O){const W=T.get(b);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0};const nh=F.createFramebuffer();this.setRenderTarget=function(b,O=0,W=0){I=b,L=O,V=W;let G=null,H=!1,Mt=!1;if(b){const xt=T.get(b);if(xt.__useDefaultFramebuffer!==void 0){mt.bindFramebuffer(F.FRAMEBUFFER,xt.__webglFramebuffer),K.copy(b.viewport),nt.copy(b.scissor),ft=b.scissorTest,mt.viewport(K),mt.scissor(nt),mt.setScissorTest(ft),B=-1;return}else if(xt.__webglFramebuffer===void 0)v.setupRenderTarget(b);else if(xt.__hasExternalTextures)v.rebindTextures(b,T.get(b.texture).__webglTexture,T.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Vt=b.depthTexture;if(xt.__boundDepthTexture!==Vt){if(Vt!==null&&T.has(Vt)&&(b.width!==Vt.image.width||b.height!==Vt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");v.setupDepthRenderbuffer(b)}}const Pt=b.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(Mt=!0);const Dt=T.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Dt[O])?G=Dt[O][W]:G=Dt[O],H=!0):b.samples>0&&v.useMultisampledRTT(b)===!1?G=T.get(b).__webglMultisampledFramebuffer:Array.isArray(Dt)?G=Dt[W]:G=Dt,K.copy(b.viewport),nt.copy(b.scissor),ft=b.scissorTest}else K.copy(lt).multiplyScalar(vt).floor(),nt.copy(Nt).multiplyScalar(vt).floor(),ft=kt;if(W!==0&&(G=nh),mt.bindFramebuffer(F.FRAMEBUFFER,G)&&mt.drawBuffers(b,G),mt.viewport(K),mt.scissor(nt),mt.setScissorTest(ft),H){const xt=T.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+O,xt.__webglTexture,W)}else if(Mt){const xt=O;for(let Pt=0;Pt<b.textures.length;Pt++){const Dt=T.get(b.textures[Pt]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Pt,Dt.__webglTexture,W,xt)}}else if(b!==null&&W!==0){const xt=T.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,xt.__webglTexture,W)}B=-1},this.readRenderTargetPixels=function(b,O,W,G,H,Mt,At,xt=0){if(!(b&&b.isWebGLRenderTarget)){ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=T.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&At!==void 0&&(Pt=Pt[At]),Pt){mt.bindFramebuffer(F.FRAMEBUFFER,Pt);try{const Dt=b.textures[xt],Vt=Dt.format,$t=Dt.type;if(b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xt),!_e.textureFormatReadable(Vt)){ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_e.textureTypeReadable($t)){ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-G&&W>=0&&W<=b.height-H&&F.readPixels(O,W,G,H,U.convert(Vt),U.convert($t),Mt)}finally{const Dt=I!==null?T.get(I).__webglFramebuffer:null;mt.bindFramebuffer(F.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(b,O,W,G,H,Mt,At,xt=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=T.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&At!==void 0&&(Pt=Pt[At]),Pt)if(O>=0&&O<=b.width-G&&W>=0&&W<=b.height-H){mt.bindFramebuffer(F.FRAMEBUFFER,Pt);const Dt=b.textures[xt],Vt=Dt.format,$t=Dt.type;if(b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xt),!_e.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const It=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,It),F.bufferData(F.PIXEL_PACK_BUFFER,Mt.byteLength,F.STREAM_READ),F.readPixels(O,W,G,H,U.convert(Vt),U.convert($t),0);const he=I!==null?T.get(I).__webglFramebuffer:null;mt.bindFramebuffer(F.FRAMEBUFFER,he);const Pe=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Bh(F,Pe,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,It),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Mt),F.deleteBuffer(It),F.deleteSync(Pe),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,O=null,W=0){const G=Math.pow(2,-W),H=Math.floor(b.image.width*G),Mt=Math.floor(b.image.height*G),At=O!==null?O.x:0,xt=O!==null?O.y:0;v.setTexture2D(b,0),F.copyTexSubImage2D(F.TEXTURE_2D,W,0,0,At,xt,H,Mt),mt.unbindTexture()};const ih=F.createFramebuffer(),sh=F.createFramebuffer();this.copyTextureToTexture=function(b,O,W=null,G=null,H=0,Mt=0){let At,xt,Pt,Dt,Vt,$t,It,he,Pe;const Ae=b.isCompressedTexture?b.mipmaps[Mt]:b.image;if(W!==null)At=W.max.x-W.min.x,xt=W.max.y-W.min.y,Pt=W.isBox3?W.max.z-W.min.z:1,Dt=W.min.x,Vt=W.min.y,$t=W.isBox3?W.min.z:0;else{const Le=Math.pow(2,-H);At=Math.floor(Ae.width*Le),xt=Math.floor(Ae.height*Le),b.isDataArrayTexture?Pt=Ae.depth:b.isData3DTexture?Pt=Math.floor(Ae.depth*Le):Pt=1,Dt=0,Vt=0,$t=0}G!==null?(It=G.x,he=G.y,Pe=G.z):(It=0,he=0,Pe=0);const me=U.convert(O.format),Xe=U.convert(O.type);let Tt;O.isData3DTexture?(v.setTexture3D(O,0),Tt=F.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(v.setTexture2DArray(O,0),Tt=F.TEXTURE_2D_ARRAY):(v.setTexture2D(O,0),Tt=F.TEXTURE_2D),mt.activeTexture(F.TEXTURE0),mt.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,O.flipY),mt.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),mt.pixelStorei(F.UNPACK_ALIGNMENT,O.unpackAlignment);const cn=mt.getParameter(F.UNPACK_ROW_LENGTH),se=mt.getParameter(F.UNPACK_IMAGE_HEIGHT),_n=mt.getParameter(F.UNPACK_SKIP_PIXELS),Un=mt.getParameter(F.UNPACK_SKIP_ROWS),li=mt.getParameter(F.UNPACK_SKIP_IMAGES);mt.pixelStorei(F.UNPACK_ROW_LENGTH,Ae.width),mt.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ae.height),mt.pixelStorei(F.UNPACK_SKIP_PIXELS,Dt),mt.pixelStorei(F.UNPACK_SKIP_ROWS,Vt),mt.pixelStorei(F.UNPACK_SKIP_IMAGES,$t);const Vi=b.isDataArrayTexture||b.isData3DTexture,ge=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){const Le=T.get(b),ci=T.get(O),xe=T.get(Le.__renderTarget),di=T.get(ci.__renderTarget);mt.bindFramebuffer(F.READ_FRAMEBUFFER,xe.__webglFramebuffer),mt.bindFramebuffer(F.DRAW_FRAMEBUFFER,di.__webglFramebuffer);for(let Wi=0;Wi<Pt;Wi++)Vi&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,T.get(b).__webglTexture,H,$t+Wi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,T.get(O).__webglTexture,Mt,Pe+Wi)),F.blitFramebuffer(Dt,Vt,At,xt,It,he,At,xt,F.DEPTH_BUFFER_BIT,F.NEAREST);mt.bindFramebuffer(F.READ_FRAMEBUFFER,null),mt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(H!==0||b.isRenderTargetTexture||T.has(b)){const Le=T.get(b),ci=T.get(O);mt.bindFramebuffer(F.READ_FRAMEBUFFER,ih),mt.bindFramebuffer(F.DRAW_FRAMEBUFFER,sh);for(let xe=0;xe<Pt;xe++)Vi?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Le.__webglTexture,H,$t+xe):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Le.__webglTexture,H),ge?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ci.__webglTexture,Mt,Pe+xe):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ci.__webglTexture,Mt),H!==0?F.blitFramebuffer(Dt,Vt,At,xt,It,he,At,xt,F.COLOR_BUFFER_BIT,F.NEAREST):ge?F.copyTexSubImage3D(Tt,Mt,It,he,Pe+xe,Dt,Vt,At,xt):F.copyTexSubImage2D(Tt,Mt,It,he,Dt,Vt,At,xt);mt.bindFramebuffer(F.READ_FRAMEBUFFER,null),mt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ge?b.isDataTexture||b.isData3DTexture?F.texSubImage3D(Tt,Mt,It,he,Pe,At,xt,Pt,me,Xe,Ae.data):O.isCompressedArrayTexture?F.compressedTexSubImage3D(Tt,Mt,It,he,Pe,At,xt,Pt,me,Ae.data):F.texSubImage3D(Tt,Mt,It,he,Pe,At,xt,Pt,me,Xe,Ae):b.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Mt,It,he,At,xt,me,Xe,Ae.data):b.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Mt,It,he,Ae.width,Ae.height,me,Ae.data):F.texSubImage2D(F.TEXTURE_2D,Mt,It,he,At,xt,me,Xe,Ae);mt.pixelStorei(F.UNPACK_ROW_LENGTH,cn),mt.pixelStorei(F.UNPACK_IMAGE_HEIGHT,se),mt.pixelStorei(F.UNPACK_SKIP_PIXELS,_n),mt.pixelStorei(F.UNPACK_SKIP_ROWS,Un),mt.pixelStorei(F.UNPACK_SKIP_IMAGES,li),Mt===0&&O.generateMipmaps&&F.generateMipmap(Tt),mt.unbindTexture()},this.initRenderTarget=function(b){T.get(b).__webglFramebuffer===void 0&&v.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?v.setTextureCube(b,0):b.isData3DTexture?v.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?v.setTexture2DArray(b,0):v.setTexture2D(b,0),mt.unbindTexture()},this.resetState=function(){L=0,V=0,I=null,mt.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}const rd={type:"change"},wl={type:"start"},bu={type:"end"},Ar=new ro,od=new Kn,V_=Math.cos(70*an.DEG2RAD),ze=new N,rn=2*Math.PI,fe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ko=1e-6;class W_ extends qf{constructor(t,e=null){super(t,e),this.state=fe.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qe.ROTATE,MIDDLE:Qe.DOLLY,RIGHT:Qe.PAN},this.touches={ONE:vn.ROTATE,TWO:vn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new ri,this._lastTargetPosition=new N,this._quat=new ri().setFromUnitVectors(t.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ja,this._sphericalDelta=new ja,this._scale=1,this._panOffset=new N,this._rotateStart=new Ft,this._rotateEnd=new Ft,this._rotateDelta=new Ft,this._panStart=new Ft,this._panEnd=new Ft,this._panDelta=new Ft,this._dollyStart=new Ft,this._dollyEnd=new Ft,this._dollyDelta=new Ft,this._dollyDirection=new N,this._mouse=new Ft,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=q_.bind(this),this._onPointerDown=X_.bind(this),this._onPointerUp=$_.bind(this),this._onContextMenu=tx.bind(this),this._onMouseWheel=K_.bind(this),this._onKeyDown=Z_.bind(this),this._onTouchStart=J_.bind(this),this._onTouchMove=Q_.bind(this),this._onMouseDown=Y_.bind(this),this._onMouseMove=j_.bind(this),this._interceptControlDown=ex.bind(this),this._interceptControlUp=nx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(rd),this.update(),this.state=fe.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;ze.copy(e).sub(this.target),ze.applyQuaternion(this._quat),this._spherical.setFromVector3(ze),this.autoRotate&&this.state===fe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=rn:i>Math.PI&&(i-=rn),s<-Math.PI?s+=rn:s>Math.PI&&(s-=rn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(ze.setFromSpherical(this._spherical),ze.applyQuaternion(this._quatInverse),e.copy(this.target).add(ze),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=ze.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new N(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new N(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=ze.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ar.origin.copy(this.object.position),Ar.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ar.direction))<V_?this.object.lookAt(this.target):(od.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ar.intersectPlane(od,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ko||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ko||this._lastTargetPosition.distanceToSquared(this.target)>Ko?(this.dispatchEvent(rd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?rn/60*this.autoRotateSpeed*t:rn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ze.setFromMatrixColumn(e,0),ze.multiplyScalar(-t),this._panOffset.add(ze)}_panUp(t,e){this.screenSpacePanning===!0?ze.setFromMatrixColumn(e,1):(ze.setFromMatrixColumn(e,0),ze.crossVectors(this.object.up,ze)),ze.multiplyScalar(t),this._panOffset.add(ze)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ze.copy(s).sub(this.target);let r=ze.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(rn*this._rotateDelta.x/e.clientHeight),this._rotateUp(rn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(rn*this._rotateDelta.x/e.clientHeight),this._rotateUp(rn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ft,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function X_(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function q_(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function $_(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(bu),this.state=fe.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Y_(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Qe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=fe.DOLLY;break;case Qe.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=fe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=fe.ROTATE}break;case Qe.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=fe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=fe.PAN}break;default:this.state=fe.NONE}this.state!==fe.NONE&&this.dispatchEvent(wl)}function j_(n){switch(this.state){case fe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case fe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case fe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function K_(n){this.enabled===!1||this.enableZoom===!1||this.state!==fe.NONE||(n.preventDefault(),this.dispatchEvent(wl),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(bu))}function Z_(n){this.enabled!==!1&&this._handleKeyDown(n)}function J_(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case vn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=fe.TOUCH_ROTATE;break;case vn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=fe.TOUCH_PAN;break;default:this.state=fe.NONE}break;case 2:switch(this.touches.TWO){case vn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=fe.TOUCH_DOLLY_PAN;break;case vn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=fe.TOUCH_DOLLY_ROTATE;break;default:this.state=fe.NONE}break;default:this.state=fe.NONE}this.state!==fe.NONE&&this.dispatchEvent(wl)}function Q_(n){switch(this._trackPointer(n),this.state){case fe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case fe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case fe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case fe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=fe.NONE}}function tx(n){this.enabled!==!1&&n.preventDefault()}function ex(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function nx(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class yu extends De{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Ft(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element&&e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const os=new N,ad=new pe,ld=new pe,cd=new N,dd=new N;class ix{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},c=t.element!==void 0?t.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.sortObjects=!0,this.getSize=function(){return{width:i,height:s}},this.render=function(p,x){p.matrixWorldAutoUpdate===!0&&p.updateMatrixWorld(),x.parent===null&&x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),ad.copy(x.matrixWorldInverse),ld.multiplyMatrices(x.projectionMatrix,ad),d(p,p,x),this.sortObjects&&m(p)},this.setSize=function(p,x){i=p,s=x,r=i/2,o=s/2,c.style.width=p+"px",c.style.height=x+"px"};function l(p){p.isCSS2DObject&&(p.element.style.display="none");for(let x=0,g=p.children.length;x<g;x++)l(p.children[x])}function d(p,x,g){if(p.visible===!1){l(p);return}if(p.isCSS2DObject){os.setFromMatrixPosition(p.matrixWorld),os.applyMatrix4(ld);const h=os.z>=-1&&os.z<=1&&p.layers.test(g.layers)===!0,M=p.element;M.style.display=h===!0?"":"none",h===!0&&(p.onBeforeRender(e,x,g),M.style.transform="translate("+-100*p.center.x+"%,"+-100*p.center.y+"%)translate("+(os.x*r+r)+"px,"+(-os.y*o+o)+"px)",M.parentNode!==c&&c.appendChild(M),p.onAfterRender(e,x,g));const E={distanceToCameraSquared:f(g,p)};a.objects.set(p,E)}for(let h=0,M=p.children.length;h<M;h++)d(p.children[h],x,g)}function f(p,x){return cd.setFromMatrixPosition(p.matrixWorld),dd.setFromMatrixPosition(x.matrixWorld),cd.distanceToSquared(dd)}function u(p){const x=[];return p.traverseVisible(function(g){g.isCSS2DObject&&x.push(g)}),x}function m(p){const x=u(p).sort(function(h,M){if(h.renderOrder!==M.renderOrder)return M.renderOrder-h.renderOrder;const E=a.objects.get(h).distanceToCameraSquared,w=a.objects.get(M).distanceToCameraSquared;return E-w}),g=x.length;for(let h=0,M=x.length;h<M;h++)x[h].element.style.zIndex=g-h}}}class sx extends nu{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const t=new Ne;t.deleteAttribute("uv");const e=new Qr({side:en}),i=new Qr,s=new hu(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Kt(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new yf(t,i,6),a=new De;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);const c=new Kt(t,as(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new Kt(t,as(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const d=new Kt(t,as(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);const f=new Kt(t,as(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const u=new Kt(t,as(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const m=new Kt(t,as(100));m.position.set(0,20,0),m.scale.set(1,.1,1),this.add(m)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function as(n){return new Ff({color:0,emissive:16777215,emissiveIntensity:n})}const q={sky:15985891,ground:15392723,wall:16052714,wallExt:15526628,trim:16777215,doorLeaf:13215612,doorEntrance:3494010,glass:11130101,frame:4871528,floorWood:13608570,woodLight:14201994,woodMid:12159838,woodDark:8017462,tileFloor:15331058,tileGrout:13489886,sofa:6258598,sofaDark:4612223,fabricBeige:14931392,fabricGrey:11844806,bedding:16118766,blanket:8298639,rug:14272942,black:2303533,steel:12831443,white:16448250,counter:15856372,cabinet:14341062,cabinetDark:7174792,leaf:5810286,leafDark:4163670,pot:13616307,accent:15246141,label:12999226},Zo={...q},Pi=(n,t,e)=>new Bt(n).lerp(new Bt(t),e).getHex();function rx(n){Object.assign(q,Zo),q.floorWood=n.floor,q.wall=n.wall,q.wallExt=Pi(n.wall,0,.04),q.woodMid=n.wood,q.woodLight=Pi(n.wood,16777215,.22),q.woodDark=Pi(n.wood,0,.35),q.cabinet=Pi(Zo.cabinet,n.wood,.18),q.sofa=n.sofa,q.sofaDark=Pi(n.sofa,0,.25),q.accent=n.accent,q.blanket=Pi(n.accent,16777215,.3),q.rug=Pi(Zo.rug,n.floor,.25)}const Jo=new Map;function Cn(n,t={}){const e=`${n}|${JSON.stringify(t)}`;return Jo.has(e)||Jo.set(e,new Qr({color:n,roughness:.78,metalness:0,...t})),Jo.get(e)}function Qa(){return Cn(q.glass,{transparent:!0,opacity:.28,roughness:.05,depthWrite:!1})}const tl=30,ud=72,Qo=[4.5,34],ta=[.15,1.35],ea=new N(5,0,3.5),hd=Math.PI*2,ox=n=>n<.5?4*n*n*n:1-(-2*n+2)**3/2;function ax(){const n=window.matchMedia?.("(pointer: coarse)").matches||Math.min(window.innerWidth,window.innerHeight)<640;return{coarse:n,maxDpr:n?1.5:2,shadowSize:n?1024:2048,pointLights:!n}}function lx(n,t=ax()){const e=new H_({antialias:!0,powerPreference:"high-performance",stencil:!1});let i=Math.min(window.devicePixelRatio||1,t.maxDpr);e.setPixelRatio(i),e.outputColorSpace=on,e.toneMapping=al,e.toneMappingExposure=1,e.shadowMap.enabled=!0,e.shadowMap.type=Bs,e.shadowMap.autoUpdate=!1,e.shadowMap.needsUpdate=!0,Object.assign(e.domElement.style,{display:"block",width:"100%",height:"100%",touchAction:"none",outline:"none"});const s=new nu;s.background=new Bt(q.sky),s.fog=new Ml(q.sky,40,120);const r=new hn(tl,1,.05,300);r.rotation.order="YXZ";const o=new ix;Object.assign(o.domElement.style,{position:"absolute",left:"0",top:"0",pointerEvents:"none",overflow:"hidden"}),getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.append(e.domElement,o.domElement);const a=new W_(r,e.domElement);a.enableDamping=!0,a.dampingFactor=.1,a.rotateSpeed=.6,a.zoomSpeed=.9,a.minDistance=Qo[0],a.maxDistance=Qo[1],a.minPolarAngle=ta[0],a.maxPolarAngle=ta[1],a.screenSpacePanning=!1,a.touches={ONE:vn.ROTATE,TWO:vn.DOLLY_PAN},a.mouseButtons={LEFT:Qe.ROTATE,MIDDLE:Qe.DOLLY,RIGHT:Qe.PAN},a.target.copy(ea);const c=new Bf(16774118,15787736,1.1);s.add(c);const l=new Hf(16777215,2.4);l.castShadow=!0,l.shadow.mapSize.set(t.shadowSize,t.shadowSize),l.shadow.bias=-5e-4,l.shadow.normalBias=.03,l.shadow.radius=4;const d=l.shadow.camera;d.left=-9,d.right=9,d.top=9,d.bottom=-9,d.near=1,d.far=60,l.target.position.copy(ea),s.add(l,l.target);const f=new Ka(e),u=new sx;s.environment=f.fromScene(u,.04).texture,s.environmentIntensity=.25,u.dispose(),f.dispose();const m={left:0,right:0,top:0,bottom:0},p={...m};let x={w:1,h:1};function g(){const st=(p.left-p.right)/2,St=(p.top-p.bottom)/2;Math.abs(st)<.5&&Math.abs(St)<.5?r.clearViewOffset():r.setViewOffset(x.w,x.h,-st,-St,x.w,x.h),r.updateProjectionMatrix()}const h=new Set,M=new Xf;let E=3,w=!1,D=0,P=0;function y(st=2){st>E&&(E=st)}const _=()=>{const st=n.clientWidth||window.innerWidth,St=n.clientHeight||window.innerHeight;x={w:st,h:St},e.setSize(st,St,!1),o.setSize(st,St),r.aspect=st/St,g(),y()};function S(st){if(!w){P=0,D=0;return}P++,st>.03&&D++,P>=40&&(D>28&&i>.9&&(i=Math.max(.9,i-.25),e.setPixelRatio(i),e.setSize(x.w,x.h,!1)),P=0,D=0)}function A(){const st=Math.min(.1,M.getDelta());for(const vt of h)vt(st);let St=!1;for(const vt of["left","right","top","bottom"]){const $=m[vt]-p[vt];Math.abs($)>.4?(p[vt]+=$*Math.min(1,st*10),St=!0):p[vt]=m[vt]}St&&(g(),y()),E>0?(E--,e.render(s,r),o.render(s,r),S(st),w=!0):w=!1}a.addEventListener("change",()=>y());const R=new N,C=new ja;function L(){return C.setFromVector3(R.copy(r.position).sub(a.target)),{target:a.target.clone(),distance:C.radius,azimuth:C.theta,polar:C.phi}}function V({target:st,distance:St,azimuth:vt,polar:$}){a.target.set(st.x,st.y??0,st.z),r.position.copy(a.target).add(R.setFromSphericalCoords(St,$,vt)),r.lookAt(a.target)}const I=st=>st-hd*Math.floor((st+Math.PI)/hd);function B(st){const St=new N(st.target.x,st.target.y??0,st.target.z),vt=new N().setFromSphericalCoords(st.distance,st.polar,st.azimuth).add(St),$=new De;return $.position.copy(vt),$.lookAt(St),{pos:vt,quat:$.quaternion.clone(),fov:tl}}let z=null;function K(){a._sphericalDelta?.set(0,0,0),a._panOffset?.set(0,0,0),"_scale"in a&&(a._scale=1)}function nt(){if(!z)return;const st=z;z=null,K(),st.resolve(!1)}a.addEventListener("start",nt);function ft(st,{duration:St=1.1}={}){nt();const vt=L(),$={target:new N(st.target?.x??vt.target.x,st.target?.y??0,st.target?.z??vt.target.z),distance:an.clamp(st.distance??vt.distance,...Qo),azimuth:st.azimuth??vt.azimuth,polar:an.clamp(st.polar??vt.polar,...ta)};return St>0?new Promise(_t=>{z={kind:"view",from:vt,to:$,duration:St,resolve:_t,t:0,dAz:I($.azimuth-vt.azimuth),d0:Math.log(vt.distance),d1:Math.log($.distance)},y(3)}):(V($),K(),y(),Promise.resolve(!0))}function Et(st,{duration:St=1.2}={}){return nt(),St>0?new Promise(vt=>{z={kind:"pose",pose:st,duration:St,resolve:vt,t:0,fromPos:r.position.clone(),fromQuat:r.quaternion.clone(),fromFov:r.fov},y(3)}):(r.position.copy(st.pos),r.quaternion.copy(st.quat),r.fov=st.fov,r.updateProjectionMatrix(),y(),Promise.resolve(!0))}function Ct(st){if(!z)return;const St=z;St.t=Math.min(1,St.t+st/St.duration);const vt=ox(St.t);if(St.kind==="view")R.lerpVectors(St.from.target,St.to.target,vt),V({target:R.clone(),distance:Math.exp(an.lerp(St.d0,St.d1,vt)),azimuth:St.from.azimuth+St.dAz*vt,polar:an.lerp(St.from.polar,St.to.polar,vt)});else{r.position.lerpVectors(St.fromPos,St.pose.pos,vt),r.quaternion.slerpQuaternions(St.fromQuat,St.pose.quat,vt);const $=an.lerp(St.fromFov,St.pose.fov,vt);$!==r.fov&&(r.fov=$,r.updateProjectionMatrix())}y(),St.t>=1&&(z=null,K(),St.resolve(!0))}return h.add(Ct),_(),new ResizeObserver(_).observe(n),document.addEventListener("visibilitychange",()=>y(3)),{renderer:e,scene:s,camera:r,controls:a,labelRenderer:o,hemi:c,sun:l,center:ea,quality:t,insets:m,invalidate:y,invalidateShadows(){e.shadowMap.needsUpdate=!0,y()},onFrame(st){return h.add(st),()=>h.delete(st)},flyView:ft,flyPose:Et,viewPose:B,cancelFlight:nt,getView:L,get flying(){return!!z},setInsets(st){Object.assign(m,st),y()},start(){e.setAnimationLoop(A)},pause(){e.setAnimationLoop(null)},resume(){M.getDelta(),e.setAnimationLoop(A),y(3)}}}function Eu(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new sn;let l=0;for(let d=0;d<n.length;++d){const f=n[d];let u=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in f.attributes){if(!i.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;r[m]===void 0&&(r[m]=[]),r[m].push(f.attributes[m]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in f.morphAttributes){if(!s.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;o[m]===void 0&&(o[m]=[]),o[m].push(f.morphAttributes[m])}if(t){let m;if(e)m=f.index.count;else if(f.attributes.position!==void 0)m=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,m,d),l+=m}}if(e){let d=0;const f=[];for(let u=0;u<n.length;++u){const m=n[u].index;for(let p=0;p<m.count;++p)f.push(m.getX(p)+d);d+=n[u].attributes.position.count}c.setIndex(f)}for(const d in r){const f=fd(r[d]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,f)}for(const d in o){const f=o[d][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let u=0;u<f;++u){const m=[];for(let x=0;x<o[d].length;++x)m.push(o[d][x][u]);const p=fd(m);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(p)}}}return c}function fd(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){const d=n[l];if(t===void 0&&(t=d.array.constructor),t!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=d.itemSize),e!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=d.normalized),i!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=d.gpuType),s!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=d.count*e}const o=new t(r),a=new Sn(o,e,i);let c=0;for(let l=0;l<n.length;++l){const d=n[l];if(d.isInterleavedBufferAttribute){const f=c/e;for(let u=0,m=d.count;u<m;u++)for(let p=0;p<e;p++){const x=d.getComponent(u,p);a.setComponent(u+f,p,x)}}else o.set(d.array,c);c+=d.count*e}return s!==void 0&&(a.gpuType=s),a}const xi=2.7,Tu=.2,wu=.12,Bi=n=>(n.x1-n.x0)*(n.z1-n.z0),tt={templateId:"",bedrooms:2,scale:1,size:{w:10,d:7},rooms:[],walls:[],placements:[],area:0,totalArea:0,floors:[],floorId:"main",custom:!1};function Au(n){tt.templateId=n.templateId,tt.bedrooms=n.bedrooms,tt.scale=n.scale??1,tt.size=n.size,tt.rooms=n.rooms,tt.walls=n.walls,tt.placements=n.placements,tt.area=n.rooms.reduce((t,e)=>t+Bi(e),0),tt.floors=n.floors??[{id:"main",name:"Tầng 1",area:tt.area}],tt.floorId=n.floorId??"main",tt.totalArea=n.totalArea??tt.area,tt.custom=!!n.custom}const el=2.1,cx=.9,Ru=2.1,dx=2.3;function oi(n,t=256){const e=document.createElement("canvas");e.width=e.height=t,n(e.getContext("2d"),t);const i=new Cf(e);return i.wrapS=i.wrapT=Wr,i.colorSpace=on,i.anisotropy=8,i}const ux=()=>{const n={h:0,s:0,l:0};return new Bt(q.floorWood).getHSL(n),oi((t,e)=>{const s=e/8;for(let r=0;r<8;r++){const o=Math.round(n.l*100)-3+r*37%7;t.fillStyle=`hsl(${Math.round(n.h*360)} ${Math.round(n.s*100)}% ${o}%)`,t.fillRect(0,r*s,e,s),t.fillStyle="rgba(60,35,15,0.07)";for(let a=0;a<14;a++)t.fillRect((r*53+a*37)%e,r*s+a*29%s,30+a*17%60,1);t.fillStyle="rgba(60,35,15,0.30)",t.fillRect(0,r*s,e,1.5),t.fillRect(r*97%e,r*s,1.5,s)}})},hx=()=>oi((n,t)=>{n.fillStyle="#e9eef2",n.fillRect(0,0,t,t),n.strokeStyle="#c8d1da",n.lineWidth=3,n.strokeRect(0,0,t,t),n.strokeRect(t/2,0,.1,t),n.strokeRect(0,t/2,t,.1)}),Ys=n=>()=>(n=(n*1664525+1013904223)%4294967296,n/4294967296),fx=()=>oi((n,t)=>{const e=Ys(7);n.fillStyle="#efece6",n.fillRect(0,0,t,t),n.lineCap="round";for(let i=0;i<9;i++){n.strokeStyle=`rgba(120,115,110,${.12+e()*.2})`,n.lineWidth=.6+e()*1.6,n.beginPath();let s=e()*t,r=0;n.moveTo(s,r);for(let o=0;o<6;o++)s+=(e()-.5)*70,r+=t/6,n.lineTo(s,r);n.stroke()}n.strokeStyle="rgba(190,185,178,0.7)",n.lineWidth=1.5,n.strokeRect(0,0,t,t)}),px=()=>oi((n,t)=>{const e=Ys(11);n.fillStyle="#b9bcc0",n.fillRect(0,0,t,t);for(let i=0;i<2200;i++){const s=150+Math.floor(e()*70);n.fillStyle=`rgba(${s},${s},${s+4},0.35)`,n.fillRect(e()*t,e()*t,1+e()*2,1+e()*2)}n.strokeStyle="rgba(90,92,96,0.45)",n.lineWidth=2,n.strokeRect(0,0,t,t)}),mx=()=>oi((n,t)=>{const e=Ys(3);n.fillStyle="#c9bfb2",n.fillRect(0,0,t,t);for(let i=0;i<4200;i++){const s=175+Math.floor(e()*45);n.fillStyle=`rgba(${s},${s-8},${s-20},0.55)`,n.fillRect(e()*t,e()*t,1,2)}}),gx=()=>oi((n,t)=>{const e=Ys(21),i=6,s=t/i;for(let r=0;r<i;r++){const o=17+Math.floor(e()*6);n.fillStyle=`hsl(22 38% ${o}%)`,n.fillRect(0,r*s,t,s),n.fillStyle="rgba(0,0,0,0.18)";for(let a=0;a<10;a++)n.fillRect(e()*t,r*s+e()*s,30+e()*80,1);n.fillStyle="rgba(0,0,0,0.5)",n.fillRect(0,r*s,t,1.5),n.fillRect(r*83%t,r*s,1.5,s)}}),_x=()=>oi((n,t)=>{const e=Ys(31);n.fillStyle="#6f7378",n.fillRect(0,0,t,t);for(let i=0;i<3200;i++){const s=70+Math.floor(e()*130);n.fillStyle=`rgba(${s},${s},${s+3},0.6)`,n.fillRect(e()*t,e()*t,1+e()*2.2,1+e()*2.2)}n.strokeStyle="rgba(30,32,36,0.55)",n.lineWidth=2,n.strokeRect(0,0,t,t)}),xx=()=>oi((n,t)=>{n.fillStyle="#f2f3f1",n.fillRect(0,0,t,t),n.strokeStyle="rgba(160,165,160,0.35)",n.lineWidth=1,n.strokeRect(0,0,t,t)}),vx=()=>oi((n,t)=>{n.fillStyle="#cfe9f2",n.fillRect(0,0,t,t),n.strokeStyle="rgba(90,120,135,0.9)",n.lineWidth=5,n.strokeRect(0,0,t,t),n.strokeStyle="rgba(255,255,255,0.55)",n.lineWidth=3,n.beginPath(),n.moveTo(t*.15,t*.85),n.lineTo(t*.55,t*.15),n.stroke()}),pd={wood:[ux,2.2,.55],darkwood:[gx,2.2,.5],tile:[hx,1.2,.3],marble:[fx,1.6,.15],granite:[_x,1.6,.25],concrete:[px,2,.85],epoxy:[xx,2,.08],carpet:[mx,1,1],glass:[vx,1.2,.05,{transparent:!0,opacity:.42,depthWrite:!1,metalness:.1}]},md=new Map;function Mx(n,t){const e=n==="wood"?`wood|${q.floorWood}`:n;let i=md.get(e);return i||(i=t(),md.set(e,i)),i}function Sx(n){const t=pd[n.floor]?n.floor:"wood",[e,i,s,r]=pd[t],o=Mx(t,e).clone();return o.needsUpdate=!0,o.repeat.set((n.x1-n.x0)/i,(n.z1-n.z0)/i),new Qr({map:o,roughness:s,...r??{}})}const Hr=[];function gd(n,t,e,i,s,r,o,a,c,l){if(i-e<1e-4||r-s<1e-4||a-o<1e-4)return;const d=new Ne(i-e,r-s,a-o);d.translate((e+i)/2,(s+r)/2,(o+a)/2),Hr.push({material:c,geo:d}),l&&t.push({x0:e,x1:i,z0:o,z1:a})}function bx(n){const t=Cn(q.frame);for(const i of[...n.children])if(i.isMesh&&i.material===t){i.updateMatrix();const s=i.geometry.clone().applyMatrix4(i.matrix);Hr.push({material:t,geo:s}),i.geometry.dispose(),n.remove(i)}const e=new Map;for(const{material:i,geo:s}of Hr)e.has(i)||e.set(i,[]),e.get(i).push(s);for(const[i,s]of e){const r=new Kt(Eu(s,!1),i);r.castShadow=!0,r.receiveShadow=!0,r.userData.blocker=!0,n.add(r);for(const o of s)o.dispose()}Hr.length=0}function yx(n,t,e){const{dir:i,at:s,t:r}=n,o=r/2,a=n.from-o,c=n.to+o,l=r>=.2,d=Cn(l?q.wallExt:q.wall),f=[...n.openings].map(p=>({...p,s:p.c-p.w/2,e:p.c+p.w/2})).sort((p,x)=>p.s-x.s),u=(p,x,g,h,M)=>{i==="x"?gd(t,e,p,x,g,h,s-o,s+o,d,M):gd(t,e,s-o,s+o,g,h,p,x,d,M)};let m=a;for(const p of f){if(u(m,p.s,0,xi,!0),p.type==="window"){const x=p.sill??cx;u(p.s,p.e,0,x,!0),u(p.s,p.e,Ru,xi,!1),Ex(t,i,s,p,x)}else p.type==="door"?(u(p.s,p.e,el,xi,!1),Tx(t,i,s,p,l||p.entrance===!0)):u(p.s,p.e,dx,xi,!1);m=p.e}u(m,c,0,xi,!0)}function Ex(n,t,e,i,s){const r=Ru-s,o=t==="x"?[i.w,r,.03]:[.03,r,i.w],a=new Kt(new Ne(...o),Qa()),c=s+r/2;t==="x"?a.position.set(i.c,c,e):a.position.set(e,c,i.c),n.add(a);const l=i.w>1.1?1:0,d=Cn(q.frame);for(let u=-1;u<=l;u+=2){const m=l?0:u<0?-i.w/2:i.w/2,p=new Kt(new Ne(...t==="x"?[.04,r,.06]:[.06,r,.04]),d);t==="x"?p.position.set(i.c+m,c,e):p.position.set(e,c,i.c+m),n.add(p)}const f=new Kt(new Ne(...t==="x"?[i.w,.04,.08]:[.08,.04,i.w]),d);t==="x"?f.position.set(i.c,s+.02,e):f.position.set(e,s+.02,i.c),n.add(f)}function Tx(n,t,e,i,s){const r=i.w-.04,o=new Kt(new Ne(r,el-.03,.045),Cn(s?q.doorEntrance:q.doorLeaf,{roughness:.5}));o.position.set(r/2,(el-.03)/2,0),o.castShadow=!0;const a=new Jt;a.add(o),t==="x"?(a.position.set(i.s+.02,0,e),a.rotation.y=s?0:-1.3):(a.position.set(e,0,i.s+.02),a.rotation.y=-Math.PI/2+(s?0:1.3)),n.add(a)}function wx(n){const t=document.createElement("button");t.type="button",t.className="room-label",t.dataset.room=n.id,t.innerHTML=`<b>${n.name}</b><span>${Bi(n).toFixed(0)} m²</span>`;const e=new yu(t);return e.position.set((n.x0+n.x1)/2,.5,(n.z0+n.z1)/2),e}const Ax=new gs({visible:!1}),Rx={window:"Cửa sổ",door:"Cửa đi",open:"Ô thông"};function Cx(n){const t=[];for(const e of tt.walls)for(const i of e.openings){if(!i.id)continue;const s=e.t+.3,r=e.dir==="x"?[i.w,.9,s]:[s,.9,i.w],o=new Kt(new Ne(...r),Ax);e.dir==="x"?o.position.set(i.c,.45,e.at):o.position.set(e.at,.45,i.c),o.userData.ref={type:"opening",id:i.id},o.userData.label=Rx[i.type]??"Cửa",n.add(o),t.push({id:i.id,mesh:o})}return t}function Px(){const n=new Jt,t=new Jt,e=[],i=new Kt(new bl(60,48),Cn(q.ground,{roughness:1}));i.rotation.x=-Math.PI/2,i.position.set(tt.size.w/2,-.21,tt.size.d/2),i.receiveShadow=!0,n.add(i);const s=new Kt(new Ne(tt.size.w+.9,.2,tt.size.d+.9),Cn(14932176));s.position.set(tt.size.w/2,-.1,tt.size.d/2),s.receiveShadow=!0,s.castShadow=!0,n.add(s);const r=[],o=new Map;for(const f of tt.rooms){const u=new Kt(new Ne(f.x1-f.x0,.04,f.z1-f.z0),Sx(f));u.position.set((f.x0+f.x1)/2,.02,(f.z0+f.z1)/2),u.receiveShadow=!0,u.userData.ref={type:"room",id:f.id},o.set(f.id,u),n.add(u);const m=wx(f);n.add(m),r.push(m)}for(const f of tt.walls)yx(f,t,e);bx(t),n.add(t);const a=new Jt;n.add(a);const c=Cx(a),l=new Kt(new Ne(tt.size.w+.2,.1,tt.size.d+.2),Cn(q.trim,{roughness:.95}));l.position.set(tt.size.w/2,xi+.05,tt.size.d/2),l.castShadow=!0,l.receiveShadow=!0,l.visible=!1,n.add(l);const d=tt.rooms.map(f=>{const u=new hu(16773336,7,8,2);return u.position.set((f.x0+f.x1)/2,xi-.3,(f.z0+f.z1)/2),n.add(u),u});return{root:n,walls:t,ceiling:l,labels:r,lamps:d,colliders:e,floors:o,openings:c}}function pt(n,t,e,i,s,r,o,a,c){const l=new Kt(new Ne(t,e,i),typeof s=="object"?s:Cn(s,c));return l.position.set(r,o+e/2,a),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function Te(n,t,e,i,s,r,o,a,c,l=24){const d=new Kt(new yl(t,e,i,l),Cn(s,c));return d.position.set(r,o+i/2,a),d.castShadow=!0,d.receiveShadow=!0,n.add(d),d}function Vr(n,t,e,i,s,r,o=1,a=1,c=1){const l=new Kt(new ao(t,16,12),Cn(e));return l.position.set(i,s,r),l.scale.set(o,a,c),l.castShadow=!0,n.add(l),l}const Se=(n,t,e,i={})=>({group:n,w:t,d:e,...i});function Lx(n=2.4){const t=new Jt,e=.95;pt(t,n,.16,e,q.sofaDark,0,.08,0);const i=3,s=(n-.3)/i;for(let r=0;r<i;r++)pt(t,s-.02,.2,.68,q.sofa,-n/2+.15+s*(r+.5),.24,.1);pt(t,n,.5,.22,q.sofa,0,.24,-e/2+.11);for(const r of[-1,1])pt(t,.15,.36,e,q.sofa,r*(n/2-.075),.24,0);return pt(t,.45,.4,.12,q.accent,-n/2+.55,.44,-.2),pt(t,.45,.4,.12,q.fabricBeige,n/2-.55,.44,-.2),Se(t,n,e)}function Dx(){const n=new Jt;pt(n,.85,.16,.85,q.sofaDark,0,.08,0),pt(n,.6,.18,.6,q.fabricBeige,0,.24,.07),pt(n,.85,.5,.2,q.fabricBeige,0,.24,-.325);for(const t of[-1,1])pt(n,.13,.34,.85,q.fabricBeige,t*.36,.24,0);return Se(n,.85,.85)}function Ix(){const n=new Jt;pt(n,1.1,.04,.6,q.woodLight,0,.38,0);for(const t of[-1,1])for(const e of[-1,1])pt(n,.05,.38,.05,q.woodDark,t*.5,0,e*.25);return pt(n,.3,.05,.2,q.white,-.2,.42,0),Te(n,.06,.05,.1,q.accent,.25,.42,.05),Se(n,1.1,.6)}function Ux(n=1.8){const t=new Jt;return pt(t,n,.45,.4,q.woodMid,0,0,0),pt(t,n-.1,.02,.38,q.woodDark,0,.22,.01),pt(t,1.35,.78,.05,q.black,0,.55,0),pt(t,.25,.1,.12,q.black,0,.45,0),Se(t,n,.4)}function Nx(n,t,e=q.rug){e==="beige"&&(e=q.fabricBeige);const i=new Jt;return pt(i,n,.015,t,e,0,.04,0),pt(i,n-.3,.017,t-.3,q.fabricGrey,0,.04,0),Se(i,n,t,{solid:!1})}function Fx(n=1){const t=new Jt;return Te(t,.18*n,.13*n,.32*n,q.pot,0,0,0),Vr(t,.3*n,q.leaf,0,.62*n,0,1,1.2,1),Vr(t,.2*n,q.leafDark,.12*n,.85*n,.05*n),Vr(t,.18*n,q.leaf,-.1*n,.95*n,-.05*n),Se(t,.4*n,.4*n)}function Ox(){const n=new Jt;Te(n,.12,.12,.03,q.black,0,0,0),Te(n,.012,.012,1.5,q.black,0,.03,0);const t=Te(n,.15,.22,.28,16773590,0,1.45,0,{emissive:16769704,emissiveIntensity:.6});return t.castShadow=!1,Se(n,.3,.3)}function zx(n=1){const t=new Jt;pt(t,n,.04,.3,q.woodMid,0,.78,0),pt(t,n-.04,.5,.28,q.cabinet,0,.28,0);for(const e of[-1,1])pt(t,.04,.28,.04,q.woodDark,e*(n/2-.05),0,0);return Te(t,.07,.05,.16,q.pot,-.25,.82,0),pt(t,.22,.02,.15,q.accent,.2,.82,0),Se(t,n,.3)}function Bx(n=1.6,t=2){const e=new Jt;pt(e,n+.1,.25,t+.05,q.woodDark,0,0,0),pt(e,n,.22,t,q.bedding,0,.25,.02),pt(e,n,.04,t*.55,q.blanket,0,.46,t*.2),pt(e,n+.1,.95,.08,q.woodMid,0,0,-t/2-0);for(const i of[-1,1])pt(e,.55,.12,.35,q.white,i*n*.25,.47,-t/2+.3);return Se(e,n+.1,t+.05)}function kx(){const n=new Jt;pt(n,.45,.5,.4,q.woodLight,0,0,0),pt(n,.4,.01,.01,q.woodDark,0,.3,.2);const t=Te(n,.09,.12,.16,16773590,0,.5,0,{emissive:16769704,emissiveIntensity:.5});return t.castShadow=!1,Se(n,.45,.4)}function Gx(n=1.4,t=2.2){const e=new Jt;pt(e,n,t,.6,q.cabinet,0,0,0);const i=Math.max(2,Math.round(n/.7));for(let s=1;s<i;s++)pt(e,.012,t-.1,.01,q.cabinetDark,-n/2+n/i*s,.05,.305);for(let s=0;s<i;s++){const r=-n/2+n/i*(s+.5);pt(e,.025,.28,.02,q.steel,r+(s%2?-.1:.1),1,.31)}return Se(e,n,.6)}function Hx(){const n=new Jt;pt(n,1.2,.04,.6,q.woodLight,0,.72,0);for(const t of[-1,1])pt(n,.04,.72,.55,q.woodDark,t*.56,0,0);return pt(n,.5,.3,.03,q.black,0,.9,-.12),pt(n,.06,.18,.06,q.black,0,.76,-.12),pt(n,.4,.015,.14,q.white,0,.76,.1),Se(n,1.2,.6)}function Vx(){const n=new Jt;pt(n,.42,.04,.42,q.woodLight,0,.44,0);for(const t of[-1,1])for(const e of[-1,1])pt(n,.035,.44,.035,q.woodDark,t*.18,0,e*.18);return pt(n,.42,.42,.04,q.woodLight,0,.48,-.19),Se(n,.42,.42)}function Wx(){const n=new Jt;pt(n,1.4,.05,.8,q.woodLight,0,.72,0);for(const t of[-1,1])for(const e of[-1,1])pt(n,.06,.72,.06,q.woodDark,t*.64,0,e*.34);return Te(n,.11,.08,.16,q.white,0,.77,0),Vr(n,.1,q.accent,0,1,0),Se(n,1.4,.8)}function Xx(n=3,t=!0){const e=new Jt,i=.6;pt(e,n,.86,i,q.cabinet,0,0,0),pt(e,n+.02,.04,i+.04,q.counter,0,.86,.02);for(let s=1;s<Math.round(n/.6);s++)pt(e,.01,.8,.01,q.cabinetDark,-n/2+s*.6,.03,i/2+.005);pt(e,.7,.012,.42,q.steel,-n*.25,.9,.02),Te(e,.015,.015,.28,q.steel,-n*.25,.9,-.2),pt(e,.012,.012,.14,q.steel,-n*.25,1.17,-.13),pt(e,.6,.012,.5,q.black,n*.2,.9,.02);for(const[s,r]of[[-.14,-.1],[.14,-.1],[-.14,.12],[.14,.12]])Te(e,.08,.08,.008,q.cabinetDark,n*.2+s,.9,.02+r,{},20);return pt(e,n,.7,.35,q.cabinet,0,1.5,-.125),pt(e,.75,.12,.4,q.steel,n*.2,1.38,-.1),Se(e,n,i)}function qx(){const n=new Jt;return pt(n,.7,1.85,.7,q.steel,0,0,0,{metalness:.35,roughness:.4}),pt(n,.68,.012,.01,q.cabinetDark,0,.62,.355),pt(n,.025,.5,.03,q.cabinetDark,.28,1.1,.36),pt(n,.025,.3,.03,q.cabinetDark,.28,.25,.36),Se(n,.7,.7)}function $x(n=1.2){const t=new Jt,e=.32,i=2;pt(t,.03,i,e,q.woodMid,-n/2+.015,0,0),pt(t,.03,i,e,q.woodMid,n/2-.015,0,0),pt(t,n,.02,.01,q.woodDark,0,0,-e/2+.005),pt(t,n,i,.015,q.woodDark,0,0,-e/2+.01);const s=5,r=[q.accent,q.sofa,q.fabricBeige,q.leaf,q.blanket];for(let o=0;o<=s;o++)pt(t,n,.025,e,q.woodMid,0,(i-.025)*(o/s),0);for(let o=0;o<s;o++){const a=(i-.025)*(o/s)+.025;let c=-n/2+.07;for(let l=0;c<n/2-.12;l++){const d=.04+(o*7+l*5)%4*.012,f=.22+(o*3+l*7)%5*.025;pt(t,d,f,e*.7,r[(o+l)%r.length],c+d/2,a,.02),c+=d+.008,l%6===5&&(c+=.18)}}return Se(t,n,e)}function Yx(){const n=new Jt;pt(n,1,.8,.45,q.woodLight,0,.05,0);for(const t of[-1,1])for(const e of[-1,1])pt(n,.04,.05,.04,q.woodDark,t*.45,0,e*.19);for(let t=0;t<3;t++)pt(n,.92,.002,.01,q.woodDark,0,.05+.26*(t+1)-.02,.226),pt(n,.1,.02,.025,q.steel,0,.05+.26*t+.13,.235);return Te(n,.07,.06,.12,q.pot,-.3,.85,0),pt(n,.22,.03,.16,q.accent,.25,.85,0),Se(n,1,.45)}function jx(){const n=new Jt;return Te(n,.24,.24,.03,q.woodLight,0,.47,0,{},28),Te(n,.015,.015,.47,q.black,0,0,0),Te(n,.15,.15,.02,q.black,0,0,0),Te(n,.05,.04,.09,q.pot,.06,.5,.03),Se(n,.5,.5)}function Kx(){const n=new Jt;return Te(n,.28,.3,.38,q.fabricBeige,0,.02,0,{},28),Te(n,.29,.29,.04,q.sofaDark,0,.38,0,{},28),Se(n,.6,.6)}function Zx(){const n=new Jt;return Te(n,.17,.17,.05,q.woodLight,0,.62,0,{},24),Te(n,.014,.014,.62,q.black,0,0,0),Te(n,.15,.15,.02,q.black,0,0,0),Se(n,.36,.36)}function Jx(){const n=new Jt;return pt(n,.6,1.7,.04,q.woodDark,0,.05,0),pt(n,.5,1.6,.012,13624303,0,.1,.022,{metalness:.9,roughness:.08}),pt(n,.04,.5,.2,q.woodDark,-.2,0,-.12),pt(n,.04,.5,.2,q.woodDark,.2,0,-.12),Se(n,.6,.3)}function Qx(){const n=new Jt;return pt(n,.38,.4,.2,q.white,0,.35,-.2),pt(n,.36,.38,.5,q.white,0,0,0),pt(n,.36,.04,.4,q.white,0,.38,.05),Se(n,.4,.62)}function tv(){const n=new Jt;return pt(n,.6,.78,.5,q.cabinet,0,0,0),pt(n,.64,.04,.54,q.counter,0,.78,0),pt(n,.34,.01,.28,q.white,0,.82,.02),Te(n,.012,.012,.16,q.steel,0,.82,-.18),pt(n,.5,.7,.02,q.glass,0,1.15,-.24,{transparent:!0,opacity:.55,metalness:.8,roughness:.05}),Se(n,.64,.54)}function ev(){const n=new Jt;pt(n,.9,.06,.9,q.white,0,0,0);const t=new Kt(new Ne(.9,1.95,.025),Qa());t.position.set(0,.06+.975,.45),n.add(t);const e=new Kt(new Ne(.025,1.95,.9),Qa());return e.position.set(.45,.06+.975,0),n.add(e),Te(n,.012,.012,1.1,q.steel,-.38,1,-.38),Te(n,.09,.09,.015,q.steel,-.3,2.05,-.38),Se(n,.9,.9)}function nv(n,t,e,i,s,r=0){if(e.group.position.set(i,0,s),e.group.rotation.y=r,n.add(e.group),e.solid===!1)return e.group;const o=Math.abs(Math.sin(r))>.5,a=o?e.d:e.w,c=o?e.w:e.d;return t.push({x0:i-a/2,x1:i+a/2,z0:s-c/2,z1:s+c/2}),e.group}const iv={sofa:Lx,armchair:Dx,coffeeTable:Ix,tvUnit:Ux,rug:Nx,plant:Fx,floorLamp:Ox,console:zx,bed:Bx,nightstand:kx,wardrobe:Gx,desk:Hx,chair:Vx,diningTable:Wx,kitchenRun:Xx,fridge:qx,toilet:Qx,vanity:tv,shower:ev,bookshelf:$x,dresser:Yx,sideTable:jx,ottoman:Kx,barStool:Zx,standingMirror:Jx};function sv(n){n.updateMatrixWorld(!0);const t=new Map;for(const e of[...n.children]){if(!e.isMesh)continue;const i=e.material.uuid+(e.castShadow?"c":"n");t.has(i)||t.set(i,{material:e.material,cast:e.castShadow,geos:[]});const s=e.geometry.clone();s.applyMatrix4(e.matrix),t.get(i).geos.push(s),e.geometry.dispose(),n.remove(e)}for(const e of t.values()){const i=e.geos.length>1?Eu(e.geos,!1):e.geos[0];if(e.geos.length>1)for(const r of e.geos)r.dispose();const s=new Kt(i,e.material);s.castShadow=e.cast,s.receiveShadow=!0,n.add(s)}}function rv(){const n=new Jt,t=[],e=new Map;for(const i of tt.placements){const s=iv[i.kind];if(!s)throw new Error("Thiếu builder nội thất: "+i.kind);const r=s(...i.args??[]);(i.pick===!1||i.hidden)&&(r.solid=!1),sv(r.group);const o=nv(n,t,r,i.x,i.z,i.rot??0);o.name=i.id,i.hidden&&(o.visible=!1),e.set(i.id,o)}return{root:n,colliders:t,groups:e}}const Ni={room:new Map,item:new Map,opening:new Map},ov={window:"Cửa sổ",door:"Cửa đi",open:"Ô thông"};function Cu(n,t){return tt.rooms.find(e=>n>=e.x0&&n<=e.x1&&t>=e.z0&&t<=e.z1)??null}function Pu(){Ni.room=new Map(tt.rooms.map(n=>[n.id,{...n,type:"room",area:Bi(n)}])),Ni.item=new Map(tt.placements.filter(n=>n.pick).map(n=>[n.id,{...n,type:"item",roomId:Cu(n.x,n.z)?.id??null,dims:null}])),Ni.opening=new Map(tt.walls.flatMap(n=>n.openings.filter(t=>t.id).map(t=>[t.id,{...t,kind:t.type,type:"opening",name:av(t.type),dir:n.dir,at:n.at,wallFrom:n.from,wallTo:n.to,roomId:null}])))}const av=n=>ov[n]??"Cửa",ce={get:(n,t)=>Ni[n]?.get(t)??null,list:n=>[...Ni[n]?.values()??[]],itemsIn:n=>[...Ni.item.values()].filter(t=>t.roomId===n),room:n=>Ni.room.get(n)??null},Rr=.14,lv=new Bt(15985891),cv=new Bt(15913909),dv=new Bt(16758904),uv=new Bt(16775406);function hv(n){const t=[];n.traverse(e=>{e.isCSS2DObject&&t.push(e)});for(const e of t)e.removeFromParent()}function fv(n){n.traverse(t=>{t.isMesh&&(t.geometry?.dispose(),t.material?.map&&(t.material.map.dispose(),t.material.dispose()))})}function pv(n){const{scene:t,sun:e,hemi:i,quality:s}=n;let r=null,o=null,a=[];const c=new Map,l=new Map,d=[],f=[];let u=!1;const m=[],p=[],x=(S,A)=>`${S}:${A}`;let g=Rr,h=Rr,M=1.5,E=!1,w=10;function D(){for(const S of[r?.root,o?.root])S&&(hv(S),t.remove(S),fv(S));r=o=null,a=[],c.clear(),l.clear(),d.length=0,f.length=0,m.length=0,p.length=0}function P(){const S=tt.size.w,A=tt.size.d;n.center.set(S/2,0,A/2),e.target.position.copy(n.center);const R=Math.max(S,A)*.9,C=e.shadow.camera;C.left=-R,C.right=R,C.top=R,C.bottom=-R,C.updateProjectionMatrix()}function y(){if(r=Px(),o=rv(),t.add(r.root,o.root),!s.pointLights)for(const A of r.lamps)r.root.remove(A);a=s.pointLights?r.lamps:[];for(const A of ce.list("room")){const R=r.floors.get(A.id);c.set(x("room",A.id),R),d.push(R),l.set(x("room",A.id),new Mn(new N(A.x0,0,A.z0),new N(A.x1,.08,A.z1)))}const S=new N;for(const A of ce.list("item")){const R=o.groups.get(A.id);if(!R)continue;R.userData.ref={type:"item",id:A.id},c.set(x("item",A.id),R),d.push(R);const C=new Mn().setFromObject(R);l.set(x("item",A.id),C),C.getSize(S),A.dims={w:S.x,d:S.z,h:S.y}}for(const A of r.openings)c.set(x("opening",A.id),A.mesh),l.set(x("opening",A.id),new Mn().setFromObject(A.mesh)),f.push(A.mesh);u&&d.push(...f),m.push(...r.walls.children.filter(A=>A.isMesh)),p.push(...r.colliders,...o.colliders),P(),_.snapWalking(E),_.setHour(w)}const _={pickables:d,blockers:m,colliders:p,get walls(){return r?.walls},get ceiling(){return r?.ceiling},get labels(){return r?.labels??[]},getObject:(S,A)=>c.get(x(S,A))??null,getBox:(S,A=new Mn)=>{const R=l.get(x(S.type,S.id));return R?A.copy(R):null},getEntityPosition(S,A,R=new N){const C=l.get(x(S,A));return C?C.getCenter(R):null},setEditing(S){u=S;for(const A of f){const R=d.indexOf(A);S&&R<0&&d.push(A),!S&&R>=0&&d.splice(R,1)}},moveItem(S,A,R){const C=c.get(x("item",S));if(!C)return;C.position.x=A,C.position.z=R;const L=l.get(x("item",S));L&&L.setFromObject(C),n.invalidate()},rebuild(){D(),y(),n.invalidateShadows()},setWalking(S){E=S,g=S?1:Rr,M=S?16:1.5,t.environmentIntensity=S?.8:.25,!S&&r&&(r.ceiling.visible=!1),n.invalidate(3)},setCeiling(S){r&&(r.ceiling.visible=S),n.invalidateShadows()},setHour(S){w=S;const R=an.clamp((S-6)/12,0,1)*Math.PI,C=Math.sin(R),L=n.center;e.position.set(L.x-Math.cos(R)*16,3+C*15,L.z+8),e.intensity=.7+2.3*C,e.color.lerpColors(dv,uv,Math.min(1,C*1.6)),i.intensity=.7+.6*C,t.background.lerpColors(cv,lv,Math.min(1,C*1.6)),t.fog.color.copy(t.background),n.invalidateShadows()},update(S){r&&h!==g&&(h+=(g-h)*Math.min(1,S*5),Math.abs(g-h)<.002&&(h=g),r.walls.scale.y=h,n.invalidateShadows());for(const A of a)A.intensity!==M&&(A.intensity+=(M-A.intensity)*Math.min(1,S*4),Math.abs(M-A.intensity)<.02&&(A.intensity=M),n.invalidate())},snapWalking(S){E=S,h=g=S?1:Rr,M=S?16:1.5,t.environmentIntensity=S?.8:.25,r&&(r.walls.scale.y=h,r.ceiling.visible=S);for(const A of a)A.intensity=M;n.invalidateShadows()},wallHeight:xi};return y(),_}const Lu=1.62,_d=.28,mv=1.9,gv=3.4,xd=.0036,Cr=.3,vd={KeyW:[0,-1],ArrowUp:[0,-1],KeyS:[0,1],ArrowDown:[0,1],KeyA:[-1,0],KeyD:[1,0]},na={ArrowLeft:1,ArrowRight:-1,KeyQ:1,KeyE:-1};function ia(n,t,e){for(const i of n){const s=Math.max(i.x0,Math.min(t,i.x1)),r=Math.max(i.z0,Math.min(e,i.z1)),o=t-s,a=e-r;if(o*o+a*a<_d*_d)return!0}return!1}function _v({camera:n,dom:t,colliders:e}){const i={x:5,z:.7,yaw:Math.PI,pitch:0,enabled:!1},s=new Set;let r=null,o=null;const a={x:0,z:0},c=m=>{!i.enabled||/^(INPUT|TEXTAREA|SELECT)$/.test(m.target?.tagName??"")||(vd[m.code]||na[m.code]||m.code==="ShiftLeft")&&(s.add(m.code),m.preventDefault())},l=m=>s.delete(m.code),d=()=>s.clear();window.addEventListener("keydown",c),window.addEventListener("keyup",l),window.addEventListener("blur",d),t.addEventListener("pointerdown",m=>{i.enabled&&(r={id:m.pointerId,x:m.clientX,y:m.clientY},t.setPointerCapture(m.pointerId))}),t.addEventListener("pointermove",m=>{!r||m.pointerId!==r.id||(i.yaw-=(m.clientX-r.x)*xd,i.pitch=an.clamp(i.pitch-(m.clientY-r.y)*xd,-1.25,1.25),r.x=m.clientX,r.y=m.clientY)});const f=m=>{r&&m.pointerId===r.id&&(r=null)};t.addEventListener("pointerup",f),t.addEventListener("pointercancel",f);function u(){n.position.set(i.x,Lu,i.z),n.rotation.set(i.pitch,i.yaw,0,"YXZ")}return{state:i,set(m,p,x,g=0){i.x=m,i.z=p,i.yaw=x,i.pitch=g},setEnabled(m){i.enabled=m,o=null,m||(s.clear(),r=null,a.x=a.z=0)},setAxis(m,p){a.x=m,a.z=p},press(m,p){p?s.add(m):s.delete(m)},update(m){if(!i.enabled)return!1;for(const M of s)na[M]&&(i.yaw+=na[M]*1.8*m);let p=a.x,x=a.z;for(const M of s){const E=vd[M];E&&(p+=E[0],x+=E[1])}if(p||x){const M=Math.max(1,Math.hypot(p,x));p/=M,x/=M;const E=(s.has("ShiftLeft")?gv:mv)*m,w=Math.sin(i.yaw),D=Math.cos(i.yaw),P=(p*D+x*w)*E,y=(-p*w+x*D)*E,_=an.clamp(i.x+P,Cr,tt.size.w-Cr),S=an.clamp(i.z+y,Cr,tt.size.d-Cr),A=ia(e,i.x,i.z);(A||!ia(e,_,i.z))&&(i.x=_),(A||!ia(e,i.x,S))&&(i.z=S)}u();const g=i.x+i.z*31+i.yaw*57+i.pitch*91,h=g!==o;return o=g,h},applyToCamera:u,dispose(){window.removeEventListener("keydown",c),window.removeEventListener("keyup",l),window.removeEventListener("blur",d)}}}const xv={mode:"overview",roomId:null,selection:null,hover:null,hour:10,playing:!1,menu:null,searchQuery:"",editable:!1,editing:!1,tool:null,listingArea:0,floorId:null,editPanel:null,designs:[],designId:null};function vv(n){let t={...n};const e=new Set;return{get state(){return t},set(i){const s=t,r=Object.keys(i).filter(o=>!Object.is(s[o],i[o]));if(r.length){t={...s,...i};for(const o of[...e])o(t,s,r)}},subscribe(i){return e.add(i),()=>e.delete(i)}}}const X=vv(xv);X.select=function(t){if(!t)return X.set({selection:null});const e=ce.get(t.type,t.id);if(!e)return;const i=t.type==="opening"?X.state.roomId:e.roomId??e.id;X.set({selection:{type:t.type,id:t.id},roomId:i,menu:null})};function Mv(){const n=new Map;return{on(t,e){return n.has(t)||n.set(t,new Set),n.get(t).add(e),()=>n.get(t)?.delete(e)},emit(t,e){for(const i of[...n.get(t)??[]])i(e)}}}const Rt=Mv();function Pr(){const{w:n,d:t}=tt.size;return{target:{x:n/2,y:0,z:t/2},distance:Math.max(n,t)*1.1+7.5,azimuth:Math.PI-.5,polar:.95}}function Sv(){for(const n of tt.walls){const t=n.openings.find(e=>e.entrance);if(t)return n.dir==="x"?{x:t.c,z:n.at+.75,yaw:n.at===0?Math.PI:0}:{x:n.at+.75,z:t.c,yaw:n.at===0?-Math.PI/2:Math.PI/2}}return{x:tt.size.w/2,z:tt.size.d/2,yaw:Math.PI}}const bv={zoomIn:.75,zoomOut:1.33},Lr=Math.PI/6,Dr=.12;function yv(n,t,e){const{camera:i,controls:s}=n,r=new N;let o=!1,a=null;const c=()=>a??n.getView();function l(y,_){const S={...n.getView(),...y,target:y.target??s.target.clone()};a=S,n.flyView(y,_).then(()=>{a===S&&(a=null)})}function d(y){const _=c(),S=y.x1-y.x0,A=y.z1-y.z0;return{target:{x:(y.x0+y.x1)/2,y:0,z:(y.z0+y.z1)/2},distance:Math.max(S,A)*1.45+3.5,azimuth:_.azimuth,polar:an.clamp(_.polar,.7,1.1)}}function f(y,_=8){const S=t.getEntityPosition(y.type,y.id,new N);if(!S)return null;const A=c();return{target:{x:S.x,y:0,z:S.z},distance:_,azimuth:A.azimuth,polar:an.clamp(A.polar,.7,1.1)}}function u({x:y,z:_,yaw:S,pitch:A=0}){const R=new ri().setFromEuler(new Hn(A,S,0,"YXZ"));return{pos:new N(y,Lu,_),quat:R,fov:ud}}async function m(y,_=1.4){s.enabled=!1,e.setEnabled(!1),t.setWalking(!0),e.set(y.x,y.z,y.yaw,0),!(!await n.flyPose(u(y),{duration:_})||X.state.mode!=="walk")&&(t.setCeiling(!0),e.setEnabled(!0),n.invalidate())}async function p(y=Pr(),_=1.4){e.setEnabled(!1),t.setWalking(!1);const S=n.viewPose({...y,target:y.target});!await n.flyPose(S,{duration:_})||X.state.mode!=="overview"||(n.camera.fov=S.fov,n.camera.updateProjectionMatrix(),s.target.set(y.target.x,0,y.target.z),s.enabled=!0,s.update(),n.invalidate())}function x(y){return y?.stand??Sv()}function g(y){const _=ce.room(X.state.roomId);y==="walk"?m(x(_)):p(_?d(_):Pr())}function h(y){const _=ce.room(y);if(_)if(X.set({roomId:y}),X.state.mode==="walk"){e.setEnabled(!1);const S=x(_);e.set(S.x,S.z,S.yaw,0),n.flyPose(u(S),{duration:1}).then(A=>{A&&X.state.mode==="walk"&&e.setEnabled(!0)})}else l(d(_),{duration:1.1})}function M(y){if(i.updateMatrixWorld(),r.copy(y).project(i),r.z>1)return null;const _=n.renderer.domElement.clientWidth,S=n.renderer.domElement.clientHeight,{left:A,right:R,top:C,bottom:L}=n.insets,V=(r.x+1)/2*_,I=(1-r.y)/2*S,B=Math.max(1,_-A-R),z=Math.max(1,S-C-L);return{fx:(V-A)/B,fy:(I-C)/z}}function E(y){if(X.state.mode!=="overview"||n.flying)return;const _=t.getEntityPosition(y.type,y.id,new N);if(!_)return;const S=n.getView(),A=M(_.clone().setY(.4));if(A&&A.fx>Dr&&A.fx<1-Dr&&A.fy>Dr&&A.fy<1-Dr&&S.distance<22)return;const C=f(y,Math.min(S.distance,9));C&&l(C,{duration:.9})}function w(y){const _=t.getEntityPosition(y.type,y.id,new N);if(_)if(X.state.mode==="walk"){const S=ce.room(X.state.roomId)??ce.room(Cu(_.x,_.z)?.id),A=S?(S.x0+S.x1)/2:_.x,R=S?(S.z0+S.z1)/2:_.z,C=new Ft(A-_.x,R-_.z);C.lengthSq()<1e-4&&C.set(0,1),C.normalize();const L={x:an.clamp(_.x+C.x*1.9,.35,9.65),z:an.clamp(_.z+C.y*1.9,.35,6.65)},V=Math.atan2(-(_.x-L.x),-(_.z-L.z));e.setEnabled(!1),e.set(L.x,L.z,V,-.12),n.flyPose(u({...L,yaw:V,pitch:-.12}),{duration:.9}).then(I=>{I&&X.state.mode==="walk"&&e.setEnabled(!0)})}else{const S=f(y,y.type==="room"?12:6.5);S&&l(S,{duration:1})}}function D({cmd:y}={}){if(X.state.mode==="walk"){y==="rotateLeft"||y==="rotateRight"?(e.state.yaw+=y==="rotateLeft"?Lr:-Lr,n.invalidate()):y==="home"&&h(X.state.roomId??"living");return}const _=c(),S={target:_.target,distance:_.distance,azimuth:_.azimuth,polar:_.polar};switch(y){case"zoomIn":case"zoomOut":return l({...S,distance:_.distance*bv[y]},{duration:.45});case"rotateLeft":case"rotateRight":return l({...S,azimuth:_.azimuth+(y==="rotateLeft"?-Lr:Lr)},{duration:.6});case"home":return l(Pr(),{duration:1.1})}}const P=[X.subscribe((y,_,S)=>{n.invalidate(),S.includes("mode")&&!o?g(y.mode):S.includes("selection")&&y.selection&&y.selection.type==="item"&&!y.editing&&E(y.selection)}),Rt.on("room:go",({id:y})=>h(y)),Rt.on("camera:locate",y=>y.type==="room"?h(y.id):w(y)),Rt.on("camera:cmd",D)];return{start({walk:y=!1,room:_=null}={}){a=null;const S=_?ce.room(_):null;if(S&&X.set({roomId:S.id}),y){o=!0,X.set({mode:"walk"}),o=!1,s.enabled=!1;const A=x(S);e.set(A.x,A.z,A.yaw,0),e.applyToCamera(),i.fov=ud,i.updateProjectionMatrix(),t.snapWalking(!0),e.setEnabled(!0)}else o=!0,X.set({mode:"overview"}),o=!1,e.setEnabled(!1),i.fov=tl,i.updateProjectionMatrix(),t.snapWalking(!1),s.enabled=!0,n.flyView(S?d(S):Pr(),{duration:0})},update(){X.state.mode==="overview"&&s.enabled&&!n.flying&&s.update()},dispose(){P.forEach(y=>y())}}}const Md=6,Ev=.12,Tv=.05,Du=(n,t)=>n===t||!!n&&!!t&&n.type===t.type&&n.id===t.id;function wv(n,t){const e=new Jt;e.name="interaction-overlay",n.scene.add(e);const i=Av(n,t),s=Sd(e,"selected"),r=Sd(e,"hover"),o=()=>{const{hover:c,selection:l}=X.state;s.show(l,t),r.show(Du(c,l)?null:c,t),n.invalidate()},a=X.subscribe((c,l,d)=>{(d.includes("selection")||d.includes("hover"))&&o()});return{refresh:o,update(c){i.update(c)},dispose(){a(),i.dispose(),n.scene.remove(e)}}}function Av(n,t){const e=n.renderer.domElement,i=new fu,s=new Ft;let r=null,o=null,a=!1,c=0;function l(h,M){const E=e.getBoundingClientRect();s.set((h-E.left)/E.width*2-1,-((M-E.top)/E.height)*2+1),i.setFromCamera(s,n.camera);const w=i.intersectObjects([...t.pickables,...t.blockers],!0);for(const D of w){if(D.object.userData.blocker)return null;const P=Rv(D.object);if(P)return P}return null}function d(h){Du(h,X.state.hover)||X.set({hover:h?{type:h.type,id:h.id}:null})}const f=h=>{h.pointerType==="mouse"&&(r={x:h.clientX,y:h.clientY},a=!0,o&&!o.dragging&&Math.hypot(h.clientX-o.x,h.clientY-o.y)>Md&&(o.dragging=!0,d(null)))},u=h=>{o={id:h.pointerId,x:h.clientX,y:h.clientY,button:h.button,dragging:!1}},m=h=>{const M=o;if(o=null,!M||M.id!==h.pointerId||M.dragging||M.button!==0||Math.hypot(h.clientX-M.x,h.clientY-M.y)>Md)return;const E=l(h.clientX,h.clientY);E?X.select(E):h.pointerType!=="mouse"&&X.select(null)},p=()=>{o=null},x=()=>{r=null,o||d(null)},g=h=>{h.key!=="Escape"||/^(INPUT|TEXTAREA|SELECT)$/.test(h.target?.tagName??"")||X.state.selection&&X.select(null)};return e.addEventListener("pointermove",f),e.addEventListener("pointerdown",u),e.addEventListener("pointerup",m),e.addEventListener("pointercancel",p),e.addEventListener("pointerleave",x),window.addEventListener("keydown",g),{update(h){if(c+=h,!r||o?.dragging||!a||c<Ev||n.flying)return;a=!1,c=0;const M=l(r.x,r.y);d(M),o||(e.style.cursor=M?"pointer":"")},dispose(){e.removeEventListener("pointermove",f),e.removeEventListener("pointerdown",u),e.removeEventListener("pointerup",m),e.removeEventListener("pointercancel",p),e.removeEventListener("pointerleave",x),window.removeEventListener("keydown",g)}}}function Rv(n){for(let t=n;t;t=t.parent){if(t.visible===!1)return null;if(t.userData?.ref&&ce.get(t.userData.ref.type,t.userData.ref.id))return t.userData.ref}return null}function Cv(n=.22){const t=[];for(const i of[-.5,.5])for(const s of[-.5,.5])for(const r of[-.5,.5])t.push(i,s,r,i-Math.sign(i)*n,s,r),t.push(i,s,r,i,s-Math.sign(s)*n,r),t.push(i,s,r,i,s,r-Math.sign(r)*n);const e=new sn;return e.setAttribute("position",new Ie(t,3)),e}const Pv=Cv(),Lv=new Ne(1,1,1),Dv={hover:{color:14262412,opacity:.6,fill:.06},selected:{color:12999226,opacity:1,fill:.14}};function Sd(n,t){const e=Dv[t],i=new Jt;i.visible=!1;const s=new Rf(Pv,new ou({color:e.color,transparent:!0,opacity:e.opacity,depthTest:!1,toneMapped:!1}));s.renderOrder=20;const r=new Kt(Lv,new gs({color:e.color,transparent:!0,opacity:e.fill,depthWrite:!1,toneMapped:!1}));r.renderOrder=19,i.add(r,s),n.add(i);const o=document.createElement("div");o.className=`pill pill--${t}`;const a=new yu(o);a.visible=!1,n.add(a);const c=new Mn,l=new N,d=new N;let f=null;return{show(u,m){if(!u||!m.getBox(u,c)){f=null,i.visible=!1,a.visible=!1;return}f=u,c.getSize(l).addScalar(Tv*2),c.getCenter(d),i.position.copy(d),i.scale.copy(l),i.visible=!0;const p=ce.get(u.type,u.id);o.textContent=p?.name??"",a.visible=u.type==="item",a.position.set(d.x,c.max.y+.18,d.z)},get current(){return f}}}const bd={bare:0,partial:1,full:2},Hi={sofa:[2.2],armchair:[],ottoman:[],coffeeTable:[],sideTable:[],tvUnit:[1.5],bookshelf:[1.2],dresser:[],wardrobe:[1.2,2.2],bed:[],nightstand:[],desk:[],chair:[],diningTable:[],barStool:[],console:[1],plant:[1],floorLamp:[],standingMirror:[],rug:[2.4,1.6],kitchenRun:[2.4],fridge:[],toilet:[],vanity:[],shower:[]},vs={sofa:{name:"Sofa 3 chỗ",category:"Sofa & ghế",material:"Vải bọc, khung gỗ",note:"Đệm dày, hai gối tựa kèm theo.",tier:1},armchair:{name:"Ghế bành",category:"Sofa & ghế",material:"Vải bọc",note:"Góc thư giãn trong phòng khách.",tier:2},coffeeTable:{name:"Bàn trà",category:"Bàn",material:"Gỗ sồi",note:"Đặt giữa sofa và kệ TV.",tier:1},tvUnit:{name:'Kệ TV + TV 55"',category:"Điện tử",material:"Gỗ công nghiệp",note:"TV đặt trên kệ thấp, đối diện sofa.",tier:1},rug:{name:"Thảm",category:"Trang trí",material:"Sợi dệt",note:"",tier:2,pick:!1},plant:{name:"Cây trong nhà",category:"Trang trí",material:"Chậu gốm",note:"Cây lá lớn tạo điểm nhấn xanh.",tier:2},floorLamp:{name:"Đèn cây",category:"Chiếu sáng",material:"Kim loại đen",note:"Ánh sáng vàng ấm buổi tối.",tier:2},console:{name:"Bàn console",category:"Bàn",material:"Gỗ + tủ thấp",note:"Để chìa khoá, thư từ ở lối vào.",tier:2},bed:{name:"Giường đôi 1m6",category:"Giường",material:"Khung gỗ, nệm bông ép",note:"Kèm ga gối và chăn.",tier:1},nightstand:{name:"Tab đầu giường",category:"Tủ",material:"Gỗ sồi",note:"Kèm đèn ngủ.",tier:2},wardrobe:{name:"Tủ quần áo",category:"Tủ",material:"Gỗ công nghiệp",note:"Tủ cao sát trần, nhiều ngăn.",tier:0},desk:{name:"Bàn làm việc",category:"Bàn",material:"Gỗ sồi",note:"Kèm màn hình.",tier:2},chair:{name:"Ghế",category:"Sofa & ghế",material:"Gỗ sồi",note:"",tier:1},diningTable:{name:"Bàn ăn 4 chỗ",category:"Bàn",material:"Gỗ sồi",note:"Gần cửa sổ, đón sáng buổi sáng.",tier:1},kitchenRun:{name:"Bộ bếp",category:"Bếp",material:"Tủ gỗ + mặt đá",note:"Bồn rửa inox, bếp từ, tủ treo phía trên.",tier:0},fridge:{name:"Tủ lạnh",category:"Bếp",material:"Inox",note:"Tủ lạnh hai cánh đặt cuối dãy bếp.",tier:1},bookshelf:{name:"Tủ sách",category:"Tủ",material:"Gỗ công nghiệp",note:"Nhiều ngăn mở cho sách và đồ trang trí.",tier:2},dresser:{name:"Tủ ngăn kéo",category:"Tủ",material:"Gỗ sồi",note:"Cất đồ lặt vặt, đặt thêm gương hoặc đèn.",tier:2},sideTable:{name:"Bàn phụ",category:"Bàn",material:"Gỗ + kim loại",note:"Đặt cạnh sofa hoặc đầu giường.",tier:2},ottoman:{name:"Ghế đôn",category:"Sofa & ghế",material:"Vải bọc",note:"Kê chân hoặc ngồi thêm khi có khách.",tier:2},barStool:{name:"Ghế quầy bar",category:"Sofa & ghế",material:"Gỗ + kim loại",note:"Ngồi bên quầy bếp.",tier:2},standingMirror:{name:"Gương đứng",category:"Trang trí",material:"Kính + khung gỗ",note:"Gương soi toàn thân.",tier:2},toilet:{name:"Bệ xí",category:"Vệ sinh",material:"Sứ",note:"Két nước liền khối.",tier:0},vanity:{name:"Tủ lavabo + gương",category:"Vệ sinh",material:"Tủ gỗ + mặt đá",note:"Gương treo trên lavabo.",tier:0},shower:{name:"Buồng tắm kính",category:"Vệ sinh",material:"Kính cường lực",note:"Vòi sen cây, khay đáy thấp.",tier:0}},Al=["wood","darkwood","tile","marble","granite","concrete","epoxy","carpet","glass"],uo=["window","door","open"],Zt={idPattern:/^[A-Za-z0-9_-]{1,48}$/,overrides:120,extras:60,floors:5,roomsPerFloor:24,openingsPerFloor:60,coordMin:-2,coordMax:40,roomMin:1.2,roomMax:40,openingMin:.5,openingMax:4,sillMax:2.4,nameMax:40},js=(n,t)=>Math.round(n*t)/t,Ks=n=>typeof n=="number"&&Number.isFinite(n),Rn=n=>Ks(n)&&n>=Zt.coordMin&&n<=Zt.coordMax?js(n,1e3):void 0,yd=n=>Ks(n)?js(n%(Math.PI*2),1e4):void 0,ei=n=>typeof n=="string"&&Zt.idPattern.test(n),Rl=n=>typeof n=="string"&&n.trim()?n.trim().slice(0,Zt.nameMax):void 0,Iv=n=>{if(!Array.isArray(n)||n.length===0||n.length>3)return;const t=n.map(e=>Ks(e)&&e>=.2&&e<=8?js(e,100):null);return t.every(e=>e!==null)?t:void 0},Iu=n=>Al.includes(n)?n:void 0,Uu=n=>uo.includes(n)?n:void 0,Nu=n=>Ks(n)&&n>=Zt.openingMin&&n<=Zt.openingMax?js(n,100):void 0;function Fu(n){if(!n||typeof n!="object"||!ei(n.id)||n.dir!=="x"&&n.dir!=="z")return null;const t=Rn(n.at),e=Rn(n.c),i=Nu(n.w),s=Uu(n.type);if(t===void 0||e===void 0||i===void 0||!s)return null;const r={id:n.id,dir:n.dir,at:t,c:e,w:i,type:s};return s==="window"&&Ks(n.sill)&&n.sill>=0&&n.sill<=Zt.sillMax&&(r.sill=js(n.sill,100)),s==="door"&&n.entrance===!0&&(r.entrance=!0),r}function Uv(n){if(!n||typeof n!="object"||!ei(n.id))return null;const t=Rl(n.name),e=Rn(n.x0),i=Rn(n.x1),s=Rn(n.z0),r=Rn(n.z1);if(!t||[e,i,s,r].some(c=>c===void 0||c<0))return null;const o=i-e,a=r-s;return o<Zt.roomMin-1e-9||a<Zt.roomMin-1e-9||o>Zt.roomMax||a>Zt.roomMax?null:{id:n.id,name:t,x0:e,x1:i,z0:s,z1:r,floor:Iu(n.floor)??"wood"}}function Ou(n,t){return Math.min(n.x1,t.x1)-Math.max(n.x0,t.x0)>.01&&Math.min(n.z1,t.z1)-Math.max(n.z0,t.z0)>.01}function Nv(n){if(!n||typeof n!="object"||!ei(n.id))return null;const t=[],e=new Set;for(const r of(Array.isArray(n.rooms)?n.rooms:[]).slice(0,Zt.roomsPerFloor)){const o=Uv(r);!o||e.has(o.id)||t.some(a=>Ou(o,a))||(e.add(o.id),t.push(o))}if(!t.length)return null;const i=[],s=new Set;for(const r of(Array.isArray(n.openings)?n.openings:[]).slice(0,Zt.openingsPerFloor)){const o=Fu(r);!o||s.has(o.id)||(s.add(o.id),i.push(o))}return{id:n.id,name:Rl(n.name)??"Tầng",rooms:t,openings:i}}function Fv(n){if(!n||typeof n!="object"||!Array.isArray(n.floors))return null;const t=[],e=new Set;for(const i of n.floors.slice(0,Zt.floors)){const s=Nv(i);!s||e.has(s.id)||(e.add(s.id),t.push(s))}return t.length?{floors:t}:null}function Ov(n){const t={};if(!n||typeof n!="object"||Array.isArray(n))return t;for(const[e,i]of Object.entries(n).slice(0,Zt.overrides)){if(!ei(e)||!i||typeof i!="object")continue;const s={},r=Rl(i.name),o=Iu(i.floor);r&&(s.name=r),o&&(s.floor=o),Object.keys(s).length&&(t[e]=s)}return t}function zv(n){const t={removed:[],moved:{},added:[]};if(!n||typeof n!="object")return t;if(Array.isArray(n.removed))for(const e of n.removed.slice(0,Zt.overrides))ei(e)&&!t.removed.includes(e)&&t.removed.push(e);if(n.moved&&typeof n.moved=="object"&&!Array.isArray(n.moved))for(const[e,i]of Object.entries(n.moved).slice(0,Zt.overrides)){if(!ei(e)||!i||typeof i!="object")continue;const s={},r=Rn(i.c),o=Nu(i.w),a=Uu(i.type);r!==void 0&&(s.c=r),o!==void 0&&(s.w=o),a&&(s.type=a),Object.keys(s).length&&(t.moved[e]=s)}if(Array.isArray(n.added)){const e=new Set;for(const i of n.added.slice(0,Zt.openingsPerFloor)){const s=Fu(i);!s||e.has(s.id)||(e.add(s.id),t.added.push(s))}}return t}const Bv=n=>n.removed.length>0||Object.keys(n.moved).length>0||n.added.length>0;function be(n){const t={items:{},extras:[]};if(!n||typeof n!="object")return t;if(n.items&&typeof n.items=="object"&&!Array.isArray(n.items))for(const[r,o]of Object.entries(n.items).slice(0,Zt.overrides)){if(!ei(r)||!o||typeof o!="object")continue;const a={},c=Rn(o.x),l=Rn(o.z),d=yd(o.rot);c!==void 0&&(a.x=c),l!==void 0&&(a.z=l),d!==void 0&&(a.rot=d),o.hidden===!0&&(a.hidden=!0),Object.keys(a).length&&(t.items[r]=a)}if(Array.isArray(n.extras)){const r=new Set;for(const o of n.extras.slice(0,Zt.extras)){if(!o||typeof o!="object"||!ei(o.id)||r.has(o.id)||!Object.prototype.hasOwnProperty.call(Hi,o.kind))continue;const a=Rn(o.x),c=Rn(o.z);if(a===void 0||c===void 0)continue;r.add(o.id);const l={id:o.id,kind:o.kind,x:a,z:c,rot:yd(o.rot)??0},d=Iv(o.args);d&&(l.args=d),o.hidden===!0&&(l.hidden=!0),ei(o.floor)&&(l.floor=o.floor),t.extras.push(l)}}const e=Ov(n.rooms);Object.keys(e).length&&(t.rooms=e);const i=zv(n.openings);Bv(i)&&(t.openings=i);const s=Fv(n.custom);return s&&(t.custom=s),t}const Ms={modern:{label:"Hiện đại",palette:{floor:13608570,wall:16052714,wood:12159838,sofa:6258598,accent:15246141}},nordic:{label:"Bắc Âu",palette:{floor:14929832,wall:16316662,wood:13808780,sofa:9414844,accent:7317664}},warm:{label:"Ấm cúng",palette:{floor:12158040,wall:15918287,wood:10251075,sofa:12874842,accent:14254635}},luxury:{label:"Sang trọng",palette:{floor:9069892,wall:15262422,wood:7031344,sofa:3096149,accent:13214282}},industrial:{label:"Công nghiệp",palette:{floor:9271911,wall:13817305,wood:8216387,sofa:4869975,accent:14250795}}},to=Object.keys(Ms),kv=["floor","wall","wood","sofa","accent"],Gv=/^#?([0-9a-f]{6})$/i;function Hv(n){if(typeof n=="number"&&Number.isInteger(n)&&n>=0&&n<=16777215)return n;if(typeof n!="string")return null;const t=Gv.exec(n.trim());return t?parseInt(t[1],16):null}function Cl(n){if(!n||typeof n!="object")return null;const t=typeof n.id=="string"?n.id.trim():"",e=typeof n.name=="string"?n.name.trim().slice(0,60):"";if(!t||!e)return null;const i={};if(n.palette&&typeof n.palette=="object")for(const r of kv){const o=Hv(n.palette[r]);o!==null&&(i[r]=o)}const s=Number(n.defaultHour);return{id:t,name:e,description:typeof n.description=="string"?n.description.slice(0,200):"",theme:to.includes(n.theme)?n.theme:"modern",palette:i,furnishing:["bare","partial","full"].includes(n.furnishing)?n.furnishing:null,defaultHour:Number.isFinite(s)?Math.min(18,Math.max(6,s)):10,layout:be(n.layout)}}function zu(n){return{...Ms[n?.theme]?.palette??Ms.modern.palette,...n?.palette??{}}}function Vv(n){let t=0;for(const i of String(n))t=t*31+i.charCodeAt(0)>>>0;const e=to[t%to.length];return Cl({id:"default",name:`Phong cách ${Ms[e].label}`,theme:e})}const Wv=60,Ed=.25,Td=.05,Xv=Math.PI*2,Es=n=>be(JSON.parse(JSON.stringify(be(n)))),cs=(n,t)=>n/(t||1);function wd(n,t){const e=Math.min(t-Ed,Math.max(Ed,n));return Math.round(e/Td)*Td}function qv(n,t){return n.extras.some(e=>e.id===t)}function $v(n,t,e,i,s){const r=Es(n),o=r.extras.find(a=>a.id===t);if(o)o.x=cs(e,s),o.z=cs(i,s);else{const a=r.items[t]??={};a.x=cs(e,s),a.z=cs(i,s)}return be(r)}function Yv(n,t,e=0){const i=Es(n),s=(e+Math.PI/2)%Xv,r=i.extras.find(o=>o.id===t);return r?r.rot=s:(i.items[t]??={}).rot=s,be(i)}function jv(n,t){const e=Es(n),i=e.extras.find(s=>s.id===t)??(e.items[t]??={});return i.hidden?delete i.hidden:i.hidden=!0,be(e)}function Kv(n,t){const e=Es(n);return e.extras.some(i=>i.id===t)?(e.extras=e.extras.filter(i=>i.id!==t),be(e)):e}function Zv(n,t){const e=Es(n),i=e.items[t];return i&&(delete i.x,delete i.z,delete i.rot),be(e)}function Jv(n,t,e,i,s,r,o=Math.random){if(!Object.prototype.hasOwnProperty.call(Hi,t))return null;const a=Es(n);if(a.extras.length>=Wv)return null;const c=new Set([...r,...a.extras.map(d=>d.id)]);let l;do l=`extra-${o().toString(36).slice(2,8).padEnd(6,"0")}`;while(c.has(l));return a.extras.push({id:l,kind:t,x:cs(e,s),z:cs(i,s),rot:0}),{layout:be(a),id:l}}const Ad=.1,Bu=n=>Math.round(n/Ad)*Ad,zs=n=>Math.round(n*1e3)/1e3;function Qv(n,t,e,i=.5){let s=null;for(const r of n){const o=r.dir==="x"?t:e,a=r.dir==="x"?e:t;if(o<r.from+.1||o>r.to-.1)continue;const c=Math.abs(a-r.at);c<=i&&(!s||c<s.dist)&&(s={wall:r,c:zs(o),dist:c})}return s?{wall:s.wall,c:s.c}:null}function tM(n){const t=(n.x0+n.x1)/2,e=(n.z0+n.z1)/2;return{x0:{x:n.x0,z:e},x1:{x:n.x1,z:e},z0:{x:t,z:n.z0},z1:{x:t,z:n.z1}}}function eM(n,t,e){const i={x0:n.x0,x1:n.x1,z0:n.z0,z1:n.z1},s=Zt.roomMin,r=Bu(e);return t==="x0"?i.x0=Math.max(0,Math.min(r,i.x1-s)):t==="x1"?i.x1=Math.min(Zt.coordMax,Math.max(r,i.x0+s)):t==="z0"?i.z0=Math.max(0,Math.min(r,i.z1-s)):t==="z1"&&(i.z1=Math.min(Zt.coordMax,Math.max(r,i.z0+s))),{x0:zs(i.x0),x1:zs(i.x1),z0:zs(i.z0),z1:zs(i.z1)}}const nM=(n,t,e)=>t>=n.x0&&t<=n.x1&&e>=n.z0&&e<=n.z1,Ir=Bu,Ur=1e-6,Hs=n=>n.toFixed(3),ki=n=>Math.round(n*1e3)/1e3,Rd=n=>String(n).replace(/[^A-Za-z0-9]/g,"p");function ku(n,t=[]){const e=new Map,i=(r,o,a,c)=>{const l=`${r}|${Hs(o)}`;e.has(l)||e.set(l,{dir:r,at:o,edges:[]}),e.get(l).edges.push([a,c])};for(const r of n)i("x",r.z0,r.x0,r.x1),i("x",r.z1,r.x0,r.x1),i("z",r.x0,r.z0,r.z1),i("z",r.x1,r.z0,r.z1);const s=[];for(const{dir:r,at:o,edges:a}of e.values()){const c=[...new Set(a.flatMap(([d,f])=>[Hs(d),Hs(f)]))].map(Number).sort((d,f)=>d-f),l=[];for(let d=0;d+1<c.length;d++){const f=c[d],u=c[d+1];if(u-f<Ur)continue;const m=a.filter(([x,g])=>x<=f+Ur&&g>=u-Ur).length;if(m===0)continue;const p=l[l.length-1];p&&p.count===m&&Math.abs(p.to-f)<Ur?p.to=u:l.push({from:f,to:u,count:m})}for(const d of l)s.push({dir:r,at:o,from:d.from,to:d.to,t:d.count>=2?wu:Tu,interior:d.count>=2,openings:[]})}for(const r of t){const o=s.find(a=>a.dir===r.dir&&Math.abs(a.at-r.at)<.06&&r.c-r.w/2>=a.from+.05&&r.c+r.w/2<=a.to-.05);o&&o.openings.push({...r})}for(const r of s)r.openings.sort((o,a)=>o.c-a.c);return s.sort((r,o)=>r.dir===o.dir?r.at-o.at||r.from-o.from:r.dir<o.dir?-1:1)}function iM(n,t=.2){const e=Math.max(...n.map(s=>s.x1))+t,i=Math.max(...n.map(s=>s.z1))+t;return{w:ki(e),d:ki(i)}}const Gu=n=>ki(n.reduce((t,e)=>t+Bi(e),0)),Pl=n=>ki(n.reduce((t,e)=>t+Gu(e.rooms),0));function sM(n,t=[],e=1.4){return ku(n,t).filter(s=>s.interior&&s.to-s.from>=e&&s.openings.length===0).map(s=>({dir:s.dir,at:s.at,from:s.from,to:s.to}))}function Ll(n,t=[],e=[]){const i=new Set([...e,...t.map(r=>r.id)]),s=[];for(const r of sM(n,t)){const o=ki((r.from+r.to)/2);let a=`auto-${r.dir}${Rd(Hs(r.at))}-${Rd(Hs(o))}`.slice(0,48);i.has(a)||(i.add(a),s.push({id:a,dir:r.dir,at:ki(r.at),c:o,w:.9,type:"door"}))}return[...t,...s]}function Dl(n,t,e=null){const i=t.x1-t.x0,s=t.z1-t.z0;return i<Zt.roomMin-1e-9||s<Zt.roomMin-1e-9||i>Zt.roomMax||s>Zt.roomMax||t.x0<0||t.z0<0||t.x1>Zt.coordMax||t.z1>Zt.coordMax?!1:!n.some(r=>r.id!==e&&Ou(r,t))}function rM(n,t){const e=Pl(n);if(!(e>0)||!(t>0))return{factor:1,before:e,after:e};const i=Math.min(2,Math.max(.5,Math.sqrt(t/e)));return{factor:i,before:e,after:ki(e*i*i)}}const Cd=.15,Pd=.1,Me=n=>Math.round(n*1e3)/1e3,ds=n=>Math.round(n/Pd)*Pd,gn=n=>JSON.parse(JSON.stringify(be(n))),eo=(n,t)=>Me(n/(t.scale||1)),Il=(n,t,e=Math.random)=>{let i;do i=`${n}-${e().toString(36).slice(2,8).padEnd(6,"0")}`;while(t.has(i));return i},ai=(n,t)=>{const e=be(t);return JSON.stringify(e)===JSON.stringify(be(n))?n:e},Ts=(n,t)=>n.custom?.floors.find(e=>e.id===t.floorId)??n.custom?.floors[0];function oM(n,t,e,i){if(!Al.includes(i))return n;const s=gn(n);if(t.custom){const r=Ts(s,t)?.rooms.find(o=>o.id===e);if(!r)return n;r.floor=i}else{if(!t.rooms.some(r=>r.id===e))return n;s.rooms={...s.rooms??{},[e]:{...s.rooms?.[e]??{},floor:i}}}return ai(n,s)}function aM(n,t,e,i){const s=String(i??"").trim().slice(0,Zt.nameMax);if(!s)return n;const r=gn(n);if(t.custom){const o=Ts(r,t)?.rooms.find(a=>a.id===e);if(!o)return n;o.name=s}else{if(!t.rooms.some(o=>o.id===e))return n;r.rooms={...r.rooms??{},[e]:{...r.rooms?.[e]??{},name:s}}}return ai(n,r)}function lM(n,t,e,i){return n.walls.find(s=>s.dir===t&&Math.abs(s.at-e)<.06&&i>=s.from&&i<=s.to)}function Hu(n,t,e){const i=n.from+e/2+Cd,s=n.to-e/2-Cd;return s<i?null:Me(Math.min(s,Math.max(i,t)))}const cM=(n,t)=>n.walls.find(e=>e.openings.some(i=>i.id===t)),Vu=(n,t)=>n.walls.flatMap(e=>e.openings).find(e=>e.id===t);function Ul(n,t,e,i){const s=cM(t,e),r=Vu(t,e);if(!s||!r)return n;const o=i.w??r.w,a=Hu(s,i.c??r.c,o);if(a===null||o<Zt.openingMin||o>Zt.openingMax)return n;const c=i.type??r.type;if(!uo.includes(c))return n;const l=gn(n);if(t.custom){const d=Ts(l,t)?.openings.find(f=>f.id===e);if(!d)return n;Object.assign(d,{c:a,w:Me(o),type:c}),c!=="window"?delete d.sill:d.sill===void 0&&(d.sill=.9),c!=="door"&&delete d.entrance}else{const d=l.openings?.added?.find(f=>f.id===e);if(d)Object.assign(d,{c:eo(a,t),w:Me(o),type:c}),c!=="window"&&delete d.sill,c!=="door"&&delete d.entrance;else{l.openings??={removed:[],moved:{},added:[]};const f={...l.openings.moved[e]??{}};(i.c!==void 0||i.w!==void 0)&&(f.c=eo(a,t)),i.w!==void 0&&(f.w=Me(o)),i.type!==void 0&&(f.type=c),l.openings.moved[e]=f}}return ai(n,l)}const dM=(n,t,e,i)=>Ul(n,t,e,{c:i}),uM=(n,t,e,i)=>Ul(n,t,e,{w:i}),hM=(n,t,e,i)=>Ul(n,t,e,{type:i});function fM(n,t,e){if(!Vu(t,e))return n;const i=gn(n);if(t.custom){const s=Ts(i,t);if(!s)return n;s.openings=s.openings.filter(r=>r.id!==e)}else i.openings?.added?.some(s=>s.id===e)?i.openings.added=i.openings.added.filter(s=>s.id!==e):(i.openings??={removed:[],moved:{},added:[]},i.openings.removed.includes(e)||i.openings.removed.push(e),delete i.openings.moved[e]);return ai(n,i)}function pM(n,t,{dir:e,at:i,c:s,w:r=.9,type:o="door"},a=Math.random){if(!uo.includes(o)||e!=="x"&&e!=="z")return null;const c=lM(t,e,i,s);if(!c)return null;const l=Hu(c,s,r);if(l===null||c.openings.some(p=>Math.abs(p.c-l)<(p.w+r)/2+.05))return null;const d=gn(n),f=new Set(t.walls.flatMap(p=>p.openings.map(x=>x.id))),u=Il("op",f,a);if(t.custom){const p=Ts(d,t);if(!p||p.openings.length>=Zt.openingsPerFloor)return null;p.openings.push({id:u,dir:e,at:Me(c.at),c:l,w:Me(r),type:o,...o==="window"?{sill:.9}:{}})}else{if(d.openings??={removed:[],moved:{},added:[]},d.openings.added.length>=Zt.openingsPerFloor)return null;d.openings.added.push({id:u,dir:e,at:eo(c.at,t),c:eo(l,t),w:Me(r),type:o,...o==="window"?{sill:.9}:{}})}return{layout:be(d),id:u}}const Ld=n=>{if(!Array.isArray(n))return;const t=[];for(const e of n){if(typeof e!="number"||!(e>=.2&&e<=8))break;t.push(Math.round(e*100)/100)}return t.length?t.slice(0,3):void 0};function mM(n,t){const i=t.rooms.map(a=>({id:a.id,name:a.name,x0:a.x0,x1:a.x1,z0:a.z0,z1:a.z1,floor:a.floor})),s=t.walls.flatMap(a=>a.openings.map(c=>({id:c.id,dir:a.dir,at:a.at,c:c.c,w:c.w,type:c.type,...c.sill!==void 0?{sill:c.sill}:{},...c.entrance?{entrance:!0}:{}}))),r=t.placements.filter(a=>Object.prototype.hasOwnProperty.call(Hi,a.kind)).map(a=>({id:a.id,kind:a.kind,x:a.x,z:a.z,rot:a.rot??0,floor:"f1",...a.hidden?{hidden:!0}:{},...Ld(a.args)?{args:Ld(a.args)}:{}}));return be({items:{},extras:r,custom:{floors:[{id:"f1",name:"Tầng 1",rooms:i,openings:s}]}})}function gM(){return be(null)}const ho=(n,t)=>Ts(n,t);function _M(n,t){const e=ds(Math.min(n.x,t.x)),i=ds(Math.max(n.x,t.x)),s=ds(Math.min(n.z,t.z)),r=ds(Math.max(n.z,t.z));return{x0:Me(e),x1:Me(i),z0:Me(s),z1:Me(r)}}function xM(n,t,e,{name:i,floor:s="wood"}={},r=Math.random){if(!t.custom)return null;const o=gn(n),a=ho(o,t);if(!a||a.rooms.length>=Zt.roomsPerFloor)return null;const c={...e};if(!Dl(a.rooms,c))return null;const l=Il("room",new Set(a.rooms.map(f=>f.id)),r),d={id:l,name:i??`Phòng ${a.rooms.length+1}`,...c,floor:s};return a.rooms.push(d),a.openings=Ll(a.rooms,a.openings),{layout:be(o),id:l}}const Nl=(n,t,e)=>t>=n.x0&&t<=n.x1&&e>=n.z0&&e<=n.z1;function vM(n,t){for(const e of n.extras){if((e.floor??n.custom.floors[0].id)!==t.id||t.rooms.some(s=>Nl(s,e.x,e.z)))continue;let i=null;for(const s of t.rooms){const r=Math.min(s.x1-.2,Math.max(s.x0+.2,e.x)),o=Math.min(s.z1-.2,Math.max(s.z0+.2,e.z)),a=Math.hypot(r-e.x,o-e.z);(!i||a<i.d)&&(i={x:r,z:o,d:a})}i&&(e.x=Me(i.x),e.z=Me(i.z))}}function MM(n,t,e,i){if(!t.custom)return n;const s=gn(n),r=ho(s,t),o=r?.rooms.find(c=>c.id===e);if(!o)return n;const a={...o,...i};return Dl(r.rooms,a,e)?(Object.assign(o,i),r.openings=Ll(r.rooms,Fl(r)),vM(s,r),ai(n,s)):n}function SM(n,t,e,i,s){if(!t.custom)return n;const r=gn(n),o=ho(r,t),a=o?.rooms.find(p=>p.id===e);if(!a)return n;const c=ds(i),l=ds(s);if(c===0&&l===0)return n;const d={...a,x0:Me(a.x0+c),x1:Me(a.x1+c),z0:Me(a.z0+l),z1:Me(a.z1+l)};if(!Dl(o.rooms,d,e))return n;const f=r.custom.floors[0].id;for(const p of r.extras)(p.floor??f)===o.id&&Nl(a,p.x,p.z)&&(p.x=Me(p.x+c),p.z=Me(p.z+l));const u=p=>p.dir==="x"&&(Math.abs(p.at-a.z0)<.06||Math.abs(p.at-a.z1)<.06)&&p.c>a.x0&&p.c<a.x1||p.dir==="z"&&(Math.abs(p.at-a.x0)<.06||Math.abs(p.at-a.x1)<.06)&&p.c>a.z0&&p.c<a.z1,m=p=>o.rooms.some(x=>x.id!==e&&Wu(x,p));for(const p of o.openings)u(p)&&!m(p)&&(p.dir==="x"?(p.at=Me(p.at+l),p.c=Me(p.c+c)):(p.at=Me(p.at+c),p.c=Me(p.c+l)));return Object.assign(a,d),o.openings=Ll(o.rooms,Fl(o)),ai(n,r)}const Wu=(n,t)=>t.dir==="x"&&(Math.abs(t.at-n.z0)<.06||Math.abs(t.at-n.z1)<.06)&&t.c>n.x0&&t.c<n.x1||t.dir==="z"&&(Math.abs(t.at-n.x0)<.06||Math.abs(t.at-n.x1)<.06)&&t.c>n.z0&&t.c<n.z1;function Fl(n){return n.openings.filter(t=>n.rooms.some(e=>Wu(e,t)))}function bM(n,t,e){if(!t.custom)return n;const i=gn(n),s=ho(i,t),r=s?.rooms.find(a=>a.id===e);if(!r||s.rooms.length<=1)return n;const o=i.custom.floors[0].id;for(const a of i.extras)(a.floor??o)===s.id&&Nl(r,a.x,a.z)&&(a.hidden=!0);return s.rooms=s.rooms.filter(a=>a.id!==e),s.openings=Fl(s),ai(n,i)}function yM(n,t,e,i=Math.random){if(!t.custom)return null;const s=gn(n);if(s.custom.floors.length>=Zt.floors)return null;const r=Il("f",new Set(s.custom.floors.map(o=>o.id)),i);return s.custom.floors.push({id:r,name:String(e??"").trim()||`Tầng ${s.custom.floors.length+1}`,rooms:[{id:"room-1",name:"Phòng 1",x0:1,x1:7,z0:1,z1:6,floor:"wood"}],openings:[]}),{layout:be(s),id:r}}function EM(n,t,e,i){const s=String(i??"").trim().slice(0,Zt.nameMax);if(!t.custom||!s)return n;const r=gn(n),o=r.custom.floors.find(a=>a.id===e);return o?(o.name=s,ai(n,r)):n}function TM(n,t,e){if(!t.custom)return n;const i=gn(n);if(i.custom.floors.length<=1||!i.custom.floors.some(o=>o.id===e))return n;const s=i.custom.floors[0].id;i.custom.floors=i.custom.floors.filter(o=>o.id!==e);const r=i.custom.floors[0].id;return i.extras=i.extras.filter(o=>(o.floor??s)!==e).map(o=>({...o,floor:o.floor??r})),ai(n,i)}function wM(n,t,e){if(!t.custom)return{layout:n,factor:1,before:0,after:0};const i=be(n),{factor:s,before:r,after:o}=rM(i.custom.floors,e);if(Math.abs(s-1)<1e-6)return{layout:n,factor:1,before:r,after:r};const a=gn(i),c=f=>Me(f*s);for(const f of a.custom.floors){for(const u of f.rooms)Object.assign(u,{x0:c(u.x0),x1:c(u.x1),z0:c(u.z0),z1:c(u.z1)});for(const u of f.openings)Object.assign(u,{at:c(u.at),c:c(u.c)})}for(const f of a.extras)Object.assign(f,{x:c(f.x),z:c(f.z)});const l=be(a),d=l.custom?Pl(l.custom.floors):o;return{layout:l,factor:s,before:r,after:d}}const Dd=.03,AM=.17,RM=new Set(["door","window","open"]);function CM(n,t,e,i){const s=n.renderer.domElement,r=n.controls,o=new fu,a=new Ft,c=new Kn(new N(0,1,0),0),l=new N;let d=null;const f=new Jt;f.name="editor-overlay",n.scene.add(f);const u=new Kt(new Ne(1,.06,1),new gs({color:14178863,transparent:!0,opacity:.35,depthWrite:!1}));u.visible=!1,f.add(u);const m=new gs({color:14178863,depthTest:!1}),p={};for(const C of["x0","x1","z0","z1"]){const L=new Kt(new ao(AM,16,12),m);L.renderOrder=10,L.visible=!1,L.userData.edge=C,f.add(L),p[C]=L}function x(C,L=!0){u.visible=!0,u.scale.set(Math.max(.01,C.x1-C.x0),1,Math.max(.01,C.z1-C.z0)),u.position.set((C.x0+C.x1)/2,.05,(C.z0+C.z1)/2),u.material.color.set(L?14178863:12597547),n.invalidate()}const g=()=>{u.visible&&(u.visible=!1,n.invalidate())},h=()=>{const C=X.state.selection;return C?.type==="room"?ce.get("room",C.id):null};function M(){const C=X.state.editing&&!X.state.tool&&i.isCustom?.()?h():null,L=C?tM(C):null;for(const[V,I]of Object.entries(p))I.visible=!!L,L&&I.position.set(L[V].x,.2,L[V].z);n.invalidate()}function E(C){const L=s.getBoundingClientRect();a.set((C.clientX-L.left)/L.width*2-1,-((C.clientY-L.top)/L.height)*2+1),o.setFromCamera(a,n.camera)}function w(C,L){return E(C),o.ray.intersectPlane(c,L)}function D(C){if(!p.x0.visible)return null;E(C);const L=o.intersectObjects(Object.values(p),!1)[0];return L?L.object.userData.edge:null}function P(C){E(C);const L=o.intersectObjects(t.pickables,!0);for(const V of L)for(let I=V.object;I&&I.visible!==!1;I=I.parent){const B=I.userData?.ref;if(B?.type==="item"&&ce.get("item",B.id)||B?.type==="opening"&&ce.get("opening",B.id))return B}return null}function y(C,L,V="grabbing"){d={pointerId:C.pointerId,...L},r.enabled=!1,n.cancelFlight(),s.setPointerCapture(C.pointerId),s.style.cursor=V,C.stopImmediatePropagation()}const _=C=>{if(!X.state.editing||X.state.mode!=="overview"||C.button!==0)return;const L=X.state.tool;if(RM.has(L)){if(!w(C,l))return;const K=Qv(tt.walls,l.x,l.z,.6);C.stopImmediatePropagation(),K?i.onOpeningAdd({dir:K.wall.dir,at:K.wall.at,c:K.c,type:L}):i.onReject?.("Bấm vào một đoạn tường để đặt cửa.");return}if(L==="room"){if(!w(C,l))return;const K={x:Ir(l.x),z:Ir(l.z)};y(C,{kind:"draw",start:K,rect:null},"crosshair");return}const V=D(C),I=V?h():null;if(I&&w(C,l)){y(C,{kind:"resize",id:I.id,edge:V,room:I,rect:null},"ew-resize");return}const B=P(C);if(B?.type==="opening"){const K=t.getObject("opening",B.id),nt=tt.walls.find(Ct=>Ct.openings.some(st=>st.id===B.id));if(!K||!nt||!w(C,l))return;const ft=nt.dir==="x"?l.x:l.z,Et=nt.dir==="x"?K.position.x:K.position.z;X.select(B),y(C,{kind:"opening",id:B.id,mesh:K,wall:nt,offset:Et-ft,start:Et,c:Et});return}if(B?.type==="item"){const K=t.getObject("item",B.id);if(!K||!w(C,l))return;X.select(B),y(C,{kind:"item",id:B.id,group:K,offsetX:K.position.x-l.x,offsetZ:K.position.z-l.z,startX:K.position.x,startZ:K.position.z});return}const z=i.isCustom?.()?h():null;z&&w(C,l)&&nM(z,l.x,l.z)&&y(C,{kind:"room",id:z.id,room:z,startPt:{x:l.x,z:l.z},dx:0,dz:0})},S=C=>{if(!(!d||C.pointerId!==d.pointerId)&&w(C,l)){if(d.kind==="item"){const L=wd(l.x+d.offsetX,tt.size.w),V=wd(l.z+d.offsetZ,tt.size.d);t.moveItem(d.id,L,V),e.refresh()}else if(d.kind==="opening"){const L=(d.wall.dir==="x"?l.x:l.z)+d.offset,V=d.wall.from+.5,I=d.wall.to-.5;d.c=Math.round(Math.min(I,Math.max(V,L))*20)/20,d.wall.dir==="x"?d.mesh.position.x=d.c:d.mesh.position.z=d.c,x(d.wall.dir==="x"?{x0:d.c-.45,x1:d.c+.45,z0:d.wall.at-.1,z1:d.wall.at+.1}:{x0:d.wall.at-.1,x1:d.wall.at+.1,z0:d.c-.45,z1:d.c+.45})}else if(d.kind==="draw")d.rect=_M(d.start,{x:l.x,z:l.z}),x(d.rect);else if(d.kind==="resize"){const L=d.edge[0]==="x"?l.x:l.z;d.rect=eM(d.room,d.edge,L),x(d.rect)}else if(d.kind==="room"){d.dx=Ir(l.x-d.startPt.x),d.dz=Ir(l.z-d.startPt.z);const L=d.room;x({x0:L.x0+d.dx,x1:L.x1+d.dx,z0:L.z0+d.dz,z1:L.z1+d.dz})}}},A=C=>{if(!d||C.pointerId!==d.pointerId)return;const L=d;if(d=null,r.enabled=X.state.mode==="overview",s.style.cursor="",g(),C.type==="pointercancel"){i.onCancel?.();return}if(L.kind==="item"){const V=L.group.position.x,I=L.group.position.z;Math.hypot(V-L.startX,I-L.startZ)>=Dd&&i.onMove(L.id,V,I)}else L.kind==="opening"?Math.abs(L.c-L.start)>=Dd&&i.onOpeningMove(L.id,L.c):L.kind==="draw"?L.rect&&i.onRoomDraw(L.rect):L.kind==="resize"?L.rect&&i.onRoomResize(L.id,L.rect):L.kind==="room"&&(L.dx||L.dz)&&i.onRoomMove(L.id,L.dx,L.dz)};s.addEventListener("pointerdown",_,{capture:!0}),s.addEventListener("pointermove",S),s.addEventListener("pointerup",A),s.addEventListener("pointercancel",A);const R=X.subscribe((C,L,V)=>{(V.includes("tool")||V.includes("selection")||V.includes("editing"))&&M(),V.includes("tool")&&(s.style.cursor=C.tool?"crosshair":"")});return{setEditing(C){r.mouseButtons=C?{LEFT:Qe.PAN,MIDDLE:Qe.DOLLY,RIGHT:Qe.ROTATE}:{LEFT:Qe.ROTATE,MIDDLE:Qe.DOLLY,RIGHT:Qe.PAN},r.touches=C?{ONE:vn.PAN,TWO:vn.DOLLY_ROTATE}:{ONE:vn.ROTATE,TWO:vn.DOLLY_PAN},r.screenSpacePanning=C,M()},sync:M,dispose(){R(),s.removeEventListener("pointerdown",_,{capture:!0}),s.removeEventListener("pointermove",S),s.removeEventListener("pointerup",A),s.removeEventListener("pointercancel",A),n.scene.remove(f)}}}const sa=n=>String(n??"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d");function PM(n,t=8){const e=sa(n).trim();if(!e)return[];const i=[];for(const s of ce.list("room"))sa(s.name).includes(e)&&i.push({type:"room",id:s.id,title:s.name,sub:`${s.area.toFixed(0)} m²`});for(const s of ce.list("item")){const r=ce.room(s.roomId);if(sa(`${s.name} ${s.category} ${r?.name??""} ${s.material??""}`).includes(e)&&i.push({type:"item",id:s.id,title:s.name,sub:`${s.category} · ${r?.name??""}`}),i.length>=t)break}return i.slice(0,t)}const LM=n=>n?`${n.w.toFixed(2)} × ${n.d.toFixed(2)} × ${n.h.toFixed(2)} m`:"",DM={plus:"M12 5v14M5 12h14",minus:"M5 12h14",rotateLeft:"M3 12a9 9 0 1 0 3-6.7M3 4v5h5",rotateRight:"M21 12a9 9 0 1 1-3-6.7M21 4v5h-5",home:"M4 11 12 4l8 7M6 10v10h12V10",close:"M6 6l12 12M18 6 6 18",search:"M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",sun:"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4",play:"M7 5v14l11-7z",pause:"M8 5v14M16 5v14",walk:"M13 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM10 21l2-6-3-2 1-5 3 2 2 3M12 15l3 6",cube:"M12 3 4 7.5v9L12 21l8-4.5v-9zM4 7.5 12 12l8-4.5M12 12v9",pin:"M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10zM12 8.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",expand:"M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",shrink:"M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5",pencil:"M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16zM13.5 6.5l4 4",eyeOff:"M3 3l18 18M10.6 5.2A10 10 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 4M6.2 6.2A17 17 0 0 0 2 12s4 7 10 7a9.7 9.7 0 0 0 4.2-1M9.9 9.9a3 3 0 0 0 4.2 4.2",trash:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",list:"M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",undo:"M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3",eye:"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"};function ae(n,t=18,e=1.8){return`<svg class="ico" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${DM[n]??""}"/></svg>`}const Xt=n=>String(n??"").replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`),nl=1,Id=8,IM=1e3,UM=20,no=()=>!!window.ReactNativeWebView,Xu=()=>no()||window.parent!==window;function bi(n,t){const e=t===void 0?{version:nl,type:n}:{version:nl,type:n,payload:t};if(window.ReactNativeWebView){window.ReactNativeWebView.postMessage(JSON.stringify(e));return}window.parent!==window&&window.parent.postMessage(e,window.location.origin)}function qu(n){if(!n||typeof n!="object")return null;const t=typeof n.apartmentId=="string"?n.apartmentId.trim():"",e=Number(n.bedrooms),i=Number(n.bathrooms),s=Number(n.areaM2);if(!t||!Number.isFinite(e)||e<0||e>Id||!Number.isFinite(i)||i<0||i>Id||!Number.isFinite(s)||s<=0||s>IM||!["bare","partial","full"].includes(n.furnishing))return null;const r=Array.isArray(n.designs)?n.designs.slice(0,UM).map(Cl).filter(Boolean):[];return{apartmentId:t,bedrooms:Math.floor(e),bathrooms:Math.floor(i),areaM2:s,furnishing:n.furnishing,designs:r,designId:typeof n.designId=="string"?n.designId:null,editable:n.editable===!0&&!no()}}function NM(n){const t=window.location.origin,e=i=>{if(!(!!window.ReactNativeWebView&&(!i.origin||i.origin==="null"))&&(i.origin!==t||i.source!==window.parent))return;let r=i.data;if(typeof r=="string")try{r=JSON.parse(r)}catch{return}if(!(!r||r.version!==nl))if(r.type==="FLOORPLAN_INIT"){const o=qu(r.payload);o?n.init(o):bi("FLOORPLAN_ERROR",{code:"INVALID_CONFIG"})}else r.type==="FLOORPLAN_EXPANDED"?n.expanded?.(!!r.payload?.expanded):r.type==="FLOORPLAN_PAUSE"?n.pause():r.type==="FLOORPLAN_RESUME"?n.resume():r.type==="FLOORPLAN_RESET"&&n.reset()};return window.addEventListener("message",e),document.addEventListener("message",e),()=>{window.removeEventListener("message",e),document.removeEventListener("message",e)}}function FM(n,t){const e=(s,r)=>n.has(s)?Number(n.get(s)):r,i=["bare","partial","full"].includes(n.get("furnishing"))?n.get("furnishing"):"full";return qu({apartmentId:n.get("id")??"demo",bedrooms:e("bedrooms",2),bathrooms:e("bathrooms",1),areaM2:e("area",70),furnishing:i,designs:t,designId:n.get("design")})}const OM=n=>{const t=Math.floor(n),e=Math.round((n-t)*60);return`${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`};function zM(n){n.innerHTML=`
    <div class="brand">
      <span class="brand__mark">${ae("cube",18,2)}</span>
      <div class="brand__text"><b id="brand-title"></b><small id="brand-sub"></small></div>
    </div>

    <div class="search">
      <span class="search__icon">${ae("search",16)}</span>
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
        ${ae("sun",18)}<span id="hour-text"></span>
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
      <button role="tab" data-mode="overview" type="button">${ae("cube",15)}<span>Tổng quan</span></button>
      <button role="tab" data-mode="walk" type="button">${ae("walk",15)}<span>Đi vào</span></button>
    </div>`;const t=n.querySelector("#q"),e=n.querySelector(".search__menu"),i=n.querySelector("#hour"),s=n.querySelector("#sun-pop"),r=n.querySelector("#sun-btn"),o=n.querySelector("#play");function a(){const _=X.state.searchQuery,S=PM(_);e.hidden=!_.trim(),e.innerHTML=S.length?S.map(A=>`
        <li><button type="button" data-type="${A.type}" data-id="${Xt(A.id)}">
          <span class="res__ico">${ae(A.type==="room"?"home":"pin",15)}</span>
          <span class="res__txt"><b>${Xt(A.title)}</b><small>${Xt(A.sub)}</small></span>
        </button></li>`).join(""):'<li class="res__empty">Không tìm thấy</li>'}t.addEventListener("input",()=>{X.set({searchQuery:t.value}),a()}),t.addEventListener("focus",a),t.addEventListener("keydown",_=>{_.key==="Escape"&&(t.value="",X.set({searchQuery:""}),e.hidden=!0,t.blur()),_.key==="Enter"&&e.querySelector("button")?.click()}),e.addEventListener("click",_=>{const S=_.target.closest("button[data-id]");if(!S)return;const A={type:S.dataset.type,id:S.dataset.id};t.value="",X.set({searchQuery:""}),e.hidden=!0,t.blur(),A.type==="room"&&Rt.emit("room:go",{id:A.id}),X.select(A),A.type==="item"&&Rt.emit("camera:locate",A)}),document.addEventListener("pointerdown",_=>{n.querySelector(".search").contains(_.target)||(e.hidden=!0),n.querySelector(".sunwrap").contains(_.target)||n.querySelector("#design-wrap").contains(_.target)||X.set({menu:null})}),r.addEventListener("click",()=>X.set({menu:X.state.menu==="sun"?null:"sun"})),i.addEventListener("input",()=>X.set({hour:Number(i.value),playing:!1})),o.addEventListener("click",()=>X.set({playing:!X.state.playing})),n.querySelector(".seg").addEventListener("click",_=>{const S=_.target.closest("[data-mode]");S&&S.dataset.mode!==X.state.mode&&X.set({mode:S.dataset.mode})});const c=n.querySelector("#fs-btn"),l=!!(document.fullscreenEnabled||document.webkitFullscreenEnabled),d=Xu()&&!no();let f=!1;function u(){c.innerHTML=ae(f?"shrink":"expand",18);const _=f?"Thoát toàn màn hình":"Toàn màn hình";c.setAttribute("aria-label",_),c.title=_}c.hidden=no()||!(l||d),c.addEventListener("click",()=>{if(l){const _=document.documentElement.requestFullscreen??document.documentElement.webkitRequestFullscreen,S=document.exitFullscreen??document.webkitExitFullscreen;document.fullscreenElement??document.webkitFullscreenElement?S.call(document):_.call(document.documentElement)}else bi("FLOORPLAN_EXPAND_TOGGLE")});const m=()=>{f=!!(document.fullscreenElement??document.webkitFullscreenElement),u()};document.addEventListener("fullscreenchange",m),document.addEventListener("webkitfullscreenchange",m),Rt.on("host:expanded",({expanded:_})=>{f=_,u()}),u();const p=n.querySelector("#edit-btn");p.addEventListener("click",()=>X.set({editing:!X.state.editing}));function x(_){p.hidden=!(_.editable&&_.mode==="overview"),p.setAttribute("aria-pressed",String(_.editing)),p.classList.toggle("active",_.editing);const S=_.editing?"Xong chỉnh sửa":"Chỉnh bố cục";p.innerHTML=`${ae("pencil",18)}<span>${S}</span>`,p.setAttribute("aria-label",S),p.title=S}const g=n.querySelector("#design-wrap"),h=n.querySelector("#design-btn"),M=n.querySelector("#design-pop");let E="";function w(_){const S=zu(_);return[S.floor,S.wall,S.sofa,S.accent].map(A=>`<i style="background:#${A.toString(16).padStart(6,"0")}"></i>`).join("")}function D(_){const{designs:S,designId:A}=_;g.hidden=S.length<2;const R=S.find(L=>L.id===A)??S[0];n.querySelector("#design-name").textContent=R?.name??"",n.querySelector("#design-swatch").innerHTML=R?w(R):"",h.setAttribute("aria-expanded",String(_.menu==="designs")),M.hidden=_.menu!=="designs";const C=S.map(L=>L.id+L.name).join("|")+"#"+A;C!==E&&(E=C,M.innerHTML=S.map(L=>`<li><button type="button" role="option" data-design="${Xt(L.id)}" aria-selected="${L.id===A}" class="${L.id===A?"active":""}">
          <span class="swatches">${w(L)}</span>
          <span class="res__txt"><b>${Xt(L.name)}</b><small>${Xt(L.description||Ms[L.theme]?.label||"")}</small></span>
        </button></li>`).join(""))}h.addEventListener("click",()=>X.set({menu:X.state.menu==="designs"?null:"designs"})),M.addEventListener("click",_=>{const S=_.target.closest("[data-design]");S&&(X.set({menu:null}),Rt.emit("design:select",{id:S.dataset.design}))});function P(){n.querySelector("#brand-title").textContent=tt.bedrooms===0?"Căn hộ studio":`Căn hộ ${tt.bedrooms} phòng ngủ`,n.querySelector("#brand-sub").textContent=tt.custom?`${tt.totalArea.toFixed(0)} m²${tt.floors.length>1?` · ${tt.floors.length} tầng`:""} · Mặt bằng tuỳ chỉnh`:`${tt.area.toFixed(0)} m² · Bố cục minh hoạ`}Rt.on("plan:loaded",P),P();function y(_){D(_),x(_);for(const S of n.querySelectorAll("[data-mode]")){const A=S.dataset.mode===_.mode;S.classList.toggle("active",A),S.setAttribute("aria-selected",String(A))}n.querySelector("#hour-text").textContent=OM(_.hour),document.activeElement!==i&&(i.value=String(_.hour)),s.hidden=_.menu!=="sun",r.setAttribute("aria-expanded",String(_.menu==="sun")),o.innerHTML=`${ae(_.playing?"pause":"play",14)}<span>${_.playing?"Dừng":"Tua ngày"}</span>`}X.subscribe(_=>y(_)),y(X.state)}function BM(n){n.innerHTML=`
    <div class="card rooms" data-inset="rooms">
      <button type="button" class="rooms__title" aria-expanded="true" aria-controls="rooms-list">Các phòng <span aria-hidden="true">▾</span></button>
      <div class="floors" role="tablist" aria-label="Tầng" hidden></div>
      <ul class="rooms__list" id="rooms-list" role="list"></ul>
    </div>`;const t=n.querySelector(".rooms__list"),e=n.querySelector(".floors");function i(){e.hidden=tt.floors.length<2,e.innerHTML=tt.floors.map(a=>`<button type="button" role="tab" class="floorbtn${a.id===tt.floorId?" on":""}" aria-selected="${a.id===tt.floorId}" data-floor="${Xt(a.id)}">${Xt(a.name)}</button>`).join(""),t.innerHTML=ce.list("room").map(a=>`
          <li><button type="button" class="room" data-room="${Xt(a.id)}">
            <span class="room__row"><b>${Xt(a.name)}</b><span>${a.area.toFixed(0)} m²</span></span>
            <small>${Xt(a.note)}</small>
          </button></li>`).join(""),o(X.state)}const s=n.querySelector(".rooms"),r=n.querySelector(".rooms__title");window.innerWidth>=720&&window.innerWidth<1100&&(s.classList.add("is-collapsed"),r.setAttribute("aria-expanded","false")),r.addEventListener("click",()=>{const a=s.classList.toggle("is-collapsed");r.setAttribute("aria-expanded",String(!a))}),X.subscribe((a,c,l)=>{!l.includes("editing")||!a.editing||(s.classList.add("is-collapsed"),r.setAttribute("aria-expanded","false"))}),n.addEventListener("click",a=>{const c=a.target.closest("[data-floor]");if(c)return Rt.emit("plan:floor-select",{id:c.dataset.floor});const l=a.target.closest("[data-room]");l&&(X.set({selection:null}),Rt.emit("room:go",{id:l.dataset.room}))});function o(a){for(const c of n.querySelectorAll("[data-room]")){const l=c.dataset.room===a.roomId;c.classList.toggle("active",l),l&&window.matchMedia("(max-width: 719px)").matches&&c.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"})}}X.subscribe((a,c,l)=>l.includes("roomId")&&o(a)),Rt.on("plan:loaded",i),i()}const Ud=(n,t)=>t?`<div class="kv"><dt>${n}</dt><dd>${Xt(t)}</dd></div>`:"";function kM(n){const t=ce.room(n.roomId);return`
    <header class="detail__head">
      <div>
        <span class="tag">${Xt(n.category)}</span>
        <h2>${Xt(n.name)}</h2>
        ${t?`<button type="button" class="link" data-go-room="${Xt(t.id)}">${ae("pin",13)} ${Xt(t.name)}</button>`:""}
      </div>
      <button type="button" class="iconbtn" data-close aria-label="Đóng">${ae("close",18)}</button>
    </header>
    <dl class="kvs">
      ${Ud("Kích thước",LM(n.dims))}
      ${Ud("Chất liệu",n.material)}
    </dl>
    ${n.note?`<p class="detail__note">${Xt(n.note)}</p>`:""}
    <div class="detail__actions">
      <button type="button" class="btn btn--primary" data-locate>${ae("eye",16)} Xem gần</button>
    </div>`}function GM(n){const t=ce.itemsIn(n.id);return`
    <header class="detail__head">
      <div>
        <span class="tag">Phòng</span>
        <h2>${Xt(n.name)}</h2>
        <small class="muted">${n.area.toFixed(0)} m² · ${t.length} món nội thất</small>
      </div>
      <button type="button" class="iconbtn" data-close aria-label="Đóng">${ae("close",18)}</button>
    </header>
    <p class="detail__note">${Xt(n.note)}</p>
    <ul class="chips" role="list">
      ${t.map(e=>`<li><button type="button" class="chip" data-item="${Xt(e.id)}">${Xt(e.name)}</button></li>`).join("")}
    </ul>
    <div class="detail__actions">
      <button type="button" class="btn btn--primary" data-go-room="${Xt(n.id)}">${ae("eye",16)} Đến phòng này</button>
    </div>`}function HM(n){n.innerHTML='<aside class="card detail" data-inset="detail" hidden aria-live="polite"></aside>';const t=n.firstElementChild;t.addEventListener("click",i=>{if(i.target.closest("[data-close]"))return X.select(null);const s=i.target.closest("[data-go-room]");if(s)return Rt.emit("room:go",{id:s.dataset.goRoom});const r=i.target.closest("[data-item]");if(r){const o={type:"item",id:r.dataset.item};return X.select(o),Rt.emit("camera:locate",o)}i.target.closest("[data-locate]")&&X.state.selection&&Rt.emit("camera:locate",X.state.selection)});function e(i){const s=i.selection,r=s&&ce.get(s.type,s.id);if(!r){t.hidden=!0,t.innerHTML="";return}t.innerHTML=r.type==="room"?GM(r):kM(r),t.hidden=!1}X.subscribe((i,s,r)=>r.includes("selection")&&e(i)),e(X.state)}const VM=[[{cmd:"zoomIn",icon:"plus",label:"Phóng to"},{cmd:"zoomOut",icon:"minus",label:"Thu nhỏ"}],[{cmd:"rotateLeft",icon:"rotateLeft",label:"Xoay trái"},{cmd:"rotateRight",icon:"rotateRight",label:"Xoay phải"}],[{cmd:"home",icon:"home",label:"Về góc nhìn ban đầu"}]];function WM(n){n.innerHTML=`<nav class="card mapctl" aria-label="Điều khiển camera">${VM.map(t=>t.map(e=>`<button class="mapctl__btn" type="button" data-cmd="${e.cmd}" title="${e.label}" aria-label="${e.label}">${ae(e.icon,17)}</button>`).join("")).join('<span class="mapctl__sep" aria-hidden="true"></span>')}</nav>`,n.addEventListener("click",t=>{const e=t.target.closest("[data-cmd]");e&&Rt.emit("camera:cmd",{cmd:e.dataset.cmd})})}const Ns=46;function XM(n,t){n.innerHTML=`
    <canvas class="minimap card" width="220" height="154" aria-label="Sơ đồ vị trí"></canvas>
    <div class="joy" aria-hidden="true"><div class="joy__knob"></div></div>
    <p class="toast" role="status" hidden></p>`;const e=n.querySelector(".minimap"),i=e.getContext("2d"),s=n.querySelector(".joy"),r=n.querySelector(".joy__knob"),o=n.querySelector(".toast");let a=null;const c=(x,g)=>{r.style.transform=`translate(${x}px, ${g}px)`};function l(x){const g=s.getBoundingClientRect();let h=x.clientX-(g.left+g.width/2),M=x.clientY-(g.top+g.height/2);const E=Math.hypot(h,M);E>Ns&&(h=h/E*Ns,M=M/E*Ns),c(h,M),t.setAxis(h/Ns,M/Ns)}s.addEventListener("pointerdown",x=>{a=x.pointerId,s.setPointerCapture(a),l(x)}),s.addEventListener("pointermove",x=>x.pointerId===a&&l(x));const d=x=>{x.pointerId===a&&(a=null,c(0,0),t.setAxis(0,0))};s.addEventListener("pointerup",d),s.addEventListener("pointercancel",d);function f(){const{width:x,height:g}=e,h=12,M=Math.min((x-h*2)/tt.size.w,(g-h*2)/tt.size.d),E=(x-tt.size.w*M)/2,w=(g-tt.size.d*M)/2;i.clearRect(0,0,x,g),i.font="11px system-ui, sans-serif",i.textAlign="center";for(const R of tt.rooms){const C=R.id===X.state.roomId;i.fillStyle=C?"#f5e3dc":"#fffdf9",i.strokeStyle="#c9b8ae",i.lineWidth=1.5,i.fillRect(E+R.x0*M,w+R.z0*M,(R.x1-R.x0)*M,(R.z1-R.z0)*M),i.strokeRect(E+R.x0*M,w+R.z0*M,(R.x1-R.x0)*M,(R.z1-R.z0)*M),i.fillStyle="#7a6a61",i.fillText(R.name,E+(R.x0+R.x1)/2*M,w+(R.z0+R.z1)/2*M+4)}const{x:D,z:P,yaw:y}=t.state,_=E+D*M,S=w+P*M,A=Math.atan2(-Math.cos(y),-Math.sin(y));i.fillStyle="rgba(198,90,58,0.25)",i.beginPath(),i.moveTo(_,S),i.arc(_,S,26,A-.6,A+.6),i.closePath(),i.fill(),i.fillStyle="#c65a3a",i.beginPath(),i.arc(_,S,5,0,Math.PI*2),i.fill()}let u=0;function m(x){o.textContent=x,o.hidden=!1,clearTimeout(u),u=setTimeout(()=>{o.hidden=!0},5e3)}function p(x){const g=x.mode==="walk";if(n.hidden=!g,document.body.classList.toggle("walking",g),g){const h=window.matchMedia("(pointer: coarse)").matches;m(h?"Dùng cần bên trái để đi, kéo màn hình để nhìn quanh.":"WASD hoặc phím mũi tên để đi, Shift để chạy, kéo chuột để nhìn quanh.")}}return X.subscribe((x,g,h)=>h.includes("mode")&&p(x)),p(X.state),{draw:f,notify:m}}const qM={wood:"Gỗ sáng",darkwood:"Gỗ tối",tile:"Gạch",marble:"Đá hoa",granite:"Granite",concrete:"Bê tông",epoxy:"Epoxy trắng",carpet:"Thảm",glass:"Kính"},$M={door:"Cửa đi",window:"Cửa sổ",open:"Lối mở"},Nd=[.7,.9,1.2,1.5,2,2.5,3],Fi=n=>`${(Math.round(n*10)/10).toLocaleString("vi-VN")} m²`,ra=(n,t,e,i)=>`<div class="chips-row">${n.map(s=>`<button type="button" class="chipbtn${s===t?" on":""}" ${e}="${Xt(s)}">${Xt(i(s))}</button>`).join("")}</div>`;function YM(n){const t=(e,i,s)=>`<button type="button" class="chipbtn${n.tool===e?" on":""}" data-tool="${e}">${ae(s,15)} ${i}</button>`;return`<section><h3>Thêm vào mặt bằng</h3><div class="chips-row">
      ${t("door","Cửa đi","plus")}${t("window","Cửa sổ","plus")}${t("open","Lối mở","plus")}
      ${tt.custom?t("room","Vẽ phòng","pencil"):""}
    </div>${n.tool?`<p class="plan__hint">${n.tool==="room"?"Kéo trên sàn để vẽ phòng chữ nhật.":"Bấm vào một đoạn tường để đặt."} Bấm lại nút để thôi.</p>`:""}</section>`}function jM(n){const t=n.selection,e=t&&ce.get(t.type,t.id);return e?.type==="room"?`<section><h3>Phòng đang chọn</h3>
      <label class="plan__field">Tên phòng
        <input type="text" maxlength="40" value="${Xt(e.name)}" data-room-name="${Xt(e.id)}" />
      </label>
      <div class="plan__label">Vật liệu sàn</div>
      ${ra(Al,e.floor??"wood","data-room-floor",i=>qM[i])}
      <p class="plan__hint">${Fi(e.area)}${tt.custom?" · kéo chấm cam để đổi cạnh, kéo sàn để dời phòng":""}</p>
      ${tt.custom?`<button type="button" class="rbtn rbtn--danger" data-room-delete="${Xt(e.id)}">${ae("trash",16)}<span>Xoá phòng</span></button>`:""}
    </section>`:e?.type==="opening"?`<section><h3>${Xt(e.name)} đang chọn</h3>
      ${ra(uo,e.kind,"data-op-type",i=>$M[i])}
      <div class="plan__label">Bề rộng</div>
      ${ra(Nd,Nd.find(i=>Math.abs(i-e.w)<.01),"data-op-width",i=>`${i} m`)}
      <p class="plan__hint">Kéo khối cửa dọc tường để dời.</p>
      <button type="button" class="rbtn rbtn--danger" data-op-delete="${Xt(e.id)}">${ae("trash",16)}<span>Xoá</span></button>
    </section>`:'<p class="plan__hint">Bấm một phòng, hoặc một cửa, để chỉnh sàn / tên / kích thước.</p>'}function KM(n){return tt.custom?`<section><h3>Tầng · tổng ${Fi(tt.totalArea)}</h3>
    <div class="chips-row">${tt.floors.map(t=>`<button type="button" class="chipbtn${t.id===tt.floorId?" on":""}" data-floor="${Xt(t.id)}">${Xt(t.name)} · ${Fi(t.area)}</button>`).join("")}
      <button type="button" class="chipbtn" data-floor-add>${ae("plus",15)} Thêm tầng</button></div>
    <label class="plan__field">Tên tầng đang xem
      <input type="text" maxlength="40" value="${Xt(tt.floors.find(t=>t.id===tt.floorId)?.name??"")}" data-floor-name="${Xt(tt.floorId)}" />
    </label>
    ${tt.floors.length>1?`<button type="button" class="rbtn rbtn--danger" data-floor-remove="${Xt(tt.floorId)}">${ae("trash",16)}<span>Xoá tầng này</span></button>`:""}
  </section>`:""}function ZM(n){if(!tt.custom)return`<section><h3>Mặt bằng</h3>
      <p class="plan__hint">Đang dùng mặt bằng mẫu theo diện tích tin đăng (${Fi(tt.area)}). Có thể đổi sàn, thêm/dời cửa. Muốn tự vẽ phòng và thêm tầng, hãy chuyển sang tự thiết kế.</p>
      <button type="button" class="rbtn" data-plan-convert>${ae("pencil",16)}<span>Tự thiết kế mặt bằng</span></button>
    </section>`;const t=n.listingArea,e=t?Math.abs(tt.totalArea-t):0;return`<section><h3>Diện tích</h3>
    <p class="plan__hint">Tầng này ${Fi(tt.area)} · tổng ${Fi(tt.totalArea)}${t?` · tin đăng ${Fi(t)}`:""}</p>
    ${t?`<button type="button" class="rbtn" data-plan-fit="${t}" ${e<.5?"disabled":""}>${ae("cube",16)}<span>Khớp diện tích tin đăng</span></button>`:""}
    <button type="button" class="rbtn rbtn--danger" data-plan-revert>${ae("undo",16)}<span>Quay về mặt bằng mẫu</span></button>
  </section>`}function JM(n){let t=!1;function e(){const i=X.state;i.editPanel==="plan"&&(n.innerHTML=[ZM(i),KM(),YM(i),jM(i)].join(""),t=!1)}return n.addEventListener("click",i=>{const s=i.target.closest("button");if(!s)return;const r=s.dataset;if(r.tool)return Rt.emit("tool:set",{tool:r.tool}),X.set({editPanel:null});if("planConvert"in r)return Rt.emit("plan:convert");if("planRevert"in r){if(!t){t=!0,s.querySelector("span").textContent="Bấm lần nữa để xác nhận (mất mặt bằng tự vẽ)";return}return Rt.emit("plan:revert")}if("planFit"in r)return Rt.emit("plan:fit",{target:Number(r.planFit)});if(r.floor)return Rt.emit("plan:floor-select",{id:r.floor});if("floorAdd"in r)return Rt.emit("plan:floor-add",{});if(r.floorRemove)return Rt.emit("plan:floor-remove",{id:r.floorRemove});if(r.roomFloor)return Rt.emit("plan:room-floor",{id:X.state.selection.id,floor:r.roomFloor});if(r.roomDelete)return Rt.emit("plan:room-delete",{id:r.roomDelete});if(r.opType)return Rt.emit("plan:opening-type",{id:X.state.selection.id,type:r.opType});if(r.opWidth)return Rt.emit("plan:opening-width",{id:X.state.selection.id,w:Number(r.opWidth)});if(r.opDelete)return Rt.emit("plan:opening-delete",{id:r.opDelete})}),n.addEventListener("change",i=>{const s=i.target.closest("input");s&&(s.dataset.roomName&&Rt.emit("plan:room-name",{id:s.dataset.roomName,name:s.value}),s.dataset.floorName&&Rt.emit("plan:floor-rename",{id:s.dataset.floorName,name:s.value}))}),X.subscribe((i,s,r)=>{["editPanel","selection","tool","floorId","listingArea"].some(o=>r.includes(o))&&e()}),Rt.on("plan:loaded",e),{render:e}}const QM=60,tS="Kéo đồ để dời · kéo nền để dịch khung · chuột phải để xoay",eS={door:"Bấm vào tường để đặt cửa đi",window:"Bấm vào tường để đặt cửa sổ",open:"Bấm vào tường để tạo lối mở",room:"Kéo trên sàn để vẽ phòng"};function nS(){const n=new Map;for(const t of Object.keys(Hi)){const e=vs[t];e&&(n.has(e.category)||n.set(e.category,[]),n.get(e.category).push({kind:t,name:e.name}))}return[...n].map(([t,e])=>({category:t,kinds:e}))}function iS(n){const t=nS();n.innerHTML=`
    <div class="rail" role="toolbar" aria-label="Công cụ chỉnh bố cục" hidden>
      <div class="drawer" data-drawer="catalog" role="dialog" aria-label="Danh mục đồ nội thất" hidden>
        ${t.map(x=>`<section><h3>${Xt(x.category)}</h3><div class="drawer__grid">${x.kinds.map(g=>`<button type="button" class="tile" data-add="${Xt(g.kind)}">${Xt(g.name)}</button>`).join("")}</div></section>`).join("")}
      </div>
      <div class="drawer" data-drawer="inventory" role="dialog" aria-label="Danh sách đồ trong căn hộ" hidden>
        <ul class="inv" role="list"></ul>
      </div>
      <div class="drawer drawer--plan" data-drawer="plan" role="dialog" aria-label="Mặt bằng" hidden><div class="plan"></div></div>
      <div class="rail__row">
        <button type="button" class="rbtn" data-panel="catalog" aria-expanded="false">${ae("plus",18)}<span>Thêm đồ</span></button>
        <button type="button" class="rbtn" data-panel="plan" aria-expanded="false">${ae("cube",18)}<span class="plan-label">Mặt bằng</span></button>
        <button type="button" class="rbtn" data-panel="inventory" aria-expanded="false">${ae("list",18)}<span>Danh sách đồ</span></button>
        <span class="rail__ctx" hidden>
          <b class="rail__name"></b>
          <button type="button" class="rbtn rbtn--icon" data-act="rotate" aria-label="Xoay 90 độ" title="Xoay 90°">${ae("rotateRight",18)}</button>
          <button type="button" class="rbtn rbtn--icon" data-act="toggle" aria-label="Ẩn đồ" title="Ẩn / hiện"></button>
          <button type="button" class="rbtn rbtn--icon" data-act="reset" aria-label="Đặt lại vị trí" title="Đặt lại vị trí" hidden>${ae("undo",18)}</button>
          <button type="button" class="rbtn rbtn--icon rbtn--danger" data-act="remove" aria-label="Xoá đồ đã thêm" title="Xoá" hidden>${ae("trash",18)}</button>
        </span>
        <p class="rail__hint">Kéo đồ để dời · kéo nền để dịch khung · chuột phải để xoay</p>
      </div>
    </div>`;const e=n.querySelector(".rail"),i=n.querySelector(".rail__ctx"),s=n.querySelector(".rail__hint"),r=n.querySelector(".rail__name"),o=n.querySelector('[data-act="toggle"]'),a=n.querySelector('[data-act="reset"]'),c=n.querySelector('[data-act="remove"]'),l=n.querySelector(".inv");let d="";const f=JM(n.querySelector(".plan")),u=()=>{const x=X.state.selection;return x?.type==="item"?ce.get("item",x.id):null};function m(){const x=ce.list("item"),g=x.map(M=>`${M.id}:${M.hidden?1:0}`).join("|");if(g===d)return;d=g;const h=x.filter(M=>M.extra).length;l.innerHTML=x.map(M=>`<li class="inv__row${M.hidden?" is-hidden":""}">
            <button type="button" class="inv__name" data-pick="${Xt(M.id)}">${Xt(M.name)}${M.extra?" <small>(thêm)</small>":""}</button>
            <button type="button" class="rbtn rbtn--icon" data-vis="${Xt(M.id)}" aria-label="${M.hidden?"Hiện":"Ẩn"} ${Xt(M.name)}">${ae(M.hidden?"eyeOff":"eye",18)}</button>
          </li>`).join("")+`<li class="inv__foot">${x.length} món · ${h}/${QM} đồ thêm</li>`}function p(x){const g=x.editing&&x.editable&&x.mode==="overview";if(e.hidden=!g,!g)return;n.querySelector(".plan-label").textContent=`Mặt bằng · ${tt.totalArea.toFixed(0)} m²${tt.floors.length>1?` · ${tt.floors.length} tầng`:""}`;const h=u();i.hidden=!h,s.hidden=!!h,h&&(r.textContent=h.name,o.innerHTML=ae(h.hidden?"eyeOff":"eye",18),o.setAttribute("aria-label",h.hidden?`Hiện ${h.name}`:`Ẩn ${h.name}`),a.hidden=!h.moved,c.hidden=!h.extra);for(const M of n.querySelectorAll("[data-panel]")){const E=x.editPanel===M.dataset.panel;M.setAttribute("aria-expanded",String(E)),M.classList.toggle("active",E)}for(const M of n.querySelectorAll("[data-drawer]"))M.hidden=M.dataset.drawer!==x.editPanel;x.editPanel==="inventory"&&m(),x.editPanel==="plan"&&f.render(),s.textContent=eS[x.tool]??tS}n.addEventListener("click",x=>{const g=x.target.closest("[data-panel]");if(g){X.set({editPanel:X.state.editPanel===g.dataset.panel?null:g.dataset.panel});return}const h=x.target.closest("[data-add]");if(h)return Rt.emit("edit:add",{kind:h.dataset.add});const M=x.target.closest("[data-pick]");if(M){const P={type:"item",id:M.dataset.pick};return X.select(P),Rt.emit("camera:locate",P)}const E=x.target.closest("[data-vis]");if(E)return d="",Rt.emit("edit:toggle",{id:E.dataset.vis});const w=x.target.closest("[data-act]"),D=u();w&&D&&Rt.emit(`edit:${w.dataset.act}`,{id:D.id})}),n.addEventListener("keydown",x=>{x.key==="Escape"&&X.state.editPanel&&X.set({editPanel:null})}),X.subscribe((x,g,h)=>{["editing","editable","mode","selection","editPanel","tool"].some(M=>h.includes(M))&&p(x)}),Rt.on("plan:loaded",()=>{d="",p(X.state)}),p(X.state)}const oa=n=>!!n&&n.width>0&&n.height>0;function sS({width:n,height:t},{topbar:e,rooms:i,detail:s,detailShown:r=!0},o=720){const a={left:0,right:0,top:0,bottom:0},c=n>=o;oa(e)&&(a.top=Math.max(0,e.bottom)),oa(i)&&(c?a.left=Math.max(0,i.right):a.bottom=Math.max(a.bottom,t-i.top)),r&&oa(s)&&(c?a.right=Math.max(0,n-s.left):a.bottom=Math.max(a.bottom,t-s.top));const l=n*.6,d=t*.6;if(a.left+a.right>l){const f=l/(a.left+a.right);a.left*=f,a.right*=f}if(a.top+a.bottom>d){const f=d/(a.top+a.bottom);a.top*=f,a.bottom*=f}return a}const rS=[["header","ui-topbar"],["nav","ui-rooms"],["div","ui-detail"],["div","ui-mapctl"],["div","ui-hud"],["div","ui-edit"]];function oS(n,{app:t,walker:e}){const i={};for(const[c,l]of rS){const d=document.createElement(c);d.id=l,d.className="region",n.append(d),i[l]=d}zM(i["ui-topbar"]),BM(i["ui-rooms"]),HM(i["ui-detail"]),WM(i["ui-mapctl"]);const s=XM(i["ui-hud"],e);iS(i["ui-edit"]);let r=0;function o(){r=0;const c=n.querySelector('[data-inset="detail"]');t.setInsets(sS({width:window.innerWidth,height:window.innerHeight},{topbar:i["ui-topbar"].getBoundingClientRect(),rooms:n.querySelector('[data-inset="rooms"]')?.getBoundingClientRect(),detail:c?.getBoundingClientRect(),detailShown:!!c&&!c.hidden&&!document.body.classList.contains("editing")}))}const a=()=>{r||(r=requestAnimationFrame(o))};return window.addEventListener("resize",a),X.subscribe((c,l,d)=>{(d.includes("selection")||d.includes("mode")||d.includes("editing"))&&(a(),setTimeout(a,320))}),a(),setTimeout(a,400),{hud:s,els:i}}const ut=Math.PI,re=(n,t,e)=>({c:n,w:t,type:"window",...e?{sill:e}:{}}),fn=(n,t=.9)=>({c:n,w:t,type:"door"}),fo=(n,t=1)=>({c:n,w:t,type:"door",entrance:!0}),po=(n,t)=>({c:n,w:t,type:"open"}),J=(n,t,e,i=0,s,r)=>({kind:n,x:t,z:e,rot:i,...s?{args:s}:{},...r?{name:r}:{}}),je=(n,t,e,i,s)=>({dir:n,at:t,from:e,to:i,t:Tu,openings:s}),He=(n,t,e,i,s=[])=>({dir:n,at:t,from:e,to:i,t:wu,openings:s}),aS={id:"studio",bedrooms:0,bathrooms:1,size:{w:7,d:5.5},rooms:[{id:"living",name:"Phòng ở & ngủ",x0:0,x1:7,z0:0,z1:3.5,floor:"wood",stand:{x:3.4,z:.7,yaw:ut},note:"Khu ngủ và tiếp khách chung một không gian"},{id:"kitchen",name:"Bếp",x0:0,x1:4,z0:3.5,z1:5.5,floor:"tile",stand:{x:2.2,z:4.3,yaw:ut/2+.5},note:"Bếp một dãy, lối vào căn hộ"},{id:"bath",name:"Vệ sinh",x0:4,x1:7,z0:3.5,z1:5.5,floor:"tile",stand:{x:5.5,z:4,yaw:ut},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[je("x",0,0,7,[re(2.2,2.4)]),je("x",5.5,0,7,[re(5.5,.6,1.5)]),je("z",0,0,5.5,[re(1.75,1.6),fo(4.5)]),je("z",7,0,5.5,[re(1.75,1.6)]),He("x",3.5,0,7,[po(1.3,2),fn(5.5)]),He("z",4,3.5,5.5)],placements:[J("rug",3.05,2,0,[2.6,1.8]),J("sofa",3.05,1.5,0,[2.2]),J("coffeeTable",3.05,2.5),J("tvUnit",3.05,3.24,ut,[1.2]),J("bed",5.6,1.17,0),J("nightstand",4.4,.35,0),J("wardrobe",6.64,2.8,-ut/2,[1.2,2.3]),J("plant",.5,.5,0,[1]),J("floorLamp",.5,3),J("kitchenRun",1.9,5.1,ut,[2.6]),J("fridge",3.55,5.06,ut),J("shower",6.4,5,0),J("toilet",4.8,5.08,ut),J("vanity",4.33,4.2,ut/2)]},lS={id:"1pn",bedrooms:1,bathrooms:1,size:{w:8,d:6.5},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:5,z0:0,z1:4,floor:"wood",stand:{x:3.4,z:.7,yaw:ut},note:"Sofa, TV, cửa sổ đón sáng"},{id:"kitchen",name:"Bếp & ăn",x0:5,x1:8,z0:0,z1:3,floor:"tile",stand:{x:5.8,z:.9,yaw:-ut/2-.4},note:"Bếp chữ I, bàn ăn 4 chỗ"},{id:"study",name:"Góc làm việc",x0:5,x1:8,z0:3,z1:6.5,floor:"wood",stand:{x:5.7,z:3.6,yaw:-ut/2+.3},note:"Bàn làm việc, tủ sách"},{id:"bed1",name:"Phòng ngủ",x0:0,x1:3.4,z0:4,z1:6.5,floor:"wood",stand:{x:2.6,z:4.5,yaw:ut/2+.3},note:"Giường đôi, tủ áo"},{id:"bath",name:"Vệ sinh",x0:3.4,x1:5,z0:4,z1:6.5,floor:"tile",stand:{x:4.2,z:4.6,yaw:ut},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[je("x",0,0,8,[re(1.6,2.2),fo(4.2),re(6.5,1.6)]),je("x",6.5,0,8,[re(1.7,1.4),re(4.2,.6,1.5),re(6.5,1.8)]),je("z",0,0,6.5,[re(2,1.8),re(5.25,1.4)]),je("z",8,0,6.5,[re(1.5,1.2),re(4.75,1.6)]),He("z",5,0,6.5,[po(1.5,2),fn(3.5)]),He("x",3,5,8),He("x",4,0,5,[fn(1.7),fn(3.95)]),He("z",3.4,4,6.5)],placements:[J("rug",2.8,2.7,0,[3,2]),J("sofa",2.8,1.6,0,[2.2]),J("coffeeTable",2.8,2.8),J("tvUnit",2.8,3.74,ut,[1.2]),J("armchair",.9,2.75,ut/2),J("plant",.4,3.7,0,[1.1]),J("floorLamp",4.55,3.1),J("console",1.5,.28,0,[1]),J("plant",.45,.45,0,[.8],"Cây lối vào"),J("kitchenRun",6.2,2.64,ut,[1.9]),J("fridge",7.55,2.58,ut),J("diningTable",6.8,1),J("chair",6.35,.4,0),J("chair",7.25,.4,0),J("chair",6.35,1.6,ut),J("chair",7.25,1.6,ut),J("rug",1.7,5.5,ut/2,[2.2,1.6,"beige"]),J("bed",1.17,5.5,ut/2),J("nightstand",.33,4.42,ut/2),J("wardrobe",3.04,5.5,-ut/2,[1.4,2.3]),J("toilet",3.8,6.09,ut),J("shower",4.47,5.6,0),J("vanity",4.66,4.6,-ut/2),J("desk",7.6,4.75,-ut/2),J("chair",7.1,4.75,ut/2,void 0,"Ghế làm việc"),J("bookshelf",6.4,6.24,ut,[1.4]),J("plant",5.3,6.1,0,[1])]},cS={id:"2pn",bedrooms:2,bathrooms:1,size:{w:10,d:7},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:6,z0:0,z1:4.5,floor:"wood",stand:{x:3.4,z:.7,yaw:ut},note:"Sofa, TV, cửa sổ đón sáng hướng Nam"},{id:"kitchen",name:"Bếp & ăn",x0:6,x1:10,z0:0,z1:3,floor:"tile",stand:{x:6.8,z:.9,yaw:-ut/2-.4},note:"Bếp chữ I, bàn ăn 4 chỗ"},{id:"bed2",name:"Phòng ngủ 2",x0:6,x1:10,z0:3,z1:7,floor:"wood",stand:{x:6.9,z:3.9,yaw:-ut/2+.2},note:"Giường đôi, tủ áo, bàn làm việc"},{id:"bed1",name:"Phòng ngủ 1",x0:0,x1:4,z0:4.5,z1:7,floor:"wood",stand:{x:2.8,z:5.1,yaw:ut/2+.3},note:"Giường đôi, tủ áo âm tường"},{id:"bath",name:"Vệ sinh",x0:4,x1:6,z0:4.5,z1:7,floor:"tile",stand:{x:5,z:5.2,yaw:ut},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[je("x",0,0,10,[re(2.2,2.4),fo(5),re(8,1.6)]),je("x",7,0,10,[re(2,1.4),re(5,.6,1.5),re(8,2)]),je("z",0,0,7,[re(2.5,1.8),re(5.75,1.4)]),je("z",10,0,7,[re(1.5,1.2),re(5,1.6)]),He("z",6,0,7,[po(1.5,2),fn(3.9)]),He("x",3,6,10),He("x",4.5,0,6,[fn(2),fn(5)]),He("z",4,4.5,7)],placements:[J("rug",3.5,2.7,0,[3,2]),J("sofa",3.5,1.6,0,[2.4]),J("coffeeTable",3.5,2.9),J("ottoman",2.2,2.9),J("tvUnit",3.5,4.24,ut,[1.8]),J("armchair",1,3.3,ut/2),J("plant",.5,4,0,[1.1]),J("floorLamp",5.5,3.3),J("console",3.9,.3,0,[1]),J("plant",5.55,.45,0,[.8],"Cây lối vào"),J("kitchenRun",7.63,2.64,ut,[2.95]),J("fridge",9.5,2.58,ut),J("diningTable",8,1.1),J("chair",7.55,.5,0),J("chair",8.45,.5,0),J("chair",7.55,1.7,ut),J("chair",8.45,1.7,ut),J("rug",1.7,6.05,ut/2,[2.2,1.6,"beige"]),J("bed",1.17,6.05,ut/2),J("nightstand",.33,5,ut/2),J("wardrobe",3.64,5.75,-ut/2,[1.4,2.3]),J("shower",4.55,6.5,0),J("toilet",5.5,6.62,ut),J("vanity",5.69,5.3,-ut/2),J("rug",8,4.4,0,[2.4,1.6,"beige"]),J("bed",8,4.1,0),J("nightstand",6.95,3.35,0),J("nightstand",9.05,3.35,0),J("wardrobe",6.36,6,ut/2,[1.4,2.3]),J("desk",9.6,5,-ut/2),J("chair",9.1,5,ut/2,void 0,"Ghế làm việc"),J("dresser",9.55,6.45,-ut/2)]},dS={id:"3pn",bedrooms:3,bathrooms:2,size:{w:13,d:8},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:7,z0:0,z1:5,floor:"wood",stand:{x:5.8,z:.8,yaw:ut-.5},note:"Phòng khách rộng, kết hợp bàn ăn"},{id:"kitchen",name:"Bếp",x0:7,x1:13,z0:0,z1:3.5,floor:"tile",stand:{x:7.9,z:.9,yaw:-ut/2-.4},note:"Bếp chữ I, bàn ăn"},{id:"hall",name:"Sảnh",x0:7,x1:9,z0:3.5,z1:5.5,floor:"wood",stand:{x:7.6,z:4,yaw:-ut/2},note:"Sảnh trung tâm dẫn tới phòng ngủ chính"},{id:"master",name:"Phòng ngủ chính",x0:9,x1:13,z0:3.5,z1:8,floor:"wood",stand:{x:9.7,z:4.4,yaw:-ut/2-.2},note:"Giường đôi, tủ áo lớn"},{id:"bath2",name:"Vệ sinh chung",x0:7,x1:9,z0:5.5,z1:8,floor:"tile",stand:{x:8,z:6,yaw:ut},note:"Buồng tắm kính, bồn rửa"},{id:"bed2",name:"Phòng ngủ 2",x0:0,x1:3.5,z0:5,z1:8,floor:"wood",stand:{x:2.7,z:5.5,yaw:ut/2+.3},note:"Giường đôi, tủ áo"},{id:"bed3",name:"Phòng ngủ 3",x0:3.5,x1:5.6,z0:5,z1:8,floor:"wood",stand:{x:4.55,z:5.5,yaw:ut},note:"Phòng ngủ nhỏ cho con / khách"},{id:"bath1",name:"Vệ sinh 2",x0:5.6,x1:7,z0:5,z1:8,floor:"tile",stand:{x:6.3,z:5.5,yaw:ut},note:"Vệ sinh gần phòng khách"}],walls:[je("x",0,0,13,[re(2.5,2.6),fo(5.8),re(10,2)]),je("x",8,0,13,[re(1.75,1.6),re(4.5,1.2),re(6.3,.6,1.5),re(8,.6,1.5),re(11.6,1.6)]),je("z",0,0,8,[re(2.5,2),re(6.5,1.6)]),je("z",13,0,8,[re(1.75,1.4),re(5.75,1.6)]),He("z",7,0,8,[po(1.75,2.2),fn(4.2)]),He("x",3.5,7,13),He("z",9,3.5,8,[fn(4.4)]),He("x",5.5,7,9,[fn(8)]),He("x",5,0,7,[fn(1.6),fn(4.55),fn(6.3)]),He("z",3.5,5,8),He("z",5.6,5,8)],placements:[J("rug",3.1,3,0,[3,2]),J("sofa",3.1,1.9,0,[2.4]),J("coffeeTable",3.1,3.1),J("ottoman",1.95,3.1),J("tvUnit",3.1,4.74,ut,[1.8]),J("armchair",1,3.6,ut/2),J("armchair",5.3,3.6,-ut/2),J("plant",.5,4.5,0,[1.1]),J("floorLamp",5.9,4.4),J("console",4.3,.3,0,[1]),J("plant",6.6,.5,0,[.8],"Cây lối vào"),J("diningTable",5.2,1.9),J("chair",4.75,1.3,0),J("chair",5.65,1.3,0),J("chair",4.75,2.5,ut),J("chair",5.65,2.5,ut),J("kitchenRun",9.6,3.14,ut,[3.6]),J("fridge",11.85,3.08,ut),J("diningTable",9.8,1.3),J("chair",9.35,.7,0),J("chair",10.25,.7,0),J("chair",9.35,1.9,ut),J("chair",10.25,1.9,ut),J("plant",8.6,3.9,0,[.9]),J("rug",11.9,5.75,-ut/2,[2.4,1.6,"beige"]),J("bed",11.87,5.75,-ut/2),J("nightstand",12.7,4.7,-ut/2),J("nightstand",12.7,6.8,-ut/2),J("wardrobe",9.8,7.65,ut,[1.4,2.3]),J("plant",12.55,7.5,0,[1]),J("dresser",9.35,6.2,ut/2),J("toilet",7.5,7.6,ut),J("shower",8.45,7.45,0),J("vanity",7.33,6.4,ut/2),J("rug",1.8,6.5,ut/2,[2.2,1.6,"beige"]),J("bed",1.17,6.5,ut/2),J("nightstand",.33,5.35,ut/2),J("wardrobe",3.14,6.5,-ut/2,[1.2,2.3]),J("bed",4.55,6.85,ut),J("toilet",5.97,6.4,ut/2),J("vanity",6.67,6.6,-ut/2),J("shower",6.4,7.4,0)]},Fd=[aS,lS,cS,dS],uS=.9,hS=1.3,Nr=.15,Od=.9;function fS(n){const t=Math.max(0,Math.min(3,Math.floor(n)));return Fd.find(e=>e.bedrooms===t)??Fd[2]}const Ve=(n,t)=>Math.round(n*t*1e3)/1e3;function pS(n,t){return n.map(e=>({...e,at:Ve(e.at,t),from:Ve(e.from,t),to:Ve(e.to,t),openings:e.openings.map(i=>({...i,c:Ve(i.c,t),at:i.at===void 0?void 0:Ve(i.at,t)}))}))}function mS(n,t){return n.map(e=>({...e,x0:Ve(e.x0,t),x1:Ve(e.x1,t),z0:Ve(e.z0,t),z1:Ve(e.z1,t),stand:{...e.stand,x:Ve(e.stand.x,t),z:Ve(e.stand.z,t)}}))}function gS(n){return n.map((t,e)=>({...t,openings:t.openings.map((i,s)=>({...i,id:`w${e}o${s}`,dir:t.dir,at:t.at}))}))}function _S(n,t){if(!t)return n;const e=new Set(t.removed??[]),i=t.moved??{},s=n.map(r=>{const o=c=>c.w/2+Nr,a=[];for(const c of r.openings){if(e.has(c.id))continue;const l=i[c.id],d=l?{...c,...l.c!==void 0?{c:l.c}:{},...l.w!==void 0?{w:l.w}:{},...l.type?{type:l.type}:{}}:c;d.type==="window"&&d.sill===void 0&&(d.sill=Od),d.type!=="window"&&delete d.sill,d.type!=="door"&&delete d.entrance,d.c=Math.min(r.to-o(d),Math.max(r.from+o(d),d.c)),!(r.to-r.from<d.w+Nr*2)&&a.push(d)}return{...r,openings:a}});for(const r of t.added??[]){const o=s.find(d=>d.dir===r.dir&&Math.abs(d.at-r.at)<.06);if(!o)continue;const a={...r};a.type!=="window"?delete a.sill:a.sill===void 0&&(a.sill=Od),a.type!=="door"&&delete a.entrance;const c=o.from+a.w/2+Nr,l=o.to-a.w/2-Nr;l<c||(a.c=Math.min(l,Math.max(c,a.c)),o.openings.push(a))}for(const r of s)r.openings.sort((o,a)=>o.c-a.c);return s}function xS(n,t){return t?n.map(e=>{const i=t[e.id];return i?{...e,...i.name?{name:i.name}:{},...i.floor?{floor:i.floor}:{}}:e}):n}function vS(n){const t=vs[n];return{name:t.name,category:t.category,material:t.material,note:t.note}}function $u(n,t,e){vs[n.kind];const i=Hi[n.kind],s=n.args&&n.args.length?n.args:i.length?i:void 0;return{id:n.id,kind:n.kind,args:s,x:Ve(n.x,t),z:Ve(n.z,t),rot:n.rot??0,...vS(n.kind),pick:!0,hidden:!!n.hidden,moved:!1,extra:!0,floor:e}}function MS(n){return n.map(t=>({id:t.id,name:t.name,area:Gu(t.rooms)}))}function SS(n,t,{editable:e,floorId:i}){const s=t.layout.custom.floors,r=s.find(l=>l.id===i)??s[0],o=r.rooms.map(l=>({...l,stand:{x:zd((l.x0+l.x1)/2),z:zd((l.z0+l.z1)/2),yaw:Math.PI},note:`${Bi(l).toFixed(0)} m²`})),a=ku(r.rooms,r.openings),c=[];for(const l of t.layout.extras??[])!((l.floor??s[0].id)===r.id)||!vs[l.kind]||!Object.prototype.hasOwnProperty.call(Hi,l.kind)||l.hidden&&!e||c.push($u(l,1,r.id));return{templateId:"custom",bedrooms:n.bedrooms,size:iM(r.rooms),rooms:o,walls:a,placements:c,scale:1,floors:MS(s),floorId:r.id,totalArea:Pl(s),custom:!0}}const zd=n=>Math.round(n*100)/100;function bS(n,t,{editable:e=!1,floorId:i}={}){if(t?.layout?.custom)return SS(n,t,{editable:e,floorId:i});const s=fS(n.bedrooms),r=s.rooms.reduce((x,g)=>x+Bi(g),0),o=Math.sqrt(Math.max(1,n.areaM2)/r),a=Math.min(hS,Math.max(uS,o)),c=bd[t?.furnishing??n.furnishing]??bd.full,l=t?.layout?.items??{},d=new Map,f=[];for(const x of s.placements){const g=vs[x.kind];if(!g)continue;const h=(d.get(x.kind)??0)+1;if(d.set(x.kind,h),g.tier>c)continue;const M=`${x.kind}-${h}`,E=l[M],w=!!E?.hidden;w&&!e||f.push({id:M,kind:x.kind,args:x.args,x:Ve(E?.x??x.x,a),z:Ve(E?.z??x.z,a),rot:E?.rot??x.rot,name:x.name??g.name,category:g.category,material:g.material,note:g.note,pick:g.pick!==!1,hidden:w,moved:E!==void 0&&(E.x!==void 0||E.z!==void 0||E.rot!==void 0),extra:!1})}for(const x of t?.layout?.extras??[])!vs[x.kind]||!Object.prototype.hasOwnProperty.call(Hi,x.kind)||x.hidden&&!e||f.push($u(x,a));const u=mS(xS(s.rooms,t?.layout?.rooms),a),m=pS(_S(gS(s.walls),t?.layout?.openings),a),p=u.reduce((x,g)=>x+Bi(g),0);return{templateId:s.id,bedrooms:s.bedrooms,size:{w:Ve(s.size.w,a),d:Ve(s.size.d,a)},rooms:u,walls:m,placements:f,scale:a,floors:[{id:"main",name:"Tầng 1",area:Math.round(p*1e3)/1e3}],floorId:"main",totalArea:Math.round(p*1e3)/1e3,custom:!1}}const us=new URLSearchParams(location.search),nn=lx(document.getElementById("viewport"));Au({templateId:"",bedrooms:2,size:{w:10,d:7},rooms:[],walls:[],placements:[]});Pu();const Dn=pv(nn),vi=_v({camera:nn.camera,dom:nn.renderer.domElement,colliders:Dn.colliders}),Zs=yv(nn,Dn,vi),Js=wv(nn,Dn),Pn=oS(document.getElementById("ui"),{app:nn,walker:vi});let $s=null,ni=[],il="",ie=be(null);const Bd=n=>JSON.stringify(be(n)),Ol=()=>ni.find(n=>n.id===X.state.designId)??ni[0];function yi(){const n=Ol(),t=bS($s,{...n,layout:ie},{editable:X.state.editing,floorId:X.state.floorId??void 0});rx(zu(n)),Au(t),Pu(),Dn.rebuild(),X.state.floorId!==tt.floorId&&X.set({floorId:tt.floorId}),Ku.sync(),Rt.emit("plan:loaded"),nn.invalidateShadows(),Pn.hud.draw()}function Yu(n,{keepView:t=!1}={}){const e=ni.find(s=>s.id===n)??ni[0];ie=be(e.layout);const i=X.state.mode==="walk";return X.set({designs:ni,designId:e.id,selection:null,hover:null,roomId:null,menu:null,editPanel:null}),yi(),t||X.set({hour:e.defaultHour}),Dn.setHour(X.state.hour),Zs.start({walk:i}),e}function sl(n,t,e){return JSON.stringify([{...n,designs:void 0},t.map(i=>i.id===e?{...i,layout:void 0}:i)])}function ju(n){const t=n.designs.length?n.designs:[Vv(n.apartmentId)],e=!$s,i=e?null:X.state.designId;if(X.set({editable:n.editable,listingArea:n.areaM2}),!n.editable&&X.state.editing&&X.set({editing:!1}),!e&&sl(n,t,i)===il){const a=t.find(c=>c.id===i);a&&Bd(a.layout)!==Bd(ie)&&(ni=t,ie=be(a.layout),X.set({designs:ni}),yi());return}$s=n,ni=t;const s=!e&&X.state.designs.some(o=>o.id===X.state.designId),r=Yu(n.designId??(s?X.state.designId:null),{keepView:!e});il=sl(n,t,r.id),e&&yS()}function yS(){const n=Number(us.get("hour"));n>=6&&n<=18&&X.set({hour:n}),Dn.setHour(X.state.hour);const t=us.get("room"),e=us.get("mode")==="walk";(e||t)&&Zs.start({walk:e,room:t});const i=us.get("select");i&&ce.get("item",i)&&X.select({type:"item",id:i})}Rt.on("design:select",({id:n})=>{const t=Yu(n,{keepView:!1});il=sl($s,ni,t.id),bi("FLOORPLAN_DESIGN_SELECTED",{designId:t.id})});const tn=()=>({custom:tt.custom,scale:tt.scale,floorId:tt.floorId,walls:tt.walls,rooms:tt.rooms,placements:tt.placements});function Ln(n,{select:t,rejected:e="Không thực hiện được thao tác này ở vị trí đó."}={}){return n===ie||n==null?(Pn.hud.notify(e),Js.refresh(),yi(),!1):(mn(n,t===void 0?{}:{select:t}),!0)}function ES(n,t,e){if(!X.state.editable)return;const i=$v(ie,n,t,e,tt.scale),s=tt.placements.find(o=>o.id===n),r=ce.get("item",n);if(!s||!r)return mn(i);ie=i;for(const o of[s,r])Object.assign(o,{x:t,z:e,moved:!0});Js.refresh(),nn.invalidateShadows(),X.set({selection:{type:"item",id:n}}),bi("FLOORPLAN_LAYOUT_CHANGED",{designId:Ol().id,layout:ie})}const Ku=CM(nn,Dn,Js,{isCustom:()=>tt.custom,onMove:(n,t,e)=>ES(n,t,e),onReject:n=>Pn.hud.notify(n),onCancel:()=>yi(),onOpeningMove:(n,t)=>Ln(dM(ie,tn(),n,t),{select:{type:"opening",id:n},rejected:"Cửa không đặt được ở đó (tường quá ngắn)."}),onOpeningAdd:({dir:n,at:t,c:e,type:i})=>{const s=pM(ie,tn(),{dir:n,at:t,c:e,type:i});if(!s)return Pn.hud.notify("Không đặt được ở đó: tường quá ngắn hoặc đã có cửa.");mn(s.layout,{select:{type:"opening",id:s.id}}),X.set({tool:null})},onRoomDraw:n=>{const t=xM(ie,tn(),n);if(!t)return Pn.hud.notify("Không vẽ được phòng ở đó: quá nhỏ (tối thiểu 1,2 m), chồng lên phòng khác hoặc đã đủ số phòng."),yi();mn(t.layout,{select:{type:"room",id:t.id}}),X.set({tool:null})},onRoomResize:(n,t)=>Ln(MM(ie,tn(),n,t),{select:{type:"room",id:n},rejected:"Không đổi được kích thước: phòng sẽ quá nhỏ hoặc chồng lên phòng khác."}),onRoomMove:(n,t,e)=>Ln(SM(ie,tn(),n,t,e),{select:{type:"room",id:n},rejected:"Không dời được phòng: sẽ chồng lên phòng khác."})});function mn(n,{select:t}={}){if(!X.state.editable)return;const e=t!==void 0?t:X.state.selection,i={...tt.size};ie=n,yi(),(Math.abs(tt.size.w-i.w)>.4||Math.abs(tt.size.d-i.d)>.4)&&Rt.emit("camera:cmd",{cmd:"home"}),e&&ce.get(e.type,e.id)?X.set({selection:e}):X.set({selection:null}),Js.refresh(),bi("FLOORPLAN_LAYOUT_CHANGED",{designId:Ol().id,layout:ie})}Rt.on("edit:rotate",({id:n})=>{const t=tt.placements.find(e=>e.id===n);t&&mn(Yv(ie,n,t.rot??0))});Rt.on("edit:toggle",({id:n})=>mn(jv(ie,n)));Rt.on("edit:reset",({id:n})=>mn(Zv(ie,n)));Rt.on("edit:remove",({id:n})=>{qv(ie,n)&&mn(Kv(ie,n),{select:null})});function TS(n){const t=n??{x0:0,x1:tt.size.w,z0:0,z1:tt.size.d},e=(t.x0+t.x1)/2,i=(t.z0+t.z1)/2,s=ce.list("item").filter(o=>!o.hidden);let r={x:e,z:i,score:-1/0};for(let o=t.x0+.7;o<=t.x1-.7;o+=.4)for(let a=t.z0+.7;a<=t.z1-.7;a+=.4){let c=1/0;for(const d of s){const f=(d.dims?.w??.6)/2+.45,u=(d.dims?.d??.6)/2+.45;c=Math.min(c,Math.max(Math.abs(o-d.x)-f,Math.abs(a-d.z)-u))}const l=Math.min(c,1)*3-Math.hypot(o-e,a-i)*.15;l>r.score&&(r={x:o,z:a,score:l})}return{x:Math.round(r.x*20)/20,z:Math.round(r.z*20)/20}}Rt.on("edit:add",({kind:n})=>{const t=ce.room(X.state.roomId)??tt.rooms[0],{x:e,z:i}=TS(t),s=tt.placements.map(a=>a.id),r=Jv(ie,n,e,i,tt.scale,s);if(!r)return;let o=r.layout;tt.custom&&(o=be({...o,extras:o.extras.map(a=>a.id===r.id?{...a,floor:tt.floorId}:a)})),mn(o,{select:{type:"item",id:r.id}}),X.set({editPanel:null})});const Qs=()=>X.state.selection;Rt.on("plan:convert",()=>{tt.custom||Ln(mM(ie,{rooms:tt.rooms,walls:tt.walls,placements:tt.placements}),{select:null,rejected:"Không chuyển được sang mặt bằng tuỳ chỉnh."})});Rt.on("plan:revert",()=>{mn(gM(),{select:null}),X.set({floorId:null})});Rt.on("plan:room-floor",({id:n,floor:t})=>Ln(oM(ie,tn(),n,t),{select:Qs()}));Rt.on("plan:room-name",({id:n,name:t})=>Ln(aM(ie,tn(),n,t),{select:Qs(),rejected:"Tên phòng không được để trống."}));Rt.on("plan:room-delete",({id:n})=>Ln(bM(ie,tn(),n),{select:null,rejected:"Mỗi tầng phải còn ít nhất một phòng."}));Rt.on("plan:opening-type",({id:n,type:t})=>Ln(hM(ie,tn(),n,t),{select:Qs()}));Rt.on("plan:opening-width",({id:n,w:t})=>Ln(uM(ie,tn(),n,t),{select:Qs(),rejected:"Cửa rộng quá so với đoạn tường này."}));Rt.on("plan:opening-delete",({id:n})=>Ln(fM(ie,tn(),n),{select:null}));Rt.on("plan:floor-add",({name:n})=>{const t=yM(ie,tn(),n);if(!t)return Pn.hud.notify("Đã đạt số tầng tối đa (5 tầng).");X.set({floorId:t.id}),mn(t.layout,{select:null})});Rt.on("plan:floor-select",({id:n})=>{n!==tt.floorId&&(X.set({floorId:n,selection:null,roomId:null}),yi(),Zs.start({walk:!1}))});Rt.on("plan:floor-rename",({id:n,name:t})=>Ln(EM(ie,tn(),n,t),{select:Qs()}));Rt.on("plan:floor-remove",({id:n})=>{const t=TM(ie,tn(),n);if(t===ie)return Pn.hud.notify("Phải giữ lại ít nhất một tầng.");X.set({floorId:null}),mn(t,{select:null})});Rt.on("plan:fit",({target:n})=>{const t=wM(ie,tn(),Number(n));if(t.layout===ie)return Pn.hud.notify("Diện tích đã khớp tin đăng.");mn(t.layout,{select:null}),Pn.hud.notify(`Đã co dãn mặt bằng: ${t.before.toFixed(1)} → ${t.after.toFixed(1)} m².`)});Rt.on("tool:set",({tool:n})=>X.set({tool:X.state.tool===n?null:n}));X.subscribe((n,t,e)=>{e.includes("mode")&&n.mode==="walk"&&n.editing&&X.set({editing:!1}),e.includes("editing")&&(document.body.classList.toggle("editing",n.editing),Ku.setEditing(n.editing),Dn.setEditing(n.editing),X.set({editPanel:null,selection:null,tool:null}),$s&&yi())});X.subscribe((n,t,e)=>{e.includes("hour")&&Dn.setHour(n.hour),(e.includes("mode")||e.includes("roomId"))&&Pn.hud.draw(),e.includes("selection")&&n.selection?.type==="room"&&bi("FLOORPLAN_ROOM_SELECTED",{roomId:n.selection.id})});document.addEventListener("click",n=>{const t=n.target.closest?.(".room-label");t&&(Rt.emit("room:go",{id:t.dataset.room}),X.select({type:"room",id:t.dataset.room}))});let Fr=0;nn.onFrame(n=>{if(Dn.update(n),Js.update(n),Zs.update(n),X.state.playing&&(Fr+=n,Fr>.05)){let t=X.state.hour+Fr*.75;t>18&&(t=6),Fr=0,X.set({hour:Math.round(t*100)/100})}if(X.state.mode==="walk"&&vi.update(n)){nn.invalidate(),Pn.hud.draw();const t=ce.list("room").find(e=>vi.state.x>=e.x0&&vi.state.x<=e.x1&&vi.state.z>=e.z0&&vi.state.z<=e.z1);t&&t.id!==X.state.roomId&&X.set({roomId:t.id})}});NM({init:ju,pause:()=>nn.pause(),resume:()=>nn.resume(),reset:()=>Rt.emit("camera:cmd",{cmd:"home"}),expanded:n=>Rt.emit("host:expanded",{expanded:n})});nn.start();try{bi("FLOORPLAN_READY")}catch{bi("FLOORPLAN_ERROR",{code:"WEBGL_INIT_FAILED"})}if(!Xu()){const n=to.map(e=>Cl({id:e,name:Ms[e].label,theme:e})),t=FM(us,n);t&&ju({...t,editable:us.get("edit")==="1"})}window.__apt={app:nn,world:Dn,walker:vi,director:Zs,store:X,plan:tt,bus:Rt};
