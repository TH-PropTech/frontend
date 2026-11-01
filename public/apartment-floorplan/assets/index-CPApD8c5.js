(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const zl="184",Xe={ROTATE:0,DOLLY:1,PAN:2},fn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Yh=0,Uc=1,jh=2,Es=1,Kh=2,tr=3,Ci=0,un=1,ii=2,ri=0,Ts=1,Oc=2,Fc=3,zc=4,Zh=5,ki=100,Jh=101,Qh=102,tf=103,ef=104,nf=200,sf=201,rf=202,of=203,Ba=204,ka=205,af=206,lf=207,cf=208,uf=209,df=210,hf=211,ff=212,pf=213,mf=214,Ha=0,Ga=1,Va=2,As=3,Wa=4,Xa=5,$a=6,qa=7,Bl=0,gf=1,_f=2,$n=0,Ad=1,Rd=2,Cd=3,Pd=4,Ld=5,Dd=6,Io=7,Id=300,qi=301,Rs=302,Xo=303,$o=304,No=306,cr=1e3,si=1001,Ya=1002,Ke=1003,xf=1004,wr=1005,nn=1006,qo=1007,Gi=1008,xn=1009,Nd=1010,Ud=1011,ur=1012,kl=1013,Yn=1014,On=1015,ci=1016,Hl=1017,Gl=1018,dr=1020,Od=35902,Fd=35899,zd=1021,Bd=1022,Fn=1023,ui=1026,Vi=1027,Vl=1028,Wl=1029,Yi=1030,Xl=1031,$l=1033,co=33776,uo=33777,ho=33778,fo=33779,ja=35840,Ka=35841,Za=35842,Ja=35843,Qa=36196,tl=37492,el=37496,nl=37488,il=37489,xo=37490,sl=37491,rl=37808,ol=37809,al=37810,ll=37811,cl=37812,ul=37813,dl=37814,hl=37815,fl=37816,pl=37817,ml=37818,gl=37819,_l=37820,xl=37821,vl=36492,Ml=36494,bl=36495,yl=36283,Sl=36284,vo=36285,El=36286,vf=3200,Mo=0,Mf=1,Ei="",qe="srgb",bo="srgb-linear",yo="linear",pe="srgb",is=7680,Bc=519,bf=512,yf=513,Sf=514,ql=515,Ef=516,Tf=517,Yl=518,wf=519,kc=35044,Hc="300 es",Xn=2e3,hr=2001;function Af(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function So(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Rf(){const n=So("canvas");return n.style.display="block",n}const Gc={};function Vc(...n){const t="THREE."+n.shift();console.log(t,...n)}function kd(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Bt(...n){n=kd(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function se(...n){n=kd(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Tl(...n){const t=n.join(" ");t in Gc||(Gc[t]=!0,Bt(...n))}function Cf(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const Pf={[Ha]:Ga,[Va]:$a,[Wa]:qa,[As]:Xa,[Ga]:Ha,[$a]:Va,[qa]:Wa,[Xa]:As};class Li{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wc=1234567;const sr=Math.PI/180,fr=180/Math.PI;function Os(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]+"-"+tn[t&255]+tn[t>>8&255]+"-"+tn[t>>16&15|64]+tn[t>>24&255]+"-"+tn[e&63|128]+tn[e>>8&255]+"-"+tn[e>>16&255]+tn[e>>24&255]+tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]).toLowerCase()}function Qt(n,t,e){return Math.max(t,Math.min(e,n))}function jl(n,t){return(n%t+t)%t}function Lf(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Df(n,t,e){return n!==t?(e-n)/(t-n):0}function rr(n,t,e){return(1-e)*n+e*t}function If(n,t,e,i){return rr(n,t,1-Math.exp(-e*i))}function Nf(n,t=1){return t-Math.abs(jl(n,t*2)-t)}function Uf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Of(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Ff(n,t){return n+Math.floor(Math.random()*(t-n+1))}function zf(n,t){return n+Math.random()*(t-n)}function Bf(n){return n*(.5-Math.random())}function kf(n){n!==void 0&&(Wc=n);let t=Wc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Hf(n){return n*sr}function Gf(n){return n*fr}function Vf(n){return(n&n-1)===0&&n!==0}function Wf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Xf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function $f(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+i)/2),u=o((t+i)/2),f=r((t-i)/2),d=o((t-i)/2),p=r((i-t)/2),_=o((i-t)/2);switch(s){case"XYX":n.set(a*u,c*f,c*d,a*l);break;case"YZY":n.set(c*d,a*u,c*f,a*l);break;case"ZXZ":n.set(c*f,c*d,a*u,a*l);break;case"XZX":n.set(a*u,c*_,c*p,a*l);break;case"YXY":n.set(c*p,a*u,c*_,a*l);break;case"ZYZ":n.set(c*_,c*p,a*u,a*l);break;default:Bt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ms(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function an(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ue={DEG2RAD:sr,RAD2DEG:fr,generateUUID:Os,clamp:Qt,euclideanModulo:jl,mapLinear:Lf,inverseLerp:Df,lerp:rr,damp:If,pingpong:Nf,smoothstep:Uf,smootherstep:Of,randInt:Ff,randFloat:zf,randFloatSpread:Bf,seededRandom:kf,degToRad:Hf,radToDeg:Gf,isPowerOfTwo:Vf,ceilPowerOfTwo:Wf,floorPowerOfTwo:Xf,setQuaternionFromProperEuler:$f,normalize:an,denormalize:Ms},Ec=class Ec{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ec.prototype.isVector2=!0;let Ut=Ec;class An{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],u=i[s+2],f=i[s+3],d=r[o+0],p=r[o+1],_=r[o+2],x=r[o+3];if(f!==x||c!==d||l!==p||u!==_){let m=c*d+l*p+u*_+f*x;m<0&&(d=-d,p=-p,_=-_,x=-x,m=-m);let h=1-a;if(m<.9995){const v=Math.acos(m),T=Math.sin(v);h=Math.sin(h*v)/T,a=Math.sin(a*v)/T,c=c*h+d*a,l=l*h+p*a,u=u*h+_*a,f=f*h+x*a}else{c=c*h+d*a,l=l*h+p*a,u=u*h+_*a,f=f*h+x*a;const v=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=v,l*=v,u*=v,f*=v}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],u=i[s+3],f=r[o],d=r[o+1],p=r[o+2],_=r[o+3];return t[e]=a*_+u*f+c*p-l*d,t[e+1]=c*_+u*d+l*f-a*p,t[e+2]=l*_+u*p+a*d-c*f,t[e+3]=u*_-a*f-c*d-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(s/2),f=a(r/2),d=c(i/2),p=c(s/2),_=c(r/2);switch(o){case"XYZ":this._x=d*u*f+l*p*_,this._y=l*p*f-d*u*_,this._z=l*u*_+d*p*f,this._w=l*u*f-d*p*_;break;case"YXZ":this._x=d*u*f+l*p*_,this._y=l*p*f-d*u*_,this._z=l*u*_-d*p*f,this._w=l*u*f+d*p*_;break;case"ZXY":this._x=d*u*f-l*p*_,this._y=l*p*f+d*u*_,this._z=l*u*_+d*p*f,this._w=l*u*f-d*p*_;break;case"ZYX":this._x=d*u*f-l*p*_,this._y=l*p*f+d*u*_,this._z=l*u*_-d*p*f,this._w=l*u*f+d*p*_;break;case"YZX":this._x=d*u*f+l*p*_,this._y=l*p*f+d*u*_,this._z=l*u*_-d*p*f,this._w=l*u*f-d*p*_;break;case"XZY":this._x=d*u*f-l*p*_,this._y=l*p*f-d*u*_,this._z=l*u*_+d*p*f,this._w=l*u*f+d*p*_;break;default:Bt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],f=e[10],d=i+a+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(u-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=i*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-i*l,this._z=r*u+o*l+i*c-s*a,this._w=o*u-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Tc=class Tc{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),u=2*(a*e-r*s),f=2*(r*i-o*e);return this.x=e+c*l+o*f-a*u,this.y=i+c*u+a*l-r*f,this.z=s+c*f+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Yo.copy(this).projectOnVector(t),this.sub(Yo)}reflect(t){return this.sub(Yo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Tc.prototype.isVector3=!0;let F=Tc;const Yo=new F,Xc=new An,wc=class wc{constructor(t,e,i,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],f=i[7],d=i[2],p=i[5],_=i[8],x=s[0],m=s[3],h=s[6],v=s[1],T=s[4],w=s[7],I=s[2],C=s[5],L=s[8];return r[0]=o*x+a*v+c*I,r[3]=o*m+a*T+c*C,r[6]=o*h+a*w+c*L,r[1]=l*x+u*v+f*I,r[4]=l*m+u*T+f*C,r[7]=l*h+u*w+f*L,r[2]=d*x+p*v+_*I,r[5]=d*m+p*T+_*C,r[8]=d*h+p*w+_*L,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-i*r*u+i*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=u*o-a*l,d=a*c-u*r,p=l*r-o*c,_=e*f+i*d+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return t[0]=f*x,t[1]=(s*l-u*i)*x,t[2]=(a*i-s*o)*x,t[3]=d*x,t[4]=(u*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=p*x,t[7]=(i*c-l*e)*x,t[8]=(o*e-i*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(jo.makeScale(t,e)),this}rotate(t){return this.premultiply(jo.makeRotation(-t)),this}translate(t,e){return this.premultiply(jo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};wc.prototype.isMatrix3=!0;let $t=wc;const jo=new $t,$c=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qc=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qf(){const n={enabled:!0,workingColorSpace:bo,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===pe&&(s.r=oi(s.r),s.g=oi(s.g),s.b=oi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===pe&&(s.r=ws(s.r),s.g=ws(s.g),s.b=ws(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ei?yo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Tl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Tl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[bo]:{primaries:t,whitePoint:i,transfer:yo,toXYZ:$c,fromXYZ:qc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:qe},outputColorSpaceConfig:{drawingBufferColorSpace:qe}},[qe]:{primaries:t,whitePoint:i,transfer:pe,toXYZ:$c,fromXYZ:qc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:qe}}}),n}const ie=qf();function oi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ws(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ss;class Yf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ss===void 0&&(ss=So("canvas")),ss.width=t.width,ss.height=t.height;const s=ss.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=ss}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=So("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=oi(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(oi(e[i]/255)*255):e[i]=oi(e[i]);return{data:e,width:t.width,height:t.height}}else return Bt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let jf=0;class Kl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=Os(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ko(s[o].image)):r.push(Ko(s[o]))}else r=Ko(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Ko(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Yf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Bt("Texture: Unable to serialize Texture."),{})}let Kf=0;const Zo=new F;class rn extends Li{constructor(t=rn.DEFAULT_IMAGE,e=rn.DEFAULT_MAPPING,i=si,s=si,r=nn,o=Gi,a=Fn,c=xn,l=rn.DEFAULT_ANISOTROPY,u=Ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Os(),this.name="",this.source=new Kl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ut(0,0),this.repeat=new Ut(1,1),this.center=new Ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Zo).x}get height(){return this.source.getSize(Zo).y}get depth(){return this.source.getSize(Zo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Bt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Bt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Id)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case cr:t.x=t.x-Math.floor(t.x);break;case si:t.x=t.x<0?0:1;break;case Ya:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case cr:t.y=t.y-Math.floor(t.y);break;case si:t.y=t.y<0?0:1;break;case Ya:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=Id;rn.DEFAULT_ANISOTROPY=1;const Ac=class Ac{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],u=c[4],f=c[8],d=c[1],p=c[5],_=c[9],x=c[2],m=c[6],h=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+x)<.1&&Math.abs(_+m)<.1&&Math.abs(l+p+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(l+1)/2,w=(p+1)/2,I=(h+1)/2,C=(u+d)/4,L=(f+x)/4,g=(_+m)/4;return T>w&&T>I?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=C/i,r=L/i):w>I?w<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),i=C/s,r=g/s):I<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),i=L/r,s=g/r),this.set(i,s,r,e),this}let v=Math.sqrt((m-_)*(m-_)+(f-x)*(f-x)+(d-u)*(d-u));return Math.abs(v)<.001&&(v=1),this.x=(m-_)/v,this.y=(f-x)/v,this.z=(d-u)/v,this.w=Math.acos((l+p+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ac.prototype.isVector4=!0;let Oe=Ac;class Zf extends Li{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Oe(0,0,t,e),this.scissorTest=!1,this.viewport=new Oe(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new rn(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:nn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Kl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qn extends Zf{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Hd extends rn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Jf extends rn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Do=class Do{constructor(t,e,i,s,r,o,a,c,l,u,f,d,p,_,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,u,f,d,p,_,x,m)}set(t,e,i,s,r,o,a,c,l,u,f,d,p,_,x,m){const h=this.elements;return h[0]=t,h[4]=e,h[8]=i,h[12]=s,h[1]=r,h[5]=o,h[9]=a,h[13]=c,h[2]=l,h[6]=u,h[10]=f,h[14]=d,h[3]=p,h[7]=_,h[11]=x,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Do().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,i=t.elements,s=1/rs.setFromMatrixColumn(t,0).length(),r=1/rs.setFromMatrixColumn(t,1).length(),o=1/rs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const d=o*u,p=o*f,_=a*u,x=a*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=p+_*l,e[5]=d-x*l,e[9]=-a*c,e[2]=x-d*l,e[6]=_+p*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*u,p=c*f,_=l*u,x=l*f;e[0]=d+x*a,e[4]=_*a-p,e[8]=o*l,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=p*a-_,e[6]=x+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*u,p=c*f,_=l*u,x=l*f;e[0]=d-x*a,e[4]=-o*f,e[8]=_+p*a,e[1]=p+_*a,e[5]=o*u,e[9]=x-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*u,p=o*f,_=a*u,x=a*f;e[0]=c*u,e[4]=_*l-p,e[8]=d*l+x,e[1]=c*f,e[5]=x*l+d,e[9]=p*l-_,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,p=o*l,_=a*c,x=a*l;e[0]=c*u,e[4]=x-d*f,e[8]=_*f+p,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=p*f+_,e[10]=d-x*f}else if(t.order==="XZY"){const d=o*c,p=o*l,_=a*c,x=a*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=d*f+x,e[5]=o*u,e[9]=p*f-_,e[2]=_*f-p,e[6]=a*u,e[10]=x*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Qf,t,tp)}lookAt(t,e,i){const s=this.elements;return mn.subVectors(t,e),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),gi.crossVectors(i,mn),gi.lengthSq()===0&&(Math.abs(i.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),gi.crossVectors(i,mn)),gi.normalize(),Ar.crossVectors(mn,gi),s[0]=gi.x,s[4]=Ar.x,s[8]=mn.x,s[1]=gi.y,s[5]=Ar.y,s[9]=mn.y,s[2]=gi.z,s[6]=Ar.z,s[10]=mn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],f=i[5],d=i[9],p=i[13],_=i[2],x=i[6],m=i[10],h=i[14],v=i[3],T=i[7],w=i[11],I=i[15],C=s[0],L=s[4],g=s[8],S=s[12],b=s[1],y=s[5],A=s[9],D=s[13],H=s[2],N=s[6],G=s[10],R=s[14],O=s[3],B=s[7],K=s[11],ht=s[15];return r[0]=o*C+a*b+c*H+l*O,r[4]=o*L+a*y+c*N+l*B,r[8]=o*g+a*A+c*G+l*K,r[12]=o*S+a*D+c*R+l*ht,r[1]=u*C+f*b+d*H+p*O,r[5]=u*L+f*y+d*N+p*B,r[9]=u*g+f*A+d*G+p*K,r[13]=u*S+f*D+d*R+p*ht,r[2]=_*C+x*b+m*H+h*O,r[6]=_*L+x*y+m*N+h*B,r[10]=_*g+x*A+m*G+h*K,r[14]=_*S+x*D+m*R+h*ht,r[3]=v*C+T*b+w*H+I*O,r[7]=v*L+T*y+w*N+I*B,r[11]=v*g+T*A+w*G+I*K,r[15]=v*S+T*D+w*R+I*ht,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],f=t[6],d=t[10],p=t[14],_=t[3],x=t[7],m=t[11],h=t[15],v=c*p-l*d,T=a*p-l*f,w=a*d-c*f,I=o*p-l*u,C=o*d-c*u,L=o*f-a*u;return e*(x*v-m*T+h*w)-i*(_*v-m*I+h*C)+s*(_*T-x*I+h*L)-r*(_*w-x*C+m*L)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=t[9],d=t[10],p=t[11],_=t[12],x=t[13],m=t[14],h=t[15],v=e*a-i*o,T=e*c-s*o,w=e*l-r*o,I=i*c-s*a,C=i*l-r*a,L=s*l-r*c,g=u*x-f*_,S=u*m-d*_,b=u*h-p*_,y=f*m-d*x,A=f*h-p*x,D=d*h-p*m,H=v*D-T*A+w*y+I*b-C*S+L*g;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/H;return t[0]=(a*D-c*A+l*y)*N,t[1]=(s*A-i*D-r*y)*N,t[2]=(x*L-m*C+h*I)*N,t[3]=(d*C-f*L-p*I)*N,t[4]=(c*b-o*D-l*S)*N,t[5]=(e*D-s*b+r*S)*N,t[6]=(m*w-_*L-h*T)*N,t[7]=(u*L-d*w+p*T)*N,t[8]=(o*A-a*b+l*g)*N,t[9]=(i*b-e*A-r*g)*N,t[10]=(_*C-x*w+h*v)*N,t[11]=(f*w-u*C-p*v)*N,t[12]=(a*S-o*y-c*g)*N,t[13]=(e*y-i*S+s*g)*N,t[14]=(x*T-_*I-m*v)*N,t[15]=(u*I-f*T+d*v)*N,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+i,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,f=a+a,d=r*l,p=r*u,_=r*f,x=o*u,m=o*f,h=a*f,v=c*l,T=c*u,w=c*f,I=i.x,C=i.y,L=i.z;return s[0]=(1-(x+h))*I,s[1]=(p+w)*I,s[2]=(_-T)*I,s[3]=0,s[4]=(p-w)*C,s[5]=(1-(d+h))*C,s[6]=(m+v)*C,s[7]=0,s[8]=(_+T)*L,s[9]=(m-v)*L,s[10]=(1-(d+x))*L,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),e.identity(),this;let o=rs.set(s[0],s[1],s[2]).length();const a=rs.set(s[4],s[5],s[6]).length(),c=rs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Dn.copy(this);const l=1/o,u=1/a,f=1/c;return Dn.elements[0]*=l,Dn.elements[1]*=l,Dn.elements[2]*=l,Dn.elements[4]*=u,Dn.elements[5]*=u,Dn.elements[6]*=u,Dn.elements[8]*=f,Dn.elements[9]*=f,Dn.elements[10]*=f,e.setFromRotationMatrix(Dn),i.x=o,i.y=a,i.z=c,this}makePerspective(t,e,i,s,r,o,a=Xn,c=!1){const l=this.elements,u=2*r/(e-t),f=2*r/(i-s),d=(e+t)/(e-t),p=(i+s)/(i-s);let _,x;if(c)_=r/(o-r),x=o*r/(o-r);else if(a===Xn)_=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===hr)_=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Xn,c=!1){const l=this.elements,u=2/(e-t),f=2/(i-s),d=-(e+t)/(e-t),p=-(i+s)/(i-s);let _,x;if(c)_=1/(o-r),x=o/(o-r);else if(a===Xn)_=-2/(o-r),x=-(o+r)/(o-r);else if(a===hr)_=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=f,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=_,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Do.prototype.isMatrix4=!0;let me=Do;const rs=new F,Dn=new me,Qf=new F(0,0,0),tp=new F(1,1,1),gi=new F,Ar=new F,mn=new F,Yc=new me,jc=new An;class vn{constructor(t=0,e=0,i=0,s=vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],f=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Qt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Bt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Yc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return jc.setFromEuler(this),this.setFromQuaternion(jc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vn.DEFAULT_ORDER="XYZ";class Zl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ep=0;const Kc=new F,os=new An,Kn=new me,Rr=new F,Vs=new F,np=new F,ip=new An,Zc=new F(1,0,0),Jc=new F(0,1,0),Qc=new F(0,0,1),tu={type:"added"},sp={type:"removed"},as={type:"childadded",child:null},Jo={type:"childremoved",child:null};class De extends Li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=Os(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=De.DEFAULT_UP.clone();const t=new F,e=new vn,i=new An,s=new F(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new me},normalMatrix:{value:new $t}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=De.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.multiply(os),this}rotateOnWorldAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.premultiply(os),this}rotateX(t){return this.rotateOnAxis(Zc,t)}rotateY(t){return this.rotateOnAxis(Jc,t)}rotateZ(t){return this.rotateOnAxis(Qc,t)}translateOnAxis(t,e){return Kc.copy(t).applyQuaternion(this.quaternion),this.position.add(Kc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zc,t)}translateY(t){return this.translateOnAxis(Jc,t)}translateZ(t){return this.translateOnAxis(Qc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Rr.copy(t):Rr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(Vs,Rr,this.up):Kn.lookAt(Rr,Vs,this.up),this.quaternion.setFromRotationMatrix(Kn),s&&(Kn.extractRotation(s.matrixWorld),os.setFromRotationMatrix(Kn),this.quaternion.premultiply(os.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(se("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(tu),as.child=t,this.dispatchEvent(as),as.child=null):se("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(sp),Jo.child=t,this.dispatchEvent(Jo),Jo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(tu),as.child=t,this.dispatchEvent(as),as.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,t,np),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,ip,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),f=o(t.shapes),d=o(t.skeletons),p=o(t.animations),_=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=s,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}De.DEFAULT_UP=new F(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class jt extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rp={type:"move"};class Qo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,i),h=this._getHandJoint(l,x);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,_=.005;l.inputState.pinching&&d>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(rp)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new jt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Gd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},Cr={h:0,s:0,l:0};function ta(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Ot{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=ie.workingColorSpace){return this.r=t,this.g=e,this.b=i,ie.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=ie.workingColorSpace){if(t=jl(t,1),e=Qt(e,0,1),i=Qt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=ta(o,r,t+1/3),this.g=ta(o,r,t),this.b=ta(o,r,t-1/3)}return ie.colorSpaceToWorking(this,s),this}setStyle(t,e=qe){function i(r){r!==void 0&&parseFloat(r)<1&&Bt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Bt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Bt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=qe){const i=Gd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Bt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=oi(t.r),this.g=oi(t.g),this.b=oi(t.b),this}copyLinearToSRGB(t){return this.r=ws(t.r),this.g=ws(t.g),this.b=ws(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=qe){return ie.workingToColorSpace(en.copy(this),t),Math.round(Qt(en.r*255,0,255))*65536+Math.round(Qt(en.g*255,0,255))*256+Math.round(Qt(en.b*255,0,255))}getHexString(t=qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ie.workingColorSpace){ie.workingToColorSpace(en.copy(this),e);const i=en.r,s=en.g,r=en.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=ie.workingColorSpace){return ie.workingToColorSpace(en.copy(this),e),t.r=en.r,t.g=en.g,t.b=en.b,t}getStyle(t=qe){ie.workingToColorSpace(en.copy(this),t);const e=en.r,i=en.g,s=en.b;return t!==qe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(_i),this.setHSL(_i.h+t,_i.s+e,_i.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(_i),t.getHSL(Cr);const i=rr(_i.h,Cr.h,e),s=rr(_i.s,Cr.s,e),r=rr(_i.l,Cr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const en=new Ot;Ot.NAMES=Gd;class Uo{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ot(t),this.near=e,this.far=i}clone(){return new Uo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Jl extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const In=new F,Zn=new F,ea=new F,Jn=new F,ls=new F,cs=new F,eu=new F,na=new F,ia=new F,sa=new F,ra=new Oe,oa=new Oe,aa=new Oe;class Un{constructor(t=new F,e=new F,i=new F){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),In.subVectors(t,e),s.cross(In);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){In.subVectors(s,e),Zn.subVectors(i,e),ea.subVectors(t,e);const o=In.dot(In),a=In.dot(Zn),c=In.dot(ea),l=Zn.dot(Zn),u=Zn.dot(ea),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;const d=1/f,p=(l*c-a*u)*d,_=(o*u-a*c)*d;return r.set(1-p-_,_,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Jn)===null?!1:Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,Jn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Jn.x),c.addScaledVector(o,Jn.y),c.addScaledVector(a,Jn.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return ra.setScalar(0),oa.setScalar(0),aa.setScalar(0),ra.fromBufferAttribute(t,e),oa.fromBufferAttribute(t,i),aa.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ra,r.x),o.addScaledVector(oa,r.y),o.addScaledVector(aa,r.z),o}static isFrontFacing(t,e,i,s){return In.subVectors(i,e),Zn.subVectors(t,e),In.cross(Zn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return In.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),In.cross(Zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Un.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Un.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Un.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Un.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Un.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;ls.subVectors(s,i),cs.subVectors(r,i),na.subVectors(t,i);const c=ls.dot(na),l=cs.dot(na);if(c<=0&&l<=0)return e.copy(i);ia.subVectors(t,s);const u=ls.dot(ia),f=cs.dot(ia);if(u>=0&&f<=u)return e.copy(s);const d=c*f-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(i).addScaledVector(ls,o);sa.subVectors(t,r);const p=ls.dot(sa),_=cs.dot(sa);if(_>=0&&p<=_)return e.copy(r);const x=p*l-c*_;if(x<=0&&l>=0&&_<=0)return a=l/(l-_),e.copy(i).addScaledVector(cs,a);const m=u*_-p*f;if(m<=0&&f-u>=0&&p-_>=0)return eu.subVectors(r,s),a=(f-u)/(f-u+(p-_)),e.copy(s).addScaledVector(eu,a);const h=1/(m+x+d);return o=x*h,a=d*h,e.copy(i).addScaledVector(ls,o).addScaledVector(cs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Rn{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Nn):Nn.fromBufferAttribute(r,o),Nn.applyMatrix4(t.matrixWorld),this.expandByPoint(Nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Pr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Pr.copy(i.boundingBox)),Pr.applyMatrix4(t.matrixWorld),this.union(Pr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Nn),Nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ws),Lr.subVectors(this.max,Ws),us.subVectors(t.a,Ws),ds.subVectors(t.b,Ws),hs.subVectors(t.c,Ws),xi.subVectors(ds,us),vi.subVectors(hs,ds),Ii.subVectors(us,hs);let e=[0,-xi.z,xi.y,0,-vi.z,vi.y,0,-Ii.z,Ii.y,xi.z,0,-xi.x,vi.z,0,-vi.x,Ii.z,0,-Ii.x,-xi.y,xi.x,0,-vi.y,vi.x,0,-Ii.y,Ii.x,0];return!la(e,us,ds,hs,Lr)||(e=[1,0,0,0,1,0,0,0,1],!la(e,us,ds,hs,Lr))?!1:(Dr.crossVectors(xi,vi),e=[Dr.x,Dr.y,Dr.z],la(e,us,ds,hs,Lr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Qn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Qn=[new F,new F,new F,new F,new F,new F,new F,new F],Nn=new F,Pr=new Rn,us=new F,ds=new F,hs=new F,xi=new F,vi=new F,Ii=new F,Ws=new F,Lr=new F,Dr=new F,Ni=new F;function la(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Ni.fromArray(n,r);const a=s.x*Math.abs(Ni.x)+s.y*Math.abs(Ni.y)+s.z*Math.abs(Ni.z),c=t.dot(Ni),l=e.dot(Ni),u=i.dot(Ni);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Be=new F,Ir=new Ut;let op=0;class Mn extends Li{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:op++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=kc,this.updateRanges=[],this.gpuType=On,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ir.fromBufferAttribute(this,e),Ir.applyMatrix3(t),this.setXY(e,Ir.x,Ir.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix3(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Ms(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=an(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ms(e,this.array)),e}setX(t,e){return this.normalized&&(e=an(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ms(e,this.array)),e}setY(t,e){return this.normalized&&(e=an(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ms(e,this.array)),e}setZ(t,e){return this.normalized&&(e=an(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ms(e,this.array)),e}setW(t,e){return this.normalized&&(e=an(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=an(e,this.array),i=an(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=an(e,this.array),i=an(i,this.array),s=an(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=an(e,this.array),i=an(i,this.array),s=an(s,this.array),r=an(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==kc&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class Vd extends Mn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Wd extends Mn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Re extends Mn{constructor(t,e,i){super(new Float32Array(t),e,i)}}const ap=new Rn,Xs=new F,ca=new F;class Fs{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):ap.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Xs.subVectors(t,this.center);const e=Xs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Xs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ca.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Xs.copy(t.center).add(ca)),this.expandByPoint(Xs.copy(t.center).sub(ca))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let lp=0;const wn=new me,ua=new De,fs=new F,gn=new Rn,$s=new Rn,We=new F;class on extends Li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lp++}),this.uuid=Os(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Af(t)?Wd:Vd)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new $t().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return wn.makeRotationFromQuaternion(t),this.applyMatrix4(wn),this}rotateX(t){return wn.makeRotationX(t),this.applyMatrix4(wn),this}rotateY(t){return wn.makeRotationY(t),this.applyMatrix4(wn),this}rotateZ(t){return wn.makeRotationZ(t),this.applyMatrix4(wn),this}translate(t,e,i){return wn.makeTranslation(t,e,i),this.applyMatrix4(wn),this}scale(t,e,i){return wn.makeScale(t,e,i),this.applyMatrix4(wn),this}lookAt(t){return ua.lookAt(t),ua.updateMatrix(),this.applyMatrix4(ua.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fs).negate(),this.translate(fs.x,fs.y,fs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Re(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Bt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){se("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];gn.setFromBufferAttribute(r),this.morphTargetsRelative?(We.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(We),We.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(We)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&se('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){se("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const i=this.boundingSphere.center;if(gn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];$s.setFromBufferAttribute(a),this.morphTargetsRelative?(We.addVectors(gn.min,$s.min),gn.expandByPoint(We),We.addVectors(gn.max,$s.max),gn.expandByPoint(We)):(gn.expandByPoint($s.min),gn.expandByPoint($s.max))}gn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)We.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(We));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)We.fromBufferAttribute(a,l),c&&(fs.fromBufferAttribute(t,l),We.add(fs)),s=Math.max(s,i.distanceToSquared(We))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&se('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){se("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let g=0;g<i.count;g++)a[g]=new F,c[g]=new F;const l=new F,u=new F,f=new F,d=new Ut,p=new Ut,_=new Ut,x=new F,m=new F;function h(g,S,b){l.fromBufferAttribute(i,g),u.fromBufferAttribute(i,S),f.fromBufferAttribute(i,b),d.fromBufferAttribute(r,g),p.fromBufferAttribute(r,S),_.fromBufferAttribute(r,b),u.sub(l),f.sub(l),p.sub(d),_.sub(d);const y=1/(p.x*_.y-_.x*p.y);isFinite(y)&&(x.copy(u).multiplyScalar(_.y).addScaledVector(f,-p.y).multiplyScalar(y),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(y),a[g].add(x),a[S].add(x),a[b].add(x),c[g].add(m),c[S].add(m),c[b].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let g=0,S=v.length;g<S;++g){const b=v[g],y=b.start,A=b.count;for(let D=y,H=y+A;D<H;D+=3)h(t.getX(D+0),t.getX(D+1),t.getX(D+2))}const T=new F,w=new F,I=new F,C=new F;function L(g){I.fromBufferAttribute(s,g),C.copy(I);const S=a[g];T.copy(S),T.sub(I.multiplyScalar(I.dot(S))).normalize(),w.crossVectors(C,S);const y=w.dot(c[g])<0?-1:1;o.setXYZW(g,T.x,T.y,T.z,y)}for(let g=0,S=v.length;g<S;++g){const b=v[g],y=b.start,A=b.count;for(let D=y,H=y+A;D<H;D+=3)L(t.getX(D+0)),L(t.getX(D+1)),L(t.getX(D+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Mn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const s=new F,r=new F,o=new F,a=new F,c=new F,l=new F,u=new F,f=new F;if(t)for(let d=0,p=t.count;d<p;d+=3){const _=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(i,_),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,m),a.add(u),c.add(u),l.add(u),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)We.fromBufferAttribute(t,e),We.normalize(),t.setXYZ(e,We.x,We.y,We.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,f=a.normalized,d=new l.constructor(c.length*u);let p=0,_=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*u;for(let h=0;h<u;h++)d[_++]=l[p++]}return new Mn(d,u,f)}if(this.index===null)return Bt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new on,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,i);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,f=l.length;u<f;u++){const d=l[u],p=t(d,i);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,d=l.length;f<d;f++){const p=l[f];u.push(p.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],f=r[l];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let cp=0;class Ji extends Li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=Os(),this.name="",this.type="Material",this.blending=Ts,this.side=Ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ba,this.blendDst=ka,this.blendEquation=ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ot(0,0,0),this.blendAlpha=0,this.depthFunc=As,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=is,this.stencilZFail=is,this.stencilZPass=is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Bt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Bt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ts&&(i.blending=this.blending),this.side!==Ci&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ba&&(i.blendSrc=this.blendSrc),this.blendDst!==ka&&(i.blendDst=this.blendDst),this.blendEquation!==ki&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==As&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==is&&(i.stencilFail=this.stencilFail),this.stencilZFail!==is&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==is&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const ti=new F,da=new F,Nr=new F,Mi=new F,ha=new F,Ur=new F,fa=new F;class Oo{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ti)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ti.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ti.copy(this.origin).addScaledVector(this.direction,e),ti.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){da.copy(t).add(e).multiplyScalar(.5),Nr.copy(e).sub(t).normalize(),Mi.copy(this.origin).sub(da);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Nr),a=Mi.dot(this.direction),c=-Mi.dot(Nr),l=Mi.lengthSq(),u=Math.abs(1-o*o);let f,d,p,_;if(u>0)if(f=o*c-a,d=o*a-c,_=r*u,f>=0)if(d>=-_)if(d<=_){const x=1/u;f*=x,d*=x,p=f*(f+o*d+2*a)+d*(o*f+d+2*c)+l}else d=r,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*c)+l;else d=-r,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*c)+l;else d<=-_?(f=Math.max(0,-(-o*r+a)),d=f>0?-r:Math.min(Math.max(-r,-c),r),p=-f*f+d*(d+2*c)+l):d<=_?(f=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(f=Math.max(0,-(o*r+a)),d=f>0?r:Math.min(Math.max(-r,-c),r),p=-f*f+d*(d+2*c)+l);else d=o>0?-r:r,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(da).addScaledVector(Nr,d),p}intersectSphere(t,e){ti.subVectors(t.center,this.origin);const i=ti.dot(this.direction),s=ti.dot(ti)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),u>=0?(r=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-d.z)*f,c=(t.max.z-d.z)*f):(a=(t.max.z-d.z)*f,c=(t.min.z-d.z)*f),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,ti)!==null}intersectTriangle(t,e,i,s,r){ha.subVectors(e,t),Ur.subVectors(i,t),fa.crossVectors(ha,Ur);let o=this.direction.dot(fa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Mi.subVectors(this.origin,t);const c=a*this.direction.dot(Ur.crossVectors(Mi,Ur));if(c<0)return null;const l=a*this.direction.dot(ha.cross(Mi));if(l<0||c+l>o)return null;const u=-a*Mi.dot(fa);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ji extends Ji{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Bl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const nu=new me,Ui=new Oo,Or=new Fs,iu=new F,Fr=new F,zr=new F,Br=new F,pa=new F,kr=new F,su=new F,Hr=new F;class Xt extends De{constructor(t=new on,e=new ji){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){kr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],f=r[c];u!==0&&(pa.fromBufferAttribute(f,t),o?kr.addScaledVector(pa,u):kr.addScaledVector(pa.sub(e),u))}e.add(kr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Or.copy(i.boundingSphere),Or.applyMatrix4(r),Ui.copy(t.ray).recast(t.near),!(Or.containsPoint(Ui.origin)===!1&&(Ui.intersectSphere(Or,iu)===null||Ui.origin.distanceToSquared(iu)>(t.far-t.near)**2))&&(nu.copy(r).invert(),Ui.copy(t.ray).applyMatrix4(nu),!(i.boundingBox!==null&&Ui.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ui)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,x=d.length;_<x;_++){const m=d[_],h=o[m.materialIndex],v=Math.max(m.start,p.start),T=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let w=v,I=T;w<I;w+=3){const C=a.getX(w),L=a.getX(w+1),g=a.getX(w+2);s=Gr(this,h,t,i,l,u,f,C,L,g),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=_,h=x;m<h;m+=3){const v=a.getX(m),T=a.getX(m+1),w=a.getX(m+2);s=Gr(this,o,t,i,l,u,f,v,T,w),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,x=d.length;_<x;_++){const m=d[_],h=o[m.materialIndex],v=Math.max(m.start,p.start),T=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let w=v,I=T;w<I;w+=3){const C=w,L=w+1,g=w+2;s=Gr(this,h,t,i,l,u,f,C,L,g),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=_,h=x;m<h;m+=3){const v=m,T=m+1,w=m+2;s=Gr(this,o,t,i,l,u,f,v,T,w),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function up(n,t,e,i,s,r,o,a){let c;if(t.side===un?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===Ci,a),c===null)return null;Hr.copy(a),Hr.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Hr);return l<e.near||l>e.far?null:{distance:l,point:Hr.clone(),object:n}}function Gr(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,Fr),n.getVertexPosition(c,zr),n.getVertexPosition(l,Br);const u=up(n,t,e,i,Fr,zr,Br,su);if(u){const f=new F;Un.getBarycoord(su,Fr,zr,Br,f),s&&(u.uv=Un.getInterpolatedAttribute(s,a,c,l,f,new Ut)),r&&(u.uv1=Un.getInterpolatedAttribute(r,a,c,l,f,new Ut)),o&&(u.normal=Un.getInterpolatedAttribute(o,a,c,l,f,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new F,materialIndex:0};Un.getNormal(Fr,zr,Br,d.normal),u.face=d,u.barycoord=f}return u}class Xd extends rn{constructor(t=null,e=1,i=1,s,r,o,a,c,l=Ke,u=Ke,f,d){super(null,o,a,c,l,u,s,r,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ru extends Mn{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ps=new me,ou=new me,Vr=[],au=new Rn,dp=new me,qs=new Xt,Ys=new Fs;class Ql extends Xt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ru(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,dp)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Rn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ps),au.copy(t.boundingBox).applyMatrix4(ps),this.boundingBox.union(au)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ps),Ys.copy(t.boundingSphere).applyMatrix4(ps),this.boundingSphere.union(Ys)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=t.previousInstanceMatrix.clone()),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(qs.geometry=this.geometry,qs.material=this.material,qs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ys.copy(this.boundingSphere),Ys.applyMatrix4(i),t.ray.intersectsSphere(Ys)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ps),ou.multiplyMatrices(i,ps),qs.matrixWorld=ou,qs.raycast(t,Vr);for(let o=0,a=Vr.length;o<a;o++){const c=Vr[o];c.instanceId=r,c.object=this,e.push(c)}Vr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new ru(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Xd(new Float32Array(s*this.count),s,this.count,Vl,On));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(i,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ma=new F,hp=new F,fp=new $t;class ni{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=ma.subVectors(i,e).cross(hp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(ma),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||fp.getNormalMatrix(t),s=this.coplanarPoint(ma).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Oi=new Fs,pp=new Ut(.5,.5),Wr=new F;class tc{constructor(t=new ni,e=new ni,i=new ni,s=new ni,r=new ni,o=new ni){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Xn,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],f=r[5],d=r[6],p=r[7],_=r[8],x=r[9],m=r[10],h=r[11],v=r[12],T=r[13],w=r[14],I=r[15];if(s[0].setComponents(l-o,p-u,h-_,I-v).normalize(),s[1].setComponents(l+o,p+u,h+_,I+v).normalize(),s[2].setComponents(l+a,p+f,h+x,I+T).normalize(),s[3].setComponents(l-a,p-f,h-x,I-T).normalize(),i)s[4].setComponents(c,d,m,w).normalize(),s[5].setComponents(l-c,p-d,h-m,I-w).normalize();else if(s[4].setComponents(l-c,p-d,h-m,I-w).normalize(),e===Xn)s[5].setComponents(l+c,p+d,h+m,I+w).normalize();else if(e===hr)s[5].setComponents(c,d,m,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Oi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Oi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Oi)}intersectsSprite(t){Oi.center.set(0,0,0);const e=pp.distanceTo(t.center);return Oi.radius=.7071067811865476+e,Oi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Oi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Wr.x=s.normal.x>0?t.max.x:t.min.x,Wr.y=s.normal.y>0?t.max.y:t.min.y,Wr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Wr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $d extends Ji{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ot(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Eo=new F,To=new F,lu=new me,js=new Oo,Xr=new Fs,ga=new F,cu=new F;class mp extends De{constructor(t=new on,e=new $d){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Eo.fromBufferAttribute(e,s-1),To.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Eo.distanceTo(To);t.setAttribute("lineDistance",new Re(i,1))}else Bt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Xr.copy(i.boundingSphere),Xr.applyMatrix4(s),Xr.radius+=r,t.ray.intersectsSphere(Xr)===!1)return;lu.copy(s).invert(),js.copy(t.ray).applyMatrix4(lu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let x=p,m=_-1;x<m;x+=l){const h=u.getX(x),v=u.getX(x+1),T=$r(this,t,js,c,h,v,x);T&&e.push(T)}if(this.isLineLoop){const x=u.getX(_-1),m=u.getX(p),h=$r(this,t,js,c,x,m,_-1);h&&e.push(h)}}else{const p=Math.max(0,o.start),_=Math.min(d.count,o.start+o.count);for(let x=p,m=_-1;x<m;x+=l){const h=$r(this,t,js,c,x,x+1,x);h&&e.push(h)}if(this.isLineLoop){const x=$r(this,t,js,c,_-1,p,_-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function $r(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(Eo.fromBufferAttribute(a,s),To.fromBufferAttribute(a,r),e.distanceSqToSegment(Eo,To,ga,cu)>i)return;ga.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ga);if(!(l<t.near||l>t.far))return{distance:l,point:cu.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const uu=new F,du=new F;class gp extends mp{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)uu.fromBufferAttribute(e,s),du.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+uu.distanceTo(du);t.setAttribute("lineDistance",new Re(i,1))}else Bt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class qd extends rn{constructor(t=[],e=qi,i,s,r,o,a,c,l,u){super(t,e,i,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class wo extends rn{constructor(t,e,i,s,r,o,a,c,l){super(t,e,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Cs extends rn{constructor(t,e,i=Yn,s,r,o,a=Ke,c=Ke,l,u=ui,f=1){if(u!==ui&&u!==Vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:f};super(d,s,r,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Kl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class _p extends Cs{constructor(t,e=Yn,i=qi,s,r,o=Ke,a=Ke,c,l=ui){const u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,i,s,r,o,a,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Yd extends rn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ue extends on{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],f=[];let d=0,p=0;_("z","y","x",-1,-1,i,e,t,o,r,0),_("z","y","x",1,-1,i,e,-t,o,r,1),_("x","z","y",1,1,t,i,e,s,o,2),_("x","z","y",1,-1,t,i,-e,s,o,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(u,3)),this.setAttribute("uv",new Re(f,2));function _(x,m,h,v,T,w,I,C,L,g,S){const b=w/L,y=I/g,A=w/2,D=I/2,H=C/2,N=L+1,G=g+1;let R=0,O=0;const B=new F;for(let K=0;K<G;K++){const ht=K*y-D;for(let rt=0;rt<N;rt++){const st=rt*b-A;B[x]=st*v,B[m]=ht*T,B[h]=H,l.push(B.x,B.y,B.z),B[x]=0,B[m]=0,B[h]=C>0?1:-1,u.push(B.x,B.y,B.z),f.push(rt/L),f.push(1-K/g),R+=1}}for(let K=0;K<g;K++)for(let ht=0;ht<L;ht++){const rt=d+ht+N*K,st=d+ht+N*(K+1),ut=d+(ht+1)+N*(K+1),pt=d+(ht+1)+N*K;c.push(rt,st,pt),c.push(st,ut,pt),O+=6}a.addGroup(p,O,S),p+=O,d+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ue(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class ec extends on{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new F,u=new Ut;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,d=3;f<=e;f++,d+=3){const p=i+f/e*s;l.x=t*Math.cos(p),l.y=t*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[d]/t+1)/2,u.y=(o[d+1]/t+1)/2,c.push(u.x,u.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Re(o,3)),this.setAttribute("normal",new Re(a,3)),this.setAttribute("uv",new Re(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ec(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class zs extends on{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],d=[],p=[];let _=0;const x=[],m=i/2;let h=0;v(),o===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(u),this.setAttribute("position",new Re(f,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(p,2));function v(){const w=new F,I=new F;let C=0;const L=(e-t)/i;for(let g=0;g<=r;g++){const S=[],b=g/r,y=b*(e-t)+t;for(let A=0;A<=s;A++){const D=A/s,H=D*c+a,N=Math.sin(H),G=Math.cos(H);I.x=y*N,I.y=-b*i+m,I.z=y*G,f.push(I.x,I.y,I.z),w.set(N,L,G).normalize(),d.push(w.x,w.y,w.z),p.push(D,1-b),S.push(_++)}x.push(S)}for(let g=0;g<s;g++)for(let S=0;S<r;S++){const b=x[S][g],y=x[S+1][g],A=x[S+1][g+1],D=x[S][g+1];(t>0||S!==0)&&(u.push(b,y,D),C+=3),(e>0||S!==r-1)&&(u.push(y,A,D),C+=3)}l.addGroup(h,C,0),h+=C}function T(w){const I=_,C=new Ut,L=new F;let g=0;const S=w===!0?t:e,b=w===!0?1:-1;for(let A=1;A<=s;A++)f.push(0,m*b,0),d.push(0,b,0),p.push(.5,.5),_++;const y=_;for(let A=0;A<=s;A++){const H=A/s*c+a,N=Math.cos(H),G=Math.sin(H);L.x=S*G,L.y=m*b,L.z=S*N,f.push(L.x,L.y,L.z),d.push(0,b,0),C.x=N*.5+.5,C.y=G*.5*b+.5,p.push(C.x,C.y),_++}for(let A=0;A<s;A++){const D=I+A,H=y+A;w===!0?u.push(H,H+1,D):u.push(H+1,H,D),g+=3}l.addGroup(h,g,w===!0?1:2),h+=g}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zs(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class nc extends zs{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new nc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ic extends on{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],o=[];a(s),l(i),u(),this.setAttribute("position",new Re(r,3)),this.setAttribute("normal",new Re(r.slice(),3)),this.setAttribute("uv",new Re(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const T=new F,w=new F,I=new F;for(let C=0;C<e.length;C+=3)p(e[C+0],T),p(e[C+1],w),p(e[C+2],I),c(T,w,I,v)}function c(v,T,w,I){const C=I+1,L=[];for(let g=0;g<=C;g++){L[g]=[];const S=v.clone().lerp(w,g/C),b=T.clone().lerp(w,g/C),y=C-g;for(let A=0;A<=y;A++)A===0&&g===C?L[g][A]=S:L[g][A]=S.clone().lerp(b,A/y)}for(let g=0;g<C;g++)for(let S=0;S<2*(C-g)-1;S++){const b=Math.floor(S/2);S%2===0?(d(L[g][b+1]),d(L[g+1][b]),d(L[g][b])):(d(L[g][b+1]),d(L[g+1][b+1]),d(L[g+1][b]))}}function l(v){const T=new F;for(let w=0;w<r.length;w+=3)T.x=r[w+0],T.y=r[w+1],T.z=r[w+2],T.normalize().multiplyScalar(v),r[w+0]=T.x,r[w+1]=T.y,r[w+2]=T.z}function u(){const v=new F;for(let T=0;T<r.length;T+=3){v.x=r[T+0],v.y=r[T+1],v.z=r[T+2];const w=m(v)/2/Math.PI+.5,I=h(v)/Math.PI+.5;o.push(w,1-I)}_(),f()}function f(){for(let v=0;v<o.length;v+=6){const T=o[v+0],w=o[v+2],I=o[v+4],C=Math.max(T,w,I),L=Math.min(T,w,I);C>.9&&L<.1&&(T<.2&&(o[v+0]+=1),w<.2&&(o[v+2]+=1),I<.2&&(o[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function p(v,T){const w=v*3;T.x=t[w+0],T.y=t[w+1],T.z=t[w+2]}function _(){const v=new F,T=new F,w=new F,I=new F,C=new Ut,L=new Ut,g=new Ut;for(let S=0,b=0;S<r.length;S+=9,b+=6){v.set(r[S+0],r[S+1],r[S+2]),T.set(r[S+3],r[S+4],r[S+5]),w.set(r[S+6],r[S+7],r[S+8]),C.set(o[b+0],o[b+1]),L.set(o[b+2],o[b+3]),g.set(o[b+4],o[b+5]),I.copy(v).add(T).add(w).divideScalar(3);const y=m(I);x(C,b+0,v,y),x(L,b+2,T,y),x(g,b+4,w,y)}}function x(v,T,w,I){I<0&&v.x===1&&(o[T]=v.x-1),w.x===0&&w.z===0&&(o[T]=I/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function h(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ic(t.vertices,t.indices,t.radius,t.detail)}}class sc extends ic{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new sc(t.radius,t.detail)}}class Ps extends on{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,u=c+1,f=t/a,d=e/c,p=[],_=[],x=[],m=[];for(let h=0;h<u;h++){const v=h*d-o;for(let T=0;T<l;T++){const w=T*f-r;_.push(w,-v,0),x.push(0,0,1),m.push(T/a),m.push(1-h/c)}}for(let h=0;h<c;h++)for(let v=0;v<a;v++){const T=v+l*h,w=v+l*(h+1),I=v+1+l*(h+1),C=v+1+l*h;p.push(T,w,C),p.push(w,I,C)}this.setIndex(p),this.setAttribute("position",new Re(_,3)),this.setAttribute("normal",new Re(x,3)),this.setAttribute("uv",new Re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ps(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ls extends on{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],f=new F,d=new F,p=[],_=[],x=[],m=[];for(let h=0;h<=i;h++){const v=[],T=h/i;let w=0;h===0&&o===0?w=.5/e:h===i&&c===Math.PI&&(w=-.5/e);for(let I=0;I<=e;I++){const C=I/e;f.x=-t*Math.cos(s+C*r)*Math.sin(o+T*a),f.y=t*Math.cos(o+T*a),f.z=t*Math.sin(s+C*r)*Math.sin(o+T*a),_.push(f.x,f.y,f.z),d.copy(f).normalize(),x.push(d.x,d.y,d.z),m.push(C+w,1-T),v.push(l++)}u.push(v)}for(let h=0;h<i;h++)for(let v=0;v<e;v++){const T=u[h][v+1],w=u[h][v],I=u[h+1][v],C=u[h+1][v+1];(h!==0||o>0)&&p.push(T,w,C),(h!==i-1||c<Math.PI)&&p.push(w,I,C)}this.setIndex(p),this.setAttribute("position",new Re(_,3)),this.setAttribute("normal",new Re(x,3)),this.setAttribute("uv",new Re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ls(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function Ds(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(hu(s))s.isRenderTargetTexture?(Bt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(hu(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function ln(n){const t={};for(let e=0;e<n.length;e++){const i=Ds(n[e]);for(const s in i)t[s]=i[s]}return t}function hu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function xp(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function jd(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ie.workingColorSpace}const vp={clone:Ds,merge:ln};var Mp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class jn extends Ji{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mp,this.fragmentShader=bp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ds(t.uniforms),this.uniformsGroups=xp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class yp extends jn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ke extends Ji{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mo,this.normalScale=new Ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Sp extends Ji{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mo,this.normalScale=new Ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Bl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ep extends Ji{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Tp extends Ji{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class rc extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ot(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Kd extends rc{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ot(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const _a=new me,fu=new F,pu=new F;class Zd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ut(512,512),this.mapType=xn,this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new tc,this._frameExtents=new Ut(1,1),this._viewportCount=1,this._viewports=[new Oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;fu.setFromMatrixPosition(t.matrixWorld),e.position.copy(fu),pu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(pu),e.updateMatrixWorld(),_a.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_a,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===hr||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(_a)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const qr=new F,Yr=new An,Gn=new F;class Jd extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=Xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(qr,Yr,Gn),Gn.x===1&&Gn.y===1&&Gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qr,Yr,Gn.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(qr,Yr,Gn),Gn.x===1&&Gn.y===1&&Gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qr,Yr,Gn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const bi=new F,mu=new Ut,gu=new Ut;class hn extends Jd{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=fr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(sr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return fr*2*Math.atan(Math.tan(sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(bi.x,bi.y).multiplyScalar(-t/bi.z),bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(bi.x,bi.y).multiplyScalar(-t/bi.z)}getViewSize(t,e){return this.getViewBounds(t,mu,gu),e.subVectors(gu,mu)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(sr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class wp extends Zd{constructor(){super(new hn(90,1,.5,500)),this.isPointLightShadow=!0}}class Qd extends rc{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new wp}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class oc extends Jd{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Ap extends Zd{constructor(){super(new oc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class th extends rc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new Ap}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const ms=-90,gs=1;class Rp extends De{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new hn(ms,gs,t,e);s.layers=this.layers,this.add(s);const r=new hn(ms,gs,t,e);r.layers=this.layers,this.add(r);const o=new hn(ms,gs,t,e);o.layers=this.layers,this.add(o);const a=new hn(ms,gs,t,e);a.layers=this.layers,this.add(a);const c=new hn(ms,gs,t,e);c.layers=this.layers,this.add(c);const l=new hn(ms,gs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Xn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===hr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,d,p),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Cp extends hn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const _u=new me;class ac{constructor(t,e,i=0,s=1/0){this.ray=new Oo(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Zl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):se("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return _u.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_u),this}intersectObject(t,e=!0,i=[]){return wl(t,this,i,e),i.sort(xu),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)wl(t[s],this,i,e);return i.sort(xu),i}}function xu(n,t){return n.distance-t.distance}function wl(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)wl(r[o],t,e,!0)}}class eh{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Bt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class Ao{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Rc=class Rc{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};Rc.prototype.isMatrix2=!0;let vu=Rc;class Pp extends Li{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Bt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Mu(n,t,e,i){const s=Lp(i);switch(e){case zd:return n*t;case Vl:return n*t/s.components*s.byteLength;case Wl:return n*t/s.components*s.byteLength;case Yi:return n*t*2/s.components*s.byteLength;case Xl:return n*t*2/s.components*s.byteLength;case Bd:return n*t*3/s.components*s.byteLength;case Fn:return n*t*4/s.components*s.byteLength;case $l:return n*t*4/s.components*s.byteLength;case co:case uo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ho:case fo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ka:case Ja:return Math.max(n,16)*Math.max(t,8)/4;case ja:case Za:return Math.max(n,8)*Math.max(t,8)/2;case Qa:case tl:case nl:case il:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case el:case xo:case sl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case rl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ol:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case al:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ll:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case cl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case ul:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case dl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case hl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case fl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case pl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ml:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case gl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case _l:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case xl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case vl:case Ml:case bl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case yl:case Sl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case vo:case El:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Lp(n){switch(n){case xn:case Nd:return{byteLength:1,components:1};case ur:case Ud:case ci:return{byteLength:2,components:1};case Hl:case Gl:return{byteLength:2,components:4};case Yn:case kl:case On:return{byteLength:4,components:1};case Od:case Fd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zl}}));typeof window<"u"&&(window.__THREE__?Bt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zl);function nh(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Dp(n){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,f=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,c,l){const u=c.array,f=c.updateRanges;if(n.bindBuffer(l,a),f.length===0)n.bufferSubData(l,0,u);else{f.sort((p,_)=>p.start-_.start);let d=0;for(let p=1;p<f.length;p++){const _=f[d],x=f[p];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++d,f[d]=x)}f.length=d+1;for(let p=0,_=f.length;p<_;p++){const x=f[p];n.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Ip=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Np=`#ifdef USE_ALPHAHASH
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
#endif`,Up=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Op=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Bp=`#ifdef USE_AOMAP
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
#endif`,kp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Hp=`#ifdef USE_BATCHING
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
#endif`,Gp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Vp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,$p=`#ifdef USE_IRIDESCENCE
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
#endif`,qp=`#ifdef USE_BUMPMAP
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
#endif`,Yp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,jp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Kp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Qp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,tm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,em=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,nm=`#define PI 3.141592653589793
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
} // validated`,im=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,sm=`vec3 transformedNormal = objectNormal;
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
#endif`,rm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,om=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,am=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cm="gl_FragColor = linearToOutputTexel( gl_FragColor );",um=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dm=`#ifdef USE_ENVMAP
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
#endif`,hm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,fm=`#ifdef USE_ENVMAP
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
#endif`,pm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mm=`#ifdef USE_ENVMAP
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
#endif`,gm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_m=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mm=`#ifdef USE_GRADIENTMAP
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
}`,bm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ym=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Em=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Tm=`#ifdef USE_ENVMAP
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
#endif`,wm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Am=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pm=`PhysicalMaterial material;
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
#endif`,Lm=`uniform sampler2D dfgLUT;
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
}`,Dm=`
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
#endif`,Im=`#if defined( RE_IndirectDiffuse )
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
#endif`,Nm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Um=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Om=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Fm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,km=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Vm=`#if defined( USE_POINTS_UV )
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
#endif`,Wm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$m=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ym=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jm=`#ifdef USE_MORPHTARGETS
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
#endif`,Km=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,n0=`#ifdef USE_NORMALMAP
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
#endif`,i0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,s0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,r0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,o0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,a0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,l0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,c0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,u0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,d0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,h0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,f0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,p0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,m0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,g0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,x0=`float getShadowMask() {
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
}`,v0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,M0=`#ifdef USE_SKINNING
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
#endif`,b0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,y0=`#ifdef USE_SKINNING
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
#endif`,S0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,E0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,T0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,w0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,A0=`#ifdef USE_TRANSMISSION
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
#endif`,R0=`#ifdef USE_TRANSMISSION
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
#endif`,C0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,P0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,L0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,D0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const I0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,N0=`uniform sampler2D t2D;
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
}`,U0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,O0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,F0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,z0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B0=`#include <common>
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
}`,k0=`#if DEPTH_PACKING == 3200
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
}`,H0=`#define DISTANCE
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
}`,G0=`#define DISTANCE
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
}`,V0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,W0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X0=`uniform float scale;
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
}`,$0=`uniform vec3 diffuse;
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
}`,q0=`#include <common>
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
}`,Y0=`uniform vec3 diffuse;
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
}`,j0=`#define LAMBERT
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
}`,K0=`#define LAMBERT
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
}`,Z0=`#define MATCAP
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
}`,J0=`#define MATCAP
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
}`,Q0=`#define NORMAL
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
}`,tg=`#define NORMAL
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
}`,eg=`#define PHONG
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
}`,ng=`#define PHONG
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
}`,ig=`#define STANDARD
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
}`,sg=`#define STANDARD
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
}`,rg=`#define TOON
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
}`,og=`#define TOON
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
}`,ag=`uniform float size;
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
}`,lg=`uniform vec3 diffuse;
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
}`,cg=`#include <common>
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
}`,ug=`uniform vec3 color;
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
}`,dg=`uniform float rotation;
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
}`,hg=`uniform vec3 diffuse;
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
}`,Yt={alphahash_fragment:Ip,alphahash_pars_fragment:Np,alphamap_fragment:Up,alphamap_pars_fragment:Op,alphatest_fragment:Fp,alphatest_pars_fragment:zp,aomap_fragment:Bp,aomap_pars_fragment:kp,batching_pars_vertex:Hp,batching_vertex:Gp,begin_vertex:Vp,beginnormal_vertex:Wp,bsdfs:Xp,iridescence_fragment:$p,bumpmap_pars_fragment:qp,clipping_planes_fragment:Yp,clipping_planes_pars_fragment:jp,clipping_planes_pars_vertex:Kp,clipping_planes_vertex:Zp,color_fragment:Jp,color_pars_fragment:Qp,color_pars_vertex:tm,color_vertex:em,common:nm,cube_uv_reflection_fragment:im,defaultnormal_vertex:sm,displacementmap_pars_vertex:rm,displacementmap_vertex:om,emissivemap_fragment:am,emissivemap_pars_fragment:lm,colorspace_fragment:cm,colorspace_pars_fragment:um,envmap_fragment:dm,envmap_common_pars_fragment:hm,envmap_pars_fragment:fm,envmap_pars_vertex:pm,envmap_physical_pars_fragment:Tm,envmap_vertex:mm,fog_vertex:gm,fog_pars_vertex:_m,fog_fragment:xm,fog_pars_fragment:vm,gradientmap_pars_fragment:Mm,lightmap_pars_fragment:bm,lights_lambert_fragment:ym,lights_lambert_pars_fragment:Sm,lights_pars_begin:Em,lights_toon_fragment:wm,lights_toon_pars_fragment:Am,lights_phong_fragment:Rm,lights_phong_pars_fragment:Cm,lights_physical_fragment:Pm,lights_physical_pars_fragment:Lm,lights_fragment_begin:Dm,lights_fragment_maps:Im,lights_fragment_end:Nm,lightprobes_pars_fragment:Um,logdepthbuf_fragment:Om,logdepthbuf_pars_fragment:Fm,logdepthbuf_pars_vertex:zm,logdepthbuf_vertex:Bm,map_fragment:km,map_pars_fragment:Hm,map_particle_fragment:Gm,map_particle_pars_fragment:Vm,metalnessmap_fragment:Wm,metalnessmap_pars_fragment:Xm,morphinstance_vertex:$m,morphcolor_vertex:qm,morphnormal_vertex:Ym,morphtarget_pars_vertex:jm,morphtarget_vertex:Km,normal_fragment_begin:Zm,normal_fragment_maps:Jm,normal_pars_fragment:Qm,normal_pars_vertex:t0,normal_vertex:e0,normalmap_pars_fragment:n0,clearcoat_normal_fragment_begin:i0,clearcoat_normal_fragment_maps:s0,clearcoat_pars_fragment:r0,iridescence_pars_fragment:o0,opaque_fragment:a0,packing:l0,premultiplied_alpha_fragment:c0,project_vertex:u0,dithering_fragment:d0,dithering_pars_fragment:h0,roughnessmap_fragment:f0,roughnessmap_pars_fragment:p0,shadowmap_pars_fragment:m0,shadowmap_pars_vertex:g0,shadowmap_vertex:_0,shadowmask_pars_fragment:x0,skinbase_vertex:v0,skinning_pars_vertex:M0,skinning_vertex:b0,skinnormal_vertex:y0,specularmap_fragment:S0,specularmap_pars_fragment:E0,tonemapping_fragment:T0,tonemapping_pars_fragment:w0,transmission_fragment:A0,transmission_pars_fragment:R0,uv_pars_fragment:C0,uv_pars_vertex:P0,uv_vertex:L0,worldpos_vertex:D0,background_vert:I0,background_frag:N0,backgroundCube_vert:U0,backgroundCube_frag:O0,cube_vert:F0,cube_frag:z0,depth_vert:B0,depth_frag:k0,distance_vert:H0,distance_frag:G0,equirect_vert:V0,equirect_frag:W0,linedashed_vert:X0,linedashed_frag:$0,meshbasic_vert:q0,meshbasic_frag:Y0,meshlambert_vert:j0,meshlambert_frag:K0,meshmatcap_vert:Z0,meshmatcap_frag:J0,meshnormal_vert:Q0,meshnormal_frag:tg,meshphong_vert:eg,meshphong_frag:ng,meshphysical_vert:ig,meshphysical_frag:sg,meshtoon_vert:rg,meshtoon_frag:og,points_vert:ag,points_frag:lg,shadow_vert:cg,shadow_frag:ug,sprite_vert:dg,sprite_frag:hg},Tt={common:{diffuse:{value:new Ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new Ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new Ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new Ot(16777215)},opacity:{value:1},center:{value:new Ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},Wn={basic:{uniforms:ln([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:ln([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new Ot(0)},envMapIntensity:{value:1}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:ln([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new Ot(0)},specular:{value:new Ot(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:ln([Tt.common,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.roughnessmap,Tt.metalnessmap,Tt.fog,Tt.lights,{emissive:{value:new Ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:ln([Tt.common,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.gradientmap,Tt.fog,Tt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:ln([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:ln([Tt.points,Tt.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:ln([Tt.common,Tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:ln([Tt.common,Tt.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:ln([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:ln([Tt.sprite,Tt.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distance:{uniforms:ln([Tt.common,Tt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distance_vert,fragmentShader:Yt.distance_frag},shadow:{uniforms:ln([Tt.lights,Tt.fog,{color:{value:new Ot(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};Wn.physical={uniforms:ln([Wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new Ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new Ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new Ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new Ot(0)},specularColor:{value:new Ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new Ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const jr={r:0,b:0,g:0},fg=new me,ih=new $t;ih.set(-1,0,0,0,1,0,0,0,1);function pg(n,t,e,i,s,r){const o=new Ot(0);let a=s===!0?0:1,c,l,u=null,f=0,d=null;function p(v){let T=v.isScene===!0?v.background:null;if(T&&T.isTexture){const w=v.backgroundBlurriness>0;T=t.get(T,w)}return T}function _(v){let T=!1;const w=p(v);w===null?m(o,a):w&&w.isColor&&(m(w,1),T=!0);const I=n.xr.getEnvironmentBlendMode();I==="additive"?e.buffers.color.setClear(0,0,0,1,r):I==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(v,T){const w=p(T);w&&(w.isCubeTexture||w.mapping===No)?(l===void 0&&(l=new Xt(new ue(1,1,1),new jn({name:"BackgroundCubeMaterial",uniforms:Ds(Wn.backgroundCube.uniforms),vertexShader:Wn.backgroundCube.vertexShader,fragmentShader:Wn.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(I,C,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=w,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(fg.makeRotationFromEuler(T.backgroundRotation)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ih),l.material.toneMapped=ie.getTransfer(w.colorSpace)!==pe,(u!==w||f!==w.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=w,f=w.version,d=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new Xt(new Ps(2,2),new jn({name:"BackgroundMaterial",uniforms:Ds(Wn.background.uniforms),vertexShader:Wn.background.vertexShader,fragmentShader:Wn.background.fragmentShader,side:Ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=ie.getTransfer(w.colorSpace)!==pe,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||f!==w.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=w,f=w.version,d=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,T){v.getRGB(jr,jd(n)),e.buffers.color.setClear(jr.r,jr.g,jr.b,T,r)}function h(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,T=1){o.set(v),a=T,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,m(o,a)},render:_,addToRenderList:x,dispose:h}}function mg(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,o=!1;function a(y,A,D,H,N){let G=!1;const R=f(y,H,D,A);r!==R&&(r=R,l(r.object)),G=p(y,H,D,N),G&&_(y,H,D,N),N!==null&&t.update(N,n.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,w(y,A,D,H),N!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function c(){return n.createVertexArray()}function l(y){return n.bindVertexArray(y)}function u(y){return n.deleteVertexArray(y)}function f(y,A,D,H){const N=H.wireframe===!0;let G=i[A.id];G===void 0&&(G={},i[A.id]=G);const R=y.isInstancedMesh===!0?y.id:0;let O=G[R];O===void 0&&(O={},G[R]=O);let B=O[D.id];B===void 0&&(B={},O[D.id]=B);let K=B[N];return K===void 0&&(K=d(c()),B[N]=K),K}function d(y){const A=[],D=[],H=[];for(let N=0;N<e;N++)A[N]=0,D[N]=0,H[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:D,attributeDivisors:H,object:y,attributes:{},index:null}}function p(y,A,D,H){const N=r.attributes,G=A.attributes;let R=0;const O=D.getAttributes();for(const B in O)if(O[B].location>=0){const ht=N[B];let rt=G[B];if(rt===void 0&&(B==="instanceMatrix"&&y.instanceMatrix&&(rt=y.instanceMatrix),B==="instanceColor"&&y.instanceColor&&(rt=y.instanceColor)),ht===void 0||ht.attribute!==rt||rt&&ht.data!==rt.data)return!0;R++}return r.attributesNum!==R||r.index!==H}function _(y,A,D,H){const N={},G=A.attributes;let R=0;const O=D.getAttributes();for(const B in O)if(O[B].location>=0){let ht=G[B];ht===void 0&&(B==="instanceMatrix"&&y.instanceMatrix&&(ht=y.instanceMatrix),B==="instanceColor"&&y.instanceColor&&(ht=y.instanceColor));const rt={};rt.attribute=ht,ht&&ht.data&&(rt.data=ht.data),N[B]=rt,R++}r.attributes=N,r.attributesNum=R,r.index=H}function x(){const y=r.newAttributes;for(let A=0,D=y.length;A<D;A++)y[A]=0}function m(y){h(y,0)}function h(y,A){const D=r.newAttributes,H=r.enabledAttributes,N=r.attributeDivisors;D[y]=1,H[y]===0&&(n.enableVertexAttribArray(y),H[y]=1),N[y]!==A&&(n.vertexAttribDivisor(y,A),N[y]=A)}function v(){const y=r.newAttributes,A=r.enabledAttributes;for(let D=0,H=A.length;D<H;D++)A[D]!==y[D]&&(n.disableVertexAttribArray(D),A[D]=0)}function T(y,A,D,H,N,G,R){R===!0?n.vertexAttribIPointer(y,A,D,N,G):n.vertexAttribPointer(y,A,D,H,N,G)}function w(y,A,D,H){x();const N=H.attributes,G=D.getAttributes(),R=A.defaultAttributeValues;for(const O in G){const B=G[O];if(B.location>=0){let K=N[O];if(K===void 0&&(O==="instanceMatrix"&&y.instanceMatrix&&(K=y.instanceMatrix),O==="instanceColor"&&y.instanceColor&&(K=y.instanceColor)),K!==void 0){const ht=K.normalized,rt=K.itemSize,st=t.get(K);if(st===void 0)continue;const ut=st.buffer,pt=st.type,Q=st.bytesPerElement,xt=pt===n.INT||pt===n.UNSIGNED_INT||K.gpuType===kl;if(K.isInterleavedBufferAttribute){const mt=K.data,Nt=mt.stride,Ht=K.offset;if(mt.isInstancedInterleavedBuffer){for(let kt=0;kt<B.locationSize;kt++)h(B.location+kt,mt.meshPerAttribute);y.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let kt=0;kt<B.locationSize;kt++)m(B.location+kt);n.bindBuffer(n.ARRAY_BUFFER,ut);for(let kt=0;kt<B.locationSize;kt++)T(B.location+kt,rt/B.locationSize,pt,ht,Nt*Q,(Ht+rt/B.locationSize*kt)*Q,xt)}else{if(K.isInstancedBufferAttribute){for(let mt=0;mt<B.locationSize;mt++)h(B.location+mt,K.meshPerAttribute);y.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let mt=0;mt<B.locationSize;mt++)m(B.location+mt);n.bindBuffer(n.ARRAY_BUFFER,ut);for(let mt=0;mt<B.locationSize;mt++)T(B.location+mt,rt/B.locationSize,pt,ht,rt*Q,rt/B.locationSize*mt*Q,xt)}}else if(R!==void 0){const ht=R[O];if(ht!==void 0)switch(ht.length){case 2:n.vertexAttrib2fv(B.location,ht);break;case 3:n.vertexAttrib3fv(B.location,ht);break;case 4:n.vertexAttrib4fv(B.location,ht);break;default:n.vertexAttrib1fv(B.location,ht)}}}}v()}function I(){S();for(const y in i){const A=i[y];for(const D in A){const H=A[D];for(const N in H){const G=H[N];for(const R in G)u(G[R].object),delete G[R];delete H[N]}}delete i[y]}}function C(y){if(i[y.id]===void 0)return;const A=i[y.id];for(const D in A){const H=A[D];for(const N in H){const G=H[N];for(const R in G)u(G[R].object),delete G[R];delete H[N]}}delete i[y.id]}function L(y){for(const A in i){const D=i[A];for(const H in D){const N=D[H];if(N[y.id]===void 0)continue;const G=N[y.id];for(const R in G)u(G[R].object),delete G[R];delete N[y.id]}}}function g(y){for(const A in i){const D=i[A],H=y.isInstancedMesh===!0?y.id:0,N=D[H];if(N!==void 0){for(const G in N){const R=N[G];for(const O in R)u(R[O].object),delete R[O];delete N[G]}delete D[H],Object.keys(D).length===0&&delete i[A]}}}function S(){b(),o=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:S,resetDefaultState:b,dispose:I,releaseStatesOfGeometry:C,releaseStatesOfObject:g,releaseStatesOfProgram:L,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function gg(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function o(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),e.update(l,i,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let d=0;for(let p=0;p<u;p++)d+=l[p];e.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function _g(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const L=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(L){return!(L!==Fn&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(L){const g=L===ci&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(L!==xn&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==On&&!g)}function c(L){if(L==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(Bt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&d===!1&&Bt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),w=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=n.getParameter(n.MAX_SAMPLES),C=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:v,maxVaryings:T,maxFragmentUniforms:w,maxSamples:I,samples:C}}function xg(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new ni,a=new $t,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||s;return s=d,i=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){e=u(f,d,0)},this.setState=function(f,d,p){const _=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,h=n.get(f);if(!s||_===null||_.length===0||r&&!m)r?u(null):l();else{const v=r?0:i,T=v*4;let w=h.clippingState||null;c.value=w,w=u(_,d,T,p);for(let I=0;I!==T;++I)w[I]=e[I];h.clippingState=w,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,d,p,_){const x=f!==null?f.length:0;let m=null;if(x!==0){if(m=c.value,_!==!0||m===null){const h=p+x*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<h)&&(m=new Float32Array(h));for(let T=0,w=p;T!==x;++T,w+=4)o.copy(f[T]).applyMatrix4(v,a),o.normal.toArray(m,w),m[w+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}const Ai=4,bu=[.125,.215,.35,.446,.526,.582],Hi=20,vg=256,Ks=new oc,yu=new Ot;let xa=null,va=0,Ma=0,ba=!1;const Mg=new F;class Al{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=Mg}=r;xa=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Eu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(xa,va,Ma),this._renderer.xr.enabled=ba,t.scissorTest=!1,_s(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===qi||t.mapping===Rs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),xa=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:nn,minFilter:nn,generateMipmaps:!1,type:ci,format:Fn,colorSpace:bo,depthBuffer:!1},s=Su(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Su(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=bg(r)),this._blurMaterial=Sg(r,t,e),this._ggxMaterial=yg(r,t,e)}return s}_compileMaterial(t){const e=new Xt(new on,t);this._renderer.compile(e,Ks)}_sceneToCubeUV(t,e,i,s,r){const c=new hn(90,1,e,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,p=f.toneMapping;f.getClearColor(yu),f.toneMapping=$n,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Xt(new ue,new ji({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let h=!1;const v=t.background;v?v.isColor&&(m.color.copy(v),t.background=null,h=!0):(m.color.copy(yu),h=!0);for(let T=0;T<6;T++){const w=T%3;w===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[T],r.y,r.z)):w===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[T]));const I=this._cubeSize;_s(s,w*I,T>2?I:0,I,I),f.setRenderTarget(s),h&&f.render(x,c),f.render(t,c)}f.toneMapping=p,f.autoClear=d,t.background=v}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===qi||t.mapping===Rs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Eu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;_s(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,Ks)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const c=o.uniforms,l=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),d=0+l*1.25,p=f*d,{_lodMax:_}=this,x=this._sizeLods[i],m=3*x*(i>_-Ai?i-_+Ai:0),h=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=p,c.mipInt.value=_-e,_s(r,m,h,3*x,2*x),s.setRenderTarget(r),s.render(a,Ks),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=_-i,_s(t,m,h,3*x,2*x),s.setRenderTarget(t),s.render(a,Ks)}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&se("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=l;const d=l.uniforms,p=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Hi-1),x=r/_,m=isFinite(r)?1+Math.floor(u*x):Hi;m>Hi&&Bt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hi}`);const h=[];let v=0;for(let L=0;L<Hi;++L){const g=L/x,S=Math.exp(-g*g/2);h.push(S),L===0?v+=S:L<m&&(v+=2*S)}for(let L=0;L<h.length;L++)h[L]=h[L]/v;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=h,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:T}=this;d.dTheta.value=_,d.mipInt.value=T-i;const w=this._sizeLods[s],I=3*w*(s>T-Ai?s-T+Ai:0),C=4*(this._cubeSize-w);_s(e,I,C,3*w,2*w),c.setRenderTarget(e),c.render(f,Ks)}}function bg(n){const t=[],e=[],i=[];let s=n;const r=n-Ai+1+bu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>n-Ai?c=bu[o-n+Ai-1]:o===0&&(c=0),e.push(c);const l=1/(a-2),u=-l,f=1+l,d=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,_=6,x=3,m=2,h=1,v=new Float32Array(x*_*p),T=new Float32Array(m*_*p),w=new Float32Array(h*_*p);for(let C=0;C<p;C++){const L=C%3*2/3-1,g=C>2?0:-1,S=[L,g,0,L+2/3,g,0,L+2/3,g+1,0,L,g,0,L+2/3,g+1,0,L,g+1,0];v.set(S,x*_*C),T.set(d,m*_*C);const b=[C,C,C,C,C,C];w.set(b,h*_*C)}const I=new on;I.setAttribute("position",new Mn(v,x)),I.setAttribute("uv",new Mn(T,m)),I.setAttribute("faceIndex",new Mn(w,h)),i.push(new Xt(I,null)),s>Ai&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function Su(n,t,e){const i=new qn(n,t,e);return i.texture.mapping=No,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _s(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function yg(n,t,e){return new jn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:vg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Fo(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Sg(n,t,e){const i=new Float32Array(Hi),s=new F(0,1,0);return new jn({name:"SphericalGaussianBlur",defines:{n:Hi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fo(),fragmentShader:`

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
			`},s=new ue(5,5,5),r=new jn({name:"CubemapFromEquirect",uniforms:Ds(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:un,blending:ri});r.uniforms.tEquirect.value=e;const o=new Xt(s,r),a=e.minFilter;return e.minFilter===Gi&&(e.minFilter=nn),new Rp(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}function Eg(n){let t=new WeakMap,e=new WeakMap,i=null;function s(d,p=!1){return d==null?null:p?o(d):r(d)}function r(d){if(d&&d.isTexture){const p=d.mapping;if(p===Xo||p===$o)if(t.has(d)){const _=t.get(d).texture;return a(_,d.mapping)}else{const _=d.image;if(_&&_.height>0){const x=new sh(_.height);return x.fromEquirectangularTexture(n,d),t.set(d,x),d.addEventListener("dispose",l),a(x.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const p=d.mapping,_=p===Xo||p===$o,x=p===qi||p===Rs;if(_||x){let m=e.get(d);const h=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==h)return i===null&&(i=new Al(n)),m=_?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),m.texture;if(m!==void 0)return m.texture;{const v=d.image;return _&&v&&v.height>0||x&&v&&c(v)?(i===null&&(i=new Al(n)),m=_?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function a(d,p){return p===Xo?d.mapping=qi:p===$o&&(d.mapping=Rs),d}function c(d){let p=0;const _=6;for(let x=0;x<_;x++)d[x]!==void 0&&p++;return p===_}function l(d){const p=d.target;p.removeEventListener("dispose",l);const _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function u(d){const p=d.target;p.removeEventListener("dispose",u);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function Tg(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Tl("WebGLRenderer: "+i+" extension not supported."),s}}}function wg(n,t,e,i){const s={},r=new WeakMap;function o(f){const d=f.target;d.index!==null&&t.remove(d.index);for(const _ in d.attributes)t.remove(d.attributes[_]);d.removeEventListener("dispose",o),delete s[d.id];const p=r.get(d);p&&(t.remove(p),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(f,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(f){const d=f.attributes;for(const p in d)t.update(d[p],n.ARRAY_BUFFER)}function l(f){const d=[],p=f.index,_=f.attributes.position;let x=0;if(_===void 0)return;if(p!==null){const v=p.array;x=p.version;for(let T=0,w=v.length;T<w;T+=3){const I=v[T+0],C=v[T+1],L=v[T+2];d.push(I,C,C,L,L,I)}}else{const v=_.array;x=_.version;for(let T=0,w=v.length/3-1;T<w;T+=3){const I=T+0,C=T+1,L=T+2;d.push(I,C,C,L,L,I)}}const m=new(_.count>=65535?Wd:Vd)(d,1);m.version=x;const h=r.get(f);h&&t.remove(h),r.set(f,m)}function u(f){const d=r.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function Ag(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){n.drawElements(i,d,r,f*o),e.update(d,i,1)}function l(f,d,p){p!==0&&(n.drawElementsInstanced(i,d,r,f*o,p),e.update(d,i,p))}function u(f,d,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,p);let x=0;for(let m=0;m<p;m++)x+=d[m];e.update(x,i,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Rg(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:se("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Cg(n,t,e){const i=new WeakMap,s=new Oe;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(a);if(d===void 0||d.count!==f){let b=function(){g.dispose(),i.delete(a),a.removeEventListener("dispose",b)};var p=b;d!==void 0&&d.texture.dispose();const _=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let w=0;_===!0&&(w=1),x===!0&&(w=2),m===!0&&(w=3);let I=a.attributes.position.count*w,C=1;I>t.maxTextureSize&&(C=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);const L=new Float32Array(I*C*4*f),g=new Hd(L,I,C,f);g.type=On,g.needsUpdate=!0;const S=w*4;for(let y=0;y<f;y++){const A=h[y],D=v[y],H=T[y],N=I*C*4*y;for(let G=0;G<A.count;G++){const R=G*S;_===!0&&(s.fromBufferAttribute(A,G),L[N+R+0]=s.x,L[N+R+1]=s.y,L[N+R+2]=s.z,L[N+R+3]=0),x===!0&&(s.fromBufferAttribute(D,G),L[N+R+4]=s.x,L[N+R+5]=s.y,L[N+R+6]=s.z,L[N+R+7]=0),m===!0&&(s.fromBufferAttribute(H,G),L[N+R+8]=s.x,L[N+R+9]=s.y,L[N+R+10]=s.z,L[N+R+11]=H.itemSize===4?s.w:1)}}d={count:f,texture:g,size:new Ut(I,C)},i.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let _=0;for(let m=0;m<l.length;m++)_+=l[m];const x=a.morphTargetsRelative?1:1-_;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function Pg(n,t,e,i,s){let r=new WeakMap;function o(l){const u=s.render.frame,f=l.geometry,d=t.get(l,f);if(r.get(d)!==u&&(t.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return d}function a(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}const Lg={[Ad]:"LINEAR_TONE_MAPPING",[Rd]:"REINHARD_TONE_MAPPING",[Cd]:"CINEON_TONE_MAPPING",[Pd]:"ACES_FILMIC_TONE_MAPPING",[Dd]:"AGX_TONE_MAPPING",[Io]:"NEUTRAL_TONE_MAPPING",[Ld]:"CUSTOM_TONE_MAPPING"};function Dg(n,t,e,i,s){const r=new qn(t,e,{type:n,depthBuffer:i,stencilBuffer:s,depthTexture:i?new Cs(t,e):void 0}),o=new qn(t,e,{type:ci,depthBuffer:!1,stencilBuffer:!1}),a=new on;a.setAttribute("position",new Re([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Re([0,2,0,0,2,0],2));const c=new yp({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new Xt(a,c),u=new oc(-1,1,1,-1,0,1);let f=null,d=null,p=!1,_,x=null,m=[],h=!1;this.setSize=function(v,T){r.setSize(v,T),o.setSize(v,T);for(let w=0;w<m.length;w++){const I=m[w];I.setSize&&I.setSize(v,T)}},this.setEffects=function(v){m=v,h=m.length>0&&m[0].isRenderPass===!0;const T=r.width,w=r.height;for(let I=0;I<m.length;I++){const C=m[I];C.setSize&&C.setSize(T,w)}},this.begin=function(v,T){if(p||v.toneMapping===$n&&m.length===0)return!1;if(x=T,T!==null){const w=T.width,I=T.height;(r.width!==w||r.height!==I)&&this.setSize(w,I)}return h===!1&&v.setRenderTarget(r),_=v.toneMapping,v.toneMapping=$n,!0},this.hasRenderPass=function(){return h},this.end=function(v,T){v.toneMapping=_,p=!0;let w=r,I=o;for(let C=0;C<m.length;C++){const L=m[C];if(L.enabled!==!1&&(L.render(v,I,w,T),L.needsSwap!==!1)){const g=w;w=I,I=g}}if(f!==v.outputColorSpace||d!==v.toneMapping){f=v.outputColorSpace,d=v.toneMapping,c.defines={},ie.getTransfer(f)===pe&&(c.defines.SRGB_TRANSFER="");const C=Lg[d];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,v.setRenderTarget(x),v.render(l,u),x=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),a.dispose(),c.dispose()}}const rh=new rn,Rl=new Cs(1,1),oh=new Hd,ah=new Jf,lh=new qd,wu=[],Au=[],Ru=new Float32Array(16),Cu=new Float32Array(9),Pu=new Float32Array(4);function Bs(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=wu[s];if(r===void 0&&(r=new Float32Array(s),wu[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ge(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ve(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function zo(n,t){let e=Au[t];e===void 0&&(e=new Int32Array(t),Au[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Ig(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Ng(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2fv(this.addr,t),Ve(e,t)}}function Ug(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ge(e,t))return;n.uniform3fv(this.addr,t),Ve(e,t)}}function Og(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4fv(this.addr,t),Ve(e,t)}}function Fg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ve(e,t)}else{if(Ge(e,i))return;Pu.set(i),n.uniformMatrix2fv(this.addr,!1,Pu),Ve(e,i)}}function zg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ve(e,t)}else{if(Ge(e,i))return;Cu.set(i),n.uniformMatrix3fv(this.addr,!1,Cu),Ve(e,i)}}function Bg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ve(e,t)}else{if(Ge(e,i))return;Ru.set(i),n.uniformMatrix4fv(this.addr,!1,Ru),Ve(e,i)}}function kg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Hg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2iv(this.addr,t),Ve(e,t)}}function Gg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;n.uniform3iv(this.addr,t),Ve(e,t)}}function Vg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4iv(this.addr,t),Ve(e,t)}}function Wg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Xg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2uiv(this.addr,t),Ve(e,t)}}function $g(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;n.uniform3uiv(this.addr,t),Ve(e,t)}}function qg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4uiv(this.addr,t),Ve(e,t)}}function Yg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Rl.compareFunction=e.isReversedDepthBuffer()?Yl:ql,r=Rl):r=rh,e.setTexture2D(t||r,s)}function jg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||ah,s)}function Kg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||lh,s)}function Zg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||oh,s)}function Jg(n){switch(n){case 5126:return Ig;case 35664:return Ng;case 35665:return Ug;case 35666:return Og;case 35674:return Fg;case 35675:return zg;case 35676:return Bg;case 5124:case 35670:return kg;case 35667:case 35671:return Hg;case 35668:case 35672:return Gg;case 35669:case 35673:return Vg;case 5125:return Wg;case 36294:return Xg;case 36295:return $g;case 36296:return qg;case 35678:case 36198:case 36298:case 36306:case 35682:return Yg;case 35679:case 36299:case 36307:return jg;case 35680:case 36300:case 36308:case 36293:return Kg;case 36289:case 36303:case 36311:case 36292:return Zg}}function Qg(n,t){n.uniform1fv(this.addr,t)}function t_(n,t){const e=Bs(t,this.size,2);n.uniform2fv(this.addr,e)}function e_(n,t){const e=Bs(t,this.size,3);n.uniform3fv(this.addr,e)}function n_(n,t){const e=Bs(t,this.size,4);n.uniform4fv(this.addr,e)}function i_(n,t){const e=Bs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function s_(n,t){const e=Bs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function r_(n,t){const e=Bs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function o_(n,t){n.uniform1iv(this.addr,t)}function a_(n,t){n.uniform2iv(this.addr,t)}function l_(n,t){n.uniform3iv(this.addr,t)}function c_(n,t){n.uniform4iv(this.addr,t)}function u_(n,t){n.uniform1uiv(this.addr,t)}function d_(n,t){n.uniform2uiv(this.addr,t)}function h_(n,t){n.uniform3uiv(this.addr,t)}function f_(n,t){n.uniform4uiv(this.addr,t)}function p_(n,t,e){const i=this.cache,s=t.length,r=zo(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Rl:o=rh;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function m_(n,t,e){const i=this.cache,s=t.length,r=zo(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||ah,r[o])}function g_(n,t,e){const i=this.cache,s=t.length,r=zo(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||lh,r[o])}function __(n,t,e){const i=this.cache,s=t.length,r=zo(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||oh,r[o])}function x_(n){switch(n){case 5126:return Qg;case 35664:return t_;case 35665:return e_;case 35666:return n_;case 35674:return i_;case 35675:return s_;case 35676:return r_;case 5124:case 35670:return o_;case 35667:case 35671:return a_;case 35668:case 35672:return l_;case 35669:case 35673:return c_;case 5125:return u_;case 36294:return d_;case 36295:return h_;case 36296:return f_;case 35678:case 36198:case 36298:case 36306:case 35682:return p_;case 35679:case 36299:case 36307:return m_;case 35680:case 36300:case 36308:case 36293:return g_;case 36289:case 36303:case 36311:case 36292:return __}}class v_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Jg(e.type)}}class M_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=x_(e.type)}}class b_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const ya=/(\w+)(\])?(\[|\.)?/g;function Lu(n,t){n.seq.push(t),n.map[t.id]=t}function y_(n,t,e){const i=n.name,s=i.length;for(ya.lastIndex=0;;){const r=ya.exec(i),o=ya.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Lu(e,l===void 0?new v_(a,n,t):new M_(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new b_(a),Lu(e,f)),e=f}}}class po{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);y_(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Du(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const S_=37297;let E_=0;function T_(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Iu=new $t;function w_(n){ie._getMatrix(Iu,ie.workingColorSpace,n);const t=`mat3( ${Iu.elements.map(e=>e.toFixed(4))} )`;switch(ie.getTransfer(n)){case yo:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return Bt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Nu(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+T_(n.getShaderSource(t),a)}else return r}function A_(n,t){const e=w_(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const R_={[Ad]:"Linear",[Rd]:"Reinhard",[Cd]:"Cineon",[Pd]:"ACESFilmic",[Dd]:"AgX",[Io]:"Neutral",[Ld]:"Custom"};function C_(n,t){const e=R_[t];return e===void 0?(Bt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Kr=new F;function P_(){ie.getLuminanceCoefficients(Kr);const n=Kr.x.toFixed(4),t=Kr.y.toFixed(4),e=Kr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function L_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(er).join(`
`)}function D_(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function I_(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function er(n){return n!==""}function Uu(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ou(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const N_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cl(n){return n.replace(N_,O_)}const U_=new Map;function O_(n,t){let e=Yt[t];if(e===void 0){const i=U_.get(t);if(i!==void 0)e=Yt[i],Bt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Cl(e)}const F_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fu(n){return n.replace(F_,z_)}function z_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function zu(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}const B_={[Es]:"SHADOWMAP_TYPE_PCF",[tr]:"SHADOWMAP_TYPE_VSM"};function k_(n){return B_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const H_={[qi]:"ENVMAP_TYPE_CUBE",[Rs]:"ENVMAP_TYPE_CUBE",[No]:"ENVMAP_TYPE_CUBE_UV"};function G_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":H_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const V_={[Rs]:"ENVMAP_MODE_REFRACTION"};function W_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":V_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const X_={[Bl]:"ENVMAP_BLENDING_MULTIPLY",[gf]:"ENVMAP_BLENDING_MIX",[_f]:"ENVMAP_BLENDING_ADD"};function $_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":X_[n.combine]||"ENVMAP_BLENDING_NONE"}function q_(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Y_(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=k_(e),l=G_(e),u=W_(e),f=$_(e),d=q_(e),p=L_(e),_=D_(r),x=s.createProgram();let m,h,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(er).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(er).join(`
`),h.length>0&&(h+=`
`)):(m=[zu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(er).join(`
`),h=[zu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$n?"#define TONE_MAPPING":"",e.toneMapping!==$n?Yt.tonemapping_pars_fragment:"",e.toneMapping!==$n?C_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,A_("linearToOutputTexel",e.outputColorSpace),P_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(er).join(`
`)),o=Cl(o),o=Uu(o,e),o=Ou(o,e),a=Cl(a),a=Uu(a,e),a=Ou(a,e),o=Fu(o),a=Fu(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",e.glslVersion===Hc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Hc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const T=v+m+o,w=v+h+a,I=Du(s,s.VERTEX_SHADER,T),C=Du(s,s.FRAGMENT_SHADER,w);s.attachShader(x,I),s.attachShader(x,C),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function L(y){if(n.debug.checkShaderErrors){const A=s.getProgramInfoLog(x)||"",D=s.getShaderInfoLog(I)||"",H=s.getShaderInfoLog(C)||"",N=A.trim(),G=D.trim(),R=H.trim();let O=!0,B=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(O=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,I,C);else{const K=Nu(s,I,"vertex"),ht=Nu(s,C,"fragment");se("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+N+`
`+K+`
`+ht)}else N!==""?Bt("WebGLProgram: Program Info Log:",N):(G===""||R==="")&&(B=!1);B&&(y.diagnostics={runnable:O,programLog:N,vertexShader:{log:G,prefix:m},fragmentShader:{log:R,prefix:h}})}s.deleteShader(I),s.deleteShader(C),g=new po(s,x),S=I_(s,x)}let g;this.getUniforms=function(){return g===void 0&&L(this),g};let S;this.getAttributes=function(){return S===void 0&&L(this),S};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(x,S_)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=E_++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=I,this.fragmentShader=C,this}let j_=0;class K_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Z_(t),e.set(t,i)),i}}class Z_{constructor(t){this.id=j_++,this.code=t,this.usedTimes=0}}function J_(n){return n===Yi||n===xo||n===vo}function Q_(n,t,e,i,s,r){const o=new Zl,a=new K_,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(g){return c.add(g),g===0?"uv":`uv${g}`}function x(g,S,b,y,A,D){const H=y.fog,N=A.geometry,G=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?y.environment:null,R=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,O=t.get(g.envMap||G,R),B=O&&O.mapping===No?O.image.height:null,K=p[g.type];g.precision!==null&&(d=i.getMaxPrecision(g.precision),d!==g.precision&&Bt("WebGLProgram.getParameters:",g.precision,"not supported, using",d,"instead."));const ht=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,rt=ht!==void 0?ht.length:0;let st=0;N.morphAttributes.position!==void 0&&(st=1),N.morphAttributes.normal!==void 0&&(st=2),N.morphAttributes.color!==void 0&&(st=3);let ut,pt,Q,xt;if(K){const zt=Wn[K];ut=zt.vertexShader,pt=zt.fragmentShader}else ut=g.vertexShader,pt=g.fragmentShader,a.update(g),Q=a.getVertexShaderID(g),xt=a.getFragmentShaderID(g);const mt=n.getRenderTarget(),Nt=n.state.buffers.depth.getReversed(),Ht=A.isInstancedMesh===!0,kt=A.isBatchedMesh===!0,Se=!!g.map,Jt=!!g.matcap,de=!!O,he=!!g.aoMap,Wt=!!g.lightMap,Pe=!!g.bumpMap,be=!!g.normalMap,Je=!!g.displacementMap,k=!!g.emissiveMap,Ie=!!g.metalnessMap,Kt=!!g.roughnessMap,fe=g.anisotropy>0,yt=g.clearcoat>0,ge=g.dispersion>0,P=g.iridescence>0,M=g.sheen>0,X=g.transmission>0,U=fe&&!!g.anisotropyMap,Z=yt&&!!g.clearcoatMap,$=yt&&!!g.clearcoatNormalMap,lt=yt&&!!g.clearcoatRoughnessMap,j=P&&!!g.iridescenceMap,nt=P&&!!g.iridescenceThicknessMap,ct=M&&!!g.sheenColorMap,bt=M&&!!g.sheenRoughnessMap,gt=!!g.specularMap,ft=!!g.specularColorMap,Ft=!!g.specularIntensityMap,Gt=X&&!!g.transmissionMap,ee=X&&!!g.thicknessMap,z=!!g.gradientMap,_t=!!g.alphaMap,it=g.alphaTest>0,St=!!g.alphaHash,dt=!!g.extensions;let tt=$n;g.toneMapped&&(mt===null||mt.isXRRenderTarget===!0)&&(tt=n.toneMapping);const Mt={shaderID:K,shaderType:g.type,shaderName:g.name,vertexShader:ut,fragmentShader:pt,defines:g.defines,customVertexShaderID:Q,customFragmentShaderID:xt,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:d,batching:kt,batchingColor:kt&&A._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&A.instanceColor!==null,instancingMorph:Ht&&A.morphTexture!==null,outputColorSpace:mt===null?n.outputColorSpace:mt.isXRRenderTarget===!0?mt.texture.colorSpace:ie.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:Se,matcap:Jt,envMap:de,envMapMode:de&&O.mapping,envMapCubeUVHeight:B,aoMap:he,lightMap:Wt,bumpMap:Pe,normalMap:be,displacementMap:Je,emissiveMap:k,normalMapObjectSpace:be&&g.normalMapType===Mf,normalMapTangentSpace:be&&g.normalMapType===Mo,packedNormalMap:be&&g.normalMapType===Mo&&J_(g.normalMap.format),metalnessMap:Ie,roughnessMap:Kt,anisotropy:fe,anisotropyMap:U,clearcoat:yt,clearcoatMap:Z,clearcoatNormalMap:$,clearcoatRoughnessMap:lt,dispersion:ge,iridescence:P,iridescenceMap:j,iridescenceThicknessMap:nt,sheen:M,sheenColorMap:ct,sheenRoughnessMap:bt,specularMap:gt,specularColorMap:ft,specularIntensityMap:Ft,transmission:X,transmissionMap:Gt,thicknessMap:ee,gradientMap:z,opaque:g.transparent===!1&&g.blending===Ts&&g.alphaToCoverage===!1,alphaMap:_t,alphaTest:it,alphaHash:St,combine:g.combine,mapUv:Se&&_(g.map.channel),aoMapUv:he&&_(g.aoMap.channel),lightMapUv:Wt&&_(g.lightMap.channel),bumpMapUv:Pe&&_(g.bumpMap.channel),normalMapUv:be&&_(g.normalMap.channel),displacementMapUv:Je&&_(g.displacementMap.channel),emissiveMapUv:k&&_(g.emissiveMap.channel),metalnessMapUv:Ie&&_(g.metalnessMap.channel),roughnessMapUv:Kt&&_(g.roughnessMap.channel),anisotropyMapUv:U&&_(g.anisotropyMap.channel),clearcoatMapUv:Z&&_(g.clearcoatMap.channel),clearcoatNormalMapUv:$&&_(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&_(g.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&_(g.iridescenceMap.channel),iridescenceThicknessMapUv:nt&&_(g.iridescenceThicknessMap.channel),sheenColorMapUv:ct&&_(g.sheenColorMap.channel),sheenRoughnessMapUv:bt&&_(g.sheenRoughnessMap.channel),specularMapUv:gt&&_(g.specularMap.channel),specularColorMapUv:ft&&_(g.specularColorMap.channel),specularIntensityMapUv:Ft&&_(g.specularIntensityMap.channel),transmissionMapUv:Gt&&_(g.transmissionMap.channel),thicknessMapUv:ee&&_(g.thicknessMap.channel),alphaMapUv:_t&&_(g.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(be||fe),vertexNormals:!!N.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:A.isPoints===!0&&!!N.attributes.uv&&(Se||_t),fog:!!H,useFog:g.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||N.attributes.normal===void 0&&be===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Nt,skinning:A.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:rt,morphTextureStride:st,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:D.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:g.dithering,shadowMapEnabled:n.shadowMap.enabled&&b.length>0,shadowMapType:n.shadowMap.type,toneMapping:tt,decodeVideoTexture:Se&&g.map.isVideoTexture===!0&&ie.getTransfer(g.map.colorSpace)===pe,decodeVideoTextureEmissive:k&&g.emissiveMap.isVideoTexture===!0&&ie.getTransfer(g.emissiveMap.colorSpace)===pe,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===ii,flipSided:g.side===un,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:dt&&g.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(dt&&g.extensions.multiDraw===!0||kt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Mt.vertexUv1s=c.has(1),Mt.vertexUv2s=c.has(2),Mt.vertexUv3s=c.has(3),c.clear(),Mt}function m(g){const S=[];if(g.shaderID?S.push(g.shaderID):(S.push(g.customVertexShaderID),S.push(g.customFragmentShaderID)),g.defines!==void 0)for(const b in g.defines)S.push(b),S.push(g.defines[b]);return g.isRawShaderMaterial===!1&&(h(S,g),v(S,g),S.push(n.outputColorSpace)),S.push(g.customProgramCacheKey),S.join()}function h(g,S){g.push(S.precision),g.push(S.outputColorSpace),g.push(S.envMapMode),g.push(S.envMapCubeUVHeight),g.push(S.mapUv),g.push(S.alphaMapUv),g.push(S.lightMapUv),g.push(S.aoMapUv),g.push(S.bumpMapUv),g.push(S.normalMapUv),g.push(S.displacementMapUv),g.push(S.emissiveMapUv),g.push(S.metalnessMapUv),g.push(S.roughnessMapUv),g.push(S.anisotropyMapUv),g.push(S.clearcoatMapUv),g.push(S.clearcoatNormalMapUv),g.push(S.clearcoatRoughnessMapUv),g.push(S.iridescenceMapUv),g.push(S.iridescenceThicknessMapUv),g.push(S.sheenColorMapUv),g.push(S.sheenRoughnessMapUv),g.push(S.specularMapUv),g.push(S.specularColorMapUv),g.push(S.specularIntensityMapUv),g.push(S.transmissionMapUv),g.push(S.thicknessMapUv),g.push(S.combine),g.push(S.fogExp2),g.push(S.sizeAttenuation),g.push(S.morphTargetsCount),g.push(S.morphAttributeCount),g.push(S.numDirLights),g.push(S.numPointLights),g.push(S.numSpotLights),g.push(S.numSpotLightMaps),g.push(S.numHemiLights),g.push(S.numRectAreaLights),g.push(S.numDirLightShadows),g.push(S.numPointLightShadows),g.push(S.numSpotLightShadows),g.push(S.numSpotLightShadowsWithMaps),g.push(S.numLightProbes),g.push(S.shadowMapType),g.push(S.toneMapping),g.push(S.numClippingPlanes),g.push(S.numClipIntersection),g.push(S.depthPacking)}function v(g,S){o.disableAll(),S.instancing&&o.enable(0),S.instancingColor&&o.enable(1),S.instancingMorph&&o.enable(2),S.matcap&&o.enable(3),S.envMap&&o.enable(4),S.normalMapObjectSpace&&o.enable(5),S.normalMapTangentSpace&&o.enable(6),S.clearcoat&&o.enable(7),S.iridescence&&o.enable(8),S.alphaTest&&o.enable(9),S.vertexColors&&o.enable(10),S.vertexAlphas&&o.enable(11),S.vertexUv1s&&o.enable(12),S.vertexUv2s&&o.enable(13),S.vertexUv3s&&o.enable(14),S.vertexTangents&&o.enable(15),S.anisotropy&&o.enable(16),S.alphaHash&&o.enable(17),S.batching&&o.enable(18),S.dispersion&&o.enable(19),S.batchingColor&&o.enable(20),S.gradientMap&&o.enable(21),S.packedNormalMap&&o.enable(22),S.vertexNormals&&o.enable(23),g.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),S.numLightProbeGrids>0&&o.enable(22),g.push(o.mask)}function T(g){const S=p[g.type];let b;if(S){const y=Wn[S];b=vp.clone(y.uniforms)}else b=g.uniforms;return b}function w(g,S){let b=u.get(S);return b!==void 0?++b.usedTimes:(b=new Y_(n,S,g,s),l.push(b),u.set(S,b)),b}function I(g){if(--g.usedTimes===0){const S=l.indexOf(g);l[S]=l[l.length-1],l.pop(),u.delete(g.cacheKey),g.destroy()}}function C(g){a.remove(g)}function L(){a.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:T,acquireProgram:w,releaseProgram:I,releaseShaderCache:C,programs:l,dispose:L}}function tx(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function ex(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Bu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function ku(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function a(d,p,_,x,m,h){let v=n[t];return v===void 0?(v={id:d.id,object:d,geometry:p,material:_,materialVariant:o(d),groupOrder:x,renderOrder:d.renderOrder,z:m,group:h},n[t]=v):(v.id=d.id,v.object=d,v.geometry=p,v.material=_,v.materialVariant=o(d),v.groupOrder=x,v.renderOrder=d.renderOrder,v.z=m,v.group=h),t++,v}function c(d,p,_,x,m,h){const v=a(d,p,_,x,m,h);_.transmission>0?i.push(v):_.transparent===!0?s.push(v):e.push(v)}function l(d,p,_,x,m,h){const v=a(d,p,_,x,m,h);_.transmission>0?i.unshift(v):_.transparent===!0?s.unshift(v):e.unshift(v)}function u(d,p){e.length>1&&e.sort(d||ex),i.length>1&&i.sort(p||Bu),s.length>1&&s.sort(p||Bu)}function f(){for(let d=t,p=n.length;d<p;d++){const _=n[d];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function nx(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new ku,n.set(i,[o])):s>=r.length?(o=new ku,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function ix(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Ot};break;case"SpotLight":e={position:new F,direction:new F,color:new Ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Ot,groundColor:new Ot};break;case"RectAreaLight":e={color:new Ot,position:new F,halfWidth:new F,halfHeight:new F};break}return n[t.id]=e,e}}}function sx(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let rx=0;function ox(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function ax(n){const t=new ix,e=sx(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new F);const s=new F,r=new me,o=new me;function a(l){let u=0,f=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let p=0,_=0,x=0,m=0,h=0,v=0,T=0,w=0,I=0,C=0,L=0;l.sort(ox);for(let S=0,b=l.length;S<b;S++){const y=l[S],A=y.color,D=y.intensity,H=y.distance;let N=null;if(y.shadow&&y.shadow.map&&(y.shadow.map.texture.format===Yi?N=y.shadow.map.texture:N=y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)u+=A.r*D,f+=A.g*D,d+=A.b*D;else if(y.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(y.sh.coefficients[G],D);L++}else if(y.isDirectionalLight){const G=t.get(y);if(G.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){const R=y.shadow,O=e.get(y);O.shadowIntensity=R.intensity,O.shadowBias=R.bias,O.shadowNormalBias=R.normalBias,O.shadowRadius=R.radius,O.shadowMapSize=R.mapSize,i.directionalShadow[p]=O,i.directionalShadowMap[p]=N,i.directionalShadowMatrix[p]=y.shadow.matrix,v++}i.directional[p]=G,p++}else if(y.isSpotLight){const G=t.get(y);G.position.setFromMatrixPosition(y.matrixWorld),G.color.copy(A).multiplyScalar(D),G.distance=H,G.coneCos=Math.cos(y.angle),G.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),G.decay=y.decay,i.spot[x]=G;const R=y.shadow;if(y.map&&(i.spotLightMap[I]=y.map,I++,R.updateMatrices(y),y.castShadow&&C++),i.spotLightMatrix[x]=R.matrix,y.castShadow){const O=e.get(y);O.shadowIntensity=R.intensity,O.shadowBias=R.bias,O.shadowNormalBias=R.normalBias,O.shadowRadius=R.radius,O.shadowMapSize=R.mapSize,i.spotShadow[x]=O,i.spotShadowMap[x]=N,w++}x++}else if(y.isRectAreaLight){const G=t.get(y);G.color.copy(A).multiplyScalar(D),G.halfWidth.set(y.width*.5,0,0),G.halfHeight.set(0,y.height*.5,0),i.rectArea[m]=G,m++}else if(y.isPointLight){const G=t.get(y);if(G.color.copy(y.color).multiplyScalar(y.intensity),G.distance=y.distance,G.decay=y.decay,y.castShadow){const R=y.shadow,O=e.get(y);O.shadowIntensity=R.intensity,O.shadowBias=R.bias,O.shadowNormalBias=R.normalBias,O.shadowRadius=R.radius,O.shadowMapSize=R.mapSize,O.shadowCameraNear=R.camera.near,O.shadowCameraFar=R.camera.far,i.pointShadow[_]=O,i.pointShadowMap[_]=N,i.pointShadowMatrix[_]=y.shadow.matrix,T++}i.point[_]=G,_++}else if(y.isHemisphereLight){const G=t.get(y);G.skyColor.copy(y.color).multiplyScalar(D),G.groundColor.copy(y.groundColor).multiplyScalar(D),i.hemi[h]=G,h++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Tt.LTC_FLOAT_1,i.rectAreaLTC2=Tt.LTC_FLOAT_2):(i.rectAreaLTC1=Tt.LTC_HALF_1,i.rectAreaLTC2=Tt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const g=i.hash;(g.directionalLength!==p||g.pointLength!==_||g.spotLength!==x||g.rectAreaLength!==m||g.hemiLength!==h||g.numDirectionalShadows!==v||g.numPointShadows!==T||g.numSpotShadows!==w||g.numSpotMaps!==I||g.numLightProbes!==L)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=_,i.hemi.length=h,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=w+I-C,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=L,g.directionalLength=p,g.pointLength=_,g.spotLength=x,g.rectAreaLength=m,g.hemiLength=h,g.numDirectionalShadows=v,g.numPointShadows=T,g.numSpotShadows=w,g.numSpotMaps=I,g.numLightProbes=L,i.version=rx++)}function c(l,u){let f=0,d=0,p=0,_=0,x=0;const m=u.matrixWorldInverse;for(let h=0,v=l.length;h<v;h++){const T=l[h];if(T.isDirectionalLight){const w=i.directional[f];w.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),f++}else if(T.isSpotLight){const w=i.spot[p];w.position.setFromMatrixPosition(T.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),p++}else if(T.isRectAreaLight){const w=i.rectArea[_];w.position.setFromMatrixPosition(T.matrixWorld),w.position.applyMatrix4(m),o.identity(),r.copy(T.matrixWorld),r.premultiply(m),o.extractRotation(r),w.halfWidth.set(T.width*.5,0,0),w.halfHeight.set(0,T.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),_++}else if(T.isPointLight){const w=i.point[d];w.position.setFromMatrixPosition(T.matrixWorld),w.position.applyMatrix4(m),d++}else if(T.isHemisphereLight){const w=i.hemi[x];w.direction.setFromMatrixPosition(T.matrixWorld),w.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:i}}function Hu(n){const t=new ax(n),e=[],i=[],s=[];function r(d){f.camera=d,e.length=0,i.length=0,s.length=0}function o(d){e.push(d)}function a(d){i.push(d)}function c(d){s.push(d)}function l(){t.setup(e)}function u(d){t.setupView(e,d)}const f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function lx(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Hu(n),t.set(s,[a])):r>=o.length?(a=new Hu(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const cx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ux=`uniform sampler2D shadow_pass;
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
}`,dx=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],hx=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Gu=new me,Zs=new F,Sa=new F;function fx(n,t,e){let i=new tc;const s=new Ut,r=new Ut,o=new Oe,a=new Ep,c=new Tp,l={},u=e.maxTextureSize,f={[Ci]:un,[un]:Ci,[ii]:ii},d=new jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ut},radius:{value:4}},vertexShader:cx,fragmentShader:ux}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const _=new on;_.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Xt(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Es;let h=this.type;this.render=function(C,L,g){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;this.type===Kh&&(Bt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Es);const S=n.getRenderTarget(),b=n.getActiveCubeFace(),y=n.getActiveMipmapLevel(),A=n.state;A.setBlending(ri),A.buffers.depth.getReversed()===!0?A.buffers.color.setClear(0,0,0,0):A.buffers.color.setClear(1,1,1,1),A.buffers.depth.setTest(!0),A.setScissorTest(!1);const D=h!==this.type;D&&L.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(N=>N.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,N=C.length;H<N;H++){const G=C[H],R=G.shadow;if(R===void 0){Bt("WebGLShadowMap:",G,"has no shadow.");continue}if(R.autoUpdate===!1&&R.needsUpdate===!1)continue;s.copy(R.mapSize);const O=R.getFrameExtents();s.multiply(O),r.copy(R.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/O.x),s.x=r.x*O.x,R.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/O.y),s.y=r.y*O.y,R.mapSize.y=r.y));const B=n.state.buffers.depth.getReversed();if(R.camera._reversedDepth=B,R.map===null||D===!0){if(R.map!==null&&(R.map.depthTexture!==null&&(R.map.depthTexture.dispose(),R.map.depthTexture=null),R.map.dispose()),this.type===tr){if(G.isPointLight){Bt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}R.map=new qn(s.x,s.y,{format:Yi,type:ci,minFilter:nn,magFilter:nn,generateMipmaps:!1}),R.map.texture.name=G.name+".shadowMap",R.map.depthTexture=new Cs(s.x,s.y,On),R.map.depthTexture.name=G.name+".shadowMapDepth",R.map.depthTexture.format=ui,R.map.depthTexture.compareFunction=null,R.map.depthTexture.minFilter=Ke,R.map.depthTexture.magFilter=Ke}else G.isPointLight?(R.map=new sh(s.x),R.map.depthTexture=new _p(s.x,Yn)):(R.map=new qn(s.x,s.y),R.map.depthTexture=new Cs(s.x,s.y,Yn)),R.map.depthTexture.name=G.name+".shadowMap",R.map.depthTexture.format=ui,this.type===Es?(R.map.depthTexture.compareFunction=B?Yl:ql,R.map.depthTexture.minFilter=nn,R.map.depthTexture.magFilter=nn):(R.map.depthTexture.compareFunction=null,R.map.depthTexture.minFilter=Ke,R.map.depthTexture.magFilter=Ke);R.camera.updateProjectionMatrix()}const K=R.map.isWebGLCubeRenderTarget?6:1;for(let ht=0;ht<K;ht++){if(R.map.isWebGLCubeRenderTarget)n.setRenderTarget(R.map,ht),n.clear();else{ht===0&&(n.setRenderTarget(R.map),n.clear());const rt=R.getViewport(ht);o.set(r.x*rt.x,r.y*rt.y,r.x*rt.z,r.y*rt.w),A.viewport(o)}if(G.isPointLight){const rt=R.camera,st=R.matrix,ut=G.distance||rt.far;ut!==rt.far&&(rt.far=ut,rt.updateProjectionMatrix()),Zs.setFromMatrixPosition(G.matrixWorld),rt.position.copy(Zs),Sa.copy(rt.position),Sa.add(dx[ht]),rt.up.copy(hx[ht]),rt.lookAt(Sa),rt.updateMatrixWorld(),st.makeTranslation(-Zs.x,-Zs.y,-Zs.z),Gu.multiplyMatrices(rt.projectionMatrix,rt.matrixWorldInverse),R._frustum.setFromProjectionMatrix(Gu,rt.coordinateSystem,rt.reversedDepth)}else R.updateMatrices(G);i=R.getFrustum(),w(L,g,R.camera,G,this.type)}R.isPointLightShadow!==!0&&this.type===tr&&v(R,g),R.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(S,b,y)};function v(C,L){const g=t.update(x);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new qn(s.x,s.y,{format:Yi,type:ci})),d.uniforms.shadow_pass.value=C.map.depthTexture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(L,null,g,d,x,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(L,null,g,p,x,null)}function T(C,L,g,S){let b=null;const y=g.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(y!==void 0)b=y;else if(b=g.isPointLight===!0?c:a,n.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const A=b.uuid,D=L.uuid;let H=l[A];H===void 0&&(H={},l[A]=H);let N=H[D];N===void 0&&(N=b.clone(),H[D]=N,L.addEventListener("dispose",I)),b=N}if(b.visible=L.visible,b.wireframe=L.wireframe,S===tr?b.side=L.shadowSide!==null?L.shadowSide:L.side:b.side=L.shadowSide!==null?L.shadowSide:f[L.side],b.alphaMap=L.alphaMap,b.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,b.map=L.map,b.clipShadows=L.clipShadows,b.clippingPlanes=L.clippingPlanes,b.clipIntersection=L.clipIntersection,b.displacementMap=L.displacementMap,b.displacementScale=L.displacementScale,b.displacementBias=L.displacementBias,b.wireframeLinewidth=L.wireframeLinewidth,b.linewidth=L.linewidth,g.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const A=n.properties.get(b);A.light=g}return b}function w(C,L,g,S,b){if(C.visible===!1)return;if(C.layers.test(L.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&b===tr)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse,C.matrixWorld);const D=t.update(C),H=C.material;if(Array.isArray(H)){const N=D.groups;for(let G=0,R=N.length;G<R;G++){const O=N[G],B=H[O.materialIndex];if(B&&B.visible){const K=T(C,B,S,b);C.onBeforeShadow(n,C,L,g,D,K,O),n.renderBufferDirect(g,null,D,K,C,O),C.onAfterShadow(n,C,L,g,D,K,O)}}}else if(H.visible){const N=T(C,H,S,b);C.onBeforeShadow(n,C,L,g,D,N,null),n.renderBufferDirect(g,null,D,N,C,null),C.onAfterShadow(n,C,L,g,D,N,null)}}const A=C.children;for(let D=0,H=A.length;D<H;D++)w(A[D],L,g,S,b)}function I(C){C.target.removeEventListener("dispose",I);for(const g in l){const S=l[g],b=C.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}function px(n,t){function e(){let z=!1;const _t=new Oe;let it=null;const St=new Oe(0,0,0,0);return{setMask:function(dt){it!==dt&&!z&&(n.colorMask(dt,dt,dt,dt),it=dt)},setLocked:function(dt){z=dt},setClear:function(dt,tt,Mt,zt,Ee){Ee===!0&&(dt*=zt,tt*=zt,Mt*=zt),_t.set(dt,tt,Mt,zt),St.equals(_t)===!1&&(n.clearColor(dt,tt,Mt,zt),St.copy(_t))},reset:function(){z=!1,it=null,St.set(-1,0,0,0)}}}function i(){let z=!1,_t=!1,it=null,St=null,dt=null;return{setReversed:function(tt){if(_t!==tt){const Mt=t.get("EXT_clip_control");tt?Mt.clipControlEXT(Mt.LOWER_LEFT_EXT,Mt.ZERO_TO_ONE_EXT):Mt.clipControlEXT(Mt.LOWER_LEFT_EXT,Mt.NEGATIVE_ONE_TO_ONE_EXT),_t=tt;const zt=dt;dt=null,this.setClear(zt)}},getReversed:function(){return _t},setTest:function(tt){tt?mt(n.DEPTH_TEST):Nt(n.DEPTH_TEST)},setMask:function(tt){it!==tt&&!z&&(n.depthMask(tt),it=tt)},setFunc:function(tt){if(_t&&(tt=Pf[tt]),St!==tt){switch(tt){case Ha:n.depthFunc(n.NEVER);break;case Ga:n.depthFunc(n.ALWAYS);break;case Va:n.depthFunc(n.LESS);break;case As:n.depthFunc(n.LEQUAL);break;case Wa:n.depthFunc(n.EQUAL);break;case Xa:n.depthFunc(n.GEQUAL);break;case $a:n.depthFunc(n.GREATER);break;case qa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}St=tt}},setLocked:function(tt){z=tt},setClear:function(tt){dt!==tt&&(dt=tt,_t&&(tt=1-tt),n.clearDepth(tt))},reset:function(){z=!1,it=null,St=null,dt=null,_t=!1}}}function s(){let z=!1,_t=null,it=null,St=null,dt=null,tt=null,Mt=null,zt=null,Ee=null;return{setTest:function(ae){z||(ae?mt(n.STENCIL_TEST):Nt(n.STENCIL_TEST))},setMask:function(ae){_t!==ae&&!z&&(n.stencilMask(ae),_t=ae)},setFunc:function(ae,Ln,Ae){(it!==ae||St!==Ln||dt!==Ae)&&(n.stencilFunc(ae,Ln,Ae),it=ae,St=Ln,dt=Ae)},setOp:function(ae,Ln,Ae){(tt!==ae||Mt!==Ln||zt!==Ae)&&(n.stencilOp(ae,Ln,Ae),tt=ae,Mt=Ln,zt=Ae)},setLocked:function(ae){z=ae},setClear:function(ae){Ee!==ae&&(n.clearStencil(ae),Ee=ae)},reset:function(){z=!1,_t=null,it=null,St=null,dt=null,tt=null,Mt=null,zt=null,Ee=null}}}const r=new e,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let u={},f={},d={},p=new WeakMap,_=[],x=null,m=!1,h=null,v=null,T=null,w=null,I=null,C=null,L=null,g=new Ot(0,0,0),S=0,b=!1,y=null,A=null,D=null,H=null,N=null;const G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let R=!1,O=0;const B=n.getParameter(n.VERSION);B.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(B)[1]),R=O>=1):B.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),R=O>=2);let K=null,ht={};const rt=n.getParameter(n.SCISSOR_BOX),st=n.getParameter(n.VIEWPORT),ut=new Oe().fromArray(rt),pt=new Oe().fromArray(st);function Q(z,_t,it,St){const dt=new Uint8Array(4),tt=n.createTexture();n.bindTexture(z,tt),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Mt=0;Mt<it;Mt++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(_t,0,n.RGBA,1,1,St,0,n.RGBA,n.UNSIGNED_BYTE,dt):n.texImage2D(_t+Mt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,dt);return tt}const xt={};xt[n.TEXTURE_2D]=Q(n.TEXTURE_2D,n.TEXTURE_2D,1),xt[n.TEXTURE_CUBE_MAP]=Q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),xt[n.TEXTURE_2D_ARRAY]=Q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),xt[n.TEXTURE_3D]=Q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),mt(n.DEPTH_TEST),o.setFunc(As),Pe(!1),be(Uc),mt(n.CULL_FACE),he(ri);function mt(z){u[z]!==!0&&(n.enable(z),u[z]=!0)}function Nt(z){u[z]!==!1&&(n.disable(z),u[z]=!1)}function Ht(z,_t){return d[z]!==_t?(n.bindFramebuffer(z,_t),d[z]=_t,z===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=_t),z===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=_t),!0):!1}function kt(z,_t){let it=_,St=!1;if(z){it=p.get(_t),it===void 0&&(it=[],p.set(_t,it));const dt=z.textures;if(it.length!==dt.length||it[0]!==n.COLOR_ATTACHMENT0){for(let tt=0,Mt=dt.length;tt<Mt;tt++)it[tt]=n.COLOR_ATTACHMENT0+tt;it.length=dt.length,St=!0}}else it[0]!==n.BACK&&(it[0]=n.BACK,St=!0);St&&n.drawBuffers(it)}function Se(z){return x!==z?(n.useProgram(z),x=z,!0):!1}const Jt={[ki]:n.FUNC_ADD,[Jh]:n.FUNC_SUBTRACT,[Qh]:n.FUNC_REVERSE_SUBTRACT};Jt[tf]=n.MIN,Jt[ef]=n.MAX;const de={[nf]:n.ZERO,[sf]:n.ONE,[rf]:n.SRC_COLOR,[Ba]:n.SRC_ALPHA,[df]:n.SRC_ALPHA_SATURATE,[cf]:n.DST_COLOR,[af]:n.DST_ALPHA,[of]:n.ONE_MINUS_SRC_COLOR,[ka]:n.ONE_MINUS_SRC_ALPHA,[uf]:n.ONE_MINUS_DST_COLOR,[lf]:n.ONE_MINUS_DST_ALPHA,[hf]:n.CONSTANT_COLOR,[ff]:n.ONE_MINUS_CONSTANT_COLOR,[pf]:n.CONSTANT_ALPHA,[mf]:n.ONE_MINUS_CONSTANT_ALPHA};function he(z,_t,it,St,dt,tt,Mt,zt,Ee,ae){if(z===ri){m===!0&&(Nt(n.BLEND),m=!1);return}if(m===!1&&(mt(n.BLEND),m=!0),z!==Zh){if(z!==h||ae!==b){if((v!==ki||I!==ki)&&(n.blendEquation(n.FUNC_ADD),v=ki,I=ki),ae)switch(z){case Ts:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Oc:n.blendFunc(n.ONE,n.ONE);break;case Fc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:se("WebGLState: Invalid blending: ",z);break}else switch(z){case Ts:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Oc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Fc:se("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zc:se("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:se("WebGLState: Invalid blending: ",z);break}T=null,w=null,C=null,L=null,g.set(0,0,0),S=0,h=z,b=ae}return}dt=dt||_t,tt=tt||it,Mt=Mt||St,(_t!==v||dt!==I)&&(n.blendEquationSeparate(Jt[_t],Jt[dt]),v=_t,I=dt),(it!==T||St!==w||tt!==C||Mt!==L)&&(n.blendFuncSeparate(de[it],de[St],de[tt],de[Mt]),T=it,w=St,C=tt,L=Mt),(zt.equals(g)===!1||Ee!==S)&&(n.blendColor(zt.r,zt.g,zt.b,Ee),g.copy(zt),S=Ee),h=z,b=!1}function Wt(z,_t){z.side===ii?Nt(n.CULL_FACE):mt(n.CULL_FACE);let it=z.side===un;_t&&(it=!it),Pe(it),z.blending===Ts&&z.transparent===!1?he(ri):he(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);const St=z.stencilWrite;a.setTest(St),St&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),k(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?mt(n.SAMPLE_ALPHA_TO_COVERAGE):Nt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Pe(z){y!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),y=z)}function be(z){z!==Yh?(mt(n.CULL_FACE),z!==A&&(z===Uc?n.cullFace(n.BACK):z===jh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Nt(n.CULL_FACE),A=z}function Je(z){z!==D&&(R&&n.lineWidth(z),D=z)}function k(z,_t,it){z?(mt(n.POLYGON_OFFSET_FILL),(H!==_t||N!==it)&&(H=_t,N=it,o.getReversed()&&(_t=-_t),n.polygonOffset(_t,it))):Nt(n.POLYGON_OFFSET_FILL)}function Ie(z){z?mt(n.SCISSOR_TEST):Nt(n.SCISSOR_TEST)}function Kt(z){z===void 0&&(z=n.TEXTURE0+G-1),K!==z&&(n.activeTexture(z),K=z)}function fe(z,_t,it){it===void 0&&(K===null?it=n.TEXTURE0+G-1:it=K);let St=ht[it];St===void 0&&(St={type:void 0,texture:void 0},ht[it]=St),(St.type!==z||St.texture!==_t)&&(K!==it&&(n.activeTexture(it),K=it),n.bindTexture(z,_t||xt[z]),St.type=z,St.texture=_t)}function yt(){const z=ht[K];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function ge(){try{n.compressedTexImage2D(...arguments)}catch(z){se("WebGLState:",z)}}function P(){try{n.compressedTexImage3D(...arguments)}catch(z){se("WebGLState:",z)}}function M(){try{n.texSubImage2D(...arguments)}catch(z){se("WebGLState:",z)}}function X(){try{n.texSubImage3D(...arguments)}catch(z){se("WebGLState:",z)}}function U(){try{n.compressedTexSubImage2D(...arguments)}catch(z){se("WebGLState:",z)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(z){se("WebGLState:",z)}}function $(){try{n.texStorage2D(...arguments)}catch(z){se("WebGLState:",z)}}function lt(){try{n.texStorage3D(...arguments)}catch(z){se("WebGLState:",z)}}function j(){try{n.texImage2D(...arguments)}catch(z){se("WebGLState:",z)}}function nt(){try{n.texImage3D(...arguments)}catch(z){se("WebGLState:",z)}}function ct(z){return f[z]!==void 0?f[z]:n.getParameter(z)}function bt(z,_t){f[z]!==_t&&(n.pixelStorei(z,_t),f[z]=_t)}function gt(z){ut.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),ut.copy(z))}function ft(z){pt.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),pt.copy(z))}function Ft(z,_t){let it=l.get(_t);it===void 0&&(it=new WeakMap,l.set(_t,it));let St=it.get(z);St===void 0&&(St=n.getUniformBlockIndex(_t,z.name),it.set(z,St))}function Gt(z,_t){const St=l.get(_t).get(z);c.get(_t)!==St&&(n.uniformBlockBinding(_t,St,z.__bindingPointIndex),c.set(_t,St))}function ee(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},K=null,ht={},d={},p=new WeakMap,_=[],x=null,m=!1,h=null,v=null,T=null,w=null,I=null,C=null,L=null,g=new Ot(0,0,0),S=0,b=!1,y=null,A=null,D=null,H=null,N=null,ut.set(0,0,n.canvas.width,n.canvas.height),pt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:mt,disable:Nt,bindFramebuffer:Ht,drawBuffers:kt,useProgram:Se,setBlending:he,setMaterial:Wt,setFlipSided:Pe,setCullFace:be,setLineWidth:Je,setPolygonOffset:k,setScissorTest:Ie,activeTexture:Kt,bindTexture:fe,unbindTexture:yt,compressedTexImage2D:ge,compressedTexImage3D:P,texImage2D:j,texImage3D:nt,pixelStorei:bt,getParameter:ct,updateUBOMapping:Ft,uniformBlockBinding:Gt,texStorage2D:$,texStorage3D:lt,texSubImage2D:M,texSubImage3D:X,compressedTexSubImage2D:U,compressedTexSubImage3D:Z,scissor:gt,viewport:ft,reset:ee}}function mx(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ut,u=new WeakMap,f=new Set;let d;const p=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(P,M){return _?new OffscreenCanvas(P,M):So("canvas")}function m(P,M,X){let U=1;const Z=ge(P);if((Z.width>X||Z.height>X)&&(U=X/Math.max(Z.width,Z.height)),U<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const $=Math.floor(U*Z.width),lt=Math.floor(U*Z.height);d===void 0&&(d=x($,lt));const j=M?x($,lt):d;return j.width=$,j.height=lt,j.getContext("2d").drawImage(P,0,0,$,lt),Bt("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+$+"x"+lt+")."),j}else return"data"in P&&Bt("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),P;return P}function h(P){return P.generateMipmaps}function v(P){n.generateMipmap(P)}function T(P){return P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?n.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(P,M,X,U,Z,$=!1){if(P!==null){if(n[P]!==void 0)return n[P];Bt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let lt;U&&(lt=t.get("EXT_texture_norm16"),lt||Bt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=M;if(M===n.RED&&(X===n.FLOAT&&(j=n.R32F),X===n.HALF_FLOAT&&(j=n.R16F),X===n.UNSIGNED_BYTE&&(j=n.R8),X===n.UNSIGNED_SHORT&&lt&&(j=lt.R16_EXT),X===n.SHORT&&lt&&(j=lt.R16_SNORM_EXT)),M===n.RED_INTEGER&&(X===n.UNSIGNED_BYTE&&(j=n.R8UI),X===n.UNSIGNED_SHORT&&(j=n.R16UI),X===n.UNSIGNED_INT&&(j=n.R32UI),X===n.BYTE&&(j=n.R8I),X===n.SHORT&&(j=n.R16I),X===n.INT&&(j=n.R32I)),M===n.RG&&(X===n.FLOAT&&(j=n.RG32F),X===n.HALF_FLOAT&&(j=n.RG16F),X===n.UNSIGNED_BYTE&&(j=n.RG8),X===n.UNSIGNED_SHORT&&lt&&(j=lt.RG16_EXT),X===n.SHORT&&lt&&(j=lt.RG16_SNORM_EXT)),M===n.RG_INTEGER&&(X===n.UNSIGNED_BYTE&&(j=n.RG8UI),X===n.UNSIGNED_SHORT&&(j=n.RG16UI),X===n.UNSIGNED_INT&&(j=n.RG32UI),X===n.BYTE&&(j=n.RG8I),X===n.SHORT&&(j=n.RG16I),X===n.INT&&(j=n.RG32I)),M===n.RGB_INTEGER&&(X===n.UNSIGNED_BYTE&&(j=n.RGB8UI),X===n.UNSIGNED_SHORT&&(j=n.RGB16UI),X===n.UNSIGNED_INT&&(j=n.RGB32UI),X===n.BYTE&&(j=n.RGB8I),X===n.SHORT&&(j=n.RGB16I),X===n.INT&&(j=n.RGB32I)),M===n.RGBA_INTEGER&&(X===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),X===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),X===n.UNSIGNED_INT&&(j=n.RGBA32UI),X===n.BYTE&&(j=n.RGBA8I),X===n.SHORT&&(j=n.RGBA16I),X===n.INT&&(j=n.RGBA32I)),M===n.RGB&&(X===n.UNSIGNED_SHORT&&lt&&(j=lt.RGB16_EXT),X===n.SHORT&&lt&&(j=lt.RGB16_SNORM_EXT),X===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),X===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),M===n.RGBA){const nt=$?yo:ie.getTransfer(Z);X===n.FLOAT&&(j=n.RGBA32F),X===n.HALF_FLOAT&&(j=n.RGBA16F),X===n.UNSIGNED_BYTE&&(j=nt===pe?n.SRGB8_ALPHA8:n.RGBA8),X===n.UNSIGNED_SHORT&&lt&&(j=lt.RGBA16_EXT),X===n.SHORT&&lt&&(j=lt.RGBA16_SNORM_EXT),X===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),X===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function I(P,M){let X;return P?M===null||M===Yn||M===dr?X=n.DEPTH24_STENCIL8:M===On?X=n.DEPTH32F_STENCIL8:M===ur&&(X=n.DEPTH24_STENCIL8,Bt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Yn||M===dr?X=n.DEPTH_COMPONENT24:M===On?X=n.DEPTH_COMPONENT32F:M===ur&&(X=n.DEPTH_COMPONENT16),X}function C(P,M){return h(P)===!0||P.isFramebufferTexture&&P.minFilter!==Ke&&P.minFilter!==nn?Math.log2(Math.max(M.width,M.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?M.mipmaps.length:1}function L(P){const M=P.target;M.removeEventListener("dispose",L),S(M),M.isVideoTexture&&u.delete(M),M.isHTMLTexture&&f.delete(M)}function g(P){const M=P.target;M.removeEventListener("dispose",g),y(M)}function S(P){const M=i.get(P);if(M.__webglInit===void 0)return;const X=P.source,U=p.get(X);if(U){const Z=U[M.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&b(P),Object.keys(U).length===0&&p.delete(X)}i.remove(P)}function b(P){const M=i.get(P);n.deleteTexture(M.__webglTexture);const X=P.source,U=p.get(X);delete U[M.__cacheKey],o.memory.textures--}function y(P){const M=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let U=0;U<6;U++){if(Array.isArray(M.__webglFramebuffer[U]))for(let Z=0;Z<M.__webglFramebuffer[U].length;Z++)n.deleteFramebuffer(M.__webglFramebuffer[U][Z]);else n.deleteFramebuffer(M.__webglFramebuffer[U]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[U])}else{if(Array.isArray(M.__webglFramebuffer))for(let U=0;U<M.__webglFramebuffer.length;U++)n.deleteFramebuffer(M.__webglFramebuffer[U]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let U=0;U<M.__webglColorRenderbuffer.length;U++)M.__webglColorRenderbuffer[U]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[U]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const X=P.textures;for(let U=0,Z=X.length;U<Z;U++){const $=i.get(X[U]);$.__webglTexture&&(n.deleteTexture($.__webglTexture),o.memory.textures--),i.remove(X[U])}i.remove(P)}let A=0;function D(){A=0}function H(){return A}function N(P){A=P}function G(){const P=A;return P>=s.maxTextures&&Bt("WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),A+=1,P}function R(P){const M=[];return M.push(P.wrapS),M.push(P.wrapT),M.push(P.wrapR||0),M.push(P.magFilter),M.push(P.minFilter),M.push(P.anisotropy),M.push(P.internalFormat),M.push(P.format),M.push(P.type),M.push(P.generateMipmaps),M.push(P.premultiplyAlpha),M.push(P.flipY),M.push(P.unpackAlignment),M.push(P.colorSpace),M.join()}function O(P,M){const X=i.get(P);if(P.isVideoTexture&&fe(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&X.__version!==P.version){const U=P.image;if(U===null)Bt("WebGLRenderer: Texture marked for update but no image data found.");else if(U.complete===!1)Bt("WebGLRenderer: Texture marked for update but image is incomplete");else{Nt(X,P,M);return}}else P.isExternalTexture&&(X.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,X.__webglTexture,n.TEXTURE0+M)}function B(P,M){const X=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&X.__version!==P.version){Nt(X,P,M);return}else P.isExternalTexture&&(X.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,X.__webglTexture,n.TEXTURE0+M)}function K(P,M){const X=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&X.__version!==P.version){Nt(X,P,M);return}e.bindTexture(n.TEXTURE_3D,X.__webglTexture,n.TEXTURE0+M)}function ht(P,M){const X=i.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&X.__version!==P.version){Ht(X,P,M);return}e.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture,n.TEXTURE0+M)}const rt={[cr]:n.REPEAT,[si]:n.CLAMP_TO_EDGE,[Ya]:n.MIRRORED_REPEAT},st={[Ke]:n.NEAREST,[xf]:n.NEAREST_MIPMAP_NEAREST,[wr]:n.NEAREST_MIPMAP_LINEAR,[nn]:n.LINEAR,[qo]:n.LINEAR_MIPMAP_NEAREST,[Gi]:n.LINEAR_MIPMAP_LINEAR},ut={[bf]:n.NEVER,[wf]:n.ALWAYS,[yf]:n.LESS,[ql]:n.LEQUAL,[Sf]:n.EQUAL,[Yl]:n.GEQUAL,[Ef]:n.GREATER,[Tf]:n.NOTEQUAL};function pt(P,M){if(M.type===On&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===nn||M.magFilter===qo||M.magFilter===wr||M.magFilter===Gi||M.minFilter===nn||M.minFilter===qo||M.minFilter===wr||M.minFilter===Gi)&&Bt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,rt[M.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,rt[M.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,rt[M.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,st[M.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,st[M.minFilter]),M.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,ut[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ke||M.minFilter!==wr&&M.minFilter!==Gi||M.type===On&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const X=t.get("EXT_texture_filter_anisotropic");n.texParameterf(P,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Q(P,M){let X=!1;P.__webglInit===void 0&&(P.__webglInit=!0,M.addEventListener("dispose",L));const U=M.source;let Z=p.get(U);Z===void 0&&(Z={},p.set(U,Z));const $=R(M);if($!==P.__cacheKey){Z[$]===void 0&&(Z[$]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,X=!0),Z[$].usedTimes++;const lt=Z[P.__cacheKey];lt!==void 0&&(Z[P.__cacheKey].usedTimes--,lt.usedTimes===0&&b(M)),P.__cacheKey=$,P.__webglTexture=Z[$].texture}return X}function xt(P,M,X){return Math.floor(Math.floor(P/X)/M)}function mt(P,M,X,U){const $=P.updateRanges;if($.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,M.width,M.height,X,U,M.data);else{$.sort((bt,gt)=>bt.start-gt.start);let lt=0;for(let bt=1;bt<$.length;bt++){const gt=$[lt],ft=$[bt],Ft=gt.start+gt.count,Gt=xt(ft.start,M.width,4),ee=xt(gt.start,M.width,4);ft.start<=Ft+1&&Gt===ee&&xt(ft.start+ft.count-1,M.width,4)===Gt?gt.count=Math.max(gt.count,ft.start+ft.count-gt.start):(++lt,$[lt]=ft)}$.length=lt+1;const j=e.getParameter(n.UNPACK_ROW_LENGTH),nt=e.getParameter(n.UNPACK_SKIP_PIXELS),ct=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,M.width);for(let bt=0,gt=$.length;bt<gt;bt++){const ft=$[bt],Ft=Math.floor(ft.start/4),Gt=Math.ceil(ft.count/4),ee=Ft%M.width,z=Math.floor(Ft/M.width),_t=Gt,it=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,ee),e.pixelStorei(n.UNPACK_SKIP_ROWS,z),e.texSubImage2D(n.TEXTURE_2D,0,ee,z,_t,it,X,U,M.data)}P.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,j),e.pixelStorei(n.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(n.UNPACK_SKIP_ROWS,ct)}}function Nt(P,M,X){let U=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(U=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(U=n.TEXTURE_3D);const Z=Q(P,M),$=M.source;e.bindTexture(U,P.__webglTexture,n.TEXTURE0+X);const lt=i.get($);if($.version!==lt.__version||Z===!0){if(e.activeTexture(n.TEXTURE0+X),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const it=ie.getPrimaries(ie.workingColorSpace),St=M.colorSpace===Ei?null:ie.getPrimaries(M.colorSpace),dt=M.colorSpace===Ei||it===St?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt)}e.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment);let nt=m(M.image,!1,s.maxTextureSize);nt=yt(M,nt);const ct=r.convert(M.format,M.colorSpace),bt=r.convert(M.type);let gt=w(M.internalFormat,ct,bt,M.normalized,M.colorSpace,M.isVideoTexture);pt(U,M);let ft;const Ft=M.mipmaps,Gt=M.isVideoTexture!==!0,ee=lt.__version===void 0||Z===!0,z=$.dataReady,_t=C(M,nt);if(M.isDepthTexture)gt=I(M.format===Vi,M.type),ee&&(Gt?e.texStorage2D(n.TEXTURE_2D,1,gt,nt.width,nt.height):e.texImage2D(n.TEXTURE_2D,0,gt,nt.width,nt.height,0,ct,bt,null));else if(M.isDataTexture)if(Ft.length>0){Gt&&ee&&e.texStorage2D(n.TEXTURE_2D,_t,gt,Ft[0].width,Ft[0].height);for(let it=0,St=Ft.length;it<St;it++)ft=Ft[it],Gt?z&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,ft.width,ft.height,ct,bt,ft.data):e.texImage2D(n.TEXTURE_2D,it,gt,ft.width,ft.height,0,ct,bt,ft.data);M.generateMipmaps=!1}else Gt?(ee&&e.texStorage2D(n.TEXTURE_2D,_t,gt,nt.width,nt.height),z&&mt(M,nt,ct,bt)):e.texImage2D(n.TEXTURE_2D,0,gt,nt.width,nt.height,0,ct,bt,nt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Gt&&ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,_t,gt,Ft[0].width,Ft[0].height,nt.depth);for(let it=0,St=Ft.length;it<St;it++)if(ft=Ft[it],M.format!==Fn)if(ct!==null)if(Gt){if(z)if(M.layerUpdates.size>0){const dt=Mu(ft.width,ft.height,M.format,M.type);for(const tt of M.layerUpdates){const Mt=ft.data.subarray(tt*dt/ft.data.BYTES_PER_ELEMENT,(tt+1)*dt/ft.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,tt,ft.width,ft.height,1,ct,Mt)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,0,ft.width,ft.height,nt.depth,ct,ft.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,it,gt,ft.width,ft.height,nt.depth,0,ft.data,0,0);else Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?z&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,0,ft.width,ft.height,nt.depth,ct,bt,ft.data):e.texImage3D(n.TEXTURE_2D_ARRAY,it,gt,ft.width,ft.height,nt.depth,0,ct,bt,ft.data)}else{Gt&&ee&&e.texStorage2D(n.TEXTURE_2D,_t,gt,Ft[0].width,Ft[0].height);for(let it=0,St=Ft.length;it<St;it++)ft=Ft[it],M.format!==Fn?ct!==null?Gt?z&&e.compressedTexSubImage2D(n.TEXTURE_2D,it,0,0,ft.width,ft.height,ct,ft.data):e.compressedTexImage2D(n.TEXTURE_2D,it,gt,ft.width,ft.height,0,ft.data):Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?z&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,ft.width,ft.height,ct,bt,ft.data):e.texImage2D(n.TEXTURE_2D,it,gt,ft.width,ft.height,0,ct,bt,ft.data)}else if(M.isDataArrayTexture)if(Gt){if(ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,_t,gt,nt.width,nt.height,nt.depth),z)if(M.layerUpdates.size>0){const it=Mu(nt.width,nt.height,M.format,M.type);for(const St of M.layerUpdates){const dt=nt.data.subarray(St*it/nt.data.BYTES_PER_ELEMENT,(St+1)*it/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,St,nt.width,nt.height,1,ct,bt,dt)}M.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,ct,bt,nt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,gt,nt.width,nt.height,nt.depth,0,ct,bt,nt.data);else if(M.isData3DTexture)Gt?(ee&&e.texStorage3D(n.TEXTURE_3D,_t,gt,nt.width,nt.height,nt.depth),z&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,ct,bt,nt.data)):e.texImage3D(n.TEXTURE_3D,0,gt,nt.width,nt.height,nt.depth,0,ct,bt,nt.data);else if(M.isFramebufferTexture){if(ee)if(Gt)e.texStorage2D(n.TEXTURE_2D,_t,gt,nt.width,nt.height);else{let it=nt.width,St=nt.height;for(let dt=0;dt<_t;dt++)e.texImage2D(n.TEXTURE_2D,dt,gt,it,St,0,ct,bt,null),it>>=1,St>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in n){const it=n.canvas;if(it.hasAttribute("layoutsubtree")||it.setAttribute("layoutsubtree","true"),nt.parentNode!==it){it.appendChild(nt),f.add(M),it.onpaint=zt=>{const Ee=zt.changedElements;for(const ae of f)Ee.includes(ae.image)&&(ae.needsUpdate=!0)},it.requestPaint();return}const St=0,dt=n.RGBA,tt=n.RGBA,Mt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,St,dt,tt,Mt,nt),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ft.length>0){if(Gt&&ee){const it=ge(Ft[0]);e.texStorage2D(n.TEXTURE_2D,_t,gt,it.width,it.height)}for(let it=0,St=Ft.length;it<St;it++)ft=Ft[it],Gt?z&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,ct,bt,ft):e.texImage2D(n.TEXTURE_2D,it,gt,ct,bt,ft);M.generateMipmaps=!1}else if(Gt){if(ee){const it=ge(nt);e.texStorage2D(n.TEXTURE_2D,_t,gt,it.width,it.height)}z&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct,bt,nt)}else e.texImage2D(n.TEXTURE_2D,0,gt,ct,bt,nt);h(M)&&v(U),lt.__version=$.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function Ht(P,M,X){if(M.image.length!==6)return;const U=Q(P,M),Z=M.source;e.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+X);const $=i.get(Z);if(Z.version!==$.__version||U===!0){e.activeTexture(n.TEXTURE0+X);const lt=ie.getPrimaries(ie.workingColorSpace),j=M.colorSpace===Ei?null:ie.getPrimaries(M.colorSpace),nt=M.colorSpace===Ei||lt===j?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);const ct=M.isCompressedTexture||M.image[0].isCompressedTexture,bt=M.image[0]&&M.image[0].isDataTexture,gt=[];for(let tt=0;tt<6;tt++)!ct&&!bt?gt[tt]=m(M.image[tt],!0,s.maxCubemapSize):gt[tt]=bt?M.image[tt].image:M.image[tt],gt[tt]=yt(M,gt[tt]);const ft=gt[0],Ft=r.convert(M.format,M.colorSpace),Gt=r.convert(M.type),ee=w(M.internalFormat,Ft,Gt,M.normalized,M.colorSpace),z=M.isVideoTexture!==!0,_t=$.__version===void 0||U===!0,it=Z.dataReady;let St=C(M,ft);pt(n.TEXTURE_CUBE_MAP,M);let dt;if(ct){z&&_t&&e.texStorage2D(n.TEXTURE_CUBE_MAP,St,ee,ft.width,ft.height);for(let tt=0;tt<6;tt++){dt=gt[tt].mipmaps;for(let Mt=0;Mt<dt.length;Mt++){const zt=dt[Mt];M.format!==Fn?Ft!==null?z?it&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt,0,0,zt.width,zt.height,Ft,zt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt,ee,zt.width,zt.height,0,zt.data):Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt,0,0,zt.width,zt.height,Ft,Gt,zt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt,ee,zt.width,zt.height,0,Ft,Gt,zt.data)}}}else{if(dt=M.mipmaps,z&&_t){dt.length>0&&St++;const tt=ge(gt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,St,ee,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(bt){z?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,gt[tt].width,gt[tt].height,Ft,Gt,gt[tt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,ee,gt[tt].width,gt[tt].height,0,Ft,Gt,gt[tt].data);for(let Mt=0;Mt<dt.length;Mt++){const Ee=dt[Mt].image[tt].image;z?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt+1,0,0,Ee.width,Ee.height,Ft,Gt,Ee.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt+1,ee,Ee.width,Ee.height,0,Ft,Gt,Ee.data)}}else{z?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Ft,Gt,gt[tt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,ee,Ft,Gt,gt[tt]);for(let Mt=0;Mt<dt.length;Mt++){const zt=dt[Mt];z?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt+1,0,0,Ft,Gt,zt.image[tt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt+1,ee,Ft,Gt,zt.image[tt])}}}h(M)&&v(n.TEXTURE_CUBE_MAP),$.__version=Z.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function kt(P,M,X,U,Z,$){const lt=r.convert(X.format,X.colorSpace),j=r.convert(X.type),nt=w(X.internalFormat,lt,j,X.normalized,X.colorSpace),ct=i.get(M),bt=i.get(X);if(bt.__renderTarget=M,!ct.__hasExternalTextures){const gt=Math.max(1,M.width>>$),ft=Math.max(1,M.height>>$);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?e.texImage3D(Z,$,nt,gt,ft,M.depth,0,lt,j,null):e.texImage2D(Z,$,nt,gt,ft,0,lt,j,null)}e.bindFramebuffer(n.FRAMEBUFFER,P),Kt(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,U,Z,bt.__webglTexture,0,Ie(M)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,U,Z,bt.__webglTexture,$),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Se(P,M,X){if(n.bindRenderbuffer(n.RENDERBUFFER,P),M.depthBuffer){const U=M.depthTexture,Z=U&&U.isDepthTexture?U.type:null,$=I(M.stencilBuffer,Z),lt=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Kt(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ie(M),$,M.width,M.height):X?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ie(M),$,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,$,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,lt,n.RENDERBUFFER,P)}else{const U=M.textures;for(let Z=0;Z<U.length;Z++){const $=U[Z],lt=r.convert($.format,$.colorSpace),j=r.convert($.type),nt=w($.internalFormat,lt,j,$.normalized,$.colorSpace);Kt(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ie(M),nt,M.width,M.height):X?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ie(M),nt,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,nt,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Jt(P,M,X){const U=M.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,P),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=i.get(M.depthTexture);if(Z.__renderTarget=M,(!Z.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),U){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,M.depthTexture.addEventListener("dispose",L)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),pt(n.TEXTURE_CUBE_MAP,M.depthTexture);const ct=r.convert(M.depthTexture.format),bt=r.convert(M.depthTexture.type);let gt;M.depthTexture.format===ui?gt=n.DEPTH_COMPONENT24:M.depthTexture.format===Vi&&(gt=n.DEPTH24_STENCIL8);for(let ft=0;ft<6;ft++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,gt,M.width,M.height,0,ct,bt,null)}}else O(M.depthTexture,0);const $=Z.__webglTexture,lt=Ie(M),j=U?n.TEXTURE_CUBE_MAP_POSITIVE_X+X:n.TEXTURE_2D,nt=M.depthTexture.format===Vi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(M.depthTexture.format===ui)Kt(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,nt,j,$,0,lt):n.framebufferTexture2D(n.FRAMEBUFFER,nt,j,$,0);else if(M.depthTexture.format===Vi)Kt(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,nt,j,$,0,lt):n.framebufferTexture2D(n.FRAMEBUFFER,nt,j,$,0);else throw new Error("Unknown depthTexture format")}function de(P){const M=i.get(P),X=P.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==P.depthTexture){const U=P.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),U){const Z=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,U.removeEventListener("dispose",Z)};U.addEventListener("dispose",Z),M.__depthDisposeCallback=Z}M.__boundDepthTexture=U}if(P.depthTexture&&!M.__autoAllocateDepthBuffer)if(X)for(let U=0;U<6;U++)Jt(M.__webglFramebuffer[U],P,U);else{const U=P.texture.mipmaps;U&&U.length>0?Jt(M.__webglFramebuffer[0],P,0):Jt(M.__webglFramebuffer,P,0)}else if(X){M.__webglDepthbuffer=[];for(let U=0;U<6;U++)if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[U]),M.__webglDepthbuffer[U]===void 0)M.__webglDepthbuffer[U]=n.createRenderbuffer(),Se(M.__webglDepthbuffer[U],P,!1);else{const Z=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=M.__webglDepthbuffer[U];n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,$)}}else{const U=P.texture.mipmaps;if(U&&U.length>0?e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),Se(M.__webglDepthbuffer,P,!1);else{const Z=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,$)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function he(P,M,X){const U=i.get(P);M!==void 0&&kt(U.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),X!==void 0&&de(P)}function Wt(P){const M=P.texture,X=i.get(P),U=i.get(M);P.addEventListener("dispose",g);const Z=P.textures,$=P.isWebGLCubeRenderTarget===!0,lt=Z.length>1;if(lt||(U.__webglTexture===void 0&&(U.__webglTexture=n.createTexture()),U.__version=M.version,o.memory.textures++),$){X.__webglFramebuffer=[];for(let j=0;j<6;j++)if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer[j]=[];for(let nt=0;nt<M.mipmaps.length;nt++)X.__webglFramebuffer[j][nt]=n.createFramebuffer()}else X.__webglFramebuffer[j]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer=[];for(let j=0;j<M.mipmaps.length;j++)X.__webglFramebuffer[j]=n.createFramebuffer()}else X.__webglFramebuffer=n.createFramebuffer();if(lt)for(let j=0,nt=Z.length;j<nt;j++){const ct=i.get(Z[j]);ct.__webglTexture===void 0&&(ct.__webglTexture=n.createTexture(),o.memory.textures++)}if(P.samples>0&&Kt(P)===!1){X.__webglMultisampledFramebuffer=n.createFramebuffer(),X.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let j=0;j<Z.length;j++){const nt=Z[j];X.__webglColorRenderbuffer[j]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,X.__webglColorRenderbuffer[j]);const ct=r.convert(nt.format,nt.colorSpace),bt=r.convert(nt.type),gt=w(nt.internalFormat,ct,bt,nt.normalized,nt.colorSpace,P.isXRRenderTarget===!0),ft=Ie(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,ft,gt,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,X.__webglColorRenderbuffer[j])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(X.__webglDepthRenderbuffer=n.createRenderbuffer(),Se(X.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){e.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture),pt(n.TEXTURE_CUBE_MAP,M);for(let j=0;j<6;j++)if(M.mipmaps&&M.mipmaps.length>0)for(let nt=0;nt<M.mipmaps.length;nt++)kt(X.__webglFramebuffer[j][nt],P,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,nt);else kt(X.__webglFramebuffer[j],P,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);h(M)&&v(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){for(let j=0,nt=Z.length;j<nt;j++){const ct=Z[j],bt=i.get(ct);let gt=n.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(gt=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(gt,bt.__webglTexture),pt(gt,ct),kt(X.__webglFramebuffer,P,ct,n.COLOR_ATTACHMENT0+j,gt,0),h(ct)&&v(gt)}e.unbindTexture()}else{let j=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(j=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(j,U.__webglTexture),pt(j,M),M.mipmaps&&M.mipmaps.length>0)for(let nt=0;nt<M.mipmaps.length;nt++)kt(X.__webglFramebuffer[nt],P,M,n.COLOR_ATTACHMENT0,j,nt);else kt(X.__webglFramebuffer,P,M,n.COLOR_ATTACHMENT0,j,0);h(M)&&v(j),e.unbindTexture()}P.depthBuffer&&de(P)}function Pe(P){const M=P.textures;for(let X=0,U=M.length;X<U;X++){const Z=M[X];if(h(Z)){const $=T(P),lt=i.get(Z).__webglTexture;e.bindTexture($,lt),v($),e.unbindTexture()}}}const be=[],Je=[];function k(P){if(P.samples>0){if(Kt(P)===!1){const M=P.textures,X=P.width,U=P.height;let Z=n.COLOR_BUFFER_BIT;const $=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=i.get(P),j=M.length>1;if(j)for(let ct=0;ct<M.length;ct++)e.bindFramebuffer(n.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,lt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);const nt=P.texture.mipmaps;nt&&nt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let ct=0;ct<M.length;ct++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),j){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,lt.__webglColorRenderbuffer[ct]);const bt=i.get(M[ct]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,bt,0)}n.blitFramebuffer(0,0,X,U,0,0,X,U,Z,n.NEAREST),c===!0&&(be.length=0,Je.length=0,be.push(n.COLOR_ATTACHMENT0+ct),P.depthBuffer&&P.resolveDepthBuffer===!1&&(be.push($),Je.push($),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Je)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,be))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),j)for(let ct=0;ct<M.length;ct++){e.bindFramebuffer(n.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,lt.__webglColorRenderbuffer[ct]);const bt=i.get(M[ct]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,lt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.TEXTURE_2D,bt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const M=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function Ie(P){return Math.min(s.maxSamples,P.samples)}function Kt(P){const M=i.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function fe(P){const M=o.render.frame;u.get(P)!==M&&(u.set(P,M),P.update())}function yt(P,M){const X=P.colorSpace,U=P.format,Z=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||X!==bo&&X!==Ei&&(ie.getTransfer(X)===pe?(U!==Fn||Z!==xn)&&Bt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):se("WebGLTextures: Unsupported texture color space:",X)),M}function ge(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=D,this.getTextureUnits=H,this.setTextureUnits=N,this.setTexture2D=O,this.setTexture2DArray=B,this.setTexture3D=K,this.setTextureCube=ht,this.rebindTextures=he,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=Pe,this.updateMultisampleRenderTarget=k,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=kt,this.useMultisampledRTT=Kt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function gx(n,t){function e(i,s=Ei){let r;const o=ie.getTransfer(s);if(i===xn)return n.UNSIGNED_BYTE;if(i===Hl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Gl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Od)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Fd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Nd)return n.BYTE;if(i===Ud)return n.SHORT;if(i===ur)return n.UNSIGNED_SHORT;if(i===kl)return n.INT;if(i===Yn)return n.UNSIGNED_INT;if(i===On)return n.FLOAT;if(i===ci)return n.HALF_FLOAT;if(i===zd)return n.ALPHA;if(i===Bd)return n.RGB;if(i===Fn)return n.RGBA;if(i===ui)return n.DEPTH_COMPONENT;if(i===Vi)return n.DEPTH_STENCIL;if(i===Vl)return n.RED;if(i===Wl)return n.RED_INTEGER;if(i===Yi)return n.RG;if(i===Xl)return n.RG_INTEGER;if(i===$l)return n.RGBA_INTEGER;if(i===co||i===uo||i===ho||i===fo)if(o===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===co)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===co)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===uo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ho)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ja||i===Ka||i===Za||i===Ja)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ja)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ka)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Za)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ja)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Qa||i===tl||i===el||i===nl||i===il||i===xo||i===sl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Qa||i===tl)return o===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===el)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===nl)return r.COMPRESSED_R11_EAC;if(i===il)return r.COMPRESSED_SIGNED_R11_EAC;if(i===xo)return r.COMPRESSED_RG11_EAC;if(i===sl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===rl||i===ol||i===al||i===ll||i===cl||i===ul||i===dl||i===hl||i===fl||i===pl||i===ml||i===gl||i===_l||i===xl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===rl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ol)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===al)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ll)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===cl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ul)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===dl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===hl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===fl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===pl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ml)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===gl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===_l)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===xl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===vl||i===Ml||i===bl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===vl)return o===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ml)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===bl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===yl||i===Sl||i===vo||i===El)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===yl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Sl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===vo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===El)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===dr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const _x=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,xx=`
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

}`;class vx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Yd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new jn({vertexShader:_x,fragmentShader:xx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Xt(new Ps(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Mx extends Li{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,d=null,p=null,_=null;const x=typeof XRWebGLBinding<"u",m=new vx,h={},v=e.getContextAttributes();let T=null,w=null;const I=[],C=[],L=new Ut;let g=null;const S=new hn;S.viewport=new Oe;const b=new hn;b.viewport=new Oe;const y=[S,b],A=new Cp;let D=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let xt=I[Q];return xt===void 0&&(xt=new Qo,I[Q]=xt),xt.getTargetRaySpace()},this.getControllerGrip=function(Q){let xt=I[Q];return xt===void 0&&(xt=new Qo,I[Q]=xt),xt.getGripSpace()},this.getHand=function(Q){let xt=I[Q];return xt===void 0&&(xt=new Qo,I[Q]=xt),xt.getHandSpace()};function N(Q){const xt=C.indexOf(Q.inputSource);if(xt===-1)return;const mt=I[xt];mt!==void 0&&(mt.update(Q.inputSource,Q.frame,l||o),mt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function G(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",R);for(let Q=0;Q<I.length;Q++){const xt=C[Q];xt!==null&&(C[Q]=null,I[Q].disconnect(xt))}D=null,H=null,m.reset();for(const Q in h)delete h[Q];t.setRenderTarget(T),p=null,d=null,f=null,s=null,w=null,pt.stop(),i.isPresenting=!1,t.setPixelRatio(g),t.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,i.isPresenting===!0&&Bt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,i.isPresenting===!0&&Bt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",G),s.addEventListener("inputsourceschange",R),v.xrCompatible!==!0&&await e.makeXRCompatible(),g=t.getPixelRatio(),t.getSize(L),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let mt=null,Nt=null,Ht=null;v.depth&&(Ht=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=v.stencil?Vi:ui,Nt=v.stencil?dr:Yn);const kt={colorFormat:e.RGBA8,depthFormat:Ht,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(kt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),w=new qn(d.textureWidth,d.textureHeight,{format:Fn,type:xn,depthTexture:new Cs(d.textureWidth,d.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const mt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,mt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),w=new qn(p.framebufferWidth,p.framebufferHeight,{format:Fn,type:xn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),pt.setContext(s),pt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function R(Q){for(let xt=0;xt<Q.removed.length;xt++){const mt=Q.removed[xt],Nt=C.indexOf(mt);Nt>=0&&(C[Nt]=null,I[Nt].disconnect(mt))}for(let xt=0;xt<Q.added.length;xt++){const mt=Q.added[xt];let Nt=C.indexOf(mt);if(Nt===-1){for(let kt=0;kt<I.length;kt++)if(kt>=C.length){C.push(mt),Nt=kt;break}else if(C[kt]===null){C[kt]=mt,Nt=kt;break}if(Nt===-1)break}const Ht=I[Nt];Ht&&Ht.connect(mt)}}const O=new F,B=new F;function K(Q,xt,mt){O.setFromMatrixPosition(xt.matrixWorld),B.setFromMatrixPosition(mt.matrixWorld);const Nt=O.distanceTo(B),Ht=xt.projectionMatrix.elements,kt=mt.projectionMatrix.elements,Se=Ht[14]/(Ht[10]-1),Jt=Ht[14]/(Ht[10]+1),de=(Ht[9]+1)/Ht[5],he=(Ht[9]-1)/Ht[5],Wt=(Ht[8]-1)/Ht[0],Pe=(kt[8]+1)/kt[0],be=Se*Wt,Je=Se*Pe,k=Nt/(-Wt+Pe),Ie=k*-Wt;if(xt.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Ie),Q.translateZ(k),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Ht[10]===-1)Q.projectionMatrix.copy(xt.projectionMatrix),Q.projectionMatrixInverse.copy(xt.projectionMatrixInverse);else{const Kt=Se+k,fe=Jt+k,yt=be-Ie,ge=Je+(Nt-Ie),P=de*Jt/fe*Kt,M=he*Jt/fe*Kt;Q.projectionMatrix.makePerspective(yt,ge,P,M,Kt,fe),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function ht(Q,xt){xt===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(xt.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let xt=Q.near,mt=Q.far;m.texture!==null&&(m.depthNear>0&&(xt=m.depthNear),m.depthFar>0&&(mt=m.depthFar)),A.near=b.near=S.near=xt,A.far=b.far=S.far=mt,(D!==A.near||H!==A.far)&&(s.updateRenderState({depthNear:A.near,depthFar:A.far}),D=A.near,H=A.far),A.layers.mask=Q.layers.mask|6,S.layers.mask=A.layers.mask&-5,b.layers.mask=A.layers.mask&-3;const Nt=Q.parent,Ht=A.cameras;ht(A,Nt);for(let kt=0;kt<Ht.length;kt++)ht(Ht[kt],Nt);Ht.length===2?K(A,S,b):A.projectionMatrix.copy(S.projectionMatrix),rt(Q,A,Nt)};function rt(Q,xt,mt){mt===null?Q.matrix.copy(xt.matrixWorld):(Q.matrix.copy(mt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(xt.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(xt.projectionMatrix),Q.projectionMatrixInverse.copy(xt.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=fr*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(Q){c=Q,d!==null&&(d.fixedFoveation=Q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(A)},this.getCameraTexture=function(Q){return h[Q]};let st=null;function ut(Q,xt){if(u=xt.getViewerPose(l||o),_=xt,u!==null){const mt=u.views;p!==null&&(t.setRenderTargetFramebuffer(w,p.framebuffer),t.setRenderTarget(w));let Nt=!1;mt.length!==A.cameras.length&&(A.cameras.length=0,Nt=!0);for(let Jt=0;Jt<mt.length;Jt++){const de=mt[Jt];let he=null;if(p!==null)he=p.getViewport(de);else{const Pe=f.getViewSubImage(d,de);he=Pe.viewport,Jt===0&&(t.setRenderTargetTextures(w,Pe.colorTexture,Pe.depthStencilTexture),t.setRenderTarget(w))}let Wt=y[Jt];Wt===void 0&&(Wt=new hn,Wt.layers.enable(Jt),Wt.viewport=new Oe,y[Jt]=Wt),Wt.matrix.fromArray(de.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(de.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(he.x,he.y,he.width,he.height),Jt===0&&(A.matrix.copy(Wt.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),Nt===!0&&A.cameras.push(Wt)}const Ht=s.enabledFeatures;if(Ht&&Ht.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const Jt=f.getDepthInformation(mt[0]);Jt&&Jt.isValid&&Jt.texture&&m.init(Jt,s.renderState)}if(Ht&&Ht.includes("camera-access")&&x){t.state.unbindTexture(),f=i.getBinding();for(let Jt=0;Jt<mt.length;Jt++){const de=mt[Jt].camera;if(de){let he=h[de];he||(he=new Yd,h[de]=he);const Wt=f.getCameraImage(de);he.sourceTexture=Wt}}}}for(let mt=0;mt<I.length;mt++){const Nt=C[mt],Ht=I[mt];Nt!==null&&Ht!==void 0&&Ht.update(Nt,xt,l||o)}st&&st(Q,xt),xt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:xt}),_=null}const pt=new nh;pt.setAnimationLoop(ut),this.setAnimationLoop=function(Q){st=Q},this.dispose=function(){}}}const bx=new me,ch=new $t;ch.set(-1,0,0,0,1,0,0,0,1);function yx(n,t){function e(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,jd(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function s(m,h,v,T,w){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(m,h):h.isMeshLambertMaterial?(r(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(m,h),f(m,h)):h.isMeshPhongMaterial?(r(m,h),u(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(m,h),d(m,h),h.isMeshPhysicalMaterial&&p(m,h,w)):h.isMeshMatcapMaterial?(r(m,h),_(m,h)):h.isMeshDepthMaterial?r(m,h):h.isMeshDistanceMaterial?(r(m,h),x(m,h)):h.isMeshNormalMaterial?r(m,h):h.isLineBasicMaterial?(o(m,h),h.isLineDashedMaterial&&a(m,h)):h.isPointsMaterial?c(m,h,v,T):h.isSpriteMaterial?l(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,e(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===un&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,e(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===un&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,e(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,e(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const v=t.get(h),T=v.envMap,w=v.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4(bx.makeRotationFromEuler(w)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(ch),m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,m.aoMapTransform))}function o(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform))}function a(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function c(m,h,v,T){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*v,m.scale.value=T*.5,h.map&&(m.map.value=h.map,e(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function l(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function f(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function d(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,v){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===un&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,h){h.matcap&&(m.matcap.value=h.matcap)}function x(m,h){const v=t.get(h).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Sx(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,T){const w=T.program;i.uniformBlockBinding(v,w)}function l(v,T){let w=s[v.id];w===void 0&&(_(v),w=u(v),s[v.id]=w,v.addEventListener("dispose",m));const I=T.program;i.updateUBOMapping(v,I);const C=t.render.frame;r[v.id]!==C&&(d(v),r[v.id]=C)}function u(v){const T=f();v.__bindingPointIndex=T;const w=n.createBuffer(),I=v.__size,C=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,I,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,w),w}function f(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return se("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const T=s[v.id],w=v.uniforms,I=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let C=0,L=w.length;C<L;C++){const g=Array.isArray(w[C])?w[C]:[w[C]];for(let S=0,b=g.length;S<b;S++){const y=g[S];if(p(y,C,S,I)===!0){const A=y.__offset,D=Array.isArray(y.value)?y.value:[y.value];let H=0;for(let N=0;N<D.length;N++){const G=D[N],R=x(G);typeof G=="number"||typeof G=="boolean"?(y.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,A+H,y.__data)):G.isMatrix3?(y.__data[0]=G.elements[0],y.__data[1]=G.elements[1],y.__data[2]=G.elements[2],y.__data[3]=0,y.__data[4]=G.elements[3],y.__data[5]=G.elements[4],y.__data[6]=G.elements[5],y.__data[7]=0,y.__data[8]=G.elements[6],y.__data[9]=G.elements[7],y.__data[10]=G.elements[8],y.__data[11]=0):ArrayBuffer.isView(G)?y.__data.set(new G.constructor(G.buffer,G.byteOffset,y.__data.length)):(G.toArray(y.__data,H),H+=R.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,A,y.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(v,T,w,I){const C=v.value,L=T+"_"+w;if(I[L]===void 0)return typeof C=="number"||typeof C=="boolean"?I[L]=C:ArrayBuffer.isView(C)?I[L]=C.slice():I[L]=C.clone(),!0;{const g=I[L];if(typeof C=="number"||typeof C=="boolean"){if(g!==C)return I[L]=C,!0}else{if(ArrayBuffer.isView(C))return!0;if(g.equals(C)===!1)return g.copy(C),!0}}return!1}function _(v){const T=v.uniforms;let w=0;const I=16;for(let L=0,g=T.length;L<g;L++){const S=Array.isArray(T[L])?T[L]:[T[L]];for(let b=0,y=S.length;b<y;b++){const A=S[b],D=Array.isArray(A.value)?A.value:[A.value];for(let H=0,N=D.length;H<N;H++){const G=D[H],R=x(G),O=w%I,B=O%R.boundary,K=O+B;w+=B,K!==0&&I-K<R.storage&&(w+=I-K),A.__data=new Float32Array(R.storage/Float32Array.BYTES_PER_ELEMENT),A.__offset=w,w+=R.storage}}}const C=w%I;return C>0&&(w+=I-C),v.__size=w,v.__cache={},this}function x(v){const T={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(T.boundary=4,T.storage=4):v.isVector2?(T.boundary=8,T.storage=8):v.isVector3||v.isColor?(T.boundary=16,T.storage=12):v.isVector4?(T.boundary=16,T.storage=16):v.isMatrix3?(T.boundary=48,T.storage=48):v.isMatrix4?(T.boundary=64,T.storage=64):v.isTexture?Bt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(T.boundary=16,T.storage=v.byteLength):Bt("WebGLRenderer: Unsupported uniform value type.",v),T}function m(v){const T=v.target;T.removeEventListener("dispose",m);const w=o.indexOf(T.__bindingPointIndex);o.splice(w,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function h(){for(const v in s)n.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:h}}const Ex=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Vn=null;function Tx(){return Vn===null&&(Vn=new Xd(Ex,16,16,Yi,ci),Vn.name="DFG_LUT",Vn.minFilter=nn,Vn.magFilter=nn,Vn.wrapS=si,Vn.wrapT=si,Vn.generateMipmaps=!1,Vn.needsUpdate=!0),Vn}class uh{constructor(t={}){const{canvas:e=Rf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:p=xn}=t;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=o;const x=p,m=new Set([$l,Xl,Wl]),h=new Set([xn,Yn,ur,dr,Hl,Gl]),v=new Uint32Array(4),T=new Int32Array(4),w=new F;let I=null,C=null;const L=[],g=[];let S=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let y=!1,A=null;this._outputColorSpace=qe;let D=0,H=0,N=null,G=-1,R=null;const O=new Oe,B=new Oe;let K=null;const ht=new Ot(0);let rt=0,st=e.width,ut=e.height,pt=1,Q=null,xt=null;const mt=new Oe(0,0,st,ut),Nt=new Oe(0,0,st,ut);let Ht=!1;const kt=new tc;let Se=!1,Jt=!1;const de=new me,he=new F,Wt=new Oe,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let be=!1;function Je(){return N===null?pt:1}let k=i;function Ie(E,V){return e.getContext(E,V)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${zl}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",zt,!1),k===null){const V="webgl2";if(k=Ie(V,E),k===null)throw Ie(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw se("WebGLRenderer: "+E.message),E}let Kt,fe,yt,ge,P,M,X,U,Z,$,lt,j,nt,ct,bt,gt,ft,Ft,Gt,ee,z,_t,it;function St(){Kt=new Tg(k),Kt.init(),z=new gx(k,Kt),fe=new _g(k,Kt,t,z),yt=new px(k,Kt),fe.reversedDepthBuffer&&d&&yt.buffers.depth.setReversed(!0),ge=new Rg(k),P=new tx,M=new mx(k,Kt,yt,P,fe,z,ge),X=new Eg(b),U=new Dp(k),_t=new mg(k,U),Z=new wg(k,U,ge,_t),$=new Pg(k,Z,U,_t,ge),Ft=new Cg(k,fe,M),bt=new xg(P),lt=new Q_(b,X,Kt,fe,_t,bt),j=new yx(b,P),nt=new nx,ct=new lx(Kt),ft=new pg(b,X,yt,$,_,c),gt=new fx(b,$,fe),it=new Sx(k,ge,fe,yt),Gt=new gg(k,Kt,ge),ee=new Ag(k,Kt,ge),ge.programs=lt.programs,b.capabilities=fe,b.extensions=Kt,b.properties=P,b.renderLists=nt,b.shadowMap=gt,b.state=yt,b.info=ge}St(),x!==xn&&(S=new Dg(x,e.width,e.height,s,r));const dt=new Mx(b,k);this.xr=dt,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const E=Kt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Kt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return pt},this.setPixelRatio=function(E){E!==void 0&&(pt=E,this.setSize(st,ut,!1))},this.getSize=function(E){return E.set(st,ut)},this.setSize=function(E,V,J=!0){if(dt.isPresenting){Bt("WebGLRenderer: Can't change size while VR device is presenting.");return}st=E,ut=V,e.width=Math.floor(E*pt),e.height=Math.floor(V*pt),J===!0&&(e.style.width=E+"px",e.style.height=V+"px"),S!==null&&S.setSize(e.width,e.height),this.setViewport(0,0,E,V)},this.getDrawingBufferSize=function(E){return E.set(st*pt,ut*pt).floor()},this.setDrawingBufferSize=function(E,V,J){st=E,ut=V,pt=J,e.width=Math.floor(E*J),e.height=Math.floor(V*J),this.setViewport(0,0,E,V)},this.setEffects=function(E){if(x===xn){se("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let V=0;V<E.length;V++)if(E[V].isOutputPass===!0){Bt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(O)},this.getViewport=function(E){return E.copy(mt)},this.setViewport=function(E,V,J,q){E.isVector4?mt.set(E.x,E.y,E.z,E.w):mt.set(E,V,J,q),yt.viewport(O.copy(mt).multiplyScalar(pt).round())},this.getScissor=function(E){return E.copy(Nt)},this.setScissor=function(E,V,J,q){E.isVector4?Nt.set(E.x,E.y,E.z,E.w):Nt.set(E,V,J,q),yt.scissor(B.copy(Nt).multiplyScalar(pt).round())},this.getScissorTest=function(){return Ht},this.setScissorTest=function(E){yt.setScissorTest(Ht=E)},this.setOpaqueSort=function(E){Q=E},this.setTransparentSort=function(E){xt=E},this.getClearColor=function(E){return E.copy(ft.getClearColor())},this.setClearColor=function(){ft.setClearColor(...arguments)},this.getClearAlpha=function(){return ft.getClearAlpha()},this.setClearAlpha=function(){ft.setClearAlpha(...arguments)},this.clear=function(E=!0,V=!0,J=!0){let q=0;if(E){let Y=!1;if(N!==null){const Rt=N.texture.format;Y=m.has(Rt)}if(Y){const Rt=N.texture.type,Pt=h.has(Rt),At=ft.getClearColor(),Lt=ft.getClearAlpha(),Dt=At.r,qt=At.g,Zt=At.b;Pt?(v[0]=Dt,v[1]=qt,v[2]=Zt,v[3]=Lt,k.clearBufferuiv(k.COLOR,0,v)):(T[0]=Dt,T[1]=qt,T[2]=Zt,T[3]=Lt,k.clearBufferiv(k.COLOR,0,T))}else q|=k.COLOR_BUFFER_BIT}V&&(q|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(q|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&k.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),A=E},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",zt,!1),ft.dispose(),nt.dispose(),ct.dispose(),P.dispose(),X.dispose(),$.dispose(),_t.dispose(),it.dispose(),lt.dispose(),dt.dispose(),dt.removeEventListener("sessionstart",yr),dt.removeEventListener("sessionend",Sr),Di.stop()};function tt(E){E.preventDefault(),Vc("WebGLRenderer: Context Lost."),y=!0}function Mt(){Vc("WebGLRenderer: Context Restored."),y=!1;const E=ge.autoReset,V=gt.enabled,J=gt.autoUpdate,q=gt.needsUpdate,Y=gt.type;St(),ge.autoReset=E,gt.enabled=V,gt.autoUpdate=J,gt.needsUpdate=q,gt.type=Y}function zt(E){se("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Ee(E){const V=E.target;V.removeEventListener("dispose",Ee),ae(V)}function ae(E){Ln(E),P.remove(E)}function Ln(E){const V=P.get(E).programs;V!==void 0&&(V.forEach(function(J){lt.releaseProgram(J)}),E.isShaderMaterial&&lt.releaseShaderCache(E))}this.renderBufferDirect=function(E,V,J,q,Y,Rt){V===null&&(V=Pe);const Pt=Y.isMesh&&Y.matrixWorld.determinant()<0,At=Gh(E,V,J,q,Y);yt.setMaterial(q,Pt);let Lt=J.index,Dt=1;if(q.wireframe===!0){if(Lt=Z.getWireframeAttribute(J),Lt===void 0)return;Dt=2}const qt=J.drawRange,Zt=J.attributes.position;let It=qt.start*Dt,_e=(qt.start+qt.count)*Dt;Rt!==null&&(It=Math.max(It,Rt.start*Dt),_e=Math.min(_e,(Rt.start+Rt.count)*Dt)),Lt!==null?(It=Math.max(It,0),_e=Math.min(_e,Lt.count)):Zt!=null&&(It=Math.max(It,0),_e=Math.min(_e,Zt.count));const Fe=_e-It;if(Fe<0||Fe===1/0)return;_t.setup(Y,q,At,J,Lt);let Ne,ve=Gt;if(Lt!==null&&(Ne=U.get(Lt),ve=ee,ve.setIndex(Ne)),Y.isMesh)q.wireframe===!0?(yt.setLineWidth(q.wireframeLinewidth*Je()),ve.setMode(k.LINES)):ve.setMode(k.TRIANGLES);else if(Y.isLine){let Qe=q.linewidth;Qe===void 0&&(Qe=1),yt.setLineWidth(Qe*Je()),Y.isLineSegments?ve.setMode(k.LINES):Y.isLineLoop?ve.setMode(k.LINE_LOOP):ve.setMode(k.LINE_STRIP)}else Y.isPoints?ve.setMode(k.POINTS):Y.isSprite&&ve.setMode(k.TRIANGLES);if(Y.isBatchedMesh)if(Kt.get("WEBGL_multi_draw"))ve.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const Qe=Y._multiDrawStarts,Ct=Y._multiDrawCounts,pn=Y._multiDrawCount,le=Lt?U.get(Lt).bytesPerElement:1,Tn=P.get(q).currentProgram.getUniforms();for(let Hn=0;Hn<pn;Hn++)Tn.setValue(k,"_gl_DrawID",Hn),ve.render(Qe[Hn]/le,Ct[Hn])}else if(Y.isInstancedMesh)ve.renderInstances(It,Fe,Y.count);else if(J.isInstancedBufferGeometry){const Qe=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ct=Math.min(J.instanceCount,Qe);ve.renderInstances(It,Fe,Ct)}else ve.render(It,Fe)};function Ae(E,V,J){E.transparent===!0&&E.side===ii&&E.forceSinglePass===!1?(E.side=un,E.needsUpdate=!0,Tr(E,V,J),E.side=Ci,E.needsUpdate=!0,Tr(E,V,J),E.side=ii):Tr(E,V,J)}this.compile=function(E,V,J=null){J===null&&(J=E),C=ct.get(J),C.init(V),g.push(C),J.traverseVisible(function(Y){Y.isLight&&Y.layers.test(V.layers)&&(C.pushLight(Y),Y.castShadow&&C.pushShadow(Y))}),E!==J&&E.traverseVisible(function(Y){Y.isLight&&Y.layers.test(V.layers)&&(C.pushLight(Y),Y.castShadow&&C.pushShadow(Y))}),C.setupLights();const q=new Set;return E.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const Rt=Y.material;if(Rt)if(Array.isArray(Rt))for(let Pt=0;Pt<Rt.length;Pt++){const At=Rt[Pt];Ae(At,J,Y),q.add(At)}else Ae(Rt,J,Y),q.add(Rt)}),C=g.pop(),q},this.compileAsync=function(E,V,J=null){const q=this.compile(E,V,J);return new Promise(Y=>{function Rt(){if(q.forEach(function(Pt){P.get(Pt).currentProgram.isReady()&&q.delete(Pt)}),q.size===0){Y(E);return}setTimeout(Rt,10)}Kt.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let En=null;function Vo(E){En&&En(E)}function yr(){Di.stop()}function Sr(){Di.start()}const Di=new nh;Di.setAnimationLoop(Vo),typeof self<"u"&&Di.setContext(self),this.setAnimationLoop=function(E){En=E,dt.setAnimationLoop(E),E===null?Di.stop():Di.start()},dt.addEventListener("sessionstart",yr),dt.addEventListener("sessionend",Sr),this.render=function(E,V){if(V!==void 0&&V.isCamera!==!0){se("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;A!==null&&A.renderStart(E,V);const J=dt.enabled===!0&&dt.isPresenting===!0,q=S!==null&&(N===null||J)&&S.begin(b,N);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),dt.enabled===!0&&dt.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(dt.cameraAutoUpdate===!0&&dt.updateCamera(V),V=dt.getCamera()),E.isScene===!0&&E.onBeforeRender(b,E,V,N),C=ct.get(E,g.length),C.init(V),C.state.textureUnits=M.getTextureUnits(),g.push(C),de.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),kt.setFromProjectionMatrix(de,Xn,V.reversedDepth),Jt=this.localClippingEnabled,Se=bt.init(this.clippingPlanes,Jt),I=nt.get(E,L.length),I.init(),L.push(I),dt.enabled===!0&&dt.isPresenting===!0){const Pt=b.xr.getDepthSensingMesh();Pt!==null&&Wo(Pt,V,-1/0,b.sortObjects)}Wo(E,V,0,b.sortObjects),I.finish(),b.sortObjects===!0&&I.sort(Q,xt),be=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,be&&ft.addToRenderList(I,E),this.info.render.frame++,Se===!0&&bt.beginShadows();const Y=C.state.shadowsArray;if(gt.render(Y,E,V),Se===!0&&bt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(q&&S.hasRenderPass())===!1){const Pt=I.opaque,At=I.transmissive;if(C.setupLights(),V.isArrayCamera){const Lt=V.cameras;if(At.length>0)for(let Dt=0,qt=Lt.length;Dt<qt;Dt++){const Zt=Lt[Dt];Pc(Pt,At,E,Zt)}be&&ft.render(E);for(let Dt=0,qt=Lt.length;Dt<qt;Dt++){const Zt=Lt[Dt];Cc(I,E,Zt,Zt.viewport)}}else At.length>0&&Pc(Pt,At,E,V),be&&ft.render(E),Cc(I,E,V)}N!==null&&H===0&&(M.updateMultisampleRenderTarget(N),M.updateRenderTargetMipmap(N)),q&&S.end(b),E.isScene===!0&&E.onAfterRender(b,E,V),_t.resetDefaultState(),G=-1,R=null,g.pop(),g.length>0?(C=g[g.length-1],M.setTextureUnits(C.state.textureUnits),Se===!0&&bt.setGlobalState(b.clippingPlanes,C.state.camera)):C=null,L.pop(),L.length>0?I=L[L.length-1]:I=null,A!==null&&A.renderEnd()};function Wo(E,V,J,q){if(E.visible===!1)return;if(E.layers.test(V.layers)){if(E.isGroup)J=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(V);else if(E.isLightProbeGrid)C.pushLightProbeGrid(E);else if(E.isLight)C.pushLight(E),E.castShadow&&C.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||kt.intersectsSprite(E)){q&&Wt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(de);const Pt=$.update(E),At=E.material;At.visible&&I.push(E,Pt,At,J,Wt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||kt.intersectsObject(E))){const Pt=$.update(E),At=E.material;if(q&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Wt.copy(E.boundingSphere.center)):(Pt.boundingSphere===null&&Pt.computeBoundingSphere(),Wt.copy(Pt.boundingSphere.center)),Wt.applyMatrix4(E.matrixWorld).applyMatrix4(de)),Array.isArray(At)){const Lt=Pt.groups;for(let Dt=0,qt=Lt.length;Dt<qt;Dt++){const Zt=Lt[Dt],It=At[Zt.materialIndex];It&&It.visible&&I.push(E,Pt,It,J,Wt.z,Zt)}}else At.visible&&I.push(E,Pt,At,J,Wt.z,null)}}const Rt=E.children;for(let Pt=0,At=Rt.length;Pt<At;Pt++)Wo(Rt[Pt],V,J,q)}function Cc(E,V,J,q){const{opaque:Y,transmissive:Rt,transparent:Pt}=E;C.setupLightsView(J),Se===!0&&bt.setGlobalState(b.clippingPlanes,J),q&&yt.viewport(O.copy(q)),Y.length>0&&Er(Y,V,J),Rt.length>0&&Er(Rt,V,J),Pt.length>0&&Er(Pt,V,J),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function Pc(E,V,J,q){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[q.id]===void 0){const It=Kt.has("EXT_color_buffer_half_float")||Kt.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[q.id]=new qn(1,1,{generateMipmaps:!0,type:It?ci:xn,minFilter:Gi,samples:Math.max(4,fe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ie.workingColorSpace})}const Rt=C.state.transmissionRenderTarget[q.id],Pt=q.viewport||O;Rt.setSize(Pt.z*b.transmissionResolutionScale,Pt.w*b.transmissionResolutionScale);const At=b.getRenderTarget(),Lt=b.getActiveCubeFace(),Dt=b.getActiveMipmapLevel();b.setRenderTarget(Rt),b.getClearColor(ht),rt=b.getClearAlpha(),rt<1&&b.setClearColor(16777215,.5),b.clear(),be&&ft.render(J);const qt=b.toneMapping;b.toneMapping=$n;const Zt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),C.setupLightsView(q),Se===!0&&bt.setGlobalState(b.clippingPlanes,q),Er(E,J,q),M.updateMultisampleRenderTarget(Rt),M.updateRenderTargetMipmap(Rt),Kt.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let _e=0,Fe=V.length;_e<Fe;_e++){const Ne=V[_e],{object:ve,geometry:Qe,material:Ct,group:pn}=Ne;if(Ct.side===ii&&ve.layers.test(q.layers)){const le=Ct.side;Ct.side=un,Ct.needsUpdate=!0,Lc(ve,J,q,Qe,Ct,pn),Ct.side=le,Ct.needsUpdate=!0,It=!0}}It===!0&&(M.updateMultisampleRenderTarget(Rt),M.updateRenderTargetMipmap(Rt))}b.setRenderTarget(At,Lt,Dt),b.setClearColor(ht,rt),Zt!==void 0&&(q.viewport=Zt),b.toneMapping=qt}function Er(E,V,J){const q=V.isScene===!0?V.overrideMaterial:null;for(let Y=0,Rt=E.length;Y<Rt;Y++){const Pt=E[Y],{object:At,geometry:Lt,group:Dt}=Pt;let qt=Pt.material;qt.allowOverride===!0&&q!==null&&(qt=q),At.layers.test(J.layers)&&Lc(At,V,J,Lt,qt,Dt)}}function Lc(E,V,J,q,Y,Rt){E.onBeforeRender(b,V,J,q,Y,Rt),E.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),Y.onBeforeRender(b,V,J,q,E,Rt),Y.transparent===!0&&Y.side===ii&&Y.forceSinglePass===!1?(Y.side=un,Y.needsUpdate=!0,b.renderBufferDirect(J,V,q,Y,E,Rt),Y.side=Ci,Y.needsUpdate=!0,b.renderBufferDirect(J,V,q,Y,E,Rt),Y.side=ii):b.renderBufferDirect(J,V,q,Y,E,Rt),E.onAfterRender(b,V,J,q,Y,Rt)}function Tr(E,V,J){V.isScene!==!0&&(V=Pe);const q=P.get(E),Y=C.state.lights,Rt=C.state.shadowsArray,Pt=Y.state.version,At=lt.getParameters(E,Y.state,Rt,V,J,C.state.lightProbeGridArray),Lt=lt.getProgramCacheKey(At);let Dt=q.programs;q.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?V.environment:null,q.fog=V.fog;const qt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;q.envMap=X.get(E.envMap||q.environment,qt),q.envMapRotation=q.environment!==null&&E.envMap===null?V.environmentRotation:E.envMapRotation,Dt===void 0&&(E.addEventListener("dispose",Ee),Dt=new Map,q.programs=Dt);let Zt=Dt.get(Lt);if(Zt!==void 0){if(q.currentProgram===Zt&&q.lightsStateVersion===Pt)return Ic(E,At),Zt}else At.uniforms=lt.getUniforms(E),A!==null&&E.isNodeMaterial&&A.build(E,J,At),E.onBeforeCompile(At,b),Zt=lt.acquireProgram(At,Lt),Dt.set(Lt,Zt),q.uniforms=At.uniforms;const It=q.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(It.clippingPlanes=bt.uniform),Ic(E,At),q.needsLights=Wh(E),q.lightsStateVersion=Pt,q.needsLights&&(It.ambientLightColor.value=Y.state.ambient,It.lightProbe.value=Y.state.probe,It.directionalLights.value=Y.state.directional,It.directionalLightShadows.value=Y.state.directionalShadow,It.spotLights.value=Y.state.spot,It.spotLightShadows.value=Y.state.spotShadow,It.rectAreaLights.value=Y.state.rectArea,It.ltc_1.value=Y.state.rectAreaLTC1,It.ltc_2.value=Y.state.rectAreaLTC2,It.pointLights.value=Y.state.point,It.pointLightShadows.value=Y.state.pointShadow,It.hemisphereLights.value=Y.state.hemi,It.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,It.spotLightMatrix.value=Y.state.spotLightMatrix,It.spotLightMap.value=Y.state.spotLightMap,It.pointShadowMatrix.value=Y.state.pointShadowMatrix),q.lightProbeGrid=C.state.lightProbeGridArray.length>0,q.currentProgram=Zt,q.uniformsList=null,Zt}function Dc(E){if(E.uniformsList===null){const V=E.currentProgram.getUniforms();E.uniformsList=po.seqWithValue(V.seq,E.uniforms)}return E.uniformsList}function Ic(E,V){const J=P.get(E);J.outputColorSpace=V.outputColorSpace,J.batching=V.batching,J.batchingColor=V.batchingColor,J.instancing=V.instancing,J.instancingColor=V.instancingColor,J.instancingMorph=V.instancingMorph,J.skinning=V.skinning,J.morphTargets=V.morphTargets,J.morphNormals=V.morphNormals,J.morphColors=V.morphColors,J.morphTargetsCount=V.morphTargetsCount,J.numClippingPlanes=V.numClippingPlanes,J.numIntersection=V.numClipIntersection,J.vertexAlphas=V.vertexAlphas,J.vertexTangents=V.vertexTangents,J.toneMapping=V.toneMapping}function Hh(E,V){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;w.setFromMatrixPosition(V.matrixWorld);for(let J=0,q=E.length;J<q;J++){const Y=E[J];if(Y.texture!==null&&Y.boundingBox.containsPoint(w))return Y}return null}function Gh(E,V,J,q,Y){V.isScene!==!0&&(V=Pe),M.resetTextureUnits();const Rt=V.fog,Pt=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?V.environment:null,At=N===null?b.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:ie.workingColorSpace,Lt=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Dt=X.get(q.envMap||Pt,Lt),qt=q.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,Zt=!!J.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),It=!!J.morphAttributes.position,_e=!!J.morphAttributes.normal,Fe=!!J.morphAttributes.color;let Ne=$n;q.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Ne=b.toneMapping);const ve=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Qe=ve!==void 0?ve.length:0,Ct=P.get(q),pn=C.state.lights;if(Se===!0&&(Jt===!0||E!==R)){const ye=E===R&&q.id===G;bt.setState(q,E,ye)}let le=!1;q.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==pn.state.version||Ct.outputColorSpace!==At||Y.isBatchedMesh&&Ct.batching===!1||!Y.isBatchedMesh&&Ct.batching===!0||Y.isBatchedMesh&&Ct.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&Ct.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&Ct.instancing===!1||!Y.isInstancedMesh&&Ct.instancing===!0||Y.isSkinnedMesh&&Ct.skinning===!1||!Y.isSkinnedMesh&&Ct.skinning===!0||Y.isInstancedMesh&&Ct.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Ct.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Ct.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Ct.instancingMorph===!1&&Y.morphTexture!==null||Ct.envMap!==Dt||q.fog===!0&&Ct.fog!==Rt||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==bt.numPlanes||Ct.numIntersection!==bt.numIntersection)||Ct.vertexAlphas!==qt||Ct.vertexTangents!==Zt||Ct.morphTargets!==It||Ct.morphNormals!==_e||Ct.morphColors!==Fe||Ct.toneMapping!==Ne||Ct.morphTargetsCount!==Qe||!!Ct.lightProbeGrid!=C.state.lightProbeGridArray.length>0)&&(le=!0):(le=!0,Ct.__version=q.version);let Tn=Ct.currentProgram;le===!0&&(Tn=Tr(q,V,Y),A&&q.isNodeMaterial&&A.onUpdateProgram(q,Tn,Ct));let Hn=!1,fi=!1,es=!1;const Me=Tn.getUniforms(),ze=Ct.uniforms;if(yt.useProgram(Tn.program)&&(Hn=!0,fi=!0,es=!0),q.id!==G&&(G=q.id,fi=!0),Ct.needsLights){const ye=Hh(C.state.lightProbeGridArray,Y);Ct.lightProbeGrid!==ye&&(Ct.lightProbeGrid=ye,fi=!0)}if(Hn||R!==E){yt.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Me.setValue(k,"projectionMatrix",E.projectionMatrix),Me.setValue(k,"viewMatrix",E.matrixWorldInverse);const mi=Me.map.cameraPosition;mi!==void 0&&mi.setValue(k,he.setFromMatrixPosition(E.matrixWorld)),fe.logarithmicDepthBuffer&&Me.setValue(k,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Me.setValue(k,"isOrthographic",E.isOrthographicCamera===!0),R!==E&&(R=E,fi=!0,es=!0)}if(Ct.needsLights&&(pn.state.directionalShadowMap.length>0&&Me.setValue(k,"directionalShadowMap",pn.state.directionalShadowMap,M),pn.state.spotShadowMap.length>0&&Me.setValue(k,"spotShadowMap",pn.state.spotShadowMap,M),pn.state.pointShadowMap.length>0&&Me.setValue(k,"pointShadowMap",pn.state.pointShadowMap,M)),Y.isSkinnedMesh){Me.setOptional(k,Y,"bindMatrix"),Me.setOptional(k,Y,"bindMatrixInverse");const ye=Y.skeleton;ye&&(ye.boneTexture===null&&ye.computeBoneTexture(),Me.setValue(k,"boneTexture",ye.boneTexture,M))}Y.isBatchedMesh&&(Me.setOptional(k,Y,"batchingTexture"),Me.setValue(k,"batchingTexture",Y._matricesTexture,M),Me.setOptional(k,Y,"batchingIdTexture"),Me.setValue(k,"batchingIdTexture",Y._indirectTexture,M),Me.setOptional(k,Y,"batchingColorTexture"),Y._colorsTexture!==null&&Me.setValue(k,"batchingColorTexture",Y._colorsTexture,M));const pi=J.morphAttributes;if((pi.position!==void 0||pi.normal!==void 0||pi.color!==void 0)&&Ft.update(Y,J,Tn),(fi||Ct.receiveShadow!==Y.receiveShadow)&&(Ct.receiveShadow=Y.receiveShadow,Me.setValue(k,"receiveShadow",Y.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&V.environment!==null&&(ze.envMapIntensity.value=V.environmentIntensity),ze.dfgLUT!==void 0&&(ze.dfgLUT.value=Tx()),fi){if(Me.setValue(k,"toneMappingExposure",b.toneMappingExposure),Ct.needsLights&&Vh(ze,es),Rt&&q.fog===!0&&j.refreshFogUniforms(ze,Rt),j.refreshMaterialUniforms(ze,q,pt,ut,C.state.transmissionRenderTarget[E.id]),Ct.needsLights&&Ct.lightProbeGrid){const ye=Ct.lightProbeGrid;ze.probesSH.value=ye.texture,ze.probesMin.value.copy(ye.boundingBox.min),ze.probesMax.value.copy(ye.boundingBox.max),ze.probesResolution.value.copy(ye.resolution)}po.upload(k,Dc(Ct),ze,M)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(po.upload(k,Dc(Ct),ze,M),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Me.setValue(k,"center",Y.center),Me.setValue(k,"modelViewMatrix",Y.modelViewMatrix),Me.setValue(k,"normalMatrix",Y.normalMatrix),Me.setValue(k,"modelMatrix",Y.matrixWorld),q.uniformsGroups!==void 0){const ye=q.uniformsGroups;for(let mi=0,ns=ye.length;mi<ns;mi++){const Nc=ye[mi];it.update(Nc,Tn),it.bind(Nc,Tn)}}return Tn}function Vh(E,V){E.ambientLightColor.needsUpdate=V,E.lightProbe.needsUpdate=V,E.directionalLights.needsUpdate=V,E.directionalLightShadows.needsUpdate=V,E.pointLights.needsUpdate=V,E.pointLightShadows.needsUpdate=V,E.spotLights.needsUpdate=V,E.spotLightShadows.needsUpdate=V,E.rectAreaLights.needsUpdate=V,E.hemisphereLights.needsUpdate=V}function Wh(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(E,V,J){const q=P.get(E);q.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),P.get(E.texture).__webglTexture=V,P.get(E.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:J,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,V){const J=P.get(E);J.__webglFramebuffer=V,J.__useDefaultFramebuffer=V===void 0};const Xh=k.createFramebuffer();this.setRenderTarget=function(E,V=0,J=0){N=E,D=V,H=J;let q=null,Y=!1,Rt=!1;if(E){const At=P.get(E);if(At.__useDefaultFramebuffer!==void 0){yt.bindFramebuffer(k.FRAMEBUFFER,At.__webglFramebuffer),O.copy(E.viewport),B.copy(E.scissor),K=E.scissorTest,yt.viewport(O),yt.scissor(B),yt.setScissorTest(K),G=-1;return}else if(At.__webglFramebuffer===void 0)M.setupRenderTarget(E);else if(At.__hasExternalTextures)M.rebindTextures(E,P.get(E.texture).__webglTexture,P.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const qt=E.depthTexture;if(At.__boundDepthTexture!==qt){if(qt!==null&&P.has(qt)&&(E.width!==qt.image.width||E.height!==qt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(E)}}const Lt=E.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(Rt=!0);const Dt=P.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Dt[V])?q=Dt[V][J]:q=Dt[V],Y=!0):E.samples>0&&M.useMultisampledRTT(E)===!1?q=P.get(E).__webglMultisampledFramebuffer:Array.isArray(Dt)?q=Dt[J]:q=Dt,O.copy(E.viewport),B.copy(E.scissor),K=E.scissorTest}else O.copy(mt).multiplyScalar(pt).floor(),B.copy(Nt).multiplyScalar(pt).floor(),K=Ht;if(J!==0&&(q=Xh),yt.bindFramebuffer(k.FRAMEBUFFER,q)&&yt.drawBuffers(E,q),yt.viewport(O),yt.scissor(B),yt.setScissorTest(K),Y){const At=P.get(E.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+V,At.__webglTexture,J)}else if(Rt){const At=V;for(let Lt=0;Lt<E.textures.length;Lt++){const Dt=P.get(E.textures[Lt]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Lt,Dt.__webglTexture,J,At)}}else if(E!==null&&J!==0){const At=P.get(E.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,At.__webglTexture,J)}G=-1},this.readRenderTargetPixels=function(E,V,J,q,Y,Rt,Pt,At=0){if(!(E&&E.isWebGLRenderTarget)){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=P.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Pt!==void 0&&(Lt=Lt[Pt]),Lt){yt.bindFramebuffer(k.FRAMEBUFFER,Lt);try{const Dt=E.textures[At],qt=Dt.format,Zt=Dt.type;if(E.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+At),!fe.textureFormatReadable(qt)){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!fe.textureTypeReadable(Zt)){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=E.width-q&&J>=0&&J<=E.height-Y&&k.readPixels(V,J,q,Y,z.convert(qt),z.convert(Zt),Rt)}finally{const Dt=N!==null?P.get(N).__webglFramebuffer:null;yt.bindFramebuffer(k.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(E,V,J,q,Y,Rt,Pt,At=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=P.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Pt!==void 0&&(Lt=Lt[Pt]),Lt)if(V>=0&&V<=E.width-q&&J>=0&&J<=E.height-Y){yt.bindFramebuffer(k.FRAMEBUFFER,Lt);const Dt=E.textures[At],qt=Dt.format,Zt=Dt.type;if(E.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+At),!fe.textureFormatReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!fe.textureTypeReadable(Zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const It=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,It),k.bufferData(k.PIXEL_PACK_BUFFER,Rt.byteLength,k.STREAM_READ),k.readPixels(V,J,q,Y,z.convert(qt),z.convert(Zt),0);const _e=N!==null?P.get(N).__webglFramebuffer:null;yt.bindFramebuffer(k.FRAMEBUFFER,_e);const Fe=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Cf(k,Fe,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,It),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Rt),k.deleteBuffer(It),k.deleteSync(Fe),Rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,V=null,J=0){const q=Math.pow(2,-J),Y=Math.floor(E.image.width*q),Rt=Math.floor(E.image.height*q),Pt=V!==null?V.x:0,At=V!==null?V.y:0;M.setTexture2D(E,0),k.copyTexSubImage2D(k.TEXTURE_2D,J,0,0,Pt,At,Y,Rt),yt.unbindTexture()};const $h=k.createFramebuffer(),qh=k.createFramebuffer();this.copyTextureToTexture=function(E,V,J=null,q=null,Y=0,Rt=0){let Pt,At,Lt,Dt,qt,Zt,It,_e,Fe;const Ne=E.isCompressedTexture?E.mipmaps[Rt]:E.image;if(J!==null)Pt=J.max.x-J.min.x,At=J.max.y-J.min.y,Lt=J.isBox3?J.max.z-J.min.z:1,Dt=J.min.x,qt=J.min.y,Zt=J.isBox3?J.min.z:0;else{const ze=Math.pow(2,-Y);Pt=Math.floor(Ne.width*ze),At=Math.floor(Ne.height*ze),E.isDataArrayTexture?Lt=Ne.depth:E.isData3DTexture?Lt=Math.floor(Ne.depth*ze):Lt=1,Dt=0,qt=0,Zt=0}q!==null?(It=q.x,_e=q.y,Fe=q.z):(It=0,_e=0,Fe=0);const ve=z.convert(V.format),Qe=z.convert(V.type);let Ct;V.isData3DTexture?(M.setTexture3D(V,0),Ct=k.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(M.setTexture2DArray(V,0),Ct=k.TEXTURE_2D_ARRAY):(M.setTexture2D(V,0),Ct=k.TEXTURE_2D),yt.activeTexture(k.TEXTURE0),yt.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,V.flipY),yt.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),yt.pixelStorei(k.UNPACK_ALIGNMENT,V.unpackAlignment);const pn=yt.getParameter(k.UNPACK_ROW_LENGTH),le=yt.getParameter(k.UNPACK_IMAGE_HEIGHT),Tn=yt.getParameter(k.UNPACK_SKIP_PIXELS),Hn=yt.getParameter(k.UNPACK_SKIP_ROWS),fi=yt.getParameter(k.UNPACK_SKIP_IMAGES);yt.pixelStorei(k.UNPACK_ROW_LENGTH,Ne.width),yt.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Ne.height),yt.pixelStorei(k.UNPACK_SKIP_PIXELS,Dt),yt.pixelStorei(k.UNPACK_SKIP_ROWS,qt),yt.pixelStorei(k.UNPACK_SKIP_IMAGES,Zt);const es=E.isDataArrayTexture||E.isData3DTexture,Me=V.isDataArrayTexture||V.isData3DTexture;if(E.isDepthTexture){const ze=P.get(E),pi=P.get(V),ye=P.get(ze.__renderTarget),mi=P.get(pi.__renderTarget);yt.bindFramebuffer(k.READ_FRAMEBUFFER,ye.__webglFramebuffer),yt.bindFramebuffer(k.DRAW_FRAMEBUFFER,mi.__webglFramebuffer);for(let ns=0;ns<Lt;ns++)es&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,P.get(E).__webglTexture,Y,Zt+ns),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,P.get(V).__webglTexture,Rt,Fe+ns)),k.blitFramebuffer(Dt,qt,Pt,At,It,_e,Pt,At,k.DEPTH_BUFFER_BIT,k.NEAREST);yt.bindFramebuffer(k.READ_FRAMEBUFFER,null),yt.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(Y!==0||E.isRenderTargetTexture||P.has(E)){const ze=P.get(E),pi=P.get(V);yt.bindFramebuffer(k.READ_FRAMEBUFFER,$h),yt.bindFramebuffer(k.DRAW_FRAMEBUFFER,qh);for(let ye=0;ye<Lt;ye++)es?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ze.__webglTexture,Y,Zt+ye):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,ze.__webglTexture,Y),Me?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,pi.__webglTexture,Rt,Fe+ye):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,pi.__webglTexture,Rt),Y!==0?k.blitFramebuffer(Dt,qt,Pt,At,It,_e,Pt,At,k.COLOR_BUFFER_BIT,k.NEAREST):Me?k.copyTexSubImage3D(Ct,Rt,It,_e,Fe+ye,Dt,qt,Pt,At):k.copyTexSubImage2D(Ct,Rt,It,_e,Dt,qt,Pt,At);yt.bindFramebuffer(k.READ_FRAMEBUFFER,null),yt.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Me?E.isDataTexture||E.isData3DTexture?k.texSubImage3D(Ct,Rt,It,_e,Fe,Pt,At,Lt,ve,Qe,Ne.data):V.isCompressedArrayTexture?k.compressedTexSubImage3D(Ct,Rt,It,_e,Fe,Pt,At,Lt,ve,Ne.data):k.texSubImage3D(Ct,Rt,It,_e,Fe,Pt,At,Lt,ve,Qe,Ne):E.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Rt,It,_e,Pt,At,ve,Qe,Ne.data):E.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Rt,It,_e,Ne.width,Ne.height,ve,Ne.data):k.texSubImage2D(k.TEXTURE_2D,Rt,It,_e,Pt,At,ve,Qe,Ne);yt.pixelStorei(k.UNPACK_ROW_LENGTH,pn),yt.pixelStorei(k.UNPACK_IMAGE_HEIGHT,le),yt.pixelStorei(k.UNPACK_SKIP_PIXELS,Tn),yt.pixelStorei(k.UNPACK_SKIP_ROWS,Hn),yt.pixelStorei(k.UNPACK_SKIP_IMAGES,fi),Rt===0&&V.generateMipmaps&&k.generateMipmap(Ct),yt.unbindTexture()},this.initRenderTarget=function(E){P.get(E).__webglFramebuffer===void 0&&M.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?M.setTextureCube(E,0):E.isData3DTexture?M.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?M.setTexture2DArray(E,0):M.setTexture2D(E,0),yt.unbindTexture()},this.resetState=function(){D=0,H=0,N=null,yt.reset(),_t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ie._getDrawingBufferColorSpace(t),e.unpackColorSpace=ie._getUnpackColorSpace()}}const Vu={type:"change"},lc={type:"start"},dh={type:"end"},Zr=new Oo,Wu=new ni,wx=Math.cos(70*Ue.DEG2RAD),He=new F,dn=2*Math.PI,xe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ea=1e-6;class hh extends Pp{constructor(t,e=null){super(t,e),this.state=xe.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Xe.ROTATE,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN},this.touches={ONE:fn.ROTATE,TWO:fn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new An,this._lastTargetPosition=new F,this._quat=new An().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ao,this._sphericalDelta=new Ao,this._scale=1,this._panOffset=new F,this._rotateStart=new Ut,this._rotateEnd=new Ut,this._rotateDelta=new Ut,this._panStart=new Ut,this._panEnd=new Ut,this._panDelta=new Ut,this._dollyStart=new Ut,this._dollyEnd=new Ut,this._dollyDelta=new Ut,this._dollyDirection=new F,this._mouse=new Ut,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Rx.bind(this),this._onPointerDown=Ax.bind(this),this._onPointerUp=Cx.bind(this),this._onContextMenu=Ox.bind(this),this._onMouseWheel=Dx.bind(this),this._onKeyDown=Ix.bind(this),this._onTouchStart=Nx.bind(this),this._onTouchMove=Ux.bind(this),this._onMouseDown=Px.bind(this),this._onMouseMove=Lx.bind(this),this._interceptControlDown=Fx.bind(this),this._interceptControlUp=zx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Vu),this.update(),this.state=xe.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;He.copy(e).sub(this.target),He.applyQuaternion(this._quat),this._spherical.setFromVector3(He),this.autoRotate&&this.state===xe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=dn:i>Math.PI&&(i-=dn),s<-Math.PI?s+=dn:s>Math.PI&&(s-=dn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(He.setFromSpherical(this._spherical),He.applyQuaternion(this._quatInverse),e.copy(this.target).add(He),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=He.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new F(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new F(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=He.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Zr.origin.copy(this.object.position),Zr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Zr.direction))<wx?this.object.lookAt(this.target):(Wu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Zr.intersectPlane(Wu,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ea||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ea||this._lastTargetPosition.distanceToSquared(this.target)>Ea?(this.dispatchEvent(Vu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?dn/60*this.autoRotateSpeed*t:dn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){He.setFromMatrixColumn(e,0),He.multiplyScalar(-t),this._panOffset.add(He)}_panUp(t,e){this.screenSpacePanning===!0?He.setFromMatrixColumn(e,1):(He.setFromMatrixColumn(e,0),He.crossVectors(this.object.up,He)),He.multiplyScalar(t),this._panOffset.add(He)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;He.copy(s).sub(this.target);let r=He.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(dn*this._rotateDelta.x/e.clientHeight),this._rotateUp(dn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(dn*this._rotateDelta.x/e.clientHeight),this._rotateUp(dn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ut,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Ax(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Rx(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Cx(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(dh),this.state=xe.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Px(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Xe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=xe.DOLLY;break;case Xe.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=xe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=xe.ROTATE}break;case Xe.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=xe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=xe.PAN}break;default:this.state=xe.NONE}this.state!==xe.NONE&&this.dispatchEvent(lc)}function Lx(n){switch(this.state){case xe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case xe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case xe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Dx(n){this.enabled===!1||this.enableZoom===!1||this.state!==xe.NONE||(n.preventDefault(),this.dispatchEvent(lc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(dh))}function Ix(n){this.enabled!==!1&&this._handleKeyDown(n)}function Nx(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case fn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=xe.TOUCH_ROTATE;break;case fn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=xe.TOUCH_PAN;break;default:this.state=xe.NONE}break;case 2:switch(this.touches.TWO){case fn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=xe.TOUCH_DOLLY_PAN;break;case fn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=xe.TOUCH_DOLLY_ROTATE;break;default:this.state=xe.NONE}break;default:this.state=xe.NONE}this.state!==xe.NONE&&this.dispatchEvent(lc)}function Ux(n){switch(this._trackPointer(n),this.state){case xe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case xe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case xe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case xe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=xe.NONE}}function Ox(n){this.enabled!==!1&&n.preventDefault()}function Fx(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function zx(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class fh extends De{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Ut(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element&&e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const xs=new F,Xu=new me,$u=new me,qu=new F,Yu=new F;class Bx{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},c=t.element!==void 0?t.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.sortObjects=!0,this.getSize=function(){return{width:i,height:s}},this.render=function(_,x){_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),x.parent===null&&x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),Xu.copy(x.matrixWorldInverse),$u.multiplyMatrices(x.projectionMatrix,Xu),u(_,_,x),this.sortObjects&&p(_)},this.setSize=function(_,x){i=_,s=x,r=i/2,o=s/2,c.style.width=_+"px",c.style.height=x+"px"};function l(_){_.isCSS2DObject&&(_.element.style.display="none");for(let x=0,m=_.children.length;x<m;x++)l(_.children[x])}function u(_,x,m){if(_.visible===!1){l(_);return}if(_.isCSS2DObject){xs.setFromMatrixPosition(_.matrixWorld),xs.applyMatrix4($u);const h=xs.z>=-1&&xs.z<=1&&_.layers.test(m.layers)===!0,v=_.element;v.style.display=h===!0?"":"none",h===!0&&(_.onBeforeRender(e,x,m),v.style.transform="translate("+-100*_.center.x+"%,"+-100*_.center.y+"%)translate("+(xs.x*r+r)+"px,"+(-xs.y*o+o)+"px)",v.parentNode!==c&&c.appendChild(v),_.onAfterRender(e,x,m));const T={distanceToCameraSquared:f(m,_)};a.objects.set(_,T)}for(let h=0,v=_.children.length;h<v;h++)u(_.children[h],x,m)}function f(_,x){return qu.setFromMatrixPosition(_.matrixWorld),Yu.setFromMatrixPosition(x.matrixWorld),qu.distanceToSquared(Yu)}function d(_){const x=[];return _.traverseVisible(function(m){m.isCSS2DObject&&x.push(m)}),x}function p(_){const x=d(_).sort(function(h,v){if(h.renderOrder!==v.renderOrder)return v.renderOrder-h.renderOrder;const T=a.objects.get(h).distanceToCameraSquared,w=a.objects.get(v).distanceToCameraSquared;return T-w}),m=x.length;for(let h=0,v=x.length;h<v;h++)x[h].element.style.zIndex=m-h}}}class kx extends Jl{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const t=new ue;t.deleteAttribute("uv");const e=new ke({side:un}),i=new ke,s=new Qd(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Xt(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new Ql(t,i,6),a=new De;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);const c=new Xt(t,vs(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new Xt(t,vs(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const u=new Xt(t,vs(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);const f=new Xt(t,vs(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const d=new Xt(t,vs(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const p=new Xt(t,vs(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function vs(n){return new Sp({color:0,emissive:16777215,emissiveIntensity:n})}const et={sky:15985891,ground:15392723,wall:16052714,wallExt:15526628,trim:16777215,doorLeaf:13215612,doorEntrance:3494010,glass:11130101,frame:4871528,floorWood:13608570,woodLight:14201994,woodMid:12159838,woodDark:8017462,tileFloor:15331058,tileGrout:13489886,sofa:6258598,sofaDark:4612223,fabricBeige:14931392,fabricGrey:11844806,bedding:16118766,blanket:8298639,rug:14272942,black:2303533,steel:12831443,white:16448250,counter:15856372,cabinet:14341062,cabinetDark:7174792,leaf:5810286,leafDark:4163670,pot:13616307,accent:15246141,label:12999226},Ta={...et},Fi=(n,t,e)=>new Ot(n).lerp(new Ot(t),e).getHex();function Hx(n){Object.assign(et,Ta),et.floorWood=n.floor,et.wall=n.wall,et.wallExt=Fi(n.wall,0,.04),et.woodMid=n.wood,et.woodLight=Fi(n.wood,16777215,.22),et.woodDark=Fi(n.wood,0,.35),et.cabinet=Fi(Ta.cabinet,n.wood,.18),et.sofa=n.sofa,et.sofaDark=Fi(n.sofa,0,.25),et.accent=n.accent,et.blanket=Fi(n.accent,16777215,.3),et.rug=Fi(Ta.rug,n.floor,.25)}const wa=new Map;function Cn(n,t={}){const e=`${n}|${JSON.stringify(t)}`;return wa.has(e)||wa.set(e,new ke({color:n,roughness:.78,metalness:0,...t})),wa.get(e)}function Pl(){return Cn(et.glass,{transparent:!0,opacity:.28,roughness:.05,depthWrite:!1})}const Ll=30,Js=72,Aa=[4.5,34],Ra=[.15,1.35],Ca=new F(5,0,3.5),ju=Math.PI*2,ph=n=>n<.5?4*n*n*n:1-(-2*n+2)**3/2;function mh(){const n=window.matchMedia?.("(pointer: coarse)").matches||Math.min(window.innerWidth,window.innerHeight)<640;return{coarse:n,maxDpr:n?1.5:2,shadowSize:n?1024:2048,pointLights:!n}}function Gx(n,t=mh()){const e=new uh({antialias:!0,powerPreference:"high-performance",stencil:!1});let i=Math.min(window.devicePixelRatio||1,t.maxDpr);e.setPixelRatio(i),e.outputColorSpace=qe,e.toneMapping=Io,e.toneMappingExposure=1,e.shadowMap.enabled=!0,e.shadowMap.type=Es,e.shadowMap.autoUpdate=!1,e.shadowMap.needsUpdate=!0,Object.assign(e.domElement.style,{display:"block",width:"100%",height:"100%",touchAction:"none",outline:"none"});const s=new Jl;s.background=new Ot(et.sky),s.fog=new Uo(et.sky,40,120);const r=new hn(Ll,1,.05,300);r.rotation.order="YXZ";const o=new Bx;Object.assign(o.domElement.style,{position:"absolute",left:"0",top:"0",pointerEvents:"none",overflow:"hidden"}),getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.append(e.domElement,o.domElement);const a=new hh(r,e.domElement);a.enableDamping=!0,a.dampingFactor=.1,a.rotateSpeed=.6,a.zoomSpeed=.9,a.minDistance=Aa[0],a.maxDistance=Aa[1],a.minPolarAngle=Ra[0],a.maxPolarAngle=Ra[1],a.screenSpacePanning=!1,a.touches={ONE:fn.ROTATE,TWO:fn.DOLLY_PAN},a.mouseButtons={LEFT:Xe.ROTATE,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN},a.target.copy(Ca);const c=new Kd(16774118,15787736,1.1);s.add(c);const l=new th(16777215,2.4);l.castShadow=!0,l.shadow.mapSize.set(t.shadowSize,t.shadowSize),l.shadow.bias=-5e-4,l.shadow.normalBias=.03,l.shadow.radius=4;const u=l.shadow.camera;u.left=-9,u.right=9,u.top=9,u.bottom=-9,u.near=1,u.far=60,l.target.position.copy(Ca),s.add(l,l.target);const f=new Al(e),d=new kx;s.environment=f.fromScene(d,.04).texture,s.environmentIntensity=.25,d.dispose(),f.dispose();const p={left:0,right:0,top:0,bottom:0},_={...p};let x={w:1,h:1};function m(){const st=(_.left-_.right)/2,ut=(_.top-_.bottom)/2;Math.abs(st)<.5&&Math.abs(ut)<.5?r.clearViewOffset():r.setViewOffset(x.w,x.h,-st,-ut,x.w,x.h),r.updateProjectionMatrix()}const h=new Set,v=new eh;let T=3,w=!1,I=0,C=0;function L(st=2){st>T&&(T=st)}const g=()=>{const st=n.clientWidth||window.innerWidth,ut=n.clientHeight||window.innerHeight;x={w:st,h:ut},e.setSize(st,ut,!1),o.setSize(st,ut),r.aspect=st/ut,m(),L()};function S(st){if(!w){C=0,I=0;return}C++,st>.03&&I++,C>=40&&(I>28&&i>.9&&(i=Math.max(.9,i-.25),e.setPixelRatio(i),e.setSize(x.w,x.h,!1)),C=0,I=0)}function b(){const st=Math.min(.1,v.getDelta());for(const pt of h)pt(st);let ut=!1;for(const pt of["left","right","top","bottom"]){const Q=p[pt]-_[pt];Math.abs(Q)>.4?(_[pt]+=Q*Math.min(1,st*10),ut=!0):_[pt]=p[pt]}ut&&(m(),L()),T>0?(T--,e.render(s,r),o.render(s,r),S(st),w=!0):w=!1}a.addEventListener("change",()=>L());const y=new F,A=new Ao;function D(){return A.setFromVector3(y.copy(r.position).sub(a.target)),{target:a.target.clone(),distance:A.radius,azimuth:A.theta,polar:A.phi}}function H({target:st,distance:ut,azimuth:pt,polar:Q}){a.target.set(st.x,st.y??0,st.z),r.position.copy(a.target).add(y.setFromSphericalCoords(ut,Q,pt)),r.lookAt(a.target)}const N=st=>st-ju*Math.floor((st+Math.PI)/ju);function G(st){const ut=new F(st.target.x,st.target.y??0,st.target.z),pt=new F().setFromSphericalCoords(st.distance,st.polar,st.azimuth).add(ut),Q=new De;return Q.position.copy(pt),Q.lookAt(ut),{pos:pt,quat:Q.quaternion.clone(),fov:Ll}}let R=null;function O(){a._sphericalDelta?.set(0,0,0),a._panOffset?.set(0,0,0),"_scale"in a&&(a._scale=1)}function B(){if(!R)return;const st=R;R=null,O(),st.resolve(!1)}a.addEventListener("start",B);function K(st,{duration:ut=1.1}={}){B();const pt=D(),Q={target:new F(st.target?.x??pt.target.x,st.target?.y??0,st.target?.z??pt.target.z),distance:Ue.clamp(st.distance??pt.distance,...Aa),azimuth:st.azimuth??pt.azimuth,polar:Ue.clamp(st.polar??pt.polar,...Ra)};return ut>0?new Promise(xt=>{R={kind:"view",from:pt,to:Q,duration:ut,resolve:xt,t:0,dAz:N(Q.azimuth-pt.azimuth),d0:Math.log(pt.distance),d1:Math.log(Q.distance)},L(3)}):(H(Q),O(),L(),Promise.resolve(!0))}function ht(st,{duration:ut=1.2}={}){return B(),ut>0?new Promise(pt=>{R={kind:"pose",pose:st,duration:ut,resolve:pt,t:0,fromPos:r.position.clone(),fromQuat:r.quaternion.clone(),fromFov:r.fov},L(3)}):(r.position.copy(st.pos),r.quaternion.copy(st.quat),r.fov=st.fov,r.updateProjectionMatrix(),L(),Promise.resolve(!0))}function rt(st){if(!R)return;const ut=R;ut.t=Math.min(1,ut.t+st/ut.duration);const pt=ph(ut.t);if(ut.kind==="view")y.lerpVectors(ut.from.target,ut.to.target,pt),H({target:y.clone(),distance:Math.exp(Ue.lerp(ut.d0,ut.d1,pt)),azimuth:ut.from.azimuth+ut.dAz*pt,polar:Ue.lerp(ut.from.polar,ut.to.polar,pt)});else{r.position.lerpVectors(ut.fromPos,ut.pose.pos,pt),r.quaternion.slerpQuaternions(ut.fromQuat,ut.pose.quat,pt);const Q=Ue.lerp(ut.fromFov,ut.pose.fov,pt);Q!==r.fov&&(r.fov=Q,r.updateProjectionMatrix())}L(),ut.t>=1&&(R=null,O(),ut.resolve(!0))}return h.add(rt),g(),new ResizeObserver(g).observe(n),document.addEventListener("visibilitychange",()=>L(3)),{renderer:e,scene:s,camera:r,controls:a,labelRenderer:o,hemi:c,sun:l,center:Ca,quality:t,insets:p,invalidate:L,invalidateShadows(){e.shadowMap.needsUpdate=!0,L()},onFrame(st){return h.add(st),()=>h.delete(st)},flyView:K,flyPose:ht,viewPose:G,cancelFlight:B,getView:D,get flying(){return!!R},setInsets(st){Object.assign(p,st),L()},start(){e.setAnimationLoop(b)},pause(){e.setAnimationLoop(null)},resume(){v.getDelta(),e.setAnimationLoop(b),L(3)}}}function or(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new on;let l=0;for(let u=0;u<n.length;++u){const f=n[u];let d=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in f.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(f.attributes[p]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in f.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(f.morphAttributes[p])}if(t){let p;if(e)p=f.index.count;else if(f.attributes.position!==void 0)p=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,u),l+=p}}if(e){let u=0;const f=[];for(let d=0;d<n.length;++d){const p=n[d].index;for(let _=0;_<p.count;++_)f.push(p.getX(_)+u);u+=n[d].attributes.position.count}c.setIndex(f)}for(const u in r){const f=Ku(r[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,f)}for(const u in o){const f=o[u][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<f;++d){const p=[];for(let x=0;x<o[u].length;++x)p.push(o[u][x][d]);const _=Ku(p);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(_)}}}return c}function Ku(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){const u=n[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new Mn(o,e,i);let c=0;for(let l=0;l<n.length;++l){const u=n[l];if(u.isInterleavedBufferAttribute){const f=c/e;for(let d=0,p=u.count;d<p;d++)for(let _=0;_<e;_++){const x=u.getComponent(d,_);a.setComponent(d+f,_,x)}}else o.set(u.array,c);c+=u.count*e}return s!==void 0&&(a.gpuType=s),a}const Ti=2.7,gh=.2,_h=.12,Ki=n=>(n.x1-n.x0)*(n.z1-n.z0),at={templateId:"",bedrooms:2,scale:1,size:{w:10,d:7},rooms:[],walls:[],placements:[],area:0,totalArea:0,floors:[],floorId:"main",custom:!1};function xh(n){at.templateId=n.templateId,at.bedrooms=n.bedrooms,at.scale=n.scale??1,at.size=n.size,at.rooms=n.rooms,at.walls=n.walls,at.placements=n.placements,at.area=n.rooms.reduce((t,e)=>t+Ki(e),0),at.floors=n.floors??[{id:"main",name:"Tầng 1",area:at.area}],at.floorId=n.floorId??"main",at.totalArea=n.totalArea??at.area,at.custom=!!n.custom}const Vx={plus:"M12 5v14M5 12h14",minus:"M5 12h14",rotateLeft:"M3 12a9 9 0 1 0 3-6.7M3 4v5h5",rotateRight:"M21 12a9 9 0 1 1-3-6.7M21 4v5h-5",home:"M4 11 12 4l8 7M6 10v10h12V10",close:"M6 6l12 12M18 6 6 18",search:"M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",moon:"M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",sun:"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4",play:"M7 5v14l11-7z",pause:"M8 5v14M16 5v14",walk:"M13 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM10 21l2-6-3-2 1-5 3 2 2 3M12 15l3 6",jump:"M4 20h16M12 16V4M7 9l5-5 5 5",crouch:"M4 4h16M12 8v12M7 15l5 5 5-5",cube:"M12 3 4 7.5v9L12 21l8-4.5v-9zM4 7.5 12 12l8-4.5M12 12v9",pin:"M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10zM12 8.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",expand:"M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",shrink:"M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5",pencil:"M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16zM13.5 6.5l4 4",eyeOff:"M3 3l18 18M10.6 5.2A10 10 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 4M6.2 6.2A17 17 0 0 0 2 12s4 7 10 7a9.7 9.7 0 0 0 4.2-1M9.9 9.9a3 3 0 0 0 4.2 4.2",trash:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",list:"M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",undo:"M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3",eye:"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"};function te(n,t=18,e=1.8){return`<svg class="ico" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${Vx[n]??""}"/></svg>`}const Vt=n=>String(n??"").replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`),Dl=2.1,Wx=.9,vh=2.1,Xx=2.3;function di(n,t=256){const e=document.createElement("canvas");e.width=e.height=t,n(e.getContext("2d"),t);const i=new wo(e);return i.wrapS=i.wrapT=cr,i.colorSpace=qe,i.anisotropy=8,i}const $x=()=>{const n={h:0,s:0,l:0};return new Ot(et.floorWood).getHSL(n),di((t,e)=>{const s=e/8;for(let r=0;r<8;r++){const o=Math.round(n.l*100)-3+r*37%7;t.fillStyle=`hsl(${Math.round(n.h*360)} ${Math.round(n.s*100)}% ${o}%)`,t.fillRect(0,r*s,e,s),t.fillStyle="rgba(60,35,15,0.07)";for(let a=0;a<14;a++)t.fillRect((r*53+a*37)%e,r*s+a*29%s,30+a*17%60,1);t.fillStyle="rgba(60,35,15,0.30)",t.fillRect(0,r*s,e,1.5),t.fillRect(r*97%e,r*s,1.5,s)}})},qx=()=>di((n,t)=>{n.fillStyle="#e9eef2",n.fillRect(0,0,t,t),n.strokeStyle="#c8d1da",n.lineWidth=3,n.strokeRect(0,0,t,t),n.strokeRect(t/2,0,.1,t),n.strokeRect(0,t/2,t,.1)}),gr=n=>()=>(n=(n*1664525+1013904223)%4294967296,n/4294967296),Yx=()=>di((n,t)=>{const e=gr(7);n.fillStyle="#efece6",n.fillRect(0,0,t,t),n.lineCap="round";for(let i=0;i<9;i++){n.strokeStyle=`rgba(120,115,110,${.12+e()*.2})`,n.lineWidth=.6+e()*1.6,n.beginPath();let s=e()*t,r=0;n.moveTo(s,r);for(let o=0;o<6;o++)s+=(e()-.5)*70,r+=t/6,n.lineTo(s,r);n.stroke()}n.strokeStyle="rgba(190,185,178,0.7)",n.lineWidth=1.5,n.strokeRect(0,0,t,t)}),jx=()=>di((n,t)=>{const e=gr(11);n.fillStyle="#b9bcc0",n.fillRect(0,0,t,t);for(let i=0;i<2200;i++){const s=150+Math.floor(e()*70);n.fillStyle=`rgba(${s},${s},${s+4},0.35)`,n.fillRect(e()*t,e()*t,1+e()*2,1+e()*2)}n.strokeStyle="rgba(90,92,96,0.45)",n.lineWidth=2,n.strokeRect(0,0,t,t)}),Kx=()=>di((n,t)=>{const e=gr(3);n.fillStyle="#c9bfb2",n.fillRect(0,0,t,t);for(let i=0;i<4200;i++){const s=175+Math.floor(e()*45);n.fillStyle=`rgba(${s},${s-8},${s-20},0.55)`,n.fillRect(e()*t,e()*t,1,2)}}),Zx=()=>di((n,t)=>{const e=gr(21),i=6,s=t/i;for(let r=0;r<i;r++){const o=17+Math.floor(e()*6);n.fillStyle=`hsl(22 38% ${o}%)`,n.fillRect(0,r*s,t,s),n.fillStyle="rgba(0,0,0,0.18)";for(let a=0;a<10;a++)n.fillRect(e()*t,r*s+e()*s,30+e()*80,1);n.fillStyle="rgba(0,0,0,0.5)",n.fillRect(0,r*s,t,1.5),n.fillRect(r*83%t,r*s,1.5,s)}}),Jx=()=>di((n,t)=>{const e=gr(31);n.fillStyle="#6f7378",n.fillRect(0,0,t,t);for(let i=0;i<3200;i++){const s=70+Math.floor(e()*130);n.fillStyle=`rgba(${s},${s},${s+3},0.6)`,n.fillRect(e()*t,e()*t,1+e()*2.2,1+e()*2.2)}n.strokeStyle="rgba(30,32,36,0.55)",n.lineWidth=2,n.strokeRect(0,0,t,t)}),Qx=()=>di((n,t)=>{n.fillStyle="#f2f3f1",n.fillRect(0,0,t,t),n.strokeStyle="rgba(160,165,160,0.35)",n.lineWidth=1,n.strokeRect(0,0,t,t)}),tv=()=>di((n,t)=>{n.fillStyle="#cfe9f2",n.fillRect(0,0,t,t),n.strokeStyle="rgba(90,120,135,0.9)",n.lineWidth=5,n.strokeRect(0,0,t,t),n.strokeStyle="rgba(255,255,255,0.55)",n.lineWidth=3,n.beginPath(),n.moveTo(t*.15,t*.85),n.lineTo(t*.55,t*.15),n.stroke()}),Zu={wood:[$x,2.2,.55],darkwood:[Zx,2.2,.5],tile:[qx,1.2,.3],marble:[Yx,1.6,.15],granite:[Jx,1.6,.25],concrete:[jx,2,.85],epoxy:[Qx,2,.08],carpet:[Kx,1,1],glass:[tv,1.2,.05,{transparent:!0,opacity:.42,depthWrite:!1,metalness:.1}]},Ju=new Map;function ev(n,t){const e=n==="wood"?`wood|${et.floorWood}`:n;let i=Ju.get(e);return i||(i=t(),Ju.set(e,i)),i}function nv(n){const t=Zu[n.floor]?n.floor:"wood",[e,i,s,r]=Zu[t],o=ev(t,e).clone();return o.needsUpdate=!0,o.repeat.set((n.x1-n.x0)/i,(n.z1-n.z0)/i),new ke({map:o,roughness:s,...r??{}})}const mo=[];function Qu(n,t,e,i,s,r,o,a,c,l){if(i-e<1e-4||r-s<1e-4||a-o<1e-4)return;const u=new ue(i-e,r-s,a-o);u.translate((e+i)/2,(s+r)/2,(o+a)/2),mo.push({material:c,geo:u}),l&&t.push({x0:e,x1:i,z0:o,z1:a})}function iv(n){const t=Cn(et.frame);for(const i of[...n.children])if(i.isMesh&&i.material===t){i.updateMatrix();const s=i.geometry.clone().applyMatrix4(i.matrix);mo.push({material:t,geo:s}),i.geometry.dispose(),n.remove(i)}const e=new Map;for(const{material:i,geo:s}of mo)e.has(i)||e.set(i,[]),e.get(i).push(s);for(const[i,s]of e){const r=new Xt(or(s,!1),i);r.castShadow=!0,r.receiveShadow=!0,r.userData.blocker=!0,n.add(r);for(const o of s)o.dispose()}mo.length=0}function sv(n,t,e,i){const{dir:s,at:r,t:o}=n,a=o/2,c=n.from-a,l=n.to+a,u=o>=.2,f=Cn(u?et.wallExt:et.wall),d=[...n.openings].map(x=>({...x,s:x.c-x.w/2,e:x.c+x.w/2})).sort((x,m)=>x.s-m.s),p=(x,m,h,v,T)=>{s==="x"?Qu(t,e,x,m,h,v,r-a,r+a,f,T):Qu(t,e,r-a,r+a,h,v,x,m,f,T)};let _=c;for(const x of d){if(p(_,x.s,0,Ti,!0),x.type==="window"){const m=x.sill??Wx;p(x.s,x.e,0,m,!0),p(x.s,x.e,vh,Ti,!1),rv(t,s,r,x,m)}else if(x.type==="door"){p(x.s,x.e,Dl,Ti,!1);const m=ov(t,s,r,x,u||x.entrance===!0);m.collider=s==="x"?{x0:x.s,x1:x.e,z0:r-a,z1:r+a,isDoor:!0,doorId:m.id}:{x0:r-a,x1:r+a,z0:x.s,z1:x.e,isDoor:!0,doorId:m.id},!m.isOpen&&e&&e.push(m.collider),i&&i.push(m)}else p(x.s,x.e,Xx,Ti,!1);_=x.e}p(_,l,0,Ti,!0)}function rv(n,t,e,i,s){const r=vh-s,o=t==="x"?[i.w,r,.03]:[.03,r,i.w],a=new Xt(new ue(...o),Pl()),c=s+r/2;t==="x"?a.position.set(i.c,c,e):a.position.set(e,c,i.c),n.add(a);const l=i.w>1.1?1:0,u=Cn(et.frame);for(let d=-1;d<=l;d+=2){const p=l?0:d<0?-i.w/2:i.w/2,_=new Xt(new ue(...t==="x"?[.04,r,.06]:[.06,r,.04]),u);t==="x"?_.position.set(i.c+p,c,e):_.position.set(e,c,i.c+p),n.add(_)}const f=new Xt(new ue(...t==="x"?[i.w,.04,.08]:[.08,.04,i.w]),u);t==="x"?f.position.set(i.c,s+.02,e):f.position.set(e,s+.02,i.c),n.add(f)}function ov(n,t,e,i,s){const r=i.w-.04,o=new Xt(new ue(r,Dl-.03,.045),Cn(s?et.doorEntrance:et.doorLeaf,{roughness:.5}));o.position.set(r/2,(Dl-.03)/2,0),o.castShadow=!0;const a=new jt,c=Cn(et.steel??12831443,{metalness:.8,roughness:.25}),l=new Xt(new zs(.01,.01,.065,8),c);l.rotation.x=Math.PI/2,a.add(l);for(const m of[-1,1]){const h=new Xt(new ue(.09,.015,.012),c);h.position.set(.035,0,m*.032),h.castShadow=!0,a.add(h)}a.position.set(r-.08,.98,0),o.add(a);const u=new jt;u.add(o);const f=t==="x"?0:-Math.PI/2,d=t==="x"?-1.3:-Math.PI/2+1.3,p=!s;t==="x"?(u.position.set(i.s+.02,0,e),u.rotation.y=p?d:f):(u.position.set(e,0,i.s+.02),u.rotation.y=p?d:f),n.add(u);const x={id:i.id||`door-${t}-${e}-${Math.round(i.c*100)}`,dir:t,at:e,s:i.s,e:i.e,w:i.w,c:i.c,entrance:!!s,hinge:u,leaf:o,closedRot:f,openRot:d,isOpen:p,targetRot:p?d:f};o.userData.door=x,o.userData.isDoorLeaf=!0,a.userData.door=x;for(const m of a.children)m.userData.door=x;return x}function av(n){const t=document.createElement("button");t.type="button",t.className="room-label",t.dataset.room=n.id,t.innerHTML=`<b>${Vt(n.name)}</b><span>${Ki(n).toFixed(0)} m²</span>`;const e=new fh(t);return e.position.set((n.x0+n.x1)/2,.5,(n.z0+n.z1)/2),e}const lv=new ji({visible:!1}),cv={window:"Cửa sổ",door:"Cửa đi",open:"Ô thông"};function uv(n){const t=[];for(const e of at.walls)for(const i of e.openings){if(!i.id)continue;const s=e.t+.3,r=e.dir==="x"?[i.w,.9,s]:[s,.9,i.w],o=new Xt(new ue(...r),lv);e.dir==="x"?o.position.set(i.c,.45,e.at):o.position.set(e.at,.45,i.c),o.userData.ref={type:"opening",id:i.id},o.userData.label=cv[i.type]??"Cửa",n.add(o),t.push({id:i.id,mesh:o})}return t}function dv(){const n=new jt,t=new jt,e=[],i=new Xt(new ec(60,48),Cn(et.ground,{roughness:1}));i.rotation.x=-Math.PI/2,i.position.set(at.size.w/2,-.21,at.size.d/2),i.receiveShadow=!0,n.add(i);const s=new Xt(new ue(at.size.w+.9,.2,at.size.d+.9),Cn(14932176));s.position.set(at.size.w/2,-.1,at.size.d/2),s.receiveShadow=!0,s.castShadow=!0,n.add(s);const r=[],o=new Map;for(const d of at.rooms){const p=new Xt(new ue(d.x1-d.x0,.04,d.z1-d.z0),nv(d));p.position.set((d.x0+d.x1)/2,.02,(d.z0+d.z1)/2),p.receiveShadow=!0,p.userData.ref={type:"room",id:d.id},o.set(d.id,p),n.add(p);const _=av(d);n.add(_),r.push(_)}const a=[];for(const d of at.walls)sv(d,t,e,a);iv(t),n.add(t);const c=new jt;n.add(c);const l=uv(c),u=new Xt(new ue(at.size.w+.2,.1,at.size.d+.2),Cn(et.trim,{roughness:.95}));u.position.set(at.size.w/2,Ti+.05,at.size.d/2),u.castShadow=!0,u.receiveShadow=!0,u.visible=!1,n.add(u);const f=at.rooms.map(d=>{const p=new Qd(16773336,7,8,2);return p.position.set((d.x0+d.x1)/2,Ti-.3,(d.z0+d.z1)/2),n.add(p),p});return{root:n,walls:t,ceiling:u,labels:r,lamps:f,colliders:e,floors:o,openings:l,doors:a}}function Et(n,t,e,i,s,r,o,a,c){const l=new Xt(new ue(t,e,i),typeof s=="object"?s:Cn(s,c));return l.position.set(r,o+e/2,a),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function Le(n,t,e,i,s,r,o,a,c,l=24){const u=new Xt(new zs(t,e,i,l),Cn(s,c));return u.position.set(r,o+i/2,a),u.castShadow=!0,u.receiveShadow=!0,n.add(u),u}function go(n,t,e,i,s,r,o=1,a=1,c=1){const l=new Xt(new Ls(t,16,12),Cn(e));return l.position.set(i,s,r),l.scale.set(o,a,c),l.castShadow=!0,n.add(l),l}const we=(n,t,e,i={})=>({group:n,w:t,d:e,...i});function hv(n=2.4){const t=new jt,e=.95;Et(t,n,.16,e,et.sofaDark,0,.08,0);const i=3,s=(n-.3)/i;for(let r=0;r<i;r++)Et(t,s-.02,.2,.68,et.sofa,-n/2+.15+s*(r+.5),.24,.1);Et(t,n,.5,.22,et.sofa,0,.24,-e/2+.11);for(const r of[-1,1])Et(t,.15,.36,e,et.sofa,r*(n/2-.075),.24,0);return Et(t,.45,.4,.12,et.accent,-n/2+.55,.44,-.2),Et(t,.45,.4,.12,et.fabricBeige,n/2-.55,.44,-.2),we(t,n,e)}function fv(){const n=new jt;Et(n,.85,.16,.85,et.sofaDark,0,.08,0),Et(n,.6,.18,.6,et.fabricBeige,0,.24,.07),Et(n,.85,.5,.2,et.fabricBeige,0,.24,-.325);for(const t of[-1,1])Et(n,.13,.34,.85,et.fabricBeige,t*.36,.24,0);return we(n,.85,.85)}function pv(){const n=new jt;Et(n,1.1,.04,.6,et.woodLight,0,.38,0);for(const t of[-1,1])for(const e of[-1,1])Et(n,.05,.38,.05,et.woodDark,t*.5,0,e*.25);return Et(n,.3,.05,.2,et.white,-.2,.42,0),Le(n,.06,.05,.1,et.accent,.25,.42,.05),we(n,1.1,.6)}let zi=null;function mv(){if(zi)return zi;if(typeof document>"u"||typeof document.createElement!="function"){const e={width:512,height:288};return zi=new wo(e),zi}const n=document.createElement("canvas");n.width=512,n.height=288;const t=n.getContext?.("2d");if(t){const e=t.createLinearGradient?.(0,0,512,288);e?(e.addColorStop(0,"#0a1128"),e.addColorStop(1,"#1c2541"),t.fillStyle=e):t.fillStyle="#0f172a",t.fillRect?.(0,0,512,288),t.fillStyle="rgba(255, 255, 255, 0.08)",t.fillRect?.(0,0,512,32),t.fillStyle="#ffffff",t.font="bold 14px system-ui, sans-serif",t.fillText?.("TH-PropTech Smart TV",16,21),t.font="12px system-ui, sans-serif",t.fillStyle="#94a3b8",t.fillText?.("20:45 | Wi-Fi 6 | 4K HDR",345,21),t.fillStyle="rgba(255, 255, 255, 0.06)",t.fillRect?.(16,44,480,136),t.fillStyle="#f59e0b",t.font="bold 19px system-ui, sans-serif",t.fillText?.("CĂN HỘ CHUNG CƯ HIỆN ĐẠI",32,86),t.fillStyle="#e2e8f0",t.font="13px system-ui, sans-serif",t.fillText?.("Trải nghiệm không gian sống 3D tích hợp công nghệ đỉnh cao",32,114),t.fillStyle="#38bdf8",t.font="12px system-ui, sans-serif",t.fillText?.("▶ Đang phát: Giới thiệu căn hộ mẫu",32,148),[{name:"Phim Ảnh",color:"#e11d48"},{name:"Âm Nhạc",color:"#10b981"},{name:"Nhà Thông Minh",color:"#c65a3a"},{name:"Cài Đặt",color:"#475569"}].forEach((s,r)=>{const o=16+r*122;t.fillStyle=s.color,t.fillRect?.(o,194,114,76),t.fillStyle="#ffffff",t.font="bold 12px system-ui, sans-serif",t.fillText?.(s.name,o+12,238)})}return zi=new wo(n),zi.colorSpace=qe,zi}function gv(n,t){let e=n;if(e&&!e.userData?.isTvScreen&&e.traverse&&e.traverse(o=>{o.userData?.isTvScreen&&(e=o)}),!e||!e.userData?.isTvScreen)return null;const s=!!!e.userData.isTvOn;e.userData.isTvOn=s;const r=e.material;if(s){const o=mv();r.color?.setHex(16777215),r.emissive?.setHex(16777215),r.emissiveIntensity=.95,r.roughness=.1,r.metalness=.1,r.map=o,r.emissiveMap=o}else r.color?.setHex(328965),r.emissive?.setHex(0),r.emissiveIntensity=0,r.roughness=.2,r.metalness=.8,r.map=null,r.emissiveMap=null;return r.needsUpdate=!0,s}function _v(n=1.8){const t=new jt;Et(t,n,.45,.4,et.woodMid,0,0,0),Et(t,n-.1,.02,.38,et.woodDark,0,.22,.01),Et(t,1.35,.78,.05,et.black,0,.55,0),Et(t,.25,.1,.12,et.black,0,.45,0);const e=new Xt(new ue(1.28,.72,.005),new ke({color:328965,roughness:.2,metalness:.8,emissive:0,emissiveIntensity:0}));return e.name="tv_screen",e.position.set(0,.55+.78/2,.027),e.userData.isTvScreen=!0,e.userData.noMerge=!0,e.userData.isTvOn=!1,e.castShadow=!1,e.receiveShadow=!1,t.add(e),we(t,n,.4)}function xv(n,t,e=et.rug){e==="beige"&&(e=et.fabricBeige);const i=new jt;return Et(i,n,.015,t,e,0,.04,0),Et(i,n-.3,.017,t-.3,et.fabricGrey,0,.04,0),we(i,n,t,{solid:!1})}function vv(n=1){const t=new jt;return Le(t,.18*n,.13*n,.32*n,et.pot,0,0,0),go(t,.3*n,et.leaf,0,.62*n,0,1,1.2,1),go(t,.2*n,et.leafDark,.12*n,.85*n,.05*n),go(t,.18*n,et.leaf,-.1*n,.95*n,-.05*n),we(t,.4*n,.4*n)}function Mv(){const n=new jt;Le(n,.12,.12,.03,et.black,0,0,0),Le(n,.012,.012,1.5,et.black,0,.03,0);const t=Le(n,.15,.22,.28,16773590,0,1.45,0,{emissive:16769704,emissiveIntensity:.6});return t.castShadow=!1,we(n,.3,.3)}function bv(n=1){const t=new jt;Et(t,n,.04,.3,et.woodMid,0,.78,0),Et(t,n-.04,.5,.28,et.cabinet,0,.28,0);for(const e of[-1,1])Et(t,.04,.28,.04,et.woodDark,e*(n/2-.05),0,0);return Le(t,.07,.05,.16,et.pot,-.25,.82,0),Et(t,.22,.02,.15,et.accent,.2,.82,0),we(t,n,.3)}function yv(n=1.6,t=2){const e=new jt;Et(e,n+.1,.25,t+.05,et.woodDark,0,0,0),Et(e,n,.22,t,et.bedding,0,.25,.02),Et(e,n,.04,t*.55,et.blanket,0,.46,t*.2),Et(e,n+.1,.95,.08,et.woodMid,0,0,-t/2-0);for(const i of[-1,1])Et(e,.55,.12,.35,et.white,i*n*.25,.47,-t/2+.3);return we(e,n+.1,t+.05)}function Sv(){const n=new jt;Et(n,.45,.5,.4,et.woodLight,0,0,0),Et(n,.4,.01,.01,et.woodDark,0,.3,.2);const t=Le(n,.09,.12,.16,16773590,0,.5,0,{emissive:16769704,emissiveIntensity:.5});return t.castShadow=!1,we(n,.45,.4)}function Ev(n=1.4,t=2.2){const e=new jt;Et(e,n,t,.6,et.cabinet,0,0,0);const i=Math.max(2,Math.round(n/.7));for(let s=1;s<i;s++)Et(e,.012,t-.1,.01,et.cabinetDark,-n/2+n/i*s,.05,.305);for(let s=0;s<i;s++){const r=-n/2+n/i*(s+.5);Et(e,.025,.28,.02,et.steel,r+(s%2?-.1:.1),1,.31)}return we(e,n,.6)}function Tv(){const n=new jt;Et(n,1.2,.04,.6,et.woodLight,0,.72,0);for(const t of[-1,1])Et(n,.04,.72,.55,et.woodDark,t*.56,0,0);return Et(n,.5,.3,.03,et.black,0,.9,-.12),Et(n,.06,.18,.06,et.black,0,.76,-.12),Et(n,.4,.015,.14,et.white,0,.76,.1),we(n,1.2,.6)}function wv(){const n=new jt;Et(n,.42,.04,.42,et.woodLight,0,.44,0);for(const t of[-1,1])for(const e of[-1,1])Et(n,.035,.44,.035,et.woodDark,t*.18,0,e*.18);return Et(n,.42,.42,.04,et.woodLight,0,.48,-.19),we(n,.42,.42)}function Av(){const n=new jt;Et(n,1.4,.05,.8,et.woodLight,0,.72,0);for(const t of[-1,1])for(const e of[-1,1])Et(n,.06,.72,.06,et.woodDark,t*.64,0,e*.34);return Le(n,.11,.08,.16,et.white,0,.77,0),go(n,.1,et.accent,0,1,0),we(n,1.4,.8)}function Rv(n=3,t=!0){const e=new jt,i=.6;Et(e,n,.86,i,et.cabinet,0,0,0),Et(e,n+.02,.04,i+.04,et.counter,0,.86,.02);for(let s=1;s<Math.round(n/.6);s++)Et(e,.01,.8,.01,et.cabinetDark,-n/2+s*.6,.03,i/2+.005);Et(e,.7,.012,.42,et.steel,-n*.25,.9,.02),Le(e,.015,.015,.28,et.steel,-n*.25,.9,-.2),Et(e,.012,.012,.14,et.steel,-n*.25,1.17,-.13),Et(e,.6,.012,.5,et.black,n*.2,.9,.02);for(const[s,r]of[[-.14,-.1],[.14,-.1],[-.14,.12],[.14,.12]])Le(e,.08,.08,.008,et.cabinetDark,n*.2+s,.9,.02+r,{},20);return Et(e,n,.7,.35,et.cabinet,0,1.5,-.125),Et(e,.75,.12,.4,et.steel,n*.2,1.38,-.1),we(e,n,i)}function Cv(){const n=new jt;return Et(n,.7,1.85,.7,et.steel,0,0,0,{metalness:.35,roughness:.4}),Et(n,.68,.012,.01,et.cabinetDark,0,.62,.355),Et(n,.025,.5,.03,et.cabinetDark,.28,1.1,.36),Et(n,.025,.3,.03,et.cabinetDark,.28,.25,.36),we(n,.7,.7)}function Pv(n=1.2){const t=new jt,e=.32,i=2;Et(t,.03,i,e,et.woodMid,-n/2+.015,0,0),Et(t,.03,i,e,et.woodMid,n/2-.015,0,0),Et(t,n,.02,.01,et.woodDark,0,0,-e/2+.005),Et(t,n,i,.015,et.woodDark,0,0,-e/2+.01);const s=5,r=[et.accent,et.sofa,et.fabricBeige,et.leaf,et.blanket];for(let o=0;o<=s;o++)Et(t,n,.025,e,et.woodMid,0,(i-.025)*(o/s),0);for(let o=0;o<s;o++){const a=(i-.025)*(o/s)+.025;let c=-n/2+.07;for(let l=0;c<n/2-.12;l++){const u=.04+(o*7+l*5)%4*.012,f=.22+(o*3+l*7)%5*.025;Et(t,u,f,e*.7,r[(o+l)%r.length],c+u/2,a,.02),c+=u+.008,l%6===5&&(c+=.18)}}return we(t,n,e)}function Lv(){const n=new jt;Et(n,1,.8,.45,et.woodLight,0,.05,0);for(const t of[-1,1])for(const e of[-1,1])Et(n,.04,.05,.04,et.woodDark,t*.45,0,e*.19);for(let t=0;t<3;t++)Et(n,.92,.002,.01,et.woodDark,0,.05+.26*(t+1)-.02,.226),Et(n,.1,.02,.025,et.steel,0,.05+.26*t+.13,.235);return Le(n,.07,.06,.12,et.pot,-.3,.85,0),Et(n,.22,.03,.16,et.accent,.25,.85,0),we(n,1,.45)}function Dv(){const n=new jt;return Le(n,.24,.24,.03,et.woodLight,0,.47,0,{},28),Le(n,.015,.015,.47,et.black,0,0,0),Le(n,.15,.15,.02,et.black,0,0,0),Le(n,.05,.04,.09,et.pot,.06,.5,.03),we(n,.5,.5)}function Iv(){const n=new jt;return Le(n,.28,.3,.38,et.fabricBeige,0,.02,0,{},28),Le(n,.29,.29,.04,et.sofaDark,0,.38,0,{},28),we(n,.6,.6)}function Nv(){const n=new jt;return Le(n,.17,.17,.05,et.woodLight,0,.62,0,{},24),Le(n,.014,.014,.62,et.black,0,0,0),Le(n,.15,.15,.02,et.black,0,0,0),we(n,.36,.36)}function Uv(){const n=new jt;return Et(n,.6,1.7,.04,et.woodDark,0,.05,0),Et(n,.5,1.6,.012,13624303,0,.1,.022,{metalness:.9,roughness:.08}),Et(n,.04,.5,.2,et.woodDark,-.2,0,-.12),Et(n,.04,.5,.2,et.woodDark,.2,0,-.12),we(n,.6,.3)}function Ov(){const n=new jt;return Et(n,.38,.4,.2,et.white,0,.35,-.2),Et(n,.36,.38,.5,et.white,0,0,0),Et(n,.36,.04,.4,et.white,0,.38,.05),we(n,.4,.62)}function Fv(){const n=new jt;return Et(n,.6,.78,.5,et.cabinet,0,0,0),Et(n,.64,.04,.54,et.counter,0,.78,0),Et(n,.34,.01,.28,et.white,0,.82,.02),Le(n,.012,.012,.16,et.steel,0,.82,-.18),Et(n,.5,.7,.02,et.glass,0,1.15,-.24,{transparent:!0,opacity:.55,metalness:.8,roughness:.05}),we(n,.64,.54)}function zv(){const n=new jt;Et(n,.9,.06,.9,et.white,0,0,0);const t=new Xt(new ue(.9,1.95,.025),Pl());t.position.set(0,.06+.975,.45),n.add(t);const e=new Xt(new ue(.025,1.95,.9),Pl());return e.position.set(.45,.06+.975,0),n.add(e),Le(n,.012,.012,1.1,et.steel,-.38,1,-.38),Le(n,.09,.09,.015,et.steel,-.3,2.05,-.38),we(n,.9,.9)}function Bv(n,t,e,i,s,r=0){if(e.group.position.set(i,0,s),e.group.rotation.y=r,n.add(e.group),e.solid===!1)return e.group;const o=Math.abs(Math.sin(r))>.5,a=o?e.d:e.w,c=o?e.w:e.d;return t.push({x0:i-a/2,x1:i+a/2,z0:s-c/2,z1:s+c/2}),e.group}const kv={sofa:hv,armchair:fv,coffeeTable:pv,tvUnit:_v,rug:xv,plant:vv,floorLamp:Mv,console:bv,bed:yv,nightstand:Sv,wardrobe:Ev,desk:Tv,chair:wv,diningTable:Av,kitchenRun:Rv,fridge:Cv,toilet:Ov,vanity:Fv,shower:zv,bookshelf:Pv,dresser:Lv,sideTable:Dv,ottoman:Iv,barStool:Nv,standingMirror:Uv};function Hv(n){n.updateMatrixWorld(!0);const t=new Map;for(const e of[...n.children]){if(!e.isMesh||e.userData.noMerge)continue;const i=e.material.uuid+(e.castShadow?"c":"n");t.has(i)||t.set(i,{material:e.material,cast:e.castShadow,geos:[]});const s=e.geometry.clone();s.applyMatrix4(e.matrix),t.get(i).geos.push(s),e.geometry.dispose(),n.remove(e)}for(const e of t.values()){const i=e.geos.length>1?or(e.geos,!1):e.geos[0];if(e.geos.length>1)for(const r of e.geos)r.dispose();const s=new Xt(i,e.material);s.castShadow=e.cast,s.receiveShadow=!0,n.add(s)}}function Gv(){const n=new jt,t=[],e=new Map;for(const i of at.placements){const s=kv[i.kind];if(!s)throw new Error("Thiếu builder nội thất: "+i.kind);const r=s(...i.args??[]);(i.pick===!1||i.hidden)&&(r.solid=!1),Hv(r.group);const o=Bv(n,t,r,i.x,i.z,i.rot??0);o.name=i.id,i.hidden&&(o.visible=!1),e.set(i.id,o)}return{root:n,colliders:t,groups:e}}const Wi={room:new Map,item:new Map,opening:new Map},Vv={window:"Cửa sổ",door:"Cửa đi",open:"Ô thông"};function Mh(n,t){return at.rooms.find(e=>n>=e.x0&&n<=e.x1&&t>=e.z0&&t<=e.z1)??null}function bh(){Wi.room=new Map(at.rooms.map(n=>[n.id,{...n,type:"room",area:Ki(n)}])),Wi.item=new Map(at.placements.filter(n=>n.pick).map(n=>[n.id,{...n,type:"item",roomId:Mh(n.x,n.z)?.id??null,dims:null}])),Wi.opening=new Map(at.walls.flatMap(n=>n.openings.filter(t=>t.id).map(t=>[t.id,{...t,kind:t.type,type:"opening",name:Wv(t.type),dir:n.dir,at:n.at,wallFrom:n.from,wallTo:n.to,roomId:null}])))}const Wv=n=>Vv[n]??"Cửa",re={get:(n,t)=>Wi[n]?.get(t)??null,list:n=>[...Wi[n]?.values()??[]],itemsIn:n=>[...Wi.item.values()].filter(t=>t.roomId===n),room:n=>Wi.room.get(n)??null},Jr=.14,Xv=new Ot(15985891),$v=new Ot(15913909),qv=new Ot(16758904),Yv=new Ot(16775406);function jv(n){const t=[];n.traverse(e=>{e.isCSS2DObject&&t.push(e)});for(const e of t)e.removeFromParent()}function Kv(n){n.traverse(t=>{t.isMesh&&(t.geometry?.dispose(),t.material?.map&&(t.material.map.dispose(),t.material.dispose()))})}function Zv(n){const{scene:t,sun:e,hemi:i,quality:s}=n;let r=null,o=[],a=null,c=[];const l=new Map,u=new Map,f=[],d=[];let p=!1;const _=[],x=[],m=(b,y)=>`${b}:${y}`;let h=Jr,v=Jr,T=1.5,w=!1,I=10;function C(){for(const b of[r?.root,a?.root])b&&(jv(b),t.remove(b),Kv(b));r=a=null,c=[],l.clear(),u.clear(),f.length=0,d.length=0,_.length=0,x.length=0}function L(){const b=at.size.w,y=at.size.d;n.center.set(b/2,0,y/2),e.target.position.copy(n.center);const A=Math.max(b,y)*.9,D=e.shadow.camera;D.left=-A,D.right=A,D.top=A,D.bottom=-A,D.updateProjectionMatrix()}function g(){if(r=dv(),o=r.doors||[],a=Gv(),t.add(r.root,a.root),!s.pointLights)for(const y of r.lamps)r.root.remove(y);c=s.pointLights?r.lamps:[];for(const y of re.list("room")){const A=r.floors.get(y.id);l.set(m("room",y.id),A),f.push(A),u.set(m("room",y.id),new Rn(new F(y.x0,0,y.z0),new F(y.x1,.08,y.z1)))}const b=new F;for(const y of re.list("item")){const A=a.groups.get(y.id);if(!A)continue;A.userData.ref={type:"item",id:y.id},l.set(m("item",y.id),A),f.push(A);const D=new Rn().setFromObject(A);u.set(m("item",y.id),D),D.getSize(b),y.dims={w:b.x,d:b.z,h:b.y}}for(const y of r.openings)l.set(m("opening",y.id),y.mesh),u.set(m("opening",y.id),new Rn().setFromObject(y.mesh)),d.push(y.mesh);p&&f.push(...d),_.push(...r.walls.children.filter(y=>y.isMesh)),x.push(...r.colliders,...a.colliders),L(),S.snapWalking(w),S.setHour(I)}const S={pickables:f,blockers:_,colliders:x,get doors(){return o},toggleDoor(b){const y=typeof b=="string"?o.find(D=>D.id===b):b;if(!y)return null;const A=!y.isOpen;if(y.isOpen=A,y.targetRot=A?y.openRot:y.closedRot,y.collider){const D=x.indexOf(y.collider);A&&D>=0?x.splice(D,1):!A&&D<0&&x.push(y.collider)}return n.invalidate(),y},get walls(){return r?.walls},get ceiling(){return r?.ceiling},get labels(){return r?.labels??[]},getObject:(b,y)=>l.get(m(b,y))??null,getBox:(b,y=new Rn)=>{const A=u.get(m(b.type,b.id));return A?y.copy(A):null},getEntityPosition(b,y,A=new F){const D=u.get(m(b,y));return D?D.getCenter(A):null},setEditing(b){p=b;for(const y of d){const A=f.indexOf(y);b&&A<0&&f.push(y),!b&&A>=0&&f.splice(A,1)}},moveItem(b,y,A){const D=l.get(m("item",b));if(!D)return;D.position.x=y,D.position.z=A;const H=u.get(m("item",b));H&&H.setFromObject(D),n.invalidate()},rebuild(){C(),g(),n.invalidateShadows()},setWalking(b){w=b,h=b?1:Jr,T=b?16:1.5,t.environmentIntensity=b?.8:.25,!b&&r&&(r.ceiling.visible=!1),n.invalidate(3)},setCeiling(b){r&&(r.ceiling.visible=b),n.invalidateShadows()},setHour(b){I=b;const A=Ue.clamp((b-6)/12,0,1)*Math.PI,D=Math.sin(A),H=n.center;e.position.set(H.x-Math.cos(A)*16,3+D*15,H.z+8),e.intensity=.7+2.3*D,e.color.lerpColors(qv,Yv,Math.min(1,D*1.6)),i.intensity=.7+.6*D,t.background.lerpColors($v,Xv,Math.min(1,D*1.6)),t.fog.color.copy(t.background),n.invalidateShadows()},update(b){r&&v!==h&&(v+=(h-v)*Math.min(1,b*5),Math.abs(h-v)<.002&&(v=h),r.walls.scale.y=v,n.invalidateShadows());for(const y of c)y.intensity!==T&&(y.intensity+=(T-y.intensity)*Math.min(1,b*4),Math.abs(T-y.intensity)<.02&&(y.intensity=T),n.invalidate());for(const y of o){const A=y.targetRot-y.hinge.rotation.y;Math.abs(A)>.003?(y.hinge.rotation.y+=A*Math.min(1,b*9),n.invalidate()):y.hinge.rotation.y!==y.targetRot&&(y.hinge.rotation.y=y.targetRot,n.invalidateShadows())}},snapWalking(b){w=b,v=h=b?1:Jr,T=b?16:1.5,t.environmentIntensity=b?.8:.25,r&&(r.walls.scale.y=v,r.ceiling.visible=b);for(const y of c)y.intensity=T;n.invalidateShadows()},wallHeight:Ti};return g(),S}const $e=1.62,ei=.85,Jv=14,Qv=3.26,bs=.12,tM=.95,pr=.28,eM=1.9,nM=3.4,td=.0036,Qr=.3,iM=.05,ed={KeyW:[0,-1],ArrowUp:[0,-1],KeyS:[0,1],ArrowDown:[0,1],KeyA:[-1,0],KeyD:[1,0]},Pa={ArrowLeft:1,ArrowRight:-1,KeyQ:1,KeyE:-1};function cc(n,t,e,i=pr){const s=Math.max(n.x0,Math.min(t,n.x1)),r=Math.max(n.z0,Math.min(e,n.z1)),o=t-s,a=e-r;return o*o+a*a<i*i}function Il(n,t,e=pr,i=[]){let s=2.7;if(at?.walls)for(const r of at.walls){const o=(r.t??.12)/2;for(const a of r.openings??[]){if(a.type!=="door"&&a.type!=="open")continue;const c=a.type==="door"?2.1:2.3,l=a.c-a.w/2,u=a.c+a.w/2;let f,d,p,_;r.dir==="x"?(f=l,d=u,p=r.at-o,_=r.at+o):(f=r.at-o,d=r.at+o,p=l,_=u);const x=Math.max(f,Math.min(n,d)),m=Math.max(p,Math.min(t,_)),h=n-x,v=t-m;h*h+v*v<e*e&&c<s&&(s=c)}}if(i)for(const r of i)r.y0!==void 0&&r.y0<s&&cc(r,n,t,e)&&r.y0<s&&(s=r.y0);return s}function La(n,t,e,i=$e+bs){for(const s of n)if(!(s.y0!==void 0&&s.y0>i)&&!(s.y1!==void 0&&s.y1<0)&&cc(s,t,e))return!0;return!1}function sM(n,t,e,i,s){const r=$e+bs;if(Il(t,e,pr,n)<r||typeof s=="function"&&!s(t,e,r))return!1;for(const a of n)if(a.y0!==void 0&&a.y0<r&&(a.y1===void 0||a.y1>i)&&cc(a,t,e))return!1;return!0}function rM({camera:n,dom:t,colliders:e,clearanceCheck:i}){const s={x:5,z:.7,yaw:Math.PI,pitch:0,enabled:!1,jumpY:0,vy:0,grounded:!0,eyeHeight:$e,crouching:!1,crouchBlocked:!1,targetEyeHeight:$e,posture:"standing"},r=new Set;let o=!1,a=!1,c=null,l=null;const u={x:0,z:0};function f(){return!s.enabled||!s.grounded||Il(s.x,s.z,pr,e)<=s.eyeHeight+bs?!1:(s.vy=Qv,s.grounded=!1,s.posture="jumping",!0)}const d=h=>{if(!(!s.enabled||/^(INPUT|TEXTAREA|SELECT)$/.test(h.target?.tagName??""))){if(h.code==="Space"&&!h.repeat){f(),h.preventDefault?.();return}if(h.code==="KeyC"){h.repeat||(a=!a,s.targetEyeHeight=a?ei:$e),h.preventDefault?.();return}if(h.code==="ControlLeft"||h.code==="ControlRight"){o=!0,s.targetEyeHeight=ei,h.preventDefault?.();return}(ed[h.code]||Pa[h.code]||h.code==="ShiftLeft")&&(r.add(h.code),h.preventDefault?.())}},p=h=>{r.delete(h.code),(h.code==="ControlLeft"||h.code==="ControlRight")&&(o=!1,a||(s.targetEyeHeight=$e))},_=()=>{r.clear(),o=!1,a=!1,s.targetEyeHeight=$e};window.addEventListener("keydown",d),window.addEventListener("keyup",p),window.addEventListener("blur",_),t.addEventListener("pointerdown",h=>{s.enabled&&(c={id:h.pointerId,x:h.clientX,y:h.clientY},t.setPointerCapture?.(h.pointerId))}),t.addEventListener("pointermove",h=>{!c||h.pointerId!==c.id||(s.yaw-=(h.clientX-c.x)*td,s.pitch=Ue.clamp(s.pitch-(h.clientY-c.y)*td,-1.25,1.25),c.x=h.clientX,c.y=h.clientY)});const x=h=>{c&&h.pointerId===c.id&&(c=null)};t.addEventListener("pointerup",x),t.addEventListener("pointercancel",x);function m(){n.position.set(s.x,s.eyeHeight+s.jumpY,s.z),n.rotation.set(s.pitch,s.yaw,0,"YXZ")}return{state:s,jump:f,setCrouch(h){a=!!h,h||(o=!1),s.targetEyeHeight=a?ei:$e},toggleCrouch(){a=!a,a||(o=!1),s.targetEyeHeight=a?ei:$e},set(h,v,T,w=0){s.x=h,s.z=v,s.yaw=T,s.pitch=w,s.jumpY=0,s.vy=0,s.grounded=!0},setEnabled(h){s.enabled=h,l=null,h||(r.clear(),o=!1,a=!1,c=null,u.x=u.z=0,s.jumpY=0,s.vy=0,s.grounded=!0,s.crouching=!1,s.crouchBlocked=!1,s.eyeHeight=$e,s.targetEyeHeight=$e,s.posture="standing")},setAxis(h,v){u.x=h,u.z=v},press(h,v){h==="Space"?v&&f():h==="KeyC"?v&&(a=!a,s.targetEyeHeight=a?ei:$e):h==="ControlLeft"||h==="ControlRight"?(o=!!v,s.targetEyeHeight=o||a?ei:$e):v?r.add(h):r.delete(h)},update(h){if(!s.enabled)return!1;const v=Math.min(h,iM);o||a?(s.targetEyeHeight=ei,s.crouchBlocked=!1):sM(e,s.x,s.z,s.eyeHeight,i)?(s.targetEyeHeight=$e,s.crouchBlocked=!1):(s.targetEyeHeight=ei,s.crouchBlocked=!0);const w=s.targetEyeHeight-s.eyeHeight;if(Math.abs(w)>.001?s.eyeHeight+=w*(1-Math.exp(-14*v)):s.eyeHeight=s.targetEyeHeight,s.crouching=s.eyeHeight<$e-.05||s.targetEyeHeight===ei,!s.grounded||s.jumpY>0||s.vy!==0){s.vy-=Jv*v,s.jumpY+=s.vy*v;const b=Il(s.x,s.z,pr,e);s.eyeHeight+s.jumpY+bs>=b&&(s.jumpY=Math.max(0,b-s.eyeHeight-bs),s.vy>0&&(s.vy=0)),s.jumpY<=0?(s.jumpY=0,s.vy=0,s.grounded=!0):s.grounded=!1}!s.grounded||s.jumpY>.001?s.posture="jumping":s.crouching?s.posture="crouching":s.posture="standing";for(const b of r)Pa[b]&&(s.yaw+=Pa[b]*1.8*v);let I=u.x,C=u.z;for(const b of r){const y=ed[b];y&&(I+=y[0],C+=y[1])}if(I||C){const b=Math.max(1,Math.hypot(I,C));I/=b,C/=b;let y=eM;s.crouching?y=tM:r.has("ShiftLeft")&&(y=nM);const A=y*v,D=Math.sin(s.yaw),H=Math.cos(s.yaw),N=(I*H+C*D)*A,G=(-I*D+C*H)*A,R=Ue.clamp(s.x+N,Qr,at.size.w-Qr),O=Ue.clamp(s.z+G,Qr,at.size.d-Qr),B=s.eyeHeight+bs,K=La(e,s.x,s.z,B);(K||!La(e,R,s.z,B))&&(s.x=R),(K||!La(e,s.x,O,B))&&(s.z=O)}m();const L=s.eyeHeight+s.jumpY,g=s.x+s.z*31+L*73+s.yaw*57+s.pitch*91,S=l===null||Math.abs(g-l)>1e-4;return l=g,S},applyToCamera:m,dispose(){window.removeEventListener("keydown",d),window.removeEventListener("keyup",p),window.removeEventListener("blur",_)}}}const oM={mode:"overview",roomId:null,selection:null,hover:null,hour:10,playing:!1,menu:null,searchQuery:"",editable:!1,editing:!1,tool:null,listingArea:0,floorId:null,editPanel:null,designs:[],designId:null};function aM(n){let t={...n};const e=new Set;return{get state(){return t},set(i){const s=t,r=Object.keys(i).filter(o=>!Object.is(s[o],i[o]));if(r.length){t={...s,...i};for(const o of[...e])o(t,s,r)}},subscribe(i){return e.add(i),()=>e.delete(i)}}}const W=aM(oM);W.select=function(t){if(!t)return W.set({selection:null});const e=re.get(t.type,t.id);if(!e)return;const i=t.type==="opening"?W.state.roomId:e.roomId??e.id;W.set({selection:{type:t.type,id:t.id},roomId:i,menu:null})};function lM(){const n=new Map;return{on(t,e){return n.has(t)||n.set(t,new Set),n.get(t).add(e),()=>n.get(t)?.delete(e)},emit(t,e){for(const i of[...n.get(t)??[]])i(e)}}}const wt=lM();function to(){const{w:n,d:t}=at.size;return{target:{x:n/2,y:0,z:t/2},distance:Math.max(n,t)*1.1+7.5,azimuth:Math.PI-.5,polar:.95}}function cM(){for(const n of at.walls){const t=n.openings.find(e=>e.entrance);if(t)return n.dir==="x"?{x:t.c,z:n.at+.75,yaw:n.at===0?Math.PI:0}:{x:n.at+.75,z:t.c,yaw:n.at===0?-Math.PI/2:Math.PI/2}}return{x:at.size.w/2,z:at.size.d/2,yaw:Math.PI}}const uM={zoomIn:.75,zoomOut:1.33},eo=Math.PI/6,no=.12;function dM(n,t,e){const{camera:i,controls:s}=n,r=new F;let o=!1,a=null;const c=()=>a??n.getView();function l(R,O){const B={...n.getView(),...R,target:R.target??s.target.clone()};a=B,n.flyView(R,O).then(()=>{a===B&&(a=null)})}function u(R){const O=c(),B=R.x1-R.x0,K=R.z1-R.z0;return{target:{x:(R.x0+R.x1)/2,y:0,z:(R.z0+R.z1)/2},distance:Math.max(B,K)*1.45+3.5,azimuth:O.azimuth,polar:Ue.clamp(O.polar,.7,1.1)}}function f(R,O=8){const B=t.getEntityPosition(R.type,R.id,new F);if(!B)return null;const K=c();return{target:{x:B.x,y:0,z:B.z},distance:O,azimuth:K.azimuth,polar:Ue.clamp(K.polar,.7,1.1)}}let d="standing",p=null,_=null;function x({x:R,z:O,yaw:B,pitch:K=0}){const ht=new An().setFromEuler(new vn(K,B,0,"YXZ"));return{pos:new F(R,$e,O),quat:ht,fov:Js}}function m(R,O){if(!O||O.x===void 0||O.z===void 0)return!1;const B=O.rot??0,K=Math.abs(Math.sin(B))>.5,ht=K?O.dims?.d??O.dims?.len??.95:O.dims?.w??2.4,rt=K?O.dims?.w??2.4:O.dims?.d??O.dims?.len??.95,st=O.x-ht/2,ut=O.x+ht/2,pt=O.z-rt/2,Q=O.z+rt/2;return Math.abs(R.x0-st)<.1&&Math.abs(R.x1-ut)<.1&&Math.abs(R.z0-pt)<.1&&Math.abs(R.z1-Q)<.1}function h(R,O,B=.28,K=null){const ht=at?.size?.w??10,rt=at?.size?.d??7;if(R<.35||R>ht-.35||O<.35||O>rt-.35)return!1;for(const st of t.colliders||[]){if(K&&m(st,K))continue;const ut=Math.max(st.x0,Math.min(R,st.x1)),pt=Math.max(st.z0,Math.min(O,st.z1)),Q=R-ut,xt=O-pt;if(Q*Q+xt*xt<B*B)return!1}return!0}function v(R,O,B){const K=R?.rot??0;if(O==="sitting"){const rt=(R?.dims?.d??.95)/2+.55,st=(R?.x??5)+Math.sin(K)*rt,ut=(R?.z??.7)+Math.cos(K)*rt;if(h(st,ut))return{x:st,z:ut,yaw:K+Math.PI}}else if(O==="lying"){const rt=(R?.dims?.w??1.6)/2+.5,st=(R?.x??5)+Math.cos(K)*rt,ut=(R?.z??.7)-Math.sin(K)*rt;if(h(st,ut))return{x:st,z:ut,yaw:K+Math.PI};const pt=(R?.x??5)-Math.cos(K)*rt,Q=(R?.z??.7)+Math.sin(K)*rt;if(h(pt,Q))return{x:pt,z:Q,yaw:K+Math.PI};const mt=(R?.dims?.d??R?.dims?.len??2)/2+.55,Nt=(R?.x??5)+Math.sin(K)*mt,Ht=(R?.z??.7)+Math.cos(K)*mt;if(h(Nt,Ht))return{x:Nt,z:Ht,yaw:K+Math.PI}}return B&&h(B.x,B.z,.28,R)?{x:B.x,z:B.z,yaw:B.yaw??Math.PI}:h(5,1.5)?{x:5,z:1.5,yaw:Math.PI}:{x:at?.size?.w/2,z:at?.size?.d/2,yaw:Math.PI}}async function T(R,O=.8){if(!R||d!=="standing"||W.state.mode!=="walk")return!1;const B=re.get("item",R.id)??R;_={x:e.state.x,z:e.state.z,yaw:e.state.yaw,pitch:e.state.pitch},e.setEnabled(!1),s.enabled=!1;const K=B.rot??0,ht=B.x+Math.sin(K)*.08,rt=B.z+Math.cos(K)*.08,st=1.1,ut=K+Math.PI,pt=0;d="sitting",p=B.id,W.set({posture:"sitting",activeFurnitureId:B.id});const Q=new An().setFromEuler(new vn(pt,ut,0,"YXZ")),xt={pos:new F(ht,st,rt),quat:Q,fov:Js},mt=await n.flyPose(xt,{duration:O});return mt&&d==="sitting"&&(e.set(ht,rt,ut,pt),n.invalidate()),mt}async function w(R,O=.9){if(!R||d!=="standing"||W.state.mode!=="walk")return!1;const B=re.get("item",R.id)??R;_={x:e.state.x,z:e.state.z,yaw:e.state.yaw,pitch:e.state.pitch},e.setEnabled(!1),s.enabled=!1;const K=B.rot??0,ht=B.x-Math.sin(K)*.65,rt=B.z-Math.cos(K)*.65,st=.65,ut=K+Math.PI,pt=-.35;d="lying",p=B.id,W.set({posture:"lying",activeFurnitureId:B.id});const Q=new An().setFromEuler(new vn(pt,ut,0,"YXZ")),xt={pos:new F(ht,st,rt),quat:Q,fov:Js},mt=await n.flyPose(xt,{duration:O});return mt&&d==="lying"&&(e.set(ht,rt,ut,pt),n.invalidate()),mt}async function I(R=.7){if(d==="standing"||W.state.mode!=="walk")return!1;const O=d,B=p?re.get("item",p)??{}:null;d="standing",p=null,W.set({posture:"standing",activeFurnitureId:null});const K=v(B,O,_);e.setEnabled(!1);const ht=new An().setFromEuler(new vn(0,K.yaw,0,"YXZ")),rt={pos:new F(K.x,$e,K.z),quat:ht,fov:Js},st=await n.flyPose(rt,{duration:R});return st&&W.state.mode==="walk"&&(e.set(K.x,K.z,K.yaw,0),e.setEnabled(!0),n.invalidate()),st}async function C(R,O=1.4){d!=="standing"&&(d="standing",p=null,W.set({posture:"standing",activeFurnitureId:null})),s.enabled=!1,e.setEnabled(!1),t.setWalking(!0),e.set(R.x,R.z,R.yaw,0),!(!await n.flyPose(x(R),{duration:O})||W.state.mode!=="walk")&&(t.setCeiling(!0),e.setEnabled(!0),n.invalidate())}async function L(R=to(),O=1.4){d!=="standing"&&(d="standing",p=null,W.set({posture:"standing",activeFurnitureId:null})),e.setEnabled(!1),t.setWalking(!1);const B=n.viewPose({...R,target:R.target});!await n.flyPose(B,{duration:O})||W.state.mode!=="overview"||(n.camera.fov=B.fov,n.camera.updateProjectionMatrix(),s.target.set(R.target.x,0,R.target.z),s.enabled=!0,s.update(),n.invalidate())}function g(R){return R?.stand??cM()}function S(R){const O=re.room(W.state.roomId);R==="walk"?C(g(O)):L(O?u(O):to())}function b(R){const O=re.room(R);if(O)if(d!=="standing"&&(d="standing",p=null,W.set({posture:"standing",activeFurnitureId:null})),W.set({roomId:R}),W.state.mode==="walk"){e.setEnabled(!1);const B=g(O);e.set(B.x,B.z,B.yaw,0),n.flyPose(x(B),{duration:1}).then(K=>{K&&W.state.mode==="walk"&&e.setEnabled(!0)})}else l(u(O),{duration:1.1})}function y(R){if(i.updateMatrixWorld(),r.copy(R).project(i),r.z>1)return null;const O=n.renderer.domElement.clientWidth,B=n.renderer.domElement.clientHeight,{left:K,right:ht,top:rt,bottom:st}=n.insets,ut=(r.x+1)/2*O,pt=(1-r.y)/2*B,Q=Math.max(1,O-K-ht),xt=Math.max(1,B-rt-st);return{fx:(ut-K)/Q,fy:(pt-rt)/xt}}function A(R){if(W.state.mode!=="overview"||n.flying)return;const O=t.getEntityPosition(R.type,R.id,new F);if(!O)return;const B=n.getView(),K=y(O.clone().setY(.4));if(K&&K.fx>no&&K.fx<1-no&&K.fy>no&&K.fy<1-no&&B.distance<22)return;const rt=f(R,Math.min(B.distance,9));rt&&l(rt,{duration:.9})}function D(R){const O=t.getEntityPosition(R.type,R.id,new F);if(O)if(d!=="standing"&&(d="standing",p=null,W.set({posture:"standing",activeFurnitureId:null})),W.state.mode==="walk"){const B=re.room(W.state.roomId)??re.room(Mh(O.x,O.z)?.id),K=B?(B.x0+B.x1)/2:O.x,ht=B?(B.z0+B.z1)/2:O.z,rt=new Ut(K-O.x,ht-O.z);rt.lengthSq()<1e-4&&rt.set(0,1),rt.normalize();const st={x:Ue.clamp(O.x+rt.x*1.9,.35,9.65),z:Ue.clamp(O.z+rt.y*1.9,.35,6.65)},ut=Math.atan2(-(O.x-st.x),-(O.z-st.z));e.setEnabled(!1),e.set(st.x,st.z,ut,-.12),n.flyPose(x({...st,yaw:ut,pitch:-.12}),{duration:.9}).then(pt=>{pt&&W.state.mode==="walk"&&e.setEnabled(!0)})}else{const B=f(R,R.type==="room"?12:6.5);B&&l(B,{duration:1})}}function H({cmd:R}={}){if(W.state.mode==="walk"){R==="rotateLeft"||R==="rotateRight"?(e.state.yaw+=R==="rotateLeft"?eo:-eo,n.invalidate()):R==="home"&&b(W.state.roomId??"living");return}const O=c(),B={target:O.target,distance:O.distance,azimuth:O.azimuth,polar:O.polar};switch(R){case"zoomIn":case"zoomOut":return l({...B,distance:O.distance*uM[R]},{duration:.45});case"rotateLeft":case"rotateRight":return l({...B,azimuth:O.azimuth+(R==="rotateLeft"?-eo:eo)},{duration:.6});case"home":return l(to(),{duration:1.1})}}const N=[W.subscribe((R,O,B)=>{n.invalidate(),B.includes("mode")&&!o?S(R.mode):B.includes("selection")&&R.selection&&R.selection.type==="item"&&!R.editing&&A(R.selection)}),wt.on("room:go",({id:R})=>b(R)),wt.on("camera:locate",R=>R.type==="room"?b(R.id):D(R)),wt.on("camera:cmd",H),wt.on("furniture:sit",({item:R})=>T(R)),wt.on("furniture:lie",({item:R})=>w(R)),wt.on("furniture:stand",()=>I())],G={start({walk:R=!1,room:O=null}={}){a=null;const B=O?re.room(O):null;if(B&&W.set({roomId:B.id}),R){o=!0,W.set({mode:"walk"}),o=!1,s.enabled=!1;const K=g(B);e.set(K.x,K.z,K.yaw,0),e.applyToCamera(),i.fov=Js,i.updateProjectionMatrix(),t.snapWalking(!0),e.setEnabled(!0)}else o=!0,W.set({mode:"overview"}),o=!1,e.setEnabled(!1),i.fov=Ll,i.updateProjectionMatrix(),t.snapWalking(!1),s.enabled=!0,n.flyView(B?u(B):to(),{duration:0})},update(){W.state.mode==="overview"&&s.enabled&&!n.flying&&s.update()},sitOn:T,lieOn:w,standUp:I,getPosture:()=>d,isSeatedOrLying:()=>d==="sitting"||d==="lying",getActiveItemId:()=>p,dispose(){N.forEach(R=>R())}};return n.director=G,t.director=G,n.walker=e,G}const nd=6,hM=.12,fM=.05,yh=(n,t)=>n===t||!!n&&!!t&&n.type===t.type&&n.id===t.id;function pM(n,t){const e=new jt;e.name="interaction-overlay",n.scene.add(e);const i=mM(n,t),s=id(e,"selected"),r=id(e,"hover"),o=()=>{const{hover:l,selection:u}=W.state;s.show(u,t),r.show(yh(l,u)?null:l,t),n.invalidate()},a=W.subscribe((l,u,f)=>{(f.includes("selection")||f.includes("hover"))&&o()}),c={refresh:o,update(l){i.update(l)},getActivePrompt(){return i.getActivePrompt()},getActiveTarget(){return i.getActiveTarget()},findInteractableInCenter(l=2.8){return i.findInteractableInCenter(l)},findDoorInCenter(l=2.8){return i.findDoorInCenter(l)},triggerActive(){return i.triggerActive()},dispose(){a(),i.dispose(),n.scene.remove(e)}};return n.interaction=c,c}function mM(n,t){const e=()=>n.director||t.director;function i(L,g,S=3.5){if(!t.doors?.length)return null;const b=o.getBoundingClientRect();c.set((L-b.left)/b.width*2-1,-((g-b.top)/b.height)*2+1),a.setFromCamera(c,n.camera);const y=[];for(const H of t.doors)y.push(H.leaf);const A=a.intersectObjects([...y,...t.blockers],!0);if(!A.length)return null;const D=A[0];if(D.distance>S||D.object.userData?.blocker||t.blockers.includes(D.object))return null;for(let H=D.object;H;H=H.parent)if(H.userData?.door)return H.userData.door;return null}function s(L=2.8){const g=e(),S=g?.getPosture?.()??W.state.posture;if(S==="sitting")return{type:"sitting",id:W.state.activeFurnitureId??g?.getActiveItemId?.(),label:"Đứng dậy",action:()=>{g?.standUp?.()||wt.emit("furniture:stand"),n.invalidate?.()},object:null,target:null};if(S==="lying")return{type:"lying",id:W.state.activeFurnitureId??g?.getActiveItemId?.(),label:"Rời giường",action:()=>{g?.standUp?.()||wt.emit("furniture:stand"),n.invalidate?.()},object:null,target:null};if(W.state.mode!=="walk"||W.state.editing)return null;c.set(0,0),a.setFromCamera(c,n.camera);const b=[];if(t.doors?.length)for(const D of t.doors)D.leaf&&b.push(D.leaf);const y=[...b,...t.pickables||[],...t.blockers||[]],A=a.intersectObjects(y,!0);if(!A.length)return null;for(const D of A){if(D.distance>L||D.object.userData?.blocker||t.blockers?.includes(D.object))break;let H=null;for(let R=D.object;R;R=R.parent)if(R.userData?.door){H=R.userData.door;break}if(H)return{type:"door",id:H.id,label:H.isOpen?"Đóng cửa":"Mở cửa",action:()=>{t.toggleDoor(H),n.invalidate?.()},object:D.object,target:H};let N=null,G=null;for(let R=D.object;R;R=R.parent)if(R.userData?.ref&&re.get(R.userData.ref.type,R.userData.ref.id)){N=R.userData.ref,G=R;break}if(N&&N.type==="item"){const R=re.get("item",N.id);if(R){const O=R.kind;if(O==="sofa"||O==="armchair"||O==="chair")return{type:O,id:R.id,label:"Ngồi ghế",action:()=>{const B=e();B?B.sitOn(R):wt.emit("furniture:sit",{item:R}),n.invalidate?.()},object:G,target:R};if(O==="bed")return{type:"bed",id:R.id,label:"Nằm xuống",action:()=>{const B=e();B?B.lieOn(R):wt.emit("furniture:lie",{item:R}),n.invalidate?.()},object:G,target:R};if(O==="tvUnit"){let B=null;G.traverse(ht=>{ht.userData?.isTvScreen&&(B=ht)});const K=!!B?.userData?.isTvOn;return{type:"tvUnit",id:R.id,label:K?"Tắt TV":"Bật TV",action:()=>{gv(B||G),n.invalidate?.()},object:B||G,target:R}}}}N&&N.type}return null}function r(L=2.8){const g=s(L);if(g&&g.type==="door")return g.target;if(!t.doors?.length)return null;c.set(0,0),a.setFromCamera(c,n.camera);const S=[];for(const A of t.doors)S.push(A.leaf);const b=a.intersectObjects([...S,...t.blockers],!0);if(!b.length)return null;const y=b[0];if(y.distance>L||y.object.userData?.blocker||t.blockers.includes(y.object))return null;for(let A=y.object;A;A=A.parent)if(A.userData?.door)return A.userData.door;return null}const o=n.renderer.domElement,a=new ac,c=new Ut;let l=null,u=null,f=!1,d=0,p=null,_=null;function x(L,g){const S=o.getBoundingClientRect();c.set((L-S.left)/S.width*2-1,-((g-S.top)/S.height)*2+1),a.setFromCamera(c,n.camera);const b=a.intersectObjects([...t.pickables,...t.blockers],!0);for(const y of b){if(y.object.userData.blocker)return null;const A=gM(y.object);if(A)return A}return null}function m(L){yh(L,W.state.hover)||W.set({hover:L?{type:L.type,id:L.id}:null})}const h=L=>{L.pointerType==="mouse"&&(l={x:L.clientX,y:L.clientY},f=!0,u&&!u.dragging&&Math.hypot(L.clientX-u.x,L.clientY-u.y)>nd&&(u.dragging=!0,m(null)))},v=L=>{u={id:L.pointerId,x:L.clientX,y:L.clientY,button:L.button,dragging:!1}},T=L=>{const g=u;if(u=null,!g||g.id!==L.pointerId||g.dragging||g.button!==0||Math.hypot(L.clientX-g.x,L.clientY-g.y)>nd)return;if(W.state.mode==="walk"&&!W.state.editing){const b=e();if(b?.isSeatedOrLying?.()||W.state.posture==="sitting"||W.state.posture==="lying"){b?.standUp?.()||wt.emit("furniture:stand");return}const y=i(L.clientX,L.clientY);if(y){t.toggleDoor(y);return}const A=s(2.8);if(A){A.action();return}}const S=x(L.clientX,L.clientY);S?W.select(S):L.pointerType!=="mouse"&&W.select(null)},w=()=>{u=null},I=()=>{l=null,u||m(null)},C=L=>{if(!/^(INPUT|TEXTAREA|SELECT)$/.test(L.target?.tagName??"")){if(L.key==="Escape"){W.state.selection&&W.select(null);const g=e();if(g?.isSeatedOrLying?.()||W.state.posture==="sitting"||W.state.posture==="lying"){g?.standUp?.()||wt.emit("furniture:stand"),L.preventDefault?.();return}return}if(W.state.mode==="walk"&&!W.state.editing){const g=e();if((g?.isSeatedOrLying?.()||W.state.posture==="sitting"||W.state.posture==="lying")&&["KeyF","Space","KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(L.code)){g?.standUp?.()||wt.emit("furniture:stand"),L.preventDefault?.();return}if(L.code==="KeyF"){const b=s(2.8);b&&(b.action(),L.preventDefault())}}}};return o.addEventListener("pointermove",h),o.addEventListener("pointerdown",v),o.addEventListener("pointerup",T),o.addEventListener("pointercancel",w),o.addEventListener("pointerleave",I),window.addEventListener("keydown",C),{update(L){if(d+=L,W.state.mode==="walk"&&!W.state.editing&&!n.flying){const S=s(2.8),b=S?.label??null;b!==_?(_=b,p=S,W.set({interactPrompt:b}),wt.emit("hud:prompt",b)):p=S}else _!==null&&(_=null,p=null,W.set({interactPrompt:null}),wt.emit("hud:prompt",null));if(!l||u?.dragging||!f||d<hM||n.flying)return;if(f=!1,d=0,W.state.mode==="walk"&&!W.state.editing&&i(l.x,l.y)){o.style.cursor="pointer",m(null);return}const g=x(l.x,l.y);m(g),u||(o.style.cursor=g?"pointer":"")},getActivePrompt:()=>_,getActiveTarget:()=>p,findInteractableInCenter:s,findDoorInCenter:r,triggerActive:()=>p?.action?.(),dispose(){o.removeEventListener("pointermove",h),o.removeEventListener("pointerdown",v),o.removeEventListener("pointerup",T),o.removeEventListener("pointercancel",w),o.removeEventListener("pointerleave",I),window.removeEventListener("keydown",C)}}}function gM(n){for(let t=n;t;t=t.parent){if(t.visible===!1)return null;if(t.userData?.ref&&re.get(t.userData.ref.type,t.userData.ref.id))return t.userData.ref}return null}function _M(n=.22){const t=[];for(const i of[-.5,.5])for(const s of[-.5,.5])for(const r of[-.5,.5])t.push(i,s,r,i-Math.sign(i)*n,s,r),t.push(i,s,r,i,s-Math.sign(s)*n,r),t.push(i,s,r,i,s,r-Math.sign(r)*n);const e=new on;return e.setAttribute("position",new Re(t,3)),e}const xM=_M(),vM=new ue(1,1,1),MM={hover:{color:14262412,opacity:.6,fill:.06},selected:{color:12999226,opacity:1,fill:.14}};function id(n,t){const e=MM[t],i=new jt;i.visible=!1;const s=new gp(xM,new $d({color:e.color,transparent:!0,opacity:e.opacity,depthTest:!1,toneMapped:!1}));s.renderOrder=20;const r=new Xt(vM,new ji({color:e.color,transparent:!0,opacity:e.fill,depthWrite:!1,toneMapped:!1}));r.renderOrder=19,i.add(r,s),n.add(i);const o=document.createElement("div");o.className=`pill pill--${t}`;const a=new fh(o);a.visible=!1,n.add(a);const c=new Rn,l=new F,u=new F;let f=null;return{show(d,p){if(!d||!p.getBox(d,c)){f=null,i.visible=!1,a.visible=!1;return}f=d,c.getSize(l).addScalar(fM*2),c.getCenter(u),i.position.copy(u),i.scale.copy(l),i.visible=!0;const _=re.get(d.type,d.id);o.textContent=_?.name??"",a.visible=d.type==="item",a.position.set(u.x,c.max.y+.18,u.z)},get current(){return f}}}const sd={bare:0,partial:1,full:2},Qi={sofa:[2.2],armchair:[],ottoman:[],coffeeTable:[],sideTable:[],tvUnit:[1.5],bookshelf:[1.2],dresser:[],wardrobe:[1.2,2.2],bed:[],nightstand:[],desk:[],chair:[],diningTable:[],barStool:[],console:[1],plant:[1],floorLamp:[],standingMirror:[],rug:[2.4,1.6],kitchenRun:[2.4],fridge:[],toilet:[],vanity:[],shower:[]},Is={sofa:{name:"Sofa 3 chỗ",category:"Sofa & ghế",material:"Vải bọc, khung gỗ",note:"Đệm dày, hai gối tựa kèm theo.",tier:1},armchair:{name:"Ghế bành",category:"Sofa & ghế",material:"Vải bọc",note:"Góc thư giãn trong phòng khách.",tier:2},coffeeTable:{name:"Bàn trà",category:"Bàn",material:"Gỗ sồi",note:"Đặt giữa sofa và kệ TV.",tier:1},tvUnit:{name:'Kệ TV + TV 55"',category:"Điện tử",material:"Gỗ công nghiệp",note:"TV đặt trên kệ thấp, đối diện sofa.",tier:1},rug:{name:"Thảm",category:"Trang trí",material:"Sợi dệt",note:"",tier:2,pick:!1},plant:{name:"Cây trong nhà",category:"Trang trí",material:"Chậu gốm",note:"Cây lá lớn tạo điểm nhấn xanh.",tier:2},floorLamp:{name:"Đèn cây",category:"Chiếu sáng",material:"Kim loại đen",note:"Ánh sáng vàng ấm buổi tối.",tier:2},console:{name:"Bàn console",category:"Bàn",material:"Gỗ + tủ thấp",note:"Để chìa khoá, thư từ ở lối vào.",tier:2},bed:{name:"Giường đôi 1m6",category:"Giường",material:"Khung gỗ, nệm bông ép",note:"Kèm ga gối và chăn.",tier:1},nightstand:{name:"Tab đầu giường",category:"Tủ",material:"Gỗ sồi",note:"Kèm đèn ngủ.",tier:2},wardrobe:{name:"Tủ quần áo",category:"Tủ",material:"Gỗ công nghiệp",note:"Tủ cao sát trần, nhiều ngăn.",tier:0},desk:{name:"Bàn làm việc",category:"Bàn",material:"Gỗ sồi",note:"Kèm màn hình.",tier:2},chair:{name:"Ghế",category:"Sofa & ghế",material:"Gỗ sồi",note:"",tier:1},diningTable:{name:"Bàn ăn 4 chỗ",category:"Bàn",material:"Gỗ sồi",note:"Gần cửa sổ, đón sáng buổi sáng.",tier:1},kitchenRun:{name:"Bộ bếp",category:"Bếp",material:"Tủ gỗ + mặt đá",note:"Bồn rửa inox, bếp từ, tủ treo phía trên.",tier:0},fridge:{name:"Tủ lạnh",category:"Bếp",material:"Inox",note:"Tủ lạnh hai cánh đặt cuối dãy bếp.",tier:1},bookshelf:{name:"Tủ sách",category:"Tủ",material:"Gỗ công nghiệp",note:"Nhiều ngăn mở cho sách và đồ trang trí.",tier:2},dresser:{name:"Tủ ngăn kéo",category:"Tủ",material:"Gỗ sồi",note:"Cất đồ lặt vặt, đặt thêm gương hoặc đèn.",tier:2},sideTable:{name:"Bàn phụ",category:"Bàn",material:"Gỗ + kim loại",note:"Đặt cạnh sofa hoặc đầu giường.",tier:2},ottoman:{name:"Ghế đôn",category:"Sofa & ghế",material:"Vải bọc",note:"Kê chân hoặc ngồi thêm khi có khách.",tier:2},barStool:{name:"Ghế quầy bar",category:"Sofa & ghế",material:"Gỗ + kim loại",note:"Ngồi bên quầy bếp.",tier:2},standingMirror:{name:"Gương đứng",category:"Trang trí",material:"Kính + khung gỗ",note:"Gương soi toàn thân.",tier:2},toilet:{name:"Bệ xí",category:"Vệ sinh",material:"Sứ",note:"Két nước liền khối.",tier:0},vanity:{name:"Tủ lavabo + gương",category:"Vệ sinh",material:"Tủ gỗ + mặt đá",note:"Gương treo trên lavabo.",tier:0},shower:{name:"Buồng tắm kính",category:"Vệ sinh",material:"Kính cường lực",note:"Vòi sen cây, khay đáy thấp.",tier:0}},uc=["wood","darkwood","tile","marble","granite","concrete","epoxy","carpet","glass"],Bo=["window","door","open"],ne={idPattern:/^[A-Za-z0-9_-]{1,48}$/,overrides:120,extras:60,floors:5,roomsPerFloor:24,openingsPerFloor:60,coordMin:-2,coordMax:40,roomMin:1.2,roomMax:40,openingMin:.5,openingMax:4,sillMax:2.4,nameMax:40},_r=(n,t)=>Math.round(n*t)/t,xr=n=>typeof n=="number"&&Number.isFinite(n),zn=n=>xr(n)&&n>=ne.coordMin&&n<=ne.coordMax?_r(n,1e3):void 0,rd=n=>xr(n)?_r(n%(Math.PI*2),1e4):void 0,ai=n=>typeof n=="string"&&ne.idPattern.test(n),dc=n=>typeof n=="string"&&n.trim()?n.trim().slice(0,ne.nameMax):void 0,bM=n=>{if(!Array.isArray(n)||n.length===0||n.length>3)return;const t=n.map(e=>xr(e)&&e>=.2&&e<=8?_r(e,100):null);return t.every(e=>e!==null)?t:void 0},Sh=n=>uc.includes(n)?n:void 0,Eh=n=>Bo.includes(n)?n:void 0,Th=n=>xr(n)&&n>=ne.openingMin&&n<=ne.openingMax?_r(n,100):void 0;function wh(n){if(!n||typeof n!="object"||!ai(n.id)||n.dir!=="x"&&n.dir!=="z")return null;const t=zn(n.at),e=zn(n.c),i=Th(n.w),s=Eh(n.type);if(t===void 0||e===void 0||i===void 0||!s)return null;const r={id:n.id,dir:n.dir,at:t,c:e,w:i,type:s};return s==="window"&&xr(n.sill)&&n.sill>=0&&n.sill<=ne.sillMax&&(r.sill=_r(n.sill,100)),s==="door"&&n.entrance===!0&&(r.entrance=!0),r}function yM(n){if(!n||typeof n!="object"||!ai(n.id))return null;const t=dc(n.name),e=zn(n.x0),i=zn(n.x1),s=zn(n.z0),r=zn(n.z1);if(!t||[e,i,s,r].some(c=>c===void 0||c<0))return null;const o=i-e,a=r-s;return o<ne.roomMin-1e-9||a<ne.roomMin-1e-9||o>ne.roomMax||a>ne.roomMax?null:{id:n.id,name:t,x0:e,x1:i,z0:s,z1:r,floor:Sh(n.floor)??"wood"}}function Ah(n,t){return Math.min(n.x1,t.x1)-Math.max(n.x0,t.x0)>.01&&Math.min(n.z1,t.z1)-Math.max(n.z0,t.z0)>.01}function SM(n){if(!n||typeof n!="object"||!ai(n.id))return null;const t=[],e=new Set;for(const r of(Array.isArray(n.rooms)?n.rooms:[]).slice(0,ne.roomsPerFloor)){const o=yM(r);!o||e.has(o.id)||t.some(a=>Ah(o,a))||(e.add(o.id),t.push(o))}if(!t.length)return null;const i=[],s=new Set;for(const r of(Array.isArray(n.openings)?n.openings:[]).slice(0,ne.openingsPerFloor)){const o=wh(r);!o||s.has(o.id)||(s.add(o.id),i.push(o))}return{id:n.id,name:dc(n.name)??"Tầng",rooms:t,openings:i}}function EM(n){if(!n||typeof n!="object"||!Array.isArray(n.floors))return null;const t=[],e=new Set;for(const i of n.floors.slice(0,ne.floors)){const s=SM(i);!s||e.has(s.id)||(e.add(s.id),t.push(s))}return t.length?{floors:t}:null}function TM(n){const t={};if(!n||typeof n!="object"||Array.isArray(n))return t;for(const[e,i]of Object.entries(n).slice(0,ne.overrides)){if(!ai(e)||!i||typeof i!="object")continue;const s={},r=dc(i.name),o=Sh(i.floor);r&&(s.name=r),o&&(s.floor=o),Object.keys(s).length&&(t[e]=s)}return t}function wM(n){const t={removed:[],moved:{},added:[]};if(!n||typeof n!="object")return t;if(Array.isArray(n.removed))for(const e of n.removed.slice(0,ne.overrides))ai(e)&&!t.removed.includes(e)&&t.removed.push(e);if(n.moved&&typeof n.moved=="object"&&!Array.isArray(n.moved))for(const[e,i]of Object.entries(n.moved).slice(0,ne.overrides)){if(!ai(e)||!i||typeof i!="object")continue;const s={},r=zn(i.c),o=Th(i.w),a=Eh(i.type);r!==void 0&&(s.c=r),o!==void 0&&(s.w=o),a&&(s.type=a),Object.keys(s).length&&(t.moved[e]=s)}if(Array.isArray(n.added)){const e=new Set;for(const i of n.added.slice(0,ne.openingsPerFloor)){const s=wh(i);!s||e.has(s.id)||(e.add(s.id),t.added.push(s))}}return t}const AM=n=>n.removed.length>0||Object.keys(n.moved).length>0||n.added.length>0;function Ce(n){const t={items:{},extras:[]};if(!n||typeof n!="object")return t;if(n.items&&typeof n.items=="object"&&!Array.isArray(n.items))for(const[r,o]of Object.entries(n.items).slice(0,ne.overrides)){if(!ai(r)||!o||typeof o!="object")continue;const a={},c=zn(o.x),l=zn(o.z),u=rd(o.rot);c!==void 0&&(a.x=c),l!==void 0&&(a.z=l),u!==void 0&&(a.rot=u),o.hidden===!0&&(a.hidden=!0),Object.keys(a).length&&(t.items[r]=a)}if(Array.isArray(n.extras)){const r=new Set;for(const o of n.extras.slice(0,ne.extras)){if(!o||typeof o!="object"||!ai(o.id)||r.has(o.id)||!Object.prototype.hasOwnProperty.call(Qi,o.kind))continue;const a=zn(o.x),c=zn(o.z);if(a===void 0||c===void 0)continue;r.add(o.id);const l={id:o.id,kind:o.kind,x:a,z:c,rot:rd(o.rot)??0},u=bM(o.args);u&&(l.args=u),o.hidden===!0&&(l.hidden=!0),ai(o.floor)&&(l.floor=o.floor),t.extras.push(l)}}const e=TM(n.rooms);Object.keys(e).length&&(t.rooms=e);const i=wM(n.openings);AM(i)&&(t.openings=i);const s=EM(n.custom);return s&&(t.custom=s),t}const Ns={modern:{label:"Hiện đại",palette:{floor:13608570,wall:16052714,wood:12159838,sofa:6258598,accent:15246141}},nordic:{label:"Bắc Âu",palette:{floor:14929832,wall:16316662,wood:13808780,sofa:9414844,accent:7317664}},warm:{label:"Ấm cúng",palette:{floor:12158040,wall:15918287,wood:10251075,sofa:12874842,accent:14254635}},luxury:{label:"Sang trọng",palette:{floor:9069892,wall:15262422,wood:7031344,sofa:3096149,accent:13214282}},industrial:{label:"Công nghiệp",palette:{floor:9271911,wall:13817305,wood:8216387,sofa:4869975,accent:14250795}}},Ro=Object.keys(Ns),RM=["floor","wall","wood","sofa","accent"],CM=/^#?([0-9a-f]{6})$/i;function PM(n){if(typeof n=="number"&&Number.isInteger(n)&&n>=0&&n<=16777215)return n;if(typeof n!="string")return null;const t=CM.exec(n.trim());return t?parseInt(t[1],16):null}function hc(n){if(!n||typeof n!="object")return null;const t=typeof n.id=="string"?n.id.trim():"",e=typeof n.name=="string"?n.name.trim().slice(0,60):"";if(!t||!e)return null;const i={};if(n.palette&&typeof n.palette=="object")for(const r of RM){const o=PM(n.palette[r]);o!==null&&(i[r]=o)}const s=Number(n.defaultHour);return{id:t,name:e,description:typeof n.description=="string"?n.description.slice(0,200):"",theme:Ro.includes(n.theme)?n.theme:"modern",palette:i,furnishing:["bare","partial","full"].includes(n.furnishing)?n.furnishing:null,defaultHour:Number.isFinite(s)?Math.min(18,Math.max(6,s)):10,layout:Ce(n.layout)}}function Rh(n){return{...Ns[n?.theme]?.palette??Ns.modern.palette,...n?.palette??{}}}function LM(n){let t=0;for(const i of String(n))t=t*31+i.charCodeAt(0)>>>0;const e=Ro[t%Ro.length];return hc({id:"default",name:`Phong cách ${Ns[e].label}`,theme:e})}const DM=60,od=.25,ad=.05,IM=Math.PI*2,ks=n=>Ce(JSON.parse(JSON.stringify(Ce(n)))),ys=(n,t)=>n/(t||1);function ld(n,t){const e=Math.min(t-od,Math.max(od,n));return Math.round(e/ad)*ad}function NM(n,t){return n.extras.some(e=>e.id===t)}function UM(n,t,e,i,s){const r=ks(n),o=r.extras.find(a=>a.id===t);if(o)o.x=ys(e,s),o.z=ys(i,s);else{const a=r.items[t]??={};a.x=ys(e,s),a.z=ys(i,s)}return Ce(r)}function OM(n,t,e=0){const i=ks(n),s=(e+Math.PI/2)%IM,r=i.extras.find(o=>o.id===t);return r?r.rot=s:(i.items[t]??={}).rot=s,Ce(i)}function FM(n,t){const e=ks(n),i=e.extras.find(s=>s.id===t)??(e.items[t]??={});return i.hidden?delete i.hidden:i.hidden=!0,Ce(e)}function zM(n,t){const e=ks(n);return e.extras.some(i=>i.id===t)?(e.extras=e.extras.filter(i=>i.id!==t),Ce(e)):e}function BM(n,t){const e=ks(n),i=e.items[t];return i&&(delete i.x,delete i.z,delete i.rot),Ce(e)}function kM(n,t,e,i,s,r,o=Math.random){if(!Object.prototype.hasOwnProperty.call(Qi,t))return null;const a=ks(n);if(a.extras.length>=DM)return null;const c=new Set([...r,...a.extras.map(u=>u.id)]);let l;do l=`extra-${o().toString(36).slice(2,8).padEnd(6,"0")}`;while(c.has(l));return a.extras.push({id:l,kind:t,x:ys(e,s),z:ys(i,s),rot:0}),{layout:Ce(a),id:l}}const cd=.1,Ch=n=>Math.round(n/cd)*cd,nr=n=>Math.round(n*1e3)/1e3;function HM(n,t,e,i=.5){let s=null;for(const r of n){const o=r.dir==="x"?t:e,a=r.dir==="x"?e:t;if(o<r.from+.1||o>r.to-.1)continue;const c=Math.abs(a-r.at);c<=i&&(!s||c<s.dist)&&(s={wall:r,c:nr(o),dist:c})}return s?{wall:s.wall,c:s.c}:null}function GM(n){const t=(n.x0+n.x1)/2,e=(n.z0+n.z1)/2;return{x0:{x:n.x0,z:e},x1:{x:n.x1,z:e},z0:{x:t,z:n.z0},z1:{x:t,z:n.z1}}}function VM(n,t,e){const i={x0:n.x0,x1:n.x1,z0:n.z0,z1:n.z1},s=ne.roomMin,r=Ch(e);return t==="x0"?i.x0=Math.max(0,Math.min(r,i.x1-s)):t==="x1"?i.x1=Math.min(ne.coordMax,Math.max(r,i.x0+s)):t==="z0"?i.z0=Math.max(0,Math.min(r,i.z1-s)):t==="z1"&&(i.z1=Math.min(ne.coordMax,Math.max(r,i.z0+s))),{x0:nr(i.x0),x1:nr(i.x1),z0:nr(i.z0),z1:nr(i.z1)}}const WM=(n,t,e)=>t>=n.x0&&t<=n.x1&&e>=n.z0&&e<=n.z1,io=Ch,so=1e-6,ar=n=>n.toFixed(3),Zi=n=>Math.round(n*1e3)/1e3,ud=n=>String(n).replace(/[^A-Za-z0-9]/g,"p");function Ph(n,t=[]){const e=new Map,i=(r,o,a,c)=>{const l=`${r}|${ar(o)}`;e.has(l)||e.set(l,{dir:r,at:o,edges:[]}),e.get(l).edges.push([a,c])};for(const r of n)i("x",r.z0,r.x0,r.x1),i("x",r.z1,r.x0,r.x1),i("z",r.x0,r.z0,r.z1),i("z",r.x1,r.z0,r.z1);const s=[];for(const{dir:r,at:o,edges:a}of e.values()){const c=[...new Set(a.flatMap(([u,f])=>[ar(u),ar(f)]))].map(Number).sort((u,f)=>u-f),l=[];for(let u=0;u+1<c.length;u++){const f=c[u],d=c[u+1];if(d-f<so)continue;const p=a.filter(([x,m])=>x<=f+so&&m>=d-so).length;if(p===0)continue;const _=l[l.length-1];_&&_.count===p&&Math.abs(_.to-f)<so?_.to=d:l.push({from:f,to:d,count:p})}for(const u of l)s.push({dir:r,at:o,from:u.from,to:u.to,t:u.count>=2?_h:gh,interior:u.count>=2,openings:[]})}for(const r of t){const o=s.find(a=>a.dir===r.dir&&Math.abs(a.at-r.at)<.06&&r.c-r.w/2>=a.from+.05&&r.c+r.w/2<=a.to-.05);o&&o.openings.push({...r})}for(const r of s)r.openings.sort((o,a)=>o.c-a.c);return s.sort((r,o)=>r.dir===o.dir?r.at-o.at||r.from-o.from:r.dir<o.dir?-1:1)}function XM(n,t=.2){const e=Math.max(...n.map(s=>s.x1))+t,i=Math.max(...n.map(s=>s.z1))+t;return{w:Zi(e),d:Zi(i)}}const Lh=n=>Zi(n.reduce((t,e)=>t+Ki(e),0)),fc=n=>Zi(n.reduce((t,e)=>t+Lh(e.rooms),0));function $M(n,t=[],e=1.4){return Ph(n,t).filter(s=>s.interior&&s.to-s.from>=e&&s.openings.length===0).map(s=>({dir:s.dir,at:s.at,from:s.from,to:s.to}))}function pc(n,t=[],e=[]){const i=new Set([...e,...t.map(r=>r.id)]),s=[];for(const r of $M(n,t)){const o=Zi((r.from+r.to)/2);let a=`auto-${r.dir}${ud(ar(r.at))}-${ud(ar(o))}`.slice(0,48);i.has(a)||(i.add(a),s.push({id:a,dir:r.dir,at:Zi(r.at),c:o,w:.9,type:"door"}))}return[...t,...s]}function mc(n,t,e=null){const i=t.x1-t.x0,s=t.z1-t.z0;return i<ne.roomMin-1e-9||s<ne.roomMin-1e-9||i>ne.roomMax||s>ne.roomMax||t.x0<0||t.z0<0||t.x1>ne.coordMax||t.z1>ne.coordMax?!1:!n.some(r=>r.id!==e&&Ah(r,t))}function qM(n,t){const e=fc(n);if(!(e>0)||!(t>0))return{factor:1,before:e,after:e};const i=Math.min(2,Math.max(.5,Math.sqrt(t/e)));return{factor:i,before:e,after:Zi(e*i*i)}}const dd=.15,hd=.1,Te=n=>Math.round(n*1e3)/1e3,Ss=n=>Math.round(n/hd)*hd,Sn=n=>JSON.parse(JSON.stringify(Ce(n))),Co=(n,t)=>Te(n/(t.scale||1)),gc=(n,t,e=Math.random)=>{let i;do i=`${n}-${e().toString(36).slice(2,8).padEnd(6,"0")}`;while(t.has(i));return i},hi=(n,t)=>{const e=Ce(t);return JSON.stringify(e)===JSON.stringify(Ce(n))?n:e},Hs=(n,t)=>n.custom?.floors.find(e=>e.id===t.floorId)??n.custom?.floors[0];function YM(n,t,e,i){if(!uc.includes(i))return n;const s=Sn(n);if(t.custom){const r=Hs(s,t)?.rooms.find(o=>o.id===e);if(!r)return n;r.floor=i}else{if(!t.rooms.some(r=>r.id===e))return n;s.rooms={...s.rooms??{},[e]:{...s.rooms?.[e]??{},floor:i}}}return hi(n,s)}function jM(n,t,e,i){const s=String(i??"").trim().slice(0,ne.nameMax);if(!s)return n;const r=Sn(n);if(t.custom){const o=Hs(r,t)?.rooms.find(a=>a.id===e);if(!o)return n;o.name=s}else{if(!t.rooms.some(o=>o.id===e))return n;r.rooms={...r.rooms??{},[e]:{...r.rooms?.[e]??{},name:s}}}return hi(n,r)}function KM(n,t,e,i){return n.walls.find(s=>s.dir===t&&Math.abs(s.at-e)<.06&&i>=s.from&&i<=s.to)}function Dh(n,t,e){const i=n.from+e/2+dd,s=n.to-e/2-dd;return s<i?null:Te(Math.min(s,Math.max(i,t)))}const ZM=(n,t)=>n.walls.find(e=>e.openings.some(i=>i.id===t)),Ih=(n,t)=>n.walls.flatMap(e=>e.openings).find(e=>e.id===t);function _c(n,t,e,i){const s=ZM(t,e),r=Ih(t,e);if(!s||!r)return n;const o=i.w??r.w,a=Dh(s,i.c??r.c,o);if(a===null||o<ne.openingMin||o>ne.openingMax)return n;const c=i.type??r.type;if(!Bo.includes(c))return n;const l=Sn(n);if(t.custom){const u=Hs(l,t)?.openings.find(f=>f.id===e);if(!u)return n;Object.assign(u,{c:a,w:Te(o),type:c}),c!=="window"?delete u.sill:u.sill===void 0&&(u.sill=.9),c!=="door"&&delete u.entrance}else{const u=l.openings?.added?.find(f=>f.id===e);if(u)Object.assign(u,{c:Co(a,t),w:Te(o),type:c}),c!=="window"&&delete u.sill,c!=="door"&&delete u.entrance;else{l.openings??={removed:[],moved:{},added:[]};const f={...l.openings.moved[e]??{}};(i.c!==void 0||i.w!==void 0)&&(f.c=Co(a,t)),i.w!==void 0&&(f.w=Te(o)),i.type!==void 0&&(f.type=c),l.openings.moved[e]=f}}return hi(n,l)}const JM=(n,t,e,i)=>_c(n,t,e,{c:i}),QM=(n,t,e,i)=>_c(n,t,e,{w:i}),tb=(n,t,e,i)=>_c(n,t,e,{type:i});function eb(n,t,e){if(!Ih(t,e))return n;const i=Sn(n);if(t.custom){const s=Hs(i,t);if(!s)return n;s.openings=s.openings.filter(r=>r.id!==e)}else i.openings?.added?.some(s=>s.id===e)?i.openings.added=i.openings.added.filter(s=>s.id!==e):(i.openings??={removed:[],moved:{},added:[]},i.openings.removed.includes(e)||i.openings.removed.push(e),delete i.openings.moved[e]);return hi(n,i)}function nb(n,t,{dir:e,at:i,c:s,w:r=.9,type:o="door"},a=Math.random){if(!Bo.includes(o)||e!=="x"&&e!=="z")return null;const c=KM(t,e,i,s);if(!c)return null;const l=Dh(c,s,r);if(l===null||c.openings.some(_=>Math.abs(_.c-l)<(_.w+r)/2+.05))return null;const u=Sn(n),f=new Set(t.walls.flatMap(_=>_.openings.map(x=>x.id))),d=gc("op",f,a);if(t.custom){const _=Hs(u,t);if(!_||_.openings.length>=ne.openingsPerFloor)return null;_.openings.push({id:d,dir:e,at:Te(c.at),c:l,w:Te(r),type:o,...o==="window"?{sill:.9}:{}})}else{if(u.openings??={removed:[],moved:{},added:[]},u.openings.added.length>=ne.openingsPerFloor)return null;u.openings.added.push({id:d,dir:e,at:Co(c.at,t),c:Co(l,t),w:Te(r),type:o,...o==="window"?{sill:.9}:{}})}return{layout:Ce(u),id:d}}const fd=n=>{if(!Array.isArray(n))return;const t=[];for(const e of n){if(typeof e!="number"||!(e>=.2&&e<=8))break;t.push(Math.round(e*100)/100)}return t.length?t.slice(0,3):void 0};function ib(n,t){const i=t.rooms.map(a=>({id:a.id,name:a.name,x0:a.x0,x1:a.x1,z0:a.z0,z1:a.z1,floor:a.floor})),s=t.walls.flatMap(a=>a.openings.map(c=>({id:c.id,dir:a.dir,at:a.at,c:c.c,w:c.w,type:c.type,...c.sill!==void 0?{sill:c.sill}:{},...c.entrance?{entrance:!0}:{}}))),r=t.placements.filter(a=>Object.prototype.hasOwnProperty.call(Qi,a.kind)).map(a=>({id:a.id,kind:a.kind,x:a.x,z:a.z,rot:a.rot??0,floor:"f1",...a.hidden?{hidden:!0}:{},...fd(a.args)?{args:fd(a.args)}:{}}));return Ce({items:{},extras:r,custom:{floors:[{id:"f1",name:"Tầng 1",rooms:i,openings:s}]}})}function sb(){return Ce(null)}const ko=(n,t)=>Hs(n,t);function rb(n,t){const e=Ss(Math.min(n.x,t.x)),i=Ss(Math.max(n.x,t.x)),s=Ss(Math.min(n.z,t.z)),r=Ss(Math.max(n.z,t.z));return{x0:Te(e),x1:Te(i),z0:Te(s),z1:Te(r)}}function ob(n,t,e,{name:i,floor:s="wood"}={},r=Math.random){if(!t.custom)return null;const o=Sn(n),a=ko(o,t);if(!a||a.rooms.length>=ne.roomsPerFloor)return null;const c={...e};if(!mc(a.rooms,c))return null;const l=gc("room",new Set(a.rooms.map(f=>f.id)),r),u={id:l,name:i??`Phòng ${a.rooms.length+1}`,...c,floor:s};return a.rooms.push(u),a.openings=pc(a.rooms,a.openings),{layout:Ce(o),id:l}}const xc=(n,t,e)=>t>=n.x0&&t<=n.x1&&e>=n.z0&&e<=n.z1;function ab(n,t){for(const e of n.extras){if((e.floor??n.custom.floors[0].id)!==t.id||t.rooms.some(s=>xc(s,e.x,e.z)))continue;let i=null;for(const s of t.rooms){const r=Math.min(s.x1-.2,Math.max(s.x0+.2,e.x)),o=Math.min(s.z1-.2,Math.max(s.z0+.2,e.z)),a=Math.hypot(r-e.x,o-e.z);(!i||a<i.d)&&(i={x:r,z:o,d:a})}i&&(e.x=Te(i.x),e.z=Te(i.z))}}function lb(n,t,e,i){if(!t.custom)return n;const s=Sn(n),r=ko(s,t),o=r?.rooms.find(c=>c.id===e);if(!o)return n;const a={...o,...i};return mc(r.rooms,a,e)?(Object.assign(o,i),r.openings=pc(r.rooms,vc(r)),ab(s,r),hi(n,s)):n}function cb(n,t,e,i,s){if(!t.custom)return n;const r=Sn(n),o=ko(r,t),a=o?.rooms.find(_=>_.id===e);if(!a)return n;const c=Ss(i),l=Ss(s);if(c===0&&l===0)return n;const u={...a,x0:Te(a.x0+c),x1:Te(a.x1+c),z0:Te(a.z0+l),z1:Te(a.z1+l)};if(!mc(o.rooms,u,e))return n;const f=r.custom.floors[0].id;for(const _ of r.extras)(_.floor??f)===o.id&&xc(a,_.x,_.z)&&(_.x=Te(_.x+c),_.z=Te(_.z+l));const d=_=>_.dir==="x"&&(Math.abs(_.at-a.z0)<.06||Math.abs(_.at-a.z1)<.06)&&_.c>a.x0&&_.c<a.x1||_.dir==="z"&&(Math.abs(_.at-a.x0)<.06||Math.abs(_.at-a.x1)<.06)&&_.c>a.z0&&_.c<a.z1,p=_=>o.rooms.some(x=>x.id!==e&&Nh(x,_));for(const _ of o.openings)d(_)&&!p(_)&&(_.dir==="x"?(_.at=Te(_.at+l),_.c=Te(_.c+c)):(_.at=Te(_.at+c),_.c=Te(_.c+l)));return Object.assign(a,u),o.openings=pc(o.rooms,vc(o)),hi(n,r)}const Nh=(n,t)=>t.dir==="x"&&(Math.abs(t.at-n.z0)<.06||Math.abs(t.at-n.z1)<.06)&&t.c>n.x0&&t.c<n.x1||t.dir==="z"&&(Math.abs(t.at-n.x0)<.06||Math.abs(t.at-n.x1)<.06)&&t.c>n.z0&&t.c<n.z1;function vc(n){return n.openings.filter(t=>n.rooms.some(e=>Nh(e,t)))}function ub(n,t,e){if(!t.custom)return n;const i=Sn(n),s=ko(i,t),r=s?.rooms.find(a=>a.id===e);if(!r||s.rooms.length<=1)return n;const o=i.custom.floors[0].id;for(const a of i.extras)(a.floor??o)===s.id&&xc(r,a.x,a.z)&&(a.hidden=!0);return s.rooms=s.rooms.filter(a=>a.id!==e),s.openings=vc(s),hi(n,i)}function db(n,t,e,i=Math.random){if(!t.custom)return null;const s=Sn(n);if(s.custom.floors.length>=ne.floors)return null;const r=gc("f",new Set(s.custom.floors.map(o=>o.id)),i);return s.custom.floors.push({id:r,name:String(e??"").trim()||`Tầng ${s.custom.floors.length+1}`,rooms:[{id:"room-1",name:"Phòng 1",x0:1,x1:7,z0:1,z1:6,floor:"wood"}],openings:[]}),{layout:Ce(s),id:r}}function hb(n,t,e,i){const s=String(i??"").trim().slice(0,ne.nameMax);if(!t.custom||!s)return n;const r=Sn(n),o=r.custom.floors.find(a=>a.id===e);return o?(o.name=s,hi(n,r)):n}function fb(n,t,e){if(!t.custom)return n;const i=Sn(n);if(i.custom.floors.length<=1||!i.custom.floors.some(o=>o.id===e))return n;const s=i.custom.floors[0].id;i.custom.floors=i.custom.floors.filter(o=>o.id!==e);const r=i.custom.floors[0].id;return i.extras=i.extras.filter(o=>(o.floor??s)!==e).map(o=>({...o,floor:o.floor??r})),hi(n,i)}function pb(n,t,e){if(!t.custom)return{layout:n,factor:1,before:0,after:0};const i=Ce(n),{factor:s,before:r,after:o}=qM(i.custom.floors,e);if(Math.abs(s-1)<1e-6)return{layout:n,factor:1,before:r,after:r};const a=Sn(i),c=f=>Te(f*s);for(const f of a.custom.floors){for(const d of f.rooms)Object.assign(d,{x0:c(d.x0),x1:c(d.x1),z0:c(d.z0),z1:c(d.z1)});for(const d of f.openings)Object.assign(d,{at:c(d.at),c:c(d.c)})}for(const f of a.extras)Object.assign(f,{x:c(f.x),z:c(f.z)});const l=Ce(a),u=l.custom?fc(l.custom.floors):o;return{layout:l,factor:s,before:r,after:u}}const pd=.03,mb=.17,gb=new Set(["door","window","open"]);function _b(n,t,e,i){const s=n.renderer.domElement,r=n.controls,o=new ac,a=new Ut,c=new ni(new F(0,1,0),0),l=new F;let u=null;const f=new jt;f.name="editor-overlay",n.scene.add(f);const d=new Xt(new ue(1,.06,1),new ji({color:14178863,transparent:!0,opacity:.35,depthWrite:!1}));d.visible=!1,f.add(d);const p=new ji({color:14178863,depthTest:!1}),_={};for(const A of["x0","x1","z0","z1"]){const D=new Xt(new Ls(mb,16,12),p);D.renderOrder=10,D.visible=!1,D.userData.edge=A,f.add(D),_[A]=D}function x(A,D=!0){d.visible=!0,d.scale.set(Math.max(.01,A.x1-A.x0),1,Math.max(.01,A.z1-A.z0)),d.position.set((A.x0+A.x1)/2,.05,(A.z0+A.z1)/2),d.material.color.set(D?14178863:12597547),n.invalidate()}const m=()=>{d.visible&&(d.visible=!1,n.invalidate())},h=()=>{const A=W.state.selection;return A?.type==="room"?re.get("room",A.id):null};function v(){const A=W.state.editing&&!W.state.tool&&i.isCustom?.()?h():null,D=A?GM(A):null;for(const[H,N]of Object.entries(_))N.visible=!!D,D&&N.position.set(D[H].x,.2,D[H].z);n.invalidate()}function T(A){const D=s.getBoundingClientRect();a.set((A.clientX-D.left)/D.width*2-1,-((A.clientY-D.top)/D.height)*2+1),o.setFromCamera(a,n.camera)}function w(A,D){return T(A),o.ray.intersectPlane(c,D)}function I(A){if(!_.x0.visible)return null;T(A);const D=o.intersectObjects(Object.values(_),!1)[0];return D?D.object.userData.edge:null}function C(A){T(A);const D=o.intersectObjects(t.pickables,!0);for(const H of D)for(let N=H.object;N&&N.visible!==!1;N=N.parent){const G=N.userData?.ref;if(G?.type==="item"&&re.get("item",G.id)||G?.type==="opening"&&re.get("opening",G.id))return G}return null}function L(A,D,H="grabbing"){u={pointerId:A.pointerId,...D},r.enabled=!1,n.cancelFlight(),s.setPointerCapture(A.pointerId),s.style.cursor=H,A.stopImmediatePropagation()}const g=A=>{if(!W.state.editing||W.state.mode!=="overview"||A.button!==0)return;const D=W.state.tool;if(gb.has(D)){if(!w(A,l))return;const O=HM(at.walls,l.x,l.z,.6);A.stopImmediatePropagation(),O?i.onOpeningAdd({dir:O.wall.dir,at:O.wall.at,c:O.c,type:D}):i.onReject?.("Bấm vào một đoạn tường để đặt cửa.");return}if(D==="room"){if(!w(A,l))return;const O={x:io(l.x),z:io(l.z)};L(A,{kind:"draw",start:O,rect:null},"crosshair");return}const H=I(A),N=H?h():null;if(N&&w(A,l)){L(A,{kind:"resize",id:N.id,edge:H,room:N,rect:null},"ew-resize");return}const G=C(A);if(G?.type==="opening"){const O=t.getObject("opening",G.id),B=at.walls.find(rt=>rt.openings.some(st=>st.id===G.id));if(!O||!B||!w(A,l))return;const K=B.dir==="x"?l.x:l.z,ht=B.dir==="x"?O.position.x:O.position.z;W.select(G),L(A,{kind:"opening",id:G.id,mesh:O,wall:B,offset:ht-K,start:ht,c:ht});return}if(G?.type==="item"){const O=t.getObject("item",G.id);if(!O||!w(A,l))return;W.select(G),L(A,{kind:"item",id:G.id,group:O,offsetX:O.position.x-l.x,offsetZ:O.position.z-l.z,startX:O.position.x,startZ:O.position.z});return}const R=i.isCustom?.()?h():null;R&&w(A,l)&&WM(R,l.x,l.z)&&L(A,{kind:"room",id:R.id,room:R,startPt:{x:l.x,z:l.z},dx:0,dz:0})},S=A=>{if(!(!u||A.pointerId!==u.pointerId)&&w(A,l)){if(u.kind==="item"){const D=ld(l.x+u.offsetX,at.size.w),H=ld(l.z+u.offsetZ,at.size.d);t.moveItem(u.id,D,H),e.refresh()}else if(u.kind==="opening"){const D=(u.wall.dir==="x"?l.x:l.z)+u.offset,H=u.wall.from+.5,N=u.wall.to-.5;u.c=Math.round(Math.min(N,Math.max(H,D))*20)/20,u.wall.dir==="x"?u.mesh.position.x=u.c:u.mesh.position.z=u.c,x(u.wall.dir==="x"?{x0:u.c-.45,x1:u.c+.45,z0:u.wall.at-.1,z1:u.wall.at+.1}:{x0:u.wall.at-.1,x1:u.wall.at+.1,z0:u.c-.45,z1:u.c+.45})}else if(u.kind==="draw")u.rect=rb(u.start,{x:l.x,z:l.z}),x(u.rect);else if(u.kind==="resize"){const D=u.edge[0]==="x"?l.x:l.z;u.rect=VM(u.room,u.edge,D),x(u.rect)}else if(u.kind==="room"){u.dx=io(l.x-u.startPt.x),u.dz=io(l.z-u.startPt.z);const D=u.room;x({x0:D.x0+u.dx,x1:D.x1+u.dx,z0:D.z0+u.dz,z1:D.z1+u.dz})}}},b=A=>{if(!u||A.pointerId!==u.pointerId)return;const D=u;if(u=null,r.enabled=W.state.mode==="overview",s.style.cursor="",m(),A.type==="pointercancel"){i.onCancel?.();return}if(D.kind==="item"){const H=D.group.position.x,N=D.group.position.z;Math.hypot(H-D.startX,N-D.startZ)>=pd&&i.onMove(D.id,H,N)}else D.kind==="opening"?Math.abs(D.c-D.start)>=pd&&i.onOpeningMove(D.id,D.c):D.kind==="draw"?D.rect&&i.onRoomDraw(D.rect):D.kind==="resize"?D.rect&&i.onRoomResize(D.id,D.rect):D.kind==="room"&&(D.dx||D.dz)&&i.onRoomMove(D.id,D.dx,D.dz)};s.addEventListener("pointerdown",g,{capture:!0}),s.addEventListener("pointermove",S),s.addEventListener("pointerup",b),s.addEventListener("pointercancel",b);const y=W.subscribe((A,D,H)=>{(H.includes("tool")||H.includes("selection")||H.includes("editing"))&&v(),H.includes("tool")&&(s.style.cursor=A.tool?"crosshair":"")});return{setEditing(A){r.mouseButtons=A?{LEFT:Xe.PAN,MIDDLE:Xe.DOLLY,RIGHT:Xe.ROTATE}:{LEFT:Xe.ROTATE,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN},r.touches=A?{ONE:fn.PAN,TWO:fn.DOLLY_ROTATE}:{ONE:fn.ROTATE,TWO:fn.DOLLY_PAN},r.screenSpacePanning=A,v()},sync:v,dispose(){y(),s.removeEventListener("pointerdown",g,{capture:!0}),s.removeEventListener("pointermove",S),s.removeEventListener("pointerup",b),s.removeEventListener("pointercancel",b),n.scene.remove(f)}}}const Da=n=>String(n??"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d");function xb(n,t=8){const e=Da(n).trim();if(!e)return[];const i=[];for(const s of re.list("room"))Da(s.name).includes(e)&&i.push({type:"room",id:s.id,title:s.name,sub:`${s.area.toFixed(0)} m²`});for(const s of re.list("item")){const r=re.room(s.roomId);if(Da(`${s.name} ${s.category} ${r?.name??""} ${s.material??""}`).includes(e)&&i.push({type:"item",id:s.id,title:s.name,sub:`${s.category} · ${r?.name??""}`}),i.length>=t)break}return i.slice(0,t)}const vb=n=>n?`${n.w.toFixed(2)} × ${n.d.toFixed(2)} × ${n.h.toFixed(2)} m`:"",Nl=1,md=8,Mb=1e3,bb=20,Us=()=>!!window.ReactNativeWebView,Po=()=>Us()||window.parent!==window;function bn(n,t){const e=t===void 0?{version:Nl,type:n}:{version:Nl,type:n,payload:t};if(window.ReactNativeWebView){window.ReactNativeWebView.postMessage(JSON.stringify(e));return}window.parent!==window&&window.parent.postMessage(e,window.location.origin)}function Mc(n){if(!n||typeof n!="object")return null;const t=typeof n.apartmentId=="string"?n.apartmentId.trim():"",e=Number(n.bedrooms),i=Number(n.bathrooms),s=Number(n.areaM2);if(!t||!Number.isFinite(e)||e<0||e>md||!Number.isFinite(i)||i<0||i>md||!Number.isFinite(s)||s<=0||s>Mb||!["bare","partial","full"].includes(n.furnishing))return null;const r=Array.isArray(n.designs)?n.designs.slice(0,bb).map(hc).filter(Boolean):[];return{apartmentId:t,bedrooms:Math.floor(e),bathrooms:Math.floor(i),areaM2:s,furnishing:n.furnishing,designs:r,designId:typeof n.designId=="string"?n.designId:null,editable:n.editable===!0&&!Us()}}function yb(n){const t=window.location.origin,e=i=>{if(!(!!window.ReactNativeWebView&&(!i.origin||i.origin==="null"))&&(i.origin!==t||i.source!==window.parent))return;let r=i.data;if(typeof r=="string")try{r=JSON.parse(r)}catch{return}if(!(!r||r.version!==Nl))if(r.type==="FLOORPLAN_INIT"){const o=Mc(r.payload);o?n.init(o):bn("FLOORPLAN_ERROR",{code:"INVALID_CONFIG"})}else r.type==="FLOORPLAN_CAMPUS_INIT"?n.campus?.(r.payload):r.type==="FLOORPLAN_EXPANDED"?n.expanded?.(!!r.payload?.expanded):r.type==="FLOORPLAN_PAUSE"?n.pause():r.type==="FLOORPLAN_RESUME"?n.resume():r.type==="FLOORPLAN_RESET"&&n.reset()};return window.addEventListener("message",e),document.addEventListener("message",e),()=>{window.removeEventListener("message",e),document.removeEventListener("message",e)}}function Sb(n,t){const e=(s,r)=>n.has(s)?Number(n.get(s)):r,i=["bare","partial","full"].includes(n.get("furnishing"))?n.get("furnishing"):"full";return Mc({apartmentId:n.get("id")??"demo",bedrooms:e("bedrooms",2),bathrooms:e("bathrooms",1),areaM2:e("area",70),furnishing:i,designs:t,designId:n.get("design")})}const Eb=n=>{const t=Math.floor(n),e=Math.round((n-t)*60);return`${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`};function Tb(n){n.innerHTML=`
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
    </div>`;const t=n.querySelector("#q"),e=n.querySelector(".search__menu"),i=n.querySelector("#hour"),s=n.querySelector("#sun-pop"),r=n.querySelector("#sun-btn"),o=n.querySelector("#play");function a(){const g=W.state.searchQuery,S=xb(g);e.hidden=!g.trim(),e.innerHTML=S.length?S.map(b=>`
        <li><button type="button" data-type="${b.type}" data-id="${Vt(b.id)}">
          <span class="res__ico">${te(b.type==="room"?"home":"pin",15)}</span>
          <span class="res__txt"><b>${Vt(b.title)}</b><small>${Vt(b.sub)}</small></span>
        </button></li>`).join(""):'<li class="res__empty">Không tìm thấy</li>'}t.addEventListener("input",()=>{W.set({searchQuery:t.value}),a()}),t.addEventListener("focus",a),t.addEventListener("keydown",g=>{g.key==="Escape"&&(t.value="",W.set({searchQuery:""}),e.hidden=!0,t.blur()),g.key==="Enter"&&e.querySelector("button")?.click()}),e.addEventListener("click",g=>{const S=g.target.closest("button[data-id]");if(!S)return;const b={type:S.dataset.type,id:S.dataset.id};t.value="",W.set({searchQuery:""}),e.hidden=!0,t.blur(),b.type==="room"&&wt.emit("room:go",{id:b.id}),W.select(b),b.type==="item"&&wt.emit("camera:locate",b)}),document.addEventListener("pointerdown",g=>{n.querySelector(".search").contains(g.target)||(e.hidden=!0),n.querySelector(".sunwrap").contains(g.target)||n.querySelector("#design-wrap").contains(g.target)||W.set({menu:null})}),r.addEventListener("click",()=>W.set({menu:W.state.menu==="sun"?null:"sun"})),i.addEventListener("input",()=>W.set({hour:Number(i.value),playing:!1})),o.addEventListener("click",()=>W.set({playing:!W.state.playing})),n.querySelector(".seg").addEventListener("click",g=>{const S=g.target.closest("[data-mode]");S&&S.dataset.mode!==W.state.mode&&W.set({mode:S.dataset.mode})});const c=n.querySelector("#fs-btn"),l=!!(document.fullscreenEnabled||document.webkitFullscreenEnabled),u=Po()&&!Us();let f=!1;function d(){c.innerHTML=te(f?"shrink":"expand",18);const g=f?"Thoát toàn màn hình":"Toàn màn hình";c.setAttribute("aria-label",g),c.title=g}c.hidden=Us()||!(l||u),c.addEventListener("click",()=>{if(l){const g=document.documentElement.requestFullscreen??document.documentElement.webkitRequestFullscreen,S=document.exitFullscreen??document.webkitExitFullscreen;document.fullscreenElement??document.webkitFullscreenElement?S.call(document):g.call(document.documentElement)}else bn("FLOORPLAN_EXPAND_TOGGLE")});const p=()=>{f=!!(document.fullscreenElement??document.webkitFullscreenElement),d()};document.addEventListener("fullscreenchange",p),document.addEventListener("webkitfullscreenchange",p),wt.on("host:expanded",({expanded:g})=>{f=g,d()}),d();const _=n.querySelector("#edit-btn");_.addEventListener("click",()=>W.set({editing:!W.state.editing}));function x(g){_.hidden=!(g.editable&&g.mode==="overview"),_.setAttribute("aria-pressed",String(g.editing)),_.classList.toggle("active",g.editing);const S=g.editing?"Xong chỉnh sửa":"Chỉnh bố cục";_.innerHTML=`${te("pencil",18)}<span>${S}</span>`,_.setAttribute("aria-label",S),_.title=S}const m=n.querySelector("#design-wrap"),h=n.querySelector("#design-btn"),v=n.querySelector("#design-pop");let T="";function w(g){const S=Rh(g);return[S.floor,S.wall,S.sofa,S.accent].map(b=>`<i style="background:#${b.toString(16).padStart(6,"0")}"></i>`).join("")}function I(g){const{designs:S,designId:b}=g;m.hidden=S.length<2;const y=S.find(D=>D.id===b)??S[0];n.querySelector("#design-name").textContent=y?.name??"",n.querySelector("#design-swatch").innerHTML=y?w(y):"",h.setAttribute("aria-expanded",String(g.menu==="designs")),v.hidden=g.menu!=="designs";const A=S.map(D=>D.id+D.name).join("|")+"#"+b;A!==T&&(T=A,v.innerHTML=S.map(D=>`<li><button type="button" role="option" data-design="${Vt(D.id)}" aria-selected="${D.id===b}" class="${D.id===b?"active":""}">
          <span class="swatches">${w(D)}</span>
          <span class="res__txt"><b>${Vt(D.name)}</b><small>${Vt(D.description||Ns[D.theme]?.label||"")}</small></span>
        </button></li>`).join(""))}h.addEventListener("click",()=>W.set({menu:W.state.menu==="designs"?null:"designs"})),v.addEventListener("click",g=>{const S=g.target.closest("[data-design]");S&&(W.set({menu:null}),wt.emit("design:select",{id:S.dataset.design}))});function C(){n.querySelector("#brand-title").textContent=at.bedrooms===0?"Căn hộ studio":`Căn hộ ${at.bedrooms} phòng ngủ`,n.querySelector("#brand-sub").textContent=at.custom?`${at.totalArea.toFixed(0)} m²${at.floors.length>1?` · ${at.floors.length} tầng`:""} · Mặt bằng tuỳ chỉnh`:`${at.area.toFixed(0)} m² · Bố cục minh hoạ`}wt.on("plan:loaded",C),C();function L(g){I(g),x(g);for(const S of n.querySelectorAll("[data-mode]")){const b=S.dataset.mode===g.mode;S.classList.toggle("active",b),S.setAttribute("aria-selected",String(b))}n.querySelector("#hour-text").textContent=Eb(g.hour),document.activeElement!==i&&(i.value=String(g.hour)),s.hidden=g.menu!=="sun",r.setAttribute("aria-expanded",String(g.menu==="sun")),o.innerHTML=`${te(g.playing?"pause":"play",14)}<span>${g.playing?"Dừng":"Tua ngày"}</span>`}W.subscribe(g=>L(g)),L(W.state)}function wb(n){n.innerHTML=`
    <div class="card rooms" data-inset="rooms">
      <button type="button" class="rooms__title" aria-expanded="true" aria-controls="rooms-list">Các phòng <span aria-hidden="true">▾</span></button>
      <div class="floors" role="tablist" aria-label="Tầng" hidden></div>
      <ul class="rooms__list" id="rooms-list" role="list"></ul>
    </div>`;const t=n.querySelector(".rooms__list"),e=n.querySelector(".floors");function i(){e.hidden=at.floors.length<2,e.innerHTML=at.floors.map(a=>`<button type="button" role="tab" class="floorbtn${a.id===at.floorId?" on":""}" aria-selected="${a.id===at.floorId}" data-floor="${Vt(a.id)}">${Vt(a.name)}</button>`).join(""),t.innerHTML=re.list("room").map(a=>`
          <li><button type="button" class="room" data-room="${Vt(a.id)}">
            <span class="room__row"><b>${Vt(a.name)}</b><span>${a.area.toFixed(0)} m²</span></span>
            <small>${Vt(a.note)}</small>
          </button></li>`).join(""),o(W.state)}const s=n.querySelector(".rooms"),r=n.querySelector(".rooms__title");window.innerWidth>=720&&window.innerWidth<1100&&(s.classList.add("is-collapsed"),r.setAttribute("aria-expanded","false")),r.addEventListener("click",()=>{const a=s.classList.toggle("is-collapsed");r.setAttribute("aria-expanded",String(!a))}),W.subscribe((a,c,l)=>{!l.includes("editing")||!a.editing||(s.classList.add("is-collapsed"),r.setAttribute("aria-expanded","false"))}),n.addEventListener("click",a=>{const c=a.target.closest("[data-floor]");if(c)return wt.emit("plan:floor-select",{id:c.dataset.floor});const l=a.target.closest("[data-room]");l&&(W.set({selection:null}),wt.emit("room:go",{id:l.dataset.room}))});function o(a){for(const c of n.querySelectorAll("[data-room]")){const l=c.dataset.room===a.roomId;c.classList.toggle("active",l),l&&window.matchMedia("(max-width: 719px)").matches&&c.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"})}}W.subscribe((a,c,l)=>l.includes("roomId")&&o(a)),wt.on("plan:loaded",i),i()}const gd=(n,t)=>t?`<div class="kv"><dt>${n}</dt><dd>${Vt(t)}</dd></div>`:"";function Ab(n){const t=re.room(n.roomId);return`
    <header class="detail__head">
      <div>
        <span class="tag">${Vt(n.category)}</span>
        <h2>${Vt(n.name)}</h2>
        ${t?`<button type="button" class="link" data-go-room="${Vt(t.id)}">${te("pin",13)} ${Vt(t.name)}</button>`:""}
      </div>
      <button type="button" class="iconbtn" data-close aria-label="Đóng">${te("close",18)}</button>
    </header>
    <dl class="kvs">
      ${gd("Kích thước",vb(n.dims))}
      ${gd("Chất liệu",n.material)}
    </dl>
    ${n.note?`<p class="detail__note">${Vt(n.note)}</p>`:""}
    <div class="detail__actions">
      <button type="button" class="btn btn--primary" data-locate>${te("eye",16)} Xem gần</button>
    </div>`}function Rb(n){const t=re.itemsIn(n.id);return`
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
    </div>`}function Cb(n){n.innerHTML='<aside class="card detail" data-inset="detail" hidden aria-live="polite"></aside>';const t=n.firstElementChild;t.addEventListener("click",i=>{if(i.target.closest("[data-close]"))return W.select(null);const s=i.target.closest("[data-go-room]");if(s)return wt.emit("room:go",{id:s.dataset.goRoom});const r=i.target.closest("[data-item]");if(r){const o={type:"item",id:r.dataset.item};return W.select(o),wt.emit("camera:locate",o)}i.target.closest("[data-locate]")&&W.state.selection&&wt.emit("camera:locate",W.state.selection)});function e(i){const s=i.selection,r=s&&re.get(s.type,s.id);if(!r){t.hidden=!0,t.innerHTML="";return}t.innerHTML=r.type==="room"?Rb(r):Ab(r),t.hidden=!1}W.subscribe((i,s,r)=>r.includes("selection")&&e(i)),e(W.state)}const Pb=[[{cmd:"zoomIn",icon:"plus",label:"Phóng to"},{cmd:"zoomOut",icon:"minus",label:"Thu nhỏ"}],[{cmd:"rotateLeft",icon:"rotateLeft",label:"Xoay trái"},{cmd:"rotateRight",icon:"rotateRight",label:"Xoay phải"}],[{cmd:"home",icon:"home",label:"Về góc nhìn ban đầu"}]];function Lb(n){n.innerHTML=`<nav class="card mapctl" aria-label="Điều khiển camera">${Pb.map(t=>t.map(e=>`<button class="mapctl__btn" type="button" data-cmd="${e.cmd}" title="${e.label}" aria-label="${e.label}">${te(e.icon,17)}</button>`).join("")).join('<span class="mapctl__sep" aria-hidden="true"></span>')}</nav>`,n.addEventListener("click",t=>{const e=t.target.closest("[data-cmd]");e&&wt.emit("camera:cmd",{cmd:e.dataset.cmd})})}const Qs=46;function Db(n,t,e){n.innerHTML=`
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
    </style>`;const i=n.querySelector(".minimap"),s=i.getContext("2d"),r=n.querySelector(".joy"),o=n.querySelector(".joy__knob"),a=n.querySelector(".toast"),c=n.querySelector(".hud-reticle"),l=n.querySelector(".hud-badge"),u=n.querySelector(".hud-badge__label"),f=n.querySelector(".tbtn--interact");let d=null;const p=(b,y)=>{o.style.transform=`translate(${b}px, ${y}px)`};function _(b){const y=r.getBoundingClientRect();let A=b.clientX-(y.left+y.width/2),D=b.clientY-(y.top+y.height/2);const H=Math.hypot(A,D);H>Qs&&(A=A/H*Qs,D=D/H*Qs),p(A,D),t.setAxis(A/Qs,D/Qs)}r.addEventListener("pointerdown",b=>{d=b.pointerId,r.setPointerCapture(d),_(b)}),r.addEventListener("pointermove",b=>b.pointerId===d&&_(b));const x=b=>{b.pointerId===d&&(d=null,p(0,0),t.setAxis(0,0))};r.addEventListener("pointerup",x),r.addEventListener("pointercancel",x);const m=n.querySelector(".touchpad");for(const b of m?.querySelectorAll?.("[data-key]")??[]){const y=b.dataset.key,A=D=>{t.press(y,!1),b.classList.remove("on"),b.hasPointerCapture?.(D.pointerId)&&b.releasePointerCapture(D.pointerId)};b.addEventListener("pointerdown",D=>{b.setPointerCapture(D.pointerId),t.press(y,!0),b.classList.add("on")}),b.addEventListener("pointerup",A),b.addEventListener("pointercancel",A)}const h=m?.querySelector?.(".tbtn--run");h?.addEventListener?.("click",()=>{const b=h.getAttribute("aria-pressed")!=="true";h.setAttribute("aria-pressed",String(b)),h.classList.toggle("on",b),t.press("ShiftLeft",b)});const v=m?.querySelector?.(".tbtn--crouch");v&&v.addEventListener("click",()=>{const b=v.getAttribute("aria-pressed")!=="true";v.setAttribute("aria-pressed",String(b)),v.classList.toggle("on",b),t.setCrouch(b)});function T(){const{width:b,height:y}=i,A=12,D=Math.min((b-A*2)/at.size.w,(y-A*2)/at.size.d),H=(b-at.size.w*D)/2,N=(y-at.size.d*D)/2;s.clearRect(0,0,b,y),s.font="11px system-ui, sans-serif",s.textAlign="center";for(const rt of at.rooms){const st=rt.id===W.state.roomId;s.fillStyle=st?"#f5e3dc":"#fffdf9",s.strokeStyle="#c9b8ae",s.lineWidth=1.5,s.fillRect(H+rt.x0*D,N+rt.z0*D,(rt.x1-rt.x0)*D,(rt.z1-rt.z0)*D),s.strokeRect(H+rt.x0*D,N+rt.z0*D,(rt.x1-rt.x0)*D,(rt.z1-rt.z0)*D),s.fillStyle="#7a6a61",s.fillText(rt.name,H+(rt.x0+rt.x1)/2*D,N+(rt.z0+rt.z1)/2*D+4)}const{x:G,z:R,yaw:O}=t.state,B=H+G*D,K=N+R*D,ht=Math.atan2(-Math.cos(O),-Math.sin(O));s.fillStyle="rgba(198,90,58,0.25)",s.beginPath(),s.moveTo(B,K),s.arc(B,K,26,ht-.6,ht+.6),s.closePath(),s.fill(),s.fillStyle="#c65a3a",s.beginPath(),s.arc(B,K,5,0,Math.PI*2),s.fill()}let w=0;function I(b){a.textContent=b,a.hidden=!1,clearTimeout(w),w=setTimeout(()=>{a.hidden=!0},5e3)}function C(b){b?(l.hidden=!1,l.style.display="flex",u.textContent=b,c?.classList.add("active"),f&&(f.hidden=!1,f.setAttribute("aria-label",b))):(l.hidden=!0,l.style.display="none",u.textContent="",c?.classList.remove("active"),f&&(f.hidden=!0))}function L(b){const y=b.mode==="walk";if(n.hidden=!y,document.body.classList.toggle("walking",y),y){const A=window.matchMedia("(pointer: coarse)").matches;I(A?"Cần bên trái để đi, kéo màn hình để nhìn quanh, nút bên phải để nhảy hoặc chạy, chạm vào cửa để đóng/mở.":"WASD để đi, Space để nhảy, Ctrl/C để ngồi, nhấp vào cửa (hoặc phím F) để đóng/mở, kéo chuột nhìn quanh."),C(W.state.interactPrompt||e?.getActivePrompt?.()||null)}else C(null)}const g=wt.on("hud:prompt",b=>C(b)),S=W.subscribe((b,y,A)=>{A.includes("mode")&&L(b),A.includes("interactPrompt")&&C(b.interactPrompt)});return L(W.state),{draw:T,notify:I,setPrompt:C,dispose(){g?.(),S?.()}}}const Ib={wood:"Gỗ sáng",darkwood:"Gỗ tối",tile:"Gạch",marble:"Đá hoa",granite:"Granite",concrete:"Bê tông",epoxy:"Epoxy trắng",carpet:"Thảm",glass:"Kính"},Nb={door:"Cửa đi",window:"Cửa sổ",open:"Lối mở"},_d=[.7,.9,1.2,1.5,2,2.5,3],Xi=n=>`${(Math.round(n*10)/10).toLocaleString("vi-VN")} m²`,Ia=(n,t,e,i)=>`<div class="chips-row">${n.map(s=>`<button type="button" class="chipbtn${s===t?" on":""}" ${e}="${Vt(s)}">${Vt(i(s))}</button>`).join("")}</div>`;function Ub(n){const t=(e,i,s)=>`<button type="button" class="chipbtn${n.tool===e?" on":""}" data-tool="${e}">${te(s,15)} ${i}</button>`;return`<section><h3>Thêm vào mặt bằng</h3><div class="chips-row">
      ${t("door","Cửa đi","plus")}${t("window","Cửa sổ","plus")}${t("open","Lối mở","plus")}
      ${at.custom?t("room","Vẽ phòng","pencil"):""}
    </div>${n.tool?`<p class="plan__hint">${n.tool==="room"?"Kéo trên sàn để vẽ phòng chữ nhật.":"Bấm vào một đoạn tường để đặt."} Bấm lại nút để thôi.</p>`:""}</section>`}function Ob(n){const t=n.selection,e=t&&re.get(t.type,t.id);return e?.type==="room"?`<section><h3>Phòng đang chọn</h3>
      <label class="plan__field">Tên phòng
        <input type="text" maxlength="40" value="${Vt(e.name)}" data-room-name="${Vt(e.id)}" />
      </label>
      <div class="plan__label">Vật liệu sàn</div>
      ${Ia(uc,e.floor??"wood","data-room-floor",i=>Ib[i])}
      <p class="plan__hint">${Xi(e.area)}${at.custom?" · kéo chấm cam để đổi cạnh, kéo sàn để dời phòng":""}</p>
      ${at.custom?`<button type="button" class="rbtn rbtn--danger" data-room-delete="${Vt(e.id)}">${te("trash",16)}<span>Xoá phòng</span></button>`:""}
    </section>`:e?.type==="opening"?`<section><h3>${Vt(e.name)} đang chọn</h3>
      ${Ia(Bo,e.kind,"data-op-type",i=>Nb[i])}
      <div class="plan__label">Bề rộng</div>
      ${Ia(_d,_d.find(i=>Math.abs(i-e.w)<.01),"data-op-width",i=>`${i} m`)}
      <p class="plan__hint">Kéo khối cửa dọc tường để dời.</p>
      <button type="button" class="rbtn rbtn--danger" data-op-delete="${Vt(e.id)}">${te("trash",16)}<span>Xoá</span></button>
    </section>`:'<p class="plan__hint">Bấm một phòng, hoặc một cửa, để chỉnh sàn / tên / kích thước.</p>'}function Fb(n){return at.custom?`<section><h3>Tầng · tổng ${Xi(at.totalArea)}</h3>
    <div class="chips-row">${at.floors.map(t=>`<button type="button" class="chipbtn${t.id===at.floorId?" on":""}" data-floor="${Vt(t.id)}">${Vt(t.name)} · ${Xi(t.area)}</button>`).join("")}
      <button type="button" class="chipbtn" data-floor-add>${te("plus",15)} Thêm tầng</button></div>
    <label class="plan__field">Tên tầng đang xem
      <input type="text" maxlength="40" value="${Vt(at.floors.find(t=>t.id===at.floorId)?.name??"")}" data-floor-name="${Vt(at.floorId)}" />
    </label>
    ${at.floors.length>1?`<button type="button" class="rbtn rbtn--danger" data-floor-remove="${Vt(at.floorId)}">${te("trash",16)}<span>Xoá tầng này</span></button>`:""}
  </section>`:""}function zb(n){if(!at.custom)return`<section><h3>Mặt bằng</h3>
      <p class="plan__hint">Đang dùng mặt bằng mẫu theo diện tích tin đăng (${Xi(at.area)}). Có thể đổi sàn, thêm/dời cửa. Muốn tự vẽ phòng và thêm tầng, hãy chuyển sang tự thiết kế.</p>
      <button type="button" class="rbtn" data-plan-convert>${te("pencil",16)}<span>Tự thiết kế mặt bằng</span></button>
    </section>`;const t=n.listingArea,e=t?Math.abs(at.totalArea-t):0;return`<section><h3>Diện tích</h3>
    <p class="plan__hint">Tầng này ${Xi(at.area)} · tổng ${Xi(at.totalArea)}${t?` · tin đăng ${Xi(t)}`:""}</p>
    ${t?`<button type="button" class="rbtn" data-plan-fit="${t}" ${e<.5?"disabled":""}>${te("cube",16)}<span>Khớp diện tích tin đăng</span></button>`:""}
    <button type="button" class="rbtn rbtn--danger" data-plan-revert>${te("undo",16)}<span>Quay về mặt bằng mẫu</span></button>
  </section>`}function Bb(n){let t=!1;function e(){const i=W.state;i.editPanel==="plan"&&(n.innerHTML=[zb(i),Fb(),Ub(i),Ob(i)].join(""),t=!1)}return n.addEventListener("click",i=>{const s=i.target.closest("button");if(!s)return;const r=s.dataset;if(r.tool)return wt.emit("tool:set",{tool:r.tool}),W.set({editPanel:null});if("planConvert"in r)return wt.emit("plan:convert");if("planRevert"in r){if(!t){t=!0,s.querySelector("span").textContent="Bấm lần nữa để xác nhận (mất mặt bằng tự vẽ)";return}return wt.emit("plan:revert")}if("planFit"in r)return wt.emit("plan:fit",{target:Number(r.planFit)});if(r.floor)return wt.emit("plan:floor-select",{id:r.floor});if("floorAdd"in r)return wt.emit("plan:floor-add",{});if(r.floorRemove)return wt.emit("plan:floor-remove",{id:r.floorRemove});if(r.roomFloor)return wt.emit("plan:room-floor",{id:W.state.selection.id,floor:r.roomFloor});if(r.roomDelete)return wt.emit("plan:room-delete",{id:r.roomDelete});if(r.opType)return wt.emit("plan:opening-type",{id:W.state.selection.id,type:r.opType});if(r.opWidth)return wt.emit("plan:opening-width",{id:W.state.selection.id,w:Number(r.opWidth)});if(r.opDelete)return wt.emit("plan:opening-delete",{id:r.opDelete})}),n.addEventListener("change",i=>{const s=i.target.closest("input");s&&(s.dataset.roomName&&wt.emit("plan:room-name",{id:s.dataset.roomName,name:s.value}),s.dataset.floorName&&wt.emit("plan:floor-rename",{id:s.dataset.floorName,name:s.value}))}),W.subscribe((i,s,r)=>{["editPanel","selection","tool","floorId","listingArea"].some(o=>r.includes(o))&&e()}),wt.on("plan:loaded",e),{render:e}}const kb=60,Hb="Kéo đồ để dời · kéo nền để dịch khung · chuột phải để xoay",Gb={door:"Bấm vào tường để đặt cửa đi",window:"Bấm vào tường để đặt cửa sổ",open:"Bấm vào tường để tạo lối mở",room:"Kéo trên sàn để vẽ phòng"};function Vb(){const n=new Map;for(const t of Object.keys(Qi)){const e=Is[t];e&&(n.has(e.category)||n.set(e.category,[]),n.get(e.category).push({kind:t,name:e.name}))}return[...n].map(([t,e])=>({category:t,kinds:e}))}function Wb(n){const t=Vb();n.innerHTML=`
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
    </div>`;const e=n.querySelector(".rail"),i=n.querySelector(".rail__ctx"),s=n.querySelector(".rail__hint"),r=n.querySelector(".rail__name"),o=n.querySelector('[data-act="toggle"]'),a=n.querySelector('[data-act="reset"]'),c=n.querySelector('[data-act="remove"]'),l=n.querySelector(".inv");let u="";const f=Bb(n.querySelector(".plan")),d=()=>{const x=W.state.selection;return x?.type==="item"?re.get("item",x.id):null};function p(){const x=re.list("item"),m=x.map(v=>`${v.id}:${v.hidden?1:0}`).join("|");if(m===u)return;u=m;const h=x.filter(v=>v.extra).length;l.innerHTML=x.map(v=>`<li class="inv__row${v.hidden?" is-hidden":""}">
            <button type="button" class="inv__name" data-pick="${Vt(v.id)}">${Vt(v.name)}${v.extra?" <small>(thêm)</small>":""}</button>
            <button type="button" class="rbtn rbtn--icon" data-vis="${Vt(v.id)}" aria-label="${v.hidden?"Hiện":"Ẩn"} ${Vt(v.name)}">${te(v.hidden?"eyeOff":"eye",18)}</button>
          </li>`).join("")+`<li class="inv__foot">${x.length} món · ${h}/${kb} đồ thêm</li>`}function _(x){const m=x.editing&&x.editable&&x.mode==="overview";if(e.hidden=!m,!m)return;n.querySelector(".plan-label").textContent=`Mặt bằng · ${at.totalArea.toFixed(0)} m²${at.floors.length>1?` · ${at.floors.length} tầng`:""}`;const h=d();i.hidden=!h,s.hidden=!!h,h&&(r.textContent=h.name,o.innerHTML=te(h.hidden?"eyeOff":"eye",18),o.setAttribute("aria-label",h.hidden?`Hiện ${h.name}`:`Ẩn ${h.name}`),a.hidden=!h.moved,c.hidden=!h.extra);for(const v of n.querySelectorAll("[data-panel]")){const T=x.editPanel===v.dataset.panel;v.setAttribute("aria-expanded",String(T)),v.classList.toggle("active",T)}for(const v of n.querySelectorAll("[data-drawer]"))v.hidden=v.dataset.drawer!==x.editPanel;x.editPanel==="inventory"&&p(),x.editPanel==="plan"&&f.render(),s.textContent=Gb[x.tool]??Hb}n.addEventListener("click",x=>{const m=x.target.closest("[data-panel]");if(m){W.set({editPanel:W.state.editPanel===m.dataset.panel?null:m.dataset.panel});return}const h=x.target.closest("[data-add]");if(h)return wt.emit("edit:add",{kind:h.dataset.add});const v=x.target.closest("[data-pick]");if(v){const C={type:"item",id:v.dataset.pick};return W.select(C),wt.emit("camera:locate",C)}const T=x.target.closest("[data-vis]");if(T)return u="",wt.emit("edit:toggle",{id:T.dataset.vis});const w=x.target.closest("[data-act]"),I=d();w&&I&&wt.emit(`edit:${w.dataset.act}`,{id:I.id})}),n.addEventListener("keydown",x=>{x.key==="Escape"&&W.state.editPanel&&W.set({editPanel:null})}),W.subscribe((x,m,h)=>{["editing","editable","mode","selection","editPanel","tool"].some(v=>h.includes(v))&&_(x)}),wt.on("plan:loaded",()=>{u="",_(W.state)}),_(W.state)}const Na=n=>!!n&&n.width>0&&n.height>0;function Xb({width:n,height:t},{topbar:e,rooms:i,detail:s,detailShown:r=!0},o=720){const a={left:0,right:0,top:0,bottom:0},c=n>=o;Na(e)&&(a.top=Math.max(0,e.bottom)),Na(i)&&(c?a.left=Math.max(0,i.right):a.bottom=Math.max(a.bottom,t-i.top)),r&&Na(s)&&(c?a.right=Math.max(0,n-s.left):a.bottom=Math.max(a.bottom,t-s.top));const l=n*.6,u=t*.6;if(a.left+a.right>l){const f=l/(a.left+a.right);a.left*=f,a.right*=f}if(a.top+a.bottom>u){const f=u/(a.top+a.bottom);a.top*=f,a.bottom*=f}return a}const $b=[["header","ui-topbar"],["nav","ui-rooms"],["div","ui-detail"],["div","ui-mapctl"],["div","ui-hud"],["div","ui-edit"]];function qb(n,{app:t,walker:e}){const i={};for(const[c,l]of $b){const u=document.createElement(c);u.id=l,u.className="region",n.append(u),i[l]=u}Tb(i["ui-topbar"]),wb(i["ui-rooms"]),Cb(i["ui-detail"]),Lb(i["ui-mapctl"]);const s=Db(i["ui-hud"],e);Wb(i["ui-edit"]);let r=0;function o(){r=0;const c=n.querySelector('[data-inset="detail"]');t.setInsets(Xb({width:window.innerWidth,height:window.innerHeight},{topbar:i["ui-topbar"].getBoundingClientRect(),rooms:n.querySelector('[data-inset="rooms"]')?.getBoundingClientRect(),detail:c?.getBoundingClientRect(),detailShown:!!c&&!c.hidden&&!document.body.classList.contains("editing")}))}const a=()=>{r||(r=requestAnimationFrame(o))};return window.addEventListener("resize",a),W.subscribe((c,l,u)=>{(u.includes("selection")||u.includes("mode")||u.includes("editing"))&&(a(),setTimeout(a,320))}),a(),setTimeout(a,400),{hud:s,els:i}}const vt=Math.PI,ce=(n,t,e)=>({c:n,w:t,type:"window",...e?{sill:e}:{}}),_n=(n,t=.9)=>({c:n,w:t,type:"door"}),Ho=(n,t=1)=>({c:n,w:t,type:"door",entrance:!0}),Go=(n,t)=>({c:n,w:t,type:"open"}),ot=(n,t,e,i=0,s,r)=>({kind:n,x:t,z:e,rot:i,...s?{args:s}:{},...r?{name:r}:{}}),sn=(n,t,e,i,s)=>({dir:n,at:t,from:e,to:i,t:gh,openings:s}),Ye=(n,t,e,i,s=[])=>({dir:n,at:t,from:e,to:i,t:_h,openings:s}),Yb={id:"studio",bedrooms:0,bathrooms:1,size:{w:7,d:5.5},rooms:[{id:"living",name:"Phòng ở & ngủ",x0:0,x1:7,z0:0,z1:3.5,floor:"wood",stand:{x:3.4,z:.7,yaw:vt},note:"Khu ngủ và tiếp khách chung một không gian"},{id:"kitchen",name:"Bếp",x0:0,x1:4,z0:3.5,z1:5.5,floor:"tile",stand:{x:2.2,z:4.3,yaw:vt/2+.5},note:"Bếp một dãy, lối vào căn hộ"},{id:"bath",name:"Vệ sinh",x0:4,x1:7,z0:3.5,z1:5.5,floor:"tile",stand:{x:5.5,z:4,yaw:vt},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[sn("x",0,0,7,[ce(2.2,2.4)]),sn("x",5.5,0,7,[ce(5.5,.6,1.5)]),sn("z",0,0,5.5,[ce(1.75,1.6),Ho(4.5)]),sn("z",7,0,5.5,[ce(1.75,1.6)]),Ye("x",3.5,0,7,[Go(1.3,2),_n(5.5)]),Ye("z",4,3.5,5.5)],placements:[ot("rug",3.05,2,0,[2.6,1.8]),ot("sofa",3.05,1.5,0,[2.2]),ot("coffeeTable",3.05,2.5),ot("tvUnit",3.05,3.24,vt,[1.2]),ot("bed",5.6,1.17,0),ot("nightstand",4.4,.35,0),ot("wardrobe",6.64,2.8,-vt/2,[1.2,2.3]),ot("plant",.5,.5,0,[1]),ot("floorLamp",.5,3),ot("kitchenRun",1.9,5.1,vt,[2.6]),ot("fridge",3.55,5.06,vt),ot("shower",6.4,5,0),ot("toilet",4.8,5.08,vt),ot("vanity",4.33,4.2,vt/2)]},jb={id:"1pn",bedrooms:1,bathrooms:1,size:{w:8,d:6.5},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:5,z0:0,z1:4,floor:"wood",stand:{x:3.4,z:.7,yaw:vt},note:"Sofa, TV, cửa sổ đón sáng"},{id:"kitchen",name:"Bếp & ăn",x0:5,x1:8,z0:0,z1:3,floor:"tile",stand:{x:5.8,z:.9,yaw:-vt/2-.4},note:"Bếp chữ I, bàn ăn 4 chỗ"},{id:"study",name:"Góc làm việc",x0:5,x1:8,z0:3,z1:6.5,floor:"wood",stand:{x:5.7,z:3.6,yaw:-vt/2+.3},note:"Bàn làm việc, tủ sách"},{id:"bed1",name:"Phòng ngủ",x0:0,x1:3.4,z0:4,z1:6.5,floor:"wood",stand:{x:2.6,z:4.5,yaw:vt/2+.3},note:"Giường đôi, tủ áo"},{id:"bath",name:"Vệ sinh",x0:3.4,x1:5,z0:4,z1:6.5,floor:"tile",stand:{x:4.2,z:4.6,yaw:vt},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[sn("x",0,0,8,[ce(1.6,2.2),Ho(4.2),ce(6.5,1.6)]),sn("x",6.5,0,8,[ce(1.7,1.4),ce(4.2,.6,1.5),ce(6.5,1.8)]),sn("z",0,0,6.5,[ce(2,1.8),ce(5.25,1.4)]),sn("z",8,0,6.5,[ce(1.5,1.2),ce(4.75,1.6)]),Ye("z",5,0,6.5,[Go(1.5,2),_n(3.5)]),Ye("x",3,5,8),Ye("x",4,0,5,[_n(1.7),_n(3.95)]),Ye("z",3.4,4,6.5)],placements:[ot("rug",2.8,2.7,0,[3,2]),ot("sofa",2.8,1.6,0,[2.2]),ot("coffeeTable",2.8,2.8),ot("tvUnit",2.8,3.74,vt,[1.2]),ot("armchair",.9,2.75,vt/2),ot("plant",.4,3.7,0,[1.1]),ot("floorLamp",4.55,3.1),ot("console",1.5,.28,0,[1]),ot("plant",.45,.45,0,[.8],"Cây lối vào"),ot("kitchenRun",6.2,2.64,vt,[1.9]),ot("fridge",7.55,2.58,vt),ot("diningTable",6.8,1),ot("chair",6.35,.4,0),ot("chair",7.25,.4,0),ot("chair",6.35,1.6,vt),ot("chair",7.25,1.6,vt),ot("rug",1.7,5.5,vt/2,[2.2,1.6,"beige"]),ot("bed",1.17,5.5,vt/2),ot("nightstand",.33,4.42,vt/2),ot("wardrobe",3.04,5.5,-vt/2,[1.4,2.3]),ot("toilet",3.8,6.09,vt),ot("shower",4.47,5.6,0),ot("vanity",4.66,4.6,-vt/2),ot("desk",7.6,4.75,-vt/2),ot("chair",7.1,4.75,vt/2,void 0,"Ghế làm việc"),ot("bookshelf",6.4,6.24,vt,[1.4]),ot("plant",5.3,6.1,0,[1])]},Kb={id:"2pn",bedrooms:2,bathrooms:1,size:{w:10,d:7},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:6,z0:0,z1:4.5,floor:"wood",stand:{x:3.4,z:.7,yaw:vt},note:"Sofa, TV, cửa sổ đón sáng hướng Nam"},{id:"kitchen",name:"Bếp & ăn",x0:6,x1:10,z0:0,z1:3,floor:"tile",stand:{x:6.8,z:.9,yaw:-vt/2-.4},note:"Bếp chữ I, bàn ăn 4 chỗ"},{id:"bed2",name:"Phòng ngủ 2",x0:6,x1:10,z0:3,z1:7,floor:"wood",stand:{x:6.9,z:3.9,yaw:-vt/2+.2},note:"Giường đôi, tủ áo, bàn làm việc"},{id:"bed1",name:"Phòng ngủ 1",x0:0,x1:4,z0:4.5,z1:7,floor:"wood",stand:{x:2.8,z:5.1,yaw:vt/2+.3},note:"Giường đôi, tủ áo âm tường"},{id:"bath",name:"Vệ sinh",x0:4,x1:6,z0:4.5,z1:7,floor:"tile",stand:{x:5,z:5.2,yaw:vt},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[sn("x",0,0,10,[ce(2.2,2.4),Ho(5),ce(8,1.6)]),sn("x",7,0,10,[ce(2,1.4),ce(5,.6,1.5),ce(8,2)]),sn("z",0,0,7,[ce(2.5,1.8),ce(5.75,1.4)]),sn("z",10,0,7,[ce(1.5,1.2),ce(5,1.6)]),Ye("z",6,0,7,[Go(1.5,2),_n(3.9)]),Ye("x",3,6,10),Ye("x",4.5,0,6,[_n(2),_n(5)]),Ye("z",4,4.5,7)],placements:[ot("rug",3.5,2.7,0,[3,2]),ot("sofa",3.5,1.6,0,[2.4]),ot("coffeeTable",3.5,2.9),ot("ottoman",2.2,2.9),ot("tvUnit",3.5,4.24,vt,[1.8]),ot("armchair",1,3.3,vt/2),ot("plant",.5,4,0,[1.1]),ot("floorLamp",5.5,3.3),ot("console",3.9,.3,0,[1]),ot("plant",5.55,.45,0,[.8],"Cây lối vào"),ot("kitchenRun",7.63,2.64,vt,[2.95]),ot("fridge",9.5,2.58,vt),ot("diningTable",8,1.1),ot("chair",7.55,.5,0),ot("chair",8.45,.5,0),ot("chair",7.55,1.7,vt),ot("chair",8.45,1.7,vt),ot("rug",1.7,6.05,vt/2,[2.2,1.6,"beige"]),ot("bed",1.17,6.05,vt/2),ot("nightstand",.33,5,vt/2),ot("wardrobe",3.64,5.75,-vt/2,[1.4,2.3]),ot("shower",4.55,6.5,0),ot("toilet",5.5,6.62,vt),ot("vanity",5.69,5.3,-vt/2),ot("rug",8,4.4,0,[2.4,1.6,"beige"]),ot("bed",8,4.1,0),ot("nightstand",6.95,3.35,0),ot("nightstand",9.05,3.35,0),ot("wardrobe",6.36,6,vt/2,[1.4,2.3]),ot("desk",9.6,5,-vt/2),ot("chair",9.1,5,vt/2,void 0,"Ghế làm việc"),ot("dresser",9.55,6.45,-vt/2)]},Zb={id:"3pn",bedrooms:3,bathrooms:2,size:{w:13,d:8},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:7,z0:0,z1:5,floor:"wood",stand:{x:5.8,z:.8,yaw:vt-.5},note:"Phòng khách rộng, kết hợp bàn ăn"},{id:"kitchen",name:"Bếp",x0:7,x1:13,z0:0,z1:3.5,floor:"tile",stand:{x:7.9,z:.9,yaw:-vt/2-.4},note:"Bếp chữ I, bàn ăn"},{id:"hall",name:"Sảnh",x0:7,x1:9,z0:3.5,z1:5.5,floor:"wood",stand:{x:7.6,z:4,yaw:-vt/2},note:"Sảnh trung tâm dẫn tới phòng ngủ chính"},{id:"master",name:"Phòng ngủ chính",x0:9,x1:13,z0:3.5,z1:8,floor:"wood",stand:{x:9.7,z:4.4,yaw:-vt/2-.2},note:"Giường đôi, tủ áo lớn"},{id:"bath2",name:"Vệ sinh chung",x0:7,x1:9,z0:5.5,z1:8,floor:"tile",stand:{x:8,z:6,yaw:vt},note:"Buồng tắm kính, bồn rửa"},{id:"bed2",name:"Phòng ngủ 2",x0:0,x1:3.5,z0:5,z1:8,floor:"wood",stand:{x:2.7,z:5.5,yaw:vt/2+.3},note:"Giường đôi, tủ áo"},{id:"bed3",name:"Phòng ngủ 3",x0:3.5,x1:5.6,z0:5,z1:8,floor:"wood",stand:{x:4.55,z:5.5,yaw:vt},note:"Phòng ngủ nhỏ cho con / khách"},{id:"bath1",name:"Vệ sinh 2",x0:5.6,x1:7,z0:5,z1:8,floor:"tile",stand:{x:6.3,z:5.5,yaw:vt},note:"Vệ sinh gần phòng khách"}],walls:[sn("x",0,0,13,[ce(2.5,2.6),Ho(5.8),ce(10,2)]),sn("x",8,0,13,[ce(1.75,1.6),ce(4.5,1.2),ce(6.3,.6,1.5),ce(8,.6,1.5),ce(11.6,1.6)]),sn("z",0,0,8,[ce(2.5,2),ce(6.5,1.6)]),sn("z",13,0,8,[ce(1.75,1.4),ce(5.75,1.6)]),Ye("z",7,0,8,[Go(1.75,2.2),_n(4.2)]),Ye("x",3.5,7,13),Ye("z",9,3.5,8,[_n(4.4)]),Ye("x",5.5,7,9,[_n(8)]),Ye("x",5,0,7,[_n(1.6),_n(4.55),_n(6.3)]),Ye("z",3.5,5,8),Ye("z",5.6,5,8)],placements:[ot("rug",3.1,3,0,[3,2]),ot("sofa",3.1,1.9,0,[2.4]),ot("coffeeTable",3.1,3.1),ot("ottoman",1.95,3.1),ot("tvUnit",3.1,4.74,vt,[1.8]),ot("armchair",1,3.6,vt/2),ot("armchair",5.3,3.6,-vt/2),ot("plant",.5,4.5,0,[1.1]),ot("floorLamp",5.9,4.4),ot("console",4.3,.3,0,[1]),ot("plant",6.6,.5,0,[.8],"Cây lối vào"),ot("diningTable",5.2,1.9),ot("chair",4.75,1.3,0),ot("chair",5.65,1.3,0),ot("chair",4.75,2.5,vt),ot("chair",5.65,2.5,vt),ot("kitchenRun",9.6,3.14,vt,[3.6]),ot("fridge",11.85,3.08,vt),ot("diningTable",9.8,1.3),ot("chair",9.35,.7,0),ot("chair",10.25,.7,0),ot("chair",9.35,1.9,vt),ot("chair",10.25,1.9,vt),ot("plant",8.6,3.9,0,[.9]),ot("rug",11.9,5.75,-vt/2,[2.4,1.6,"beige"]),ot("bed",11.87,5.75,-vt/2),ot("nightstand",12.7,4.7,-vt/2),ot("nightstand",12.7,6.8,-vt/2),ot("wardrobe",9.8,7.65,vt,[1.4,2.3]),ot("plant",12.55,7.5,0,[1]),ot("dresser",9.35,6.2,vt/2),ot("toilet",7.5,7.6,vt),ot("shower",8.45,7.45,0),ot("vanity",7.33,6.4,vt/2),ot("rug",1.8,6.5,vt/2,[2.2,1.6,"beige"]),ot("bed",1.17,6.5,vt/2),ot("nightstand",.33,5.35,vt/2),ot("wardrobe",3.14,6.5,-vt/2,[1.2,2.3]),ot("bed",4.55,6.85,vt),ot("toilet",5.97,6.4,vt/2),ot("vanity",6.67,6.6,-vt/2),ot("shower",6.4,7.4,0)]},xd=[Yb,jb,Kb,Zb],Jb=.9,Qb=1.3,ro=.15,vd=.9;function ty(n){const t=Math.max(0,Math.min(3,Math.floor(n)));return xd.find(e=>e.bedrooms===t)??xd[2]}const je=(n,t)=>Math.round(n*t*1e3)/1e3;function ey(n,t){return n.map(e=>({...e,at:je(e.at,t),from:je(e.from,t),to:je(e.to,t),openings:e.openings.map(i=>({...i,c:je(i.c,t),at:i.at===void 0?void 0:je(i.at,t)}))}))}function ny(n,t){return n.map(e=>({...e,x0:je(e.x0,t),x1:je(e.x1,t),z0:je(e.z0,t),z1:je(e.z1,t),stand:{...e.stand,x:je(e.stand.x,t),z:je(e.stand.z,t)}}))}function iy(n){return n.map((t,e)=>({...t,openings:t.openings.map((i,s)=>({...i,id:`w${e}o${s}`,dir:t.dir,at:t.at}))}))}function sy(n,t){if(!t)return n;const e=new Set(t.removed??[]),i=t.moved??{},s=n.map(r=>{const o=c=>c.w/2+ro,a=[];for(const c of r.openings){if(e.has(c.id))continue;const l=i[c.id],u=l?{...c,...l.c!==void 0?{c:l.c}:{},...l.w!==void 0?{w:l.w}:{},...l.type?{type:l.type}:{}}:c;u.type==="window"&&u.sill===void 0&&(u.sill=vd),u.type!=="window"&&delete u.sill,u.type!=="door"&&delete u.entrance,u.c=Math.min(r.to-o(u),Math.max(r.from+o(u),u.c)),!(r.to-r.from<u.w+ro*2)&&a.push(u)}return{...r,openings:a}});for(const r of t.added??[]){const o=s.find(u=>u.dir===r.dir&&Math.abs(u.at-r.at)<.06);if(!o)continue;const a={...r};a.type!=="window"?delete a.sill:a.sill===void 0&&(a.sill=vd),a.type!=="door"&&delete a.entrance;const c=o.from+a.w/2+ro,l=o.to-a.w/2-ro;l<c||(a.c=Math.min(l,Math.max(c,a.c)),o.openings.push(a))}for(const r of s)r.openings.sort((o,a)=>o.c-a.c);return s}function ry(n,t){return t?n.map(e=>{const i=t[e.id];return i?{...e,...i.name?{name:i.name}:{},...i.floor?{floor:i.floor}:{}}:e}):n}function oy(n){const t=Is[n];return{name:t.name,category:t.category,material:t.material,note:t.note}}function Uh(n,t,e){Is[n.kind];const i=Qi[n.kind],s=n.args&&n.args.length?n.args:i.length?i:void 0;return{id:n.id,kind:n.kind,args:s,x:je(n.x,t),z:je(n.z,t),rot:n.rot??0,...oy(n.kind),pick:!0,hidden:!!n.hidden,moved:!1,extra:!0,floor:e}}function ay(n){return n.map(t=>({id:t.id,name:t.name,area:Lh(t.rooms)}))}function ly(n,t,{editable:e,floorId:i}){const s=t.layout.custom.floors,r=s.find(l=>l.id===i)??s[0],o=r.rooms.map(l=>({...l,stand:{x:Md((l.x0+l.x1)/2),z:Md((l.z0+l.z1)/2),yaw:Math.PI},note:`${Ki(l).toFixed(0)} m²`})),a=Ph(r.rooms,r.openings),c=[];for(const l of t.layout.extras??[])!((l.floor??s[0].id)===r.id)||!Is[l.kind]||!Object.prototype.hasOwnProperty.call(Qi,l.kind)||l.hidden&&!e||c.push(Uh(l,1,r.id));return{templateId:"custom",bedrooms:n.bedrooms,size:XM(r.rooms),rooms:o,walls:a,placements:c,scale:1,floors:ay(s),floorId:r.id,totalArea:fc(s),custom:!0}}const Md=n=>Math.round(n*100)/100;function cy(n,t,{editable:e=!1,floorId:i}={}){if(t?.layout?.custom)return ly(n,t,{editable:e,floorId:i});const s=ty(n.bedrooms),r=s.rooms.reduce((x,m)=>x+Ki(m),0),o=Math.sqrt(Math.max(1,n.areaM2)/r),a=Math.min(Qb,Math.max(Jb,o)),c=sd[t?.furnishing??n.furnishing]??sd.full,l=t?.layout?.items??{},u=new Map,f=[];for(const x of s.placements){const m=Is[x.kind];if(!m)continue;const h=(u.get(x.kind)??0)+1;if(u.set(x.kind,h),m.tier>c)continue;const v=`${x.kind}-${h}`,T=l[v],w=!!T?.hidden;w&&!e||f.push({id:v,kind:x.kind,args:x.args,x:je(T?.x??x.x,a),z:je(T?.z??x.z,a),rot:T?.rot??x.rot,name:x.name??m.name,category:m.category,material:m.material,note:m.note,pick:m.pick!==!1,hidden:w,moved:T!==void 0&&(T.x!==void 0||T.z!==void 0||T.rot!==void 0),extra:!1})}for(const x of t?.layout?.extras??[])!Is[x.kind]||!Object.prototype.hasOwnProperty.call(Qi,x.kind)||x.hidden&&!e||f.push(Uh(x,a));const d=ny(ry(s.rooms,t?.layout?.rooms),a),p=ey(sy(iy(s.walls),t?.layout?.openings),a),_=d.reduce((x,m)=>x+Ki(m),0);return{templateId:s.id,bedrooms:s.bedrooms,size:{w:je(s.size.w,a),d:je(s.size.d,a)},rooms:d,walls:p,placements:f,scale:a,floors:[{id:"main",name:"Tầng 1",area:Math.round(_*1e3)/1e3}],floorId:"main",totalArea:Math.round(_*1e3)/1e3,custom:!1}}const Lo=.9,Bi=1.2,Si=6,Ua=24,Oa=1.35,Fa=.58,oo=1.5,Oh=4,uy=12,dy=60,hy=2e3,lr=(n,t)=>typeof n=="string"?n.trim().slice(0,t):"",ir=(n,t,e,i)=>{const s=Math.floor(Number(n));return Number.isFinite(s)&&s>=t&&s<=e?s:i};function fy(n,t){if(!n||typeof n!="object")return null;const e=lr(n.apartmentId,80),i=ir(n.floor,1,t,0),s=ir(n.slot,0,Oh-1,-1);if(!e||!i||s<0)return null;const r=Number(n.areaM2);return{apartmentId:e,floor:i,slot:s,label:lr(n.label,40)||e,bedrooms:ir(n.bedrooms,0,8,2),bathrooms:ir(n.bathrooms,0,8,1),areaM2:Number.isFinite(r)&&r>0&&r<=1e3?r:70,furnishing:["bare","partial","full"].includes(n.furnishing)?n.furnishing:"full",has3d:n.has3d===!0}}function py(n){if(!n||typeof n!="object"||!Array.isArray(n.buildings))return null;const t=[],e=new Set;for(const i of n.buildings.slice(0,uy)){if(!i||typeof i!="object")continue;const s=lr(i.id,40),r=ir(i.floors,1,dy,0);if(!s||!r||e.has(s))continue;e.add(s);const o=new Set,a=[];for(const c of(Array.isArray(i.units)?i.units:[]).slice(0,hy)){const l=fy(c,r),u=l&&`${l.floor}:${l.slot}`;!l||o.has(u)||(o.add(u),a.push(l))}t.push({id:s,name:lr(i.name,40)||s,floors:r,units:a})}return t.length?{name:lr(n.name,80),buildings:t}:null}const my=n=>({apartmentId:n.apartmentId,bedrooms:n.bedrooms,bathrooms:n.bathrooms,areaM2:n.areaM2,furnishing:n.furnishing,designs:[]});function gy(n){const t=n<=6?7:9,e=(t-1)/2,i=[];for(let a=0;a<t;a++)for(let c=0;c<t;c++)Math.max(Math.abs(a-e),Math.abs(c-e))<=2&&i.push([a,c]);let s=n*7919+13;const r=()=>(s=s*1664525+1013904223>>>0)/4294967296;for(let a=i.length-1;a>0;a--){const c=Math.floor(r()*(a+1));[i[a],i[c]]=[i[c],i[a]]}const o=i.slice(0,n);return{size:t,block:Ua,owner:new Set(o.map(([a,c])=>`${a},${c}`)),pos:o.map(([a,c])=>({x:(a-e)*Ua,z:(c-e)*Ua}))}}function bd(n,t={x:0,z:0}){const e=Bi+(n.floor-1)*Lo+Lo/2,i=Si/2+.04;return n.slot<2?{x:t.x+(n.slot===0?-oo:oo),y:e,z:t.z+i,ry:0}:{x:t.x+i,y:e,z:t.z+(n.slot===2?oo:-oo),ry:Math.PI/2}}const yd=[[9,1],[14,2],[6,0],[16,3],[8,1]];function _y(){return{name:"TH PropTech Residence",buildings:[14,18,10,20,12].map((i,s)=>[String.fromCharCode(65+s),`Tòa ${String.fromCharCode(65+s)}`,i]).map(([i,s,r],o)=>{const a=[];for(let c=1;c<=r;c++)for(let l=0;l<Oh;l++){const u=`${i}-${String(c).padStart(2,"0")}0${l+1}`;a.push({apartmentId:`demo-${u}`,floor:c,slot:l,label:u,bedrooms:1+(c+l)%3,bathrooms:1+(c+l)%2,areaM2:45+l*12+(c+o)%3*5,furnishing:["bare","partial","full"][(c+l)%3],has3d:c===yd[o][0]&&l===yd[o][1]})}return{id:i,name:s,floors:r,units:a}})}}const ao=Math.PI/4,Sd=1,xy=30,za=15659771,_o=19,vy=2.4,My=1.6,by=new Ot(988979),yy=new F(70,130,90),Sy=new F(-70,110,60),Ey=new Ot(16777215),Ty=new Ot(10204415),wy=new Ot(14673658),Ay=new Ot(3489899),Ed=[14242639,3900100,15905076,4171638,9333695,14711609,3094080],Fh=_o/2-.8,Ry=8*Fh;function Cy(n,t){const e=(n%(8*t)+8*t)%(8*t),i=Math.floor(e/(2*t)),s=e-i*2*t-t;return i===0?[s,-t]:i===1?[t,s]:i===2?[-s,t]:[-t,-s]}const Py=n=>()=>(n=n*1664525+1013904223>>>0)/4294967296;function zh(n,t){const e=document.createElement("canvas");e.width=e.height=64,n(e.getContext("2d"));const i=new wo(e);return i.wrapS=i.wrapT=cr,t&&i.repeat.set(...t),i.colorSpace=qe,i.anisotropy=4,i}const Ly=()=>zh(n=>{n.fillStyle="#f4f6fd",n.fillRect(0,0,64,64),n.fillStyle="#c3cef4",n.fillRect(0,16,64,16),n.fillStyle="#f4f6fd";for(let t=0;t<64;t+=16)n.fillRect(t+14,16,2,16)}),Dy=n=>zh(t=>{t.fillStyle="#fff",t.fillRect(0,0,64,64),t.fillStyle="#b9c7ea",t.fillRect(0,60,64,4)},[1,n]);function Td(n,t,e,i,s,r){const o=new ue(n,t,e),a=o.attributes.uv,c=[[e,t],[e,t],null,null,[n,t],[n,t]];for(let u=0;u<6;u++)for(let f=0;f<4;f++){const d=u*4+f;c[u]?a.setXY(d,a.getX(d)*c[u][0]/vy,a.getY(d)*c[u][1]/My):a.setXY(d,.5,.06)}o.translate(i,t/2,s);const l=new Float32Array(72);for(let u=0;u<24;u++)l.set([r,r,r],u*3);return o.setAttribute("color",new Mn(l,3)),o}function yi(n,t,e){const i=new Ql(n,t,Math.max(1,e.length));i.count=e.length;const s=new De;return e.forEach((r,o)=>{s.position.set(r.x,r.y,r.z),s.rotation.set(0,r.ry??0,0),s.scale.setScalar(r.s??1),s.updateMatrix(),i.setMatrixAt(o,s.matrix)}),i.instanceMatrix.needsUpdate=!0,i}function Iy(n){n.traverse(t=>{t.geometry?.dispose?.();const e=Array.isArray(t.material)?t.material:t.material?[t.material]:[];for(const i of e)i.map?.dispose(),i.dispose()})}function Ny(n,t={},e=mh()){const i=new uh({antialias:!e.coarse,powerPreference:"high-performance",stencil:!1}),s=Math.min(window.devicePixelRatio||1,e.coarse?1.25:1.75),r=e.coarse?12e5:24e5;let o=1/0;i.setPixelRatio(s),i.outputColorSpace=qe,i.toneMapping=Io,i.shadowMap.enabled=!0,i.shadowMap.type=Es,i.shadowMap.autoUpdate=!1,Object.assign(i.domElement.style,{display:"block",width:"100%",height:"100%",touchAction:"none",outline:"none",cursor:"grab"});const a=new Jl,c=new Ot(za);a.background=new Ot(za),a.fog=new Uo(za,320,760);const l=new hn(xy,1,2,1400);n.append(i.domElement);const u=new hh(l,i.domElement);u.enableDamping=!0,u.dampingFactor=.1,u.rotateSpeed=.5,u.panSpeed=1.1,u.minDistance=8,u.maxDistance=360,u.minPolarAngle=.35,u.maxPolarAngle=1.5,u.minAzimuthAngle=ao-Sd,u.maxAzimuthAngle=ao+Sd,u.screenSpacePanning=!1,u.touches={ONE:fn.PAN,TWO:fn.DOLLY_ROTATE},u.addEventListener("change",()=>ut()),u.mouseButtons={LEFT:Xe.PAN,MIDDLE:Xe.DOLLY,RIGHT:Xe.ROTATE};const f=new Kd(16777215,14673658,1.55);a.add(f);const d=new th(16777215,1.9);d.castShadow=!0,d.shadow.mapSize.set(e.shadowSize,e.shadowSize),d.shadow.bias=-6e-4,d.shadow.normalBias=.05;const p=d.shadow.camera;p.left=-110,p.right=110,p.top=110,p.bottom=-110,p.near=1,p.far=400,d.position.set(70,130,90),a.add(d,d.target);const _=new ke({color:2179199,roughness:.25,metalness:.2}),x=new ke({color:16766346,emissive:16754234,emissiveIntensity:1,roughness:.4}),m=new ke({color:1782118,roughness:.7}),h=new ke({color:16757575,emissive:16751135,emissiveIntensity:.9,roughness:.4}),v=new Xt(new ue(Oa+.3,Fa+.3,.12),new ji({color:16777215,transparent:!0,opacity:.6,depthTest:!1}));v.renderOrder=10,v.visible=!1,a.add(v);let T=null,w=null,I=null,C={h:100},L=[],g=[],S=[],b=null,y=null,A=!0,D=0,H=0,N=0,G=0,R=null,O={w:1,h:1},B=3,K=0,ht=!1,rt=0,st=0;const ut=(U=2)=>{U>B&&(B=U)},pt=new ue(Oa,Fa,.08),Q=new ue(Oa+.18,Fa+.18,.05),xt=(()=>{const U=new Ls(.75,14,10).translate(0,1.5,0),Z=new nc(.62,1.3,14).rotateX(Math.PI).translate(0,.65,0);return or([U.toNonIndexed(),Z.toNonIndexed()])})();function mt(){const U=H;a.background.lerpColors(c,by,U),a.fog.color.copy(a.background),f.intensity=Ue.lerp(1.55,.5,U),f.groundColor.lerpColors(wy,Ay,U),d.intensity=Ue.lerp(1.9,.65,U),d.color.lerpColors(Ey,Ty,U),d.position.lerpVectors(yy,Sy,U),i.shadowMap.needsUpdate=!0}function Nt(U,Z){const $=Math.min(90,Math.round(U.length*1.2));if(!$)return;const lt=or([new zs(.15,.19,.72,6).translate(0,.52,0).toNonIndexed(),new Ls(.16,6,5).translate(0,1.04,0).toNonIndexed()]),j=new Ql(lt,new ke({color:16777215,roughness:.9}),$),nt=new Ot,ct=[];for(let bt=0;bt<$;bt++){const[gt,ft]=U[Math.floor(Z()*U.length)];ct.push({bx:gt,bz:ft,s:Z()*Ry,dir:Z()<.5?1:-1,speed:.9+Z()*.8,phase:Z()*6}),j.setColorAt(bt,nt.setHex(Ed[Math.floor(Z()*Ed.length)]))}j.frustumCulled=!1,R={mesh:j,walkers:ct,dummy:new De},T.add(j),Ht(0)}function Ht(U){if(!R)return;const{mesh:Z,walkers:$,dummy:lt}=R;$.forEach((j,nt)=>{j.s+=j.dir*j.speed*U;const[ct,bt]=Cy(j.s,Fh);lt.position.set(j.bx+ct,.12+Math.abs(Math.sin(D*6+j.phase))*.05,j.bz+bt),lt.updateMatrix(),Z.setMatrixAt(nt,lt.matrix)}),Z.instanceMatrix.needsUpdate=!0}function kt(U,Z){const $=new jt,lt=I.pos[Z];$.position.set(lt.x,0,lt.z);const j=U.floors*Lo,nt=new Xt(new ue(Si+1.6,Bi,Si+1.6),new ke({color:14936571,roughness:.8}));nt.position.y=Bi/2;const ct=new Xt(new ue(Si,j,Si),new ke({color:4883186,map:Dy(U.floors),roughness:.8,emissive:0}));ct.position.y=Bi+j/2;const bt=new Xt(new ue(Si-.8,.5,Si-.8),new ke({color:3105494,roughness:.8}));bt.position.y=Bi+j+.25;const gt=new Xt(new ue(3.2,.8,.06),new ke({color:1782118,roughness:.3}));gt.position.set(0,.45,(Si+1.6)/2+.03);for(const tt of[nt,ct,bt,gt])tt.castShadow=!0,tt.receiveShadow=!0;$.add(nt,gt,ct,bt),ct.userData={building:U},nt.userData={building:U},g.push(ct);const ft=U.units.filter(tt=>tt.has3d),Ft=U.units.filter(tt=>!tt.has3d),Gt=tt=>tt.map(Mt=>bd(Mt)),ee=new Set(U.units.map(tt=>`${tt.floor}:${tt.slot}`)),z=[];for(let tt=1;tt<=U.floors;tt++)for(let Mt=0;Mt<4;Mt++)ee.has(`${tt}:${Mt}`)||z.push({floor:tt,slot:Mt});const _t=yi(Q,m,Gt([...U.units,...z])),it=yi(pt,_,Gt(z)),St=yi(pt,_,Gt(Ft)),dt=yi(pt,x,Gt(ft));if(St.userData={building:U,units:Ft},dt.userData={building:U,units:ft},$.add(_t,it,St,dt),L.push(dt,St,ct,nt),ft.length){const tt=new Xt(xt,h);tt.position.set(0,Bi+j+1.2,0),tt.userData.baseY=tt.position.y,tt.userData.phase=Z*1.3,$.add(tt),S.push(tt)}return $}function Se(){const{size:U,block:Z}=I,$=(U-1)/2,lt=U*Z/2;C={h:lt};const j=new Xt(new Ps(U*Z+600,U*Z+600),new ke({color:14673400,roughness:1}));j.rotation.x=-Math.PI/2,j.receiveShadow=!0,T.add(j);const nt=[];for(let dt=0;dt<=U;dt++){const tt=(dt-U/2)*Z;for(let Mt=-lt;Mt<lt;Mt+=3.2)nt.push({x:Mt+1.6,y:.02,z:tt},{x:tt,y:.02,z:Mt+1.6,ry:Math.PI/2})}T.add(yi(new Ps(1.3,.16).rotateX(-Math.PI/2),new ke({color:16251391}),nt));const ct=Py(23),bt=[],gt=[],ft=[],Ft=[],Gt=[];for(let dt=0;dt<U;dt++)for(let tt=0;tt<U;tt++){const Mt=(dt-$)*Z,zt=(tt-$)*Z,Ee=I.owner.has(`${dt},${tt}`),ae=!Ee&&ct()<.1;(ae?gt:bt).push({x:Mt,y:.06,z:zt});const Ln=Math.hypot(dt-$,tt-$)/$;if(ae||Gt.push([Mt,zt]),!ae&&!Ee)if(ct()<.18){const Ae=12+ct()*4;ft.push(Td(Ae,2.4+ct()*1.2,7+ct()*3,Mt+(ct()-.5)*2,zt+(ct()-.5)*3,.96))}else for(const[Ae,En]of[[-5,-5],[5,-5],[-5,5],[5,5]]){if(ct()<.2)continue;const Vo=4.4+ct()*3.4,yr=4.4+ct()*3.4,Sr=2.6+ct()**2*11*Math.max(.35,1.25-Ln*.7);ft.push(Td(Vo,Sr,yr,Mt+Ae+(ct()-.5)*1.4,zt+En+(ct()-.5)*1.4,.93+ct()*.07))}if(!Ee&&ct()<.75){const Ae=_o/2-.5;for(let En=-Ae+1.5;En<=Ae-1.5;En+=3.4)ct()<.25||Ft.push({x:Mt+En,z:zt+Ae},{x:Mt+En,z:zt-Ae},{x:Mt+Ae,z:zt+En},{x:Mt-Ae,z:zt+En})}if(ae)for(let Ae=0;Ae<14;Ae++)Ft.push({x:Mt+(ct()-.5)*15,z:zt+(ct()-.5)*15})}const ee=new ue(_o,.12,_o),z=yi(ee,new ke({color:15856892,roughness:1}),bt),_t=yi(ee,new ke({color:13890016,roughness:1}),gt);if(z.receiveShadow=_t.receiveShadow=!0,T.add(z,_t),ft.length){const dt=new Xt(or(ft),new ke({map:Ly(),vertexColors:!0,roughness:.9}));dt.castShadow=!0,dt.receiveShadow=!0,T.add(dt)}const it=new Ot,St=yi(new sc(.48,0),new ke({color:16777215,roughness:.9}),Ft.map(dt=>({x:dt.x,y:.6,z:dt.z,s:.8+ct()*.6})));Ft.forEach((dt,tt)=>St.setColorAt(tt,it.setHSL(.38+ct()*.04,.6,.5+ct()*.1))),St.instanceColor&&(St.instanceColor.needsUpdate=!0),T.add(St),Nt(Gt,ct)}function Jt(){T&&(a.remove(T),Iy(T),T=null,L=[],g=[],S=[],R=null,b=null,v.visible=!1)}const de=()=>{const U=l.position.clone().sub(u.target),Z=new Ao().setFromVector3(U);return{target:u.target.clone(),distance:Z.radius,azimuth:Z.theta,polar:Z.phi}},he=U=>{u.target.copy(U.target),l.position.copy(U.target).add(new F().setFromSphericalCoords(U.distance,U.polar,U.azimuth)),l.lookAt(U.target)};let Wt=null;function Pe(U,Z=1){Wt?.resolve(!1);const $=de();return Z>0?new Promise(lt=>{Wt={from:$,to:U,duration:Z,resolve:lt,t:0}}):(he(U),Wt=null,Promise.resolve(!0))}u.addEventListener("start",()=>{Wt&&(Wt.resolve(!1),Wt=null)});const be=()=>{const U=O.w/O.h;return{target:new F(0,0,0),distance:Math.min(340,Math.max(120,190*Math.max(1,1.3/U))),azimuth:ao,polar:.95}},Je=U=>w?.buildings.findIndex(Z=>Z.id===U)??-1;function k(){O={w:n.clientWidth||window.innerWidth,h:n.clientHeight||window.innerHeight},i.setPixelRatio(Math.max(.7,Math.min(s,o,Math.sqrt(r/(O.w*O.h))))),i.setSize(O.w,O.h,!1),l.aspect=O.w/O.h,l.updateProjectionMatrix(),ut()}new ResizeObserver(k).observe(n),k();const Ie=new ac,Kt=new Ut;function fe(U){const Z=i.domElement.getBoundingClientRect();Kt.set((U.clientX-Z.left)/Z.width*2-1,-((U.clientY-Z.top)/Z.height)*2+1),Ie.setFromCamera(Kt,l);const $=Ie.intersectObjects(L,!1)[0];if(!$)return null;const lt=$.object.userData;return lt.units?{type:"unit",unit:lt.units[$.instanceId],building:lt.building,object:$.object,instanceId:$.instanceId}:{type:"building",building:lt.building}}function yt(U){if(!(b&&U&&b.type===U.type&&b.building===U.building&&b.unit===U.unit)){b=U;for(const $ of g)$.material.emissive.setHex(U&&U.building===$.userData.building?1451597:0);if(U?.type==="unit"){const $=new me;U.object.getMatrixAt(U.instanceId,$),$.premultiply(U.object.parent.matrixWorld),$.decompose(v.position,v.quaternion,v.scale),v.visible=!0}else v.visible=!1;i.domElement.style.cursor=U?"pointer":"grab",ut()}}let ge=null;i.domElement.addEventListener("pointerdown",U=>{ge={x:U.clientX,y:U.clientY}});let P=null;i.domElement.addEventListener("pointermove",U=>{U.buttons||U.pointerType==="touch"||(P||requestAnimationFrame(()=>{const Z=P;P=null;const $=fe(Z);yt($),t.onHover?.($,Z.clientX,Z.clientY)}),P=U)}),i.domElement.addEventListener("pointerleave",()=>{yt(null),t.onHover?.(null,0,0)}),i.domElement.addEventListener("pointerup",U=>{!ge||Math.hypot(U.clientX-ge.x,U.clientY-ge.y)>5||(ge=null,t.onClick?.(fe(U),U.clientX,U.clientY))});const M=new eh;function X(){const U=Math.min(.1,M.getDelta());if(D+=U,H!==N&&(H=H<N?Math.min(N,H+U/1.6):Math.max(N,H-U/1.6),mt(),ut()),Wt){const $=Wt;$.t=Math.min(1,$.t+U/$.duration);const lt=ph($.t);he({target:$.from.target.clone().lerp($.to.target,lt),distance:Math.exp(Ue.lerp(Math.log($.from.distance),Math.log($.to.distance),lt)),azimuth:Ue.lerp($.from.azimuth,$.to.azimuth,lt),polar:Ue.lerp($.from.polar,$.to.polar,lt)}),$.t>=1&&(Wt=null,$.resolve(!0))}else{u.update()&&ut();const $=u.target;$.x=Ue.clamp($.x,-C.h,C.h),$.z=Ue.clamp($.z,-C.h,C.h),$.y=Ue.clamp($.y,0,60)}Wt&&ut(),K+=U,G+=U;const Z=l.position.distanceTo(u.target)<120;if(K>=(Z?1/30:1/10)){K=0,x.emissiveIntensity=(1.05+.55*Math.sin(D*2.4))*(1+H*1.4),Z&&Ht(G),G=0;for(const $ of S)$.position.y=$.userData.baseY+Math.sin(D*2+$.userData.phase)*.35,$.rotation.y=D*1.2+$.userData.phase;ut(1)}B>0?(B--,i.render(a,l),ht?(rt++,U>.034&&st++,rt>=40&&(st>26&&o>.75&&(o=Math.max(.7,Math.min(o,i.getPixelRatio())-.2),k()),rt=st=0)):rt=st=0,ht=!0):ht=!1}return{domElement:i.domElement,setData(U){Jt(),w=U,T=new jt,a.add(T),I=gy(U.buildings.length),Se(),U.buildings.forEach((Z,$)=>T.add(kt(Z,$))),i.shadowMap.needsUpdate=!0,ut(3),y=null,he(be())},home:(U=1)=>(y=null,Pe(be(),U)),focusBuilding(U,Z=1){const $=Je(U);if($<0)return this.home(Z);y=U;const j=w.buildings[$].floors*Lo;return Pe({target:new F(I.pos[$].x,Bi+j*.42,I.pos[$].z+1),distance:Math.max(36,j*2.3),azimuth:ao,polar:1.2},Z)},flyToUnit(U,Z,$=.9){const lt=bd(U,I.pos[Je(Z.id)]);return Pe({target:new F(lt.x,lt.y,lt.z),distance:7,azimuth:U.slot<2?.05:Math.PI/2-.05,polar:1.45},$)},setNight(U){N=U?1:0,ut(3)},get night(){return N===1},get focusedId(){return y},get paused(){return A},pause(){A=!0,i.setAnimationLoop(null)},resume(){A=!1,M.getDelta(),ut(3),i.setAnimationLoop(X)}}}const Uy=360;function Oy(n,{onEnterUnit:t}){n.innerHTML=`
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
    <div class="campus-fade"></div>`;const e=g=>n.querySelector(g),i=e("#campus-tip"),s=e("#campus-panel"),r=e(".campus-fade");let o=null,a=!1,c=0;const l=g=>`Tầng ${g.floor} · ${g.bedrooms} PN · ${g.areaM2} m²`;function u(g,S,b){i.innerHTML=g,i.hidden=!1;const y=14,A=i.offsetWidth;i.style.transform=`translate(${Math.min(S+y,window.innerWidth-A-8)}px, ${Math.max(8,b-i.offsetHeight-y)}px)`}const f=()=>{i.hidden=!0};function d(g){u(Vt(g),window.innerWidth/2-100,window.innerHeight/2),clearTimeout(c),c=setTimeout(()=>{c=0,f()},1800)}const p=Ny(e(".campus-stage"),{onHover(g,S,b){if(!(c&&g==null)){if(!g)return f();if(clearTimeout(c),c=0,g.type==="unit"){const y=g.unit;u(`<b>${Vt(y.label)}</b><span>${Vt(l(y))}</span><em class="${y.has3d?"on":""}">${y.has3d?"Bấm để xem 3D":"Chưa có mô hình 3D"}</em>`,S,b)}else f()}},onClick(g){if(!a){if(!g)return I();if(g.type==="building")return C(g.building);if(g.unit.has3d)return L(g.unit,g.building);p.focusedId!==g.building.id&&C(g.building),d(`${g.unit.label}: chưa có mô hình 3D`)}}}),_=e("#campus-night");function x(){const g=p.night;_.innerHTML=te(g?"moon":"sun",18);const S=g?"Chuyển sang ban ngày":"Chuyển sang ban đêm";_.setAttribute("aria-label",S),_.setAttribute("aria-pressed",String(g)),_.title=S}_.addEventListener("click",()=>{p.setNight(!p.night),x()}),x();const m=e("#campus-fs"),h=!!(document.fullscreenEnabled||document.webkitFullscreenEnabled);m.hidden=Us()||!(h||Po()&&!Us());let v=!1;function T(){m.innerHTML=te(v?"shrink":"expand",18);const g=v?"Thoát toàn màn hình":"Toàn màn hình";m.setAttribute("aria-label",g),m.title=g}m.addEventListener("click",()=>{if(h){const g=document.documentElement,S=g.requestFullscreen??g.webkitRequestFullscreen,b=document.exitFullscreen??document.webkitExitFullscreen;document.fullscreenElement??document.webkitFullscreenElement?b.call(document):S.call(g)}else bn("FLOORPLAN_EXPAND_TOGGLE")});const w=()=>{v=!!(document.fullscreenElement??document.webkitFullscreenElement),T()};document.addEventListener("fullscreenchange",w),document.addEventListener("webkitfullscreenchange",w),wt.on("host:expanded",({expanded:g})=>{v=g,T()}),T();function I(){s.hidden=!0,p.focusedId&&p.home()}function C(g){f();const S=g.units.filter(b=>b.has3d).sort((b,y)=>y.floor-b.floor||b.slot-y.slot);s.hidden=!1,s.innerHTML=`
      <header><div><b>${Vt(g.name)}</b><small>${g.floors} tầng · ${S.length}/${g.units.length} căn có 3D</small></div>
        <button class="iconbtn" type="button" data-close aria-label="Đóng">${te("close",16)}</button></header>
      <ul>${S.length?S.map(b=>`<li><button type="button" data-id="${Vt(b.apartmentId)}">
            <span class="campus-dot campus-dot--on"></span>
            <span class="campus-unit"><b>${Vt(b.label)}</b><small>${Vt(l(b))}</small></span>
            <span class="tag">3D</span></button></li>`).join(""):'<li class="campus-empty">Tòa này chưa có căn nào có mô hình 3D.</li>'}</ul>`,s.querySelector("[data-close]").onclick=I,s.querySelectorAll("[data-id]").forEach(b=>{b.onclick=()=>L(S.find(y=>y.apartmentId===b.dataset.id),g)}),p.focusBuilding(g.id)}async function L(g,S){a=!0,f(),await p.flyToUnit(g,S),r.style.transition="",r.classList.add("on"),await new Promise(b=>setTimeout(b,Uy)),t(g,S),a=!1}return{setData(g){o=g,e("#campus-title").textContent=g.name||"Khu căn hộ";const S=g.buildings.reduce((b,y)=>b+y.units.filter(A=>A.has3d).length,0);e("#campus-sub").textContent=`${S} căn có 3D`,s.hidden=!0,p.setData(g)},get hasData(){return!!o},pause:()=>p.pause(),resume(){p.resume(),p.focusedId&&p.focusBuilding(p.focusedId,.9),r.style.transition="none",r.classList.add("on"),r.offsetWidth,r.style.transition="",r.classList.remove("on")}}}const Ri=new URLSearchParams(location.search),Ze=Gx(document.getElementById("viewport"));xh({templateId:"",bedrooms:2,size:{w:10,d:7},rooms:[],walls:[],placements:[]});bh();const kn=Zv(Ze),wi=rM({camera:Ze.camera,dom:Ze.renderer.domElement,colliders:kn.colliders}),Gs=dM(Ze,kn,wi),vr=pM(Ze,kn),Pn=qb(document.getElementById("ui"),{app:Ze,walker:wi});let mr=null,li=[],Ul="",oe=Ce(null);const wd=n=>JSON.stringify(Ce(n)),bc=()=>li.find(n=>n.id===W.state.designId)??li[0];function Pi(){const n=bc(),t=cy(mr,{...n,layout:oe},{editable:W.state.editing,floorId:W.state.floorId??void 0});Hx(Rh(n)),xh(t),bh(),kn.rebuild(),W.state.floorId!==at.floorId&&W.set({floorId:at.floorId}),kh.sync(),wt.emit("plan:loaded"),Ze.invalidateShadows(),Pn.hud.draw()}function Bh(n,{keepView:t=!1}={}){const e=li.find(s=>s.id===n)??li[0];oe=Ce(e.layout);const i=W.state.mode==="walk";return W.set({designs:li,designId:e.id,selection:null,hover:null,roomId:null,menu:null,editPanel:null}),Pi(),t||W.set({hour:e.defaultHour}),kn.setHour(W.state.hour),Gs.start({walk:i}),e}function Ol(n,t,e){return JSON.stringify([{...n,designs:void 0},t.map(i=>i.id===e?{...i,layout:void 0}:i)])}function yc(n){const t=n.designs.length?n.designs:[LM(n.apartmentId)],e=!mr,i=e?null:W.state.designId;if(W.set({editable:n.editable,listingArea:n.areaM2}),!n.editable&&W.state.editing&&W.set({editing:!1}),!e&&Ol(n,t,i)===Ul){const a=t.find(c=>c.id===i);a&&wd(a.layout)!==wd(oe)&&(li=t,oe=Ce(a.layout),W.set({designs:li}),Pi());return}mr=n,li=t;const s=!e&&W.state.designs.some(o=>o.id===W.state.designId),r=Bh(n.designId??(s?W.state.designId:null),{keepView:!e});Ul=Ol(n,t,r.id),e&&Fy()}function Fy(){const n=Number(Ri.get("hour"));n>=6&&n<=18&&W.set({hour:n}),kn.setHour(W.state.hour);const t=Ri.get("room"),e=Ri.get("mode")==="walk";(e||t)&&Gs.start({walk:e,room:t});const i=Ri.get("select");i&&re.get("item",i)&&W.select({type:"item",id:i})}wt.on("design:select",({id:n})=>{const t=Bh(n,{keepView:!1});Ul=Ol(mr,li,t.id),bn("FLOORPLAN_DESIGN_SELECTED",{designId:t.id})});const cn=()=>({custom:at.custom,scale:at.scale,floorId:at.floorId,walls:at.walls,rooms:at.rooms,placements:at.placements});function Bn(n,{select:t,rejected:e="Không thực hiện được thao tác này ở vị trí đó."}={}){return n===oe||n==null?(Pn.hud.notify(e),vr.refresh(),Pi(),!1):(yn(n,t===void 0?{}:{select:t}),!0)}function zy(n,t,e){if(!W.state.editable)return;const i=UM(oe,n,t,e,at.scale),s=at.placements.find(o=>o.id===n),r=re.get("item",n);if(!s||!r)return yn(i);oe=i;for(const o of[s,r])Object.assign(o,{x:t,z:e,moved:!0});vr.refresh(),Ze.invalidateShadows(),W.set({selection:{type:"item",id:n}}),bn("FLOORPLAN_LAYOUT_CHANGED",{designId:bc().id,layout:oe})}const kh=_b(Ze,kn,vr,{isCustom:()=>at.custom,onMove:(n,t,e)=>zy(n,t,e),onReject:n=>Pn.hud.notify(n),onCancel:()=>Pi(),onOpeningMove:(n,t)=>Bn(JM(oe,cn(),n,t),{select:{type:"opening",id:n},rejected:"Cửa không đặt được ở đó (tường quá ngắn)."}),onOpeningAdd:({dir:n,at:t,c:e,type:i})=>{const s=nb(oe,cn(),{dir:n,at:t,c:e,type:i});if(!s)return Pn.hud.notify("Không đặt được ở đó: tường quá ngắn hoặc đã có cửa.");yn(s.layout,{select:{type:"opening",id:s.id}}),W.set({tool:null})},onRoomDraw:n=>{const t=ob(oe,cn(),n);if(!t)return Pn.hud.notify("Không vẽ được phòng ở đó: quá nhỏ (tối thiểu 1,2 m), chồng lên phòng khác hoặc đã đủ số phòng."),Pi();yn(t.layout,{select:{type:"room",id:t.id}}),W.set({tool:null})},onRoomResize:(n,t)=>Bn(lb(oe,cn(),n,t),{select:{type:"room",id:n},rejected:"Không đổi được kích thước: phòng sẽ quá nhỏ hoặc chồng lên phòng khác."}),onRoomMove:(n,t,e)=>Bn(cb(oe,cn(),n,t,e),{select:{type:"room",id:n},rejected:"Không dời được phòng: sẽ chồng lên phòng khác."})});function yn(n,{select:t}={}){if(!W.state.editable)return;const e=t!==void 0?t:W.state.selection,i={...at.size};oe=n,Pi(),(Math.abs(at.size.w-i.w)>.4||Math.abs(at.size.d-i.d)>.4)&&wt.emit("camera:cmd",{cmd:"home"}),e&&re.get(e.type,e.id)?W.set({selection:e}):W.set({selection:null}),vr.refresh(),bn("FLOORPLAN_LAYOUT_CHANGED",{designId:bc().id,layout:oe})}wt.on("edit:rotate",({id:n})=>{const t=at.placements.find(e=>e.id===n);t&&yn(OM(oe,n,t.rot??0))});wt.on("edit:toggle",({id:n})=>yn(FM(oe,n)));wt.on("edit:reset",({id:n})=>yn(BM(oe,n)));wt.on("edit:remove",({id:n})=>{NM(oe,n)&&yn(zM(oe,n),{select:null})});function By(n){const t=n??{x0:0,x1:at.size.w,z0:0,z1:at.size.d},e=(t.x0+t.x1)/2,i=(t.z0+t.z1)/2,s=re.list("item").filter(o=>!o.hidden);let r={x:e,z:i,score:-1/0};for(let o=t.x0+.7;o<=t.x1-.7;o+=.4)for(let a=t.z0+.7;a<=t.z1-.7;a+=.4){let c=1/0;for(const u of s){const f=(u.dims?.w??.6)/2+.45,d=(u.dims?.d??.6)/2+.45;c=Math.min(c,Math.max(Math.abs(o-u.x)-f,Math.abs(a-u.z)-d))}const l=Math.min(c,1)*3-Math.hypot(o-e,a-i)*.15;l>r.score&&(r={x:o,z:a,score:l})}return{x:Math.round(r.x*20)/20,z:Math.round(r.z*20)/20}}wt.on("edit:add",({kind:n})=>{const t=re.room(W.state.roomId)??at.rooms[0],{x:e,z:i}=By(t),s=at.placements.map(a=>a.id),r=kM(oe,n,e,i,at.scale,s);if(!r)return;let o=r.layout;at.custom&&(o=Ce({...o,extras:o.extras.map(a=>a.id===r.id?{...a,floor:at.floorId}:a)})),yn(o,{select:{type:"item",id:r.id}}),W.set({editPanel:null})});const Mr=()=>W.state.selection;wt.on("plan:convert",()=>{at.custom||Bn(ib(oe,{rooms:at.rooms,walls:at.walls,placements:at.placements}),{select:null,rejected:"Không chuyển được sang mặt bằng tuỳ chỉnh."})});wt.on("plan:revert",()=>{yn(sb(),{select:null}),W.set({floorId:null})});wt.on("plan:room-floor",({id:n,floor:t})=>Bn(YM(oe,cn(),n,t),{select:Mr()}));wt.on("plan:room-name",({id:n,name:t})=>Bn(jM(oe,cn(),n,t),{select:Mr(),rejected:"Tên phòng không được để trống."}));wt.on("plan:room-delete",({id:n})=>Bn(ub(oe,cn(),n),{select:null,rejected:"Mỗi tầng phải còn ít nhất một phòng."}));wt.on("plan:opening-type",({id:n,type:t})=>Bn(tb(oe,cn(),n,t),{select:Mr()}));wt.on("plan:opening-width",({id:n,w:t})=>Bn(QM(oe,cn(),n,t),{select:Mr(),rejected:"Cửa rộng quá so với đoạn tường này."}));wt.on("plan:opening-delete",({id:n})=>Bn(eb(oe,cn(),n),{select:null}));wt.on("plan:floor-add",({name:n})=>{const t=db(oe,cn(),n);if(!t)return Pn.hud.notify("Đã đạt số tầng tối đa (5 tầng).");W.set({floorId:t.id}),yn(t.layout,{select:null})});wt.on("plan:floor-select",({id:n})=>{n!==at.floorId&&(W.set({floorId:n,selection:null,roomId:null}),Pi(),Gs.start({walk:!1}))});wt.on("plan:floor-rename",({id:n,name:t})=>Bn(hb(oe,cn(),n,t),{select:Mr()}));wt.on("plan:floor-remove",({id:n})=>{const t=fb(oe,cn(),n);if(t===oe)return Pn.hud.notify("Phải giữ lại ít nhất một tầng.");W.set({floorId:null}),yn(t,{select:null})});wt.on("plan:fit",({target:n})=>{const t=pb(oe,cn(),Number(n));if(t.layout===oe)return Pn.hud.notify("Diện tích đã khớp tin đăng.");yn(t.layout,{select:null}),Pn.hud.notify(`Đã co dãn mặt bằng: ${t.before.toFixed(1)} → ${t.after.toFixed(1)} m².`)});wt.on("tool:set",({tool:n})=>W.set({tool:W.state.tool===n?null:n}));W.subscribe((n,t,e)=>{e.includes("mode")&&n.mode==="walk"&&n.editing&&W.set({editing:!1}),e.includes("editing")&&(document.body.classList.toggle("editing",n.editing),kh.setEditing(n.editing),kn.setEditing(n.editing),W.set({editPanel:null,selection:null,tool:null}),mr&&Pi())});W.subscribe((n,t,e)=>{e.includes("hour")&&kn.setHour(n.hour),(e.includes("mode")||e.includes("roomId"))&&Pn.hud.draw(),e.includes("selection")&&n.selection?.type==="room"&&bn("FLOORPLAN_ROOM_SELECTED",{roomId:n.selection.id})});document.addEventListener("click",n=>{const t=n.target.closest?.(".room-label");t&&(wt.emit("room:go",{id:t.dataset.room}),W.select({type:"room",id:t.dataset.room}))});let lo=0;Ze.onFrame(n=>{if(kn.update(n),vr.update(n),Gs.update(n),W.state.playing&&(lo+=n,lo>.05)){let t=W.state.hour+lo*.75;t>18&&(t=6),lo=0,W.set({hour:Math.round(t*100)/100})}if(W.state.mode==="walk"&&wi.update(n)){Ze.invalidate(),Pn.hud.draw();const t=re.list("room").find(e=>wi.state.x>=e.x0&&wi.state.x<=e.x1&&wi.state.z>=e.z0&&wi.state.z<=e.z1);t&&t.id!==W.state.roomId&&W.set({roomId:t.id})}});let Fl="unit",$i=null;const ts=document.createElement("button");ts.type="button";ts.className="iconbtn back-campus";ts.hidden=!0;ts.innerHTML=`${te("home",16)}<span>Sa bàn</span>`;Pn.els["ui-topbar"].prepend(ts);ts.addEventListener("click",()=>{bn("FLOORPLAN_CAMPUS_BACK"),br("campus")});function br(n){n==="campus"&&!$i?.hasData||(Fl=n,document.body.dataset.view=n,n==="campus"?(Ze.pause(),$i.resume()):($i?.pause(),Ze.resume()))}function Sc(n){const t=py(n);if(!t)return bn("FLOORPLAN_ERROR",{code:"INVALID_CAMPUS"});$i??=Oy(document.getElementById("campus"),{onEnterUnit:ky}),$i.setData(t),ts.hidden=!1,br("campus")}function ky(n){bn("FLOORPLAN_UNIT_SELECTED",{apartmentId:n.apartmentId});const t=Mc(my(n));if(!t)return bn("FLOORPLAN_ERROR",{code:"INVALID_UNIT"});yc(t),Gs.start({walk:!1}),br("unit")}yb({init:n=>{yc(n),br("unit")},campus:Sc,pause:()=>Fl==="campus"?$i?.pause():Ze.pause(),resume:()=>Fl==="campus"?$i?.resume():Ze.resume(),reset:()=>wt.emit("camera:cmd",{cmd:"home"}),expanded:n=>wt.emit("host:expanded",{expanded:n})});Ze.start();try{bn("FLOORPLAN_READY")}catch{bn("FLOORPLAN_ERROR",{code:"WEBGL_INIT_FAILED"})}const Hy=Ri.get("view")==="campus"||[...Ri.keys()].length===0;if(!Po()&&Hy)Sc(_y());else if(!Po()){const n=Ro.map(e=>hc({id:e,name:Ns[e].label,theme:e})),t=Sb(Ri,n);t&&yc({...t,editable:Ri.get("edit")==="1"})}window.__apt={setView:br,applyCampus:Sc,app:Ze,world:kn,walker:wi,director:Gs,store:W,plan:at,bus:wt};
