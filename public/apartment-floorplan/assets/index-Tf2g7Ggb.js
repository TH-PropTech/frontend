(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Pl="184",Xe={ROTATE:0,DOLLY:1,PAN:2},hn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Vh=0,wc=1,Wh=2,Ms=1,Xh=2,Ys=3,Ai=0,cn=1,ti=2,ni=0,bs=1,Ac=2,Rc=3,Cc=4,$h=5,Fi=100,qh=101,Yh=102,jh=103,Kh=104,Zh=200,Jh=201,Qh=202,tf=203,Da=204,Ia=205,ef=206,nf=207,sf=208,rf=209,of=210,af=211,lf=212,cf=213,uf=214,Na=0,Ua=1,Oa=2,ys=3,Fa=4,za=5,Ba=6,ka=7,Ll=0,df=1,hf=2,Vn=0,Md=1,bd=2,Sd=3,yd=4,Ed=5,Td=6,wo=7,wd=300,Wi=301,Es=302,zo=303,Bo=304,Ao=306,ir=1e3,ei=1001,Ga=1002,Ye=1003,ff=1004,Mr=1005,en=1006,ko=1007,Bi=1008,_n=1009,Ad=1010,Rd=1011,sr=1012,Dl=1013,Xn=1014,Dn=1015,oi=1016,Il=1017,Nl=1018,rr=1020,Cd=35902,Pd=35899,Ld=1021,Dd=1022,In=1023,ai=1026,ki=1027,Ul=1028,Ol=1029,Xi=1030,Fl=1031,zl=1033,io=33776,so=33777,ro=33778,oo=33779,Ha=35840,Va=35841,Wa=35842,Xa=35843,$a=36196,qa=37492,Ya=37496,ja=37488,Ka=37489,ho=37490,Za=37491,Ja=37808,Qa=37809,tl=37810,el=37811,nl=37812,il=37813,sl=37814,rl=37815,ol=37816,al=37817,ll=37818,cl=37819,ul=37820,dl=37821,hl=36492,fl=36494,pl=36495,ml=36283,gl=36284,fo=36285,_l=36286,pf=3200,po=0,mf=1,Si="",tn="srgb",mo="srgb-linear",go="linear",he="srgb",ts=7680,Pc=519,gf=512,_f=513,xf=514,Bl=515,vf=516,Mf=517,kl=518,bf=519,Lc=35044,Dc="300 es",Hn=2e3,or=2001;function Sf(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function _o(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function yf(){const n=_o("canvas");return n.style.display="block",n}const Ic={};function Nc(...n){const t="THREE."+n.shift();console.log(t,...n)}function Id(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function zt(...n){n=Id(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function se(...n){n=Id(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function xl(...n){const t=n.join(" ");t in Ic||(Ic[t]=!0,zt(...n))}function Ef(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const Tf={[Na]:Ua,[Oa]:Ba,[Fa]:ka,[ys]:za,[Ua]:Na,[Ba]:Oa,[ka]:Fa,[za]:ys};class Ci{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Uc=1234567;const Js=Math.PI/180,ar=180/Math.PI;function Ds(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Je[n&255]+Je[n>>8&255]+Je[n>>16&255]+Je[n>>24&255]+"-"+Je[t&255]+Je[t>>8&255]+"-"+Je[t>>16&15|64]+Je[t>>24&255]+"-"+Je[e&63|128]+Je[e>>8&255]+"-"+Je[e>>16&255]+Je[e>>24&255]+Je[i&255]+Je[i>>8&255]+Je[i>>16&255]+Je[i>>24&255]).toLowerCase()}function Qt(n,t,e){return Math.max(t,Math.min(e,n))}function Gl(n,t){return(n%t+t)%t}function wf(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Af(n,t,e){return n!==t?(e-n)/(t-n):0}function Qs(n,t,e){return(1-e)*n+e*t}function Rf(n,t,e,i){return Qs(n,t,1-Math.exp(-e*i))}function Cf(n,t=1){return t-Math.abs(Gl(n,t*2)-t)}function Pf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Lf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Df(n,t){return n+Math.floor(Math.random()*(t-n+1))}function If(n,t){return n+Math.random()*(t-n)}function Nf(n){return n*(.5-Math.random())}function Uf(n){n!==void 0&&(Uc=n);let t=Uc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Of(n){return n*Js}function Ff(n){return n*ar}function zf(n){return(n&n-1)===0&&n!==0}function Bf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function kf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Gf(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+i)/2),u=o((t+i)/2),f=r((t-i)/2),d=o((t-i)/2),m=r((i-t)/2),g=o((i-t)/2);switch(s){case"XYX":n.set(a*u,c*f,c*d,a*l);break;case"YZY":n.set(c*d,a*u,c*f,a*l);break;case"ZXZ":n.set(c*f,c*d,a*u,a*l);break;case"XZX":n.set(a*u,c*g,c*m,a*l);break;case"YXY":n.set(c*m,a*u,c*g,a*l);break;case"ZYZ":n.set(c*g,c*m,a*u,a*l);break;default:zt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function _s(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function on(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ue={DEG2RAD:Js,RAD2DEG:ar,generateUUID:Ds,clamp:Qt,euclideanModulo:Gl,mapLinear:wf,inverseLerp:Af,lerp:Qs,damp:Rf,pingpong:Cf,smoothstep:Pf,smootherstep:Lf,randInt:Df,randFloat:If,randFloatSpread:Nf,seededRandom:Uf,degToRad:Of,radToDeg:Ff,isPowerOfTwo:zf,ceilPowerOfTwo:Bf,floorPowerOfTwo:kf,setQuaternionFromProperEuler:Gf,normalize:on,denormalize:_s},mc=class mc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};mc.prototype.isVector2=!0;let Nt=mc;class li{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],u=i[s+2],f=i[s+3],d=r[o+0],m=r[o+1],g=r[o+2],v=r[o+3];if(f!==v||c!==d||l!==m||u!==g){let _=c*d+l*m+u*g+f*v;_<0&&(d=-d,m=-m,g=-g,v=-v,_=-_);let h=1-a;if(_<.9995){const x=Math.acos(_),S=Math.sin(x);h=Math.sin(h*x)/S,a=Math.sin(a*x)/S,c=c*h+d*a,l=l*h+m*a,u=u*h+g*a,f=f*h+v*a}else{c=c*h+d*a,l=l*h+m*a,u=u*h+g*a,f=f*h+v*a;const x=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=x,l*=x,u*=x,f*=x}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],u=i[s+3],f=r[o],d=r[o+1],m=r[o+2],g=r[o+3];return t[e]=a*g+u*f+c*m-l*d,t[e+1]=c*g+u*d+l*f-a*m,t[e+2]=l*g+u*m+a*d-c*f,t[e+3]=u*g-a*f-c*d-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(s/2),f=a(r/2),d=c(i/2),m=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*u*f+l*m*g,this._y=l*m*f-d*u*g,this._z=l*u*g+d*m*f,this._w=l*u*f-d*m*g;break;case"YXZ":this._x=d*u*f+l*m*g,this._y=l*m*f-d*u*g,this._z=l*u*g-d*m*f,this._w=l*u*f+d*m*g;break;case"ZXY":this._x=d*u*f-l*m*g,this._y=l*m*f+d*u*g,this._z=l*u*g+d*m*f,this._w=l*u*f-d*m*g;break;case"ZYX":this._x=d*u*f-l*m*g,this._y=l*m*f+d*u*g,this._z=l*u*g-d*m*f,this._w=l*u*f+d*m*g;break;case"YZX":this._x=d*u*f+l*m*g,this._y=l*m*f+d*u*g,this._z=l*u*g-d*m*f,this._w=l*u*f-d*m*g;break;case"XZY":this._x=d*u*f-l*m*g,this._y=l*m*f-d*u*g,this._z=l*u*g+d*m*f,this._w=l*u*f+d*m*g;break;default:zt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],f=e[10],d=i+a+f;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(u-c)*m,this._y=(r-l)*m,this._z=(o-s)*m}else if(i>a&&i>f){const m=2*Math.sqrt(1+i-a-f);this._w=(u-c)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+l)/m}else if(a>f){const m=2*Math.sqrt(1+a-i-f);this._w=(r-l)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(c+u)/m}else{const m=2*Math.sqrt(1+f-i-a);this._w=(o-s)/m,this._x=(r+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=i*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-i*l,this._z=r*u+o*l+i*c-s*a,this._w=o*u-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const gc=class gc{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Oc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Oc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),u=2*(a*e-r*s),f=2*(r*i-o*e);return this.x=e+c*l+o*f-a*u,this.y=i+c*u+a*l-r*f,this.z=s+c*f+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Go.copy(this).projectOnVector(t),this.sub(Go)}reflect(t){return this.sub(Go.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};gc.prototype.isVector3=!0;let U=gc;const Go=new U,Oc=new li,_c=class _c{constructor(t,e,i,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],f=i[7],d=i[2],m=i[5],g=i[8],v=s[0],_=s[3],h=s[6],x=s[1],S=s[4],E=s[7],L=s[2],A=s[5],w=s[8];return r[0]=o*v+a*x+c*L,r[3]=o*_+a*S+c*A,r[6]=o*h+a*E+c*w,r[1]=l*v+u*x+f*L,r[4]=l*_+u*S+f*A,r[7]=l*h+u*E+f*w,r[2]=d*v+m*x+g*L,r[5]=d*_+m*S+g*A,r[8]=d*h+m*E+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-i*r*u+i*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=u*o-a*l,d=a*c-u*r,m=l*r-o*c,g=e*f+i*d+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=f*v,t[1]=(s*l-u*i)*v,t[2]=(a*i-s*o)*v,t[3]=d*v,t[4]=(u*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=m*v,t[7]=(i*c-l*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ho.makeScale(t,e)),this}rotate(t){return this.premultiply(Ho.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ho.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};_c.prototype.isMatrix3=!0;let $t=_c;const Ho=new $t,Fc=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zc=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hf(){const n={enabled:!0,workingColorSpace:mo,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===he&&(s.r=ii(s.r),s.g=ii(s.g),s.b=ii(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===he&&(s.r=Ss(s.r),s.g=Ss(s.g),s.b=Ss(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Si?go:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return xl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return xl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[mo]:{primaries:t,whitePoint:i,transfer:go,toXYZ:Fc,fromXYZ:zc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:tn},outputColorSpaceConfig:{drawingBufferColorSpace:tn}},[tn]:{primaries:t,whitePoint:i,transfer:he,toXYZ:Fc,fromXYZ:zc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:tn}}}),n}const ie=Hf();function ii(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ss(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let es;class Vf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{es===void 0&&(es=_o("canvas")),es.width=t.width,es.height=t.height;const s=es.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=es}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=_o("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ii(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ii(e[i]/255)*255):e[i]=ii(e[i]);return{data:e,width:t.width,height:t.height}}else return zt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Wf=0;class Hl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=Ds(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Vo(s[o].image)):r.push(Vo(s[o]))}else r=Vo(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Vo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Vf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(zt("Texture: Unable to serialize Texture."),{})}let Xf=0;const Wo=new U;class sn extends Ci{constructor(t=sn.DEFAULT_IMAGE,e=sn.DEFAULT_MAPPING,i=ei,s=ei,r=en,o=Bi,a=In,c=_n,l=sn.DEFAULT_ANISOTROPY,u=Si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xf++}),this.uuid=Ds(),this.name="",this.source=new Hl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Nt(0,0),this.repeat=new Nt(1,1),this.center=new Nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Wo).x}get height(){return this.source.getSize(Wo).y}get depth(){return this.source.getSize(Wo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){zt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){zt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ir:t.x=t.x-Math.floor(t.x);break;case ei:t.x=t.x<0?0:1;break;case Ga:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ir:t.y=t.y-Math.floor(t.y);break;case ei:t.y=t.y<0?0:1;break;case Ga:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=wd;sn.DEFAULT_ANISOTROPY=1;const xc=class xc{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],u=c[4],f=c[8],d=c[1],m=c[5],g=c[9],v=c[2],_=c[6],h=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-v)<.01&&Math.abs(g-_)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+v)<.1&&Math.abs(g+_)<.1&&Math.abs(l+m+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(l+1)/2,E=(m+1)/2,L=(h+1)/2,A=(u+d)/4,w=(f+v)/4,p=(g+_)/4;return S>E&&S>L?S<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(S),s=A/i,r=w/i):E>L?E<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),i=A/s,r=p/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=w/r,s=p/r),this.set(i,s,r,e),this}let x=Math.sqrt((_-g)*(_-g)+(f-v)*(f-v)+(d-u)*(d-u));return Math.abs(x)<.001&&(x=1),this.x=(_-g)/x,this.y=(f-v)/x,this.z=(d-u)/x,this.w=Math.acos((l+m+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};xc.prototype.isVector4=!0;let Oe=xc;class $f extends Ci{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Oe(0,0,t,e),this.scissorTest=!1,this.viewport=new Oe(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new sn(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:en,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Hl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wn extends $f{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Nd extends sn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class qf extends sn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const To=class To{constructor(t,e,i,s,r,o,a,c,l,u,f,d,m,g,v,_){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,u,f,d,m,g,v,_)}set(t,e,i,s,r,o,a,c,l,u,f,d,m,g,v,_){const h=this.elements;return h[0]=t,h[4]=e,h[8]=i,h[12]=s,h[1]=r,h[5]=o,h[9]=a,h[13]=c,h[2]=l,h[6]=u,h[10]=f,h[14]=d,h[3]=m,h[7]=g,h[11]=v,h[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new To().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,i=t.elements,s=1/ns.setFromMatrixColumn(t,0).length(),r=1/ns.setFromMatrixColumn(t,1).length(),o=1/ns.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const d=o*u,m=o*f,g=a*u,v=a*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=m+g*l,e[5]=d-v*l,e[9]=-a*c,e[2]=v-d*l,e[6]=g+m*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*u,m=c*f,g=l*u,v=l*f;e[0]=d+v*a,e[4]=g*a-m,e[8]=o*l,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=m*a-g,e[6]=v+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*u,m=c*f,g=l*u,v=l*f;e[0]=d-v*a,e[4]=-o*f,e[8]=g+m*a,e[1]=m+g*a,e[5]=o*u,e[9]=v-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*u,m=o*f,g=a*u,v=a*f;e[0]=c*u,e[4]=g*l-m,e[8]=d*l+v,e[1]=c*f,e[5]=v*l+d,e[9]=m*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,m=o*l,g=a*c,v=a*l;e[0]=c*u,e[4]=v-d*f,e[8]=g*f+m,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=m*f+g,e[10]=d-v*f}else if(t.order==="XZY"){const d=o*c,m=o*l,g=a*c,v=a*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=d*f+v,e[5]=o*u,e[9]=m*f-g,e[2]=g*f-m,e[6]=a*u,e[10]=v*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Yf,t,jf)}lookAt(t,e,i){const s=this.elements;return pn.subVectors(t,e),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),pi.crossVectors(i,pn),pi.lengthSq()===0&&(Math.abs(i.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),pi.crossVectors(i,pn)),pi.normalize(),br.crossVectors(pn,pi),s[0]=pi.x,s[4]=br.x,s[8]=pn.x,s[1]=pi.y,s[5]=br.y,s[9]=pn.y,s[2]=pi.z,s[6]=br.z,s[10]=pn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],f=i[5],d=i[9],m=i[13],g=i[2],v=i[6],_=i[10],h=i[14],x=i[3],S=i[7],E=i[11],L=i[15],A=s[0],w=s[4],p=s[8],M=s[12],T=s[1],C=s[5],P=s[9],D=s[13],H=s[2],N=s[6],k=s[10],B=s[14],J=s[3],ot=s[7],pt=s[11],wt=s[15];return r[0]=o*A+a*T+c*H+l*J,r[4]=o*w+a*C+c*N+l*ot,r[8]=o*p+a*P+c*k+l*pt,r[12]=o*M+a*D+c*B+l*wt,r[1]=u*A+f*T+d*H+m*J,r[5]=u*w+f*C+d*N+m*ot,r[9]=u*p+f*P+d*k+m*pt,r[13]=u*M+f*D+d*B+m*wt,r[2]=g*A+v*T+_*H+h*J,r[6]=g*w+v*C+_*N+h*ot,r[10]=g*p+v*P+_*k+h*pt,r[14]=g*M+v*D+_*B+h*wt,r[3]=x*A+S*T+E*H+L*J,r[7]=x*w+S*C+E*N+L*ot,r[11]=x*p+S*P+E*k+L*pt,r[15]=x*M+S*D+E*B+L*wt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],f=t[6],d=t[10],m=t[14],g=t[3],v=t[7],_=t[11],h=t[15],x=c*m-l*d,S=a*m-l*f,E=a*d-c*f,L=o*m-l*u,A=o*d-c*u,w=o*f-a*u;return e*(v*x-_*S+h*E)-i*(g*x-_*L+h*A)+s*(g*S-v*L+h*w)-r*(g*E-v*A+_*w)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=t[9],d=t[10],m=t[11],g=t[12],v=t[13],_=t[14],h=t[15],x=e*a-i*o,S=e*c-s*o,E=e*l-r*o,L=i*c-s*a,A=i*l-r*a,w=s*l-r*c,p=u*v-f*g,M=u*_-d*g,T=u*h-m*g,C=f*_-d*v,P=f*h-m*v,D=d*h-m*_,H=x*D-S*P+E*C+L*T-A*M+w*p;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/H;return t[0]=(a*D-c*P+l*C)*N,t[1]=(s*P-i*D-r*C)*N,t[2]=(v*w-_*A+h*L)*N,t[3]=(d*A-f*w-m*L)*N,t[4]=(c*T-o*D-l*M)*N,t[5]=(e*D-s*T+r*M)*N,t[6]=(_*E-g*w-h*S)*N,t[7]=(u*w-d*E+m*S)*N,t[8]=(o*P-a*T+l*p)*N,t[9]=(i*T-e*P-r*p)*N,t[10]=(g*A-v*E+h*x)*N,t[11]=(f*E-u*A-m*x)*N,t[12]=(a*M-o*C-c*p)*N,t[13]=(e*C-i*M+s*p)*N,t[14]=(v*S-g*L-_*x)*N,t[15]=(u*L-f*S+d*x)*N,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+i,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,f=a+a,d=r*l,m=r*u,g=r*f,v=o*u,_=o*f,h=a*f,x=c*l,S=c*u,E=c*f,L=i.x,A=i.y,w=i.z;return s[0]=(1-(v+h))*L,s[1]=(m+E)*L,s[2]=(g-S)*L,s[3]=0,s[4]=(m-E)*A,s[5]=(1-(d+h))*A,s[6]=(_+x)*A,s[7]=0,s[8]=(g+S)*w,s[9]=(_-x)*w,s[10]=(1-(d+v))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),e.identity(),this;let o=ns.set(s[0],s[1],s[2]).length();const a=ns.set(s[4],s[5],s[6]).length(),c=ns.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Rn.copy(this);const l=1/o,u=1/a,f=1/c;return Rn.elements[0]*=l,Rn.elements[1]*=l,Rn.elements[2]*=l,Rn.elements[4]*=u,Rn.elements[5]*=u,Rn.elements[6]*=u,Rn.elements[8]*=f,Rn.elements[9]*=f,Rn.elements[10]*=f,e.setFromRotationMatrix(Rn),i.x=o,i.y=a,i.z=c,this}makePerspective(t,e,i,s,r,o,a=Hn,c=!1){const l=this.elements,u=2*r/(e-t),f=2*r/(i-s),d=(e+t)/(e-t),m=(i+s)/(i-s);let g,v;if(c)g=r/(o-r),v=o*r/(o-r);else if(a===Hn)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===or)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Hn,c=!1){const l=this.elements,u=2/(e-t),f=2/(i-s),d=-(e+t)/(e-t),m=-(i+s)/(i-s);let g,v;if(c)g=1/(o-r),v=o/(o-r);else if(a===Hn)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===or)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=f,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};To.prototype.isMatrix4=!0;let me=To;const ns=new U,Rn=new me,Yf=new U(0,0,0),jf=new U(1,1,1),pi=new U,br=new U,pn=new U,Bc=new me,kc=new li;class $n{constructor(t=0,e=0,i=0,s=$n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],f=s[2],d=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Qt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:zt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Bc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Bc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return kc.setFromEuler(this),this.setFromQuaternion(kc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$n.DEFAULT_ORDER="XYZ";class Vl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Kf=0;const Gc=new U,is=new li,Yn=new me,Sr=new U,zs=new U,Zf=new U,Jf=new li,Hc=new U(1,0,0),Vc=new U(0,1,0),Wc=new U(0,0,1),Xc={type:"added"},Qf={type:"removed"},ss={type:"childadded",child:null},Xo={type:"childremoved",child:null};class De extends Ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Ds(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=De.DEFAULT_UP.clone();const t=new U,e=new $n,i=new li,s=new U(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new me},normalMatrix:{value:new $t}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=De.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return is.setFromAxisAngle(t,e),this.quaternion.multiply(is),this}rotateOnWorldAxis(t,e){return is.setFromAxisAngle(t,e),this.quaternion.premultiply(is),this}rotateX(t){return this.rotateOnAxis(Hc,t)}rotateY(t){return this.rotateOnAxis(Vc,t)}rotateZ(t){return this.rotateOnAxis(Wc,t)}translateOnAxis(t,e){return Gc.copy(t).applyQuaternion(this.quaternion),this.position.add(Gc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Hc,t)}translateY(t){return this.translateOnAxis(Vc,t)}translateZ(t){return this.translateOnAxis(Wc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Sr.copy(t):Sr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(zs,Sr,this.up):Yn.lookAt(Sr,zs,this.up),this.quaternion.setFromRotationMatrix(Yn),s&&(Yn.extractRotation(s.matrixWorld),is.setFromRotationMatrix(Yn),this.quaternion.premultiply(is.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(se("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Xc),ss.child=t,this.dispatchEvent(ss),ss.child=null):se("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Qf),Xo.child=t,this.dispatchEvent(Xo),Xo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Xc),ss.child=t,this.dispatchEvent(ss),ss.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,t,Zf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,Jf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),f=o(t.shapes),d=o(t.skeletons),m=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}De.DEFAULT_UP=new U(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Zt extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tp={type:"move"};class $o{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const _=e.getJointPose(v,i),h=this._getHandJoint(l,v);_!==null&&(h.matrix.fromArray(_.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=_.radius),h.visible=_!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),m=.02,g=.005;l.inputState.pinching&&d>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(tp)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Zt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Ud={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mi={h:0,s:0,l:0},yr={h:0,s:0,l:0};function qo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Ut{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=tn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=ie.workingColorSpace){return this.r=t,this.g=e,this.b=i,ie.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=ie.workingColorSpace){if(t=Gl(t,1),e=Qt(e,0,1),i=Qt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=qo(o,r,t+1/3),this.g=qo(o,r,t),this.b=qo(o,r,t-1/3)}return ie.colorSpaceToWorking(this,s),this}setStyle(t,e=tn){function i(r){r!==void 0&&parseFloat(r)<1&&zt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:zt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);zt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=tn){const i=Ud[t.toLowerCase()];return i!==void 0?this.setHex(i,e):zt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ii(t.r),this.g=ii(t.g),this.b=ii(t.b),this}copyLinearToSRGB(t){return this.r=Ss(t.r),this.g=Ss(t.g),this.b=Ss(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=tn){return ie.workingToColorSpace(Qe.copy(this),t),Math.round(Qt(Qe.r*255,0,255))*65536+Math.round(Qt(Qe.g*255,0,255))*256+Math.round(Qt(Qe.b*255,0,255))}getHexString(t=tn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ie.workingColorSpace){ie.workingToColorSpace(Qe.copy(this),e);const i=Qe.r,s=Qe.g,r=Qe.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=ie.workingColorSpace){return ie.workingToColorSpace(Qe.copy(this),e),t.r=Qe.r,t.g=Qe.g,t.b=Qe.b,t}getStyle(t=tn){ie.workingToColorSpace(Qe.copy(this),t);const e=Qe.r,i=Qe.g,s=Qe.b;return t!==tn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(mi),this.setHSL(mi.h+t,mi.s+e,mi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(mi),t.getHSL(yr);const i=Qs(mi.h,yr.h,e),s=Qs(mi.s,yr.s,e),r=Qs(mi.l,yr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qe=new Ut;Ut.NAMES=Ud;class Ro{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ut(t),this.near=e,this.far=i}clone(){return new Ro(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Wl extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Cn=new U,jn=new U,Yo=new U,Kn=new U,rs=new U,os=new U,$c=new U,jo=new U,Ko=new U,Zo=new U,Jo=new Oe,Qo=new Oe,ta=new Oe;class Ln{constructor(t=new U,e=new U,i=new U){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Cn.subVectors(t,e),s.cross(Cn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Cn.subVectors(s,e),jn.subVectors(i,e),Yo.subVectors(t,e);const o=Cn.dot(Cn),a=Cn.dot(jn),c=Cn.dot(Yo),l=jn.dot(jn),u=jn.dot(Yo),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;const d=1/f,m=(l*c-a*u)*d,g=(o*u-a*c)*d;return r.set(1-m-g,g,m)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,Kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Kn.x),c.addScaledVector(o,Kn.y),c.addScaledVector(a,Kn.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return Jo.setScalar(0),Qo.setScalar(0),ta.setScalar(0),Jo.fromBufferAttribute(t,e),Qo.fromBufferAttribute(t,i),ta.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Jo,r.x),o.addScaledVector(Qo,r.y),o.addScaledVector(ta,r.z),o}static isFrontFacing(t,e,i,s){return Cn.subVectors(i,e),jn.subVectors(t,e),Cn.cross(jn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Cn.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),Cn.cross(jn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ln.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ln.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Ln.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Ln.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ln.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;rs.subVectors(s,i),os.subVectors(r,i),jo.subVectors(t,i);const c=rs.dot(jo),l=os.dot(jo);if(c<=0&&l<=0)return e.copy(i);Ko.subVectors(t,s);const u=rs.dot(Ko),f=os.dot(Ko);if(u>=0&&f<=u)return e.copy(s);const d=c*f-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(i).addScaledVector(rs,o);Zo.subVectors(t,r);const m=rs.dot(Zo),g=os.dot(Zo);if(g>=0&&m<=g)return e.copy(r);const v=m*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(i).addScaledVector(os,a);const _=u*g-m*f;if(_<=0&&f-u>=0&&m-g>=0)return $c.subVectors(r,s),a=(f-u)/(f-u+(m-g)),e.copy(s).addScaledVector($c,a);const h=1/(_+v+d);return o=v*h,a=d*h,e.copy(i).addScaledVector(rs,o).addScaledVector(os,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Tn{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Pn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Pn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Pn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Pn):Pn.fromBufferAttribute(r,o),Pn.applyMatrix4(t.matrixWorld),this.expandByPoint(Pn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Er.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Er.copy(i.boundingBox)),Er.applyMatrix4(t.matrixWorld),this.union(Er)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Pn),Pn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Bs),Tr.subVectors(this.max,Bs),as.subVectors(t.a,Bs),ls.subVectors(t.b,Bs),cs.subVectors(t.c,Bs),gi.subVectors(ls,as),_i.subVectors(cs,ls),Li.subVectors(as,cs);let e=[0,-gi.z,gi.y,0,-_i.z,_i.y,0,-Li.z,Li.y,gi.z,0,-gi.x,_i.z,0,-_i.x,Li.z,0,-Li.x,-gi.y,gi.x,0,-_i.y,_i.x,0,-Li.y,Li.x,0];return!ea(e,as,ls,cs,Tr)||(e=[1,0,0,0,1,0,0,0,1],!ea(e,as,ls,cs,Tr))?!1:(wr.crossVectors(gi,_i),e=[wr.x,wr.y,wr.z],ea(e,as,ls,cs,Tr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Pn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Pn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Zn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Zn=[new U,new U,new U,new U,new U,new U,new U,new U],Pn=new U,Er=new Tn,as=new U,ls=new U,cs=new U,gi=new U,_i=new U,Li=new U,Bs=new U,Tr=new U,wr=new U,Di=new U;function ea(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Di.fromArray(n,r);const a=s.x*Math.abs(Di.x)+s.y*Math.abs(Di.y)+s.z*Math.abs(Di.z),c=t.dot(Di),l=e.dot(Di),u=i.dot(Di);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Be=new U,Ar=new Nt;let ep=0;class xn extends Ci{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ep++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Lc,this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ar.fromBufferAttribute(this,e),Ar.applyMatrix3(t),this.setXY(e,Ar.x,Ar.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix3(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=_s(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=on(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=_s(e,this.array)),e}setX(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=_s(e,this.array)),e}setY(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=_s(e,this.array)),e}setZ(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=_s(e,this.array)),e}setW(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=on(e,this.array),i=on(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=on(e,this.array),i=on(i,this.array),s=on(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=on(e,this.array),i=on(i,this.array),s=on(s,this.array),r=on(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Lc&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class Od extends xn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Fd extends xn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Re extends xn{constructor(t,e,i){super(new Float32Array(t),e,i)}}const np=new Tn,ks=new U,na=new U;class Is{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):np.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ks.subVectors(t,this.center);const e=ks.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(ks,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(na.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ks.copy(t.center).add(na)),this.expandByPoint(ks.copy(t.center).sub(na))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let ip=0;const En=new me,ia=new De,us=new U,mn=new Tn,Gs=new Tn,We=new U;class rn extends Ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ip++}),this.uuid=Ds(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Sf(t)?Fd:Od)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new $t().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return En.makeRotationFromQuaternion(t),this.applyMatrix4(En),this}rotateX(t){return En.makeRotationX(t),this.applyMatrix4(En),this}rotateY(t){return En.makeRotationY(t),this.applyMatrix4(En),this}rotateZ(t){return En.makeRotationZ(t),this.applyMatrix4(En),this}translate(t,e,i){return En.makeTranslation(t,e,i),this.applyMatrix4(En),this}scale(t,e,i){return En.makeScale(t,e,i),this.applyMatrix4(En),this}lookAt(t){return ia.lookAt(t),ia.updateMatrix(),this.applyMatrix4(ia.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Re(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&zt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Tn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){se("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];mn.setFromBufferAttribute(r),this.morphTargetsRelative?(We.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(We),We.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(We)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&se('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Is);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){se("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const i=this.boundingSphere.center;if(mn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Gs.setFromBufferAttribute(a),this.morphTargetsRelative?(We.addVectors(mn.min,Gs.min),mn.expandByPoint(We),We.addVectors(mn.max,Gs.max),mn.expandByPoint(We)):(mn.expandByPoint(Gs.min),mn.expandByPoint(Gs.max))}mn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)We.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(We));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)We.fromBufferAttribute(a,l),c&&(us.fromBufferAttribute(t,l),We.add(us)),s=Math.max(s,i.distanceToSquared(We))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&se('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){se("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let p=0;p<i.count;p++)a[p]=new U,c[p]=new U;const l=new U,u=new U,f=new U,d=new Nt,m=new Nt,g=new Nt,v=new U,_=new U;function h(p,M,T){l.fromBufferAttribute(i,p),u.fromBufferAttribute(i,M),f.fromBufferAttribute(i,T),d.fromBufferAttribute(r,p),m.fromBufferAttribute(r,M),g.fromBufferAttribute(r,T),u.sub(l),f.sub(l),m.sub(d),g.sub(d);const C=1/(m.x*g.y-g.x*m.y);isFinite(C)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(f,-m.y).multiplyScalar(C),_.copy(f).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(C),a[p].add(v),a[M].add(v),a[T].add(v),c[p].add(_),c[M].add(_),c[T].add(_))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let p=0,M=x.length;p<M;++p){const T=x[p],C=T.start,P=T.count;for(let D=C,H=C+P;D<H;D+=3)h(t.getX(D+0),t.getX(D+1),t.getX(D+2))}const S=new U,E=new U,L=new U,A=new U;function w(p){L.fromBufferAttribute(s,p),A.copy(L);const M=a[p];S.copy(M),S.sub(L.multiplyScalar(L.dot(M))).normalize(),E.crossVectors(A,M);const C=E.dot(c[p])<0?-1:1;o.setXYZW(p,S.x,S.y,S.z,C)}for(let p=0,M=x.length;p<M;++p){const T=x[p],C=T.start,P=T.count;for(let D=C,H=C+P;D<H;D+=3)w(t.getX(D+0)),w(t.getX(D+1)),w(t.getX(D+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new xn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);const s=new U,r=new U,o=new U,a=new U,c=new U,l=new U,u=new U,f=new U;if(t)for(let d=0,m=t.count;d<m;d+=3){const g=t.getX(d+0),v=t.getX(d+1),_=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,_),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,_),a.add(u),c.add(u),l.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(_,l.x,l.y,l.z)}else for(let d=0,m=e.count;d<m;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)We.fromBufferAttribute(t,e),We.normalize(),t.setXYZ(e,We.x,We.y,We.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,f=a.normalized,d=new l.constructor(c.length*u);let m=0,g=0;for(let v=0,_=c.length;v<_;v++){a.isInterleavedBufferAttribute?m=c[v]*a.data.stride+a.offset:m=c[v]*u;for(let h=0;h<u;h++)d[g++]=l[m++]}return new xn(d,u,f)}if(this.index===null)return zt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new rn,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,i);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,f=l.length;u<f;u++){const d=l[u],m=t(d,i);c.push(m)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,d=l.length;f<d;f++){const m=l[f];u.push(m.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],f=r[l];for(let d=0,m=f.length;d<m;d++)u.push(f[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let sp=0;class ji extends Ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sp++}),this.uuid=Ds(),this.name="",this.type="Material",this.blending=bs,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Da,this.blendDst=Ia,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ut(0,0,0),this.blendAlpha=0,this.depthFunc=ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ts,this.stencilZFail=ts,this.stencilZPass=ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){zt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){zt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==bs&&(i.blending=this.blending),this.side!==Ai&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Da&&(i.blendSrc=this.blendSrc),this.blendDst!==Ia&&(i.blendDst=this.blendDst),this.blendEquation!==Fi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ys&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ts&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ts&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ts&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Jn=new U,sa=new U,Rr=new U,xi=new U,ra=new U,Cr=new U,oa=new U;class Co{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Jn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Jn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Jn.copy(this.origin).addScaledVector(this.direction,e),Jn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){sa.copy(t).add(e).multiplyScalar(.5),Rr.copy(e).sub(t).normalize(),xi.copy(this.origin).sub(sa);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Rr),a=xi.dot(this.direction),c=-xi.dot(Rr),l=xi.lengthSq(),u=Math.abs(1-o*o);let f,d,m,g;if(u>0)if(f=o*c-a,d=o*a-c,g=r*u,f>=0)if(d>=-g)if(d<=g){const v=1/u;f*=v,d*=v,m=f*(f+o*d+2*a)+d*(o*f+d+2*c)+l}else d=r,f=Math.max(0,-(o*d+a)),m=-f*f+d*(d+2*c)+l;else d=-r,f=Math.max(0,-(o*d+a)),m=-f*f+d*(d+2*c)+l;else d<=-g?(f=Math.max(0,-(-o*r+a)),d=f>0?-r:Math.min(Math.max(-r,-c),r),m=-f*f+d*(d+2*c)+l):d<=g?(f=0,d=Math.min(Math.max(-r,-c),r),m=d*(d+2*c)+l):(f=Math.max(0,-(o*r+a)),d=f>0?r:Math.min(Math.max(-r,-c),r),m=-f*f+d*(d+2*c)+l);else d=o>0?-r:r,f=Math.max(0,-(o*d+a)),m=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(sa).addScaledVector(Rr,d),m}intersectSphere(t,e){Jn.subVectors(t.center,this.origin);const i=Jn.dot(this.direction),s=Jn.dot(Jn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),u>=0?(r=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-d.z)*f,c=(t.max.z-d.z)*f):(a=(t.max.z-d.z)*f,c=(t.min.z-d.z)*f),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Jn)!==null}intersectTriangle(t,e,i,s,r){ra.subVectors(e,t),Cr.subVectors(i,t),oa.crossVectors(ra,Cr);let o=this.direction.dot(oa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;xi.subVectors(this.origin,t);const c=a*this.direction.dot(Cr.crossVectors(xi,Cr));if(c<0)return null;const l=a*this.direction.dot(ra.cross(xi));if(l<0||c+l>o)return null;const u=-a*xi.dot(oa);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $i extends ji{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=Ll,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const qc=new me,Ii=new Co,Pr=new Is,Yc=new U,Lr=new U,Dr=new U,Ir=new U,aa=new U,Nr=new U,jc=new U,Ur=new U;class Xt extends De{constructor(t=new rn,e=new $i){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Nr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],f=r[c];u!==0&&(aa.fromBufferAttribute(f,t),o?Nr.addScaledVector(aa,u):Nr.addScaledVector(aa.sub(e),u))}e.add(Nr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Pr.copy(i.boundingSphere),Pr.applyMatrix4(r),Ii.copy(t.ray).recast(t.near),!(Pr.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Pr,Yc)===null||Ii.origin.distanceToSquared(Yc)>(t.far-t.near)**2))&&(qc.copy(r).invert(),Ii.copy(t.ray).applyMatrix4(qc),!(i.boundingBox!==null&&Ii.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ii)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,d=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const _=d[g],h=o[_.materialIndex],x=Math.max(_.start,m.start),S=Math.min(a.count,Math.min(_.start+_.count,m.start+m.count));for(let E=x,L=S;E<L;E+=3){const A=a.getX(E),w=a.getX(E+1),p=a.getX(E+2);s=Or(this,h,t,i,l,u,f,A,w,p),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=_.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),v=Math.min(a.count,m.start+m.count);for(let _=g,h=v;_<h;_+=3){const x=a.getX(_),S=a.getX(_+1),E=a.getX(_+2);s=Or(this,o,t,i,l,u,f,x,S,E),s&&(s.faceIndex=Math.floor(_/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const _=d[g],h=o[_.materialIndex],x=Math.max(_.start,m.start),S=Math.min(c.count,Math.min(_.start+_.count,m.start+m.count));for(let E=x,L=S;E<L;E+=3){const A=E,w=E+1,p=E+2;s=Or(this,h,t,i,l,u,f,A,w,p),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=_.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),v=Math.min(c.count,m.start+m.count);for(let _=g,h=v;_<h;_+=3){const x=_,S=_+1,E=_+2;s=Or(this,o,t,i,l,u,f,x,S,E),s&&(s.faceIndex=Math.floor(_/3),e.push(s))}}}}function rp(n,t,e,i,s,r,o,a){let c;if(t.side===cn?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===Ai,a),c===null)return null;Ur.copy(a),Ur.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Ur);return l<e.near||l>e.far?null:{distance:l,point:Ur.clone(),object:n}}function Or(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,Lr),n.getVertexPosition(c,Dr),n.getVertexPosition(l,Ir);const u=rp(n,t,e,i,Lr,Dr,Ir,jc);if(u){const f=new U;Ln.getBarycoord(jc,Lr,Dr,Ir,f),s&&(u.uv=Ln.getInterpolatedAttribute(s,a,c,l,f,new Nt)),r&&(u.uv1=Ln.getInterpolatedAttribute(r,a,c,l,f,new Nt)),o&&(u.normal=Ln.getInterpolatedAttribute(o,a,c,l,f,new U),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new U,materialIndex:0};Ln.getNormal(Lr,Dr,Ir,d.normal),u.face=d,u.barycoord=f}return u}class zd extends sn{constructor(t=null,e=1,i=1,s,r,o,a,c,l=Ye,u=Ye,f,d){super(null,o,a,c,l,u,s,r,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Kc extends xn{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ds=new me,Zc=new me,Fr=[],Jc=new Tn,op=new me,Hs=new Xt,Vs=new Is;class Xl extends Xt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Kc(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,op)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Tn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ds),Jc.copy(t.boundingBox).applyMatrix4(ds),this.boundingBox.union(Jc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Is),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ds),Vs.copy(t.boundingSphere).applyMatrix4(ds),this.boundingSphere.union(Vs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=t.previousInstanceMatrix.clone()),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(Hs.geometry=this.geometry,Hs.material=this.material,Hs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vs.copy(this.boundingSphere),Vs.applyMatrix4(i),t.ray.intersectsSphere(Vs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ds),Zc.multiplyMatrices(i,ds),Hs.matrixWorld=Zc,Hs.raycast(t,Fr);for(let o=0,a=Fr.length;o<a;o++){const c=Fr[o];c.instanceId=r,c.object=this,e.push(c)}Fr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Kc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new zd(new Float32Array(s*this.count),s,this.count,Ul,Dn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(i,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const la=new U,ap=new U,lp=new $t;class Qn{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=la.subVectors(i,e).cross(ap.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(la),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||lp.getNormalMatrix(t),s=this.coplanarPoint(la).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ni=new Is,cp=new Nt(.5,.5),zr=new U;class $l{constructor(t=new Qn,e=new Qn,i=new Qn,s=new Qn,r=new Qn,o=new Qn){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Hn,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],f=r[5],d=r[6],m=r[7],g=r[8],v=r[9],_=r[10],h=r[11],x=r[12],S=r[13],E=r[14],L=r[15];if(s[0].setComponents(l-o,m-u,h-g,L-x).normalize(),s[1].setComponents(l+o,m+u,h+g,L+x).normalize(),s[2].setComponents(l+a,m+f,h+v,L+S).normalize(),s[3].setComponents(l-a,m-f,h-v,L-S).normalize(),i)s[4].setComponents(c,d,_,E).normalize(),s[5].setComponents(l-c,m-d,h-_,L-E).normalize();else if(s[4].setComponents(l-c,m-d,h-_,L-E).normalize(),e===Hn)s[5].setComponents(l+c,m+d,h+_,L+E).normalize();else if(e===or)s[5].setComponents(c,d,_,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ni)}intersectsSprite(t){Ni.center.set(0,0,0);const e=cp.distanceTo(t.center);return Ni.radius=.7071067811865476+e,Ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(zr.x=s.normal.x>0?t.max.x:t.min.x,zr.y=s.normal.y>0?t.max.y:t.min.y,zr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(zr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Bd extends ji{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ut(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const xo=new U,vo=new U,Qc=new me,Ws=new Co,Br=new Is,ca=new U,tu=new U;class up extends De{constructor(t=new rn,e=new Bd){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)xo.fromBufferAttribute(e,s-1),vo.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=xo.distanceTo(vo);t.setAttribute("lineDistance",new Re(i,1))}else zt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Br.copy(i.boundingSphere),Br.applyMatrix4(s),Br.radius+=r,t.ray.intersectsSphere(Br)===!1)return;Qc.copy(s).invert(),Ws.copy(t.ray).applyMatrix4(Qc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){const m=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=m,_=g-1;v<_;v+=l){const h=u.getX(v),x=u.getX(v+1),S=kr(this,t,Ws,c,h,x,v);S&&e.push(S)}if(this.isLineLoop){const v=u.getX(g-1),_=u.getX(m),h=kr(this,t,Ws,c,v,_,g-1);h&&e.push(h)}}else{const m=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let v=m,_=g-1;v<_;v+=l){const h=kr(this,t,Ws,c,v,v+1,v);h&&e.push(h)}if(this.isLineLoop){const v=kr(this,t,Ws,c,g-1,m,g-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function kr(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(xo.fromBufferAttribute(a,s),vo.fromBufferAttribute(a,r),e.distanceSqToSegment(xo,vo,ca,tu)>i)return;ca.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ca);if(!(l<t.near||l>t.far))return{distance:l,point:tu.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const eu=new U,nu=new U;class dp extends up{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)eu.fromBufferAttribute(e,s),nu.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+eu.distanceTo(nu);t.setAttribute("lineDistance",new Re(i,1))}else zt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class kd extends sn{constructor(t=[],e=Wi,i,s,r,o,a,c,l,u){super(t,e,i,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Gd extends sn{constructor(t,e,i,s,r,o,a,c,l){super(t,e,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ts extends sn{constructor(t,e,i=Xn,s,r,o,a=Ye,c=Ye,l,u=ai,f=1){if(u!==ai&&u!==ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:f};super(d,s,r,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Hl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class hp extends Ts{constructor(t,e=Xn,i=Wi,s,r,o=Ye,a=Ye,c,l=ai){const u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,i,s,r,o,a,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Hd extends sn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class fe extends rn{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],f=[];let d=0,m=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(u,3)),this.setAttribute("uv",new Re(f,2));function g(v,_,h,x,S,E,L,A,w,p,M){const T=E/w,C=L/p,P=E/2,D=L/2,H=A/2,N=w+1,k=p+1;let B=0,J=0;const ot=new U;for(let pt=0;pt<k;pt++){const wt=pt*C-D;for(let Ct=0;Ct<N;Ct++){const ct=Ct*T-P;ot[v]=ct*x,ot[_]=wt*S,ot[h]=H,l.push(ot.x,ot.y,ot.z),ot[v]=0,ot[_]=0,ot[h]=A>0?1:-1,u.push(ot.x,ot.y,ot.z),f.push(Ct/w),f.push(1-pt/p),B+=1}}for(let pt=0;pt<p;pt++)for(let wt=0;wt<w;wt++){const Ct=d+wt+N*pt,ct=d+wt+N*(pt+1),ft=d+(wt+1)+N*(pt+1),bt=d+(wt+1)+N*pt;c.push(Ct,ct,bt),c.push(ct,ft,bt),J+=6}a.addGroup(m,J,M),m+=J,d+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class ql extends rn{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new U,u=new Nt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,d=3;f<=e;f++,d+=3){const m=i+f/e*s;l.x=t*Math.cos(m),l.y=t*Math.sin(m),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[d]/t+1)/2,u.y=(o[d+1]/t+1)/2,c.push(u.x,u.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Re(o,3)),this.setAttribute("normal",new Re(a,3)),this.setAttribute("uv",new Re(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ql(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class cr extends rn{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],d=[],m=[];let g=0;const v=[],_=i/2;let h=0;x(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new Re(f,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(m,2));function x(){const E=new U,L=new U;let A=0;const w=(e-t)/i;for(let p=0;p<=r;p++){const M=[],T=p/r,C=T*(e-t)+t;for(let P=0;P<=s;P++){const D=P/s,H=D*c+a,N=Math.sin(H),k=Math.cos(H);L.x=C*N,L.y=-T*i+_,L.z=C*k,f.push(L.x,L.y,L.z),E.set(N,w,k).normalize(),d.push(E.x,E.y,E.z),m.push(D,1-T),M.push(g++)}v.push(M)}for(let p=0;p<s;p++)for(let M=0;M<r;M++){const T=v[M][p],C=v[M+1][p],P=v[M+1][p+1],D=v[M][p+1];(t>0||M!==0)&&(u.push(T,C,D),A+=3),(e>0||M!==r-1)&&(u.push(C,P,D),A+=3)}l.addGroup(h,A,0),h+=A}function S(E){const L=g,A=new Nt,w=new U;let p=0;const M=E===!0?t:e,T=E===!0?1:-1;for(let P=1;P<=s;P++)f.push(0,_*T,0),d.push(0,T,0),m.push(.5,.5),g++;const C=g;for(let P=0;P<=s;P++){const H=P/s*c+a,N=Math.cos(H),k=Math.sin(H);w.x=M*k,w.y=_*T,w.z=M*N,f.push(w.x,w.y,w.z),d.push(0,T,0),A.x=N*.5+.5,A.y=k*.5*T+.5,m.push(A.x,A.y),g++}for(let P=0;P<s;P++){const D=L+P,H=C+P;E===!0?u.push(H,H+1,D):u.push(H+1,H,D),p+=3}l.addGroup(h,p,E===!0?1:2),h+=p}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cr(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Yl extends cr{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Yl(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class jl extends rn{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],o=[];a(s),l(i),u(),this.setAttribute("position",new Re(r,3)),this.setAttribute("normal",new Re(r.slice(),3)),this.setAttribute("uv",new Re(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const S=new U,E=new U,L=new U;for(let A=0;A<e.length;A+=3)m(e[A+0],S),m(e[A+1],E),m(e[A+2],L),c(S,E,L,x)}function c(x,S,E,L){const A=L+1,w=[];for(let p=0;p<=A;p++){w[p]=[];const M=x.clone().lerp(E,p/A),T=S.clone().lerp(E,p/A),C=A-p;for(let P=0;P<=C;P++)P===0&&p===A?w[p][P]=M:w[p][P]=M.clone().lerp(T,P/C)}for(let p=0;p<A;p++)for(let M=0;M<2*(A-p)-1;M++){const T=Math.floor(M/2);M%2===0?(d(w[p][T+1]),d(w[p+1][T]),d(w[p][T])):(d(w[p][T+1]),d(w[p+1][T+1]),d(w[p+1][T]))}}function l(x){const S=new U;for(let E=0;E<r.length;E+=3)S.x=r[E+0],S.y=r[E+1],S.z=r[E+2],S.normalize().multiplyScalar(x),r[E+0]=S.x,r[E+1]=S.y,r[E+2]=S.z}function u(){const x=new U;for(let S=0;S<r.length;S+=3){x.x=r[S+0],x.y=r[S+1],x.z=r[S+2];const E=_(x)/2/Math.PI+.5,L=h(x)/Math.PI+.5;o.push(E,1-L)}g(),f()}function f(){for(let x=0;x<o.length;x+=6){const S=o[x+0],E=o[x+2],L=o[x+4],A=Math.max(S,E,L),w=Math.min(S,E,L);A>.9&&w<.1&&(S<.2&&(o[x+0]+=1),E<.2&&(o[x+2]+=1),L<.2&&(o[x+4]+=1))}}function d(x){r.push(x.x,x.y,x.z)}function m(x,S){const E=x*3;S.x=t[E+0],S.y=t[E+1],S.z=t[E+2]}function g(){const x=new U,S=new U,E=new U,L=new U,A=new Nt,w=new Nt,p=new Nt;for(let M=0,T=0;M<r.length;M+=9,T+=6){x.set(r[M+0],r[M+1],r[M+2]),S.set(r[M+3],r[M+4],r[M+5]),E.set(r[M+6],r[M+7],r[M+8]),A.set(o[T+0],o[T+1]),w.set(o[T+2],o[T+3]),p.set(o[T+4],o[T+5]),L.copy(x).add(S).add(E).divideScalar(3);const C=_(L);v(A,T+0,x,C),v(w,T+2,S,C),v(p,T+4,E,C)}}function v(x,S,E,L){L<0&&x.x===1&&(o[S]=x.x-1),E.x===0&&E.z===0&&(o[S]=L/2/Math.PI+.5)}function _(x){return Math.atan2(x.z,-x.x)}function h(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jl(t.vertices,t.indices,t.radius,t.detail)}}class Kl extends jl{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Kl(t.radius,t.detail)}}class ws extends rn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,u=c+1,f=t/a,d=e/c,m=[],g=[],v=[],_=[];for(let h=0;h<u;h++){const x=h*d-o;for(let S=0;S<l;S++){const E=S*f-r;g.push(E,-x,0),v.push(0,0,1),_.push(S/a),_.push(1-h/c)}}for(let h=0;h<c;h++)for(let x=0;x<a;x++){const S=x+l*h,E=x+l*(h+1),L=x+1+l*(h+1),A=x+1+l*h;m.push(S,E,A),m.push(E,L,A)}this.setIndex(m),this.setAttribute("position",new Re(g,3)),this.setAttribute("normal",new Re(v,3)),this.setAttribute("uv",new Re(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ws(t.width,t.height,t.widthSegments,t.heightSegments)}}class As extends rn{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],f=new U,d=new U,m=[],g=[],v=[],_=[];for(let h=0;h<=i;h++){const x=[],S=h/i;let E=0;h===0&&o===0?E=.5/e:h===i&&c===Math.PI&&(E=-.5/e);for(let L=0;L<=e;L++){const A=L/e;f.x=-t*Math.cos(s+A*r)*Math.sin(o+S*a),f.y=t*Math.cos(o+S*a),f.z=t*Math.sin(s+A*r)*Math.sin(o+S*a),g.push(f.x,f.y,f.z),d.copy(f).normalize(),v.push(d.x,d.y,d.z),_.push(A+E,1-S),x.push(l++)}u.push(x)}for(let h=0;h<i;h++)for(let x=0;x<e;x++){const S=u[h][x+1],E=u[h][x],L=u[h+1][x],A=u[h+1][x+1];(h!==0||o>0)&&m.push(S,E,A),(h!==i-1||c<Math.PI)&&m.push(E,L,A)}this.setIndex(m),this.setAttribute("position",new Re(g,3)),this.setAttribute("normal",new Re(v,3)),this.setAttribute("uv",new Re(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new As(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function Rs(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(iu(s))s.isRenderTargetTexture?(zt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(iu(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function an(n){const t={};for(let e=0;e<n.length;e++){const i=Rs(n[e]);for(const s in i)t[s]=i[s]}return t}function iu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function fp(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Vd(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ie.workingColorSpace}const pp={clone:Rs,merge:an};var mp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qn extends ji{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mp,this.fragmentShader=gp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Rs(t.uniforms),this.uniformsGroups=fp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class _p extends qn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ge extends ji{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ut(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=po,this.normalScale=new Nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class xp extends ji{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=po,this.normalScale=new Nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=Ll,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class vp extends ji{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=pf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Mp extends ji{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Zl extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ut(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Wd extends Zl{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ut(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const ua=new me,su=new U,ru=new U;class Xd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Nt(512,512),this.mapType=_n,this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $l,this._frameExtents=new Nt(1,1),this._viewportCount=1,this._viewports=[new Oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;su.setFromMatrixPosition(t.matrixWorld),e.position.copy(su),ru.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ru),e.updateMatrixWorld(),ua.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ua,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===or||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ua)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Gr=new U,Hr=new li,Bn=new U;class $d extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=Hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Gr,Hr,Bn),Bn.x===1&&Bn.y===1&&Bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gr,Hr,Bn.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(Gr,Hr,Bn),Bn.x===1&&Bn.y===1&&Bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gr,Hr,Bn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const vi=new U,ou=new Nt,au=new Nt;class dn extends $d{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ar*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Js*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ar*2*Math.atan(Math.tan(Js*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(vi.x,vi.y).multiplyScalar(-t/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(vi.x,vi.y).multiplyScalar(-t/vi.z)}getViewSize(t,e){return this.getViewBounds(t,ou,au),e.subVectors(au,ou)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Js*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class bp extends Xd{constructor(){super(new dn(90,1,.5,500)),this.isPointLightShadow=!0}}class qd extends Zl{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new bp}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class Jl extends $d{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Sp extends Xd{constructor(){super(new Jl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Yd extends Zl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new Sp}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const hs=-90,fs=1;class yp extends De{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new dn(hs,fs,t,e);s.layers=this.layers,this.add(s);const r=new dn(hs,fs,t,e);r.layers=this.layers,this.add(r);const o=new dn(hs,fs,t,e);o.layers=this.layers,this.add(o);const a=new dn(hs,fs,t,e);a.layers=this.layers,this.add(a);const c=new dn(hs,fs,t,e);c.layers=this.layers,this.add(c);const l=new dn(hs,fs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Hn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===or)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let _=!1;t.isWebGLRenderer===!0?_=t.state.buffers.depth.getReversed():_=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,d,m),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Ep extends dn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const lu=new me;class Ql{constructor(t,e,i=0,s=1/0){this.ray=new Co(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Vl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):se("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return lu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(lu),this}intersectObject(t,e=!0,i=[]){return vl(t,this,i,e),i.sort(cu),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)vl(t[s],this,i,e);return i.sort(cu),i}}function cu(n,t){return n.distance-t.distance}function vl(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)vl(r[o],t,e,!0)}}class jd{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,zt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class Mo{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const vc=class vc{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};vc.prototype.isMatrix2=!0;let uu=vc;class Tp extends Ci{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){zt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function du(n,t,e,i){const s=wp(i);switch(e){case Ld:return n*t;case Ul:return n*t/s.components*s.byteLength;case Ol:return n*t/s.components*s.byteLength;case Xi:return n*t*2/s.components*s.byteLength;case Fl:return n*t*2/s.components*s.byteLength;case Dd:return n*t*3/s.components*s.byteLength;case In:return n*t*4/s.components*s.byteLength;case zl:return n*t*4/s.components*s.byteLength;case io:case so:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ro:case oo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Va:case Xa:return Math.max(n,16)*Math.max(t,8)/4;case Ha:case Wa:return Math.max(n,8)*Math.max(t,8)/2;case $a:case qa:case ja:case Ka:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ya:case ho:case Za:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ja:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Qa:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case tl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case el:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case nl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case il:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case sl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case rl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case ol:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case al:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ll:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case cl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case ul:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case dl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case hl:case fl:case pl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case ml:case gl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case fo:case _l:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function wp(n){switch(n){case _n:case Ad:return{byteLength:1,components:1};case sr:case Rd:case oi:return{byteLength:2,components:1};case Il:case Nl:return{byteLength:2,components:4};case Xn:case Dl:case Dn:return{byteLength:4,components:1};case Cd:case Pd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pl}}));typeof window<"u"&&(window.__THREE__?zt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pl);function Kd(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Ap(n){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,f=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,u),a.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,c,l){const u=c.array,f=c.updateRanges;if(n.bindBuffer(l,a),f.length===0)n.bufferSubData(l,0,u);else{f.sort((m,g)=>m.start-g.start);let d=0;for(let m=1;m<f.length;m++){const g=f[d],v=f[m];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,f[d]=v)}f.length=d+1;for(let m=0,g=f.length;m<g;m++){const v=f[m];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Rp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cp=`#ifdef USE_ALPHAHASH
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
#endif`,Pp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ip=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Np=`#ifdef USE_AOMAP
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
#endif`,Up=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Op=`#ifdef USE_BATCHING
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
#endif`,Fp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gp=`#ifdef USE_IRIDESCENCE
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
#endif`,Hp=`#ifdef USE_BUMPMAP
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
#endif`,Vp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$p=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,jp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Zp=`#define PI 3.141592653589793
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
} // validated`,Jp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Qp=`vec3 transformedNormal = objectNormal;
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
#endif`,tm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,em=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,im=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sm="gl_FragColor = linearToOutputTexel( gl_FragColor );",rm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,om=`#ifdef USE_ENVMAP
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
#endif`,am=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,lm=`#ifdef USE_ENVMAP
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
#endif`,cm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,um=`#ifdef USE_ENVMAP
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
#endif`,dm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mm=`#ifdef USE_GRADIENTMAP
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
}`,gm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_m=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Mm=`#ifdef USE_ENVMAP
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
#endif`,bm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ym=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Em=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tm=`PhysicalMaterial material;
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
#endif`,wm=`uniform sampler2D dfgLUT;
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
}`,Am=`
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
#endif`,Rm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Cm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Pm=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Lm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Dm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Im=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Um=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Om=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Fm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zm=`#if defined( USE_POINTS_UV )
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
#endif`,Bm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,km=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wm=`#ifdef USE_MORPHTARGETS
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
#endif`,Xm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$m=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,qm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ym=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Km=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Zm=`#ifdef USE_NORMALMAP
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
#endif`,Jm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,t0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,e0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,n0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,i0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,s0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,r0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,o0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,a0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,l0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,c0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,u0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,d0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,h0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,f0=`float getShadowMask() {
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
}`,p0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,m0=`#ifdef USE_SKINNING
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
#endif`,g0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_0=`#ifdef USE_SKINNING
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
#endif`,x0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,v0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,M0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,b0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,S0=`#ifdef USE_TRANSMISSION
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
#endif`,y0=`#ifdef USE_TRANSMISSION
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
#endif`,E0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,T0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,w0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,A0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const R0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,C0=`uniform sampler2D t2D;
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
}`,P0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,L0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,D0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,I0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N0=`#include <common>
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
}`,U0=`#if DEPTH_PACKING == 3200
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
}`,O0=`#define DISTANCE
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
}`,F0=`#define DISTANCE
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
}`,z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,B0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,k0=`uniform float scale;
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
}`,G0=`uniform vec3 diffuse;
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
}`,H0=`#include <common>
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
}`,V0=`uniform vec3 diffuse;
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
}`,W0=`#define LAMBERT
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
}`,X0=`#define LAMBERT
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
}`,$0=`#define MATCAP
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
}`,q0=`#define MATCAP
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
}`,Y0=`#define NORMAL
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
}`,j0=`#define NORMAL
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
}`,K0=`#define PHONG
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
}`,Z0=`#define PHONG
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
}`,J0=`#define STANDARD
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
}`,Q0=`#define STANDARD
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
}`,tg=`#define TOON
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
}`,eg=`#define TOON
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
}`,ng=`uniform float size;
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
}`,ig=`uniform vec3 diffuse;
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
}`,sg=`#include <common>
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
}`,rg=`uniform vec3 color;
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
}`,og=`uniform float rotation;
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
}`,ag=`uniform vec3 diffuse;
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
}`,Yt={alphahash_fragment:Rp,alphahash_pars_fragment:Cp,alphamap_fragment:Pp,alphamap_pars_fragment:Lp,alphatest_fragment:Dp,alphatest_pars_fragment:Ip,aomap_fragment:Np,aomap_pars_fragment:Up,batching_pars_vertex:Op,batching_vertex:Fp,begin_vertex:zp,beginnormal_vertex:Bp,bsdfs:kp,iridescence_fragment:Gp,bumpmap_pars_fragment:Hp,clipping_planes_fragment:Vp,clipping_planes_pars_fragment:Wp,clipping_planes_pars_vertex:Xp,clipping_planes_vertex:$p,color_fragment:qp,color_pars_fragment:Yp,color_pars_vertex:jp,color_vertex:Kp,common:Zp,cube_uv_reflection_fragment:Jp,defaultnormal_vertex:Qp,displacementmap_pars_vertex:tm,displacementmap_vertex:em,emissivemap_fragment:nm,emissivemap_pars_fragment:im,colorspace_fragment:sm,colorspace_pars_fragment:rm,envmap_fragment:om,envmap_common_pars_fragment:am,envmap_pars_fragment:lm,envmap_pars_vertex:cm,envmap_physical_pars_fragment:Mm,envmap_vertex:um,fog_vertex:dm,fog_pars_vertex:hm,fog_fragment:fm,fog_pars_fragment:pm,gradientmap_pars_fragment:mm,lightmap_pars_fragment:gm,lights_lambert_fragment:_m,lights_lambert_pars_fragment:xm,lights_pars_begin:vm,lights_toon_fragment:bm,lights_toon_pars_fragment:Sm,lights_phong_fragment:ym,lights_phong_pars_fragment:Em,lights_physical_fragment:Tm,lights_physical_pars_fragment:wm,lights_fragment_begin:Am,lights_fragment_maps:Rm,lights_fragment_end:Cm,lightprobes_pars_fragment:Pm,logdepthbuf_fragment:Lm,logdepthbuf_pars_fragment:Dm,logdepthbuf_pars_vertex:Im,logdepthbuf_vertex:Nm,map_fragment:Um,map_pars_fragment:Om,map_particle_fragment:Fm,map_particle_pars_fragment:zm,metalnessmap_fragment:Bm,metalnessmap_pars_fragment:km,morphinstance_vertex:Gm,morphcolor_vertex:Hm,morphnormal_vertex:Vm,morphtarget_pars_vertex:Wm,morphtarget_vertex:Xm,normal_fragment_begin:$m,normal_fragment_maps:qm,normal_pars_fragment:Ym,normal_pars_vertex:jm,normal_vertex:Km,normalmap_pars_fragment:Zm,clearcoat_normal_fragment_begin:Jm,clearcoat_normal_fragment_maps:Qm,clearcoat_pars_fragment:t0,iridescence_pars_fragment:e0,opaque_fragment:n0,packing:i0,premultiplied_alpha_fragment:s0,project_vertex:r0,dithering_fragment:o0,dithering_pars_fragment:a0,roughnessmap_fragment:l0,roughnessmap_pars_fragment:c0,shadowmap_pars_fragment:u0,shadowmap_pars_vertex:d0,shadowmap_vertex:h0,shadowmask_pars_fragment:f0,skinbase_vertex:p0,skinning_pars_vertex:m0,skinning_vertex:g0,skinnormal_vertex:_0,specularmap_fragment:x0,specularmap_pars_fragment:v0,tonemapping_fragment:M0,tonemapping_pars_fragment:b0,transmission_fragment:S0,transmission_pars_fragment:y0,uv_pars_fragment:E0,uv_pars_vertex:T0,uv_vertex:w0,worldpos_vertex:A0,background_vert:R0,background_frag:C0,backgroundCube_vert:P0,backgroundCube_frag:L0,cube_vert:D0,cube_frag:I0,depth_vert:N0,depth_frag:U0,distance_vert:O0,distance_frag:F0,equirect_vert:z0,equirect_frag:B0,linedashed_vert:k0,linedashed_frag:G0,meshbasic_vert:H0,meshbasic_frag:V0,meshlambert_vert:W0,meshlambert_frag:X0,meshmatcap_vert:$0,meshmatcap_frag:q0,meshnormal_vert:Y0,meshnormal_frag:j0,meshphong_vert:K0,meshphong_frag:Z0,meshphysical_vert:J0,meshphysical_frag:Q0,meshtoon_vert:tg,meshtoon_frag:eg,points_vert:ng,points_frag:ig,shadow_vert:sg,shadow_frag:rg,sprite_vert:og,sprite_frag:ag},yt={common:{diffuse:{value:new Ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new Nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new Ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new Ut(16777215)},opacity:{value:1},center:{value:new Nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},Gn={basic:{uniforms:an([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:an([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Ut(0)},envMapIntensity:{value:1}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:an([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Ut(0)},specular:{value:new Ut(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:an([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new Ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:an([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new Ut(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:an([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:an([yt.points,yt.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:an([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:an([yt.common,yt.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:an([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:an([yt.sprite,yt.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distance:{uniforms:an([yt.common,yt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distance_vert,fragmentShader:Yt.distance_frag},shadow:{uniforms:an([yt.lights,yt.fog,{color:{value:new Ut(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};Gn.physical={uniforms:an([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new Nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new Ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new Nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new Ut(0)},specularColor:{value:new Ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new Nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const Vr={r:0,b:0,g:0},lg=new me,Zd=new $t;Zd.set(-1,0,0,0,1,0,0,0,1);function cg(n,t,e,i,s,r){const o=new Ut(0);let a=s===!0?0:1,c,l,u=null,f=0,d=null;function m(x){let S=x.isScene===!0?x.background:null;if(S&&S.isTexture){const E=x.backgroundBlurriness>0;S=t.get(S,E)}return S}function g(x){let S=!1;const E=m(x);E===null?_(o,a):E&&E.isColor&&(_(E,1),S=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?e.buffers.color.setClear(0,0,0,1,r):L==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||S)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(x,S){const E=m(S);E&&(E.isCubeTexture||E.mapping===Ao)?(l===void 0&&(l=new Xt(new fe(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:Rs(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(L,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=E,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(lg.makeRotationFromEuler(S.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Zd),l.material.toneMapped=ie.getTransfer(E.colorSpace)!==he,(u!==E||f!==E.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=E,f=E.version,d=n.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Xt(new ws(2,2),new qn({name:"BackgroundMaterial",uniforms:Rs(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=ie.getTransfer(E.colorSpace)!==he,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||f!==E.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=E,f=E.version,d=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function _(x,S){x.getRGB(Vr,Vd(n)),e.buffers.color.setClear(Vr.r,Vr.g,Vr.b,S,r)}function h(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,S=1){o.set(x),a=S,_(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(x){a=x,_(o,a)},render:g,addToRenderList:v,dispose:h}}function ug(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,o=!1;function a(C,P,D,H,N){let k=!1;const B=f(C,H,D,P);r!==B&&(r=B,l(r.object)),k=m(C,H,D,N),k&&g(C,H,D,N),N!==null&&t.update(N,n.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,E(C,P,D,H),N!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function c(){return n.createVertexArray()}function l(C){return n.bindVertexArray(C)}function u(C){return n.deleteVertexArray(C)}function f(C,P,D,H){const N=H.wireframe===!0;let k=i[P.id];k===void 0&&(k={},i[P.id]=k);const B=C.isInstancedMesh===!0?C.id:0;let J=k[B];J===void 0&&(J={},k[B]=J);let ot=J[D.id];ot===void 0&&(ot={},J[D.id]=ot);let pt=ot[N];return pt===void 0&&(pt=d(c()),ot[N]=pt),pt}function d(C){const P=[],D=[],H=[];for(let N=0;N<e;N++)P[N]=0,D[N]=0,H[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:D,attributeDivisors:H,object:C,attributes:{},index:null}}function m(C,P,D,H){const N=r.attributes,k=P.attributes;let B=0;const J=D.getAttributes();for(const ot in J)if(J[ot].location>=0){const wt=N[ot];let Ct=k[ot];if(Ct===void 0&&(ot==="instanceMatrix"&&C.instanceMatrix&&(Ct=C.instanceMatrix),ot==="instanceColor"&&C.instanceColor&&(Ct=C.instanceColor)),wt===void 0||wt.attribute!==Ct||Ct&&wt.data!==Ct.data)return!0;B++}return r.attributesNum!==B||r.index!==H}function g(C,P,D,H){const N={},k=P.attributes;let B=0;const J=D.getAttributes();for(const ot in J)if(J[ot].location>=0){let wt=k[ot];wt===void 0&&(ot==="instanceMatrix"&&C.instanceMatrix&&(wt=C.instanceMatrix),ot==="instanceColor"&&C.instanceColor&&(wt=C.instanceColor));const Ct={};Ct.attribute=wt,wt&&wt.data&&(Ct.data=wt.data),N[ot]=Ct,B++}r.attributes=N,r.attributesNum=B,r.index=H}function v(){const C=r.newAttributes;for(let P=0,D=C.length;P<D;P++)C[P]=0}function _(C){h(C,0)}function h(C,P){const D=r.newAttributes,H=r.enabledAttributes,N=r.attributeDivisors;D[C]=1,H[C]===0&&(n.enableVertexAttribArray(C),H[C]=1),N[C]!==P&&(n.vertexAttribDivisor(C,P),N[C]=P)}function x(){const C=r.newAttributes,P=r.enabledAttributes;for(let D=0,H=P.length;D<H;D++)P[D]!==C[D]&&(n.disableVertexAttribArray(D),P[D]=0)}function S(C,P,D,H,N,k,B){B===!0?n.vertexAttribIPointer(C,P,D,N,k):n.vertexAttribPointer(C,P,D,H,N,k)}function E(C,P,D,H){v();const N=H.attributes,k=D.getAttributes(),B=P.defaultAttributeValues;for(const J in k){const ot=k[J];if(ot.location>=0){let pt=N[J];if(pt===void 0&&(J==="instanceMatrix"&&C.instanceMatrix&&(pt=C.instanceMatrix),J==="instanceColor"&&C.instanceColor&&(pt=C.instanceColor)),pt!==void 0){const wt=pt.normalized,Ct=pt.itemSize,ct=t.get(pt);if(ct===void 0)continue;const ft=ct.buffer,bt=ct.type,Q=ct.bytesPerElement,St=bt===n.INT||bt===n.UNSIGNED_INT||pt.gpuType===Dl;if(pt.isInterleavedBufferAttribute){const ht=pt.data,Bt=ht.stride,Wt=pt.offset;if(ht.isInstancedInterleavedBuffer){for(let kt=0;kt<ot.locationSize;kt++)h(ot.location+kt,ht.meshPerAttribute);C.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let kt=0;kt<ot.locationSize;kt++)_(ot.location+kt);n.bindBuffer(n.ARRAY_BUFFER,ft);for(let kt=0;kt<ot.locationSize;kt++)S(ot.location+kt,Ct/ot.locationSize,bt,wt,Bt*Q,(Wt+Ct/ot.locationSize*kt)*Q,St)}else{if(pt.isInstancedBufferAttribute){for(let ht=0;ht<ot.locationSize;ht++)h(ot.location+ht,pt.meshPerAttribute);C.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let ht=0;ht<ot.locationSize;ht++)_(ot.location+ht);n.bindBuffer(n.ARRAY_BUFFER,ft);for(let ht=0;ht<ot.locationSize;ht++)S(ot.location+ht,Ct/ot.locationSize,bt,wt,Ct*Q,Ct/ot.locationSize*ht*Q,St)}}else if(B!==void 0){const wt=B[J];if(wt!==void 0)switch(wt.length){case 2:n.vertexAttrib2fv(ot.location,wt);break;case 3:n.vertexAttrib3fv(ot.location,wt);break;case 4:n.vertexAttrib4fv(ot.location,wt);break;default:n.vertexAttrib1fv(ot.location,wt)}}}}x()}function L(){M();for(const C in i){const P=i[C];for(const D in P){const H=P[D];for(const N in H){const k=H[N];for(const B in k)u(k[B].object),delete k[B];delete H[N]}}delete i[C]}}function A(C){if(i[C.id]===void 0)return;const P=i[C.id];for(const D in P){const H=P[D];for(const N in H){const k=H[N];for(const B in k)u(k[B].object),delete k[B];delete H[N]}}delete i[C.id]}function w(C){for(const P in i){const D=i[P];for(const H in D){const N=D[H];if(N[C.id]===void 0)continue;const k=N[C.id];for(const B in k)u(k[B].object),delete k[B];delete N[C.id]}}}function p(C){for(const P in i){const D=i[P],H=C.isInstancedMesh===!0?C.id:0,N=D[H];if(N!==void 0){for(const k in N){const B=N[k];for(const J in B)u(B[J].object),delete B[J];delete N[k]}delete D[H],Object.keys(D).length===0&&delete i[P]}}}function M(){T(),o=!0,r!==s&&(r=s,l(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:M,resetDefaultState:T,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfObject:p,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:_,disableUnusedAttributes:x}}function dg(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function o(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),e.update(l,i,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let d=0;for(let m=0;m<u;m++)d+=l[m];e.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function hg(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==In&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const p=w===oi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==_n&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Dn&&!p)}function c(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(zt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&d===!1&&zt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:m,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:_,maxAttributes:h,maxVertexUniforms:x,maxVaryings:S,maxFragmentUniforms:E,maxSamples:L,samples:A}}function fg(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new Qn,a=new $t,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const m=f.length!==0||d||i!==0||s;return s=d,i=f.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){e=u(f,d,0)},this.setState=function(f,d,m){const g=f.clippingPlanes,v=f.clipIntersection,_=f.clipShadows,h=n.get(f);if(!s||g===null||g.length===0||r&&!_)r?u(null):l();else{const x=r?0:i,S=x*4;let E=h.clippingState||null;c.value=E,E=u(g,d,S,m);for(let L=0;L!==S;++L)E[L]=e[L];h.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,d,m,g){const v=f!==null?f.length:0;let _=null;if(v!==0){if(_=c.value,g!==!0||_===null){const h=m+v*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(_===null||_.length<h)&&(_=new Float32Array(h));for(let S=0,E=m;S!==v;++S,E+=4)o.copy(f[S]).applyMatrix4(x,a),o.normal.toArray(_,E),_[E+3]=o.constant}c.value=_,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,_}}const Ti=4,hu=[.125,.215,.35,.446,.526,.582],zi=20,pg=256,Xs=new Jl,fu=new Ut;let da=null,ha=0,fa=0,pa=!1;const mg=new U;class Ml{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=mg}=r;da=this._renderer.getRenderTarget(),ha=this._renderer.getActiveCubeFace(),fa=this._renderer.getActiveMipmapLevel(),pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(da,ha,fa),this._renderer.xr.enabled=pa,t.scissorTest=!1,ps(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Wi||t.mapping===Es?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),da=this._renderer.getRenderTarget(),ha=this._renderer.getActiveCubeFace(),fa=this._renderer.getActiveMipmapLevel(),pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:en,minFilter:en,generateMipmaps:!1,type:oi,format:In,colorSpace:mo,depthBuffer:!1},s=pu(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pu(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=gg(r)),this._blurMaterial=xg(r,t,e),this._ggxMaterial=_g(r,t,e)}return s}_compileMaterial(t){const e=new Xt(new rn,t);this._renderer.compile(e,Xs)}_sceneToCubeUV(t,e,i,s,r){const c=new dn(90,1,e,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,m=f.toneMapping;f.getClearColor(fu),f.toneMapping=Vn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Xt(new fe,new $i({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,_=v.material;let h=!1;const x=t.background;x?x.isColor&&(_.color.copy(x),t.background=null,h=!0):(_.color.copy(fu),h=!0);for(let S=0;S<6;S++){const E=S%3;E===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[S],r.y,r.z)):E===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[S]));const L=this._cubeSize;ps(s,E*L,S>2?L:0,L,L),f.setRenderTarget(s),h&&f.render(v,c),f.render(t,c)}f.toneMapping=m,f.autoClear=d,t.background=x}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Wi||t.mapping===Es;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=gu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;ps(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,Xs)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const c=o.uniforms,l=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),d=0+l*1.25,m=f*d,{_lodMax:g}=this,v=this._sizeLods[i],_=3*v*(i>g-Ti?i-g+Ti:0),h=4*(this._cubeSize-v);c.envMap.value=t.texture,c.roughness.value=m,c.mipInt.value=g-e,ps(r,_,h,3*v,2*v),s.setRenderTarget(r),s.render(a,Xs),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-i,ps(t,_,h,3*v,2*v),s.setRenderTarget(t),s.render(a,Xs)}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&se("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=l;const d=l.uniforms,m=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*zi-1),v=r/g,_=isFinite(r)?1+Math.floor(u*v):zi;_>zi&&zt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${zi}`);const h=[];let x=0;for(let w=0;w<zi;++w){const p=w/v,M=Math.exp(-p*p/2);h.push(M),w===0?x+=M:w<_&&(x+=2*M)}for(let w=0;w<h.length;w++)h[w]=h[w]/x;d.envMap.value=t.texture,d.samples.value=_,d.weights.value=h,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-i;const E=this._sizeLods[s],L=3*E*(s>S-Ti?s-S+Ti:0),A=4*(this._cubeSize-E);ps(e,L,A,3*E,2*E),c.setRenderTarget(e),c.render(f,Xs)}}function gg(n){const t=[],e=[],i=[];let s=n;const r=n-Ti+1+hu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>n-Ti?c=hu[o-n+Ti-1]:o===0&&(c=0),e.push(c);const l=1/(a-2),u=-l,f=1+l,d=[u,u,f,u,f,f,u,u,f,f,u,f],m=6,g=6,v=3,_=2,h=1,x=new Float32Array(v*g*m),S=new Float32Array(_*g*m),E=new Float32Array(h*g*m);for(let A=0;A<m;A++){const w=A%3*2/3-1,p=A>2?0:-1,M=[w,p,0,w+2/3,p,0,w+2/3,p+1,0,w,p,0,w+2/3,p+1,0,w,p+1,0];x.set(M,v*g*A),S.set(d,_*g*A);const T=[A,A,A,A,A,A];E.set(T,h*g*A)}const L=new rn;L.setAttribute("position",new xn(x,v)),L.setAttribute("uv",new xn(S,_)),L.setAttribute("faceIndex",new xn(E,h)),i.push(new Xt(L,null)),s>Ti&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function pu(n,t,e){const i=new Wn(n,t,e);return i.texture.mapping=Ao,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ps(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function _g(n,t,e){return new qn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:pg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Po(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function xg(n,t,e){const i=new Float32Array(zi),s=new U(0,1,0);return new qn({name:"SphericalGaussianBlur",defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Po(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function mu(){return new qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Po(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function gu(){return new qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Po(){return`

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
	`}class Jd extends Wn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new kd(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new fe(5,5,5),r=new qn({name:"CubemapFromEquirect",uniforms:Rs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:cn,blending:ni});r.uniforms.tEquirect.value=e;const o=new Xt(s,r),a=e.minFilter;return e.minFilter===Bi&&(e.minFilter=en),new yp(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}function vg(n){let t=new WeakMap,e=new WeakMap,i=null;function s(d,m=!1){return d==null?null:m?o(d):r(d)}function r(d){if(d&&d.isTexture){const m=d.mapping;if(m===zo||m===Bo)if(t.has(d)){const g=t.get(d).texture;return a(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const v=new Jd(g.height);return v.fromEquirectangularTexture(n,d),t.set(d,v),d.addEventListener("dispose",l),a(v.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const m=d.mapping,g=m===zo||m===Bo,v=m===Wi||m===Es;if(g||v){let _=e.get(d);const h=_!==void 0?_.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==h)return i===null&&(i=new Ml(n)),_=g?i.fromEquirectangular(d,_):i.fromCubemap(d,_),_.texture.pmremVersion=d.pmremVersion,e.set(d,_),_.texture;if(_!==void 0)return _.texture;{const x=d.image;return g&&x&&x.height>0||v&&x&&c(x)?(i===null&&(i=new Ml(n)),_=g?i.fromEquirectangular(d):i.fromCubemap(d),_.texture.pmremVersion=d.pmremVersion,e.set(d,_),d.addEventListener("dispose",u),_.texture):null}}}return d}function a(d,m){return m===zo?d.mapping=Wi:m===Bo&&(d.mapping=Es),d}function c(d){let m=0;const g=6;for(let v=0;v<g;v++)d[v]!==void 0&&m++;return m===g}function l(d){const m=d.target;m.removeEventListener("dispose",l);const g=t.get(m);g!==void 0&&(t.delete(m),g.dispose())}function u(d){const m=d.target;m.removeEventListener("dispose",u);const g=e.get(m);g!==void 0&&(e.delete(m),g.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function Mg(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&xl("WebGLRenderer: "+i+" extension not supported."),s}}}function bg(n,t,e,i){const s={},r=new WeakMap;function o(f){const d=f.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];const m=r.get(d);m&&(t.remove(m),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(f,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(f){const d=f.attributes;for(const m in d)t.update(d[m],n.ARRAY_BUFFER)}function l(f){const d=[],m=f.index,g=f.attributes.position;let v=0;if(g===void 0)return;if(m!==null){const x=m.array;v=m.version;for(let S=0,E=x.length;S<E;S+=3){const L=x[S+0],A=x[S+1],w=x[S+2];d.push(L,A,A,w,w,L)}}else{const x=g.array;v=g.version;for(let S=0,E=x.length/3-1;S<E;S+=3){const L=S+0,A=S+1,w=S+2;d.push(L,A,A,w,w,L)}}const _=new(g.count>=65535?Fd:Od)(d,1);_.version=v;const h=r.get(f);h&&t.remove(h),r.set(f,_)}function u(f){const d=r.get(f);if(d){const m=f.index;m!==null&&d.version<m.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function Sg(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){n.drawElements(i,d,r,f*o),e.update(d,i,1)}function l(f,d,m){m!==0&&(n.drawElementsInstanced(i,d,r,f*o,m),e.update(d,i,m))}function u(f,d,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,m);let v=0;for(let _=0;_<m;_++)v+=d[_];e.update(v,i,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function yg(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:se("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Eg(n,t,e){const i=new WeakMap,s=new Oe;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(a);if(d===void 0||d.count!==f){let T=function(){p.dispose(),i.delete(a),a.removeEventListener("dispose",T)};var m=T;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let E=0;g===!0&&(E=1),v===!0&&(E=2),_===!0&&(E=3);let L=a.attributes.position.count*E,A=1;L>t.maxTextureSize&&(A=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const w=new Float32Array(L*A*4*f),p=new Nd(w,L,A,f);p.type=Dn,p.needsUpdate=!0;const M=E*4;for(let C=0;C<f;C++){const P=h[C],D=x[C],H=S[C],N=L*A*4*C;for(let k=0;k<P.count;k++){const B=k*M;g===!0&&(s.fromBufferAttribute(P,k),w[N+B+0]=s.x,w[N+B+1]=s.y,w[N+B+2]=s.z,w[N+B+3]=0),v===!0&&(s.fromBufferAttribute(D,k),w[N+B+4]=s.x,w[N+B+5]=s.y,w[N+B+6]=s.z,w[N+B+7]=0),_===!0&&(s.fromBufferAttribute(H,k),w[N+B+8]=s.x,w[N+B+9]=s.y,w[N+B+10]=s.z,w[N+B+11]=H.itemSize===4?s.w:1)}}d={count:f,texture:p,size:new Nt(L,A)},i.set(a,d),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let _=0;_<l.length;_++)g+=l[_];const v=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",v),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function Tg(n,t,e,i,s){let r=new WeakMap;function o(l){const u=s.render.frame,f=l.geometry,d=t.get(l,f);if(r.get(d)!==u&&(t.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const m=l.skeleton;r.get(m)!==u&&(m.update(),r.set(m,u))}return d}function a(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}const wg={[Md]:"LINEAR_TONE_MAPPING",[bd]:"REINHARD_TONE_MAPPING",[Sd]:"CINEON_TONE_MAPPING",[yd]:"ACES_FILMIC_TONE_MAPPING",[Td]:"AGX_TONE_MAPPING",[wo]:"NEUTRAL_TONE_MAPPING",[Ed]:"CUSTOM_TONE_MAPPING"};function Ag(n,t,e,i,s){const r=new Wn(t,e,{type:n,depthBuffer:i,stencilBuffer:s,depthTexture:i?new Ts(t,e):void 0}),o=new Wn(t,e,{type:oi,depthBuffer:!1,stencilBuffer:!1}),a=new rn;a.setAttribute("position",new Re([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Re([0,2,0,0,2,0],2));const c=new _p({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new Xt(a,c),u=new Jl(-1,1,1,-1,0,1);let f=null,d=null,m=!1,g,v=null,_=[],h=!1;this.setSize=function(x,S){r.setSize(x,S),o.setSize(x,S);for(let E=0;E<_.length;E++){const L=_[E];L.setSize&&L.setSize(x,S)}},this.setEffects=function(x){_=x,h=_.length>0&&_[0].isRenderPass===!0;const S=r.width,E=r.height;for(let L=0;L<_.length;L++){const A=_[L];A.setSize&&A.setSize(S,E)}},this.begin=function(x,S){if(m||x.toneMapping===Vn&&_.length===0)return!1;if(v=S,S!==null){const E=S.width,L=S.height;(r.width!==E||r.height!==L)&&this.setSize(E,L)}return h===!1&&x.setRenderTarget(r),g=x.toneMapping,x.toneMapping=Vn,!0},this.hasRenderPass=function(){return h},this.end=function(x,S){x.toneMapping=g,m=!0;let E=r,L=o;for(let A=0;A<_.length;A++){const w=_[A];if(w.enabled!==!1&&(w.render(x,L,E,S),w.needsSwap!==!1)){const p=E;E=L,L=p}}if(f!==x.outputColorSpace||d!==x.toneMapping){f=x.outputColorSpace,d=x.toneMapping,c.defines={},ie.getTransfer(f)===he&&(c.defines.SRGB_TRANSFER="");const A=wg[d];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=E.texture,x.setRenderTarget(v),x.render(l,u),v=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),a.dispose(),c.dispose()}}const Qd=new sn,bl=new Ts(1,1),th=new Nd,eh=new qf,nh=new kd,_u=[],xu=[],vu=new Float32Array(16),Mu=new Float32Array(9),bu=new Float32Array(4);function Ns(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=_u[s];if(r===void 0&&(r=new Float32Array(s),_u[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function He(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ve(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Lo(n,t){let e=xu[t];e===void 0&&(e=new Int32Array(t),xu[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Rg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Cg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;n.uniform2fv(this.addr,t),Ve(e,t)}}function Pg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;n.uniform3fv(this.addr,t),Ve(e,t)}}function Lg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;n.uniform4fv(this.addr,t),Ve(e,t)}}function Dg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,i))return;bu.set(i),n.uniformMatrix2fv(this.addr,!1,bu),Ve(e,i)}}function Ig(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,i))return;Mu.set(i),n.uniformMatrix3fv(this.addr,!1,Mu),Ve(e,i)}}function Ng(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,i))return;vu.set(i),n.uniformMatrix4fv(this.addr,!1,vu),Ve(e,i)}}function Ug(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Og(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;n.uniform2iv(this.addr,t),Ve(e,t)}}function Fg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;n.uniform3iv(this.addr,t),Ve(e,t)}}function zg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;n.uniform4iv(this.addr,t),Ve(e,t)}}function Bg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function kg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;n.uniform2uiv(this.addr,t),Ve(e,t)}}function Gg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;n.uniform3uiv(this.addr,t),Ve(e,t)}}function Hg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;n.uniform4uiv(this.addr,t),Ve(e,t)}}function Vg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(bl.compareFunction=e.isReversedDepthBuffer()?kl:Bl,r=bl):r=Qd,e.setTexture2D(t||r,s)}function Wg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||eh,s)}function Xg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||nh,s)}function $g(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||th,s)}function qg(n){switch(n){case 5126:return Rg;case 35664:return Cg;case 35665:return Pg;case 35666:return Lg;case 35674:return Dg;case 35675:return Ig;case 35676:return Ng;case 5124:case 35670:return Ug;case 35667:case 35671:return Og;case 35668:case 35672:return Fg;case 35669:case 35673:return zg;case 5125:return Bg;case 36294:return kg;case 36295:return Gg;case 36296:return Hg;case 35678:case 36198:case 36298:case 36306:case 35682:return Vg;case 35679:case 36299:case 36307:return Wg;case 35680:case 36300:case 36308:case 36293:return Xg;case 36289:case 36303:case 36311:case 36292:return $g}}function Yg(n,t){n.uniform1fv(this.addr,t)}function jg(n,t){const e=Ns(t,this.size,2);n.uniform2fv(this.addr,e)}function Kg(n,t){const e=Ns(t,this.size,3);n.uniform3fv(this.addr,e)}function Zg(n,t){const e=Ns(t,this.size,4);n.uniform4fv(this.addr,e)}function Jg(n,t){const e=Ns(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Qg(n,t){const e=Ns(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function t_(n,t){const e=Ns(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function e_(n,t){n.uniform1iv(this.addr,t)}function n_(n,t){n.uniform2iv(this.addr,t)}function i_(n,t){n.uniform3iv(this.addr,t)}function s_(n,t){n.uniform4iv(this.addr,t)}function r_(n,t){n.uniform1uiv(this.addr,t)}function o_(n,t){n.uniform2uiv(this.addr,t)}function a_(n,t){n.uniform3uiv(this.addr,t)}function l_(n,t){n.uniform4uiv(this.addr,t)}function c_(n,t,e){const i=this.cache,s=t.length,r=Lo(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=bl:o=Qd;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function u_(n,t,e){const i=this.cache,s=t.length,r=Lo(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||eh,r[o])}function d_(n,t,e){const i=this.cache,s=t.length,r=Lo(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||nh,r[o])}function h_(n,t,e){const i=this.cache,s=t.length,r=Lo(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||th,r[o])}function f_(n){switch(n){case 5126:return Yg;case 35664:return jg;case 35665:return Kg;case 35666:return Zg;case 35674:return Jg;case 35675:return Qg;case 35676:return t_;case 5124:case 35670:return e_;case 35667:case 35671:return n_;case 35668:case 35672:return i_;case 35669:case 35673:return s_;case 5125:return r_;case 36294:return o_;case 36295:return a_;case 36296:return l_;case 35678:case 36198:case 36298:case 36306:case 35682:return c_;case 35679:case 36299:case 36307:return u_;case 35680:case 36300:case 36308:case 36293:return d_;case 36289:case 36303:case 36311:case 36292:return h_}}class p_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=qg(e.type)}}class m_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=f_(e.type)}}class g_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const ma=/(\w+)(\])?(\[|\.)?/g;function Su(n,t){n.seq.push(t),n.map[t.id]=t}function __(n,t,e){const i=n.name,s=i.length;for(ma.lastIndex=0;;){const r=ma.exec(i),o=ma.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Su(e,l===void 0?new p_(a,n,t):new m_(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new g_(a),Su(e,f)),e=f}}}class ao{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);__(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function yu(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const x_=37297;let v_=0;function M_(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Eu=new $t;function b_(n){ie._getMatrix(Eu,ie.workingColorSpace,n);const t=`mat3( ${Eu.elements.map(e=>e.toFixed(4))} )`;switch(ie.getTransfer(n)){case go:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return zt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Tu(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+M_(n.getShaderSource(t),a)}else return r}function S_(n,t){const e=b_(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const y_={[Md]:"Linear",[bd]:"Reinhard",[Sd]:"Cineon",[yd]:"ACESFilmic",[Td]:"AgX",[wo]:"Neutral",[Ed]:"Custom"};function E_(n,t){const e=y_[t];return e===void 0?(zt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Wr=new U;function T_(){ie.getLuminanceCoefficients(Wr);const n=Wr.x.toFixed(4),t=Wr.y.toFixed(4),e=Wr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function w_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(js).join(`
`)}function A_(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function R_(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function js(n){return n!==""}function wu(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Au(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const C_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sl(n){return n.replace(C_,L_)}const P_=new Map;function L_(n,t){let e=Yt[t];if(e===void 0){const i=P_.get(t);if(i!==void 0)e=Yt[i],zt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Sl(e)}const D_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ru(n){return n.replace(D_,I_)}function I_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Cu(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}const N_={[Ms]:"SHADOWMAP_TYPE_PCF",[Ys]:"SHADOWMAP_TYPE_VSM"};function U_(n){return N_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const O_={[Wi]:"ENVMAP_TYPE_CUBE",[Es]:"ENVMAP_TYPE_CUBE",[Ao]:"ENVMAP_TYPE_CUBE_UV"};function F_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":O_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const z_={[Es]:"ENVMAP_MODE_REFRACTION"};function B_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":z_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const k_={[Ll]:"ENVMAP_BLENDING_MULTIPLY",[df]:"ENVMAP_BLENDING_MIX",[hf]:"ENVMAP_BLENDING_ADD"};function G_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":k_[n.combine]||"ENVMAP_BLENDING_NONE"}function H_(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function V_(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=U_(e),l=F_(e),u=B_(e),f=G_(e),d=H_(e),m=w_(e),g=A_(r),v=s.createProgram();let _,h,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(js).join(`
`),_.length>0&&(_+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(js).join(`
`),h.length>0&&(h+=`
`)):(_=[Cu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(js).join(`
`),h=[Cu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Vn?"#define TONE_MAPPING":"",e.toneMapping!==Vn?Yt.tonemapping_pars_fragment:"",e.toneMapping!==Vn?E_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,S_("linearToOutputTexel",e.outputColorSpace),T_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(js).join(`
`)),o=Sl(o),o=wu(o,e),o=Au(o,e),a=Sl(a),a=wu(a,e),a=Au(a,e),o=Ru(o),a=Ru(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,_=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,h=["#define varying in",e.glslVersion===Dc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Dc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const S=x+_+o,E=x+h+a,L=yu(s,s.VERTEX_SHADER,S),A=yu(s,s.FRAGMENT_SHADER,E);s.attachShader(v,L),s.attachShader(v,A),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function w(C){if(n.debug.checkShaderErrors){const P=s.getProgramInfoLog(v)||"",D=s.getShaderInfoLog(L)||"",H=s.getShaderInfoLog(A)||"",N=P.trim(),k=D.trim(),B=H.trim();let J=!0,ot=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(J=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,L,A);else{const pt=Tu(s,L,"vertex"),wt=Tu(s,A,"fragment");se("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+N+`
`+pt+`
`+wt)}else N!==""?zt("WebGLProgram: Program Info Log:",N):(k===""||B==="")&&(ot=!1);ot&&(C.diagnostics={runnable:J,programLog:N,vertexShader:{log:k,prefix:_},fragmentShader:{log:B,prefix:h}})}s.deleteShader(L),s.deleteShader(A),p=new ao(s,v),M=R_(s,v)}let p;this.getUniforms=function(){return p===void 0&&w(this),p};let M;this.getAttributes=function(){return M===void 0&&w(this),M};let T=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=s.getProgramParameter(v,x_)),T},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=v_++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=L,this.fragmentShader=A,this}let W_=0;class X_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new $_(t),e.set(t,i)),i}}class $_{constructor(t){this.id=W_++,this.code=t,this.usedTimes=0}}function q_(n){return n===Xi||n===ho||n===fo}function Y_(n,t,e,i,s,r){const o=new Vl,a=new X_,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(p){return c.add(p),p===0?"uv":`uv${p}`}function v(p,M,T,C,P,D){const H=C.fog,N=P.geometry,k=p.isMeshStandardMaterial||p.isMeshLambertMaterial||p.isMeshPhongMaterial?C.environment:null,B=p.isMeshStandardMaterial||p.isMeshLambertMaterial&&!p.envMap||p.isMeshPhongMaterial&&!p.envMap,J=t.get(p.envMap||k,B),ot=J&&J.mapping===Ao?J.image.height:null,pt=m[p.type];p.precision!==null&&(d=i.getMaxPrecision(p.precision),d!==p.precision&&zt("WebGLProgram.getParameters:",p.precision,"not supported, using",d,"instead."));const wt=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Ct=wt!==void 0?wt.length:0;let ct=0;N.morphAttributes.position!==void 0&&(ct=1),N.morphAttributes.normal!==void 0&&(ct=2),N.morphAttributes.color!==void 0&&(ct=3);let ft,bt,Q,St;if(pt){const Ft=Gn[pt];ft=Ft.vertexShader,bt=Ft.fragmentShader}else ft=p.vertexShader,bt=p.fragmentShader,a.update(p),Q=a.getVertexShaderID(p),St=a.getFragmentShaderID(p);const ht=n.getRenderTarget(),Bt=n.state.buffers.depth.getReversed(),Wt=P.isInstancedMesh===!0,kt=P.isBatchedMesh===!0,ye=!!p.map,Jt=!!p.matcap,ce=!!J,ue=!!p.aoMap,Vt=!!p.lightMap,Pe=!!p.bumpMap,be=!!p.normalMap,Ke=!!p.displacementMap,F=!!p.emissiveMap,Ie=!!p.metalnessMap,jt=!!p.roughnessMap,de=p.anisotropy>0,xt=p.clearcoat>0,ge=p.dispersion>0,R=p.iridescence>0,b=p.sheen>0,G=p.transmission>0,I=de&&!!p.anisotropyMap,q=xt&&!!p.clearcoatMap,V=xt&&!!p.clearcoatNormalMap,it=xt&&!!p.clearcoatRoughnessMap,$=R&&!!p.iridescenceMap,tt=R&&!!p.iridescenceThicknessMap,rt=b&&!!p.sheenColorMap,_t=b&&!!p.sheenRoughnessMap,ut=!!p.specularMap,lt=!!p.specularColorMap,Ot=!!p.specularIntensityMap,Gt=G&&!!p.transmissionMap,ee=G&&!!p.thicknessMap,O=!!p.gradientMap,dt=!!p.alphaMap,et=p.alphaTest>0,vt=!!p.alphaHash,at=!!p.extensions;let K=Vn;p.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(K=n.toneMapping);const gt={shaderID:pt,shaderType:p.type,shaderName:p.name,vertexShader:ft,fragmentShader:bt,defines:p.defines,customVertexShaderID:Q,customFragmentShaderID:St,isRawShaderMaterial:p.isRawShaderMaterial===!0,glslVersion:p.glslVersion,precision:d,batching:kt,batchingColor:kt&&P._colorsTexture!==null,instancing:Wt,instancingColor:Wt&&P.instanceColor!==null,instancingMorph:Wt&&P.morphTexture!==null,outputColorSpace:ht===null?n.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:ie.workingColorSpace,alphaToCoverage:!!p.alphaToCoverage,map:ye,matcap:Jt,envMap:ce,envMapMode:ce&&J.mapping,envMapCubeUVHeight:ot,aoMap:ue,lightMap:Vt,bumpMap:Pe,normalMap:be,displacementMap:Ke,emissiveMap:F,normalMapObjectSpace:be&&p.normalMapType===mf,normalMapTangentSpace:be&&p.normalMapType===po,packedNormalMap:be&&p.normalMapType===po&&q_(p.normalMap.format),metalnessMap:Ie,roughnessMap:jt,anisotropy:de,anisotropyMap:I,clearcoat:xt,clearcoatMap:q,clearcoatNormalMap:V,clearcoatRoughnessMap:it,dispersion:ge,iridescence:R,iridescenceMap:$,iridescenceThicknessMap:tt,sheen:b,sheenColorMap:rt,sheenRoughnessMap:_t,specularMap:ut,specularColorMap:lt,specularIntensityMap:Ot,transmission:G,transmissionMap:Gt,thicknessMap:ee,gradientMap:O,opaque:p.transparent===!1&&p.blending===bs&&p.alphaToCoverage===!1,alphaMap:dt,alphaTest:et,alphaHash:vt,combine:p.combine,mapUv:ye&&g(p.map.channel),aoMapUv:ue&&g(p.aoMap.channel),lightMapUv:Vt&&g(p.lightMap.channel),bumpMapUv:Pe&&g(p.bumpMap.channel),normalMapUv:be&&g(p.normalMap.channel),displacementMapUv:Ke&&g(p.displacementMap.channel),emissiveMapUv:F&&g(p.emissiveMap.channel),metalnessMapUv:Ie&&g(p.metalnessMap.channel),roughnessMapUv:jt&&g(p.roughnessMap.channel),anisotropyMapUv:I&&g(p.anisotropyMap.channel),clearcoatMapUv:q&&g(p.clearcoatMap.channel),clearcoatNormalMapUv:V&&g(p.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&g(p.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&g(p.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&g(p.iridescenceThicknessMap.channel),sheenColorMapUv:rt&&g(p.sheenColorMap.channel),sheenRoughnessMapUv:_t&&g(p.sheenRoughnessMap.channel),specularMapUv:ut&&g(p.specularMap.channel),specularColorMapUv:lt&&g(p.specularColorMap.channel),specularIntensityMapUv:Ot&&g(p.specularIntensityMap.channel),transmissionMapUv:Gt&&g(p.transmissionMap.channel),thicknessMapUv:ee&&g(p.thicknessMap.channel),alphaMapUv:dt&&g(p.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(be||de),vertexNormals:!!N.attributes.normal,vertexColors:p.vertexColors,vertexAlphas:p.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!N.attributes.uv&&(ye||dt),fog:!!H,useFog:p.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:p.wireframe===!1&&(p.flatShading===!0||N.attributes.normal===void 0&&be===!1&&(p.isMeshLambertMaterial||p.isMeshPhongMaterial||p.isMeshStandardMaterial||p.isMeshPhysicalMaterial)),sizeAttenuation:p.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Bt,skinning:P.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:ct,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:D.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:p.dithering,shadowMapEnabled:n.shadowMap.enabled&&T.length>0,shadowMapType:n.shadowMap.type,toneMapping:K,decodeVideoTexture:ye&&p.map.isVideoTexture===!0&&ie.getTransfer(p.map.colorSpace)===he,decodeVideoTextureEmissive:F&&p.emissiveMap.isVideoTexture===!0&&ie.getTransfer(p.emissiveMap.colorSpace)===he,premultipliedAlpha:p.premultipliedAlpha,doubleSided:p.side===ti,flipSided:p.side===cn,useDepthPacking:p.depthPacking>=0,depthPacking:p.depthPacking||0,index0AttributeName:p.index0AttributeName,extensionClipCullDistance:at&&p.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(at&&p.extensions.multiDraw===!0||kt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:p.customProgramCacheKey()};return gt.vertexUv1s=c.has(1),gt.vertexUv2s=c.has(2),gt.vertexUv3s=c.has(3),c.clear(),gt}function _(p){const M=[];if(p.shaderID?M.push(p.shaderID):(M.push(p.customVertexShaderID),M.push(p.customFragmentShaderID)),p.defines!==void 0)for(const T in p.defines)M.push(T),M.push(p.defines[T]);return p.isRawShaderMaterial===!1&&(h(M,p),x(M,p),M.push(n.outputColorSpace)),M.push(p.customProgramCacheKey),M.join()}function h(p,M){p.push(M.precision),p.push(M.outputColorSpace),p.push(M.envMapMode),p.push(M.envMapCubeUVHeight),p.push(M.mapUv),p.push(M.alphaMapUv),p.push(M.lightMapUv),p.push(M.aoMapUv),p.push(M.bumpMapUv),p.push(M.normalMapUv),p.push(M.displacementMapUv),p.push(M.emissiveMapUv),p.push(M.metalnessMapUv),p.push(M.roughnessMapUv),p.push(M.anisotropyMapUv),p.push(M.clearcoatMapUv),p.push(M.clearcoatNormalMapUv),p.push(M.clearcoatRoughnessMapUv),p.push(M.iridescenceMapUv),p.push(M.iridescenceThicknessMapUv),p.push(M.sheenColorMapUv),p.push(M.sheenRoughnessMapUv),p.push(M.specularMapUv),p.push(M.specularColorMapUv),p.push(M.specularIntensityMapUv),p.push(M.transmissionMapUv),p.push(M.thicknessMapUv),p.push(M.combine),p.push(M.fogExp2),p.push(M.sizeAttenuation),p.push(M.morphTargetsCount),p.push(M.morphAttributeCount),p.push(M.numDirLights),p.push(M.numPointLights),p.push(M.numSpotLights),p.push(M.numSpotLightMaps),p.push(M.numHemiLights),p.push(M.numRectAreaLights),p.push(M.numDirLightShadows),p.push(M.numPointLightShadows),p.push(M.numSpotLightShadows),p.push(M.numSpotLightShadowsWithMaps),p.push(M.numLightProbes),p.push(M.shadowMapType),p.push(M.toneMapping),p.push(M.numClippingPlanes),p.push(M.numClipIntersection),p.push(M.depthPacking)}function x(p,M){o.disableAll(),M.instancing&&o.enable(0),M.instancingColor&&o.enable(1),M.instancingMorph&&o.enable(2),M.matcap&&o.enable(3),M.envMap&&o.enable(4),M.normalMapObjectSpace&&o.enable(5),M.normalMapTangentSpace&&o.enable(6),M.clearcoat&&o.enable(7),M.iridescence&&o.enable(8),M.alphaTest&&o.enable(9),M.vertexColors&&o.enable(10),M.vertexAlphas&&o.enable(11),M.vertexUv1s&&o.enable(12),M.vertexUv2s&&o.enable(13),M.vertexUv3s&&o.enable(14),M.vertexTangents&&o.enable(15),M.anisotropy&&o.enable(16),M.alphaHash&&o.enable(17),M.batching&&o.enable(18),M.dispersion&&o.enable(19),M.batchingColor&&o.enable(20),M.gradientMap&&o.enable(21),M.packedNormalMap&&o.enable(22),M.vertexNormals&&o.enable(23),p.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),M.numLightProbeGrids>0&&o.enable(22),p.push(o.mask)}function S(p){const M=m[p.type];let T;if(M){const C=Gn[M];T=pp.clone(C.uniforms)}else T=p.uniforms;return T}function E(p,M){let T=u.get(M);return T!==void 0?++T.usedTimes:(T=new V_(n,M,p,s),l.push(T),u.set(M,T)),T}function L(p){if(--p.usedTimes===0){const M=l.indexOf(p);l[M]=l[l.length-1],l.pop(),u.delete(p.cacheKey),p.destroy()}}function A(p){a.remove(p)}function w(){a.dispose()}return{getParameters:v,getProgramCacheKey:_,getUniforms:S,acquireProgram:E,releaseProgram:L,releaseShaderCache:A,programs:l,dispose:w}}function j_(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function K_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Pu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Lu(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(d){let m=0;return d.isInstancedMesh&&(m+=2),d.isSkinnedMesh&&(m+=1),m}function a(d,m,g,v,_,h){let x=n[t];return x===void 0?(x={id:d.id,object:d,geometry:m,material:g,materialVariant:o(d),groupOrder:v,renderOrder:d.renderOrder,z:_,group:h},n[t]=x):(x.id=d.id,x.object=d,x.geometry=m,x.material=g,x.materialVariant=o(d),x.groupOrder=v,x.renderOrder=d.renderOrder,x.z=_,x.group=h),t++,x}function c(d,m,g,v,_,h){const x=a(d,m,g,v,_,h);g.transmission>0?i.push(x):g.transparent===!0?s.push(x):e.push(x)}function l(d,m,g,v,_,h){const x=a(d,m,g,v,_,h);g.transmission>0?i.unshift(x):g.transparent===!0?s.unshift(x):e.unshift(x)}function u(d,m){e.length>1&&e.sort(d||K_),i.length>1&&i.sort(m||Pu),s.length>1&&s.sort(m||Pu)}function f(){for(let d=t,m=n.length;d<m;d++){const g=n[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function Z_(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Lu,n.set(i,[o])):s>=r.length?(o=new Lu,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function J_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new Ut};break;case"SpotLight":e={position:new U,direction:new U,color:new Ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Ut,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Ut,groundColor:new Ut};break;case"RectAreaLight":e={color:new Ut,position:new U,halfWidth:new U,halfHeight:new U};break}return n[t.id]=e,e}}}function Q_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let tx=0;function ex(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function nx(n){const t=new J_,e=Q_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new U);const s=new U,r=new me,o=new me;function a(l){let u=0,f=0,d=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let m=0,g=0,v=0,_=0,h=0,x=0,S=0,E=0,L=0,A=0,w=0;l.sort(ex);for(let M=0,T=l.length;M<T;M++){const C=l[M],P=C.color,D=C.intensity,H=C.distance;let N=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Xi?N=C.shadow.map.texture:N=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)u+=P.r*D,f+=P.g*D,d+=P.b*D;else if(C.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(C.sh.coefficients[k],D);w++}else if(C.isDirectionalLight){const k=t.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const B=C.shadow,J=e.get(C);J.shadowIntensity=B.intensity,J.shadowBias=B.bias,J.shadowNormalBias=B.normalBias,J.shadowRadius=B.radius,J.shadowMapSize=B.mapSize,i.directionalShadow[m]=J,i.directionalShadowMap[m]=N,i.directionalShadowMatrix[m]=C.shadow.matrix,x++}i.directional[m]=k,m++}else if(C.isSpotLight){const k=t.get(C);k.position.setFromMatrixPosition(C.matrixWorld),k.color.copy(P).multiplyScalar(D),k.distance=H,k.coneCos=Math.cos(C.angle),k.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),k.decay=C.decay,i.spot[v]=k;const B=C.shadow;if(C.map&&(i.spotLightMap[L]=C.map,L++,B.updateMatrices(C),C.castShadow&&A++),i.spotLightMatrix[v]=B.matrix,C.castShadow){const J=e.get(C);J.shadowIntensity=B.intensity,J.shadowBias=B.bias,J.shadowNormalBias=B.normalBias,J.shadowRadius=B.radius,J.shadowMapSize=B.mapSize,i.spotShadow[v]=J,i.spotShadowMap[v]=N,E++}v++}else if(C.isRectAreaLight){const k=t.get(C);k.color.copy(P).multiplyScalar(D),k.halfWidth.set(C.width*.5,0,0),k.halfHeight.set(0,C.height*.5,0),i.rectArea[_]=k,_++}else if(C.isPointLight){const k=t.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),k.distance=C.distance,k.decay=C.decay,C.castShadow){const B=C.shadow,J=e.get(C);J.shadowIntensity=B.intensity,J.shadowBias=B.bias,J.shadowNormalBias=B.normalBias,J.shadowRadius=B.radius,J.shadowMapSize=B.mapSize,J.shadowCameraNear=B.camera.near,J.shadowCameraFar=B.camera.far,i.pointShadow[g]=J,i.pointShadowMap[g]=N,i.pointShadowMatrix[g]=C.shadow.matrix,S++}i.point[g]=k,g++}else if(C.isHemisphereLight){const k=t.get(C);k.skyColor.copy(C.color).multiplyScalar(D),k.groundColor.copy(C.groundColor).multiplyScalar(D),i.hemi[h]=k,h++}}_>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=yt.LTC_FLOAT_1,i.rectAreaLTC2=yt.LTC_FLOAT_2):(i.rectAreaLTC1=yt.LTC_HALF_1,i.rectAreaLTC2=yt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const p=i.hash;(p.directionalLength!==m||p.pointLength!==g||p.spotLength!==v||p.rectAreaLength!==_||p.hemiLength!==h||p.numDirectionalShadows!==x||p.numPointShadows!==S||p.numSpotShadows!==E||p.numSpotMaps!==L||p.numLightProbes!==w)&&(i.directional.length=m,i.spot.length=v,i.rectArea.length=_,i.point.length=g,i.hemi.length=h,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=E+L-A,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=w,p.directionalLength=m,p.pointLength=g,p.spotLength=v,p.rectAreaLength=_,p.hemiLength=h,p.numDirectionalShadows=x,p.numPointShadows=S,p.numSpotShadows=E,p.numSpotMaps=L,p.numLightProbes=w,i.version=tx++)}function c(l,u){let f=0,d=0,m=0,g=0,v=0;const _=u.matrixWorldInverse;for(let h=0,x=l.length;h<x;h++){const S=l[h];if(S.isDirectionalLight){const E=i.directional[f];E.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(_),f++}else if(S.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(_),E.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(_),m++}else if(S.isRectAreaLight){const E=i.rectArea[g];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(_),o.identity(),r.copy(S.matrixWorld),r.premultiply(_),o.extractRotation(r),E.halfWidth.set(S.width*.5,0,0),E.halfHeight.set(0,S.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const E=i.point[d];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(_),d++}else if(S.isHemisphereLight){const E=i.hemi[v];E.direction.setFromMatrixPosition(S.matrixWorld),E.direction.transformDirection(_),v++}}}return{setup:a,setupView:c,state:i}}function Du(n){const t=new nx(n),e=[],i=[],s=[];function r(d){f.camera=d,e.length=0,i.length=0,s.length=0}function o(d){e.push(d)}function a(d){i.push(d)}function c(d){s.push(d)}function l(){t.setup(e)}function u(d){t.setupView(e,d)}const f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function ix(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Du(n),t.set(s,[a])):r>=o.length?(a=new Du(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const sx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rx=`uniform sampler2D shadow_pass;
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
}`,ox=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],ax=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Iu=new me,$s=new U,ga=new U;function lx(n,t,e){let i=new $l;const s=new Nt,r=new Nt,o=new Oe,a=new vp,c=new Mp,l={},u=e.maxTextureSize,f={[Ai]:cn,[cn]:Ai,[ti]:ti},d=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Nt},radius:{value:4}},vertexShader:sx,fragmentShader:rx}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const g=new rn;g.setAttribute("position",new xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Xt(g,d),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ms;let h=this.type;this.render=function(A,w,p){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||A.length===0)return;this.type===Xh&&(zt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ms);const M=n.getRenderTarget(),T=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),P=n.state;P.setBlending(ni),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const D=h!==this.type;D&&w.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(N=>N.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,N=A.length;H<N;H++){const k=A[H],B=k.shadow;if(B===void 0){zt("WebGLShadowMap:",k,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const J=B.getFrameExtents();s.multiply(J),r.copy(B.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/J.x),s.x=r.x*J.x,B.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/J.y),s.y=r.y*J.y,B.mapSize.y=r.y));const ot=n.state.buffers.depth.getReversed();if(B.camera._reversedDepth=ot,B.map===null||D===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Ys){if(k.isPointLight){zt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new Wn(s.x,s.y,{format:Xi,type:oi,minFilter:en,magFilter:en,generateMipmaps:!1}),B.map.texture.name=k.name+".shadowMap",B.map.depthTexture=new Ts(s.x,s.y,Dn),B.map.depthTexture.name=k.name+".shadowMapDepth",B.map.depthTexture.format=ai,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Ye,B.map.depthTexture.magFilter=Ye}else k.isPointLight?(B.map=new Jd(s.x),B.map.depthTexture=new hp(s.x,Xn)):(B.map=new Wn(s.x,s.y),B.map.depthTexture=new Ts(s.x,s.y,Xn)),B.map.depthTexture.name=k.name+".shadowMap",B.map.depthTexture.format=ai,this.type===Ms?(B.map.depthTexture.compareFunction=ot?kl:Bl,B.map.depthTexture.minFilter=en,B.map.depthTexture.magFilter=en):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Ye,B.map.depthTexture.magFilter=Ye);B.camera.updateProjectionMatrix()}const pt=B.map.isWebGLCubeRenderTarget?6:1;for(let wt=0;wt<pt;wt++){if(B.map.isWebGLCubeRenderTarget)n.setRenderTarget(B.map,wt),n.clear();else{wt===0&&(n.setRenderTarget(B.map),n.clear());const Ct=B.getViewport(wt);o.set(r.x*Ct.x,r.y*Ct.y,r.x*Ct.z,r.y*Ct.w),P.viewport(o)}if(k.isPointLight){const Ct=B.camera,ct=B.matrix,ft=k.distance||Ct.far;ft!==Ct.far&&(Ct.far=ft,Ct.updateProjectionMatrix()),$s.setFromMatrixPosition(k.matrixWorld),Ct.position.copy($s),ga.copy(Ct.position),ga.add(ox[wt]),Ct.up.copy(ax[wt]),Ct.lookAt(ga),Ct.updateMatrixWorld(),ct.makeTranslation(-$s.x,-$s.y,-$s.z),Iu.multiplyMatrices(Ct.projectionMatrix,Ct.matrixWorldInverse),B._frustum.setFromProjectionMatrix(Iu,Ct.coordinateSystem,Ct.reversedDepth)}else B.updateMatrices(k);i=B.getFrustum(),E(w,p,B.camera,k,this.type)}B.isPointLightShadow!==!0&&this.type===Ys&&x(B,p),B.needsUpdate=!1}h=this.type,_.needsUpdate=!1,n.setRenderTarget(M,T,C)};function x(A,w){const p=t.update(v);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Wn(s.x,s.y,{format:Xi,type:oi})),d.uniforms.shadow_pass.value=A.map.depthTexture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(w,null,p,d,v,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(w,null,p,m,v,null)}function S(A,w,p,M){let T=null;const C=p.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)T=C;else if(T=p.isPointLight===!0?c:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const P=T.uuid,D=w.uuid;let H=l[P];H===void 0&&(H={},l[P]=H);let N=H[D];N===void 0&&(N=T.clone(),H[D]=N,w.addEventListener("dispose",L)),T=N}if(T.visible=w.visible,T.wireframe=w.wireframe,M===Ys?T.side=w.shadowSide!==null?w.shadowSide:w.side:T.side=w.shadowSide!==null?w.shadowSide:f[w.side],T.alphaMap=w.alphaMap,T.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,T.map=w.map,T.clipShadows=w.clipShadows,T.clippingPlanes=w.clippingPlanes,T.clipIntersection=w.clipIntersection,T.displacementMap=w.displacementMap,T.displacementScale=w.displacementScale,T.displacementBias=w.displacementBias,T.wireframeLinewidth=w.wireframeLinewidth,T.linewidth=w.linewidth,p.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const P=n.properties.get(T);P.light=p}return T}function E(A,w,p,M,T){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&T===Ys)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(p.matrixWorldInverse,A.matrixWorld);const D=t.update(A),H=A.material;if(Array.isArray(H)){const N=D.groups;for(let k=0,B=N.length;k<B;k++){const J=N[k],ot=H[J.materialIndex];if(ot&&ot.visible){const pt=S(A,ot,M,T);A.onBeforeShadow(n,A,w,p,D,pt,J),n.renderBufferDirect(p,null,D,pt,A,J),A.onAfterShadow(n,A,w,p,D,pt,J)}}}else if(H.visible){const N=S(A,H,M,T);A.onBeforeShadow(n,A,w,p,D,N,null),n.renderBufferDirect(p,null,D,N,A,null),A.onAfterShadow(n,A,w,p,D,N,null)}}const P=A.children;for(let D=0,H=P.length;D<H;D++)E(P[D],w,p,M,T)}function L(A){A.target.removeEventListener("dispose",L);for(const p in l){const M=l[p],T=A.target.uuid;T in M&&(M[T].dispose(),delete M[T])}}}function cx(n,t){function e(){let O=!1;const dt=new Oe;let et=null;const vt=new Oe(0,0,0,0);return{setMask:function(at){et!==at&&!O&&(n.colorMask(at,at,at,at),et=at)},setLocked:function(at){O=at},setClear:function(at,K,gt,Ft,Ee){Ee===!0&&(at*=Ft,K*=Ft,gt*=Ft),dt.set(at,K,gt,Ft),vt.equals(dt)===!1&&(n.clearColor(at,K,gt,Ft),vt.copy(dt))},reset:function(){O=!1,et=null,vt.set(-1,0,0,0)}}}function i(){let O=!1,dt=!1,et=null,vt=null,at=null;return{setReversed:function(K){if(dt!==K){const gt=t.get("EXT_clip_control");K?gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.ZERO_TO_ONE_EXT):gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.NEGATIVE_ONE_TO_ONE_EXT),dt=K;const Ft=at;at=null,this.setClear(Ft)}},getReversed:function(){return dt},setTest:function(K){K?ht(n.DEPTH_TEST):Bt(n.DEPTH_TEST)},setMask:function(K){et!==K&&!O&&(n.depthMask(K),et=K)},setFunc:function(K){if(dt&&(K=Tf[K]),vt!==K){switch(K){case Na:n.depthFunc(n.NEVER);break;case Ua:n.depthFunc(n.ALWAYS);break;case Oa:n.depthFunc(n.LESS);break;case ys:n.depthFunc(n.LEQUAL);break;case Fa:n.depthFunc(n.EQUAL);break;case za:n.depthFunc(n.GEQUAL);break;case Ba:n.depthFunc(n.GREATER);break;case ka:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}vt=K}},setLocked:function(K){O=K},setClear:function(K){at!==K&&(at=K,dt&&(K=1-K),n.clearDepth(K))},reset:function(){O=!1,et=null,vt=null,at=null,dt=!1}}}function s(){let O=!1,dt=null,et=null,vt=null,at=null,K=null,gt=null,Ft=null,Ee=null;return{setTest:function(oe){O||(oe?ht(n.STENCIL_TEST):Bt(n.STENCIL_TEST))},setMask:function(oe){dt!==oe&&!O&&(n.stencilMask(oe),dt=oe)},setFunc:function(oe,An,Ae){(et!==oe||vt!==An||at!==Ae)&&(n.stencilFunc(oe,An,Ae),et=oe,vt=An,at=Ae)},setOp:function(oe,An,Ae){(K!==oe||gt!==An||Ft!==Ae)&&(n.stencilOp(oe,An,Ae),K=oe,gt=An,Ft=Ae)},setLocked:function(oe){O=oe},setClear:function(oe){Ee!==oe&&(n.clearStencil(oe),Ee=oe)},reset:function(){O=!1,dt=null,et=null,vt=null,at=null,K=null,gt=null,Ft=null,Ee=null}}}const r=new e,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let u={},f={},d={},m=new WeakMap,g=[],v=null,_=!1,h=null,x=null,S=null,E=null,L=null,A=null,w=null,p=new Ut(0,0,0),M=0,T=!1,C=null,P=null,D=null,H=null,N=null;const k=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,J=0;const ot=n.getParameter(n.VERSION);ot.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(ot)[1]),B=J>=1):ot.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(ot)[1]),B=J>=2);let pt=null,wt={};const Ct=n.getParameter(n.SCISSOR_BOX),ct=n.getParameter(n.VIEWPORT),ft=new Oe().fromArray(Ct),bt=new Oe().fromArray(ct);function Q(O,dt,et,vt){const at=new Uint8Array(4),K=n.createTexture();n.bindTexture(O,K),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let gt=0;gt<et;gt++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(dt,0,n.RGBA,1,1,vt,0,n.RGBA,n.UNSIGNED_BYTE,at):n.texImage2D(dt+gt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,at);return K}const St={};St[n.TEXTURE_2D]=Q(n.TEXTURE_2D,n.TEXTURE_2D,1),St[n.TEXTURE_CUBE_MAP]=Q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),St[n.TEXTURE_2D_ARRAY]=Q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),St[n.TEXTURE_3D]=Q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ht(n.DEPTH_TEST),o.setFunc(ys),Pe(!1),be(wc),ht(n.CULL_FACE),ue(ni);function ht(O){u[O]!==!0&&(n.enable(O),u[O]=!0)}function Bt(O){u[O]!==!1&&(n.disable(O),u[O]=!1)}function Wt(O,dt){return d[O]!==dt?(n.bindFramebuffer(O,dt),d[O]=dt,O===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=dt),O===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=dt),!0):!1}function kt(O,dt){let et=g,vt=!1;if(O){et=m.get(dt),et===void 0&&(et=[],m.set(dt,et));const at=O.textures;if(et.length!==at.length||et[0]!==n.COLOR_ATTACHMENT0){for(let K=0,gt=at.length;K<gt;K++)et[K]=n.COLOR_ATTACHMENT0+K;et.length=at.length,vt=!0}}else et[0]!==n.BACK&&(et[0]=n.BACK,vt=!0);vt&&n.drawBuffers(et)}function ye(O){return v!==O?(n.useProgram(O),v=O,!0):!1}const Jt={[Fi]:n.FUNC_ADD,[qh]:n.FUNC_SUBTRACT,[Yh]:n.FUNC_REVERSE_SUBTRACT};Jt[jh]=n.MIN,Jt[Kh]=n.MAX;const ce={[Zh]:n.ZERO,[Jh]:n.ONE,[Qh]:n.SRC_COLOR,[Da]:n.SRC_ALPHA,[of]:n.SRC_ALPHA_SATURATE,[sf]:n.DST_COLOR,[ef]:n.DST_ALPHA,[tf]:n.ONE_MINUS_SRC_COLOR,[Ia]:n.ONE_MINUS_SRC_ALPHA,[rf]:n.ONE_MINUS_DST_COLOR,[nf]:n.ONE_MINUS_DST_ALPHA,[af]:n.CONSTANT_COLOR,[lf]:n.ONE_MINUS_CONSTANT_COLOR,[cf]:n.CONSTANT_ALPHA,[uf]:n.ONE_MINUS_CONSTANT_ALPHA};function ue(O,dt,et,vt,at,K,gt,Ft,Ee,oe){if(O===ni){_===!0&&(Bt(n.BLEND),_=!1);return}if(_===!1&&(ht(n.BLEND),_=!0),O!==$h){if(O!==h||oe!==T){if((x!==Fi||L!==Fi)&&(n.blendEquation(n.FUNC_ADD),x=Fi,L=Fi),oe)switch(O){case bs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ac:n.blendFunc(n.ONE,n.ONE);break;case Rc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Cc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:se("WebGLState: Invalid blending: ",O);break}else switch(O){case bs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ac:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Rc:se("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Cc:se("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:se("WebGLState: Invalid blending: ",O);break}S=null,E=null,A=null,w=null,p.set(0,0,0),M=0,h=O,T=oe}return}at=at||dt,K=K||et,gt=gt||vt,(dt!==x||at!==L)&&(n.blendEquationSeparate(Jt[dt],Jt[at]),x=dt,L=at),(et!==S||vt!==E||K!==A||gt!==w)&&(n.blendFuncSeparate(ce[et],ce[vt],ce[K],ce[gt]),S=et,E=vt,A=K,w=gt),(Ft.equals(p)===!1||Ee!==M)&&(n.blendColor(Ft.r,Ft.g,Ft.b,Ee),p.copy(Ft),M=Ee),h=O,T=!1}function Vt(O,dt){O.side===ti?Bt(n.CULL_FACE):ht(n.CULL_FACE);let et=O.side===cn;dt&&(et=!et),Pe(et),O.blending===bs&&O.transparent===!1?ue(ni):ue(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const vt=O.stencilWrite;a.setTest(vt),vt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),F(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ht(n.SAMPLE_ALPHA_TO_COVERAGE):Bt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Pe(O){C!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),C=O)}function be(O){O!==Vh?(ht(n.CULL_FACE),O!==P&&(O===wc?n.cullFace(n.BACK):O===Wh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Bt(n.CULL_FACE),P=O}function Ke(O){O!==D&&(B&&n.lineWidth(O),D=O)}function F(O,dt,et){O?(ht(n.POLYGON_OFFSET_FILL),(H!==dt||N!==et)&&(H=dt,N=et,o.getReversed()&&(dt=-dt),n.polygonOffset(dt,et))):Bt(n.POLYGON_OFFSET_FILL)}function Ie(O){O?ht(n.SCISSOR_TEST):Bt(n.SCISSOR_TEST)}function jt(O){O===void 0&&(O=n.TEXTURE0+k-1),pt!==O&&(n.activeTexture(O),pt=O)}function de(O,dt,et){et===void 0&&(pt===null?et=n.TEXTURE0+k-1:et=pt);let vt=wt[et];vt===void 0&&(vt={type:void 0,texture:void 0},wt[et]=vt),(vt.type!==O||vt.texture!==dt)&&(pt!==et&&(n.activeTexture(et),pt=et),n.bindTexture(O,dt||St[O]),vt.type=O,vt.texture=dt)}function xt(){const O=wt[pt];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function ge(){try{n.compressedTexImage2D(...arguments)}catch(O){se("WebGLState:",O)}}function R(){try{n.compressedTexImage3D(...arguments)}catch(O){se("WebGLState:",O)}}function b(){try{n.texSubImage2D(...arguments)}catch(O){se("WebGLState:",O)}}function G(){try{n.texSubImage3D(...arguments)}catch(O){se("WebGLState:",O)}}function I(){try{n.compressedTexSubImage2D(...arguments)}catch(O){se("WebGLState:",O)}}function q(){try{n.compressedTexSubImage3D(...arguments)}catch(O){se("WebGLState:",O)}}function V(){try{n.texStorage2D(...arguments)}catch(O){se("WebGLState:",O)}}function it(){try{n.texStorage3D(...arguments)}catch(O){se("WebGLState:",O)}}function $(){try{n.texImage2D(...arguments)}catch(O){se("WebGLState:",O)}}function tt(){try{n.texImage3D(...arguments)}catch(O){se("WebGLState:",O)}}function rt(O){return f[O]!==void 0?f[O]:n.getParameter(O)}function _t(O,dt){f[O]!==dt&&(n.pixelStorei(O,dt),f[O]=dt)}function ut(O){ft.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),ft.copy(O))}function lt(O){bt.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),bt.copy(O))}function Ot(O,dt){let et=l.get(dt);et===void 0&&(et=new WeakMap,l.set(dt,et));let vt=et.get(O);vt===void 0&&(vt=n.getUniformBlockIndex(dt,O.name),et.set(O,vt))}function Gt(O,dt){const vt=l.get(dt).get(O);c.get(dt)!==vt&&(n.uniformBlockBinding(dt,vt,O.__bindingPointIndex),c.set(dt,vt))}function ee(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},pt=null,wt={},d={},m=new WeakMap,g=[],v=null,_=!1,h=null,x=null,S=null,E=null,L=null,A=null,w=null,p=new Ut(0,0,0),M=0,T=!1,C=null,P=null,D=null,H=null,N=null,ft.set(0,0,n.canvas.width,n.canvas.height),bt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ht,disable:Bt,bindFramebuffer:Wt,drawBuffers:kt,useProgram:ye,setBlending:ue,setMaterial:Vt,setFlipSided:Pe,setCullFace:be,setLineWidth:Ke,setPolygonOffset:F,setScissorTest:Ie,activeTexture:jt,bindTexture:de,unbindTexture:xt,compressedTexImage2D:ge,compressedTexImage3D:R,texImage2D:$,texImage3D:tt,pixelStorei:_t,getParameter:rt,updateUBOMapping:Ot,uniformBlockBinding:Gt,texStorage2D:V,texStorage3D:it,texSubImage2D:b,texSubImage3D:G,compressedTexSubImage2D:I,compressedTexSubImage3D:q,scissor:ut,viewport:lt,reset:ee}}function ux(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Nt,u=new WeakMap,f=new Set;let d;const m=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,b){return g?new OffscreenCanvas(R,b):_o("canvas")}function _(R,b,G){let I=1;const q=ge(R);if((q.width>G||q.height>G)&&(I=G/Math.max(q.width,q.height)),I<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const V=Math.floor(I*q.width),it=Math.floor(I*q.height);d===void 0&&(d=v(V,it));const $=b?v(V,it):d;return $.width=V,$.height=it,$.getContext("2d").drawImage(R,0,0,V,it),zt("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+V+"x"+it+")."),$}else return"data"in R&&zt("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),R;return R}function h(R){return R.generateMipmaps}function x(R){n.generateMipmap(R)}function S(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(R,b,G,I,q,V=!1){if(R!==null){if(n[R]!==void 0)return n[R];zt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let it;I&&(it=t.get("EXT_texture_norm16"),it||zt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=b;if(b===n.RED&&(G===n.FLOAT&&($=n.R32F),G===n.HALF_FLOAT&&($=n.R16F),G===n.UNSIGNED_BYTE&&($=n.R8),G===n.UNSIGNED_SHORT&&it&&($=it.R16_EXT),G===n.SHORT&&it&&($=it.R16_SNORM_EXT)),b===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&($=n.R8UI),G===n.UNSIGNED_SHORT&&($=n.R16UI),G===n.UNSIGNED_INT&&($=n.R32UI),G===n.BYTE&&($=n.R8I),G===n.SHORT&&($=n.R16I),G===n.INT&&($=n.R32I)),b===n.RG&&(G===n.FLOAT&&($=n.RG32F),G===n.HALF_FLOAT&&($=n.RG16F),G===n.UNSIGNED_BYTE&&($=n.RG8),G===n.UNSIGNED_SHORT&&it&&($=it.RG16_EXT),G===n.SHORT&&it&&($=it.RG16_SNORM_EXT)),b===n.RG_INTEGER&&(G===n.UNSIGNED_BYTE&&($=n.RG8UI),G===n.UNSIGNED_SHORT&&($=n.RG16UI),G===n.UNSIGNED_INT&&($=n.RG32UI),G===n.BYTE&&($=n.RG8I),G===n.SHORT&&($=n.RG16I),G===n.INT&&($=n.RG32I)),b===n.RGB_INTEGER&&(G===n.UNSIGNED_BYTE&&($=n.RGB8UI),G===n.UNSIGNED_SHORT&&($=n.RGB16UI),G===n.UNSIGNED_INT&&($=n.RGB32UI),G===n.BYTE&&($=n.RGB8I),G===n.SHORT&&($=n.RGB16I),G===n.INT&&($=n.RGB32I)),b===n.RGBA_INTEGER&&(G===n.UNSIGNED_BYTE&&($=n.RGBA8UI),G===n.UNSIGNED_SHORT&&($=n.RGBA16UI),G===n.UNSIGNED_INT&&($=n.RGBA32UI),G===n.BYTE&&($=n.RGBA8I),G===n.SHORT&&($=n.RGBA16I),G===n.INT&&($=n.RGBA32I)),b===n.RGB&&(G===n.UNSIGNED_SHORT&&it&&($=it.RGB16_EXT),G===n.SHORT&&it&&($=it.RGB16_SNORM_EXT),G===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),G===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),b===n.RGBA){const tt=V?go:ie.getTransfer(q);G===n.FLOAT&&($=n.RGBA32F),G===n.HALF_FLOAT&&($=n.RGBA16F),G===n.UNSIGNED_BYTE&&($=tt===he?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT&&it&&($=it.RGBA16_EXT),G===n.SHORT&&it&&($=it.RGBA16_SNORM_EXT),G===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function L(R,b){let G;return R?b===null||b===Xn||b===rr?G=n.DEPTH24_STENCIL8:b===Dn?G=n.DEPTH32F_STENCIL8:b===sr&&(G=n.DEPTH24_STENCIL8,zt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Xn||b===rr?G=n.DEPTH_COMPONENT24:b===Dn?G=n.DEPTH_COMPONENT32F:b===sr&&(G=n.DEPTH_COMPONENT16),G}function A(R,b){return h(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ye&&R.minFilter!==en?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function w(R){const b=R.target;b.removeEventListener("dispose",w),M(b),b.isVideoTexture&&u.delete(b),b.isHTMLTexture&&f.delete(b)}function p(R){const b=R.target;b.removeEventListener("dispose",p),C(b)}function M(R){const b=i.get(R);if(b.__webglInit===void 0)return;const G=R.source,I=m.get(G);if(I){const q=I[b.__cacheKey];q.usedTimes--,q.usedTimes===0&&T(R),Object.keys(I).length===0&&m.delete(G)}i.remove(R)}function T(R){const b=i.get(R);n.deleteTexture(b.__webglTexture);const G=R.source,I=m.get(G);delete I[b.__cacheKey],o.memory.textures--}function C(R){const b=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let I=0;I<6;I++){if(Array.isArray(b.__webglFramebuffer[I]))for(let q=0;q<b.__webglFramebuffer[I].length;q++)n.deleteFramebuffer(b.__webglFramebuffer[I][q]);else n.deleteFramebuffer(b.__webglFramebuffer[I]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[I])}else{if(Array.isArray(b.__webglFramebuffer))for(let I=0;I<b.__webglFramebuffer.length;I++)n.deleteFramebuffer(b.__webglFramebuffer[I]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let I=0;I<b.__webglColorRenderbuffer.length;I++)b.__webglColorRenderbuffer[I]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[I]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const G=R.textures;for(let I=0,q=G.length;I<q;I++){const V=i.get(G[I]);V.__webglTexture&&(n.deleteTexture(V.__webglTexture),o.memory.textures--),i.remove(G[I])}i.remove(R)}let P=0;function D(){P=0}function H(){return P}function N(R){P=R}function k(){const R=P;return R>=s.maxTextures&&zt("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),P+=1,R}function B(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function J(R,b){const G=i.get(R);if(R.isVideoTexture&&de(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&G.__version!==R.version){const I=R.image;if(I===null)zt("WebGLRenderer: Texture marked for update but no image data found.");else if(I.complete===!1)zt("WebGLRenderer: Texture marked for update but image is incomplete");else{Bt(G,R,b);return}}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+b)}function ot(R,b){const G=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){Bt(G,R,b);return}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+b)}function pt(R,b){const G=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){Bt(G,R,b);return}e.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+b)}function wt(R,b){const G=i.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&G.__version!==R.version){Wt(G,R,b);return}e.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+b)}const Ct={[ir]:n.REPEAT,[ei]:n.CLAMP_TO_EDGE,[Ga]:n.MIRRORED_REPEAT},ct={[Ye]:n.NEAREST,[ff]:n.NEAREST_MIPMAP_NEAREST,[Mr]:n.NEAREST_MIPMAP_LINEAR,[en]:n.LINEAR,[ko]:n.LINEAR_MIPMAP_NEAREST,[Bi]:n.LINEAR_MIPMAP_LINEAR},ft={[gf]:n.NEVER,[bf]:n.ALWAYS,[_f]:n.LESS,[Bl]:n.LEQUAL,[xf]:n.EQUAL,[kl]:n.GEQUAL,[vf]:n.GREATER,[Mf]:n.NOTEQUAL};function bt(R,b){if(b.type===Dn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===en||b.magFilter===ko||b.magFilter===Mr||b.magFilter===Bi||b.minFilter===en||b.minFilter===ko||b.minFilter===Mr||b.minFilter===Bi)&&zt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,Ct[b.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,Ct[b.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,Ct[b.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,ct[b.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,ct[b.minFilter]),b.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,ft[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ye||b.minFilter!==Mr&&b.minFilter!==Bi||b.type===Dn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");n.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function Q(R,b){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",w));const I=b.source;let q=m.get(I);q===void 0&&(q={},m.set(I,q));const V=B(b);if(V!==R.__cacheKey){q[V]===void 0&&(q[V]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,G=!0),q[V].usedTimes++;const it=q[R.__cacheKey];it!==void 0&&(q[R.__cacheKey].usedTimes--,it.usedTimes===0&&T(b)),R.__cacheKey=V,R.__webglTexture=q[V].texture}return G}function St(R,b,G){return Math.floor(Math.floor(R/G)/b)}function ht(R,b,G,I){const V=R.updateRanges;if(V.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,G,I,b.data);else{V.sort((_t,ut)=>_t.start-ut.start);let it=0;for(let _t=1;_t<V.length;_t++){const ut=V[it],lt=V[_t],Ot=ut.start+ut.count,Gt=St(lt.start,b.width,4),ee=St(ut.start,b.width,4);lt.start<=Ot+1&&Gt===ee&&St(lt.start+lt.count-1,b.width,4)===Gt?ut.count=Math.max(ut.count,lt.start+lt.count-ut.start):(++it,V[it]=lt)}V.length=it+1;const $=e.getParameter(n.UNPACK_ROW_LENGTH),tt=e.getParameter(n.UNPACK_SKIP_PIXELS),rt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let _t=0,ut=V.length;_t<ut;_t++){const lt=V[_t],Ot=Math.floor(lt.start/4),Gt=Math.ceil(lt.count/4),ee=Ot%b.width,O=Math.floor(Ot/b.width),dt=Gt,et=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,ee),e.pixelStorei(n.UNPACK_SKIP_ROWS,O),e.texSubImage2D(n.TEXTURE_2D,0,ee,O,dt,et,G,I,b.data)}R.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,$),e.pixelStorei(n.UNPACK_SKIP_PIXELS,tt),e.pixelStorei(n.UNPACK_SKIP_ROWS,rt)}}function Bt(R,b,G){let I=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(I=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(I=n.TEXTURE_3D);const q=Q(R,b),V=b.source;e.bindTexture(I,R.__webglTexture,n.TEXTURE0+G);const it=i.get(V);if(V.version!==it.__version||q===!0){if(e.activeTexture(n.TEXTURE0+G),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const et=ie.getPrimaries(ie.workingColorSpace),vt=b.colorSpace===Si?null:ie.getPrimaries(b.colorSpace),at=b.colorSpace===Si||et===vt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,at)}e.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment);let tt=_(b.image,!1,s.maxTextureSize);tt=xt(b,tt);const rt=r.convert(b.format,b.colorSpace),_t=r.convert(b.type);let ut=E(b.internalFormat,rt,_t,b.normalized,b.colorSpace,b.isVideoTexture);bt(I,b);let lt;const Ot=b.mipmaps,Gt=b.isVideoTexture!==!0,ee=it.__version===void 0||q===!0,O=V.dataReady,dt=A(b,tt);if(b.isDepthTexture)ut=L(b.format===ki,b.type),ee&&(Gt?e.texStorage2D(n.TEXTURE_2D,1,ut,tt.width,tt.height):e.texImage2D(n.TEXTURE_2D,0,ut,tt.width,tt.height,0,rt,_t,null));else if(b.isDataTexture)if(Ot.length>0){Gt&&ee&&e.texStorage2D(n.TEXTURE_2D,dt,ut,Ot[0].width,Ot[0].height);for(let et=0,vt=Ot.length;et<vt;et++)lt=Ot[et],Gt?O&&e.texSubImage2D(n.TEXTURE_2D,et,0,0,lt.width,lt.height,rt,_t,lt.data):e.texImage2D(n.TEXTURE_2D,et,ut,lt.width,lt.height,0,rt,_t,lt.data);b.generateMipmaps=!1}else Gt?(ee&&e.texStorage2D(n.TEXTURE_2D,dt,ut,tt.width,tt.height),O&&ht(b,tt,rt,_t)):e.texImage2D(n.TEXTURE_2D,0,ut,tt.width,tt.height,0,rt,_t,tt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Gt&&ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,ut,Ot[0].width,Ot[0].height,tt.depth);for(let et=0,vt=Ot.length;et<vt;et++)if(lt=Ot[et],b.format!==In)if(rt!==null)if(Gt){if(O)if(b.layerUpdates.size>0){const at=du(lt.width,lt.height,b.format,b.type);for(const K of b.layerUpdates){const gt=lt.data.subarray(K*at/lt.data.BYTES_PER_ELEMENT,(K+1)*at/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,et,0,0,K,lt.width,lt.height,1,rt,gt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,et,0,0,0,lt.width,lt.height,tt.depth,rt,lt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,et,ut,lt.width,lt.height,tt.depth,0,lt.data,0,0);else zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?O&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,et,0,0,0,lt.width,lt.height,tt.depth,rt,_t,lt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,et,ut,lt.width,lt.height,tt.depth,0,rt,_t,lt.data)}else{Gt&&ee&&e.texStorage2D(n.TEXTURE_2D,dt,ut,Ot[0].width,Ot[0].height);for(let et=0,vt=Ot.length;et<vt;et++)lt=Ot[et],b.format!==In?rt!==null?Gt?O&&e.compressedTexSubImage2D(n.TEXTURE_2D,et,0,0,lt.width,lt.height,rt,lt.data):e.compressedTexImage2D(n.TEXTURE_2D,et,ut,lt.width,lt.height,0,lt.data):zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?O&&e.texSubImage2D(n.TEXTURE_2D,et,0,0,lt.width,lt.height,rt,_t,lt.data):e.texImage2D(n.TEXTURE_2D,et,ut,lt.width,lt.height,0,rt,_t,lt.data)}else if(b.isDataArrayTexture)if(Gt){if(ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,ut,tt.width,tt.height,tt.depth),O)if(b.layerUpdates.size>0){const et=du(tt.width,tt.height,b.format,b.type);for(const vt of b.layerUpdates){const at=tt.data.subarray(vt*et/tt.data.BYTES_PER_ELEMENT,(vt+1)*et/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,vt,tt.width,tt.height,1,rt,_t,at)}b.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,rt,_t,tt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,ut,tt.width,tt.height,tt.depth,0,rt,_t,tt.data);else if(b.isData3DTexture)Gt?(ee&&e.texStorage3D(n.TEXTURE_3D,dt,ut,tt.width,tt.height,tt.depth),O&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,rt,_t,tt.data)):e.texImage3D(n.TEXTURE_3D,0,ut,tt.width,tt.height,tt.depth,0,rt,_t,tt.data);else if(b.isFramebufferTexture){if(ee)if(Gt)e.texStorage2D(n.TEXTURE_2D,dt,ut,tt.width,tt.height);else{let et=tt.width,vt=tt.height;for(let at=0;at<dt;at++)e.texImage2D(n.TEXTURE_2D,at,ut,et,vt,0,rt,_t,null),et>>=1,vt>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in n){const et=n.canvas;if(et.hasAttribute("layoutsubtree")||et.setAttribute("layoutsubtree","true"),tt.parentNode!==et){et.appendChild(tt),f.add(b),et.onpaint=Ft=>{const Ee=Ft.changedElements;for(const oe of f)Ee.includes(oe.image)&&(oe.needsUpdate=!0)},et.requestPaint();return}const vt=0,at=n.RGBA,K=n.RGBA,gt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,vt,at,K,gt,tt),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ot.length>0){if(Gt&&ee){const et=ge(Ot[0]);e.texStorage2D(n.TEXTURE_2D,dt,ut,et.width,et.height)}for(let et=0,vt=Ot.length;et<vt;et++)lt=Ot[et],Gt?O&&e.texSubImage2D(n.TEXTURE_2D,et,0,0,rt,_t,lt):e.texImage2D(n.TEXTURE_2D,et,ut,rt,_t,lt);b.generateMipmaps=!1}else if(Gt){if(ee){const et=ge(tt);e.texStorage2D(n.TEXTURE_2D,dt,ut,et.width,et.height)}O&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,rt,_t,tt)}else e.texImage2D(n.TEXTURE_2D,0,ut,rt,_t,tt);h(b)&&x(I),it.__version=V.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function Wt(R,b,G){if(b.image.length!==6)return;const I=Q(R,b),q=b.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+G);const V=i.get(q);if(q.version!==V.__version||I===!0){e.activeTexture(n.TEXTURE0+G);const it=ie.getPrimaries(ie.workingColorSpace),$=b.colorSpace===Si?null:ie.getPrimaries(b.colorSpace),tt=b.colorSpace===Si||it===$?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);const rt=b.isCompressedTexture||b.image[0].isCompressedTexture,_t=b.image[0]&&b.image[0].isDataTexture,ut=[];for(let K=0;K<6;K++)!rt&&!_t?ut[K]=_(b.image[K],!0,s.maxCubemapSize):ut[K]=_t?b.image[K].image:b.image[K],ut[K]=xt(b,ut[K]);const lt=ut[0],Ot=r.convert(b.format,b.colorSpace),Gt=r.convert(b.type),ee=E(b.internalFormat,Ot,Gt,b.normalized,b.colorSpace),O=b.isVideoTexture!==!0,dt=V.__version===void 0||I===!0,et=q.dataReady;let vt=A(b,lt);bt(n.TEXTURE_CUBE_MAP,b);let at;if(rt){O&&dt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,vt,ee,lt.width,lt.height);for(let K=0;K<6;K++){at=ut[K].mipmaps;for(let gt=0;gt<at.length;gt++){const Ft=at[gt];b.format!==In?Ot!==null?O?et&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,0,0,Ft.width,Ft.height,Ot,Ft.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,ee,Ft.width,Ft.height,0,Ft.data):zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,0,0,Ft.width,Ft.height,Ot,Gt,Ft.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,ee,Ft.width,Ft.height,0,Ot,Gt,Ft.data)}}}else{if(at=b.mipmaps,O&&dt){at.length>0&&vt++;const K=ge(ut[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,vt,ee,K.width,K.height)}for(let K=0;K<6;K++)if(_t){O?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ut[K].width,ut[K].height,Ot,Gt,ut[K].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,ee,ut[K].width,ut[K].height,0,Ot,Gt,ut[K].data);for(let gt=0;gt<at.length;gt++){const Ee=at[gt].image[K].image;O?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,0,0,Ee.width,Ee.height,Ot,Gt,Ee.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,ee,Ee.width,Ee.height,0,Ot,Gt,Ee.data)}}else{O?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ot,Gt,ut[K]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,ee,Ot,Gt,ut[K]);for(let gt=0;gt<at.length;gt++){const Ft=at[gt];O?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,0,0,Ot,Gt,Ft.image[K]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,ee,Ot,Gt,Ft.image[K])}}}h(b)&&x(n.TEXTURE_CUBE_MAP),V.__version=q.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function kt(R,b,G,I,q,V){const it=r.convert(G.format,G.colorSpace),$=r.convert(G.type),tt=E(G.internalFormat,it,$,G.normalized,G.colorSpace),rt=i.get(b),_t=i.get(G);if(_t.__renderTarget=b,!rt.__hasExternalTextures){const ut=Math.max(1,b.width>>V),lt=Math.max(1,b.height>>V);q===n.TEXTURE_3D||q===n.TEXTURE_2D_ARRAY?e.texImage3D(q,V,tt,ut,lt,b.depth,0,it,$,null):e.texImage2D(q,V,tt,ut,lt,0,it,$,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),jt(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,I,q,_t.__webglTexture,0,Ie(b)):(q===n.TEXTURE_2D||q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,I,q,_t.__webglTexture,V),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ye(R,b,G){if(n.bindRenderbuffer(n.RENDERBUFFER,R),b.depthBuffer){const I=b.depthTexture,q=I&&I.isDepthTexture?I.type:null,V=L(b.stencilBuffer,q),it=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;jt(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ie(b),V,b.width,b.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ie(b),V,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,V,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,R)}else{const I=b.textures;for(let q=0;q<I.length;q++){const V=I[q],it=r.convert(V.format,V.colorSpace),$=r.convert(V.type),tt=E(V.internalFormat,it,$,V.normalized,V.colorSpace);jt(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ie(b),tt,b.width,b.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ie(b),tt,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,tt,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Jt(R,b,G){const I=b.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=i.get(b.depthTexture);if(q.__renderTarget=b,(!q.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),I){if(q.__webglInit===void 0&&(q.__webglInit=!0,b.depthTexture.addEventListener("dispose",w)),q.__webglTexture===void 0){q.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),bt(n.TEXTURE_CUBE_MAP,b.depthTexture);const rt=r.convert(b.depthTexture.format),_t=r.convert(b.depthTexture.type);let ut;b.depthTexture.format===ai?ut=n.DEPTH_COMPONENT24:b.depthTexture.format===ki&&(ut=n.DEPTH24_STENCIL8);for(let lt=0;lt<6;lt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,ut,b.width,b.height,0,rt,_t,null)}}else J(b.depthTexture,0);const V=q.__webglTexture,it=Ie(b),$=I?n.TEXTURE_CUBE_MAP_POSITIVE_X+G:n.TEXTURE_2D,tt=b.depthTexture.format===ki?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(b.depthTexture.format===ai)jt(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,tt,$,V,0,it):n.framebufferTexture2D(n.FRAMEBUFFER,tt,$,V,0);else if(b.depthTexture.format===ki)jt(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,tt,$,V,0,it):n.framebufferTexture2D(n.FRAMEBUFFER,tt,$,V,0);else throw new Error("Unknown depthTexture format")}function ce(R){const b=i.get(R),G=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const I=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),I){const q=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,I.removeEventListener("dispose",q)};I.addEventListener("dispose",q),b.__depthDisposeCallback=q}b.__boundDepthTexture=I}if(R.depthTexture&&!b.__autoAllocateDepthBuffer)if(G)for(let I=0;I<6;I++)Jt(b.__webglFramebuffer[I],R,I);else{const I=R.texture.mipmaps;I&&I.length>0?Jt(b.__webglFramebuffer[0],R,0):Jt(b.__webglFramebuffer,R,0)}else if(G){b.__webglDepthbuffer=[];for(let I=0;I<6;I++)if(e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[I]),b.__webglDepthbuffer[I]===void 0)b.__webglDepthbuffer[I]=n.createRenderbuffer(),ye(b.__webglDepthbuffer[I],R,!1);else{const q=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,V=b.__webglDepthbuffer[I];n.bindRenderbuffer(n.RENDERBUFFER,V),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,V)}}else{const I=R.texture.mipmaps;if(I&&I.length>0?e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),ye(b.__webglDepthbuffer,R,!1);else{const q=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,V=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,V),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,V)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function ue(R,b,G){const I=i.get(R);b!==void 0&&kt(I.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&ce(R)}function Vt(R){const b=R.texture,G=i.get(R),I=i.get(b);R.addEventListener("dispose",p);const q=R.textures,V=R.isWebGLCubeRenderTarget===!0,it=q.length>1;if(it||(I.__webglTexture===void 0&&(I.__webglTexture=n.createTexture()),I.__version=b.version,o.memory.textures++),V){G.__webglFramebuffer=[];for(let $=0;$<6;$++)if(b.mipmaps&&b.mipmaps.length>0){G.__webglFramebuffer[$]=[];for(let tt=0;tt<b.mipmaps.length;tt++)G.__webglFramebuffer[$][tt]=n.createFramebuffer()}else G.__webglFramebuffer[$]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){G.__webglFramebuffer=[];for(let $=0;$<b.mipmaps.length;$++)G.__webglFramebuffer[$]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(it)for(let $=0,tt=q.length;$<tt;$++){const rt=i.get(q[$]);rt.__webglTexture===void 0&&(rt.__webglTexture=n.createTexture(),o.memory.textures++)}if(R.samples>0&&jt(R)===!1){G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let $=0;$<q.length;$++){const tt=q[$];G.__webglColorRenderbuffer[$]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[$]);const rt=r.convert(tt.format,tt.colorSpace),_t=r.convert(tt.type),ut=E(tt.internalFormat,rt,_t,tt.normalized,tt.colorSpace,R.isXRRenderTarget===!0),lt=Ie(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,lt,ut,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+$,n.RENDERBUFFER,G.__webglColorRenderbuffer[$])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),ye(G.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(V){e.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture),bt(n.TEXTURE_CUBE_MAP,b);for(let $=0;$<6;$++)if(b.mipmaps&&b.mipmaps.length>0)for(let tt=0;tt<b.mipmaps.length;tt++)kt(G.__webglFramebuffer[$][tt],R,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,tt);else kt(G.__webglFramebuffer[$],R,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);h(b)&&x(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(it){for(let $=0,tt=q.length;$<tt;$++){const rt=q[$],_t=i.get(rt);let ut=n.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ut=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ut,_t.__webglTexture),bt(ut,rt),kt(G.__webglFramebuffer,R,rt,n.COLOR_ATTACHMENT0+$,ut,0),h(rt)&&x(ut)}e.unbindTexture()}else{let $=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&($=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture($,I.__webglTexture),bt($,b),b.mipmaps&&b.mipmaps.length>0)for(let tt=0;tt<b.mipmaps.length;tt++)kt(G.__webglFramebuffer[tt],R,b,n.COLOR_ATTACHMENT0,$,tt);else kt(G.__webglFramebuffer,R,b,n.COLOR_ATTACHMENT0,$,0);h(b)&&x($),e.unbindTexture()}R.depthBuffer&&ce(R)}function Pe(R){const b=R.textures;for(let G=0,I=b.length;G<I;G++){const q=b[G];if(h(q)){const V=S(R),it=i.get(q).__webglTexture;e.bindTexture(V,it),x(V),e.unbindTexture()}}}const be=[],Ke=[];function F(R){if(R.samples>0){if(jt(R)===!1){const b=R.textures,G=R.width,I=R.height;let q=n.COLOR_BUFFER_BIT;const V=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,it=i.get(R),$=b.length>1;if($)for(let rt=0;rt<b.length;rt++)e.bindFramebuffer(n.FRAMEBUFFER,it.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+rt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,it.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+rt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,it.__webglMultisampledFramebuffer);const tt=R.texture.mipmaps;tt&&tt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,it.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,it.__webglFramebuffer);for(let rt=0;rt<b.length;rt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(q|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(q|=n.STENCIL_BUFFER_BIT)),$){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,it.__webglColorRenderbuffer[rt]);const _t=i.get(b[rt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,_t,0)}n.blitFramebuffer(0,0,G,I,0,0,G,I,q,n.NEAREST),c===!0&&(be.length=0,Ke.length=0,be.push(n.COLOR_ATTACHMENT0+rt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(be.push(V),Ke.push(V),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ke)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,be))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),$)for(let rt=0;rt<b.length;rt++){e.bindFramebuffer(n.FRAMEBUFFER,it.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+rt,n.RENDERBUFFER,it.__webglColorRenderbuffer[rt]);const _t=i.get(b[rt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,it.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+rt,n.TEXTURE_2D,_t,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,it.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const b=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function Ie(R){return Math.min(s.maxSamples,R.samples)}function jt(R){const b=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function de(R){const b=o.render.frame;u.get(R)!==b&&(u.set(R,b),R.update())}function xt(R,b){const G=R.colorSpace,I=R.format,q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==mo&&G!==Si&&(ie.getTransfer(G)===he?(I!==In||q!==_n)&&zt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):se("WebGLTextures: Unsupported texture color space:",G)),b}function ge(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=D,this.getTextureUnits=H,this.setTextureUnits=N,this.setTexture2D=J,this.setTexture2DArray=ot,this.setTexture3D=pt,this.setTextureCube=wt,this.rebindTextures=ue,this.setupRenderTarget=Vt,this.updateRenderTargetMipmap=Pe,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=ce,this.setupFrameBufferTexture=kt,this.useMultisampledRTT=jt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function dx(n,t){function e(i,s=Si){let r;const o=ie.getTransfer(s);if(i===_n)return n.UNSIGNED_BYTE;if(i===Il)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Nl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Cd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Pd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ad)return n.BYTE;if(i===Rd)return n.SHORT;if(i===sr)return n.UNSIGNED_SHORT;if(i===Dl)return n.INT;if(i===Xn)return n.UNSIGNED_INT;if(i===Dn)return n.FLOAT;if(i===oi)return n.HALF_FLOAT;if(i===Ld)return n.ALPHA;if(i===Dd)return n.RGB;if(i===In)return n.RGBA;if(i===ai)return n.DEPTH_COMPONENT;if(i===ki)return n.DEPTH_STENCIL;if(i===Ul)return n.RED;if(i===Ol)return n.RED_INTEGER;if(i===Xi)return n.RG;if(i===Fl)return n.RG_INTEGER;if(i===zl)return n.RGBA_INTEGER;if(i===io||i===so||i===ro||i===oo)if(o===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===io)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===so)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===io)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===so)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ro)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===oo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ha||i===Va||i===Wa||i===Xa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ha)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Va)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Wa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Xa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===$a||i===qa||i===Ya||i===ja||i===Ka||i===ho||i===Za)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===$a||i===qa)return o===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ya)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===ja)return r.COMPRESSED_R11_EAC;if(i===Ka)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ho)return r.COMPRESSED_RG11_EAC;if(i===Za)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ja||i===Qa||i===tl||i===el||i===nl||i===il||i===sl||i===rl||i===ol||i===al||i===ll||i===cl||i===ul||i===dl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ja)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Qa)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===tl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===el)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===nl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===il)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===sl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===rl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ol)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===al)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ll)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===cl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ul)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===dl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===hl||i===fl||i===pl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===hl)return o===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===fl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===pl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ml||i===gl||i===fo||i===_l)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===ml)return r.COMPRESSED_RED_RGTC1_EXT;if(i===gl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===fo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===_l)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===rr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const hx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fx=`
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

}`;class px{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Hd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new qn({vertexShader:hx,fragmentShader:fx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Xt(new ws(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class mx extends Ci{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,d=null,m=null,g=null;const v=typeof XRWebGLBinding<"u",_=new px,h={},x=e.getContextAttributes();let S=null,E=null;const L=[],A=[],w=new Nt;let p=null;const M=new dn;M.viewport=new Oe;const T=new dn;T.viewport=new Oe;const C=[M,T],P=new Ep;let D=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let St=L[Q];return St===void 0&&(St=new $o,L[Q]=St),St.getTargetRaySpace()},this.getControllerGrip=function(Q){let St=L[Q];return St===void 0&&(St=new $o,L[Q]=St),St.getGripSpace()},this.getHand=function(Q){let St=L[Q];return St===void 0&&(St=new $o,L[Q]=St),St.getHandSpace()};function N(Q){const St=A.indexOf(Q.inputSource);if(St===-1)return;const ht=L[St];ht!==void 0&&(ht.update(Q.inputSource,Q.frame,l||o),ht.dispatchEvent({type:Q.type,data:Q.inputSource}))}function k(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",B);for(let Q=0;Q<L.length;Q++){const St=A[Q];St!==null&&(A[Q]=null,L[Q].disconnect(St))}D=null,H=null,_.reset();for(const Q in h)delete h[Q];t.setRenderTarget(S),m=null,d=null,f=null,s=null,E=null,bt.stop(),i.isPresenting=!1,t.setPixelRatio(p),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,i.isPresenting===!0&&zt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,i.isPresenting===!0&&zt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(S=t.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",k),s.addEventListener("inputsourceschange",B),x.xrCompatible!==!0&&await e.makeXRCompatible(),p=t.getPixelRatio(),t.getSize(w),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ht=null,Bt=null,Wt=null;x.depth&&(Wt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=x.stencil?ki:ai,Bt=x.stencil?rr:Xn);const kt={colorFormat:e.RGBA8,depthFormat:Wt,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(kt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),E=new Wn(d.textureWidth,d.textureHeight,{format:In,type:_n,depthTexture:new Ts(d.textureWidth,d.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ht={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,ht),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new Wn(m.framebufferWidth,m.framebufferHeight,{format:In,type:_n,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),bt.setContext(s),bt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function B(Q){for(let St=0;St<Q.removed.length;St++){const ht=Q.removed[St],Bt=A.indexOf(ht);Bt>=0&&(A[Bt]=null,L[Bt].disconnect(ht))}for(let St=0;St<Q.added.length;St++){const ht=Q.added[St];let Bt=A.indexOf(ht);if(Bt===-1){for(let kt=0;kt<L.length;kt++)if(kt>=A.length){A.push(ht),Bt=kt;break}else if(A[kt]===null){A[kt]=ht,Bt=kt;break}if(Bt===-1)break}const Wt=L[Bt];Wt&&Wt.connect(ht)}}const J=new U,ot=new U;function pt(Q,St,ht){J.setFromMatrixPosition(St.matrixWorld),ot.setFromMatrixPosition(ht.matrixWorld);const Bt=J.distanceTo(ot),Wt=St.projectionMatrix.elements,kt=ht.projectionMatrix.elements,ye=Wt[14]/(Wt[10]-1),Jt=Wt[14]/(Wt[10]+1),ce=(Wt[9]+1)/Wt[5],ue=(Wt[9]-1)/Wt[5],Vt=(Wt[8]-1)/Wt[0],Pe=(kt[8]+1)/kt[0],be=ye*Vt,Ke=ye*Pe,F=Bt/(-Vt+Pe),Ie=F*-Vt;if(St.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Ie),Q.translateZ(F),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Wt[10]===-1)Q.projectionMatrix.copy(St.projectionMatrix),Q.projectionMatrixInverse.copy(St.projectionMatrixInverse);else{const jt=ye+F,de=Jt+F,xt=be-Ie,ge=Ke+(Bt-Ie),R=ce*Jt/de*jt,b=ue*Jt/de*jt;Q.projectionMatrix.makePerspective(xt,ge,R,b,jt,de),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function wt(Q,St){St===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(St.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let St=Q.near,ht=Q.far;_.texture!==null&&(_.depthNear>0&&(St=_.depthNear),_.depthFar>0&&(ht=_.depthFar)),P.near=T.near=M.near=St,P.far=T.far=M.far=ht,(D!==P.near||H!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),D=P.near,H=P.far),P.layers.mask=Q.layers.mask|6,M.layers.mask=P.layers.mask&-5,T.layers.mask=P.layers.mask&-3;const Bt=Q.parent,Wt=P.cameras;wt(P,Bt);for(let kt=0;kt<Wt.length;kt++)wt(Wt[kt],Bt);Wt.length===2?pt(P,M,T):P.projectionMatrix.copy(M.projectionMatrix),Ct(Q,P,Bt)};function Ct(Q,St,ht){ht===null?Q.matrix.copy(St.matrixWorld):(Q.matrix.copy(ht.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(St.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(St.projectionMatrix),Q.projectionMatrixInverse.copy(St.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=ar*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(Q){c=Q,d!==null&&(d.fixedFoveation=Q),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(P)},this.getCameraTexture=function(Q){return h[Q]};let ct=null;function ft(Q,St){if(u=St.getViewerPose(l||o),g=St,u!==null){const ht=u.views;m!==null&&(t.setRenderTargetFramebuffer(E,m.framebuffer),t.setRenderTarget(E));let Bt=!1;ht.length!==P.cameras.length&&(P.cameras.length=0,Bt=!0);for(let Jt=0;Jt<ht.length;Jt++){const ce=ht[Jt];let ue=null;if(m!==null)ue=m.getViewport(ce);else{const Pe=f.getViewSubImage(d,ce);ue=Pe.viewport,Jt===0&&(t.setRenderTargetTextures(E,Pe.colorTexture,Pe.depthStencilTexture),t.setRenderTarget(E))}let Vt=C[Jt];Vt===void 0&&(Vt=new dn,Vt.layers.enable(Jt),Vt.viewport=new Oe,C[Jt]=Vt),Vt.matrix.fromArray(ce.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(ce.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(ue.x,ue.y,ue.width,ue.height),Jt===0&&(P.matrix.copy(Vt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Bt===!0&&P.cameras.push(Vt)}const Wt=s.enabledFeatures;if(Wt&&Wt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){f=i.getBinding();const Jt=f.getDepthInformation(ht[0]);Jt&&Jt.isValid&&Jt.texture&&_.init(Jt,s.renderState)}if(Wt&&Wt.includes("camera-access")&&v){t.state.unbindTexture(),f=i.getBinding();for(let Jt=0;Jt<ht.length;Jt++){const ce=ht[Jt].camera;if(ce){let ue=h[ce];ue||(ue=new Hd,h[ce]=ue);const Vt=f.getCameraImage(ce);ue.sourceTexture=Vt}}}}for(let ht=0;ht<L.length;ht++){const Bt=A[ht],Wt=L[ht];Bt!==null&&Wt!==void 0&&Wt.update(Bt,St,l||o)}ct&&ct(Q,St),St.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:St}),g=null}const bt=new Kd;bt.setAnimationLoop(ft),this.setAnimationLoop=function(Q){ct=Q},this.dispose=function(){}}}const gx=new me,ih=new $t;ih.set(-1,0,0,0,1,0,0,0,1);function _x(n,t){function e(_,h){_.matrixAutoUpdate===!0&&_.updateMatrix(),h.value.copy(_.matrix)}function i(_,h){h.color.getRGB(_.fogColor.value,Vd(n)),h.isFog?(_.fogNear.value=h.near,_.fogFar.value=h.far):h.isFogExp2&&(_.fogDensity.value=h.density)}function s(_,h,x,S,E){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(_,h):h.isMeshLambertMaterial?(r(_,h),h.envMap&&(_.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(_,h),f(_,h)):h.isMeshPhongMaterial?(r(_,h),u(_,h),h.envMap&&(_.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(_,h),d(_,h),h.isMeshPhysicalMaterial&&m(_,h,E)):h.isMeshMatcapMaterial?(r(_,h),g(_,h)):h.isMeshDepthMaterial?r(_,h):h.isMeshDistanceMaterial?(r(_,h),v(_,h)):h.isMeshNormalMaterial?r(_,h):h.isLineBasicMaterial?(o(_,h),h.isLineDashedMaterial&&a(_,h)):h.isPointsMaterial?c(_,h,x,S):h.isSpriteMaterial?l(_,h):h.isShadowMaterial?(_.color.value.copy(h.color),_.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(_,h){_.opacity.value=h.opacity,h.color&&_.diffuse.value.copy(h.color),h.emissive&&_.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(_.map.value=h.map,e(h.map,_.mapTransform)),h.alphaMap&&(_.alphaMap.value=h.alphaMap,e(h.alphaMap,_.alphaMapTransform)),h.bumpMap&&(_.bumpMap.value=h.bumpMap,e(h.bumpMap,_.bumpMapTransform),_.bumpScale.value=h.bumpScale,h.side===cn&&(_.bumpScale.value*=-1)),h.normalMap&&(_.normalMap.value=h.normalMap,e(h.normalMap,_.normalMapTransform),_.normalScale.value.copy(h.normalScale),h.side===cn&&_.normalScale.value.negate()),h.displacementMap&&(_.displacementMap.value=h.displacementMap,e(h.displacementMap,_.displacementMapTransform),_.displacementScale.value=h.displacementScale,_.displacementBias.value=h.displacementBias),h.emissiveMap&&(_.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,_.emissiveMapTransform)),h.specularMap&&(_.specularMap.value=h.specularMap,e(h.specularMap,_.specularMapTransform)),h.alphaTest>0&&(_.alphaTest.value=h.alphaTest);const x=t.get(h),S=x.envMap,E=x.envMapRotation;S&&(_.envMap.value=S,_.envMapRotation.value.setFromMatrix4(gx.makeRotationFromEuler(E)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&_.envMapRotation.value.premultiply(ih),_.reflectivity.value=h.reflectivity,_.ior.value=h.ior,_.refractionRatio.value=h.refractionRatio),h.lightMap&&(_.lightMap.value=h.lightMap,_.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,_.lightMapTransform)),h.aoMap&&(_.aoMap.value=h.aoMap,_.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,_.aoMapTransform))}function o(_,h){_.diffuse.value.copy(h.color),_.opacity.value=h.opacity,h.map&&(_.map.value=h.map,e(h.map,_.mapTransform))}function a(_,h){_.dashSize.value=h.dashSize,_.totalSize.value=h.dashSize+h.gapSize,_.scale.value=h.scale}function c(_,h,x,S){_.diffuse.value.copy(h.color),_.opacity.value=h.opacity,_.size.value=h.size*x,_.scale.value=S*.5,h.map&&(_.map.value=h.map,e(h.map,_.uvTransform)),h.alphaMap&&(_.alphaMap.value=h.alphaMap,e(h.alphaMap,_.alphaMapTransform)),h.alphaTest>0&&(_.alphaTest.value=h.alphaTest)}function l(_,h){_.diffuse.value.copy(h.color),_.opacity.value=h.opacity,_.rotation.value=h.rotation,h.map&&(_.map.value=h.map,e(h.map,_.mapTransform)),h.alphaMap&&(_.alphaMap.value=h.alphaMap,e(h.alphaMap,_.alphaMapTransform)),h.alphaTest>0&&(_.alphaTest.value=h.alphaTest)}function u(_,h){_.specular.value.copy(h.specular),_.shininess.value=Math.max(h.shininess,1e-4)}function f(_,h){h.gradientMap&&(_.gradientMap.value=h.gradientMap)}function d(_,h){_.metalness.value=h.metalness,h.metalnessMap&&(_.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,_.metalnessMapTransform)),_.roughness.value=h.roughness,h.roughnessMap&&(_.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,_.roughnessMapTransform)),h.envMap&&(_.envMapIntensity.value=h.envMapIntensity)}function m(_,h,x){_.ior.value=h.ior,h.sheen>0&&(_.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),_.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(_.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,_.sheenColorMapTransform)),h.sheenRoughnessMap&&(_.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,_.sheenRoughnessMapTransform))),h.clearcoat>0&&(_.clearcoat.value=h.clearcoat,_.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(_.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,_.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(_.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===cn&&_.clearcoatNormalScale.value.negate())),h.dispersion>0&&(_.dispersion.value=h.dispersion),h.iridescence>0&&(_.iridescence.value=h.iridescence,_.iridescenceIOR.value=h.iridescenceIOR,_.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(_.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,_.iridescenceMapTransform)),h.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),h.transmission>0&&(_.transmission.value=h.transmission,_.transmissionSamplerMap.value=x.texture,_.transmissionSamplerSize.value.set(x.width,x.height),h.transmissionMap&&(_.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,_.transmissionMapTransform)),_.thickness.value=h.thickness,h.thicknessMap&&(_.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=h.attenuationDistance,_.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(_.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(_.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=h.specularIntensity,_.specularColor.value.copy(h.specularColor),h.specularColorMap&&(_.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,_.specularColorMapTransform)),h.specularIntensityMap&&(_.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,_.specularIntensityMapTransform))}function g(_,h){h.matcap&&(_.matcap.value=h.matcap)}function v(_,h){const x=t.get(h).light;_.referencePosition.value.setFromMatrixPosition(x.matrixWorld),_.nearDistance.value=x.shadow.camera.near,_.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function xx(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,S){const E=S.program;i.uniformBlockBinding(x,E)}function l(x,S){let E=s[x.id];E===void 0&&(g(x),E=u(x),s[x.id]=E,x.addEventListener("dispose",_));const L=S.program;i.updateUBOMapping(x,L);const A=t.render.frame;r[x.id]!==A&&(d(x),r[x.id]=A)}function u(x){const S=f();x.__bindingPointIndex=S;const E=n.createBuffer(),L=x.__size,A=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,L,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,E),E}function f(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return se("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const S=s[x.id],E=x.uniforms,L=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let A=0,w=E.length;A<w;A++){const p=Array.isArray(E[A])?E[A]:[E[A]];for(let M=0,T=p.length;M<T;M++){const C=p[M];if(m(C,A,M,L)===!0){const P=C.__offset,D=Array.isArray(C.value)?C.value:[C.value];let H=0;for(let N=0;N<D.length;N++){const k=D[N],B=v(k);typeof k=="number"||typeof k=="boolean"?(C.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,P+H,C.__data)):k.isMatrix3?(C.__data[0]=k.elements[0],C.__data[1]=k.elements[1],C.__data[2]=k.elements[2],C.__data[3]=0,C.__data[4]=k.elements[3],C.__data[5]=k.elements[4],C.__data[6]=k.elements[5],C.__data[7]=0,C.__data[8]=k.elements[6],C.__data[9]=k.elements[7],C.__data[10]=k.elements[8],C.__data[11]=0):ArrayBuffer.isView(k)?C.__data.set(new k.constructor(k.buffer,k.byteOffset,C.__data.length)):(k.toArray(C.__data,H),H+=B.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,P,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(x,S,E,L){const A=x.value,w=S+"_"+E;if(L[w]===void 0)return typeof A=="number"||typeof A=="boolean"?L[w]=A:ArrayBuffer.isView(A)?L[w]=A.slice():L[w]=A.clone(),!0;{const p=L[w];if(typeof A=="number"||typeof A=="boolean"){if(p!==A)return L[w]=A,!0}else{if(ArrayBuffer.isView(A))return!0;if(p.equals(A)===!1)return p.copy(A),!0}}return!1}function g(x){const S=x.uniforms;let E=0;const L=16;for(let w=0,p=S.length;w<p;w++){const M=Array.isArray(S[w])?S[w]:[S[w]];for(let T=0,C=M.length;T<C;T++){const P=M[T],D=Array.isArray(P.value)?P.value:[P.value];for(let H=0,N=D.length;H<N;H++){const k=D[H],B=v(k),J=E%L,ot=J%B.boundary,pt=J+ot;E+=ot,pt!==0&&L-pt<B.storage&&(E+=L-pt),P.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=E,E+=B.storage}}}const A=E%L;return A>0&&(E+=L-A),x.__size=E,x.__cache={},this}function v(x){const S={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(S.boundary=4,S.storage=4):x.isVector2?(S.boundary=8,S.storage=8):x.isVector3||x.isColor?(S.boundary=16,S.storage=12):x.isVector4?(S.boundary=16,S.storage=16):x.isMatrix3?(S.boundary=48,S.storage=48):x.isMatrix4?(S.boundary=64,S.storage=64):x.isTexture?zt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(S.boundary=16,S.storage=x.byteLength):zt("WebGLRenderer: Unsupported uniform value type.",x),S}function _(x){const S=x.target;S.removeEventListener("dispose",_);const E=o.indexOf(S.__bindingPointIndex);o.splice(E,1),n.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function h(){for(const x in s)n.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:c,update:l,dispose:h}}const vx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let kn=null;function Mx(){return kn===null&&(kn=new zd(vx,16,16,Xi,oi),kn.name="DFG_LUT",kn.minFilter=en,kn.magFilter=en,kn.wrapS=ei,kn.wrapT=ei,kn.generateMipmaps=!1,kn.needsUpdate=!0),kn}class sh{constructor(t={}){const{canvas:e=yf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:m=_n}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;const v=m,_=new Set([zl,Fl,Ol]),h=new Set([_n,Xn,sr,rr,Il,Nl]),x=new Uint32Array(4),S=new Int32Array(4),E=new U;let L=null,A=null;const w=[],p=[];let M=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const T=this;let C=!1,P=null;this._outputColorSpace=tn;let D=0,H=0,N=null,k=-1,B=null;const J=new Oe,ot=new Oe;let pt=null;const wt=new Ut(0);let Ct=0,ct=e.width,ft=e.height,bt=1,Q=null,St=null;const ht=new Oe(0,0,ct,ft),Bt=new Oe(0,0,ct,ft);let Wt=!1;const kt=new $l;let ye=!1,Jt=!1;const ce=new me,ue=new U,Vt=new Oe,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let be=!1;function Ke(){return N===null?bt:1}let F=i;function Ie(y,z){return e.getContext(y,z)}try{const y={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Pl}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",gt,!1),e.addEventListener("webglcontextcreationerror",Ft,!1),F===null){const z="webgl2";if(F=Ie(z,y),F===null)throw Ie(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw se("WebGLRenderer: "+y.message),y}let jt,de,xt,ge,R,b,G,I,q,V,it,$,tt,rt,_t,ut,lt,Ot,Gt,ee,O,dt,et;function vt(){jt=new Mg(F),jt.init(),O=new dx(F,jt),de=new hg(F,jt,t,O),xt=new cx(F,jt),de.reversedDepthBuffer&&d&&xt.buffers.depth.setReversed(!0),ge=new yg(F),R=new j_,b=new ux(F,jt,xt,R,de,O,ge),G=new vg(T),I=new Ap(F),dt=new ug(F,I),q=new bg(F,I,ge,dt),V=new Tg(F,q,I,dt,ge),Ot=new Eg(F,de,b),_t=new fg(R),it=new Y_(T,G,jt,de,dt,_t),$=new _x(T,R),tt=new Z_,rt=new ix(jt),lt=new cg(T,G,xt,V,g,c),ut=new lx(T,V,de),et=new xx(F,ge,de,xt),Gt=new dg(F,jt,ge),ee=new Sg(F,jt,ge),ge.programs=it.programs,T.capabilities=de,T.extensions=jt,T.properties=R,T.renderLists=tt,T.shadowMap=ut,T.state=xt,T.info=ge}vt(),v!==_n&&(M=new Ag(v,e.width,e.height,s,r));const at=new mx(T,F);this.xr=at,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const y=jt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=jt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return bt},this.setPixelRatio=function(y){y!==void 0&&(bt=y,this.setSize(ct,ft,!1))},this.getSize=function(y){return y.set(ct,ft)},this.setSize=function(y,z,Y=!0){if(at.isPresenting){zt("WebGLRenderer: Can't change size while VR device is presenting.");return}ct=y,ft=z,e.width=Math.floor(y*bt),e.height=Math.floor(z*bt),Y===!0&&(e.style.width=y+"px",e.style.height=z+"px"),M!==null&&M.setSize(e.width,e.height),this.setViewport(0,0,y,z)},this.getDrawingBufferSize=function(y){return y.set(ct*bt,ft*bt).floor()},this.setDrawingBufferSize=function(y,z,Y){ct=y,ft=z,bt=Y,e.width=Math.floor(y*Y),e.height=Math.floor(z*Y),this.setViewport(0,0,y,z)},this.setEffects=function(y){if(v===_n){se("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let z=0;z<y.length;z++)if(y[z].isOutputPass===!0){zt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(J)},this.getViewport=function(y){return y.copy(ht)},this.setViewport=function(y,z,Y,W){y.isVector4?ht.set(y.x,y.y,y.z,y.w):ht.set(y,z,Y,W),xt.viewport(J.copy(ht).multiplyScalar(bt).round())},this.getScissor=function(y){return y.copy(Bt)},this.setScissor=function(y,z,Y,W){y.isVector4?Bt.set(y.x,y.y,y.z,y.w):Bt.set(y,z,Y,W),xt.scissor(ot.copy(Bt).multiplyScalar(bt).round())},this.getScissorTest=function(){return Wt},this.setScissorTest=function(y){xt.setScissorTest(Wt=y)},this.setOpaqueSort=function(y){Q=y},this.setTransparentSort=function(y){St=y},this.getClearColor=function(y){return y.copy(lt.getClearColor())},this.setClearColor=function(){lt.setClearColor(...arguments)},this.getClearAlpha=function(){return lt.getClearAlpha()},this.setClearAlpha=function(){lt.setClearAlpha(...arguments)},this.clear=function(y=!0,z=!0,Y=!0){let W=0;if(y){let X=!1;if(N!==null){const Tt=N.texture.format;X=_.has(Tt)}if(X){const Tt=N.texture.type,Rt=h.has(Tt),Et=lt.getClearColor(),Lt=lt.getClearAlpha(),Dt=Et.r,qt=Et.g,Kt=Et.b;Rt?(x[0]=Dt,x[1]=qt,x[2]=Kt,x[3]=Lt,F.clearBufferuiv(F.COLOR,0,x)):(S[0]=Dt,S[1]=qt,S[2]=Kt,S[3]=Lt,F.clearBufferiv(F.COLOR,0,S))}else W|=F.COLOR_BUFFER_BIT}z&&(W|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(W|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&F.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),P=y},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",gt,!1),e.removeEventListener("webglcontextcreationerror",Ft,!1),lt.dispose(),tt.dispose(),rt.dispose(),R.dispose(),G.dispose(),V.dispose(),dt.dispose(),et.dispose(),it.dispose(),at.dispose(),at.removeEventListener("sessionstart",gr),at.removeEventListener("sessionend",_r),Pi.stop()};function K(y){y.preventDefault(),Nc("WebGLRenderer: Context Lost."),C=!0}function gt(){Nc("WebGLRenderer: Context Restored."),C=!1;const y=ge.autoReset,z=ut.enabled,Y=ut.autoUpdate,W=ut.needsUpdate,X=ut.type;vt(),ge.autoReset=y,ut.enabled=z,ut.autoUpdate=Y,ut.needsUpdate=W,ut.type=X}function Ft(y){se("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Ee(y){const z=y.target;z.removeEventListener("dispose",Ee),oe(z)}function oe(y){An(y),R.remove(y)}function An(y){const z=R.get(y).programs;z!==void 0&&(z.forEach(function(Y){it.releaseProgram(Y)}),y.isShaderMaterial&&it.releaseShaderCache(y))}this.renderBufferDirect=function(y,z,Y,W,X,Tt){z===null&&(z=Pe);const Rt=X.isMesh&&X.matrixWorld.determinant()<0,Et=Fh(y,z,Y,W,X);xt.setMaterial(W,Rt);let Lt=Y.index,Dt=1;if(W.wireframe===!0){if(Lt=q.getWireframeAttribute(Y),Lt===void 0)return;Dt=2}const qt=Y.drawRange,Kt=Y.attributes.position;let It=qt.start*Dt,_e=(qt.start+qt.count)*Dt;Tt!==null&&(It=Math.max(It,Tt.start*Dt),_e=Math.min(_e,(Tt.start+Tt.count)*Dt)),Lt!==null?(It=Math.max(It,0),_e=Math.min(_e,Lt.count)):Kt!=null&&(It=Math.max(It,0),_e=Math.min(_e,Kt.count));const Fe=_e-It;if(Fe<0||Fe===1/0)return;dt.setup(X,W,Et,Y,Lt);let Ne,ve=Gt;if(Lt!==null&&(Ne=I.get(Lt),ve=ee,ve.setIndex(Ne)),X.isMesh)W.wireframe===!0?(xt.setLineWidth(W.wireframeLinewidth*Ke()),ve.setMode(F.LINES)):ve.setMode(F.TRIANGLES);else if(X.isLine){let Ze=W.linewidth;Ze===void 0&&(Ze=1),xt.setLineWidth(Ze*Ke()),X.isLineSegments?ve.setMode(F.LINES):X.isLineLoop?ve.setMode(F.LINE_LOOP):ve.setMode(F.LINE_STRIP)}else X.isPoints?ve.setMode(F.POINTS):X.isSprite&&ve.setMode(F.TRIANGLES);if(X.isBatchedMesh)if(jt.get("WEBGL_multi_draw"))ve.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Ze=X._multiDrawStarts,At=X._multiDrawCounts,fn=X._multiDrawCount,ae=Lt?I.get(Lt).bytesPerElement:1,yn=R.get(W).currentProgram.getUniforms();for(let zn=0;zn<fn;zn++)yn.setValue(F,"_gl_DrawID",zn),ve.render(Ze[zn]/ae,At[zn])}else if(X.isInstancedMesh)ve.renderInstances(It,Fe,X.count);else if(Y.isInstancedBufferGeometry){const Ze=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,At=Math.min(Y.instanceCount,Ze);ve.renderInstances(It,Fe,At)}else ve.render(It,Fe)};function Ae(y,z,Y){y.transparent===!0&&y.side===ti&&y.forceSinglePass===!1?(y.side=cn,y.needsUpdate=!0,vr(y,z,Y),y.side=Ai,y.needsUpdate=!0,vr(y,z,Y),y.side=ti):vr(y,z,Y)}this.compile=function(y,z,Y=null){Y===null&&(Y=y),A=rt.get(Y),A.init(z),p.push(A),Y.traverseVisible(function(X){X.isLight&&X.layers.test(z.layers)&&(A.pushLight(X),X.castShadow&&A.pushShadow(X))}),y!==Y&&y.traverseVisible(function(X){X.isLight&&X.layers.test(z.layers)&&(A.pushLight(X),X.castShadow&&A.pushShadow(X))}),A.setupLights();const W=new Set;return y.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const Tt=X.material;if(Tt)if(Array.isArray(Tt))for(let Rt=0;Rt<Tt.length;Rt++){const Et=Tt[Rt];Ae(Et,Y,X),W.add(Et)}else Ae(Tt,Y,X),W.add(Tt)}),A=p.pop(),W},this.compileAsync=function(y,z,Y=null){const W=this.compile(y,z,Y);return new Promise(X=>{function Tt(){if(W.forEach(function(Rt){R.get(Rt).currentProgram.isReady()&&W.delete(Rt)}),W.size===0){X(y);return}setTimeout(Tt,10)}jt.get("KHR_parallel_shader_compile")!==null?Tt():setTimeout(Tt,10)})};let Sn=null;function Oo(y){Sn&&Sn(y)}function gr(){Pi.stop()}function _r(){Pi.start()}const Pi=new Kd;Pi.setAnimationLoop(Oo),typeof self<"u"&&Pi.setContext(self),this.setAnimationLoop=function(y){Sn=y,at.setAnimationLoop(y),y===null?Pi.stop():Pi.start()},at.addEventListener("sessionstart",gr),at.addEventListener("sessionend",_r),this.render=function(y,z){if(z!==void 0&&z.isCamera!==!0){se("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;P!==null&&P.renderStart(y,z);const Y=at.enabled===!0&&at.isPresenting===!0,W=M!==null&&(N===null||Y)&&M.begin(T,N);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(at.cameraAutoUpdate===!0&&at.updateCamera(z),z=at.getCamera()),y.isScene===!0&&y.onBeforeRender(T,y,z,N),A=rt.get(y,p.length),A.init(z),A.state.textureUnits=b.getTextureUnits(),p.push(A),ce.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),kt.setFromProjectionMatrix(ce,Hn,z.reversedDepth),Jt=this.localClippingEnabled,ye=_t.init(this.clippingPlanes,Jt),L=tt.get(y,w.length),L.init(),w.push(L),at.enabled===!0&&at.isPresenting===!0){const Rt=T.xr.getDepthSensingMesh();Rt!==null&&Fo(Rt,z,-1/0,T.sortObjects)}Fo(y,z,0,T.sortObjects),L.finish(),T.sortObjects===!0&&L.sort(Q,St),be=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,be&&lt.addToRenderList(L,y),this.info.render.frame++,ye===!0&&_t.beginShadows();const X=A.state.shadowsArray;if(ut.render(X,y,z),ye===!0&&_t.endShadows(),this.info.autoReset===!0&&this.info.reset(),(W&&M.hasRenderPass())===!1){const Rt=L.opaque,Et=L.transmissive;if(A.setupLights(),z.isArrayCamera){const Lt=z.cameras;if(Et.length>0)for(let Dt=0,qt=Lt.length;Dt<qt;Dt++){const Kt=Lt[Dt];bc(Rt,Et,y,Kt)}be&&lt.render(y);for(let Dt=0,qt=Lt.length;Dt<qt;Dt++){const Kt=Lt[Dt];Mc(L,y,Kt,Kt.viewport)}}else Et.length>0&&bc(Rt,Et,y,z),be&&lt.render(y),Mc(L,y,z)}N!==null&&H===0&&(b.updateMultisampleRenderTarget(N),b.updateRenderTargetMipmap(N)),W&&M.end(T),y.isScene===!0&&y.onAfterRender(T,y,z),dt.resetDefaultState(),k=-1,B=null,p.pop(),p.length>0?(A=p[p.length-1],b.setTextureUnits(A.state.textureUnits),ye===!0&&_t.setGlobalState(T.clippingPlanes,A.state.camera)):A=null,w.pop(),w.length>0?L=w[w.length-1]:L=null,P!==null&&P.renderEnd()};function Fo(y,z,Y,W){if(y.visible===!1)return;if(y.layers.test(z.layers)){if(y.isGroup)Y=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(z);else if(y.isLightProbeGrid)A.pushLightProbeGrid(y);else if(y.isLight)A.pushLight(y),y.castShadow&&A.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||kt.intersectsSprite(y)){W&&Vt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ce);const Rt=V.update(y),Et=y.material;Et.visible&&L.push(y,Rt,Et,Y,Vt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||kt.intersectsObject(y))){const Rt=V.update(y),Et=y.material;if(W&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Vt.copy(y.boundingSphere.center)):(Rt.boundingSphere===null&&Rt.computeBoundingSphere(),Vt.copy(Rt.boundingSphere.center)),Vt.applyMatrix4(y.matrixWorld).applyMatrix4(ce)),Array.isArray(Et)){const Lt=Rt.groups;for(let Dt=0,qt=Lt.length;Dt<qt;Dt++){const Kt=Lt[Dt],It=Et[Kt.materialIndex];It&&It.visible&&L.push(y,Rt,It,Y,Vt.z,Kt)}}else Et.visible&&L.push(y,Rt,Et,Y,Vt.z,null)}}const Tt=y.children;for(let Rt=0,Et=Tt.length;Rt<Et;Rt++)Fo(Tt[Rt],z,Y,W)}function Mc(y,z,Y,W){const{opaque:X,transmissive:Tt,transparent:Rt}=y;A.setupLightsView(Y),ye===!0&&_t.setGlobalState(T.clippingPlanes,Y),W&&xt.viewport(J.copy(W)),X.length>0&&xr(X,z,Y),Tt.length>0&&xr(Tt,z,Y),Rt.length>0&&xr(Rt,z,Y),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function bc(y,z,Y,W){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[W.id]===void 0){const It=jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[W.id]=new Wn(1,1,{generateMipmaps:!0,type:It?oi:_n,minFilter:Bi,samples:Math.max(4,de.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ie.workingColorSpace})}const Tt=A.state.transmissionRenderTarget[W.id],Rt=W.viewport||J;Tt.setSize(Rt.z*T.transmissionResolutionScale,Rt.w*T.transmissionResolutionScale);const Et=T.getRenderTarget(),Lt=T.getActiveCubeFace(),Dt=T.getActiveMipmapLevel();T.setRenderTarget(Tt),T.getClearColor(wt),Ct=T.getClearAlpha(),Ct<1&&T.setClearColor(16777215,.5),T.clear(),be&&lt.render(Y);const qt=T.toneMapping;T.toneMapping=Vn;const Kt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),A.setupLightsView(W),ye===!0&&_t.setGlobalState(T.clippingPlanes,W),xr(y,Y,W),b.updateMultisampleRenderTarget(Tt),b.updateRenderTargetMipmap(Tt),jt.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let _e=0,Fe=z.length;_e<Fe;_e++){const Ne=z[_e],{object:ve,geometry:Ze,material:At,group:fn}=Ne;if(At.side===ti&&ve.layers.test(W.layers)){const ae=At.side;At.side=cn,At.needsUpdate=!0,Sc(ve,Y,W,Ze,At,fn),At.side=ae,At.needsUpdate=!0,It=!0}}It===!0&&(b.updateMultisampleRenderTarget(Tt),b.updateRenderTargetMipmap(Tt))}T.setRenderTarget(Et,Lt,Dt),T.setClearColor(wt,Ct),Kt!==void 0&&(W.viewport=Kt),T.toneMapping=qt}function xr(y,z,Y){const W=z.isScene===!0?z.overrideMaterial:null;for(let X=0,Tt=y.length;X<Tt;X++){const Rt=y[X],{object:Et,geometry:Lt,group:Dt}=Rt;let qt=Rt.material;qt.allowOverride===!0&&W!==null&&(qt=W),Et.layers.test(Y.layers)&&Sc(Et,z,Y,Lt,qt,Dt)}}function Sc(y,z,Y,W,X,Tt){y.onBeforeRender(T,z,Y,W,X,Tt),y.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),X.onBeforeRender(T,z,Y,W,y,Tt),X.transparent===!0&&X.side===ti&&X.forceSinglePass===!1?(X.side=cn,X.needsUpdate=!0,T.renderBufferDirect(Y,z,W,X,y,Tt),X.side=Ai,X.needsUpdate=!0,T.renderBufferDirect(Y,z,W,X,y,Tt),X.side=ti):T.renderBufferDirect(Y,z,W,X,y,Tt),y.onAfterRender(T,z,Y,W,X,Tt)}function vr(y,z,Y){z.isScene!==!0&&(z=Pe);const W=R.get(y),X=A.state.lights,Tt=A.state.shadowsArray,Rt=X.state.version,Et=it.getParameters(y,X.state,Tt,z,Y,A.state.lightProbeGridArray),Lt=it.getProgramCacheKey(Et);let Dt=W.programs;W.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?z.environment:null,W.fog=z.fog;const qt=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;W.envMap=G.get(y.envMap||W.environment,qt),W.envMapRotation=W.environment!==null&&y.envMap===null?z.environmentRotation:y.envMapRotation,Dt===void 0&&(y.addEventListener("dispose",Ee),Dt=new Map,W.programs=Dt);let Kt=Dt.get(Lt);if(Kt!==void 0){if(W.currentProgram===Kt&&W.lightsStateVersion===Rt)return Ec(y,Et),Kt}else Et.uniforms=it.getUniforms(y),P!==null&&y.isNodeMaterial&&P.build(y,Y,Et),y.onBeforeCompile(Et,T),Kt=it.acquireProgram(Et,Lt),Dt.set(Lt,Kt),W.uniforms=Et.uniforms;const It=W.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(It.clippingPlanes=_t.uniform),Ec(y,Et),W.needsLights=Bh(y),W.lightsStateVersion=Rt,W.needsLights&&(It.ambientLightColor.value=X.state.ambient,It.lightProbe.value=X.state.probe,It.directionalLights.value=X.state.directional,It.directionalLightShadows.value=X.state.directionalShadow,It.spotLights.value=X.state.spot,It.spotLightShadows.value=X.state.spotShadow,It.rectAreaLights.value=X.state.rectArea,It.ltc_1.value=X.state.rectAreaLTC1,It.ltc_2.value=X.state.rectAreaLTC2,It.pointLights.value=X.state.point,It.pointLightShadows.value=X.state.pointShadow,It.hemisphereLights.value=X.state.hemi,It.directionalShadowMatrix.value=X.state.directionalShadowMatrix,It.spotLightMatrix.value=X.state.spotLightMatrix,It.spotLightMap.value=X.state.spotLightMap,It.pointShadowMatrix.value=X.state.pointShadowMatrix),W.lightProbeGrid=A.state.lightProbeGridArray.length>0,W.currentProgram=Kt,W.uniformsList=null,Kt}function yc(y){if(y.uniformsList===null){const z=y.currentProgram.getUniforms();y.uniformsList=ao.seqWithValue(z.seq,y.uniforms)}return y.uniformsList}function Ec(y,z){const Y=R.get(y);Y.outputColorSpace=z.outputColorSpace,Y.batching=z.batching,Y.batchingColor=z.batchingColor,Y.instancing=z.instancing,Y.instancingColor=z.instancingColor,Y.instancingMorph=z.instancingMorph,Y.skinning=z.skinning,Y.morphTargets=z.morphTargets,Y.morphNormals=z.morphNormals,Y.morphColors=z.morphColors,Y.morphTargetsCount=z.morphTargetsCount,Y.numClippingPlanes=z.numClippingPlanes,Y.numIntersection=z.numClipIntersection,Y.vertexAlphas=z.vertexAlphas,Y.vertexTangents=z.vertexTangents,Y.toneMapping=z.toneMapping}function Oh(y,z){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;E.setFromMatrixPosition(z.matrixWorld);for(let Y=0,W=y.length;Y<W;Y++){const X=y[Y];if(X.texture!==null&&X.boundingBox.containsPoint(E))return X}return null}function Fh(y,z,Y,W,X){z.isScene!==!0&&(z=Pe),b.resetTextureUnits();const Tt=z.fog,Rt=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?z.environment:null,Et=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:ie.workingColorSpace,Lt=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Dt=G.get(W.envMap||Rt,Lt),qt=W.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Kt=!!Y.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),It=!!Y.morphAttributes.position,_e=!!Y.morphAttributes.normal,Fe=!!Y.morphAttributes.color;let Ne=Vn;W.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Ne=T.toneMapping);const ve=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Ze=ve!==void 0?ve.length:0,At=R.get(W),fn=A.state.lights;if(ye===!0&&(Jt===!0||y!==B)){const Se=y===B&&W.id===k;_t.setState(W,y,Se)}let ae=!1;W.version===At.__version?(At.needsLights&&At.lightsStateVersion!==fn.state.version||At.outputColorSpace!==Et||X.isBatchedMesh&&At.batching===!1||!X.isBatchedMesh&&At.batching===!0||X.isBatchedMesh&&At.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&At.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&At.instancing===!1||!X.isInstancedMesh&&At.instancing===!0||X.isSkinnedMesh&&At.skinning===!1||!X.isSkinnedMesh&&At.skinning===!0||X.isInstancedMesh&&At.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&At.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&At.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&At.instancingMorph===!1&&X.morphTexture!==null||At.envMap!==Dt||W.fog===!0&&At.fog!==Tt||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==_t.numPlanes||At.numIntersection!==_t.numIntersection)||At.vertexAlphas!==qt||At.vertexTangents!==Kt||At.morphTargets!==It||At.morphNormals!==_e||At.morphColors!==Fe||At.toneMapping!==Ne||At.morphTargetsCount!==Ze||!!At.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(ae=!0):(ae=!0,At.__version=W.version);let yn=At.currentProgram;ae===!0&&(yn=vr(W,z,X),P&&W.isNodeMaterial&&P.onUpdateProgram(W,yn,At));let zn=!1,di=!1,Ji=!1;const Me=yn.getUniforms(),ze=At.uniforms;if(xt.useProgram(yn.program)&&(zn=!0,di=!0,Ji=!0),W.id!==k&&(k=W.id,di=!0),At.needsLights){const Se=Oh(A.state.lightProbeGridArray,X);At.lightProbeGrid!==Se&&(At.lightProbeGrid=Se,di=!0)}if(zn||B!==y){xt.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),Me.setValue(F,"projectionMatrix",y.projectionMatrix),Me.setValue(F,"viewMatrix",y.matrixWorldInverse);const fi=Me.map.cameraPosition;fi!==void 0&&fi.setValue(F,ue.setFromMatrixPosition(y.matrixWorld)),de.logarithmicDepthBuffer&&Me.setValue(F,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Me.setValue(F,"isOrthographic",y.isOrthographicCamera===!0),B!==y&&(B=y,di=!0,Ji=!0)}if(At.needsLights&&(fn.state.directionalShadowMap.length>0&&Me.setValue(F,"directionalShadowMap",fn.state.directionalShadowMap,b),fn.state.spotShadowMap.length>0&&Me.setValue(F,"spotShadowMap",fn.state.spotShadowMap,b),fn.state.pointShadowMap.length>0&&Me.setValue(F,"pointShadowMap",fn.state.pointShadowMap,b)),X.isSkinnedMesh){Me.setOptional(F,X,"bindMatrix"),Me.setOptional(F,X,"bindMatrixInverse");const Se=X.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),Me.setValue(F,"boneTexture",Se.boneTexture,b))}X.isBatchedMesh&&(Me.setOptional(F,X,"batchingTexture"),Me.setValue(F,"batchingTexture",X._matricesTexture,b),Me.setOptional(F,X,"batchingIdTexture"),Me.setValue(F,"batchingIdTexture",X._indirectTexture,b),Me.setOptional(F,X,"batchingColorTexture"),X._colorsTexture!==null&&Me.setValue(F,"batchingColorTexture",X._colorsTexture,b));const hi=Y.morphAttributes;if((hi.position!==void 0||hi.normal!==void 0||hi.color!==void 0)&&Ot.update(X,Y,yn),(di||At.receiveShadow!==X.receiveShadow)&&(At.receiveShadow=X.receiveShadow,Me.setValue(F,"receiveShadow",X.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&z.environment!==null&&(ze.envMapIntensity.value=z.environmentIntensity),ze.dfgLUT!==void 0&&(ze.dfgLUT.value=Mx()),di){if(Me.setValue(F,"toneMappingExposure",T.toneMappingExposure),At.needsLights&&zh(ze,Ji),Tt&&W.fog===!0&&$.refreshFogUniforms(ze,Tt),$.refreshMaterialUniforms(ze,W,bt,ft,A.state.transmissionRenderTarget[y.id]),At.needsLights&&At.lightProbeGrid){const Se=At.lightProbeGrid;ze.probesSH.value=Se.texture,ze.probesMin.value.copy(Se.boundingBox.min),ze.probesMax.value.copy(Se.boundingBox.max),ze.probesResolution.value.copy(Se.resolution)}ao.upload(F,yc(At),ze,b)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(ao.upload(F,yc(At),ze,b),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Me.setValue(F,"center",X.center),Me.setValue(F,"modelViewMatrix",X.modelViewMatrix),Me.setValue(F,"normalMatrix",X.normalMatrix),Me.setValue(F,"modelMatrix",X.matrixWorld),W.uniformsGroups!==void 0){const Se=W.uniformsGroups;for(let fi=0,Qi=Se.length;fi<Qi;fi++){const Tc=Se[fi];et.update(Tc,yn),et.bind(Tc,yn)}}return yn}function zh(y,z){y.ambientLightColor.needsUpdate=z,y.lightProbe.needsUpdate=z,y.directionalLights.needsUpdate=z,y.directionalLightShadows.needsUpdate=z,y.pointLights.needsUpdate=z,y.pointLightShadows.needsUpdate=z,y.spotLights.needsUpdate=z,y.spotLightShadows.needsUpdate=z,y.rectAreaLights.needsUpdate=z,y.hemisphereLights.needsUpdate=z}function Bh(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(y,z,Y){const W=R.get(y);W.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),R.get(y.texture).__webglTexture=z,R.get(y.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:Y,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,z){const Y=R.get(y);Y.__webglFramebuffer=z,Y.__useDefaultFramebuffer=z===void 0};const kh=F.createFramebuffer();this.setRenderTarget=function(y,z=0,Y=0){N=y,D=z,H=Y;let W=null,X=!1,Tt=!1;if(y){const Et=R.get(y);if(Et.__useDefaultFramebuffer!==void 0){xt.bindFramebuffer(F.FRAMEBUFFER,Et.__webglFramebuffer),J.copy(y.viewport),ot.copy(y.scissor),pt=y.scissorTest,xt.viewport(J),xt.scissor(ot),xt.setScissorTest(pt),k=-1;return}else if(Et.__webglFramebuffer===void 0)b.setupRenderTarget(y);else if(Et.__hasExternalTextures)b.rebindTextures(y,R.get(y.texture).__webglTexture,R.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const qt=y.depthTexture;if(Et.__boundDepthTexture!==qt){if(qt!==null&&R.has(qt)&&(y.width!==qt.image.width||y.height!==qt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(y)}}const Lt=y.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(Tt=!0);const Dt=R.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Dt[z])?W=Dt[z][Y]:W=Dt[z],X=!0):y.samples>0&&b.useMultisampledRTT(y)===!1?W=R.get(y).__webglMultisampledFramebuffer:Array.isArray(Dt)?W=Dt[Y]:W=Dt,J.copy(y.viewport),ot.copy(y.scissor),pt=y.scissorTest}else J.copy(ht).multiplyScalar(bt).floor(),ot.copy(Bt).multiplyScalar(bt).floor(),pt=Wt;if(Y!==0&&(W=kh),xt.bindFramebuffer(F.FRAMEBUFFER,W)&&xt.drawBuffers(y,W),xt.viewport(J),xt.scissor(ot),xt.setScissorTest(pt),X){const Et=R.get(y.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+z,Et.__webglTexture,Y)}else if(Tt){const Et=z;for(let Lt=0;Lt<y.textures.length;Lt++){const Dt=R.get(y.textures[Lt]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Lt,Dt.__webglTexture,Y,Et)}}else if(y!==null&&Y!==0){const Et=R.get(y.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Et.__webglTexture,Y)}k=-1},this.readRenderTargetPixels=function(y,z,Y,W,X,Tt,Rt,Et=0){if(!(y&&y.isWebGLRenderTarget)){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=R.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Rt!==void 0&&(Lt=Lt[Rt]),Lt){xt.bindFramebuffer(F.FRAMEBUFFER,Lt);try{const Dt=y.textures[Et],qt=Dt.format,Kt=Dt.type;if(y.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Et),!de.textureFormatReadable(qt)){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!de.textureTypeReadable(Kt)){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=y.width-W&&Y>=0&&Y<=y.height-X&&F.readPixels(z,Y,W,X,O.convert(qt),O.convert(Kt),Tt)}finally{const Dt=N!==null?R.get(N).__webglFramebuffer:null;xt.bindFramebuffer(F.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(y,z,Y,W,X,Tt,Rt,Et=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=R.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Rt!==void 0&&(Lt=Lt[Rt]),Lt)if(z>=0&&z<=y.width-W&&Y>=0&&Y<=y.height-X){xt.bindFramebuffer(F.FRAMEBUFFER,Lt);const Dt=y.textures[Et],qt=Dt.format,Kt=Dt.type;if(y.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Et),!de.textureFormatReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!de.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const It=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,It),F.bufferData(F.PIXEL_PACK_BUFFER,Tt.byteLength,F.STREAM_READ),F.readPixels(z,Y,W,X,O.convert(qt),O.convert(Kt),0);const _e=N!==null?R.get(N).__webglFramebuffer:null;xt.bindFramebuffer(F.FRAMEBUFFER,_e);const Fe=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Ef(F,Fe,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,It),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Tt),F.deleteBuffer(It),F.deleteSync(Fe),Tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,z=null,Y=0){const W=Math.pow(2,-Y),X=Math.floor(y.image.width*W),Tt=Math.floor(y.image.height*W),Rt=z!==null?z.x:0,Et=z!==null?z.y:0;b.setTexture2D(y,0),F.copyTexSubImage2D(F.TEXTURE_2D,Y,0,0,Rt,Et,X,Tt),xt.unbindTexture()};const Gh=F.createFramebuffer(),Hh=F.createFramebuffer();this.copyTextureToTexture=function(y,z,Y=null,W=null,X=0,Tt=0){let Rt,Et,Lt,Dt,qt,Kt,It,_e,Fe;const Ne=y.isCompressedTexture?y.mipmaps[Tt]:y.image;if(Y!==null)Rt=Y.max.x-Y.min.x,Et=Y.max.y-Y.min.y,Lt=Y.isBox3?Y.max.z-Y.min.z:1,Dt=Y.min.x,qt=Y.min.y,Kt=Y.isBox3?Y.min.z:0;else{const ze=Math.pow(2,-X);Rt=Math.floor(Ne.width*ze),Et=Math.floor(Ne.height*ze),y.isDataArrayTexture?Lt=Ne.depth:y.isData3DTexture?Lt=Math.floor(Ne.depth*ze):Lt=1,Dt=0,qt=0,Kt=0}W!==null?(It=W.x,_e=W.y,Fe=W.z):(It=0,_e=0,Fe=0);const ve=O.convert(z.format),Ze=O.convert(z.type);let At;z.isData3DTexture?(b.setTexture3D(z,0),At=F.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(b.setTexture2DArray(z,0),At=F.TEXTURE_2D_ARRAY):(b.setTexture2D(z,0),At=F.TEXTURE_2D),xt.activeTexture(F.TEXTURE0),xt.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,z.flipY),xt.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),xt.pixelStorei(F.UNPACK_ALIGNMENT,z.unpackAlignment);const fn=xt.getParameter(F.UNPACK_ROW_LENGTH),ae=xt.getParameter(F.UNPACK_IMAGE_HEIGHT),yn=xt.getParameter(F.UNPACK_SKIP_PIXELS),zn=xt.getParameter(F.UNPACK_SKIP_ROWS),di=xt.getParameter(F.UNPACK_SKIP_IMAGES);xt.pixelStorei(F.UNPACK_ROW_LENGTH,Ne.width),xt.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ne.height),xt.pixelStorei(F.UNPACK_SKIP_PIXELS,Dt),xt.pixelStorei(F.UNPACK_SKIP_ROWS,qt),xt.pixelStorei(F.UNPACK_SKIP_IMAGES,Kt);const Ji=y.isDataArrayTexture||y.isData3DTexture,Me=z.isDataArrayTexture||z.isData3DTexture;if(y.isDepthTexture){const ze=R.get(y),hi=R.get(z),Se=R.get(ze.__renderTarget),fi=R.get(hi.__renderTarget);xt.bindFramebuffer(F.READ_FRAMEBUFFER,Se.__webglFramebuffer),xt.bindFramebuffer(F.DRAW_FRAMEBUFFER,fi.__webglFramebuffer);for(let Qi=0;Qi<Lt;Qi++)Ji&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,R.get(y).__webglTexture,X,Kt+Qi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,R.get(z).__webglTexture,Tt,Fe+Qi)),F.blitFramebuffer(Dt,qt,Rt,Et,It,_e,Rt,Et,F.DEPTH_BUFFER_BIT,F.NEAREST);xt.bindFramebuffer(F.READ_FRAMEBUFFER,null),xt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(X!==0||y.isRenderTargetTexture||R.has(y)){const ze=R.get(y),hi=R.get(z);xt.bindFramebuffer(F.READ_FRAMEBUFFER,Gh),xt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Hh);for(let Se=0;Se<Lt;Se++)Ji?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ze.__webglTexture,X,Kt+Se):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ze.__webglTexture,X),Me?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,hi.__webglTexture,Tt,Fe+Se):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,hi.__webglTexture,Tt),X!==0?F.blitFramebuffer(Dt,qt,Rt,Et,It,_e,Rt,Et,F.COLOR_BUFFER_BIT,F.NEAREST):Me?F.copyTexSubImage3D(At,Tt,It,_e,Fe+Se,Dt,qt,Rt,Et):F.copyTexSubImage2D(At,Tt,It,_e,Dt,qt,Rt,Et);xt.bindFramebuffer(F.READ_FRAMEBUFFER,null),xt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Me?y.isDataTexture||y.isData3DTexture?F.texSubImage3D(At,Tt,It,_e,Fe,Rt,Et,Lt,ve,Ze,Ne.data):z.isCompressedArrayTexture?F.compressedTexSubImage3D(At,Tt,It,_e,Fe,Rt,Et,Lt,ve,Ne.data):F.texSubImage3D(At,Tt,It,_e,Fe,Rt,Et,Lt,ve,Ze,Ne):y.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Tt,It,_e,Rt,Et,ve,Ze,Ne.data):y.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Tt,It,_e,Ne.width,Ne.height,ve,Ne.data):F.texSubImage2D(F.TEXTURE_2D,Tt,It,_e,Rt,Et,ve,Ze,Ne);xt.pixelStorei(F.UNPACK_ROW_LENGTH,fn),xt.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ae),xt.pixelStorei(F.UNPACK_SKIP_PIXELS,yn),xt.pixelStorei(F.UNPACK_SKIP_ROWS,zn),xt.pixelStorei(F.UNPACK_SKIP_IMAGES,di),Tt===0&&z.generateMipmaps&&F.generateMipmap(At),xt.unbindTexture()},this.initRenderTarget=function(y){R.get(y).__webglFramebuffer===void 0&&b.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?b.setTextureCube(y,0):y.isData3DTexture?b.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?b.setTexture2DArray(y,0):b.setTexture2D(y,0),xt.unbindTexture()},this.resetState=function(){D=0,H=0,N=null,xt.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ie._getDrawingBufferColorSpace(t),e.unpackColorSpace=ie._getUnpackColorSpace()}}const Nu={type:"change"},tc={type:"start"},rh={type:"end"},Xr=new Co,Uu=new Qn,bx=Math.cos(70*Ue.DEG2RAD),ke=new U,un=2*Math.PI,xe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},_a=1e-6;class oh extends Tp{constructor(t,e=null){super(t,e),this.state=xe.NONE,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Xe.ROTATE,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN},this.touches={ONE:hn.ROTATE,TWO:hn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new li,this._lastTargetPosition=new U,this._quat=new li().setFromUnitVectors(t.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Mo,this._sphericalDelta=new Mo,this._scale=1,this._panOffset=new U,this._rotateStart=new Nt,this._rotateEnd=new Nt,this._rotateDelta=new Nt,this._panStart=new Nt,this._panEnd=new Nt,this._panDelta=new Nt,this._dollyStart=new Nt,this._dollyEnd=new Nt,this._dollyDelta=new Nt,this._dollyDirection=new U,this._mouse=new Nt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=yx.bind(this),this._onPointerDown=Sx.bind(this),this._onPointerUp=Ex.bind(this),this._onContextMenu=Lx.bind(this),this._onMouseWheel=Ax.bind(this),this._onKeyDown=Rx.bind(this),this._onTouchStart=Cx.bind(this),this._onTouchMove=Px.bind(this),this._onMouseDown=Tx.bind(this),this._onMouseMove=wx.bind(this),this._interceptControlDown=Dx.bind(this),this._interceptControlUp=Ix.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Nu),this.update(),this.state=xe.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;ke.copy(e).sub(this.target),ke.applyQuaternion(this._quat),this._spherical.setFromVector3(ke),this.autoRotate&&this.state===xe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=un:i>Math.PI&&(i-=un),s<-Math.PI?s+=un:s>Math.PI&&(s-=un),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(ke.setFromSpherical(this._spherical),ke.applyQuaternion(this._quatInverse),e.copy(this.target).add(ke),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=ke.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new U(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new U(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=ke.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Xr.origin.copy(this.object.position),Xr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Xr.direction))<bx?this.object.lookAt(this.target):(Uu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Xr.intersectPlane(Uu,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>_a||8*(1-this._lastQuaternion.dot(this.object.quaternion))>_a||this._lastTargetPosition.distanceToSquared(this.target)>_a?(this.dispatchEvent(Nu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?un/60*this.autoRotateSpeed*t:un/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ke.setFromMatrixColumn(e,0),ke.multiplyScalar(-t),this._panOffset.add(ke)}_panUp(t,e){this.screenSpacePanning===!0?ke.setFromMatrixColumn(e,1):(ke.setFromMatrixColumn(e,0),ke.crossVectors(this.object.up,ke)),ke.multiplyScalar(t),this._panOffset.add(ke)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ke.copy(s).sub(this.target);let r=ke.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(un*this._rotateDelta.x/e.clientHeight),this._rotateUp(un*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(un*this._rotateDelta.x/e.clientHeight),this._rotateUp(un*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Nt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Sx(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function yx(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Ex(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(rh),this.state=xe.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Tx(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Xe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=xe.DOLLY;break;case Xe.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=xe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=xe.ROTATE}break;case Xe.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=xe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=xe.PAN}break;default:this.state=xe.NONE}this.state!==xe.NONE&&this.dispatchEvent(tc)}function wx(n){switch(this.state){case xe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case xe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case xe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Ax(n){this.enabled===!1||this.enableZoom===!1||this.state!==xe.NONE||(n.preventDefault(),this.dispatchEvent(tc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(rh))}function Rx(n){this.enabled!==!1&&this._handleKeyDown(n)}function Cx(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case hn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=xe.TOUCH_ROTATE;break;case hn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=xe.TOUCH_PAN;break;default:this.state=xe.NONE}break;case 2:switch(this.touches.TWO){case hn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=xe.TOUCH_DOLLY_PAN;break;case hn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=xe.TOUCH_DOLLY_ROTATE;break;default:this.state=xe.NONE}break;default:this.state=xe.NONE}this.state!==xe.NONE&&this.dispatchEvent(tc)}function Px(n){switch(this._trackPointer(n),this.state){case xe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case xe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case xe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case xe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=xe.NONE}}function Lx(n){this.enabled!==!1&&n.preventDefault()}function Dx(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ix(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class ah extends De{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Nt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element&&e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const ms=new U,Ou=new me,Fu=new me,zu=new U,Bu=new U;class Nx{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},c=t.element!==void 0?t.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.sortObjects=!0,this.getSize=function(){return{width:i,height:s}},this.render=function(g,v){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),Ou.copy(v.matrixWorldInverse),Fu.multiplyMatrices(v.projectionMatrix,Ou),u(g,g,v),this.sortObjects&&m(g)},this.setSize=function(g,v){i=g,s=v,r=i/2,o=s/2,c.style.width=g+"px",c.style.height=v+"px"};function l(g){g.isCSS2DObject&&(g.element.style.display="none");for(let v=0,_=g.children.length;v<_;v++)l(g.children[v])}function u(g,v,_){if(g.visible===!1){l(g);return}if(g.isCSS2DObject){ms.setFromMatrixPosition(g.matrixWorld),ms.applyMatrix4(Fu);const h=ms.z>=-1&&ms.z<=1&&g.layers.test(_.layers)===!0,x=g.element;x.style.display=h===!0?"":"none",h===!0&&(g.onBeforeRender(e,v,_),x.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(ms.x*r+r)+"px,"+(-ms.y*o+o)+"px)",x.parentNode!==c&&c.appendChild(x),g.onAfterRender(e,v,_));const S={distanceToCameraSquared:f(_,g)};a.objects.set(g,S)}for(let h=0,x=g.children.length;h<x;h++)u(g.children[h],v,_)}function f(g,v){return zu.setFromMatrixPosition(g.matrixWorld),Bu.setFromMatrixPosition(v.matrixWorld),zu.distanceToSquared(Bu)}function d(g){const v=[];return g.traverseVisible(function(_){_.isCSS2DObject&&v.push(_)}),v}function m(g){const v=d(g).sort(function(h,x){if(h.renderOrder!==x.renderOrder)return x.renderOrder-h.renderOrder;const S=a.objects.get(h).distanceToCameraSquared,E=a.objects.get(x).distanceToCameraSquared;return S-E}),_=v.length;for(let h=0,x=v.length;h<x;h++)v[h].element.style.zIndex=_-h}}}class Ux extends Wl{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const t=new fe;t.deleteAttribute("uv");const e=new Ge({side:cn}),i=new Ge,s=new qd(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Xt(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new Xl(t,i,6),a=new De;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);const c=new Xt(t,gs(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new Xt(t,gs(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const u=new Xt(t,gs(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);const f=new Xt(t,gs(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const d=new Xt(t,gs(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const m=new Xt(t,gs(100));m.position.set(0,20,0),m.scale.set(1,.1,1),this.add(m)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function gs(n){return new xp({color:0,emissive:16777215,emissiveIntensity:n})}const Z={sky:15985891,ground:15392723,wall:16052714,wallExt:15526628,trim:16777215,doorLeaf:13215612,doorEntrance:3494010,glass:11130101,frame:4871528,floorWood:13608570,woodLight:14201994,woodMid:12159838,woodDark:8017462,tileFloor:15331058,tileGrout:13489886,sofa:6258598,sofaDark:4612223,fabricBeige:14931392,fabricGrey:11844806,bedding:16118766,blanket:8298639,rug:14272942,black:2303533,steel:12831443,white:16448250,counter:15856372,cabinet:14341062,cabinetDark:7174792,leaf:5810286,leafDark:4163670,pot:13616307,accent:15246141,label:12999226},xa={...Z},Ui=(n,t,e)=>new Ut(n).lerp(new Ut(t),e).getHex();function Ox(n){Object.assign(Z,xa),Z.floorWood=n.floor,Z.wall=n.wall,Z.wallExt=Ui(n.wall,0,.04),Z.woodMid=n.wood,Z.woodLight=Ui(n.wood,16777215,.22),Z.woodDark=Ui(n.wood,0,.35),Z.cabinet=Ui(xa.cabinet,n.wood,.18),Z.sofa=n.sofa,Z.sofaDark=Ui(n.sofa,0,.25),Z.accent=n.accent,Z.blanket=Ui(n.accent,16777215,.3),Z.rug=Ui(xa.rug,n.floor,.25)}const va=new Map;function Un(n,t={}){const e=`${n}|${JSON.stringify(t)}`;return va.has(e)||va.set(e,new Ge({color:n,roughness:.78,metalness:0,...t})),va.get(e)}function yl(){return Un(Z.glass,{transparent:!0,opacity:.28,roughness:.05,depthWrite:!1})}const El=30,ku=72,Ma=[4.5,34],ba=[.15,1.35],Sa=new U(5,0,3.5),Gu=Math.PI*2,lh=n=>n<.5?4*n*n*n:1-(-2*n+2)**3/2;function ch(){const n=window.matchMedia?.("(pointer: coarse)").matches||Math.min(window.innerWidth,window.innerHeight)<640;return{coarse:n,maxDpr:n?1.5:2,shadowSize:n?1024:2048,pointLights:!n}}function Fx(n,t=ch()){const e=new sh({antialias:!0,powerPreference:"high-performance",stencil:!1});let i=Math.min(window.devicePixelRatio||1,t.maxDpr);e.setPixelRatio(i),e.outputColorSpace=tn,e.toneMapping=wo,e.toneMappingExposure=1,e.shadowMap.enabled=!0,e.shadowMap.type=Ms,e.shadowMap.autoUpdate=!1,e.shadowMap.needsUpdate=!0,Object.assign(e.domElement.style,{display:"block",width:"100%",height:"100%",touchAction:"none",outline:"none"});const s=new Wl;s.background=new Ut(Z.sky),s.fog=new Ro(Z.sky,40,120);const r=new dn(El,1,.05,300);r.rotation.order="YXZ";const o=new Nx;Object.assign(o.domElement.style,{position:"absolute",left:"0",top:"0",pointerEvents:"none",overflow:"hidden"}),getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.append(e.domElement,o.domElement);const a=new oh(r,e.domElement);a.enableDamping=!0,a.dampingFactor=.1,a.rotateSpeed=.6,a.zoomSpeed=.9,a.minDistance=Ma[0],a.maxDistance=Ma[1],a.minPolarAngle=ba[0],a.maxPolarAngle=ba[1],a.screenSpacePanning=!1,a.touches={ONE:hn.ROTATE,TWO:hn.DOLLY_PAN},a.mouseButtons={LEFT:Xe.ROTATE,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN},a.target.copy(Sa);const c=new Wd(16774118,15787736,1.1);s.add(c);const l=new Yd(16777215,2.4);l.castShadow=!0,l.shadow.mapSize.set(t.shadowSize,t.shadowSize),l.shadow.bias=-5e-4,l.shadow.normalBias=.03,l.shadow.radius=4;const u=l.shadow.camera;u.left=-9,u.right=9,u.top=9,u.bottom=-9,u.near=1,u.far=60,l.target.position.copy(Sa),s.add(l,l.target);const f=new Ml(e),d=new Ux;s.environment=f.fromScene(d,.04).texture,s.environmentIntensity=.25,d.dispose(),f.dispose();const m={left:0,right:0,top:0,bottom:0},g={...m};let v={w:1,h:1};function _(){const ct=(g.left-g.right)/2,ft=(g.top-g.bottom)/2;Math.abs(ct)<.5&&Math.abs(ft)<.5?r.clearViewOffset():r.setViewOffset(v.w,v.h,-ct,-ft,v.w,v.h),r.updateProjectionMatrix()}const h=new Set,x=new jd;let S=3,E=!1,L=0,A=0;function w(ct=2){ct>S&&(S=ct)}const p=()=>{const ct=n.clientWidth||window.innerWidth,ft=n.clientHeight||window.innerHeight;v={w:ct,h:ft},e.setSize(ct,ft,!1),o.setSize(ct,ft),r.aspect=ct/ft,_(),w()};function M(ct){if(!E){A=0,L=0;return}A++,ct>.03&&L++,A>=40&&(L>28&&i>.9&&(i=Math.max(.9,i-.25),e.setPixelRatio(i),e.setSize(v.w,v.h,!1)),A=0,L=0)}function T(){const ct=Math.min(.1,x.getDelta());for(const bt of h)bt(ct);let ft=!1;for(const bt of["left","right","top","bottom"]){const Q=m[bt]-g[bt];Math.abs(Q)>.4?(g[bt]+=Q*Math.min(1,ct*10),ft=!0):g[bt]=m[bt]}ft&&(_(),w()),S>0?(S--,e.render(s,r),o.render(s,r),M(ct),E=!0):E=!1}a.addEventListener("change",()=>w());const C=new U,P=new Mo;function D(){return P.setFromVector3(C.copy(r.position).sub(a.target)),{target:a.target.clone(),distance:P.radius,azimuth:P.theta,polar:P.phi}}function H({target:ct,distance:ft,azimuth:bt,polar:Q}){a.target.set(ct.x,ct.y??0,ct.z),r.position.copy(a.target).add(C.setFromSphericalCoords(ft,Q,bt)),r.lookAt(a.target)}const N=ct=>ct-Gu*Math.floor((ct+Math.PI)/Gu);function k(ct){const ft=new U(ct.target.x,ct.target.y??0,ct.target.z),bt=new U().setFromSphericalCoords(ct.distance,ct.polar,ct.azimuth).add(ft),Q=new De;return Q.position.copy(bt),Q.lookAt(ft),{pos:bt,quat:Q.quaternion.clone(),fov:El}}let B=null;function J(){a._sphericalDelta?.set(0,0,0),a._panOffset?.set(0,0,0),"_scale"in a&&(a._scale=1)}function ot(){if(!B)return;const ct=B;B=null,J(),ct.resolve(!1)}a.addEventListener("start",ot);function pt(ct,{duration:ft=1.1}={}){ot();const bt=D(),Q={target:new U(ct.target?.x??bt.target.x,ct.target?.y??0,ct.target?.z??bt.target.z),distance:Ue.clamp(ct.distance??bt.distance,...Ma),azimuth:ct.azimuth??bt.azimuth,polar:Ue.clamp(ct.polar??bt.polar,...ba)};return ft>0?new Promise(St=>{B={kind:"view",from:bt,to:Q,duration:ft,resolve:St,t:0,dAz:N(Q.azimuth-bt.azimuth),d0:Math.log(bt.distance),d1:Math.log(Q.distance)},w(3)}):(H(Q),J(),w(),Promise.resolve(!0))}function wt(ct,{duration:ft=1.2}={}){return ot(),ft>0?new Promise(bt=>{B={kind:"pose",pose:ct,duration:ft,resolve:bt,t:0,fromPos:r.position.clone(),fromQuat:r.quaternion.clone(),fromFov:r.fov},w(3)}):(r.position.copy(ct.pos),r.quaternion.copy(ct.quat),r.fov=ct.fov,r.updateProjectionMatrix(),w(),Promise.resolve(!0))}function Ct(ct){if(!B)return;const ft=B;ft.t=Math.min(1,ft.t+ct/ft.duration);const bt=lh(ft.t);if(ft.kind==="view")C.lerpVectors(ft.from.target,ft.to.target,bt),H({target:C.clone(),distance:Math.exp(Ue.lerp(ft.d0,ft.d1,bt)),azimuth:ft.from.azimuth+ft.dAz*bt,polar:Ue.lerp(ft.from.polar,ft.to.polar,bt)});else{r.position.lerpVectors(ft.fromPos,ft.pose.pos,bt),r.quaternion.slerpQuaternions(ft.fromQuat,ft.pose.quat,bt);const Q=Ue.lerp(ft.fromFov,ft.pose.fov,bt);Q!==r.fov&&(r.fov=Q,r.updateProjectionMatrix())}w(),ft.t>=1&&(B=null,J(),ft.resolve(!0))}return h.add(Ct),p(),new ResizeObserver(p).observe(n),document.addEventListener("visibilitychange",()=>w(3)),{renderer:e,scene:s,camera:r,controls:a,labelRenderer:o,hemi:c,sun:l,center:Sa,quality:t,insets:m,invalidate:w,invalidateShadows(){e.shadowMap.needsUpdate=!0,w()},onFrame(ct){return h.add(ct),()=>h.delete(ct)},flyView:pt,flyPose:wt,viewPose:k,cancelFlight:ot,getView:D,get flying(){return!!B},setInsets(ct){Object.assign(m,ct),w()},start(){e.setAnimationLoop(T)},pause(){e.setAnimationLoop(null)},resume(){x.getDelta(),e.setAnimationLoop(T),w(3)}}}function tr(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new rn;let l=0;for(let u=0;u<n.length;++u){const f=n[u];let d=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in f.attributes){if(!i.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;r[m]===void 0&&(r[m]=[]),r[m].push(f.attributes[m]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in f.morphAttributes){if(!s.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[m]===void 0&&(o[m]=[]),o[m].push(f.morphAttributes[m])}if(t){let m;if(e)m=f.index.count;else if(f.attributes.position!==void 0)m=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,m,u),l+=m}}if(e){let u=0;const f=[];for(let d=0;d<n.length;++d){const m=n[d].index;for(let g=0;g<m.count;++g)f.push(m.getX(g)+u);u+=n[d].attributes.position.count}c.setIndex(f)}for(const u in r){const f=Hu(r[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,f)}for(const u in o){const f=o[u][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<f;++d){const m=[];for(let v=0;v<o[u].length;++v)m.push(o[u][v][d]);const g=Hu(m);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}}return c}function Hu(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){const u=n[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new xn(o,e,i);let c=0;for(let l=0;l<n.length;++l){const u=n[l];if(u.isInterleavedBufferAttribute){const f=c/e;for(let d=0,m=u.count;d<m;d++)for(let g=0;g<e;g++){const v=u.getComponent(d,g);a.setComponent(d+f,g,v)}}else o.set(u.array,c);c+=u.count*e}return s!==void 0&&(a.gpuType=s),a}const yi=2.7,uh=.2,dh=.12,qi=n=>(n.x1-n.x0)*(n.z1-n.z0),st={templateId:"",bedrooms:2,scale:1,size:{w:10,d:7},rooms:[],walls:[],placements:[],area:0,totalArea:0,floors:[],floorId:"main",custom:!1};function hh(n){st.templateId=n.templateId,st.bedrooms=n.bedrooms,st.scale=n.scale??1,st.size=n.size,st.rooms=n.rooms,st.walls=n.walls,st.placements=n.placements,st.area=n.rooms.reduce((t,e)=>t+qi(e),0),st.floors=n.floors??[{id:"main",name:"Tầng 1",area:st.area}],st.floorId=n.floorId??"main",st.totalArea=n.totalArea??st.area,st.custom=!!n.custom}const zx={plus:"M12 5v14M5 12h14",minus:"M5 12h14",rotateLeft:"M3 12a9 9 0 1 0 3-6.7M3 4v5h5",rotateRight:"M21 12a9 9 0 1 1-3-6.7M21 4v5h-5",home:"M4 11 12 4l8 7M6 10v10h12V10",close:"M6 6l12 12M18 6 6 18",search:"M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",moon:"M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",sun:"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4",play:"M7 5v14l11-7z",pause:"M8 5v14M16 5v14",walk:"M13 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM10 21l2-6-3-2 1-5 3 2 2 3M12 15l3 6",cube:"M12 3 4 7.5v9L12 21l8-4.5v-9zM4 7.5 12 12l8-4.5M12 12v9",pin:"M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10zM12 8.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",expand:"M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",shrink:"M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5",pencil:"M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16zM13.5 6.5l4 4",eyeOff:"M3 3l18 18M10.6 5.2A10 10 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 4M6.2 6.2A17 17 0 0 0 2 12s4 7 10 7a9.7 9.7 0 0 0 4.2-1M9.9 9.9a3 3 0 0 0 4.2 4.2",trash:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",list:"M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",undo:"M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3",eye:"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"};function te(n,t=18,e=1.8){return`<svg class="ico" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${zx[n]??""}"/></svg>`}const Ht=n=>String(n??"").replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`),Tl=2.1,Bx=.9,fh=2.1,kx=2.3;function ci(n,t=256){const e=document.createElement("canvas");e.width=e.height=t,n(e.getContext("2d"),t);const i=new Gd(e);return i.wrapS=i.wrapT=ir,i.colorSpace=tn,i.anisotropy=8,i}const Gx=()=>{const n={h:0,s:0,l:0};return new Ut(Z.floorWood).getHSL(n),ci((t,e)=>{const s=e/8;for(let r=0;r<8;r++){const o=Math.round(n.l*100)-3+r*37%7;t.fillStyle=`hsl(${Math.round(n.h*360)} ${Math.round(n.s*100)}% ${o}%)`,t.fillRect(0,r*s,e,s),t.fillStyle="rgba(60,35,15,0.07)";for(let a=0;a<14;a++)t.fillRect((r*53+a*37)%e,r*s+a*29%s,30+a*17%60,1);t.fillStyle="rgba(60,35,15,0.30)",t.fillRect(0,r*s,e,1.5),t.fillRect(r*97%e,r*s,1.5,s)}})},Hx=()=>ci((n,t)=>{n.fillStyle="#e9eef2",n.fillRect(0,0,t,t),n.strokeStyle="#c8d1da",n.lineWidth=3,n.strokeRect(0,0,t,t),n.strokeRect(t/2,0,.1,t),n.strokeRect(0,t/2,t,.1)}),ur=n=>()=>(n=(n*1664525+1013904223)%4294967296,n/4294967296),Vx=()=>ci((n,t)=>{const e=ur(7);n.fillStyle="#efece6",n.fillRect(0,0,t,t),n.lineCap="round";for(let i=0;i<9;i++){n.strokeStyle=`rgba(120,115,110,${.12+e()*.2})`,n.lineWidth=.6+e()*1.6,n.beginPath();let s=e()*t,r=0;n.moveTo(s,r);for(let o=0;o<6;o++)s+=(e()-.5)*70,r+=t/6,n.lineTo(s,r);n.stroke()}n.strokeStyle="rgba(190,185,178,0.7)",n.lineWidth=1.5,n.strokeRect(0,0,t,t)}),Wx=()=>ci((n,t)=>{const e=ur(11);n.fillStyle="#b9bcc0",n.fillRect(0,0,t,t);for(let i=0;i<2200;i++){const s=150+Math.floor(e()*70);n.fillStyle=`rgba(${s},${s},${s+4},0.35)`,n.fillRect(e()*t,e()*t,1+e()*2,1+e()*2)}n.strokeStyle="rgba(90,92,96,0.45)",n.lineWidth=2,n.strokeRect(0,0,t,t)}),Xx=()=>ci((n,t)=>{const e=ur(3);n.fillStyle="#c9bfb2",n.fillRect(0,0,t,t);for(let i=0;i<4200;i++){const s=175+Math.floor(e()*45);n.fillStyle=`rgba(${s},${s-8},${s-20},0.55)`,n.fillRect(e()*t,e()*t,1,2)}}),$x=()=>ci((n,t)=>{const e=ur(21),i=6,s=t/i;for(let r=0;r<i;r++){const o=17+Math.floor(e()*6);n.fillStyle=`hsl(22 38% ${o}%)`,n.fillRect(0,r*s,t,s),n.fillStyle="rgba(0,0,0,0.18)";for(let a=0;a<10;a++)n.fillRect(e()*t,r*s+e()*s,30+e()*80,1);n.fillStyle="rgba(0,0,0,0.5)",n.fillRect(0,r*s,t,1.5),n.fillRect(r*83%t,r*s,1.5,s)}}),qx=()=>ci((n,t)=>{const e=ur(31);n.fillStyle="#6f7378",n.fillRect(0,0,t,t);for(let i=0;i<3200;i++){const s=70+Math.floor(e()*130);n.fillStyle=`rgba(${s},${s},${s+3},0.6)`,n.fillRect(e()*t,e()*t,1+e()*2.2,1+e()*2.2)}n.strokeStyle="rgba(30,32,36,0.55)",n.lineWidth=2,n.strokeRect(0,0,t,t)}),Yx=()=>ci((n,t)=>{n.fillStyle="#f2f3f1",n.fillRect(0,0,t,t),n.strokeStyle="rgba(160,165,160,0.35)",n.lineWidth=1,n.strokeRect(0,0,t,t)}),jx=()=>ci((n,t)=>{n.fillStyle="#cfe9f2",n.fillRect(0,0,t,t),n.strokeStyle="rgba(90,120,135,0.9)",n.lineWidth=5,n.strokeRect(0,0,t,t),n.strokeStyle="rgba(255,255,255,0.55)",n.lineWidth=3,n.beginPath(),n.moveTo(t*.15,t*.85),n.lineTo(t*.55,t*.15),n.stroke()}),Vu={wood:[Gx,2.2,.55],darkwood:[$x,2.2,.5],tile:[Hx,1.2,.3],marble:[Vx,1.6,.15],granite:[qx,1.6,.25],concrete:[Wx,2,.85],epoxy:[Yx,2,.08],carpet:[Xx,1,1],glass:[jx,1.2,.05,{transparent:!0,opacity:.42,depthWrite:!1,metalness:.1}]},Wu=new Map;function Kx(n,t){const e=n==="wood"?`wood|${Z.floorWood}`:n;let i=Wu.get(e);return i||(i=t(),Wu.set(e,i)),i}function Zx(n){const t=Vu[n.floor]?n.floor:"wood",[e,i,s,r]=Vu[t],o=Kx(t,e).clone();return o.needsUpdate=!0,o.repeat.set((n.x1-n.x0)/i,(n.z1-n.z0)/i),new Ge({map:o,roughness:s,...r??{}})}const lo=[];function Xu(n,t,e,i,s,r,o,a,c,l){if(i-e<1e-4||r-s<1e-4||a-o<1e-4)return;const u=new fe(i-e,r-s,a-o);u.translate((e+i)/2,(s+r)/2,(o+a)/2),lo.push({material:c,geo:u}),l&&t.push({x0:e,x1:i,z0:o,z1:a})}function Jx(n){const t=Un(Z.frame);for(const i of[...n.children])if(i.isMesh&&i.material===t){i.updateMatrix();const s=i.geometry.clone().applyMatrix4(i.matrix);lo.push({material:t,geo:s}),i.geometry.dispose(),n.remove(i)}const e=new Map;for(const{material:i,geo:s}of lo)e.has(i)||e.set(i,[]),e.get(i).push(s);for(const[i,s]of e){const r=new Xt(tr(s,!1),i);r.castShadow=!0,r.receiveShadow=!0,r.userData.blocker=!0,n.add(r);for(const o of s)o.dispose()}lo.length=0}function Qx(n,t,e){const{dir:i,at:s,t:r}=n,o=r/2,a=n.from-o,c=n.to+o,l=r>=.2,u=Un(l?Z.wallExt:Z.wall),f=[...n.openings].map(g=>({...g,s:g.c-g.w/2,e:g.c+g.w/2})).sort((g,v)=>g.s-v.s),d=(g,v,_,h,x)=>{i==="x"?Xu(t,e,g,v,_,h,s-o,s+o,u,x):Xu(t,e,s-o,s+o,_,h,g,v,u,x)};let m=a;for(const g of f){if(d(m,g.s,0,yi,!0),g.type==="window"){const v=g.sill??Bx;d(g.s,g.e,0,v,!0),d(g.s,g.e,fh,yi,!1),tv(t,i,s,g,v)}else g.type==="door"?(d(g.s,g.e,Tl,yi,!1),ev(t,i,s,g,l||g.entrance===!0)):d(g.s,g.e,kx,yi,!1);m=g.e}d(m,c,0,yi,!0)}function tv(n,t,e,i,s){const r=fh-s,o=t==="x"?[i.w,r,.03]:[.03,r,i.w],a=new Xt(new fe(...o),yl()),c=s+r/2;t==="x"?a.position.set(i.c,c,e):a.position.set(e,c,i.c),n.add(a);const l=i.w>1.1?1:0,u=Un(Z.frame);for(let d=-1;d<=l;d+=2){const m=l?0:d<0?-i.w/2:i.w/2,g=new Xt(new fe(...t==="x"?[.04,r,.06]:[.06,r,.04]),u);t==="x"?g.position.set(i.c+m,c,e):g.position.set(e,c,i.c+m),n.add(g)}const f=new Xt(new fe(...t==="x"?[i.w,.04,.08]:[.08,.04,i.w]),u);t==="x"?f.position.set(i.c,s+.02,e):f.position.set(e,s+.02,i.c),n.add(f)}function ev(n,t,e,i,s){const r=i.w-.04,o=new Xt(new fe(r,Tl-.03,.045),Un(s?Z.doorEntrance:Z.doorLeaf,{roughness:.5}));o.position.set(r/2,(Tl-.03)/2,0),o.castShadow=!0;const a=new Zt;a.add(o),t==="x"?(a.position.set(i.s+.02,0,e),a.rotation.y=s?0:-1.3):(a.position.set(e,0,i.s+.02),a.rotation.y=-Math.PI/2+(s?0:1.3)),n.add(a)}function nv(n){const t=document.createElement("button");t.type="button",t.className="room-label",t.dataset.room=n.id,t.innerHTML=`<b>${Ht(n.name)}</b><span>${qi(n).toFixed(0)} m²</span>`;const e=new ah(t);return e.position.set((n.x0+n.x1)/2,.5,(n.z0+n.z1)/2),e}const iv=new $i({visible:!1}),sv={window:"Cửa sổ",door:"Cửa đi",open:"Ô thông"};function rv(n){const t=[];for(const e of st.walls)for(const i of e.openings){if(!i.id)continue;const s=e.t+.3,r=e.dir==="x"?[i.w,.9,s]:[s,.9,i.w],o=new Xt(new fe(...r),iv);e.dir==="x"?o.position.set(i.c,.45,e.at):o.position.set(e.at,.45,i.c),o.userData.ref={type:"opening",id:i.id},o.userData.label=sv[i.type]??"Cửa",n.add(o),t.push({id:i.id,mesh:o})}return t}function ov(){const n=new Zt,t=new Zt,e=[],i=new Xt(new ql(60,48),Un(Z.ground,{roughness:1}));i.rotation.x=-Math.PI/2,i.position.set(st.size.w/2,-.21,st.size.d/2),i.receiveShadow=!0,n.add(i);const s=new Xt(new fe(st.size.w+.9,.2,st.size.d+.9),Un(14932176));s.position.set(st.size.w/2,-.1,st.size.d/2),s.receiveShadow=!0,s.castShadow=!0,n.add(s);const r=[],o=new Map;for(const f of st.rooms){const d=new Xt(new fe(f.x1-f.x0,.04,f.z1-f.z0),Zx(f));d.position.set((f.x0+f.x1)/2,.02,(f.z0+f.z1)/2),d.receiveShadow=!0,d.userData.ref={type:"room",id:f.id},o.set(f.id,d),n.add(d);const m=nv(f);n.add(m),r.push(m)}for(const f of st.walls)Qx(f,t,e);Jx(t),n.add(t);const a=new Zt;n.add(a);const c=rv(a),l=new Xt(new fe(st.size.w+.2,.1,st.size.d+.2),Un(Z.trim,{roughness:.95}));l.position.set(st.size.w/2,yi+.05,st.size.d/2),l.castShadow=!0,l.receiveShadow=!0,l.visible=!1,n.add(l);const u=st.rooms.map(f=>{const d=new qd(16773336,7,8,2);return d.position.set((f.x0+f.x1)/2,yi-.3,(f.z0+f.z1)/2),n.add(d),d});return{root:n,walls:t,ceiling:l,labels:r,lamps:u,colliders:e,floors:o,openings:c}}function Mt(n,t,e,i,s,r,o,a,c){const l=new Xt(new fe(t,e,i),typeof s=="object"?s:Un(s,c));return l.position.set(r,o+e/2,a),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function Le(n,t,e,i,s,r,o,a,c,l=24){const u=new Xt(new cr(t,e,i,l),Un(s,c));return u.position.set(r,o+i/2,a),u.castShadow=!0,u.receiveShadow=!0,n.add(u),u}function co(n,t,e,i,s,r,o=1,a=1,c=1){const l=new Xt(new As(t,16,12),Un(e));return l.position.set(i,s,r),l.scale.set(o,a,c),l.castShadow=!0,n.add(l),l}const we=(n,t,e,i={})=>({group:n,w:t,d:e,...i});function av(n=2.4){const t=new Zt,e=.95;Mt(t,n,.16,e,Z.sofaDark,0,.08,0);const i=3,s=(n-.3)/i;for(let r=0;r<i;r++)Mt(t,s-.02,.2,.68,Z.sofa,-n/2+.15+s*(r+.5),.24,.1);Mt(t,n,.5,.22,Z.sofa,0,.24,-e/2+.11);for(const r of[-1,1])Mt(t,.15,.36,e,Z.sofa,r*(n/2-.075),.24,0);return Mt(t,.45,.4,.12,Z.accent,-n/2+.55,.44,-.2),Mt(t,.45,.4,.12,Z.fabricBeige,n/2-.55,.44,-.2),we(t,n,e)}function lv(){const n=new Zt;Mt(n,.85,.16,.85,Z.sofaDark,0,.08,0),Mt(n,.6,.18,.6,Z.fabricBeige,0,.24,.07),Mt(n,.85,.5,.2,Z.fabricBeige,0,.24,-.325);for(const t of[-1,1])Mt(n,.13,.34,.85,Z.fabricBeige,t*.36,.24,0);return we(n,.85,.85)}function cv(){const n=new Zt;Mt(n,1.1,.04,.6,Z.woodLight,0,.38,0);for(const t of[-1,1])for(const e of[-1,1])Mt(n,.05,.38,.05,Z.woodDark,t*.5,0,e*.25);return Mt(n,.3,.05,.2,Z.white,-.2,.42,0),Le(n,.06,.05,.1,Z.accent,.25,.42,.05),we(n,1.1,.6)}function uv(n=1.8){const t=new Zt;return Mt(t,n,.45,.4,Z.woodMid,0,0,0),Mt(t,n-.1,.02,.38,Z.woodDark,0,.22,.01),Mt(t,1.35,.78,.05,Z.black,0,.55,0),Mt(t,.25,.1,.12,Z.black,0,.45,0),we(t,n,.4)}function dv(n,t,e=Z.rug){e==="beige"&&(e=Z.fabricBeige);const i=new Zt;return Mt(i,n,.015,t,e,0,.04,0),Mt(i,n-.3,.017,t-.3,Z.fabricGrey,0,.04,0),we(i,n,t,{solid:!1})}function hv(n=1){const t=new Zt;return Le(t,.18*n,.13*n,.32*n,Z.pot,0,0,0),co(t,.3*n,Z.leaf,0,.62*n,0,1,1.2,1),co(t,.2*n,Z.leafDark,.12*n,.85*n,.05*n),co(t,.18*n,Z.leaf,-.1*n,.95*n,-.05*n),we(t,.4*n,.4*n)}function fv(){const n=new Zt;Le(n,.12,.12,.03,Z.black,0,0,0),Le(n,.012,.012,1.5,Z.black,0,.03,0);const t=Le(n,.15,.22,.28,16773590,0,1.45,0,{emissive:16769704,emissiveIntensity:.6});return t.castShadow=!1,we(n,.3,.3)}function pv(n=1){const t=new Zt;Mt(t,n,.04,.3,Z.woodMid,0,.78,0),Mt(t,n-.04,.5,.28,Z.cabinet,0,.28,0);for(const e of[-1,1])Mt(t,.04,.28,.04,Z.woodDark,e*(n/2-.05),0,0);return Le(t,.07,.05,.16,Z.pot,-.25,.82,0),Mt(t,.22,.02,.15,Z.accent,.2,.82,0),we(t,n,.3)}function mv(n=1.6,t=2){const e=new Zt;Mt(e,n+.1,.25,t+.05,Z.woodDark,0,0,0),Mt(e,n,.22,t,Z.bedding,0,.25,.02),Mt(e,n,.04,t*.55,Z.blanket,0,.46,t*.2),Mt(e,n+.1,.95,.08,Z.woodMid,0,0,-t/2-0);for(const i of[-1,1])Mt(e,.55,.12,.35,Z.white,i*n*.25,.47,-t/2+.3);return we(e,n+.1,t+.05)}function gv(){const n=new Zt;Mt(n,.45,.5,.4,Z.woodLight,0,0,0),Mt(n,.4,.01,.01,Z.woodDark,0,.3,.2);const t=Le(n,.09,.12,.16,16773590,0,.5,0,{emissive:16769704,emissiveIntensity:.5});return t.castShadow=!1,we(n,.45,.4)}function _v(n=1.4,t=2.2){const e=new Zt;Mt(e,n,t,.6,Z.cabinet,0,0,0);const i=Math.max(2,Math.round(n/.7));for(let s=1;s<i;s++)Mt(e,.012,t-.1,.01,Z.cabinetDark,-n/2+n/i*s,.05,.305);for(let s=0;s<i;s++){const r=-n/2+n/i*(s+.5);Mt(e,.025,.28,.02,Z.steel,r+(s%2?-.1:.1),1,.31)}return we(e,n,.6)}function xv(){const n=new Zt;Mt(n,1.2,.04,.6,Z.woodLight,0,.72,0);for(const t of[-1,1])Mt(n,.04,.72,.55,Z.woodDark,t*.56,0,0);return Mt(n,.5,.3,.03,Z.black,0,.9,-.12),Mt(n,.06,.18,.06,Z.black,0,.76,-.12),Mt(n,.4,.015,.14,Z.white,0,.76,.1),we(n,1.2,.6)}function vv(){const n=new Zt;Mt(n,.42,.04,.42,Z.woodLight,0,.44,0);for(const t of[-1,1])for(const e of[-1,1])Mt(n,.035,.44,.035,Z.woodDark,t*.18,0,e*.18);return Mt(n,.42,.42,.04,Z.woodLight,0,.48,-.19),we(n,.42,.42)}function Mv(){const n=new Zt;Mt(n,1.4,.05,.8,Z.woodLight,0,.72,0);for(const t of[-1,1])for(const e of[-1,1])Mt(n,.06,.72,.06,Z.woodDark,t*.64,0,e*.34);return Le(n,.11,.08,.16,Z.white,0,.77,0),co(n,.1,Z.accent,0,1,0),we(n,1.4,.8)}function bv(n=3,t=!0){const e=new Zt,i=.6;Mt(e,n,.86,i,Z.cabinet,0,0,0),Mt(e,n+.02,.04,i+.04,Z.counter,0,.86,.02);for(let s=1;s<Math.round(n/.6);s++)Mt(e,.01,.8,.01,Z.cabinetDark,-n/2+s*.6,.03,i/2+.005);Mt(e,.7,.012,.42,Z.steel,-n*.25,.9,.02),Le(e,.015,.015,.28,Z.steel,-n*.25,.9,-.2),Mt(e,.012,.012,.14,Z.steel,-n*.25,1.17,-.13),Mt(e,.6,.012,.5,Z.black,n*.2,.9,.02);for(const[s,r]of[[-.14,-.1],[.14,-.1],[-.14,.12],[.14,.12]])Le(e,.08,.08,.008,Z.cabinetDark,n*.2+s,.9,.02+r,{},20);return Mt(e,n,.7,.35,Z.cabinet,0,1.5,-.125),Mt(e,.75,.12,.4,Z.steel,n*.2,1.38,-.1),we(e,n,i)}function Sv(){const n=new Zt;return Mt(n,.7,1.85,.7,Z.steel,0,0,0,{metalness:.35,roughness:.4}),Mt(n,.68,.012,.01,Z.cabinetDark,0,.62,.355),Mt(n,.025,.5,.03,Z.cabinetDark,.28,1.1,.36),Mt(n,.025,.3,.03,Z.cabinetDark,.28,.25,.36),we(n,.7,.7)}function yv(n=1.2){const t=new Zt,e=.32,i=2;Mt(t,.03,i,e,Z.woodMid,-n/2+.015,0,0),Mt(t,.03,i,e,Z.woodMid,n/2-.015,0,0),Mt(t,n,.02,.01,Z.woodDark,0,0,-e/2+.005),Mt(t,n,i,.015,Z.woodDark,0,0,-e/2+.01);const s=5,r=[Z.accent,Z.sofa,Z.fabricBeige,Z.leaf,Z.blanket];for(let o=0;o<=s;o++)Mt(t,n,.025,e,Z.woodMid,0,(i-.025)*(o/s),0);for(let o=0;o<s;o++){const a=(i-.025)*(o/s)+.025;let c=-n/2+.07;for(let l=0;c<n/2-.12;l++){const u=.04+(o*7+l*5)%4*.012,f=.22+(o*3+l*7)%5*.025;Mt(t,u,f,e*.7,r[(o+l)%r.length],c+u/2,a,.02),c+=u+.008,l%6===5&&(c+=.18)}}return we(t,n,e)}function Ev(){const n=new Zt;Mt(n,1,.8,.45,Z.woodLight,0,.05,0);for(const t of[-1,1])for(const e of[-1,1])Mt(n,.04,.05,.04,Z.woodDark,t*.45,0,e*.19);for(let t=0;t<3;t++)Mt(n,.92,.002,.01,Z.woodDark,0,.05+.26*(t+1)-.02,.226),Mt(n,.1,.02,.025,Z.steel,0,.05+.26*t+.13,.235);return Le(n,.07,.06,.12,Z.pot,-.3,.85,0),Mt(n,.22,.03,.16,Z.accent,.25,.85,0),we(n,1,.45)}function Tv(){const n=new Zt;return Le(n,.24,.24,.03,Z.woodLight,0,.47,0,{},28),Le(n,.015,.015,.47,Z.black,0,0,0),Le(n,.15,.15,.02,Z.black,0,0,0),Le(n,.05,.04,.09,Z.pot,.06,.5,.03),we(n,.5,.5)}function wv(){const n=new Zt;return Le(n,.28,.3,.38,Z.fabricBeige,0,.02,0,{},28),Le(n,.29,.29,.04,Z.sofaDark,0,.38,0,{},28),we(n,.6,.6)}function Av(){const n=new Zt;return Le(n,.17,.17,.05,Z.woodLight,0,.62,0,{},24),Le(n,.014,.014,.62,Z.black,0,0,0),Le(n,.15,.15,.02,Z.black,0,0,0),we(n,.36,.36)}function Rv(){const n=new Zt;return Mt(n,.6,1.7,.04,Z.woodDark,0,.05,0),Mt(n,.5,1.6,.012,13624303,0,.1,.022,{metalness:.9,roughness:.08}),Mt(n,.04,.5,.2,Z.woodDark,-.2,0,-.12),Mt(n,.04,.5,.2,Z.woodDark,.2,0,-.12),we(n,.6,.3)}function Cv(){const n=new Zt;return Mt(n,.38,.4,.2,Z.white,0,.35,-.2),Mt(n,.36,.38,.5,Z.white,0,0,0),Mt(n,.36,.04,.4,Z.white,0,.38,.05),we(n,.4,.62)}function Pv(){const n=new Zt;return Mt(n,.6,.78,.5,Z.cabinet,0,0,0),Mt(n,.64,.04,.54,Z.counter,0,.78,0),Mt(n,.34,.01,.28,Z.white,0,.82,.02),Le(n,.012,.012,.16,Z.steel,0,.82,-.18),Mt(n,.5,.7,.02,Z.glass,0,1.15,-.24,{transparent:!0,opacity:.55,metalness:.8,roughness:.05}),we(n,.64,.54)}function Lv(){const n=new Zt;Mt(n,.9,.06,.9,Z.white,0,0,0);const t=new Xt(new fe(.9,1.95,.025),yl());t.position.set(0,.06+.975,.45),n.add(t);const e=new Xt(new fe(.025,1.95,.9),yl());return e.position.set(.45,.06+.975,0),n.add(e),Le(n,.012,.012,1.1,Z.steel,-.38,1,-.38),Le(n,.09,.09,.015,Z.steel,-.3,2.05,-.38),we(n,.9,.9)}function Dv(n,t,e,i,s,r=0){if(e.group.position.set(i,0,s),e.group.rotation.y=r,n.add(e.group),e.solid===!1)return e.group;const o=Math.abs(Math.sin(r))>.5,a=o?e.d:e.w,c=o?e.w:e.d;return t.push({x0:i-a/2,x1:i+a/2,z0:s-c/2,z1:s+c/2}),e.group}const Iv={sofa:av,armchair:lv,coffeeTable:cv,tvUnit:uv,rug:dv,plant:hv,floorLamp:fv,console:pv,bed:mv,nightstand:gv,wardrobe:_v,desk:xv,chair:vv,diningTable:Mv,kitchenRun:bv,fridge:Sv,toilet:Cv,vanity:Pv,shower:Lv,bookshelf:yv,dresser:Ev,sideTable:Tv,ottoman:wv,barStool:Av,standingMirror:Rv};function Nv(n){n.updateMatrixWorld(!0);const t=new Map;for(const e of[...n.children]){if(!e.isMesh)continue;const i=e.material.uuid+(e.castShadow?"c":"n");t.has(i)||t.set(i,{material:e.material,cast:e.castShadow,geos:[]});const s=e.geometry.clone();s.applyMatrix4(e.matrix),t.get(i).geos.push(s),e.geometry.dispose(),n.remove(e)}for(const e of t.values()){const i=e.geos.length>1?tr(e.geos,!1):e.geos[0];if(e.geos.length>1)for(const r of e.geos)r.dispose();const s=new Xt(i,e.material);s.castShadow=e.cast,s.receiveShadow=!0,n.add(s)}}function Uv(){const n=new Zt,t=[],e=new Map;for(const i of st.placements){const s=Iv[i.kind];if(!s)throw new Error("Thiếu builder nội thất: "+i.kind);const r=s(...i.args??[]);(i.pick===!1||i.hidden)&&(r.solid=!1),Nv(r.group);const o=Dv(n,t,r,i.x,i.z,i.rot??0);o.name=i.id,i.hidden&&(o.visible=!1),e.set(i.id,o)}return{root:n,colliders:t,groups:e}}const Gi={room:new Map,item:new Map,opening:new Map},Ov={window:"Cửa sổ",door:"Cửa đi",open:"Ô thông"};function ph(n,t){return st.rooms.find(e=>n>=e.x0&&n<=e.x1&&t>=e.z0&&t<=e.z1)??null}function mh(){Gi.room=new Map(st.rooms.map(n=>[n.id,{...n,type:"room",area:qi(n)}])),Gi.item=new Map(st.placements.filter(n=>n.pick).map(n=>[n.id,{...n,type:"item",roomId:ph(n.x,n.z)?.id??null,dims:null}])),Gi.opening=new Map(st.walls.flatMap(n=>n.openings.filter(t=>t.id).map(t=>[t.id,{...t,kind:t.type,type:"opening",name:Fv(t.type),dir:n.dir,at:n.at,wallFrom:n.from,wallTo:n.to,roomId:null}])))}const Fv=n=>Ov[n]??"Cửa",pe={get:(n,t)=>Gi[n]?.get(t)??null,list:n=>[...Gi[n]?.values()??[]],itemsIn:n=>[...Gi.item.values()].filter(t=>t.roomId===n),room:n=>Gi.room.get(n)??null},$r=.14,zv=new Ut(15985891),Bv=new Ut(15913909),kv=new Ut(16758904),Gv=new Ut(16775406);function Hv(n){const t=[];n.traverse(e=>{e.isCSS2DObject&&t.push(e)});for(const e of t)e.removeFromParent()}function Vv(n){n.traverse(t=>{t.isMesh&&(t.geometry?.dispose(),t.material?.map&&(t.material.map.dispose(),t.material.dispose()))})}function Wv(n){const{scene:t,sun:e,hemi:i,quality:s}=n;let r=null,o=null,a=[];const c=new Map,l=new Map,u=[],f=[];let d=!1;const m=[],g=[],v=(M,T)=>`${M}:${T}`;let _=$r,h=$r,x=1.5,S=!1,E=10;function L(){for(const M of[r?.root,o?.root])M&&(Hv(M),t.remove(M),Vv(M));r=o=null,a=[],c.clear(),l.clear(),u.length=0,f.length=0,m.length=0,g.length=0}function A(){const M=st.size.w,T=st.size.d;n.center.set(M/2,0,T/2),e.target.position.copy(n.center);const C=Math.max(M,T)*.9,P=e.shadow.camera;P.left=-C,P.right=C,P.top=C,P.bottom=-C,P.updateProjectionMatrix()}function w(){if(r=ov(),o=Uv(),t.add(r.root,o.root),!s.pointLights)for(const T of r.lamps)r.root.remove(T);a=s.pointLights?r.lamps:[];for(const T of pe.list("room")){const C=r.floors.get(T.id);c.set(v("room",T.id),C),u.push(C),l.set(v("room",T.id),new Tn(new U(T.x0,0,T.z0),new U(T.x1,.08,T.z1)))}const M=new U;for(const T of pe.list("item")){const C=o.groups.get(T.id);if(!C)continue;C.userData.ref={type:"item",id:T.id},c.set(v("item",T.id),C),u.push(C);const P=new Tn().setFromObject(C);l.set(v("item",T.id),P),P.getSize(M),T.dims={w:M.x,d:M.z,h:M.y}}for(const T of r.openings)c.set(v("opening",T.id),T.mesh),l.set(v("opening",T.id),new Tn().setFromObject(T.mesh)),f.push(T.mesh);d&&u.push(...f),m.push(...r.walls.children.filter(T=>T.isMesh)),g.push(...r.colliders,...o.colliders),A(),p.snapWalking(S),p.setHour(E)}const p={pickables:u,blockers:m,colliders:g,get walls(){return r?.walls},get ceiling(){return r?.ceiling},get labels(){return r?.labels??[]},getObject:(M,T)=>c.get(v(M,T))??null,getBox:(M,T=new Tn)=>{const C=l.get(v(M.type,M.id));return C?T.copy(C):null},getEntityPosition(M,T,C=new U){const P=l.get(v(M,T));return P?P.getCenter(C):null},setEditing(M){d=M;for(const T of f){const C=u.indexOf(T);M&&C<0&&u.push(T),!M&&C>=0&&u.splice(C,1)}},moveItem(M,T,C){const P=c.get(v("item",M));if(!P)return;P.position.x=T,P.position.z=C;const D=l.get(v("item",M));D&&D.setFromObject(P),n.invalidate()},rebuild(){L(),w(),n.invalidateShadows()},setWalking(M){S=M,_=M?1:$r,x=M?16:1.5,t.environmentIntensity=M?.8:.25,!M&&r&&(r.ceiling.visible=!1),n.invalidate(3)},setCeiling(M){r&&(r.ceiling.visible=M),n.invalidateShadows()},setHour(M){E=M;const C=Ue.clamp((M-6)/12,0,1)*Math.PI,P=Math.sin(C),D=n.center;e.position.set(D.x-Math.cos(C)*16,3+P*15,D.z+8),e.intensity=.7+2.3*P,e.color.lerpColors(kv,Gv,Math.min(1,P*1.6)),i.intensity=.7+.6*P,t.background.lerpColors(Bv,zv,Math.min(1,P*1.6)),t.fog.color.copy(t.background),n.invalidateShadows()},update(M){r&&h!==_&&(h+=(_-h)*Math.min(1,M*5),Math.abs(_-h)<.002&&(h=_),r.walls.scale.y=h,n.invalidateShadows());for(const T of a)T.intensity!==x&&(T.intensity+=(x-T.intensity)*Math.min(1,M*4),Math.abs(x-T.intensity)<.02&&(T.intensity=x),n.invalidate())},snapWalking(M){S=M,h=_=M?1:$r,x=M?16:1.5,t.environmentIntensity=M?.8:.25,r&&(r.walls.scale.y=h,r.ceiling.visible=M);for(const T of a)T.intensity=x;n.invalidateShadows()},wallHeight:yi};return w(),p}const gh=1.62,$u=.28,Xv=1.9,$v=3.4,qu=.0036,qr=.3,Yu={KeyW:[0,-1],ArrowUp:[0,-1],KeyS:[0,1],ArrowDown:[0,1],KeyA:[-1,0],KeyD:[1,0]},ya={ArrowLeft:1,ArrowRight:-1,KeyQ:1,KeyE:-1};function Ea(n,t,e){for(const i of n){const s=Math.max(i.x0,Math.min(t,i.x1)),r=Math.max(i.z0,Math.min(e,i.z1)),o=t-s,a=e-r;if(o*o+a*a<$u*$u)return!0}return!1}function qv({camera:n,dom:t,colliders:e}){const i={x:5,z:.7,yaw:Math.PI,pitch:0,enabled:!1},s=new Set;let r=null,o=null;const a={x:0,z:0},c=m=>{!i.enabled||/^(INPUT|TEXTAREA|SELECT)$/.test(m.target?.tagName??"")||(Yu[m.code]||ya[m.code]||m.code==="ShiftLeft")&&(s.add(m.code),m.preventDefault())},l=m=>s.delete(m.code),u=()=>s.clear();window.addEventListener("keydown",c),window.addEventListener("keyup",l),window.addEventListener("blur",u),t.addEventListener("pointerdown",m=>{i.enabled&&(r={id:m.pointerId,x:m.clientX,y:m.clientY},t.setPointerCapture(m.pointerId))}),t.addEventListener("pointermove",m=>{!r||m.pointerId!==r.id||(i.yaw-=(m.clientX-r.x)*qu,i.pitch=Ue.clamp(i.pitch-(m.clientY-r.y)*qu,-1.25,1.25),r.x=m.clientX,r.y=m.clientY)});const f=m=>{r&&m.pointerId===r.id&&(r=null)};t.addEventListener("pointerup",f),t.addEventListener("pointercancel",f);function d(){n.position.set(i.x,gh,i.z),n.rotation.set(i.pitch,i.yaw,0,"YXZ")}return{state:i,set(m,g,v,_=0){i.x=m,i.z=g,i.yaw=v,i.pitch=_},setEnabled(m){i.enabled=m,o=null,m||(s.clear(),r=null,a.x=a.z=0)},setAxis(m,g){a.x=m,a.z=g},press(m,g){g?s.add(m):s.delete(m)},update(m){if(!i.enabled)return!1;for(const x of s)ya[x]&&(i.yaw+=ya[x]*1.8*m);let g=a.x,v=a.z;for(const x of s){const S=Yu[x];S&&(g+=S[0],v+=S[1])}if(g||v){const x=Math.max(1,Math.hypot(g,v));g/=x,v/=x;const S=(s.has("ShiftLeft")?$v:Xv)*m,E=Math.sin(i.yaw),L=Math.cos(i.yaw),A=(g*L+v*E)*S,w=(-g*E+v*L)*S,p=Ue.clamp(i.x+A,qr,st.size.w-qr),M=Ue.clamp(i.z+w,qr,st.size.d-qr),T=Ea(e,i.x,i.z);(T||!Ea(e,p,i.z))&&(i.x=p),(T||!Ea(e,i.x,M))&&(i.z=M)}d();const _=i.x+i.z*31+i.yaw*57+i.pitch*91,h=_!==o;return o=_,h},applyToCamera:d,dispose(){window.removeEventListener("keydown",c),window.removeEventListener("keyup",l),window.removeEventListener("blur",u)}}}const Yv={mode:"overview",roomId:null,selection:null,hover:null,hour:10,playing:!1,menu:null,searchQuery:"",editable:!1,editing:!1,tool:null,listingArea:0,floorId:null,editPanel:null,designs:[],designId:null};function jv(n){let t={...n};const e=new Set;return{get state(){return t},set(i){const s=t,r=Object.keys(i).filter(o=>!Object.is(s[o],i[o]));if(r.length){t={...s,...i};for(const o of[...e])o(t,s,r)}},subscribe(i){return e.add(i),()=>e.delete(i)}}}const j=jv(Yv);j.select=function(t){if(!t)return j.set({selection:null});const e=pe.get(t.type,t.id);if(!e)return;const i=t.type==="opening"?j.state.roomId:e.roomId??e.id;j.set({selection:{type:t.type,id:t.id},roomId:i,menu:null})};function Kv(){const n=new Map;return{on(t,e){return n.has(t)||n.set(t,new Set),n.get(t).add(e),()=>n.get(t)?.delete(e)},emit(t,e){for(const i of[...n.get(t)??[]])i(e)}}}const Pt=Kv();function Yr(){const{w:n,d:t}=st.size;return{target:{x:n/2,y:0,z:t/2},distance:Math.max(n,t)*1.1+7.5,azimuth:Math.PI-.5,polar:.95}}function Zv(){for(const n of st.walls){const t=n.openings.find(e=>e.entrance);if(t)return n.dir==="x"?{x:t.c,z:n.at+.75,yaw:n.at===0?Math.PI:0}:{x:n.at+.75,z:t.c,yaw:n.at===0?-Math.PI/2:Math.PI/2}}return{x:st.size.w/2,z:st.size.d/2,yaw:Math.PI}}const Jv={zoomIn:.75,zoomOut:1.33},jr=Math.PI/6,Kr=.12;function Qv(n,t,e){const{camera:i,controls:s}=n,r=new U;let o=!1,a=null;const c=()=>a??n.getView();function l(w,p){const M={...n.getView(),...w,target:w.target??s.target.clone()};a=M,n.flyView(w,p).then(()=>{a===M&&(a=null)})}function u(w){const p=c(),M=w.x1-w.x0,T=w.z1-w.z0;return{target:{x:(w.x0+w.x1)/2,y:0,z:(w.z0+w.z1)/2},distance:Math.max(M,T)*1.45+3.5,azimuth:p.azimuth,polar:Ue.clamp(p.polar,.7,1.1)}}function f(w,p=8){const M=t.getEntityPosition(w.type,w.id,new U);if(!M)return null;const T=c();return{target:{x:M.x,y:0,z:M.z},distance:p,azimuth:T.azimuth,polar:Ue.clamp(T.polar,.7,1.1)}}function d({x:w,z:p,yaw:M,pitch:T=0}){const C=new li().setFromEuler(new $n(T,M,0,"YXZ"));return{pos:new U(w,gh,p),quat:C,fov:ku}}async function m(w,p=1.4){s.enabled=!1,e.setEnabled(!1),t.setWalking(!0),e.set(w.x,w.z,w.yaw,0),!(!await n.flyPose(d(w),{duration:p})||j.state.mode!=="walk")&&(t.setCeiling(!0),e.setEnabled(!0),n.invalidate())}async function g(w=Yr(),p=1.4){e.setEnabled(!1),t.setWalking(!1);const M=n.viewPose({...w,target:w.target});!await n.flyPose(M,{duration:p})||j.state.mode!=="overview"||(n.camera.fov=M.fov,n.camera.updateProjectionMatrix(),s.target.set(w.target.x,0,w.target.z),s.enabled=!0,s.update(),n.invalidate())}function v(w){return w?.stand??Zv()}function _(w){const p=pe.room(j.state.roomId);w==="walk"?m(v(p)):g(p?u(p):Yr())}function h(w){const p=pe.room(w);if(p)if(j.set({roomId:w}),j.state.mode==="walk"){e.setEnabled(!1);const M=v(p);e.set(M.x,M.z,M.yaw,0),n.flyPose(d(M),{duration:1}).then(T=>{T&&j.state.mode==="walk"&&e.setEnabled(!0)})}else l(u(p),{duration:1.1})}function x(w){if(i.updateMatrixWorld(),r.copy(w).project(i),r.z>1)return null;const p=n.renderer.domElement.clientWidth,M=n.renderer.domElement.clientHeight,{left:T,right:C,top:P,bottom:D}=n.insets,H=(r.x+1)/2*p,N=(1-r.y)/2*M,k=Math.max(1,p-T-C),B=Math.max(1,M-P-D);return{fx:(H-T)/k,fy:(N-P)/B}}function S(w){if(j.state.mode!=="overview"||n.flying)return;const p=t.getEntityPosition(w.type,w.id,new U);if(!p)return;const M=n.getView(),T=x(p.clone().setY(.4));if(T&&T.fx>Kr&&T.fx<1-Kr&&T.fy>Kr&&T.fy<1-Kr&&M.distance<22)return;const P=f(w,Math.min(M.distance,9));P&&l(P,{duration:.9})}function E(w){const p=t.getEntityPosition(w.type,w.id,new U);if(p)if(j.state.mode==="walk"){const M=pe.room(j.state.roomId)??pe.room(ph(p.x,p.z)?.id),T=M?(M.x0+M.x1)/2:p.x,C=M?(M.z0+M.z1)/2:p.z,P=new Nt(T-p.x,C-p.z);P.lengthSq()<1e-4&&P.set(0,1),P.normalize();const D={x:Ue.clamp(p.x+P.x*1.9,.35,9.65),z:Ue.clamp(p.z+P.y*1.9,.35,6.65)},H=Math.atan2(-(p.x-D.x),-(p.z-D.z));e.setEnabled(!1),e.set(D.x,D.z,H,-.12),n.flyPose(d({...D,yaw:H,pitch:-.12}),{duration:.9}).then(N=>{N&&j.state.mode==="walk"&&e.setEnabled(!0)})}else{const M=f(w,w.type==="room"?12:6.5);M&&l(M,{duration:1})}}function L({cmd:w}={}){if(j.state.mode==="walk"){w==="rotateLeft"||w==="rotateRight"?(e.state.yaw+=w==="rotateLeft"?jr:-jr,n.invalidate()):w==="home"&&h(j.state.roomId??"living");return}const p=c(),M={target:p.target,distance:p.distance,azimuth:p.azimuth,polar:p.polar};switch(w){case"zoomIn":case"zoomOut":return l({...M,distance:p.distance*Jv[w]},{duration:.45});case"rotateLeft":case"rotateRight":return l({...M,azimuth:p.azimuth+(w==="rotateLeft"?-jr:jr)},{duration:.6});case"home":return l(Yr(),{duration:1.1})}}const A=[j.subscribe((w,p,M)=>{n.invalidate(),M.includes("mode")&&!o?_(w.mode):M.includes("selection")&&w.selection&&w.selection.type==="item"&&!w.editing&&S(w.selection)}),Pt.on("room:go",({id:w})=>h(w)),Pt.on("camera:locate",w=>w.type==="room"?h(w.id):E(w)),Pt.on("camera:cmd",L)];return{start({walk:w=!1,room:p=null}={}){a=null;const M=p?pe.room(p):null;if(M&&j.set({roomId:M.id}),w){o=!0,j.set({mode:"walk"}),o=!1,s.enabled=!1;const T=v(M);e.set(T.x,T.z,T.yaw,0),e.applyToCamera(),i.fov=ku,i.updateProjectionMatrix(),t.snapWalking(!0),e.setEnabled(!0)}else o=!0,j.set({mode:"overview"}),o=!1,e.setEnabled(!1),i.fov=El,i.updateProjectionMatrix(),t.snapWalking(!1),s.enabled=!0,n.flyView(M?u(M):Yr(),{duration:0})},update(){j.state.mode==="overview"&&s.enabled&&!n.flying&&s.update()},dispose(){A.forEach(w=>w())}}}const ju=6,tM=.12,eM=.05,_h=(n,t)=>n===t||!!n&&!!t&&n.type===t.type&&n.id===t.id;function nM(n,t){const e=new Zt;e.name="interaction-overlay",n.scene.add(e);const i=iM(n,t),s=Ku(e,"selected"),r=Ku(e,"hover"),o=()=>{const{hover:c,selection:l}=j.state;s.show(l,t),r.show(_h(c,l)?null:c,t),n.invalidate()},a=j.subscribe((c,l,u)=>{(u.includes("selection")||u.includes("hover"))&&o()});return{refresh:o,update(c){i.update(c)},dispose(){a(),i.dispose(),n.scene.remove(e)}}}function iM(n,t){const e=n.renderer.domElement,i=new Ql,s=new Nt;let r=null,o=null,a=!1,c=0;function l(h,x){const S=e.getBoundingClientRect();s.set((h-S.left)/S.width*2-1,-((x-S.top)/S.height)*2+1),i.setFromCamera(s,n.camera);const E=i.intersectObjects([...t.pickables,...t.blockers],!0);for(const L of E){if(L.object.userData.blocker)return null;const A=sM(L.object);if(A)return A}return null}function u(h){_h(h,j.state.hover)||j.set({hover:h?{type:h.type,id:h.id}:null})}const f=h=>{h.pointerType==="mouse"&&(r={x:h.clientX,y:h.clientY},a=!0,o&&!o.dragging&&Math.hypot(h.clientX-o.x,h.clientY-o.y)>ju&&(o.dragging=!0,u(null)))},d=h=>{o={id:h.pointerId,x:h.clientX,y:h.clientY,button:h.button,dragging:!1}},m=h=>{const x=o;if(o=null,!x||x.id!==h.pointerId||x.dragging||x.button!==0||Math.hypot(h.clientX-x.x,h.clientY-x.y)>ju)return;const S=l(h.clientX,h.clientY);S?j.select(S):h.pointerType!=="mouse"&&j.select(null)},g=()=>{o=null},v=()=>{r=null,o||u(null)},_=h=>{h.key!=="Escape"||/^(INPUT|TEXTAREA|SELECT)$/.test(h.target?.tagName??"")||j.state.selection&&j.select(null)};return e.addEventListener("pointermove",f),e.addEventListener("pointerdown",d),e.addEventListener("pointerup",m),e.addEventListener("pointercancel",g),e.addEventListener("pointerleave",v),window.addEventListener("keydown",_),{update(h){if(c+=h,!r||o?.dragging||!a||c<tM||n.flying)return;a=!1,c=0;const x=l(r.x,r.y);u(x),o||(e.style.cursor=x?"pointer":"")},dispose(){e.removeEventListener("pointermove",f),e.removeEventListener("pointerdown",d),e.removeEventListener("pointerup",m),e.removeEventListener("pointercancel",g),e.removeEventListener("pointerleave",v),window.removeEventListener("keydown",_)}}}function sM(n){for(let t=n;t;t=t.parent){if(t.visible===!1)return null;if(t.userData?.ref&&pe.get(t.userData.ref.type,t.userData.ref.id))return t.userData.ref}return null}function rM(n=.22){const t=[];for(const i of[-.5,.5])for(const s of[-.5,.5])for(const r of[-.5,.5])t.push(i,s,r,i-Math.sign(i)*n,s,r),t.push(i,s,r,i,s-Math.sign(s)*n,r),t.push(i,s,r,i,s,r-Math.sign(r)*n);const e=new rn;return e.setAttribute("position",new Re(t,3)),e}const oM=rM(),aM=new fe(1,1,1),lM={hover:{color:14262412,opacity:.6,fill:.06},selected:{color:12999226,opacity:1,fill:.14}};function Ku(n,t){const e=lM[t],i=new Zt;i.visible=!1;const s=new dp(oM,new Bd({color:e.color,transparent:!0,opacity:e.opacity,depthTest:!1,toneMapped:!1}));s.renderOrder=20;const r=new Xt(aM,new $i({color:e.color,transparent:!0,opacity:e.fill,depthWrite:!1,toneMapped:!1}));r.renderOrder=19,i.add(r,s),n.add(i);const o=document.createElement("div");o.className=`pill pill--${t}`;const a=new ah(o);a.visible=!1,n.add(a);const c=new Tn,l=new U,u=new U;let f=null;return{show(d,m){if(!d||!m.getBox(d,c)){f=null,i.visible=!1,a.visible=!1;return}f=d,c.getSize(l).addScalar(eM*2),c.getCenter(u),i.position.copy(u),i.scale.copy(l),i.visible=!0;const g=pe.get(d.type,d.id);o.textContent=g?.name??"",a.visible=d.type==="item",a.position.set(u.x,c.max.y+.18,u.z)},get current(){return f}}}const Zu={bare:0,partial:1,full:2},Ki={sofa:[2.2],armchair:[],ottoman:[],coffeeTable:[],sideTable:[],tvUnit:[1.5],bookshelf:[1.2],dresser:[],wardrobe:[1.2,2.2],bed:[],nightstand:[],desk:[],chair:[],diningTable:[],barStool:[],console:[1],plant:[1],floorLamp:[],standingMirror:[],rug:[2.4,1.6],kitchenRun:[2.4],fridge:[],toilet:[],vanity:[],shower:[]},Cs={sofa:{name:"Sofa 3 chỗ",category:"Sofa & ghế",material:"Vải bọc, khung gỗ",note:"Đệm dày, hai gối tựa kèm theo.",tier:1},armchair:{name:"Ghế bành",category:"Sofa & ghế",material:"Vải bọc",note:"Góc thư giãn trong phòng khách.",tier:2},coffeeTable:{name:"Bàn trà",category:"Bàn",material:"Gỗ sồi",note:"Đặt giữa sofa và kệ TV.",tier:1},tvUnit:{name:'Kệ TV + TV 55"',category:"Điện tử",material:"Gỗ công nghiệp",note:"TV đặt trên kệ thấp, đối diện sofa.",tier:1},rug:{name:"Thảm",category:"Trang trí",material:"Sợi dệt",note:"",tier:2,pick:!1},plant:{name:"Cây trong nhà",category:"Trang trí",material:"Chậu gốm",note:"Cây lá lớn tạo điểm nhấn xanh.",tier:2},floorLamp:{name:"Đèn cây",category:"Chiếu sáng",material:"Kim loại đen",note:"Ánh sáng vàng ấm buổi tối.",tier:2},console:{name:"Bàn console",category:"Bàn",material:"Gỗ + tủ thấp",note:"Để chìa khoá, thư từ ở lối vào.",tier:2},bed:{name:"Giường đôi 1m6",category:"Giường",material:"Khung gỗ, nệm bông ép",note:"Kèm ga gối và chăn.",tier:1},nightstand:{name:"Tab đầu giường",category:"Tủ",material:"Gỗ sồi",note:"Kèm đèn ngủ.",tier:2},wardrobe:{name:"Tủ quần áo",category:"Tủ",material:"Gỗ công nghiệp",note:"Tủ cao sát trần, nhiều ngăn.",tier:0},desk:{name:"Bàn làm việc",category:"Bàn",material:"Gỗ sồi",note:"Kèm màn hình.",tier:2},chair:{name:"Ghế",category:"Sofa & ghế",material:"Gỗ sồi",note:"",tier:1},diningTable:{name:"Bàn ăn 4 chỗ",category:"Bàn",material:"Gỗ sồi",note:"Gần cửa sổ, đón sáng buổi sáng.",tier:1},kitchenRun:{name:"Bộ bếp",category:"Bếp",material:"Tủ gỗ + mặt đá",note:"Bồn rửa inox, bếp từ, tủ treo phía trên.",tier:0},fridge:{name:"Tủ lạnh",category:"Bếp",material:"Inox",note:"Tủ lạnh hai cánh đặt cuối dãy bếp.",tier:1},bookshelf:{name:"Tủ sách",category:"Tủ",material:"Gỗ công nghiệp",note:"Nhiều ngăn mở cho sách và đồ trang trí.",tier:2},dresser:{name:"Tủ ngăn kéo",category:"Tủ",material:"Gỗ sồi",note:"Cất đồ lặt vặt, đặt thêm gương hoặc đèn.",tier:2},sideTable:{name:"Bàn phụ",category:"Bàn",material:"Gỗ + kim loại",note:"Đặt cạnh sofa hoặc đầu giường.",tier:2},ottoman:{name:"Ghế đôn",category:"Sofa & ghế",material:"Vải bọc",note:"Kê chân hoặc ngồi thêm khi có khách.",tier:2},barStool:{name:"Ghế quầy bar",category:"Sofa & ghế",material:"Gỗ + kim loại",note:"Ngồi bên quầy bếp.",tier:2},standingMirror:{name:"Gương đứng",category:"Trang trí",material:"Kính + khung gỗ",note:"Gương soi toàn thân.",tier:2},toilet:{name:"Bệ xí",category:"Vệ sinh",material:"Sứ",note:"Két nước liền khối.",tier:0},vanity:{name:"Tủ lavabo + gương",category:"Vệ sinh",material:"Tủ gỗ + mặt đá",note:"Gương treo trên lavabo.",tier:0},shower:{name:"Buồng tắm kính",category:"Vệ sinh",material:"Kính cường lực",note:"Vòi sen cây, khay đáy thấp.",tier:0}},ec=["wood","darkwood","tile","marble","granite","concrete","epoxy","carpet","glass"],Do=["window","door","open"],ne={idPattern:/^[A-Za-z0-9_-]{1,48}$/,overrides:120,extras:60,floors:5,roomsPerFloor:24,openingsPerFloor:60,coordMin:-2,coordMax:40,roomMin:1.2,roomMax:40,openingMin:.5,openingMax:4,sillMax:2.4,nameMax:40},dr=(n,t)=>Math.round(n*t)/t,hr=n=>typeof n=="number"&&Number.isFinite(n),Nn=n=>hr(n)&&n>=ne.coordMin&&n<=ne.coordMax?dr(n,1e3):void 0,Ju=n=>hr(n)?dr(n%(Math.PI*2),1e4):void 0,si=n=>typeof n=="string"&&ne.idPattern.test(n),nc=n=>typeof n=="string"&&n.trim()?n.trim().slice(0,ne.nameMax):void 0,cM=n=>{if(!Array.isArray(n)||n.length===0||n.length>3)return;const t=n.map(e=>hr(e)&&e>=.2&&e<=8?dr(e,100):null);return t.every(e=>e!==null)?t:void 0},xh=n=>ec.includes(n)?n:void 0,vh=n=>Do.includes(n)?n:void 0,Mh=n=>hr(n)&&n>=ne.openingMin&&n<=ne.openingMax?dr(n,100):void 0;function bh(n){if(!n||typeof n!="object"||!si(n.id)||n.dir!=="x"&&n.dir!=="z")return null;const t=Nn(n.at),e=Nn(n.c),i=Mh(n.w),s=vh(n.type);if(t===void 0||e===void 0||i===void 0||!s)return null;const r={id:n.id,dir:n.dir,at:t,c:e,w:i,type:s};return s==="window"&&hr(n.sill)&&n.sill>=0&&n.sill<=ne.sillMax&&(r.sill=dr(n.sill,100)),s==="door"&&n.entrance===!0&&(r.entrance=!0),r}function uM(n){if(!n||typeof n!="object"||!si(n.id))return null;const t=nc(n.name),e=Nn(n.x0),i=Nn(n.x1),s=Nn(n.z0),r=Nn(n.z1);if(!t||[e,i,s,r].some(c=>c===void 0||c<0))return null;const o=i-e,a=r-s;return o<ne.roomMin-1e-9||a<ne.roomMin-1e-9||o>ne.roomMax||a>ne.roomMax?null:{id:n.id,name:t,x0:e,x1:i,z0:s,z1:r,floor:xh(n.floor)??"wood"}}function Sh(n,t){return Math.min(n.x1,t.x1)-Math.max(n.x0,t.x0)>.01&&Math.min(n.z1,t.z1)-Math.max(n.z0,t.z0)>.01}function dM(n){if(!n||typeof n!="object"||!si(n.id))return null;const t=[],e=new Set;for(const r of(Array.isArray(n.rooms)?n.rooms:[]).slice(0,ne.roomsPerFloor)){const o=uM(r);!o||e.has(o.id)||t.some(a=>Sh(o,a))||(e.add(o.id),t.push(o))}if(!t.length)return null;const i=[],s=new Set;for(const r of(Array.isArray(n.openings)?n.openings:[]).slice(0,ne.openingsPerFloor)){const o=bh(r);!o||s.has(o.id)||(s.add(o.id),i.push(o))}return{id:n.id,name:nc(n.name)??"Tầng",rooms:t,openings:i}}function hM(n){if(!n||typeof n!="object"||!Array.isArray(n.floors))return null;const t=[],e=new Set;for(const i of n.floors.slice(0,ne.floors)){const s=dM(i);!s||e.has(s.id)||(e.add(s.id),t.push(s))}return t.length?{floors:t}:null}function fM(n){const t={};if(!n||typeof n!="object"||Array.isArray(n))return t;for(const[e,i]of Object.entries(n).slice(0,ne.overrides)){if(!si(e)||!i||typeof i!="object")continue;const s={},r=nc(i.name),o=xh(i.floor);r&&(s.name=r),o&&(s.floor=o),Object.keys(s).length&&(t[e]=s)}return t}function pM(n){const t={removed:[],moved:{},added:[]};if(!n||typeof n!="object")return t;if(Array.isArray(n.removed))for(const e of n.removed.slice(0,ne.overrides))si(e)&&!t.removed.includes(e)&&t.removed.push(e);if(n.moved&&typeof n.moved=="object"&&!Array.isArray(n.moved))for(const[e,i]of Object.entries(n.moved).slice(0,ne.overrides)){if(!si(e)||!i||typeof i!="object")continue;const s={},r=Nn(i.c),o=Mh(i.w),a=vh(i.type);r!==void 0&&(s.c=r),o!==void 0&&(s.w=o),a&&(s.type=a),Object.keys(s).length&&(t.moved[e]=s)}if(Array.isArray(n.added)){const e=new Set;for(const i of n.added.slice(0,ne.openingsPerFloor)){const s=bh(i);!s||e.has(s.id)||(e.add(s.id),t.added.push(s))}}return t}const mM=n=>n.removed.length>0||Object.keys(n.moved).length>0||n.added.length>0;function Ce(n){const t={items:{},extras:[]};if(!n||typeof n!="object")return t;if(n.items&&typeof n.items=="object"&&!Array.isArray(n.items))for(const[r,o]of Object.entries(n.items).slice(0,ne.overrides)){if(!si(r)||!o||typeof o!="object")continue;const a={},c=Nn(o.x),l=Nn(o.z),u=Ju(o.rot);c!==void 0&&(a.x=c),l!==void 0&&(a.z=l),u!==void 0&&(a.rot=u),o.hidden===!0&&(a.hidden=!0),Object.keys(a).length&&(t.items[r]=a)}if(Array.isArray(n.extras)){const r=new Set;for(const o of n.extras.slice(0,ne.extras)){if(!o||typeof o!="object"||!si(o.id)||r.has(o.id)||!Object.prototype.hasOwnProperty.call(Ki,o.kind))continue;const a=Nn(o.x),c=Nn(o.z);if(a===void 0||c===void 0)continue;r.add(o.id);const l={id:o.id,kind:o.kind,x:a,z:c,rot:Ju(o.rot)??0},u=cM(o.args);u&&(l.args=u),o.hidden===!0&&(l.hidden=!0),si(o.floor)&&(l.floor=o.floor),t.extras.push(l)}}const e=fM(n.rooms);Object.keys(e).length&&(t.rooms=e);const i=pM(n.openings);mM(i)&&(t.openings=i);const s=hM(n.custom);return s&&(t.custom=s),t}const Ps={modern:{label:"Hiện đại",palette:{floor:13608570,wall:16052714,wood:12159838,sofa:6258598,accent:15246141}},nordic:{label:"Bắc Âu",palette:{floor:14929832,wall:16316662,wood:13808780,sofa:9414844,accent:7317664}},warm:{label:"Ấm cúng",palette:{floor:12158040,wall:15918287,wood:10251075,sofa:12874842,accent:14254635}},luxury:{label:"Sang trọng",palette:{floor:9069892,wall:15262422,wood:7031344,sofa:3096149,accent:13214282}},industrial:{label:"Công nghiệp",palette:{floor:9271911,wall:13817305,wood:8216387,sofa:4869975,accent:14250795}}},bo=Object.keys(Ps),gM=["floor","wall","wood","sofa","accent"],_M=/^#?([0-9a-f]{6})$/i;function xM(n){if(typeof n=="number"&&Number.isInteger(n)&&n>=0&&n<=16777215)return n;if(typeof n!="string")return null;const t=_M.exec(n.trim());return t?parseInt(t[1],16):null}function ic(n){if(!n||typeof n!="object")return null;const t=typeof n.id=="string"?n.id.trim():"",e=typeof n.name=="string"?n.name.trim().slice(0,60):"";if(!t||!e)return null;const i={};if(n.palette&&typeof n.palette=="object")for(const r of gM){const o=xM(n.palette[r]);o!==null&&(i[r]=o)}const s=Number(n.defaultHour);return{id:t,name:e,description:typeof n.description=="string"?n.description.slice(0,200):"",theme:bo.includes(n.theme)?n.theme:"modern",palette:i,furnishing:["bare","partial","full"].includes(n.furnishing)?n.furnishing:null,defaultHour:Number.isFinite(s)?Math.min(18,Math.max(6,s)):10,layout:Ce(n.layout)}}function yh(n){return{...Ps[n?.theme]?.palette??Ps.modern.palette,...n?.palette??{}}}function vM(n){let t=0;for(const i of String(n))t=t*31+i.charCodeAt(0)>>>0;const e=bo[t%bo.length];return ic({id:"default",name:`Phong cách ${Ps[e].label}`,theme:e})}const MM=60,Qu=.25,td=.05,bM=Math.PI*2,Us=n=>Ce(JSON.parse(JSON.stringify(Ce(n)))),xs=(n,t)=>n/(t||1);function ed(n,t){const e=Math.min(t-Qu,Math.max(Qu,n));return Math.round(e/td)*td}function SM(n,t){return n.extras.some(e=>e.id===t)}function yM(n,t,e,i,s){const r=Us(n),o=r.extras.find(a=>a.id===t);if(o)o.x=xs(e,s),o.z=xs(i,s);else{const a=r.items[t]??={};a.x=xs(e,s),a.z=xs(i,s)}return Ce(r)}function EM(n,t,e=0){const i=Us(n),s=(e+Math.PI/2)%bM,r=i.extras.find(o=>o.id===t);return r?r.rot=s:(i.items[t]??={}).rot=s,Ce(i)}function TM(n,t){const e=Us(n),i=e.extras.find(s=>s.id===t)??(e.items[t]??={});return i.hidden?delete i.hidden:i.hidden=!0,Ce(e)}function wM(n,t){const e=Us(n);return e.extras.some(i=>i.id===t)?(e.extras=e.extras.filter(i=>i.id!==t),Ce(e)):e}function AM(n,t){const e=Us(n),i=e.items[t];return i&&(delete i.x,delete i.z,delete i.rot),Ce(e)}function RM(n,t,e,i,s,r,o=Math.random){if(!Object.prototype.hasOwnProperty.call(Ki,t))return null;const a=Us(n);if(a.extras.length>=MM)return null;const c=new Set([...r,...a.extras.map(u=>u.id)]);let l;do l=`extra-${o().toString(36).slice(2,8).padEnd(6,"0")}`;while(c.has(l));return a.extras.push({id:l,kind:t,x:xs(e,s),z:xs(i,s),rot:0}),{layout:Ce(a),id:l}}const nd=.1,Eh=n=>Math.round(n/nd)*nd,Ks=n=>Math.round(n*1e3)/1e3;function CM(n,t,e,i=.5){let s=null;for(const r of n){const o=r.dir==="x"?t:e,a=r.dir==="x"?e:t;if(o<r.from+.1||o>r.to-.1)continue;const c=Math.abs(a-r.at);c<=i&&(!s||c<s.dist)&&(s={wall:r,c:Ks(o),dist:c})}return s?{wall:s.wall,c:s.c}:null}function PM(n){const t=(n.x0+n.x1)/2,e=(n.z0+n.z1)/2;return{x0:{x:n.x0,z:e},x1:{x:n.x1,z:e},z0:{x:t,z:n.z0},z1:{x:t,z:n.z1}}}function LM(n,t,e){const i={x0:n.x0,x1:n.x1,z0:n.z0,z1:n.z1},s=ne.roomMin,r=Eh(e);return t==="x0"?i.x0=Math.max(0,Math.min(r,i.x1-s)):t==="x1"?i.x1=Math.min(ne.coordMax,Math.max(r,i.x0+s)):t==="z0"?i.z0=Math.max(0,Math.min(r,i.z1-s)):t==="z1"&&(i.z1=Math.min(ne.coordMax,Math.max(r,i.z0+s))),{x0:Ks(i.x0),x1:Ks(i.x1),z0:Ks(i.z0),z1:Ks(i.z1)}}const DM=(n,t,e)=>t>=n.x0&&t<=n.x1&&e>=n.z0&&e<=n.z1,Zr=Eh,Jr=1e-6,er=n=>n.toFixed(3),Yi=n=>Math.round(n*1e3)/1e3,id=n=>String(n).replace(/[^A-Za-z0-9]/g,"p");function Th(n,t=[]){const e=new Map,i=(r,o,a,c)=>{const l=`${r}|${er(o)}`;e.has(l)||e.set(l,{dir:r,at:o,edges:[]}),e.get(l).edges.push([a,c])};for(const r of n)i("x",r.z0,r.x0,r.x1),i("x",r.z1,r.x0,r.x1),i("z",r.x0,r.z0,r.z1),i("z",r.x1,r.z0,r.z1);const s=[];for(const{dir:r,at:o,edges:a}of e.values()){const c=[...new Set(a.flatMap(([u,f])=>[er(u),er(f)]))].map(Number).sort((u,f)=>u-f),l=[];for(let u=0;u+1<c.length;u++){const f=c[u],d=c[u+1];if(d-f<Jr)continue;const m=a.filter(([v,_])=>v<=f+Jr&&_>=d-Jr).length;if(m===0)continue;const g=l[l.length-1];g&&g.count===m&&Math.abs(g.to-f)<Jr?g.to=d:l.push({from:f,to:d,count:m})}for(const u of l)s.push({dir:r,at:o,from:u.from,to:u.to,t:u.count>=2?dh:uh,interior:u.count>=2,openings:[]})}for(const r of t){const o=s.find(a=>a.dir===r.dir&&Math.abs(a.at-r.at)<.06&&r.c-r.w/2>=a.from+.05&&r.c+r.w/2<=a.to-.05);o&&o.openings.push({...r})}for(const r of s)r.openings.sort((o,a)=>o.c-a.c);return s.sort((r,o)=>r.dir===o.dir?r.at-o.at||r.from-o.from:r.dir<o.dir?-1:1)}function IM(n,t=.2){const e=Math.max(...n.map(s=>s.x1))+t,i=Math.max(...n.map(s=>s.z1))+t;return{w:Yi(e),d:Yi(i)}}const wh=n=>Yi(n.reduce((t,e)=>t+qi(e),0)),sc=n=>Yi(n.reduce((t,e)=>t+wh(e.rooms),0));function NM(n,t=[],e=1.4){return Th(n,t).filter(s=>s.interior&&s.to-s.from>=e&&s.openings.length===0).map(s=>({dir:s.dir,at:s.at,from:s.from,to:s.to}))}function rc(n,t=[],e=[]){const i=new Set([...e,...t.map(r=>r.id)]),s=[];for(const r of NM(n,t)){const o=Yi((r.from+r.to)/2);let a=`auto-${r.dir}${id(er(r.at))}-${id(er(o))}`.slice(0,48);i.has(a)||(i.add(a),s.push({id:a,dir:r.dir,at:Yi(r.at),c:o,w:.9,type:"door"}))}return[...t,...s]}function oc(n,t,e=null){const i=t.x1-t.x0,s=t.z1-t.z0;return i<ne.roomMin-1e-9||s<ne.roomMin-1e-9||i>ne.roomMax||s>ne.roomMax||t.x0<0||t.z0<0||t.x1>ne.coordMax||t.z1>ne.coordMax?!1:!n.some(r=>r.id!==e&&Sh(r,t))}function UM(n,t){const e=sc(n);if(!(e>0)||!(t>0))return{factor:1,before:e,after:e};const i=Math.min(2,Math.max(.5,Math.sqrt(t/e)));return{factor:i,before:e,after:Yi(e*i*i)}}const sd=.15,rd=.1,Te=n=>Math.round(n*1e3)/1e3,vs=n=>Math.round(n/rd)*rd,bn=n=>JSON.parse(JSON.stringify(Ce(n))),So=(n,t)=>Te(n/(t.scale||1)),ac=(n,t,e=Math.random)=>{let i;do i=`${n}-${e().toString(36).slice(2,8).padEnd(6,"0")}`;while(t.has(i));return i},ui=(n,t)=>{const e=Ce(t);return JSON.stringify(e)===JSON.stringify(Ce(n))?n:e},Os=(n,t)=>n.custom?.floors.find(e=>e.id===t.floorId)??n.custom?.floors[0];function OM(n,t,e,i){if(!ec.includes(i))return n;const s=bn(n);if(t.custom){const r=Os(s,t)?.rooms.find(o=>o.id===e);if(!r)return n;r.floor=i}else{if(!t.rooms.some(r=>r.id===e))return n;s.rooms={...s.rooms??{},[e]:{...s.rooms?.[e]??{},floor:i}}}return ui(n,s)}function FM(n,t,e,i){const s=String(i??"").trim().slice(0,ne.nameMax);if(!s)return n;const r=bn(n);if(t.custom){const o=Os(r,t)?.rooms.find(a=>a.id===e);if(!o)return n;o.name=s}else{if(!t.rooms.some(o=>o.id===e))return n;r.rooms={...r.rooms??{},[e]:{...r.rooms?.[e]??{},name:s}}}return ui(n,r)}function zM(n,t,e,i){return n.walls.find(s=>s.dir===t&&Math.abs(s.at-e)<.06&&i>=s.from&&i<=s.to)}function Ah(n,t,e){const i=n.from+e/2+sd,s=n.to-e/2-sd;return s<i?null:Te(Math.min(s,Math.max(i,t)))}const BM=(n,t)=>n.walls.find(e=>e.openings.some(i=>i.id===t)),Rh=(n,t)=>n.walls.flatMap(e=>e.openings).find(e=>e.id===t);function lc(n,t,e,i){const s=BM(t,e),r=Rh(t,e);if(!s||!r)return n;const o=i.w??r.w,a=Ah(s,i.c??r.c,o);if(a===null||o<ne.openingMin||o>ne.openingMax)return n;const c=i.type??r.type;if(!Do.includes(c))return n;const l=bn(n);if(t.custom){const u=Os(l,t)?.openings.find(f=>f.id===e);if(!u)return n;Object.assign(u,{c:a,w:Te(o),type:c}),c!=="window"?delete u.sill:u.sill===void 0&&(u.sill=.9),c!=="door"&&delete u.entrance}else{const u=l.openings?.added?.find(f=>f.id===e);if(u)Object.assign(u,{c:So(a,t),w:Te(o),type:c}),c!=="window"&&delete u.sill,c!=="door"&&delete u.entrance;else{l.openings??={removed:[],moved:{},added:[]};const f={...l.openings.moved[e]??{}};(i.c!==void 0||i.w!==void 0)&&(f.c=So(a,t)),i.w!==void 0&&(f.w=Te(o)),i.type!==void 0&&(f.type=c),l.openings.moved[e]=f}}return ui(n,l)}const kM=(n,t,e,i)=>lc(n,t,e,{c:i}),GM=(n,t,e,i)=>lc(n,t,e,{w:i}),HM=(n,t,e,i)=>lc(n,t,e,{type:i});function VM(n,t,e){if(!Rh(t,e))return n;const i=bn(n);if(t.custom){const s=Os(i,t);if(!s)return n;s.openings=s.openings.filter(r=>r.id!==e)}else i.openings?.added?.some(s=>s.id===e)?i.openings.added=i.openings.added.filter(s=>s.id!==e):(i.openings??={removed:[],moved:{},added:[]},i.openings.removed.includes(e)||i.openings.removed.push(e),delete i.openings.moved[e]);return ui(n,i)}function WM(n,t,{dir:e,at:i,c:s,w:r=.9,type:o="door"},a=Math.random){if(!Do.includes(o)||e!=="x"&&e!=="z")return null;const c=zM(t,e,i,s);if(!c)return null;const l=Ah(c,s,r);if(l===null||c.openings.some(g=>Math.abs(g.c-l)<(g.w+r)/2+.05))return null;const u=bn(n),f=new Set(t.walls.flatMap(g=>g.openings.map(v=>v.id))),d=ac("op",f,a);if(t.custom){const g=Os(u,t);if(!g||g.openings.length>=ne.openingsPerFloor)return null;g.openings.push({id:d,dir:e,at:Te(c.at),c:l,w:Te(r),type:o,...o==="window"?{sill:.9}:{}})}else{if(u.openings??={removed:[],moved:{},added:[]},u.openings.added.length>=ne.openingsPerFloor)return null;u.openings.added.push({id:d,dir:e,at:So(c.at,t),c:So(l,t),w:Te(r),type:o,...o==="window"?{sill:.9}:{}})}return{layout:Ce(u),id:d}}const od=n=>{if(!Array.isArray(n))return;const t=[];for(const e of n){if(typeof e!="number"||!(e>=.2&&e<=8))break;t.push(Math.round(e*100)/100)}return t.length?t.slice(0,3):void 0};function XM(n,t){const i=t.rooms.map(a=>({id:a.id,name:a.name,x0:a.x0,x1:a.x1,z0:a.z0,z1:a.z1,floor:a.floor})),s=t.walls.flatMap(a=>a.openings.map(c=>({id:c.id,dir:a.dir,at:a.at,c:c.c,w:c.w,type:c.type,...c.sill!==void 0?{sill:c.sill}:{},...c.entrance?{entrance:!0}:{}}))),r=t.placements.filter(a=>Object.prototype.hasOwnProperty.call(Ki,a.kind)).map(a=>({id:a.id,kind:a.kind,x:a.x,z:a.z,rot:a.rot??0,floor:"f1",...a.hidden?{hidden:!0}:{},...od(a.args)?{args:od(a.args)}:{}}));return Ce({items:{},extras:r,custom:{floors:[{id:"f1",name:"Tầng 1",rooms:i,openings:s}]}})}function $M(){return Ce(null)}const Io=(n,t)=>Os(n,t);function qM(n,t){const e=vs(Math.min(n.x,t.x)),i=vs(Math.max(n.x,t.x)),s=vs(Math.min(n.z,t.z)),r=vs(Math.max(n.z,t.z));return{x0:Te(e),x1:Te(i),z0:Te(s),z1:Te(r)}}function YM(n,t,e,{name:i,floor:s="wood"}={},r=Math.random){if(!t.custom)return null;const o=bn(n),a=Io(o,t);if(!a||a.rooms.length>=ne.roomsPerFloor)return null;const c={...e};if(!oc(a.rooms,c))return null;const l=ac("room",new Set(a.rooms.map(f=>f.id)),r),u={id:l,name:i??`Phòng ${a.rooms.length+1}`,...c,floor:s};return a.rooms.push(u),a.openings=rc(a.rooms,a.openings),{layout:Ce(o),id:l}}const cc=(n,t,e)=>t>=n.x0&&t<=n.x1&&e>=n.z0&&e<=n.z1;function jM(n,t){for(const e of n.extras){if((e.floor??n.custom.floors[0].id)!==t.id||t.rooms.some(s=>cc(s,e.x,e.z)))continue;let i=null;for(const s of t.rooms){const r=Math.min(s.x1-.2,Math.max(s.x0+.2,e.x)),o=Math.min(s.z1-.2,Math.max(s.z0+.2,e.z)),a=Math.hypot(r-e.x,o-e.z);(!i||a<i.d)&&(i={x:r,z:o,d:a})}i&&(e.x=Te(i.x),e.z=Te(i.z))}}function KM(n,t,e,i){if(!t.custom)return n;const s=bn(n),r=Io(s,t),o=r?.rooms.find(c=>c.id===e);if(!o)return n;const a={...o,...i};return oc(r.rooms,a,e)?(Object.assign(o,i),r.openings=rc(r.rooms,uc(r)),jM(s,r),ui(n,s)):n}function ZM(n,t,e,i,s){if(!t.custom)return n;const r=bn(n),o=Io(r,t),a=o?.rooms.find(g=>g.id===e);if(!a)return n;const c=vs(i),l=vs(s);if(c===0&&l===0)return n;const u={...a,x0:Te(a.x0+c),x1:Te(a.x1+c),z0:Te(a.z0+l),z1:Te(a.z1+l)};if(!oc(o.rooms,u,e))return n;const f=r.custom.floors[0].id;for(const g of r.extras)(g.floor??f)===o.id&&cc(a,g.x,g.z)&&(g.x=Te(g.x+c),g.z=Te(g.z+l));const d=g=>g.dir==="x"&&(Math.abs(g.at-a.z0)<.06||Math.abs(g.at-a.z1)<.06)&&g.c>a.x0&&g.c<a.x1||g.dir==="z"&&(Math.abs(g.at-a.x0)<.06||Math.abs(g.at-a.x1)<.06)&&g.c>a.z0&&g.c<a.z1,m=g=>o.rooms.some(v=>v.id!==e&&Ch(v,g));for(const g of o.openings)d(g)&&!m(g)&&(g.dir==="x"?(g.at=Te(g.at+l),g.c=Te(g.c+c)):(g.at=Te(g.at+c),g.c=Te(g.c+l)));return Object.assign(a,u),o.openings=rc(o.rooms,uc(o)),ui(n,r)}const Ch=(n,t)=>t.dir==="x"&&(Math.abs(t.at-n.z0)<.06||Math.abs(t.at-n.z1)<.06)&&t.c>n.x0&&t.c<n.x1||t.dir==="z"&&(Math.abs(t.at-n.x0)<.06||Math.abs(t.at-n.x1)<.06)&&t.c>n.z0&&t.c<n.z1;function uc(n){return n.openings.filter(t=>n.rooms.some(e=>Ch(e,t)))}function JM(n,t,e){if(!t.custom)return n;const i=bn(n),s=Io(i,t),r=s?.rooms.find(a=>a.id===e);if(!r||s.rooms.length<=1)return n;const o=i.custom.floors[0].id;for(const a of i.extras)(a.floor??o)===s.id&&cc(r,a.x,a.z)&&(a.hidden=!0);return s.rooms=s.rooms.filter(a=>a.id!==e),s.openings=uc(s),ui(n,i)}function QM(n,t,e,i=Math.random){if(!t.custom)return null;const s=bn(n);if(s.custom.floors.length>=ne.floors)return null;const r=ac("f",new Set(s.custom.floors.map(o=>o.id)),i);return s.custom.floors.push({id:r,name:String(e??"").trim()||`Tầng ${s.custom.floors.length+1}`,rooms:[{id:"room-1",name:"Phòng 1",x0:1,x1:7,z0:1,z1:6,floor:"wood"}],openings:[]}),{layout:Ce(s),id:r}}function tb(n,t,e,i){const s=String(i??"").trim().slice(0,ne.nameMax);if(!t.custom||!s)return n;const r=bn(n),o=r.custom.floors.find(a=>a.id===e);return o?(o.name=s,ui(n,r)):n}function eb(n,t,e){if(!t.custom)return n;const i=bn(n);if(i.custom.floors.length<=1||!i.custom.floors.some(o=>o.id===e))return n;const s=i.custom.floors[0].id;i.custom.floors=i.custom.floors.filter(o=>o.id!==e);const r=i.custom.floors[0].id;return i.extras=i.extras.filter(o=>(o.floor??s)!==e).map(o=>({...o,floor:o.floor??r})),ui(n,i)}function nb(n,t,e){if(!t.custom)return{layout:n,factor:1,before:0,after:0};const i=Ce(n),{factor:s,before:r,after:o}=UM(i.custom.floors,e);if(Math.abs(s-1)<1e-6)return{layout:n,factor:1,before:r,after:r};const a=bn(i),c=f=>Te(f*s);for(const f of a.custom.floors){for(const d of f.rooms)Object.assign(d,{x0:c(d.x0),x1:c(d.x1),z0:c(d.z0),z1:c(d.z1)});for(const d of f.openings)Object.assign(d,{at:c(d.at),c:c(d.c)})}for(const f of a.extras)Object.assign(f,{x:c(f.x),z:c(f.z)});const l=Ce(a),u=l.custom?sc(l.custom.floors):o;return{layout:l,factor:s,before:r,after:u}}const ad=.03,ib=.17,sb=new Set(["door","window","open"]);function rb(n,t,e,i){const s=n.renderer.domElement,r=n.controls,o=new Ql,a=new Nt,c=new Qn(new U(0,1,0),0),l=new U;let u=null;const f=new Zt;f.name="editor-overlay",n.scene.add(f);const d=new Xt(new fe(1,.06,1),new $i({color:14178863,transparent:!0,opacity:.35,depthWrite:!1}));d.visible=!1,f.add(d);const m=new $i({color:14178863,depthTest:!1}),g={};for(const P of["x0","x1","z0","z1"]){const D=new Xt(new As(ib,16,12),m);D.renderOrder=10,D.visible=!1,D.userData.edge=P,f.add(D),g[P]=D}function v(P,D=!0){d.visible=!0,d.scale.set(Math.max(.01,P.x1-P.x0),1,Math.max(.01,P.z1-P.z0)),d.position.set((P.x0+P.x1)/2,.05,(P.z0+P.z1)/2),d.material.color.set(D?14178863:12597547),n.invalidate()}const _=()=>{d.visible&&(d.visible=!1,n.invalidate())},h=()=>{const P=j.state.selection;return P?.type==="room"?pe.get("room",P.id):null};function x(){const P=j.state.editing&&!j.state.tool&&i.isCustom?.()?h():null,D=P?PM(P):null;for(const[H,N]of Object.entries(g))N.visible=!!D,D&&N.position.set(D[H].x,.2,D[H].z);n.invalidate()}function S(P){const D=s.getBoundingClientRect();a.set((P.clientX-D.left)/D.width*2-1,-((P.clientY-D.top)/D.height)*2+1),o.setFromCamera(a,n.camera)}function E(P,D){return S(P),o.ray.intersectPlane(c,D)}function L(P){if(!g.x0.visible)return null;S(P);const D=o.intersectObjects(Object.values(g),!1)[0];return D?D.object.userData.edge:null}function A(P){S(P);const D=o.intersectObjects(t.pickables,!0);for(const H of D)for(let N=H.object;N&&N.visible!==!1;N=N.parent){const k=N.userData?.ref;if(k?.type==="item"&&pe.get("item",k.id)||k?.type==="opening"&&pe.get("opening",k.id))return k}return null}function w(P,D,H="grabbing"){u={pointerId:P.pointerId,...D},r.enabled=!1,n.cancelFlight(),s.setPointerCapture(P.pointerId),s.style.cursor=H,P.stopImmediatePropagation()}const p=P=>{if(!j.state.editing||j.state.mode!=="overview"||P.button!==0)return;const D=j.state.tool;if(sb.has(D)){if(!E(P,l))return;const J=CM(st.walls,l.x,l.z,.6);P.stopImmediatePropagation(),J?i.onOpeningAdd({dir:J.wall.dir,at:J.wall.at,c:J.c,type:D}):i.onReject?.("Bấm vào một đoạn tường để đặt cửa.");return}if(D==="room"){if(!E(P,l))return;const J={x:Zr(l.x),z:Zr(l.z)};w(P,{kind:"draw",start:J,rect:null},"crosshair");return}const H=L(P),N=H?h():null;if(N&&E(P,l)){w(P,{kind:"resize",id:N.id,edge:H,room:N,rect:null},"ew-resize");return}const k=A(P);if(k?.type==="opening"){const J=t.getObject("opening",k.id),ot=st.walls.find(Ct=>Ct.openings.some(ct=>ct.id===k.id));if(!J||!ot||!E(P,l))return;const pt=ot.dir==="x"?l.x:l.z,wt=ot.dir==="x"?J.position.x:J.position.z;j.select(k),w(P,{kind:"opening",id:k.id,mesh:J,wall:ot,offset:wt-pt,start:wt,c:wt});return}if(k?.type==="item"){const J=t.getObject("item",k.id);if(!J||!E(P,l))return;j.select(k),w(P,{kind:"item",id:k.id,group:J,offsetX:J.position.x-l.x,offsetZ:J.position.z-l.z,startX:J.position.x,startZ:J.position.z});return}const B=i.isCustom?.()?h():null;B&&E(P,l)&&DM(B,l.x,l.z)&&w(P,{kind:"room",id:B.id,room:B,startPt:{x:l.x,z:l.z},dx:0,dz:0})},M=P=>{if(!(!u||P.pointerId!==u.pointerId)&&E(P,l)){if(u.kind==="item"){const D=ed(l.x+u.offsetX,st.size.w),H=ed(l.z+u.offsetZ,st.size.d);t.moveItem(u.id,D,H),e.refresh()}else if(u.kind==="opening"){const D=(u.wall.dir==="x"?l.x:l.z)+u.offset,H=u.wall.from+.5,N=u.wall.to-.5;u.c=Math.round(Math.min(N,Math.max(H,D))*20)/20,u.wall.dir==="x"?u.mesh.position.x=u.c:u.mesh.position.z=u.c,v(u.wall.dir==="x"?{x0:u.c-.45,x1:u.c+.45,z0:u.wall.at-.1,z1:u.wall.at+.1}:{x0:u.wall.at-.1,x1:u.wall.at+.1,z0:u.c-.45,z1:u.c+.45})}else if(u.kind==="draw")u.rect=qM(u.start,{x:l.x,z:l.z}),v(u.rect);else if(u.kind==="resize"){const D=u.edge[0]==="x"?l.x:l.z;u.rect=LM(u.room,u.edge,D),v(u.rect)}else if(u.kind==="room"){u.dx=Zr(l.x-u.startPt.x),u.dz=Zr(l.z-u.startPt.z);const D=u.room;v({x0:D.x0+u.dx,x1:D.x1+u.dx,z0:D.z0+u.dz,z1:D.z1+u.dz})}}},T=P=>{if(!u||P.pointerId!==u.pointerId)return;const D=u;if(u=null,r.enabled=j.state.mode==="overview",s.style.cursor="",_(),P.type==="pointercancel"){i.onCancel?.();return}if(D.kind==="item"){const H=D.group.position.x,N=D.group.position.z;Math.hypot(H-D.startX,N-D.startZ)>=ad&&i.onMove(D.id,H,N)}else D.kind==="opening"?Math.abs(D.c-D.start)>=ad&&i.onOpeningMove(D.id,D.c):D.kind==="draw"?D.rect&&i.onRoomDraw(D.rect):D.kind==="resize"?D.rect&&i.onRoomResize(D.id,D.rect):D.kind==="room"&&(D.dx||D.dz)&&i.onRoomMove(D.id,D.dx,D.dz)};s.addEventListener("pointerdown",p,{capture:!0}),s.addEventListener("pointermove",M),s.addEventListener("pointerup",T),s.addEventListener("pointercancel",T);const C=j.subscribe((P,D,H)=>{(H.includes("tool")||H.includes("selection")||H.includes("editing"))&&x(),H.includes("tool")&&(s.style.cursor=P.tool?"crosshair":"")});return{setEditing(P){r.mouseButtons=P?{LEFT:Xe.PAN,MIDDLE:Xe.DOLLY,RIGHT:Xe.ROTATE}:{LEFT:Xe.ROTATE,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN},r.touches=P?{ONE:hn.PAN,TWO:hn.DOLLY_ROTATE}:{ONE:hn.ROTATE,TWO:hn.DOLLY_PAN},r.screenSpacePanning=P,x()},sync:x,dispose(){C(),s.removeEventListener("pointerdown",p,{capture:!0}),s.removeEventListener("pointermove",M),s.removeEventListener("pointerup",T),s.removeEventListener("pointercancel",T),n.scene.remove(f)}}}const Ta=n=>String(n??"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d");function ob(n,t=8){const e=Ta(n).trim();if(!e)return[];const i=[];for(const s of pe.list("room"))Ta(s.name).includes(e)&&i.push({type:"room",id:s.id,title:s.name,sub:`${s.area.toFixed(0)} m²`});for(const s of pe.list("item")){const r=pe.room(s.roomId);if(Ta(`${s.name} ${s.category} ${r?.name??""} ${s.material??""}`).includes(e)&&i.push({type:"item",id:s.id,title:s.name,sub:`${s.category} · ${r?.name??""}`}),i.length>=t)break}return i.slice(0,t)}const ab=n=>n?`${n.w.toFixed(2)} × ${n.d.toFixed(2)} × ${n.h.toFixed(2)} m`:"",wl=1,ld=8,lb=1e3,cb=20,Ls=()=>!!window.ReactNativeWebView,yo=()=>Ls()||window.parent!==window;function vn(n,t){const e=t===void 0?{version:wl,type:n}:{version:wl,type:n,payload:t};if(window.ReactNativeWebView){window.ReactNativeWebView.postMessage(JSON.stringify(e));return}window.parent!==window&&window.parent.postMessage(e,window.location.origin)}function dc(n){if(!n||typeof n!="object")return null;const t=typeof n.apartmentId=="string"?n.apartmentId.trim():"",e=Number(n.bedrooms),i=Number(n.bathrooms),s=Number(n.areaM2);if(!t||!Number.isFinite(e)||e<0||e>ld||!Number.isFinite(i)||i<0||i>ld||!Number.isFinite(s)||s<=0||s>lb||!["bare","partial","full"].includes(n.furnishing))return null;const r=Array.isArray(n.designs)?n.designs.slice(0,cb).map(ic).filter(Boolean):[];return{apartmentId:t,bedrooms:Math.floor(e),bathrooms:Math.floor(i),areaM2:s,furnishing:n.furnishing,designs:r,designId:typeof n.designId=="string"?n.designId:null,editable:n.editable===!0&&!Ls()}}function ub(n){const t=window.location.origin,e=i=>{if(!(!!window.ReactNativeWebView&&(!i.origin||i.origin==="null"))&&(i.origin!==t||i.source!==window.parent))return;let r=i.data;if(typeof r=="string")try{r=JSON.parse(r)}catch{return}if(!(!r||r.version!==wl))if(r.type==="FLOORPLAN_INIT"){const o=dc(r.payload);o?n.init(o):vn("FLOORPLAN_ERROR",{code:"INVALID_CONFIG"})}else r.type==="FLOORPLAN_CAMPUS_INIT"?n.campus?.(r.payload):r.type==="FLOORPLAN_EXPANDED"?n.expanded?.(!!r.payload?.expanded):r.type==="FLOORPLAN_PAUSE"?n.pause():r.type==="FLOORPLAN_RESUME"?n.resume():r.type==="FLOORPLAN_RESET"&&n.reset()};return window.addEventListener("message",e),document.addEventListener("message",e),()=>{window.removeEventListener("message",e),document.removeEventListener("message",e)}}function db(n,t){const e=(s,r)=>n.has(s)?Number(n.get(s)):r,i=["bare","partial","full"].includes(n.get("furnishing"))?n.get("furnishing"):"full";return dc({apartmentId:n.get("id")??"demo",bedrooms:e("bedrooms",2),bathrooms:e("bathrooms",1),areaM2:e("area",70),furnishing:i,designs:t,designId:n.get("design")})}const hb=n=>{const t=Math.floor(n),e=Math.round((n-t)*60);return`${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`};function fb(n){n.innerHTML=`
    <div class="brand">
      <span class="brand__mark">${te("cube",18,2)}</span>
      <div class="brand__text"><b id="brand-title"></b><small id="brand-sub"></small></div>
    </div>

    <div class="search">
      <span class="search__icon">${te("search",16)}</span>
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
        ${te("sun",18)}<span id="hour-text"></span>
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
      <button role="tab" data-mode="overview" type="button">${te("cube",15)}<span>Tổng quan</span></button>
      <button role="tab" data-mode="walk" type="button">${te("walk",15)}<span>Đi vào</span></button>
    </div>`;const t=n.querySelector("#q"),e=n.querySelector(".search__menu"),i=n.querySelector("#hour"),s=n.querySelector("#sun-pop"),r=n.querySelector("#sun-btn"),o=n.querySelector("#play");function a(){const p=j.state.searchQuery,M=ob(p);e.hidden=!p.trim(),e.innerHTML=M.length?M.map(T=>`
        <li><button type="button" data-type="${T.type}" data-id="${Ht(T.id)}">
          <span class="res__ico">${te(T.type==="room"?"home":"pin",15)}</span>
          <span class="res__txt"><b>${Ht(T.title)}</b><small>${Ht(T.sub)}</small></span>
        </button></li>`).join(""):'<li class="res__empty">Không tìm thấy</li>'}t.addEventListener("input",()=>{j.set({searchQuery:t.value}),a()}),t.addEventListener("focus",a),t.addEventListener("keydown",p=>{p.key==="Escape"&&(t.value="",j.set({searchQuery:""}),e.hidden=!0,t.blur()),p.key==="Enter"&&e.querySelector("button")?.click()}),e.addEventListener("click",p=>{const M=p.target.closest("button[data-id]");if(!M)return;const T={type:M.dataset.type,id:M.dataset.id};t.value="",j.set({searchQuery:""}),e.hidden=!0,t.blur(),T.type==="room"&&Pt.emit("room:go",{id:T.id}),j.select(T),T.type==="item"&&Pt.emit("camera:locate",T)}),document.addEventListener("pointerdown",p=>{n.querySelector(".search").contains(p.target)||(e.hidden=!0),n.querySelector(".sunwrap").contains(p.target)||n.querySelector("#design-wrap").contains(p.target)||j.set({menu:null})}),r.addEventListener("click",()=>j.set({menu:j.state.menu==="sun"?null:"sun"})),i.addEventListener("input",()=>j.set({hour:Number(i.value),playing:!1})),o.addEventListener("click",()=>j.set({playing:!j.state.playing})),n.querySelector(".seg").addEventListener("click",p=>{const M=p.target.closest("[data-mode]");M&&M.dataset.mode!==j.state.mode&&j.set({mode:M.dataset.mode})});const c=n.querySelector("#fs-btn"),l=!!(document.fullscreenEnabled||document.webkitFullscreenEnabled),u=yo()&&!Ls();let f=!1;function d(){c.innerHTML=te(f?"shrink":"expand",18);const p=f?"Thoát toàn màn hình":"Toàn màn hình";c.setAttribute("aria-label",p),c.title=p}c.hidden=Ls()||!(l||u),c.addEventListener("click",()=>{if(l){const p=document.documentElement.requestFullscreen??document.documentElement.webkitRequestFullscreen,M=document.exitFullscreen??document.webkitExitFullscreen;document.fullscreenElement??document.webkitFullscreenElement?M.call(document):p.call(document.documentElement)}else vn("FLOORPLAN_EXPAND_TOGGLE")});const m=()=>{f=!!(document.fullscreenElement??document.webkitFullscreenElement),d()};document.addEventListener("fullscreenchange",m),document.addEventListener("webkitfullscreenchange",m),Pt.on("host:expanded",({expanded:p})=>{f=p,d()}),d();const g=n.querySelector("#edit-btn");g.addEventListener("click",()=>j.set({editing:!j.state.editing}));function v(p){g.hidden=!(p.editable&&p.mode==="overview"),g.setAttribute("aria-pressed",String(p.editing)),g.classList.toggle("active",p.editing);const M=p.editing?"Xong chỉnh sửa":"Chỉnh bố cục";g.innerHTML=`${te("pencil",18)}<span>${M}</span>`,g.setAttribute("aria-label",M),g.title=M}const _=n.querySelector("#design-wrap"),h=n.querySelector("#design-btn"),x=n.querySelector("#design-pop");let S="";function E(p){const M=yh(p);return[M.floor,M.wall,M.sofa,M.accent].map(T=>`<i style="background:#${T.toString(16).padStart(6,"0")}"></i>`).join("")}function L(p){const{designs:M,designId:T}=p;_.hidden=M.length<2;const C=M.find(D=>D.id===T)??M[0];n.querySelector("#design-name").textContent=C?.name??"",n.querySelector("#design-swatch").innerHTML=C?E(C):"",h.setAttribute("aria-expanded",String(p.menu==="designs")),x.hidden=p.menu!=="designs";const P=M.map(D=>D.id+D.name).join("|")+"#"+T;P!==S&&(S=P,x.innerHTML=M.map(D=>`<li><button type="button" role="option" data-design="${Ht(D.id)}" aria-selected="${D.id===T}" class="${D.id===T?"active":""}">
          <span class="swatches">${E(D)}</span>
          <span class="res__txt"><b>${Ht(D.name)}</b><small>${Ht(D.description||Ps[D.theme]?.label||"")}</small></span>
        </button></li>`).join(""))}h.addEventListener("click",()=>j.set({menu:j.state.menu==="designs"?null:"designs"})),x.addEventListener("click",p=>{const M=p.target.closest("[data-design]");M&&(j.set({menu:null}),Pt.emit("design:select",{id:M.dataset.design}))});function A(){n.querySelector("#brand-title").textContent=st.bedrooms===0?"Căn hộ studio":`Căn hộ ${st.bedrooms} phòng ngủ`,n.querySelector("#brand-sub").textContent=st.custom?`${st.totalArea.toFixed(0)} m²${st.floors.length>1?` · ${st.floors.length} tầng`:""} · Mặt bằng tuỳ chỉnh`:`${st.area.toFixed(0)} m² · Bố cục minh hoạ`}Pt.on("plan:loaded",A),A();function w(p){L(p),v(p);for(const M of n.querySelectorAll("[data-mode]")){const T=M.dataset.mode===p.mode;M.classList.toggle("active",T),M.setAttribute("aria-selected",String(T))}n.querySelector("#hour-text").textContent=hb(p.hour),document.activeElement!==i&&(i.value=String(p.hour)),s.hidden=p.menu!=="sun",r.setAttribute("aria-expanded",String(p.menu==="sun")),o.innerHTML=`${te(p.playing?"pause":"play",14)}<span>${p.playing?"Dừng":"Tua ngày"}</span>`}j.subscribe(p=>w(p)),w(j.state)}function pb(n){n.innerHTML=`
    <div class="card rooms" data-inset="rooms">
      <button type="button" class="rooms__title" aria-expanded="true" aria-controls="rooms-list">Các phòng <span aria-hidden="true">▾</span></button>
      <div class="floors" role="tablist" aria-label="Tầng" hidden></div>
      <ul class="rooms__list" id="rooms-list" role="list"></ul>
    </div>`;const t=n.querySelector(".rooms__list"),e=n.querySelector(".floors");function i(){e.hidden=st.floors.length<2,e.innerHTML=st.floors.map(a=>`<button type="button" role="tab" class="floorbtn${a.id===st.floorId?" on":""}" aria-selected="${a.id===st.floorId}" data-floor="${Ht(a.id)}">${Ht(a.name)}</button>`).join(""),t.innerHTML=pe.list("room").map(a=>`
          <li><button type="button" class="room" data-room="${Ht(a.id)}">
            <span class="room__row"><b>${Ht(a.name)}</b><span>${a.area.toFixed(0)} m²</span></span>
            <small>${Ht(a.note)}</small>
          </button></li>`).join(""),o(j.state)}const s=n.querySelector(".rooms"),r=n.querySelector(".rooms__title");window.innerWidth>=720&&window.innerWidth<1100&&(s.classList.add("is-collapsed"),r.setAttribute("aria-expanded","false")),r.addEventListener("click",()=>{const a=s.classList.toggle("is-collapsed");r.setAttribute("aria-expanded",String(!a))}),j.subscribe((a,c,l)=>{!l.includes("editing")||!a.editing||(s.classList.add("is-collapsed"),r.setAttribute("aria-expanded","false"))}),n.addEventListener("click",a=>{const c=a.target.closest("[data-floor]");if(c)return Pt.emit("plan:floor-select",{id:c.dataset.floor});const l=a.target.closest("[data-room]");l&&(j.set({selection:null}),Pt.emit("room:go",{id:l.dataset.room}))});function o(a){for(const c of n.querySelectorAll("[data-room]")){const l=c.dataset.room===a.roomId;c.classList.toggle("active",l),l&&window.matchMedia("(max-width: 719px)").matches&&c.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"})}}j.subscribe((a,c,l)=>l.includes("roomId")&&o(a)),Pt.on("plan:loaded",i),i()}const cd=(n,t)=>t?`<div class="kv"><dt>${n}</dt><dd>${Ht(t)}</dd></div>`:"";function mb(n){const t=pe.room(n.roomId);return`
    <header class="detail__head">
      <div>
        <span class="tag">${Ht(n.category)}</span>
        <h2>${Ht(n.name)}</h2>
        ${t?`<button type="button" class="link" data-go-room="${Ht(t.id)}">${te("pin",13)} ${Ht(t.name)}</button>`:""}
      </div>
      <button type="button" class="iconbtn" data-close aria-label="Đóng">${te("close",18)}</button>
    </header>
    <dl class="kvs">
      ${cd("Kích thước",ab(n.dims))}
      ${cd("Chất liệu",n.material)}
    </dl>
    ${n.note?`<p class="detail__note">${Ht(n.note)}</p>`:""}
    <div class="detail__actions">
      <button type="button" class="btn btn--primary" data-locate>${te("eye",16)} Xem gần</button>
    </div>`}function gb(n){const t=pe.itemsIn(n.id);return`
    <header class="detail__head">
      <div>
        <span class="tag">Phòng</span>
        <h2>${Ht(n.name)}</h2>
        <small class="muted">${n.area.toFixed(0)} m² · ${t.length} món nội thất</small>
      </div>
      <button type="button" class="iconbtn" data-close aria-label="Đóng">${te("close",18)}</button>
    </header>
    <p class="detail__note">${Ht(n.note)}</p>
    <ul class="chips" role="list">
      ${t.map(e=>`<li><button type="button" class="chip" data-item="${Ht(e.id)}">${Ht(e.name)}</button></li>`).join("")}
    </ul>
    <div class="detail__actions">
      <button type="button" class="btn btn--primary" data-go-room="${Ht(n.id)}">${te("eye",16)} Đến phòng này</button>
    </div>`}function _b(n){n.innerHTML='<aside class="card detail" data-inset="detail" hidden aria-live="polite"></aside>';const t=n.firstElementChild;t.addEventListener("click",i=>{if(i.target.closest("[data-close]"))return j.select(null);const s=i.target.closest("[data-go-room]");if(s)return Pt.emit("room:go",{id:s.dataset.goRoom});const r=i.target.closest("[data-item]");if(r){const o={type:"item",id:r.dataset.item};return j.select(o),Pt.emit("camera:locate",o)}i.target.closest("[data-locate]")&&j.state.selection&&Pt.emit("camera:locate",j.state.selection)});function e(i){const s=i.selection,r=s&&pe.get(s.type,s.id);if(!r){t.hidden=!0,t.innerHTML="";return}t.innerHTML=r.type==="room"?gb(r):mb(r),t.hidden=!1}j.subscribe((i,s,r)=>r.includes("selection")&&e(i)),e(j.state)}const xb=[[{cmd:"zoomIn",icon:"plus",label:"Phóng to"},{cmd:"zoomOut",icon:"minus",label:"Thu nhỏ"}],[{cmd:"rotateLeft",icon:"rotateLeft",label:"Xoay trái"},{cmd:"rotateRight",icon:"rotateRight",label:"Xoay phải"}],[{cmd:"home",icon:"home",label:"Về góc nhìn ban đầu"}]];function vb(n){n.innerHTML=`<nav class="card mapctl" aria-label="Điều khiển camera">${xb.map(t=>t.map(e=>`<button class="mapctl__btn" type="button" data-cmd="${e.cmd}" title="${e.label}" aria-label="${e.label}">${te(e.icon,17)}</button>`).join("")).join('<span class="mapctl__sep" aria-hidden="true"></span>')}</nav>`,n.addEventListener("click",t=>{const e=t.target.closest("[data-cmd]");e&&Pt.emit("camera:cmd",{cmd:e.dataset.cmd})})}const qs=46;function Mb(n,t){n.innerHTML=`
    <canvas class="minimap card" width="220" height="154" aria-label="Sơ đồ vị trí"></canvas>
    <div class="joy" aria-hidden="true"><div class="joy__knob"></div></div>
    <div class="touchpad">
      <button class="tbtn" type="button" data-key="KeyQ" aria-label="Quay trái">${te("rotateLeft",22)}</button>
      <button class="tbtn" type="button" data-key="KeyE" aria-label="Quay phải">${te("rotateRight",22)}</button>
      <button class="tbtn tbtn--run" type="button" aria-pressed="false" aria-label="Chạy">${te("walk",22)}</button>
    </div>
    <p class="toast" role="status" hidden></p>`;const e=n.querySelector(".minimap"),i=e.getContext("2d"),s=n.querySelector(".joy"),r=n.querySelector(".joy__knob"),o=n.querySelector(".toast");let a=null;const c=(h,x)=>{r.style.transform=`translate(${h}px, ${x}px)`};function l(h){const x=s.getBoundingClientRect();let S=h.clientX-(x.left+x.width/2),E=h.clientY-(x.top+x.height/2);const L=Math.hypot(S,E);L>qs&&(S=S/L*qs,E=E/L*qs),c(S,E),t.setAxis(S/qs,E/qs)}s.addEventListener("pointerdown",h=>{a=h.pointerId,s.setPointerCapture(a),l(h)}),s.addEventListener("pointermove",h=>h.pointerId===a&&l(h));const u=h=>{h.pointerId===a&&(a=null,c(0,0),t.setAxis(0,0))};s.addEventListener("pointerup",u),s.addEventListener("pointercancel",u);const f=n.querySelector(".touchpad");for(const h of f.querySelectorAll("[data-key]")){const x=h.dataset.key,S=E=>{t.press(x,!1),h.classList.remove("on"),h.hasPointerCapture?.(E.pointerId)&&h.releasePointerCapture(E.pointerId)};h.addEventListener("pointerdown",E=>{h.setPointerCapture(E.pointerId),t.press(x,!0),h.classList.add("on")}),h.addEventListener("pointerup",S),h.addEventListener("pointercancel",S)}const d=f.querySelector(".tbtn--run");d.addEventListener("click",()=>{const h=d.getAttribute("aria-pressed")!=="true";d.setAttribute("aria-pressed",String(h)),d.classList.toggle("on",h),t.press("ShiftLeft",h)});function m(){const{width:h,height:x}=e,S=12,E=Math.min((h-S*2)/st.size.w,(x-S*2)/st.size.d),L=(h-st.size.w*E)/2,A=(x-st.size.d*E)/2;i.clearRect(0,0,h,x),i.font="11px system-ui, sans-serif",i.textAlign="center";for(const D of st.rooms){const H=D.id===j.state.roomId;i.fillStyle=H?"#f5e3dc":"#fffdf9",i.strokeStyle="#c9b8ae",i.lineWidth=1.5,i.fillRect(L+D.x0*E,A+D.z0*E,(D.x1-D.x0)*E,(D.z1-D.z0)*E),i.strokeRect(L+D.x0*E,A+D.z0*E,(D.x1-D.x0)*E,(D.z1-D.z0)*E),i.fillStyle="#7a6a61",i.fillText(D.name,L+(D.x0+D.x1)/2*E,A+(D.z0+D.z1)/2*E+4)}const{x:w,z:p,yaw:M}=t.state,T=L+w*E,C=A+p*E,P=Math.atan2(-Math.cos(M),-Math.sin(M));i.fillStyle="rgba(198,90,58,0.25)",i.beginPath(),i.moveTo(T,C),i.arc(T,C,26,P-.6,P+.6),i.closePath(),i.fill(),i.fillStyle="#c65a3a",i.beginPath(),i.arc(T,C,5,0,Math.PI*2),i.fill()}let g=0;function v(h){o.textContent=h,o.hidden=!1,clearTimeout(g),g=setTimeout(()=>{o.hidden=!0},5e3)}function _(h){const x=h.mode==="walk";if(n.hidden=!x,document.body.classList.toggle("walking",x),x){const S=window.matchMedia("(pointer: coarse)").matches;v(S?"Cần bên trái để đi, nút bên phải để quay hoặc chạy, kéo màn hình để nhìn quanh.":"WASD hoặc phím mũi tên để đi, Shift để chạy, kéo chuột để nhìn quanh.")}}return j.subscribe((h,x,S)=>S.includes("mode")&&_(h)),_(j.state),{draw:m,notify:v}}const bb={wood:"Gỗ sáng",darkwood:"Gỗ tối",tile:"Gạch",marble:"Đá hoa",granite:"Granite",concrete:"Bê tông",epoxy:"Epoxy trắng",carpet:"Thảm",glass:"Kính"},Sb={door:"Cửa đi",window:"Cửa sổ",open:"Lối mở"},ud=[.7,.9,1.2,1.5,2,2.5,3],Hi=n=>`${(Math.round(n*10)/10).toLocaleString("vi-VN")} m²`,wa=(n,t,e,i)=>`<div class="chips-row">${n.map(s=>`<button type="button" class="chipbtn${s===t?" on":""}" ${e}="${Ht(s)}">${Ht(i(s))}</button>`).join("")}</div>`;function yb(n){const t=(e,i,s)=>`<button type="button" class="chipbtn${n.tool===e?" on":""}" data-tool="${e}">${te(s,15)} ${i}</button>`;return`<section><h3>Thêm vào mặt bằng</h3><div class="chips-row">
      ${t("door","Cửa đi","plus")}${t("window","Cửa sổ","plus")}${t("open","Lối mở","plus")}
      ${st.custom?t("room","Vẽ phòng","pencil"):""}
    </div>${n.tool?`<p class="plan__hint">${n.tool==="room"?"Kéo trên sàn để vẽ phòng chữ nhật.":"Bấm vào một đoạn tường để đặt."} Bấm lại nút để thôi.</p>`:""}</section>`}function Eb(n){const t=n.selection,e=t&&pe.get(t.type,t.id);return e?.type==="room"?`<section><h3>Phòng đang chọn</h3>
      <label class="plan__field">Tên phòng
        <input type="text" maxlength="40" value="${Ht(e.name)}" data-room-name="${Ht(e.id)}" />
      </label>
      <div class="plan__label">Vật liệu sàn</div>
      ${wa(ec,e.floor??"wood","data-room-floor",i=>bb[i])}
      <p class="plan__hint">${Hi(e.area)}${st.custom?" · kéo chấm cam để đổi cạnh, kéo sàn để dời phòng":""}</p>
      ${st.custom?`<button type="button" class="rbtn rbtn--danger" data-room-delete="${Ht(e.id)}">${te("trash",16)}<span>Xoá phòng</span></button>`:""}
    </section>`:e?.type==="opening"?`<section><h3>${Ht(e.name)} đang chọn</h3>
      ${wa(Do,e.kind,"data-op-type",i=>Sb[i])}
      <div class="plan__label">Bề rộng</div>
      ${wa(ud,ud.find(i=>Math.abs(i-e.w)<.01),"data-op-width",i=>`${i} m`)}
      <p class="plan__hint">Kéo khối cửa dọc tường để dời.</p>
      <button type="button" class="rbtn rbtn--danger" data-op-delete="${Ht(e.id)}">${te("trash",16)}<span>Xoá</span></button>
    </section>`:'<p class="plan__hint">Bấm một phòng, hoặc một cửa, để chỉnh sàn / tên / kích thước.</p>'}function Tb(n){return st.custom?`<section><h3>Tầng · tổng ${Hi(st.totalArea)}</h3>
    <div class="chips-row">${st.floors.map(t=>`<button type="button" class="chipbtn${t.id===st.floorId?" on":""}" data-floor="${Ht(t.id)}">${Ht(t.name)} · ${Hi(t.area)}</button>`).join("")}
      <button type="button" class="chipbtn" data-floor-add>${te("plus",15)} Thêm tầng</button></div>
    <label class="plan__field">Tên tầng đang xem
      <input type="text" maxlength="40" value="${Ht(st.floors.find(t=>t.id===st.floorId)?.name??"")}" data-floor-name="${Ht(st.floorId)}" />
    </label>
    ${st.floors.length>1?`<button type="button" class="rbtn rbtn--danger" data-floor-remove="${Ht(st.floorId)}">${te("trash",16)}<span>Xoá tầng này</span></button>`:""}
  </section>`:""}function wb(n){if(!st.custom)return`<section><h3>Mặt bằng</h3>
      <p class="plan__hint">Đang dùng mặt bằng mẫu theo diện tích tin đăng (${Hi(st.area)}). Có thể đổi sàn, thêm/dời cửa. Muốn tự vẽ phòng và thêm tầng, hãy chuyển sang tự thiết kế.</p>
      <button type="button" class="rbtn" data-plan-convert>${te("pencil",16)}<span>Tự thiết kế mặt bằng</span></button>
    </section>`;const t=n.listingArea,e=t?Math.abs(st.totalArea-t):0;return`<section><h3>Diện tích</h3>
    <p class="plan__hint">Tầng này ${Hi(st.area)} · tổng ${Hi(st.totalArea)}${t?` · tin đăng ${Hi(t)}`:""}</p>
    ${t?`<button type="button" class="rbtn" data-plan-fit="${t}" ${e<.5?"disabled":""}>${te("cube",16)}<span>Khớp diện tích tin đăng</span></button>`:""}
    <button type="button" class="rbtn rbtn--danger" data-plan-revert>${te("undo",16)}<span>Quay về mặt bằng mẫu</span></button>
  </section>`}function Ab(n){let t=!1;function e(){const i=j.state;i.editPanel==="plan"&&(n.innerHTML=[wb(i),Tb(),yb(i),Eb(i)].join(""),t=!1)}return n.addEventListener("click",i=>{const s=i.target.closest("button");if(!s)return;const r=s.dataset;if(r.tool)return Pt.emit("tool:set",{tool:r.tool}),j.set({editPanel:null});if("planConvert"in r)return Pt.emit("plan:convert");if("planRevert"in r){if(!t){t=!0,s.querySelector("span").textContent="Bấm lần nữa để xác nhận (mất mặt bằng tự vẽ)";return}return Pt.emit("plan:revert")}if("planFit"in r)return Pt.emit("plan:fit",{target:Number(r.planFit)});if(r.floor)return Pt.emit("plan:floor-select",{id:r.floor});if("floorAdd"in r)return Pt.emit("plan:floor-add",{});if(r.floorRemove)return Pt.emit("plan:floor-remove",{id:r.floorRemove});if(r.roomFloor)return Pt.emit("plan:room-floor",{id:j.state.selection.id,floor:r.roomFloor});if(r.roomDelete)return Pt.emit("plan:room-delete",{id:r.roomDelete});if(r.opType)return Pt.emit("plan:opening-type",{id:j.state.selection.id,type:r.opType});if(r.opWidth)return Pt.emit("plan:opening-width",{id:j.state.selection.id,w:Number(r.opWidth)});if(r.opDelete)return Pt.emit("plan:opening-delete",{id:r.opDelete})}),n.addEventListener("change",i=>{const s=i.target.closest("input");s&&(s.dataset.roomName&&Pt.emit("plan:room-name",{id:s.dataset.roomName,name:s.value}),s.dataset.floorName&&Pt.emit("plan:floor-rename",{id:s.dataset.floorName,name:s.value}))}),j.subscribe((i,s,r)=>{["editPanel","selection","tool","floorId","listingArea"].some(o=>r.includes(o))&&e()}),Pt.on("plan:loaded",e),{render:e}}const Rb=60,Cb="Kéo đồ để dời · kéo nền để dịch khung · chuột phải để xoay",Pb={door:"Bấm vào tường để đặt cửa đi",window:"Bấm vào tường để đặt cửa sổ",open:"Bấm vào tường để tạo lối mở",room:"Kéo trên sàn để vẽ phòng"};function Lb(){const n=new Map;for(const t of Object.keys(Ki)){const e=Cs[t];e&&(n.has(e.category)||n.set(e.category,[]),n.get(e.category).push({kind:t,name:e.name}))}return[...n].map(([t,e])=>({category:t,kinds:e}))}function Db(n){const t=Lb();n.innerHTML=`
    <div class="rail" role="toolbar" aria-label="Công cụ chỉnh bố cục" hidden>
      <div class="drawer" data-drawer="catalog" role="dialog" aria-label="Danh mục đồ nội thất" hidden>
        ${t.map(v=>`<section><h3>${Ht(v.category)}</h3><div class="drawer__grid">${v.kinds.map(_=>`<button type="button" class="tile" data-add="${Ht(_.kind)}">${Ht(_.name)}</button>`).join("")}</div></section>`).join("")}
      </div>
      <div class="drawer" data-drawer="inventory" role="dialog" aria-label="Danh sách đồ trong căn hộ" hidden>
        <ul class="inv" role="list"></ul>
      </div>
      <div class="drawer drawer--plan" data-drawer="plan" role="dialog" aria-label="Mặt bằng" hidden><div class="plan"></div></div>
      <div class="rail__row">
        <button type="button" class="rbtn" data-panel="catalog" aria-expanded="false">${te("plus",18)}<span>Thêm đồ</span></button>
        <button type="button" class="rbtn" data-panel="plan" aria-expanded="false">${te("cube",18)}<span class="plan-label">Mặt bằng</span></button>
        <button type="button" class="rbtn" data-panel="inventory" aria-expanded="false">${te("list",18)}<span>Danh sách đồ</span></button>
        <span class="rail__ctx" hidden>
          <b class="rail__name"></b>
          <button type="button" class="rbtn rbtn--icon" data-act="rotate" aria-label="Xoay 90 độ" title="Xoay 90°">${te("rotateRight",18)}</button>
          <button type="button" class="rbtn rbtn--icon" data-act="toggle" aria-label="Ẩn đồ" title="Ẩn / hiện"></button>
          <button type="button" class="rbtn rbtn--icon" data-act="reset" aria-label="Đặt lại vị trí" title="Đặt lại vị trí" hidden>${te("undo",18)}</button>
          <button type="button" class="rbtn rbtn--icon rbtn--danger" data-act="remove" aria-label="Xoá đồ đã thêm" title="Xoá" hidden>${te("trash",18)}</button>
        </span>
        <p class="rail__hint">Kéo đồ để dời · kéo nền để dịch khung · chuột phải để xoay</p>
      </div>
    </div>`;const e=n.querySelector(".rail"),i=n.querySelector(".rail__ctx"),s=n.querySelector(".rail__hint"),r=n.querySelector(".rail__name"),o=n.querySelector('[data-act="toggle"]'),a=n.querySelector('[data-act="reset"]'),c=n.querySelector('[data-act="remove"]'),l=n.querySelector(".inv");let u="";const f=Ab(n.querySelector(".plan")),d=()=>{const v=j.state.selection;return v?.type==="item"?pe.get("item",v.id):null};function m(){const v=pe.list("item"),_=v.map(x=>`${x.id}:${x.hidden?1:0}`).join("|");if(_===u)return;u=_;const h=v.filter(x=>x.extra).length;l.innerHTML=v.map(x=>`<li class="inv__row${x.hidden?" is-hidden":""}">
            <button type="button" class="inv__name" data-pick="${Ht(x.id)}">${Ht(x.name)}${x.extra?" <small>(thêm)</small>":""}</button>
            <button type="button" class="rbtn rbtn--icon" data-vis="${Ht(x.id)}" aria-label="${x.hidden?"Hiện":"Ẩn"} ${Ht(x.name)}">${te(x.hidden?"eyeOff":"eye",18)}</button>
          </li>`).join("")+`<li class="inv__foot">${v.length} món · ${h}/${Rb} đồ thêm</li>`}function g(v){const _=v.editing&&v.editable&&v.mode==="overview";if(e.hidden=!_,!_)return;n.querySelector(".plan-label").textContent=`Mặt bằng · ${st.totalArea.toFixed(0)} m²${st.floors.length>1?` · ${st.floors.length} tầng`:""}`;const h=d();i.hidden=!h,s.hidden=!!h,h&&(r.textContent=h.name,o.innerHTML=te(h.hidden?"eyeOff":"eye",18),o.setAttribute("aria-label",h.hidden?`Hiện ${h.name}`:`Ẩn ${h.name}`),a.hidden=!h.moved,c.hidden=!h.extra);for(const x of n.querySelectorAll("[data-panel]")){const S=v.editPanel===x.dataset.panel;x.setAttribute("aria-expanded",String(S)),x.classList.toggle("active",S)}for(const x of n.querySelectorAll("[data-drawer]"))x.hidden=x.dataset.drawer!==v.editPanel;v.editPanel==="inventory"&&m(),v.editPanel==="plan"&&f.render(),s.textContent=Pb[v.tool]??Cb}n.addEventListener("click",v=>{const _=v.target.closest("[data-panel]");if(_){j.set({editPanel:j.state.editPanel===_.dataset.panel?null:_.dataset.panel});return}const h=v.target.closest("[data-add]");if(h)return Pt.emit("edit:add",{kind:h.dataset.add});const x=v.target.closest("[data-pick]");if(x){const A={type:"item",id:x.dataset.pick};return j.select(A),Pt.emit("camera:locate",A)}const S=v.target.closest("[data-vis]");if(S)return u="",Pt.emit("edit:toggle",{id:S.dataset.vis});const E=v.target.closest("[data-act]"),L=d();E&&L&&Pt.emit(`edit:${E.dataset.act}`,{id:L.id})}),n.addEventListener("keydown",v=>{v.key==="Escape"&&j.state.editPanel&&j.set({editPanel:null})}),j.subscribe((v,_,h)=>{["editing","editable","mode","selection","editPanel","tool"].some(x=>h.includes(x))&&g(v)}),Pt.on("plan:loaded",()=>{u="",g(j.state)}),g(j.state)}const Aa=n=>!!n&&n.width>0&&n.height>0;function Ib({width:n,height:t},{topbar:e,rooms:i,detail:s,detailShown:r=!0},o=720){const a={left:0,right:0,top:0,bottom:0},c=n>=o;Aa(e)&&(a.top=Math.max(0,e.bottom)),Aa(i)&&(c?a.left=Math.max(0,i.right):a.bottom=Math.max(a.bottom,t-i.top)),r&&Aa(s)&&(c?a.right=Math.max(0,n-s.left):a.bottom=Math.max(a.bottom,t-s.top));const l=n*.6,u=t*.6;if(a.left+a.right>l){const f=l/(a.left+a.right);a.left*=f,a.right*=f}if(a.top+a.bottom>u){const f=u/(a.top+a.bottom);a.top*=f,a.bottom*=f}return a}const Nb=[["header","ui-topbar"],["nav","ui-rooms"],["div","ui-detail"],["div","ui-mapctl"],["div","ui-hud"],["div","ui-edit"]];function Ub(n,{app:t,walker:e}){const i={};for(const[c,l]of Nb){const u=document.createElement(c);u.id=l,u.className="region",n.append(u),i[l]=u}fb(i["ui-topbar"]),pb(i["ui-rooms"]),_b(i["ui-detail"]),vb(i["ui-mapctl"]);const s=Mb(i["ui-hud"],e);Db(i["ui-edit"]);let r=0;function o(){r=0;const c=n.querySelector('[data-inset="detail"]');t.setInsets(Ib({width:window.innerWidth,height:window.innerHeight},{topbar:i["ui-topbar"].getBoundingClientRect(),rooms:n.querySelector('[data-inset="rooms"]')?.getBoundingClientRect(),detail:c?.getBoundingClientRect(),detailShown:!!c&&!c.hidden&&!document.body.classList.contains("editing")}))}const a=()=>{r||(r=requestAnimationFrame(o))};return window.addEventListener("resize",a),j.subscribe((c,l,u)=>{(u.includes("selection")||u.includes("mode")||u.includes("editing"))&&(a(),setTimeout(a,320))}),a(),setTimeout(a,400),{hud:s,els:i}}const mt=Math.PI,le=(n,t,e)=>({c:n,w:t,type:"window",...e?{sill:e}:{}}),gn=(n,t=.9)=>({c:n,w:t,type:"door"}),No=(n,t=1)=>({c:n,w:t,type:"door",entrance:!0}),Uo=(n,t)=>({c:n,w:t,type:"open"}),nt=(n,t,e,i=0,s,r)=>({kind:n,x:t,z:e,rot:i,...s?{args:s}:{},...r?{name:r}:{}}),nn=(n,t,e,i,s)=>({dir:n,at:t,from:e,to:i,t:uh,openings:s}),$e=(n,t,e,i,s=[])=>({dir:n,at:t,from:e,to:i,t:dh,openings:s}),Ob={id:"studio",bedrooms:0,bathrooms:1,size:{w:7,d:5.5},rooms:[{id:"living",name:"Phòng ở & ngủ",x0:0,x1:7,z0:0,z1:3.5,floor:"wood",stand:{x:3.4,z:.7,yaw:mt},note:"Khu ngủ và tiếp khách chung một không gian"},{id:"kitchen",name:"Bếp",x0:0,x1:4,z0:3.5,z1:5.5,floor:"tile",stand:{x:2.2,z:4.3,yaw:mt/2+.5},note:"Bếp một dãy, lối vào căn hộ"},{id:"bath",name:"Vệ sinh",x0:4,x1:7,z0:3.5,z1:5.5,floor:"tile",stand:{x:5.5,z:4,yaw:mt},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[nn("x",0,0,7,[le(2.2,2.4)]),nn("x",5.5,0,7,[le(5.5,.6,1.5)]),nn("z",0,0,5.5,[le(1.75,1.6),No(4.5)]),nn("z",7,0,5.5,[le(1.75,1.6)]),$e("x",3.5,0,7,[Uo(1.3,2),gn(5.5)]),$e("z",4,3.5,5.5)],placements:[nt("rug",3.05,2,0,[2.6,1.8]),nt("sofa",3.05,1.5,0,[2.2]),nt("coffeeTable",3.05,2.5),nt("tvUnit",3.05,3.24,mt,[1.2]),nt("bed",5.6,1.17,0),nt("nightstand",4.4,.35,0),nt("wardrobe",6.64,2.8,-mt/2,[1.2,2.3]),nt("plant",.5,.5,0,[1]),nt("floorLamp",.5,3),nt("kitchenRun",1.9,5.1,mt,[2.6]),nt("fridge",3.55,5.06,mt),nt("shower",6.4,5,0),nt("toilet",4.8,5.08,mt),nt("vanity",4.33,4.2,mt/2)]},Fb={id:"1pn",bedrooms:1,bathrooms:1,size:{w:8,d:6.5},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:5,z0:0,z1:4,floor:"wood",stand:{x:3.4,z:.7,yaw:mt},note:"Sofa, TV, cửa sổ đón sáng"},{id:"kitchen",name:"Bếp & ăn",x0:5,x1:8,z0:0,z1:3,floor:"tile",stand:{x:5.8,z:.9,yaw:-mt/2-.4},note:"Bếp chữ I, bàn ăn 4 chỗ"},{id:"study",name:"Góc làm việc",x0:5,x1:8,z0:3,z1:6.5,floor:"wood",stand:{x:5.7,z:3.6,yaw:-mt/2+.3},note:"Bàn làm việc, tủ sách"},{id:"bed1",name:"Phòng ngủ",x0:0,x1:3.4,z0:4,z1:6.5,floor:"wood",stand:{x:2.6,z:4.5,yaw:mt/2+.3},note:"Giường đôi, tủ áo"},{id:"bath",name:"Vệ sinh",x0:3.4,x1:5,z0:4,z1:6.5,floor:"tile",stand:{x:4.2,z:4.6,yaw:mt},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[nn("x",0,0,8,[le(1.6,2.2),No(4.2),le(6.5,1.6)]),nn("x",6.5,0,8,[le(1.7,1.4),le(4.2,.6,1.5),le(6.5,1.8)]),nn("z",0,0,6.5,[le(2,1.8),le(5.25,1.4)]),nn("z",8,0,6.5,[le(1.5,1.2),le(4.75,1.6)]),$e("z",5,0,6.5,[Uo(1.5,2),gn(3.5)]),$e("x",3,5,8),$e("x",4,0,5,[gn(1.7),gn(3.95)]),$e("z",3.4,4,6.5)],placements:[nt("rug",2.8,2.7,0,[3,2]),nt("sofa",2.8,1.6,0,[2.2]),nt("coffeeTable",2.8,2.8),nt("tvUnit",2.8,3.74,mt,[1.2]),nt("armchair",.9,2.75,mt/2),nt("plant",.4,3.7,0,[1.1]),nt("floorLamp",4.55,3.1),nt("console",1.5,.28,0,[1]),nt("plant",.45,.45,0,[.8],"Cây lối vào"),nt("kitchenRun",6.2,2.64,mt,[1.9]),nt("fridge",7.55,2.58,mt),nt("diningTable",6.8,1),nt("chair",6.35,.4,0),nt("chair",7.25,.4,0),nt("chair",6.35,1.6,mt),nt("chair",7.25,1.6,mt),nt("rug",1.7,5.5,mt/2,[2.2,1.6,"beige"]),nt("bed",1.17,5.5,mt/2),nt("nightstand",.33,4.42,mt/2),nt("wardrobe",3.04,5.5,-mt/2,[1.4,2.3]),nt("toilet",3.8,6.09,mt),nt("shower",4.47,5.6,0),nt("vanity",4.66,4.6,-mt/2),nt("desk",7.6,4.75,-mt/2),nt("chair",7.1,4.75,mt/2,void 0,"Ghế làm việc"),nt("bookshelf",6.4,6.24,mt,[1.4]),nt("plant",5.3,6.1,0,[1])]},zb={id:"2pn",bedrooms:2,bathrooms:1,size:{w:10,d:7},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:6,z0:0,z1:4.5,floor:"wood",stand:{x:3.4,z:.7,yaw:mt},note:"Sofa, TV, cửa sổ đón sáng hướng Nam"},{id:"kitchen",name:"Bếp & ăn",x0:6,x1:10,z0:0,z1:3,floor:"tile",stand:{x:6.8,z:.9,yaw:-mt/2-.4},note:"Bếp chữ I, bàn ăn 4 chỗ"},{id:"bed2",name:"Phòng ngủ 2",x0:6,x1:10,z0:3,z1:7,floor:"wood",stand:{x:6.9,z:3.9,yaw:-mt/2+.2},note:"Giường đôi, tủ áo, bàn làm việc"},{id:"bed1",name:"Phòng ngủ 1",x0:0,x1:4,z0:4.5,z1:7,floor:"wood",stand:{x:2.8,z:5.1,yaw:mt/2+.3},note:"Giường đôi, tủ áo âm tường"},{id:"bath",name:"Vệ sinh",x0:4,x1:6,z0:4.5,z1:7,floor:"tile",stand:{x:5,z:5.2,yaw:mt},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[nn("x",0,0,10,[le(2.2,2.4),No(5),le(8,1.6)]),nn("x",7,0,10,[le(2,1.4),le(5,.6,1.5),le(8,2)]),nn("z",0,0,7,[le(2.5,1.8),le(5.75,1.4)]),nn("z",10,0,7,[le(1.5,1.2),le(5,1.6)]),$e("z",6,0,7,[Uo(1.5,2),gn(3.9)]),$e("x",3,6,10),$e("x",4.5,0,6,[gn(2),gn(5)]),$e("z",4,4.5,7)],placements:[nt("rug",3.5,2.7,0,[3,2]),nt("sofa",3.5,1.6,0,[2.4]),nt("coffeeTable",3.5,2.9),nt("ottoman",2.2,2.9),nt("tvUnit",3.5,4.24,mt,[1.8]),nt("armchair",1,3.3,mt/2),nt("plant",.5,4,0,[1.1]),nt("floorLamp",5.5,3.3),nt("console",3.9,.3,0,[1]),nt("plant",5.55,.45,0,[.8],"Cây lối vào"),nt("kitchenRun",7.63,2.64,mt,[2.95]),nt("fridge",9.5,2.58,mt),nt("diningTable",8,1.1),nt("chair",7.55,.5,0),nt("chair",8.45,.5,0),nt("chair",7.55,1.7,mt),nt("chair",8.45,1.7,mt),nt("rug",1.7,6.05,mt/2,[2.2,1.6,"beige"]),nt("bed",1.17,6.05,mt/2),nt("nightstand",.33,5,mt/2),nt("wardrobe",3.64,5.75,-mt/2,[1.4,2.3]),nt("shower",4.55,6.5,0),nt("toilet",5.5,6.62,mt),nt("vanity",5.69,5.3,-mt/2),nt("rug",8,4.4,0,[2.4,1.6,"beige"]),nt("bed",8,4.1,0),nt("nightstand",6.95,3.35,0),nt("nightstand",9.05,3.35,0),nt("wardrobe",6.36,6,mt/2,[1.4,2.3]),nt("desk",9.6,5,-mt/2),nt("chair",9.1,5,mt/2,void 0,"Ghế làm việc"),nt("dresser",9.55,6.45,-mt/2)]},Bb={id:"3pn",bedrooms:3,bathrooms:2,size:{w:13,d:8},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:7,z0:0,z1:5,floor:"wood",stand:{x:5.8,z:.8,yaw:mt-.5},note:"Phòng khách rộng, kết hợp bàn ăn"},{id:"kitchen",name:"Bếp",x0:7,x1:13,z0:0,z1:3.5,floor:"tile",stand:{x:7.9,z:.9,yaw:-mt/2-.4},note:"Bếp chữ I, bàn ăn"},{id:"hall",name:"Sảnh",x0:7,x1:9,z0:3.5,z1:5.5,floor:"wood",stand:{x:7.6,z:4,yaw:-mt/2},note:"Sảnh trung tâm dẫn tới phòng ngủ chính"},{id:"master",name:"Phòng ngủ chính",x0:9,x1:13,z0:3.5,z1:8,floor:"wood",stand:{x:9.7,z:4.4,yaw:-mt/2-.2},note:"Giường đôi, tủ áo lớn"},{id:"bath2",name:"Vệ sinh chung",x0:7,x1:9,z0:5.5,z1:8,floor:"tile",stand:{x:8,z:6,yaw:mt},note:"Buồng tắm kính, bồn rửa"},{id:"bed2",name:"Phòng ngủ 2",x0:0,x1:3.5,z0:5,z1:8,floor:"wood",stand:{x:2.7,z:5.5,yaw:mt/2+.3},note:"Giường đôi, tủ áo"},{id:"bed3",name:"Phòng ngủ 3",x0:3.5,x1:5.6,z0:5,z1:8,floor:"wood",stand:{x:4.55,z:5.5,yaw:mt},note:"Phòng ngủ nhỏ cho con / khách"},{id:"bath1",name:"Vệ sinh 2",x0:5.6,x1:7,z0:5,z1:8,floor:"tile",stand:{x:6.3,z:5.5,yaw:mt},note:"Vệ sinh gần phòng khách"}],walls:[nn("x",0,0,13,[le(2.5,2.6),No(5.8),le(10,2)]),nn("x",8,0,13,[le(1.75,1.6),le(4.5,1.2),le(6.3,.6,1.5),le(8,.6,1.5),le(11.6,1.6)]),nn("z",0,0,8,[le(2.5,2),le(6.5,1.6)]),nn("z",13,0,8,[le(1.75,1.4),le(5.75,1.6)]),$e("z",7,0,8,[Uo(1.75,2.2),gn(4.2)]),$e("x",3.5,7,13),$e("z",9,3.5,8,[gn(4.4)]),$e("x",5.5,7,9,[gn(8)]),$e("x",5,0,7,[gn(1.6),gn(4.55),gn(6.3)]),$e("z",3.5,5,8),$e("z",5.6,5,8)],placements:[nt("rug",3.1,3,0,[3,2]),nt("sofa",3.1,1.9,0,[2.4]),nt("coffeeTable",3.1,3.1),nt("ottoman",1.95,3.1),nt("tvUnit",3.1,4.74,mt,[1.8]),nt("armchair",1,3.6,mt/2),nt("armchair",5.3,3.6,-mt/2),nt("plant",.5,4.5,0,[1.1]),nt("floorLamp",5.9,4.4),nt("console",4.3,.3,0,[1]),nt("plant",6.6,.5,0,[.8],"Cây lối vào"),nt("diningTable",5.2,1.9),nt("chair",4.75,1.3,0),nt("chair",5.65,1.3,0),nt("chair",4.75,2.5,mt),nt("chair",5.65,2.5,mt),nt("kitchenRun",9.6,3.14,mt,[3.6]),nt("fridge",11.85,3.08,mt),nt("diningTable",9.8,1.3),nt("chair",9.35,.7,0),nt("chair",10.25,.7,0),nt("chair",9.35,1.9,mt),nt("chair",10.25,1.9,mt),nt("plant",8.6,3.9,0,[.9]),nt("rug",11.9,5.75,-mt/2,[2.4,1.6,"beige"]),nt("bed",11.87,5.75,-mt/2),nt("nightstand",12.7,4.7,-mt/2),nt("nightstand",12.7,6.8,-mt/2),nt("wardrobe",9.8,7.65,mt,[1.4,2.3]),nt("plant",12.55,7.5,0,[1]),nt("dresser",9.35,6.2,mt/2),nt("toilet",7.5,7.6,mt),nt("shower",8.45,7.45,0),nt("vanity",7.33,6.4,mt/2),nt("rug",1.8,6.5,mt/2,[2.2,1.6,"beige"]),nt("bed",1.17,6.5,mt/2),nt("nightstand",.33,5.35,mt/2),nt("wardrobe",3.14,6.5,-mt/2,[1.2,2.3]),nt("bed",4.55,6.85,mt),nt("toilet",5.97,6.4,mt/2),nt("vanity",6.67,6.6,-mt/2),nt("shower",6.4,7.4,0)]},dd=[Ob,Fb,zb,Bb],kb=.9,Gb=1.3,Qr=.15,hd=.9;function Hb(n){const t=Math.max(0,Math.min(3,Math.floor(n)));return dd.find(e=>e.bedrooms===t)??dd[2]}const qe=(n,t)=>Math.round(n*t*1e3)/1e3;function Vb(n,t){return n.map(e=>({...e,at:qe(e.at,t),from:qe(e.from,t),to:qe(e.to,t),openings:e.openings.map(i=>({...i,c:qe(i.c,t),at:i.at===void 0?void 0:qe(i.at,t)}))}))}function Wb(n,t){return n.map(e=>({...e,x0:qe(e.x0,t),x1:qe(e.x1,t),z0:qe(e.z0,t),z1:qe(e.z1,t),stand:{...e.stand,x:qe(e.stand.x,t),z:qe(e.stand.z,t)}}))}function Xb(n){return n.map((t,e)=>({...t,openings:t.openings.map((i,s)=>({...i,id:`w${e}o${s}`,dir:t.dir,at:t.at}))}))}function $b(n,t){if(!t)return n;const e=new Set(t.removed??[]),i=t.moved??{},s=n.map(r=>{const o=c=>c.w/2+Qr,a=[];for(const c of r.openings){if(e.has(c.id))continue;const l=i[c.id],u=l?{...c,...l.c!==void 0?{c:l.c}:{},...l.w!==void 0?{w:l.w}:{},...l.type?{type:l.type}:{}}:c;u.type==="window"&&u.sill===void 0&&(u.sill=hd),u.type!=="window"&&delete u.sill,u.type!=="door"&&delete u.entrance,u.c=Math.min(r.to-o(u),Math.max(r.from+o(u),u.c)),!(r.to-r.from<u.w+Qr*2)&&a.push(u)}return{...r,openings:a}});for(const r of t.added??[]){const o=s.find(u=>u.dir===r.dir&&Math.abs(u.at-r.at)<.06);if(!o)continue;const a={...r};a.type!=="window"?delete a.sill:a.sill===void 0&&(a.sill=hd),a.type!=="door"&&delete a.entrance;const c=o.from+a.w/2+Qr,l=o.to-a.w/2-Qr;l<c||(a.c=Math.min(l,Math.max(c,a.c)),o.openings.push(a))}for(const r of s)r.openings.sort((o,a)=>o.c-a.c);return s}function qb(n,t){return t?n.map(e=>{const i=t[e.id];return i?{...e,...i.name?{name:i.name}:{},...i.floor?{floor:i.floor}:{}}:e}):n}function Yb(n){const t=Cs[n];return{name:t.name,category:t.category,material:t.material,note:t.note}}function Ph(n,t,e){Cs[n.kind];const i=Ki[n.kind],s=n.args&&n.args.length?n.args:i.length?i:void 0;return{id:n.id,kind:n.kind,args:s,x:qe(n.x,t),z:qe(n.z,t),rot:n.rot??0,...Yb(n.kind),pick:!0,hidden:!!n.hidden,moved:!1,extra:!0,floor:e}}function jb(n){return n.map(t=>({id:t.id,name:t.name,area:wh(t.rooms)}))}function Kb(n,t,{editable:e,floorId:i}){const s=t.layout.custom.floors,r=s.find(l=>l.id===i)??s[0],o=r.rooms.map(l=>({...l,stand:{x:fd((l.x0+l.x1)/2),z:fd((l.z0+l.z1)/2),yaw:Math.PI},note:`${qi(l).toFixed(0)} m²`})),a=Th(r.rooms,r.openings),c=[];for(const l of t.layout.extras??[])!((l.floor??s[0].id)===r.id)||!Cs[l.kind]||!Object.prototype.hasOwnProperty.call(Ki,l.kind)||l.hidden&&!e||c.push(Ph(l,1,r.id));return{templateId:"custom",bedrooms:n.bedrooms,size:IM(r.rooms),rooms:o,walls:a,placements:c,scale:1,floors:jb(s),floorId:r.id,totalArea:sc(s),custom:!0}}const fd=n=>Math.round(n*100)/100;function Zb(n,t,{editable:e=!1,floorId:i}={}){if(t?.layout?.custom)return Kb(n,t,{editable:e,floorId:i});const s=Hb(n.bedrooms),r=s.rooms.reduce((v,_)=>v+qi(_),0),o=Math.sqrt(Math.max(1,n.areaM2)/r),a=Math.min(Gb,Math.max(kb,o)),c=Zu[t?.furnishing??n.furnishing]??Zu.full,l=t?.layout?.items??{},u=new Map,f=[];for(const v of s.placements){const _=Cs[v.kind];if(!_)continue;const h=(u.get(v.kind)??0)+1;if(u.set(v.kind,h),_.tier>c)continue;const x=`${v.kind}-${h}`,S=l[x],E=!!S?.hidden;E&&!e||f.push({id:x,kind:v.kind,args:v.args,x:qe(S?.x??v.x,a),z:qe(S?.z??v.z,a),rot:S?.rot??v.rot,name:v.name??_.name,category:_.category,material:_.material,note:_.note,pick:_.pick!==!1,hidden:E,moved:S!==void 0&&(S.x!==void 0||S.z!==void 0||S.rot!==void 0),extra:!1})}for(const v of t?.layout?.extras??[])!Cs[v.kind]||!Object.prototype.hasOwnProperty.call(Ki,v.kind)||v.hidden&&!e||f.push(Ph(v,a));const d=Wb(qb(s.rooms,t?.layout?.rooms),a),m=Vb($b(Xb(s.walls),t?.layout?.openings),a),g=d.reduce((v,_)=>v+qi(_),0);return{templateId:s.id,bedrooms:s.bedrooms,size:{w:qe(s.size.w,a),d:qe(s.size.d,a)},rooms:d,walls:m,placements:f,scale:a,floors:[{id:"main",name:"Tầng 1",area:Math.round(g*1e3)/1e3}],floorId:"main",totalArea:Math.round(g*1e3)/1e3,custom:!1}}const Eo=.9,Oi=1.2,bi=6,Ra=24,Ca=1.35,Pa=.58,to=1.5,Lh=4,Jb=12,Qb=60,tS=2e3,nr=(n,t)=>typeof n=="string"?n.trim().slice(0,t):"",Zs=(n,t,e,i)=>{const s=Math.floor(Number(n));return Number.isFinite(s)&&s>=t&&s<=e?s:i};function eS(n,t){if(!n||typeof n!="object")return null;const e=nr(n.apartmentId,80),i=Zs(n.floor,1,t,0),s=Zs(n.slot,0,Lh-1,-1);if(!e||!i||s<0)return null;const r=Number(n.areaM2);return{apartmentId:e,floor:i,slot:s,label:nr(n.label,40)||e,bedrooms:Zs(n.bedrooms,0,8,2),bathrooms:Zs(n.bathrooms,0,8,1),areaM2:Number.isFinite(r)&&r>0&&r<=1e3?r:70,furnishing:["bare","partial","full"].includes(n.furnishing)?n.furnishing:"full",has3d:n.has3d===!0}}function nS(n){if(!n||typeof n!="object"||!Array.isArray(n.buildings))return null;const t=[],e=new Set;for(const i of n.buildings.slice(0,Jb)){if(!i||typeof i!="object")continue;const s=nr(i.id,40),r=Zs(i.floors,1,Qb,0);if(!s||!r||e.has(s))continue;e.add(s);const o=new Set,a=[];for(const c of(Array.isArray(i.units)?i.units:[]).slice(0,tS)){const l=eS(c,r),u=l&&`${l.floor}:${l.slot}`;!l||o.has(u)||(o.add(u),a.push(l))}t.push({id:s,name:nr(i.name,40)||s,floors:r,units:a})}return t.length?{name:nr(n.name,80),buildings:t}:null}const iS=n=>({apartmentId:n.apartmentId,bedrooms:n.bedrooms,bathrooms:n.bathrooms,areaM2:n.areaM2,furnishing:n.furnishing,designs:[]});function sS(n){const t=n<=6?7:9,e=(t-1)/2,i=[];for(let a=0;a<t;a++)for(let c=0;c<t;c++)Math.max(Math.abs(a-e),Math.abs(c-e))<=2&&i.push([a,c]);let s=n*7919+13;const r=()=>(s=s*1664525+1013904223>>>0)/4294967296;for(let a=i.length-1;a>0;a--){const c=Math.floor(r()*(a+1));[i[a],i[c]]=[i[c],i[a]]}const o=i.slice(0,n);return{size:t,block:Ra,owner:new Set(o.map(([a,c])=>`${a},${c}`)),pos:o.map(([a,c])=>({x:(a-e)*Ra,z:(c-e)*Ra}))}}function pd(n,t={x:0,z:0}){const e=Oi+(n.floor-1)*Eo+Eo/2,i=bi/2+.04;return n.slot<2?{x:t.x+(n.slot===0?-to:to),y:e,z:t.z+i,ry:0}:{x:t.x+i,y:e,z:t.z+(n.slot===2?to:-to),ry:Math.PI/2}}const md=[[9,1],[14,2],[6,0],[16,3],[8,1]];function rS(){return{name:"TH PropTech Residence",buildings:[14,18,10,20,12].map((i,s)=>[String.fromCharCode(65+s),`Tòa ${String.fromCharCode(65+s)}`,i]).map(([i,s,r],o)=>{const a=[];for(let c=1;c<=r;c++)for(let l=0;l<Lh;l++){const u=`${i}-${String(c).padStart(2,"0")}0${l+1}`;a.push({apartmentId:`demo-${u}`,floor:c,slot:l,label:u,bedrooms:1+(c+l)%3,bathrooms:1+(c+l)%2,areaM2:45+l*12+(c+o)%3*5,furnishing:["bare","partial","full"][(c+l)%3],has3d:c===md[o][0]&&l===md[o][1]})}return{id:i,name:s,floors:r,units:a}})}}const eo=Math.PI/4,gd=1,oS=30,La=15659771,uo=19,aS=2.4,lS=1.6,cS=new Ut(988979),uS=new U(70,130,90),dS=new U(-70,110,60),hS=new Ut(16777215),fS=new Ut(10204415),pS=new Ut(14673658),mS=new Ut(3489899),_d=[14242639,3900100,15905076,4171638,9333695,14711609,3094080],Dh=uo/2-.8,gS=8*Dh;function _S(n,t){const e=(n%(8*t)+8*t)%(8*t),i=Math.floor(e/(2*t)),s=e-i*2*t-t;return i===0?[s,-t]:i===1?[t,s]:i===2?[-s,t]:[-t,-s]}const xS=n=>()=>(n=n*1664525+1013904223>>>0)/4294967296;function Ih(n,t){const e=document.createElement("canvas");e.width=e.height=64,n(e.getContext("2d"));const i=new Gd(e);return i.wrapS=i.wrapT=ir,t&&i.repeat.set(...t),i.colorSpace=tn,i.anisotropy=4,i}const vS=()=>Ih(n=>{n.fillStyle="#f4f6fd",n.fillRect(0,0,64,64),n.fillStyle="#c3cef4",n.fillRect(0,16,64,16),n.fillStyle="#f4f6fd";for(let t=0;t<64;t+=16)n.fillRect(t+14,16,2,16)}),MS=n=>Ih(t=>{t.fillStyle="#fff",t.fillRect(0,0,64,64),t.fillStyle="#b9c7ea",t.fillRect(0,60,64,4)},[1,n]);function xd(n,t,e,i,s,r){const o=new fe(n,t,e),a=o.attributes.uv,c=[[e,t],[e,t],null,null,[n,t],[n,t]];for(let u=0;u<6;u++)for(let f=0;f<4;f++){const d=u*4+f;c[u]?a.setXY(d,a.getX(d)*c[u][0]/aS,a.getY(d)*c[u][1]/lS):a.setXY(d,.5,.06)}o.translate(i,t/2,s);const l=new Float32Array(72);for(let u=0;u<24;u++)l.set([r,r,r],u*3);return o.setAttribute("color",new xn(l,3)),o}function Mi(n,t,e){const i=new Xl(n,t,Math.max(1,e.length));i.count=e.length;const s=new De;return e.forEach((r,o)=>{s.position.set(r.x,r.y,r.z),s.rotation.set(0,r.ry??0,0),s.scale.setScalar(r.s??1),s.updateMatrix(),i.setMatrixAt(o,s.matrix)}),i.instanceMatrix.needsUpdate=!0,i}function bS(n){n.traverse(t=>{t.geometry?.dispose?.();const e=Array.isArray(t.material)?t.material:t.material?[t.material]:[];for(const i of e)i.map?.dispose(),i.dispose()})}function SS(n,t={},e=ch()){const i=new sh({antialias:!e.coarse,powerPreference:"high-performance",stencil:!1}),s=Math.min(window.devicePixelRatio||1,e.coarse?1.25:1.75),r=e.coarse?12e5:24e5;let o=1/0;i.setPixelRatio(s),i.outputColorSpace=tn,i.toneMapping=wo,i.shadowMap.enabled=!0,i.shadowMap.type=Ms,i.shadowMap.autoUpdate=!1,Object.assign(i.domElement.style,{display:"block",width:"100%",height:"100%",touchAction:"none",outline:"none",cursor:"grab"});const a=new Wl,c=new Ut(La);a.background=new Ut(La),a.fog=new Ro(La,320,760);const l=new dn(oS,1,2,1400);n.append(i.domElement);const u=new oh(l,i.domElement);u.enableDamping=!0,u.dampingFactor=.1,u.rotateSpeed=.5,u.panSpeed=1.1,u.minDistance=8,u.maxDistance=360,u.minPolarAngle=.35,u.maxPolarAngle=1.5,u.minAzimuthAngle=eo-gd,u.maxAzimuthAngle=eo+gd,u.screenSpacePanning=!1,u.touches={ONE:hn.PAN,TWO:hn.DOLLY_ROTATE},u.addEventListener("change",()=>ft()),u.mouseButtons={LEFT:Xe.PAN,MIDDLE:Xe.DOLLY,RIGHT:Xe.ROTATE};const f=new Wd(16777215,14673658,1.55);a.add(f);const d=new Yd(16777215,1.9);d.castShadow=!0,d.shadow.mapSize.set(e.shadowSize,e.shadowSize),d.shadow.bias=-6e-4,d.shadow.normalBias=.05;const m=d.shadow.camera;m.left=-110,m.right=110,m.top=110,m.bottom=-110,m.near=1,m.far=400,d.position.set(70,130,90),a.add(d,d.target);const g=new Ge({color:2179199,roughness:.25,metalness:.2}),v=new Ge({color:16766346,emissive:16754234,emissiveIntensity:1,roughness:.4}),_=new Ge({color:1782118,roughness:.7}),h=new Ge({color:16757575,emissive:16751135,emissiveIntensity:.9,roughness:.4}),x=new Xt(new fe(Ca+.3,Pa+.3,.12),new $i({color:16777215,transparent:!0,opacity:.6,depthTest:!1}));x.renderOrder=10,x.visible=!1,a.add(x);let S=null,E=null,L=null,A={h:100},w=[],p=[],M=[],T=null,C=null,P=!0,D=0,H=0,N=0,k=0,B=null,J={w:1,h:1},ot=3,pt=0,wt=!1,Ct=0,ct=0;const ft=(I=2)=>{I>ot&&(ot=I)},bt=new fe(Ca,Pa,.08),Q=new fe(Ca+.18,Pa+.18,.05),St=(()=>{const I=new As(.75,14,10).translate(0,1.5,0),q=new Yl(.62,1.3,14).rotateX(Math.PI).translate(0,.65,0);return tr([I.toNonIndexed(),q.toNonIndexed()])})();function ht(){const I=H;a.background.lerpColors(c,cS,I),a.fog.color.copy(a.background),f.intensity=Ue.lerp(1.55,.5,I),f.groundColor.lerpColors(pS,mS,I),d.intensity=Ue.lerp(1.9,.65,I),d.color.lerpColors(hS,fS,I),d.position.lerpVectors(uS,dS,I),i.shadowMap.needsUpdate=!0}function Bt(I,q){const V=Math.min(90,Math.round(I.length*1.2));if(!V)return;const it=tr([new cr(.15,.19,.72,6).translate(0,.52,0).toNonIndexed(),new As(.16,6,5).translate(0,1.04,0).toNonIndexed()]),$=new Xl(it,new Ge({color:16777215,roughness:.9}),V),tt=new Ut,rt=[];for(let _t=0;_t<V;_t++){const[ut,lt]=I[Math.floor(q()*I.length)];rt.push({bx:ut,bz:lt,s:q()*gS,dir:q()<.5?1:-1,speed:.9+q()*.8,phase:q()*6}),$.setColorAt(_t,tt.setHex(_d[Math.floor(q()*_d.length)]))}$.frustumCulled=!1,B={mesh:$,walkers:rt,dummy:new De},S.add($),Wt(0)}function Wt(I){if(!B)return;const{mesh:q,walkers:V,dummy:it}=B;V.forEach(($,tt)=>{$.s+=$.dir*$.speed*I;const[rt,_t]=_S($.s,Dh);it.position.set($.bx+rt,.12+Math.abs(Math.sin(D*6+$.phase))*.05,$.bz+_t),it.updateMatrix(),q.setMatrixAt(tt,it.matrix)}),q.instanceMatrix.needsUpdate=!0}function kt(I,q){const V=new Zt,it=L.pos[q];V.position.set(it.x,0,it.z);const $=I.floors*Eo,tt=new Xt(new fe(bi+1.6,Oi,bi+1.6),new Ge({color:14936571,roughness:.8}));tt.position.y=Oi/2;const rt=new Xt(new fe(bi,$,bi),new Ge({color:4883186,map:MS(I.floors),roughness:.8,emissive:0}));rt.position.y=Oi+$/2;const _t=new Xt(new fe(bi-.8,.5,bi-.8),new Ge({color:3105494,roughness:.8}));_t.position.y=Oi+$+.25;const ut=new Xt(new fe(3.2,.8,.06),new Ge({color:1782118,roughness:.3}));ut.position.set(0,.45,(bi+1.6)/2+.03);for(const K of[tt,rt,_t,ut])K.castShadow=!0,K.receiveShadow=!0;V.add(tt,ut,rt,_t),rt.userData={building:I},tt.userData={building:I},p.push(rt);const lt=I.units.filter(K=>K.has3d),Ot=I.units.filter(K=>!K.has3d),Gt=K=>K.map(gt=>pd(gt)),ee=new Set(I.units.map(K=>`${K.floor}:${K.slot}`)),O=[];for(let K=1;K<=I.floors;K++)for(let gt=0;gt<4;gt++)ee.has(`${K}:${gt}`)||O.push({floor:K,slot:gt});const dt=Mi(Q,_,Gt([...I.units,...O])),et=Mi(bt,g,Gt(O)),vt=Mi(bt,g,Gt(Ot)),at=Mi(bt,v,Gt(lt));if(vt.userData={building:I,units:Ot},at.userData={building:I,units:lt},V.add(dt,et,vt,at),w.push(at,vt,rt,tt),lt.length){const K=new Xt(St,h);K.position.set(0,Oi+$+1.2,0),K.userData.baseY=K.position.y,K.userData.phase=q*1.3,V.add(K),M.push(K)}return V}function ye(){const{size:I,block:q}=L,V=(I-1)/2,it=I*q/2;A={h:it};const $=new Xt(new ws(I*q+600,I*q+600),new Ge({color:14673400,roughness:1}));$.rotation.x=-Math.PI/2,$.receiveShadow=!0,S.add($);const tt=[];for(let at=0;at<=I;at++){const K=(at-I/2)*q;for(let gt=-it;gt<it;gt+=3.2)tt.push({x:gt+1.6,y:.02,z:K},{x:K,y:.02,z:gt+1.6,ry:Math.PI/2})}S.add(Mi(new ws(1.3,.16).rotateX(-Math.PI/2),new Ge({color:16251391}),tt));const rt=xS(23),_t=[],ut=[],lt=[],Ot=[],Gt=[];for(let at=0;at<I;at++)for(let K=0;K<I;K++){const gt=(at-V)*q,Ft=(K-V)*q,Ee=L.owner.has(`${at},${K}`),oe=!Ee&&rt()<.1;(oe?ut:_t).push({x:gt,y:.06,z:Ft});const An=Math.hypot(at-V,K-V)/V;if(oe||Gt.push([gt,Ft]),!oe&&!Ee)if(rt()<.18){const Ae=12+rt()*4;lt.push(xd(Ae,2.4+rt()*1.2,7+rt()*3,gt+(rt()-.5)*2,Ft+(rt()-.5)*3,.96))}else for(const[Ae,Sn]of[[-5,-5],[5,-5],[-5,5],[5,5]]){if(rt()<.2)continue;const Oo=4.4+rt()*3.4,gr=4.4+rt()*3.4,_r=2.6+rt()**2*11*Math.max(.35,1.25-An*.7);lt.push(xd(Oo,_r,gr,gt+Ae+(rt()-.5)*1.4,Ft+Sn+(rt()-.5)*1.4,.93+rt()*.07))}if(!Ee&&rt()<.75){const Ae=uo/2-.5;for(let Sn=-Ae+1.5;Sn<=Ae-1.5;Sn+=3.4)rt()<.25||Ot.push({x:gt+Sn,z:Ft+Ae},{x:gt+Sn,z:Ft-Ae},{x:gt+Ae,z:Ft+Sn},{x:gt-Ae,z:Ft+Sn})}if(oe)for(let Ae=0;Ae<14;Ae++)Ot.push({x:gt+(rt()-.5)*15,z:Ft+(rt()-.5)*15})}const ee=new fe(uo,.12,uo),O=Mi(ee,new Ge({color:15856892,roughness:1}),_t),dt=Mi(ee,new Ge({color:13890016,roughness:1}),ut);if(O.receiveShadow=dt.receiveShadow=!0,S.add(O,dt),lt.length){const at=new Xt(tr(lt),new Ge({map:vS(),vertexColors:!0,roughness:.9}));at.castShadow=!0,at.receiveShadow=!0,S.add(at)}const et=new Ut,vt=Mi(new Kl(.48,0),new Ge({color:16777215,roughness:.9}),Ot.map(at=>({x:at.x,y:.6,z:at.z,s:.8+rt()*.6})));Ot.forEach((at,K)=>vt.setColorAt(K,et.setHSL(.38+rt()*.04,.6,.5+rt()*.1))),vt.instanceColor&&(vt.instanceColor.needsUpdate=!0),S.add(vt),Bt(Gt,rt)}function Jt(){S&&(a.remove(S),bS(S),S=null,w=[],p=[],M=[],B=null,T=null,x.visible=!1)}const ce=()=>{const I=l.position.clone().sub(u.target),q=new Mo().setFromVector3(I);return{target:u.target.clone(),distance:q.radius,azimuth:q.theta,polar:q.phi}},ue=I=>{u.target.copy(I.target),l.position.copy(I.target).add(new U().setFromSphericalCoords(I.distance,I.polar,I.azimuth)),l.lookAt(I.target)};let Vt=null;function Pe(I,q=1){Vt?.resolve(!1);const V=ce();return q>0?new Promise(it=>{Vt={from:V,to:I,duration:q,resolve:it,t:0}}):(ue(I),Vt=null,Promise.resolve(!0))}u.addEventListener("start",()=>{Vt&&(Vt.resolve(!1),Vt=null)});const be=()=>{const I=J.w/J.h;return{target:new U(0,0,0),distance:Math.min(340,Math.max(120,190*Math.max(1,1.3/I))),azimuth:eo,polar:.95}},Ke=I=>E?.buildings.findIndex(q=>q.id===I)??-1;function F(){J={w:n.clientWidth||window.innerWidth,h:n.clientHeight||window.innerHeight},i.setPixelRatio(Math.max(.7,Math.min(s,o,Math.sqrt(r/(J.w*J.h))))),i.setSize(J.w,J.h,!1),l.aspect=J.w/J.h,l.updateProjectionMatrix(),ft()}new ResizeObserver(F).observe(n),F();const Ie=new Ql,jt=new Nt;function de(I){const q=i.domElement.getBoundingClientRect();jt.set((I.clientX-q.left)/q.width*2-1,-((I.clientY-q.top)/q.height)*2+1),Ie.setFromCamera(jt,l);const V=Ie.intersectObjects(w,!1)[0];if(!V)return null;const it=V.object.userData;return it.units?{type:"unit",unit:it.units[V.instanceId],building:it.building,object:V.object,instanceId:V.instanceId}:{type:"building",building:it.building}}function xt(I){if(!(T&&I&&T.type===I.type&&T.building===I.building&&T.unit===I.unit)){T=I;for(const V of p)V.material.emissive.setHex(I&&I.building===V.userData.building?1451597:0);if(I?.type==="unit"){const V=new me;I.object.getMatrixAt(I.instanceId,V),V.premultiply(I.object.parent.matrixWorld),V.decompose(x.position,x.quaternion,x.scale),x.visible=!0}else x.visible=!1;i.domElement.style.cursor=I?"pointer":"grab",ft()}}let ge=null;i.domElement.addEventListener("pointerdown",I=>{ge={x:I.clientX,y:I.clientY}});let R=null;i.domElement.addEventListener("pointermove",I=>{I.buttons||I.pointerType==="touch"||(R||requestAnimationFrame(()=>{const q=R;R=null;const V=de(q);xt(V),t.onHover?.(V,q.clientX,q.clientY)}),R=I)}),i.domElement.addEventListener("pointerleave",()=>{xt(null),t.onHover?.(null,0,0)}),i.domElement.addEventListener("pointerup",I=>{!ge||Math.hypot(I.clientX-ge.x,I.clientY-ge.y)>5||(ge=null,t.onClick?.(de(I),I.clientX,I.clientY))});const b=new jd;function G(){const I=Math.min(.1,b.getDelta());if(D+=I,H!==N&&(H=H<N?Math.min(N,H+I/1.6):Math.max(N,H-I/1.6),ht(),ft()),Vt){const V=Vt;V.t=Math.min(1,V.t+I/V.duration);const it=lh(V.t);ue({target:V.from.target.clone().lerp(V.to.target,it),distance:Math.exp(Ue.lerp(Math.log(V.from.distance),Math.log(V.to.distance),it)),azimuth:Ue.lerp(V.from.azimuth,V.to.azimuth,it),polar:Ue.lerp(V.from.polar,V.to.polar,it)}),V.t>=1&&(Vt=null,V.resolve(!0))}else{u.update()&&ft();const V=u.target;V.x=Ue.clamp(V.x,-A.h,A.h),V.z=Ue.clamp(V.z,-A.h,A.h),V.y=Ue.clamp(V.y,0,60)}Vt&&ft(),pt+=I,k+=I;const q=l.position.distanceTo(u.target)<120;if(pt>=(q?1/30:1/10)){pt=0,v.emissiveIntensity=(1.05+.55*Math.sin(D*2.4))*(1+H*1.4),q&&Wt(k),k=0;for(const V of M)V.position.y=V.userData.baseY+Math.sin(D*2+V.userData.phase)*.35,V.rotation.y=D*1.2+V.userData.phase;ft(1)}ot>0?(ot--,i.render(a,l),wt?(Ct++,I>.034&&ct++,Ct>=40&&(ct>26&&o>.75&&(o=Math.max(.7,Math.min(o,i.getPixelRatio())-.2),F()),Ct=ct=0)):Ct=ct=0,wt=!0):wt=!1}return{domElement:i.domElement,setData(I){Jt(),E=I,S=new Zt,a.add(S),L=sS(I.buildings.length),ye(),I.buildings.forEach((q,V)=>S.add(kt(q,V))),i.shadowMap.needsUpdate=!0,ft(3),C=null,ue(be())},home:(I=1)=>(C=null,Pe(be(),I)),focusBuilding(I,q=1){const V=Ke(I);if(V<0)return this.home(q);C=I;const $=E.buildings[V].floors*Eo;return Pe({target:new U(L.pos[V].x,Oi+$*.42,L.pos[V].z+1),distance:Math.max(36,$*2.3),azimuth:eo,polar:1.2},q)},flyToUnit(I,q,V=.9){const it=pd(I,L.pos[Ke(q.id)]);return Pe({target:new U(it.x,it.y,it.z),distance:7,azimuth:I.slot<2?.05:Math.PI/2-.05,polar:1.45},V)},setNight(I){N=I?1:0,ft(3)},get night(){return N===1},get focusedId(){return C},get paused(){return P},pause(){P=!0,i.setAnimationLoop(null)},resume(){P=!1,b.getDelta(),ft(3),i.setAnimationLoop(G)}}}const yS=360;function ES(n,{onEnterUnit:t}){n.innerHTML=`
    <div class="campus-stage"></div>
    <div class="campus-ui">
      <div class="campus-head card"><b id="campus-title"></b><small id="campus-sub"></small></div>
      <div class="campus-tools">
        <button class="iconbtn" id="campus-night" type="button"></button>
        <button class="iconbtn" id="campus-fs" type="button" hidden></button>
      </div>
      <div class="campus-legend card"><i class="campus-dot campus-dot--on"></i>Có 3D <i class="campus-dot"></i>Chưa có</div>
      <aside class="campus-panel card" id="campus-panel" hidden></aside>
      <div class="campus-tip card" id="campus-tip" hidden></div>
      <div class="campus-hint" id="campus-hint">Kéo để xoay • Cuộn để phóng • Bấm vào tòa nhà để xem các căn</div>
    </div>
    <div class="campus-fade"></div>`;const e=p=>n.querySelector(p),i=e("#campus-tip"),s=e("#campus-panel"),r=e(".campus-fade");let o=null,a=!1,c=0;const l=p=>`Tầng ${p.floor} · ${p.bedrooms} PN · ${p.areaM2} m²`;function u(p,M,T){i.innerHTML=p,i.hidden=!1;const C=14,P=i.offsetWidth;i.style.transform=`translate(${Math.min(M+C,window.innerWidth-P-8)}px, ${Math.max(8,T-i.offsetHeight-C)}px)`}const f=()=>{i.hidden=!0};function d(p){u(Ht(p),window.innerWidth/2-100,window.innerHeight/2),clearTimeout(c),c=setTimeout(()=>{c=0,f()},1800)}const m=SS(e(".campus-stage"),{onHover(p,M,T){if(!(c&&p==null)){if(!p)return f();if(clearTimeout(c),c=0,p.type==="unit"){const C=p.unit;u(`<b>${Ht(C.label)}</b><span>${Ht(l(C))}</span><em class="${C.has3d?"on":""}">${C.has3d?"Bấm để xem 3D":"Chưa có mô hình 3D"}</em>`,M,T)}else f()}},onClick(p){if(!a){if(!p)return L();if(p.type==="building")return A(p.building);if(p.unit.has3d)return w(p.unit,p.building);m.focusedId!==p.building.id&&A(p.building),d(`${p.unit.label}: chưa có mô hình 3D`)}}}),g=e("#campus-night");function v(){const p=m.night;g.innerHTML=te(p?"moon":"sun",18);const M=p?"Chuyển sang ban ngày":"Chuyển sang ban đêm";g.setAttribute("aria-label",M),g.setAttribute("aria-pressed",String(p)),g.title=M}g.addEventListener("click",()=>{m.setNight(!m.night),v()}),v();const _=e("#campus-fs"),h=!!(document.fullscreenEnabled||document.webkitFullscreenEnabled);_.hidden=Ls()||!(h||yo()&&!Ls());let x=!1;function S(){_.innerHTML=te(x?"shrink":"expand",18);const p=x?"Thoát toàn màn hình":"Toàn màn hình";_.setAttribute("aria-label",p),_.title=p}_.addEventListener("click",()=>{if(h){const p=document.documentElement,M=p.requestFullscreen??p.webkitRequestFullscreen,T=document.exitFullscreen??document.webkitExitFullscreen;document.fullscreenElement??document.webkitFullscreenElement?T.call(document):M.call(p)}else vn("FLOORPLAN_EXPAND_TOGGLE")});const E=()=>{x=!!(document.fullscreenElement??document.webkitFullscreenElement),S()};document.addEventListener("fullscreenchange",E),document.addEventListener("webkitfullscreenchange",E),Pt.on("host:expanded",({expanded:p})=>{x=p,S()}),S();function L(){s.hidden=!0,m.focusedId&&m.home()}function A(p){f();const M=p.units.filter(T=>T.has3d).sort((T,C)=>C.floor-T.floor||T.slot-C.slot);s.hidden=!1,s.innerHTML=`
      <header><div><b>${Ht(p.name)}</b><small>${p.floors} tầng · ${M.length}/${p.units.length} căn có 3D</small></div>
        <button class="iconbtn" type="button" data-close aria-label="Đóng">${te("close",16)}</button></header>
      <ul>${M.length?M.map(T=>`<li><button type="button" data-id="${Ht(T.apartmentId)}">
            <span class="campus-dot campus-dot--on"></span>
            <span class="campus-unit"><b>${Ht(T.label)}</b><small>${Ht(l(T))}</small></span>
            <span class="tag">3D</span></button></li>`).join(""):'<li class="campus-empty">Tòa này chưa có căn nào có mô hình 3D.</li>'}</ul>`,s.querySelector("[data-close]").onclick=L,s.querySelectorAll("[data-id]").forEach(T=>{T.onclick=()=>w(M.find(C=>C.apartmentId===T.dataset.id),p)}),m.focusBuilding(p.id)}async function w(p,M){a=!0,f(),await m.flyToUnit(p,M),r.style.transition="",r.classList.add("on"),await new Promise(T=>setTimeout(T,yS)),t(p,M),a=!1}return{setData(p){o=p,e("#campus-title").textContent=p.name||"Khu căn hộ";const M=p.buildings.reduce((T,C)=>T+C.units.filter(P=>P.has3d).length,0);e("#campus-sub").textContent=`${M} căn có 3D`,s.hidden=!0,m.setData(p)},get hasData(){return!!o},pause:()=>m.pause(),resume(){m.resume(),m.focusedId&&m.focusBuilding(m.focusedId,.9),r.style.transition="none",r.classList.add("on"),r.offsetWidth,r.style.transition="",r.classList.remove("on")}}}const wi=new URLSearchParams(location.search),je=Fx(document.getElementById("viewport"));hh({templateId:"",bedrooms:2,size:{w:10,d:7},rooms:[],walls:[],placements:[]});mh();const Fn=Wv(je),Ei=qv({camera:je.camera,dom:je.renderer.domElement,colliders:Fn.colliders}),Fs=Qv(je,Fn,Ei),fr=nM(je,Fn),wn=Ub(document.getElementById("ui"),{app:je,walker:Ei});let lr=null,ri=[],Al="",re=Ce(null);const vd=n=>JSON.stringify(Ce(n)),hc=()=>ri.find(n=>n.id===j.state.designId)??ri[0];function Ri(){const n=hc(),t=Zb(lr,{...n,layout:re},{editable:j.state.editing,floorId:j.state.floorId??void 0});Ox(yh(n)),hh(t),mh(),Fn.rebuild(),j.state.floorId!==st.floorId&&j.set({floorId:st.floorId}),Uh.sync(),Pt.emit("plan:loaded"),je.invalidateShadows(),wn.hud.draw()}function Nh(n,{keepView:t=!1}={}){const e=ri.find(s=>s.id===n)??ri[0];re=Ce(e.layout);const i=j.state.mode==="walk";return j.set({designs:ri,designId:e.id,selection:null,hover:null,roomId:null,menu:null,editPanel:null}),Ri(),t||j.set({hour:e.defaultHour}),Fn.setHour(j.state.hour),Fs.start({walk:i}),e}function Rl(n,t,e){return JSON.stringify([{...n,designs:void 0},t.map(i=>i.id===e?{...i,layout:void 0}:i)])}function fc(n){const t=n.designs.length?n.designs:[vM(n.apartmentId)],e=!lr,i=e?null:j.state.designId;if(j.set({editable:n.editable,listingArea:n.areaM2}),!n.editable&&j.state.editing&&j.set({editing:!1}),!e&&Rl(n,t,i)===Al){const a=t.find(c=>c.id===i);a&&vd(a.layout)!==vd(re)&&(ri=t,re=Ce(a.layout),j.set({designs:ri}),Ri());return}lr=n,ri=t;const s=!e&&j.state.designs.some(o=>o.id===j.state.designId),r=Nh(n.designId??(s?j.state.designId:null),{keepView:!e});Al=Rl(n,t,r.id),e&&TS()}function TS(){const n=Number(wi.get("hour"));n>=6&&n<=18&&j.set({hour:n}),Fn.setHour(j.state.hour);const t=wi.get("room"),e=wi.get("mode")==="walk";(e||t)&&Fs.start({walk:e,room:t});const i=wi.get("select");i&&pe.get("item",i)&&j.select({type:"item",id:i})}Pt.on("design:select",({id:n})=>{const t=Nh(n,{keepView:!1});Al=Rl(lr,ri,t.id),vn("FLOORPLAN_DESIGN_SELECTED",{designId:t.id})});const ln=()=>({custom:st.custom,scale:st.scale,floorId:st.floorId,walls:st.walls,rooms:st.rooms,placements:st.placements});function On(n,{select:t,rejected:e="Không thực hiện được thao tác này ở vị trí đó."}={}){return n===re||n==null?(wn.hud.notify(e),fr.refresh(),Ri(),!1):(Mn(n,t===void 0?{}:{select:t}),!0)}function wS(n,t,e){if(!j.state.editable)return;const i=yM(re,n,t,e,st.scale),s=st.placements.find(o=>o.id===n),r=pe.get("item",n);if(!s||!r)return Mn(i);re=i;for(const o of[s,r])Object.assign(o,{x:t,z:e,moved:!0});fr.refresh(),je.invalidateShadows(),j.set({selection:{type:"item",id:n}}),vn("FLOORPLAN_LAYOUT_CHANGED",{designId:hc().id,layout:re})}const Uh=rb(je,Fn,fr,{isCustom:()=>st.custom,onMove:(n,t,e)=>wS(n,t,e),onReject:n=>wn.hud.notify(n),onCancel:()=>Ri(),onOpeningMove:(n,t)=>On(kM(re,ln(),n,t),{select:{type:"opening",id:n},rejected:"Cửa không đặt được ở đó (tường quá ngắn)."}),onOpeningAdd:({dir:n,at:t,c:e,type:i})=>{const s=WM(re,ln(),{dir:n,at:t,c:e,type:i});if(!s)return wn.hud.notify("Không đặt được ở đó: tường quá ngắn hoặc đã có cửa.");Mn(s.layout,{select:{type:"opening",id:s.id}}),j.set({tool:null})},onRoomDraw:n=>{const t=YM(re,ln(),n);if(!t)return wn.hud.notify("Không vẽ được phòng ở đó: quá nhỏ (tối thiểu 1,2 m), chồng lên phòng khác hoặc đã đủ số phòng."),Ri();Mn(t.layout,{select:{type:"room",id:t.id}}),j.set({tool:null})},onRoomResize:(n,t)=>On(KM(re,ln(),n,t),{select:{type:"room",id:n},rejected:"Không đổi được kích thước: phòng sẽ quá nhỏ hoặc chồng lên phòng khác."}),onRoomMove:(n,t,e)=>On(ZM(re,ln(),n,t,e),{select:{type:"room",id:n},rejected:"Không dời được phòng: sẽ chồng lên phòng khác."})});function Mn(n,{select:t}={}){if(!j.state.editable)return;const e=t!==void 0?t:j.state.selection,i={...st.size};re=n,Ri(),(Math.abs(st.size.w-i.w)>.4||Math.abs(st.size.d-i.d)>.4)&&Pt.emit("camera:cmd",{cmd:"home"}),e&&pe.get(e.type,e.id)?j.set({selection:e}):j.set({selection:null}),fr.refresh(),vn("FLOORPLAN_LAYOUT_CHANGED",{designId:hc().id,layout:re})}Pt.on("edit:rotate",({id:n})=>{const t=st.placements.find(e=>e.id===n);t&&Mn(EM(re,n,t.rot??0))});Pt.on("edit:toggle",({id:n})=>Mn(TM(re,n)));Pt.on("edit:reset",({id:n})=>Mn(AM(re,n)));Pt.on("edit:remove",({id:n})=>{SM(re,n)&&Mn(wM(re,n),{select:null})});function AS(n){const t=n??{x0:0,x1:st.size.w,z0:0,z1:st.size.d},e=(t.x0+t.x1)/2,i=(t.z0+t.z1)/2,s=pe.list("item").filter(o=>!o.hidden);let r={x:e,z:i,score:-1/0};for(let o=t.x0+.7;o<=t.x1-.7;o+=.4)for(let a=t.z0+.7;a<=t.z1-.7;a+=.4){let c=1/0;for(const u of s){const f=(u.dims?.w??.6)/2+.45,d=(u.dims?.d??.6)/2+.45;c=Math.min(c,Math.max(Math.abs(o-u.x)-f,Math.abs(a-u.z)-d))}const l=Math.min(c,1)*3-Math.hypot(o-e,a-i)*.15;l>r.score&&(r={x:o,z:a,score:l})}return{x:Math.round(r.x*20)/20,z:Math.round(r.z*20)/20}}Pt.on("edit:add",({kind:n})=>{const t=pe.room(j.state.roomId)??st.rooms[0],{x:e,z:i}=AS(t),s=st.placements.map(a=>a.id),r=RM(re,n,e,i,st.scale,s);if(!r)return;let o=r.layout;st.custom&&(o=Ce({...o,extras:o.extras.map(a=>a.id===r.id?{...a,floor:st.floorId}:a)})),Mn(o,{select:{type:"item",id:r.id}}),j.set({editPanel:null})});const pr=()=>j.state.selection;Pt.on("plan:convert",()=>{st.custom||On(XM(re,{rooms:st.rooms,walls:st.walls,placements:st.placements}),{select:null,rejected:"Không chuyển được sang mặt bằng tuỳ chỉnh."})});Pt.on("plan:revert",()=>{Mn($M(),{select:null}),j.set({floorId:null})});Pt.on("plan:room-floor",({id:n,floor:t})=>On(OM(re,ln(),n,t),{select:pr()}));Pt.on("plan:room-name",({id:n,name:t})=>On(FM(re,ln(),n,t),{select:pr(),rejected:"Tên phòng không được để trống."}));Pt.on("plan:room-delete",({id:n})=>On(JM(re,ln(),n),{select:null,rejected:"Mỗi tầng phải còn ít nhất một phòng."}));Pt.on("plan:opening-type",({id:n,type:t})=>On(HM(re,ln(),n,t),{select:pr()}));Pt.on("plan:opening-width",({id:n,w:t})=>On(GM(re,ln(),n,t),{select:pr(),rejected:"Cửa rộng quá so với đoạn tường này."}));Pt.on("plan:opening-delete",({id:n})=>On(VM(re,ln(),n),{select:null}));Pt.on("plan:floor-add",({name:n})=>{const t=QM(re,ln(),n);if(!t)return wn.hud.notify("Đã đạt số tầng tối đa (5 tầng).");j.set({floorId:t.id}),Mn(t.layout,{select:null})});Pt.on("plan:floor-select",({id:n})=>{n!==st.floorId&&(j.set({floorId:n,selection:null,roomId:null}),Ri(),Fs.start({walk:!1}))});Pt.on("plan:floor-rename",({id:n,name:t})=>On(tb(re,ln(),n,t),{select:pr()}));Pt.on("plan:floor-remove",({id:n})=>{const t=eb(re,ln(),n);if(t===re)return wn.hud.notify("Phải giữ lại ít nhất một tầng.");j.set({floorId:null}),Mn(t,{select:null})});Pt.on("plan:fit",({target:n})=>{const t=nb(re,ln(),Number(n));if(t.layout===re)return wn.hud.notify("Diện tích đã khớp tin đăng.");Mn(t.layout,{select:null}),wn.hud.notify(`Đã co dãn mặt bằng: ${t.before.toFixed(1)} → ${t.after.toFixed(1)} m².`)});Pt.on("tool:set",({tool:n})=>j.set({tool:j.state.tool===n?null:n}));j.subscribe((n,t,e)=>{e.includes("mode")&&n.mode==="walk"&&n.editing&&j.set({editing:!1}),e.includes("editing")&&(document.body.classList.toggle("editing",n.editing),Uh.setEditing(n.editing),Fn.setEditing(n.editing),j.set({editPanel:null,selection:null,tool:null}),lr&&Ri())});j.subscribe((n,t,e)=>{e.includes("hour")&&Fn.setHour(n.hour),(e.includes("mode")||e.includes("roomId"))&&wn.hud.draw(),e.includes("selection")&&n.selection?.type==="room"&&vn("FLOORPLAN_ROOM_SELECTED",{roomId:n.selection.id})});document.addEventListener("click",n=>{const t=n.target.closest?.(".room-label");t&&(Pt.emit("room:go",{id:t.dataset.room}),j.select({type:"room",id:t.dataset.room}))});let no=0;je.onFrame(n=>{if(Fn.update(n),fr.update(n),Fs.update(n),j.state.playing&&(no+=n,no>.05)){let t=j.state.hour+no*.75;t>18&&(t=6),no=0,j.set({hour:Math.round(t*100)/100})}if(j.state.mode==="walk"&&Ei.update(n)){je.invalidate(),wn.hud.draw();const t=pe.list("room").find(e=>Ei.state.x>=e.x0&&Ei.state.x<=e.x1&&Ei.state.z>=e.z0&&Ei.state.z<=e.z1);t&&t.id!==j.state.roomId&&j.set({roomId:t.id})}});let Cl="unit",Vi=null;const Zi=document.createElement("button");Zi.type="button";Zi.className="iconbtn back-campus";Zi.hidden=!0;Zi.innerHTML=`${te("home",16)}<span>Sa bàn</span>`;wn.els["ui-topbar"].prepend(Zi);Zi.addEventListener("click",()=>{vn("FLOORPLAN_CAMPUS_BACK"),mr("campus")});function mr(n){n==="campus"&&!Vi?.hasData||(Cl=n,document.body.dataset.view=n,n==="campus"?(je.pause(),Vi.resume()):(Vi?.pause(),je.resume()))}function pc(n){const t=nS(n);if(!t)return vn("FLOORPLAN_ERROR",{code:"INVALID_CAMPUS"});Vi??=ES(document.getElementById("campus"),{onEnterUnit:RS}),Vi.setData(t),Zi.hidden=!1,mr("campus")}function RS(n){vn("FLOORPLAN_UNIT_SELECTED",{apartmentId:n.apartmentId});const t=dc(iS(n));if(!t)return vn("FLOORPLAN_ERROR",{code:"INVALID_UNIT"});fc(t),Fs.start({walk:!1}),mr("unit")}ub({init:n=>{fc(n),mr("unit")},campus:pc,pause:()=>Cl==="campus"?Vi?.pause():je.pause(),resume:()=>Cl==="campus"?Vi?.resume():je.resume(),reset:()=>Pt.emit("camera:cmd",{cmd:"home"}),expanded:n=>Pt.emit("host:expanded",{expanded:n})});je.start();try{vn("FLOORPLAN_READY")}catch{vn("FLOORPLAN_ERROR",{code:"WEBGL_INIT_FAILED"})}const CS=wi.get("view")==="campus"||[...wi.keys()].length===0;if(!yo()&&CS)pc(rS());else if(!yo()){const n=bo.map(e=>ic({id:e,name:Ps[e].label,theme:e})),t=db(wi,n);t&&fc({...t,editable:wi.get("edit")==="1"})}window.__apt={setView:mr,applyCampus:pc,app:je,world:Fn,walker:Ei,director:Fs,store:j,plan:st,bus:Pt};
