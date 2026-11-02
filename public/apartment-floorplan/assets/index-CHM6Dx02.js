(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const zl="184",Xe={ROTATE:0,DOLLY:1,PAN:2},fn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},jh=0,Uc=1,Kh=2,Es=1,Zh=2,tr=3,Ci=0,un=1,ii=2,ri=0,Ts=1,Oc=2,Fc=3,zc=4,Jh=5,ki=100,Qh=101,tf=102,ef=103,nf=104,sf=200,rf=201,of=202,af=203,za=204,Ba=205,lf=206,cf=207,uf=208,df=209,hf=210,ff=211,pf=212,mf=213,gf=214,ka=0,Ha=1,Ga=2,As=3,Va=4,Wa=5,Xa=6,$a=7,Bl=0,_f=1,xf=2,$n=0,Ad=1,Rd=2,Cd=3,Pd=4,Ld=5,Dd=6,Io=7,Id=300,qi=301,Rs=302,Xo=303,$o=304,No=306,cr=1e3,si=1001,qa=1002,Ke=1003,vf=1004,wr=1005,nn=1006,qo=1007,Gi=1008,xn=1009,Nd=1010,Ud=1011,ur=1012,kl=1013,Yn=1014,On=1015,ci=1016,Hl=1017,Gl=1018,dr=1020,Od=35902,Fd=35899,zd=1021,Bd=1022,Fn=1023,ui=1026,Vi=1027,Vl=1028,Wl=1029,Yi=1030,Xl=1031,$l=1033,lo=33776,co=33777,uo=33778,ho=33779,Ya=35840,ja=35841,Ka=35842,Za=35843,Ja=36196,Qa=37492,tl=37496,el=37488,nl=37489,xo=37490,il=37491,sl=37808,rl=37809,ol=37810,al=37811,ll=37812,cl=37813,ul=37814,dl=37815,hl=37816,fl=37817,pl=37818,ml=37819,gl=37820,_l=37821,xl=36492,vl=36494,Ml=36495,bl=36283,yl=36284,vo=36285,Sl=36286,Mf=3200,Mo=0,bf=1,Ei="",qe="srgb",bo="srgb-linear",yo="linear",me="srgb",is=7680,Bc=519,yf=512,Sf=513,Ef=514,ql=515,Tf=516,wf=517,Yl=518,Af=519,kc=35044,Hc="300 es",Xn=2e3,hr=2001;function Rf(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function So(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Cf(){const n=So("canvas");return n.style.display="block",n}const Gc={};function Vc(...n){const t="THREE."+n.shift();console.log(t,...n)}function kd(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ht(...n){n=kd(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function oe(...n){n=kd(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function El(...n){const t=n.join(" ");t in Gc||(Gc[t]=!0,Ht(...n))}function Pf(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const Lf={[ka]:Ha,[Ga]:Xa,[Va]:$a,[As]:Wa,[Ha]:ka,[Xa]:Ga,[$a]:Va,[Wa]:As};class Li{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wc=1234567;const sr=Math.PI/180,fr=180/Math.PI;function Os(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]+"-"+tn[t&255]+tn[t>>8&255]+"-"+tn[t>>16&15|64]+tn[t>>24&255]+"-"+tn[e&63|128]+tn[e>>8&255]+"-"+tn[e>>16&255]+tn[e>>24&255]+tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]).toLowerCase()}function Qt(n,t,e){return Math.max(t,Math.min(e,n))}function jl(n,t){return(n%t+t)%t}function Df(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function If(n,t,e){return n!==t?(e-n)/(t-n):0}function rr(n,t,e){return(1-e)*n+e*t}function Nf(n,t,e,i){return rr(n,t,1-Math.exp(-e*i))}function Uf(n,t=1){return t-Math.abs(jl(n,t*2)-t)}function Of(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Ff(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function zf(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Bf(n,t){return n+Math.random()*(t-n)}function kf(n){return n*(.5-Math.random())}function Hf(n){n!==void 0&&(Wc=n);let t=Wc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Gf(n){return n*sr}function Vf(n){return n*fr}function Wf(n){return(n&n-1)===0&&n!==0}function Xf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function $f(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function qf(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+i)/2),u=o((t+i)/2),f=r((t-i)/2),d=o((t-i)/2),g=r((i-t)/2),p=o((i-t)/2);switch(s){case"XYX":n.set(a*u,c*f,c*d,a*l);break;case"YZY":n.set(c*d,a*u,c*f,a*l);break;case"ZXZ":n.set(c*f,c*d,a*u,a*l);break;case"XZX":n.set(a*u,c*p,c*g,a*l);break;case"YXY":n.set(c*g,a*u,c*p,a*l);break;case"ZYZ":n.set(c*p,c*g,a*u,a*l);break;default:Ht("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ms(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function an(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ue={DEG2RAD:sr,RAD2DEG:fr,generateUUID:Os,clamp:Qt,euclideanModulo:jl,mapLinear:Df,inverseLerp:If,lerp:rr,damp:Nf,pingpong:Uf,smoothstep:Of,smootherstep:Ff,randInt:zf,randFloat:Bf,randFloatSpread:kf,seededRandom:Hf,degToRad:Gf,radToDeg:Vf,isPowerOfTwo:Wf,ceilPowerOfTwo:Xf,floorPowerOfTwo:$f,setQuaternionFromProperEuler:qf,normalize:an,denormalize:Ms},Ec=class Ec{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ec.prototype.isVector2=!0;let Ft=Ec;class An{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],u=i[s+2],f=i[s+3],d=r[o+0],g=r[o+1],p=r[o+2],x=r[o+3];if(f!==x||c!==d||l!==g||u!==p){let m=c*d+l*g+u*p+f*x;m<0&&(d=-d,g=-g,p=-p,x=-x,m=-m);let h=1-a;if(m<.9995){const v=Math.acos(m),T=Math.sin(v);h=Math.sin(h*v)/T,a=Math.sin(a*v)/T,c=c*h+d*a,l=l*h+g*a,u=u*h+p*a,f=f*h+x*a}else{c=c*h+d*a,l=l*h+g*a,u=u*h+p*a,f=f*h+x*a;const v=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=v,l*=v,u*=v,f*=v}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],u=i[s+3],f=r[o],d=r[o+1],g=r[o+2],p=r[o+3];return t[e]=a*p+u*f+c*g-l*d,t[e+1]=c*p+u*d+l*f-a*g,t[e+2]=l*p+u*g+a*d-c*f,t[e+3]=u*p-a*f-c*d-l*g,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(s/2),f=a(r/2),d=c(i/2),g=c(s/2),p=c(r/2);switch(o){case"XYZ":this._x=d*u*f+l*g*p,this._y=l*g*f-d*u*p,this._z=l*u*p+d*g*f,this._w=l*u*f-d*g*p;break;case"YXZ":this._x=d*u*f+l*g*p,this._y=l*g*f-d*u*p,this._z=l*u*p-d*g*f,this._w=l*u*f+d*g*p;break;case"ZXY":this._x=d*u*f-l*g*p,this._y=l*g*f+d*u*p,this._z=l*u*p+d*g*f,this._w=l*u*f-d*g*p;break;case"ZYX":this._x=d*u*f-l*g*p,this._y=l*g*f+d*u*p,this._z=l*u*p-d*g*f,this._w=l*u*f+d*g*p;break;case"YZX":this._x=d*u*f+l*g*p,this._y=l*g*f+d*u*p,this._z=l*u*p-d*g*f,this._w=l*u*f-d*g*p;break;case"XZY":this._x=d*u*f-l*g*p,this._y=l*g*f-d*u*p,this._z=l*u*p+d*g*f,this._w=l*u*f+d*g*p;break;default:Ht("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],f=e[10],d=i+a+f;if(d>0){const g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(u-c)*g,this._y=(r-l)*g,this._z=(o-s)*g}else if(i>a&&i>f){const g=2*Math.sqrt(1+i-a-f);this._w=(u-c)/g,this._x=.25*g,this._y=(s+o)/g,this._z=(r+l)/g}else if(a>f){const g=2*Math.sqrt(1+a-i-f);this._w=(r-l)/g,this._x=(s+o)/g,this._y=.25*g,this._z=(c+u)/g}else{const g=2*Math.sqrt(1+f-i-a);this._w=(o-s)/g,this._x=(r+l)/g,this._y=(c+u)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=i*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-i*l,this._z=r*u+o*l+i*c-s*a,this._w=o*u-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Tc=class Tc{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),u=2*(a*e-r*s),f=2*(r*i-o*e);return this.x=e+c*l+o*f-a*u,this.y=i+c*u+a*l-r*f,this.z=s+c*f+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Yo.copy(this).projectOnVector(t),this.sub(Yo)}reflect(t){return this.sub(Yo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Tc.prototype.isVector3=!0;let U=Tc;const Yo=new U,Xc=new An,wc=class wc{constructor(t,e,i,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],f=i[7],d=i[2],g=i[5],p=i[8],x=s[0],m=s[3],h=s[6],v=s[1],T=s[4],A=s[7],D=s[2],R=s[5],P=s[8];return r[0]=o*x+a*v+c*D,r[3]=o*m+a*T+c*R,r[6]=o*h+a*A+c*P,r[1]=l*x+u*v+f*D,r[4]=l*m+u*T+f*R,r[7]=l*h+u*A+f*P,r[2]=d*x+g*v+p*D,r[5]=d*m+g*T+p*R,r[8]=d*h+g*A+p*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-i*r*u+i*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=u*o-a*l,d=a*c-u*r,g=l*r-o*c,p=e*f+i*d+s*g;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/p;return t[0]=f*x,t[1]=(s*l-u*i)*x,t[2]=(a*i-s*o)*x,t[3]=d*x,t[4]=(u*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=g*x,t[7]=(i*c-l*e)*x,t[8]=(o*e-i*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(jo.makeScale(t,e)),this}rotate(t){return this.premultiply(jo.makeRotation(-t)),this}translate(t,e){return this.premultiply(jo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};wc.prototype.isMatrix3=!0;let qt=wc;const jo=new qt,$c=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qc=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Yf(){const n={enabled:!0,workingColorSpace:bo,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===me&&(s.r=oi(s.r),s.g=oi(s.g),s.b=oi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===me&&(s.r=ws(s.r),s.g=ws(s.g),s.b=ws(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ei?yo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return El("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return El("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[bo]:{primaries:t,whitePoint:i,transfer:yo,toXYZ:$c,fromXYZ:qc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:qe},outputColorSpaceConfig:{drawingBufferColorSpace:qe}},[qe]:{primaries:t,whitePoint:i,transfer:me,toXYZ:$c,fromXYZ:qc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:qe}}}),n}const se=Yf();function oi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ws(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ss;class jf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ss===void 0&&(ss=So("canvas")),ss.width=t.width,ss.height=t.height;const s=ss.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=ss}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=So("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=oi(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(oi(e[i]/255)*255):e[i]=oi(e[i]);return{data:e,width:t.width,height:t.height}}else return Ht("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Kf=0;class Kl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Os(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ko(s[o].image)):r.push(Ko(s[o]))}else r=Ko(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Ko(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?jf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ht("Texture: Unable to serialize Texture."),{})}let Zf=0;const Zo=new U;class rn extends Li{constructor(t=rn.DEFAULT_IMAGE,e=rn.DEFAULT_MAPPING,i=si,s=si,r=nn,o=Gi,a=Fn,c=xn,l=rn.DEFAULT_ANISOTROPY,u=Ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zf++}),this.uuid=Os(),this.name="",this.source=new Kl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ft(0,0),this.repeat=new Ft(1,1),this.center=new Ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Zo).x}get height(){return this.source.getSize(Zo).y}get depth(){return this.source.getSize(Zo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Ht(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ht(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Id)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case cr:t.x=t.x-Math.floor(t.x);break;case si:t.x=t.x<0?0:1;break;case qa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case cr:t.y=t.y-Math.floor(t.y);break;case si:t.y=t.y<0?0:1;break;case qa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=Id;rn.DEFAULT_ANISOTROPY=1;const Ac=class Ac{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],u=c[4],f=c[8],d=c[1],g=c[5],p=c[9],x=c[2],m=c[6],h=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-x)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+x)<.1&&Math.abs(p+m)<.1&&Math.abs(l+g+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(l+1)/2,A=(g+1)/2,D=(h+1)/2,R=(u+d)/4,P=(f+x)/4,_=(p+m)/4;return T>A&&T>D?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=R/i,r=P/i):A>D?A<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(A),i=R/s,r=_/s):D<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),i=P/r,s=_/r),this.set(i,s,r,e),this}let v=Math.sqrt((m-p)*(m-p)+(f-x)*(f-x)+(d-u)*(d-u));return Math.abs(v)<.001&&(v=1),this.x=(m-p)/v,this.y=(f-x)/v,this.z=(d-u)/v,this.w=Math.acos((l+g+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ac.prototype.isVector4=!0;let Oe=Ac;class Jf extends Li{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Oe(0,0,t,e),this.scissorTest=!1,this.viewport=new Oe(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new rn(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:nn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Kl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qn extends Jf{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Hd extends rn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Qf extends rn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Do=class Do{constructor(t,e,i,s,r,o,a,c,l,u,f,d,g,p,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,u,f,d,g,p,x,m)}set(t,e,i,s,r,o,a,c,l,u,f,d,g,p,x,m){const h=this.elements;return h[0]=t,h[4]=e,h[8]=i,h[12]=s,h[1]=r,h[5]=o,h[9]=a,h[13]=c,h[2]=l,h[6]=u,h[10]=f,h[14]=d,h[3]=g,h[7]=p,h[11]=x,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Do().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,i=t.elements,s=1/rs.setFromMatrixColumn(t,0).length(),r=1/rs.setFromMatrixColumn(t,1).length(),o=1/rs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const d=o*u,g=o*f,p=a*u,x=a*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=g+p*l,e[5]=d-x*l,e[9]=-a*c,e[2]=x-d*l,e[6]=p+g*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*u,g=c*f,p=l*u,x=l*f;e[0]=d+x*a,e[4]=p*a-g,e[8]=o*l,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=g*a-p,e[6]=x+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*u,g=c*f,p=l*u,x=l*f;e[0]=d-x*a,e[4]=-o*f,e[8]=p+g*a,e[1]=g+p*a,e[5]=o*u,e[9]=x-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*u,g=o*f,p=a*u,x=a*f;e[0]=c*u,e[4]=p*l-g,e[8]=d*l+x,e[1]=c*f,e[5]=x*l+d,e[9]=g*l-p,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,g=o*l,p=a*c,x=a*l;e[0]=c*u,e[4]=x-d*f,e[8]=p*f+g,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=g*f+p,e[10]=d-x*f}else if(t.order==="XZY"){const d=o*c,g=o*l,p=a*c,x=a*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=d*f+x,e[5]=o*u,e[9]=g*f-p,e[2]=p*f-g,e[6]=a*u,e[10]=x*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(tp,t,ep)}lookAt(t,e,i){const s=this.elements;return mn.subVectors(t,e),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),gi.crossVectors(i,mn),gi.lengthSq()===0&&(Math.abs(i.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),gi.crossVectors(i,mn)),gi.normalize(),Ar.crossVectors(mn,gi),s[0]=gi.x,s[4]=Ar.x,s[8]=mn.x,s[1]=gi.y,s[5]=Ar.y,s[9]=mn.y,s[2]=gi.z,s[6]=Ar.z,s[10]=mn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],f=i[5],d=i[9],g=i[13],p=i[2],x=i[6],m=i[10],h=i[14],v=i[3],T=i[7],A=i[11],D=i[15],R=s[0],P=s[4],_=s[8],S=s[12],b=s[1],y=s[5],w=s[9],L=s[13],k=s[2],I=s[6],G=s[10],O=s[14],Q=s[3],rt=s[7],mt=s[11],vt=s[15];return r[0]=o*R+a*b+c*k+l*Q,r[4]=o*P+a*y+c*I+l*rt,r[8]=o*_+a*w+c*G+l*mt,r[12]=o*S+a*L+c*O+l*vt,r[1]=u*R+f*b+d*k+g*Q,r[5]=u*P+f*y+d*I+g*rt,r[9]=u*_+f*w+d*G+g*mt,r[13]=u*S+f*L+d*O+g*vt,r[2]=p*R+x*b+m*k+h*Q,r[6]=p*P+x*y+m*I+h*rt,r[10]=p*_+x*w+m*G+h*mt,r[14]=p*S+x*L+m*O+h*vt,r[3]=v*R+T*b+A*k+D*Q,r[7]=v*P+T*y+A*I+D*rt,r[11]=v*_+T*w+A*G+D*mt,r[15]=v*S+T*L+A*O+D*vt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],f=t[6],d=t[10],g=t[14],p=t[3],x=t[7],m=t[11],h=t[15],v=c*g-l*d,T=a*g-l*f,A=a*d-c*f,D=o*g-l*u,R=o*d-c*u,P=o*f-a*u;return e*(x*v-m*T+h*A)-i*(p*v-m*D+h*R)+s*(p*T-x*D+h*P)-r*(p*A-x*R+m*P)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=t[9],d=t[10],g=t[11],p=t[12],x=t[13],m=t[14],h=t[15],v=e*a-i*o,T=e*c-s*o,A=e*l-r*o,D=i*c-s*a,R=i*l-r*a,P=s*l-r*c,_=u*x-f*p,S=u*m-d*p,b=u*h-g*p,y=f*m-d*x,w=f*h-g*x,L=d*h-g*m,k=v*L-T*w+A*y+D*b-R*S+P*_;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/k;return t[0]=(a*L-c*w+l*y)*I,t[1]=(s*w-i*L-r*y)*I,t[2]=(x*P-m*R+h*D)*I,t[3]=(d*R-f*P-g*D)*I,t[4]=(c*b-o*L-l*S)*I,t[5]=(e*L-s*b+r*S)*I,t[6]=(m*A-p*P-h*T)*I,t[7]=(u*P-d*A+g*T)*I,t[8]=(o*w-a*b+l*_)*I,t[9]=(i*b-e*w-r*_)*I,t[10]=(p*R-x*A+h*v)*I,t[11]=(f*A-u*R-g*v)*I,t[12]=(a*S-o*y-c*_)*I,t[13]=(e*y-i*S+s*_)*I,t[14]=(x*T-p*D-m*v)*I,t[15]=(u*D-f*T+d*v)*I,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+i,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,f=a+a,d=r*l,g=r*u,p=r*f,x=o*u,m=o*f,h=a*f,v=c*l,T=c*u,A=c*f,D=i.x,R=i.y,P=i.z;return s[0]=(1-(x+h))*D,s[1]=(g+A)*D,s[2]=(p-T)*D,s[3]=0,s[4]=(g-A)*R,s[5]=(1-(d+h))*R,s[6]=(m+v)*R,s[7]=0,s[8]=(p+T)*P,s[9]=(m-v)*P,s[10]=(1-(d+x))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),e.identity(),this;let o=rs.set(s[0],s[1],s[2]).length();const a=rs.set(s[4],s[5],s[6]).length(),c=rs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Dn.copy(this);const l=1/o,u=1/a,f=1/c;return Dn.elements[0]*=l,Dn.elements[1]*=l,Dn.elements[2]*=l,Dn.elements[4]*=u,Dn.elements[5]*=u,Dn.elements[6]*=u,Dn.elements[8]*=f,Dn.elements[9]*=f,Dn.elements[10]*=f,e.setFromRotationMatrix(Dn),i.x=o,i.y=a,i.z=c,this}makePerspective(t,e,i,s,r,o,a=Xn,c=!1){const l=this.elements,u=2*r/(e-t),f=2*r/(i-s),d=(e+t)/(e-t),g=(i+s)/(i-s);let p,x;if(c)p=r/(o-r),x=o*r/(o-r);else if(a===Xn)p=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===hr)p=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Xn,c=!1){const l=this.elements,u=2/(e-t),f=2/(i-s),d=-(e+t)/(e-t),g=-(i+s)/(i-s);let p,x;if(c)p=1/(o-r),x=o/(o-r);else if(a===Xn)p=-2/(o-r),x=-(o+r)/(o-r);else if(a===hr)p=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=f,l[9]=0,l[13]=g,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Do.prototype.isMatrix4=!0;let ge=Do;const rs=new U,Dn=new ge,tp=new U(0,0,0),ep=new U(1,1,1),gi=new U,Ar=new U,mn=new U,Yc=new ge,jc=new An;class vn{constructor(t=0,e=0,i=0,s=vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],f=s[2],d=s[6],g=s[10];switch(e){case"XYZ":this._y=Math.asin(Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,g),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Qt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,g));break;case"XZY":this._z=Math.asin(-Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,g),this._y=0);break;default:Ht("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Yc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return jc.setFromEuler(this),this.setFromQuaternion(jc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vn.DEFAULT_ORDER="XYZ";class Zl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let np=0;const Kc=new U,os=new An,Kn=new ge,Rr=new U,Vs=new U,ip=new U,sp=new An,Zc=new U(1,0,0),Jc=new U(0,1,0),Qc=new U(0,0,1),tu={type:"added"},rp={type:"removed"},as={type:"childadded",child:null},Jo={type:"childremoved",child:null};class De extends Li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=Os(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=De.DEFAULT_UP.clone();const t=new U,e=new vn,i=new An,s=new U(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ge},normalMatrix:{value:new qt}}),this.matrix=new ge,this.matrixWorld=new ge,this.matrixAutoUpdate=De.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.multiply(os),this}rotateOnWorldAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.premultiply(os),this}rotateX(t){return this.rotateOnAxis(Zc,t)}rotateY(t){return this.rotateOnAxis(Jc,t)}rotateZ(t){return this.rotateOnAxis(Qc,t)}translateOnAxis(t,e){return Kc.copy(t).applyQuaternion(this.quaternion),this.position.add(Kc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zc,t)}translateY(t){return this.translateOnAxis(Jc,t)}translateZ(t){return this.translateOnAxis(Qc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Rr.copy(t):Rr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(Vs,Rr,this.up):Kn.lookAt(Rr,Vs,this.up),this.quaternion.setFromRotationMatrix(Kn),s&&(Kn.extractRotation(s.matrixWorld),os.setFromRotationMatrix(Kn),this.quaternion.premultiply(os.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(oe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(tu),as.child=t,this.dispatchEvent(as),as.child=null):oe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(rp),Jo.child=t,this.dispatchEvent(Jo),Jo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(tu),as.child=t,this.dispatchEvent(as),as.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,t,ip),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,sp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),f=o(t.shapes),d=o(t.skeletons),g=o(t.animations),p=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),g.length>0&&(i.animations=g),p.length>0&&(i.nodes=p)}return i.object=s,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}De.DEFAULT_UP=new U(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Kt extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}}const op={type:"move"};class Qo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Kt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Kt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Kt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,i),h=this._getHandJoint(l,x);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),g=.02,p=.005;l.inputState.pinching&&d>g+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=g-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(op)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Kt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Gd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},Cr={h:0,s:0,l:0};function ta(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class zt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=i,se.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=se.workingColorSpace){if(t=jl(t,1),e=Qt(e,0,1),i=Qt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=ta(o,r,t+1/3),this.g=ta(o,r,t),this.b=ta(o,r,t-1/3)}return se.colorSpaceToWorking(this,s),this}setStyle(t,e=qe){function i(r){r!==void 0&&parseFloat(r)<1&&Ht("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ht("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Ht("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=qe){const i=Gd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Ht("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=oi(t.r),this.g=oi(t.g),this.b=oi(t.b),this}copyLinearToSRGB(t){return this.r=ws(t.r),this.g=ws(t.g),this.b=ws(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=qe){return se.workingToColorSpace(en.copy(this),t),Math.round(Qt(en.r*255,0,255))*65536+Math.round(Qt(en.g*255,0,255))*256+Math.round(Qt(en.b*255,0,255))}getHexString(t=qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.workingToColorSpace(en.copy(this),e);const i=en.r,s=en.g,r=en.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=se.workingColorSpace){return se.workingToColorSpace(en.copy(this),e),t.r=en.r,t.g=en.g,t.b=en.b,t}getStyle(t=qe){se.workingToColorSpace(en.copy(this),t);const e=en.r,i=en.g,s=en.b;return t!==qe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(_i),this.setHSL(_i.h+t,_i.s+e,_i.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(_i),t.getHSL(Cr);const i=rr(_i.h,Cr.h,e),s=rr(_i.s,Cr.s,e),r=rr(_i.l,Cr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const en=new zt;zt.NAMES=Gd;class Uo{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new zt(t),this.near=e,this.far=i}clone(){return new Uo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Jl extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const In=new U,Zn=new U,ea=new U,Jn=new U,ls=new U,cs=new U,eu=new U,na=new U,ia=new U,sa=new U,ra=new Oe,oa=new Oe,aa=new Oe;class Un{constructor(t=new U,e=new U,i=new U){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),In.subVectors(t,e),s.cross(In);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){In.subVectors(s,e),Zn.subVectors(i,e),ea.subVectors(t,e);const o=In.dot(In),a=In.dot(Zn),c=In.dot(ea),l=Zn.dot(Zn),u=Zn.dot(ea),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;const d=1/f,g=(l*c-a*u)*d,p=(o*u-a*c)*d;return r.set(1-g-p,p,g)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Jn)===null?!1:Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,Jn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Jn.x),c.addScaledVector(o,Jn.y),c.addScaledVector(a,Jn.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return ra.setScalar(0),oa.setScalar(0),aa.setScalar(0),ra.fromBufferAttribute(t,e),oa.fromBufferAttribute(t,i),aa.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ra,r.x),o.addScaledVector(oa,r.y),o.addScaledVector(aa,r.z),o}static isFrontFacing(t,e,i,s){return In.subVectors(i,e),Zn.subVectors(t,e),In.cross(Zn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return In.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),In.cross(Zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Un.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Un.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Un.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Un.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Un.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;ls.subVectors(s,i),cs.subVectors(r,i),na.subVectors(t,i);const c=ls.dot(na),l=cs.dot(na);if(c<=0&&l<=0)return e.copy(i);ia.subVectors(t,s);const u=ls.dot(ia),f=cs.dot(ia);if(u>=0&&f<=u)return e.copy(s);const d=c*f-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(i).addScaledVector(ls,o);sa.subVectors(t,r);const g=ls.dot(sa),p=cs.dot(sa);if(p>=0&&g<=p)return e.copy(r);const x=g*l-c*p;if(x<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(i).addScaledVector(cs,a);const m=u*p-g*f;if(m<=0&&f-u>=0&&g-p>=0)return eu.subVectors(r,s),a=(f-u)/(f-u+(g-p)),e.copy(s).addScaledVector(eu,a);const h=1/(m+x+d);return o=x*h,a=d*h,e.copy(i).addScaledVector(ls,o).addScaledVector(cs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Rn{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Nn):Nn.fromBufferAttribute(r,o),Nn.applyMatrix4(t.matrixWorld),this.expandByPoint(Nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Pr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Pr.copy(i.boundingBox)),Pr.applyMatrix4(t.matrixWorld),this.union(Pr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Nn),Nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ws),Lr.subVectors(this.max,Ws),us.subVectors(t.a,Ws),ds.subVectors(t.b,Ws),hs.subVectors(t.c,Ws),xi.subVectors(ds,us),vi.subVectors(hs,ds),Ii.subVectors(us,hs);let e=[0,-xi.z,xi.y,0,-vi.z,vi.y,0,-Ii.z,Ii.y,xi.z,0,-xi.x,vi.z,0,-vi.x,Ii.z,0,-Ii.x,-xi.y,xi.x,0,-vi.y,vi.x,0,-Ii.y,Ii.x,0];return!la(e,us,ds,hs,Lr)||(e=[1,0,0,0,1,0,0,0,1],!la(e,us,ds,hs,Lr))?!1:(Dr.crossVectors(xi,vi),e=[Dr.x,Dr.y,Dr.z],la(e,us,ds,hs,Lr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Qn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Qn=[new U,new U,new U,new U,new U,new U,new U,new U],Nn=new U,Pr=new Rn,us=new U,ds=new U,hs=new U,xi=new U,vi=new U,Ii=new U,Ws=new U,Lr=new U,Dr=new U,Ni=new U;function la(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Ni.fromArray(n,r);const a=s.x*Math.abs(Ni.x)+s.y*Math.abs(Ni.y)+s.z*Math.abs(Ni.z),c=t.dot(Ni),l=e.dot(Ni),u=i.dot(Ni);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Be=new U,Ir=new Ft;let ap=0;class Mn extends Li{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ap++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=kc,this.updateRanges=[],this.gpuType=On,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ir.fromBufferAttribute(this,e),Ir.applyMatrix3(t),this.setXY(e,Ir.x,Ir.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix3(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Ms(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=an(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ms(e,this.array)),e}setX(t,e){return this.normalized&&(e=an(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ms(e,this.array)),e}setY(t,e){return this.normalized&&(e=an(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ms(e,this.array)),e}setZ(t,e){return this.normalized&&(e=an(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ms(e,this.array)),e}setW(t,e){return this.normalized&&(e=an(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=an(e,this.array),i=an(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=an(e,this.array),i=an(i,this.array),s=an(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=an(e,this.array),i=an(i,this.array),s=an(s,this.array),r=an(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==kc&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class Vd extends Mn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Wd extends Mn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Re extends Mn{constructor(t,e,i){super(new Float32Array(t),e,i)}}const lp=new Rn,Xs=new U,ca=new U;class Fs{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):lp.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Xs.subVectors(t,this.center);const e=Xs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Xs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ca.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Xs.copy(t.center).add(ca)),this.expandByPoint(Xs.copy(t.center).sub(ca))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let cp=0;const wn=new ge,ua=new De,fs=new U,gn=new Rn,$s=new Rn,We=new U;class on extends Li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=Os(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Rf(t)?Wd:Vd)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new qt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return wn.makeRotationFromQuaternion(t),this.applyMatrix4(wn),this}rotateX(t){return wn.makeRotationX(t),this.applyMatrix4(wn),this}rotateY(t){return wn.makeRotationY(t),this.applyMatrix4(wn),this}rotateZ(t){return wn.makeRotationZ(t),this.applyMatrix4(wn),this}translate(t,e,i){return wn.makeTranslation(t,e,i),this.applyMatrix4(wn),this}scale(t,e,i){return wn.makeScale(t,e,i),this.applyMatrix4(wn),this}lookAt(t){return ua.lookAt(t),ua.updateMatrix(),this.applyMatrix4(ua.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fs).negate(),this.translate(fs.x,fs.y,fs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Re(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ht("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){oe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];gn.setFromBufferAttribute(r),this.morphTargetsRelative?(We.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(We),We.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(We)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&oe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){oe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const i=this.boundingSphere.center;if(gn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];$s.setFromBufferAttribute(a),this.morphTargetsRelative?(We.addVectors(gn.min,$s.min),gn.expandByPoint(We),We.addVectors(gn.max,$s.max),gn.expandByPoint(We)):(gn.expandByPoint($s.min),gn.expandByPoint($s.max))}gn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)We.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(We));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)We.fromBufferAttribute(a,l),c&&(fs.fromBufferAttribute(t,l),We.add(fs)),s=Math.max(s,i.distanceToSquared(We))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&oe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){oe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let _=0;_<i.count;_++)a[_]=new U,c[_]=new U;const l=new U,u=new U,f=new U,d=new Ft,g=new Ft,p=new Ft,x=new U,m=new U;function h(_,S,b){l.fromBufferAttribute(i,_),u.fromBufferAttribute(i,S),f.fromBufferAttribute(i,b),d.fromBufferAttribute(r,_),g.fromBufferAttribute(r,S),p.fromBufferAttribute(r,b),u.sub(l),f.sub(l),g.sub(d),p.sub(d);const y=1/(g.x*p.y-p.x*g.y);isFinite(y)&&(x.copy(u).multiplyScalar(p.y).addScaledVector(f,-g.y).multiplyScalar(y),m.copy(f).multiplyScalar(g.x).addScaledVector(u,-p.x).multiplyScalar(y),a[_].add(x),a[S].add(x),a[b].add(x),c[_].add(m),c[S].add(m),c[b].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let _=0,S=v.length;_<S;++_){const b=v[_],y=b.start,w=b.count;for(let L=y,k=y+w;L<k;L+=3)h(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const T=new U,A=new U,D=new U,R=new U;function P(_){D.fromBufferAttribute(s,_),R.copy(D);const S=a[_];T.copy(S),T.sub(D.multiplyScalar(D.dot(S))).normalize(),A.crossVectors(R,S);const y=A.dot(c[_])<0?-1:1;o.setXYZW(_,T.x,T.y,T.z,y)}for(let _=0,S=v.length;_<S;++_){const b=v[_],y=b.start,w=b.count;for(let L=y,k=y+w;L<k;L+=3)P(t.getX(L+0)),P(t.getX(L+1)),P(t.getX(L+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Mn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,g=i.count;d<g;d++)i.setXYZ(d,0,0,0);const s=new U,r=new U,o=new U,a=new U,c=new U,l=new U,u=new U,f=new U;if(t)for(let d=0,g=t.count;d<g;d+=3){const p=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(i,p),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,m),a.add(u),c.add(u),l.add(u),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,g=e.count;d<g;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)We.fromBufferAttribute(t,e),We.normalize(),t.setXYZ(e,We.x,We.y,We.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,f=a.normalized,d=new l.constructor(c.length*u);let g=0,p=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?g=c[x]*a.data.stride+a.offset:g=c[x]*u;for(let h=0;h<u;h++)d[p++]=l[g++]}return new Mn(d,u,f)}if(this.index===null)return Ht("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new on,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,i);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,f=l.length;u<f;u++){const d=l[u],g=t(d,i);c.push(g)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,d=l.length;f<d;f++){const g=l[f];u.push(g.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],f=r[l];for(let d=0,g=f.length;d<g;d++)u.push(f[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let up=0;class Ji extends Li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=Os(),this.name="",this.type="Material",this.blending=Ts,this.side=Ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=za,this.blendDst=Ba,this.blendEquation=ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=As,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=is,this.stencilZFail=is,this.stencilZPass=is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Ht(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ht(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ts&&(i.blending=this.blending),this.side!==Ci&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==za&&(i.blendSrc=this.blendSrc),this.blendDst!==Ba&&(i.blendDst=this.blendDst),this.blendEquation!==ki&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==As&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==is&&(i.stencilFail=this.stencilFail),this.stencilZFail!==is&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==is&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const ti=new U,da=new U,Nr=new U,Mi=new U,ha=new U,Ur=new U,fa=new U;class Oo{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ti)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ti.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ti.copy(this.origin).addScaledVector(this.direction,e),ti.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){da.copy(t).add(e).multiplyScalar(.5),Nr.copy(e).sub(t).normalize(),Mi.copy(this.origin).sub(da);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Nr),a=Mi.dot(this.direction),c=-Mi.dot(Nr),l=Mi.lengthSq(),u=Math.abs(1-o*o);let f,d,g,p;if(u>0)if(f=o*c-a,d=o*a-c,p=r*u,f>=0)if(d>=-p)if(d<=p){const x=1/u;f*=x,d*=x,g=f*(f+o*d+2*a)+d*(o*f+d+2*c)+l}else d=r,f=Math.max(0,-(o*d+a)),g=-f*f+d*(d+2*c)+l;else d=-r,f=Math.max(0,-(o*d+a)),g=-f*f+d*(d+2*c)+l;else d<=-p?(f=Math.max(0,-(-o*r+a)),d=f>0?-r:Math.min(Math.max(-r,-c),r),g=-f*f+d*(d+2*c)+l):d<=p?(f=0,d=Math.min(Math.max(-r,-c),r),g=d*(d+2*c)+l):(f=Math.max(0,-(o*r+a)),d=f>0?r:Math.min(Math.max(-r,-c),r),g=-f*f+d*(d+2*c)+l);else d=o>0?-r:r,f=Math.max(0,-(o*d+a)),g=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(da).addScaledVector(Nr,d),g}intersectSphere(t,e){ti.subVectors(t.center,this.origin);const i=ti.dot(this.direction),s=ti.dot(ti)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),u>=0?(r=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-d.z)*f,c=(t.max.z-d.z)*f):(a=(t.max.z-d.z)*f,c=(t.min.z-d.z)*f),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,ti)!==null}intersectTriangle(t,e,i,s,r){ha.subVectors(e,t),Ur.subVectors(i,t),fa.crossVectors(ha,Ur);let o=this.direction.dot(fa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Mi.subVectors(this.origin,t);const c=a*this.direction.dot(Ur.crossVectors(Mi,Ur));if(c<0)return null;const l=a*this.direction.dot(ha.cross(Mi));if(l<0||c+l>o)return null;const u=-a*Mi.dot(fa);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ji extends Ji{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Bl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const nu=new ge,Ui=new Oo,Or=new Fs,iu=new U,Fr=new U,zr=new U,Br=new U,pa=new U,kr=new U,su=new U,Hr=new U;class Xt extends De{constructor(t=new on,e=new ji){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){kr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],f=r[c];u!==0&&(pa.fromBufferAttribute(f,t),o?kr.addScaledVector(pa,u):kr.addScaledVector(pa.sub(e),u))}e.add(kr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Or.copy(i.boundingSphere),Or.applyMatrix4(r),Ui.copy(t.ray).recast(t.near),!(Or.containsPoint(Ui.origin)===!1&&(Ui.intersectSphere(Or,iu)===null||Ui.origin.distanceToSquared(iu)>(t.far-t.near)**2))&&(nu.copy(r).invert(),Ui.copy(t.ray).applyMatrix4(nu),!(i.boundingBox!==null&&Ui.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ui)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,d=r.groups,g=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,x=d.length;p<x;p++){const m=d[p],h=o[m.materialIndex],v=Math.max(m.start,g.start),T=Math.min(a.count,Math.min(m.start+m.count,g.start+g.count));for(let A=v,D=T;A<D;A+=3){const R=a.getX(A),P=a.getX(A+1),_=a.getX(A+2);s=Gr(this,h,t,i,l,u,f,R,P,_),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,g.start),x=Math.min(a.count,g.start+g.count);for(let m=p,h=x;m<h;m+=3){const v=a.getX(m),T=a.getX(m+1),A=a.getX(m+2);s=Gr(this,o,t,i,l,u,f,v,T,A),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,x=d.length;p<x;p++){const m=d[p],h=o[m.materialIndex],v=Math.max(m.start,g.start),T=Math.min(c.count,Math.min(m.start+m.count,g.start+g.count));for(let A=v,D=T;A<D;A+=3){const R=A,P=A+1,_=A+2;s=Gr(this,h,t,i,l,u,f,R,P,_),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,g.start),x=Math.min(c.count,g.start+g.count);for(let m=p,h=x;m<h;m+=3){const v=m,T=m+1,A=m+2;s=Gr(this,o,t,i,l,u,f,v,T,A),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function dp(n,t,e,i,s,r,o,a){let c;if(t.side===un?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===Ci,a),c===null)return null;Hr.copy(a),Hr.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Hr);return l<e.near||l>e.far?null:{distance:l,point:Hr.clone(),object:n}}function Gr(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,Fr),n.getVertexPosition(c,zr),n.getVertexPosition(l,Br);const u=dp(n,t,e,i,Fr,zr,Br,su);if(u){const f=new U;Un.getBarycoord(su,Fr,zr,Br,f),s&&(u.uv=Un.getInterpolatedAttribute(s,a,c,l,f,new Ft)),r&&(u.uv1=Un.getInterpolatedAttribute(r,a,c,l,f,new Ft)),o&&(u.normal=Un.getInterpolatedAttribute(o,a,c,l,f,new U),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new U,materialIndex:0};Un.getNormal(Fr,zr,Br,d.normal),u.face=d,u.barycoord=f}return u}class Xd extends rn{constructor(t=null,e=1,i=1,s,r,o,a,c,l=Ke,u=Ke,f,d){super(null,o,a,c,l,u,s,r,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ru extends Mn{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ps=new ge,ou=new ge,Vr=[],au=new Rn,hp=new ge,qs=new Xt,Ys=new Fs;class Ql extends Xt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ru(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,hp)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Rn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ps),au.copy(t.boundingBox).applyMatrix4(ps),this.boundingBox.union(au)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ps),Ys.copy(t.boundingSphere).applyMatrix4(ps),this.boundingSphere.union(Ys)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=t.previousInstanceMatrix.clone()),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(qs.geometry=this.geometry,qs.material=this.material,qs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ys.copy(this.boundingSphere),Ys.applyMatrix4(i),t.ray.intersectsSphere(Ys)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ps),ou.multiplyMatrices(i,ps),qs.matrixWorld=ou,qs.raycast(t,Vr);for(let o=0,a=Vr.length;o<a;o++){const c=Vr[o];c.instanceId=r,c.object=this,e.push(c)}Vr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new ru(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Xd(new Float32Array(s*this.count),s,this.count,Vl,On));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(i,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ma=new U,fp=new U,pp=new qt;class ni{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=ma.subVectors(i,e).cross(fp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(ma),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||pp.getNormalMatrix(t),s=this.coplanarPoint(ma).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Oi=new Fs,mp=new Ft(.5,.5),Wr=new U;class tc{constructor(t=new ni,e=new ni,i=new ni,s=new ni,r=new ni,o=new ni){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Xn,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],f=r[5],d=r[6],g=r[7],p=r[8],x=r[9],m=r[10],h=r[11],v=r[12],T=r[13],A=r[14],D=r[15];if(s[0].setComponents(l-o,g-u,h-p,D-v).normalize(),s[1].setComponents(l+o,g+u,h+p,D+v).normalize(),s[2].setComponents(l+a,g+f,h+x,D+T).normalize(),s[3].setComponents(l-a,g-f,h-x,D-T).normalize(),i)s[4].setComponents(c,d,m,A).normalize(),s[5].setComponents(l-c,g-d,h-m,D-A).normalize();else if(s[4].setComponents(l-c,g-d,h-m,D-A).normalize(),e===Xn)s[5].setComponents(l+c,g+d,h+m,D+A).normalize();else if(e===hr)s[5].setComponents(c,d,m,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Oi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Oi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Oi)}intersectsSprite(t){Oi.center.set(0,0,0);const e=mp.distanceTo(t.center);return Oi.radius=.7071067811865476+e,Oi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Oi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Wr.x=s.normal.x>0?t.max.x:t.min.x,Wr.y=s.normal.y>0?t.max.y:t.min.y,Wr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Wr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $d extends Ji{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Eo=new U,To=new U,lu=new ge,js=new Oo,Xr=new Fs,ga=new U,cu=new U;class gp extends De{constructor(t=new on,e=new $d){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Eo.fromBufferAttribute(e,s-1),To.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Eo.distanceTo(To);t.setAttribute("lineDistance",new Re(i,1))}else Ht("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Xr.copy(i.boundingSphere),Xr.applyMatrix4(s),Xr.radius+=r,t.ray.intersectsSphere(Xr)===!1)return;lu.copy(s).invert(),js.copy(t.ray).applyMatrix4(lu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){const g=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let x=g,m=p-1;x<m;x+=l){const h=u.getX(x),v=u.getX(x+1),T=$r(this,t,js,c,h,v,x);T&&e.push(T)}if(this.isLineLoop){const x=u.getX(p-1),m=u.getX(g),h=$r(this,t,js,c,x,m,p-1);h&&e.push(h)}}else{const g=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let x=g,m=p-1;x<m;x+=l){const h=$r(this,t,js,c,x,x+1,x);h&&e.push(h)}if(this.isLineLoop){const x=$r(this,t,js,c,p-1,g,p-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function $r(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(Eo.fromBufferAttribute(a,s),To.fromBufferAttribute(a,r),e.distanceSqToSegment(Eo,To,ga,cu)>i)return;ga.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ga);if(!(l<t.near||l>t.far))return{distance:l,point:cu.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const uu=new U,du=new U;class _p extends gp{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)uu.fromBufferAttribute(e,s),du.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+uu.distanceTo(du);t.setAttribute("lineDistance",new Re(i,1))}else Ht("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class qd extends rn{constructor(t=[],e=qi,i,s,r,o,a,c,l,u){super(t,e,i,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class wo extends rn{constructor(t,e,i,s,r,o,a,c,l){super(t,e,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Cs extends rn{constructor(t,e,i=Yn,s,r,o,a=Ke,c=Ke,l,u=ui,f=1){if(u!==ui&&u!==Vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:f};super(d,s,r,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Kl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class xp extends Cs{constructor(t,e=Yn,i=qi,s,r,o=Ke,a=Ke,c,l=ui){const u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,i,s,r,o,a,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Yd extends rn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class fe extends on{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],f=[];let d=0,g=0;p("z","y","x",-1,-1,i,e,t,o,r,0),p("z","y","x",1,-1,i,e,-t,o,r,1),p("x","z","y",1,1,t,i,e,s,o,2),p("x","z","y",1,-1,t,i,-e,s,o,3),p("x","y","z",1,-1,t,e,i,s,r,4),p("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(u,3)),this.setAttribute("uv",new Re(f,2));function p(x,m,h,v,T,A,D,R,P,_,S){const b=A/P,y=D/_,w=A/2,L=D/2,k=R/2,I=P+1,G=_+1;let O=0,Q=0;const rt=new U;for(let mt=0;mt<G;mt++){const vt=mt*y-L;for(let z=0;z<I;z++){const V=z*b-w;rt[x]=V*v,rt[m]=vt*T,rt[h]=k,l.push(rt.x,rt.y,rt.z),rt[x]=0,rt[m]=0,rt[h]=R>0?1:-1,u.push(rt.x,rt.y,rt.z),f.push(z/P),f.push(1-mt/_),O+=1}}for(let mt=0;mt<_;mt++)for(let vt=0;vt<P;vt++){const z=d+vt+I*mt,V=d+vt+I*(mt+1),q=d+(vt+1)+I*(mt+1),et=d+(vt+1)+I*mt;c.push(z,V,et),c.push(V,q,et),Q+=6}a.addGroup(g,Q,S),g+=Q,d+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class ec extends on{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new U,u=new Ft;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,d=3;f<=e;f++,d+=3){const g=i+f/e*s;l.x=t*Math.cos(g),l.y=t*Math.sin(g),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[d]/t+1)/2,u.y=(o[d+1]/t+1)/2,c.push(u.x,u.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Re(o,3)),this.setAttribute("normal",new Re(a,3)),this.setAttribute("uv",new Re(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ec(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class zs extends on{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],d=[],g=[];let p=0;const x=[],m=i/2;let h=0;v(),o===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(u),this.setAttribute("position",new Re(f,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(g,2));function v(){const A=new U,D=new U;let R=0;const P=(e-t)/i;for(let _=0;_<=r;_++){const S=[],b=_/r,y=b*(e-t)+t;for(let w=0;w<=s;w++){const L=w/s,k=L*c+a,I=Math.sin(k),G=Math.cos(k);D.x=y*I,D.y=-b*i+m,D.z=y*G,f.push(D.x,D.y,D.z),A.set(I,P,G).normalize(),d.push(A.x,A.y,A.z),g.push(L,1-b),S.push(p++)}x.push(S)}for(let _=0;_<s;_++)for(let S=0;S<r;S++){const b=x[S][_],y=x[S+1][_],w=x[S+1][_+1],L=x[S][_+1];(t>0||S!==0)&&(u.push(b,y,L),R+=3),(e>0||S!==r-1)&&(u.push(y,w,L),R+=3)}l.addGroup(h,R,0),h+=R}function T(A){const D=p,R=new Ft,P=new U;let _=0;const S=A===!0?t:e,b=A===!0?1:-1;for(let w=1;w<=s;w++)f.push(0,m*b,0),d.push(0,b,0),g.push(.5,.5),p++;const y=p;for(let w=0;w<=s;w++){const k=w/s*c+a,I=Math.cos(k),G=Math.sin(k);P.x=S*G,P.y=m*b,P.z=S*I,f.push(P.x,P.y,P.z),d.push(0,b,0),R.x=I*.5+.5,R.y=G*.5*b+.5,g.push(R.x,R.y),p++}for(let w=0;w<s;w++){const L=D+w,k=y+w;A===!0?u.push(k,k+1,L):u.push(k+1,k,L),_+=3}l.addGroup(h,_,A===!0?1:2),h+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zs(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class nc extends zs{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new nc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ic extends on{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],o=[];a(s),l(i),u(),this.setAttribute("position",new Re(r,3)),this.setAttribute("normal",new Re(r.slice(),3)),this.setAttribute("uv",new Re(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const T=new U,A=new U,D=new U;for(let R=0;R<e.length;R+=3)g(e[R+0],T),g(e[R+1],A),g(e[R+2],D),c(T,A,D,v)}function c(v,T,A,D){const R=D+1,P=[];for(let _=0;_<=R;_++){P[_]=[];const S=v.clone().lerp(A,_/R),b=T.clone().lerp(A,_/R),y=R-_;for(let w=0;w<=y;w++)w===0&&_===R?P[_][w]=S:P[_][w]=S.clone().lerp(b,w/y)}for(let _=0;_<R;_++)for(let S=0;S<2*(R-_)-1;S++){const b=Math.floor(S/2);S%2===0?(d(P[_][b+1]),d(P[_+1][b]),d(P[_][b])):(d(P[_][b+1]),d(P[_+1][b+1]),d(P[_+1][b]))}}function l(v){const T=new U;for(let A=0;A<r.length;A+=3)T.x=r[A+0],T.y=r[A+1],T.z=r[A+2],T.normalize().multiplyScalar(v),r[A+0]=T.x,r[A+1]=T.y,r[A+2]=T.z}function u(){const v=new U;for(let T=0;T<r.length;T+=3){v.x=r[T+0],v.y=r[T+1],v.z=r[T+2];const A=m(v)/2/Math.PI+.5,D=h(v)/Math.PI+.5;o.push(A,1-D)}p(),f()}function f(){for(let v=0;v<o.length;v+=6){const T=o[v+0],A=o[v+2],D=o[v+4],R=Math.max(T,A,D),P=Math.min(T,A,D);R>.9&&P<.1&&(T<.2&&(o[v+0]+=1),A<.2&&(o[v+2]+=1),D<.2&&(o[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function g(v,T){const A=v*3;T.x=t[A+0],T.y=t[A+1],T.z=t[A+2]}function p(){const v=new U,T=new U,A=new U,D=new U,R=new Ft,P=new Ft,_=new Ft;for(let S=0,b=0;S<r.length;S+=9,b+=6){v.set(r[S+0],r[S+1],r[S+2]),T.set(r[S+3],r[S+4],r[S+5]),A.set(r[S+6],r[S+7],r[S+8]),R.set(o[b+0],o[b+1]),P.set(o[b+2],o[b+3]),_.set(o[b+4],o[b+5]),D.copy(v).add(T).add(A).divideScalar(3);const y=m(D);x(R,b+0,v,y),x(P,b+2,T,y),x(_,b+4,A,y)}}function x(v,T,A,D){D<0&&v.x===1&&(o[T]=v.x-1),A.x===0&&A.z===0&&(o[T]=D/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function h(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ic(t.vertices,t.indices,t.radius,t.detail)}}class sc extends ic{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new sc(t.radius,t.detail)}}class Ps extends on{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,u=c+1,f=t/a,d=e/c,g=[],p=[],x=[],m=[];for(let h=0;h<u;h++){const v=h*d-o;for(let T=0;T<l;T++){const A=T*f-r;p.push(A,-v,0),x.push(0,0,1),m.push(T/a),m.push(1-h/c)}}for(let h=0;h<c;h++)for(let v=0;v<a;v++){const T=v+l*h,A=v+l*(h+1),D=v+1+l*(h+1),R=v+1+l*h;g.push(T,A,R),g.push(A,D,R)}this.setIndex(g),this.setAttribute("position",new Re(p,3)),this.setAttribute("normal",new Re(x,3)),this.setAttribute("uv",new Re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ps(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ls extends on{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],f=new U,d=new U,g=[],p=[],x=[],m=[];for(let h=0;h<=i;h++){const v=[],T=h/i;let A=0;h===0&&o===0?A=.5/e:h===i&&c===Math.PI&&(A=-.5/e);for(let D=0;D<=e;D++){const R=D/e;f.x=-t*Math.cos(s+R*r)*Math.sin(o+T*a),f.y=t*Math.cos(o+T*a),f.z=t*Math.sin(s+R*r)*Math.sin(o+T*a),p.push(f.x,f.y,f.z),d.copy(f).normalize(),x.push(d.x,d.y,d.z),m.push(R+A,1-T),v.push(l++)}u.push(v)}for(let h=0;h<i;h++)for(let v=0;v<e;v++){const T=u[h][v+1],A=u[h][v],D=u[h+1][v],R=u[h+1][v+1];(h!==0||o>0)&&g.push(T,A,R),(h!==i-1||c<Math.PI)&&g.push(A,D,R)}this.setIndex(g),this.setAttribute("position",new Re(p,3)),this.setAttribute("normal",new Re(x,3)),this.setAttribute("uv",new Re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ls(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function Ds(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(hu(s))s.isRenderTargetTexture?(Ht("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(hu(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function ln(n){const t={};for(let e=0;e<n.length;e++){const i=Ds(n[e]);for(const s in i)t[s]=i[s]}return t}function hu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function vp(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function jd(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}const Mp={clone:Ds,merge:ln};var bp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class jn extends Ji{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bp,this.fragmentShader=yp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ds(t.uniforms),this.uniformsGroups=vp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Sp extends jn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ke extends Ji{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mo,this.normalScale=new Ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ep extends Ji{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mo,this.normalScale=new Ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Bl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Tp extends Ji{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Mf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class wp extends Ji{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class rc extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Kd extends rc{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const _a=new ge,fu=new U,pu=new U;class Zd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ft(512,512),this.mapType=xn,this.map=null,this.mapPass=null,this.matrix=new ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new tc,this._frameExtents=new Ft(1,1),this._viewportCount=1,this._viewports=[new Oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;fu.setFromMatrixPosition(t.matrixWorld),e.position.copy(fu),pu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(pu),e.updateMatrixWorld(),_a.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_a,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===hr||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(_a)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const qr=new U,Yr=new An,Gn=new U;class Jd extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ge,this.projectionMatrix=new ge,this.projectionMatrixInverse=new ge,this.coordinateSystem=Xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(qr,Yr,Gn),Gn.x===1&&Gn.y===1&&Gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qr,Yr,Gn.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(qr,Yr,Gn),Gn.x===1&&Gn.y===1&&Gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qr,Yr,Gn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const bi=new U,mu=new Ft,gu=new Ft;class hn extends Jd{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=fr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(sr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return fr*2*Math.atan(Math.tan(sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(bi.x,bi.y).multiplyScalar(-t/bi.z),bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(bi.x,bi.y).multiplyScalar(-t/bi.z)}getViewSize(t,e){return this.getViewBounds(t,mu,gu),e.subVectors(gu,mu)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(sr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Ap extends Zd{constructor(){super(new hn(90,1,.5,500)),this.isPointLightShadow=!0}}class Qd extends rc{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Ap}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class oc extends Jd{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Rp extends Zd{constructor(){super(new oc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class th extends rc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new Rp}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const ms=-90,gs=1;class Cp extends De{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new hn(ms,gs,t,e);s.layers=this.layers,this.add(s);const r=new hn(ms,gs,t,e);r.layers=this.layers,this.add(r);const o=new hn(ms,gs,t,e);o.layers=this.layers,this.add(o);const a=new hn(ms,gs,t,e);a.layers=this.layers,this.add(a);const c=new hn(ms,gs,t,e);c.layers=this.layers,this.add(c);const l=new hn(ms,gs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Xn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===hr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),g=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,d,g),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class Pp extends hn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const _u=new ge;class ac{constructor(t,e,i=0,s=1/0){this.ray=new Oo(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Zl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):oe("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return _u.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_u),this}intersectObject(t,e=!0,i=[]){return Tl(t,this,i,e),i.sort(xu),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Tl(t[s],this,i,e);return i.sort(xu),i}}function xu(n,t){return n.distance-t.distance}function Tl(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Tl(r[o],t,e,!0)}}class eh{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ht("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class Ao{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Rc=class Rc{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};Rc.prototype.isMatrix2=!0;let vu=Rc;class Lp extends Li{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Ht("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Mu(n,t,e,i){const s=Dp(i);switch(e){case zd:return n*t;case Vl:return n*t/s.components*s.byteLength;case Wl:return n*t/s.components*s.byteLength;case Yi:return n*t*2/s.components*s.byteLength;case Xl:return n*t*2/s.components*s.byteLength;case Bd:return n*t*3/s.components*s.byteLength;case Fn:return n*t*4/s.components*s.byteLength;case $l:return n*t*4/s.components*s.byteLength;case lo:case co:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case uo:case ho:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ja:case Za:return Math.max(n,16)*Math.max(t,8)/4;case Ya:case Ka:return Math.max(n,8)*Math.max(t,8)/2;case Ja:case Qa:case el:case nl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case tl:case xo:case il:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case sl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case rl:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case ol:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case al:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case ll:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case cl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case ul:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case dl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case hl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case fl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case pl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ml:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case gl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case _l:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case xl:case vl:case Ml:return Math.ceil(n/4)*Math.ceil(t/4)*16;case bl:case yl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case vo:case Sl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Dp(n){switch(n){case xn:case Nd:return{byteLength:1,components:1};case ur:case Ud:case ci:return{byteLength:2,components:1};case Hl:case Gl:return{byteLength:2,components:4};case Yn:case kl:case On:return{byteLength:4,components:1};case Od:case Fd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zl}}));typeof window<"u"&&(window.__THREE__?Ht("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zl);function nh(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Ip(n){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,f=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,u),a.onUploadCallback();let g;if(l instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)g=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=n.SHORT;else if(l instanceof Uint32Array)g=n.UNSIGNED_INT;else if(l instanceof Int32Array)g=n.INT;else if(l instanceof Int8Array)g=n.BYTE;else if(l instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,c,l){const u=c.array,f=c.updateRanges;if(n.bindBuffer(l,a),f.length===0)n.bufferSubData(l,0,u);else{f.sort((g,p)=>g.start-p.start);let d=0;for(let g=1;g<f.length;g++){const p=f[d],x=f[g];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++d,f[d]=x)}f.length=d+1;for(let g=0,p=f.length;g<p;g++){const x=f[g];n.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Np=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Up=`#ifdef USE_ALPHAHASH
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
#endif`,Op=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Fp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kp=`#ifdef USE_AOMAP
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
#endif`,Hp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gp=`#ifdef USE_BATCHING
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
#endif`,Vp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$p=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,qp=`#ifdef USE_IRIDESCENCE
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
#endif`,Yp=`#ifdef USE_BUMPMAP
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
#endif`,jp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Kp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,tm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,em=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,nm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,im=`#define PI 3.141592653589793
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
} // validated`,sm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rm=`vec3 transformedNormal = objectNormal;
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
#endif`,om=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,am=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,um="gl_FragColor = linearToOutputTexel( gl_FragColor );",dm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hm=`#ifdef USE_ENVMAP
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
#endif`,fm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,pm=`#ifdef USE_ENVMAP
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
#endif`,mm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gm=`#ifdef USE_ENVMAP
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
#endif`,_m=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bm=`#ifdef USE_GRADIENTMAP
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
}`,ym=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Em=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,wm=`#ifdef USE_ENVMAP
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
#endif`,Am=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lm=`PhysicalMaterial material;
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
#endif`,Dm=`uniform sampler2D dfgLUT;
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
}`,Im=`
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
#endif`,Nm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Um=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Om=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Fm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,km=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Wm=`#if defined( USE_POINTS_UV )
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
#endif`,Xm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$m=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ym=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Km=`#ifdef USE_MORPHTARGETS
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
#endif`,Zm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Qm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,t0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,n0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,i0=`#ifdef USE_NORMALMAP
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
#endif`,s0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,r0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,o0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,a0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,l0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,c0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,u0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,d0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,h0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,f0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,p0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,m0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,g0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,x0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,v0=`float getShadowMask() {
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
}`,M0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,b0=`#ifdef USE_SKINNING
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
#endif`,y0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,S0=`#ifdef USE_SKINNING
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
#endif`,E0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,T0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,w0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,A0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,R0=`#ifdef USE_TRANSMISSION
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
#endif`,C0=`#ifdef USE_TRANSMISSION
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
#endif`,P0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,L0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,D0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,I0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const N0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,U0=`uniform sampler2D t2D;
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
}`,O0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,B0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,k0=`#include <common>
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
}`,H0=`#if DEPTH_PACKING == 3200
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
}`,G0=`#define DISTANCE
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
}`,V0=`#define DISTANCE
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
}`,W0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,X0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$0=`uniform float scale;
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
}`,q0=`uniform vec3 diffuse;
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
}`,Y0=`#include <common>
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
}`,j0=`uniform vec3 diffuse;
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
}`,K0=`#define LAMBERT
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
}`,Z0=`#define LAMBERT
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
}`,J0=`#define MATCAP
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
}`,Q0=`#define MATCAP
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
}`,tg=`#define NORMAL
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
}`,eg=`#define NORMAL
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
}`,ng=`#define PHONG
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
}`,ig=`#define PHONG
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
}`,sg=`#define STANDARD
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
}`,rg=`#define STANDARD
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
}`,og=`#define TOON
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
}`,ag=`#define TOON
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
}`,lg=`uniform float size;
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
}`,cg=`uniform vec3 diffuse;
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
}`,ug=`#include <common>
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
}`,dg=`uniform vec3 color;
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
}`,hg=`uniform float rotation;
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
}`,fg=`uniform vec3 diffuse;
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
}`,jt={alphahash_fragment:Np,alphahash_pars_fragment:Up,alphamap_fragment:Op,alphamap_pars_fragment:Fp,alphatest_fragment:zp,alphatest_pars_fragment:Bp,aomap_fragment:kp,aomap_pars_fragment:Hp,batching_pars_vertex:Gp,batching_vertex:Vp,begin_vertex:Wp,beginnormal_vertex:Xp,bsdfs:$p,iridescence_fragment:qp,bumpmap_pars_fragment:Yp,clipping_planes_fragment:jp,clipping_planes_pars_fragment:Kp,clipping_planes_pars_vertex:Zp,clipping_planes_vertex:Jp,color_fragment:Qp,color_pars_fragment:tm,color_pars_vertex:em,color_vertex:nm,common:im,cube_uv_reflection_fragment:sm,defaultnormal_vertex:rm,displacementmap_pars_vertex:om,displacementmap_vertex:am,emissivemap_fragment:lm,emissivemap_pars_fragment:cm,colorspace_fragment:um,colorspace_pars_fragment:dm,envmap_fragment:hm,envmap_common_pars_fragment:fm,envmap_pars_fragment:pm,envmap_pars_vertex:mm,envmap_physical_pars_fragment:wm,envmap_vertex:gm,fog_vertex:_m,fog_pars_vertex:xm,fog_fragment:vm,fog_pars_fragment:Mm,gradientmap_pars_fragment:bm,lightmap_pars_fragment:ym,lights_lambert_fragment:Sm,lights_lambert_pars_fragment:Em,lights_pars_begin:Tm,lights_toon_fragment:Am,lights_toon_pars_fragment:Rm,lights_phong_fragment:Cm,lights_phong_pars_fragment:Pm,lights_physical_fragment:Lm,lights_physical_pars_fragment:Dm,lights_fragment_begin:Im,lights_fragment_maps:Nm,lights_fragment_end:Um,lightprobes_pars_fragment:Om,logdepthbuf_fragment:Fm,logdepthbuf_pars_fragment:zm,logdepthbuf_pars_vertex:Bm,logdepthbuf_vertex:km,map_fragment:Hm,map_pars_fragment:Gm,map_particle_fragment:Vm,map_particle_pars_fragment:Wm,metalnessmap_fragment:Xm,metalnessmap_pars_fragment:$m,morphinstance_vertex:qm,morphcolor_vertex:Ym,morphnormal_vertex:jm,morphtarget_pars_vertex:Km,morphtarget_vertex:Zm,normal_fragment_begin:Jm,normal_fragment_maps:Qm,normal_pars_fragment:t0,normal_pars_vertex:e0,normal_vertex:n0,normalmap_pars_fragment:i0,clearcoat_normal_fragment_begin:s0,clearcoat_normal_fragment_maps:r0,clearcoat_pars_fragment:o0,iridescence_pars_fragment:a0,opaque_fragment:l0,packing:c0,premultiplied_alpha_fragment:u0,project_vertex:d0,dithering_fragment:h0,dithering_pars_fragment:f0,roughnessmap_fragment:p0,roughnessmap_pars_fragment:m0,shadowmap_pars_fragment:g0,shadowmap_pars_vertex:_0,shadowmap_vertex:x0,shadowmask_pars_fragment:v0,skinbase_vertex:M0,skinning_pars_vertex:b0,skinning_vertex:y0,skinnormal_vertex:S0,specularmap_fragment:E0,specularmap_pars_fragment:T0,tonemapping_fragment:w0,tonemapping_pars_fragment:A0,transmission_fragment:R0,transmission_pars_fragment:C0,uv_pars_fragment:P0,uv_pars_vertex:L0,uv_vertex:D0,worldpos_vertex:I0,background_vert:N0,background_frag:U0,backgroundCube_vert:O0,backgroundCube_frag:F0,cube_vert:z0,cube_frag:B0,depth_vert:k0,depth_frag:H0,distance_vert:G0,distance_frag:V0,equirect_vert:W0,equirect_frag:X0,linedashed_vert:$0,linedashed_frag:q0,meshbasic_vert:Y0,meshbasic_frag:j0,meshlambert_vert:K0,meshlambert_frag:Z0,meshmatcap_vert:J0,meshmatcap_frag:Q0,meshnormal_vert:tg,meshnormal_frag:eg,meshphong_vert:ng,meshphong_frag:ig,meshphysical_vert:sg,meshphysical_frag:rg,meshtoon_vert:og,meshtoon_frag:ag,points_vert:lg,points_frag:cg,shadow_vert:ug,shadow_frag:dg,sprite_vert:hg,sprite_frag:fg},Tt={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new Ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new Ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},Wn={basic:{uniforms:ln([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:ln([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new zt(0)},envMapIntensity:{value:1}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:ln([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:ln([Tt.common,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.roughnessmap,Tt.metalnessmap,Tt.fog,Tt.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:ln([Tt.common,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.gradientmap,Tt.fog,Tt.lights,{emissive:{value:new zt(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:ln([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:ln([Tt.points,Tt.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:ln([Tt.common,Tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:ln([Tt.common,Tt.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:ln([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:ln([Tt.sprite,Tt.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distance:{uniforms:ln([Tt.common,Tt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distance_vert,fragmentShader:jt.distance_frag},shadow:{uniforms:ln([Tt.lights,Tt.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};Wn.physical={uniforms:ln([Wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new Ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new Ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new Ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};const jr={r:0,b:0,g:0},pg=new ge,ih=new qt;ih.set(-1,0,0,0,1,0,0,0,1);function mg(n,t,e,i,s,r){const o=new zt(0);let a=s===!0?0:1,c,l,u=null,f=0,d=null;function g(v){let T=v.isScene===!0?v.background:null;if(T&&T.isTexture){const A=v.backgroundBlurriness>0;T=t.get(T,A)}return T}function p(v){let T=!1;const A=g(v);A===null?m(o,a):A&&A.isColor&&(m(A,1),T=!0);const D=n.xr.getEnvironmentBlendMode();D==="additive"?e.buffers.color.setClear(0,0,0,1,r):D==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(v,T){const A=g(T);A&&(A.isCubeTexture||A.mapping===No)?(l===void 0&&(l=new Xt(new fe(1,1,1),new jn({name:"BackgroundCubeMaterial",uniforms:Ds(Wn.backgroundCube.uniforms),vertexShader:Wn.backgroundCube.vertexShader,fragmentShader:Wn.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(D,R,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=A,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(pg.makeRotationFromEuler(T.backgroundRotation)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ih),l.material.toneMapped=se.getTransfer(A.colorSpace)!==me,(u!==A||f!==A.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=A,f=A.version,d=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new Xt(new Ps(2,2),new jn({name:"BackgroundMaterial",uniforms:Ds(Wn.background.uniforms),vertexShader:Wn.background.vertexShader,fragmentShader:Wn.background.fragmentShader,side:Ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=se.getTransfer(A.colorSpace)!==me,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||f!==A.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=A,f=A.version,d=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,T){v.getRGB(jr,jd(n)),e.buffers.color.setClear(jr.r,jr.g,jr.b,T,r)}function h(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,T=1){o.set(v),a=T,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,m(o,a)},render:p,addToRenderList:x,dispose:h}}function gg(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,o=!1;function a(y,w,L,k,I){let G=!1;const O=f(y,k,L,w);r!==O&&(r=O,l(r.object)),G=g(y,k,L,I),G&&p(y,k,L,I),I!==null&&t.update(I,n.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,A(y,w,L,k),I!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(I).buffer))}function c(){return n.createVertexArray()}function l(y){return n.bindVertexArray(y)}function u(y){return n.deleteVertexArray(y)}function f(y,w,L,k){const I=k.wireframe===!0;let G=i[w.id];G===void 0&&(G={},i[w.id]=G);const O=y.isInstancedMesh===!0?y.id:0;let Q=G[O];Q===void 0&&(Q={},G[O]=Q);let rt=Q[L.id];rt===void 0&&(rt={},Q[L.id]=rt);let mt=rt[I];return mt===void 0&&(mt=d(c()),rt[I]=mt),mt}function d(y){const w=[],L=[],k=[];for(let I=0;I<e;I++)w[I]=0,L[I]=0,k[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:L,attributeDivisors:k,object:y,attributes:{},index:null}}function g(y,w,L,k){const I=r.attributes,G=w.attributes;let O=0;const Q=L.getAttributes();for(const rt in Q)if(Q[rt].location>=0){const vt=I[rt];let z=G[rt];if(z===void 0&&(rt==="instanceMatrix"&&y.instanceMatrix&&(z=y.instanceMatrix),rt==="instanceColor"&&y.instanceColor&&(z=y.instanceColor)),vt===void 0||vt.attribute!==z||z&&vt.data!==z.data)return!0;O++}return r.attributesNum!==O||r.index!==k}function p(y,w,L,k){const I={},G=w.attributes;let O=0;const Q=L.getAttributes();for(const rt in Q)if(Q[rt].location>=0){let vt=G[rt];vt===void 0&&(rt==="instanceMatrix"&&y.instanceMatrix&&(vt=y.instanceMatrix),rt==="instanceColor"&&y.instanceColor&&(vt=y.instanceColor));const z={};z.attribute=vt,vt&&vt.data&&(z.data=vt.data),I[rt]=z,O++}r.attributes=I,r.attributesNum=O,r.index=k}function x(){const y=r.newAttributes;for(let w=0,L=y.length;w<L;w++)y[w]=0}function m(y){h(y,0)}function h(y,w){const L=r.newAttributes,k=r.enabledAttributes,I=r.attributeDivisors;L[y]=1,k[y]===0&&(n.enableVertexAttribArray(y),k[y]=1),I[y]!==w&&(n.vertexAttribDivisor(y,w),I[y]=w)}function v(){const y=r.newAttributes,w=r.enabledAttributes;for(let L=0,k=w.length;L<k;L++)w[L]!==y[L]&&(n.disableVertexAttribArray(L),w[L]=0)}function T(y,w,L,k,I,G,O){O===!0?n.vertexAttribIPointer(y,w,L,I,G):n.vertexAttribPointer(y,w,L,k,I,G)}function A(y,w,L,k){x();const I=k.attributes,G=L.getAttributes(),O=w.defaultAttributeValues;for(const Q in G){const rt=G[Q];if(rt.location>=0){let mt=I[Q];if(mt===void 0&&(Q==="instanceMatrix"&&y.instanceMatrix&&(mt=y.instanceMatrix),Q==="instanceColor"&&y.instanceColor&&(mt=y.instanceColor)),mt!==void 0){const vt=mt.normalized,z=mt.itemSize,V=t.get(mt);if(V===void 0)continue;const q=V.buffer,et=V.type,j=V.bytesPerElement,dt=et===n.INT||et===n.UNSIGNED_INT||mt.gpuType===kl;if(mt.isInterleavedBufferAttribute){const ct=mt.data,Ct=ct.stride,It=mt.offset;if(ct.isInstancedInterleavedBuffer){for(let Dt=0;Dt<rt.locationSize;Dt++)h(rt.location+Dt,ct.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let Dt=0;Dt<rt.locationSize;Dt++)m(rt.location+Dt);n.bindBuffer(n.ARRAY_BUFFER,q);for(let Dt=0;Dt<rt.locationSize;Dt++)T(rt.location+Dt,z/rt.locationSize,et,vt,Ct*j,(It+z/rt.locationSize*Dt)*j,dt)}else{if(mt.isInstancedBufferAttribute){for(let ct=0;ct<rt.locationSize;ct++)h(rt.location+ct,mt.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let ct=0;ct<rt.locationSize;ct++)m(rt.location+ct);n.bindBuffer(n.ARRAY_BUFFER,q);for(let ct=0;ct<rt.locationSize;ct++)T(rt.location+ct,z/rt.locationSize,et,vt,z*j,z/rt.locationSize*ct*j,dt)}}else if(O!==void 0){const vt=O[Q];if(vt!==void 0)switch(vt.length){case 2:n.vertexAttrib2fv(rt.location,vt);break;case 3:n.vertexAttrib3fv(rt.location,vt);break;case 4:n.vertexAttrib4fv(rt.location,vt);break;default:n.vertexAttrib1fv(rt.location,vt)}}}}v()}function D(){S();for(const y in i){const w=i[y];for(const L in w){const k=w[L];for(const I in k){const G=k[I];for(const O in G)u(G[O].object),delete G[O];delete k[I]}}delete i[y]}}function R(y){if(i[y.id]===void 0)return;const w=i[y.id];for(const L in w){const k=w[L];for(const I in k){const G=k[I];for(const O in G)u(G[O].object),delete G[O];delete k[I]}}delete i[y.id]}function P(y){for(const w in i){const L=i[w];for(const k in L){const I=L[k];if(I[y.id]===void 0)continue;const G=I[y.id];for(const O in G)u(G[O].object),delete G[O];delete I[y.id]}}}function _(y){for(const w in i){const L=i[w],k=y.isInstancedMesh===!0?y.id:0,I=L[k];if(I!==void 0){for(const G in I){const O=I[G];for(const Q in O)u(O[Q].object),delete O[Q];delete I[G]}delete L[k],Object.keys(L).length===0&&delete i[w]}}}function S(){b(),o=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:S,resetDefaultState:b,dispose:D,releaseStatesOfGeometry:R,releaseStatesOfObject:_,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function _g(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function o(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),e.update(l,i,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let d=0;for(let g=0;g<u;g++)d+=l[g];e.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function xg(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==Fn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const _=P===ci&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==xn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==On&&!_)}function c(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(Ht("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&d===!1&&Ht("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),A=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),D=n.getParameter(n.MAX_SAMPLES),R=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:g,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:v,maxVaryings:T,maxFragmentUniforms:A,maxSamples:D,samples:R}}function vg(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new ni,a=new qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const g=f.length!==0||d||i!==0||s;return s=d,i=f.length,g},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){e=u(f,d,0)},this.setState=function(f,d,g){const p=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,h=n.get(f);if(!s||p===null||p.length===0||r&&!m)r?u(null):l();else{const v=r?0:i,T=v*4;let A=h.clippingState||null;c.value=A,A=u(p,d,T,g);for(let D=0;D!==T;++D)A[D]=e[D];h.clippingState=A,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,d,g,p){const x=f!==null?f.length:0;let m=null;if(x!==0){if(m=c.value,p!==!0||m===null){const h=g+x*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<h)&&(m=new Float32Array(h));for(let T=0,A=g;T!==x;++T,A+=4)o.copy(f[T]).applyMatrix4(v,a),o.normal.toArray(m,A),m[A+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}const Ai=4,bu=[.125,.215,.35,.446,.526,.582],Hi=20,Mg=256,Ks=new oc,yu=new zt;let xa=null,va=0,Ma=0,ba=!1;const bg=new U;class wl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=bg}=r;xa=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Eu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(xa,va,Ma),this._renderer.xr.enabled=ba,t.scissorTest=!1,_s(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===qi||t.mapping===Rs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),xa=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:nn,minFilter:nn,generateMipmaps:!1,type:ci,format:Fn,colorSpace:bo,depthBuffer:!1},s=Su(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Su(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=yg(r)),this._blurMaterial=Eg(r,t,e),this._ggxMaterial=Sg(r,t,e)}return s}_compileMaterial(t){const e=new Xt(new on,t);this._renderer.compile(e,Ks)}_sceneToCubeUV(t,e,i,s,r){const c=new hn(90,1,e,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,g=f.toneMapping;f.getClearColor(yu),f.toneMapping=$n,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Xt(new fe,new ji({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let h=!1;const v=t.background;v?v.isColor&&(m.color.copy(v),t.background=null,h=!0):(m.color.copy(yu),h=!0);for(let T=0;T<6;T++){const A=T%3;A===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[T],r.y,r.z)):A===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[T]));const D=this._cubeSize;_s(s,A*D,T>2?D:0,D,D),f.setRenderTarget(s),h&&f.render(x,c),f.render(t,c)}f.toneMapping=g,f.autoClear=d,t.background=v}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===qi||t.mapping===Rs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Eu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;_s(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,Ks)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const c=o.uniforms,l=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),d=0+l*1.25,g=f*d,{_lodMax:p}=this,x=this._sizeLods[i],m=3*x*(i>p-Ai?i-p+Ai:0),h=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=g,c.mipInt.value=p-e,_s(r,m,h,3*x,2*x),s.setRenderTarget(r),s.render(a,Ks),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=p-i,_s(t,m,h,3*x,2*x),s.setRenderTarget(t),s.render(a,Ks)}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&oe("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=l;const d=l.uniforms,g=this._sizeLods[i]-1,p=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Hi-1),x=r/p,m=isFinite(r)?1+Math.floor(u*x):Hi;m>Hi&&Ht(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hi}`);const h=[];let v=0;for(let P=0;P<Hi;++P){const _=P/x,S=Math.exp(-_*_/2);h.push(S),P===0?v+=S:P<m&&(v+=2*S)}for(let P=0;P<h.length;P++)h[P]=h[P]/v;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=h,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:T}=this;d.dTheta.value=p,d.mipInt.value=T-i;const A=this._sizeLods[s],D=3*A*(s>T-Ai?s-T+Ai:0),R=4*(this._cubeSize-A);_s(e,D,R,3*A,2*A),c.setRenderTarget(e),c.render(f,Ks)}}function yg(n){const t=[],e=[],i=[];let s=n;const r=n-Ai+1+bu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>n-Ai?c=bu[o-n+Ai-1]:o===0&&(c=0),e.push(c);const l=1/(a-2),u=-l,f=1+l,d=[u,u,f,u,f,f,u,u,f,f,u,f],g=6,p=6,x=3,m=2,h=1,v=new Float32Array(x*p*g),T=new Float32Array(m*p*g),A=new Float32Array(h*p*g);for(let R=0;R<g;R++){const P=R%3*2/3-1,_=R>2?0:-1,S=[P,_,0,P+2/3,_,0,P+2/3,_+1,0,P,_,0,P+2/3,_+1,0,P,_+1,0];v.set(S,x*p*R),T.set(d,m*p*R);const b=[R,R,R,R,R,R];A.set(b,h*p*R)}const D=new on;D.setAttribute("position",new Mn(v,x)),D.setAttribute("uv",new Mn(T,m)),D.setAttribute("faceIndex",new Mn(A,h)),i.push(new Xt(D,null)),s>Ai&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function Su(n,t,e){const i=new qn(n,t,e);return i.texture.mapping=No,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _s(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Sg(n,t,e){return new jn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Mg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Fo(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Eg(n,t,e){const i=new Float32Array(Hi),s=new U(0,1,0);return new jn({name:"SphericalGaussianBlur",defines:{n:Hi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fo(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Eu(){return new jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fo(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Tu(){return new jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Fo(){return`

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
	`}class sh extends qn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new qd(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new fe(5,5,5),r=new jn({name:"CubemapFromEquirect",uniforms:Ds(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:un,blending:ri});r.uniforms.tEquirect.value=e;const o=new Xt(s,r),a=e.minFilter;return e.minFilter===Gi&&(e.minFilter=nn),new Cp(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}function Tg(n){let t=new WeakMap,e=new WeakMap,i=null;function s(d,g=!1){return d==null?null:g?o(d):r(d)}function r(d){if(d&&d.isTexture){const g=d.mapping;if(g===Xo||g===$o)if(t.has(d)){const p=t.get(d).texture;return a(p,d.mapping)}else{const p=d.image;if(p&&p.height>0){const x=new sh(p.height);return x.fromEquirectangularTexture(n,d),t.set(d,x),d.addEventListener("dispose",l),a(x.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const g=d.mapping,p=g===Xo||g===$o,x=g===qi||g===Rs;if(p||x){let m=e.get(d);const h=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==h)return i===null&&(i=new wl(n)),m=p?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),m.texture;if(m!==void 0)return m.texture;{const v=d.image;return p&&v&&v.height>0||x&&v&&c(v)?(i===null&&(i=new wl(n)),m=p?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function a(d,g){return g===Xo?d.mapping=qi:g===$o&&(d.mapping=Rs),d}function c(d){let g=0;const p=6;for(let x=0;x<p;x++)d[x]!==void 0&&g++;return g===p}function l(d){const g=d.target;g.removeEventListener("dispose",l);const p=t.get(g);p!==void 0&&(t.delete(g),p.dispose())}function u(d){const g=d.target;g.removeEventListener("dispose",u);const p=e.get(g);p!==void 0&&(e.delete(g),p.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function wg(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&El("WebGLRenderer: "+i+" extension not supported."),s}}}function Ag(n,t,e,i){const s={},r=new WeakMap;function o(f){const d=f.target;d.index!==null&&t.remove(d.index);for(const p in d.attributes)t.remove(d.attributes[p]);d.removeEventListener("dispose",o),delete s[d.id];const g=r.get(d);g&&(t.remove(g),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(f,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(f){const d=f.attributes;for(const g in d)t.update(d[g],n.ARRAY_BUFFER)}function l(f){const d=[],g=f.index,p=f.attributes.position;let x=0;if(p===void 0)return;if(g!==null){const v=g.array;x=g.version;for(let T=0,A=v.length;T<A;T+=3){const D=v[T+0],R=v[T+1],P=v[T+2];d.push(D,R,R,P,P,D)}}else{const v=p.array;x=p.version;for(let T=0,A=v.length/3-1;T<A;T+=3){const D=T+0,R=T+1,P=T+2;d.push(D,R,R,P,P,D)}}const m=new(p.count>=65535?Wd:Vd)(d,1);m.version=x;const h=r.get(f);h&&t.remove(h),r.set(f,m)}function u(f){const d=r.get(f);if(d){const g=f.index;g!==null&&d.version<g.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function Rg(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){n.drawElements(i,d,r,f*o),e.update(d,i,1)}function l(f,d,g){g!==0&&(n.drawElementsInstanced(i,d,r,f*o,g),e.update(d,i,g))}function u(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,g);let x=0;for(let m=0;m<g;m++)x+=d[m];e.update(x,i,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Cg(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:oe("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Pg(n,t,e){const i=new WeakMap,s=new Oe;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(a);if(d===void 0||d.count!==f){let b=function(){_.dispose(),i.delete(a),a.removeEventListener("dispose",b)};var g=b;d!==void 0&&d.texture.dispose();const p=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let A=0;p===!0&&(A=1),x===!0&&(A=2),m===!0&&(A=3);let D=a.attributes.position.count*A,R=1;D>t.maxTextureSize&&(R=Math.ceil(D/t.maxTextureSize),D=t.maxTextureSize);const P=new Float32Array(D*R*4*f),_=new Hd(P,D,R,f);_.type=On,_.needsUpdate=!0;const S=A*4;for(let y=0;y<f;y++){const w=h[y],L=v[y],k=T[y],I=D*R*4*y;for(let G=0;G<w.count;G++){const O=G*S;p===!0&&(s.fromBufferAttribute(w,G),P[I+O+0]=s.x,P[I+O+1]=s.y,P[I+O+2]=s.z,P[I+O+3]=0),x===!0&&(s.fromBufferAttribute(L,G),P[I+O+4]=s.x,P[I+O+5]=s.y,P[I+O+6]=s.z,P[I+O+7]=0),m===!0&&(s.fromBufferAttribute(k,G),P[I+O+8]=s.x,P[I+O+9]=s.y,P[I+O+10]=s.z,P[I+O+11]=k.itemSize===4?s.w:1)}}d={count:f,texture:_,size:new Ft(D,R)},i.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let p=0;for(let m=0;m<l.length;m++)p+=l[m];const x=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function Lg(n,t,e,i,s){let r=new WeakMap;function o(l){const u=s.render.frame,f=l.geometry,d=t.get(l,f);if(r.get(d)!==u&&(t.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const g=l.skeleton;r.get(g)!==u&&(g.update(),r.set(g,u))}return d}function a(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}const Dg={[Ad]:"LINEAR_TONE_MAPPING",[Rd]:"REINHARD_TONE_MAPPING",[Cd]:"CINEON_TONE_MAPPING",[Pd]:"ACES_FILMIC_TONE_MAPPING",[Dd]:"AGX_TONE_MAPPING",[Io]:"NEUTRAL_TONE_MAPPING",[Ld]:"CUSTOM_TONE_MAPPING"};function Ig(n,t,e,i,s){const r=new qn(t,e,{type:n,depthBuffer:i,stencilBuffer:s,depthTexture:i?new Cs(t,e):void 0}),o=new qn(t,e,{type:ci,depthBuffer:!1,stencilBuffer:!1}),a=new on;a.setAttribute("position",new Re([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Re([0,2,0,0,2,0],2));const c=new Sp({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new Xt(a,c),u=new oc(-1,1,1,-1,0,1);let f=null,d=null,g=!1,p,x=null,m=[],h=!1;this.setSize=function(v,T){r.setSize(v,T),o.setSize(v,T);for(let A=0;A<m.length;A++){const D=m[A];D.setSize&&D.setSize(v,T)}},this.setEffects=function(v){m=v,h=m.length>0&&m[0].isRenderPass===!0;const T=r.width,A=r.height;for(let D=0;D<m.length;D++){const R=m[D];R.setSize&&R.setSize(T,A)}},this.begin=function(v,T){if(g||v.toneMapping===$n&&m.length===0)return!1;if(x=T,T!==null){const A=T.width,D=T.height;(r.width!==A||r.height!==D)&&this.setSize(A,D)}return h===!1&&v.setRenderTarget(r),p=v.toneMapping,v.toneMapping=$n,!0},this.hasRenderPass=function(){return h},this.end=function(v,T){v.toneMapping=p,g=!0;let A=r,D=o;for(let R=0;R<m.length;R++){const P=m[R];if(P.enabled!==!1&&(P.render(v,D,A,T),P.needsSwap!==!1)){const _=A;A=D,D=_}}if(f!==v.outputColorSpace||d!==v.toneMapping){f=v.outputColorSpace,d=v.toneMapping,c.defines={},se.getTransfer(f)===me&&(c.defines.SRGB_TRANSFER="");const R=Dg[d];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=A.texture,v.setRenderTarget(x),v.render(l,u),x=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),a.dispose(),c.dispose()}}const rh=new rn,Al=new Cs(1,1),oh=new Hd,ah=new Qf,lh=new qd,wu=[],Au=[],Ru=new Float32Array(16),Cu=new Float32Array(9),Pu=new Float32Array(4);function Bs(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=wu[s];if(r===void 0&&(r=new Float32Array(s),wu[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ge(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ve(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function zo(n,t){let e=Au[t];e===void 0&&(e=new Int32Array(t),Au[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Ng(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Ug(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2fv(this.addr,t),Ve(e,t)}}function Og(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ge(e,t))return;n.uniform3fv(this.addr,t),Ve(e,t)}}function Fg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4fv(this.addr,t),Ve(e,t)}}function zg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ve(e,t)}else{if(Ge(e,i))return;Pu.set(i),n.uniformMatrix2fv(this.addr,!1,Pu),Ve(e,i)}}function Bg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ve(e,t)}else{if(Ge(e,i))return;Cu.set(i),n.uniformMatrix3fv(this.addr,!1,Cu),Ve(e,i)}}function kg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ve(e,t)}else{if(Ge(e,i))return;Ru.set(i),n.uniformMatrix4fv(this.addr,!1,Ru),Ve(e,i)}}function Hg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Gg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2iv(this.addr,t),Ve(e,t)}}function Vg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;n.uniform3iv(this.addr,t),Ve(e,t)}}function Wg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4iv(this.addr,t),Ve(e,t)}}function Xg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function $g(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2uiv(this.addr,t),Ve(e,t)}}function qg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;n.uniform3uiv(this.addr,t),Ve(e,t)}}function Yg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4uiv(this.addr,t),Ve(e,t)}}function jg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Al.compareFunction=e.isReversedDepthBuffer()?Yl:ql,r=Al):r=rh,e.setTexture2D(t||r,s)}function Kg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||ah,s)}function Zg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||lh,s)}function Jg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||oh,s)}function Qg(n){switch(n){case 5126:return Ng;case 35664:return Ug;case 35665:return Og;case 35666:return Fg;case 35674:return zg;case 35675:return Bg;case 35676:return kg;case 5124:case 35670:return Hg;case 35667:case 35671:return Gg;case 35668:case 35672:return Vg;case 35669:case 35673:return Wg;case 5125:return Xg;case 36294:return $g;case 36295:return qg;case 36296:return Yg;case 35678:case 36198:case 36298:case 36306:case 35682:return jg;case 35679:case 36299:case 36307:return Kg;case 35680:case 36300:case 36308:case 36293:return Zg;case 36289:case 36303:case 36311:case 36292:return Jg}}function t_(n,t){n.uniform1fv(this.addr,t)}function e_(n,t){const e=Bs(t,this.size,2);n.uniform2fv(this.addr,e)}function n_(n,t){const e=Bs(t,this.size,3);n.uniform3fv(this.addr,e)}function i_(n,t){const e=Bs(t,this.size,4);n.uniform4fv(this.addr,e)}function s_(n,t){const e=Bs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function r_(n,t){const e=Bs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function o_(n,t){const e=Bs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function a_(n,t){n.uniform1iv(this.addr,t)}function l_(n,t){n.uniform2iv(this.addr,t)}function c_(n,t){n.uniform3iv(this.addr,t)}function u_(n,t){n.uniform4iv(this.addr,t)}function d_(n,t){n.uniform1uiv(this.addr,t)}function h_(n,t){n.uniform2uiv(this.addr,t)}function f_(n,t){n.uniform3uiv(this.addr,t)}function p_(n,t){n.uniform4uiv(this.addr,t)}function m_(n,t,e){const i=this.cache,s=t.length,r=zo(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Al:o=rh;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function g_(n,t,e){const i=this.cache,s=t.length,r=zo(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||ah,r[o])}function __(n,t,e){const i=this.cache,s=t.length,r=zo(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||lh,r[o])}function x_(n,t,e){const i=this.cache,s=t.length,r=zo(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||oh,r[o])}function v_(n){switch(n){case 5126:return t_;case 35664:return e_;case 35665:return n_;case 35666:return i_;case 35674:return s_;case 35675:return r_;case 35676:return o_;case 5124:case 35670:return a_;case 35667:case 35671:return l_;case 35668:case 35672:return c_;case 35669:case 35673:return u_;case 5125:return d_;case 36294:return h_;case 36295:return f_;case 36296:return p_;case 35678:case 36198:case 36298:case 36306:case 35682:return m_;case 35679:case 36299:case 36307:return g_;case 35680:case 36300:case 36308:case 36293:return __;case 36289:case 36303:case 36311:case 36292:return x_}}class M_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Qg(e.type)}}class b_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=v_(e.type)}}class y_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const ya=/(\w+)(\])?(\[|\.)?/g;function Lu(n,t){n.seq.push(t),n.map[t.id]=t}function S_(n,t,e){const i=n.name,s=i.length;for(ya.lastIndex=0;;){const r=ya.exec(i),o=ya.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Lu(e,l===void 0?new M_(a,n,t):new b_(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new y_(a),Lu(e,f)),e=f}}}class fo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);S_(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Du(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const E_=37297;let T_=0;function w_(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Iu=new qt;function A_(n){se._getMatrix(Iu,se.workingColorSpace,n);const t=`mat3( ${Iu.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(n)){case yo:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return Ht("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Nu(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+w_(n.getShaderSource(t),a)}else return r}function R_(n,t){const e=A_(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const C_={[Ad]:"Linear",[Rd]:"Reinhard",[Cd]:"Cineon",[Pd]:"ACESFilmic",[Dd]:"AgX",[Io]:"Neutral",[Ld]:"Custom"};function P_(n,t){const e=C_[t];return e===void 0?(Ht("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Kr=new U;function L_(){se.getLuminanceCoefficients(Kr);const n=Kr.x.toFixed(4),t=Kr.y.toFixed(4),e=Kr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function D_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(er).join(`
`)}function I_(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function N_(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function er(n){return n!==""}function Uu(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ou(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const U_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rl(n){return n.replace(U_,F_)}const O_=new Map;function F_(n,t){let e=jt[t];if(e===void 0){const i=O_.get(t);if(i!==void 0)e=jt[i],Ht('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Rl(e)}const z_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fu(n){return n.replace(z_,B_)}function B_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function zu(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}const k_={[Es]:"SHADOWMAP_TYPE_PCF",[tr]:"SHADOWMAP_TYPE_VSM"};function H_(n){return k_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const G_={[qi]:"ENVMAP_TYPE_CUBE",[Rs]:"ENVMAP_TYPE_CUBE",[No]:"ENVMAP_TYPE_CUBE_UV"};function V_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":G_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const W_={[Rs]:"ENVMAP_MODE_REFRACTION"};function X_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":W_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const $_={[Bl]:"ENVMAP_BLENDING_MULTIPLY",[_f]:"ENVMAP_BLENDING_MIX",[xf]:"ENVMAP_BLENDING_ADD"};function q_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":$_[n.combine]||"ENVMAP_BLENDING_NONE"}function Y_(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function j_(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=H_(e),l=V_(e),u=X_(e),f=q_(e),d=Y_(e),g=D_(e),p=I_(r),x=s.createProgram();let m,h,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(er).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(er).join(`
`),h.length>0&&(h+=`
`)):(m=[zu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(er).join(`
`),h=[zu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$n?"#define TONE_MAPPING":"",e.toneMapping!==$n?jt.tonemapping_pars_fragment:"",e.toneMapping!==$n?P_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,R_("linearToOutputTexel",e.outputColorSpace),L_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(er).join(`
`)),o=Rl(o),o=Uu(o,e),o=Ou(o,e),a=Rl(a),a=Uu(a,e),a=Ou(a,e),o=Fu(o),a=Fu(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",e.glslVersion===Hc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Hc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const T=v+m+o,A=v+h+a,D=Du(s,s.VERTEX_SHADER,T),R=Du(s,s.FRAGMENT_SHADER,A);s.attachShader(x,D),s.attachShader(x,R),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function P(y){if(n.debug.checkShaderErrors){const w=s.getProgramInfoLog(x)||"",L=s.getShaderInfoLog(D)||"",k=s.getShaderInfoLog(R)||"",I=w.trim(),G=L.trim(),O=k.trim();let Q=!0,rt=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,D,R);else{const mt=Nu(s,D,"vertex"),vt=Nu(s,R,"fragment");oe("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+I+`
`+mt+`
`+vt)}else I!==""?Ht("WebGLProgram: Program Info Log:",I):(G===""||O==="")&&(rt=!1);rt&&(y.diagnostics={runnable:Q,programLog:I,vertexShader:{log:G,prefix:m},fragmentShader:{log:O,prefix:h}})}s.deleteShader(D),s.deleteShader(R),_=new fo(s,x),S=N_(s,x)}let _;this.getUniforms=function(){return _===void 0&&P(this),_};let S;this.getAttributes=function(){return S===void 0&&P(this),S};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(x,E_)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=T_++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=D,this.fragmentShader=R,this}let K_=0;class Z_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new J_(t),e.set(t,i)),i}}class J_{constructor(t){this.id=K_++,this.code=t,this.usedTimes=0}}function Q_(n){return n===Yi||n===xo||n===vo}function tx(n,t,e,i,s,r){const o=new Zl,a=new Z_,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return c.add(_),_===0?"uv":`uv${_}`}function x(_,S,b,y,w,L){const k=y.fog,I=w.geometry,G=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?y.environment:null,O=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,Q=t.get(_.envMap||G,O),rt=Q&&Q.mapping===No?Q.image.height:null,mt=g[_.type];_.precision!==null&&(d=i.getMaxPrecision(_.precision),d!==_.precision&&Ht("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const vt=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,z=vt!==void 0?vt.length:0;let V=0;I.morphAttributes.position!==void 0&&(V=1),I.morphAttributes.normal!==void 0&&(V=2),I.morphAttributes.color!==void 0&&(V=3);let q,et,j,dt;if(mt){const kt=Wn[mt];q=kt.vertexShader,et=kt.fragmentShader}else q=_.vertexShader,et=_.fragmentShader,a.update(_),j=a.getVertexShaderID(_),dt=a.getFragmentShaderID(_);const ct=n.getRenderTarget(),Ct=n.state.buffers.depth.getReversed(),It=w.isInstancedMesh===!0,Dt=w.isBatchedMesh===!0,ie=!!_.map,$t=!!_.matcap,le=!!Q,he=!!_.aoMap,Wt=!!_.lightMap,Pe=!!_.bumpMap,ye=!!_.normalMap,Je=!!_.displacementMap,B=!!_.emissiveMap,Ie=!!_.metalnessMap,Zt=!!_.roughnessMap,pe=_.anisotropy>0,yt=_.clearcoat>0,_e=_.dispersion>0,C=_.iridescence>0,M=_.sheen>0,X=_.transmission>0,N=pe&&!!_.anisotropyMap,J=yt&&!!_.clearcoatMap,$=yt&&!!_.clearcoatNormalMap,ut=yt&&!!_.clearcoatRoughnessMap,Z=C&&!!_.iridescenceMap,st=C&&!!_.iridescenceThicknessMap,ht=M&&!!_.sheenColorMap,bt=M&&!!_.sheenRoughnessMap,gt=!!_.specularMap,pt=!!_.specularColorMap,Bt=!!_.specularIntensityMap,Gt=X&&!!_.transmissionMap,ee=X&&!!_.thicknessMap,F=!!_.gradientMap,_t=!!_.alphaMap,ot=_.alphaTest>0,St=!!_.alphaHash,ft=!!_.extensions;let nt=$n;_.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(nt=n.toneMapping);const Mt={shaderID:mt,shaderType:_.type,shaderName:_.name,vertexShader:q,fragmentShader:et,defines:_.defines,customVertexShaderID:j,customFragmentShaderID:dt,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:Dt,batchingColor:Dt&&w._colorsTexture!==null,instancing:It,instancingColor:It&&w.instanceColor!==null,instancingMorph:It&&w.morphTexture!==null,outputColorSpace:ct===null?n.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:se.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ie,matcap:$t,envMap:le,envMapMode:le&&Q.mapping,envMapCubeUVHeight:rt,aoMap:he,lightMap:Wt,bumpMap:Pe,normalMap:ye,displacementMap:Je,emissiveMap:B,normalMapObjectSpace:ye&&_.normalMapType===bf,normalMapTangentSpace:ye&&_.normalMapType===Mo,packedNormalMap:ye&&_.normalMapType===Mo&&Q_(_.normalMap.format),metalnessMap:Ie,roughnessMap:Zt,anisotropy:pe,anisotropyMap:N,clearcoat:yt,clearcoatMap:J,clearcoatNormalMap:$,clearcoatRoughnessMap:ut,dispersion:_e,iridescence:C,iridescenceMap:Z,iridescenceThicknessMap:st,sheen:M,sheenColorMap:ht,sheenRoughnessMap:bt,specularMap:gt,specularColorMap:pt,specularIntensityMap:Bt,transmission:X,transmissionMap:Gt,thicknessMap:ee,gradientMap:F,opaque:_.transparent===!1&&_.blending===Ts&&_.alphaToCoverage===!1,alphaMap:_t,alphaTest:ot,alphaHash:St,combine:_.combine,mapUv:ie&&p(_.map.channel),aoMapUv:he&&p(_.aoMap.channel),lightMapUv:Wt&&p(_.lightMap.channel),bumpMapUv:Pe&&p(_.bumpMap.channel),normalMapUv:ye&&p(_.normalMap.channel),displacementMapUv:Je&&p(_.displacementMap.channel),emissiveMapUv:B&&p(_.emissiveMap.channel),metalnessMapUv:Ie&&p(_.metalnessMap.channel),roughnessMapUv:Zt&&p(_.roughnessMap.channel),anisotropyMapUv:N&&p(_.anisotropyMap.channel),clearcoatMapUv:J&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:$&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ut&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:st&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:bt&&p(_.sheenRoughnessMap.channel),specularMapUv:gt&&p(_.specularMap.channel),specularColorMapUv:pt&&p(_.specularColorMap.channel),specularIntensityMapUv:Bt&&p(_.specularIntensityMap.channel),transmissionMapUv:Gt&&p(_.transmissionMap.channel),thicknessMapUv:ee&&p(_.thicknessMap.channel),alphaMapUv:_t&&p(_.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(ye||pe),vertexNormals:!!I.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:w.isPoints===!0&&!!I.attributes.uv&&(ie||_t),fog:!!k,useFog:_.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||I.attributes.normal===void 0&&ye===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Ct,skinning:w.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:z,morphTextureStride:V,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:L.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&b.length>0,shadowMapType:n.shadowMap.type,toneMapping:nt,decodeVideoTexture:ie&&_.map.isVideoTexture===!0&&se.getTransfer(_.map.colorSpace)===me,decodeVideoTextureEmissive:B&&_.emissiveMap.isVideoTexture===!0&&se.getTransfer(_.emissiveMap.colorSpace)===me,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===ii,flipSided:_.side===un,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ft&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ft&&_.extensions.multiDraw===!0||Dt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Mt.vertexUv1s=c.has(1),Mt.vertexUv2s=c.has(2),Mt.vertexUv3s=c.has(3),c.clear(),Mt}function m(_){const S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(const b in _.defines)S.push(b),S.push(_.defines[b]);return _.isRawShaderMaterial===!1&&(h(S,_),v(S,_),S.push(n.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function h(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function v(_,S){o.disableAll(),S.instancing&&o.enable(0),S.instancingColor&&o.enable(1),S.instancingMorph&&o.enable(2),S.matcap&&o.enable(3),S.envMap&&o.enable(4),S.normalMapObjectSpace&&o.enable(5),S.normalMapTangentSpace&&o.enable(6),S.clearcoat&&o.enable(7),S.iridescence&&o.enable(8),S.alphaTest&&o.enable(9),S.vertexColors&&o.enable(10),S.vertexAlphas&&o.enable(11),S.vertexUv1s&&o.enable(12),S.vertexUv2s&&o.enable(13),S.vertexUv3s&&o.enable(14),S.vertexTangents&&o.enable(15),S.anisotropy&&o.enable(16),S.alphaHash&&o.enable(17),S.batching&&o.enable(18),S.dispersion&&o.enable(19),S.batchingColor&&o.enable(20),S.gradientMap&&o.enable(21),S.packedNormalMap&&o.enable(22),S.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),S.numLightProbeGrids>0&&o.enable(22),_.push(o.mask)}function T(_){const S=g[_.type];let b;if(S){const y=Wn[S];b=Mp.clone(y.uniforms)}else b=_.uniforms;return b}function A(_,S){let b=u.get(S);return b!==void 0?++b.usedTimes:(b=new j_(n,S,_,s),l.push(b),u.set(S,b)),b}function D(_){if(--_.usedTimes===0){const S=l.indexOf(_);l[S]=l[l.length-1],l.pop(),u.delete(_.cacheKey),_.destroy()}}function R(_){a.remove(_)}function P(){a.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:T,acquireProgram:A,releaseProgram:D,releaseShaderCache:R,programs:l,dispose:P}}function ex(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function nx(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Bu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function ku(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(d){let g=0;return d.isInstancedMesh&&(g+=2),d.isSkinnedMesh&&(g+=1),g}function a(d,g,p,x,m,h){let v=n[t];return v===void 0?(v={id:d.id,object:d,geometry:g,material:p,materialVariant:o(d),groupOrder:x,renderOrder:d.renderOrder,z:m,group:h},n[t]=v):(v.id=d.id,v.object=d,v.geometry=g,v.material=p,v.materialVariant=o(d),v.groupOrder=x,v.renderOrder=d.renderOrder,v.z=m,v.group=h),t++,v}function c(d,g,p,x,m,h){const v=a(d,g,p,x,m,h);p.transmission>0?i.push(v):p.transparent===!0?s.push(v):e.push(v)}function l(d,g,p,x,m,h){const v=a(d,g,p,x,m,h);p.transmission>0?i.unshift(v):p.transparent===!0?s.unshift(v):e.unshift(v)}function u(d,g){e.length>1&&e.sort(d||nx),i.length>1&&i.sort(g||Bu),s.length>1&&s.sort(g||Bu)}function f(){for(let d=t,g=n.length;d<g;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function ix(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new ku,n.set(i,[o])):s>=r.length?(o=new ku,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function sx(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new zt};break;case"SpotLight":e={position:new U,direction:new U,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new U,halfWidth:new U,halfHeight:new U};break}return n[t.id]=e,e}}}function rx(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let ox=0;function ax(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function lx(n){const t=new sx,e=rx(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new U);const s=new U,r=new ge,o=new ge;function a(l){let u=0,f=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let g=0,p=0,x=0,m=0,h=0,v=0,T=0,A=0,D=0,R=0,P=0;l.sort(ax);for(let S=0,b=l.length;S<b;S++){const y=l[S],w=y.color,L=y.intensity,k=y.distance;let I=null;if(y.shadow&&y.shadow.map&&(y.shadow.map.texture.format===Yi?I=y.shadow.map.texture:I=y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)u+=w.r*L,f+=w.g*L,d+=w.b*L;else if(y.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(y.sh.coefficients[G],L);P++}else if(y.isDirectionalLight){const G=t.get(y);if(G.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){const O=y.shadow,Q=e.get(y);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,i.directionalShadow[g]=Q,i.directionalShadowMap[g]=I,i.directionalShadowMatrix[g]=y.shadow.matrix,v++}i.directional[g]=G,g++}else if(y.isSpotLight){const G=t.get(y);G.position.setFromMatrixPosition(y.matrixWorld),G.color.copy(w).multiplyScalar(L),G.distance=k,G.coneCos=Math.cos(y.angle),G.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),G.decay=y.decay,i.spot[x]=G;const O=y.shadow;if(y.map&&(i.spotLightMap[D]=y.map,D++,O.updateMatrices(y),y.castShadow&&R++),i.spotLightMatrix[x]=O.matrix,y.castShadow){const Q=e.get(y);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,i.spotShadow[x]=Q,i.spotShadowMap[x]=I,A++}x++}else if(y.isRectAreaLight){const G=t.get(y);G.color.copy(w).multiplyScalar(L),G.halfWidth.set(y.width*.5,0,0),G.halfHeight.set(0,y.height*.5,0),i.rectArea[m]=G,m++}else if(y.isPointLight){const G=t.get(y);if(G.color.copy(y.color).multiplyScalar(y.intensity),G.distance=y.distance,G.decay=y.decay,y.castShadow){const O=y.shadow,Q=e.get(y);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,Q.shadowCameraNear=O.camera.near,Q.shadowCameraFar=O.camera.far,i.pointShadow[p]=Q,i.pointShadowMap[p]=I,i.pointShadowMatrix[p]=y.shadow.matrix,T++}i.point[p]=G,p++}else if(y.isHemisphereLight){const G=t.get(y);G.skyColor.copy(y.color).multiplyScalar(L),G.groundColor.copy(y.groundColor).multiplyScalar(L),i.hemi[h]=G,h++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Tt.LTC_FLOAT_1,i.rectAreaLTC2=Tt.LTC_FLOAT_2):(i.rectAreaLTC1=Tt.LTC_HALF_1,i.rectAreaLTC2=Tt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const _=i.hash;(_.directionalLength!==g||_.pointLength!==p||_.spotLength!==x||_.rectAreaLength!==m||_.hemiLength!==h||_.numDirectionalShadows!==v||_.numPointShadows!==T||_.numSpotShadows!==A||_.numSpotMaps!==D||_.numLightProbes!==P)&&(i.directional.length=g,i.spot.length=x,i.rectArea.length=m,i.point.length=p,i.hemi.length=h,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=A+D-R,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=P,_.directionalLength=g,_.pointLength=p,_.spotLength=x,_.rectAreaLength=m,_.hemiLength=h,_.numDirectionalShadows=v,_.numPointShadows=T,_.numSpotShadows=A,_.numSpotMaps=D,_.numLightProbes=P,i.version=ox++)}function c(l,u){let f=0,d=0,g=0,p=0,x=0;const m=u.matrixWorldInverse;for(let h=0,v=l.length;h<v;h++){const T=l[h];if(T.isDirectionalLight){const A=i.directional[f];A.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),f++}else if(T.isSpotLight){const A=i.spot[g];A.position.setFromMatrixPosition(T.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),g++}else if(T.isRectAreaLight){const A=i.rectArea[p];A.position.setFromMatrixPosition(T.matrixWorld),A.position.applyMatrix4(m),o.identity(),r.copy(T.matrixWorld),r.premultiply(m),o.extractRotation(r),A.halfWidth.set(T.width*.5,0,0),A.halfHeight.set(0,T.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),p++}else if(T.isPointLight){const A=i.point[d];A.position.setFromMatrixPosition(T.matrixWorld),A.position.applyMatrix4(m),d++}else if(T.isHemisphereLight){const A=i.hemi[x];A.direction.setFromMatrixPosition(T.matrixWorld),A.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:i}}function Hu(n){const t=new lx(n),e=[],i=[],s=[];function r(d){f.camera=d,e.length=0,i.length=0,s.length=0}function o(d){e.push(d)}function a(d){i.push(d)}function c(d){s.push(d)}function l(){t.setup(e)}function u(d){t.setupView(e,d)}const f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function cx(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Hu(n),t.set(s,[a])):r>=o.length?(a=new Hu(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const ux=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dx=`uniform sampler2D shadow_pass;
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
}`,hx=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],fx=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Gu=new ge,Zs=new U,Sa=new U;function px(n,t,e){let i=new tc;const s=new Ft,r=new Ft,o=new Oe,a=new Tp,c=new wp,l={},u=e.maxTextureSize,f={[Ci]:un,[un]:Ci,[ii]:ii},d=new jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ft},radius:{value:4}},vertexShader:ux,fragmentShader:dx}),g=d.clone();g.defines.HORIZONTAL_PASS=1;const p=new on;p.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Xt(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Es;let h=this.type;this.render=function(R,P,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;this.type===Zh&&(Ht("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Es);const S=n.getRenderTarget(),b=n.getActiveCubeFace(),y=n.getActiveMipmapLevel(),w=n.state;w.setBlending(ri),w.buffers.depth.getReversed()===!0?w.buffers.color.setClear(0,0,0,0):w.buffers.color.setClear(1,1,1,1),w.buffers.depth.setTest(!0),w.setScissorTest(!1);const L=h!==this.type;L&&P.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach(I=>I.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,I=R.length;k<I;k++){const G=R[k],O=G.shadow;if(O===void 0){Ht("WebGLShadowMap:",G,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const Q=O.getFrameExtents();s.multiply(Q),r.copy(O.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Q.x),s.x=r.x*Q.x,O.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Q.y),s.y=r.y*Q.y,O.mapSize.y=r.y));const rt=n.state.buffers.depth.getReversed();if(O.camera._reversedDepth=rt,O.map===null||L===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===tr){if(G.isPointLight){Ht("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new qn(s.x,s.y,{format:Yi,type:ci,minFilter:nn,magFilter:nn,generateMipmaps:!1}),O.map.texture.name=G.name+".shadowMap",O.map.depthTexture=new Cs(s.x,s.y,On),O.map.depthTexture.name=G.name+".shadowMapDepth",O.map.depthTexture.format=ui,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ke,O.map.depthTexture.magFilter=Ke}else G.isPointLight?(O.map=new sh(s.x),O.map.depthTexture=new xp(s.x,Yn)):(O.map=new qn(s.x,s.y),O.map.depthTexture=new Cs(s.x,s.y,Yn)),O.map.depthTexture.name=G.name+".shadowMap",O.map.depthTexture.format=ui,this.type===Es?(O.map.depthTexture.compareFunction=rt?Yl:ql,O.map.depthTexture.minFilter=nn,O.map.depthTexture.magFilter=nn):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ke,O.map.depthTexture.magFilter=Ke);O.camera.updateProjectionMatrix()}const mt=O.map.isWebGLCubeRenderTarget?6:1;for(let vt=0;vt<mt;vt++){if(O.map.isWebGLCubeRenderTarget)n.setRenderTarget(O.map,vt),n.clear();else{vt===0&&(n.setRenderTarget(O.map),n.clear());const z=O.getViewport(vt);o.set(r.x*z.x,r.y*z.y,r.x*z.z,r.y*z.w),w.viewport(o)}if(G.isPointLight){const z=O.camera,V=O.matrix,q=G.distance||z.far;q!==z.far&&(z.far=q,z.updateProjectionMatrix()),Zs.setFromMatrixPosition(G.matrixWorld),z.position.copy(Zs),Sa.copy(z.position),Sa.add(hx[vt]),z.up.copy(fx[vt]),z.lookAt(Sa),z.updateMatrixWorld(),V.makeTranslation(-Zs.x,-Zs.y,-Zs.z),Gu.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),O._frustum.setFromProjectionMatrix(Gu,z.coordinateSystem,z.reversedDepth)}else O.updateMatrices(G);i=O.getFrustum(),A(P,_,O.camera,G,this.type)}O.isPointLightShadow!==!0&&this.type===tr&&v(O,_),O.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(S,b,y)};function v(R,P){const _=t.update(x);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,g.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new qn(s.x,s.y,{format:Yi,type:ci})),d.uniforms.shadow_pass.value=R.map.depthTexture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(P,null,_,d,x,null),g.uniforms.shadow_pass.value=R.mapPass.texture,g.uniforms.resolution.value=R.mapSize,g.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(P,null,_,g,x,null)}function T(R,P,_,S){let b=null;const y=_.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(y!==void 0)b=y;else if(b=_.isPointLight===!0?c:a,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const w=b.uuid,L=P.uuid;let k=l[w];k===void 0&&(k={},l[w]=k);let I=k[L];I===void 0&&(I=b.clone(),k[L]=I,P.addEventListener("dispose",D)),b=I}if(b.visible=P.visible,b.wireframe=P.wireframe,S===tr?b.side=P.shadowSide!==null?P.shadowSide:P.side:b.side=P.shadowSide!==null?P.shadowSide:f[P.side],b.alphaMap=P.alphaMap,b.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,b.map=P.map,b.clipShadows=P.clipShadows,b.clippingPlanes=P.clippingPlanes,b.clipIntersection=P.clipIntersection,b.displacementMap=P.displacementMap,b.displacementScale=P.displacementScale,b.displacementBias=P.displacementBias,b.wireframeLinewidth=P.wireframeLinewidth,b.linewidth=P.linewidth,_.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const w=n.properties.get(b);w.light=_}return b}function A(R,P,_,S,b){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&b===tr)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,R.matrixWorld);const L=t.update(R),k=R.material;if(Array.isArray(k)){const I=L.groups;for(let G=0,O=I.length;G<O;G++){const Q=I[G],rt=k[Q.materialIndex];if(rt&&rt.visible){const mt=T(R,rt,S,b);R.onBeforeShadow(n,R,P,_,L,mt,Q),n.renderBufferDirect(_,null,L,mt,R,Q),R.onAfterShadow(n,R,P,_,L,mt,Q)}}}else if(k.visible){const I=T(R,k,S,b);R.onBeforeShadow(n,R,P,_,L,I,null),n.renderBufferDirect(_,null,L,I,R,null),R.onAfterShadow(n,R,P,_,L,I,null)}}const w=R.children;for(let L=0,k=w.length;L<k;L++)A(w[L],P,_,S,b)}function D(R){R.target.removeEventListener("dispose",D);for(const _ in l){const S=l[_],b=R.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}function mx(n,t){function e(){let F=!1;const _t=new Oe;let ot=null;const St=new Oe(0,0,0,0);return{setMask:function(ft){ot!==ft&&!F&&(n.colorMask(ft,ft,ft,ft),ot=ft)},setLocked:function(ft){F=ft},setClear:function(ft,nt,Mt,kt,Ee){Ee===!0&&(ft*=kt,nt*=kt,Mt*=kt),_t.set(ft,nt,Mt,kt),St.equals(_t)===!1&&(n.clearColor(ft,nt,Mt,kt),St.copy(_t))},reset:function(){F=!1,ot=null,St.set(-1,0,0,0)}}}function i(){let F=!1,_t=!1,ot=null,St=null,ft=null;return{setReversed:function(nt){if(_t!==nt){const Mt=t.get("EXT_clip_control");nt?Mt.clipControlEXT(Mt.LOWER_LEFT_EXT,Mt.ZERO_TO_ONE_EXT):Mt.clipControlEXT(Mt.LOWER_LEFT_EXT,Mt.NEGATIVE_ONE_TO_ONE_EXT),_t=nt;const kt=ft;ft=null,this.setClear(kt)}},getReversed:function(){return _t},setTest:function(nt){nt?ct(n.DEPTH_TEST):Ct(n.DEPTH_TEST)},setMask:function(nt){ot!==nt&&!F&&(n.depthMask(nt),ot=nt)},setFunc:function(nt){if(_t&&(nt=Lf[nt]),St!==nt){switch(nt){case ka:n.depthFunc(n.NEVER);break;case Ha:n.depthFunc(n.ALWAYS);break;case Ga:n.depthFunc(n.LESS);break;case As:n.depthFunc(n.LEQUAL);break;case Va:n.depthFunc(n.EQUAL);break;case Wa:n.depthFunc(n.GEQUAL);break;case Xa:n.depthFunc(n.GREATER);break;case $a:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}St=nt}},setLocked:function(nt){F=nt},setClear:function(nt){ft!==nt&&(ft=nt,_t&&(nt=1-nt),n.clearDepth(nt))},reset:function(){F=!1,ot=null,St=null,ft=null,_t=!1}}}function s(){let F=!1,_t=null,ot=null,St=null,ft=null,nt=null,Mt=null,kt=null,Ee=null;return{setTest:function(ce){F||(ce?ct(n.STENCIL_TEST):Ct(n.STENCIL_TEST))},setMask:function(ce){_t!==ce&&!F&&(n.stencilMask(ce),_t=ce)},setFunc:function(ce,Ln,Ae){(ot!==ce||St!==Ln||ft!==Ae)&&(n.stencilFunc(ce,Ln,Ae),ot=ce,St=Ln,ft=Ae)},setOp:function(ce,Ln,Ae){(nt!==ce||Mt!==Ln||kt!==Ae)&&(n.stencilOp(ce,Ln,Ae),nt=ce,Mt=Ln,kt=Ae)},setLocked:function(ce){F=ce},setClear:function(ce){Ee!==ce&&(n.clearStencil(ce),Ee=ce)},reset:function(){F=!1,_t=null,ot=null,St=null,ft=null,nt=null,Mt=null,kt=null,Ee=null}}}const r=new e,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let u={},f={},d={},g=new WeakMap,p=[],x=null,m=!1,h=null,v=null,T=null,A=null,D=null,R=null,P=null,_=new zt(0,0,0),S=0,b=!1,y=null,w=null,L=null,k=null,I=null;const G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,Q=0;const rt=n.getParameter(n.VERSION);rt.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(rt)[1]),O=Q>=1):rt.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(rt)[1]),O=Q>=2);let mt=null,vt={};const z=n.getParameter(n.SCISSOR_BOX),V=n.getParameter(n.VIEWPORT),q=new Oe().fromArray(z),et=new Oe().fromArray(V);function j(F,_t,ot,St){const ft=new Uint8Array(4),nt=n.createTexture();n.bindTexture(F,nt),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Mt=0;Mt<ot;Mt++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(_t,0,n.RGBA,1,1,St,0,n.RGBA,n.UNSIGNED_BYTE,ft):n.texImage2D(_t+Mt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ft);return nt}const dt={};dt[n.TEXTURE_2D]=j(n.TEXTURE_2D,n.TEXTURE_2D,1),dt[n.TEXTURE_CUBE_MAP]=j(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),dt[n.TEXTURE_2D_ARRAY]=j(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),dt[n.TEXTURE_3D]=j(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ct(n.DEPTH_TEST),o.setFunc(As),Pe(!1),ye(Uc),ct(n.CULL_FACE),he(ri);function ct(F){u[F]!==!0&&(n.enable(F),u[F]=!0)}function Ct(F){u[F]!==!1&&(n.disable(F),u[F]=!1)}function It(F,_t){return d[F]!==_t?(n.bindFramebuffer(F,_t),d[F]=_t,F===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=_t),F===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=_t),!0):!1}function Dt(F,_t){let ot=p,St=!1;if(F){ot=g.get(_t),ot===void 0&&(ot=[],g.set(_t,ot));const ft=F.textures;if(ot.length!==ft.length||ot[0]!==n.COLOR_ATTACHMENT0){for(let nt=0,Mt=ft.length;nt<Mt;nt++)ot[nt]=n.COLOR_ATTACHMENT0+nt;ot.length=ft.length,St=!0}}else ot[0]!==n.BACK&&(ot[0]=n.BACK,St=!0);St&&n.drawBuffers(ot)}function ie(F){return x!==F?(n.useProgram(F),x=F,!0):!1}const $t={[ki]:n.FUNC_ADD,[Qh]:n.FUNC_SUBTRACT,[tf]:n.FUNC_REVERSE_SUBTRACT};$t[ef]=n.MIN,$t[nf]=n.MAX;const le={[sf]:n.ZERO,[rf]:n.ONE,[of]:n.SRC_COLOR,[za]:n.SRC_ALPHA,[hf]:n.SRC_ALPHA_SATURATE,[uf]:n.DST_COLOR,[lf]:n.DST_ALPHA,[af]:n.ONE_MINUS_SRC_COLOR,[Ba]:n.ONE_MINUS_SRC_ALPHA,[df]:n.ONE_MINUS_DST_COLOR,[cf]:n.ONE_MINUS_DST_ALPHA,[ff]:n.CONSTANT_COLOR,[pf]:n.ONE_MINUS_CONSTANT_COLOR,[mf]:n.CONSTANT_ALPHA,[gf]:n.ONE_MINUS_CONSTANT_ALPHA};function he(F,_t,ot,St,ft,nt,Mt,kt,Ee,ce){if(F===ri){m===!0&&(Ct(n.BLEND),m=!1);return}if(m===!1&&(ct(n.BLEND),m=!0),F!==Jh){if(F!==h||ce!==b){if((v!==ki||D!==ki)&&(n.blendEquation(n.FUNC_ADD),v=ki,D=ki),ce)switch(F){case Ts:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Oc:n.blendFunc(n.ONE,n.ONE);break;case Fc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:oe("WebGLState: Invalid blending: ",F);break}else switch(F){case Ts:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Oc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Fc:oe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zc:oe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:oe("WebGLState: Invalid blending: ",F);break}T=null,A=null,R=null,P=null,_.set(0,0,0),S=0,h=F,b=ce}return}ft=ft||_t,nt=nt||ot,Mt=Mt||St,(_t!==v||ft!==D)&&(n.blendEquationSeparate($t[_t],$t[ft]),v=_t,D=ft),(ot!==T||St!==A||nt!==R||Mt!==P)&&(n.blendFuncSeparate(le[ot],le[St],le[nt],le[Mt]),T=ot,A=St,R=nt,P=Mt),(kt.equals(_)===!1||Ee!==S)&&(n.blendColor(kt.r,kt.g,kt.b,Ee),_.copy(kt),S=Ee),h=F,b=!1}function Wt(F,_t){F.side===ii?Ct(n.CULL_FACE):ct(n.CULL_FACE);let ot=F.side===un;_t&&(ot=!ot),Pe(ot),F.blending===Ts&&F.transparent===!1?he(ri):he(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);const St=F.stencilWrite;a.setTest(St),St&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),B(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ct(n.SAMPLE_ALPHA_TO_COVERAGE):Ct(n.SAMPLE_ALPHA_TO_COVERAGE)}function Pe(F){y!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),y=F)}function ye(F){F!==jh?(ct(n.CULL_FACE),F!==w&&(F===Uc?n.cullFace(n.BACK):F===Kh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ct(n.CULL_FACE),w=F}function Je(F){F!==L&&(O&&n.lineWidth(F),L=F)}function B(F,_t,ot){F?(ct(n.POLYGON_OFFSET_FILL),(k!==_t||I!==ot)&&(k=_t,I=ot,o.getReversed()&&(_t=-_t),n.polygonOffset(_t,ot))):Ct(n.POLYGON_OFFSET_FILL)}function Ie(F){F?ct(n.SCISSOR_TEST):Ct(n.SCISSOR_TEST)}function Zt(F){F===void 0&&(F=n.TEXTURE0+G-1),mt!==F&&(n.activeTexture(F),mt=F)}function pe(F,_t,ot){ot===void 0&&(mt===null?ot=n.TEXTURE0+G-1:ot=mt);let St=vt[ot];St===void 0&&(St={type:void 0,texture:void 0},vt[ot]=St),(St.type!==F||St.texture!==_t)&&(mt!==ot&&(n.activeTexture(ot),mt=ot),n.bindTexture(F,_t||dt[F]),St.type=F,St.texture=_t)}function yt(){const F=vt[mt];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function _e(){try{n.compressedTexImage2D(...arguments)}catch(F){oe("WebGLState:",F)}}function C(){try{n.compressedTexImage3D(...arguments)}catch(F){oe("WebGLState:",F)}}function M(){try{n.texSubImage2D(...arguments)}catch(F){oe("WebGLState:",F)}}function X(){try{n.texSubImage3D(...arguments)}catch(F){oe("WebGLState:",F)}}function N(){try{n.compressedTexSubImage2D(...arguments)}catch(F){oe("WebGLState:",F)}}function J(){try{n.compressedTexSubImage3D(...arguments)}catch(F){oe("WebGLState:",F)}}function $(){try{n.texStorage2D(...arguments)}catch(F){oe("WebGLState:",F)}}function ut(){try{n.texStorage3D(...arguments)}catch(F){oe("WebGLState:",F)}}function Z(){try{n.texImage2D(...arguments)}catch(F){oe("WebGLState:",F)}}function st(){try{n.texImage3D(...arguments)}catch(F){oe("WebGLState:",F)}}function ht(F){return f[F]!==void 0?f[F]:n.getParameter(F)}function bt(F,_t){f[F]!==_t&&(n.pixelStorei(F,_t),f[F]=_t)}function gt(F){q.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),q.copy(F))}function pt(F){et.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),et.copy(F))}function Bt(F,_t){let ot=l.get(_t);ot===void 0&&(ot=new WeakMap,l.set(_t,ot));let St=ot.get(F);St===void 0&&(St=n.getUniformBlockIndex(_t,F.name),ot.set(F,St))}function Gt(F,_t){const St=l.get(_t).get(F);c.get(_t)!==St&&(n.uniformBlockBinding(_t,St,F.__bindingPointIndex),c.set(_t,St))}function ee(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},mt=null,vt={},d={},g=new WeakMap,p=[],x=null,m=!1,h=null,v=null,T=null,A=null,D=null,R=null,P=null,_=new zt(0,0,0),S=0,b=!1,y=null,w=null,L=null,k=null,I=null,q.set(0,0,n.canvas.width,n.canvas.height),et.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ct,disable:Ct,bindFramebuffer:It,drawBuffers:Dt,useProgram:ie,setBlending:he,setMaterial:Wt,setFlipSided:Pe,setCullFace:ye,setLineWidth:Je,setPolygonOffset:B,setScissorTest:Ie,activeTexture:Zt,bindTexture:pe,unbindTexture:yt,compressedTexImage2D:_e,compressedTexImage3D:C,texImage2D:Z,texImage3D:st,pixelStorei:bt,getParameter:ht,updateUBOMapping:Bt,uniformBlockBinding:Gt,texStorage2D:$,texStorage3D:ut,texSubImage2D:M,texSubImage3D:X,compressedTexSubImage2D:N,compressedTexSubImage3D:J,scissor:gt,viewport:pt,reset:ee}}function gx(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ft,u=new WeakMap,f=new Set;let d;const g=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(C,M){return p?new OffscreenCanvas(C,M):So("canvas")}function m(C,M,X){let N=1;const J=_e(C);if((J.width>X||J.height>X)&&(N=X/Math.max(J.width,J.height)),N<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const $=Math.floor(N*J.width),ut=Math.floor(N*J.height);d===void 0&&(d=x($,ut));const Z=M?x($,ut):d;return Z.width=$,Z.height=ut,Z.getContext("2d").drawImage(C,0,0,$,ut),Ht("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+$+"x"+ut+")."),Z}else return"data"in C&&Ht("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),C;return C}function h(C){return C.generateMipmaps}function v(C){n.generateMipmap(C)}function T(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function A(C,M,X,N,J,$=!1){if(C!==null){if(n[C]!==void 0)return n[C];Ht("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ut;N&&(ut=t.get("EXT_texture_norm16"),ut||Ht("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=M;if(M===n.RED&&(X===n.FLOAT&&(Z=n.R32F),X===n.HALF_FLOAT&&(Z=n.R16F),X===n.UNSIGNED_BYTE&&(Z=n.R8),X===n.UNSIGNED_SHORT&&ut&&(Z=ut.R16_EXT),X===n.SHORT&&ut&&(Z=ut.R16_SNORM_EXT)),M===n.RED_INTEGER&&(X===n.UNSIGNED_BYTE&&(Z=n.R8UI),X===n.UNSIGNED_SHORT&&(Z=n.R16UI),X===n.UNSIGNED_INT&&(Z=n.R32UI),X===n.BYTE&&(Z=n.R8I),X===n.SHORT&&(Z=n.R16I),X===n.INT&&(Z=n.R32I)),M===n.RG&&(X===n.FLOAT&&(Z=n.RG32F),X===n.HALF_FLOAT&&(Z=n.RG16F),X===n.UNSIGNED_BYTE&&(Z=n.RG8),X===n.UNSIGNED_SHORT&&ut&&(Z=ut.RG16_EXT),X===n.SHORT&&ut&&(Z=ut.RG16_SNORM_EXT)),M===n.RG_INTEGER&&(X===n.UNSIGNED_BYTE&&(Z=n.RG8UI),X===n.UNSIGNED_SHORT&&(Z=n.RG16UI),X===n.UNSIGNED_INT&&(Z=n.RG32UI),X===n.BYTE&&(Z=n.RG8I),X===n.SHORT&&(Z=n.RG16I),X===n.INT&&(Z=n.RG32I)),M===n.RGB_INTEGER&&(X===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),X===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),X===n.UNSIGNED_INT&&(Z=n.RGB32UI),X===n.BYTE&&(Z=n.RGB8I),X===n.SHORT&&(Z=n.RGB16I),X===n.INT&&(Z=n.RGB32I)),M===n.RGBA_INTEGER&&(X===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),X===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),X===n.UNSIGNED_INT&&(Z=n.RGBA32UI),X===n.BYTE&&(Z=n.RGBA8I),X===n.SHORT&&(Z=n.RGBA16I),X===n.INT&&(Z=n.RGBA32I)),M===n.RGB&&(X===n.UNSIGNED_SHORT&&ut&&(Z=ut.RGB16_EXT),X===n.SHORT&&ut&&(Z=ut.RGB16_SNORM_EXT),X===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),X===n.UNSIGNED_INT_10F_11F_11F_REV&&(Z=n.R11F_G11F_B10F)),M===n.RGBA){const st=$?yo:se.getTransfer(J);X===n.FLOAT&&(Z=n.RGBA32F),X===n.HALF_FLOAT&&(Z=n.RGBA16F),X===n.UNSIGNED_BYTE&&(Z=st===me?n.SRGB8_ALPHA8:n.RGBA8),X===n.UNSIGNED_SHORT&&ut&&(Z=ut.RGBA16_EXT),X===n.SHORT&&ut&&(Z=ut.RGBA16_SNORM_EXT),X===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),X===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function D(C,M){let X;return C?M===null||M===Yn||M===dr?X=n.DEPTH24_STENCIL8:M===On?X=n.DEPTH32F_STENCIL8:M===ur&&(X=n.DEPTH24_STENCIL8,Ht("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Yn||M===dr?X=n.DEPTH_COMPONENT24:M===On?X=n.DEPTH_COMPONENT32F:M===ur&&(X=n.DEPTH_COMPONENT16),X}function R(C,M){return h(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ke&&C.minFilter!==nn?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function P(C){const M=C.target;M.removeEventListener("dispose",P),S(M),M.isVideoTexture&&u.delete(M),M.isHTMLTexture&&f.delete(M)}function _(C){const M=C.target;M.removeEventListener("dispose",_),y(M)}function S(C){const M=i.get(C);if(M.__webglInit===void 0)return;const X=C.source,N=g.get(X);if(N){const J=N[M.__cacheKey];J.usedTimes--,J.usedTimes===0&&b(C),Object.keys(N).length===0&&g.delete(X)}i.remove(C)}function b(C){const M=i.get(C);n.deleteTexture(M.__webglTexture);const X=C.source,N=g.get(X);delete N[M.__cacheKey],o.memory.textures--}function y(C){const M=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let N=0;N<6;N++){if(Array.isArray(M.__webglFramebuffer[N]))for(let J=0;J<M.__webglFramebuffer[N].length;J++)n.deleteFramebuffer(M.__webglFramebuffer[N][J]);else n.deleteFramebuffer(M.__webglFramebuffer[N]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[N])}else{if(Array.isArray(M.__webglFramebuffer))for(let N=0;N<M.__webglFramebuffer.length;N++)n.deleteFramebuffer(M.__webglFramebuffer[N]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let N=0;N<M.__webglColorRenderbuffer.length;N++)M.__webglColorRenderbuffer[N]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[N]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const X=C.textures;for(let N=0,J=X.length;N<J;N++){const $=i.get(X[N]);$.__webglTexture&&(n.deleteTexture($.__webglTexture),o.memory.textures--),i.remove(X[N])}i.remove(C)}let w=0;function L(){w=0}function k(){return w}function I(C){w=C}function G(){const C=w;return C>=s.maxTextures&&Ht("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),w+=1,C}function O(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function Q(C,M){const X=i.get(C);if(C.isVideoTexture&&pe(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&X.__version!==C.version){const N=C.image;if(N===null)Ht("WebGLRenderer: Texture marked for update but no image data found.");else if(N.complete===!1)Ht("WebGLRenderer: Texture marked for update but image is incomplete");else{Ct(X,C,M);return}}else C.isExternalTexture&&(X.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,X.__webglTexture,n.TEXTURE0+M)}function rt(C,M){const X=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&X.__version!==C.version){Ct(X,C,M);return}else C.isExternalTexture&&(X.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,X.__webglTexture,n.TEXTURE0+M)}function mt(C,M){const X=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&X.__version!==C.version){Ct(X,C,M);return}e.bindTexture(n.TEXTURE_3D,X.__webglTexture,n.TEXTURE0+M)}function vt(C,M){const X=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&X.__version!==C.version){It(X,C,M);return}e.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture,n.TEXTURE0+M)}const z={[cr]:n.REPEAT,[si]:n.CLAMP_TO_EDGE,[qa]:n.MIRRORED_REPEAT},V={[Ke]:n.NEAREST,[vf]:n.NEAREST_MIPMAP_NEAREST,[wr]:n.NEAREST_MIPMAP_LINEAR,[nn]:n.LINEAR,[qo]:n.LINEAR_MIPMAP_NEAREST,[Gi]:n.LINEAR_MIPMAP_LINEAR},q={[yf]:n.NEVER,[Af]:n.ALWAYS,[Sf]:n.LESS,[ql]:n.LEQUAL,[Ef]:n.EQUAL,[Yl]:n.GEQUAL,[Tf]:n.GREATER,[wf]:n.NOTEQUAL};function et(C,M){if(M.type===On&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===nn||M.magFilter===qo||M.magFilter===wr||M.magFilter===Gi||M.minFilter===nn||M.minFilter===qo||M.minFilter===wr||M.minFilter===Gi)&&Ht("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,z[M.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,z[M.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,z[M.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,V[M.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,V[M.minFilter]),M.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,q[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ke||M.minFilter!==wr&&M.minFilter!==Gi||M.type===On&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const X=t.get("EXT_texture_filter_anisotropic");n.texParameterf(C,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function j(C,M){let X=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",P));const N=M.source;let J=g.get(N);J===void 0&&(J={},g.set(N,J));const $=O(M);if($!==C.__cacheKey){J[$]===void 0&&(J[$]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,X=!0),J[$].usedTimes++;const ut=J[C.__cacheKey];ut!==void 0&&(J[C.__cacheKey].usedTimes--,ut.usedTimes===0&&b(M)),C.__cacheKey=$,C.__webglTexture=J[$].texture}return X}function dt(C,M,X){return Math.floor(Math.floor(C/X)/M)}function ct(C,M,X,N){const $=C.updateRanges;if($.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,M.width,M.height,X,N,M.data);else{$.sort((bt,gt)=>bt.start-gt.start);let ut=0;for(let bt=1;bt<$.length;bt++){const gt=$[ut],pt=$[bt],Bt=gt.start+gt.count,Gt=dt(pt.start,M.width,4),ee=dt(gt.start,M.width,4);pt.start<=Bt+1&&Gt===ee&&dt(pt.start+pt.count-1,M.width,4)===Gt?gt.count=Math.max(gt.count,pt.start+pt.count-gt.start):(++ut,$[ut]=pt)}$.length=ut+1;const Z=e.getParameter(n.UNPACK_ROW_LENGTH),st=e.getParameter(n.UNPACK_SKIP_PIXELS),ht=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,M.width);for(let bt=0,gt=$.length;bt<gt;bt++){const pt=$[bt],Bt=Math.floor(pt.start/4),Gt=Math.ceil(pt.count/4),ee=Bt%M.width,F=Math.floor(Bt/M.width),_t=Gt,ot=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,ee),e.pixelStorei(n.UNPACK_SKIP_ROWS,F),e.texSubImage2D(n.TEXTURE_2D,0,ee,F,_t,ot,X,N,M.data)}C.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Z),e.pixelStorei(n.UNPACK_SKIP_PIXELS,st),e.pixelStorei(n.UNPACK_SKIP_ROWS,ht)}}function Ct(C,M,X){let N=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(N=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(N=n.TEXTURE_3D);const J=j(C,M),$=M.source;e.bindTexture(N,C.__webglTexture,n.TEXTURE0+X);const ut=i.get($);if($.version!==ut.__version||J===!0){if(e.activeTexture(n.TEXTURE0+X),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const ot=se.getPrimaries(se.workingColorSpace),St=M.colorSpace===Ei?null:se.getPrimaries(M.colorSpace),ft=M.colorSpace===Ei||ot===St?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft)}e.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment);let st=m(M.image,!1,s.maxTextureSize);st=yt(M,st);const ht=r.convert(M.format,M.colorSpace),bt=r.convert(M.type);let gt=A(M.internalFormat,ht,bt,M.normalized,M.colorSpace,M.isVideoTexture);et(N,M);let pt;const Bt=M.mipmaps,Gt=M.isVideoTexture!==!0,ee=ut.__version===void 0||J===!0,F=$.dataReady,_t=R(M,st);if(M.isDepthTexture)gt=D(M.format===Vi,M.type),ee&&(Gt?e.texStorage2D(n.TEXTURE_2D,1,gt,st.width,st.height):e.texImage2D(n.TEXTURE_2D,0,gt,st.width,st.height,0,ht,bt,null));else if(M.isDataTexture)if(Bt.length>0){Gt&&ee&&e.texStorage2D(n.TEXTURE_2D,_t,gt,Bt[0].width,Bt[0].height);for(let ot=0,St=Bt.length;ot<St;ot++)pt=Bt[ot],Gt?F&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,pt.width,pt.height,ht,bt,pt.data):e.texImage2D(n.TEXTURE_2D,ot,gt,pt.width,pt.height,0,ht,bt,pt.data);M.generateMipmaps=!1}else Gt?(ee&&e.texStorage2D(n.TEXTURE_2D,_t,gt,st.width,st.height),F&&ct(M,st,ht,bt)):e.texImage2D(n.TEXTURE_2D,0,gt,st.width,st.height,0,ht,bt,st.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Gt&&ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,_t,gt,Bt[0].width,Bt[0].height,st.depth);for(let ot=0,St=Bt.length;ot<St;ot++)if(pt=Bt[ot],M.format!==Fn)if(ht!==null)if(Gt){if(F)if(M.layerUpdates.size>0){const ft=Mu(pt.width,pt.height,M.format,M.type);for(const nt of M.layerUpdates){const Mt=pt.data.subarray(nt*ft/pt.data.BYTES_PER_ELEMENT,(nt+1)*ft/pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,nt,pt.width,pt.height,1,ht,Mt)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,pt.width,pt.height,st.depth,ht,pt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ot,gt,pt.width,pt.height,st.depth,0,pt.data,0,0);else Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?F&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,pt.width,pt.height,st.depth,ht,bt,pt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,ot,gt,pt.width,pt.height,st.depth,0,ht,bt,pt.data)}else{Gt&&ee&&e.texStorage2D(n.TEXTURE_2D,_t,gt,Bt[0].width,Bt[0].height);for(let ot=0,St=Bt.length;ot<St;ot++)pt=Bt[ot],M.format!==Fn?ht!==null?Gt?F&&e.compressedTexSubImage2D(n.TEXTURE_2D,ot,0,0,pt.width,pt.height,ht,pt.data):e.compressedTexImage2D(n.TEXTURE_2D,ot,gt,pt.width,pt.height,0,pt.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?F&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,pt.width,pt.height,ht,bt,pt.data):e.texImage2D(n.TEXTURE_2D,ot,gt,pt.width,pt.height,0,ht,bt,pt.data)}else if(M.isDataArrayTexture)if(Gt){if(ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,_t,gt,st.width,st.height,st.depth),F)if(M.layerUpdates.size>0){const ot=Mu(st.width,st.height,M.format,M.type);for(const St of M.layerUpdates){const ft=st.data.subarray(St*ot/st.data.BYTES_PER_ELEMENT,(St+1)*ot/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,St,st.width,st.height,1,ht,bt,ft)}M.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,ht,bt,st.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,gt,st.width,st.height,st.depth,0,ht,bt,st.data);else if(M.isData3DTexture)Gt?(ee&&e.texStorage3D(n.TEXTURE_3D,_t,gt,st.width,st.height,st.depth),F&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,ht,bt,st.data)):e.texImage3D(n.TEXTURE_3D,0,gt,st.width,st.height,st.depth,0,ht,bt,st.data);else if(M.isFramebufferTexture){if(ee)if(Gt)e.texStorage2D(n.TEXTURE_2D,_t,gt,st.width,st.height);else{let ot=st.width,St=st.height;for(let ft=0;ft<_t;ft++)e.texImage2D(n.TEXTURE_2D,ft,gt,ot,St,0,ht,bt,null),ot>>=1,St>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in n){const ot=n.canvas;if(ot.hasAttribute("layoutsubtree")||ot.setAttribute("layoutsubtree","true"),st.parentNode!==ot){ot.appendChild(st),f.add(M),ot.onpaint=kt=>{const Ee=kt.changedElements;for(const ce of f)Ee.includes(ce.image)&&(ce.needsUpdate=!0)},ot.requestPaint();return}const St=0,ft=n.RGBA,nt=n.RGBA,Mt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,St,ft,nt,Mt,st),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Bt.length>0){if(Gt&&ee){const ot=_e(Bt[0]);e.texStorage2D(n.TEXTURE_2D,_t,gt,ot.width,ot.height)}for(let ot=0,St=Bt.length;ot<St;ot++)pt=Bt[ot],Gt?F&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,ht,bt,pt):e.texImage2D(n.TEXTURE_2D,ot,gt,ht,bt,pt);M.generateMipmaps=!1}else if(Gt){if(ee){const ot=_e(st);e.texStorage2D(n.TEXTURE_2D,_t,gt,ot.width,ot.height)}F&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ht,bt,st)}else e.texImage2D(n.TEXTURE_2D,0,gt,ht,bt,st);h(M)&&v(N),ut.__version=$.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function It(C,M,X){if(M.image.length!==6)return;const N=j(C,M),J=M.source;e.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+X);const $=i.get(J);if(J.version!==$.__version||N===!0){e.activeTexture(n.TEXTURE0+X);const ut=se.getPrimaries(se.workingColorSpace),Z=M.colorSpace===Ei?null:se.getPrimaries(M.colorSpace),st=M.colorSpace===Ei||ut===Z?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,st);const ht=M.isCompressedTexture||M.image[0].isCompressedTexture,bt=M.image[0]&&M.image[0].isDataTexture,gt=[];for(let nt=0;nt<6;nt++)!ht&&!bt?gt[nt]=m(M.image[nt],!0,s.maxCubemapSize):gt[nt]=bt?M.image[nt].image:M.image[nt],gt[nt]=yt(M,gt[nt]);const pt=gt[0],Bt=r.convert(M.format,M.colorSpace),Gt=r.convert(M.type),ee=A(M.internalFormat,Bt,Gt,M.normalized,M.colorSpace),F=M.isVideoTexture!==!0,_t=$.__version===void 0||N===!0,ot=J.dataReady;let St=R(M,pt);et(n.TEXTURE_CUBE_MAP,M);let ft;if(ht){F&&_t&&e.texStorage2D(n.TEXTURE_CUBE_MAP,St,ee,pt.width,pt.height);for(let nt=0;nt<6;nt++){ft=gt[nt].mipmaps;for(let Mt=0;Mt<ft.length;Mt++){const kt=ft[Mt];M.format!==Fn?Bt!==null?F?ot&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt,0,0,kt.width,kt.height,Bt,kt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt,ee,kt.width,kt.height,0,kt.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ot&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt,0,0,kt.width,kt.height,Bt,Gt,kt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt,ee,kt.width,kt.height,0,Bt,Gt,kt.data)}}}else{if(ft=M.mipmaps,F&&_t){ft.length>0&&St++;const nt=_e(gt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,St,ee,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(bt){F?ot&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,gt[nt].width,gt[nt].height,Bt,Gt,gt[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,ee,gt[nt].width,gt[nt].height,0,Bt,Gt,gt[nt].data);for(let Mt=0;Mt<ft.length;Mt++){const Ee=ft[Mt].image[nt].image;F?ot&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt+1,0,0,Ee.width,Ee.height,Bt,Gt,Ee.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt+1,ee,Ee.width,Ee.height,0,Bt,Gt,Ee.data)}}else{F?ot&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Bt,Gt,gt[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,ee,Bt,Gt,gt[nt]);for(let Mt=0;Mt<ft.length;Mt++){const kt=ft[Mt];F?ot&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt+1,0,0,Bt,Gt,kt.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt+1,ee,Bt,Gt,kt.image[nt])}}}h(M)&&v(n.TEXTURE_CUBE_MAP),$.__version=J.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Dt(C,M,X,N,J,$){const ut=r.convert(X.format,X.colorSpace),Z=r.convert(X.type),st=A(X.internalFormat,ut,Z,X.normalized,X.colorSpace),ht=i.get(M),bt=i.get(X);if(bt.__renderTarget=M,!ht.__hasExternalTextures){const gt=Math.max(1,M.width>>$),pt=Math.max(1,M.height>>$);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?e.texImage3D(J,$,st,gt,pt,M.depth,0,ut,Z,null):e.texImage2D(J,$,st,gt,pt,0,ut,Z,null)}e.bindFramebuffer(n.FRAMEBUFFER,C),Zt(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,N,J,bt.__webglTexture,0,Ie(M)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,N,J,bt.__webglTexture,$),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ie(C,M,X){if(n.bindRenderbuffer(n.RENDERBUFFER,C),M.depthBuffer){const N=M.depthTexture,J=N&&N.isDepthTexture?N.type:null,$=D(M.stencilBuffer,J),ut=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Zt(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ie(M),$,M.width,M.height):X?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ie(M),$,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,$,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ut,n.RENDERBUFFER,C)}else{const N=M.textures;for(let J=0;J<N.length;J++){const $=N[J],ut=r.convert($.format,$.colorSpace),Z=r.convert($.type),st=A($.internalFormat,ut,Z,$.normalized,$.colorSpace);Zt(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ie(M),st,M.width,M.height):X?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ie(M),st,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,st,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function $t(C,M,X){const N=M.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=i.get(M.depthTexture);if(J.__renderTarget=M,(!J.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),N){if(J.__webglInit===void 0&&(J.__webglInit=!0,M.depthTexture.addEventListener("dispose",P)),J.__webglTexture===void 0){J.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),et(n.TEXTURE_CUBE_MAP,M.depthTexture);const ht=r.convert(M.depthTexture.format),bt=r.convert(M.depthTexture.type);let gt;M.depthTexture.format===ui?gt=n.DEPTH_COMPONENT24:M.depthTexture.format===Vi&&(gt=n.DEPTH24_STENCIL8);for(let pt=0;pt<6;pt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,gt,M.width,M.height,0,ht,bt,null)}}else Q(M.depthTexture,0);const $=J.__webglTexture,ut=Ie(M),Z=N?n.TEXTURE_CUBE_MAP_POSITIVE_X+X:n.TEXTURE_2D,st=M.depthTexture.format===Vi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(M.depthTexture.format===ui)Zt(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,st,Z,$,0,ut):n.framebufferTexture2D(n.FRAMEBUFFER,st,Z,$,0);else if(M.depthTexture.format===Vi)Zt(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,st,Z,$,0,ut):n.framebufferTexture2D(n.FRAMEBUFFER,st,Z,$,0);else throw new Error("Unknown depthTexture format")}function le(C){const M=i.get(C),X=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const N=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),N){const J=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,N.removeEventListener("dispose",J)};N.addEventListener("dispose",J),M.__depthDisposeCallback=J}M.__boundDepthTexture=N}if(C.depthTexture&&!M.__autoAllocateDepthBuffer)if(X)for(let N=0;N<6;N++)$t(M.__webglFramebuffer[N],C,N);else{const N=C.texture.mipmaps;N&&N.length>0?$t(M.__webglFramebuffer[0],C,0):$t(M.__webglFramebuffer,C,0)}else if(X){M.__webglDepthbuffer=[];for(let N=0;N<6;N++)if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[N]),M.__webglDepthbuffer[N]===void 0)M.__webglDepthbuffer[N]=n.createRenderbuffer(),ie(M.__webglDepthbuffer[N],C,!1);else{const J=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=M.__webglDepthbuffer[N];n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,$)}}else{const N=C.texture.mipmaps;if(N&&N.length>0?e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),ie(M.__webglDepthbuffer,C,!1);else{const J=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,$)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function he(C,M,X){const N=i.get(C);M!==void 0&&Dt(N.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),X!==void 0&&le(C)}function Wt(C){const M=C.texture,X=i.get(C),N=i.get(M);C.addEventListener("dispose",_);const J=C.textures,$=C.isWebGLCubeRenderTarget===!0,ut=J.length>1;if(ut||(N.__webglTexture===void 0&&(N.__webglTexture=n.createTexture()),N.__version=M.version,o.memory.textures++),$){X.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer[Z]=[];for(let st=0;st<M.mipmaps.length;st++)X.__webglFramebuffer[Z][st]=n.createFramebuffer()}else X.__webglFramebuffer[Z]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer=[];for(let Z=0;Z<M.mipmaps.length;Z++)X.__webglFramebuffer[Z]=n.createFramebuffer()}else X.__webglFramebuffer=n.createFramebuffer();if(ut)for(let Z=0,st=J.length;Z<st;Z++){const ht=i.get(J[Z]);ht.__webglTexture===void 0&&(ht.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&Zt(C)===!1){X.__webglMultisampledFramebuffer=n.createFramebuffer(),X.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let Z=0;Z<J.length;Z++){const st=J[Z];X.__webglColorRenderbuffer[Z]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,X.__webglColorRenderbuffer[Z]);const ht=r.convert(st.format,st.colorSpace),bt=r.convert(st.type),gt=A(st.internalFormat,ht,bt,st.normalized,st.colorSpace,C.isXRRenderTarget===!0),pt=Ie(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,pt,gt,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Z,n.RENDERBUFFER,X.__webglColorRenderbuffer[Z])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(X.__webglDepthRenderbuffer=n.createRenderbuffer(),ie(X.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){e.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture),et(n.TEXTURE_CUBE_MAP,M);for(let Z=0;Z<6;Z++)if(M.mipmaps&&M.mipmaps.length>0)for(let st=0;st<M.mipmaps.length;st++)Dt(X.__webglFramebuffer[Z][st],C,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,st);else Dt(X.__webglFramebuffer[Z],C,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);h(M)&&v(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ut){for(let Z=0,st=J.length;Z<st;Z++){const ht=J[Z],bt=i.get(ht);let gt=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(gt=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(gt,bt.__webglTexture),et(gt,ht),Dt(X.__webglFramebuffer,C,ht,n.COLOR_ATTACHMENT0+Z,gt,0),h(ht)&&v(gt)}e.unbindTexture()}else{let Z=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Z=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Z,N.__webglTexture),et(Z,M),M.mipmaps&&M.mipmaps.length>0)for(let st=0;st<M.mipmaps.length;st++)Dt(X.__webglFramebuffer[st],C,M,n.COLOR_ATTACHMENT0,Z,st);else Dt(X.__webglFramebuffer,C,M,n.COLOR_ATTACHMENT0,Z,0);h(M)&&v(Z),e.unbindTexture()}C.depthBuffer&&le(C)}function Pe(C){const M=C.textures;for(let X=0,N=M.length;X<N;X++){const J=M[X];if(h(J)){const $=T(C),ut=i.get(J).__webglTexture;e.bindTexture($,ut),v($),e.unbindTexture()}}}const ye=[],Je=[];function B(C){if(C.samples>0){if(Zt(C)===!1){const M=C.textures,X=C.width,N=C.height;let J=n.COLOR_BUFFER_BIT;const $=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ut=i.get(C),Z=M.length>1;if(Z)for(let ht=0;ht<M.length;ht++)e.bindFramebuffer(n.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ut.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ut.__webglMultisampledFramebuffer);const st=C.texture.mipmaps;st&&st.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ut.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let ht=0;ht<M.length;ht++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),Z){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ut.__webglColorRenderbuffer[ht]);const bt=i.get(M[ht]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,bt,0)}n.blitFramebuffer(0,0,X,N,0,0,X,N,J,n.NEAREST),c===!0&&(ye.length=0,Je.length=0,ye.push(n.COLOR_ATTACHMENT0+ht),C.depthBuffer&&C.resolveDepthBuffer===!1&&(ye.push($),Je.push($),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Je)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ye))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Z)for(let ht=0;ht<M.length;ht++){e.bindFramebuffer(n.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.RENDERBUFFER,ut.__webglColorRenderbuffer[ht]);const bt=i.get(M[ht]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ut.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.TEXTURE_2D,bt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ut.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const M=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function Ie(C){return Math.min(s.maxSamples,C.samples)}function Zt(C){const M=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function pe(C){const M=o.render.frame;u.get(C)!==M&&(u.set(C,M),C.update())}function yt(C,M){const X=C.colorSpace,N=C.format,J=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||X!==bo&&X!==Ei&&(se.getTransfer(X)===me?(N!==Fn||J!==xn)&&Ht("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):oe("WebGLTextures: Unsupported texture color space:",X)),M}function _e(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=L,this.getTextureUnits=k,this.setTextureUnits=I,this.setTexture2D=Q,this.setTexture2DArray=rt,this.setTexture3D=mt,this.setTextureCube=vt,this.rebindTextures=he,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=Pe,this.updateMultisampleRenderTarget=B,this.setupDepthRenderbuffer=le,this.setupFrameBufferTexture=Dt,this.useMultisampledRTT=Zt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function _x(n,t){function e(i,s=Ei){let r;const o=se.getTransfer(s);if(i===xn)return n.UNSIGNED_BYTE;if(i===Hl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Gl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Od)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Fd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Nd)return n.BYTE;if(i===Ud)return n.SHORT;if(i===ur)return n.UNSIGNED_SHORT;if(i===kl)return n.INT;if(i===Yn)return n.UNSIGNED_INT;if(i===On)return n.FLOAT;if(i===ci)return n.HALF_FLOAT;if(i===zd)return n.ALPHA;if(i===Bd)return n.RGB;if(i===Fn)return n.RGBA;if(i===ui)return n.DEPTH_COMPONENT;if(i===Vi)return n.DEPTH_STENCIL;if(i===Vl)return n.RED;if(i===Wl)return n.RED_INTEGER;if(i===Yi)return n.RG;if(i===Xl)return n.RG_INTEGER;if(i===$l)return n.RGBA_INTEGER;if(i===lo||i===co||i===uo||i===ho)if(o===me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===lo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===lo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===co)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===uo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ho)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ya||i===ja||i===Ka||i===Za)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ya)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ja)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ka)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Za)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ja||i===Qa||i===tl||i===el||i===nl||i===xo||i===il)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Ja||i===Qa)return o===me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===tl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===el)return r.COMPRESSED_R11_EAC;if(i===nl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===xo)return r.COMPRESSED_RG11_EAC;if(i===il)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===sl||i===rl||i===ol||i===al||i===ll||i===cl||i===ul||i===dl||i===hl||i===fl||i===pl||i===ml||i===gl||i===_l)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===sl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===rl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ol)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===al)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ll)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===cl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ul)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===dl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===hl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===fl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===pl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ml)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===gl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===_l)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===xl||i===vl||i===Ml)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===xl)return o===me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===vl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ml)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===bl||i===yl||i===vo||i===Sl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===bl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===yl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===vo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Sl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===dr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const xx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,vx=`
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

}`;class Mx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Yd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new jn({vertexShader:xx,fragmentShader:vx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Xt(new Ps(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class bx extends Li{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,d=null,g=null,p=null;const x=typeof XRWebGLBinding<"u",m=new Mx,h={},v=e.getContextAttributes();let T=null,A=null;const D=[],R=[],P=new Ft;let _=null;const S=new hn;S.viewport=new Oe;const b=new hn;b.viewport=new Oe;const y=[S,b],w=new Pp;let L=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let dt=D[j];return dt===void 0&&(dt=new Qo,D[j]=dt),dt.getTargetRaySpace()},this.getControllerGrip=function(j){let dt=D[j];return dt===void 0&&(dt=new Qo,D[j]=dt),dt.getGripSpace()},this.getHand=function(j){let dt=D[j];return dt===void 0&&(dt=new Qo,D[j]=dt),dt.getHandSpace()};function I(j){const dt=R.indexOf(j.inputSource);if(dt===-1)return;const ct=D[dt];ct!==void 0&&(ct.update(j.inputSource,j.frame,l||o),ct.dispatchEvent({type:j.type,data:j.inputSource}))}function G(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",O);for(let j=0;j<D.length;j++){const dt=R[j];dt!==null&&(R[j]=null,D[j].disconnect(dt))}L=null,k=null,m.reset();for(const j in h)delete h[j];t.setRenderTarget(T),g=null,d=null,f=null,s=null,A=null,et.stop(),i.isPresenting=!1,t.setPixelRatio(_),t.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,i.isPresenting===!0&&Ht("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&Ht("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",G),s.addEventListener("inputsourceschange",O),v.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ct=null,Ct=null,It=null;v.depth&&(It=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ct=v.stencil?Vi:ui,Ct=v.stencil?dr:Yn);const Dt={colorFormat:e.RGBA8,depthFormat:It,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(Dt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),A=new qn(d.textureWidth,d.textureHeight,{format:Fn,type:xn,depthTexture:new Cs(d.textureWidth,d.textureHeight,Ct,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ct={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,e,ct),s.updateRenderState({baseLayer:g}),t.setPixelRatio(1),t.setSize(g.framebufferWidth,g.framebufferHeight,!1),A=new qn(g.framebufferWidth,g.framebufferHeight,{format:Fn,type:xn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),et.setContext(s),et.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function O(j){for(let dt=0;dt<j.removed.length;dt++){const ct=j.removed[dt],Ct=R.indexOf(ct);Ct>=0&&(R[Ct]=null,D[Ct].disconnect(ct))}for(let dt=0;dt<j.added.length;dt++){const ct=j.added[dt];let Ct=R.indexOf(ct);if(Ct===-1){for(let Dt=0;Dt<D.length;Dt++)if(Dt>=R.length){R.push(ct),Ct=Dt;break}else if(R[Dt]===null){R[Dt]=ct,Ct=Dt;break}if(Ct===-1)break}const It=D[Ct];It&&It.connect(ct)}}const Q=new U,rt=new U;function mt(j,dt,ct){Q.setFromMatrixPosition(dt.matrixWorld),rt.setFromMatrixPosition(ct.matrixWorld);const Ct=Q.distanceTo(rt),It=dt.projectionMatrix.elements,Dt=ct.projectionMatrix.elements,ie=It[14]/(It[10]-1),$t=It[14]/(It[10]+1),le=(It[9]+1)/It[5],he=(It[9]-1)/It[5],Wt=(It[8]-1)/It[0],Pe=(Dt[8]+1)/Dt[0],ye=ie*Wt,Je=ie*Pe,B=Ct/(-Wt+Pe),Ie=B*-Wt;if(dt.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ie),j.translateZ(B),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),It[10]===-1)j.projectionMatrix.copy(dt.projectionMatrix),j.projectionMatrixInverse.copy(dt.projectionMatrixInverse);else{const Zt=ie+B,pe=$t+B,yt=ye-Ie,_e=Je+(Ct-Ie),C=le*$t/pe*Zt,M=he*$t/pe*Zt;j.projectionMatrix.makePerspective(yt,_e,C,M,Zt,pe),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function vt(j,dt){dt===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(dt.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let dt=j.near,ct=j.far;m.texture!==null&&(m.depthNear>0&&(dt=m.depthNear),m.depthFar>0&&(ct=m.depthFar)),w.near=b.near=S.near=dt,w.far=b.far=S.far=ct,(L!==w.near||k!==w.far)&&(s.updateRenderState({depthNear:w.near,depthFar:w.far}),L=w.near,k=w.far),w.layers.mask=j.layers.mask|6,S.layers.mask=w.layers.mask&-5,b.layers.mask=w.layers.mask&-3;const Ct=j.parent,It=w.cameras;vt(w,Ct);for(let Dt=0;Dt<It.length;Dt++)vt(It[Dt],Ct);It.length===2?mt(w,S,b):w.projectionMatrix.copy(S.projectionMatrix),z(j,w,Ct)};function z(j,dt,ct){ct===null?j.matrix.copy(dt.matrixWorld):(j.matrix.copy(ct.matrixWorld),j.matrix.invert(),j.matrix.multiply(dt.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(dt.projectionMatrix),j.projectionMatrixInverse.copy(dt.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=fr*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(d===null&&g===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(w)},this.getCameraTexture=function(j){return h[j]};let V=null;function q(j,dt){if(u=dt.getViewerPose(l||o),p=dt,u!==null){const ct=u.views;g!==null&&(t.setRenderTargetFramebuffer(A,g.framebuffer),t.setRenderTarget(A));let Ct=!1;ct.length!==w.cameras.length&&(w.cameras.length=0,Ct=!0);for(let $t=0;$t<ct.length;$t++){const le=ct[$t];let he=null;if(g!==null)he=g.getViewport(le);else{const Pe=f.getViewSubImage(d,le);he=Pe.viewport,$t===0&&(t.setRenderTargetTextures(A,Pe.colorTexture,Pe.depthStencilTexture),t.setRenderTarget(A))}let Wt=y[$t];Wt===void 0&&(Wt=new hn,Wt.layers.enable($t),Wt.viewport=new Oe,y[$t]=Wt),Wt.matrix.fromArray(le.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(le.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(he.x,he.y,he.width,he.height),$t===0&&(w.matrix.copy(Wt.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),Ct===!0&&w.cameras.push(Wt)}const It=s.enabledFeatures;if(It&&It.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const $t=f.getDepthInformation(ct[0]);$t&&$t.isValid&&$t.texture&&m.init($t,s.renderState)}if(It&&It.includes("camera-access")&&x){t.state.unbindTexture(),f=i.getBinding();for(let $t=0;$t<ct.length;$t++){const le=ct[$t].camera;if(le){let he=h[le];he||(he=new Yd,h[le]=he);const Wt=f.getCameraImage(le);he.sourceTexture=Wt}}}}for(let ct=0;ct<D.length;ct++){const Ct=R[ct],It=D[ct];Ct!==null&&It!==void 0&&It.update(Ct,dt,l||o)}V&&V(j,dt),dt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:dt}),p=null}const et=new nh;et.setAnimationLoop(q),this.setAnimationLoop=function(j){V=j},this.dispose=function(){}}}const yx=new ge,ch=new qt;ch.set(-1,0,0,0,1,0,0,0,1);function Sx(n,t){function e(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,jd(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function s(m,h,v,T,A){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(m,h):h.isMeshLambertMaterial?(r(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(m,h),f(m,h)):h.isMeshPhongMaterial?(r(m,h),u(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(m,h),d(m,h),h.isMeshPhysicalMaterial&&g(m,h,A)):h.isMeshMatcapMaterial?(r(m,h),p(m,h)):h.isMeshDepthMaterial?r(m,h):h.isMeshDistanceMaterial?(r(m,h),x(m,h)):h.isMeshNormalMaterial?r(m,h):h.isLineBasicMaterial?(o(m,h),h.isLineDashedMaterial&&a(m,h)):h.isPointsMaterial?c(m,h,v,T):h.isSpriteMaterial?l(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,e(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===un&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,e(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===un&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,e(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,e(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const v=t.get(h),T=v.envMap,A=v.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4(yx.makeRotationFromEuler(A)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(ch),m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,m.aoMapTransform))}function o(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform))}function a(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function c(m,h,v,T){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*v,m.scale.value=T*.5,h.map&&(m.map.value=h.map,e(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function l(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function f(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function d(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function g(m,h,v){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===un&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,h){h.matcap&&(m.matcap.value=h.matcap)}function x(m,h){const v=t.get(h).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Ex(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,T){const A=T.program;i.uniformBlockBinding(v,A)}function l(v,T){let A=s[v.id];A===void 0&&(p(v),A=u(v),s[v.id]=A,v.addEventListener("dispose",m));const D=T.program;i.updateUBOMapping(v,D);const R=t.render.frame;r[v.id]!==R&&(d(v),r[v.id]=R)}function u(v){const T=f();v.__bindingPointIndex=T;const A=n.createBuffer(),D=v.__size,R=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,D,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,A),A}function f(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return oe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const T=s[v.id],A=v.uniforms,D=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let R=0,P=A.length;R<P;R++){const _=Array.isArray(A[R])?A[R]:[A[R]];for(let S=0,b=_.length;S<b;S++){const y=_[S];if(g(y,R,S,D)===!0){const w=y.__offset,L=Array.isArray(y.value)?y.value:[y.value];let k=0;for(let I=0;I<L.length;I++){const G=L[I],O=x(G);typeof G=="number"||typeof G=="boolean"?(y.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,w+k,y.__data)):G.isMatrix3?(y.__data[0]=G.elements[0],y.__data[1]=G.elements[1],y.__data[2]=G.elements[2],y.__data[3]=0,y.__data[4]=G.elements[3],y.__data[5]=G.elements[4],y.__data[6]=G.elements[5],y.__data[7]=0,y.__data[8]=G.elements[6],y.__data[9]=G.elements[7],y.__data[10]=G.elements[8],y.__data[11]=0):ArrayBuffer.isView(G)?y.__data.set(new G.constructor(G.buffer,G.byteOffset,y.__data.length)):(G.toArray(y.__data,k),k+=O.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,w,y.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(v,T,A,D){const R=v.value,P=T+"_"+A;if(D[P]===void 0)return typeof R=="number"||typeof R=="boolean"?D[P]=R:ArrayBuffer.isView(R)?D[P]=R.slice():D[P]=R.clone(),!0;{const _=D[P];if(typeof R=="number"||typeof R=="boolean"){if(_!==R)return D[P]=R,!0}else{if(ArrayBuffer.isView(R))return!0;if(_.equals(R)===!1)return _.copy(R),!0}}return!1}function p(v){const T=v.uniforms;let A=0;const D=16;for(let P=0,_=T.length;P<_;P++){const S=Array.isArray(T[P])?T[P]:[T[P]];for(let b=0,y=S.length;b<y;b++){const w=S[b],L=Array.isArray(w.value)?w.value:[w.value];for(let k=0,I=L.length;k<I;k++){const G=L[k],O=x(G),Q=A%D,rt=Q%O.boundary,mt=Q+rt;A+=rt,mt!==0&&D-mt<O.storage&&(A+=D-mt),w.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),w.__offset=A,A+=O.storage}}}const R=A%D;return R>0&&(A+=D-R),v.__size=A,v.__cache={},this}function x(v){const T={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(T.boundary=4,T.storage=4):v.isVector2?(T.boundary=8,T.storage=8):v.isVector3||v.isColor?(T.boundary=16,T.storage=12):v.isVector4?(T.boundary=16,T.storage=16):v.isMatrix3?(T.boundary=48,T.storage=48):v.isMatrix4?(T.boundary=64,T.storage=64):v.isTexture?Ht("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(T.boundary=16,T.storage=v.byteLength):Ht("WebGLRenderer: Unsupported uniform value type.",v),T}function m(v){const T=v.target;T.removeEventListener("dispose",m);const A=o.indexOf(T.__bindingPointIndex);o.splice(A,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function h(){for(const v in s)n.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:h}}const Tx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Vn=null;function wx(){return Vn===null&&(Vn=new Xd(Tx,16,16,Yi,ci),Vn.name="DFG_LUT",Vn.minFilter=nn,Vn.magFilter=nn,Vn.wrapS=si,Vn.wrapT=si,Vn.generateMipmaps=!1,Vn.needsUpdate=!0),Vn}class uh{constructor(t={}){const{canvas:e=Cf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:g=xn}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const x=g,m=new Set([$l,Xl,Wl]),h=new Set([xn,Yn,ur,dr,Hl,Gl]),v=new Uint32Array(4),T=new Int32Array(4),A=new U;let D=null,R=null;const P=[],_=[];let S=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let y=!1,w=null;this._outputColorSpace=qe;let L=0,k=0,I=null,G=-1,O=null;const Q=new Oe,rt=new Oe;let mt=null;const vt=new zt(0);let z=0,V=e.width,q=e.height,et=1,j=null,dt=null;const ct=new Oe(0,0,V,q),Ct=new Oe(0,0,V,q);let It=!1;const Dt=new tc;let ie=!1,$t=!1;const le=new ge,he=new U,Wt=new Oe,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ye=!1;function Je(){return I===null?et:1}let B=i;function Ie(E,H){return e.getContext(E,H)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${zl}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",kt,!1),B===null){const H="webgl2";if(B=Ie(H,E),B===null)throw Ie(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw oe("WebGLRenderer: "+E.message),E}let Zt,pe,yt,_e,C,M,X,N,J,$,ut,Z,st,ht,bt,gt,pt,Bt,Gt,ee,F,_t,ot;function St(){Zt=new wg(B),Zt.init(),F=new _x(B,Zt),pe=new xg(B,Zt,t,F),yt=new mx(B,Zt),pe.reversedDepthBuffer&&d&&yt.buffers.depth.setReversed(!0),_e=new Cg(B),C=new ex,M=new gx(B,Zt,yt,C,pe,F,_e),X=new Tg(b),N=new Ip(B),_t=new gg(B,N),J=new Ag(B,N,_e,_t),$=new Lg(B,J,N,_t,_e),Bt=new Pg(B,pe,M),bt=new vg(C),ut=new tx(b,X,Zt,pe,_t,bt),Z=new Sx(b,C),st=new ix,ht=new cx(Zt),pt=new mg(b,X,yt,$,p,c),gt=new px(b,$,pe),ot=new Ex(B,_e,pe,yt),Gt=new _g(B,Zt,_e),ee=new Rg(B,Zt,_e),_e.programs=ut.programs,b.capabilities=pe,b.extensions=Zt,b.properties=C,b.renderLists=st,b.shadowMap=gt,b.state=yt,b.info=_e}St(),x!==xn&&(S=new Ig(x,e.width,e.height,s,r));const ft=new bx(b,B);this.xr=ft,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const E=Zt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Zt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(E){E!==void 0&&(et=E,this.setSize(V,q,!1))},this.getSize=function(E){return E.set(V,q)},this.setSize=function(E,H,tt=!0){if(ft.isPresenting){Ht("WebGLRenderer: Can't change size while VR device is presenting.");return}V=E,q=H,e.width=Math.floor(E*et),e.height=Math.floor(H*et),tt===!0&&(e.style.width=E+"px",e.style.height=H+"px"),S!==null&&S.setSize(e.width,e.height),this.setViewport(0,0,E,H)},this.getDrawingBufferSize=function(E){return E.set(V*et,q*et).floor()},this.setDrawingBufferSize=function(E,H,tt){V=E,q=H,et=tt,e.width=Math.floor(E*tt),e.height=Math.floor(H*tt),this.setViewport(0,0,E,H)},this.setEffects=function(E){if(x===xn){oe("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let H=0;H<E.length;H++)if(E[H].isOutputPass===!0){Ht("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(Q)},this.getViewport=function(E){return E.copy(ct)},this.setViewport=function(E,H,tt,Y){E.isVector4?ct.set(E.x,E.y,E.z,E.w):ct.set(E,H,tt,Y),yt.viewport(Q.copy(ct).multiplyScalar(et).round())},this.getScissor=function(E){return E.copy(Ct)},this.setScissor=function(E,H,tt,Y){E.isVector4?Ct.set(E.x,E.y,E.z,E.w):Ct.set(E,H,tt,Y),yt.scissor(rt.copy(Ct).multiplyScalar(et).round())},this.getScissorTest=function(){return It},this.setScissorTest=function(E){yt.setScissorTest(It=E)},this.setOpaqueSort=function(E){j=E},this.setTransparentSort=function(E){dt=E},this.getClearColor=function(E){return E.copy(pt.getClearColor())},this.setClearColor=function(){pt.setClearColor(...arguments)},this.getClearAlpha=function(){return pt.getClearAlpha()},this.setClearAlpha=function(){pt.setClearAlpha(...arguments)},this.clear=function(E=!0,H=!0,tt=!0){let Y=0;if(E){let K=!1;if(I!==null){const Rt=I.texture.format;K=m.has(Rt)}if(K){const Rt=I.texture.type,Lt=h.has(Rt),At=pt.getClearColor(),Nt=pt.getClearAlpha(),Ut=At.r,Yt=At.g,Jt=At.b;Lt?(v[0]=Ut,v[1]=Yt,v[2]=Jt,v[3]=Nt,B.clearBufferuiv(B.COLOR,0,v)):(T[0]=Ut,T[1]=Yt,T[2]=Jt,T[3]=Nt,B.clearBufferiv(B.COLOR,0,T))}else Y|=B.COLOR_BUFFER_BIT}H&&(Y|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),tt&&(Y|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y!==0&&B.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),w=E},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",kt,!1),pt.dispose(),st.dispose(),ht.dispose(),C.dispose(),X.dispose(),$.dispose(),_t.dispose(),ot.dispose(),ut.dispose(),ft.dispose(),ft.removeEventListener("sessionstart",yr),ft.removeEventListener("sessionend",Sr),Di.stop()};function nt(E){E.preventDefault(),Vc("WebGLRenderer: Context Lost."),y=!0}function Mt(){Vc("WebGLRenderer: Context Restored."),y=!1;const E=_e.autoReset,H=gt.enabled,tt=gt.autoUpdate,Y=gt.needsUpdate,K=gt.type;St(),_e.autoReset=E,gt.enabled=H,gt.autoUpdate=tt,gt.needsUpdate=Y,gt.type=K}function kt(E){oe("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Ee(E){const H=E.target;H.removeEventListener("dispose",Ee),ce(H)}function ce(E){Ln(E),C.remove(E)}function Ln(E){const H=C.get(E).programs;H!==void 0&&(H.forEach(function(tt){ut.releaseProgram(tt)}),E.isShaderMaterial&&ut.releaseShaderCache(E))}this.renderBufferDirect=function(E,H,tt,Y,K,Rt){H===null&&(H=Pe);const Lt=K.isMesh&&K.matrixWorld.determinant()<0,At=Vh(E,H,tt,Y,K);yt.setMaterial(Y,Lt);let Nt=tt.index,Ut=1;if(Y.wireframe===!0){if(Nt=J.getWireframeAttribute(tt),Nt===void 0)return;Ut=2}const Yt=tt.drawRange,Jt=tt.attributes.position;let Ot=Yt.start*Ut,xe=(Yt.start+Yt.count)*Ut;Rt!==null&&(Ot=Math.max(Ot,Rt.start*Ut),xe=Math.min(xe,(Rt.start+Rt.count)*Ut)),Nt!==null?(Ot=Math.max(Ot,0),xe=Math.min(xe,Nt.count)):Jt!=null&&(Ot=Math.max(Ot,0),xe=Math.min(xe,Jt.count));const Fe=xe-Ot;if(Fe<0||Fe===1/0)return;_t.setup(K,Y,At,tt,Nt);let Ne,Me=Gt;if(Nt!==null&&(Ne=N.get(Nt),Me=ee,Me.setIndex(Ne)),K.isMesh)Y.wireframe===!0?(yt.setLineWidth(Y.wireframeLinewidth*Je()),Me.setMode(B.LINES)):Me.setMode(B.TRIANGLES);else if(K.isLine){let Qe=Y.linewidth;Qe===void 0&&(Qe=1),yt.setLineWidth(Qe*Je()),K.isLineSegments?Me.setMode(B.LINES):K.isLineLoop?Me.setMode(B.LINE_LOOP):Me.setMode(B.LINE_STRIP)}else K.isPoints?Me.setMode(B.POINTS):K.isSprite&&Me.setMode(B.TRIANGLES);if(K.isBatchedMesh)if(Zt.get("WEBGL_multi_draw"))Me.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Qe=K._multiDrawStarts,Pt=K._multiDrawCounts,pn=K._multiDrawCount,ue=Nt?N.get(Nt).bytesPerElement:1,Tn=C.get(Y).currentProgram.getUniforms();for(let Hn=0;Hn<pn;Hn++)Tn.setValue(B,"_gl_DrawID",Hn),Me.render(Qe[Hn]/ue,Pt[Hn])}else if(K.isInstancedMesh)Me.renderInstances(Ot,Fe,K.count);else if(tt.isInstancedBufferGeometry){const Qe=tt._maxInstanceCount!==void 0?tt._maxInstanceCount:1/0,Pt=Math.min(tt.instanceCount,Qe);Me.renderInstances(Ot,Fe,Pt)}else Me.render(Ot,Fe)};function Ae(E,H,tt){E.transparent===!0&&E.side===ii&&E.forceSinglePass===!1?(E.side=un,E.needsUpdate=!0,Tr(E,H,tt),E.side=Ci,E.needsUpdate=!0,Tr(E,H,tt),E.side=ii):Tr(E,H,tt)}this.compile=function(E,H,tt=null){tt===null&&(tt=E),R=ht.get(tt),R.init(H),_.push(R),tt.traverseVisible(function(K){K.isLight&&K.layers.test(H.layers)&&(R.pushLight(K),K.castShadow&&R.pushShadow(K))}),E!==tt&&E.traverseVisible(function(K){K.isLight&&K.layers.test(H.layers)&&(R.pushLight(K),K.castShadow&&R.pushShadow(K))}),R.setupLights();const Y=new Set;return E.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Rt=K.material;if(Rt)if(Array.isArray(Rt))for(let Lt=0;Lt<Rt.length;Lt++){const At=Rt[Lt];Ae(At,tt,K),Y.add(At)}else Ae(Rt,tt,K),Y.add(Rt)}),R=_.pop(),Y},this.compileAsync=function(E,H,tt=null){const Y=this.compile(E,H,tt);return new Promise(K=>{function Rt(){if(Y.forEach(function(Lt){C.get(Lt).currentProgram.isReady()&&Y.delete(Lt)}),Y.size===0){K(E);return}setTimeout(Rt,10)}Zt.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let En=null;function Vo(E){En&&En(E)}function yr(){Di.stop()}function Sr(){Di.start()}const Di=new nh;Di.setAnimationLoop(Vo),typeof self<"u"&&Di.setContext(self),this.setAnimationLoop=function(E){En=E,ft.setAnimationLoop(E),E===null?Di.stop():Di.start()},ft.addEventListener("sessionstart",yr),ft.addEventListener("sessionend",Sr),this.render=function(E,H){if(H!==void 0&&H.isCamera!==!0){oe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;w!==null&&w.renderStart(E,H);const tt=ft.enabled===!0&&ft.isPresenting===!0,Y=S!==null&&(I===null||tt)&&S.begin(b,I);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),ft.enabled===!0&&ft.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(ft.cameraAutoUpdate===!0&&ft.updateCamera(H),H=ft.getCamera()),E.isScene===!0&&E.onBeforeRender(b,E,H,I),R=ht.get(E,_.length),R.init(H),R.state.textureUnits=M.getTextureUnits(),_.push(R),le.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),Dt.setFromProjectionMatrix(le,Xn,H.reversedDepth),$t=this.localClippingEnabled,ie=bt.init(this.clippingPlanes,$t),D=st.get(E,P.length),D.init(),P.push(D),ft.enabled===!0&&ft.isPresenting===!0){const Lt=b.xr.getDepthSensingMesh();Lt!==null&&Wo(Lt,H,-1/0,b.sortObjects)}Wo(E,H,0,b.sortObjects),D.finish(),b.sortObjects===!0&&D.sort(j,dt),ye=ft.enabled===!1||ft.isPresenting===!1||ft.hasDepthSensing()===!1,ye&&pt.addToRenderList(D,E),this.info.render.frame++,ie===!0&&bt.beginShadows();const K=R.state.shadowsArray;if(gt.render(K,E,H),ie===!0&&bt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Y&&S.hasRenderPass())===!1){const Lt=D.opaque,At=D.transmissive;if(R.setupLights(),H.isArrayCamera){const Nt=H.cameras;if(At.length>0)for(let Ut=0,Yt=Nt.length;Ut<Yt;Ut++){const Jt=Nt[Ut];Pc(Lt,At,E,Jt)}ye&&pt.render(E);for(let Ut=0,Yt=Nt.length;Ut<Yt;Ut++){const Jt=Nt[Ut];Cc(D,E,Jt,Jt.viewport)}}else At.length>0&&Pc(Lt,At,E,H),ye&&pt.render(E),Cc(D,E,H)}I!==null&&k===0&&(M.updateMultisampleRenderTarget(I),M.updateRenderTargetMipmap(I)),Y&&S.end(b),E.isScene===!0&&E.onAfterRender(b,E,H),_t.resetDefaultState(),G=-1,O=null,_.pop(),_.length>0?(R=_[_.length-1],M.setTextureUnits(R.state.textureUnits),ie===!0&&bt.setGlobalState(b.clippingPlanes,R.state.camera)):R=null,P.pop(),P.length>0?D=P[P.length-1]:D=null,w!==null&&w.renderEnd()};function Wo(E,H,tt,Y){if(E.visible===!1)return;if(E.layers.test(H.layers)){if(E.isGroup)tt=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(H);else if(E.isLightProbeGrid)R.pushLightProbeGrid(E);else if(E.isLight)R.pushLight(E),E.castShadow&&R.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Dt.intersectsSprite(E)){Y&&Wt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(le);const Lt=$.update(E),At=E.material;At.visible&&D.push(E,Lt,At,tt,Wt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Dt.intersectsObject(E))){const Lt=$.update(E),At=E.material;if(Y&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Wt.copy(E.boundingSphere.center)):(Lt.boundingSphere===null&&Lt.computeBoundingSphere(),Wt.copy(Lt.boundingSphere.center)),Wt.applyMatrix4(E.matrixWorld).applyMatrix4(le)),Array.isArray(At)){const Nt=Lt.groups;for(let Ut=0,Yt=Nt.length;Ut<Yt;Ut++){const Jt=Nt[Ut],Ot=At[Jt.materialIndex];Ot&&Ot.visible&&D.push(E,Lt,Ot,tt,Wt.z,Jt)}}else At.visible&&D.push(E,Lt,At,tt,Wt.z,null)}}const Rt=E.children;for(let Lt=0,At=Rt.length;Lt<At;Lt++)Wo(Rt[Lt],H,tt,Y)}function Cc(E,H,tt,Y){const{opaque:K,transmissive:Rt,transparent:Lt}=E;R.setupLightsView(tt),ie===!0&&bt.setGlobalState(b.clippingPlanes,tt),Y&&yt.viewport(Q.copy(Y)),K.length>0&&Er(K,H,tt),Rt.length>0&&Er(Rt,H,tt),Lt.length>0&&Er(Lt,H,tt),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function Pc(E,H,tt,Y){if((tt.isScene===!0?tt.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[Y.id]===void 0){const Ot=Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[Y.id]=new qn(1,1,{generateMipmaps:!0,type:Ot?ci:xn,minFilter:Gi,samples:Math.max(4,pe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:se.workingColorSpace})}const Rt=R.state.transmissionRenderTarget[Y.id],Lt=Y.viewport||Q;Rt.setSize(Lt.z*b.transmissionResolutionScale,Lt.w*b.transmissionResolutionScale);const At=b.getRenderTarget(),Nt=b.getActiveCubeFace(),Ut=b.getActiveMipmapLevel();b.setRenderTarget(Rt),b.getClearColor(vt),z=b.getClearAlpha(),z<1&&b.setClearColor(16777215,.5),b.clear(),ye&&pt.render(tt);const Yt=b.toneMapping;b.toneMapping=$n;const Jt=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),R.setupLightsView(Y),ie===!0&&bt.setGlobalState(b.clippingPlanes,Y),Er(E,tt,Y),M.updateMultisampleRenderTarget(Rt),M.updateRenderTargetMipmap(Rt),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let xe=0,Fe=H.length;xe<Fe;xe++){const Ne=H[xe],{object:Me,geometry:Qe,material:Pt,group:pn}=Ne;if(Pt.side===ii&&Me.layers.test(Y.layers)){const ue=Pt.side;Pt.side=un,Pt.needsUpdate=!0,Lc(Me,tt,Y,Qe,Pt,pn),Pt.side=ue,Pt.needsUpdate=!0,Ot=!0}}Ot===!0&&(M.updateMultisampleRenderTarget(Rt),M.updateRenderTargetMipmap(Rt))}b.setRenderTarget(At,Nt,Ut),b.setClearColor(vt,z),Jt!==void 0&&(Y.viewport=Jt),b.toneMapping=Yt}function Er(E,H,tt){const Y=H.isScene===!0?H.overrideMaterial:null;for(let K=0,Rt=E.length;K<Rt;K++){const Lt=E[K],{object:At,geometry:Nt,group:Ut}=Lt;let Yt=Lt.material;Yt.allowOverride===!0&&Y!==null&&(Yt=Y),At.layers.test(tt.layers)&&Lc(At,H,tt,Nt,Yt,Ut)}}function Lc(E,H,tt,Y,K,Rt){E.onBeforeRender(b,H,tt,Y,K,Rt),E.modelViewMatrix.multiplyMatrices(tt.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),K.onBeforeRender(b,H,tt,Y,E,Rt),K.transparent===!0&&K.side===ii&&K.forceSinglePass===!1?(K.side=un,K.needsUpdate=!0,b.renderBufferDirect(tt,H,Y,K,E,Rt),K.side=Ci,K.needsUpdate=!0,b.renderBufferDirect(tt,H,Y,K,E,Rt),K.side=ii):b.renderBufferDirect(tt,H,Y,K,E,Rt),E.onAfterRender(b,H,tt,Y,K,Rt)}function Tr(E,H,tt){H.isScene!==!0&&(H=Pe);const Y=C.get(E),K=R.state.lights,Rt=R.state.shadowsArray,Lt=K.state.version,At=ut.getParameters(E,K.state,Rt,H,tt,R.state.lightProbeGridArray),Nt=ut.getProgramCacheKey(At);let Ut=Y.programs;Y.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?H.environment:null,Y.fog=H.fog;const Yt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;Y.envMap=X.get(E.envMap||Y.environment,Yt),Y.envMapRotation=Y.environment!==null&&E.envMap===null?H.environmentRotation:E.envMapRotation,Ut===void 0&&(E.addEventListener("dispose",Ee),Ut=new Map,Y.programs=Ut);let Jt=Ut.get(Nt);if(Jt!==void 0){if(Y.currentProgram===Jt&&Y.lightsStateVersion===Lt)return Ic(E,At),Jt}else At.uniforms=ut.getUniforms(E),w!==null&&E.isNodeMaterial&&w.build(E,tt,At),E.onBeforeCompile(At,b),Jt=ut.acquireProgram(At,Nt),Ut.set(Nt,Jt),Y.uniforms=At.uniforms;const Ot=Y.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ot.clippingPlanes=bt.uniform),Ic(E,At),Y.needsLights=Xh(E),Y.lightsStateVersion=Lt,Y.needsLights&&(Ot.ambientLightColor.value=K.state.ambient,Ot.lightProbe.value=K.state.probe,Ot.directionalLights.value=K.state.directional,Ot.directionalLightShadows.value=K.state.directionalShadow,Ot.spotLights.value=K.state.spot,Ot.spotLightShadows.value=K.state.spotShadow,Ot.rectAreaLights.value=K.state.rectArea,Ot.ltc_1.value=K.state.rectAreaLTC1,Ot.ltc_2.value=K.state.rectAreaLTC2,Ot.pointLights.value=K.state.point,Ot.pointLightShadows.value=K.state.pointShadow,Ot.hemisphereLights.value=K.state.hemi,Ot.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Ot.spotLightMatrix.value=K.state.spotLightMatrix,Ot.spotLightMap.value=K.state.spotLightMap,Ot.pointShadowMatrix.value=K.state.pointShadowMatrix),Y.lightProbeGrid=R.state.lightProbeGridArray.length>0,Y.currentProgram=Jt,Y.uniformsList=null,Jt}function Dc(E){if(E.uniformsList===null){const H=E.currentProgram.getUniforms();E.uniformsList=fo.seqWithValue(H.seq,E.uniforms)}return E.uniformsList}function Ic(E,H){const tt=C.get(E);tt.outputColorSpace=H.outputColorSpace,tt.batching=H.batching,tt.batchingColor=H.batchingColor,tt.instancing=H.instancing,tt.instancingColor=H.instancingColor,tt.instancingMorph=H.instancingMorph,tt.skinning=H.skinning,tt.morphTargets=H.morphTargets,tt.morphNormals=H.morphNormals,tt.morphColors=H.morphColors,tt.morphTargetsCount=H.morphTargetsCount,tt.numClippingPlanes=H.numClippingPlanes,tt.numIntersection=H.numClipIntersection,tt.vertexAlphas=H.vertexAlphas,tt.vertexTangents=H.vertexTangents,tt.toneMapping=H.toneMapping}function Gh(E,H){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;A.setFromMatrixPosition(H.matrixWorld);for(let tt=0,Y=E.length;tt<Y;tt++){const K=E[tt];if(K.texture!==null&&K.boundingBox.containsPoint(A))return K}return null}function Vh(E,H,tt,Y,K){H.isScene!==!0&&(H=Pe),M.resetTextureUnits();const Rt=H.fog,Lt=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial?H.environment:null,At=I===null?b.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:se.workingColorSpace,Nt=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial&&!Y.envMap||Y.isMeshPhongMaterial&&!Y.envMap,Ut=X.get(Y.envMap||Lt,Nt),Yt=Y.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,Jt=!!tt.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ot=!!tt.morphAttributes.position,xe=!!tt.morphAttributes.normal,Fe=!!tt.morphAttributes.color;let Ne=$n;Y.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Ne=b.toneMapping);const Me=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,Qe=Me!==void 0?Me.length:0,Pt=C.get(Y),pn=R.state.lights;if(ie===!0&&($t===!0||E!==O)){const Se=E===O&&Y.id===G;bt.setState(Y,E,Se)}let ue=!1;Y.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==pn.state.version||Pt.outputColorSpace!==At||K.isBatchedMesh&&Pt.batching===!1||!K.isBatchedMesh&&Pt.batching===!0||K.isBatchedMesh&&Pt.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Pt.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Pt.instancing===!1||!K.isInstancedMesh&&Pt.instancing===!0||K.isSkinnedMesh&&Pt.skinning===!1||!K.isSkinnedMesh&&Pt.skinning===!0||K.isInstancedMesh&&Pt.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Pt.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Pt.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Pt.instancingMorph===!1&&K.morphTexture!==null||Pt.envMap!==Ut||Y.fog===!0&&Pt.fog!==Rt||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==bt.numPlanes||Pt.numIntersection!==bt.numIntersection)||Pt.vertexAlphas!==Yt||Pt.vertexTangents!==Jt||Pt.morphTargets!==Ot||Pt.morphNormals!==xe||Pt.morphColors!==Fe||Pt.toneMapping!==Ne||Pt.morphTargetsCount!==Qe||!!Pt.lightProbeGrid!=R.state.lightProbeGridArray.length>0)&&(ue=!0):(ue=!0,Pt.__version=Y.version);let Tn=Pt.currentProgram;ue===!0&&(Tn=Tr(Y,H,K),w&&Y.isNodeMaterial&&w.onUpdateProgram(Y,Tn,Pt));let Hn=!1,fi=!1,es=!1;const be=Tn.getUniforms(),ze=Pt.uniforms;if(yt.useProgram(Tn.program)&&(Hn=!0,fi=!0,es=!0),Y.id!==G&&(G=Y.id,fi=!0),Pt.needsLights){const Se=Gh(R.state.lightProbeGridArray,K);Pt.lightProbeGrid!==Se&&(Pt.lightProbeGrid=Se,fi=!0)}if(Hn||O!==E){yt.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),be.setValue(B,"projectionMatrix",E.projectionMatrix),be.setValue(B,"viewMatrix",E.matrixWorldInverse);const mi=be.map.cameraPosition;mi!==void 0&&mi.setValue(B,he.setFromMatrixPosition(E.matrixWorld)),pe.logarithmicDepthBuffer&&be.setValue(B,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&be.setValue(B,"isOrthographic",E.isOrthographicCamera===!0),O!==E&&(O=E,fi=!0,es=!0)}if(Pt.needsLights&&(pn.state.directionalShadowMap.length>0&&be.setValue(B,"directionalShadowMap",pn.state.directionalShadowMap,M),pn.state.spotShadowMap.length>0&&be.setValue(B,"spotShadowMap",pn.state.spotShadowMap,M),pn.state.pointShadowMap.length>0&&be.setValue(B,"pointShadowMap",pn.state.pointShadowMap,M)),K.isSkinnedMesh){be.setOptional(B,K,"bindMatrix"),be.setOptional(B,K,"bindMatrixInverse");const Se=K.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),be.setValue(B,"boneTexture",Se.boneTexture,M))}K.isBatchedMesh&&(be.setOptional(B,K,"batchingTexture"),be.setValue(B,"batchingTexture",K._matricesTexture,M),be.setOptional(B,K,"batchingIdTexture"),be.setValue(B,"batchingIdTexture",K._indirectTexture,M),be.setOptional(B,K,"batchingColorTexture"),K._colorsTexture!==null&&be.setValue(B,"batchingColorTexture",K._colorsTexture,M));const pi=tt.morphAttributes;if((pi.position!==void 0||pi.normal!==void 0||pi.color!==void 0)&&Bt.update(K,tt,Tn),(fi||Pt.receiveShadow!==K.receiveShadow)&&(Pt.receiveShadow=K.receiveShadow,be.setValue(B,"receiveShadow",K.receiveShadow)),(Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial)&&Y.envMap===null&&H.environment!==null&&(ze.envMapIntensity.value=H.environmentIntensity),ze.dfgLUT!==void 0&&(ze.dfgLUT.value=wx()),fi){if(be.setValue(B,"toneMappingExposure",b.toneMappingExposure),Pt.needsLights&&Wh(ze,es),Rt&&Y.fog===!0&&Z.refreshFogUniforms(ze,Rt),Z.refreshMaterialUniforms(ze,Y,et,q,R.state.transmissionRenderTarget[E.id]),Pt.needsLights&&Pt.lightProbeGrid){const Se=Pt.lightProbeGrid;ze.probesSH.value=Se.texture,ze.probesMin.value.copy(Se.boundingBox.min),ze.probesMax.value.copy(Se.boundingBox.max),ze.probesResolution.value.copy(Se.resolution)}fo.upload(B,Dc(Pt),ze,M)}if(Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(fo.upload(B,Dc(Pt),ze,M),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&be.setValue(B,"center",K.center),be.setValue(B,"modelViewMatrix",K.modelViewMatrix),be.setValue(B,"normalMatrix",K.normalMatrix),be.setValue(B,"modelMatrix",K.matrixWorld),Y.uniformsGroups!==void 0){const Se=Y.uniformsGroups;for(let mi=0,ns=Se.length;mi<ns;mi++){const Nc=Se[mi];ot.update(Nc,Tn),ot.bind(Nc,Tn)}}return Tn}function Wh(E,H){E.ambientLightColor.needsUpdate=H,E.lightProbe.needsUpdate=H,E.directionalLights.needsUpdate=H,E.directionalLightShadows.needsUpdate=H,E.pointLights.needsUpdate=H,E.pointLightShadows.needsUpdate=H,E.spotLights.needsUpdate=H,E.spotLightShadows.needsUpdate=H,E.rectAreaLights.needsUpdate=H,E.hemisphereLights.needsUpdate=H}function Xh(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(E,H,tt){const Y=C.get(E);Y.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),C.get(E.texture).__webglTexture=H,C.get(E.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:tt,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,H){const tt=C.get(E);tt.__webglFramebuffer=H,tt.__useDefaultFramebuffer=H===void 0};const $h=B.createFramebuffer();this.setRenderTarget=function(E,H=0,tt=0){I=E,L=H,k=tt;let Y=null,K=!1,Rt=!1;if(E){const At=C.get(E);if(At.__useDefaultFramebuffer!==void 0){yt.bindFramebuffer(B.FRAMEBUFFER,At.__webglFramebuffer),Q.copy(E.viewport),rt.copy(E.scissor),mt=E.scissorTest,yt.viewport(Q),yt.scissor(rt),yt.setScissorTest(mt),G=-1;return}else if(At.__webglFramebuffer===void 0)M.setupRenderTarget(E);else if(At.__hasExternalTextures)M.rebindTextures(E,C.get(E.texture).__webglTexture,C.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Yt=E.depthTexture;if(At.__boundDepthTexture!==Yt){if(Yt!==null&&C.has(Yt)&&(E.width!==Yt.image.width||E.height!==Yt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(E)}}const Nt=E.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture||Nt.isCompressedArrayTexture)&&(Rt=!0);const Ut=C.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ut[H])?Y=Ut[H][tt]:Y=Ut[H],K=!0):E.samples>0&&M.useMultisampledRTT(E)===!1?Y=C.get(E).__webglMultisampledFramebuffer:Array.isArray(Ut)?Y=Ut[tt]:Y=Ut,Q.copy(E.viewport),rt.copy(E.scissor),mt=E.scissorTest}else Q.copy(ct).multiplyScalar(et).floor(),rt.copy(Ct).multiplyScalar(et).floor(),mt=It;if(tt!==0&&(Y=$h),yt.bindFramebuffer(B.FRAMEBUFFER,Y)&&yt.drawBuffers(E,Y),yt.viewport(Q),yt.scissor(rt),yt.setScissorTest(mt),K){const At=C.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+H,At.__webglTexture,tt)}else if(Rt){const At=H;for(let Nt=0;Nt<E.textures.length;Nt++){const Ut=C.get(E.textures[Nt]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Nt,Ut.__webglTexture,tt,At)}}else if(E!==null&&tt!==0){const At=C.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,At.__webglTexture,tt)}G=-1},this.readRenderTargetPixels=function(E,H,tt,Y,K,Rt,Lt,At=0){if(!(E&&E.isWebGLRenderTarget)){oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Nt=C.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Lt!==void 0&&(Nt=Nt[Lt]),Nt){yt.bindFramebuffer(B.FRAMEBUFFER,Nt);try{const Ut=E.textures[At],Yt=Ut.format,Jt=Ut.type;if(E.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+At),!pe.textureFormatReadable(Yt)){oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!pe.textureTypeReadable(Jt)){oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=E.width-Y&&tt>=0&&tt<=E.height-K&&B.readPixels(H,tt,Y,K,F.convert(Yt),F.convert(Jt),Rt)}finally{const Ut=I!==null?C.get(I).__webglFramebuffer:null;yt.bindFramebuffer(B.FRAMEBUFFER,Ut)}}},this.readRenderTargetPixelsAsync=async function(E,H,tt,Y,K,Rt,Lt,At=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Nt=C.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Lt!==void 0&&(Nt=Nt[Lt]),Nt)if(H>=0&&H<=E.width-Y&&tt>=0&&tt<=E.height-K){yt.bindFramebuffer(B.FRAMEBUFFER,Nt);const Ut=E.textures[At],Yt=Ut.format,Jt=Ut.type;if(E.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+At),!pe.textureFormatReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!pe.textureTypeReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ot=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Ot),B.bufferData(B.PIXEL_PACK_BUFFER,Rt.byteLength,B.STREAM_READ),B.readPixels(H,tt,Y,K,F.convert(Yt),F.convert(Jt),0);const xe=I!==null?C.get(I).__webglFramebuffer:null;yt.bindFramebuffer(B.FRAMEBUFFER,xe);const Fe=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Pf(B,Fe,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Ot),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,Rt),B.deleteBuffer(Ot),B.deleteSync(Fe),Rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,H=null,tt=0){const Y=Math.pow(2,-tt),K=Math.floor(E.image.width*Y),Rt=Math.floor(E.image.height*Y),Lt=H!==null?H.x:0,At=H!==null?H.y:0;M.setTexture2D(E,0),B.copyTexSubImage2D(B.TEXTURE_2D,tt,0,0,Lt,At,K,Rt),yt.unbindTexture()};const qh=B.createFramebuffer(),Yh=B.createFramebuffer();this.copyTextureToTexture=function(E,H,tt=null,Y=null,K=0,Rt=0){let Lt,At,Nt,Ut,Yt,Jt,Ot,xe,Fe;const Ne=E.isCompressedTexture?E.mipmaps[Rt]:E.image;if(tt!==null)Lt=tt.max.x-tt.min.x,At=tt.max.y-tt.min.y,Nt=tt.isBox3?tt.max.z-tt.min.z:1,Ut=tt.min.x,Yt=tt.min.y,Jt=tt.isBox3?tt.min.z:0;else{const ze=Math.pow(2,-K);Lt=Math.floor(Ne.width*ze),At=Math.floor(Ne.height*ze),E.isDataArrayTexture?Nt=Ne.depth:E.isData3DTexture?Nt=Math.floor(Ne.depth*ze):Nt=1,Ut=0,Yt=0,Jt=0}Y!==null?(Ot=Y.x,xe=Y.y,Fe=Y.z):(Ot=0,xe=0,Fe=0);const Me=F.convert(H.format),Qe=F.convert(H.type);let Pt;H.isData3DTexture?(M.setTexture3D(H,0),Pt=B.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(M.setTexture2DArray(H,0),Pt=B.TEXTURE_2D_ARRAY):(M.setTexture2D(H,0),Pt=B.TEXTURE_2D),yt.activeTexture(B.TEXTURE0),yt.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,H.flipY),yt.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),yt.pixelStorei(B.UNPACK_ALIGNMENT,H.unpackAlignment);const pn=yt.getParameter(B.UNPACK_ROW_LENGTH),ue=yt.getParameter(B.UNPACK_IMAGE_HEIGHT),Tn=yt.getParameter(B.UNPACK_SKIP_PIXELS),Hn=yt.getParameter(B.UNPACK_SKIP_ROWS),fi=yt.getParameter(B.UNPACK_SKIP_IMAGES);yt.pixelStorei(B.UNPACK_ROW_LENGTH,Ne.width),yt.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Ne.height),yt.pixelStorei(B.UNPACK_SKIP_PIXELS,Ut),yt.pixelStorei(B.UNPACK_SKIP_ROWS,Yt),yt.pixelStorei(B.UNPACK_SKIP_IMAGES,Jt);const es=E.isDataArrayTexture||E.isData3DTexture,be=H.isDataArrayTexture||H.isData3DTexture;if(E.isDepthTexture){const ze=C.get(E),pi=C.get(H),Se=C.get(ze.__renderTarget),mi=C.get(pi.__renderTarget);yt.bindFramebuffer(B.READ_FRAMEBUFFER,Se.__webglFramebuffer),yt.bindFramebuffer(B.DRAW_FRAMEBUFFER,mi.__webglFramebuffer);for(let ns=0;ns<Nt;ns++)es&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,C.get(E).__webglTexture,K,Jt+ns),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,C.get(H).__webglTexture,Rt,Fe+ns)),B.blitFramebuffer(Ut,Yt,Lt,At,Ot,xe,Lt,At,B.DEPTH_BUFFER_BIT,B.NEAREST);yt.bindFramebuffer(B.READ_FRAMEBUFFER,null),yt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(K!==0||E.isRenderTargetTexture||C.has(E)){const ze=C.get(E),pi=C.get(H);yt.bindFramebuffer(B.READ_FRAMEBUFFER,qh),yt.bindFramebuffer(B.DRAW_FRAMEBUFFER,Yh);for(let Se=0;Se<Nt;Se++)es?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ze.__webglTexture,K,Jt+Se):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,ze.__webglTexture,K),be?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,pi.__webglTexture,Rt,Fe+Se):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,pi.__webglTexture,Rt),K!==0?B.blitFramebuffer(Ut,Yt,Lt,At,Ot,xe,Lt,At,B.COLOR_BUFFER_BIT,B.NEAREST):be?B.copyTexSubImage3D(Pt,Rt,Ot,xe,Fe+Se,Ut,Yt,Lt,At):B.copyTexSubImage2D(Pt,Rt,Ot,xe,Ut,Yt,Lt,At);yt.bindFramebuffer(B.READ_FRAMEBUFFER,null),yt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else be?E.isDataTexture||E.isData3DTexture?B.texSubImage3D(Pt,Rt,Ot,xe,Fe,Lt,At,Nt,Me,Qe,Ne.data):H.isCompressedArrayTexture?B.compressedTexSubImage3D(Pt,Rt,Ot,xe,Fe,Lt,At,Nt,Me,Ne.data):B.texSubImage3D(Pt,Rt,Ot,xe,Fe,Lt,At,Nt,Me,Qe,Ne):E.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,Rt,Ot,xe,Lt,At,Me,Qe,Ne.data):E.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,Rt,Ot,xe,Ne.width,Ne.height,Me,Ne.data):B.texSubImage2D(B.TEXTURE_2D,Rt,Ot,xe,Lt,At,Me,Qe,Ne);yt.pixelStorei(B.UNPACK_ROW_LENGTH,pn),yt.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ue),yt.pixelStorei(B.UNPACK_SKIP_PIXELS,Tn),yt.pixelStorei(B.UNPACK_SKIP_ROWS,Hn),yt.pixelStorei(B.UNPACK_SKIP_IMAGES,fi),Rt===0&&H.generateMipmaps&&B.generateMipmap(Pt),yt.unbindTexture()},this.initRenderTarget=function(E){C.get(E).__webglFramebuffer===void 0&&M.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?M.setTextureCube(E,0):E.isData3DTexture?M.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?M.setTexture2DArray(E,0):M.setTexture2D(E,0),yt.unbindTexture()},this.resetState=function(){L=0,k=0,I=null,yt.reset(),_t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}}const Vu={type:"change"},lc={type:"start"},dh={type:"end"},Zr=new Oo,Wu=new ni,Ax=Math.cos(70*Ue.DEG2RAD),He=new U,dn=2*Math.PI,ve={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ea=1e-6;class hh extends Lp{constructor(t,e=null){super(t,e),this.state=ve.NONE,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Xe.ROTATE,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN},this.touches={ONE:fn.ROTATE,TWO:fn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new An,this._lastTargetPosition=new U,this._quat=new An().setFromUnitVectors(t.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ao,this._sphericalDelta=new Ao,this._scale=1,this._panOffset=new U,this._rotateStart=new Ft,this._rotateEnd=new Ft,this._rotateDelta=new Ft,this._panStart=new Ft,this._panEnd=new Ft,this._panDelta=new Ft,this._dollyStart=new Ft,this._dollyEnd=new Ft,this._dollyDelta=new Ft,this._dollyDirection=new U,this._mouse=new Ft,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Cx.bind(this),this._onPointerDown=Rx.bind(this),this._onPointerUp=Px.bind(this),this._onContextMenu=Fx.bind(this),this._onMouseWheel=Ix.bind(this),this._onKeyDown=Nx.bind(this),this._onTouchStart=Ux.bind(this),this._onTouchMove=Ox.bind(this),this._onMouseDown=Lx.bind(this),this._onMouseMove=Dx.bind(this),this._interceptControlDown=zx.bind(this),this._interceptControlUp=Bx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Vu),this.update(),this.state=ve.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;He.copy(e).sub(this.target),He.applyQuaternion(this._quat),this._spherical.setFromVector3(He),this.autoRotate&&this.state===ve.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=dn:i>Math.PI&&(i-=dn),s<-Math.PI?s+=dn:s>Math.PI&&(s-=dn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(He.setFromSpherical(this._spherical),He.applyQuaternion(this._quatInverse),e.copy(this.target).add(He),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=He.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new U(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new U(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=He.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Zr.origin.copy(this.object.position),Zr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Zr.direction))<Ax?this.object.lookAt(this.target):(Wu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Zr.intersectPlane(Wu,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ea||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ea||this._lastTargetPosition.distanceToSquared(this.target)>Ea?(this.dispatchEvent(Vu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?dn/60*this.autoRotateSpeed*t:dn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){He.setFromMatrixColumn(e,0),He.multiplyScalar(-t),this._panOffset.add(He)}_panUp(t,e){this.screenSpacePanning===!0?He.setFromMatrixColumn(e,1):(He.setFromMatrixColumn(e,0),He.crossVectors(this.object.up,He)),He.multiplyScalar(t),this._panOffset.add(He)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;He.copy(s).sub(this.target);let r=He.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(dn*this._rotateDelta.x/e.clientHeight),this._rotateUp(dn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(dn*this._rotateDelta.x/e.clientHeight),this._rotateUp(dn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ft,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Rx(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Cx(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Px(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(dh),this.state=ve.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Lx(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Xe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ve.DOLLY;break;case Xe.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ve.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ve.ROTATE}break;case Xe.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ve.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ve.PAN}break;default:this.state=ve.NONE}this.state!==ve.NONE&&this.dispatchEvent(lc)}function Dx(n){switch(this.state){case ve.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ve.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ve.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Ix(n){this.enabled===!1||this.enableZoom===!1||this.state!==ve.NONE||(n.preventDefault(),this.dispatchEvent(lc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(dh))}function Nx(n){this.enabled!==!1&&this._handleKeyDown(n)}function Ux(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case fn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ve.TOUCH_ROTATE;break;case fn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ve.TOUCH_PAN;break;default:this.state=ve.NONE}break;case 2:switch(this.touches.TWO){case fn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ve.TOUCH_DOLLY_PAN;break;case fn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ve.TOUCH_DOLLY_ROTATE;break;default:this.state=ve.NONE}break;default:this.state=ve.NONE}this.state!==ve.NONE&&this.dispatchEvent(lc)}function Ox(n){switch(this._trackPointer(n),this.state){case ve.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ve.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ve.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ve.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ve.NONE}}function Fx(n){this.enabled!==!1&&n.preventDefault()}function zx(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Bx(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class fh extends De{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Ft(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element&&e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const xs=new U,Xu=new ge,$u=new ge,qu=new U,Yu=new U;class kx{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},c=t.element!==void 0?t.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.sortObjects=!0,this.getSize=function(){return{width:i,height:s}},this.render=function(p,x){p.matrixWorldAutoUpdate===!0&&p.updateMatrixWorld(),x.parent===null&&x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),Xu.copy(x.matrixWorldInverse),$u.multiplyMatrices(x.projectionMatrix,Xu),u(p,p,x),this.sortObjects&&g(p)},this.setSize=function(p,x){i=p,s=x,r=i/2,o=s/2,c.style.width=p+"px",c.style.height=x+"px"};function l(p){p.isCSS2DObject&&(p.element.style.display="none");for(let x=0,m=p.children.length;x<m;x++)l(p.children[x])}function u(p,x,m){if(p.visible===!1){l(p);return}if(p.isCSS2DObject){xs.setFromMatrixPosition(p.matrixWorld),xs.applyMatrix4($u);const h=xs.z>=-1&&xs.z<=1&&p.layers.test(m.layers)===!0,v=p.element;v.style.display=h===!0?"":"none",h===!0&&(p.onBeforeRender(e,x,m),v.style.transform="translate("+-100*p.center.x+"%,"+-100*p.center.y+"%)translate("+(xs.x*r+r)+"px,"+(-xs.y*o+o)+"px)",v.parentNode!==c&&c.appendChild(v),p.onAfterRender(e,x,m));const T={distanceToCameraSquared:f(m,p)};a.objects.set(p,T)}for(let h=0,v=p.children.length;h<v;h++)u(p.children[h],x,m)}function f(p,x){return qu.setFromMatrixPosition(p.matrixWorld),Yu.setFromMatrixPosition(x.matrixWorld),qu.distanceToSquared(Yu)}function d(p){const x=[];return p.traverseVisible(function(m){m.isCSS2DObject&&x.push(m)}),x}function g(p){const x=d(p).sort(function(h,v){if(h.renderOrder!==v.renderOrder)return v.renderOrder-h.renderOrder;const T=a.objects.get(h).distanceToCameraSquared,A=a.objects.get(v).distanceToCameraSquared;return T-A}),m=x.length;for(let h=0,v=x.length;h<v;h++)x[h].element.style.zIndex=m-h}}}class Hx extends Jl{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const t=new fe;t.deleteAttribute("uv");const e=new ke({side:un}),i=new ke,s=new Qd(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Xt(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new Ql(t,i,6),a=new De;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);const c=new Xt(t,vs(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new Xt(t,vs(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const u=new Xt(t,vs(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);const f=new Xt(t,vs(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const d=new Xt(t,vs(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const g=new Xt(t,vs(100));g.position.set(0,20,0),g.scale.set(1,.1,1),this.add(g)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function vs(n){return new Ep({color:0,emissive:16777215,emissiveIntensity:n})}const it={sky:15985891,ground:15392723,wall:16052714,wallExt:15526628,trim:16777215,doorLeaf:13215612,doorEntrance:3494010,glass:11130101,frame:4871528,floorWood:13608570,woodLight:14201994,woodMid:12159838,woodDark:8017462,tileFloor:15331058,tileGrout:13489886,sofa:6258598,sofaDark:4612223,fabricBeige:14931392,fabricGrey:11844806,bedding:16118766,blanket:8298639,rug:14272942,black:2303533,steel:12831443,white:16448250,counter:15856372,cabinet:14341062,cabinetDark:7174792,leaf:5810286,leafDark:4163670,pot:13616307,accent:15246141,label:12999226},Ta={...it},Fi=(n,t,e)=>new zt(n).lerp(new zt(t),e).getHex();function Gx(n){Object.assign(it,Ta),it.floorWood=n.floor,it.wall=n.wall,it.wallExt=Fi(n.wall,0,.04),it.woodMid=n.wood,it.woodLight=Fi(n.wood,16777215,.22),it.woodDark=Fi(n.wood,0,.35),it.cabinet=Fi(Ta.cabinet,n.wood,.18),it.sofa=n.sofa,it.sofaDark=Fi(n.sofa,0,.25),it.accent=n.accent,it.blanket=Fi(n.accent,16777215,.3),it.rug=Fi(Ta.rug,n.floor,.25)}const wa=new Map;function Cn(n,t={}){const e=`${n}|${JSON.stringify(t)}`;return wa.has(e)||wa.set(e,new ke({color:n,roughness:.78,metalness:0,...t})),wa.get(e)}function Cl(){return Cn(it.glass,{transparent:!0,opacity:.28,roughness:.05,depthWrite:!1})}const Pl=30,Js=72,po=[4.5,60],Aa=[.15,1.35],Ra=new U(5,0,3.5),ju=Math.PI*2,ph=n=>n<.5?4*n*n*n:1-(-2*n+2)**3/2;function mh(){const n=window.matchMedia?.("(pointer: coarse)").matches||Math.min(window.innerWidth,window.innerHeight)<640;return{coarse:n,maxDpr:n?1.5:2,shadowSize:n?1024:2048,pointLights:!n}}function Vx(n,t=mh()){const e=new uh({antialias:!0,powerPreference:"high-performance",stencil:!1});let i=Math.min(window.devicePixelRatio||1,t.maxDpr);e.setPixelRatio(i),e.outputColorSpace=qe,e.toneMapping=Io,e.toneMappingExposure=1,e.shadowMap.enabled=!0,e.shadowMap.type=Es,e.shadowMap.autoUpdate=!1,e.shadowMap.needsUpdate=!0,Object.assign(e.domElement.style,{display:"block",width:"100%",height:"100%",touchAction:"none",outline:"none"});const s=new Jl;s.background=new zt(it.sky),s.fog=new Uo(it.sky,70,180);const r=new hn(Pl,1,.05,300);r.rotation.order="YXZ";const o=new kx;Object.assign(o.domElement.style,{position:"absolute",left:"0",top:"0",pointerEvents:"none",overflow:"hidden"}),getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.append(e.domElement,o.domElement);const a=new hh(r,e.domElement);a.enableDamping=!0,a.dampingFactor=.1,a.rotateSpeed=.6,a.zoomSpeed=.9,a.minDistance=po[0],a.maxDistance=po[1],a.minPolarAngle=Aa[0],a.maxPolarAngle=Aa[1],a.screenSpacePanning=!1,a.touches={ONE:fn.ROTATE,TWO:fn.DOLLY_PAN},a.mouseButtons={LEFT:Xe.ROTATE,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN},a.target.copy(Ra);const c=new Kd(16774118,15787736,1.1);s.add(c);const l=new th(16777215,2.4);l.castShadow=!0,l.shadow.mapSize.set(t.shadowSize,t.shadowSize),l.shadow.bias=-5e-4,l.shadow.normalBias=.03,l.shadow.radius=4;const u=l.shadow.camera;u.left=-9,u.right=9,u.top=9,u.bottom=-9,u.near=1,u.far=60,l.target.position.copy(Ra),s.add(l,l.target);const f=new wl(e),d=new Hx;s.environment=f.fromScene(d,.04).texture,s.environmentIntensity=.25,d.dispose(),f.dispose();const g={left:0,right:0,top:0,bottom:0},p={...g};let x={w:1,h:1};function m(){const V=(p.left-p.right)/2,q=(p.top-p.bottom)/2;Math.abs(V)<.5&&Math.abs(q)<.5?r.clearViewOffset():r.setViewOffset(x.w,x.h,-V,-q,x.w,x.h),r.updateProjectionMatrix()}const h=new Set,v=new eh;let T=3,A=!1,D=0,R=0;function P(V=2){V>T&&(T=V)}const _=()=>{const V=n.clientWidth||window.innerWidth,q=n.clientHeight||window.innerHeight;x={w:V,h:q},e.setSize(V,q,!1),o.setSize(V,q),r.aspect=V/q,m(),P()};function S(V){if(!A){R=0,D=0;return}R++,V>.03&&D++,R>=40&&(D>28&&i>.9&&(i=Math.max(.9,i-.25),e.setPixelRatio(i),e.setSize(x.w,x.h,!1)),R=0,D=0)}function b(){const V=Math.min(.1,v.getDelta());for(const et of h)et(V);let q=!1;for(const et of["left","right","top","bottom"]){const j=g[et]-p[et];Math.abs(j)>.4?(p[et]+=j*Math.min(1,V*10),q=!0):p[et]=g[et]}q&&(m(),P()),T>0?(T--,e.render(s,r),o.render(s,r),S(V),A=!0):A=!1}a.addEventListener("change",()=>P());const y=new U,w=new Ao;function L(){return w.setFromVector3(y.copy(r.position).sub(a.target)),{target:a.target.clone(),distance:w.radius,azimuth:w.theta,polar:w.phi}}function k({target:V,distance:q,azimuth:et,polar:j}){a.target.set(V.x,V.y??0,V.z),r.position.copy(a.target).add(y.setFromSphericalCoords(q,j,et)),r.lookAt(a.target)}const I=V=>V-ju*Math.floor((V+Math.PI)/ju);function G(V){const q=new U(V.target.x,V.target.y??0,V.target.z),et=new U().setFromSphericalCoords(V.distance,V.polar,V.azimuth).add(q),j=new De;return j.position.copy(et),j.lookAt(q),{pos:et,quat:j.quaternion.clone(),fov:Pl}}let O=null;function Q(){a._sphericalDelta?.set(0,0,0),a._panOffset?.set(0,0,0),"_scale"in a&&(a._scale=1)}function rt(){if(!O)return;const V=O;O=null,Q(),V.resolve(!1)}a.addEventListener("start",rt);function mt(V,{duration:q=1.1}={}){rt();const et=L(),j={target:new U(V.target?.x??et.target.x,V.target?.y??0,V.target?.z??et.target.z),distance:Ue.clamp(V.distance??et.distance,...po),azimuth:V.azimuth??et.azimuth,polar:Ue.clamp(V.polar??et.polar,...Aa)};return q>0?new Promise(dt=>{O={kind:"view",from:et,to:j,duration:q,resolve:dt,t:0,dAz:I(j.azimuth-et.azimuth),d0:Math.log(et.distance),d1:Math.log(j.distance)},P(3)}):(k(j),Q(),P(),Promise.resolve(!0))}function vt(V,{duration:q=1.2}={}){return rt(),q>0?new Promise(et=>{O={kind:"pose",pose:V,duration:q,resolve:et,t:0,fromPos:r.position.clone(),fromQuat:r.quaternion.clone(),fromFov:r.fov},P(3)}):(r.position.copy(V.pos),r.quaternion.copy(V.quat),r.fov=V.fov,r.updateProjectionMatrix(),P(),Promise.resolve(!0))}function z(V){if(!O)return;const q=O;q.t=Math.min(1,q.t+V/q.duration);const et=ph(q.t);if(q.kind==="view")y.lerpVectors(q.from.target,q.to.target,et),k({target:y.clone(),distance:Math.exp(Ue.lerp(q.d0,q.d1,et)),azimuth:q.from.azimuth+q.dAz*et,polar:Ue.lerp(q.from.polar,q.to.polar,et)});else{r.position.lerpVectors(q.fromPos,q.pose.pos,et),r.quaternion.slerpQuaternions(q.fromQuat,q.pose.quat,et);const j=Ue.lerp(q.fromFov,q.pose.fov,et);j!==r.fov&&(r.fov=j,r.updateProjectionMatrix())}P(),q.t>=1&&(O=null,Q(),q.resolve(!0))}return h.add(z),_(),new ResizeObserver(_).observe(n),document.addEventListener("visibilitychange",()=>P(3)),{renderer:e,scene:s,camera:r,controls:a,labelRenderer:o,hemi:c,sun:l,center:Ra,quality:t,insets:g,invalidate:P,invalidateShadows(){e.shadowMap.needsUpdate=!0,P()},onFrame(V){return h.add(V),()=>h.delete(V)},flyView:mt,flyPose:vt,viewPose:G,cancelFlight:rt,getView:L,get flying(){return!!O},setInsets(V){Object.assign(g,V),P()},start(){e.setAnimationLoop(b)},pause(){e.setAnimationLoop(null)},resume(){v.getDelta(),e.setAnimationLoop(b),P(3)}}}function or(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new on;let l=0;for(let u=0;u<n.length;++u){const f=n[u];let d=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const g in f.attributes){if(!i.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+g+'" attribute exists among all geometries, or in none of them.'),null;r[g]===void 0&&(r[g]=[]),r[g].push(f.attributes[g]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const g in f.morphAttributes){if(!s.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[g]===void 0&&(o[g]=[]),o[g].push(f.morphAttributes[g])}if(t){let g;if(e)g=f.index.count;else if(f.attributes.position!==void 0)g=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,g,u),l+=g}}if(e){let u=0;const f=[];for(let d=0;d<n.length;++d){const g=n[d].index;for(let p=0;p<g.count;++p)f.push(g.getX(p)+u);u+=n[d].attributes.position.count}c.setIndex(f)}for(const u in r){const f=Ku(r[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,f)}for(const u in o){const f=o[u][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<f;++d){const g=[];for(let x=0;x<o[u].length;++x)g.push(o[u][x][d]);const p=Ku(g);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(p)}}}return c}function Ku(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){const u=n[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new Mn(o,e,i);let c=0;for(let l=0;l<n.length;++l){const u=n[l];if(u.isInterleavedBufferAttribute){const f=c/e;for(let d=0,g=u.count;d<g;d++)for(let p=0;p<e;p++){const x=u.getComponent(d,p);a.setComponent(d+f,p,x)}}else o.set(u.array,c);c+=u.count*e}return s!==void 0&&(a.gpuType=s),a}const Ti=2.7,gh=.2,_h=.12,Ki=n=>(n.x1-n.x0)*(n.z1-n.z0),lt={templateId:"",bedrooms:2,scale:1,size:{w:10,d:7},rooms:[],walls:[],placements:[],area:0,totalArea:0,floors:[],floorId:"main",custom:!1};function xh(n){lt.templateId=n.templateId,lt.bedrooms=n.bedrooms,lt.scale=n.scale??1,lt.size=n.size,lt.rooms=n.rooms,lt.walls=n.walls,lt.placements=n.placements,lt.area=n.rooms.reduce((t,e)=>t+Ki(e),0),lt.floors=n.floors??[{id:"main",name:"Tầng 1",area:lt.area}],lt.floorId=n.floorId??"main",lt.totalArea=n.totalArea??lt.area,lt.custom=!!n.custom}const Wx={plus:"M12 5v14M5 12h14",minus:"M5 12h14",rotateLeft:"M3 12a9 9 0 1 0 3-6.7M3 4v5h5",rotateRight:"M21 12a9 9 0 1 1-3-6.7M21 4v5h-5",home:"M4 11 12 4l8 7M6 10v10h12V10",close:"M6 6l12 12M18 6 6 18",search:"M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",moon:"M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",sun:"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4",play:"M7 5v14l11-7z",pause:"M8 5v14M16 5v14",walk:"M13 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM10 21l2-6-3-2 1-5 3 2 2 3M12 15l3 6",jump:"M4 20h16M12 16V4M7 9l5-5 5 5",crouch:"M4 4h16M12 8v12M7 15l5 5 5-5",cube:"M12 3 4 7.5v9L12 21l8-4.5v-9zM4 7.5 12 12l8-4.5M12 12v9",pin:"M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10zM12 8.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",expand:"M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",shrink:"M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5",pencil:"M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16zM13.5 6.5l4 4",eyeOff:"M3 3l18 18M10.6 5.2A10 10 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 4M6.2 6.2A17 17 0 0 0 2 12s4 7 10 7a9.7 9.7 0 0 0 4.2-1M9.9 9.9a3 3 0 0 0 4.2 4.2",trash:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",list:"M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",undo:"M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3",eye:"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"};function te(n,t=18,e=1.8){return`<svg class="ico" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${Wx[n]??""}"/></svg>`}const Vt=n=>String(n??"").replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`),Ll=2.1,Xx=.9,vh=2.1,$x=2.3;function di(n,t=256){const e=document.createElement("canvas");e.width=e.height=t,n(e.getContext("2d"),t);const i=new wo(e);return i.wrapS=i.wrapT=cr,i.colorSpace=qe,i.anisotropy=8,i}const qx=()=>{const n={h:0,s:0,l:0};return new zt(it.floorWood).getHSL(n),di((t,e)=>{const s=e/8;for(let r=0;r<8;r++){const o=Math.round(n.l*100)-3+r*37%7;t.fillStyle=`hsl(${Math.round(n.h*360)} ${Math.round(n.s*100)}% ${o}%)`,t.fillRect(0,r*s,e,s),t.fillStyle="rgba(60,35,15,0.07)";for(let a=0;a<14;a++)t.fillRect((r*53+a*37)%e,r*s+a*29%s,30+a*17%60,1);t.fillStyle="rgba(60,35,15,0.30)",t.fillRect(0,r*s,e,1.5),t.fillRect(r*97%e,r*s,1.5,s)}})},Yx=()=>di((n,t)=>{n.fillStyle="#e9eef2",n.fillRect(0,0,t,t),n.strokeStyle="#c8d1da",n.lineWidth=3,n.strokeRect(0,0,t,t),n.strokeRect(t/2,0,.1,t),n.strokeRect(0,t/2,t,.1)}),gr=n=>()=>(n=(n*1664525+1013904223)%4294967296,n/4294967296),jx=()=>di((n,t)=>{const e=gr(7);n.fillStyle="#efece6",n.fillRect(0,0,t,t),n.lineCap="round";for(let i=0;i<9;i++){n.strokeStyle=`rgba(120,115,110,${.12+e()*.2})`,n.lineWidth=.6+e()*1.6,n.beginPath();let s=e()*t,r=0;n.moveTo(s,r);for(let o=0;o<6;o++)s+=(e()-.5)*70,r+=t/6,n.lineTo(s,r);n.stroke()}n.strokeStyle="rgba(190,185,178,0.7)",n.lineWidth=1.5,n.strokeRect(0,0,t,t)}),Kx=()=>di((n,t)=>{const e=gr(11);n.fillStyle="#b9bcc0",n.fillRect(0,0,t,t);for(let i=0;i<2200;i++){const s=150+Math.floor(e()*70);n.fillStyle=`rgba(${s},${s},${s+4},0.35)`,n.fillRect(e()*t,e()*t,1+e()*2,1+e()*2)}n.strokeStyle="rgba(90,92,96,0.45)",n.lineWidth=2,n.strokeRect(0,0,t,t)}),Zx=()=>di((n,t)=>{const e=gr(3);n.fillStyle="#c9bfb2",n.fillRect(0,0,t,t);for(let i=0;i<4200;i++){const s=175+Math.floor(e()*45);n.fillStyle=`rgba(${s},${s-8},${s-20},0.55)`,n.fillRect(e()*t,e()*t,1,2)}}),Jx=()=>di((n,t)=>{const e=gr(21),i=6,s=t/i;for(let r=0;r<i;r++){const o=17+Math.floor(e()*6);n.fillStyle=`hsl(22 38% ${o}%)`,n.fillRect(0,r*s,t,s),n.fillStyle="rgba(0,0,0,0.18)";for(let a=0;a<10;a++)n.fillRect(e()*t,r*s+e()*s,30+e()*80,1);n.fillStyle="rgba(0,0,0,0.5)",n.fillRect(0,r*s,t,1.5),n.fillRect(r*83%t,r*s,1.5,s)}}),Qx=()=>di((n,t)=>{const e=gr(31);n.fillStyle="#6f7378",n.fillRect(0,0,t,t);for(let i=0;i<3200;i++){const s=70+Math.floor(e()*130);n.fillStyle=`rgba(${s},${s},${s+3},0.6)`,n.fillRect(e()*t,e()*t,1+e()*2.2,1+e()*2.2)}n.strokeStyle="rgba(30,32,36,0.55)",n.lineWidth=2,n.strokeRect(0,0,t,t)}),tv=()=>di((n,t)=>{n.fillStyle="#f2f3f1",n.fillRect(0,0,t,t),n.strokeStyle="rgba(160,165,160,0.35)",n.lineWidth=1,n.strokeRect(0,0,t,t)}),ev=()=>di((n,t)=>{n.fillStyle="#cfe9f2",n.fillRect(0,0,t,t),n.strokeStyle="rgba(90,120,135,0.9)",n.lineWidth=5,n.strokeRect(0,0,t,t),n.strokeStyle="rgba(255,255,255,0.55)",n.lineWidth=3,n.beginPath(),n.moveTo(t*.15,t*.85),n.lineTo(t*.55,t*.15),n.stroke()}),Zu={wood:[qx,2.2,.55],darkwood:[Jx,2.2,.5],tile:[Yx,1.2,.3],marble:[jx,1.6,.15],granite:[Qx,1.6,.25],concrete:[Kx,2,.85],epoxy:[tv,2,.08],carpet:[Zx,1,1],glass:[ev,1.2,.05,{transparent:!0,opacity:.42,depthWrite:!1,metalness:.1}]},Ju=new Map;function nv(n,t){const e=n==="wood"?`wood|${it.floorWood}`:n;let i=Ju.get(e);return i||(i=t(),Ju.set(e,i)),i}function iv(n){const t=Zu[n.floor]?n.floor:"wood",[e,i,s,r]=Zu[t],o=nv(t,e).clone();return o.needsUpdate=!0,o.repeat.set((n.x1-n.x0)/i,(n.z1-n.z0)/i),new ke({map:o,roughness:s,...r??{}})}const mo=[];function Qu(n,t,e,i,s,r,o,a,c,l){if(i-e<1e-4||r-s<1e-4||a-o<1e-4)return;const u=new fe(i-e,r-s,a-o);u.translate((e+i)/2,(s+r)/2,(o+a)/2),mo.push({material:c,geo:u}),l&&t.push({x0:e,x1:i,z0:o,z1:a})}function sv(n){const t=Cn(it.frame);for(const i of[...n.children])if(i.isMesh&&i.material===t){i.updateMatrix();const s=i.geometry.clone().applyMatrix4(i.matrix);mo.push({material:t,geo:s}),i.geometry.dispose(),n.remove(i)}const e=new Map;for(const{material:i,geo:s}of mo)e.has(i)||e.set(i,[]),e.get(i).push(s);for(const[i,s]of e){const r=new Xt(or(s,!1),i);r.castShadow=!0,r.receiveShadow=!0,r.userData.blocker=!0,n.add(r);for(const o of s)o.dispose()}mo.length=0}function rv(n,t,e,i){const{dir:s,at:r,t:o}=n,a=o/2,c=n.from-a,l=n.to+a,u=o>=.2,f=Cn(u?it.wallExt:it.wall),d=[...n.openings].map(x=>({...x,s:x.c-x.w/2,e:x.c+x.w/2})).sort((x,m)=>x.s-m.s),g=(x,m,h,v,T)=>{s==="x"?Qu(t,e,x,m,h,v,r-a,r+a,f,T):Qu(t,e,r-a,r+a,h,v,x,m,f,T)};let p=c;for(const x of d){if(g(p,x.s,0,Ti,!0),x.type==="window"){const m=x.sill??Xx;g(x.s,x.e,0,m,!0),g(x.s,x.e,vh,Ti,!1),ov(t,s,r,x,m)}else if(x.type==="door"){g(x.s,x.e,Ll,Ti,!1);const m=av(t,s,r,x,u||x.entrance===!0);m.collider=s==="x"?{x0:x.s,x1:x.e,z0:r-a,z1:r+a,isDoor:!0,doorId:m.id}:{x0:r-a,x1:r+a,z0:x.s,z1:x.e,isDoor:!0,doorId:m.id},!m.isOpen&&e&&e.push(m.collider),i&&i.push(m)}else g(x.s,x.e,$x,Ti,!1);p=x.e}g(p,l,0,Ti,!0)}function ov(n,t,e,i,s){const r=vh-s,o=t==="x"?[i.w,r,.03]:[.03,r,i.w],a=new Xt(new fe(...o),Cl()),c=s+r/2;t==="x"?a.position.set(i.c,c,e):a.position.set(e,c,i.c),n.add(a);const l=i.w>1.1?1:0,u=Cn(it.frame);for(let d=-1;d<=l;d+=2){const g=l?0:d<0?-i.w/2:i.w/2,p=new Xt(new fe(...t==="x"?[.04,r,.06]:[.06,r,.04]),u);t==="x"?p.position.set(i.c+g,c,e):p.position.set(e,c,i.c+g),n.add(p)}const f=new Xt(new fe(...t==="x"?[i.w,.04,.08]:[.08,.04,i.w]),u);t==="x"?f.position.set(i.c,s+.02,e):f.position.set(e,s+.02,i.c),n.add(f)}function av(n,t,e,i,s){const r=i.w-.04,o=new Xt(new fe(r,Ll-.03,.045),Cn(s?it.doorEntrance:it.doorLeaf,{roughness:.5}));o.position.set(r/2,(Ll-.03)/2,0),o.castShadow=!0;const a=new Kt,c=Cn(it.steel??12831443,{metalness:.8,roughness:.25}),l=new Xt(new zs(.01,.01,.065,8),c);l.rotation.x=Math.PI/2,a.add(l);for(const m of[-1,1]){const h=new Xt(new fe(.09,.015,.012),c);h.position.set(.035,0,m*.032),h.castShadow=!0,a.add(h)}a.position.set(r-.08,.98,0),o.add(a);const u=new Kt;u.add(o);const f=t==="x"?0:-Math.PI/2,d=t==="x"?-1.3:-Math.PI/2+1.3,g=!s;t==="x"?(u.position.set(i.s+.02,0,e),u.rotation.y=g?d:f):(u.position.set(e,0,i.s+.02),u.rotation.y=g?d:f),n.add(u);const x={id:i.id||`door-${t}-${e}-${Math.round(i.c*100)}`,dir:t,at:e,s:i.s,e:i.e,w:i.w,c:i.c,entrance:!!s,hinge:u,leaf:o,closedRot:f,openRot:d,isOpen:g,targetRot:g?d:f};o.userData.door=x,o.userData.isDoorLeaf=!0,a.userData.door=x;for(const m of a.children)m.userData.door=x;return x}function lv(n){const t=document.createElement("button");t.type="button",t.className="room-label",t.dataset.room=n.id,t.innerHTML=`<b>${Vt(n.name)}</b><span>${Ki(n).toFixed(0)} m²</span>`;const e=new fh(t);return e.position.set((n.x0+n.x1)/2,.5,(n.z0+n.z1)/2),e}const cv=new ji({visible:!1}),uv={window:"Cửa sổ",door:"Cửa đi",open:"Ô thông"};function dv(n){const t=[];for(const e of lt.walls)for(const i of e.openings){if(!i.id)continue;const s=e.t+.3,r=e.dir==="x"?[i.w,.9,s]:[s,.9,i.w],o=new Xt(new fe(...r),cv);e.dir==="x"?o.position.set(i.c,.45,e.at):o.position.set(e.at,.45,i.c),o.userData.ref={type:"opening",id:i.id},o.userData.label=uv[i.type]??"Cửa",n.add(o),t.push({id:i.id,mesh:o})}return t}function hv(){const n=new Kt,t=new Kt,e=[],i=new Xt(new ec(60,48),Cn(it.ground,{roughness:1}));i.rotation.x=-Math.PI/2,i.position.set(lt.size.w/2,-.21,lt.size.d/2),i.receiveShadow=!0,n.add(i);const s=new Xt(new fe(lt.size.w+.9,.2,lt.size.d+.9),Cn(14932176));s.position.set(lt.size.w/2,-.1,lt.size.d/2),s.receiveShadow=!0,s.castShadow=!0,n.add(s);const r=[],o=new Map;for(const d of lt.rooms){const g=new Xt(new fe(d.x1-d.x0,.04,d.z1-d.z0),iv(d));g.position.set((d.x0+d.x1)/2,.02,(d.z0+d.z1)/2),g.receiveShadow=!0,g.userData.ref={type:"room",id:d.id},o.set(d.id,g),n.add(g);const p=lv(d);n.add(p),r.push(p)}const a=[];for(const d of lt.walls)rv(d,t,e,a);sv(t),n.add(t);const c=new Kt;n.add(c);const l=dv(c),u=new Xt(new fe(lt.size.w+.2,.1,lt.size.d+.2),Cn(it.trim,{roughness:.95}));u.position.set(lt.size.w/2,Ti+.05,lt.size.d/2),u.castShadow=!0,u.receiveShadow=!0,u.visible=!1,n.add(u);const f=lt.rooms.map(d=>{const g=new Qd(16773336,7,8,2);return g.position.set((d.x0+d.x1)/2,Ti-.3,(d.z0+d.z1)/2),n.add(g),g});return{root:n,walls:t,ceiling:u,labels:r,lamps:f,colliders:e,floors:o,openings:l,doors:a}}function Et(n,t,e,i,s,r,o,a,c){const l=new Xt(new fe(t,e,i),typeof s=="object"?s:Cn(s,c));return l.position.set(r,o+e/2,a),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function Le(n,t,e,i,s,r,o,a,c,l=24){const u=new Xt(new zs(t,e,i,l),Cn(s,c));return u.position.set(r,o+i/2,a),u.castShadow=!0,u.receiveShadow=!0,n.add(u),u}function go(n,t,e,i,s,r,o=1,a=1,c=1){const l=new Xt(new Ls(t,16,12),Cn(e));return l.position.set(i,s,r),l.scale.set(o,a,c),l.castShadow=!0,n.add(l),l}const we=(n,t,e,i={})=>({group:n,w:t,d:e,...i});function fv(n=2.4){const t=new Kt,e=.95;Et(t,n,.16,e,it.sofaDark,0,.08,0);const i=3,s=(n-.3)/i;for(let r=0;r<i;r++)Et(t,s-.02,.2,.68,it.sofa,-n/2+.15+s*(r+.5),.24,.1);Et(t,n,.5,.22,it.sofa,0,.24,-e/2+.11);for(const r of[-1,1])Et(t,.15,.36,e,it.sofa,r*(n/2-.075),.24,0);return Et(t,.45,.4,.12,it.accent,-n/2+.55,.44,-.2),Et(t,.45,.4,.12,it.fabricBeige,n/2-.55,.44,-.2),we(t,n,e)}function pv(){const n=new Kt;Et(n,.85,.16,.85,it.sofaDark,0,.08,0),Et(n,.6,.18,.6,it.fabricBeige,0,.24,.07),Et(n,.85,.5,.2,it.fabricBeige,0,.24,-.325);for(const t of[-1,1])Et(n,.13,.34,.85,it.fabricBeige,t*.36,.24,0);return we(n,.85,.85)}function mv(){const n=new Kt;Et(n,1.1,.04,.6,it.woodLight,0,.38,0);for(const t of[-1,1])for(const e of[-1,1])Et(n,.05,.38,.05,it.woodDark,t*.5,0,e*.25);return Et(n,.3,.05,.2,it.white,-.2,.42,0),Le(n,.06,.05,.1,it.accent,.25,.42,.05),we(n,1.1,.6)}let zi=null;function gv(){if(zi)return zi;if(typeof document>"u"||typeof document.createElement!="function"){const e={width:512,height:288};return zi=new wo(e),zi}const n=document.createElement("canvas");n.width=512,n.height=288;const t=n.getContext?.("2d");if(t){const e=t.createLinearGradient?.(0,0,512,288);e?(e.addColorStop(0,"#0a1128"),e.addColorStop(1,"#1c2541"),t.fillStyle=e):t.fillStyle="#0f172a",t.fillRect?.(0,0,512,288),t.fillStyle="rgba(255, 255, 255, 0.08)",t.fillRect?.(0,0,512,32),t.fillStyle="#ffffff",t.font="bold 14px system-ui, sans-serif",t.fillText?.("TH-PropTech Smart TV",16,21),t.font="12px system-ui, sans-serif",t.fillStyle="#94a3b8",t.fillText?.("20:45 | Wi-Fi 6 | 4K HDR",345,21),t.fillStyle="rgba(255, 255, 255, 0.06)",t.fillRect?.(16,44,480,136),t.fillStyle="#f59e0b",t.font="bold 19px system-ui, sans-serif",t.fillText?.("CĂN HỘ CHUNG CƯ HIỆN ĐẠI",32,86),t.fillStyle="#e2e8f0",t.font="13px system-ui, sans-serif",t.fillText?.("Trải nghiệm không gian sống 3D tích hợp công nghệ đỉnh cao",32,114),t.fillStyle="#38bdf8",t.font="12px system-ui, sans-serif",t.fillText?.("▶ Đang phát: Giới thiệu căn hộ mẫu",32,148),[{name:"Phim Ảnh",color:"#e11d48"},{name:"Âm Nhạc",color:"#10b981"},{name:"Nhà Thông Minh",color:"#c65a3a"},{name:"Cài Đặt",color:"#475569"}].forEach((s,r)=>{const o=16+r*122;t.fillStyle=s.color,t.fillRect?.(o,194,114,76),t.fillStyle="#ffffff",t.font="bold 12px system-ui, sans-serif",t.fillText?.(s.name,o+12,238)})}return zi=new wo(n),zi.colorSpace=qe,zi}function _v(n,t){let e=n;if(e&&!e.userData?.isTvScreen&&e.traverse&&e.traverse(o=>{o.userData?.isTvScreen&&(e=o)}),!e||!e.userData?.isTvScreen)return null;const s=!!!e.userData.isTvOn;e.userData.isTvOn=s;const r=e.material;if(s){const o=gv();r.color?.setHex(16777215),r.emissive?.setHex(16777215),r.emissiveIntensity=.95,r.roughness=.1,r.metalness=.1,r.map=o,r.emissiveMap=o}else r.color?.setHex(328965),r.emissive?.setHex(0),r.emissiveIntensity=0,r.roughness=.2,r.metalness=.8,r.map=null,r.emissiveMap=null;return r.needsUpdate=!0,s}function xv(n=1.8){const t=new Kt;Et(t,n,.45,.4,it.woodMid,0,0,0),Et(t,n-.1,.02,.38,it.woodDark,0,.22,.01),Et(t,1.35,.78,.05,it.black,0,.55,0),Et(t,.25,.1,.12,it.black,0,.45,0);const e=new Xt(new fe(1.28,.72,.005),new ke({color:328965,roughness:.2,metalness:.8,emissive:0,emissiveIntensity:0}));return e.name="tv_screen",e.position.set(0,.55+.78/2,.027),e.userData.isTvScreen=!0,e.userData.noMerge=!0,e.userData.isTvOn=!1,e.castShadow=!1,e.receiveShadow=!1,t.add(e),we(t,n,.4)}function vv(n,t,e=it.rug){e==="beige"&&(e=it.fabricBeige);const i=new Kt;return Et(i,n,.015,t,e,0,.04,0),Et(i,n-.3,.017,t-.3,it.fabricGrey,0,.04,0),we(i,n,t,{solid:!1})}function Mv(n=1){const t=new Kt;return Le(t,.18*n,.13*n,.32*n,it.pot,0,0,0),go(t,.3*n,it.leaf,0,.62*n,0,1,1.2,1),go(t,.2*n,it.leafDark,.12*n,.85*n,.05*n),go(t,.18*n,it.leaf,-.1*n,.95*n,-.05*n),we(t,.4*n,.4*n)}function bv(){const n=new Kt;Le(n,.12,.12,.03,it.black,0,0,0),Le(n,.012,.012,1.5,it.black,0,.03,0);const t=Le(n,.15,.22,.28,16773590,0,1.45,0,{emissive:16769704,emissiveIntensity:.6});return t.castShadow=!1,we(n,.3,.3)}function yv(n=1){const t=new Kt;Et(t,n,.04,.3,it.woodMid,0,.78,0),Et(t,n-.04,.5,.28,it.cabinet,0,.28,0);for(const e of[-1,1])Et(t,.04,.28,.04,it.woodDark,e*(n/2-.05),0,0);return Le(t,.07,.05,.16,it.pot,-.25,.82,0),Et(t,.22,.02,.15,it.accent,.2,.82,0),we(t,n,.3)}function Sv(n=1.6,t=2){const e=new Kt;Et(e,n+.1,.25,t+.05,it.woodDark,0,0,0),Et(e,n,.22,t,it.bedding,0,.25,.02),Et(e,n,.04,t*.55,it.blanket,0,.46,t*.2),Et(e,n+.1,.95,.08,it.woodMid,0,0,-t/2-0);for(const i of[-1,1])Et(e,.55,.12,.35,it.white,i*n*.25,.47,-t/2+.3);return we(e,n+.1,t+.05)}function Ev(){const n=new Kt;Et(n,.45,.5,.4,it.woodLight,0,0,0),Et(n,.4,.01,.01,it.woodDark,0,.3,.2);const t=Le(n,.09,.12,.16,16773590,0,.5,0,{emissive:16769704,emissiveIntensity:.5});return t.castShadow=!1,we(n,.45,.4)}function Tv(n=1.4,t=2.2){const e=new Kt;Et(e,n,t,.6,it.cabinet,0,0,0);const i=Math.max(2,Math.round(n/.7));for(let s=1;s<i;s++)Et(e,.012,t-.1,.01,it.cabinetDark,-n/2+n/i*s,.05,.305);for(let s=0;s<i;s++){const r=-n/2+n/i*(s+.5);Et(e,.025,.28,.02,it.steel,r+(s%2?-.1:.1),1,.31)}return we(e,n,.6)}function wv(){const n=new Kt;Et(n,1.2,.04,.6,it.woodLight,0,.72,0);for(const t of[-1,1])Et(n,.04,.72,.55,it.woodDark,t*.56,0,0);return Et(n,.5,.3,.03,it.black,0,.9,-.12),Et(n,.06,.18,.06,it.black,0,.76,-.12),Et(n,.4,.015,.14,it.white,0,.76,.1),we(n,1.2,.6)}function Av(){const n=new Kt;Et(n,.42,.04,.42,it.woodLight,0,.44,0);for(const t of[-1,1])for(const e of[-1,1])Et(n,.035,.44,.035,it.woodDark,t*.18,0,e*.18);return Et(n,.42,.42,.04,it.woodLight,0,.48,-.19),we(n,.42,.42)}function Rv(){const n=new Kt;Et(n,1.4,.05,.8,it.woodLight,0,.72,0);for(const t of[-1,1])for(const e of[-1,1])Et(n,.06,.72,.06,it.woodDark,t*.64,0,e*.34);return Le(n,.11,.08,.16,it.white,0,.77,0),go(n,.1,it.accent,0,1,0),we(n,1.4,.8)}function Cv(n=3,t=!0){const e=new Kt,i=.6;Et(e,n,.86,i,it.cabinet,0,0,0),Et(e,n+.02,.04,i+.04,it.counter,0,.86,.02);for(let s=1;s<Math.round(n/.6);s++)Et(e,.01,.8,.01,it.cabinetDark,-n/2+s*.6,.03,i/2+.005);Et(e,.7,.012,.42,it.steel,-n*.25,.9,.02),Le(e,.015,.015,.28,it.steel,-n*.25,.9,-.2),Et(e,.012,.012,.14,it.steel,-n*.25,1.17,-.13),Et(e,.6,.012,.5,it.black,n*.2,.9,.02);for(const[s,r]of[[-.14,-.1],[.14,-.1],[-.14,.12],[.14,.12]])Le(e,.08,.08,.008,it.cabinetDark,n*.2+s,.9,.02+r,{},20);return Et(e,n,.7,.35,it.cabinet,0,1.5,-.125),Et(e,.75,.12,.4,it.steel,n*.2,1.38,-.1),we(e,n,i)}function Pv(){const n=new Kt;return Et(n,.7,1.85,.7,it.steel,0,0,0,{metalness:.35,roughness:.4}),Et(n,.68,.012,.01,it.cabinetDark,0,.62,.355),Et(n,.025,.5,.03,it.cabinetDark,.28,1.1,.36),Et(n,.025,.3,.03,it.cabinetDark,.28,.25,.36),we(n,.7,.7)}function Lv(n=1.2){const t=new Kt,e=.32,i=2;Et(t,.03,i,e,it.woodMid,-n/2+.015,0,0),Et(t,.03,i,e,it.woodMid,n/2-.015,0,0),Et(t,n,.02,.01,it.woodDark,0,0,-e/2+.005),Et(t,n,i,.015,it.woodDark,0,0,-e/2+.01);const s=5,r=[it.accent,it.sofa,it.fabricBeige,it.leaf,it.blanket];for(let o=0;o<=s;o++)Et(t,n,.025,e,it.woodMid,0,(i-.025)*(o/s),0);for(let o=0;o<s;o++){const a=(i-.025)*(o/s)+.025;let c=-n/2+.07;for(let l=0;c<n/2-.12;l++){const u=.04+(o*7+l*5)%4*.012,f=.22+(o*3+l*7)%5*.025;Et(t,u,f,e*.7,r[(o+l)%r.length],c+u/2,a,.02),c+=u+.008,l%6===5&&(c+=.18)}}return we(t,n,e)}function Dv(){const n=new Kt;Et(n,1,.8,.45,it.woodLight,0,.05,0);for(const t of[-1,1])for(const e of[-1,1])Et(n,.04,.05,.04,it.woodDark,t*.45,0,e*.19);for(let t=0;t<3;t++)Et(n,.92,.002,.01,it.woodDark,0,.05+.26*(t+1)-.02,.226),Et(n,.1,.02,.025,it.steel,0,.05+.26*t+.13,.235);return Le(n,.07,.06,.12,it.pot,-.3,.85,0),Et(n,.22,.03,.16,it.accent,.25,.85,0),we(n,1,.45)}function Iv(){const n=new Kt;return Le(n,.24,.24,.03,it.woodLight,0,.47,0,{},28),Le(n,.015,.015,.47,it.black,0,0,0),Le(n,.15,.15,.02,it.black,0,0,0),Le(n,.05,.04,.09,it.pot,.06,.5,.03),we(n,.5,.5)}function Nv(){const n=new Kt;return Le(n,.28,.3,.38,it.fabricBeige,0,.02,0,{},28),Le(n,.29,.29,.04,it.sofaDark,0,.38,0,{},28),we(n,.6,.6)}function Uv(){const n=new Kt;return Le(n,.17,.17,.05,it.woodLight,0,.62,0,{},24),Le(n,.014,.014,.62,it.black,0,0,0),Le(n,.15,.15,.02,it.black,0,0,0),we(n,.36,.36)}function Ov(){const n=new Kt;return Et(n,.6,1.7,.04,it.woodDark,0,.05,0),Et(n,.5,1.6,.012,13624303,0,.1,.022,{metalness:.9,roughness:.08}),Et(n,.04,.5,.2,it.woodDark,-.2,0,-.12),Et(n,.04,.5,.2,it.woodDark,.2,0,-.12),we(n,.6,.3)}function Fv(){const n=new Kt;return Et(n,.38,.4,.2,it.white,0,.35,-.2),Et(n,.36,.38,.5,it.white,0,0,0),Et(n,.36,.04,.4,it.white,0,.38,.05),we(n,.4,.62)}function zv(){const n=new Kt;return Et(n,.6,.78,.5,it.cabinet,0,0,0),Et(n,.64,.04,.54,it.counter,0,.78,0),Et(n,.34,.01,.28,it.white,0,.82,.02),Le(n,.012,.012,.16,it.steel,0,.82,-.18),Et(n,.5,.7,.02,it.glass,0,1.15,-.24,{transparent:!0,opacity:.55,metalness:.8,roughness:.05}),we(n,.64,.54)}function Bv(){const n=new Kt;Et(n,.9,.06,.9,it.white,0,0,0);const t=new Xt(new fe(.9,1.95,.025),Cl());t.position.set(0,.06+.975,.45),n.add(t);const e=new Xt(new fe(.025,1.95,.9),Cl());return e.position.set(.45,.06+.975,0),n.add(e),Le(n,.012,.012,1.1,it.steel,-.38,1,-.38),Le(n,.09,.09,.015,it.steel,-.3,2.05,-.38),we(n,.9,.9)}function kv(n,t,e,i,s,r=0){if(e.group.position.set(i,0,s),e.group.rotation.y=r,n.add(e.group),e.solid===!1)return e.group;const o=Math.abs(Math.sin(r))>.5,a=o?e.d:e.w,c=o?e.w:e.d;return t.push({x0:i-a/2,x1:i+a/2,z0:s-c/2,z1:s+c/2}),e.group}const Hv={sofa:fv,armchair:pv,coffeeTable:mv,tvUnit:xv,rug:vv,plant:Mv,floorLamp:bv,console:yv,bed:Sv,nightstand:Ev,wardrobe:Tv,desk:wv,chair:Av,diningTable:Rv,kitchenRun:Cv,fridge:Pv,toilet:Fv,vanity:zv,shower:Bv,bookshelf:Lv,dresser:Dv,sideTable:Iv,ottoman:Nv,barStool:Uv,standingMirror:Ov};function Gv(n){n.updateMatrixWorld(!0);const t=new Map;for(const e of[...n.children]){if(!e.isMesh||e.userData.noMerge)continue;const i=e.material.uuid+(e.castShadow?"c":"n");t.has(i)||t.set(i,{material:e.material,cast:e.castShadow,geos:[]});const s=e.geometry.clone();s.applyMatrix4(e.matrix),t.get(i).geos.push(s),e.geometry.dispose(),n.remove(e)}for(const e of t.values()){const i=e.geos.length>1?or(e.geos,!1):e.geos[0];if(e.geos.length>1)for(const r of e.geos)r.dispose();const s=new Xt(i,e.material);s.castShadow=e.cast,s.receiveShadow=!0,n.add(s)}}function Vv(){const n=new Kt,t=[],e=new Map;for(const i of lt.placements){const s=Hv[i.kind];if(!s)throw new Error("Thiếu builder nội thất: "+i.kind);const r=s(...i.args??[]);(i.pick===!1||i.hidden)&&(r.solid=!1),Gv(r.group);const o=kv(n,t,r,i.x,i.z,i.rot??0);o.name=i.id,i.hidden&&(o.visible=!1),e.set(i.id,o)}return{root:n,colliders:t,groups:e}}const Wi={room:new Map,item:new Map,opening:new Map},Wv={window:"Cửa sổ",door:"Cửa đi",open:"Ô thông"};function Mh(n,t){return lt.rooms.find(e=>n>=e.x0&&n<=e.x1&&t>=e.z0&&t<=e.z1)??null}function bh(){Wi.room=new Map(lt.rooms.map(n=>[n.id,{...n,type:"room",area:Ki(n)}])),Wi.item=new Map(lt.placements.filter(n=>n.pick).map(n=>[n.id,{...n,type:"item",roomId:Mh(n.x,n.z)?.id??null,dims:null}])),Wi.opening=new Map(lt.walls.flatMap(n=>n.openings.filter(t=>t.id).map(t=>[t.id,{...t,kind:t.type,type:"opening",name:Xv(t.type),dir:n.dir,at:n.at,wallFrom:n.from,wallTo:n.to,roomId:null}])))}const Xv=n=>Wv[n]??"Cửa",re={get:(n,t)=>Wi[n]?.get(t)??null,list:n=>[...Wi[n]?.values()??[]],itemsIn:n=>[...Wi.item.values()].filter(t=>t.roomId===n),room:n=>Wi.room.get(n)??null},Jr=.14,$v=new zt(15985891),qv=new zt(15913909),Yv=new zt(16758904),jv=new zt(16775406);function Kv(n){const t=[];n.traverse(e=>{e.isCSS2DObject&&t.push(e)});for(const e of t)e.removeFromParent()}function Zv(n){n.traverse(t=>{t.isMesh&&(t.geometry?.dispose(),t.material?.map&&(t.material.map.dispose(),t.material.dispose()))})}function Jv(n){const{scene:t,sun:e,hemi:i,quality:s}=n;let r=null,o=[],a=null,c=[];const l=new Map,u=new Map,f=[],d=[];let g=!1;const p=[],x=[],m=(b,y)=>`${b}:${y}`;let h=Jr,v=Jr,T=1.5,A=!1,D=10;function R(){for(const b of[r?.root,a?.root])b&&(Kv(b),t.remove(b),Zv(b));r=a=null,c=[],l.clear(),u.clear(),f.length=0,d.length=0,p.length=0,x.length=0}function P(){const b=lt.size.w,y=lt.size.d;n.center.set(b/2,0,y/2),e.target.position.copy(n.center);const w=Math.max(b,y)*.9,L=e.shadow.camera;L.left=-w,L.right=w,L.top=w,L.bottom=-w,L.updateProjectionMatrix()}function _(){if(r=hv(),o=r.doors||[],a=Vv(),t.add(r.root,a.root),!s.pointLights)for(const y of r.lamps)r.root.remove(y);c=s.pointLights?r.lamps:[];for(const y of re.list("room")){const w=r.floors.get(y.id);l.set(m("room",y.id),w),f.push(w),u.set(m("room",y.id),new Rn(new U(y.x0,0,y.z0),new U(y.x1,.08,y.z1)))}const b=new U;for(const y of re.list("item")){const w=a.groups.get(y.id);if(!w)continue;w.userData.ref={type:"item",id:y.id},l.set(m("item",y.id),w),f.push(w);const L=new Rn().setFromObject(w);u.set(m("item",y.id),L),L.getSize(b),y.dims={w:b.x,d:b.z,h:b.y}}for(const y of r.openings)l.set(m("opening",y.id),y.mesh),u.set(m("opening",y.id),new Rn().setFromObject(y.mesh)),d.push(y.mesh);g&&f.push(...d),p.push(...r.walls.children.filter(y=>y.isMesh)),x.push(...r.colliders,...a.colliders),P(),S.snapWalking(A),S.setHour(D)}const S={pickables:f,blockers:p,colliders:x,get doors(){return o},toggleDoor(b){const y=typeof b=="string"?o.find(L=>L.id===b):b;if(!y)return null;const w=!y.isOpen;if(y.isOpen=w,y.targetRot=w?y.openRot:y.closedRot,y.collider){const L=x.indexOf(y.collider);w&&L>=0?x.splice(L,1):!w&&L<0&&x.push(y.collider)}return n.invalidate(),y},get walls(){return r?.walls},get ceiling(){return r?.ceiling},get labels(){return r?.labels??[]},getObject:(b,y)=>l.get(m(b,y))??null,getBox:(b,y=new Rn)=>{const w=u.get(m(b.type,b.id));return w?y.copy(w):null},getEntityPosition(b,y,w=new U){const L=u.get(m(b,y));return L?L.getCenter(w):null},setEditing(b){g=b;for(const y of d){const w=f.indexOf(y);b&&w<0&&f.push(y),!b&&w>=0&&f.splice(w,1)}},moveItem(b,y,w){const L=l.get(m("item",b));if(!L)return;L.position.x=y,L.position.z=w;const k=u.get(m("item",b));k&&k.setFromObject(L),n.invalidate()},rebuild(){R(),_(),n.invalidateShadows()},setWalking(b){A=b,h=b?1:Jr,T=b?16:1.5,t.environmentIntensity=b?.8:.25,!b&&r&&(r.ceiling.visible=!1),n.invalidate(3)},setCeiling(b){r&&(r.ceiling.visible=b),n.invalidateShadows()},setHour(b){D=b;const w=Ue.clamp((b-6)/12,0,1)*Math.PI,L=Math.sin(w),k=n.center;e.position.set(k.x-Math.cos(w)*16,3+L*15,k.z+8),e.intensity=.7+2.3*L,e.color.lerpColors(Yv,jv,Math.min(1,L*1.6)),i.intensity=.7+.6*L,t.background.lerpColors(qv,$v,Math.min(1,L*1.6)),t.fog.color.copy(t.background),n.invalidateShadows()},update(b){r&&v!==h&&(v+=(h-v)*Math.min(1,b*5),Math.abs(h-v)<.002&&(v=h),r.walls.scale.y=v,n.invalidateShadows());for(const y of c)y.intensity!==T&&(y.intensity+=(T-y.intensity)*Math.min(1,b*4),Math.abs(T-y.intensity)<.02&&(y.intensity=T),n.invalidate());for(const y of o){const w=y.targetRot-y.hinge.rotation.y;Math.abs(w)>.003?(y.hinge.rotation.y+=w*Math.min(1,b*9),n.invalidate()):y.hinge.rotation.y!==y.targetRot&&(y.hinge.rotation.y=y.targetRot,n.invalidateShadows())}},snapWalking(b){A=b,v=h=b?1:Jr,T=b?16:1.5,t.environmentIntensity=b?.8:.25,r&&(r.walls.scale.y=v,r.ceiling.visible=b);for(const y of c)y.intensity=T;n.invalidateShadows()},wallHeight:Ti};return _(),S}const $e=1.62,ei=.85,Qv=14,tM=3.26,bs=.12,eM=.95,pr=.28,nM=1.9,iM=3.4,td=.0036,Qr=.3,sM=.05,ed={KeyW:[0,-1],ArrowUp:[0,-1],KeyS:[0,1],ArrowDown:[0,1],KeyA:[-1,0],KeyD:[1,0]},Ca={ArrowLeft:1,ArrowRight:-1,KeyQ:1,KeyE:-1};function cc(n,t,e,i=pr){const s=Math.max(n.x0,Math.min(t,n.x1)),r=Math.max(n.z0,Math.min(e,n.z1)),o=t-s,a=e-r;return o*o+a*a<i*i}function Dl(n,t,e=pr,i=[]){let s=2.7;if(lt?.walls)for(const r of lt.walls){const o=(r.t??.12)/2;for(const a of r.openings??[]){if(a.type!=="door"&&a.type!=="open")continue;const c=a.type==="door"?2.1:2.3,l=a.c-a.w/2,u=a.c+a.w/2;let f,d,g,p;r.dir==="x"?(f=l,d=u,g=r.at-o,p=r.at+o):(f=r.at-o,d=r.at+o,g=l,p=u);const x=Math.max(f,Math.min(n,d)),m=Math.max(g,Math.min(t,p)),h=n-x,v=t-m;h*h+v*v<e*e&&c<s&&(s=c)}}if(i)for(const r of i)r.y0!==void 0&&r.y0<s&&cc(r,n,t,e)&&r.y0<s&&(s=r.y0);return s}function Pa(n,t,e,i=$e+bs){for(const s of n)if(!(s.y0!==void 0&&s.y0>i)&&!(s.y1!==void 0&&s.y1<0)&&cc(s,t,e))return!0;return!1}function rM(n,t,e,i,s){const r=$e+bs;if(Dl(t,e,pr,n)<r||typeof s=="function"&&!s(t,e,r))return!1;for(const a of n)if(a.y0!==void 0&&a.y0<r&&(a.y1===void 0||a.y1>i)&&cc(a,t,e))return!1;return!0}function oM({camera:n,dom:t,colliders:e,clearanceCheck:i}){const s={x:5,z:.7,yaw:Math.PI,pitch:0,enabled:!1,jumpY:0,vy:0,grounded:!0,eyeHeight:$e,crouching:!1,crouchBlocked:!1,targetEyeHeight:$e,posture:"standing"},r=new Set;let o=!1,a=!1,c=null,l=null;const u={x:0,z:0};function f(){return!s.enabled||!s.grounded||Dl(s.x,s.z,pr,e)<=s.eyeHeight+bs?!1:(s.vy=tM,s.grounded=!1,s.posture="jumping",!0)}const d=h=>{if(!(!s.enabled||/^(INPUT|TEXTAREA|SELECT)$/.test(h.target?.tagName??""))){if(h.code==="Space"&&!h.repeat){f(),h.preventDefault?.();return}if(h.code==="KeyC"){h.repeat||(a=!a,s.targetEyeHeight=a?ei:$e),h.preventDefault?.();return}if(h.code==="ControlLeft"||h.code==="ControlRight"){o=!0,s.targetEyeHeight=ei,h.preventDefault?.();return}(ed[h.code]||Ca[h.code]||h.code==="ShiftLeft")&&(r.add(h.code),h.preventDefault?.())}},g=h=>{r.delete(h.code),(h.code==="ControlLeft"||h.code==="ControlRight")&&(o=!1,a||(s.targetEyeHeight=$e))},p=()=>{r.clear(),o=!1,a=!1,s.targetEyeHeight=$e};window.addEventListener("keydown",d),window.addEventListener("keyup",g),window.addEventListener("blur",p),t.addEventListener("pointerdown",h=>{s.enabled&&(c={id:h.pointerId,x:h.clientX,y:h.clientY},t.setPointerCapture?.(h.pointerId))}),t.addEventListener("pointermove",h=>{!c||h.pointerId!==c.id||(s.yaw-=(h.clientX-c.x)*td,s.pitch=Ue.clamp(s.pitch-(h.clientY-c.y)*td,-1.25,1.25),c.x=h.clientX,c.y=h.clientY)});const x=h=>{c&&h.pointerId===c.id&&(c=null)};t.addEventListener("pointerup",x),t.addEventListener("pointercancel",x);function m(){n.position.set(s.x,s.eyeHeight+s.jumpY,s.z),n.rotation.set(s.pitch,s.yaw,0,"YXZ")}return{state:s,jump:f,setCrouch(h){a=!!h,h||(o=!1),s.targetEyeHeight=a?ei:$e},toggleCrouch(){a=!a,a||(o=!1),s.targetEyeHeight=a?ei:$e},set(h,v,T,A=0){s.x=h,s.z=v,s.yaw=T,s.pitch=A,s.jumpY=0,s.vy=0,s.grounded=!0},setEnabled(h){s.enabled=h,l=null,h||(r.clear(),o=!1,a=!1,c=null,u.x=u.z=0,s.jumpY=0,s.vy=0,s.grounded=!0,s.crouching=!1,s.crouchBlocked=!1,s.eyeHeight=$e,s.targetEyeHeight=$e,s.posture="standing")},setAxis(h,v){u.x=h,u.z=v},press(h,v){h==="Space"?v&&f():h==="KeyC"?v&&(a=!a,s.targetEyeHeight=a?ei:$e):h==="ControlLeft"||h==="ControlRight"?(o=!!v,s.targetEyeHeight=o||a?ei:$e):v?r.add(h):r.delete(h)},update(h){if(!s.enabled)return!1;const v=Math.min(h,sM);o||a?(s.targetEyeHeight=ei,s.crouchBlocked=!1):rM(e,s.x,s.z,s.eyeHeight,i)?(s.targetEyeHeight=$e,s.crouchBlocked=!1):(s.targetEyeHeight=ei,s.crouchBlocked=!0);const A=s.targetEyeHeight-s.eyeHeight;if(Math.abs(A)>.001?s.eyeHeight+=A*(1-Math.exp(-14*v)):s.eyeHeight=s.targetEyeHeight,s.crouching=s.eyeHeight<$e-.05||s.targetEyeHeight===ei,!s.grounded||s.jumpY>0||s.vy!==0){s.vy-=Qv*v,s.jumpY+=s.vy*v;const b=Dl(s.x,s.z,pr,e);s.eyeHeight+s.jumpY+bs>=b&&(s.jumpY=Math.max(0,b-s.eyeHeight-bs),s.vy>0&&(s.vy=0)),s.jumpY<=0?(s.jumpY=0,s.vy=0,s.grounded=!0):s.grounded=!1}!s.grounded||s.jumpY>.001?s.posture="jumping":s.crouching?s.posture="crouching":s.posture="standing";for(const b of r)Ca[b]&&(s.yaw+=Ca[b]*1.8*v);let D=u.x,R=u.z;for(const b of r){const y=ed[b];y&&(D+=y[0],R+=y[1])}if(D||R){const b=Math.max(1,Math.hypot(D,R));D/=b,R/=b;let y=nM;s.crouching?y=eM:r.has("ShiftLeft")&&(y=iM);const w=y*v,L=Math.sin(s.yaw),k=Math.cos(s.yaw),I=(D*k+R*L)*w,G=(-D*L+R*k)*w,O=Ue.clamp(s.x+I,Qr,lt.size.w-Qr),Q=Ue.clamp(s.z+G,Qr,lt.size.d-Qr),rt=s.eyeHeight+bs,mt=Pa(e,s.x,s.z,rt);(mt||!Pa(e,O,s.z,rt))&&(s.x=O),(mt||!Pa(e,s.x,Q,rt))&&(s.z=Q)}m();const P=s.eyeHeight+s.jumpY,_=s.x+s.z*31+P*73+s.yaw*57+s.pitch*91,S=l===null||Math.abs(_-l)>1e-4;return l=_,S},applyToCamera:m,dispose(){window.removeEventListener("keydown",d),window.removeEventListener("keyup",g),window.removeEventListener("blur",p)}}}const aM={mode:"overview",roomId:null,selection:null,hover:null,hour:10,playing:!1,menu:null,searchQuery:"",editable:!1,editing:!1,tool:null,listingArea:0,floorId:null,editPanel:null,designs:[],designId:null};function lM(n){let t={...n};const e=new Set;return{get state(){return t},set(i){const s=t,r=Object.keys(i).filter(o=>!Object.is(s[o],i[o]));if(r.length){t={...s,...i};for(const o of[...e])o(t,s,r)}},subscribe(i){return e.add(i),()=>e.delete(i)}}}const W=lM(aM);W.select=function(t){if(!t)return W.set({selection:null});const e=re.get(t.type,t.id);if(!e)return;const i=t.type==="opening"?W.state.roomId:e.roomId??e.id;W.set({selection:{type:t.type,id:t.id},roomId:i,menu:null})};function cM(){const n=new Map;return{on(t,e){return n.has(t)||n.set(t,new Set),n.get(t).add(e),()=>n.get(t)?.delete(e)},emit(t,e){for(const i of[...n.get(t)??[]])i(e)}}}const wt=cM();function Il(n){return!Number.isFinite(n)||n<=0?1:Math.min(2.2,Math.max(1,1.1/n))}const yh=(n,t)=>Math.min(po[1],n*Il(t));function uM(n=1.6){const{w:t,d:e}=lt.size;return{target:{x:t/2,y:0,z:e/2},distance:yh(Math.max(t,e)*1.1+7.5,n),azimuth:Math.PI-.5,polar:.95}}function dM(){for(const n of lt.walls){const t=n.openings.find(e=>e.entrance);if(t)return n.dir==="x"?{x:t.c,z:n.at+.75,yaw:n.at===0?Math.PI:0}:{x:n.at+.75,z:t.c,yaw:n.at===0?-Math.PI/2:Math.PI/2}}return{x:lt.size.w/2,z:lt.size.d/2,yaw:Math.PI}}const hM={zoomIn:.75,zoomOut:1.33},to=Math.PI/6,eo=.12;function fM(n,t,e){const{camera:i,controls:s}=n,r=new U;let o=!1,a=null;const c=()=>a??n.getView();function l(z,V){const q={...n.getView(),...z,target:z.target??s.target.clone()};a=q,n.flyView(z,V).then(()=>{a===q&&(a=null)})}let u=null;function f(){const z=uM(i.aspect);return u={distance:z.distance,aspect:i.aspect},z}function d(z){const V=c(),q=z.x1-z.x0,et=z.z1-z.z0,j=yh(Math.max(q,et)*1.45+3.5,i.aspect);return u={distance:j,aspect:i.aspect},{target:{x:(z.x0+z.x1)/2,y:0,z:(z.z0+z.z1)/2},distance:j,azimuth:V.azimuth,polar:Ue.clamp(V.polar,.7,1.1)}}function g(z,V=8){const q=t.getEntityPosition(z.type,z.id,new U);if(!q)return null;const et=c();return{target:{x:q.x,y:0,z:q.z},distance:V,azimuth:et.azimuth,polar:Ue.clamp(et.polar,.7,1.1)}}let p="standing",x=null,m=null;function h({x:z,z:V,yaw:q,pitch:et=0}){const j=new An().setFromEuler(new vn(et,q,0,"YXZ"));return{pos:new U(z,$e,V),quat:j,fov:Js}}function v(z,V){if(!V||V.x===void 0||V.z===void 0)return!1;const q=V.rot??0,et=Math.abs(Math.sin(q))>.5,j=et?V.dims?.d??V.dims?.len??.95:V.dims?.w??2.4,dt=et?V.dims?.w??2.4:V.dims?.d??V.dims?.len??.95,ct=V.x-j/2,Ct=V.x+j/2,It=V.z-dt/2,Dt=V.z+dt/2;return Math.abs(z.x0-ct)<.1&&Math.abs(z.x1-Ct)<.1&&Math.abs(z.z0-It)<.1&&Math.abs(z.z1-Dt)<.1}function T(z,V,q=.28,et=null){const j=lt?.size?.w??10,dt=lt?.size?.d??7;if(z<.35||z>j-.35||V<.35||V>dt-.35)return!1;for(const ct of t.colliders||[]){if(et&&v(ct,et))continue;const Ct=Math.max(ct.x0,Math.min(z,ct.x1)),It=Math.max(ct.z0,Math.min(V,ct.z1)),Dt=z-Ct,ie=V-It;if(Dt*Dt+ie*ie<q*q)return!1}return!0}function A(z,V,q){const et=z?.rot??0;if(V==="sitting"){const dt=(z?.dims?.d??.95)/2+.55,ct=(z?.x??5)+Math.sin(et)*dt,Ct=(z?.z??.7)+Math.cos(et)*dt;if(T(ct,Ct))return{x:ct,z:Ct,yaw:et+Math.PI}}else if(V==="lying"){const dt=(z?.dims?.w??1.6)/2+.5,ct=(z?.x??5)+Math.cos(et)*dt,Ct=(z?.z??.7)-Math.sin(et)*dt;if(T(ct,Ct))return{x:ct,z:Ct,yaw:et+Math.PI};const It=(z?.x??5)-Math.cos(et)*dt,Dt=(z?.z??.7)+Math.sin(et)*dt;if(T(It,Dt))return{x:It,z:Dt,yaw:et+Math.PI};const $t=(z?.dims?.d??z?.dims?.len??2)/2+.55,le=(z?.x??5)+Math.sin(et)*$t,he=(z?.z??.7)+Math.cos(et)*$t;if(T(le,he))return{x:le,z:he,yaw:et+Math.PI}}return q&&T(q.x,q.z,.28,z)?{x:q.x,z:q.z,yaw:q.yaw??Math.PI}:T(5,1.5)?{x:5,z:1.5,yaw:Math.PI}:{x:lt?.size?.w/2,z:lt?.size?.d/2,yaw:Math.PI}}async function D(z,V=.8){if(!z||p!=="standing"||W.state.mode!=="walk")return!1;const q=re.get("item",z.id)??z;m={x:e.state.x,z:e.state.z,yaw:e.state.yaw,pitch:e.state.pitch},e.setEnabled(!1),s.enabled=!1;const et=q.rot??0,j=q.x+Math.sin(et)*.08,dt=q.z+Math.cos(et)*.08,ct=1.1,Ct=et+Math.PI,It=0;p="sitting",x=q.id,W.set({posture:"sitting",activeFurnitureId:q.id});const Dt=new An().setFromEuler(new vn(It,Ct,0,"YXZ")),ie={pos:new U(j,ct,dt),quat:Dt,fov:Js},$t=await n.flyPose(ie,{duration:V});return $t&&p==="sitting"&&(e.set(j,dt,Ct,It),n.invalidate()),$t}async function R(z,V=.9){if(!z||p!=="standing"||W.state.mode!=="walk")return!1;const q=re.get("item",z.id)??z;m={x:e.state.x,z:e.state.z,yaw:e.state.yaw,pitch:e.state.pitch},e.setEnabled(!1),s.enabled=!1;const et=q.rot??0,j=q.x-Math.sin(et)*.65,dt=q.z-Math.cos(et)*.65,ct=.65,Ct=et+Math.PI,It=-.35;p="lying",x=q.id,W.set({posture:"lying",activeFurnitureId:q.id});const Dt=new An().setFromEuler(new vn(It,Ct,0,"YXZ")),ie={pos:new U(j,ct,dt),quat:Dt,fov:Js},$t=await n.flyPose(ie,{duration:V});return $t&&p==="lying"&&(e.set(j,dt,Ct,It),n.invalidate()),$t}async function P(z=.7){if(p==="standing"||W.state.mode!=="walk")return!1;const V=p,q=x?re.get("item",x)??{}:null;p="standing",x=null,W.set({posture:"standing",activeFurnitureId:null});const et=A(q,V,m);e.setEnabled(!1);const j=new An().setFromEuler(new vn(0,et.yaw,0,"YXZ")),dt={pos:new U(et.x,$e,et.z),quat:j,fov:Js},ct=await n.flyPose(dt,{duration:z});return ct&&W.state.mode==="walk"&&(e.set(et.x,et.z,et.yaw,0),e.setEnabled(!0),n.invalidate()),ct}async function _(z,V=1.4){p!=="standing"&&(p="standing",x=null,W.set({posture:"standing",activeFurnitureId:null})),s.enabled=!1,e.setEnabled(!1),t.setWalking(!0),e.set(z.x,z.z,z.yaw,0),!(!await n.flyPose(h(z),{duration:V})||W.state.mode!=="walk")&&(t.setCeiling(!0),e.setEnabled(!0),n.invalidate())}async function S(z=f(),V=1.4){p!=="standing"&&(p="standing",x=null,W.set({posture:"standing",activeFurnitureId:null})),e.setEnabled(!1),t.setWalking(!1);const q=n.viewPose({...z,target:z.target});!await n.flyPose(q,{duration:V})||W.state.mode!=="overview"||(n.camera.fov=q.fov,n.camera.updateProjectionMatrix(),s.target.set(z.target.x,0,z.target.z),s.enabled=!0,s.update(),n.invalidate())}function b(z){return z?.stand??dM()}function y(z){const V=re.room(W.state.roomId);z==="walk"?_(b(V)):S(V?d(V):f())}function w(z){const V=re.room(z);if(V)if(p!=="standing"&&(p="standing",x=null,W.set({posture:"standing",activeFurnitureId:null})),W.set({roomId:z}),W.state.mode==="walk"){e.setEnabled(!1);const q=b(V);e.set(q.x,q.z,q.yaw,0),n.flyPose(h(q),{duration:1}).then(et=>{et&&W.state.mode==="walk"&&e.setEnabled(!0)})}else l(d(V),{duration:1.1})}function L(z){if(i.updateMatrixWorld(),r.copy(z).project(i),r.z>1)return null;const V=n.renderer.domElement.clientWidth,q=n.renderer.domElement.clientHeight,{left:et,right:j,top:dt,bottom:ct}=n.insets,Ct=(r.x+1)/2*V,It=(1-r.y)/2*q,Dt=Math.max(1,V-et-j),ie=Math.max(1,q-dt-ct);return{fx:(Ct-et)/Dt,fy:(It-dt)/ie}}function k(z){if(W.state.mode!=="overview"||n.flying)return;const V=t.getEntityPosition(z.type,z.id,new U);if(!V)return;const q=n.getView(),et=L(V.clone().setY(.4));if(et&&et.fx>eo&&et.fx<1-eo&&et.fy>eo&&et.fy<1-eo&&q.distance<22)return;const dt=g(z,Math.min(q.distance,9));dt&&l(dt,{duration:.9})}function I(z){const V=t.getEntityPosition(z.type,z.id,new U);if(V)if(p!=="standing"&&(p="standing",x=null,W.set({posture:"standing",activeFurnitureId:null})),W.state.mode==="walk"){const q=re.room(W.state.roomId)??re.room(Mh(V.x,V.z)?.id),et=q?(q.x0+q.x1)/2:V.x,j=q?(q.z0+q.z1)/2:V.z,dt=new Ft(et-V.x,j-V.z);dt.lengthSq()<1e-4&&dt.set(0,1),dt.normalize();const ct={x:Ue.clamp(V.x+dt.x*1.9,.35,9.65),z:Ue.clamp(V.z+dt.y*1.9,.35,6.65)},Ct=Math.atan2(-(V.x-ct.x),-(V.z-ct.z));e.setEnabled(!1),e.set(ct.x,ct.z,Ct,-.12),n.flyPose(h({...ct,yaw:Ct,pitch:-.12}),{duration:.9}).then(It=>{It&&W.state.mode==="walk"&&e.setEnabled(!0)})}else{const q=g(z,z.type==="room"?12:6.5);q&&l(q,{duration:1})}}function G({cmd:z}={}){if(W.state.mode==="walk"){z==="rotateLeft"||z==="rotateRight"?(e.state.yaw+=z==="rotateLeft"?to:-to,n.invalidate()):z==="home"&&w(W.state.roomId??"living");return}const V=c(),q={target:V.target,distance:V.distance,azimuth:V.azimuth,polar:V.polar};switch(z){case"zoomIn":case"zoomOut":return l({...q,distance:V.distance*hM[z]},{duration:.45});case"rotateLeft":case"rotateRight":return l({...q,azimuth:V.azimuth+(z==="rotateLeft"?-to:to)},{duration:.6});case"home":return l(f(),{duration:1.1})}}const O=[W.subscribe((z,V,q)=>{n.invalidate(),q.includes("mode")&&!o?y(z.mode):q.includes("selection")&&z.selection&&z.selection.type==="item"&&!z.editing&&k(z.selection)}),wt.on("room:go",({id:z})=>w(z)),wt.on("camera:locate",z=>z.type==="room"?w(z.id):I(z)),wt.on("camera:cmd",G),wt.on("furniture:sit",({item:z})=>D(z)),wt.on("furniture:lie",({item:z})=>R(z)),wt.on("furniture:stand",()=>P())];let Q=null;const rt=()=>{if(!u||W.state.mode!=="overview"||n.flying||Il(i.aspect)===Il(u.aspect)||Math.abs(n.getView().distance-u.distance)>.05)return;const z=re.room(W.state.roomId);l(z?d(z):f(),{duration:.6})},mt=()=>{clearTimeout(Q),Q=setTimeout(rt,250)};globalThis.addEventListener?.("resize",mt);const vt={start({walk:z=!1,room:V=null}={}){a=null;const q=V?re.room(V):null;if(q&&W.set({roomId:q.id}),z){o=!0,W.set({mode:"walk"}),o=!1,s.enabled=!1;const et=b(q);e.set(et.x,et.z,et.yaw,0),e.applyToCamera(),i.fov=Js,i.updateProjectionMatrix(),t.snapWalking(!0),e.setEnabled(!0)}else o=!0,W.set({mode:"overview"}),o=!1,e.setEnabled(!1),i.fov=Pl,i.updateProjectionMatrix(),t.snapWalking(!1),s.enabled=!0,n.flyView(q?d(q):f(),{duration:0})},update(){W.state.mode==="overview"&&s.enabled&&!n.flying&&s.update()},sitOn:D,lieOn:R,standUp:P,getPosture:()=>p,isSeatedOrLying:()=>p==="sitting"||p==="lying",getActiveItemId:()=>x,dispose(){O.forEach(z=>z()),clearTimeout(Q),globalThis.removeEventListener?.("resize",mt)}};return n.director=vt,t.director=vt,n.walker=e,vt}const nd=6,pM=.12,mM=.05,Sh=(n,t)=>n===t||!!n&&!!t&&n.type===t.type&&n.id===t.id;function gM(n,t){const e=new Kt;e.name="interaction-overlay",n.scene.add(e);const i=_M(n,t),s=id(e,"selected"),r=id(e,"hover"),o=()=>{const{hover:l,selection:u}=W.state;s.show(u,t),r.show(Sh(l,u)?null:l,t),n.invalidate()},a=W.subscribe((l,u,f)=>{(f.includes("selection")||f.includes("hover"))&&o()}),c={refresh:o,update(l){i.update(l)},getActivePrompt(){return i.getActivePrompt()},getActiveTarget(){return i.getActiveTarget()},findInteractableInCenter(l=2.8){return i.findInteractableInCenter(l)},findDoorInCenter(l=2.8){return i.findDoorInCenter(l)},triggerActive(){return i.triggerActive()},dispose(){a(),i.dispose(),n.scene.remove(e)}};return n.interaction=c,c}function _M(n,t){const e=()=>n.director||t.director;function i(P,_,S=3.5){if(!t.doors?.length)return null;const b=o.getBoundingClientRect();c.set((P-b.left)/b.width*2-1,-((_-b.top)/b.height)*2+1),a.setFromCamera(c,n.camera);const y=[];for(const k of t.doors)y.push(k.leaf);const w=a.intersectObjects([...y,...t.blockers],!0);if(!w.length)return null;const L=w[0];if(L.distance>S||L.object.userData?.blocker||t.blockers.includes(L.object))return null;for(let k=L.object;k;k=k.parent)if(k.userData?.door)return k.userData.door;return null}function s(P=2.8){const _=e(),S=_?.getPosture?.()??W.state.posture;if(S==="sitting")return{type:"sitting",id:W.state.activeFurnitureId??_?.getActiveItemId?.(),label:"Đứng dậy",action:()=>{_?.standUp?.()||wt.emit("furniture:stand"),n.invalidate?.()},object:null,target:null};if(S==="lying")return{type:"lying",id:W.state.activeFurnitureId??_?.getActiveItemId?.(),label:"Rời giường",action:()=>{_?.standUp?.()||wt.emit("furniture:stand"),n.invalidate?.()},object:null,target:null};if(W.state.mode!=="walk"||W.state.editing)return null;c.set(0,0),a.setFromCamera(c,n.camera);const b=[];if(t.doors?.length)for(const L of t.doors)L.leaf&&b.push(L.leaf);const y=[...b,...t.pickables||[],...t.blockers||[]],w=a.intersectObjects(y,!0);if(!w.length)return null;for(const L of w){if(L.distance>P||L.object.userData?.blocker||t.blockers?.includes(L.object))break;let k=null;for(let O=L.object;O;O=O.parent)if(O.userData?.door){k=O.userData.door;break}if(k)return{type:"door",id:k.id,label:k.isOpen?"Đóng cửa":"Mở cửa",action:()=>{t.toggleDoor(k),n.invalidate?.()},object:L.object,target:k};let I=null,G=null;for(let O=L.object;O;O=O.parent)if(O.userData?.ref&&re.get(O.userData.ref.type,O.userData.ref.id)){I=O.userData.ref,G=O;break}if(I&&I.type==="item"){const O=re.get("item",I.id);if(O){const Q=O.kind;if(Q==="sofa"||Q==="armchair"||Q==="chair")return{type:Q,id:O.id,label:"Ngồi ghế",action:()=>{const rt=e();rt?rt.sitOn(O):wt.emit("furniture:sit",{item:O}),n.invalidate?.()},object:G,target:O};if(Q==="bed")return{type:"bed",id:O.id,label:"Nằm xuống",action:()=>{const rt=e();rt?rt.lieOn(O):wt.emit("furniture:lie",{item:O}),n.invalidate?.()},object:G,target:O};if(Q==="tvUnit"){let rt=null;G.traverse(vt=>{vt.userData?.isTvScreen&&(rt=vt)});const mt=!!rt?.userData?.isTvOn;return{type:"tvUnit",id:O.id,label:mt?"Tắt TV":"Bật TV",action:()=>{_v(rt||G),n.invalidate?.()},object:rt||G,target:O}}}}I&&I.type}return null}function r(P=2.8){const _=s(P);if(_&&_.type==="door")return _.target;if(!t.doors?.length)return null;c.set(0,0),a.setFromCamera(c,n.camera);const S=[];for(const w of t.doors)S.push(w.leaf);const b=a.intersectObjects([...S,...t.blockers],!0);if(!b.length)return null;const y=b[0];if(y.distance>P||y.object.userData?.blocker||t.blockers.includes(y.object))return null;for(let w=y.object;w;w=w.parent)if(w.userData?.door)return w.userData.door;return null}const o=n.renderer.domElement,a=new ac,c=new Ft;let l=null,u=null,f=!1,d=0,g=null,p=null;function x(P,_){const S=o.getBoundingClientRect();c.set((P-S.left)/S.width*2-1,-((_-S.top)/S.height)*2+1),a.setFromCamera(c,n.camera);const b=a.intersectObjects([...t.pickables,...t.blockers],!0);for(const y of b){if(y.object.userData.blocker)return null;const w=xM(y.object);if(w)return w}return null}function m(P){Sh(P,W.state.hover)||W.set({hover:P?{type:P.type,id:P.id}:null})}const h=P=>{P.pointerType==="mouse"&&(l={x:P.clientX,y:P.clientY},f=!0,u&&!u.dragging&&Math.hypot(P.clientX-u.x,P.clientY-u.y)>nd&&(u.dragging=!0,m(null)))},v=P=>{u={id:P.pointerId,x:P.clientX,y:P.clientY,button:P.button,dragging:!1}},T=P=>{const _=u;if(u=null,!_||_.id!==P.pointerId||_.dragging||_.button!==0||Math.hypot(P.clientX-_.x,P.clientY-_.y)>nd)return;if(W.state.mode==="walk"&&!W.state.editing){const b=e();if(b?.isSeatedOrLying?.()||W.state.posture==="sitting"||W.state.posture==="lying"){b?.standUp?.()||wt.emit("furniture:stand");return}const y=i(P.clientX,P.clientY);if(y){t.toggleDoor(y);return}const w=s(2.8);if(w){w.action();return}}const S=x(P.clientX,P.clientY);S?W.select(S):P.pointerType!=="mouse"&&W.select(null)},A=()=>{u=null},D=()=>{l=null,u||m(null)},R=P=>{if(!/^(INPUT|TEXTAREA|SELECT)$/.test(P.target?.tagName??"")){if(P.key==="Escape"){W.state.selection&&W.select(null);const _=e();if(_?.isSeatedOrLying?.()||W.state.posture==="sitting"||W.state.posture==="lying"){_?.standUp?.()||wt.emit("furniture:stand"),P.preventDefault?.();return}return}if(W.state.mode==="walk"&&!W.state.editing){const _=e();if((_?.isSeatedOrLying?.()||W.state.posture==="sitting"||W.state.posture==="lying")&&["KeyF","Space","KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(P.code)){_?.standUp?.()||wt.emit("furniture:stand"),P.preventDefault?.();return}if(P.code==="KeyF"){const b=s(2.8);b&&(b.action(),P.preventDefault())}}}};return o.addEventListener("pointermove",h),o.addEventListener("pointerdown",v),o.addEventListener("pointerup",T),o.addEventListener("pointercancel",A),o.addEventListener("pointerleave",D),window.addEventListener("keydown",R),{update(P){if(d+=P,W.state.mode==="walk"&&!W.state.editing&&!n.flying){const S=s(2.8),b=S?.label??null;b!==p?(p=b,g=S,W.set({interactPrompt:b}),wt.emit("hud:prompt",b)):g=S}else p!==null&&(p=null,g=null,W.set({interactPrompt:null}),wt.emit("hud:prompt",null));if(!l||u?.dragging||!f||d<pM||n.flying)return;if(f=!1,d=0,W.state.mode==="walk"&&!W.state.editing&&i(l.x,l.y)){o.style.cursor="pointer",m(null);return}const _=x(l.x,l.y);m(_),u||(o.style.cursor=_?"pointer":"")},getActivePrompt:()=>p,getActiveTarget:()=>g,findInteractableInCenter:s,findDoorInCenter:r,triggerActive:()=>g?.action?.(),dispose(){o.removeEventListener("pointermove",h),o.removeEventListener("pointerdown",v),o.removeEventListener("pointerup",T),o.removeEventListener("pointercancel",A),o.removeEventListener("pointerleave",D),window.removeEventListener("keydown",R)}}}function xM(n){for(let t=n;t;t=t.parent){if(t.visible===!1)return null;if(t.userData?.ref&&re.get(t.userData.ref.type,t.userData.ref.id))return t.userData.ref}return null}function vM(n=.22){const t=[];for(const i of[-.5,.5])for(const s of[-.5,.5])for(const r of[-.5,.5])t.push(i,s,r,i-Math.sign(i)*n,s,r),t.push(i,s,r,i,s-Math.sign(s)*n,r),t.push(i,s,r,i,s,r-Math.sign(r)*n);const e=new on;return e.setAttribute("position",new Re(t,3)),e}const MM=vM(),bM=new fe(1,1,1),yM={hover:{color:14262412,opacity:.6,fill:.06},selected:{color:12999226,opacity:1,fill:.14}};function id(n,t){const e=yM[t],i=new Kt;i.visible=!1;const s=new _p(MM,new $d({color:e.color,transparent:!0,opacity:e.opacity,depthTest:!1,toneMapped:!1}));s.renderOrder=20;const r=new Xt(bM,new ji({color:e.color,transparent:!0,opacity:e.fill,depthWrite:!1,toneMapped:!1}));r.renderOrder=19,i.add(r,s),n.add(i);const o=document.createElement("div");o.className=`pill pill--${t}`;const a=new fh(o);a.visible=!1,n.add(a);const c=new Rn,l=new U,u=new U;let f=null;return{show(d,g){if(!d||!g.getBox(d,c)){f=null,i.visible=!1,a.visible=!1;return}f=d,c.getSize(l).addScalar(mM*2),c.getCenter(u),i.position.copy(u),i.scale.copy(l),i.visible=!0;const p=re.get(d.type,d.id);o.textContent=p?.name??"",a.visible=d.type==="item",a.position.set(u.x,c.max.y+.18,u.z)},get current(){return f}}}const sd={bare:0,partial:1,full:2},Qi={sofa:[2.2],armchair:[],ottoman:[],coffeeTable:[],sideTable:[],tvUnit:[1.5],bookshelf:[1.2],dresser:[],wardrobe:[1.2,2.2],bed:[],nightstand:[],desk:[],chair:[],diningTable:[],barStool:[],console:[1],plant:[1],floorLamp:[],standingMirror:[],rug:[2.4,1.6],kitchenRun:[2.4],fridge:[],toilet:[],vanity:[],shower:[]},Is={sofa:{name:"Sofa 3 chỗ",category:"Sofa & ghế",material:"Vải bọc, khung gỗ",note:"Đệm dày, hai gối tựa kèm theo.",tier:1},armchair:{name:"Ghế bành",category:"Sofa & ghế",material:"Vải bọc",note:"Góc thư giãn trong phòng khách.",tier:2},coffeeTable:{name:"Bàn trà",category:"Bàn",material:"Gỗ sồi",note:"Đặt giữa sofa và kệ TV.",tier:1},tvUnit:{name:'Kệ TV + TV 55"',category:"Điện tử",material:"Gỗ công nghiệp",note:"TV đặt trên kệ thấp, đối diện sofa.",tier:1},rug:{name:"Thảm",category:"Trang trí",material:"Sợi dệt",note:"",tier:2,pick:!1},plant:{name:"Cây trong nhà",category:"Trang trí",material:"Chậu gốm",note:"Cây lá lớn tạo điểm nhấn xanh.",tier:2},floorLamp:{name:"Đèn cây",category:"Chiếu sáng",material:"Kim loại đen",note:"Ánh sáng vàng ấm buổi tối.",tier:2},console:{name:"Bàn console",category:"Bàn",material:"Gỗ + tủ thấp",note:"Để chìa khoá, thư từ ở lối vào.",tier:2},bed:{name:"Giường đôi 1m6",category:"Giường",material:"Khung gỗ, nệm bông ép",note:"Kèm ga gối và chăn.",tier:1},nightstand:{name:"Tab đầu giường",category:"Tủ",material:"Gỗ sồi",note:"Kèm đèn ngủ.",tier:2},wardrobe:{name:"Tủ quần áo",category:"Tủ",material:"Gỗ công nghiệp",note:"Tủ cao sát trần, nhiều ngăn.",tier:0},desk:{name:"Bàn làm việc",category:"Bàn",material:"Gỗ sồi",note:"Kèm màn hình.",tier:2},chair:{name:"Ghế",category:"Sofa & ghế",material:"Gỗ sồi",note:"",tier:1},diningTable:{name:"Bàn ăn 4 chỗ",category:"Bàn",material:"Gỗ sồi",note:"Gần cửa sổ, đón sáng buổi sáng.",tier:1},kitchenRun:{name:"Bộ bếp",category:"Bếp",material:"Tủ gỗ + mặt đá",note:"Bồn rửa inox, bếp từ, tủ treo phía trên.",tier:0},fridge:{name:"Tủ lạnh",category:"Bếp",material:"Inox",note:"Tủ lạnh hai cánh đặt cuối dãy bếp.",tier:1},bookshelf:{name:"Tủ sách",category:"Tủ",material:"Gỗ công nghiệp",note:"Nhiều ngăn mở cho sách và đồ trang trí.",tier:2},dresser:{name:"Tủ ngăn kéo",category:"Tủ",material:"Gỗ sồi",note:"Cất đồ lặt vặt, đặt thêm gương hoặc đèn.",tier:2},sideTable:{name:"Bàn phụ",category:"Bàn",material:"Gỗ + kim loại",note:"Đặt cạnh sofa hoặc đầu giường.",tier:2},ottoman:{name:"Ghế đôn",category:"Sofa & ghế",material:"Vải bọc",note:"Kê chân hoặc ngồi thêm khi có khách.",tier:2},barStool:{name:"Ghế quầy bar",category:"Sofa & ghế",material:"Gỗ + kim loại",note:"Ngồi bên quầy bếp.",tier:2},standingMirror:{name:"Gương đứng",category:"Trang trí",material:"Kính + khung gỗ",note:"Gương soi toàn thân.",tier:2},toilet:{name:"Bệ xí",category:"Vệ sinh",material:"Sứ",note:"Két nước liền khối.",tier:0},vanity:{name:"Tủ lavabo + gương",category:"Vệ sinh",material:"Tủ gỗ + mặt đá",note:"Gương treo trên lavabo.",tier:0},shower:{name:"Buồng tắm kính",category:"Vệ sinh",material:"Kính cường lực",note:"Vòi sen cây, khay đáy thấp.",tier:0}},uc=["wood","darkwood","tile","marble","granite","concrete","epoxy","carpet","glass"],Bo=["window","door","open"],ne={idPattern:/^[A-Za-z0-9_-]{1,48}$/,overrides:120,extras:60,floors:5,roomsPerFloor:24,openingsPerFloor:60,coordMin:-2,coordMax:40,roomMin:1.2,roomMax:40,openingMin:.5,openingMax:4,sillMax:2.4,nameMax:40},_r=(n,t)=>Math.round(n*t)/t,xr=n=>typeof n=="number"&&Number.isFinite(n),zn=n=>xr(n)&&n>=ne.coordMin&&n<=ne.coordMax?_r(n,1e3):void 0,rd=n=>xr(n)?_r(n%(Math.PI*2),1e4):void 0,ai=n=>typeof n=="string"&&ne.idPattern.test(n),dc=n=>typeof n=="string"&&n.trim()?n.trim().slice(0,ne.nameMax):void 0,SM=n=>{if(!Array.isArray(n)||n.length===0||n.length>3)return;const t=n.map(e=>xr(e)&&e>=.2&&e<=8?_r(e,100):null);return t.every(e=>e!==null)?t:void 0},Eh=n=>uc.includes(n)?n:void 0,Th=n=>Bo.includes(n)?n:void 0,wh=n=>xr(n)&&n>=ne.openingMin&&n<=ne.openingMax?_r(n,100):void 0;function Ah(n){if(!n||typeof n!="object"||!ai(n.id)||n.dir!=="x"&&n.dir!=="z")return null;const t=zn(n.at),e=zn(n.c),i=wh(n.w),s=Th(n.type);if(t===void 0||e===void 0||i===void 0||!s)return null;const r={id:n.id,dir:n.dir,at:t,c:e,w:i,type:s};return s==="window"&&xr(n.sill)&&n.sill>=0&&n.sill<=ne.sillMax&&(r.sill=_r(n.sill,100)),s==="door"&&n.entrance===!0&&(r.entrance=!0),r}function EM(n){if(!n||typeof n!="object"||!ai(n.id))return null;const t=dc(n.name),e=zn(n.x0),i=zn(n.x1),s=zn(n.z0),r=zn(n.z1);if(!t||[e,i,s,r].some(c=>c===void 0||c<0))return null;const o=i-e,a=r-s;return o<ne.roomMin-1e-9||a<ne.roomMin-1e-9||o>ne.roomMax||a>ne.roomMax?null:{id:n.id,name:t,x0:e,x1:i,z0:s,z1:r,floor:Eh(n.floor)??"wood"}}function Rh(n,t){return Math.min(n.x1,t.x1)-Math.max(n.x0,t.x0)>.01&&Math.min(n.z1,t.z1)-Math.max(n.z0,t.z0)>.01}function TM(n){if(!n||typeof n!="object"||!ai(n.id))return null;const t=[],e=new Set;for(const r of(Array.isArray(n.rooms)?n.rooms:[]).slice(0,ne.roomsPerFloor)){const o=EM(r);!o||e.has(o.id)||t.some(a=>Rh(o,a))||(e.add(o.id),t.push(o))}if(!t.length)return null;const i=[],s=new Set;for(const r of(Array.isArray(n.openings)?n.openings:[]).slice(0,ne.openingsPerFloor)){const o=Ah(r);!o||s.has(o.id)||(s.add(o.id),i.push(o))}return{id:n.id,name:dc(n.name)??"Tầng",rooms:t,openings:i}}function wM(n){if(!n||typeof n!="object"||!Array.isArray(n.floors))return null;const t=[],e=new Set;for(const i of n.floors.slice(0,ne.floors)){const s=TM(i);!s||e.has(s.id)||(e.add(s.id),t.push(s))}return t.length?{floors:t}:null}function AM(n){const t={};if(!n||typeof n!="object"||Array.isArray(n))return t;for(const[e,i]of Object.entries(n).slice(0,ne.overrides)){if(!ai(e)||!i||typeof i!="object")continue;const s={},r=dc(i.name),o=Eh(i.floor);r&&(s.name=r),o&&(s.floor=o),Object.keys(s).length&&(t[e]=s)}return t}function RM(n){const t={removed:[],moved:{},added:[]};if(!n||typeof n!="object")return t;if(Array.isArray(n.removed))for(const e of n.removed.slice(0,ne.overrides))ai(e)&&!t.removed.includes(e)&&t.removed.push(e);if(n.moved&&typeof n.moved=="object"&&!Array.isArray(n.moved))for(const[e,i]of Object.entries(n.moved).slice(0,ne.overrides)){if(!ai(e)||!i||typeof i!="object")continue;const s={},r=zn(i.c),o=wh(i.w),a=Th(i.type);r!==void 0&&(s.c=r),o!==void 0&&(s.w=o),a&&(s.type=a),Object.keys(s).length&&(t.moved[e]=s)}if(Array.isArray(n.added)){const e=new Set;for(const i of n.added.slice(0,ne.openingsPerFloor)){const s=Ah(i);!s||e.has(s.id)||(e.add(s.id),t.added.push(s))}}return t}const CM=n=>n.removed.length>0||Object.keys(n.moved).length>0||n.added.length>0;function Ce(n){const t={items:{},extras:[]};if(!n||typeof n!="object")return t;if(n.items&&typeof n.items=="object"&&!Array.isArray(n.items))for(const[r,o]of Object.entries(n.items).slice(0,ne.overrides)){if(!ai(r)||!o||typeof o!="object")continue;const a={},c=zn(o.x),l=zn(o.z),u=rd(o.rot);c!==void 0&&(a.x=c),l!==void 0&&(a.z=l),u!==void 0&&(a.rot=u),o.hidden===!0&&(a.hidden=!0),Object.keys(a).length&&(t.items[r]=a)}if(Array.isArray(n.extras)){const r=new Set;for(const o of n.extras.slice(0,ne.extras)){if(!o||typeof o!="object"||!ai(o.id)||r.has(o.id)||!Object.prototype.hasOwnProperty.call(Qi,o.kind))continue;const a=zn(o.x),c=zn(o.z);if(a===void 0||c===void 0)continue;r.add(o.id);const l={id:o.id,kind:o.kind,x:a,z:c,rot:rd(o.rot)??0},u=SM(o.args);u&&(l.args=u),o.hidden===!0&&(l.hidden=!0),ai(o.floor)&&(l.floor=o.floor),t.extras.push(l)}}const e=AM(n.rooms);Object.keys(e).length&&(t.rooms=e);const i=RM(n.openings);CM(i)&&(t.openings=i);const s=wM(n.custom);return s&&(t.custom=s),t}const Ns={modern:{label:"Hiện đại",palette:{floor:13608570,wall:16052714,wood:12159838,sofa:6258598,accent:15246141}},nordic:{label:"Bắc Âu",palette:{floor:14929832,wall:16316662,wood:13808780,sofa:9414844,accent:7317664}},warm:{label:"Ấm cúng",palette:{floor:12158040,wall:15918287,wood:10251075,sofa:12874842,accent:14254635}},luxury:{label:"Sang trọng",palette:{floor:9069892,wall:15262422,wood:7031344,sofa:3096149,accent:13214282}},industrial:{label:"Công nghiệp",palette:{floor:9271911,wall:13817305,wood:8216387,sofa:4869975,accent:14250795}}},Ro=Object.keys(Ns),PM=["floor","wall","wood","sofa","accent"],LM=/^#?([0-9a-f]{6})$/i;function DM(n){if(typeof n=="number"&&Number.isInteger(n)&&n>=0&&n<=16777215)return n;if(typeof n!="string")return null;const t=LM.exec(n.trim());return t?parseInt(t[1],16):null}function hc(n){if(!n||typeof n!="object")return null;const t=typeof n.id=="string"?n.id.trim():"",e=typeof n.name=="string"?n.name.trim().slice(0,60):"";if(!t||!e)return null;const i={};if(n.palette&&typeof n.palette=="object")for(const r of PM){const o=DM(n.palette[r]);o!==null&&(i[r]=o)}const s=Number(n.defaultHour);return{id:t,name:e,description:typeof n.description=="string"?n.description.slice(0,200):"",theme:Ro.includes(n.theme)?n.theme:"modern",palette:i,furnishing:["bare","partial","full"].includes(n.furnishing)?n.furnishing:null,defaultHour:Number.isFinite(s)?Math.min(18,Math.max(6,s)):10,layout:Ce(n.layout)}}function Ch(n){return{...Ns[n?.theme]?.palette??Ns.modern.palette,...n?.palette??{}}}function IM(n){let t=0;for(const i of String(n))t=t*31+i.charCodeAt(0)>>>0;const e=Ro[t%Ro.length];return hc({id:"default",name:`Phong cách ${Ns[e].label}`,theme:e})}const NM=60,od=.25,ad=.05,UM=Math.PI*2,ks=n=>Ce(JSON.parse(JSON.stringify(Ce(n)))),ys=(n,t)=>n/(t||1);function ld(n,t){const e=Math.min(t-od,Math.max(od,n));return Math.round(e/ad)*ad}function OM(n,t){return n.extras.some(e=>e.id===t)}function FM(n,t,e,i,s){const r=ks(n),o=r.extras.find(a=>a.id===t);if(o)o.x=ys(e,s),o.z=ys(i,s);else{const a=r.items[t]??={};a.x=ys(e,s),a.z=ys(i,s)}return Ce(r)}function zM(n,t,e=0){const i=ks(n),s=(e+Math.PI/2)%UM,r=i.extras.find(o=>o.id===t);return r?r.rot=s:(i.items[t]??={}).rot=s,Ce(i)}function BM(n,t){const e=ks(n),i=e.extras.find(s=>s.id===t)??(e.items[t]??={});return i.hidden?delete i.hidden:i.hidden=!0,Ce(e)}function kM(n,t){const e=ks(n);return e.extras.some(i=>i.id===t)?(e.extras=e.extras.filter(i=>i.id!==t),Ce(e)):e}function HM(n,t){const e=ks(n),i=e.items[t];return i&&(delete i.x,delete i.z,delete i.rot),Ce(e)}function GM(n,t,e,i,s,r,o=Math.random){if(!Object.prototype.hasOwnProperty.call(Qi,t))return null;const a=ks(n);if(a.extras.length>=NM)return null;const c=new Set([...r,...a.extras.map(u=>u.id)]);let l;do l=`extra-${o().toString(36).slice(2,8).padEnd(6,"0")}`;while(c.has(l));return a.extras.push({id:l,kind:t,x:ys(e,s),z:ys(i,s),rot:0}),{layout:Ce(a),id:l}}const cd=.1,Ph=n=>Math.round(n/cd)*cd,nr=n=>Math.round(n*1e3)/1e3;function VM(n,t,e,i=.5){let s=null;for(const r of n){const o=r.dir==="x"?t:e,a=r.dir==="x"?e:t;if(o<r.from+.1||o>r.to-.1)continue;const c=Math.abs(a-r.at);c<=i&&(!s||c<s.dist)&&(s={wall:r,c:nr(o),dist:c})}return s?{wall:s.wall,c:s.c}:null}function WM(n){const t=(n.x0+n.x1)/2,e=(n.z0+n.z1)/2;return{x0:{x:n.x0,z:e},x1:{x:n.x1,z:e},z0:{x:t,z:n.z0},z1:{x:t,z:n.z1}}}function XM(n,t,e){const i={x0:n.x0,x1:n.x1,z0:n.z0,z1:n.z1},s=ne.roomMin,r=Ph(e);return t==="x0"?i.x0=Math.max(0,Math.min(r,i.x1-s)):t==="x1"?i.x1=Math.min(ne.coordMax,Math.max(r,i.x0+s)):t==="z0"?i.z0=Math.max(0,Math.min(r,i.z1-s)):t==="z1"&&(i.z1=Math.min(ne.coordMax,Math.max(r,i.z0+s))),{x0:nr(i.x0),x1:nr(i.x1),z0:nr(i.z0),z1:nr(i.z1)}}const $M=(n,t,e)=>t>=n.x0&&t<=n.x1&&e>=n.z0&&e<=n.z1,no=Ph,io=1e-6,ar=n=>n.toFixed(3),Zi=n=>Math.round(n*1e3)/1e3,ud=n=>String(n).replace(/[^A-Za-z0-9]/g,"p");function Lh(n,t=[]){const e=new Map,i=(r,o,a,c)=>{const l=`${r}|${ar(o)}`;e.has(l)||e.set(l,{dir:r,at:o,edges:[]}),e.get(l).edges.push([a,c])};for(const r of n)i("x",r.z0,r.x0,r.x1),i("x",r.z1,r.x0,r.x1),i("z",r.x0,r.z0,r.z1),i("z",r.x1,r.z0,r.z1);const s=[];for(const{dir:r,at:o,edges:a}of e.values()){const c=[...new Set(a.flatMap(([u,f])=>[ar(u),ar(f)]))].map(Number).sort((u,f)=>u-f),l=[];for(let u=0;u+1<c.length;u++){const f=c[u],d=c[u+1];if(d-f<io)continue;const g=a.filter(([x,m])=>x<=f+io&&m>=d-io).length;if(g===0)continue;const p=l[l.length-1];p&&p.count===g&&Math.abs(p.to-f)<io?p.to=d:l.push({from:f,to:d,count:g})}for(const u of l)s.push({dir:r,at:o,from:u.from,to:u.to,t:u.count>=2?_h:gh,interior:u.count>=2,openings:[]})}for(const r of t){const o=s.find(a=>a.dir===r.dir&&Math.abs(a.at-r.at)<.06&&r.c-r.w/2>=a.from+.05&&r.c+r.w/2<=a.to-.05);o&&o.openings.push({...r})}for(const r of s)r.openings.sort((o,a)=>o.c-a.c);return s.sort((r,o)=>r.dir===o.dir?r.at-o.at||r.from-o.from:r.dir<o.dir?-1:1)}function qM(n,t=.2){const e=Math.max(...n.map(s=>s.x1))+t,i=Math.max(...n.map(s=>s.z1))+t;return{w:Zi(e),d:Zi(i)}}const Dh=n=>Zi(n.reduce((t,e)=>t+Ki(e),0)),fc=n=>Zi(n.reduce((t,e)=>t+Dh(e.rooms),0));function YM(n,t=[],e=1.4){return Lh(n,t).filter(s=>s.interior&&s.to-s.from>=e&&s.openings.length===0).map(s=>({dir:s.dir,at:s.at,from:s.from,to:s.to}))}function pc(n,t=[],e=[]){const i=new Set([...e,...t.map(r=>r.id)]),s=[];for(const r of YM(n,t)){const o=Zi((r.from+r.to)/2);let a=`auto-${r.dir}${ud(ar(r.at))}-${ud(ar(o))}`.slice(0,48);i.has(a)||(i.add(a),s.push({id:a,dir:r.dir,at:Zi(r.at),c:o,w:.9,type:"door"}))}return[...t,...s]}function mc(n,t,e=null){const i=t.x1-t.x0,s=t.z1-t.z0;return i<ne.roomMin-1e-9||s<ne.roomMin-1e-9||i>ne.roomMax||s>ne.roomMax||t.x0<0||t.z0<0||t.x1>ne.coordMax||t.z1>ne.coordMax?!1:!n.some(r=>r.id!==e&&Rh(r,t))}function jM(n,t){const e=fc(n);if(!(e>0)||!(t>0))return{factor:1,before:e,after:e};const i=Math.min(2,Math.max(.5,Math.sqrt(t/e)));return{factor:i,before:e,after:Zi(e*i*i)}}const dd=.15,hd=.1,Te=n=>Math.round(n*1e3)/1e3,Ss=n=>Math.round(n/hd)*hd,Sn=n=>JSON.parse(JSON.stringify(Ce(n))),Co=(n,t)=>Te(n/(t.scale||1)),gc=(n,t,e=Math.random)=>{let i;do i=`${n}-${e().toString(36).slice(2,8).padEnd(6,"0")}`;while(t.has(i));return i},hi=(n,t)=>{const e=Ce(t);return JSON.stringify(e)===JSON.stringify(Ce(n))?n:e},Hs=(n,t)=>n.custom?.floors.find(e=>e.id===t.floorId)??n.custom?.floors[0];function KM(n,t,e,i){if(!uc.includes(i))return n;const s=Sn(n);if(t.custom){const r=Hs(s,t)?.rooms.find(o=>o.id===e);if(!r)return n;r.floor=i}else{if(!t.rooms.some(r=>r.id===e))return n;s.rooms={...s.rooms??{},[e]:{...s.rooms?.[e]??{},floor:i}}}return hi(n,s)}function ZM(n,t,e,i){const s=String(i??"").trim().slice(0,ne.nameMax);if(!s)return n;const r=Sn(n);if(t.custom){const o=Hs(r,t)?.rooms.find(a=>a.id===e);if(!o)return n;o.name=s}else{if(!t.rooms.some(o=>o.id===e))return n;r.rooms={...r.rooms??{},[e]:{...r.rooms?.[e]??{},name:s}}}return hi(n,r)}function JM(n,t,e,i){return n.walls.find(s=>s.dir===t&&Math.abs(s.at-e)<.06&&i>=s.from&&i<=s.to)}function Ih(n,t,e){const i=n.from+e/2+dd,s=n.to-e/2-dd;return s<i?null:Te(Math.min(s,Math.max(i,t)))}const QM=(n,t)=>n.walls.find(e=>e.openings.some(i=>i.id===t)),Nh=(n,t)=>n.walls.flatMap(e=>e.openings).find(e=>e.id===t);function _c(n,t,e,i){const s=QM(t,e),r=Nh(t,e);if(!s||!r)return n;const o=i.w??r.w,a=Ih(s,i.c??r.c,o);if(a===null||o<ne.openingMin||o>ne.openingMax)return n;const c=i.type??r.type;if(!Bo.includes(c))return n;const l=Sn(n);if(t.custom){const u=Hs(l,t)?.openings.find(f=>f.id===e);if(!u)return n;Object.assign(u,{c:a,w:Te(o),type:c}),c!=="window"?delete u.sill:u.sill===void 0&&(u.sill=.9),c!=="door"&&delete u.entrance}else{const u=l.openings?.added?.find(f=>f.id===e);if(u)Object.assign(u,{c:Co(a,t),w:Te(o),type:c}),c!=="window"&&delete u.sill,c!=="door"&&delete u.entrance;else{l.openings??={removed:[],moved:{},added:[]};const f={...l.openings.moved[e]??{}};(i.c!==void 0||i.w!==void 0)&&(f.c=Co(a,t)),i.w!==void 0&&(f.w=Te(o)),i.type!==void 0&&(f.type=c),l.openings.moved[e]=f}}return hi(n,l)}const tb=(n,t,e,i)=>_c(n,t,e,{c:i}),eb=(n,t,e,i)=>_c(n,t,e,{w:i}),nb=(n,t,e,i)=>_c(n,t,e,{type:i});function ib(n,t,e){if(!Nh(t,e))return n;const i=Sn(n);if(t.custom){const s=Hs(i,t);if(!s)return n;s.openings=s.openings.filter(r=>r.id!==e)}else i.openings?.added?.some(s=>s.id===e)?i.openings.added=i.openings.added.filter(s=>s.id!==e):(i.openings??={removed:[],moved:{},added:[]},i.openings.removed.includes(e)||i.openings.removed.push(e),delete i.openings.moved[e]);return hi(n,i)}function sb(n,t,{dir:e,at:i,c:s,w:r=.9,type:o="door"},a=Math.random){if(!Bo.includes(o)||e!=="x"&&e!=="z")return null;const c=JM(t,e,i,s);if(!c)return null;const l=Ih(c,s,r);if(l===null||c.openings.some(p=>Math.abs(p.c-l)<(p.w+r)/2+.05))return null;const u=Sn(n),f=new Set(t.walls.flatMap(p=>p.openings.map(x=>x.id))),d=gc("op",f,a);if(t.custom){const p=Hs(u,t);if(!p||p.openings.length>=ne.openingsPerFloor)return null;p.openings.push({id:d,dir:e,at:Te(c.at),c:l,w:Te(r),type:o,...o==="window"?{sill:.9}:{}})}else{if(u.openings??={removed:[],moved:{},added:[]},u.openings.added.length>=ne.openingsPerFloor)return null;u.openings.added.push({id:d,dir:e,at:Co(c.at,t),c:Co(l,t),w:Te(r),type:o,...o==="window"?{sill:.9}:{}})}return{layout:Ce(u),id:d}}const fd=n=>{if(!Array.isArray(n))return;const t=[];for(const e of n){if(typeof e!="number"||!(e>=.2&&e<=8))break;t.push(Math.round(e*100)/100)}return t.length?t.slice(0,3):void 0};function rb(n,t){const i=t.rooms.map(a=>({id:a.id,name:a.name,x0:a.x0,x1:a.x1,z0:a.z0,z1:a.z1,floor:a.floor})),s=t.walls.flatMap(a=>a.openings.map(c=>({id:c.id,dir:a.dir,at:a.at,c:c.c,w:c.w,type:c.type,...c.sill!==void 0?{sill:c.sill}:{},...c.entrance?{entrance:!0}:{}}))),r=t.placements.filter(a=>Object.prototype.hasOwnProperty.call(Qi,a.kind)).map(a=>({id:a.id,kind:a.kind,x:a.x,z:a.z,rot:a.rot??0,floor:"f1",...a.hidden?{hidden:!0}:{},...fd(a.args)?{args:fd(a.args)}:{}}));return Ce({items:{},extras:r,custom:{floors:[{id:"f1",name:"Tầng 1",rooms:i,openings:s}]}})}function ob(){return Ce(null)}const ko=(n,t)=>Hs(n,t);function ab(n,t){const e=Ss(Math.min(n.x,t.x)),i=Ss(Math.max(n.x,t.x)),s=Ss(Math.min(n.z,t.z)),r=Ss(Math.max(n.z,t.z));return{x0:Te(e),x1:Te(i),z0:Te(s),z1:Te(r)}}function lb(n,t,e,{name:i,floor:s="wood"}={},r=Math.random){if(!t.custom)return null;const o=Sn(n),a=ko(o,t);if(!a||a.rooms.length>=ne.roomsPerFloor)return null;const c={...e};if(!mc(a.rooms,c))return null;const l=gc("room",new Set(a.rooms.map(f=>f.id)),r),u={id:l,name:i??`Phòng ${a.rooms.length+1}`,...c,floor:s};return a.rooms.push(u),a.openings=pc(a.rooms,a.openings),{layout:Ce(o),id:l}}const xc=(n,t,e)=>t>=n.x0&&t<=n.x1&&e>=n.z0&&e<=n.z1;function cb(n,t){for(const e of n.extras){if((e.floor??n.custom.floors[0].id)!==t.id||t.rooms.some(s=>xc(s,e.x,e.z)))continue;let i=null;for(const s of t.rooms){const r=Math.min(s.x1-.2,Math.max(s.x0+.2,e.x)),o=Math.min(s.z1-.2,Math.max(s.z0+.2,e.z)),a=Math.hypot(r-e.x,o-e.z);(!i||a<i.d)&&(i={x:r,z:o,d:a})}i&&(e.x=Te(i.x),e.z=Te(i.z))}}function ub(n,t,e,i){if(!t.custom)return n;const s=Sn(n),r=ko(s,t),o=r?.rooms.find(c=>c.id===e);if(!o)return n;const a={...o,...i};return mc(r.rooms,a,e)?(Object.assign(o,i),r.openings=pc(r.rooms,vc(r)),cb(s,r),hi(n,s)):n}function db(n,t,e,i,s){if(!t.custom)return n;const r=Sn(n),o=ko(r,t),a=o?.rooms.find(p=>p.id===e);if(!a)return n;const c=Ss(i),l=Ss(s);if(c===0&&l===0)return n;const u={...a,x0:Te(a.x0+c),x1:Te(a.x1+c),z0:Te(a.z0+l),z1:Te(a.z1+l)};if(!mc(o.rooms,u,e))return n;const f=r.custom.floors[0].id;for(const p of r.extras)(p.floor??f)===o.id&&xc(a,p.x,p.z)&&(p.x=Te(p.x+c),p.z=Te(p.z+l));const d=p=>p.dir==="x"&&(Math.abs(p.at-a.z0)<.06||Math.abs(p.at-a.z1)<.06)&&p.c>a.x0&&p.c<a.x1||p.dir==="z"&&(Math.abs(p.at-a.x0)<.06||Math.abs(p.at-a.x1)<.06)&&p.c>a.z0&&p.c<a.z1,g=p=>o.rooms.some(x=>x.id!==e&&Uh(x,p));for(const p of o.openings)d(p)&&!g(p)&&(p.dir==="x"?(p.at=Te(p.at+l),p.c=Te(p.c+c)):(p.at=Te(p.at+c),p.c=Te(p.c+l)));return Object.assign(a,u),o.openings=pc(o.rooms,vc(o)),hi(n,r)}const Uh=(n,t)=>t.dir==="x"&&(Math.abs(t.at-n.z0)<.06||Math.abs(t.at-n.z1)<.06)&&t.c>n.x0&&t.c<n.x1||t.dir==="z"&&(Math.abs(t.at-n.x0)<.06||Math.abs(t.at-n.x1)<.06)&&t.c>n.z0&&t.c<n.z1;function vc(n){return n.openings.filter(t=>n.rooms.some(e=>Uh(e,t)))}function hb(n,t,e){if(!t.custom)return n;const i=Sn(n),s=ko(i,t),r=s?.rooms.find(a=>a.id===e);if(!r||s.rooms.length<=1)return n;const o=i.custom.floors[0].id;for(const a of i.extras)(a.floor??o)===s.id&&xc(r,a.x,a.z)&&(a.hidden=!0);return s.rooms=s.rooms.filter(a=>a.id!==e),s.openings=vc(s),hi(n,i)}function fb(n,t,e,i=Math.random){if(!t.custom)return null;const s=Sn(n);if(s.custom.floors.length>=ne.floors)return null;const r=gc("f",new Set(s.custom.floors.map(o=>o.id)),i);return s.custom.floors.push({id:r,name:String(e??"").trim()||`Tầng ${s.custom.floors.length+1}`,rooms:[{id:"room-1",name:"Phòng 1",x0:1,x1:7,z0:1,z1:6,floor:"wood"}],openings:[]}),{layout:Ce(s),id:r}}function pb(n,t,e,i){const s=String(i??"").trim().slice(0,ne.nameMax);if(!t.custom||!s)return n;const r=Sn(n),o=r.custom.floors.find(a=>a.id===e);return o?(o.name=s,hi(n,r)):n}function mb(n,t,e){if(!t.custom)return n;const i=Sn(n);if(i.custom.floors.length<=1||!i.custom.floors.some(o=>o.id===e))return n;const s=i.custom.floors[0].id;i.custom.floors=i.custom.floors.filter(o=>o.id!==e);const r=i.custom.floors[0].id;return i.extras=i.extras.filter(o=>(o.floor??s)!==e).map(o=>({...o,floor:o.floor??r})),hi(n,i)}function gb(n,t,e){if(!t.custom)return{layout:n,factor:1,before:0,after:0};const i=Ce(n),{factor:s,before:r,after:o}=jM(i.custom.floors,e);if(Math.abs(s-1)<1e-6)return{layout:n,factor:1,before:r,after:r};const a=Sn(i),c=f=>Te(f*s);for(const f of a.custom.floors){for(const d of f.rooms)Object.assign(d,{x0:c(d.x0),x1:c(d.x1),z0:c(d.z0),z1:c(d.z1)});for(const d of f.openings)Object.assign(d,{at:c(d.at),c:c(d.c)})}for(const f of a.extras)Object.assign(f,{x:c(f.x),z:c(f.z)});const l=Ce(a),u=l.custom?fc(l.custom.floors):o;return{layout:l,factor:s,before:r,after:u}}const pd=.03,_b=.17,xb=new Set(["door","window","open"]);function vb(n,t,e,i){const s=n.renderer.domElement,r=n.controls,o=new ac,a=new Ft,c=new ni(new U(0,1,0),0),l=new U;let u=null;const f=new Kt;f.name="editor-overlay",n.scene.add(f);const d=new Xt(new fe(1,.06,1),new ji({color:14178863,transparent:!0,opacity:.35,depthWrite:!1}));d.visible=!1,f.add(d);const g=new ji({color:14178863,depthTest:!1}),p={};for(const w of["x0","x1","z0","z1"]){const L=new Xt(new Ls(_b,16,12),g);L.renderOrder=10,L.visible=!1,L.userData.edge=w,f.add(L),p[w]=L}function x(w,L=!0){d.visible=!0,d.scale.set(Math.max(.01,w.x1-w.x0),1,Math.max(.01,w.z1-w.z0)),d.position.set((w.x0+w.x1)/2,.05,(w.z0+w.z1)/2),d.material.color.set(L?14178863:12597547),n.invalidate()}const m=()=>{d.visible&&(d.visible=!1,n.invalidate())},h=()=>{const w=W.state.selection;return w?.type==="room"?re.get("room",w.id):null};function v(){const w=W.state.editing&&!W.state.tool&&i.isCustom?.()?h():null,L=w?WM(w):null;for(const[k,I]of Object.entries(p))I.visible=!!L,L&&I.position.set(L[k].x,.2,L[k].z);n.invalidate()}function T(w){const L=s.getBoundingClientRect();a.set((w.clientX-L.left)/L.width*2-1,-((w.clientY-L.top)/L.height)*2+1),o.setFromCamera(a,n.camera)}function A(w,L){return T(w),o.ray.intersectPlane(c,L)}function D(w){if(!p.x0.visible)return null;T(w);const L=o.intersectObjects(Object.values(p),!1)[0];return L?L.object.userData.edge:null}function R(w){T(w);const L=o.intersectObjects(t.pickables,!0);for(const k of L)for(let I=k.object;I&&I.visible!==!1;I=I.parent){const G=I.userData?.ref;if(G?.type==="item"&&re.get("item",G.id)||G?.type==="opening"&&re.get("opening",G.id))return G}return null}function P(w,L,k="grabbing"){u={pointerId:w.pointerId,...L},r.enabled=!1,n.cancelFlight(),s.setPointerCapture(w.pointerId),s.style.cursor=k,w.stopImmediatePropagation()}const _=w=>{if(!W.state.editing||W.state.mode!=="overview"||w.button!==0)return;const L=W.state.tool;if(xb.has(L)){if(!A(w,l))return;const Q=VM(lt.walls,l.x,l.z,.6);w.stopImmediatePropagation(),Q?i.onOpeningAdd({dir:Q.wall.dir,at:Q.wall.at,c:Q.c,type:L}):i.onReject?.("Bấm vào một đoạn tường để đặt cửa.");return}if(L==="room"){if(!A(w,l))return;const Q={x:no(l.x),z:no(l.z)};P(w,{kind:"draw",start:Q,rect:null},"crosshair");return}const k=D(w),I=k?h():null;if(I&&A(w,l)){P(w,{kind:"resize",id:I.id,edge:k,room:I,rect:null},"ew-resize");return}const G=R(w);if(G?.type==="opening"){const Q=t.getObject("opening",G.id),rt=lt.walls.find(z=>z.openings.some(V=>V.id===G.id));if(!Q||!rt||!A(w,l))return;const mt=rt.dir==="x"?l.x:l.z,vt=rt.dir==="x"?Q.position.x:Q.position.z;W.select(G),P(w,{kind:"opening",id:G.id,mesh:Q,wall:rt,offset:vt-mt,start:vt,c:vt});return}if(G?.type==="item"){const Q=t.getObject("item",G.id);if(!Q||!A(w,l))return;W.select(G),P(w,{kind:"item",id:G.id,group:Q,offsetX:Q.position.x-l.x,offsetZ:Q.position.z-l.z,startX:Q.position.x,startZ:Q.position.z});return}const O=i.isCustom?.()?h():null;O&&A(w,l)&&$M(O,l.x,l.z)&&P(w,{kind:"room",id:O.id,room:O,startPt:{x:l.x,z:l.z},dx:0,dz:0})},S=w=>{if(!(!u||w.pointerId!==u.pointerId)&&A(w,l)){if(u.kind==="item"){const L=ld(l.x+u.offsetX,lt.size.w),k=ld(l.z+u.offsetZ,lt.size.d);t.moveItem(u.id,L,k),e.refresh()}else if(u.kind==="opening"){const L=(u.wall.dir==="x"?l.x:l.z)+u.offset,k=u.wall.from+.5,I=u.wall.to-.5;u.c=Math.round(Math.min(I,Math.max(k,L))*20)/20,u.wall.dir==="x"?u.mesh.position.x=u.c:u.mesh.position.z=u.c,x(u.wall.dir==="x"?{x0:u.c-.45,x1:u.c+.45,z0:u.wall.at-.1,z1:u.wall.at+.1}:{x0:u.wall.at-.1,x1:u.wall.at+.1,z0:u.c-.45,z1:u.c+.45})}else if(u.kind==="draw")u.rect=ab(u.start,{x:l.x,z:l.z}),x(u.rect);else if(u.kind==="resize"){const L=u.edge[0]==="x"?l.x:l.z;u.rect=XM(u.room,u.edge,L),x(u.rect)}else if(u.kind==="room"){u.dx=no(l.x-u.startPt.x),u.dz=no(l.z-u.startPt.z);const L=u.room;x({x0:L.x0+u.dx,x1:L.x1+u.dx,z0:L.z0+u.dz,z1:L.z1+u.dz})}}},b=w=>{if(!u||w.pointerId!==u.pointerId)return;const L=u;if(u=null,r.enabled=W.state.mode==="overview",s.style.cursor="",m(),w.type==="pointercancel"){i.onCancel?.();return}if(L.kind==="item"){const k=L.group.position.x,I=L.group.position.z;Math.hypot(k-L.startX,I-L.startZ)>=pd&&i.onMove(L.id,k,I)}else L.kind==="opening"?Math.abs(L.c-L.start)>=pd&&i.onOpeningMove(L.id,L.c):L.kind==="draw"?L.rect&&i.onRoomDraw(L.rect):L.kind==="resize"?L.rect&&i.onRoomResize(L.id,L.rect):L.kind==="room"&&(L.dx||L.dz)&&i.onRoomMove(L.id,L.dx,L.dz)};s.addEventListener("pointerdown",_,{capture:!0}),s.addEventListener("pointermove",S),s.addEventListener("pointerup",b),s.addEventListener("pointercancel",b);const y=W.subscribe((w,L,k)=>{(k.includes("tool")||k.includes("selection")||k.includes("editing"))&&v(),k.includes("tool")&&(s.style.cursor=w.tool?"crosshair":"")});return{setEditing(w){r.mouseButtons=w?{LEFT:Xe.PAN,MIDDLE:Xe.DOLLY,RIGHT:Xe.ROTATE}:{LEFT:Xe.ROTATE,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN},r.touches=w?{ONE:fn.PAN,TWO:fn.DOLLY_ROTATE}:{ONE:fn.ROTATE,TWO:fn.DOLLY_PAN},r.screenSpacePanning=w,v()},sync:v,dispose(){y(),s.removeEventListener("pointerdown",_,{capture:!0}),s.removeEventListener("pointermove",S),s.removeEventListener("pointerup",b),s.removeEventListener("pointercancel",b),n.scene.remove(f)}}}const La=n=>String(n??"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d");function Mb(n,t=8){const e=La(n).trim();if(!e)return[];const i=[];for(const s of re.list("room"))La(s.name).includes(e)&&i.push({type:"room",id:s.id,title:s.name,sub:`${s.area.toFixed(0)} m²`});for(const s of re.list("item")){const r=re.room(s.roomId);if(La(`${s.name} ${s.category} ${r?.name??""} ${s.material??""}`).includes(e)&&i.push({type:"item",id:s.id,title:s.name,sub:`${s.category} · ${r?.name??""}`}),i.length>=t)break}return i.slice(0,t)}const bb=n=>n?`${n.w.toFixed(2)} × ${n.d.toFixed(2)} × ${n.h.toFixed(2)} m`:"",Nl=1,md=8,yb=1e3,Sb=20,Us=()=>!!window.ReactNativeWebView,Po=()=>Us()||window.parent!==window;function bn(n,t){const e=t===void 0?{version:Nl,type:n}:{version:Nl,type:n,payload:t};if(window.ReactNativeWebView){window.ReactNativeWebView.postMessage(JSON.stringify(e));return}window.parent!==window&&window.parent.postMessage(e,window.location.origin)}function Mc(n){if(!n||typeof n!="object")return null;const t=typeof n.apartmentId=="string"?n.apartmentId.trim():"",e=Number(n.bedrooms),i=Number(n.bathrooms),s=Number(n.areaM2);if(!t||!Number.isFinite(e)||e<0||e>md||!Number.isFinite(i)||i<0||i>md||!Number.isFinite(s)||s<=0||s>yb||!["bare","partial","full"].includes(n.furnishing))return null;const r=Array.isArray(n.designs)?n.designs.slice(0,Sb).map(hc).filter(Boolean):[];return{apartmentId:t,bedrooms:Math.floor(e),bathrooms:Math.floor(i),areaM2:s,furnishing:n.furnishing,designs:r,designId:typeof n.designId=="string"?n.designId:null,editable:n.editable===!0&&!Us()}}function Eb(n){const t=window.location.origin,e=i=>{if(!(!!window.ReactNativeWebView&&(!i.origin||i.origin==="null"))&&(i.origin!==t||i.source!==window.parent))return;let r=i.data;if(typeof r=="string")try{r=JSON.parse(r)}catch{return}if(!(!r||r.version!==Nl))if(r.type==="FLOORPLAN_INIT"){const o=Mc(r.payload);o?n.init(o):bn("FLOORPLAN_ERROR",{code:"INVALID_CONFIG"})}else r.type==="FLOORPLAN_CAMPUS_INIT"?n.campus?.(r.payload):r.type==="FLOORPLAN_EXPANDED"?n.expanded?.(!!r.payload?.expanded):r.type==="FLOORPLAN_PAUSE"?n.pause():r.type==="FLOORPLAN_RESUME"?n.resume():r.type==="FLOORPLAN_RESET"&&n.reset()};return window.addEventListener("message",e),document.addEventListener("message",e),()=>{window.removeEventListener("message",e),document.removeEventListener("message",e)}}function Tb(n,t){const e=(s,r)=>n.has(s)?Number(n.get(s)):r,i=["bare","partial","full"].includes(n.get("furnishing"))?n.get("furnishing"):"full";return Mc({apartmentId:n.get("id")??"demo",bedrooms:e("bedrooms",2),bathrooms:e("bathrooms",1),areaM2:e("area",70),furnishing:i,designs:t,designId:n.get("design")})}const wb=n=>{const t=Math.floor(n),e=Math.round((n-t)*60);return`${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`};function Ab(n){n.innerHTML=`
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
    </div>`;const t=n.querySelector("#q"),e=n.querySelector(".search__menu"),i=n.querySelector("#hour"),s=n.querySelector("#sun-pop"),r=n.querySelector("#sun-btn"),o=n.querySelector("#play");function a(){const _=W.state.searchQuery,S=Mb(_);e.hidden=!_.trim(),e.innerHTML=S.length?S.map(b=>`
        <li><button type="button" data-type="${b.type}" data-id="${Vt(b.id)}">
          <span class="res__ico">${te(b.type==="room"?"home":"pin",15)}</span>
          <span class="res__txt"><b>${Vt(b.title)}</b><small>${Vt(b.sub)}</small></span>
        </button></li>`).join(""):'<li class="res__empty">Không tìm thấy</li>'}t.addEventListener("input",()=>{W.set({searchQuery:t.value}),a()}),t.addEventListener("focus",a),t.addEventListener("keydown",_=>{_.key==="Escape"&&(t.value="",W.set({searchQuery:""}),e.hidden=!0,t.blur()),_.key==="Enter"&&e.querySelector("button")?.click()}),e.addEventListener("click",_=>{const S=_.target.closest("button[data-id]");if(!S)return;const b={type:S.dataset.type,id:S.dataset.id};t.value="",W.set({searchQuery:""}),e.hidden=!0,t.blur(),b.type==="room"&&wt.emit("room:go",{id:b.id}),W.select(b),b.type==="item"&&wt.emit("camera:locate",b)}),document.addEventListener("pointerdown",_=>{n.querySelector(".search").contains(_.target)||(e.hidden=!0),n.querySelector(".sunwrap").contains(_.target)||n.querySelector("#design-wrap").contains(_.target)||W.set({menu:null})}),r.addEventListener("click",()=>W.set({menu:W.state.menu==="sun"?null:"sun"})),i.addEventListener("input",()=>W.set({hour:Number(i.value),playing:!1})),o.addEventListener("click",()=>W.set({playing:!W.state.playing})),n.querySelector(".seg").addEventListener("click",_=>{const S=_.target.closest("[data-mode]");S&&S.dataset.mode!==W.state.mode&&W.set({mode:S.dataset.mode})});const c=n.querySelector("#fs-btn"),l=!!(document.fullscreenEnabled||document.webkitFullscreenEnabled),u=Po()&&!Us();let f=!1;function d(){c.innerHTML=te(f?"shrink":"expand",18);const _=f?"Thoát toàn màn hình":"Toàn màn hình";c.setAttribute("aria-label",_),c.title=_}c.hidden=Us()||!(l||u),c.addEventListener("click",()=>{if(l){const _=document.documentElement.requestFullscreen??document.documentElement.webkitRequestFullscreen,S=document.exitFullscreen??document.webkitExitFullscreen;document.fullscreenElement??document.webkitFullscreenElement?S.call(document):_.call(document.documentElement)}else bn("FLOORPLAN_EXPAND_TOGGLE")});const g=()=>{f=!!(document.fullscreenElement??document.webkitFullscreenElement),d()};document.addEventListener("fullscreenchange",g),document.addEventListener("webkitfullscreenchange",g),wt.on("host:expanded",({expanded:_})=>{f=_,d()}),d();const p=n.querySelector("#edit-btn");p.addEventListener("click",()=>W.set({editing:!W.state.editing}));function x(_){p.hidden=!(_.editable&&_.mode==="overview"),p.setAttribute("aria-pressed",String(_.editing)),p.classList.toggle("active",_.editing);const S=_.editing?"Xong chỉnh sửa":"Chỉnh bố cục";p.innerHTML=`${te("pencil",18)}<span>${S}</span>`,p.setAttribute("aria-label",S),p.title=S}const m=n.querySelector("#design-wrap"),h=n.querySelector("#design-btn"),v=n.querySelector("#design-pop");let T="";function A(_){const S=Ch(_);return[S.floor,S.wall,S.sofa,S.accent].map(b=>`<i style="background:#${b.toString(16).padStart(6,"0")}"></i>`).join("")}function D(_){const{designs:S,designId:b}=_;m.hidden=S.length<2;const y=S.find(L=>L.id===b)??S[0];n.querySelector("#design-name").textContent=y?.name??"",n.querySelector("#design-swatch").innerHTML=y?A(y):"",h.setAttribute("aria-expanded",String(_.menu==="designs")),v.hidden=_.menu!=="designs";const w=S.map(L=>L.id+L.name).join("|")+"#"+b;w!==T&&(T=w,v.innerHTML=S.map(L=>`<li><button type="button" role="option" data-design="${Vt(L.id)}" aria-selected="${L.id===b}" class="${L.id===b?"active":""}">
          <span class="swatches">${A(L)}</span>
          <span class="res__txt"><b>${Vt(L.name)}</b><small>${Vt(L.description||Ns[L.theme]?.label||"")}</small></span>
        </button></li>`).join(""))}h.addEventListener("click",()=>W.set({menu:W.state.menu==="designs"?null:"designs"})),v.addEventListener("click",_=>{const S=_.target.closest("[data-design]");S&&(W.set({menu:null}),wt.emit("design:select",{id:S.dataset.design}))});function R(){n.querySelector("#brand-title").textContent=lt.bedrooms===0?"Căn hộ studio":`Căn hộ ${lt.bedrooms} phòng ngủ`,n.querySelector("#brand-sub").textContent=lt.custom?`${lt.totalArea.toFixed(0)} m²${lt.floors.length>1?` · ${lt.floors.length} tầng`:""} · Mặt bằng tuỳ chỉnh`:`${lt.area.toFixed(0)} m² · Bố cục minh hoạ`}wt.on("plan:loaded",R),R();function P(_){D(_),x(_);for(const S of n.querySelectorAll("[data-mode]")){const b=S.dataset.mode===_.mode;S.classList.toggle("active",b),S.setAttribute("aria-selected",String(b))}n.querySelector("#hour-text").textContent=wb(_.hour),document.activeElement!==i&&(i.value=String(_.hour)),s.hidden=_.menu!=="sun",r.setAttribute("aria-expanded",String(_.menu==="sun")),o.innerHTML=`${te(_.playing?"pause":"play",14)}<span>${_.playing?"Dừng":"Tua ngày"}</span>`}W.subscribe(_=>P(_)),P(W.state)}function Rb(n){n.innerHTML=`
    <div class="card rooms" data-inset="rooms">
      <button type="button" class="rooms__title" aria-expanded="true" aria-controls="rooms-list">Các phòng <span aria-hidden="true">▾</span></button>
      <div class="floors" role="tablist" aria-label="Tầng" hidden></div>
      <ul class="rooms__list" id="rooms-list" role="list"></ul>
    </div>`;const t=n.querySelector(".rooms__list"),e=n.querySelector(".floors");function i(){e.hidden=lt.floors.length<2,e.innerHTML=lt.floors.map(a=>`<button type="button" role="tab" class="floorbtn${a.id===lt.floorId?" on":""}" aria-selected="${a.id===lt.floorId}" data-floor="${Vt(a.id)}">${Vt(a.name)}</button>`).join(""),t.innerHTML=re.list("room").map(a=>`
          <li><button type="button" class="room" data-room="${Vt(a.id)}">
            <span class="room__row"><b>${Vt(a.name)}</b><span>${a.area.toFixed(0)} m²</span></span>
            <small>${Vt(a.note)}</small>
          </button></li>`).join(""),o(W.state)}const s=n.querySelector(".rooms"),r=n.querySelector(".rooms__title");window.innerWidth>=720&&window.innerWidth<1100&&(s.classList.add("is-collapsed"),r.setAttribute("aria-expanded","false")),r.addEventListener("click",()=>{const a=s.classList.toggle("is-collapsed");r.setAttribute("aria-expanded",String(!a))}),W.subscribe((a,c,l)=>{!l.includes("editing")||!a.editing||(s.classList.add("is-collapsed"),r.setAttribute("aria-expanded","false"))}),n.addEventListener("click",a=>{const c=a.target.closest("[data-floor]");if(c)return wt.emit("plan:floor-select",{id:c.dataset.floor});const l=a.target.closest("[data-room]");l&&(W.set({selection:null}),wt.emit("room:go",{id:l.dataset.room}))});function o(a){for(const c of n.querySelectorAll("[data-room]")){const l=c.dataset.room===a.roomId;c.classList.toggle("active",l),l&&window.matchMedia("(max-width: 719px)").matches&&c.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"})}}W.subscribe((a,c,l)=>l.includes("roomId")&&o(a)),wt.on("plan:loaded",i),i()}const gd=(n,t)=>t?`<div class="kv"><dt>${n}</dt><dd>${Vt(t)}</dd></div>`:"";function Cb(n){const t=re.room(n.roomId);return`
    <header class="detail__head">
      <div>
        <span class="tag">${Vt(n.category)}</span>
        <h2>${Vt(n.name)}</h2>
        ${t?`<button type="button" class="link" data-go-room="${Vt(t.id)}">${te("pin",13)} ${Vt(t.name)}</button>`:""}
      </div>
      <button type="button" class="iconbtn" data-close aria-label="Đóng">${te("close",18)}</button>
    </header>
    <dl class="kvs">
      ${gd("Kích thước",bb(n.dims))}
      ${gd("Chất liệu",n.material)}
    </dl>
    ${n.note?`<p class="detail__note">${Vt(n.note)}</p>`:""}
    <div class="detail__actions">
      <button type="button" class="btn btn--primary" data-locate>${te("eye",16)} Xem gần</button>
    </div>`}function Pb(n){const t=re.itemsIn(n.id);return`
    <header class="detail__head">
      <div>
        <span class="tag">Phòng</span>
        <h2>${Vt(n.name)}</h2>
        <small class="muted">${n.area.toFixed(0)} m² · ${t.length} món nội thất</small>
      </div>
      <button type="button" class="iconbtn" data-close aria-label="Đóng">${te("close",18)}</button>
    </header>
    <p class="detail__note">${Vt(n.note)}</p>
    <ul class="chips" role="list">
      ${t.map(e=>`<li><button type="button" class="chip" data-item="${Vt(e.id)}">${Vt(e.name)}</button></li>`).join("")}
    </ul>
    <div class="detail__actions">
      <button type="button" class="btn btn--primary" data-go-room="${Vt(n.id)}">${te("eye",16)} Đến phòng này</button>
    </div>`}function Lb(n){n.innerHTML='<aside class="card detail" data-inset="detail" hidden aria-live="polite"></aside>';const t=n.firstElementChild;t.addEventListener("click",i=>{if(i.target.closest("[data-close]"))return W.select(null);const s=i.target.closest("[data-go-room]");if(s)return wt.emit("room:go",{id:s.dataset.goRoom});const r=i.target.closest("[data-item]");if(r){const o={type:"item",id:r.dataset.item};return W.select(o),wt.emit("camera:locate",o)}i.target.closest("[data-locate]")&&W.state.selection&&wt.emit("camera:locate",W.state.selection)});function e(i){const s=i.selection,r=s&&re.get(s.type,s.id);if(!r){t.hidden=!0,t.innerHTML="";return}t.innerHTML=r.type==="room"?Pb(r):Cb(r),t.hidden=!1}W.subscribe((i,s,r)=>r.includes("selection")&&e(i)),e(W.state)}const Db=[[{cmd:"zoomIn",icon:"plus",label:"Phóng to"},{cmd:"zoomOut",icon:"minus",label:"Thu nhỏ"}],[{cmd:"rotateLeft",icon:"rotateLeft",label:"Xoay trái"},{cmd:"rotateRight",icon:"rotateRight",label:"Xoay phải"}],[{cmd:"home",icon:"home",label:"Về góc nhìn ban đầu"}]];function Ib(n){n.innerHTML=`<nav class="card mapctl" aria-label="Điều khiển camera">${Db.map(t=>t.map(e=>`<button class="mapctl__btn" type="button" data-cmd="${e.cmd}" title="${e.label}" aria-label="${e.label}">${te(e.icon,17)}</button>`).join("")).join('<span class="mapctl__sep" aria-hidden="true"></span>')}</nav>`,n.addEventListener("click",t=>{const e=t.target.closest("[data-cmd]");e&&wt.emit("camera:cmd",{cmd:e.dataset.cmd})})}const Qs=46;function Nb(n,t,e){n.innerHTML=`
    <div class="hud-reticle" aria-hidden="true"><div class="hud-reticle__dot"></div></div>
    <div class="hud-badge" hidden>
      <span class="hud-badge__key">[F]</span>
      <span class="hud-badge__label"></span>
    </div>
    <canvas class="minimap card" width="220" height="154" aria-label="Sơ đồ vị trí"></canvas>
    <div class="joy" aria-hidden="true"><div class="joy__knob"></div></div>
    <div class="touchpad">
      <button class="tbtn tbtn--interact" type="button" data-key="KeyF" aria-label="Tương tác" hidden>${te("plus",22)}</button>
      <button class="tbtn" type="button" data-key="Space" aria-label="Nhảy">${te("jump",22)}</button>
      <button class="tbtn tbtn--run" type="button" aria-pressed="false" aria-label="Chạy">${te("walk",22)}</button>
    </div>
    <p class="toast" role="status" hidden></p>
    <style>
      .hud-reticle { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 14px; height: 14px; pointer-events: none; display: flex; align-items: center; justify-content: center; z-index: 5; }
      .hud-reticle__dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255, 255, 255, 0.9); box-shadow: 0 0 4px rgba(0, 0, 0, 0.7); border: 1px solid rgba(0, 0, 0, 0.3); transition: all 0.15s ease; }
      .hud-reticle.active .hud-reticle__dot { width: 9px; height: 9px; background: var(--brand, #c65a3a); box-shadow: 0 0 10px rgba(198, 90, 58, 0.9); border-color: #fff; }
      .hud-badge { position: absolute; top: calc(50% + 22px); left: 50%; transform: translateX(-50%); display: none; align-items: center; gap: 7px; padding: 6px 14px; border-radius: 999px; background: rgba(24, 28, 38, 0.92); border: 1px solid rgba(255, 255, 255, 0.18); box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4); color: #fff; font-family: system-ui, -apple-system, sans-serif; font-size: 13px; font-weight: 500; pointer-events: none; white-space: nowrap; z-index: 6; }
      .hud-badge__key { display: inline-block; padding: 2px 6px; border-radius: 4px; background: var(--brand, #c65a3a); color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; }
      .hud-badge__label { color: #f8fafc; font-weight: 600; }
    </style>`;const i=n.querySelector(".minimap"),s=i.getContext("2d"),r=n.querySelector(".joy"),o=n.querySelector(".joy__knob"),a=n.querySelector(".toast"),c=n.querySelector(".hud-reticle"),l=n.querySelector(".hud-badge"),u=n.querySelector(".hud-badge__label"),f=n.querySelector(".tbtn--interact");let d=null;const g=(b,y)=>{o.style.transform=`translate(${b}px, ${y}px)`};function p(b){const y=r.getBoundingClientRect();let w=b.clientX-(y.left+y.width/2),L=b.clientY-(y.top+y.height/2);const k=Math.hypot(w,L);k>Qs&&(w=w/k*Qs,L=L/k*Qs),g(w,L),t.setAxis(w/Qs,L/Qs)}r.addEventListener("pointerdown",b=>{d=b.pointerId,r.setPointerCapture(d),p(b)}),r.addEventListener("pointermove",b=>b.pointerId===d&&p(b));const x=b=>{b.pointerId===d&&(d=null,g(0,0),t.setAxis(0,0))};r.addEventListener("pointerup",x),r.addEventListener("pointercancel",x);const m=n.querySelector(".touchpad");for(const b of m?.querySelectorAll?.("[data-key]")??[]){const y=b.dataset.key,w=L=>{t.press(y,!1),b.classList.remove("on"),b.hasPointerCapture?.(L.pointerId)&&b.releasePointerCapture(L.pointerId)};b.addEventListener("pointerdown",L=>{b.setPointerCapture(L.pointerId),t.press(y,!0),b.classList.add("on")}),b.addEventListener("pointerup",w),b.addEventListener("pointercancel",w)}const h=m?.querySelector?.(".tbtn--run");h?.addEventListener?.("click",()=>{const b=h.getAttribute("aria-pressed")!=="true";h.setAttribute("aria-pressed",String(b)),h.classList.toggle("on",b),t.press("ShiftLeft",b)});const v=m?.querySelector?.(".tbtn--crouch");v&&v.addEventListener("click",()=>{const b=v.getAttribute("aria-pressed")!=="true";v.setAttribute("aria-pressed",String(b)),v.classList.toggle("on",b),t.setCrouch(b)});function T(){const{width:b,height:y}=i,w=12,L=Math.min((b-w*2)/lt.size.w,(y-w*2)/lt.size.d),k=(b-lt.size.w*L)/2,I=(y-lt.size.d*L)/2;s.clearRect(0,0,b,y),s.font="11px system-ui, sans-serif",s.textAlign="center";for(const z of lt.rooms){const V=z.id===W.state.roomId;s.fillStyle=V?"#f5e3dc":"#fffdf9",s.strokeStyle="#c9b8ae",s.lineWidth=1.5,s.fillRect(k+z.x0*L,I+z.z0*L,(z.x1-z.x0)*L,(z.z1-z.z0)*L),s.strokeRect(k+z.x0*L,I+z.z0*L,(z.x1-z.x0)*L,(z.z1-z.z0)*L),s.fillStyle="#7a6a61",s.fillText(z.name,k+(z.x0+z.x1)/2*L,I+(z.z0+z.z1)/2*L+4)}const{x:G,z:O,yaw:Q}=t.state,rt=k+G*L,mt=I+O*L,vt=Math.atan2(-Math.cos(Q),-Math.sin(Q));s.fillStyle="rgba(198,90,58,0.25)",s.beginPath(),s.moveTo(rt,mt),s.arc(rt,mt,26,vt-.6,vt+.6),s.closePath(),s.fill(),s.fillStyle="#c65a3a",s.beginPath(),s.arc(rt,mt,5,0,Math.PI*2),s.fill()}let A=0;function D(b){a.textContent=b,a.hidden=!1,clearTimeout(A),A=setTimeout(()=>{a.hidden=!0},5e3)}function R(b){b?(l.hidden=!1,l.style.display="flex",u.textContent=b,c?.classList.add("active"),f&&(f.hidden=!1,f.setAttribute("aria-label",b))):(l.hidden=!0,l.style.display="none",u.textContent="",c?.classList.remove("active"),f&&(f.hidden=!0))}function P(b){const y=b.mode==="walk";if(n.hidden=!y,document.body.classList.toggle("walking",y),y){const w=window.matchMedia("(pointer: coarse)").matches;D(w?"Cần bên trái để đi, kéo màn hình để nhìn quanh, nút bên phải để nhảy hoặc chạy, chạm vào cửa để đóng/mở.":"WASD để đi, Space để nhảy, Ctrl/C để ngồi, nhấp vào cửa (hoặc phím F) để đóng/mở, kéo chuột nhìn quanh."),R(W.state.interactPrompt||e?.getActivePrompt?.()||null)}else R(null)}const _=wt.on("hud:prompt",b=>R(b)),S=W.subscribe((b,y,w)=>{w.includes("mode")&&P(b),w.includes("interactPrompt")&&R(b.interactPrompt)});return P(W.state),{draw:T,notify:D,setPrompt:R,dispose(){_?.(),S?.()}}}const Ub={wood:"Gỗ sáng",darkwood:"Gỗ tối",tile:"Gạch",marble:"Đá hoa",granite:"Granite",concrete:"Bê tông",epoxy:"Epoxy trắng",carpet:"Thảm",glass:"Kính"},Ob={door:"Cửa đi",window:"Cửa sổ",open:"Lối mở"},_d=[.7,.9,1.2,1.5,2,2.5,3],Xi=n=>`${(Math.round(n*10)/10).toLocaleString("vi-VN")} m²`,Da=(n,t,e,i)=>`<div class="chips-row">${n.map(s=>`<button type="button" class="chipbtn${s===t?" on":""}" ${e}="${Vt(s)}">${Vt(i(s))}</button>`).join("")}</div>`;function Fb(n){const t=(e,i,s)=>`<button type="button" class="chipbtn${n.tool===e?" on":""}" data-tool="${e}">${te(s,15)} ${i}</button>`;return`<section><h3>Thêm vào mặt bằng</h3><div class="chips-row">
      ${t("door","Cửa đi","plus")}${t("window","Cửa sổ","plus")}${t("open","Lối mở","plus")}
      ${lt.custom?t("room","Vẽ phòng","pencil"):""}
    </div>${n.tool?`<p class="plan__hint">${n.tool==="room"?"Kéo trên sàn để vẽ phòng chữ nhật.":"Bấm vào một đoạn tường để đặt."} Bấm lại nút để thôi.</p>`:""}</section>`}function zb(n){const t=n.selection,e=t&&re.get(t.type,t.id);return e?.type==="room"?`<section><h3>Phòng đang chọn</h3>
      <label class="plan__field">Tên phòng
        <input type="text" maxlength="40" value="${Vt(e.name)}" data-room-name="${Vt(e.id)}" />
      </label>
      <div class="plan__label">Vật liệu sàn</div>
      ${Da(uc,e.floor??"wood","data-room-floor",i=>Ub[i])}
      <p class="plan__hint">${Xi(e.area)}${lt.custom?" · kéo chấm cam để đổi cạnh, kéo sàn để dời phòng":""}</p>
      ${lt.custom?`<button type="button" class="rbtn rbtn--danger" data-room-delete="${Vt(e.id)}">${te("trash",16)}<span>Xoá phòng</span></button>`:""}
    </section>`:e?.type==="opening"?`<section><h3>${Vt(e.name)} đang chọn</h3>
      ${Da(Bo,e.kind,"data-op-type",i=>Ob[i])}
      <div class="plan__label">Bề rộng</div>
      ${Da(_d,_d.find(i=>Math.abs(i-e.w)<.01),"data-op-width",i=>`${i} m`)}
      <p class="plan__hint">Kéo khối cửa dọc tường để dời.</p>
      <button type="button" class="rbtn rbtn--danger" data-op-delete="${Vt(e.id)}">${te("trash",16)}<span>Xoá</span></button>
    </section>`:'<p class="plan__hint">Bấm một phòng, hoặc một cửa, để chỉnh sàn / tên / kích thước.</p>'}function Bb(n){return lt.custom?`<section><h3>Tầng · tổng ${Xi(lt.totalArea)}</h3>
    <div class="chips-row">${lt.floors.map(t=>`<button type="button" class="chipbtn${t.id===lt.floorId?" on":""}" data-floor="${Vt(t.id)}">${Vt(t.name)} · ${Xi(t.area)}</button>`).join("")}
      <button type="button" class="chipbtn" data-floor-add>${te("plus",15)} Thêm tầng</button></div>
    <label class="plan__field">Tên tầng đang xem
      <input type="text" maxlength="40" value="${Vt(lt.floors.find(t=>t.id===lt.floorId)?.name??"")}" data-floor-name="${Vt(lt.floorId)}" />
    </label>
    ${lt.floors.length>1?`<button type="button" class="rbtn rbtn--danger" data-floor-remove="${Vt(lt.floorId)}">${te("trash",16)}<span>Xoá tầng này</span></button>`:""}
  </section>`:""}function kb(n){if(!lt.custom)return`<section><h3>Mặt bằng</h3>
      <p class="plan__hint">Đang dùng mặt bằng mẫu theo diện tích tin đăng (${Xi(lt.area)}). Có thể đổi sàn, thêm/dời cửa. Muốn tự vẽ phòng và thêm tầng, hãy chuyển sang tự thiết kế.</p>
      <button type="button" class="rbtn" data-plan-convert>${te("pencil",16)}<span>Tự thiết kế mặt bằng</span></button>
    </section>`;const t=n.listingArea,e=t?Math.abs(lt.totalArea-t):0;return`<section><h3>Diện tích</h3>
    <p class="plan__hint">Tầng này ${Xi(lt.area)} · tổng ${Xi(lt.totalArea)}${t?` · tin đăng ${Xi(t)}`:""}</p>
    ${t?`<button type="button" class="rbtn" data-plan-fit="${t}" ${e<.5?"disabled":""}>${te("cube",16)}<span>Khớp diện tích tin đăng</span></button>`:""}
    <button type="button" class="rbtn rbtn--danger" data-plan-revert>${te("undo",16)}<span>Quay về mặt bằng mẫu</span></button>
  </section>`}function Hb(n){let t=!1;function e(){const i=W.state;i.editPanel==="plan"&&(n.innerHTML=[kb(i),Bb(),Fb(i),zb(i)].join(""),t=!1)}return n.addEventListener("click",i=>{const s=i.target.closest("button");if(!s)return;const r=s.dataset;if(r.tool)return wt.emit("tool:set",{tool:r.tool}),W.set({editPanel:null});if("planConvert"in r)return wt.emit("plan:convert");if("planRevert"in r){if(!t){t=!0,s.querySelector("span").textContent="Bấm lần nữa để xác nhận (mất mặt bằng tự vẽ)";return}return wt.emit("plan:revert")}if("planFit"in r)return wt.emit("plan:fit",{target:Number(r.planFit)});if(r.floor)return wt.emit("plan:floor-select",{id:r.floor});if("floorAdd"in r)return wt.emit("plan:floor-add",{});if(r.floorRemove)return wt.emit("plan:floor-remove",{id:r.floorRemove});if(r.roomFloor)return wt.emit("plan:room-floor",{id:W.state.selection.id,floor:r.roomFloor});if(r.roomDelete)return wt.emit("plan:room-delete",{id:r.roomDelete});if(r.opType)return wt.emit("plan:opening-type",{id:W.state.selection.id,type:r.opType});if(r.opWidth)return wt.emit("plan:opening-width",{id:W.state.selection.id,w:Number(r.opWidth)});if(r.opDelete)return wt.emit("plan:opening-delete",{id:r.opDelete})}),n.addEventListener("change",i=>{const s=i.target.closest("input");s&&(s.dataset.roomName&&wt.emit("plan:room-name",{id:s.dataset.roomName,name:s.value}),s.dataset.floorName&&wt.emit("plan:floor-rename",{id:s.dataset.floorName,name:s.value}))}),W.subscribe((i,s,r)=>{["editPanel","selection","tool","floorId","listingArea"].some(o=>r.includes(o))&&e()}),wt.on("plan:loaded",e),{render:e}}const Gb=60,Vb="Kéo đồ để dời · kéo nền để dịch khung · chuột phải để xoay",Wb={door:"Bấm vào tường để đặt cửa đi",window:"Bấm vào tường để đặt cửa sổ",open:"Bấm vào tường để tạo lối mở",room:"Kéo trên sàn để vẽ phòng"};function Xb(){const n=new Map;for(const t of Object.keys(Qi)){const e=Is[t];e&&(n.has(e.category)||n.set(e.category,[]),n.get(e.category).push({kind:t,name:e.name}))}return[...n].map(([t,e])=>({category:t,kinds:e}))}function $b(n){const t=Xb();n.innerHTML=`
    <div class="rail" role="toolbar" aria-label="Công cụ chỉnh bố cục" hidden>
      <div class="drawer" data-drawer="catalog" role="dialog" aria-label="Danh mục đồ nội thất" hidden>
        ${t.map(x=>`<section><h3>${Vt(x.category)}</h3><div class="drawer__grid">${x.kinds.map(m=>`<button type="button" class="tile" data-add="${Vt(m.kind)}">${Vt(m.name)}</button>`).join("")}</div></section>`).join("")}
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
    </div>`;const e=n.querySelector(".rail"),i=n.querySelector(".rail__ctx"),s=n.querySelector(".rail__hint"),r=n.querySelector(".rail__name"),o=n.querySelector('[data-act="toggle"]'),a=n.querySelector('[data-act="reset"]'),c=n.querySelector('[data-act="remove"]'),l=n.querySelector(".inv");let u="";const f=Hb(n.querySelector(".plan")),d=()=>{const x=W.state.selection;return x?.type==="item"?re.get("item",x.id):null};function g(){const x=re.list("item"),m=x.map(v=>`${v.id}:${v.hidden?1:0}`).join("|");if(m===u)return;u=m;const h=x.filter(v=>v.extra).length;l.innerHTML=x.map(v=>`<li class="inv__row${v.hidden?" is-hidden":""}">
            <button type="button" class="inv__name" data-pick="${Vt(v.id)}">${Vt(v.name)}${v.extra?" <small>(thêm)</small>":""}</button>
            <button type="button" class="rbtn rbtn--icon" data-vis="${Vt(v.id)}" aria-label="${v.hidden?"Hiện":"Ẩn"} ${Vt(v.name)}">${te(v.hidden?"eyeOff":"eye",18)}</button>
          </li>`).join("")+`<li class="inv__foot">${x.length} món · ${h}/${Gb} đồ thêm</li>`}function p(x){const m=x.editing&&x.editable&&x.mode==="overview";if(e.hidden=!m,!m)return;n.querySelector(".plan-label").textContent=`Mặt bằng · ${lt.totalArea.toFixed(0)} m²${lt.floors.length>1?` · ${lt.floors.length} tầng`:""}`;const h=d();i.hidden=!h,s.hidden=!!h,h&&(r.textContent=h.name,o.innerHTML=te(h.hidden?"eyeOff":"eye",18),o.setAttribute("aria-label",h.hidden?`Hiện ${h.name}`:`Ẩn ${h.name}`),a.hidden=!h.moved,c.hidden=!h.extra);for(const v of n.querySelectorAll("[data-panel]")){const T=x.editPanel===v.dataset.panel;v.setAttribute("aria-expanded",String(T)),v.classList.toggle("active",T)}for(const v of n.querySelectorAll("[data-drawer]"))v.hidden=v.dataset.drawer!==x.editPanel;x.editPanel==="inventory"&&g(),x.editPanel==="plan"&&f.render(),s.textContent=Wb[x.tool]??Vb}n.addEventListener("click",x=>{const m=x.target.closest("[data-panel]");if(m){W.set({editPanel:W.state.editPanel===m.dataset.panel?null:m.dataset.panel});return}const h=x.target.closest("[data-add]");if(h)return wt.emit("edit:add",{kind:h.dataset.add});const v=x.target.closest("[data-pick]");if(v){const R={type:"item",id:v.dataset.pick};return W.select(R),wt.emit("camera:locate",R)}const T=x.target.closest("[data-vis]");if(T)return u="",wt.emit("edit:toggle",{id:T.dataset.vis});const A=x.target.closest("[data-act]"),D=d();A&&D&&wt.emit(`edit:${A.dataset.act}`,{id:D.id})}),n.addEventListener("keydown",x=>{x.key==="Escape"&&W.state.editPanel&&W.set({editPanel:null})}),W.subscribe((x,m,h)=>{["editing","editable","mode","selection","editPanel","tool"].some(v=>h.includes(v))&&p(x)}),wt.on("plan:loaded",()=>{u="",p(W.state)}),p(W.state)}const Ia=n=>!!n&&n.width>0&&n.height>0;function qb({width:n,height:t},{topbar:e,rooms:i,detail:s,detailShown:r=!0},o=720){const a={left:0,right:0,top:0,bottom:0},c=n>=o;Ia(e)&&(a.top=Math.max(0,e.bottom)),Ia(i)&&(c?a.left=Math.max(0,i.right):a.bottom=Math.max(a.bottom,t-i.top)),r&&Ia(s)&&(c?a.right=Math.max(0,n-s.left):a.bottom=Math.max(a.bottom,t-s.top));const l=n*.6,u=t*.6;if(a.left+a.right>l){const f=l/(a.left+a.right);a.left*=f,a.right*=f}if(a.top+a.bottom>u){const f=u/(a.top+a.bottom);a.top*=f,a.bottom*=f}return a}const Yb=[["header","ui-topbar"],["nav","ui-rooms"],["div","ui-detail"],["div","ui-mapctl"],["div","ui-hud"],["div","ui-edit"]];function jb(n,{app:t,walker:e}){const i={};for(const[c,l]of Yb){const u=document.createElement(c);u.id=l,u.className="region",n.append(u),i[l]=u}Ab(i["ui-topbar"]),Rb(i["ui-rooms"]),Lb(i["ui-detail"]),Ib(i["ui-mapctl"]);const s=Nb(i["ui-hud"],e);$b(i["ui-edit"]);let r=0;function o(){r=0;const c=n.querySelector('[data-inset="detail"]');t.setInsets(qb({width:window.innerWidth,height:window.innerHeight},{topbar:i["ui-topbar"].getBoundingClientRect(),rooms:n.querySelector('[data-inset="rooms"]')?.getBoundingClientRect(),detail:c?.getBoundingClientRect(),detailShown:!!c&&!c.hidden&&!document.body.classList.contains("editing")}))}const a=()=>{r||(r=requestAnimationFrame(o))};return window.addEventListener("resize",a),W.subscribe((c,l,u)=>{(u.includes("selection")||u.includes("mode")||u.includes("editing"))&&(a(),setTimeout(a,320))}),a(),setTimeout(a,400),{hud:s,els:i}}const xt=Math.PI,de=(n,t,e)=>({c:n,w:t,type:"window",...e?{sill:e}:{}}),_n=(n,t=.9)=>({c:n,w:t,type:"door"}),Ho=(n,t=1)=>({c:n,w:t,type:"door",entrance:!0}),Go=(n,t)=>({c:n,w:t,type:"open"}),at=(n,t,e,i=0,s,r)=>({kind:n,x:t,z:e,rot:i,...s?{args:s}:{},...r?{name:r}:{}}),sn=(n,t,e,i,s)=>({dir:n,at:t,from:e,to:i,t:gh,openings:s}),Ye=(n,t,e,i,s=[])=>({dir:n,at:t,from:e,to:i,t:_h,openings:s}),Kb={id:"studio",bedrooms:0,bathrooms:1,size:{w:7,d:5.5},rooms:[{id:"living",name:"Phòng ở & ngủ",x0:0,x1:7,z0:0,z1:3.5,floor:"wood",stand:{x:3.4,z:.7,yaw:xt},note:"Khu ngủ và tiếp khách chung một không gian"},{id:"kitchen",name:"Bếp",x0:0,x1:4,z0:3.5,z1:5.5,floor:"tile",stand:{x:2.2,z:4.3,yaw:xt/2+.5},note:"Bếp một dãy, lối vào căn hộ"},{id:"bath",name:"Vệ sinh",x0:4,x1:7,z0:3.5,z1:5.5,floor:"tile",stand:{x:5.5,z:4,yaw:xt},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[sn("x",0,0,7,[de(2.2,2.4)]),sn("x",5.5,0,7,[de(5.5,.6,1.5)]),sn("z",0,0,5.5,[de(1.75,1.6),Ho(4.5)]),sn("z",7,0,5.5,[de(1.75,1.6)]),Ye("x",3.5,0,7,[Go(1.3,2),_n(5.5)]),Ye("z",4,3.5,5.5)],placements:[at("rug",3.05,2,0,[2.6,1.8]),at("sofa",3.05,1.5,0,[2.2]),at("coffeeTable",3.05,2.5),at("tvUnit",3.05,3.24,xt,[1.2]),at("bed",5.6,1.17,0),at("nightstand",4.4,.35,0),at("wardrobe",6.64,2.8,-xt/2,[1.2,2.3]),at("plant",.5,.5,0,[1]),at("floorLamp",.5,3),at("kitchenRun",1.9,5.1,xt,[2.6]),at("fridge",3.55,5.06,xt),at("shower",6.4,5,0),at("toilet",4.8,5.08,xt),at("vanity",4.33,4.2,xt/2)]},Zb={id:"1pn",bedrooms:1,bathrooms:1,size:{w:8,d:6.5},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:5,z0:0,z1:4,floor:"wood",stand:{x:3.4,z:.7,yaw:xt},note:"Sofa, TV, cửa sổ đón sáng"},{id:"kitchen",name:"Bếp & ăn",x0:5,x1:8,z0:0,z1:3,floor:"tile",stand:{x:5.8,z:.9,yaw:-xt/2-.4},note:"Bếp chữ I, bàn ăn 4 chỗ"},{id:"study",name:"Góc làm việc",x0:5,x1:8,z0:3,z1:6.5,floor:"wood",stand:{x:5.7,z:3.6,yaw:-xt/2+.3},note:"Bàn làm việc, tủ sách"},{id:"bed1",name:"Phòng ngủ",x0:0,x1:3.4,z0:4,z1:6.5,floor:"wood",stand:{x:2.6,z:4.5,yaw:xt/2+.3},note:"Giường đôi, tủ áo"},{id:"bath",name:"Vệ sinh",x0:3.4,x1:5,z0:4,z1:6.5,floor:"tile",stand:{x:4.2,z:4.6,yaw:xt},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[sn("x",0,0,8,[de(1.6,2.2),Ho(4.2),de(6.5,1.6)]),sn("x",6.5,0,8,[de(1.7,1.4),de(4.2,.6,1.5),de(6.5,1.8)]),sn("z",0,0,6.5,[de(2,1.8),de(5.25,1.4)]),sn("z",8,0,6.5,[de(1.5,1.2),de(4.75,1.6)]),Ye("z",5,0,6.5,[Go(1.5,2),_n(3.5)]),Ye("x",3,5,8),Ye("x",4,0,5,[_n(1.7),_n(3.95)]),Ye("z",3.4,4,6.5)],placements:[at("rug",2.8,2.7,0,[3,2]),at("sofa",2.8,1.6,0,[2.2]),at("coffeeTable",2.8,2.8),at("tvUnit",2.8,3.74,xt,[1.2]),at("armchair",.9,2.75,xt/2),at("plant",.4,3.7,0,[1.1]),at("floorLamp",4.55,3.1),at("console",1.5,.28,0,[1]),at("plant",.45,.45,0,[.8],"Cây lối vào"),at("kitchenRun",6.2,2.64,xt,[1.9]),at("fridge",7.55,2.58,xt),at("diningTable",6.8,1),at("chair",6.35,.4,0),at("chair",7.25,.4,0),at("chair",6.35,1.6,xt),at("chair",7.25,1.6,xt),at("rug",1.7,5.5,xt/2,[2.2,1.6,"beige"]),at("bed",1.17,5.5,xt/2),at("nightstand",.33,4.42,xt/2),at("wardrobe",3.04,5.5,-xt/2,[1.4,2.3]),at("toilet",3.8,6.09,xt),at("shower",4.47,5.6,0),at("vanity",4.66,4.6,-xt/2),at("desk",7.6,4.75,-xt/2),at("chair",7.1,4.75,xt/2,void 0,"Ghế làm việc"),at("bookshelf",6.4,6.24,xt,[1.4]),at("plant",5.3,6.1,0,[1])]},Jb={id:"2pn",bedrooms:2,bathrooms:1,size:{w:10,d:7},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:6,z0:0,z1:4.5,floor:"wood",stand:{x:3.4,z:.7,yaw:xt},note:"Sofa, TV, cửa sổ đón sáng hướng Nam"},{id:"kitchen",name:"Bếp & ăn",x0:6,x1:10,z0:0,z1:3,floor:"tile",stand:{x:6.8,z:.9,yaw:-xt/2-.4},note:"Bếp chữ I, bàn ăn 4 chỗ"},{id:"bed2",name:"Phòng ngủ 2",x0:6,x1:10,z0:3,z1:7,floor:"wood",stand:{x:6.9,z:3.9,yaw:-xt/2+.2},note:"Giường đôi, tủ áo, bàn làm việc"},{id:"bed1",name:"Phòng ngủ 1",x0:0,x1:4,z0:4.5,z1:7,floor:"wood",stand:{x:2.8,z:5.1,yaw:xt/2+.3},note:"Giường đôi, tủ áo âm tường"},{id:"bath",name:"Vệ sinh",x0:4,x1:6,z0:4.5,z1:7,floor:"tile",stand:{x:5,z:5.2,yaw:xt},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[sn("x",0,0,10,[de(2.2,2.4),Ho(5),de(8,1.6)]),sn("x",7,0,10,[de(2,1.4),de(5,.6,1.5),de(8,2)]),sn("z",0,0,7,[de(2.5,1.8),de(5.75,1.4)]),sn("z",10,0,7,[de(1.5,1.2),de(5,1.6)]),Ye("z",6,0,7,[Go(1.5,2),_n(3.9)]),Ye("x",3,6,10),Ye("x",4.5,0,6,[_n(2),_n(5)]),Ye("z",4,4.5,7)],placements:[at("rug",3.5,2.7,0,[3,2]),at("sofa",3.5,1.6,0,[2.4]),at("coffeeTable",3.5,2.9),at("ottoman",2.2,2.9),at("tvUnit",3.5,4.24,xt,[1.8]),at("armchair",1,3.3,xt/2),at("plant",.5,4,0,[1.1]),at("floorLamp",5.5,3.3),at("console",3.9,.3,0,[1]),at("plant",5.55,.45,0,[.8],"Cây lối vào"),at("kitchenRun",7.63,2.64,xt,[2.95]),at("fridge",9.5,2.58,xt),at("diningTable",8,1.1),at("chair",7.55,.5,0),at("chair",8.45,.5,0),at("chair",7.55,1.7,xt),at("chair",8.45,1.7,xt),at("rug",1.7,6.05,xt/2,[2.2,1.6,"beige"]),at("bed",1.17,6.05,xt/2),at("nightstand",.33,5,xt/2),at("wardrobe",3.64,5.75,-xt/2,[1.4,2.3]),at("shower",4.55,6.5,0),at("toilet",5.5,6.62,xt),at("vanity",5.69,5.3,-xt/2),at("rug",8,4.4,0,[2.4,1.6,"beige"]),at("bed",8,4.1,0),at("nightstand",6.95,3.35,0),at("nightstand",9.05,3.35,0),at("wardrobe",6.36,6,xt/2,[1.4,2.3]),at("desk",9.6,5,-xt/2),at("chair",9.1,5,xt/2,void 0,"Ghế làm việc"),at("dresser",9.55,6.45,-xt/2)]},Qb={id:"3pn",bedrooms:3,bathrooms:2,size:{w:13,d:8},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:7,z0:0,z1:5,floor:"wood",stand:{x:5.8,z:.8,yaw:xt-.5},note:"Phòng khách rộng, kết hợp bàn ăn"},{id:"kitchen",name:"Bếp",x0:7,x1:13,z0:0,z1:3.5,floor:"tile",stand:{x:7.9,z:.9,yaw:-xt/2-.4},note:"Bếp chữ I, bàn ăn"},{id:"hall",name:"Sảnh",x0:7,x1:9,z0:3.5,z1:5.5,floor:"wood",stand:{x:7.6,z:4,yaw:-xt/2},note:"Sảnh trung tâm dẫn tới phòng ngủ chính"},{id:"master",name:"Phòng ngủ chính",x0:9,x1:13,z0:3.5,z1:8,floor:"wood",stand:{x:9.7,z:4.4,yaw:-xt/2-.2},note:"Giường đôi, tủ áo lớn"},{id:"bath2",name:"Vệ sinh chung",x0:7,x1:9,z0:5.5,z1:8,floor:"tile",stand:{x:8,z:6,yaw:xt},note:"Buồng tắm kính, bồn rửa"},{id:"bed2",name:"Phòng ngủ 2",x0:0,x1:3.5,z0:5,z1:8,floor:"wood",stand:{x:2.7,z:5.5,yaw:xt/2+.3},note:"Giường đôi, tủ áo"},{id:"bed3",name:"Phòng ngủ 3",x0:3.5,x1:5.6,z0:5,z1:8,floor:"wood",stand:{x:4.55,z:5.5,yaw:xt},note:"Phòng ngủ nhỏ cho con / khách"},{id:"bath1",name:"Vệ sinh 2",x0:5.6,x1:7,z0:5,z1:8,floor:"tile",stand:{x:6.3,z:5.5,yaw:xt},note:"Vệ sinh gần phòng khách"}],walls:[sn("x",0,0,13,[de(2.5,2.6),Ho(5.8),de(10,2)]),sn("x",8,0,13,[de(1.75,1.6),de(4.5,1.2),de(6.3,.6,1.5),de(8,.6,1.5),de(11.6,1.6)]),sn("z",0,0,8,[de(2.5,2),de(6.5,1.6)]),sn("z",13,0,8,[de(1.75,1.4),de(5.75,1.6)]),Ye("z",7,0,8,[Go(1.75,2.2),_n(4.2)]),Ye("x",3.5,7,13),Ye("z",9,3.5,8,[_n(4.4)]),Ye("x",5.5,7,9,[_n(8)]),Ye("x",5,0,7,[_n(1.6),_n(4.55),_n(6.3)]),Ye("z",3.5,5,8),Ye("z",5.6,5,8)],placements:[at("rug",3.1,3,0,[3,2]),at("sofa",3.1,1.9,0,[2.4]),at("coffeeTable",3.1,3.1),at("ottoman",1.95,3.1),at("tvUnit",3.1,4.74,xt,[1.8]),at("armchair",1,3.6,xt/2),at("armchair",5.3,3.6,-xt/2),at("plant",.5,4.5,0,[1.1]),at("floorLamp",5.9,4.4),at("console",4.3,.3,0,[1]),at("plant",6.6,.5,0,[.8],"Cây lối vào"),at("diningTable",5.2,1.9),at("chair",4.75,1.3,0),at("chair",5.65,1.3,0),at("chair",4.75,2.5,xt),at("chair",5.65,2.5,xt),at("kitchenRun",9.6,3.14,xt,[3.6]),at("fridge",11.85,3.08,xt),at("diningTable",9.8,1.3),at("chair",9.35,.7,0),at("chair",10.25,.7,0),at("chair",9.35,1.9,xt),at("chair",10.25,1.9,xt),at("plant",8.6,3.9,0,[.9]),at("rug",11.9,5.75,-xt/2,[2.4,1.6,"beige"]),at("bed",11.87,5.75,-xt/2),at("nightstand",12.7,4.7,-xt/2),at("nightstand",12.7,6.8,-xt/2),at("wardrobe",9.8,7.65,xt,[1.4,2.3]),at("plant",12.55,7.5,0,[1]),at("dresser",9.35,6.2,xt/2),at("toilet",7.5,7.6,xt),at("shower",8.45,7.45,0),at("vanity",7.33,6.4,xt/2),at("rug",1.8,6.5,xt/2,[2.2,1.6,"beige"]),at("bed",1.17,6.5,xt/2),at("nightstand",.33,5.35,xt/2),at("wardrobe",3.14,6.5,-xt/2,[1.2,2.3]),at("bed",4.55,6.85,xt),at("toilet",5.97,6.4,xt/2),at("vanity",6.67,6.6,-xt/2),at("shower",6.4,7.4,0)]},xd=[Kb,Zb,Jb,Qb],ty=.9,ey=1.3,so=.15,vd=.9;function ny(n){const t=Math.max(0,Math.min(3,Math.floor(n)));return xd.find(e=>e.bedrooms===t)??xd[2]}const je=(n,t)=>Math.round(n*t*1e3)/1e3;function iy(n,t){return n.map(e=>({...e,at:je(e.at,t),from:je(e.from,t),to:je(e.to,t),openings:e.openings.map(i=>({...i,c:je(i.c,t),at:i.at===void 0?void 0:je(i.at,t)}))}))}function sy(n,t){return n.map(e=>({...e,x0:je(e.x0,t),x1:je(e.x1,t),z0:je(e.z0,t),z1:je(e.z1,t),stand:{...e.stand,x:je(e.stand.x,t),z:je(e.stand.z,t)}}))}function ry(n){return n.map((t,e)=>({...t,openings:t.openings.map((i,s)=>({...i,id:`w${e}o${s}`,dir:t.dir,at:t.at}))}))}function oy(n,t){if(!t)return n;const e=new Set(t.removed??[]),i=t.moved??{},s=n.map(r=>{const o=c=>c.w/2+so,a=[];for(const c of r.openings){if(e.has(c.id))continue;const l=i[c.id],u=l?{...c,...l.c!==void 0?{c:l.c}:{},...l.w!==void 0?{w:l.w}:{},...l.type?{type:l.type}:{}}:c;u.type==="window"&&u.sill===void 0&&(u.sill=vd),u.type!=="window"&&delete u.sill,u.type!=="door"&&delete u.entrance,u.c=Math.min(r.to-o(u),Math.max(r.from+o(u),u.c)),!(r.to-r.from<u.w+so*2)&&a.push(u)}return{...r,openings:a}});for(const r of t.added??[]){const o=s.find(u=>u.dir===r.dir&&Math.abs(u.at-r.at)<.06);if(!o)continue;const a={...r};a.type!=="window"?delete a.sill:a.sill===void 0&&(a.sill=vd),a.type!=="door"&&delete a.entrance;const c=o.from+a.w/2+so,l=o.to-a.w/2-so;l<c||(a.c=Math.min(l,Math.max(c,a.c)),o.openings.push(a))}for(const r of s)r.openings.sort((o,a)=>o.c-a.c);return s}function ay(n,t){return t?n.map(e=>{const i=t[e.id];return i?{...e,...i.name?{name:i.name}:{},...i.floor?{floor:i.floor}:{}}:e}):n}function ly(n){const t=Is[n];return{name:t.name,category:t.category,material:t.material,note:t.note}}function Oh(n,t,e){Is[n.kind];const i=Qi[n.kind],s=n.args&&n.args.length?n.args:i.length?i:void 0;return{id:n.id,kind:n.kind,args:s,x:je(n.x,t),z:je(n.z,t),rot:n.rot??0,...ly(n.kind),pick:!0,hidden:!!n.hidden,moved:!1,extra:!0,floor:e}}function cy(n){return n.map(t=>({id:t.id,name:t.name,area:Dh(t.rooms)}))}function uy(n,t,{editable:e,floorId:i}){const s=t.layout.custom.floors,r=s.find(l=>l.id===i)??s[0],o=r.rooms.map(l=>({...l,stand:{x:Md((l.x0+l.x1)/2),z:Md((l.z0+l.z1)/2),yaw:Math.PI},note:`${Ki(l).toFixed(0)} m²`})),a=Lh(r.rooms,r.openings),c=[];for(const l of t.layout.extras??[])!((l.floor??s[0].id)===r.id)||!Is[l.kind]||!Object.prototype.hasOwnProperty.call(Qi,l.kind)||l.hidden&&!e||c.push(Oh(l,1,r.id));return{templateId:"custom",bedrooms:n.bedrooms,size:qM(r.rooms),rooms:o,walls:a,placements:c,scale:1,floors:cy(s),floorId:r.id,totalArea:fc(s),custom:!0}}const Md=n=>Math.round(n*100)/100;function dy(n,t,{editable:e=!1,floorId:i}={}){if(t?.layout?.custom)return uy(n,t,{editable:e,floorId:i});const s=ny(n.bedrooms),r=s.rooms.reduce((x,m)=>x+Ki(m),0),o=Math.sqrt(Math.max(1,n.areaM2)/r),a=Math.min(ey,Math.max(ty,o)),c=sd[t?.furnishing??n.furnishing]??sd.full,l=t?.layout?.items??{},u=new Map,f=[];for(const x of s.placements){const m=Is[x.kind];if(!m)continue;const h=(u.get(x.kind)??0)+1;if(u.set(x.kind,h),m.tier>c)continue;const v=`${x.kind}-${h}`,T=l[v],A=!!T?.hidden;A&&!e||f.push({id:v,kind:x.kind,args:x.args,x:je(T?.x??x.x,a),z:je(T?.z??x.z,a),rot:T?.rot??x.rot,name:x.name??m.name,category:m.category,material:m.material,note:m.note,pick:m.pick!==!1,hidden:A,moved:T!==void 0&&(T.x!==void 0||T.z!==void 0||T.rot!==void 0),extra:!1})}for(const x of t?.layout?.extras??[])!Is[x.kind]||!Object.prototype.hasOwnProperty.call(Qi,x.kind)||x.hidden&&!e||f.push(Oh(x,a));const d=sy(ay(s.rooms,t?.layout?.rooms),a),g=iy(oy(ry(s.walls),t?.layout?.openings),a),p=d.reduce((x,m)=>x+Ki(m),0);return{templateId:s.id,bedrooms:s.bedrooms,size:{w:je(s.size.w,a),d:je(s.size.d,a)},rooms:d,walls:g,placements:f,scale:a,floors:[{id:"main",name:"Tầng 1",area:Math.round(p*1e3)/1e3}],floorId:"main",totalArea:Math.round(p*1e3)/1e3,custom:!1}}const Lo=.9,Bi=1.2,Si=6,Na=24,Ua=1.35,Oa=.58,ro=1.5,Fh=4,hy=12,fy=60,py=2e3,lr=(n,t)=>typeof n=="string"?n.trim().slice(0,t):"",ir=(n,t,e,i)=>{const s=Math.floor(Number(n));return Number.isFinite(s)&&s>=t&&s<=e?s:i};function my(n,t){if(!n||typeof n!="object")return null;const e=lr(n.apartmentId,80),i=ir(n.floor,1,t,0),s=ir(n.slot,0,Fh-1,-1);if(!e||!i||s<0)return null;const r=Number(n.areaM2);return{apartmentId:e,floor:i,slot:s,label:lr(n.label,40)||e,bedrooms:ir(n.bedrooms,0,8,2),bathrooms:ir(n.bathrooms,0,8,1),areaM2:Number.isFinite(r)&&r>0&&r<=1e3?r:70,furnishing:["bare","partial","full"].includes(n.furnishing)?n.furnishing:"full",has3d:n.has3d===!0}}function gy(n){if(!n||typeof n!="object"||!Array.isArray(n.buildings))return null;const t=[],e=new Set;for(const i of n.buildings.slice(0,hy)){if(!i||typeof i!="object")continue;const s=lr(i.id,40),r=ir(i.floors,1,fy,0);if(!s||!r||e.has(s))continue;e.add(s);const o=new Set,a=[];for(const c of(Array.isArray(i.units)?i.units:[]).slice(0,py)){const l=my(c,r),u=l&&`${l.floor}:${l.slot}`;!l||o.has(u)||(o.add(u),a.push(l))}t.push({id:s,name:lr(i.name,40)||s,floors:r,units:a})}return t.length?{name:lr(n.name,80),buildings:t}:null}const _y=n=>({apartmentId:n.apartmentId,bedrooms:n.bedrooms,bathrooms:n.bathrooms,areaM2:n.areaM2,furnishing:n.furnishing,designs:[]});function xy(n){const t=n<=6?7:9,e=(t-1)/2,i=[];for(let a=0;a<t;a++)for(let c=0;c<t;c++)Math.max(Math.abs(a-e),Math.abs(c-e))<=2&&i.push([a,c]);let s=n*7919+13;const r=()=>(s=s*1664525+1013904223>>>0)/4294967296;for(let a=i.length-1;a>0;a--){const c=Math.floor(r()*(a+1));[i[a],i[c]]=[i[c],i[a]]}const o=i.slice(0,n);return{size:t,block:Na,owner:new Set(o.map(([a,c])=>`${a},${c}`)),pos:o.map(([a,c])=>({x:(a-e)*Na,z:(c-e)*Na}))}}function bd(n,t={x:0,z:0}){const e=Bi+(n.floor-1)*Lo+Lo/2,i=Si/2+.04;return n.slot<2?{x:t.x+(n.slot===0?-ro:ro),y:e,z:t.z+i,ry:0}:{x:t.x+i,y:e,z:t.z+(n.slot===2?ro:-ro),ry:Math.PI/2}}const yd=[[9,1],[14,2],[6,0],[16,3],[8,1]];function vy(){return{name:"TH PropTech Residence",buildings:[14,18,10,20,12].map((i,s)=>[String.fromCharCode(65+s),`Tòa ${String.fromCharCode(65+s)}`,i]).map(([i,s,r],o)=>{const a=[];for(let c=1;c<=r;c++)for(let l=0;l<Fh;l++){const u=`${i}-${String(c).padStart(2,"0")}0${l+1}`;a.push({apartmentId:`demo-${u}`,floor:c,slot:l,label:u,bedrooms:1+(c+l)%3,bathrooms:1+(c+l)%2,areaM2:45+l*12+(c+o)%3*5,furnishing:["bare","partial","full"][(c+l)%3],has3d:c===yd[o][0]&&l===yd[o][1]})}return{id:i,name:s,floors:r,units:a}})}}const oo=Math.PI/4,Sd=1,My=30,Fa=15659771,_o=19,by=2.4,yy=1.6,Sy=new zt(988979),Ey=new U(70,130,90),Ty=new U(-70,110,60),wy=new zt(16777215),Ay=new zt(10204415),Ry=new zt(14673658),Cy=new zt(3489899),Ed=[14242639,3900100,15905076,4171638,9333695,14711609,3094080],zh=_o/2-.8,Py=8*zh;function Ly(n,t){const e=(n%(8*t)+8*t)%(8*t),i=Math.floor(e/(2*t)),s=e-i*2*t-t;return i===0?[s,-t]:i===1?[t,s]:i===2?[-s,t]:[-t,-s]}const Dy=n=>()=>(n=n*1664525+1013904223>>>0)/4294967296;function Bh(n,t){const e=document.createElement("canvas");e.width=e.height=64,n(e.getContext("2d"));const i=new wo(e);return i.wrapS=i.wrapT=cr,t&&i.repeat.set(...t),i.colorSpace=qe,i.anisotropy=4,i}const Iy=()=>Bh(n=>{n.fillStyle="#f4f6fd",n.fillRect(0,0,64,64),n.fillStyle="#c3cef4",n.fillRect(0,16,64,16),n.fillStyle="#f4f6fd";for(let t=0;t<64;t+=16)n.fillRect(t+14,16,2,16)}),Ny=n=>Bh(t=>{t.fillStyle="#fff",t.fillRect(0,0,64,64),t.fillStyle="#b9c7ea",t.fillRect(0,60,64,4)},[1,n]);function Td(n,t,e,i,s,r){const o=new fe(n,t,e),a=o.attributes.uv,c=[[e,t],[e,t],null,null,[n,t],[n,t]];for(let u=0;u<6;u++)for(let f=0;f<4;f++){const d=u*4+f;c[u]?a.setXY(d,a.getX(d)*c[u][0]/by,a.getY(d)*c[u][1]/yy):a.setXY(d,.5,.06)}o.translate(i,t/2,s);const l=new Float32Array(72);for(let u=0;u<24;u++)l.set([r,r,r],u*3);return o.setAttribute("color",new Mn(l,3)),o}function yi(n,t,e){const i=new Ql(n,t,Math.max(1,e.length));i.count=e.length;const s=new De;return e.forEach((r,o)=>{s.position.set(r.x,r.y,r.z),s.rotation.set(0,r.ry??0,0),s.scale.setScalar(r.s??1),s.updateMatrix(),i.setMatrixAt(o,s.matrix)}),i.instanceMatrix.needsUpdate=!0,i}function Uy(n){n.traverse(t=>{t.geometry?.dispose?.();const e=Array.isArray(t.material)?t.material:t.material?[t.material]:[];for(const i of e)i.map?.dispose(),i.dispose()})}function Oy(n,t={},e=mh()){const i=new uh({antialias:!e.coarse,powerPreference:"high-performance",stencil:!1}),s=Math.min(window.devicePixelRatio||1,e.coarse?1.25:1.75),r=e.coarse?12e5:24e5;let o=1/0;i.setPixelRatio(s),i.outputColorSpace=qe,i.toneMapping=Io,i.shadowMap.enabled=!0,i.shadowMap.type=Es,i.shadowMap.autoUpdate=!1,Object.assign(i.domElement.style,{display:"block",width:"100%",height:"100%",touchAction:"none",outline:"none",cursor:"grab"});const a=new Jl,c=new zt(Fa);a.background=new zt(Fa),a.fog=new Uo(Fa,320,760);const l=new hn(My,1,2,1400);n.append(i.domElement);const u=new hh(l,i.domElement);u.enableDamping=!0,u.dampingFactor=.1,u.rotateSpeed=.5,u.panSpeed=1.1,u.minDistance=8,u.maxDistance=360,u.minPolarAngle=.35,u.maxPolarAngle=1.5,u.minAzimuthAngle=oo-Sd,u.maxAzimuthAngle=oo+Sd,u.screenSpacePanning=!1,u.touches={ONE:fn.PAN,TWO:fn.DOLLY_ROTATE},u.addEventListener("change",()=>q()),u.mouseButtons={LEFT:Xe.PAN,MIDDLE:Xe.DOLLY,RIGHT:Xe.ROTATE};const f=new Kd(16777215,14673658,1.55);a.add(f);const d=new th(16777215,1.9);d.castShadow=!0,d.shadow.mapSize.set(e.shadowSize,e.shadowSize),d.shadow.bias=-6e-4,d.shadow.normalBias=.05;const g=d.shadow.camera;g.left=-110,g.right=110,g.top=110,g.bottom=-110,g.near=1,g.far=400,d.position.set(70,130,90),a.add(d,d.target);const p=new ke({color:2179199,roughness:.25,metalness:.2}),x=new ke({color:16766346,emissive:16754234,emissiveIntensity:1,roughness:.4}),m=new ke({color:1782118,roughness:.7}),h=new ke({color:16757575,emissive:16751135,emissiveIntensity:.9,roughness:.4}),v=new Xt(new fe(Ua+.3,Oa+.3,.12),new ji({color:16777215,transparent:!0,opacity:.6,depthTest:!1}));v.renderOrder=10,v.visible=!1,a.add(v);let T=null,A=null,D=null,R={h:100},P=[],_=[],S=[],b=null,y=null,w=!0,L=0,k=0,I=0,G=0,O=null,Q={w:1,h:1},rt=3,mt=0,vt=!1,z=0,V=0;const q=(N=2)=>{N>rt&&(rt=N)},et=new fe(Ua,Oa,.08),j=new fe(Ua+.18,Oa+.18,.05),dt=(()=>{const N=new Ls(.75,14,10).translate(0,1.5,0),J=new nc(.62,1.3,14).rotateX(Math.PI).translate(0,.65,0);return or([N.toNonIndexed(),J.toNonIndexed()])})();function ct(){const N=k;a.background.lerpColors(c,Sy,N),a.fog.color.copy(a.background),f.intensity=Ue.lerp(1.55,.5,N),f.groundColor.lerpColors(Ry,Cy,N),d.intensity=Ue.lerp(1.9,.65,N),d.color.lerpColors(wy,Ay,N),d.position.lerpVectors(Ey,Ty,N),i.shadowMap.needsUpdate=!0}function Ct(N,J){const $=Math.min(90,Math.round(N.length*1.2));if(!$)return;const ut=or([new zs(.15,.19,.72,6).translate(0,.52,0).toNonIndexed(),new Ls(.16,6,5).translate(0,1.04,0).toNonIndexed()]),Z=new Ql(ut,new ke({color:16777215,roughness:.9}),$),st=new zt,ht=[];for(let bt=0;bt<$;bt++){const[gt,pt]=N[Math.floor(J()*N.length)];ht.push({bx:gt,bz:pt,s:J()*Py,dir:J()<.5?1:-1,speed:.9+J()*.8,phase:J()*6}),Z.setColorAt(bt,st.setHex(Ed[Math.floor(J()*Ed.length)]))}Z.frustumCulled=!1,O={mesh:Z,walkers:ht,dummy:new De},T.add(Z),It(0)}function It(N){if(!O)return;const{mesh:J,walkers:$,dummy:ut}=O;$.forEach((Z,st)=>{Z.s+=Z.dir*Z.speed*N;const[ht,bt]=Ly(Z.s,zh);ut.position.set(Z.bx+ht,.12+Math.abs(Math.sin(L*6+Z.phase))*.05,Z.bz+bt),ut.updateMatrix(),J.setMatrixAt(st,ut.matrix)}),J.instanceMatrix.needsUpdate=!0}function Dt(N,J){const $=new Kt,ut=D.pos[J];$.position.set(ut.x,0,ut.z);const Z=N.floors*Lo,st=new Xt(new fe(Si+1.6,Bi,Si+1.6),new ke({color:14936571,roughness:.8}));st.position.y=Bi/2;const ht=new Xt(new fe(Si,Z,Si),new ke({color:4883186,map:Ny(N.floors),roughness:.8,emissive:0}));ht.position.y=Bi+Z/2;const bt=new Xt(new fe(Si-.8,.5,Si-.8),new ke({color:3105494,roughness:.8}));bt.position.y=Bi+Z+.25;const gt=new Xt(new fe(3.2,.8,.06),new ke({color:1782118,roughness:.3}));gt.position.set(0,.45,(Si+1.6)/2+.03);for(const nt of[st,ht,bt,gt])nt.castShadow=!0,nt.receiveShadow=!0;$.add(st,gt,ht,bt),ht.userData={building:N},st.userData={building:N},_.push(ht);const pt=N.units.filter(nt=>nt.has3d),Bt=N.units.filter(nt=>!nt.has3d),Gt=nt=>nt.map(Mt=>bd(Mt)),ee=new Set(N.units.map(nt=>`${nt.floor}:${nt.slot}`)),F=[];for(let nt=1;nt<=N.floors;nt++)for(let Mt=0;Mt<4;Mt++)ee.has(`${nt}:${Mt}`)||F.push({floor:nt,slot:Mt});const _t=yi(j,m,Gt([...N.units,...F])),ot=yi(et,p,Gt(F)),St=yi(et,p,Gt(Bt)),ft=yi(et,x,Gt(pt));if(St.userData={building:N,units:Bt},ft.userData={building:N,units:pt},$.add(_t,ot,St,ft),P.push(ft,St,ht,st),pt.length){const nt=new Xt(dt,h);nt.position.set(0,Bi+Z+1.2,0),nt.userData.baseY=nt.position.y,nt.userData.phase=J*1.3,$.add(nt),S.push(nt)}return $}function ie(){const{size:N,block:J}=D,$=(N-1)/2,ut=N*J/2;R={h:ut};const Z=new Xt(new Ps(N*J+600,N*J+600),new ke({color:14673400,roughness:1}));Z.rotation.x=-Math.PI/2,Z.receiveShadow=!0,T.add(Z);const st=[];for(let ft=0;ft<=N;ft++){const nt=(ft-N/2)*J;for(let Mt=-ut;Mt<ut;Mt+=3.2)st.push({x:Mt+1.6,y:.02,z:nt},{x:nt,y:.02,z:Mt+1.6,ry:Math.PI/2})}T.add(yi(new Ps(1.3,.16).rotateX(-Math.PI/2),new ke({color:16251391}),st));const ht=Dy(23),bt=[],gt=[],pt=[],Bt=[],Gt=[];for(let ft=0;ft<N;ft++)for(let nt=0;nt<N;nt++){const Mt=(ft-$)*J,kt=(nt-$)*J,Ee=D.owner.has(`${ft},${nt}`),ce=!Ee&&ht()<.1;(ce?gt:bt).push({x:Mt,y:.06,z:kt});const Ln=Math.hypot(ft-$,nt-$)/$;if(ce||Gt.push([Mt,kt]),!ce&&!Ee)if(ht()<.18){const Ae=12+ht()*4;pt.push(Td(Ae,2.4+ht()*1.2,7+ht()*3,Mt+(ht()-.5)*2,kt+(ht()-.5)*3,.96))}else for(const[Ae,En]of[[-5,-5],[5,-5],[-5,5],[5,5]]){if(ht()<.2)continue;const Vo=4.4+ht()*3.4,yr=4.4+ht()*3.4,Sr=2.6+ht()**2*11*Math.max(.35,1.25-Ln*.7);pt.push(Td(Vo,Sr,yr,Mt+Ae+(ht()-.5)*1.4,kt+En+(ht()-.5)*1.4,.93+ht()*.07))}if(!Ee&&ht()<.75){const Ae=_o/2-.5;for(let En=-Ae+1.5;En<=Ae-1.5;En+=3.4)ht()<.25||Bt.push({x:Mt+En,z:kt+Ae},{x:Mt+En,z:kt-Ae},{x:Mt+Ae,z:kt+En},{x:Mt-Ae,z:kt+En})}if(ce)for(let Ae=0;Ae<14;Ae++)Bt.push({x:Mt+(ht()-.5)*15,z:kt+(ht()-.5)*15})}const ee=new fe(_o,.12,_o),F=yi(ee,new ke({color:15856892,roughness:1}),bt),_t=yi(ee,new ke({color:13890016,roughness:1}),gt);if(F.receiveShadow=_t.receiveShadow=!0,T.add(F,_t),pt.length){const ft=new Xt(or(pt),new ke({map:Iy(),vertexColors:!0,roughness:.9}));ft.castShadow=!0,ft.receiveShadow=!0,T.add(ft)}const ot=new zt,St=yi(new sc(.48,0),new ke({color:16777215,roughness:.9}),Bt.map(ft=>({x:ft.x,y:.6,z:ft.z,s:.8+ht()*.6})));Bt.forEach((ft,nt)=>St.setColorAt(nt,ot.setHSL(.38+ht()*.04,.6,.5+ht()*.1))),St.instanceColor&&(St.instanceColor.needsUpdate=!0),T.add(St),Ct(Gt,ht)}function $t(){T&&(a.remove(T),Uy(T),T=null,P=[],_=[],S=[],O=null,b=null,v.visible=!1)}const le=()=>{const N=l.position.clone().sub(u.target),J=new Ao().setFromVector3(N);return{target:u.target.clone(),distance:J.radius,azimuth:J.theta,polar:J.phi}},he=N=>{u.target.copy(N.target),l.position.copy(N.target).add(new U().setFromSphericalCoords(N.distance,N.polar,N.azimuth)),l.lookAt(N.target)};let Wt=null;function Pe(N,J=1){Wt?.resolve(!1);const $=le();return J>0?new Promise(ut=>{Wt={from:$,to:N,duration:J,resolve:ut,t:0}}):(he(N),Wt=null,Promise.resolve(!0))}u.addEventListener("start",()=>{Wt&&(Wt.resolve(!1),Wt=null)});const ye=()=>{const N=Q.w/Q.h;return{target:new U(0,0,0),distance:Math.min(340,Math.max(120,190*Math.max(1,1.3/N))),azimuth:oo,polar:.95}},Je=N=>A?.buildings.findIndex(J=>J.id===N)??-1;function B(){Q={w:n.clientWidth||window.innerWidth,h:n.clientHeight||window.innerHeight},i.setPixelRatio(Math.max(.7,Math.min(s,o,Math.sqrt(r/(Q.w*Q.h))))),i.setSize(Q.w,Q.h,!1),l.aspect=Q.w/Q.h,l.updateProjectionMatrix(),q()}new ResizeObserver(B).observe(n),B();const Ie=new ac,Zt=new Ft;function pe(N){const J=i.domElement.getBoundingClientRect();Zt.set((N.clientX-J.left)/J.width*2-1,-((N.clientY-J.top)/J.height)*2+1),Ie.setFromCamera(Zt,l);const $=Ie.intersectObjects(P,!1)[0];if(!$)return null;const ut=$.object.userData;return ut.units?{type:"unit",unit:ut.units[$.instanceId],building:ut.building,object:$.object,instanceId:$.instanceId}:{type:"building",building:ut.building}}function yt(N){if(!(b&&N&&b.type===N.type&&b.building===N.building&&b.unit===N.unit)){b=N;for(const $ of _)$.material.emissive.setHex(N&&N.building===$.userData.building?1451597:0);if(N?.type==="unit"){const $=new ge;N.object.getMatrixAt(N.instanceId,$),$.premultiply(N.object.parent.matrixWorld),$.decompose(v.position,v.quaternion,v.scale),v.visible=!0}else v.visible=!1;i.domElement.style.cursor=N?"pointer":"grab",q()}}let _e=null;i.domElement.addEventListener("pointerdown",N=>{_e={x:N.clientX,y:N.clientY}});let C=null;i.domElement.addEventListener("pointermove",N=>{N.buttons||N.pointerType==="touch"||(C||requestAnimationFrame(()=>{const J=C;C=null;const $=pe(J);yt($),t.onHover?.($,J.clientX,J.clientY)}),C=N)}),i.domElement.addEventListener("pointerleave",()=>{yt(null),t.onHover?.(null,0,0)}),i.domElement.addEventListener("pointerup",N=>{!_e||Math.hypot(N.clientX-_e.x,N.clientY-_e.y)>5||(_e=null,t.onClick?.(pe(N),N.clientX,N.clientY))});const M=new eh;function X(){const N=Math.min(.1,M.getDelta());if(L+=N,k!==I&&(k=k<I?Math.min(I,k+N/1.6):Math.max(I,k-N/1.6),ct(),q()),Wt){const $=Wt;$.t=Math.min(1,$.t+N/$.duration);const ut=ph($.t);he({target:$.from.target.clone().lerp($.to.target,ut),distance:Math.exp(Ue.lerp(Math.log($.from.distance),Math.log($.to.distance),ut)),azimuth:Ue.lerp($.from.azimuth,$.to.azimuth,ut),polar:Ue.lerp($.from.polar,$.to.polar,ut)}),$.t>=1&&(Wt=null,$.resolve(!0))}else{u.update()&&q();const $=u.target;$.x=Ue.clamp($.x,-R.h,R.h),$.z=Ue.clamp($.z,-R.h,R.h),$.y=Ue.clamp($.y,0,60)}Wt&&q(),mt+=N,G+=N;const J=l.position.distanceTo(u.target)<120;if(mt>=(J?1/30:1/10)){mt=0,x.emissiveIntensity=(1.05+.55*Math.sin(L*2.4))*(1+k*1.4),J&&It(G),G=0;for(const $ of S)$.position.y=$.userData.baseY+Math.sin(L*2+$.userData.phase)*.35,$.rotation.y=L*1.2+$.userData.phase;q(1)}rt>0?(rt--,i.render(a,l),vt?(z++,N>.034&&V++,z>=40&&(V>26&&o>.75&&(o=Math.max(.7,Math.min(o,i.getPixelRatio())-.2),B()),z=V=0)):z=V=0,vt=!0):vt=!1}return{domElement:i.domElement,setData(N){$t(),A=N,T=new Kt,a.add(T),D=xy(N.buildings.length),ie(),N.buildings.forEach((J,$)=>T.add(Dt(J,$))),i.shadowMap.needsUpdate=!0,q(3),y=null,he(ye())},home:(N=1)=>(y=null,Pe(ye(),N)),focusBuilding(N,J=1){const $=Je(N);if($<0)return this.home(J);y=N;const Z=A.buildings[$].floors*Lo;return Pe({target:new U(D.pos[$].x,Bi+Z*.42,D.pos[$].z+1),distance:Math.max(36,Z*2.3),azimuth:oo,polar:1.2},J)},flyToUnit(N,J,$=.9){const ut=bd(N,D.pos[Je(J.id)]);return Pe({target:new U(ut.x,ut.y,ut.z),distance:7,azimuth:N.slot<2?.05:Math.PI/2-.05,polar:1.45},$)},setNight(N){I=N?1:0,q(3)},get night(){return I===1},get focusedId(){return y},get paused(){return w},pause(){w=!0,i.setAnimationLoop(null)},resume(){w=!1,M.getDelta(),q(3),i.setAnimationLoop(X)}}}const Fy=360;function zy(n,{onEnterUnit:t}){n.innerHTML=`
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
    <div class="campus-fade"></div>`;const e=_=>n.querySelector(_),i=e("#campus-tip"),s=e("#campus-panel"),r=e(".campus-fade");let o=null,a=!1,c=0;const l=_=>`Tầng ${_.floor} · ${_.bedrooms} PN · ${_.areaM2} m²`;function u(_,S,b){i.innerHTML=_,i.hidden=!1;const y=14,w=i.offsetWidth;i.style.transform=`translate(${Math.min(S+y,window.innerWidth-w-8)}px, ${Math.max(8,b-i.offsetHeight-y)}px)`}const f=()=>{i.hidden=!0};function d(_){u(Vt(_),window.innerWidth/2-100,window.innerHeight/2),clearTimeout(c),c=setTimeout(()=>{c=0,f()},1800)}const g=Oy(e(".campus-stage"),{onHover(_,S,b){if(!(c&&_==null)){if(!_)return f();if(clearTimeout(c),c=0,_.type==="unit"){const y=_.unit;u(`<b>${Vt(y.label)}</b><span>${Vt(l(y))}</span><em class="${y.has3d?"on":""}">${y.has3d?"Bấm để xem 3D":"Chưa có mô hình 3D"}</em>`,S,b)}else f()}},onClick(_){if(!a){if(!_)return D();if(_.type==="building")return R(_.building);if(_.unit.has3d)return P(_.unit,_.building);g.focusedId!==_.building.id&&R(_.building),d(`${_.unit.label}: chưa có mô hình 3D`)}}}),p=e("#campus-night");function x(){const _=g.night;p.innerHTML=te(_?"moon":"sun",18);const S=_?"Chuyển sang ban ngày":"Chuyển sang ban đêm";p.setAttribute("aria-label",S),p.setAttribute("aria-pressed",String(_)),p.title=S}p.addEventListener("click",()=>{g.setNight(!g.night),x()}),x();const m=e("#campus-fs"),h=!!(document.fullscreenEnabled||document.webkitFullscreenEnabled);m.hidden=Us()||!(h||Po()&&!Us());let v=!1;function T(){m.innerHTML=te(v?"shrink":"expand",18);const _=v?"Thoát toàn màn hình":"Toàn màn hình";m.setAttribute("aria-label",_),m.title=_}m.addEventListener("click",()=>{if(h){const _=document.documentElement,S=_.requestFullscreen??_.webkitRequestFullscreen,b=document.exitFullscreen??document.webkitExitFullscreen;document.fullscreenElement??document.webkitFullscreenElement?b.call(document):S.call(_)}else bn("FLOORPLAN_EXPAND_TOGGLE")});const A=()=>{v=!!(document.fullscreenElement??document.webkitFullscreenElement),T()};document.addEventListener("fullscreenchange",A),document.addEventListener("webkitfullscreenchange",A),wt.on("host:expanded",({expanded:_})=>{v=_,T()}),T();function D(){s.hidden=!0,g.focusedId&&g.home()}function R(_){f();const S=_.units.filter(b=>b.has3d).sort((b,y)=>y.floor-b.floor||b.slot-y.slot);s.hidden=!1,s.innerHTML=`
      <header><div><b>${Vt(_.name)}</b><small>${_.floors} tầng · ${S.length}/${_.units.length} căn có 3D</small></div>
        <button class="iconbtn" type="button" data-close aria-label="Đóng">${te("close",16)}</button></header>
      <ul>${S.length?S.map(b=>`<li><button type="button" data-id="${Vt(b.apartmentId)}">
            <span class="campus-dot campus-dot--on"></span>
            <span class="campus-unit"><b>${Vt(b.label)}</b><small>${Vt(l(b))}</small></span>
            <span class="tag">3D</span></button></li>`).join(""):'<li class="campus-empty">Tòa này chưa có căn nào có mô hình 3D.</li>'}</ul>`,s.querySelector("[data-close]").onclick=D,s.querySelectorAll("[data-id]").forEach(b=>{b.onclick=()=>P(S.find(y=>y.apartmentId===b.dataset.id),_)}),g.focusBuilding(_.id)}async function P(_,S){a=!0,f(),await g.flyToUnit(_,S),r.style.transition="",r.classList.add("on"),await new Promise(b=>setTimeout(b,Fy)),t(_,S),a=!1}return{setData(_){o=_,e("#campus-title").textContent=_.name||"Khu căn hộ";const S=_.buildings.reduce((b,y)=>b+y.units.filter(w=>w.has3d).length,0);e("#campus-sub").textContent=`${S} căn có 3D`,s.hidden=!0,g.setData(_)},get hasData(){return!!o},pause:()=>g.pause(),resume(){g.resume(),g.focusedId&&g.focusBuilding(g.focusedId,.9),r.style.transition="none",r.classList.add("on"),r.offsetWidth,r.style.transition="",r.classList.remove("on")}}}const Ri=new URLSearchParams(location.search),Ze=Vx(document.getElementById("viewport"));xh({templateId:"",bedrooms:2,size:{w:10,d:7},rooms:[],walls:[],placements:[]});bh();const kn=Jv(Ze),wi=oM({camera:Ze.camera,dom:Ze.renderer.domElement,colliders:kn.colliders}),Gs=fM(Ze,kn,wi),vr=gM(Ze,kn),Pn=jb(document.getElementById("ui"),{app:Ze,walker:wi});let mr=null,li=[],Ul="",ae=Ce(null);const wd=n=>JSON.stringify(Ce(n)),bc=()=>li.find(n=>n.id===W.state.designId)??li[0];function Pi(){const n=bc(),t=dy(mr,{...n,layout:ae},{editable:W.state.editing,floorId:W.state.floorId??void 0});Gx(Ch(n)),xh(t),bh(),kn.rebuild(),W.state.floorId!==lt.floorId&&W.set({floorId:lt.floorId}),Hh.sync(),wt.emit("plan:loaded"),Ze.invalidateShadows(),Pn.hud.draw()}function kh(n,{keepView:t=!1}={}){const e=li.find(s=>s.id===n)??li[0];ae=Ce(e.layout);const i=W.state.mode==="walk";return W.set({designs:li,designId:e.id,selection:null,hover:null,roomId:null,menu:null,editPanel:null}),Pi(),t||W.set({hour:e.defaultHour}),kn.setHour(W.state.hour),Gs.start({walk:i}),e}function Ol(n,t,e){return JSON.stringify([{...n,designs:void 0},t.map(i=>i.id===e?{...i,layout:void 0}:i)])}function yc(n){const t=n.designs.length?n.designs:[IM(n.apartmentId)],e=!mr,i=e?null:W.state.designId;if(W.set({editable:n.editable,listingArea:n.areaM2}),!n.editable&&W.state.editing&&W.set({editing:!1}),!e&&Ol(n,t,i)===Ul){const a=t.find(c=>c.id===i);a&&wd(a.layout)!==wd(ae)&&(li=t,ae=Ce(a.layout),W.set({designs:li}),Pi());return}mr=n,li=t;const s=!e&&W.state.designs.some(o=>o.id===W.state.designId),r=kh(n.designId??(s?W.state.designId:null),{keepView:!e});Ul=Ol(n,t,r.id),e&&By()}function By(){const n=Number(Ri.get("hour"));n>=6&&n<=18&&W.set({hour:n}),kn.setHour(W.state.hour);const t=Ri.get("room"),e=Ri.get("mode")==="walk";(e||t)&&Gs.start({walk:e,room:t});const i=Ri.get("select");i&&re.get("item",i)&&W.select({type:"item",id:i})}wt.on("design:select",({id:n})=>{const t=kh(n,{keepView:!1});Ul=Ol(mr,li,t.id),bn("FLOORPLAN_DESIGN_SELECTED",{designId:t.id})});const cn=()=>({custom:lt.custom,scale:lt.scale,floorId:lt.floorId,walls:lt.walls,rooms:lt.rooms,placements:lt.placements});function Bn(n,{select:t,rejected:e="Không thực hiện được thao tác này ở vị trí đó."}={}){return n===ae||n==null?(Pn.hud.notify(e),vr.refresh(),Pi(),!1):(yn(n,t===void 0?{}:{select:t}),!0)}function ky(n,t,e){if(!W.state.editable)return;const i=FM(ae,n,t,e,lt.scale),s=lt.placements.find(o=>o.id===n),r=re.get("item",n);if(!s||!r)return yn(i);ae=i;for(const o of[s,r])Object.assign(o,{x:t,z:e,moved:!0});vr.refresh(),Ze.invalidateShadows(),W.set({selection:{type:"item",id:n}}),bn("FLOORPLAN_LAYOUT_CHANGED",{designId:bc().id,layout:ae})}const Hh=vb(Ze,kn,vr,{isCustom:()=>lt.custom,onMove:(n,t,e)=>ky(n,t,e),onReject:n=>Pn.hud.notify(n),onCancel:()=>Pi(),onOpeningMove:(n,t)=>Bn(tb(ae,cn(),n,t),{select:{type:"opening",id:n},rejected:"Cửa không đặt được ở đó (tường quá ngắn)."}),onOpeningAdd:({dir:n,at:t,c:e,type:i})=>{const s=sb(ae,cn(),{dir:n,at:t,c:e,type:i});if(!s)return Pn.hud.notify("Không đặt được ở đó: tường quá ngắn hoặc đã có cửa.");yn(s.layout,{select:{type:"opening",id:s.id}}),W.set({tool:null})},onRoomDraw:n=>{const t=lb(ae,cn(),n);if(!t)return Pn.hud.notify("Không vẽ được phòng ở đó: quá nhỏ (tối thiểu 1,2 m), chồng lên phòng khác hoặc đã đủ số phòng."),Pi();yn(t.layout,{select:{type:"room",id:t.id}}),W.set({tool:null})},onRoomResize:(n,t)=>Bn(ub(ae,cn(),n,t),{select:{type:"room",id:n},rejected:"Không đổi được kích thước: phòng sẽ quá nhỏ hoặc chồng lên phòng khác."}),onRoomMove:(n,t,e)=>Bn(db(ae,cn(),n,t,e),{select:{type:"room",id:n},rejected:"Không dời được phòng: sẽ chồng lên phòng khác."})});function yn(n,{select:t}={}){if(!W.state.editable)return;const e=t!==void 0?t:W.state.selection,i={...lt.size};ae=n,Pi(),(Math.abs(lt.size.w-i.w)>.4||Math.abs(lt.size.d-i.d)>.4)&&wt.emit("camera:cmd",{cmd:"home"}),e&&re.get(e.type,e.id)?W.set({selection:e}):W.set({selection:null}),vr.refresh(),bn("FLOORPLAN_LAYOUT_CHANGED",{designId:bc().id,layout:ae})}wt.on("edit:rotate",({id:n})=>{const t=lt.placements.find(e=>e.id===n);t&&yn(zM(ae,n,t.rot??0))});wt.on("edit:toggle",({id:n})=>yn(BM(ae,n)));wt.on("edit:reset",({id:n})=>yn(HM(ae,n)));wt.on("edit:remove",({id:n})=>{OM(ae,n)&&yn(kM(ae,n),{select:null})});function Hy(n){const t=n??{x0:0,x1:lt.size.w,z0:0,z1:lt.size.d},e=(t.x0+t.x1)/2,i=(t.z0+t.z1)/2,s=re.list("item").filter(o=>!o.hidden);let r={x:e,z:i,score:-1/0};for(let o=t.x0+.7;o<=t.x1-.7;o+=.4)for(let a=t.z0+.7;a<=t.z1-.7;a+=.4){let c=1/0;for(const u of s){const f=(u.dims?.w??.6)/2+.45,d=(u.dims?.d??.6)/2+.45;c=Math.min(c,Math.max(Math.abs(o-u.x)-f,Math.abs(a-u.z)-d))}const l=Math.min(c,1)*3-Math.hypot(o-e,a-i)*.15;l>r.score&&(r={x:o,z:a,score:l})}return{x:Math.round(r.x*20)/20,z:Math.round(r.z*20)/20}}wt.on("edit:add",({kind:n})=>{const t=re.room(W.state.roomId)??lt.rooms[0],{x:e,z:i}=Hy(t),s=lt.placements.map(a=>a.id),r=GM(ae,n,e,i,lt.scale,s);if(!r)return;let o=r.layout;lt.custom&&(o=Ce({...o,extras:o.extras.map(a=>a.id===r.id?{...a,floor:lt.floorId}:a)})),yn(o,{select:{type:"item",id:r.id}}),W.set({editPanel:null})});const Mr=()=>W.state.selection;wt.on("plan:convert",()=>{lt.custom||Bn(rb(ae,{rooms:lt.rooms,walls:lt.walls,placements:lt.placements}),{select:null,rejected:"Không chuyển được sang mặt bằng tuỳ chỉnh."})});wt.on("plan:revert",()=>{yn(ob(),{select:null}),W.set({floorId:null})});wt.on("plan:room-floor",({id:n,floor:t})=>Bn(KM(ae,cn(),n,t),{select:Mr()}));wt.on("plan:room-name",({id:n,name:t})=>Bn(ZM(ae,cn(),n,t),{select:Mr(),rejected:"Tên phòng không được để trống."}));wt.on("plan:room-delete",({id:n})=>Bn(hb(ae,cn(),n),{select:null,rejected:"Mỗi tầng phải còn ít nhất một phòng."}));wt.on("plan:opening-type",({id:n,type:t})=>Bn(nb(ae,cn(),n,t),{select:Mr()}));wt.on("plan:opening-width",({id:n,w:t})=>Bn(eb(ae,cn(),n,t),{select:Mr(),rejected:"Cửa rộng quá so với đoạn tường này."}));wt.on("plan:opening-delete",({id:n})=>Bn(ib(ae,cn(),n),{select:null}));wt.on("plan:floor-add",({name:n})=>{const t=fb(ae,cn(),n);if(!t)return Pn.hud.notify("Đã đạt số tầng tối đa (5 tầng).");W.set({floorId:t.id}),yn(t.layout,{select:null})});wt.on("plan:floor-select",({id:n})=>{n!==lt.floorId&&(W.set({floorId:n,selection:null,roomId:null}),Pi(),Gs.start({walk:!1}))});wt.on("plan:floor-rename",({id:n,name:t})=>Bn(pb(ae,cn(),n,t),{select:Mr()}));wt.on("plan:floor-remove",({id:n})=>{const t=mb(ae,cn(),n);if(t===ae)return Pn.hud.notify("Phải giữ lại ít nhất một tầng.");W.set({floorId:null}),yn(t,{select:null})});wt.on("plan:fit",({target:n})=>{const t=gb(ae,cn(),Number(n));if(t.layout===ae)return Pn.hud.notify("Diện tích đã khớp tin đăng.");yn(t.layout,{select:null}),Pn.hud.notify(`Đã co dãn mặt bằng: ${t.before.toFixed(1)} → ${t.after.toFixed(1)} m².`)});wt.on("tool:set",({tool:n})=>W.set({tool:W.state.tool===n?null:n}));W.subscribe((n,t,e)=>{e.includes("mode")&&n.mode==="walk"&&n.editing&&W.set({editing:!1}),e.includes("editing")&&(document.body.classList.toggle("editing",n.editing),Hh.setEditing(n.editing),kn.setEditing(n.editing),W.set({editPanel:null,selection:null,tool:null}),mr&&Pi())});W.subscribe((n,t,e)=>{e.includes("hour")&&kn.setHour(n.hour),(e.includes("mode")||e.includes("roomId"))&&Pn.hud.draw(),e.includes("selection")&&n.selection?.type==="room"&&bn("FLOORPLAN_ROOM_SELECTED",{roomId:n.selection.id})});document.addEventListener("click",n=>{const t=n.target.closest?.(".room-label");t&&(wt.emit("room:go",{id:t.dataset.room}),W.select({type:"room",id:t.dataset.room}))});let ao=0;Ze.onFrame(n=>{if(kn.update(n),vr.update(n),Gs.update(n),W.state.playing&&(ao+=n,ao>.05)){let t=W.state.hour+ao*.75;t>18&&(t=6),ao=0,W.set({hour:Math.round(t*100)/100})}if(W.state.mode==="walk"&&wi.update(n)){Ze.invalidate(),Pn.hud.draw();const t=re.list("room").find(e=>wi.state.x>=e.x0&&wi.state.x<=e.x1&&wi.state.z>=e.z0&&wi.state.z<=e.z1);t&&t.id!==W.state.roomId&&W.set({roomId:t.id})}});let Fl="unit",$i=null;const ts=document.createElement("button");ts.type="button";ts.className="iconbtn back-campus";ts.hidden=!0;ts.innerHTML=`${te("home",16)}<span>Sa bàn</span>`;Pn.els["ui-topbar"].prepend(ts);ts.addEventListener("click",()=>{bn("FLOORPLAN_CAMPUS_BACK"),br("campus")});function br(n){n==="campus"&&!$i?.hasData||(Fl=n,document.body.dataset.view=n,n==="campus"?(Ze.pause(),$i.resume()):($i?.pause(),Ze.resume()))}function Sc(n){const t=gy(n);if(!t)return bn("FLOORPLAN_ERROR",{code:"INVALID_CAMPUS"});$i??=zy(document.getElementById("campus"),{onEnterUnit:Gy}),$i.setData(t),ts.hidden=!1,br("campus")}function Gy(n){bn("FLOORPLAN_UNIT_SELECTED",{apartmentId:n.apartmentId});const t=Mc(_y(n));if(!t)return bn("FLOORPLAN_ERROR",{code:"INVALID_UNIT"});yc(t),Gs.start({walk:!1}),br("unit")}Eb({init:n=>{yc(n),br("unit")},campus:Sc,pause:()=>Fl==="campus"?$i?.pause():Ze.pause(),resume:()=>Fl==="campus"?$i?.resume():Ze.resume(),reset:()=>wt.emit("camera:cmd",{cmd:"home"}),expanded:n=>wt.emit("host:expanded",{expanded:n})});Ze.start();try{bn("FLOORPLAN_READY")}catch{bn("FLOORPLAN_ERROR",{code:"WEBGL_INIT_FAILED"})}const Vy=Ri.get("view")==="campus"||[...Ri.keys()].length===0;if(!Po()&&Vy)Sc(vy());else if(!Po()){const n=Ro.map(e=>hc({id:e,name:Ns[e].label,theme:e})),t=Tb(Ri,n);t&&yc({...t,editable:Ri.get("edit")==="1"})}window.__apt={setView:br,applyCampus:Sc,app:Ze,world:kn,walker:wi,director:Gs,store:W,plan:lt,bus:wt};
