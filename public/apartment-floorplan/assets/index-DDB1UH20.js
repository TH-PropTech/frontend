(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Al="184",Xe={ROTATE:0,DOLLY:1,PAN:2},dn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Vh=0,Tc=1,Wh=2,vs=1,Xh=2,qs=3,wi=0,ln=1,Qn=2,ei=0,Ms=1,wc=2,Ac=3,Rc=4,$h=5,Oi=100,qh=101,Yh=102,jh=103,Kh=104,Zh=200,Jh=201,Qh=202,tf=203,Ca=204,Pa=205,ef=206,nf=207,sf=208,rf=209,of=210,af=211,lf=212,cf=213,uf=214,La=0,Da=1,Ia=2,Ss=3,Na=4,Ua=5,Oa=6,Fa=7,Rl=0,df=1,hf=2,Gn=0,vd=1,Md=2,bd=3,Sd=4,yd=5,Ed=6,yo=7,Td=300,Vi=301,ys=302,Uo=303,Oo=304,Eo=306,nr=1e3,ti=1001,za=1002,Ye=1003,ff=1004,_r=1005,tn=1006,Fo=1007,zi=1008,gn=1009,wd=1010,Ad=1011,ir=1012,Cl=1013,Vn=1014,Cn=1015,ri=1016,Pl=1017,Ll=1018,sr=1020,Rd=35902,Cd=35899,Pd=1021,Ld=1022,Pn=1023,oi=1026,Bi=1027,Dl=1028,Il=1029,Wi=1030,Nl=1031,Ul=1033,to=33776,eo=33777,no=33778,io=33779,Ba=35840,ka=35841,Ga=35842,Ha=35843,Va=36196,Wa=37492,Xa=37496,$a=37488,qa=37489,lo=37490,Ya=37491,ja=37808,Ka=37809,Za=37810,Ja=37811,Qa=37812,tl=37813,el=37814,nl=37815,il=37816,sl=37817,rl=37818,ol=37819,al=37820,ll=37821,cl=36492,ul=36494,dl=36495,hl=36283,fl=36284,co=36285,pl=36286,pf=3200,uo=0,mf=1,bi="",Qe="srgb",ho="srgb-linear",fo="linear",he="srgb",Qi=7680,Cc=519,gf=512,_f=513,xf=514,Ol=515,vf=516,Mf=517,Fl=518,bf=519,Pc=35044,Lc="300 es",kn=2e3,rr=2001;function Sf(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function po(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function yf(){const n=po("canvas");return n.style.display="block",n}const Dc={};function Ic(...n){const t="THREE."+n.shift();console.log(t,...n)}function Dd(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Wt(...n){n=Dd(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function oe(...n){n=Dd(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function ml(...n){const t=n.join(" ");t in Dc||(Dc[t]=!0,Wt(...n))}function Ef(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const Tf={[La]:Da,[Ia]:Oa,[Na]:Fa,[Ss]:Ua,[Da]:La,[Oa]:Ia,[Fa]:Na,[Ua]:Ss};class Ri{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ze=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Nc=1234567;const Zs=Math.PI/180,or=180/Math.PI;function Ls(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ze[n&255]+Ze[n>>8&255]+Ze[n>>16&255]+Ze[n>>24&255]+"-"+Ze[t&255]+Ze[t>>8&255]+"-"+Ze[t>>16&15|64]+Ze[t>>24&255]+"-"+Ze[e&63|128]+Ze[e>>8&255]+"-"+Ze[e>>16&255]+Ze[e>>24&255]+Ze[i&255]+Ze[i>>8&255]+Ze[i>>16&255]+Ze[i>>24&255]).toLowerCase()}function ne(n,t,e){return Math.max(t,Math.min(e,n))}function zl(n,t){return(n%t+t)%t}function wf(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Af(n,t,e){return n!==t?(e-n)/(t-n):0}function Js(n,t,e){return(1-e)*n+e*t}function Rf(n,t,e,i){return Js(n,t,1-Math.exp(-e*i))}function Cf(n,t=1){return t-Math.abs(zl(n,t*2)-t)}function Pf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Lf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Df(n,t){return n+Math.floor(Math.random()*(t-n+1))}function If(n,t){return n+Math.random()*(t-n)}function Nf(n){return n*(.5-Math.random())}function Uf(n){n!==void 0&&(Nc=n);let t=Nc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Of(n){return n*Zs}function Ff(n){return n*or}function zf(n){return(n&n-1)===0&&n!==0}function Bf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function kf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Gf(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+i)/2),u=o((t+i)/2),f=r((t-i)/2),d=o((t-i)/2),g=r((i-t)/2),m=o((i-t)/2);switch(s){case"XYX":n.set(a*u,c*f,c*d,a*l);break;case"YZY":n.set(c*d,a*u,c*f,a*l);break;case"ZXZ":n.set(c*f,c*d,a*u,a*l);break;case"XZX":n.set(a*u,c*m,c*g,a*l);break;case"YXY":n.set(c*g,a*u,c*m,a*l);break;case"ZYZ":n.set(c*m,c*g,a*u,a*l);break;default:Wt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function gs(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function rn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ne={DEG2RAD:Zs,RAD2DEG:or,generateUUID:Ls,clamp:ne,euclideanModulo:zl,mapLinear:wf,inverseLerp:Af,lerp:Js,damp:Rf,pingpong:Cf,smoothstep:Pf,smootherstep:Lf,randInt:Df,randFloat:If,randFloatSpread:Nf,seededRandom:Uf,degToRad:Of,radToDeg:Ff,isPowerOfTwo:zf,ceilPowerOfTwo:Bf,floorPowerOfTwo:kf,setQuaternionFromProperEuler:Gf,normalize:rn,denormalize:gs},hc=class hc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};hc.prototype.isVector2=!0;let Gt=hc;class ai{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],u=i[s+2],f=i[s+3],d=r[o+0],g=r[o+1],m=r[o+2],x=r[o+3];if(f!==x||c!==d||l!==g||u!==m){let _=c*d+l*g+u*m+f*x;_<0&&(d=-d,g=-g,m=-m,x=-x,_=-_);let h=1-a;if(_<.9995){const v=Math.acos(_),y=Math.sin(v);h=Math.sin(h*v)/y,a=Math.sin(a*v)/y,c=c*h+d*a,l=l*h+g*a,u=u*h+m*a,f=f*h+x*a}else{c=c*h+d*a,l=l*h+g*a,u=u*h+m*a,f=f*h+x*a;const v=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=v,l*=v,u*=v,f*=v}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],u=i[s+3],f=r[o],d=r[o+1],g=r[o+2],m=r[o+3];return t[e]=a*m+u*f+c*g-l*d,t[e+1]=c*m+u*d+l*f-a*g,t[e+2]=l*m+u*g+a*d-c*f,t[e+3]=u*m-a*f-c*d-l*g,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(s/2),f=a(r/2),d=c(i/2),g=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=d*u*f+l*g*m,this._y=l*g*f-d*u*m,this._z=l*u*m+d*g*f,this._w=l*u*f-d*g*m;break;case"YXZ":this._x=d*u*f+l*g*m,this._y=l*g*f-d*u*m,this._z=l*u*m-d*g*f,this._w=l*u*f+d*g*m;break;case"ZXY":this._x=d*u*f-l*g*m,this._y=l*g*f+d*u*m,this._z=l*u*m+d*g*f,this._w=l*u*f-d*g*m;break;case"ZYX":this._x=d*u*f-l*g*m,this._y=l*g*f+d*u*m,this._z=l*u*m-d*g*f,this._w=l*u*f+d*g*m;break;case"YZX":this._x=d*u*f+l*g*m,this._y=l*g*f+d*u*m,this._z=l*u*m-d*g*f,this._w=l*u*f-d*g*m;break;case"XZY":this._x=d*u*f-l*g*m,this._y=l*g*f-d*u*m,this._z=l*u*m+d*g*f,this._w=l*u*f+d*g*m;break;default:Wt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],f=e[10],d=i+a+f;if(d>0){const g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(u-c)*g,this._y=(r-l)*g,this._z=(o-s)*g}else if(i>a&&i>f){const g=2*Math.sqrt(1+i-a-f);this._w=(u-c)/g,this._x=.25*g,this._y=(s+o)/g,this._z=(r+l)/g}else if(a>f){const g=2*Math.sqrt(1+a-i-f);this._w=(r-l)/g,this._x=(s+o)/g,this._y=.25*g,this._z=(c+u)/g}else{const g=2*Math.sqrt(1+f-i-a);this._w=(o-s)/g,this._x=(r+l)/g,this._y=(c+u)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ne(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=i*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-i*l,this._z=r*u+o*l+i*c-s*a,this._w=o*u-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const fc=class fc{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Uc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Uc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),u=2*(a*e-r*s),f=2*(r*i-o*e);return this.x=e+c*l+o*f-a*u,this.y=i+c*u+a*l-r*f,this.z=s+c*f+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return zo.copy(this).projectOnVector(t),this.sub(zo)}reflect(t){return this.sub(zo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};fc.prototype.isVector3=!0;let U=fc;const zo=new U,Uc=new ai,pc=class pc{constructor(t,e,i,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],f=i[7],d=i[2],g=i[5],m=i[8],x=s[0],_=s[3],h=s[6],v=s[1],y=s[4],T=s[7],L=s[2],C=s[5],w=s[8];return r[0]=o*x+a*v+c*L,r[3]=o*_+a*y+c*C,r[6]=o*h+a*T+c*w,r[1]=l*x+u*v+f*L,r[4]=l*_+u*y+f*C,r[7]=l*h+u*T+f*w,r[2]=d*x+g*v+m*L,r[5]=d*_+g*y+m*C,r[8]=d*h+g*T+m*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-i*r*u+i*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=u*o-a*l,d=a*c-u*r,g=l*r-o*c,m=e*f+i*d+s*g;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return t[0]=f*x,t[1]=(s*l-u*i)*x,t[2]=(a*i-s*o)*x,t[3]=d*x,t[4]=(u*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=g*x,t[7]=(i*c-l*e)*x,t[8]=(o*e-i*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Bo.makeScale(t,e)),this}rotate(t){return this.premultiply(Bo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Bo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};pc.prototype.isMatrix3=!0;let Yt=pc;const Bo=new Yt,Oc=new Yt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fc=new Yt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hf(){const n={enabled:!0,workingColorSpace:ho,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===he&&(s.r=ni(s.r),s.g=ni(s.g),s.b=ni(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===he&&(s.r=bs(s.r),s.g=bs(s.g),s.b=bs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===bi?fo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ml("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ml("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ho]:{primaries:t,whitePoint:i,transfer:fo,toXYZ:Oc,fromXYZ:Fc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Qe},outputColorSpaceConfig:{drawingBufferColorSpace:Qe}},[Qe]:{primaries:t,whitePoint:i,transfer:he,toXYZ:Oc,fromXYZ:Fc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Qe}}}),n}const se=Hf();function ni(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function bs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ts;class Vf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ts===void 0&&(ts=po("canvas")),ts.width=t.width,ts.height=t.height;const s=ts.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=ts}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=po("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ni(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ni(e[i]/255)*255):e[i]=ni(e[i]);return{data:e,width:t.width,height:t.height}}else return Wt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Wf=0;class Bl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=Ls(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ko(s[o].image)):r.push(ko(s[o]))}else r=ko(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function ko(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Vf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Wt("Texture: Unable to serialize Texture."),{})}let Xf=0;const Go=new U;class nn extends Ri{constructor(t=nn.DEFAULT_IMAGE,e=nn.DEFAULT_MAPPING,i=ti,s=ti,r=tn,o=zi,a=Pn,c=gn,l=nn.DEFAULT_ANISOTROPY,u=bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xf++}),this.uuid=Ls(),this.name="",this.source=new Bl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Gt(0,0),this.repeat=new Gt(1,1),this.center=new Gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Go).x}get height(){return this.source.getSize(Go).y}get depth(){return this.source.getSize(Go).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Wt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Wt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Td)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case nr:t.x=t.x-Math.floor(t.x);break;case ti:t.x=t.x<0?0:1;break;case za:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case nr:t.y=t.y-Math.floor(t.y);break;case ti:t.y=t.y<0?0:1;break;case za:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}nn.DEFAULT_IMAGE=null;nn.DEFAULT_MAPPING=Td;nn.DEFAULT_ANISOTROPY=1;const mc=class mc{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],u=c[4],f=c[8],d=c[1],g=c[5],m=c[9],x=c[2],_=c[6],h=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-x)<.01&&Math.abs(m-_)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+x)<.1&&Math.abs(m+_)<.1&&Math.abs(l+g+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,T=(g+1)/2,L=(h+1)/2,C=(u+d)/4,w=(f+x)/4,p=(m+_)/4;return y>T&&y>L?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=C/i,r=w/i):T>L?T<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),i=C/s,r=p/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=w/r,s=p/r),this.set(i,s,r,e),this}let v=Math.sqrt((_-m)*(_-m)+(f-x)*(f-x)+(d-u)*(d-u));return Math.abs(v)<.001&&(v=1),this.x=(_-m)/v,this.y=(f-x)/v,this.z=(d-u)/v,this.w=Math.acos((l+g+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this.w=ne(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this.w=ne(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};mc.prototype.isVector4=!0;let Ue=mc;class $f extends Ri{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ue(0,0,t,e),this.scissorTest=!1,this.viewport=new Ue(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new nn(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:tn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Bl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Hn extends $f{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Id extends nn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class qf extends nn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const So=class So{constructor(t,e,i,s,r,o,a,c,l,u,f,d,g,m,x,_){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,u,f,d,g,m,x,_)}set(t,e,i,s,r,o,a,c,l,u,f,d,g,m,x,_){const h=this.elements;return h[0]=t,h[4]=e,h[8]=i,h[12]=s,h[1]=r,h[5]=o,h[9]=a,h[13]=c,h[2]=l,h[6]=u,h[10]=f,h[14]=d,h[3]=g,h[7]=m,h[11]=x,h[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new So().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,i=t.elements,s=1/es.setFromMatrixColumn(t,0).length(),r=1/es.setFromMatrixColumn(t,1).length(),o=1/es.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const d=o*u,g=o*f,m=a*u,x=a*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=g+m*l,e[5]=d-x*l,e[9]=-a*c,e[2]=x-d*l,e[6]=m+g*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*u,g=c*f,m=l*u,x=l*f;e[0]=d+x*a,e[4]=m*a-g,e[8]=o*l,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=g*a-m,e[6]=x+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*u,g=c*f,m=l*u,x=l*f;e[0]=d-x*a,e[4]=-o*f,e[8]=m+g*a,e[1]=g+m*a,e[5]=o*u,e[9]=x-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*u,g=o*f,m=a*u,x=a*f;e[0]=c*u,e[4]=m*l-g,e[8]=d*l+x,e[1]=c*f,e[5]=x*l+d,e[9]=g*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,g=o*l,m=a*c,x=a*l;e[0]=c*u,e[4]=x-d*f,e[8]=m*f+g,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=g*f+m,e[10]=d-x*f}else if(t.order==="XZY"){const d=o*c,g=o*l,m=a*c,x=a*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=d*f+x,e[5]=o*u,e[9]=g*f-m,e[2]=m*f-g,e[6]=a*u,e[10]=x*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Yf,t,jf)}lookAt(t,e,i){const s=this.elements;return fn.subVectors(t,e),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),fi.crossVectors(i,fn),fi.lengthSq()===0&&(Math.abs(i.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),fi.crossVectors(i,fn)),fi.normalize(),xr.crossVectors(fn,fi),s[0]=fi.x,s[4]=xr.x,s[8]=fn.x,s[1]=fi.y,s[5]=xr.y,s[9]=fn.y,s[2]=fi.z,s[6]=xr.z,s[10]=fn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],f=i[5],d=i[9],g=i[13],m=i[2],x=i[6],_=i[10],h=i[14],v=i[3],y=i[7],T=i[11],L=i[15],C=s[0],w=s[4],p=s[8],M=s[12],E=s[1],R=s[5],P=s[9],D=s[13],G=s[2],N=s[6],k=s[10],B=s[14],Z=s[3],rt=s[7],mt=s[11],At=s[15];return r[0]=o*C+a*E+c*G+l*Z,r[4]=o*w+a*R+c*N+l*rt,r[8]=o*p+a*P+c*k+l*mt,r[12]=o*M+a*D+c*B+l*At,r[1]=u*C+f*E+d*G+g*Z,r[5]=u*w+f*R+d*N+g*rt,r[9]=u*p+f*P+d*k+g*mt,r[13]=u*M+f*D+d*B+g*At,r[2]=m*C+x*E+_*G+h*Z,r[6]=m*w+x*R+_*N+h*rt,r[10]=m*p+x*P+_*k+h*mt,r[14]=m*M+x*D+_*B+h*At,r[3]=v*C+y*E+T*G+L*Z,r[7]=v*w+y*R+T*N+L*rt,r[11]=v*p+y*P+T*k+L*mt,r[15]=v*M+y*D+T*B+L*At,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],f=t[6],d=t[10],g=t[14],m=t[3],x=t[7],_=t[11],h=t[15],v=c*g-l*d,y=a*g-l*f,T=a*d-c*f,L=o*g-l*u,C=o*d-c*u,w=o*f-a*u;return e*(x*v-_*y+h*T)-i*(m*v-_*L+h*C)+s*(m*y-x*L+h*w)-r*(m*T-x*C+_*w)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=t[9],d=t[10],g=t[11],m=t[12],x=t[13],_=t[14],h=t[15],v=e*a-i*o,y=e*c-s*o,T=e*l-r*o,L=i*c-s*a,C=i*l-r*a,w=s*l-r*c,p=u*x-f*m,M=u*_-d*m,E=u*h-g*m,R=f*_-d*x,P=f*h-g*x,D=d*h-g*_,G=v*D-y*P+T*R+L*E-C*M+w*p;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/G;return t[0]=(a*D-c*P+l*R)*N,t[1]=(s*P-i*D-r*R)*N,t[2]=(x*w-_*C+h*L)*N,t[3]=(d*C-f*w-g*L)*N,t[4]=(c*E-o*D-l*M)*N,t[5]=(e*D-s*E+r*M)*N,t[6]=(_*T-m*w-h*y)*N,t[7]=(u*w-d*T+g*y)*N,t[8]=(o*P-a*E+l*p)*N,t[9]=(i*E-e*P-r*p)*N,t[10]=(m*C-x*T+h*v)*N,t[11]=(f*T-u*C-g*v)*N,t[12]=(a*M-o*R-c*p)*N,t[13]=(e*R-i*M+s*p)*N,t[14]=(x*y-m*L-_*v)*N,t[15]=(u*L-f*y+d*v)*N,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+i,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,f=a+a,d=r*l,g=r*u,m=r*f,x=o*u,_=o*f,h=a*f,v=c*l,y=c*u,T=c*f,L=i.x,C=i.y,w=i.z;return s[0]=(1-(x+h))*L,s[1]=(g+T)*L,s[2]=(m-y)*L,s[3]=0,s[4]=(g-T)*C,s[5]=(1-(d+h))*C,s[6]=(_+v)*C,s[7]=0,s[8]=(m+y)*w,s[9]=(_-v)*w,s[10]=(1-(d+x))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),e.identity(),this;let o=es.set(s[0],s[1],s[2]).length();const a=es.set(s[4],s[5],s[6]).length(),c=es.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Tn.copy(this);const l=1/o,u=1/a,f=1/c;return Tn.elements[0]*=l,Tn.elements[1]*=l,Tn.elements[2]*=l,Tn.elements[4]*=u,Tn.elements[5]*=u,Tn.elements[6]*=u,Tn.elements[8]*=f,Tn.elements[9]*=f,Tn.elements[10]*=f,e.setFromRotationMatrix(Tn),i.x=o,i.y=a,i.z=c,this}makePerspective(t,e,i,s,r,o,a=kn,c=!1){const l=this.elements,u=2*r/(e-t),f=2*r/(i-s),d=(e+t)/(e-t),g=(i+s)/(i-s);let m,x;if(c)m=r/(o-r),x=o*r/(o-r);else if(a===kn)m=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===rr)m=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=kn,c=!1){const l=this.elements,u=2/(e-t),f=2/(i-s),d=-(e+t)/(e-t),g=-(i+s)/(i-s);let m,x;if(c)m=1/(o-r),x=o/(o-r);else if(a===kn)m=-2/(o-r),x=-(o+r)/(o-r);else if(a===rr)m=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=f,l[9]=0,l[13]=g,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};So.prototype.isMatrix4=!0;let me=So;const es=new U,Tn=new me,Yf=new U(0,0,0),jf=new U(1,1,1),fi=new U,xr=new U,fn=new U,zc=new me,Bc=new ai;class Wn{constructor(t=0,e=0,i=0,s=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],f=s[2],d=s[6],g=s[10];switch(e){case"XYZ":this._y=Math.asin(ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ne(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,g),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ne(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ne(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ne(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,g));break;case"XZY":this._z=Math.asin(-ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,g),this._y=0);break;default:Wt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return zc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(zc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Bc.setFromEuler(this),this.setFromQuaternion(Bc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class kl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Kf=0;const kc=new U,ns=new ai,qn=new me,vr=new U,Fs=new U,Zf=new U,Jf=new ai,Gc=new U(1,0,0),Hc=new U(0,1,0),Vc=new U(0,0,1),Wc={type:"added"},Qf={type:"removed"},is={type:"childadded",child:null},Ho={type:"childremoved",child:null};class Pe extends Ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Ls(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pe.DEFAULT_UP.clone();const t=new U,e=new Wn,i=new ai,s=new U(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new me},normalMatrix:{value:new Yt}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=Pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ns.setFromAxisAngle(t,e),this.quaternion.multiply(ns),this}rotateOnWorldAxis(t,e){return ns.setFromAxisAngle(t,e),this.quaternion.premultiply(ns),this}rotateX(t){return this.rotateOnAxis(Gc,t)}rotateY(t){return this.rotateOnAxis(Hc,t)}rotateZ(t){return this.rotateOnAxis(Vc,t)}translateOnAxis(t,e){return kc.copy(t).applyQuaternion(this.quaternion),this.position.add(kc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Gc,t)}translateY(t){return this.translateOnAxis(Hc,t)}translateZ(t){return this.translateOnAxis(Vc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?vr.copy(t):vr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Fs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(Fs,vr,this.up):qn.lookAt(vr,Fs,this.up),this.quaternion.setFromRotationMatrix(qn),s&&(qn.extractRotation(s.matrixWorld),ns.setFromRotationMatrix(qn),this.quaternion.premultiply(ns.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(oe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Wc),is.child=t,this.dispatchEvent(is),is.child=null):oe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Qf),Ho.child=t,this.dispatchEvent(Ho),Ho.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),qn.multiply(t.parent.matrixWorld)),t.applyMatrix4(qn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Wc),is.child=t,this.dispatchEvent(is),is.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fs,t,Zf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fs,Jf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),f=o(t.shapes),d=o(t.skeletons),g=o(t.animations),m=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),g.length>0&&(i.animations=g),m.length>0&&(i.nodes=m)}return i.object=s,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Pe.DEFAULT_UP=new U(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class te extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tp={type:"move"};class Vo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new te,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new te,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new te,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const x of t.hand.values()){const _=e.getJointPose(x,i),h=this._getHandJoint(l,x);_!==null&&(h.matrix.fromArray(_.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=_.radius),h.visible=_!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),g=.02,m=.005;l.inputState.pinching&&d>g+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=g-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(tp)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new te;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Nd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pi={h:0,s:0,l:0},Mr={h:0,s:0,l:0};function Wo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Ht{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=i,se.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=se.workingColorSpace){if(t=zl(t,1),e=ne(e,0,1),i=ne(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Wo(o,r,t+1/3),this.g=Wo(o,r,t),this.b=Wo(o,r,t-1/3)}return se.colorSpaceToWorking(this,s),this}setStyle(t,e=Qe){function i(r){r!==void 0&&parseFloat(r)<1&&Wt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Wt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Wt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qe){const i=Nd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Wt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ni(t.r),this.g=ni(t.g),this.b=ni(t.b),this}copyLinearToSRGB(t){return this.r=bs(t.r),this.g=bs(t.g),this.b=bs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qe){return se.workingToColorSpace(Je.copy(this),t),Math.round(ne(Je.r*255,0,255))*65536+Math.round(ne(Je.g*255,0,255))*256+Math.round(ne(Je.b*255,0,255))}getHexString(t=Qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.workingToColorSpace(Je.copy(this),e);const i=Je.r,s=Je.g,r=Je.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=se.workingColorSpace){return se.workingToColorSpace(Je.copy(this),e),t.r=Je.r,t.g=Je.g,t.b=Je.b,t}getStyle(t=Qe){se.workingToColorSpace(Je.copy(this),t);const e=Je.r,i=Je.g,s=Je.b;return t!==Qe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(pi),this.setHSL(pi.h+t,pi.s+e,pi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(pi),t.getHSL(Mr);const i=Js(pi.h,Mr.h,e),s=Js(pi.s,Mr.s,e),r=Js(pi.l,Mr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Je=new Ht;Ht.NAMES=Nd;class To{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ht(t),this.near=e,this.far=i}clone(){return new To(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Gl extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const wn=new U,Yn=new U,Xo=new U,jn=new U,ss=new U,rs=new U,Xc=new U,$o=new U,qo=new U,Yo=new U,jo=new Ue,Ko=new Ue,Zo=new Ue;class Rn{constructor(t=new U,e=new U,i=new U){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),wn.subVectors(t,e),s.cross(wn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){wn.subVectors(s,e),Yn.subVectors(i,e),Xo.subVectors(t,e);const o=wn.dot(wn),a=wn.dot(Yn),c=wn.dot(Xo),l=Yn.dot(Yn),u=Yn.dot(Xo),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;const d=1/f,g=(l*c-a*u)*d,m=(o*u-a*c)*d;return r.set(1-g-m,m,g)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,jn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,jn.x),c.addScaledVector(o,jn.y),c.addScaledVector(a,jn.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return jo.setScalar(0),Ko.setScalar(0),Zo.setScalar(0),jo.fromBufferAttribute(t,e),Ko.fromBufferAttribute(t,i),Zo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(jo,r.x),o.addScaledVector(Ko,r.y),o.addScaledVector(Zo,r.z),o}static isFrontFacing(t,e,i,s){return wn.subVectors(i,e),Yn.subVectors(t,e),wn.cross(Yn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return wn.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),wn.cross(Yn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Rn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Rn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Rn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Rn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Rn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;ss.subVectors(s,i),rs.subVectors(r,i),$o.subVectors(t,i);const c=ss.dot($o),l=rs.dot($o);if(c<=0&&l<=0)return e.copy(i);qo.subVectors(t,s);const u=ss.dot(qo),f=rs.dot(qo);if(u>=0&&f<=u)return e.copy(s);const d=c*f-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(i).addScaledVector(ss,o);Yo.subVectors(t,r);const g=ss.dot(Yo),m=rs.dot(Yo);if(m>=0&&g<=m)return e.copy(r);const x=g*l-c*m;if(x<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(i).addScaledVector(rs,a);const _=u*m-g*f;if(_<=0&&f-u>=0&&g-m>=0)return Xc.subVectors(r,s),a=(f-u)/(f-u+(g-m)),e.copy(s).addScaledVector(Xc,a);const h=1/(_+x+d);return o=x*h,a=d*h,e.copy(i).addScaledVector(ss,o).addScaledVector(rs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class yn{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(An.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(An.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=An.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,An):An.fromBufferAttribute(r,o),An.applyMatrix4(t.matrixWorld),this.expandByPoint(An);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),br.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),br.copy(i.boundingBox)),br.applyMatrix4(t.matrixWorld),this.union(br)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,An),An.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(zs),Sr.subVectors(this.max,zs),os.subVectors(t.a,zs),as.subVectors(t.b,zs),ls.subVectors(t.c,zs),mi.subVectors(as,os),gi.subVectors(ls,as),Pi.subVectors(os,ls);let e=[0,-mi.z,mi.y,0,-gi.z,gi.y,0,-Pi.z,Pi.y,mi.z,0,-mi.x,gi.z,0,-gi.x,Pi.z,0,-Pi.x,-mi.y,mi.x,0,-gi.y,gi.x,0,-Pi.y,Pi.x,0];return!Jo(e,os,as,ls,Sr)||(e=[1,0,0,0,1,0,0,0,1],!Jo(e,os,as,ls,Sr))?!1:(yr.crossVectors(mi,gi),e=[yr.x,yr.y,yr.z],Jo(e,os,as,ls,Sr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,An).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(An).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Kn=[new U,new U,new U,new U,new U,new U,new U,new U],An=new U,br=new yn,os=new U,as=new U,ls=new U,mi=new U,gi=new U,Pi=new U,zs=new U,Sr=new U,yr=new U,Li=new U;function Jo(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Li.fromArray(n,r);const a=s.x*Math.abs(Li.x)+s.y*Math.abs(Li.y)+s.z*Math.abs(Li.z),c=t.dot(Li),l=e.dot(Li),u=i.dot(Li);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const ze=new U,Er=new Gt;let ep=0;class _n extends Ri{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ep++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Pc,this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Er.fromBufferAttribute(this,e),Er.applyMatrix3(t),this.setXY(e,Er.x,Er.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix3(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=gs(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=rn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gs(e,this.array)),e}setX(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gs(e,this.array)),e}setY(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gs(e,this.array)),e}setW(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),i=rn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),i=rn(i,this.array),s=rn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),i=rn(i,this.array),s=rn(s,this.array),r=rn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Pc&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class Ud extends _n{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Od extends _n{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class we extends _n{constructor(t,e,i){super(new Float32Array(t),e,i)}}const np=new yn,Bs=new U,Qo=new U;class Ds{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):np.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Bs.subVectors(t,this.center);const e=Bs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Bs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Qo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Bs.copy(t.center).add(Qo)),this.expandByPoint(Bs.copy(t.center).sub(Qo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let ip=0;const Sn=new me,ta=new Pe,cs=new U,pn=new yn,ks=new yn,We=new U;class sn extends Ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ip++}),this.uuid=Ls(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Sf(t)?Od:Ud)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Yt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Sn.makeRotationFromQuaternion(t),this.applyMatrix4(Sn),this}rotateX(t){return Sn.makeRotationX(t),this.applyMatrix4(Sn),this}rotateY(t){return Sn.makeRotationY(t),this.applyMatrix4(Sn),this}rotateZ(t){return Sn.makeRotationZ(t),this.applyMatrix4(Sn),this}translate(t,e,i){return Sn.makeTranslation(t,e,i),this.applyMatrix4(Sn),this}scale(t,e,i){return Sn.makeScale(t,e,i),this.applyMatrix4(Sn),this}lookAt(t){return ta.lookAt(t),ta.updateMatrix(),this.applyMatrix4(ta.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new we(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Wt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){oe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];pn.setFromBufferAttribute(r),this.morphTargetsRelative?(We.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(We),We.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(We)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&oe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ds);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){oe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const i=this.boundingSphere.center;if(pn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];ks.setFromBufferAttribute(a),this.morphTargetsRelative?(We.addVectors(pn.min,ks.min),pn.expandByPoint(We),We.addVectors(pn.max,ks.max),pn.expandByPoint(We)):(pn.expandByPoint(ks.min),pn.expandByPoint(ks.max))}pn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)We.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(We));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)We.fromBufferAttribute(a,l),c&&(cs.fromBufferAttribute(t,l),We.add(cs)),s=Math.max(s,i.distanceToSquared(We))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&oe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){oe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new _n(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let p=0;p<i.count;p++)a[p]=new U,c[p]=new U;const l=new U,u=new U,f=new U,d=new Gt,g=new Gt,m=new Gt,x=new U,_=new U;function h(p,M,E){l.fromBufferAttribute(i,p),u.fromBufferAttribute(i,M),f.fromBufferAttribute(i,E),d.fromBufferAttribute(r,p),g.fromBufferAttribute(r,M),m.fromBufferAttribute(r,E),u.sub(l),f.sub(l),g.sub(d),m.sub(d);const R=1/(g.x*m.y-m.x*g.y);isFinite(R)&&(x.copy(u).multiplyScalar(m.y).addScaledVector(f,-g.y).multiplyScalar(R),_.copy(f).multiplyScalar(g.x).addScaledVector(u,-m.x).multiplyScalar(R),a[p].add(x),a[M].add(x),a[E].add(x),c[p].add(_),c[M].add(_),c[E].add(_))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let p=0,M=v.length;p<M;++p){const E=v[p],R=E.start,P=E.count;for(let D=R,G=R+P;D<G;D+=3)h(t.getX(D+0),t.getX(D+1),t.getX(D+2))}const y=new U,T=new U,L=new U,C=new U;function w(p){L.fromBufferAttribute(s,p),C.copy(L);const M=a[p];y.copy(M),y.sub(L.multiplyScalar(L.dot(M))).normalize(),T.crossVectors(C,M);const R=T.dot(c[p])<0?-1:1;o.setXYZW(p,y.x,y.y,y.z,R)}for(let p=0,M=v.length;p<M;++p){const E=v[p],R=E.start,P=E.count;for(let D=R,G=R+P;D<G;D+=3)w(t.getX(D+0)),w(t.getX(D+1)),w(t.getX(D+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new _n(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,g=i.count;d<g;d++)i.setXYZ(d,0,0,0);const s=new U,r=new U,o=new U,a=new U,c=new U,l=new U,u=new U,f=new U;if(t)for(let d=0,g=t.count;d<g;d+=3){const m=t.getX(d+0),x=t.getX(d+1),_=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,_),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(i,m),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,_),a.add(u),c.add(u),l.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(_,l.x,l.y,l.z)}else for(let d=0,g=e.count;d<g;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)We.fromBufferAttribute(t,e),We.normalize(),t.setXYZ(e,We.x,We.y,We.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,f=a.normalized,d=new l.constructor(c.length*u);let g=0,m=0;for(let x=0,_=c.length;x<_;x++){a.isInterleavedBufferAttribute?g=c[x]*a.data.stride+a.offset:g=c[x]*u;for(let h=0;h<u;h++)d[m++]=l[g++]}return new _n(d,u,f)}if(this.index===null)return Wt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new sn,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,i);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,f=l.length;u<f;u++){const d=l[u],g=t(d,i);c.push(g)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,d=l.length;f<d;f++){const g=l[f];u.push(g.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],f=r[l];for(let d=0,g=f.length;d<g;d++)u.push(f[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let sp=0;class Yi extends Ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sp++}),this.uuid=Ls(),this.name="",this.type="Material",this.blending=Ms,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ca,this.blendDst=Pa,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=Ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qi,this.stencilZFail=Qi,this.stencilZPass=Qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Wt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Wt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ms&&(i.blending=this.blending),this.side!==wi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ca&&(i.blendSrc=this.blendSrc),this.blendDst!==Pa&&(i.blendDst=this.blendDst),this.blendEquation!==Oi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ss&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Cc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Qi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Qi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Zn=new U,ea=new U,Tr=new U,_i=new U,na=new U,wr=new U,ia=new U;class wo{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Zn.copy(this.origin).addScaledVector(this.direction,e),Zn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){ea.copy(t).add(e).multiplyScalar(.5),Tr.copy(e).sub(t).normalize(),_i.copy(this.origin).sub(ea);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Tr),a=_i.dot(this.direction),c=-_i.dot(Tr),l=_i.lengthSq(),u=Math.abs(1-o*o);let f,d,g,m;if(u>0)if(f=o*c-a,d=o*a-c,m=r*u,f>=0)if(d>=-m)if(d<=m){const x=1/u;f*=x,d*=x,g=f*(f+o*d+2*a)+d*(o*f+d+2*c)+l}else d=r,f=Math.max(0,-(o*d+a)),g=-f*f+d*(d+2*c)+l;else d=-r,f=Math.max(0,-(o*d+a)),g=-f*f+d*(d+2*c)+l;else d<=-m?(f=Math.max(0,-(-o*r+a)),d=f>0?-r:Math.min(Math.max(-r,-c),r),g=-f*f+d*(d+2*c)+l):d<=m?(f=0,d=Math.min(Math.max(-r,-c),r),g=d*(d+2*c)+l):(f=Math.max(0,-(o*r+a)),d=f>0?r:Math.min(Math.max(-r,-c),r),g=-f*f+d*(d+2*c)+l);else d=o>0?-r:r,f=Math.max(0,-(o*d+a)),g=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ea).addScaledVector(Tr,d),g}intersectSphere(t,e){Zn.subVectors(t.center,this.origin);const i=Zn.dot(this.direction),s=Zn.dot(Zn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),u>=0?(r=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-d.z)*f,c=(t.max.z-d.z)*f):(a=(t.max.z-d.z)*f,c=(t.min.z-d.z)*f),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Zn)!==null}intersectTriangle(t,e,i,s,r){na.subVectors(e,t),wr.subVectors(i,t),ia.crossVectors(na,wr);let o=this.direction.dot(ia),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;_i.subVectors(this.origin,t);const c=a*this.direction.dot(wr.crossVectors(_i,wr));if(c<0)return null;const l=a*this.direction.dot(na.cross(_i));if(l<0||c+l>o)return null;const u=-a*_i.dot(ia);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xi extends Yi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=Rl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const $c=new me,Di=new wo,Ar=new Ds,qc=new U,Rr=new U,Cr=new U,Pr=new U,sa=new U,Lr=new U,Yc=new U,Dr=new U;class $t extends Pe{constructor(t=new sn,e=new Xi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Lr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],f=r[c];u!==0&&(sa.fromBufferAttribute(f,t),o?Lr.addScaledVector(sa,u):Lr.addScaledVector(sa.sub(e),u))}e.add(Lr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ar.copy(i.boundingSphere),Ar.applyMatrix4(r),Di.copy(t.ray).recast(t.near),!(Ar.containsPoint(Di.origin)===!1&&(Di.intersectSphere(Ar,qc)===null||Di.origin.distanceToSquared(qc)>(t.far-t.near)**2))&&($c.copy(r).invert(),Di.copy(t.ray).applyMatrix4($c),!(i.boundingBox!==null&&Di.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Di)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,d=r.groups,g=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=d.length;m<x;m++){const _=d[m],h=o[_.materialIndex],v=Math.max(_.start,g.start),y=Math.min(a.count,Math.min(_.start+_.count,g.start+g.count));for(let T=v,L=y;T<L;T+=3){const C=a.getX(T),w=a.getX(T+1),p=a.getX(T+2);s=Ir(this,h,t,i,l,u,f,C,w,p),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=_.materialIndex,e.push(s))}}else{const m=Math.max(0,g.start),x=Math.min(a.count,g.start+g.count);for(let _=m,h=x;_<h;_+=3){const v=a.getX(_),y=a.getX(_+1),T=a.getX(_+2);s=Ir(this,o,t,i,l,u,f,v,y,T),s&&(s.faceIndex=Math.floor(_/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,x=d.length;m<x;m++){const _=d[m],h=o[_.materialIndex],v=Math.max(_.start,g.start),y=Math.min(c.count,Math.min(_.start+_.count,g.start+g.count));for(let T=v,L=y;T<L;T+=3){const C=T,w=T+1,p=T+2;s=Ir(this,h,t,i,l,u,f,C,w,p),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=_.materialIndex,e.push(s))}}else{const m=Math.max(0,g.start),x=Math.min(c.count,g.start+g.count);for(let _=m,h=x;_<h;_+=3){const v=_,y=_+1,T=_+2;s=Ir(this,o,t,i,l,u,f,v,y,T),s&&(s.faceIndex=Math.floor(_/3),e.push(s))}}}}function rp(n,t,e,i,s,r,o,a){let c;if(t.side===ln?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===wi,a),c===null)return null;Dr.copy(a),Dr.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Dr);return l<e.near||l>e.far?null:{distance:l,point:Dr.clone(),object:n}}function Ir(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,Rr),n.getVertexPosition(c,Cr),n.getVertexPosition(l,Pr);const u=rp(n,t,e,i,Rr,Cr,Pr,Yc);if(u){const f=new U;Rn.getBarycoord(Yc,Rr,Cr,Pr,f),s&&(u.uv=Rn.getInterpolatedAttribute(s,a,c,l,f,new Gt)),r&&(u.uv1=Rn.getInterpolatedAttribute(r,a,c,l,f,new Gt)),o&&(u.normal=Rn.getInterpolatedAttribute(o,a,c,l,f,new U),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new U,materialIndex:0};Rn.getNormal(Rr,Cr,Pr,d.normal),u.face=d,u.barycoord=f}return u}class Fd extends nn{constructor(t=null,e=1,i=1,s,r,o,a,c,l=Ye,u=Ye,f,d){super(null,o,a,c,l,u,s,r,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jc extends _n{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const us=new me,Kc=new me,Nr=[],Zc=new yn,op=new me,Gs=new $t,Hs=new Ds;class Hl extends $t{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new jc(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,op)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new yn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,us),Zc.copy(t.boundingBox).applyMatrix4(us),this.boundingBox.union(Zc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ds),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,us),Hs.copy(t.boundingSphere).applyMatrix4(us),this.boundingSphere.union(Hs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=t.previousInstanceMatrix.clone()),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(Gs.geometry=this.geometry,Gs.material=this.material,Gs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Hs.copy(this.boundingSphere),Hs.applyMatrix4(i),t.ray.intersectsSphere(Hs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,us),Kc.multiplyMatrices(i,us),Gs.matrixWorld=Kc,Gs.raycast(t,Nr);for(let o=0,a=Nr.length;o<a;o++){const c=Nr[o];c.instanceId=r,c.object=this,e.push(c)}Nr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new jc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Fd(new Float32Array(s*this.count),s,this.count,Dl,Cn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(i,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ra=new U,ap=new U,lp=new Yt;class Jn{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=ra.subVectors(i,e).cross(ap.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(ra),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||lp.getNormalMatrix(t),s=this.coplanarPoint(ra).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ii=new Ds,cp=new Gt(.5,.5),Ur=new U;class Vl{constructor(t=new Jn,e=new Jn,i=new Jn,s=new Jn,r=new Jn,o=new Jn){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=kn,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],f=r[5],d=r[6],g=r[7],m=r[8],x=r[9],_=r[10],h=r[11],v=r[12],y=r[13],T=r[14],L=r[15];if(s[0].setComponents(l-o,g-u,h-m,L-v).normalize(),s[1].setComponents(l+o,g+u,h+m,L+v).normalize(),s[2].setComponents(l+a,g+f,h+x,L+y).normalize(),s[3].setComponents(l-a,g-f,h-x,L-y).normalize(),i)s[4].setComponents(c,d,_,T).normalize(),s[5].setComponents(l-c,g-d,h-_,L-T).normalize();else if(s[4].setComponents(l-c,g-d,h-_,L-T).normalize(),e===kn)s[5].setComponents(l+c,g+d,h+_,L+T).normalize();else if(e===rr)s[5].setComponents(c,d,_,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ii.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ii.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ii)}intersectsSprite(t){Ii.center.set(0,0,0);const e=cp.distanceTo(t.center);return Ii.radius=.7071067811865476+e,Ii.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ii)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Ur.x=s.normal.x>0?t.max.x:t.min.x,Ur.y=s.normal.y>0?t.max.y:t.min.y,Ur.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ur)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class zd extends Yi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const mo=new U,go=new U,Jc=new me,Vs=new wo,Or=new Ds,oa=new U,Qc=new U;class up extends Pe{constructor(t=new sn,e=new zd){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)mo.fromBufferAttribute(e,s-1),go.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=mo.distanceTo(go);t.setAttribute("lineDistance",new we(i,1))}else Wt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Or.copy(i.boundingSphere),Or.applyMatrix4(s),Or.radius+=r,t.ray.intersectsSphere(Or)===!1)return;Jc.copy(s).invert(),Vs.copy(t.ray).applyMatrix4(Jc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){const g=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let x=g,_=m-1;x<_;x+=l){const h=u.getX(x),v=u.getX(x+1),y=Fr(this,t,Vs,c,h,v,x);y&&e.push(y)}if(this.isLineLoop){const x=u.getX(m-1),_=u.getX(g),h=Fr(this,t,Vs,c,x,_,m-1);h&&e.push(h)}}else{const g=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let x=g,_=m-1;x<_;x+=l){const h=Fr(this,t,Vs,c,x,x+1,x);h&&e.push(h)}if(this.isLineLoop){const x=Fr(this,t,Vs,c,m-1,g,m-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Fr(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(mo.fromBufferAttribute(a,s),go.fromBufferAttribute(a,r),e.distanceSqToSegment(mo,go,oa,Qc)>i)return;oa.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(oa);if(!(l<t.near||l>t.far))return{distance:l,point:Qc.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const tu=new U,eu=new U;class dp extends up{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)tu.fromBufferAttribute(e,s),eu.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+tu.distanceTo(eu);t.setAttribute("lineDistance",new we(i,1))}else Wt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Bd extends nn{constructor(t=[],e=Vi,i,s,r,o,a,c,l,u){super(t,e,i,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class kd extends nn{constructor(t,e,i,s,r,o,a,c,l){super(t,e,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Es extends nn{constructor(t,e,i=Vn,s,r,o,a=Ye,c=Ye,l,u=oi,f=1){if(u!==oi&&u!==Bi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:f};super(d,s,r,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Bl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class hp extends Es{constructor(t,e=Vn,i=Vi,s,r,o=Ye,a=Ye,c,l=oi){const u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,i,s,r,o,a,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Gd extends nn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class fe extends sn{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],f=[];let d=0,g=0;m("z","y","x",-1,-1,i,e,t,o,r,0),m("z","y","x",1,-1,i,e,-t,o,r,1),m("x","z","y",1,1,t,i,e,s,o,2),m("x","z","y",1,-1,t,i,-e,s,o,3),m("x","y","z",1,-1,t,e,i,s,r,4),m("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new we(l,3)),this.setAttribute("normal",new we(u,3)),this.setAttribute("uv",new we(f,2));function m(x,_,h,v,y,T,L,C,w,p,M){const E=T/w,R=L/p,P=T/2,D=L/2,G=C/2,N=w+1,k=p+1;let B=0,Z=0;const rt=new U;for(let mt=0;mt<k;mt++){const At=mt*R-D;for(let It=0;It<N;It++){const ct=It*E-P;rt[x]=ct*v,rt[_]=At*y,rt[h]=G,l.push(rt.x,rt.y,rt.z),rt[x]=0,rt[_]=0,rt[h]=C>0?1:-1,u.push(rt.x,rt.y,rt.z),f.push(It/w),f.push(1-mt/p),B+=1}}for(let mt=0;mt<p;mt++)for(let At=0;At<w;At++){const It=d+At+N*mt,ct=d+At+N*(mt+1),vt=d+(At+1)+N*(mt+1),Mt=d+(At+1)+N*mt;c.push(It,ct,Mt),c.push(ct,vt,Mt),Z+=6}a.addGroup(g,Z,M),g+=Z,d+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Wl extends sn{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new U,u=new Gt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,d=3;f<=e;f++,d+=3){const g=i+f/e*s;l.x=t*Math.cos(g),l.y=t*Math.sin(g),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[d]/t+1)/2,u.y=(o[d+1]/t+1)/2,c.push(u.x,u.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new we(o,3)),this.setAttribute("normal",new we(a,3)),this.setAttribute("uv",new we(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class lr extends sn{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],d=[],g=[];let m=0;const x=[],_=i/2;let h=0;v(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new we(f,3)),this.setAttribute("normal",new we(d,3)),this.setAttribute("uv",new we(g,2));function v(){const T=new U,L=new U;let C=0;const w=(e-t)/i;for(let p=0;p<=r;p++){const M=[],E=p/r,R=E*(e-t)+t;for(let P=0;P<=s;P++){const D=P/s,G=D*c+a,N=Math.sin(G),k=Math.cos(G);L.x=R*N,L.y=-E*i+_,L.z=R*k,f.push(L.x,L.y,L.z),T.set(N,w,k).normalize(),d.push(T.x,T.y,T.z),g.push(D,1-E),M.push(m++)}x.push(M)}for(let p=0;p<s;p++)for(let M=0;M<r;M++){const E=x[M][p],R=x[M+1][p],P=x[M+1][p+1],D=x[M][p+1];(t>0||M!==0)&&(u.push(E,R,D),C+=3),(e>0||M!==r-1)&&(u.push(R,P,D),C+=3)}l.addGroup(h,C,0),h+=C}function y(T){const L=m,C=new Gt,w=new U;let p=0;const M=T===!0?t:e,E=T===!0?1:-1;for(let P=1;P<=s;P++)f.push(0,_*E,0),d.push(0,E,0),g.push(.5,.5),m++;const R=m;for(let P=0;P<=s;P++){const G=P/s*c+a,N=Math.cos(G),k=Math.sin(G);w.x=M*k,w.y=_*E,w.z=M*N,f.push(w.x,w.y,w.z),d.push(0,E,0),C.x=N*.5+.5,C.y=k*.5*E+.5,g.push(C.x,C.y),m++}for(let P=0;P<s;P++){const D=L+P,G=R+P;T===!0?u.push(G,G+1,D):u.push(G+1,G,D),p+=3}l.addGroup(h,p,T===!0?1:2),h+=p}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lr(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Xl extends lr{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Xl(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class $l extends sn{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],o=[];a(s),l(i),u(),this.setAttribute("position",new we(r,3)),this.setAttribute("normal",new we(r.slice(),3)),this.setAttribute("uv",new we(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const y=new U,T=new U,L=new U;for(let C=0;C<e.length;C+=3)g(e[C+0],y),g(e[C+1],T),g(e[C+2],L),c(y,T,L,v)}function c(v,y,T,L){const C=L+1,w=[];for(let p=0;p<=C;p++){w[p]=[];const M=v.clone().lerp(T,p/C),E=y.clone().lerp(T,p/C),R=C-p;for(let P=0;P<=R;P++)P===0&&p===C?w[p][P]=M:w[p][P]=M.clone().lerp(E,P/R)}for(let p=0;p<C;p++)for(let M=0;M<2*(C-p)-1;M++){const E=Math.floor(M/2);M%2===0?(d(w[p][E+1]),d(w[p+1][E]),d(w[p][E])):(d(w[p][E+1]),d(w[p+1][E+1]),d(w[p+1][E]))}}function l(v){const y=new U;for(let T=0;T<r.length;T+=3)y.x=r[T+0],y.y=r[T+1],y.z=r[T+2],y.normalize().multiplyScalar(v),r[T+0]=y.x,r[T+1]=y.y,r[T+2]=y.z}function u(){const v=new U;for(let y=0;y<r.length;y+=3){v.x=r[y+0],v.y=r[y+1],v.z=r[y+2];const T=_(v)/2/Math.PI+.5,L=h(v)/Math.PI+.5;o.push(T,1-L)}m(),f()}function f(){for(let v=0;v<o.length;v+=6){const y=o[v+0],T=o[v+2],L=o[v+4],C=Math.max(y,T,L),w=Math.min(y,T,L);C>.9&&w<.1&&(y<.2&&(o[v+0]+=1),T<.2&&(o[v+2]+=1),L<.2&&(o[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function g(v,y){const T=v*3;y.x=t[T+0],y.y=t[T+1],y.z=t[T+2]}function m(){const v=new U,y=new U,T=new U,L=new U,C=new Gt,w=new Gt,p=new Gt;for(let M=0,E=0;M<r.length;M+=9,E+=6){v.set(r[M+0],r[M+1],r[M+2]),y.set(r[M+3],r[M+4],r[M+5]),T.set(r[M+6],r[M+7],r[M+8]),C.set(o[E+0],o[E+1]),w.set(o[E+2],o[E+3]),p.set(o[E+4],o[E+5]),L.copy(v).add(y).add(T).divideScalar(3);const R=_(L);x(C,E+0,v,R),x(w,E+2,y,R),x(p,E+4,T,R)}}function x(v,y,T,L){L<0&&v.x===1&&(o[y]=v.x-1),T.x===0&&T.z===0&&(o[y]=L/2/Math.PI+.5)}function _(v){return Math.atan2(v.z,-v.x)}function h(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $l(t.vertices,t.indices,t.radius,t.detail)}}class ql extends $l{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ql(t.radius,t.detail)}}class Ts extends sn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,u=c+1,f=t/a,d=e/c,g=[],m=[],x=[],_=[];for(let h=0;h<u;h++){const v=h*d-o;for(let y=0;y<l;y++){const T=y*f-r;m.push(T,-v,0),x.push(0,0,1),_.push(y/a),_.push(1-h/c)}}for(let h=0;h<c;h++)for(let v=0;v<a;v++){const y=v+l*h,T=v+l*(h+1),L=v+1+l*(h+1),C=v+1+l*h;g.push(y,T,C),g.push(T,L,C)}this.setIndex(g),this.setAttribute("position",new we(m,3)),this.setAttribute("normal",new we(x,3)),this.setAttribute("uv",new we(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ts(t.width,t.height,t.widthSegments,t.heightSegments)}}class ws extends sn{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],f=new U,d=new U,g=[],m=[],x=[],_=[];for(let h=0;h<=i;h++){const v=[],y=h/i;let T=0;h===0&&o===0?T=.5/e:h===i&&c===Math.PI&&(T=-.5/e);for(let L=0;L<=e;L++){const C=L/e;f.x=-t*Math.cos(s+C*r)*Math.sin(o+y*a),f.y=t*Math.cos(o+y*a),f.z=t*Math.sin(s+C*r)*Math.sin(o+y*a),m.push(f.x,f.y,f.z),d.copy(f).normalize(),x.push(d.x,d.y,d.z),_.push(C+T,1-y),v.push(l++)}u.push(v)}for(let h=0;h<i;h++)for(let v=0;v<e;v++){const y=u[h][v+1],T=u[h][v],L=u[h+1][v],C=u[h+1][v+1];(h!==0||o>0)&&g.push(y,T,C),(h!==i-1||c<Math.PI)&&g.push(T,L,C)}this.setIndex(g),this.setAttribute("position",new we(m,3)),this.setAttribute("normal",new we(x,3)),this.setAttribute("uv",new we(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ws(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function As(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(nu(s))s.isRenderTargetTexture?(Wt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(nu(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function on(n){const t={};for(let e=0;e<n.length;e++){const i=As(n[e]);for(const s in i)t[s]=i[s]}return t}function nu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function fp(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Hd(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}const pp={clone:As,merge:on};var mp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xn extends Yi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mp,this.fragmentShader=gp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=As(t.uniforms),this.uniformsGroups=fp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class _p extends Xn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ge extends Yi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=uo,this.normalScale=new Gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class xp extends Yi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=uo,this.normalScale=new Gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=Rl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class vp extends Yi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=pf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Mp extends Yi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Yl extends Pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ht(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Vd extends Yl{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ht(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const aa=new me,iu=new U,su=new U;class Wd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Gt(512,512),this.mapType=gn,this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vl,this._frameExtents=new Gt(1,1),this._viewportCount=1,this._viewports=[new Ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;iu.setFromMatrixPosition(t.matrixWorld),e.position.copy(iu),su.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(su),e.updateMatrixWorld(),aa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(aa,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===rr||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(aa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const zr=new U,Br=new ai,Fn=new U;class Xd extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=kn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(zr,Br,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zr,Br,Fn.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(zr,Br,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zr,Br,Fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const xi=new U,ru=new Gt,ou=new Gt;class un extends Xd{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=or*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Zs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return or*2*Math.atan(Math.tan(Zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(xi.x,xi.y).multiplyScalar(-t/xi.z),xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(xi.x,xi.y).multiplyScalar(-t/xi.z)}getViewSize(t,e){return this.getViewBounds(t,ru,ou),e.subVectors(ou,ru)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Zs*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class bp extends Wd{constructor(){super(new un(90,1,.5,500)),this.isPointLightShadow=!0}}class $d extends Yl{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new bp}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class jl extends Xd{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Sp extends Wd{constructor(){super(new jl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class qd extends Yl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.shadow=new Sp}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const ds=-90,hs=1;class yp extends Pe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new un(ds,hs,t,e);s.layers=this.layers,this.add(s);const r=new un(ds,hs,t,e);r.layers=this.layers,this.add(r);const o=new un(ds,hs,t,e);o.layers=this.layers,this.add(o);const a=new un(ds,hs,t,e);a.layers=this.layers,this.add(a);const c=new un(ds,hs,t,e);c.layers=this.layers,this.add(c);const l=new un(ds,hs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===kn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===rr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),g=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let _=!1;t.isWebGLRenderer===!0?_=t.state.buffers.depth.getReversed():_=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,d,g),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Ep extends un{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const au=new me;class Kl{constructor(t,e,i=0,s=1/0){this.ray=new wo(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new kl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):oe("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return au.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(au),this}intersectObject(t,e=!0,i=[]){return gl(t,this,i,e),i.sort(lu),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)gl(t[s],this,i,e);return i.sort(lu),i}}function lu(n,t){return n.distance-t.distance}function gl(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)gl(r[o],t,e,!0)}}class Yd{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Wt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class _o{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ne(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(ne(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const gc=class gc{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};gc.prototype.isMatrix2=!0;let cu=gc;class Tp extends Ri{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Wt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function uu(n,t,e,i){const s=wp(i);switch(e){case Pd:return n*t;case Dl:return n*t/s.components*s.byteLength;case Il:return n*t/s.components*s.byteLength;case Wi:return n*t*2/s.components*s.byteLength;case Nl:return n*t*2/s.components*s.byteLength;case Ld:return n*t*3/s.components*s.byteLength;case Pn:return n*t*4/s.components*s.byteLength;case Ul:return n*t*4/s.components*s.byteLength;case to:case eo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case no:case io:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ka:case Ha:return Math.max(n,16)*Math.max(t,8)/4;case Ba:case Ga:return Math.max(n,8)*Math.max(t,8)/2;case Va:case Wa:case $a:case qa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Xa:case lo:case Ya:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ja:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ka:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Za:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Ja:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Qa:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case tl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case el:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case nl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case il:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case sl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case rl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ol:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case al:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ll:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case cl:case ul:case dl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case hl:case fl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case co:case pl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function wp(n){switch(n){case gn:case wd:return{byteLength:1,components:1};case ir:case Ad:case ri:return{byteLength:2,components:1};case Pl:case Ll:return{byteLength:2,components:4};case Vn:case Cl:case Cn:return{byteLength:4,components:1};case Rd:case Cd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Al}}));typeof window<"u"&&(window.__THREE__?Wt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Al);function jd(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Ap(n){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,f=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,u),a.onUploadCallback();let g;if(l instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)g=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=n.SHORT;else if(l instanceof Uint32Array)g=n.UNSIGNED_INT;else if(l instanceof Int32Array)g=n.INT;else if(l instanceof Int8Array)g=n.BYTE;else if(l instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,c,l){const u=c.array,f=c.updateRanges;if(n.bindBuffer(l,a),f.length===0)n.bufferSubData(l,0,u);else{f.sort((g,m)=>g.start-m.start);let d=0;for(let g=1;g<f.length;g++){const m=f[d],x=f[g];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,f[d]=x)}f.length=d+1;for(let g=0,m=f.length;g<m;g++){const x=f[g];n.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Rp=`#ifdef USE_ALPHAHASH
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
}`,Zt={alphahash_fragment:Rp,alphahash_pars_fragment:Cp,alphamap_fragment:Pp,alphamap_pars_fragment:Lp,alphatest_fragment:Dp,alphatest_pars_fragment:Ip,aomap_fragment:Np,aomap_pars_fragment:Up,batching_pars_vertex:Op,batching_vertex:Fp,begin_vertex:zp,beginnormal_vertex:Bp,bsdfs:kp,iridescence_fragment:Gp,bumpmap_pars_fragment:Hp,clipping_planes_fragment:Vp,clipping_planes_pars_fragment:Wp,clipping_planes_pars_vertex:Xp,clipping_planes_vertex:$p,color_fragment:qp,color_pars_fragment:Yp,color_pars_vertex:jp,color_vertex:Kp,common:Zp,cube_uv_reflection_fragment:Jp,defaultnormal_vertex:Qp,displacementmap_pars_vertex:tm,displacementmap_vertex:em,emissivemap_fragment:nm,emissivemap_pars_fragment:im,colorspace_fragment:sm,colorspace_pars_fragment:rm,envmap_fragment:om,envmap_common_pars_fragment:am,envmap_pars_fragment:lm,envmap_pars_vertex:cm,envmap_physical_pars_fragment:Mm,envmap_vertex:um,fog_vertex:dm,fog_pars_vertex:hm,fog_fragment:fm,fog_pars_fragment:pm,gradientmap_pars_fragment:mm,lightmap_pars_fragment:gm,lights_lambert_fragment:_m,lights_lambert_pars_fragment:xm,lights_pars_begin:vm,lights_toon_fragment:bm,lights_toon_pars_fragment:Sm,lights_phong_fragment:ym,lights_phong_pars_fragment:Em,lights_physical_fragment:Tm,lights_physical_pars_fragment:wm,lights_fragment_begin:Am,lights_fragment_maps:Rm,lights_fragment_end:Cm,lightprobes_pars_fragment:Pm,logdepthbuf_fragment:Lm,logdepthbuf_pars_fragment:Dm,logdepthbuf_pars_vertex:Im,logdepthbuf_vertex:Nm,map_fragment:Um,map_pars_fragment:Om,map_particle_fragment:Fm,map_particle_pars_fragment:zm,metalnessmap_fragment:Bm,metalnessmap_pars_fragment:km,morphinstance_vertex:Gm,morphcolor_vertex:Hm,morphnormal_vertex:Vm,morphtarget_pars_vertex:Wm,morphtarget_vertex:Xm,normal_fragment_begin:$m,normal_fragment_maps:qm,normal_pars_fragment:Ym,normal_pars_vertex:jm,normal_vertex:Km,normalmap_pars_fragment:Zm,clearcoat_normal_fragment_begin:Jm,clearcoat_normal_fragment_maps:Qm,clearcoat_pars_fragment:t0,iridescence_pars_fragment:e0,opaque_fragment:n0,packing:i0,premultiplied_alpha_fragment:s0,project_vertex:r0,dithering_fragment:o0,dithering_pars_fragment:a0,roughnessmap_fragment:l0,roughnessmap_pars_fragment:c0,shadowmap_pars_fragment:u0,shadowmap_pars_vertex:d0,shadowmap_vertex:h0,shadowmask_pars_fragment:f0,skinbase_vertex:p0,skinning_pars_vertex:m0,skinning_vertex:g0,skinnormal_vertex:_0,specularmap_fragment:x0,specularmap_pars_fragment:v0,tonemapping_fragment:M0,tonemapping_pars_fragment:b0,transmission_fragment:S0,transmission_pars_fragment:y0,uv_pars_fragment:E0,uv_pars_vertex:T0,uv_vertex:w0,worldpos_vertex:A0,background_vert:R0,background_frag:C0,backgroundCube_vert:P0,backgroundCube_frag:L0,cube_vert:D0,cube_frag:I0,depth_vert:N0,depth_frag:U0,distance_vert:O0,distance_frag:F0,equirect_vert:z0,equirect_frag:B0,linedashed_vert:k0,linedashed_frag:G0,meshbasic_vert:H0,meshbasic_frag:V0,meshlambert_vert:W0,meshlambert_frag:X0,meshmatcap_vert:$0,meshmatcap_frag:q0,meshnormal_vert:Y0,meshnormal_frag:j0,meshphong_vert:K0,meshphong_frag:Z0,meshphysical_vert:J0,meshphysical_frag:Q0,meshtoon_vert:tg,meshtoon_frag:eg,points_vert:ng,points_frag:ig,shadow_vert:sg,shadow_frag:rg,sprite_vert:og,sprite_frag:ag},bt={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},envMapRotation:{value:new Yt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new Gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new Gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},Bn={basic:{uniforms:on([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:on([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new Ht(0)},envMapIntensity:{value:1}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:on([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:on([bt.common,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.roughnessmap,bt.metalnessmap,bt.fog,bt.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:on([bt.common,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.gradientmap,bt.fog,bt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:on([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:on([bt.points,bt.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:on([bt.common,bt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:on([bt.common,bt.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:on([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:on([bt.sprite,bt.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Yt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distance:{uniforms:on([bt.common,bt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distance_vert,fragmentShader:Zt.distance_frag},shadow:{uniforms:on([bt.lights,bt.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};Bn.physical={uniforms:on([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new Gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new Gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new Gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const kr={r:0,b:0,g:0},lg=new me,Kd=new Yt;Kd.set(-1,0,0,0,1,0,0,0,1);function cg(n,t,e,i,s,r){const o=new Ht(0);let a=s===!0?0:1,c,l,u=null,f=0,d=null;function g(v){let y=v.isScene===!0?v.background:null;if(y&&y.isTexture){const T=v.backgroundBlurriness>0;y=t.get(y,T)}return y}function m(v){let y=!1;const T=g(v);T===null?_(o,a):T&&T.isColor&&(_(T,1),y=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?e.buffers.color.setClear(0,0,0,1,r):L==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||y)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(v,y){const T=g(y);T&&(T.isCubeTexture||T.mapping===Eo)?(l===void 0&&(l=new $t(new fe(1,1,1),new Xn({name:"BackgroundCubeMaterial",uniforms:As(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(L,C,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=T,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(lg.makeRotationFromEuler(y.backgroundRotation)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Kd),l.material.toneMapped=se.getTransfer(T.colorSpace)!==he,(u!==T||f!==T.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=T,f=T.version,d=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new $t(new Ts(2,2),new Xn({name:"BackgroundMaterial",uniforms:As(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=se.getTransfer(T.colorSpace)!==he,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||f!==T.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=T,f=T.version,d=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function _(v,y){v.getRGB(kr,Hd(n)),e.buffers.color.setClear(kr.r,kr.g,kr.b,y,r)}function h(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,y=1){o.set(v),a=y,_(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,_(o,a)},render:m,addToRenderList:x,dispose:h}}function ug(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,o=!1;function a(R,P,D,G,N){let k=!1;const B=f(R,G,D,P);r!==B&&(r=B,l(r.object)),k=g(R,G,D,N),k&&m(R,G,D,N),N!==null&&t.update(N,n.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,T(R,P,D,G),N!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function c(){return n.createVertexArray()}function l(R){return n.bindVertexArray(R)}function u(R){return n.deleteVertexArray(R)}function f(R,P,D,G){const N=G.wireframe===!0;let k=i[P.id];k===void 0&&(k={},i[P.id]=k);const B=R.isInstancedMesh===!0?R.id:0;let Z=k[B];Z===void 0&&(Z={},k[B]=Z);let rt=Z[D.id];rt===void 0&&(rt={},Z[D.id]=rt);let mt=rt[N];return mt===void 0&&(mt=d(c()),rt[N]=mt),mt}function d(R){const P=[],D=[],G=[];for(let N=0;N<e;N++)P[N]=0,D[N]=0,G[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:D,attributeDivisors:G,object:R,attributes:{},index:null}}function g(R,P,D,G){const N=r.attributes,k=P.attributes;let B=0;const Z=D.getAttributes();for(const rt in Z)if(Z[rt].location>=0){const At=N[rt];let It=k[rt];if(It===void 0&&(rt==="instanceMatrix"&&R.instanceMatrix&&(It=R.instanceMatrix),rt==="instanceColor"&&R.instanceColor&&(It=R.instanceColor)),At===void 0||At.attribute!==It||It&&At.data!==It.data)return!0;B++}return r.attributesNum!==B||r.index!==G}function m(R,P,D,G){const N={},k=P.attributes;let B=0;const Z=D.getAttributes();for(const rt in Z)if(Z[rt].location>=0){let At=k[rt];At===void 0&&(rt==="instanceMatrix"&&R.instanceMatrix&&(At=R.instanceMatrix),rt==="instanceColor"&&R.instanceColor&&(At=R.instanceColor));const It={};It.attribute=At,At&&At.data&&(It.data=At.data),N[rt]=It,B++}r.attributes=N,r.attributesNum=B,r.index=G}function x(){const R=r.newAttributes;for(let P=0,D=R.length;P<D;P++)R[P]=0}function _(R){h(R,0)}function h(R,P){const D=r.newAttributes,G=r.enabledAttributes,N=r.attributeDivisors;D[R]=1,G[R]===0&&(n.enableVertexAttribArray(R),G[R]=1),N[R]!==P&&(n.vertexAttribDivisor(R,P),N[R]=P)}function v(){const R=r.newAttributes,P=r.enabledAttributes;for(let D=0,G=P.length;D<G;D++)P[D]!==R[D]&&(n.disableVertexAttribArray(D),P[D]=0)}function y(R,P,D,G,N,k,B){B===!0?n.vertexAttribIPointer(R,P,D,N,k):n.vertexAttribPointer(R,P,D,G,N,k)}function T(R,P,D,G){x();const N=G.attributes,k=D.getAttributes(),B=P.defaultAttributeValues;for(const Z in k){const rt=k[Z];if(rt.location>=0){let mt=N[Z];if(mt===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(mt=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(mt=R.instanceColor)),mt!==void 0){const At=mt.normalized,It=mt.itemSize,ct=t.get(mt);if(ct===void 0)continue;const vt=ct.buffer,Mt=ct.type,J=ct.bytesPerElement,xt=Mt===n.INT||Mt===n.UNSIGNED_INT||mt.gpuType===Cl;if(mt.isInterleavedBufferAttribute){const ht=mt.data,Bt=ht.stride,zt=mt.offset;if(ht.isInstancedInterleavedBuffer){for(let Vt=0;Vt<rt.locationSize;Vt++)h(rt.location+Vt,ht.meshPerAttribute);R.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let Vt=0;Vt<rt.locationSize;Vt++)_(rt.location+Vt);n.bindBuffer(n.ARRAY_BUFFER,vt);for(let Vt=0;Vt<rt.locationSize;Vt++)y(rt.location+Vt,It/rt.locationSize,Mt,At,Bt*J,(zt+It/rt.locationSize*Vt)*J,xt)}else{if(mt.isInstancedBufferAttribute){for(let ht=0;ht<rt.locationSize;ht++)h(rt.location+ht,mt.meshPerAttribute);R.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let ht=0;ht<rt.locationSize;ht++)_(rt.location+ht);n.bindBuffer(n.ARRAY_BUFFER,vt);for(let ht=0;ht<rt.locationSize;ht++)y(rt.location+ht,It/rt.locationSize,Mt,At,It*J,It/rt.locationSize*ht*J,xt)}}else if(B!==void 0){const At=B[Z];if(At!==void 0)switch(At.length){case 2:n.vertexAttrib2fv(rt.location,At);break;case 3:n.vertexAttrib3fv(rt.location,At);break;case 4:n.vertexAttrib4fv(rt.location,At);break;default:n.vertexAttrib1fv(rt.location,At)}}}}v()}function L(){M();for(const R in i){const P=i[R];for(const D in P){const G=P[D];for(const N in G){const k=G[N];for(const B in k)u(k[B].object),delete k[B];delete G[N]}}delete i[R]}}function C(R){if(i[R.id]===void 0)return;const P=i[R.id];for(const D in P){const G=P[D];for(const N in G){const k=G[N];for(const B in k)u(k[B].object),delete k[B];delete G[N]}}delete i[R.id]}function w(R){for(const P in i){const D=i[P];for(const G in D){const N=D[G];if(N[R.id]===void 0)continue;const k=N[R.id];for(const B in k)u(k[B].object),delete k[B];delete N[R.id]}}}function p(R){for(const P in i){const D=i[P],G=R.isInstancedMesh===!0?R.id:0,N=D[G];if(N!==void 0){for(const k in N){const B=N[k];for(const Z in B)u(B[Z].object),delete B[Z];delete N[k]}delete D[G],Object.keys(D).length===0&&delete i[P]}}}function M(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:M,resetDefaultState:E,dispose:L,releaseStatesOfGeometry:C,releaseStatesOfObject:p,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:_,disableUnusedAttributes:v}}function dg(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function o(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),e.update(l,i,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let d=0;for(let g=0;g<u;g++)d+=l[g];e.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function hg(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==Pn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const p=w===ri&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==gn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Cn&&!p)}function c(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(Wt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&d===!1&&Wt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),T=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=n.getParameter(n.MAX_SAMPLES),C=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:g,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:_,maxAttributes:h,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:T,maxSamples:L,samples:C}}function fg(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new Jn,a=new Yt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const g=f.length!==0||d||i!==0||s;return s=d,i=f.length,g},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){e=u(f,d,0)},this.setState=function(f,d,g){const m=f.clippingPlanes,x=f.clipIntersection,_=f.clipShadows,h=n.get(f);if(!s||m===null||m.length===0||r&&!_)r?u(null):l();else{const v=r?0:i,y=v*4;let T=h.clippingState||null;c.value=T,T=u(m,d,y,g);for(let L=0;L!==y;++L)T[L]=e[L];h.clippingState=T,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,d,g,m){const x=f!==null?f.length:0;let _=null;if(x!==0){if(_=c.value,m!==!0||_===null){const h=g+x*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(_===null||_.length<h)&&(_=new Float32Array(h));for(let y=0,T=g;y!==x;++y,T+=4)o.copy(f[y]).applyMatrix4(v,a),o.normal.toArray(_,T),_[T+3]=o.constant}c.value=_,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,_}}const Ei=4,du=[.125,.215,.35,.446,.526,.582],Fi=20,pg=256,Ws=new jl,hu=new Ht;let la=null,ca=0,ua=0,da=!1;const mg=new U;class _l{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=mg}=r;la=this._renderer.getRenderTarget(),ca=this._renderer.getActiveCubeFace(),ua=this._renderer.getActiveMipmapLevel(),da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(la,ca,ua),this._renderer.xr.enabled=da,t.scissorTest=!1,fs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Vi||t.mapping===ys?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),la=this._renderer.getRenderTarget(),ca=this._renderer.getActiveCubeFace(),ua=this._renderer.getActiveMipmapLevel(),da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:tn,minFilter:tn,generateMipmaps:!1,type:ri,format:Pn,colorSpace:ho,depthBuffer:!1},s=fu(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fu(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=gg(r)),this._blurMaterial=xg(r,t,e),this._ggxMaterial=_g(r,t,e)}return s}_compileMaterial(t){const e=new $t(new sn,t);this._renderer.compile(e,Ws)}_sceneToCubeUV(t,e,i,s,r){const c=new un(90,1,e,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,g=f.toneMapping;f.getClearColor(hu),f.toneMapping=Gn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new $t(new fe,new Xi({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,_=x.material;let h=!1;const v=t.background;v?v.isColor&&(_.color.copy(v),t.background=null,h=!0):(_.color.copy(hu),h=!0);for(let y=0;y<6;y++){const T=y%3;T===0?(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[y],r.y,r.z)):T===1?(c.up.set(0,0,l[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[y],r.z)):(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[y]));const L=this._cubeSize;fs(s,T*L,y>2?L:0,L,L),f.setRenderTarget(s),h&&f.render(x,c),f.render(t,c)}f.toneMapping=g,f.autoClear=d,t.background=v}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Vi||t.mapping===ys;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=mu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;fs(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,Ws)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const c=o.uniforms,l=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),d=0+l*1.25,g=f*d,{_lodMax:m}=this,x=this._sizeLods[i],_=3*x*(i>m-Ei?i-m+Ei:0),h=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=g,c.mipInt.value=m-e,fs(r,_,h,3*x,2*x),s.setRenderTarget(r),s.render(a,Ws),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-i,fs(t,_,h,3*x,2*x),s.setRenderTarget(t),s.render(a,Ws)}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&oe("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=l;const d=l.uniforms,g=this._sizeLods[i]-1,m=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Fi-1),x=r/m,_=isFinite(r)?1+Math.floor(u*x):Fi;_>Fi&&Wt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${Fi}`);const h=[];let v=0;for(let w=0;w<Fi;++w){const p=w/x,M=Math.exp(-p*p/2);h.push(M),w===0?v+=M:w<_&&(v+=2*M)}for(let w=0;w<h.length;w++)h[w]=h[w]/v;d.envMap.value=t.texture,d.samples.value=_,d.weights.value=h,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=m,d.mipInt.value=y-i;const T=this._sizeLods[s],L=3*T*(s>y-Ei?s-y+Ei:0),C=4*(this._cubeSize-T);fs(e,L,C,3*T,2*T),c.setRenderTarget(e),c.render(f,Ws)}}function gg(n){const t=[],e=[],i=[];let s=n;const r=n-Ei+1+du.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>n-Ei?c=du[o-n+Ei-1]:o===0&&(c=0),e.push(c);const l=1/(a-2),u=-l,f=1+l,d=[u,u,f,u,f,f,u,u,f,f,u,f],g=6,m=6,x=3,_=2,h=1,v=new Float32Array(x*m*g),y=new Float32Array(_*m*g),T=new Float32Array(h*m*g);for(let C=0;C<g;C++){const w=C%3*2/3-1,p=C>2?0:-1,M=[w,p,0,w+2/3,p,0,w+2/3,p+1,0,w,p,0,w+2/3,p+1,0,w,p+1,0];v.set(M,x*m*C),y.set(d,_*m*C);const E=[C,C,C,C,C,C];T.set(E,h*m*C)}const L=new sn;L.setAttribute("position",new _n(v,x)),L.setAttribute("uv",new _n(y,_)),L.setAttribute("faceIndex",new _n(T,h)),i.push(new $t(L,null)),s>Ei&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function fu(n,t,e){const i=new Hn(n,t,e);return i.texture.mapping=Eo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function fs(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function _g(n,t,e){return new Xn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:pg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ao(),fragmentShader:`

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
		`,blending:ei,depthTest:!1,depthWrite:!1})}function xg(n,t,e){const i=new Float32Array(Fi),s=new U(0,1,0);return new Xn({name:"SphericalGaussianBlur",defines:{n:Fi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ao(),fragmentShader:`

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
		`,blending:ei,depthTest:!1,depthWrite:!1})}function pu(){return new Xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ao(),fragmentShader:`

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
		`,blending:ei,depthTest:!1,depthWrite:!1})}function mu(){return new Xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Ao(){return`

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
	`}class Zd extends Hn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Bd(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new fe(5,5,5),r=new Xn({name:"CubemapFromEquirect",uniforms:As(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ln,blending:ei});r.uniforms.tEquirect.value=e;const o=new $t(s,r),a=e.minFilter;return e.minFilter===zi&&(e.minFilter=tn),new yp(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}function vg(n){let t=new WeakMap,e=new WeakMap,i=null;function s(d,g=!1){return d==null?null:g?o(d):r(d)}function r(d){if(d&&d.isTexture){const g=d.mapping;if(g===Uo||g===Oo)if(t.has(d)){const m=t.get(d).texture;return a(m,d.mapping)}else{const m=d.image;if(m&&m.height>0){const x=new Zd(m.height);return x.fromEquirectangularTexture(n,d),t.set(d,x),d.addEventListener("dispose",l),a(x.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const g=d.mapping,m=g===Uo||g===Oo,x=g===Vi||g===ys;if(m||x){let _=e.get(d);const h=_!==void 0?_.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==h)return i===null&&(i=new _l(n)),_=m?i.fromEquirectangular(d,_):i.fromCubemap(d,_),_.texture.pmremVersion=d.pmremVersion,e.set(d,_),_.texture;if(_!==void 0)return _.texture;{const v=d.image;return m&&v&&v.height>0||x&&v&&c(v)?(i===null&&(i=new _l(n)),_=m?i.fromEquirectangular(d):i.fromCubemap(d),_.texture.pmremVersion=d.pmremVersion,e.set(d,_),d.addEventListener("dispose",u),_.texture):null}}}return d}function a(d,g){return g===Uo?d.mapping=Vi:g===Oo&&(d.mapping=ys),d}function c(d){let g=0;const m=6;for(let x=0;x<m;x++)d[x]!==void 0&&g++;return g===m}function l(d){const g=d.target;g.removeEventListener("dispose",l);const m=t.get(g);m!==void 0&&(t.delete(g),m.dispose())}function u(d){const g=d.target;g.removeEventListener("dispose",u);const m=e.get(g);m!==void 0&&(e.delete(g),m.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function Mg(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&ml("WebGLRenderer: "+i+" extension not supported."),s}}}function bg(n,t,e,i){const s={},r=new WeakMap;function o(f){const d=f.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete s[d.id];const g=r.get(d);g&&(t.remove(g),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(f,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(f){const d=f.attributes;for(const g in d)t.update(d[g],n.ARRAY_BUFFER)}function l(f){const d=[],g=f.index,m=f.attributes.position;let x=0;if(m===void 0)return;if(g!==null){const v=g.array;x=g.version;for(let y=0,T=v.length;y<T;y+=3){const L=v[y+0],C=v[y+1],w=v[y+2];d.push(L,C,C,w,w,L)}}else{const v=m.array;x=m.version;for(let y=0,T=v.length/3-1;y<T;y+=3){const L=y+0,C=y+1,w=y+2;d.push(L,C,C,w,w,L)}}const _=new(m.count>=65535?Od:Ud)(d,1);_.version=x;const h=r.get(f);h&&t.remove(h),r.set(f,_)}function u(f){const d=r.get(f);if(d){const g=f.index;g!==null&&d.version<g.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function Sg(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){n.drawElements(i,d,r,f*o),e.update(d,i,1)}function l(f,d,g){g!==0&&(n.drawElementsInstanced(i,d,r,f*o,g),e.update(d,i,g))}function u(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,g);let x=0;for(let _=0;_<g;_++)x+=d[_];e.update(x,i,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function yg(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:oe("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Eg(n,t,e){const i=new WeakMap,s=new Ue;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(a);if(d===void 0||d.count!==f){let E=function(){p.dispose(),i.delete(a),a.removeEventListener("dispose",E)};var g=E;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let T=0;m===!0&&(T=1),x===!0&&(T=2),_===!0&&(T=3);let L=a.attributes.position.count*T,C=1;L>t.maxTextureSize&&(C=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const w=new Float32Array(L*C*4*f),p=new Id(w,L,C,f);p.type=Cn,p.needsUpdate=!0;const M=T*4;for(let R=0;R<f;R++){const P=h[R],D=v[R],G=y[R],N=L*C*4*R;for(let k=0;k<P.count;k++){const B=k*M;m===!0&&(s.fromBufferAttribute(P,k),w[N+B+0]=s.x,w[N+B+1]=s.y,w[N+B+2]=s.z,w[N+B+3]=0),x===!0&&(s.fromBufferAttribute(D,k),w[N+B+4]=s.x,w[N+B+5]=s.y,w[N+B+6]=s.z,w[N+B+7]=0),_===!0&&(s.fromBufferAttribute(G,k),w[N+B+8]=s.x,w[N+B+9]=s.y,w[N+B+10]=s.z,w[N+B+11]=G.itemSize===4?s.w:1)}}d={count:f,texture:p,size:new Gt(L,C)},i.set(a,d),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let m=0;for(let _=0;_<l.length;_++)m+=l[_];const x=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function Tg(n,t,e,i,s){let r=new WeakMap;function o(l){const u=s.render.frame,f=l.geometry,d=t.get(l,f);if(r.get(d)!==u&&(t.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const g=l.skeleton;r.get(g)!==u&&(g.update(),r.set(g,u))}return d}function a(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}const wg={[vd]:"LINEAR_TONE_MAPPING",[Md]:"REINHARD_TONE_MAPPING",[bd]:"CINEON_TONE_MAPPING",[Sd]:"ACES_FILMIC_TONE_MAPPING",[Ed]:"AGX_TONE_MAPPING",[yo]:"NEUTRAL_TONE_MAPPING",[yd]:"CUSTOM_TONE_MAPPING"};function Ag(n,t,e,i,s){const r=new Hn(t,e,{type:n,depthBuffer:i,stencilBuffer:s,depthTexture:i?new Es(t,e):void 0}),o=new Hn(t,e,{type:ri,depthBuffer:!1,stencilBuffer:!1}),a=new sn;a.setAttribute("position",new we([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new we([0,2,0,0,2,0],2));const c=new _p({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new $t(a,c),u=new jl(-1,1,1,-1,0,1);let f=null,d=null,g=!1,m,x=null,_=[],h=!1;this.setSize=function(v,y){r.setSize(v,y),o.setSize(v,y);for(let T=0;T<_.length;T++){const L=_[T];L.setSize&&L.setSize(v,y)}},this.setEffects=function(v){_=v,h=_.length>0&&_[0].isRenderPass===!0;const y=r.width,T=r.height;for(let L=0;L<_.length;L++){const C=_[L];C.setSize&&C.setSize(y,T)}},this.begin=function(v,y){if(g||v.toneMapping===Gn&&_.length===0)return!1;if(x=y,y!==null){const T=y.width,L=y.height;(r.width!==T||r.height!==L)&&this.setSize(T,L)}return h===!1&&v.setRenderTarget(r),m=v.toneMapping,v.toneMapping=Gn,!0},this.hasRenderPass=function(){return h},this.end=function(v,y){v.toneMapping=m,g=!0;let T=r,L=o;for(let C=0;C<_.length;C++){const w=_[C];if(w.enabled!==!1&&(w.render(v,L,T,y),w.needsSwap!==!1)){const p=T;T=L,L=p}}if(f!==v.outputColorSpace||d!==v.toneMapping){f=v.outputColorSpace,d=v.toneMapping,c.defines={},se.getTransfer(f)===he&&(c.defines.SRGB_TRANSFER="");const C=wg[d];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,v.setRenderTarget(x),v.render(l,u),x=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),a.dispose(),c.dispose()}}const Jd=new nn,xl=new Es(1,1),Qd=new Id,th=new qf,eh=new Bd,gu=[],_u=[],xu=new Float32Array(16),vu=new Float32Array(9),Mu=new Float32Array(4);function Is(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=gu[s];if(r===void 0&&(r=new Float32Array(s),gu[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function He(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ve(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ro(n,t){let e=_u[t];e===void 0&&(e=new Int32Array(t),_u[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Rg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Cg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;n.uniform2fv(this.addr,t),Ve(e,t)}}function Pg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;n.uniform3fv(this.addr,t),Ve(e,t)}}function Lg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;n.uniform4fv(this.addr,t),Ve(e,t)}}function Dg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,i))return;Mu.set(i),n.uniformMatrix2fv(this.addr,!1,Mu),Ve(e,i)}}function Ig(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,i))return;vu.set(i),n.uniformMatrix3fv(this.addr,!1,vu),Ve(e,i)}}function Ng(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,i))return;xu.set(i),n.uniformMatrix4fv(this.addr,!1,xu),Ve(e,i)}}function Ug(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Og(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;n.uniform2iv(this.addr,t),Ve(e,t)}}function Fg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;n.uniform3iv(this.addr,t),Ve(e,t)}}function zg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;n.uniform4iv(this.addr,t),Ve(e,t)}}function Bg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function kg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;n.uniform2uiv(this.addr,t),Ve(e,t)}}function Gg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;n.uniform3uiv(this.addr,t),Ve(e,t)}}function Hg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;n.uniform4uiv(this.addr,t),Ve(e,t)}}function Vg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(xl.compareFunction=e.isReversedDepthBuffer()?Fl:Ol,r=xl):r=Jd,e.setTexture2D(t||r,s)}function Wg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||th,s)}function Xg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||eh,s)}function $g(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Qd,s)}function qg(n){switch(n){case 5126:return Rg;case 35664:return Cg;case 35665:return Pg;case 35666:return Lg;case 35674:return Dg;case 35675:return Ig;case 35676:return Ng;case 5124:case 35670:return Ug;case 35667:case 35671:return Og;case 35668:case 35672:return Fg;case 35669:case 35673:return zg;case 5125:return Bg;case 36294:return kg;case 36295:return Gg;case 36296:return Hg;case 35678:case 36198:case 36298:case 36306:case 35682:return Vg;case 35679:case 36299:case 36307:return Wg;case 35680:case 36300:case 36308:case 36293:return Xg;case 36289:case 36303:case 36311:case 36292:return $g}}function Yg(n,t){n.uniform1fv(this.addr,t)}function jg(n,t){const e=Is(t,this.size,2);n.uniform2fv(this.addr,e)}function Kg(n,t){const e=Is(t,this.size,3);n.uniform3fv(this.addr,e)}function Zg(n,t){const e=Is(t,this.size,4);n.uniform4fv(this.addr,e)}function Jg(n,t){const e=Is(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Qg(n,t){const e=Is(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function t_(n,t){const e=Is(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function e_(n,t){n.uniform1iv(this.addr,t)}function n_(n,t){n.uniform2iv(this.addr,t)}function i_(n,t){n.uniform3iv(this.addr,t)}function s_(n,t){n.uniform4iv(this.addr,t)}function r_(n,t){n.uniform1uiv(this.addr,t)}function o_(n,t){n.uniform2uiv(this.addr,t)}function a_(n,t){n.uniform3uiv(this.addr,t)}function l_(n,t){n.uniform4uiv(this.addr,t)}function c_(n,t,e){const i=this.cache,s=t.length,r=Ro(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=xl:o=Jd;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function u_(n,t,e){const i=this.cache,s=t.length,r=Ro(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||th,r[o])}function d_(n,t,e){const i=this.cache,s=t.length,r=Ro(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||eh,r[o])}function h_(n,t,e){const i=this.cache,s=t.length,r=Ro(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Qd,r[o])}function f_(n){switch(n){case 5126:return Yg;case 35664:return jg;case 35665:return Kg;case 35666:return Zg;case 35674:return Jg;case 35675:return Qg;case 35676:return t_;case 5124:case 35670:return e_;case 35667:case 35671:return n_;case 35668:case 35672:return i_;case 35669:case 35673:return s_;case 5125:return r_;case 36294:return o_;case 36295:return a_;case 36296:return l_;case 35678:case 36198:case 36298:case 36306:case 35682:return c_;case 35679:case 36299:case 36307:return u_;case 35680:case 36300:case 36308:case 36293:return d_;case 36289:case 36303:case 36311:case 36292:return h_}}class p_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=qg(e.type)}}class m_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=f_(e.type)}}class g_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const ha=/(\w+)(\])?(\[|\.)?/g;function bu(n,t){n.seq.push(t),n.map[t.id]=t}function __(n,t,e){const i=n.name,s=i.length;for(ha.lastIndex=0;;){const r=ha.exec(i),o=ha.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){bu(e,l===void 0?new p_(a,n,t):new m_(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new g_(a),bu(e,f)),e=f}}}class so{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);__(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Su(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const x_=37297;let v_=0;function M_(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const yu=new Yt;function b_(n){se._getMatrix(yu,se.workingColorSpace,n);const t=`mat3( ${yu.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(n)){case fo:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return Wt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Eu(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+M_(n.getShaderSource(t),a)}else return r}function S_(n,t){const e=b_(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const y_={[vd]:"Linear",[Md]:"Reinhard",[bd]:"Cineon",[Sd]:"ACESFilmic",[Ed]:"AgX",[yo]:"Neutral",[yd]:"Custom"};function E_(n,t){const e=y_[t];return e===void 0?(Wt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Gr=new U;function T_(){se.getLuminanceCoefficients(Gr);const n=Gr.x.toFixed(4),t=Gr.y.toFixed(4),e=Gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function w_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ys).join(`
`)}function A_(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function R_(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Ys(n){return n!==""}function Tu(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function wu(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const C_=/^[ \t]*#include +<([\w\d./]+)>/gm;function vl(n){return n.replace(C_,L_)}const P_=new Map;function L_(n,t){let e=Zt[t];if(e===void 0){const i=P_.get(t);if(i!==void 0)e=Zt[i],Wt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return vl(e)}const D_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Au(n){return n.replace(D_,I_)}function I_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ru(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}const N_={[vs]:"SHADOWMAP_TYPE_PCF",[qs]:"SHADOWMAP_TYPE_VSM"};function U_(n){return N_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const O_={[Vi]:"ENVMAP_TYPE_CUBE",[ys]:"ENVMAP_TYPE_CUBE",[Eo]:"ENVMAP_TYPE_CUBE_UV"};function F_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":O_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const z_={[ys]:"ENVMAP_MODE_REFRACTION"};function B_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":z_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const k_={[Rl]:"ENVMAP_BLENDING_MULTIPLY",[df]:"ENVMAP_BLENDING_MIX",[hf]:"ENVMAP_BLENDING_ADD"};function G_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":k_[n.combine]||"ENVMAP_BLENDING_NONE"}function H_(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function V_(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=U_(e),l=F_(e),u=B_(e),f=G_(e),d=H_(e),g=w_(e),m=A_(r),x=s.createProgram();let _,h,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ys).join(`
`),_.length>0&&(_+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ys).join(`
`),h.length>0&&(h+=`
`)):(_=[Ru(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ys).join(`
`),h=[Ru(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Gn?"#define TONE_MAPPING":"",e.toneMapping!==Gn?Zt.tonemapping_pars_fragment:"",e.toneMapping!==Gn?E_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,S_("linearToOutputTexel",e.outputColorSpace),T_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ys).join(`
`)),o=vl(o),o=Tu(o,e),o=wu(o,e),a=vl(a),a=Tu(a,e),a=wu(a,e),o=Au(o),a=Au(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,_=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,h=["#define varying in",e.glslVersion===Lc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Lc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const y=v+_+o,T=v+h+a,L=Su(s,s.VERTEX_SHADER,y),C=Su(s,s.FRAGMENT_SHADER,T);s.attachShader(x,L),s.attachShader(x,C),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function w(R){if(n.debug.checkShaderErrors){const P=s.getProgramInfoLog(x)||"",D=s.getShaderInfoLog(L)||"",G=s.getShaderInfoLog(C)||"",N=P.trim(),k=D.trim(),B=G.trim();let Z=!0,rt=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,L,C);else{const mt=Eu(s,L,"vertex"),At=Eu(s,C,"fragment");oe("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+N+`
`+mt+`
`+At)}else N!==""?Wt("WebGLProgram: Program Info Log:",N):(k===""||B==="")&&(rt=!1);rt&&(R.diagnostics={runnable:Z,programLog:N,vertexShader:{log:k,prefix:_},fragmentShader:{log:B,prefix:h}})}s.deleteShader(L),s.deleteShader(C),p=new so(s,x),M=R_(s,x)}let p;this.getUniforms=function(){return p===void 0&&w(this),p};let M;this.getAttributes=function(){return M===void 0&&w(this),M};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(x,x_)),E},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=v_++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=L,this.fragmentShader=C,this}let W_=0;class X_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new $_(t),e.set(t,i)),i}}class $_{constructor(t){this.id=W_++,this.code=t,this.usedTimes=0}}function q_(n){return n===Wi||n===lo||n===co}function Y_(n,t,e,i,s,r){const o=new kl,a=new X_,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(p){return c.add(p),p===0?"uv":`uv${p}`}function x(p,M,E,R,P,D){const G=R.fog,N=P.geometry,k=p.isMeshStandardMaterial||p.isMeshLambertMaterial||p.isMeshPhongMaterial?R.environment:null,B=p.isMeshStandardMaterial||p.isMeshLambertMaterial&&!p.envMap||p.isMeshPhongMaterial&&!p.envMap,Z=t.get(p.envMap||k,B),rt=Z&&Z.mapping===Eo?Z.image.height:null,mt=g[p.type];p.precision!==null&&(d=i.getMaxPrecision(p.precision),d!==p.precision&&Wt("WebGLProgram.getParameters:",p.precision,"not supported, using",d,"instead."));const At=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,It=At!==void 0?At.length:0;let ct=0;N.morphAttributes.position!==void 0&&(ct=1),N.morphAttributes.normal!==void 0&&(ct=2),N.morphAttributes.color!==void 0&&(ct=3);let vt,Mt,J,xt;if(mt){const qt=Bn[mt];vt=qt.vertexShader,Mt=qt.fragmentShader}else vt=p.vertexShader,Mt=p.fragmentShader,a.update(p),J=a.getVertexShaderID(p),xt=a.getFragmentShaderID(p);const ht=n.getRenderTarget(),Bt=n.state.buffers.depth.getReversed(),zt=P.isInstancedMesh===!0,Vt=P.isBatchedMesh===!0,be=!!p.map,Jt=!!p.matcap,ue=!!Z,ge=!!p.aoMap,Kt=!!p.lightMap,Le=!!p.bumpMap,Se=!!p.normalMap,Be=!!p.displacementMap,O=!!p.emissiveMap,De=!!p.metalnessMap,ee=!!p.roughnessMap,K=p.anisotropy>0,W=p.clearcoat>0,wt=p.dispersion>0,A=p.iridescence>0,b=p.sheen>0,z=p.transmission>0,X=K&&!!p.anisotropyMap,it=W&&!!p.clearcoatMap,at=W&&!!p.clearcoatNormalMap,lt=W&&!!p.clearcoatRoughnessMap,Y=A&&!!p.iridescenceMap,tt=A&&!!p.iridescenceThicknessMap,_t=b&&!!p.sheenColorMap,Et=b&&!!p.sheenRoughnessMap,dt=!!p.specularMap,ut=!!p.specularColorMap,kt=!!p.specularIntensityMap,Dt=z&&!!p.transmissionMap,Rt=z&&!!p.thicknessMap,I=!!p.gradientMap,ot=!!p.alphaMap,Q=p.alphaTest>0,St=!!p.alphaHash,ft=!!p.extensions;let nt=Gn;p.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(nt=n.toneMapping);const Ct={shaderID:mt,shaderType:p.type,shaderName:p.name,vertexShader:vt,fragmentShader:Mt,defines:p.defines,customVertexShaderID:J,customFragmentShaderID:xt,isRawShaderMaterial:p.isRawShaderMaterial===!0,glslVersion:p.glslVersion,precision:d,batching:Vt,batchingColor:Vt&&P._colorsTexture!==null,instancing:zt,instancingColor:zt&&P.instanceColor!==null,instancingMorph:zt&&P.morphTexture!==null,outputColorSpace:ht===null?n.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:se.workingColorSpace,alphaToCoverage:!!p.alphaToCoverage,map:be,matcap:Jt,envMap:ue,envMapMode:ue&&Z.mapping,envMapCubeUVHeight:rt,aoMap:ge,lightMap:Kt,bumpMap:Le,normalMap:Se,displacementMap:Be,emissiveMap:O,normalMapObjectSpace:Se&&p.normalMapType===mf,normalMapTangentSpace:Se&&p.normalMapType===uo,packedNormalMap:Se&&p.normalMapType===uo&&q_(p.normalMap.format),metalnessMap:De,roughnessMap:ee,anisotropy:K,anisotropyMap:X,clearcoat:W,clearcoatMap:it,clearcoatNormalMap:at,clearcoatRoughnessMap:lt,dispersion:wt,iridescence:A,iridescenceMap:Y,iridescenceThicknessMap:tt,sheen:b,sheenColorMap:_t,sheenRoughnessMap:Et,specularMap:dt,specularColorMap:ut,specularIntensityMap:kt,transmission:z,transmissionMap:Dt,thicknessMap:Rt,gradientMap:I,opaque:p.transparent===!1&&p.blending===Ms&&p.alphaToCoverage===!1,alphaMap:ot,alphaTest:Q,alphaHash:St,combine:p.combine,mapUv:be&&m(p.map.channel),aoMapUv:ge&&m(p.aoMap.channel),lightMapUv:Kt&&m(p.lightMap.channel),bumpMapUv:Le&&m(p.bumpMap.channel),normalMapUv:Se&&m(p.normalMap.channel),displacementMapUv:Be&&m(p.displacementMap.channel),emissiveMapUv:O&&m(p.emissiveMap.channel),metalnessMapUv:De&&m(p.metalnessMap.channel),roughnessMapUv:ee&&m(p.roughnessMap.channel),anisotropyMapUv:X&&m(p.anisotropyMap.channel),clearcoatMapUv:it&&m(p.clearcoatMap.channel),clearcoatNormalMapUv:at&&m(p.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&m(p.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&m(p.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&m(p.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&m(p.sheenColorMap.channel),sheenRoughnessMapUv:Et&&m(p.sheenRoughnessMap.channel),specularMapUv:dt&&m(p.specularMap.channel),specularColorMapUv:ut&&m(p.specularColorMap.channel),specularIntensityMapUv:kt&&m(p.specularIntensityMap.channel),transmissionMapUv:Dt&&m(p.transmissionMap.channel),thicknessMapUv:Rt&&m(p.thicknessMap.channel),alphaMapUv:ot&&m(p.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Se||K),vertexNormals:!!N.attributes.normal,vertexColors:p.vertexColors,vertexAlphas:p.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!N.attributes.uv&&(be||ot),fog:!!G,useFog:p.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:p.wireframe===!1&&(p.flatShading===!0||N.attributes.normal===void 0&&Se===!1&&(p.isMeshLambertMaterial||p.isMeshPhongMaterial||p.isMeshStandardMaterial||p.isMeshPhysicalMaterial)),sizeAttenuation:p.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Bt,skinning:P.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:It,morphTextureStride:ct,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:D.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:p.dithering,shadowMapEnabled:n.shadowMap.enabled&&E.length>0,shadowMapType:n.shadowMap.type,toneMapping:nt,decodeVideoTexture:be&&p.map.isVideoTexture===!0&&se.getTransfer(p.map.colorSpace)===he,decodeVideoTextureEmissive:O&&p.emissiveMap.isVideoTexture===!0&&se.getTransfer(p.emissiveMap.colorSpace)===he,premultipliedAlpha:p.premultipliedAlpha,doubleSided:p.side===Qn,flipSided:p.side===ln,useDepthPacking:p.depthPacking>=0,depthPacking:p.depthPacking||0,index0AttributeName:p.index0AttributeName,extensionClipCullDistance:ft&&p.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ft&&p.extensions.multiDraw===!0||Vt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:p.customProgramCacheKey()};return Ct.vertexUv1s=c.has(1),Ct.vertexUv2s=c.has(2),Ct.vertexUv3s=c.has(3),c.clear(),Ct}function _(p){const M=[];if(p.shaderID?M.push(p.shaderID):(M.push(p.customVertexShaderID),M.push(p.customFragmentShaderID)),p.defines!==void 0)for(const E in p.defines)M.push(E),M.push(p.defines[E]);return p.isRawShaderMaterial===!1&&(h(M,p),v(M,p),M.push(n.outputColorSpace)),M.push(p.customProgramCacheKey),M.join()}function h(p,M){p.push(M.precision),p.push(M.outputColorSpace),p.push(M.envMapMode),p.push(M.envMapCubeUVHeight),p.push(M.mapUv),p.push(M.alphaMapUv),p.push(M.lightMapUv),p.push(M.aoMapUv),p.push(M.bumpMapUv),p.push(M.normalMapUv),p.push(M.displacementMapUv),p.push(M.emissiveMapUv),p.push(M.metalnessMapUv),p.push(M.roughnessMapUv),p.push(M.anisotropyMapUv),p.push(M.clearcoatMapUv),p.push(M.clearcoatNormalMapUv),p.push(M.clearcoatRoughnessMapUv),p.push(M.iridescenceMapUv),p.push(M.iridescenceThicknessMapUv),p.push(M.sheenColorMapUv),p.push(M.sheenRoughnessMapUv),p.push(M.specularMapUv),p.push(M.specularColorMapUv),p.push(M.specularIntensityMapUv),p.push(M.transmissionMapUv),p.push(M.thicknessMapUv),p.push(M.combine),p.push(M.fogExp2),p.push(M.sizeAttenuation),p.push(M.morphTargetsCount),p.push(M.morphAttributeCount),p.push(M.numDirLights),p.push(M.numPointLights),p.push(M.numSpotLights),p.push(M.numSpotLightMaps),p.push(M.numHemiLights),p.push(M.numRectAreaLights),p.push(M.numDirLightShadows),p.push(M.numPointLightShadows),p.push(M.numSpotLightShadows),p.push(M.numSpotLightShadowsWithMaps),p.push(M.numLightProbes),p.push(M.shadowMapType),p.push(M.toneMapping),p.push(M.numClippingPlanes),p.push(M.numClipIntersection),p.push(M.depthPacking)}function v(p,M){o.disableAll(),M.instancing&&o.enable(0),M.instancingColor&&o.enable(1),M.instancingMorph&&o.enable(2),M.matcap&&o.enable(3),M.envMap&&o.enable(4),M.normalMapObjectSpace&&o.enable(5),M.normalMapTangentSpace&&o.enable(6),M.clearcoat&&o.enable(7),M.iridescence&&o.enable(8),M.alphaTest&&o.enable(9),M.vertexColors&&o.enable(10),M.vertexAlphas&&o.enable(11),M.vertexUv1s&&o.enable(12),M.vertexUv2s&&o.enable(13),M.vertexUv3s&&o.enable(14),M.vertexTangents&&o.enable(15),M.anisotropy&&o.enable(16),M.alphaHash&&o.enable(17),M.batching&&o.enable(18),M.dispersion&&o.enable(19),M.batchingColor&&o.enable(20),M.gradientMap&&o.enable(21),M.packedNormalMap&&o.enable(22),M.vertexNormals&&o.enable(23),p.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),M.numLightProbeGrids>0&&o.enable(22),p.push(o.mask)}function y(p){const M=g[p.type];let E;if(M){const R=Bn[M];E=pp.clone(R.uniforms)}else E=p.uniforms;return E}function T(p,M){let E=u.get(M);return E!==void 0?++E.usedTimes:(E=new V_(n,M,p,s),l.push(E),u.set(M,E)),E}function L(p){if(--p.usedTimes===0){const M=l.indexOf(p);l[M]=l[l.length-1],l.pop(),u.delete(p.cacheKey),p.destroy()}}function C(p){a.remove(p)}function w(){a.dispose()}return{getParameters:x,getProgramCacheKey:_,getUniforms:y,acquireProgram:T,releaseProgram:L,releaseShaderCache:C,programs:l,dispose:w}}function j_(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function K_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Cu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Pu(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(d){let g=0;return d.isInstancedMesh&&(g+=2),d.isSkinnedMesh&&(g+=1),g}function a(d,g,m,x,_,h){let v=n[t];return v===void 0?(v={id:d.id,object:d,geometry:g,material:m,materialVariant:o(d),groupOrder:x,renderOrder:d.renderOrder,z:_,group:h},n[t]=v):(v.id=d.id,v.object=d,v.geometry=g,v.material=m,v.materialVariant=o(d),v.groupOrder=x,v.renderOrder=d.renderOrder,v.z=_,v.group=h),t++,v}function c(d,g,m,x,_,h){const v=a(d,g,m,x,_,h);m.transmission>0?i.push(v):m.transparent===!0?s.push(v):e.push(v)}function l(d,g,m,x,_,h){const v=a(d,g,m,x,_,h);m.transmission>0?i.unshift(v):m.transparent===!0?s.unshift(v):e.unshift(v)}function u(d,g){e.length>1&&e.sort(d||K_),i.length>1&&i.sort(g||Cu),s.length>1&&s.sort(g||Cu)}function f(){for(let d=t,g=n.length;d<g;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function Z_(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Pu,n.set(i,[o])):s>=r.length?(o=new Pu,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function J_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new Ht};break;case"SpotLight":e={position:new U,direction:new U,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new U,halfWidth:new U,halfHeight:new U};break}return n[t.id]=e,e}}}function Q_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let tx=0;function ex(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function nx(n){const t=new J_,e=Q_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new U);const s=new U,r=new me,o=new me;function a(l){let u=0,f=0,d=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let g=0,m=0,x=0,_=0,h=0,v=0,y=0,T=0,L=0,C=0,w=0;l.sort(ex);for(let M=0,E=l.length;M<E;M++){const R=l[M],P=R.color,D=R.intensity,G=R.distance;let N=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Wi?N=R.shadow.map.texture:N=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=P.r*D,f+=P.g*D,d+=P.b*D;else if(R.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(R.sh.coefficients[k],D);w++}else if(R.isDirectionalLight){const k=t.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const B=R.shadow,Z=e.get(R);Z.shadowIntensity=B.intensity,Z.shadowBias=B.bias,Z.shadowNormalBias=B.normalBias,Z.shadowRadius=B.radius,Z.shadowMapSize=B.mapSize,i.directionalShadow[g]=Z,i.directionalShadowMap[g]=N,i.directionalShadowMatrix[g]=R.shadow.matrix,v++}i.directional[g]=k,g++}else if(R.isSpotLight){const k=t.get(R);k.position.setFromMatrixPosition(R.matrixWorld),k.color.copy(P).multiplyScalar(D),k.distance=G,k.coneCos=Math.cos(R.angle),k.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),k.decay=R.decay,i.spot[x]=k;const B=R.shadow;if(R.map&&(i.spotLightMap[L]=R.map,L++,B.updateMatrices(R),R.castShadow&&C++),i.spotLightMatrix[x]=B.matrix,R.castShadow){const Z=e.get(R);Z.shadowIntensity=B.intensity,Z.shadowBias=B.bias,Z.shadowNormalBias=B.normalBias,Z.shadowRadius=B.radius,Z.shadowMapSize=B.mapSize,i.spotShadow[x]=Z,i.spotShadowMap[x]=N,T++}x++}else if(R.isRectAreaLight){const k=t.get(R);k.color.copy(P).multiplyScalar(D),k.halfWidth.set(R.width*.5,0,0),k.halfHeight.set(0,R.height*.5,0),i.rectArea[_]=k,_++}else if(R.isPointLight){const k=t.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity),k.distance=R.distance,k.decay=R.decay,R.castShadow){const B=R.shadow,Z=e.get(R);Z.shadowIntensity=B.intensity,Z.shadowBias=B.bias,Z.shadowNormalBias=B.normalBias,Z.shadowRadius=B.radius,Z.shadowMapSize=B.mapSize,Z.shadowCameraNear=B.camera.near,Z.shadowCameraFar=B.camera.far,i.pointShadow[m]=Z,i.pointShadowMap[m]=N,i.pointShadowMatrix[m]=R.shadow.matrix,y++}i.point[m]=k,m++}else if(R.isHemisphereLight){const k=t.get(R);k.skyColor.copy(R.color).multiplyScalar(D),k.groundColor.copy(R.groundColor).multiplyScalar(D),i.hemi[h]=k,h++}}_>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=bt.LTC_FLOAT_1,i.rectAreaLTC2=bt.LTC_FLOAT_2):(i.rectAreaLTC1=bt.LTC_HALF_1,i.rectAreaLTC2=bt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const p=i.hash;(p.directionalLength!==g||p.pointLength!==m||p.spotLength!==x||p.rectAreaLength!==_||p.hemiLength!==h||p.numDirectionalShadows!==v||p.numPointShadows!==y||p.numSpotShadows!==T||p.numSpotMaps!==L||p.numLightProbes!==w)&&(i.directional.length=g,i.spot.length=x,i.rectArea.length=_,i.point.length=m,i.hemi.length=h,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=T+L-C,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=w,p.directionalLength=g,p.pointLength=m,p.spotLength=x,p.rectAreaLength=_,p.hemiLength=h,p.numDirectionalShadows=v,p.numPointShadows=y,p.numSpotShadows=T,p.numSpotMaps=L,p.numLightProbes=w,i.version=tx++)}function c(l,u){let f=0,d=0,g=0,m=0,x=0;const _=u.matrixWorldInverse;for(let h=0,v=l.length;h<v;h++){const y=l[h];if(y.isDirectionalLight){const T=i.directional[f];T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(_),f++}else if(y.isSpotLight){const T=i.spot[g];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(_),T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(_),g++}else if(y.isRectAreaLight){const T=i.rectArea[m];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(_),o.identity(),r.copy(y.matrixWorld),r.premultiply(_),o.extractRotation(r),T.halfWidth.set(y.width*.5,0,0),T.halfHeight.set(0,y.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),m++}else if(y.isPointLight){const T=i.point[d];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(_),d++}else if(y.isHemisphereLight){const T=i.hemi[x];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(_),x++}}}return{setup:a,setupView:c,state:i}}function Lu(n){const t=new nx(n),e=[],i=[],s=[];function r(d){f.camera=d,e.length=0,i.length=0,s.length=0}function o(d){e.push(d)}function a(d){i.push(d)}function c(d){s.push(d)}function l(){t.setup(e)}function u(d){t.setupView(e,d)}const f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function ix(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Lu(n),t.set(s,[a])):r>=o.length?(a=new Lu(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const sx=`void main() {
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
}`,ox=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],ax=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Du=new me,Xs=new U,fa=new U;function lx(n,t,e){let i=new Vl;const s=new Gt,r=new Gt,o=new Ue,a=new vp,c=new Mp,l={},u=e.maxTextureSize,f={[wi]:ln,[ln]:wi,[Qn]:Qn},d=new Xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Gt},radius:{value:4}},vertexShader:sx,fragmentShader:rx}),g=d.clone();g.defines.HORIZONTAL_PASS=1;const m=new sn;m.setAttribute("position",new _n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new $t(m,d),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vs;let h=this.type;this.render=function(C,w,p){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||C.length===0)return;this.type===Xh&&(Wt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=vs);const M=n.getRenderTarget(),E=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),P=n.state;P.setBlending(ei),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const D=h!==this.type;D&&w.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(N=>N.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,N=C.length;G<N;G++){const k=C[G],B=k.shadow;if(B===void 0){Wt("WebGLShadowMap:",k,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const Z=B.getFrameExtents();s.multiply(Z),r.copy(B.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Z.x),s.x=r.x*Z.x,B.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Z.y),s.y=r.y*Z.y,B.mapSize.y=r.y));const rt=n.state.buffers.depth.getReversed();if(B.camera._reversedDepth=rt,B.map===null||D===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===qs){if(k.isPointLight){Wt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new Hn(s.x,s.y,{format:Wi,type:ri,minFilter:tn,magFilter:tn,generateMipmaps:!1}),B.map.texture.name=k.name+".shadowMap",B.map.depthTexture=new Es(s.x,s.y,Cn),B.map.depthTexture.name=k.name+".shadowMapDepth",B.map.depthTexture.format=oi,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Ye,B.map.depthTexture.magFilter=Ye}else k.isPointLight?(B.map=new Zd(s.x),B.map.depthTexture=new hp(s.x,Vn)):(B.map=new Hn(s.x,s.y),B.map.depthTexture=new Es(s.x,s.y,Vn)),B.map.depthTexture.name=k.name+".shadowMap",B.map.depthTexture.format=oi,this.type===vs?(B.map.depthTexture.compareFunction=rt?Fl:Ol,B.map.depthTexture.minFilter=tn,B.map.depthTexture.magFilter=tn):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Ye,B.map.depthTexture.magFilter=Ye);B.camera.updateProjectionMatrix()}const mt=B.map.isWebGLCubeRenderTarget?6:1;for(let At=0;At<mt;At++){if(B.map.isWebGLCubeRenderTarget)n.setRenderTarget(B.map,At),n.clear();else{At===0&&(n.setRenderTarget(B.map),n.clear());const It=B.getViewport(At);o.set(r.x*It.x,r.y*It.y,r.x*It.z,r.y*It.w),P.viewport(o)}if(k.isPointLight){const It=B.camera,ct=B.matrix,vt=k.distance||It.far;vt!==It.far&&(It.far=vt,It.updateProjectionMatrix()),Xs.setFromMatrixPosition(k.matrixWorld),It.position.copy(Xs),fa.copy(It.position),fa.add(ox[At]),It.up.copy(ax[At]),It.lookAt(fa),It.updateMatrixWorld(),ct.makeTranslation(-Xs.x,-Xs.y,-Xs.z),Du.multiplyMatrices(It.projectionMatrix,It.matrixWorldInverse),B._frustum.setFromProjectionMatrix(Du,It.coordinateSystem,It.reversedDepth)}else B.updateMatrices(k);i=B.getFrustum(),T(w,p,B.camera,k,this.type)}B.isPointLightShadow!==!0&&this.type===qs&&v(B,p),B.needsUpdate=!1}h=this.type,_.needsUpdate=!1,n.setRenderTarget(M,E,R)};function v(C,w){const p=t.update(x);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,g.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Hn(s.x,s.y,{format:Wi,type:ri})),d.uniforms.shadow_pass.value=C.map.depthTexture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(w,null,p,d,x,null),g.uniforms.shadow_pass.value=C.mapPass.texture,g.uniforms.resolution.value=C.mapSize,g.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(w,null,p,g,x,null)}function y(C,w,p,M){let E=null;const R=p.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(R!==void 0)E=R;else if(E=p.isPointLight===!0?c:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const P=E.uuid,D=w.uuid;let G=l[P];G===void 0&&(G={},l[P]=G);let N=G[D];N===void 0&&(N=E.clone(),G[D]=N,w.addEventListener("dispose",L)),E=N}if(E.visible=w.visible,E.wireframe=w.wireframe,M===qs?E.side=w.shadowSide!==null?w.shadowSide:w.side:E.side=w.shadowSide!==null?w.shadowSide:f[w.side],E.alphaMap=w.alphaMap,E.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,E.map=w.map,E.clipShadows=w.clipShadows,E.clippingPlanes=w.clippingPlanes,E.clipIntersection=w.clipIntersection,E.displacementMap=w.displacementMap,E.displacementScale=w.displacementScale,E.displacementBias=w.displacementBias,E.wireframeLinewidth=w.wireframeLinewidth,E.linewidth=w.linewidth,p.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const P=n.properties.get(E);P.light=p}return E}function T(C,w,p,M,E){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&E===qs)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(p.matrixWorldInverse,C.matrixWorld);const D=t.update(C),G=C.material;if(Array.isArray(G)){const N=D.groups;for(let k=0,B=N.length;k<B;k++){const Z=N[k],rt=G[Z.materialIndex];if(rt&&rt.visible){const mt=y(C,rt,M,E);C.onBeforeShadow(n,C,w,p,D,mt,Z),n.renderBufferDirect(p,null,D,mt,C,Z),C.onAfterShadow(n,C,w,p,D,mt,Z)}}}else if(G.visible){const N=y(C,G,M,E);C.onBeforeShadow(n,C,w,p,D,N,null),n.renderBufferDirect(p,null,D,N,C,null),C.onAfterShadow(n,C,w,p,D,N,null)}}const P=C.children;for(let D=0,G=P.length;D<G;D++)T(P[D],w,p,M,E)}function L(C){C.target.removeEventListener("dispose",L);for(const p in l){const M=l[p],E=C.target.uuid;E in M&&(M[E].dispose(),delete M[E])}}}function cx(n,t){function e(){let I=!1;const ot=new Ue;let Q=null;const St=new Ue(0,0,0,0);return{setMask:function(ft){Q!==ft&&!I&&(n.colorMask(ft,ft,ft,ft),Q=ft)},setLocked:function(ft){I=ft},setClear:function(ft,nt,Ct,qt,Re){Re===!0&&(ft*=qt,nt*=qt,Ct*=qt),ot.set(ft,nt,Ct,qt),St.equals(ot)===!1&&(n.clearColor(ft,nt,Ct,qt),St.copy(ot))},reset:function(){I=!1,Q=null,St.set(-1,0,0,0)}}}function i(){let I=!1,ot=!1,Q=null,St=null,ft=null;return{setReversed:function(nt){if(ot!==nt){const Ct=t.get("EXT_clip_control");nt?Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT):Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT),ot=nt;const qt=ft;ft=null,this.setClear(qt)}},getReversed:function(){return ot},setTest:function(nt){nt?ht(n.DEPTH_TEST):Bt(n.DEPTH_TEST)},setMask:function(nt){Q!==nt&&!I&&(n.depthMask(nt),Q=nt)},setFunc:function(nt){if(ot&&(nt=Tf[nt]),St!==nt){switch(nt){case La:n.depthFunc(n.NEVER);break;case Da:n.depthFunc(n.ALWAYS);break;case Ia:n.depthFunc(n.LESS);break;case Ss:n.depthFunc(n.LEQUAL);break;case Na:n.depthFunc(n.EQUAL);break;case Ua:n.depthFunc(n.GEQUAL);break;case Oa:n.depthFunc(n.GREATER);break;case Fa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}St=nt}},setLocked:function(nt){I=nt},setClear:function(nt){ft!==nt&&(ft=nt,ot&&(nt=1-nt),n.clearDepth(nt))},reset:function(){I=!1,Q=null,St=null,ft=null,ot=!1}}}function s(){let I=!1,ot=null,Q=null,St=null,ft=null,nt=null,Ct=null,qt=null,Re=null;return{setTest:function(de){I||(de?ht(n.STENCIL_TEST):Bt(n.STENCIL_TEST))},setMask:function(de){ot!==de&&!I&&(n.stencilMask(de),ot=de)},setFunc:function(de,$n,Un){(Q!==de||St!==$n||ft!==Un)&&(n.stencilFunc(de,$n,Un),Q=de,St=$n,ft=Un)},setOp:function(de,$n,Un){(nt!==de||Ct!==$n||qt!==Un)&&(n.stencilOp(de,$n,Un),nt=de,Ct=$n,qt=Un)},setLocked:function(de){I=de},setClear:function(de){Re!==de&&(n.clearStencil(de),Re=de)},reset:function(){I=!1,ot=null,Q=null,St=null,ft=null,nt=null,Ct=null,qt=null,Re=null}}}const r=new e,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let u={},f={},d={},g=new WeakMap,m=[],x=null,_=!1,h=null,v=null,y=null,T=null,L=null,C=null,w=null,p=new Ht(0,0,0),M=0,E=!1,R=null,P=null,D=null,G=null,N=null;const k=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,Z=0;const rt=n.getParameter(n.VERSION);rt.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(rt)[1]),B=Z>=1):rt.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(rt)[1]),B=Z>=2);let mt=null,At={};const It=n.getParameter(n.SCISSOR_BOX),ct=n.getParameter(n.VIEWPORT),vt=new Ue().fromArray(It),Mt=new Ue().fromArray(ct);function J(I,ot,Q,St){const ft=new Uint8Array(4),nt=n.createTexture();n.bindTexture(I,nt),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ct=0;Ct<Q;Ct++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(ot,0,n.RGBA,1,1,St,0,n.RGBA,n.UNSIGNED_BYTE,ft):n.texImage2D(ot+Ct,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ft);return nt}const xt={};xt[n.TEXTURE_2D]=J(n.TEXTURE_2D,n.TEXTURE_2D,1),xt[n.TEXTURE_CUBE_MAP]=J(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),xt[n.TEXTURE_2D_ARRAY]=J(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),xt[n.TEXTURE_3D]=J(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ht(n.DEPTH_TEST),o.setFunc(Ss),Le(!1),Se(Tc),ht(n.CULL_FACE),ge(ei);function ht(I){u[I]!==!0&&(n.enable(I),u[I]=!0)}function Bt(I){u[I]!==!1&&(n.disable(I),u[I]=!1)}function zt(I,ot){return d[I]!==ot?(n.bindFramebuffer(I,ot),d[I]=ot,I===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ot),I===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ot),!0):!1}function Vt(I,ot){let Q=m,St=!1;if(I){Q=g.get(ot),Q===void 0&&(Q=[],g.set(ot,Q));const ft=I.textures;if(Q.length!==ft.length||Q[0]!==n.COLOR_ATTACHMENT0){for(let nt=0,Ct=ft.length;nt<Ct;nt++)Q[nt]=n.COLOR_ATTACHMENT0+nt;Q.length=ft.length,St=!0}}else Q[0]!==n.BACK&&(Q[0]=n.BACK,St=!0);St&&n.drawBuffers(Q)}function be(I){return x!==I?(n.useProgram(I),x=I,!0):!1}const Jt={[Oi]:n.FUNC_ADD,[qh]:n.FUNC_SUBTRACT,[Yh]:n.FUNC_REVERSE_SUBTRACT};Jt[jh]=n.MIN,Jt[Kh]=n.MAX;const ue={[Zh]:n.ZERO,[Jh]:n.ONE,[Qh]:n.SRC_COLOR,[Ca]:n.SRC_ALPHA,[of]:n.SRC_ALPHA_SATURATE,[sf]:n.DST_COLOR,[ef]:n.DST_ALPHA,[tf]:n.ONE_MINUS_SRC_COLOR,[Pa]:n.ONE_MINUS_SRC_ALPHA,[rf]:n.ONE_MINUS_DST_COLOR,[nf]:n.ONE_MINUS_DST_ALPHA,[af]:n.CONSTANT_COLOR,[lf]:n.ONE_MINUS_CONSTANT_COLOR,[cf]:n.CONSTANT_ALPHA,[uf]:n.ONE_MINUS_CONSTANT_ALPHA};function ge(I,ot,Q,St,ft,nt,Ct,qt,Re,de){if(I===ei){_===!0&&(Bt(n.BLEND),_=!1);return}if(_===!1&&(ht(n.BLEND),_=!0),I!==$h){if(I!==h||de!==E){if((v!==Oi||L!==Oi)&&(n.blendEquation(n.FUNC_ADD),v=Oi,L=Oi),de)switch(I){case Ms:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case wc:n.blendFunc(n.ONE,n.ONE);break;case Ac:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Rc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:oe("WebGLState: Invalid blending: ",I);break}else switch(I){case Ms:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case wc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ac:oe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Rc:oe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:oe("WebGLState: Invalid blending: ",I);break}y=null,T=null,C=null,w=null,p.set(0,0,0),M=0,h=I,E=de}return}ft=ft||ot,nt=nt||Q,Ct=Ct||St,(ot!==v||ft!==L)&&(n.blendEquationSeparate(Jt[ot],Jt[ft]),v=ot,L=ft),(Q!==y||St!==T||nt!==C||Ct!==w)&&(n.blendFuncSeparate(ue[Q],ue[St],ue[nt],ue[Ct]),y=Q,T=St,C=nt,w=Ct),(qt.equals(p)===!1||Re!==M)&&(n.blendColor(qt.r,qt.g,qt.b,Re),p.copy(qt),M=Re),h=I,E=!1}function Kt(I,ot){I.side===Qn?Bt(n.CULL_FACE):ht(n.CULL_FACE);let Q=I.side===ln;ot&&(Q=!Q),Le(Q),I.blending===Ms&&I.transparent===!1?ge(ei):ge(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);const St=I.stencilWrite;a.setTest(St),St&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),O(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ht(n.SAMPLE_ALPHA_TO_COVERAGE):Bt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Le(I){R!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),R=I)}function Se(I){I!==Vh?(ht(n.CULL_FACE),I!==P&&(I===Tc?n.cullFace(n.BACK):I===Wh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Bt(n.CULL_FACE),P=I}function Be(I){I!==D&&(B&&n.lineWidth(I),D=I)}function O(I,ot,Q){I?(ht(n.POLYGON_OFFSET_FILL),(G!==ot||N!==Q)&&(G=ot,N=Q,o.getReversed()&&(ot=-ot),n.polygonOffset(ot,Q))):Bt(n.POLYGON_OFFSET_FILL)}function De(I){I?ht(n.SCISSOR_TEST):Bt(n.SCISSOR_TEST)}function ee(I){I===void 0&&(I=n.TEXTURE0+k-1),mt!==I&&(n.activeTexture(I),mt=I)}function K(I,ot,Q){Q===void 0&&(mt===null?Q=n.TEXTURE0+k-1:Q=mt);let St=At[Q];St===void 0&&(St={type:void 0,texture:void 0},At[Q]=St),(St.type!==I||St.texture!==ot)&&(mt!==Q&&(n.activeTexture(Q),mt=Q),n.bindTexture(I,ot||xt[I]),St.type=I,St.texture=ot)}function W(){const I=At[mt];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function wt(){try{n.compressedTexImage2D(...arguments)}catch(I){oe("WebGLState:",I)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(I){oe("WebGLState:",I)}}function b(){try{n.texSubImage2D(...arguments)}catch(I){oe("WebGLState:",I)}}function z(){try{n.texSubImage3D(...arguments)}catch(I){oe("WebGLState:",I)}}function X(){try{n.compressedTexSubImage2D(...arguments)}catch(I){oe("WebGLState:",I)}}function it(){try{n.compressedTexSubImage3D(...arguments)}catch(I){oe("WebGLState:",I)}}function at(){try{n.texStorage2D(...arguments)}catch(I){oe("WebGLState:",I)}}function lt(){try{n.texStorage3D(...arguments)}catch(I){oe("WebGLState:",I)}}function Y(){try{n.texImage2D(...arguments)}catch(I){oe("WebGLState:",I)}}function tt(){try{n.texImage3D(...arguments)}catch(I){oe("WebGLState:",I)}}function _t(I){return f[I]!==void 0?f[I]:n.getParameter(I)}function Et(I,ot){f[I]!==ot&&(n.pixelStorei(I,ot),f[I]=ot)}function dt(I){vt.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),vt.copy(I))}function ut(I){Mt.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),Mt.copy(I))}function kt(I,ot){let Q=l.get(ot);Q===void 0&&(Q=new WeakMap,l.set(ot,Q));let St=Q.get(I);St===void 0&&(St=n.getUniformBlockIndex(ot,I.name),Q.set(I,St))}function Dt(I,ot){const St=l.get(ot).get(I);c.get(ot)!==St&&(n.uniformBlockBinding(ot,St,I.__bindingPointIndex),c.set(ot,St))}function Rt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},mt=null,At={},d={},g=new WeakMap,m=[],x=null,_=!1,h=null,v=null,y=null,T=null,L=null,C=null,w=null,p=new Ht(0,0,0),M=0,E=!1,R=null,P=null,D=null,G=null,N=null,vt.set(0,0,n.canvas.width,n.canvas.height),Mt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ht,disable:Bt,bindFramebuffer:zt,drawBuffers:Vt,useProgram:be,setBlending:ge,setMaterial:Kt,setFlipSided:Le,setCullFace:Se,setLineWidth:Be,setPolygonOffset:O,setScissorTest:De,activeTexture:ee,bindTexture:K,unbindTexture:W,compressedTexImage2D:wt,compressedTexImage3D:A,texImage2D:Y,texImage3D:tt,pixelStorei:Et,getParameter:_t,updateUBOMapping:kt,uniformBlockBinding:Dt,texStorage2D:at,texStorage3D:lt,texSubImage2D:b,texSubImage3D:z,compressedTexSubImage2D:X,compressedTexSubImage3D:it,scissor:dt,viewport:ut,reset:Rt}}function ux(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Gt,u=new WeakMap,f=new Set;let d;const g=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,b){return m?new OffscreenCanvas(A,b):po("canvas")}function _(A,b,z){let X=1;const it=wt(A);if((it.width>z||it.height>z)&&(X=z/Math.max(it.width,it.height)),X<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const at=Math.floor(X*it.width),lt=Math.floor(X*it.height);d===void 0&&(d=x(at,lt));const Y=b?x(at,lt):d;return Y.width=at,Y.height=lt,Y.getContext("2d").drawImage(A,0,0,at,lt),Wt("WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+at+"x"+lt+")."),Y}else return"data"in A&&Wt("WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),A;return A}function h(A){return A.generateMipmaps}function v(A){n.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(A,b,z,X,it,at=!1){if(A!==null){if(n[A]!==void 0)return n[A];Wt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let lt;X&&(lt=t.get("EXT_texture_norm16"),lt||Wt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=b;if(b===n.RED&&(z===n.FLOAT&&(Y=n.R32F),z===n.HALF_FLOAT&&(Y=n.R16F),z===n.UNSIGNED_BYTE&&(Y=n.R8),z===n.UNSIGNED_SHORT&&lt&&(Y=lt.R16_EXT),z===n.SHORT&&lt&&(Y=lt.R16_SNORM_EXT)),b===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(Y=n.R8UI),z===n.UNSIGNED_SHORT&&(Y=n.R16UI),z===n.UNSIGNED_INT&&(Y=n.R32UI),z===n.BYTE&&(Y=n.R8I),z===n.SHORT&&(Y=n.R16I),z===n.INT&&(Y=n.R32I)),b===n.RG&&(z===n.FLOAT&&(Y=n.RG32F),z===n.HALF_FLOAT&&(Y=n.RG16F),z===n.UNSIGNED_BYTE&&(Y=n.RG8),z===n.UNSIGNED_SHORT&&lt&&(Y=lt.RG16_EXT),z===n.SHORT&&lt&&(Y=lt.RG16_SNORM_EXT)),b===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(Y=n.RG8UI),z===n.UNSIGNED_SHORT&&(Y=n.RG16UI),z===n.UNSIGNED_INT&&(Y=n.RG32UI),z===n.BYTE&&(Y=n.RG8I),z===n.SHORT&&(Y=n.RG16I),z===n.INT&&(Y=n.RG32I)),b===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),z===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),z===n.UNSIGNED_INT&&(Y=n.RGB32UI),z===n.BYTE&&(Y=n.RGB8I),z===n.SHORT&&(Y=n.RGB16I),z===n.INT&&(Y=n.RGB32I)),b===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),z===n.UNSIGNED_INT&&(Y=n.RGBA32UI),z===n.BYTE&&(Y=n.RGBA8I),z===n.SHORT&&(Y=n.RGBA16I),z===n.INT&&(Y=n.RGBA32I)),b===n.RGB&&(z===n.UNSIGNED_SHORT&&lt&&(Y=lt.RGB16_EXT),z===n.SHORT&&lt&&(Y=lt.RGB16_SNORM_EXT),z===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(Y=n.R11F_G11F_B10F)),b===n.RGBA){const tt=at?fo:se.getTransfer(it);z===n.FLOAT&&(Y=n.RGBA32F),z===n.HALF_FLOAT&&(Y=n.RGBA16F),z===n.UNSIGNED_BYTE&&(Y=tt===he?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT&&lt&&(Y=lt.RGBA16_EXT),z===n.SHORT&&lt&&(Y=lt.RGBA16_SNORM_EXT),z===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function L(A,b){let z;return A?b===null||b===Vn||b===sr?z=n.DEPTH24_STENCIL8:b===Cn?z=n.DEPTH32F_STENCIL8:b===ir&&(z=n.DEPTH24_STENCIL8,Wt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Vn||b===sr?z=n.DEPTH_COMPONENT24:b===Cn?z=n.DEPTH_COMPONENT32F:b===ir&&(z=n.DEPTH_COMPONENT16),z}function C(A,b){return h(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ye&&A.minFilter!==tn?Math.log2(Math.max(b.width,b.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?b.mipmaps.length:1}function w(A){const b=A.target;b.removeEventListener("dispose",w),M(b),b.isVideoTexture&&u.delete(b),b.isHTMLTexture&&f.delete(b)}function p(A){const b=A.target;b.removeEventListener("dispose",p),R(b)}function M(A){const b=i.get(A);if(b.__webglInit===void 0)return;const z=A.source,X=g.get(z);if(X){const it=X[b.__cacheKey];it.usedTimes--,it.usedTimes===0&&E(A),Object.keys(X).length===0&&g.delete(z)}i.remove(A)}function E(A){const b=i.get(A);n.deleteTexture(b.__webglTexture);const z=A.source,X=g.get(z);delete X[b.__cacheKey],o.memory.textures--}function R(A){const b=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(b.__webglFramebuffer[X]))for(let it=0;it<b.__webglFramebuffer[X].length;it++)n.deleteFramebuffer(b.__webglFramebuffer[X][it]);else n.deleteFramebuffer(b.__webglFramebuffer[X]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[X])}else{if(Array.isArray(b.__webglFramebuffer))for(let X=0;X<b.__webglFramebuffer.length;X++)n.deleteFramebuffer(b.__webglFramebuffer[X]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let X=0;X<b.__webglColorRenderbuffer.length;X++)b.__webglColorRenderbuffer[X]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[X]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const z=A.textures;for(let X=0,it=z.length;X<it;X++){const at=i.get(z[X]);at.__webglTexture&&(n.deleteTexture(at.__webglTexture),o.memory.textures--),i.remove(z[X])}i.remove(A)}let P=0;function D(){P=0}function G(){return P}function N(A){P=A}function k(){const A=P;return A>=s.maxTextures&&Wt("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),P+=1,A}function B(A){const b=[];return b.push(A.wrapS),b.push(A.wrapT),b.push(A.wrapR||0),b.push(A.magFilter),b.push(A.minFilter),b.push(A.anisotropy),b.push(A.internalFormat),b.push(A.format),b.push(A.type),b.push(A.generateMipmaps),b.push(A.premultiplyAlpha),b.push(A.flipY),b.push(A.unpackAlignment),b.push(A.colorSpace),b.join()}function Z(A,b){const z=i.get(A);if(A.isVideoTexture&&K(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&z.__version!==A.version){const X=A.image;if(X===null)Wt("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Wt("WebGLRenderer: Texture marked for update but image is incomplete");else{Bt(z,A,b);return}}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+b)}function rt(A,b){const z=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){Bt(z,A,b);return}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+b)}function mt(A,b){const z=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){Bt(z,A,b);return}e.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+b)}function At(A,b){const z=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&z.__version!==A.version){zt(z,A,b);return}e.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+b)}const It={[nr]:n.REPEAT,[ti]:n.CLAMP_TO_EDGE,[za]:n.MIRRORED_REPEAT},ct={[Ye]:n.NEAREST,[ff]:n.NEAREST_MIPMAP_NEAREST,[_r]:n.NEAREST_MIPMAP_LINEAR,[tn]:n.LINEAR,[Fo]:n.LINEAR_MIPMAP_NEAREST,[zi]:n.LINEAR_MIPMAP_LINEAR},vt={[gf]:n.NEVER,[bf]:n.ALWAYS,[_f]:n.LESS,[Ol]:n.LEQUAL,[xf]:n.EQUAL,[Fl]:n.GEQUAL,[vf]:n.GREATER,[Mf]:n.NOTEQUAL};function Mt(A,b){if(b.type===Cn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===tn||b.magFilter===Fo||b.magFilter===_r||b.magFilter===zi||b.minFilter===tn||b.minFilter===Fo||b.minFilter===_r||b.minFilter===zi)&&Wt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,It[b.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,It[b.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,It[b.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,ct[b.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,ct[b.minFilter]),b.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,vt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ye||b.minFilter!==_r&&b.minFilter!==zi||b.type===Cn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");n.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function J(A,b){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,b.addEventListener("dispose",w));const X=b.source;let it=g.get(X);it===void 0&&(it={},g.set(X,it));const at=B(b);if(at!==A.__cacheKey){it[at]===void 0&&(it[at]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,z=!0),it[at].usedTimes++;const lt=it[A.__cacheKey];lt!==void 0&&(it[A.__cacheKey].usedTimes--,lt.usedTimes===0&&E(b)),A.__cacheKey=at,A.__webglTexture=it[at].texture}return z}function xt(A,b,z){return Math.floor(Math.floor(A/z)/b)}function ht(A,b,z,X){const at=A.updateRanges;if(at.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,z,X,b.data);else{at.sort((Et,dt)=>Et.start-dt.start);let lt=0;for(let Et=1;Et<at.length;Et++){const dt=at[lt],ut=at[Et],kt=dt.start+dt.count,Dt=xt(ut.start,b.width,4),Rt=xt(dt.start,b.width,4);ut.start<=kt+1&&Dt===Rt&&xt(ut.start+ut.count-1,b.width,4)===Dt?dt.count=Math.max(dt.count,ut.start+ut.count-dt.start):(++lt,at[lt]=ut)}at.length=lt+1;const Y=e.getParameter(n.UNPACK_ROW_LENGTH),tt=e.getParameter(n.UNPACK_SKIP_PIXELS),_t=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let Et=0,dt=at.length;Et<dt;Et++){const ut=at[Et],kt=Math.floor(ut.start/4),Dt=Math.ceil(ut.count/4),Rt=kt%b.width,I=Math.floor(kt/b.width),ot=Dt,Q=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Rt),e.pixelStorei(n.UNPACK_SKIP_ROWS,I),e.texSubImage2D(n.TEXTURE_2D,0,Rt,I,ot,Q,z,X,b.data)}A.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Y),e.pixelStorei(n.UNPACK_SKIP_PIXELS,tt),e.pixelStorei(n.UNPACK_SKIP_ROWS,_t)}}function Bt(A,b,z){let X=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(X=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(X=n.TEXTURE_3D);const it=J(A,b),at=b.source;e.bindTexture(X,A.__webglTexture,n.TEXTURE0+z);const lt=i.get(at);if(at.version!==lt.__version||it===!0){if(e.activeTexture(n.TEXTURE0+z),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const Q=se.getPrimaries(se.workingColorSpace),St=b.colorSpace===bi?null:se.getPrimaries(b.colorSpace),ft=b.colorSpace===bi||Q===St?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft)}e.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment);let tt=_(b.image,!1,s.maxTextureSize);tt=W(b,tt);const _t=r.convert(b.format,b.colorSpace),Et=r.convert(b.type);let dt=T(b.internalFormat,_t,Et,b.normalized,b.colorSpace,b.isVideoTexture);Mt(X,b);let ut;const kt=b.mipmaps,Dt=b.isVideoTexture!==!0,Rt=lt.__version===void 0||it===!0,I=at.dataReady,ot=C(b,tt);if(b.isDepthTexture)dt=L(b.format===Bi,b.type),Rt&&(Dt?e.texStorage2D(n.TEXTURE_2D,1,dt,tt.width,tt.height):e.texImage2D(n.TEXTURE_2D,0,dt,tt.width,tt.height,0,_t,Et,null));else if(b.isDataTexture)if(kt.length>0){Dt&&Rt&&e.texStorage2D(n.TEXTURE_2D,ot,dt,kt[0].width,kt[0].height);for(let Q=0,St=kt.length;Q<St;Q++)ut=kt[Q],Dt?I&&e.texSubImage2D(n.TEXTURE_2D,Q,0,0,ut.width,ut.height,_t,Et,ut.data):e.texImage2D(n.TEXTURE_2D,Q,dt,ut.width,ut.height,0,_t,Et,ut.data);b.generateMipmaps=!1}else Dt?(Rt&&e.texStorage2D(n.TEXTURE_2D,ot,dt,tt.width,tt.height),I&&ht(b,tt,_t,Et)):e.texImage2D(n.TEXTURE_2D,0,dt,tt.width,tt.height,0,_t,Et,tt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Dt&&Rt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ot,dt,kt[0].width,kt[0].height,tt.depth);for(let Q=0,St=kt.length;Q<St;Q++)if(ut=kt[Q],b.format!==Pn)if(_t!==null)if(Dt){if(I)if(b.layerUpdates.size>0){const ft=uu(ut.width,ut.height,b.format,b.type);for(const nt of b.layerUpdates){const Ct=ut.data.subarray(nt*ft/ut.data.BYTES_PER_ELEMENT,(nt+1)*ft/ut.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,nt,ut.width,ut.height,1,_t,Ct)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,ut.width,ut.height,tt.depth,_t,ut.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Q,dt,ut.width,ut.height,tt.depth,0,ut.data,0,0);else Wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?I&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,ut.width,ut.height,tt.depth,_t,Et,ut.data):e.texImage3D(n.TEXTURE_2D_ARRAY,Q,dt,ut.width,ut.height,tt.depth,0,_t,Et,ut.data)}else{Dt&&Rt&&e.texStorage2D(n.TEXTURE_2D,ot,dt,kt[0].width,kt[0].height);for(let Q=0,St=kt.length;Q<St;Q++)ut=kt[Q],b.format!==Pn?_t!==null?Dt?I&&e.compressedTexSubImage2D(n.TEXTURE_2D,Q,0,0,ut.width,ut.height,_t,ut.data):e.compressedTexImage2D(n.TEXTURE_2D,Q,dt,ut.width,ut.height,0,ut.data):Wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?I&&e.texSubImage2D(n.TEXTURE_2D,Q,0,0,ut.width,ut.height,_t,Et,ut.data):e.texImage2D(n.TEXTURE_2D,Q,dt,ut.width,ut.height,0,_t,Et,ut.data)}else if(b.isDataArrayTexture)if(Dt){if(Rt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ot,dt,tt.width,tt.height,tt.depth),I)if(b.layerUpdates.size>0){const Q=uu(tt.width,tt.height,b.format,b.type);for(const St of b.layerUpdates){const ft=tt.data.subarray(St*Q/tt.data.BYTES_PER_ELEMENT,(St+1)*Q/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,St,tt.width,tt.height,1,_t,Et,ft)}b.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,_t,Et,tt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,dt,tt.width,tt.height,tt.depth,0,_t,Et,tt.data);else if(b.isData3DTexture)Dt?(Rt&&e.texStorage3D(n.TEXTURE_3D,ot,dt,tt.width,tt.height,tt.depth),I&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,_t,Et,tt.data)):e.texImage3D(n.TEXTURE_3D,0,dt,tt.width,tt.height,tt.depth,0,_t,Et,tt.data);else if(b.isFramebufferTexture){if(Rt)if(Dt)e.texStorage2D(n.TEXTURE_2D,ot,dt,tt.width,tt.height);else{let Q=tt.width,St=tt.height;for(let ft=0;ft<ot;ft++)e.texImage2D(n.TEXTURE_2D,ft,dt,Q,St,0,_t,Et,null),Q>>=1,St>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in n){const Q=n.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),tt.parentNode!==Q){Q.appendChild(tt),f.add(b),Q.onpaint=qt=>{const Re=qt.changedElements;for(const de of f)Re.includes(de.image)&&(de.needsUpdate=!0)},Q.requestPaint();return}const St=0,ft=n.RGBA,nt=n.RGBA,Ct=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,St,ft,nt,Ct,tt),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(kt.length>0){if(Dt&&Rt){const Q=wt(kt[0]);e.texStorage2D(n.TEXTURE_2D,ot,dt,Q.width,Q.height)}for(let Q=0,St=kt.length;Q<St;Q++)ut=kt[Q],Dt?I&&e.texSubImage2D(n.TEXTURE_2D,Q,0,0,_t,Et,ut):e.texImage2D(n.TEXTURE_2D,Q,dt,_t,Et,ut);b.generateMipmaps=!1}else if(Dt){if(Rt){const Q=wt(tt);e.texStorage2D(n.TEXTURE_2D,ot,dt,Q.width,Q.height)}I&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,_t,Et,tt)}else e.texImage2D(n.TEXTURE_2D,0,dt,_t,Et,tt);h(b)&&v(X),lt.__version=at.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function zt(A,b,z){if(b.image.length!==6)return;const X=J(A,b),it=b.source;e.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+z);const at=i.get(it);if(it.version!==at.__version||X===!0){e.activeTexture(n.TEXTURE0+z);const lt=se.getPrimaries(se.workingColorSpace),Y=b.colorSpace===bi?null:se.getPrimaries(b.colorSpace),tt=b.colorSpace===bi||lt===Y?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);const _t=b.isCompressedTexture||b.image[0].isCompressedTexture,Et=b.image[0]&&b.image[0].isDataTexture,dt=[];for(let nt=0;nt<6;nt++)!_t&&!Et?dt[nt]=_(b.image[nt],!0,s.maxCubemapSize):dt[nt]=Et?b.image[nt].image:b.image[nt],dt[nt]=W(b,dt[nt]);const ut=dt[0],kt=r.convert(b.format,b.colorSpace),Dt=r.convert(b.type),Rt=T(b.internalFormat,kt,Dt,b.normalized,b.colorSpace),I=b.isVideoTexture!==!0,ot=at.__version===void 0||X===!0,Q=it.dataReady;let St=C(b,ut);Mt(n.TEXTURE_CUBE_MAP,b);let ft;if(_t){I&&ot&&e.texStorage2D(n.TEXTURE_CUBE_MAP,St,Rt,ut.width,ut.height);for(let nt=0;nt<6;nt++){ft=dt[nt].mipmaps;for(let Ct=0;Ct<ft.length;Ct++){const qt=ft[Ct];b.format!==Pn?kt!==null?I?Q&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ct,0,0,qt.width,qt.height,kt,qt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ct,Rt,qt.width,qt.height,0,qt.data):Wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ct,0,0,qt.width,qt.height,kt,Dt,qt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ct,Rt,qt.width,qt.height,0,kt,Dt,qt.data)}}}else{if(ft=b.mipmaps,I&&ot){ft.length>0&&St++;const nt=wt(dt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,St,Rt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(Et){I?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,dt[nt].width,dt[nt].height,kt,Dt,dt[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Rt,dt[nt].width,dt[nt].height,0,kt,Dt,dt[nt].data);for(let Ct=0;Ct<ft.length;Ct++){const Re=ft[Ct].image[nt].image;I?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ct+1,0,0,Re.width,Re.height,kt,Dt,Re.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ct+1,Rt,Re.width,Re.height,0,kt,Dt,Re.data)}}else{I?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,kt,Dt,dt[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Rt,kt,Dt,dt[nt]);for(let Ct=0;Ct<ft.length;Ct++){const qt=ft[Ct];I?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ct+1,0,0,kt,Dt,qt.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ct+1,Rt,kt,Dt,qt.image[nt])}}}h(b)&&v(n.TEXTURE_CUBE_MAP),at.__version=it.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function Vt(A,b,z,X,it,at){const lt=r.convert(z.format,z.colorSpace),Y=r.convert(z.type),tt=T(z.internalFormat,lt,Y,z.normalized,z.colorSpace),_t=i.get(b),Et=i.get(z);if(Et.__renderTarget=b,!_t.__hasExternalTextures){const dt=Math.max(1,b.width>>at),ut=Math.max(1,b.height>>at);it===n.TEXTURE_3D||it===n.TEXTURE_2D_ARRAY?e.texImage3D(it,at,tt,dt,ut,b.depth,0,lt,Y,null):e.texImage2D(it,at,tt,dt,ut,0,lt,Y,null)}e.bindFramebuffer(n.FRAMEBUFFER,A),ee(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,X,it,Et.__webglTexture,0,De(b)):(it===n.TEXTURE_2D||it>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,X,it,Et.__webglTexture,at),e.bindFramebuffer(n.FRAMEBUFFER,null)}function be(A,b,z){if(n.bindRenderbuffer(n.RENDERBUFFER,A),b.depthBuffer){const X=b.depthTexture,it=X&&X.isDepthTexture?X.type:null,at=L(b.stencilBuffer,it),lt=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ee(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,De(b),at,b.width,b.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,De(b),at,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,at,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,lt,n.RENDERBUFFER,A)}else{const X=b.textures;for(let it=0;it<X.length;it++){const at=X[it],lt=r.convert(at.format,at.colorSpace),Y=r.convert(at.type),tt=T(at.internalFormat,lt,Y,at.normalized,at.colorSpace);ee(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,De(b),tt,b.width,b.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,De(b),tt,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,tt,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Jt(A,b,z){const X=b.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,A),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const it=i.get(b.depthTexture);if(it.__renderTarget=b,(!it.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),X){if(it.__webglInit===void 0&&(it.__webglInit=!0,b.depthTexture.addEventListener("dispose",w)),it.__webglTexture===void 0){it.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,it.__webglTexture),Mt(n.TEXTURE_CUBE_MAP,b.depthTexture);const _t=r.convert(b.depthTexture.format),Et=r.convert(b.depthTexture.type);let dt;b.depthTexture.format===oi?dt=n.DEPTH_COMPONENT24:b.depthTexture.format===Bi&&(dt=n.DEPTH24_STENCIL8);for(let ut=0;ut<6;ut++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,dt,b.width,b.height,0,_t,Et,null)}}else Z(b.depthTexture,0);const at=it.__webglTexture,lt=De(b),Y=X?n.TEXTURE_CUBE_MAP_POSITIVE_X+z:n.TEXTURE_2D,tt=b.depthTexture.format===Bi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(b.depthTexture.format===oi)ee(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,tt,Y,at,0,lt):n.framebufferTexture2D(n.FRAMEBUFFER,tt,Y,at,0);else if(b.depthTexture.format===Bi)ee(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,tt,Y,at,0,lt):n.framebufferTexture2D(n.FRAMEBUFFER,tt,Y,at,0);else throw new Error("Unknown depthTexture format")}function ue(A){const b=i.get(A),z=A.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==A.depthTexture){const X=A.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),X){const it=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,X.removeEventListener("dispose",it)};X.addEventListener("dispose",it),b.__depthDisposeCallback=it}b.__boundDepthTexture=X}if(A.depthTexture&&!b.__autoAllocateDepthBuffer)if(z)for(let X=0;X<6;X++)Jt(b.__webglFramebuffer[X],A,X);else{const X=A.texture.mipmaps;X&&X.length>0?Jt(b.__webglFramebuffer[0],A,0):Jt(b.__webglFramebuffer,A,0)}else if(z){b.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[X]),b.__webglDepthbuffer[X]===void 0)b.__webglDepthbuffer[X]=n.createRenderbuffer(),be(b.__webglDepthbuffer[X],A,!1);else{const it=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=b.__webglDepthbuffer[X];n.bindRenderbuffer(n.RENDERBUFFER,at),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,at)}}else{const X=A.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),be(b.__webglDepthbuffer,A,!1);else{const it=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,at),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,at)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function ge(A,b,z){const X=i.get(A);b!==void 0&&Vt(X.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&ue(A)}function Kt(A){const b=A.texture,z=i.get(A),X=i.get(b);A.addEventListener("dispose",p);const it=A.textures,at=A.isWebGLCubeRenderTarget===!0,lt=it.length>1;if(lt||(X.__webglTexture===void 0&&(X.__webglTexture=n.createTexture()),X.__version=b.version,o.memory.textures++),at){z.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer[Y]=[];for(let tt=0;tt<b.mipmaps.length;tt++)z.__webglFramebuffer[Y][tt]=n.createFramebuffer()}else z.__webglFramebuffer[Y]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer=[];for(let Y=0;Y<b.mipmaps.length;Y++)z.__webglFramebuffer[Y]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(lt)for(let Y=0,tt=it.length;Y<tt;Y++){const _t=i.get(it[Y]);_t.__webglTexture===void 0&&(_t.__webglTexture=n.createTexture(),o.memory.textures++)}if(A.samples>0&&ee(A)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Y=0;Y<it.length;Y++){const tt=it[Y];z.__webglColorRenderbuffer[Y]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[Y]);const _t=r.convert(tt.format,tt.colorSpace),Et=r.convert(tt.type),dt=T(tt.internalFormat,_t,Et,tt.normalized,tt.colorSpace,A.isXRRenderTarget===!0),ut=De(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,ut,dt,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Y,n.RENDERBUFFER,z.__webglColorRenderbuffer[Y])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),be(z.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(at){e.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),Mt(n.TEXTURE_CUBE_MAP,b);for(let Y=0;Y<6;Y++)if(b.mipmaps&&b.mipmaps.length>0)for(let tt=0;tt<b.mipmaps.length;tt++)Vt(z.__webglFramebuffer[Y][tt],A,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,tt);else Vt(z.__webglFramebuffer[Y],A,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);h(b)&&v(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){for(let Y=0,tt=it.length;Y<tt;Y++){const _t=it[Y],Et=i.get(_t);let dt=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(dt=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(dt,Et.__webglTexture),Mt(dt,_t),Vt(z.__webglFramebuffer,A,_t,n.COLOR_ATTACHMENT0+Y,dt,0),h(_t)&&v(dt)}e.unbindTexture()}else{let Y=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Y=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Y,X.__webglTexture),Mt(Y,b),b.mipmaps&&b.mipmaps.length>0)for(let tt=0;tt<b.mipmaps.length;tt++)Vt(z.__webglFramebuffer[tt],A,b,n.COLOR_ATTACHMENT0,Y,tt);else Vt(z.__webglFramebuffer,A,b,n.COLOR_ATTACHMENT0,Y,0);h(b)&&v(Y),e.unbindTexture()}A.depthBuffer&&ue(A)}function Le(A){const b=A.textures;for(let z=0,X=b.length;z<X;z++){const it=b[z];if(h(it)){const at=y(A),lt=i.get(it).__webglTexture;e.bindTexture(at,lt),v(at),e.unbindTexture()}}}const Se=[],Be=[];function O(A){if(A.samples>0){if(ee(A)===!1){const b=A.textures,z=A.width,X=A.height;let it=n.COLOR_BUFFER_BIT;const at=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=i.get(A),Y=b.length>1;if(Y)for(let _t=0;_t<b.length;_t++)e.bindFramebuffer(n.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,lt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);const tt=A.texture.mipmaps;tt&&tt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let _t=0;_t<b.length;_t++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(it|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(it|=n.STENCIL_BUFFER_BIT)),Y){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,lt.__webglColorRenderbuffer[_t]);const Et=i.get(b[_t]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Et,0)}n.blitFramebuffer(0,0,z,X,0,0,z,X,it,n.NEAREST),c===!0&&(Se.length=0,Be.length=0,Se.push(n.COLOR_ATTACHMENT0+_t),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Se.push(at),Be.push(at),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Be)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Se))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Y)for(let _t=0;_t<b.length;_t++){e.bindFramebuffer(n.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,lt.__webglColorRenderbuffer[_t]);const Et=i.get(b[_t]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,lt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,Et,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const b=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function De(A){return Math.min(s.maxSamples,A.samples)}function ee(A){const b=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function K(A){const b=o.render.frame;u.get(A)!==b&&(u.set(A,b),A.update())}function W(A,b){const z=A.colorSpace,X=A.format,it=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==ho&&z!==bi&&(se.getTransfer(z)===he?(X!==Pn||it!==gn)&&Wt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):oe("WebGLTextures: Unsupported texture color space:",z)),b}function wt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=D,this.getTextureUnits=G,this.setTextureUnits=N,this.setTexture2D=Z,this.setTexture2DArray=rt,this.setTexture3D=mt,this.setTextureCube=At,this.rebindTextures=ge,this.setupRenderTarget=Kt,this.updateRenderTargetMipmap=Le,this.updateMultisampleRenderTarget=O,this.setupDepthRenderbuffer=ue,this.setupFrameBufferTexture=Vt,this.useMultisampledRTT=ee,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function dx(n,t){function e(i,s=bi){let r;const o=se.getTransfer(s);if(i===gn)return n.UNSIGNED_BYTE;if(i===Pl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ll)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Rd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Cd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===wd)return n.BYTE;if(i===Ad)return n.SHORT;if(i===ir)return n.UNSIGNED_SHORT;if(i===Cl)return n.INT;if(i===Vn)return n.UNSIGNED_INT;if(i===Cn)return n.FLOAT;if(i===ri)return n.HALF_FLOAT;if(i===Pd)return n.ALPHA;if(i===Ld)return n.RGB;if(i===Pn)return n.RGBA;if(i===oi)return n.DEPTH_COMPONENT;if(i===Bi)return n.DEPTH_STENCIL;if(i===Dl)return n.RED;if(i===Il)return n.RED_INTEGER;if(i===Wi)return n.RG;if(i===Nl)return n.RG_INTEGER;if(i===Ul)return n.RGBA_INTEGER;if(i===to||i===eo||i===no||i===io)if(o===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===to)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===no)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===to)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===eo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===no)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===io)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ba||i===ka||i===Ga||i===Ha)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ba)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ka)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ga)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ha)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Va||i===Wa||i===Xa||i===$a||i===qa||i===lo||i===Ya)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Va||i===Wa)return o===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Xa)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===$a)return r.COMPRESSED_R11_EAC;if(i===qa)return r.COMPRESSED_SIGNED_R11_EAC;if(i===lo)return r.COMPRESSED_RG11_EAC;if(i===Ya)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ja||i===Ka||i===Za||i===Ja||i===Qa||i===tl||i===el||i===nl||i===il||i===sl||i===rl||i===ol||i===al||i===ll)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ja)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ka)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Za)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ja)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Qa)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===tl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===el)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===nl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===il)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===sl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===rl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ol)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===al)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ll)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===cl||i===ul||i===dl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===cl)return o===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ul)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===dl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===hl||i===fl||i===co||i===pl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===hl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===fl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===co)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===pl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===sr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const hx=`
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

}`;class px{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Gd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Xn({vertexShader:hx,fragmentShader:fx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new $t(new Ts(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class mx extends Ri{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,d=null,g=null,m=null;const x=typeof XRWebGLBinding<"u",_=new px,h={},v=e.getContextAttributes();let y=null,T=null;const L=[],C=[],w=new Gt;let p=null;const M=new un;M.viewport=new Ue;const E=new un;E.viewport=new Ue;const R=[M,E],P=new Ep;let D=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let xt=L[J];return xt===void 0&&(xt=new Vo,L[J]=xt),xt.getTargetRaySpace()},this.getControllerGrip=function(J){let xt=L[J];return xt===void 0&&(xt=new Vo,L[J]=xt),xt.getGripSpace()},this.getHand=function(J){let xt=L[J];return xt===void 0&&(xt=new Vo,L[J]=xt),xt.getHandSpace()};function N(J){const xt=C.indexOf(J.inputSource);if(xt===-1)return;const ht=L[xt];ht!==void 0&&(ht.update(J.inputSource,J.frame,l||o),ht.dispatchEvent({type:J.type,data:J.inputSource}))}function k(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",B);for(let J=0;J<L.length;J++){const xt=C[J];xt!==null&&(C[J]=null,L[J].disconnect(xt))}D=null,G=null,_.reset();for(const J in h)delete h[J];t.setRenderTarget(y),g=null,d=null,f=null,s=null,T=null,Mt.stop(),i.isPresenting=!1,t.setPixelRatio(p),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,i.isPresenting===!0&&Wt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,i.isPresenting===!0&&Wt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",k),s.addEventListener("inputsourceschange",B),v.xrCompatible!==!0&&await e.makeXRCompatible(),p=t.getPixelRatio(),t.getSize(w),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ht=null,Bt=null,zt=null;v.depth&&(zt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=v.stencil?Bi:oi,Bt=v.stencil?sr:Vn);const Vt={colorFormat:e.RGBA8,depthFormat:zt,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(Vt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),T=new Hn(d.textureWidth,d.textureHeight,{format:Pn,type:gn,depthTexture:new Es(d.textureWidth,d.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ht={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,e,ht),s.updateRenderState({baseLayer:g}),t.setPixelRatio(1),t.setSize(g.framebufferWidth,g.framebufferHeight,!1),T=new Hn(g.framebufferWidth,g.framebufferHeight,{format:Pn,type:gn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Mt.setContext(s),Mt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function B(J){for(let xt=0;xt<J.removed.length;xt++){const ht=J.removed[xt],Bt=C.indexOf(ht);Bt>=0&&(C[Bt]=null,L[Bt].disconnect(ht))}for(let xt=0;xt<J.added.length;xt++){const ht=J.added[xt];let Bt=C.indexOf(ht);if(Bt===-1){for(let Vt=0;Vt<L.length;Vt++)if(Vt>=C.length){C.push(ht),Bt=Vt;break}else if(C[Vt]===null){C[Vt]=ht,Bt=Vt;break}if(Bt===-1)break}const zt=L[Bt];zt&&zt.connect(ht)}}const Z=new U,rt=new U;function mt(J,xt,ht){Z.setFromMatrixPosition(xt.matrixWorld),rt.setFromMatrixPosition(ht.matrixWorld);const Bt=Z.distanceTo(rt),zt=xt.projectionMatrix.elements,Vt=ht.projectionMatrix.elements,be=zt[14]/(zt[10]-1),Jt=zt[14]/(zt[10]+1),ue=(zt[9]+1)/zt[5],ge=(zt[9]-1)/zt[5],Kt=(zt[8]-1)/zt[0],Le=(Vt[8]+1)/Vt[0],Se=be*Kt,Be=be*Le,O=Bt/(-Kt+Le),De=O*-Kt;if(xt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(De),J.translateZ(O),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),zt[10]===-1)J.projectionMatrix.copy(xt.projectionMatrix),J.projectionMatrixInverse.copy(xt.projectionMatrixInverse);else{const ee=be+O,K=Jt+O,W=Se-De,wt=Be+(Bt-De),A=ue*Jt/K*ee,b=ge*Jt/K*ee;J.projectionMatrix.makePerspective(W,wt,A,b,ee,K),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function At(J,xt){xt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(xt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let xt=J.near,ht=J.far;_.texture!==null&&(_.depthNear>0&&(xt=_.depthNear),_.depthFar>0&&(ht=_.depthFar)),P.near=E.near=M.near=xt,P.far=E.far=M.far=ht,(D!==P.near||G!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),D=P.near,G=P.far),P.layers.mask=J.layers.mask|6,M.layers.mask=P.layers.mask&-5,E.layers.mask=P.layers.mask&-3;const Bt=J.parent,zt=P.cameras;At(P,Bt);for(let Vt=0;Vt<zt.length;Vt++)At(zt[Vt],Bt);zt.length===2?mt(P,M,E):P.projectionMatrix.copy(M.projectionMatrix),It(J,P,Bt)};function It(J,xt,ht){ht===null?J.matrix.copy(xt.matrixWorld):(J.matrix.copy(ht.matrixWorld),J.matrix.invert(),J.matrix.multiply(xt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(xt.projectionMatrix),J.projectionMatrixInverse.copy(xt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=or*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(d===null&&g===null))return c},this.setFoveation=function(J){c=J,d!==null&&(d.fixedFoveation=J),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=J)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(P)},this.getCameraTexture=function(J){return h[J]};let ct=null;function vt(J,xt){if(u=xt.getViewerPose(l||o),m=xt,u!==null){const ht=u.views;g!==null&&(t.setRenderTargetFramebuffer(T,g.framebuffer),t.setRenderTarget(T));let Bt=!1;ht.length!==P.cameras.length&&(P.cameras.length=0,Bt=!0);for(let Jt=0;Jt<ht.length;Jt++){const ue=ht[Jt];let ge=null;if(g!==null)ge=g.getViewport(ue);else{const Le=f.getViewSubImage(d,ue);ge=Le.viewport,Jt===0&&(t.setRenderTargetTextures(T,Le.colorTexture,Le.depthStencilTexture),t.setRenderTarget(T))}let Kt=R[Jt];Kt===void 0&&(Kt=new un,Kt.layers.enable(Jt),Kt.viewport=new Ue,R[Jt]=Kt),Kt.matrix.fromArray(ue.transform.matrix),Kt.matrix.decompose(Kt.position,Kt.quaternion,Kt.scale),Kt.projectionMatrix.fromArray(ue.projectionMatrix),Kt.projectionMatrixInverse.copy(Kt.projectionMatrix).invert(),Kt.viewport.set(ge.x,ge.y,ge.width,ge.height),Jt===0&&(P.matrix.copy(Kt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Bt===!0&&P.cameras.push(Kt)}const zt=s.enabledFeatures;if(zt&&zt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const Jt=f.getDepthInformation(ht[0]);Jt&&Jt.isValid&&Jt.texture&&_.init(Jt,s.renderState)}if(zt&&zt.includes("camera-access")&&x){t.state.unbindTexture(),f=i.getBinding();for(let Jt=0;Jt<ht.length;Jt++){const ue=ht[Jt].camera;if(ue){let ge=h[ue];ge||(ge=new Gd,h[ue]=ge);const Kt=f.getCameraImage(ue);ge.sourceTexture=Kt}}}}for(let ht=0;ht<L.length;ht++){const Bt=C[ht],zt=L[ht];Bt!==null&&zt!==void 0&&zt.update(Bt,xt,l||o)}ct&&ct(J,xt),xt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:xt}),m=null}const Mt=new jd;Mt.setAnimationLoop(vt),this.setAnimationLoop=function(J){ct=J},this.dispose=function(){}}}const gx=new me,nh=new Yt;nh.set(-1,0,0,0,1,0,0,0,1);function _x(n,t){function e(_,h){_.matrixAutoUpdate===!0&&_.updateMatrix(),h.value.copy(_.matrix)}function i(_,h){h.color.getRGB(_.fogColor.value,Hd(n)),h.isFog?(_.fogNear.value=h.near,_.fogFar.value=h.far):h.isFogExp2&&(_.fogDensity.value=h.density)}function s(_,h,v,y,T){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(_,h):h.isMeshLambertMaterial?(r(_,h),h.envMap&&(_.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(_,h),f(_,h)):h.isMeshPhongMaterial?(r(_,h),u(_,h),h.envMap&&(_.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(_,h),d(_,h),h.isMeshPhysicalMaterial&&g(_,h,T)):h.isMeshMatcapMaterial?(r(_,h),m(_,h)):h.isMeshDepthMaterial?r(_,h):h.isMeshDistanceMaterial?(r(_,h),x(_,h)):h.isMeshNormalMaterial?r(_,h):h.isLineBasicMaterial?(o(_,h),h.isLineDashedMaterial&&a(_,h)):h.isPointsMaterial?c(_,h,v,y):h.isSpriteMaterial?l(_,h):h.isShadowMaterial?(_.color.value.copy(h.color),_.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(_,h){_.opacity.value=h.opacity,h.color&&_.diffuse.value.copy(h.color),h.emissive&&_.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(_.map.value=h.map,e(h.map,_.mapTransform)),h.alphaMap&&(_.alphaMap.value=h.alphaMap,e(h.alphaMap,_.alphaMapTransform)),h.bumpMap&&(_.bumpMap.value=h.bumpMap,e(h.bumpMap,_.bumpMapTransform),_.bumpScale.value=h.bumpScale,h.side===ln&&(_.bumpScale.value*=-1)),h.normalMap&&(_.normalMap.value=h.normalMap,e(h.normalMap,_.normalMapTransform),_.normalScale.value.copy(h.normalScale),h.side===ln&&_.normalScale.value.negate()),h.displacementMap&&(_.displacementMap.value=h.displacementMap,e(h.displacementMap,_.displacementMapTransform),_.displacementScale.value=h.displacementScale,_.displacementBias.value=h.displacementBias),h.emissiveMap&&(_.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,_.emissiveMapTransform)),h.specularMap&&(_.specularMap.value=h.specularMap,e(h.specularMap,_.specularMapTransform)),h.alphaTest>0&&(_.alphaTest.value=h.alphaTest);const v=t.get(h),y=v.envMap,T=v.envMapRotation;y&&(_.envMap.value=y,_.envMapRotation.value.setFromMatrix4(gx.makeRotationFromEuler(T)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&_.envMapRotation.value.premultiply(nh),_.reflectivity.value=h.reflectivity,_.ior.value=h.ior,_.refractionRatio.value=h.refractionRatio),h.lightMap&&(_.lightMap.value=h.lightMap,_.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,_.lightMapTransform)),h.aoMap&&(_.aoMap.value=h.aoMap,_.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,_.aoMapTransform))}function o(_,h){_.diffuse.value.copy(h.color),_.opacity.value=h.opacity,h.map&&(_.map.value=h.map,e(h.map,_.mapTransform))}function a(_,h){_.dashSize.value=h.dashSize,_.totalSize.value=h.dashSize+h.gapSize,_.scale.value=h.scale}function c(_,h,v,y){_.diffuse.value.copy(h.color),_.opacity.value=h.opacity,_.size.value=h.size*v,_.scale.value=y*.5,h.map&&(_.map.value=h.map,e(h.map,_.uvTransform)),h.alphaMap&&(_.alphaMap.value=h.alphaMap,e(h.alphaMap,_.alphaMapTransform)),h.alphaTest>0&&(_.alphaTest.value=h.alphaTest)}function l(_,h){_.diffuse.value.copy(h.color),_.opacity.value=h.opacity,_.rotation.value=h.rotation,h.map&&(_.map.value=h.map,e(h.map,_.mapTransform)),h.alphaMap&&(_.alphaMap.value=h.alphaMap,e(h.alphaMap,_.alphaMapTransform)),h.alphaTest>0&&(_.alphaTest.value=h.alphaTest)}function u(_,h){_.specular.value.copy(h.specular),_.shininess.value=Math.max(h.shininess,1e-4)}function f(_,h){h.gradientMap&&(_.gradientMap.value=h.gradientMap)}function d(_,h){_.metalness.value=h.metalness,h.metalnessMap&&(_.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,_.metalnessMapTransform)),_.roughness.value=h.roughness,h.roughnessMap&&(_.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,_.roughnessMapTransform)),h.envMap&&(_.envMapIntensity.value=h.envMapIntensity)}function g(_,h,v){_.ior.value=h.ior,h.sheen>0&&(_.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),_.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(_.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,_.sheenColorMapTransform)),h.sheenRoughnessMap&&(_.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,_.sheenRoughnessMapTransform))),h.clearcoat>0&&(_.clearcoat.value=h.clearcoat,_.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(_.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,_.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(_.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===ln&&_.clearcoatNormalScale.value.negate())),h.dispersion>0&&(_.dispersion.value=h.dispersion),h.iridescence>0&&(_.iridescence.value=h.iridescence,_.iridescenceIOR.value=h.iridescenceIOR,_.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(_.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,_.iridescenceMapTransform)),h.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),h.transmission>0&&(_.transmission.value=h.transmission,_.transmissionSamplerMap.value=v.texture,_.transmissionSamplerSize.value.set(v.width,v.height),h.transmissionMap&&(_.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,_.transmissionMapTransform)),_.thickness.value=h.thickness,h.thicknessMap&&(_.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=h.attenuationDistance,_.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(_.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(_.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=h.specularIntensity,_.specularColor.value.copy(h.specularColor),h.specularColorMap&&(_.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,_.specularColorMapTransform)),h.specularIntensityMap&&(_.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,_.specularIntensityMapTransform))}function m(_,h){h.matcap&&(_.matcap.value=h.matcap)}function x(_,h){const v=t.get(h).light;_.referencePosition.value.setFromMatrixPosition(v.matrixWorld),_.nearDistance.value=v.shadow.camera.near,_.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function xx(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){const T=y.program;i.uniformBlockBinding(v,T)}function l(v,y){let T=s[v.id];T===void 0&&(m(v),T=u(v),s[v.id]=T,v.addEventListener("dispose",_));const L=y.program;i.updateUBOMapping(v,L);const C=t.render.frame;r[v.id]!==C&&(d(v),r[v.id]=C)}function u(v){const y=f();v.__bindingPointIndex=y;const T=n.createBuffer(),L=v.__size,C=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,L,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,T),T}function f(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return oe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const y=s[v.id],T=v.uniforms,L=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let C=0,w=T.length;C<w;C++){const p=Array.isArray(T[C])?T[C]:[T[C]];for(let M=0,E=p.length;M<E;M++){const R=p[M];if(g(R,C,M,L)===!0){const P=R.__offset,D=Array.isArray(R.value)?R.value:[R.value];let G=0;for(let N=0;N<D.length;N++){const k=D[N],B=x(k);typeof k=="number"||typeof k=="boolean"?(R.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,P+G,R.__data)):k.isMatrix3?(R.__data[0]=k.elements[0],R.__data[1]=k.elements[1],R.__data[2]=k.elements[2],R.__data[3]=0,R.__data[4]=k.elements[3],R.__data[5]=k.elements[4],R.__data[6]=k.elements[5],R.__data[7]=0,R.__data[8]=k.elements[6],R.__data[9]=k.elements[7],R.__data[10]=k.elements[8],R.__data[11]=0):ArrayBuffer.isView(k)?R.__data.set(new k.constructor(k.buffer,k.byteOffset,R.__data.length)):(k.toArray(R.__data,G),G+=B.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,P,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(v,y,T,L){const C=v.value,w=y+"_"+T;if(L[w]===void 0)return typeof C=="number"||typeof C=="boolean"?L[w]=C:ArrayBuffer.isView(C)?L[w]=C.slice():L[w]=C.clone(),!0;{const p=L[w];if(typeof C=="number"||typeof C=="boolean"){if(p!==C)return L[w]=C,!0}else{if(ArrayBuffer.isView(C))return!0;if(p.equals(C)===!1)return p.copy(C),!0}}return!1}function m(v){const y=v.uniforms;let T=0;const L=16;for(let w=0,p=y.length;w<p;w++){const M=Array.isArray(y[w])?y[w]:[y[w]];for(let E=0,R=M.length;E<R;E++){const P=M[E],D=Array.isArray(P.value)?P.value:[P.value];for(let G=0,N=D.length;G<N;G++){const k=D[G],B=x(k),Z=T%L,rt=Z%B.boundary,mt=Z+rt;T+=rt,mt!==0&&L-mt<B.storage&&(T+=L-mt),P.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=T,T+=B.storage}}}const C=T%L;return C>0&&(T+=L-C),v.__size=T,v.__cache={},this}function x(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?Wt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):Wt("WebGLRenderer: Unsupported uniform value type.",v),y}function _(v){const y=v.target;y.removeEventListener("dispose",_);const T=o.indexOf(y.__bindingPointIndex);o.splice(T,1),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function h(){for(const v in s)n.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:h}}const vx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let zn=null;function Mx(){return zn===null&&(zn=new Fd(vx,16,16,Wi,ri),zn.name="DFG_LUT",zn.minFilter=tn,zn.magFilter=tn,zn.wrapS=ti,zn.wrapT=ti,zn.generateMipmaps=!1,zn.needsUpdate=!0),zn}class ih{constructor(t={}){const{canvas:e=yf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:g=gn}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const x=g,_=new Set([Ul,Nl,Il]),h=new Set([gn,Vn,ir,sr,Pl,Ll]),v=new Uint32Array(4),y=new Int32Array(4),T=new U;let L=null,C=null;const w=[],p=[];let M=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let R=!1,P=null;this._outputColorSpace=Qe;let D=0,G=0,N=null,k=-1,B=null;const Z=new Ue,rt=new Ue;let mt=null;const At=new Ht(0);let It=0,ct=e.width,vt=e.height,Mt=1,J=null,xt=null;const ht=new Ue(0,0,ct,vt),Bt=new Ue(0,0,ct,vt);let zt=!1;const Vt=new Vl;let be=!1,Jt=!1;const ue=new me,ge=new U,Kt=new Ue,Le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Se=!1;function Be(){return N===null?Mt:1}let O=i;function De(S,F){return e.getContext(S,F)}try{const S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Al}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",Ct,!1),e.addEventListener("webglcontextcreationerror",qt,!1),O===null){const F="webgl2";if(O=De(F,S),O===null)throw De(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw oe("WebGLRenderer: "+S.message),S}let ee,K,W,wt,A,b,z,X,it,at,lt,Y,tt,_t,Et,dt,ut,kt,Dt,Rt,I,ot,Q;function St(){ee=new Mg(O),ee.init(),I=new dx(O,ee),K=new hg(O,ee,t,I),W=new cx(O,ee),K.reversedDepthBuffer&&d&&W.buffers.depth.setReversed(!0),wt=new yg(O),A=new j_,b=new ux(O,ee,W,A,K,I,wt),z=new vg(E),X=new Ap(O),ot=new ug(O,X),it=new bg(O,X,wt,ot),at=new Tg(O,it,X,ot,wt),kt=new Eg(O,K,b),Et=new fg(A),lt=new Y_(E,z,ee,K,ot,Et),Y=new _x(E,A),tt=new Z_,_t=new ix(ee),ut=new cg(E,z,W,at,m,c),dt=new lx(E,at,K),Q=new xx(O,wt,K,W),Dt=new dg(O,ee,wt),Rt=new Sg(O,ee,wt),wt.programs=lt.programs,E.capabilities=K,E.extensions=ee,E.properties=A,E.renderLists=tt,E.shadowMap=dt,E.state=W,E.info=wt}St(),x!==gn&&(M=new Ag(x,e.width,e.height,s,r));const ft=new mx(E,O);this.xr=ft,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const S=ee.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=ee.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Mt},this.setPixelRatio=function(S){S!==void 0&&(Mt=S,this.setSize(ct,vt,!1))},this.getSize=function(S){return S.set(ct,vt)},this.setSize=function(S,F,$=!0){if(ft.isPresenting){Wt("WebGLRenderer: Can't change size while VR device is presenting.");return}ct=S,vt=F,e.width=Math.floor(S*Mt),e.height=Math.floor(F*Mt),$===!0&&(e.style.width=S+"px",e.style.height=F+"px"),M!==null&&M.setSize(e.width,e.height),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(ct*Mt,vt*Mt).floor()},this.setDrawingBufferSize=function(S,F,$){ct=S,vt=F,Mt=$,e.width=Math.floor(S*$),e.height=Math.floor(F*$),this.setViewport(0,0,S,F)},this.setEffects=function(S){if(x===gn){oe("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let F=0;F<S.length;F++)if(S[F].isOutputPass===!0){Wt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(Z)},this.getViewport=function(S){return S.copy(ht)},this.setViewport=function(S,F,$,H){S.isVector4?ht.set(S.x,S.y,S.z,S.w):ht.set(S,F,$,H),W.viewport(Z.copy(ht).multiplyScalar(Mt).round())},this.getScissor=function(S){return S.copy(Bt)},this.setScissor=function(S,F,$,H){S.isVector4?Bt.set(S.x,S.y,S.z,S.w):Bt.set(S,F,$,H),W.scissor(rt.copy(Bt).multiplyScalar(Mt).round())},this.getScissorTest=function(){return zt},this.setScissorTest=function(S){W.setScissorTest(zt=S)},this.setOpaqueSort=function(S){J=S},this.setTransparentSort=function(S){xt=S},this.getClearColor=function(S){return S.copy(ut.getClearColor())},this.setClearColor=function(){ut.setClearColor(...arguments)},this.getClearAlpha=function(){return ut.getClearAlpha()},this.setClearAlpha=function(){ut.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,$=!0){let H=0;if(S){let V=!1;if(N!==null){const Tt=N.texture.format;V=_.has(Tt)}if(V){const Tt=N.texture.type,Lt=h.has(Tt),yt=ut.getClearColor(),Ut=ut.getClearAlpha(),Ot=yt.r,jt=yt.g,Qt=yt.b;Lt?(v[0]=Ot,v[1]=jt,v[2]=Qt,v[3]=Ut,O.clearBufferuiv(O.COLOR,0,v)):(y[0]=Ot,y[1]=jt,y[2]=Qt,y[3]=Ut,O.clearBufferiv(O.COLOR,0,y))}else H|=O.COLOR_BUFFER_BIT}F&&(H|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),P=S},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",Ct,!1),e.removeEventListener("webglcontextcreationerror",qt,!1),ut.dispose(),tt.dispose(),_t.dispose(),A.dispose(),z.dispose(),at.dispose(),ot.dispose(),Q.dispose(),lt.dispose(),ft.dispose(),ft.removeEventListener("sessionstart",_c),ft.removeEventListener("sessionend",xc),Ci.stop()};function nt(S){S.preventDefault(),Ic("WebGLRenderer: Context Lost."),R=!0}function Ct(){Ic("WebGLRenderer: Context Restored."),R=!1;const S=wt.autoReset,F=dt.enabled,$=dt.autoUpdate,H=dt.needsUpdate,V=dt.type;St(),wt.autoReset=S,dt.enabled=F,dt.autoUpdate=$,dt.needsUpdate=H,dt.type=V}function qt(S){oe("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Re(S){const F=S.target;F.removeEventListener("dispose",Re),de(F)}function de(S){$n(S),A.remove(S)}function $n(S){const F=A.get(S).programs;F!==void 0&&(F.forEach(function($){lt.releaseProgram($)}),S.isShaderMaterial&&lt.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,$,H,V,Tt){F===null&&(F=Le);const Lt=V.isMesh&&V.matrixWorld.determinant()<0,yt=Fh(S,F,$,H,V);W.setMaterial(H,Lt);let Ut=$.index,Ot=1;if(H.wireframe===!0){if(Ut=it.getWireframeAttribute($),Ut===void 0)return;Ot=2}const jt=$.drawRange,Qt=$.attributes.position;let Ft=jt.start*Ot,_e=(jt.start+jt.count)*Ot;Tt!==null&&(Ft=Math.max(Ft,Tt.start*Ot),_e=Math.min(_e,(Tt.start+Tt.count)*Ot)),Ut!==null?(Ft=Math.max(Ft,0),_e=Math.min(_e,Ut.count)):Qt!=null&&(Ft=Math.max(Ft,0),_e=Math.min(_e,Qt.count));const Oe=_e-Ft;if(Oe<0||Oe===1/0)return;ot.setup(V,H,yt,$,Ut);let Ie,ve=Dt;if(Ut!==null&&(Ie=X.get(Ut),ve=Rt,ve.setIndex(Ie)),V.isMesh)H.wireframe===!0?(W.setLineWidth(H.wireframeLinewidth*Be()),ve.setMode(O.LINES)):ve.setMode(O.TRIANGLES);else if(V.isLine){let Ke=H.linewidth;Ke===void 0&&(Ke=1),W.setLineWidth(Ke*Be()),V.isLineSegments?ve.setMode(O.LINES):V.isLineLoop?ve.setMode(O.LINE_LOOP):ve.setMode(O.LINE_STRIP)}else V.isPoints?ve.setMode(O.POINTS):V.isSprite&&ve.setMode(O.TRIANGLES);if(V.isBatchedMesh)if(ee.get("WEBGL_multi_draw"))ve.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Ke=V._multiDrawStarts,Pt=V._multiDrawCounts,hn=V._multiDrawCount,le=Ut?X.get(Ut).bytesPerElement:1,bn=A.get(H).currentProgram.getUniforms();for(let On=0;On<hn;On++)bn.setValue(O,"_gl_DrawID",On),ve.render(Ke[On]/le,Pt[On])}else if(V.isInstancedMesh)ve.renderInstances(Ft,Oe,V.count);else if($.isInstancedBufferGeometry){const Ke=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Pt=Math.min($.instanceCount,Ke);ve.renderInstances(Ft,Oe,Pt)}else ve.render(Ft,Oe)};function Un(S,F,$){S.transparent===!0&&S.side===Qn&&S.forceSinglePass===!1?(S.side=ln,S.needsUpdate=!0,gr(S,F,$),S.side=wi,S.needsUpdate=!0,gr(S,F,$),S.side=Qn):gr(S,F,$)}this.compile=function(S,F,$=null){$===null&&($=S),C=_t.get($),C.init(F),p.push(C),$.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(C.pushLight(V),V.castShadow&&C.pushShadow(V))}),S!==$&&S.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(C.pushLight(V),V.castShadow&&C.pushShadow(V))}),C.setupLights();const H=new Set;return S.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const Tt=V.material;if(Tt)if(Array.isArray(Tt))for(let Lt=0;Lt<Tt.length;Lt++){const yt=Tt[Lt];Un(yt,$,V),H.add(yt)}else Un(Tt,$,V),H.add(Tt)}),C=p.pop(),H},this.compileAsync=function(S,F,$=null){const H=this.compile(S,F,$);return new Promise(V=>{function Tt(){if(H.forEach(function(Lt){A.get(Lt).currentProgram.isReady()&&H.delete(Lt)}),H.size===0){V(S);return}setTimeout(Tt,10)}ee.get("KHR_parallel_shader_compile")!==null?Tt():setTimeout(Tt,10)})};let Io=null;function Uh(S){Io&&Io(S)}function _c(){Ci.stop()}function xc(){Ci.start()}const Ci=new jd;Ci.setAnimationLoop(Uh),typeof self<"u"&&Ci.setContext(self),this.setAnimationLoop=function(S){Io=S,ft.setAnimationLoop(S),S===null?Ci.stop():Ci.start()},ft.addEventListener("sessionstart",_c),ft.addEventListener("sessionend",xc),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){oe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;P!==null&&P.renderStart(S,F);const $=ft.enabled===!0&&ft.isPresenting===!0,H=M!==null&&(N===null||$)&&M.begin(E,N);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ft.enabled===!0&&ft.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(ft.cameraAutoUpdate===!0&&ft.updateCamera(F),F=ft.getCamera()),S.isScene===!0&&S.onBeforeRender(E,S,F,N),C=_t.get(S,p.length),C.init(F),C.state.textureUnits=b.getTextureUnits(),p.push(C),ue.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Vt.setFromProjectionMatrix(ue,kn,F.reversedDepth),Jt=this.localClippingEnabled,be=Et.init(this.clippingPlanes,Jt),L=tt.get(S,w.length),L.init(),w.push(L),ft.enabled===!0&&ft.isPresenting===!0){const Lt=E.xr.getDepthSensingMesh();Lt!==null&&No(Lt,F,-1/0,E.sortObjects)}No(S,F,0,E.sortObjects),L.finish(),E.sortObjects===!0&&L.sort(J,xt),Se=ft.enabled===!1||ft.isPresenting===!1||ft.hasDepthSensing()===!1,Se&&ut.addToRenderList(L,S),this.info.render.frame++,be===!0&&Et.beginShadows();const V=C.state.shadowsArray;if(dt.render(V,S,F),be===!0&&Et.endShadows(),this.info.autoReset===!0&&this.info.reset(),(H&&M.hasRenderPass())===!1){const Lt=L.opaque,yt=L.transmissive;if(C.setupLights(),F.isArrayCamera){const Ut=F.cameras;if(yt.length>0)for(let Ot=0,jt=Ut.length;Ot<jt;Ot++){const Qt=Ut[Ot];Mc(Lt,yt,S,Qt)}Se&&ut.render(S);for(let Ot=0,jt=Ut.length;Ot<jt;Ot++){const Qt=Ut[Ot];vc(L,S,Qt,Qt.viewport)}}else yt.length>0&&Mc(Lt,yt,S,F),Se&&ut.render(S),vc(L,S,F)}N!==null&&G===0&&(b.updateMultisampleRenderTarget(N),b.updateRenderTargetMipmap(N)),H&&M.end(E),S.isScene===!0&&S.onAfterRender(E,S,F),ot.resetDefaultState(),k=-1,B=null,p.pop(),p.length>0?(C=p[p.length-1],b.setTextureUnits(C.state.textureUnits),be===!0&&Et.setGlobalState(E.clippingPlanes,C.state.camera)):C=null,w.pop(),w.length>0?L=w[w.length-1]:L=null,P!==null&&P.renderEnd()};function No(S,F,$,H){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)$=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLightProbeGrid)C.pushLightProbeGrid(S);else if(S.isLight)C.pushLight(S),S.castShadow&&C.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Vt.intersectsSprite(S)){H&&Kt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ue);const Lt=at.update(S),yt=S.material;yt.visible&&L.push(S,Lt,yt,$,Kt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Vt.intersectsObject(S))){const Lt=at.update(S),yt=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Kt.copy(S.boundingSphere.center)):(Lt.boundingSphere===null&&Lt.computeBoundingSphere(),Kt.copy(Lt.boundingSphere.center)),Kt.applyMatrix4(S.matrixWorld).applyMatrix4(ue)),Array.isArray(yt)){const Ut=Lt.groups;for(let Ot=0,jt=Ut.length;Ot<jt;Ot++){const Qt=Ut[Ot],Ft=yt[Qt.materialIndex];Ft&&Ft.visible&&L.push(S,Lt,Ft,$,Kt.z,Qt)}}else yt.visible&&L.push(S,Lt,yt,$,Kt.z,null)}}const Tt=S.children;for(let Lt=0,yt=Tt.length;Lt<yt;Lt++)No(Tt[Lt],F,$,H)}function vc(S,F,$,H){const{opaque:V,transmissive:Tt,transparent:Lt}=S;C.setupLightsView($),be===!0&&Et.setGlobalState(E.clippingPlanes,$),H&&W.viewport(Z.copy(H)),V.length>0&&mr(V,F,$),Tt.length>0&&mr(Tt,F,$),Lt.length>0&&mr(Lt,F,$),W.buffers.depth.setTest(!0),W.buffers.depth.setMask(!0),W.buffers.color.setMask(!0),W.setPolygonOffset(!1)}function Mc(S,F,$,H){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[H.id]===void 0){const Ft=ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[H.id]=new Hn(1,1,{generateMipmaps:!0,type:Ft?ri:gn,minFilter:zi,samples:Math.max(4,K.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:se.workingColorSpace})}const Tt=C.state.transmissionRenderTarget[H.id],Lt=H.viewport||Z;Tt.setSize(Lt.z*E.transmissionResolutionScale,Lt.w*E.transmissionResolutionScale);const yt=E.getRenderTarget(),Ut=E.getActiveCubeFace(),Ot=E.getActiveMipmapLevel();E.setRenderTarget(Tt),E.getClearColor(At),It=E.getClearAlpha(),It<1&&E.setClearColor(16777215,.5),E.clear(),Se&&ut.render($);const jt=E.toneMapping;E.toneMapping=Gn;const Qt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),C.setupLightsView(H),be===!0&&Et.setGlobalState(E.clippingPlanes,H),mr(S,$,H),b.updateMultisampleRenderTarget(Tt),b.updateRenderTargetMipmap(Tt),ee.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let _e=0,Oe=F.length;_e<Oe;_e++){const Ie=F[_e],{object:ve,geometry:Ke,material:Pt,group:hn}=Ie;if(Pt.side===Qn&&ve.layers.test(H.layers)){const le=Pt.side;Pt.side=ln,Pt.needsUpdate=!0,bc(ve,$,H,Ke,Pt,hn),Pt.side=le,Pt.needsUpdate=!0,Ft=!0}}Ft===!0&&(b.updateMultisampleRenderTarget(Tt),b.updateRenderTargetMipmap(Tt))}E.setRenderTarget(yt,Ut,Ot),E.setClearColor(At,It),Qt!==void 0&&(H.viewport=Qt),E.toneMapping=jt}function mr(S,F,$){const H=F.isScene===!0?F.overrideMaterial:null;for(let V=0,Tt=S.length;V<Tt;V++){const Lt=S[V],{object:yt,geometry:Ut,group:Ot}=Lt;let jt=Lt.material;jt.allowOverride===!0&&H!==null&&(jt=H),yt.layers.test($.layers)&&bc(yt,F,$,Ut,jt,Ot)}}function bc(S,F,$,H,V,Tt){S.onBeforeRender(E,F,$,H,V,Tt),S.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),V.onBeforeRender(E,F,$,H,S,Tt),V.transparent===!0&&V.side===Qn&&V.forceSinglePass===!1?(V.side=ln,V.needsUpdate=!0,E.renderBufferDirect($,F,H,V,S,Tt),V.side=wi,V.needsUpdate=!0,E.renderBufferDirect($,F,H,V,S,Tt),V.side=Qn):E.renderBufferDirect($,F,H,V,S,Tt),S.onAfterRender(E,F,$,H,V,Tt)}function gr(S,F,$){F.isScene!==!0&&(F=Le);const H=A.get(S),V=C.state.lights,Tt=C.state.shadowsArray,Lt=V.state.version,yt=lt.getParameters(S,V.state,Tt,F,$,C.state.lightProbeGridArray),Ut=lt.getProgramCacheKey(yt);let Ot=H.programs;H.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?F.environment:null,H.fog=F.fog;const jt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;H.envMap=z.get(S.envMap||H.environment,jt),H.envMapRotation=H.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Ot===void 0&&(S.addEventListener("dispose",Re),Ot=new Map,H.programs=Ot);let Qt=Ot.get(Ut);if(Qt!==void 0){if(H.currentProgram===Qt&&H.lightsStateVersion===Lt)return yc(S,yt),Qt}else yt.uniforms=lt.getUniforms(S),P!==null&&S.isNodeMaterial&&P.build(S,$,yt),S.onBeforeCompile(yt,E),Qt=lt.acquireProgram(yt,Ut),Ot.set(Ut,Qt),H.uniforms=yt.uniforms;const Ft=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ft.clippingPlanes=Et.uniform),yc(S,yt),H.needsLights=Bh(S),H.lightsStateVersion=Lt,H.needsLights&&(Ft.ambientLightColor.value=V.state.ambient,Ft.lightProbe.value=V.state.probe,Ft.directionalLights.value=V.state.directional,Ft.directionalLightShadows.value=V.state.directionalShadow,Ft.spotLights.value=V.state.spot,Ft.spotLightShadows.value=V.state.spotShadow,Ft.rectAreaLights.value=V.state.rectArea,Ft.ltc_1.value=V.state.rectAreaLTC1,Ft.ltc_2.value=V.state.rectAreaLTC2,Ft.pointLights.value=V.state.point,Ft.pointLightShadows.value=V.state.pointShadow,Ft.hemisphereLights.value=V.state.hemi,Ft.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ft.spotLightMatrix.value=V.state.spotLightMatrix,Ft.spotLightMap.value=V.state.spotLightMap,Ft.pointShadowMatrix.value=V.state.pointShadowMatrix),H.lightProbeGrid=C.state.lightProbeGridArray.length>0,H.currentProgram=Qt,H.uniformsList=null,Qt}function Sc(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=so.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function yc(S,F){const $=A.get(S);$.outputColorSpace=F.outputColorSpace,$.batching=F.batching,$.batchingColor=F.batchingColor,$.instancing=F.instancing,$.instancingColor=F.instancingColor,$.instancingMorph=F.instancingMorph,$.skinning=F.skinning,$.morphTargets=F.morphTargets,$.morphNormals=F.morphNormals,$.morphColors=F.morphColors,$.morphTargetsCount=F.morphTargetsCount,$.numClippingPlanes=F.numClippingPlanes,$.numIntersection=F.numClipIntersection,$.vertexAlphas=F.vertexAlphas,$.vertexTangents=F.vertexTangents,$.toneMapping=F.toneMapping}function Oh(S,F){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;T.setFromMatrixPosition(F.matrixWorld);for(let $=0,H=S.length;$<H;$++){const V=S[$];if(V.texture!==null&&V.boundingBox.containsPoint(T))return V}return null}function Fh(S,F,$,H,V){F.isScene!==!0&&(F=Le),b.resetTextureUnits();const Tt=F.fog,Lt=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?F.environment:null,yt=N===null?E.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:se.workingColorSpace,Ut=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Ot=z.get(H.envMap||Lt,Ut),jt=H.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Qt=!!$.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ft=!!$.morphAttributes.position,_e=!!$.morphAttributes.normal,Oe=!!$.morphAttributes.color;let Ie=Gn;H.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Ie=E.toneMapping);const ve=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Ke=ve!==void 0?ve.length:0,Pt=A.get(H),hn=C.state.lights;if(be===!0&&(Jt===!0||S!==B)){const ye=S===B&&H.id===k;Et.setState(H,S,ye)}let le=!1;H.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==hn.state.version||Pt.outputColorSpace!==yt||V.isBatchedMesh&&Pt.batching===!1||!V.isBatchedMesh&&Pt.batching===!0||V.isBatchedMesh&&Pt.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Pt.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Pt.instancing===!1||!V.isInstancedMesh&&Pt.instancing===!0||V.isSkinnedMesh&&Pt.skinning===!1||!V.isSkinnedMesh&&Pt.skinning===!0||V.isInstancedMesh&&Pt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Pt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Pt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Pt.instancingMorph===!1&&V.morphTexture!==null||Pt.envMap!==Ot||H.fog===!0&&Pt.fog!==Tt||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==Et.numPlanes||Pt.numIntersection!==Et.numIntersection)||Pt.vertexAlphas!==jt||Pt.vertexTangents!==Qt||Pt.morphTargets!==Ft||Pt.morphNormals!==_e||Pt.morphColors!==Oe||Pt.toneMapping!==Ie||Pt.morphTargetsCount!==Ke||!!Pt.lightProbeGrid!=C.state.lightProbeGridArray.length>0)&&(le=!0):(le=!0,Pt.__version=H.version);let bn=Pt.currentProgram;le===!0&&(bn=gr(H,F,V),P&&H.isNodeMaterial&&P.onUpdateProgram(H,bn,Pt));let On=!1,ui=!1,Zi=!1;const Me=bn.getUniforms(),Fe=Pt.uniforms;if(W.useProgram(bn.program)&&(On=!0,ui=!0,Zi=!0),H.id!==k&&(k=H.id,ui=!0),Pt.needsLights){const ye=Oh(C.state.lightProbeGridArray,V);Pt.lightProbeGrid!==ye&&(Pt.lightProbeGrid=ye,ui=!0)}if(On||B!==S){W.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Me.setValue(O,"projectionMatrix",S.projectionMatrix),Me.setValue(O,"viewMatrix",S.matrixWorldInverse);const hi=Me.map.cameraPosition;hi!==void 0&&hi.setValue(O,ge.setFromMatrixPosition(S.matrixWorld)),K.logarithmicDepthBuffer&&Me.setValue(O,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Me.setValue(O,"isOrthographic",S.isOrthographicCamera===!0),B!==S&&(B=S,ui=!0,Zi=!0)}if(Pt.needsLights&&(hn.state.directionalShadowMap.length>0&&Me.setValue(O,"directionalShadowMap",hn.state.directionalShadowMap,b),hn.state.spotShadowMap.length>0&&Me.setValue(O,"spotShadowMap",hn.state.spotShadowMap,b),hn.state.pointShadowMap.length>0&&Me.setValue(O,"pointShadowMap",hn.state.pointShadowMap,b)),V.isSkinnedMesh){Me.setOptional(O,V,"bindMatrix"),Me.setOptional(O,V,"bindMatrixInverse");const ye=V.skeleton;ye&&(ye.boneTexture===null&&ye.computeBoneTexture(),Me.setValue(O,"boneTexture",ye.boneTexture,b))}V.isBatchedMesh&&(Me.setOptional(O,V,"batchingTexture"),Me.setValue(O,"batchingTexture",V._matricesTexture,b),Me.setOptional(O,V,"batchingIdTexture"),Me.setValue(O,"batchingIdTexture",V._indirectTexture,b),Me.setOptional(O,V,"batchingColorTexture"),V._colorsTexture!==null&&Me.setValue(O,"batchingColorTexture",V._colorsTexture,b));const di=$.morphAttributes;if((di.position!==void 0||di.normal!==void 0||di.color!==void 0)&&kt.update(V,$,bn),(ui||Pt.receiveShadow!==V.receiveShadow)&&(Pt.receiveShadow=V.receiveShadow,Me.setValue(O,"receiveShadow",V.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&F.environment!==null&&(Fe.envMapIntensity.value=F.environmentIntensity),Fe.dfgLUT!==void 0&&(Fe.dfgLUT.value=Mx()),ui){if(Me.setValue(O,"toneMappingExposure",E.toneMappingExposure),Pt.needsLights&&zh(Fe,Zi),Tt&&H.fog===!0&&Y.refreshFogUniforms(Fe,Tt),Y.refreshMaterialUniforms(Fe,H,Mt,vt,C.state.transmissionRenderTarget[S.id]),Pt.needsLights&&Pt.lightProbeGrid){const ye=Pt.lightProbeGrid;Fe.probesSH.value=ye.texture,Fe.probesMin.value.copy(ye.boundingBox.min),Fe.probesMax.value.copy(ye.boundingBox.max),Fe.probesResolution.value.copy(ye.resolution)}so.upload(O,Sc(Pt),Fe,b)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(so.upload(O,Sc(Pt),Fe,b),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Me.setValue(O,"center",V.center),Me.setValue(O,"modelViewMatrix",V.modelViewMatrix),Me.setValue(O,"normalMatrix",V.normalMatrix),Me.setValue(O,"modelMatrix",V.matrixWorld),H.uniformsGroups!==void 0){const ye=H.uniformsGroups;for(let hi=0,Ji=ye.length;hi<Ji;hi++){const Ec=ye[hi];Q.update(Ec,bn),Q.bind(Ec,bn)}}return bn}function zh(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function Bh(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(S,F,$){const H=A.get(S);H.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),A.get(S.texture).__webglTexture=F,A.get(S.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:$,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,F){const $=A.get(S);$.__webglFramebuffer=F,$.__useDefaultFramebuffer=F===void 0};const kh=O.createFramebuffer();this.setRenderTarget=function(S,F=0,$=0){N=S,D=F,G=$;let H=null,V=!1,Tt=!1;if(S){const yt=A.get(S);if(yt.__useDefaultFramebuffer!==void 0){W.bindFramebuffer(O.FRAMEBUFFER,yt.__webglFramebuffer),Z.copy(S.viewport),rt.copy(S.scissor),mt=S.scissorTest,W.viewport(Z),W.scissor(rt),W.setScissorTest(mt),k=-1;return}else if(yt.__webglFramebuffer===void 0)b.setupRenderTarget(S);else if(yt.__hasExternalTextures)b.rebindTextures(S,A.get(S.texture).__webglTexture,A.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const jt=S.depthTexture;if(yt.__boundDepthTexture!==jt){if(jt!==null&&A.has(jt)&&(S.width!==jt.image.width||S.height!==jt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(S)}}const Ut=S.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(Tt=!0);const Ot=A.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ot[F])?H=Ot[F][$]:H=Ot[F],V=!0):S.samples>0&&b.useMultisampledRTT(S)===!1?H=A.get(S).__webglMultisampledFramebuffer:Array.isArray(Ot)?H=Ot[$]:H=Ot,Z.copy(S.viewport),rt.copy(S.scissor),mt=S.scissorTest}else Z.copy(ht).multiplyScalar(Mt).floor(),rt.copy(Bt).multiplyScalar(Mt).floor(),mt=zt;if($!==0&&(H=kh),W.bindFramebuffer(O.FRAMEBUFFER,H)&&W.drawBuffers(S,H),W.viewport(Z),W.scissor(rt),W.setScissorTest(mt),V){const yt=A.get(S.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+F,yt.__webglTexture,$)}else if(Tt){const yt=F;for(let Ut=0;Ut<S.textures.length;Ut++){const Ot=A.get(S.textures[Ut]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Ut,Ot.__webglTexture,$,yt)}}else if(S!==null&&$!==0){const yt=A.get(S.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,yt.__webglTexture,$)}k=-1},this.readRenderTargetPixels=function(S,F,$,H,V,Tt,Lt,yt=0){if(!(S&&S.isWebGLRenderTarget)){oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=A.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Lt!==void 0&&(Ut=Ut[Lt]),Ut){W.bindFramebuffer(O.FRAMEBUFFER,Ut);try{const Ot=S.textures[yt],jt=Ot.format,Qt=Ot.type;if(S.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+yt),!K.textureFormatReadable(jt)){oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!K.textureTypeReadable(Qt)){oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-H&&$>=0&&$<=S.height-V&&O.readPixels(F,$,H,V,I.convert(jt),I.convert(Qt),Tt)}finally{const Ot=N!==null?A.get(N).__webglFramebuffer:null;W.bindFramebuffer(O.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(S,F,$,H,V,Tt,Lt,yt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=A.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Lt!==void 0&&(Ut=Ut[Lt]),Ut)if(F>=0&&F<=S.width-H&&$>=0&&$<=S.height-V){W.bindFramebuffer(O.FRAMEBUFFER,Ut);const Ot=S.textures[yt],jt=Ot.format,Qt=Ot.type;if(S.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+yt),!K.textureFormatReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!K.textureTypeReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ft=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Ft),O.bufferData(O.PIXEL_PACK_BUFFER,Tt.byteLength,O.STREAM_READ),O.readPixels(F,$,H,V,I.convert(jt),I.convert(Qt),0);const _e=N!==null?A.get(N).__webglFramebuffer:null;W.bindFramebuffer(O.FRAMEBUFFER,_e);const Oe=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Ef(O,Oe,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Ft),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Tt),O.deleteBuffer(Ft),O.deleteSync(Oe),Tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,F=null,$=0){const H=Math.pow(2,-$),V=Math.floor(S.image.width*H),Tt=Math.floor(S.image.height*H),Lt=F!==null?F.x:0,yt=F!==null?F.y:0;b.setTexture2D(S,0),O.copyTexSubImage2D(O.TEXTURE_2D,$,0,0,Lt,yt,V,Tt),W.unbindTexture()};const Gh=O.createFramebuffer(),Hh=O.createFramebuffer();this.copyTextureToTexture=function(S,F,$=null,H=null,V=0,Tt=0){let Lt,yt,Ut,Ot,jt,Qt,Ft,_e,Oe;const Ie=S.isCompressedTexture?S.mipmaps[Tt]:S.image;if($!==null)Lt=$.max.x-$.min.x,yt=$.max.y-$.min.y,Ut=$.isBox3?$.max.z-$.min.z:1,Ot=$.min.x,jt=$.min.y,Qt=$.isBox3?$.min.z:0;else{const Fe=Math.pow(2,-V);Lt=Math.floor(Ie.width*Fe),yt=Math.floor(Ie.height*Fe),S.isDataArrayTexture?Ut=Ie.depth:S.isData3DTexture?Ut=Math.floor(Ie.depth*Fe):Ut=1,Ot=0,jt=0,Qt=0}H!==null?(Ft=H.x,_e=H.y,Oe=H.z):(Ft=0,_e=0,Oe=0);const ve=I.convert(F.format),Ke=I.convert(F.type);let Pt;F.isData3DTexture?(b.setTexture3D(F,0),Pt=O.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(b.setTexture2DArray(F,0),Pt=O.TEXTURE_2D_ARRAY):(b.setTexture2D(F,0),Pt=O.TEXTURE_2D),W.activeTexture(O.TEXTURE0),W.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,F.flipY),W.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),W.pixelStorei(O.UNPACK_ALIGNMENT,F.unpackAlignment);const hn=W.getParameter(O.UNPACK_ROW_LENGTH),le=W.getParameter(O.UNPACK_IMAGE_HEIGHT),bn=W.getParameter(O.UNPACK_SKIP_PIXELS),On=W.getParameter(O.UNPACK_SKIP_ROWS),ui=W.getParameter(O.UNPACK_SKIP_IMAGES);W.pixelStorei(O.UNPACK_ROW_LENGTH,Ie.width),W.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Ie.height),W.pixelStorei(O.UNPACK_SKIP_PIXELS,Ot),W.pixelStorei(O.UNPACK_SKIP_ROWS,jt),W.pixelStorei(O.UNPACK_SKIP_IMAGES,Qt);const Zi=S.isDataArrayTexture||S.isData3DTexture,Me=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){const Fe=A.get(S),di=A.get(F),ye=A.get(Fe.__renderTarget),hi=A.get(di.__renderTarget);W.bindFramebuffer(O.READ_FRAMEBUFFER,ye.__webglFramebuffer),W.bindFramebuffer(O.DRAW_FRAMEBUFFER,hi.__webglFramebuffer);for(let Ji=0;Ji<Ut;Ji++)Zi&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,A.get(S).__webglTexture,V,Qt+Ji),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,A.get(F).__webglTexture,Tt,Oe+Ji)),O.blitFramebuffer(Ot,jt,Lt,yt,Ft,_e,Lt,yt,O.DEPTH_BUFFER_BIT,O.NEAREST);W.bindFramebuffer(O.READ_FRAMEBUFFER,null),W.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(V!==0||S.isRenderTargetTexture||A.has(S)){const Fe=A.get(S),di=A.get(F);W.bindFramebuffer(O.READ_FRAMEBUFFER,Gh),W.bindFramebuffer(O.DRAW_FRAMEBUFFER,Hh);for(let ye=0;ye<Ut;ye++)Zi?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Fe.__webglTexture,V,Qt+ye):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Fe.__webglTexture,V),Me?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,di.__webglTexture,Tt,Oe+ye):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,di.__webglTexture,Tt),V!==0?O.blitFramebuffer(Ot,jt,Lt,yt,Ft,_e,Lt,yt,O.COLOR_BUFFER_BIT,O.NEAREST):Me?O.copyTexSubImage3D(Pt,Tt,Ft,_e,Oe+ye,Ot,jt,Lt,yt):O.copyTexSubImage2D(Pt,Tt,Ft,_e,Ot,jt,Lt,yt);W.bindFramebuffer(O.READ_FRAMEBUFFER,null),W.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Me?S.isDataTexture||S.isData3DTexture?O.texSubImage3D(Pt,Tt,Ft,_e,Oe,Lt,yt,Ut,ve,Ke,Ie.data):F.isCompressedArrayTexture?O.compressedTexSubImage3D(Pt,Tt,Ft,_e,Oe,Lt,yt,Ut,ve,Ie.data):O.texSubImage3D(Pt,Tt,Ft,_e,Oe,Lt,yt,Ut,ve,Ke,Ie):S.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Tt,Ft,_e,Lt,yt,ve,Ke,Ie.data):S.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Tt,Ft,_e,Ie.width,Ie.height,ve,Ie.data):O.texSubImage2D(O.TEXTURE_2D,Tt,Ft,_e,Lt,yt,ve,Ke,Ie);W.pixelStorei(O.UNPACK_ROW_LENGTH,hn),W.pixelStorei(O.UNPACK_IMAGE_HEIGHT,le),W.pixelStorei(O.UNPACK_SKIP_PIXELS,bn),W.pixelStorei(O.UNPACK_SKIP_ROWS,On),W.pixelStorei(O.UNPACK_SKIP_IMAGES,ui),Tt===0&&F.generateMipmaps&&O.generateMipmap(Pt),W.unbindTexture()},this.initRenderTarget=function(S){A.get(S).__webglFramebuffer===void 0&&b.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?b.setTextureCube(S,0):S.isData3DTexture?b.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?b.setTexture2DArray(S,0):b.setTexture2D(S,0),W.unbindTexture()},this.resetState=function(){D=0,G=0,N=null,W.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}}const Iu={type:"change"},Zl={type:"start"},sh={type:"end"},Hr=new wo,Nu=new Jn,bx=Math.cos(70*Ne.DEG2RAD),ke=new U,cn=2*Math.PI,xe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},pa=1e-6;class rh extends Tp{constructor(t,e=null){super(t,e),this.state=xe.NONE,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Xe.ROTATE,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN},this.touches={ONE:dn.ROTATE,TWO:dn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new ai,this._lastTargetPosition=new U,this._quat=new ai().setFromUnitVectors(t.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new _o,this._sphericalDelta=new _o,this._scale=1,this._panOffset=new U,this._rotateStart=new Gt,this._rotateEnd=new Gt,this._rotateDelta=new Gt,this._panStart=new Gt,this._panEnd=new Gt,this._panDelta=new Gt,this._dollyStart=new Gt,this._dollyEnd=new Gt,this._dollyDelta=new Gt,this._dollyDirection=new U,this._mouse=new Gt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=yx.bind(this),this._onPointerDown=Sx.bind(this),this._onPointerUp=Ex.bind(this),this._onContextMenu=Lx.bind(this),this._onMouseWheel=Ax.bind(this),this._onKeyDown=Rx.bind(this),this._onTouchStart=Cx.bind(this),this._onTouchMove=Px.bind(this),this._onMouseDown=Tx.bind(this),this._onMouseMove=wx.bind(this),this._interceptControlDown=Dx.bind(this),this._interceptControlUp=Ix.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Iu),this.update(),this.state=xe.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;ke.copy(e).sub(this.target),ke.applyQuaternion(this._quat),this._spherical.setFromVector3(ke),this.autoRotate&&this.state===xe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=cn:i>Math.PI&&(i-=cn),s<-Math.PI?s+=cn:s>Math.PI&&(s-=cn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(ke.setFromSpherical(this._spherical),ke.applyQuaternion(this._quatInverse),e.copy(this.target).add(ke),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=ke.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new U(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new U(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=ke.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Hr.origin.copy(this.object.position),Hr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Hr.direction))<bx?this.object.lookAt(this.target):(Nu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Hr.intersectPlane(Nu,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>pa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>pa||this._lastTargetPosition.distanceToSquared(this.target)>pa?(this.dispatchEvent(Iu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?cn/60*this.autoRotateSpeed*t:cn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ke.setFromMatrixColumn(e,0),ke.multiplyScalar(-t),this._panOffset.add(ke)}_panUp(t,e){this.screenSpacePanning===!0?ke.setFromMatrixColumn(e,1):(ke.setFromMatrixColumn(e,0),ke.crossVectors(this.object.up,ke)),ke.multiplyScalar(t),this._panOffset.add(ke)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ke.copy(s).sub(this.target);let r=ke.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/e.clientHeight),this._rotateUp(cn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/e.clientHeight),this._rotateUp(cn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Gt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Sx(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function yx(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Ex(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(sh),this.state=xe.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Tx(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Xe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=xe.DOLLY;break;case Xe.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=xe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=xe.ROTATE}break;case Xe.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=xe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=xe.PAN}break;default:this.state=xe.NONE}this.state!==xe.NONE&&this.dispatchEvent(Zl)}function wx(n){switch(this.state){case xe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case xe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case xe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Ax(n){this.enabled===!1||this.enableZoom===!1||this.state!==xe.NONE||(n.preventDefault(),this.dispatchEvent(Zl),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(sh))}function Rx(n){this.enabled!==!1&&this._handleKeyDown(n)}function Cx(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case dn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=xe.TOUCH_ROTATE;break;case dn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=xe.TOUCH_PAN;break;default:this.state=xe.NONE}break;case 2:switch(this.touches.TWO){case dn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=xe.TOUCH_DOLLY_PAN;break;case dn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=xe.TOUCH_DOLLY_ROTATE;break;default:this.state=xe.NONE}break;default:this.state=xe.NONE}this.state!==xe.NONE&&this.dispatchEvent(Zl)}function Px(n){switch(this._trackPointer(n),this.state){case xe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case xe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case xe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case xe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=xe.NONE}}function Lx(n){this.enabled!==!1&&n.preventDefault()}function Dx(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ix(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class oh extends Pe{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Gt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element&&e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const ps=new U,Uu=new me,Ou=new me,Fu=new U,zu=new U;class Nx{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},c=t.element!==void 0?t.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.sortObjects=!0,this.getSize=function(){return{width:i,height:s}},this.render=function(m,x){m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),x.parent===null&&x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),Uu.copy(x.matrixWorldInverse),Ou.multiplyMatrices(x.projectionMatrix,Uu),u(m,m,x),this.sortObjects&&g(m)},this.setSize=function(m,x){i=m,s=x,r=i/2,o=s/2,c.style.width=m+"px",c.style.height=x+"px"};function l(m){m.isCSS2DObject&&(m.element.style.display="none");for(let x=0,_=m.children.length;x<_;x++)l(m.children[x])}function u(m,x,_){if(m.visible===!1){l(m);return}if(m.isCSS2DObject){ps.setFromMatrixPosition(m.matrixWorld),ps.applyMatrix4(Ou);const h=ps.z>=-1&&ps.z<=1&&m.layers.test(_.layers)===!0,v=m.element;v.style.display=h===!0?"":"none",h===!0&&(m.onBeforeRender(e,x,_),v.style.transform="translate("+-100*m.center.x+"%,"+-100*m.center.y+"%)translate("+(ps.x*r+r)+"px,"+(-ps.y*o+o)+"px)",v.parentNode!==c&&c.appendChild(v),m.onAfterRender(e,x,_));const y={distanceToCameraSquared:f(_,m)};a.objects.set(m,y)}for(let h=0,v=m.children.length;h<v;h++)u(m.children[h],x,_)}function f(m,x){return Fu.setFromMatrixPosition(m.matrixWorld),zu.setFromMatrixPosition(x.matrixWorld),Fu.distanceToSquared(zu)}function d(m){const x=[];return m.traverseVisible(function(_){_.isCSS2DObject&&x.push(_)}),x}function g(m){const x=d(m).sort(function(h,v){if(h.renderOrder!==v.renderOrder)return v.renderOrder-h.renderOrder;const y=a.objects.get(h).distanceToCameraSquared,T=a.objects.get(v).distanceToCameraSquared;return y-T}),_=x.length;for(let h=0,v=x.length;h<v;h++)x[h].element.style.zIndex=_-h}}}class Ux extends Gl{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const t=new fe;t.deleteAttribute("uv");const e=new Ge({side:ln}),i=new Ge,s=new $d(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new $t(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new Hl(t,i,6),a=new Pe;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);const c=new $t(t,ms(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new $t(t,ms(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const u=new $t(t,ms(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);const f=new $t(t,ms(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const d=new $t(t,ms(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const g=new $t(t,ms(100));g.position.set(0,20,0),g.scale.set(1,.1,1),this.add(g)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function ms(n){return new xp({color:0,emissive:16777215,emissiveIntensity:n})}const j={sky:15985891,ground:15392723,wall:16052714,wallExt:15526628,trim:16777215,doorLeaf:13215612,doorEntrance:3494010,glass:11130101,frame:4871528,floorWood:13608570,woodLight:14201994,woodMid:12159838,woodDark:8017462,tileFloor:15331058,tileGrout:13489886,sofa:6258598,sofaDark:4612223,fabricBeige:14931392,fabricGrey:11844806,bedding:16118766,blanket:8298639,rug:14272942,black:2303533,steel:12831443,white:16448250,counter:15856372,cabinet:14341062,cabinetDark:7174792,leaf:5810286,leafDark:4163670,pot:13616307,accent:15246141,label:12999226},ma={...j},Ni=(n,t,e)=>new Ht(n).lerp(new Ht(t),e).getHex();function Ox(n){Object.assign(j,ma),j.floorWood=n.floor,j.wall=n.wall,j.wallExt=Ni(n.wall,0,.04),j.woodMid=n.wood,j.woodLight=Ni(n.wood,16777215,.22),j.woodDark=Ni(n.wood,0,.35),j.cabinet=Ni(ma.cabinet,n.wood,.18),j.sofa=n.sofa,j.sofaDark=Ni(n.sofa,0,.25),j.accent=n.accent,j.blanket=Ni(n.accent,16777215,.3),j.rug=Ni(ma.rug,n.floor,.25)}const ga=new Map;function Dn(n,t={}){const e=`${n}|${JSON.stringify(t)}`;return ga.has(e)||ga.set(e,new Ge({color:n,roughness:.78,metalness:0,...t})),ga.get(e)}function Ml(){return Dn(j.glass,{transparent:!0,opacity:.28,roughness:.05,depthWrite:!1})}const bl=30,Bu=72,_a=[4.5,34],xa=[.15,1.35],va=new U(5,0,3.5),ku=Math.PI*2,ah=n=>n<.5?4*n*n*n:1-(-2*n+2)**3/2;function lh(){const n=window.matchMedia?.("(pointer: coarse)").matches||Math.min(window.innerWidth,window.innerHeight)<640;return{coarse:n,maxDpr:n?1.5:2,shadowSize:n?1024:2048,pointLights:!n}}function Fx(n,t=lh()){const e=new ih({antialias:!0,powerPreference:"high-performance",stencil:!1});let i=Math.min(window.devicePixelRatio||1,t.maxDpr);e.setPixelRatio(i),e.outputColorSpace=Qe,e.toneMapping=yo,e.toneMappingExposure=1,e.shadowMap.enabled=!0,e.shadowMap.type=vs,e.shadowMap.autoUpdate=!1,e.shadowMap.needsUpdate=!0,Object.assign(e.domElement.style,{display:"block",width:"100%",height:"100%",touchAction:"none",outline:"none"});const s=new Gl;s.background=new Ht(j.sky),s.fog=new To(j.sky,40,120);const r=new un(bl,1,.05,300);r.rotation.order="YXZ";const o=new Nx;Object.assign(o.domElement.style,{position:"absolute",left:"0",top:"0",pointerEvents:"none",overflow:"hidden"}),getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.append(e.domElement,o.domElement);const a=new rh(r,e.domElement);a.enableDamping=!0,a.dampingFactor=.1,a.rotateSpeed=.6,a.zoomSpeed=.9,a.minDistance=_a[0],a.maxDistance=_a[1],a.minPolarAngle=xa[0],a.maxPolarAngle=xa[1],a.screenSpacePanning=!1,a.touches={ONE:dn.ROTATE,TWO:dn.DOLLY_PAN},a.mouseButtons={LEFT:Xe.ROTATE,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN},a.target.copy(va);const c=new Vd(16774118,15787736,1.1);s.add(c);const l=new qd(16777215,2.4);l.castShadow=!0,l.shadow.mapSize.set(t.shadowSize,t.shadowSize),l.shadow.bias=-5e-4,l.shadow.normalBias=.03,l.shadow.radius=4;const u=l.shadow.camera;u.left=-9,u.right=9,u.top=9,u.bottom=-9,u.near=1,u.far=60,l.target.position.copy(va),s.add(l,l.target);const f=new _l(e),d=new Ux;s.environment=f.fromScene(d,.04).texture,s.environmentIntensity=.25,d.dispose(),f.dispose();const g={left:0,right:0,top:0,bottom:0},m={...g};let x={w:1,h:1};function _(){const ct=(m.left-m.right)/2,vt=(m.top-m.bottom)/2;Math.abs(ct)<.5&&Math.abs(vt)<.5?r.clearViewOffset():r.setViewOffset(x.w,x.h,-ct,-vt,x.w,x.h),r.updateProjectionMatrix()}const h=new Set,v=new Yd;let y=3,T=!1,L=0,C=0;function w(ct=2){ct>y&&(y=ct)}const p=()=>{const ct=n.clientWidth||window.innerWidth,vt=n.clientHeight||window.innerHeight;x={w:ct,h:vt},e.setSize(ct,vt,!1),o.setSize(ct,vt),r.aspect=ct/vt,_(),w()};function M(ct){if(!T){C=0,L=0;return}C++,ct>.03&&L++,C>=40&&(L>28&&i>.9&&(i=Math.max(.9,i-.25),e.setPixelRatio(i),e.setSize(x.w,x.h,!1)),C=0,L=0)}function E(){const ct=Math.min(.1,v.getDelta());for(const Mt of h)Mt(ct);let vt=!1;for(const Mt of["left","right","top","bottom"]){const J=g[Mt]-m[Mt];Math.abs(J)>.4?(m[Mt]+=J*Math.min(1,ct*10),vt=!0):m[Mt]=g[Mt]}vt&&(_(),w()),y>0?(y--,e.render(s,r),o.render(s,r),M(ct),T=!0):T=!1}a.addEventListener("change",()=>w());const R=new U,P=new _o;function D(){return P.setFromVector3(R.copy(r.position).sub(a.target)),{target:a.target.clone(),distance:P.radius,azimuth:P.theta,polar:P.phi}}function G({target:ct,distance:vt,azimuth:Mt,polar:J}){a.target.set(ct.x,ct.y??0,ct.z),r.position.copy(a.target).add(R.setFromSphericalCoords(vt,J,Mt)),r.lookAt(a.target)}const N=ct=>ct-ku*Math.floor((ct+Math.PI)/ku);function k(ct){const vt=new U(ct.target.x,ct.target.y??0,ct.target.z),Mt=new U().setFromSphericalCoords(ct.distance,ct.polar,ct.azimuth).add(vt),J=new Pe;return J.position.copy(Mt),J.lookAt(vt),{pos:Mt,quat:J.quaternion.clone(),fov:bl}}let B=null;function Z(){a._sphericalDelta?.set(0,0,0),a._panOffset?.set(0,0,0),"_scale"in a&&(a._scale=1)}function rt(){if(!B)return;const ct=B;B=null,Z(),ct.resolve(!1)}a.addEventListener("start",rt);function mt(ct,{duration:vt=1.1}={}){rt();const Mt=D(),J={target:new U(ct.target?.x??Mt.target.x,ct.target?.y??0,ct.target?.z??Mt.target.z),distance:Ne.clamp(ct.distance??Mt.distance,..._a),azimuth:ct.azimuth??Mt.azimuth,polar:Ne.clamp(ct.polar??Mt.polar,...xa)};return vt>0?new Promise(xt=>{B={kind:"view",from:Mt,to:J,duration:vt,resolve:xt,t:0,dAz:N(J.azimuth-Mt.azimuth),d0:Math.log(Mt.distance),d1:Math.log(J.distance)},w(3)}):(G(J),Z(),w(),Promise.resolve(!0))}function At(ct,{duration:vt=1.2}={}){return rt(),vt>0?new Promise(Mt=>{B={kind:"pose",pose:ct,duration:vt,resolve:Mt,t:0,fromPos:r.position.clone(),fromQuat:r.quaternion.clone(),fromFov:r.fov},w(3)}):(r.position.copy(ct.pos),r.quaternion.copy(ct.quat),r.fov=ct.fov,r.updateProjectionMatrix(),w(),Promise.resolve(!0))}function It(ct){if(!B)return;const vt=B;vt.t=Math.min(1,vt.t+ct/vt.duration);const Mt=ah(vt.t);if(vt.kind==="view")R.lerpVectors(vt.from.target,vt.to.target,Mt),G({target:R.clone(),distance:Math.exp(Ne.lerp(vt.d0,vt.d1,Mt)),azimuth:vt.from.azimuth+vt.dAz*Mt,polar:Ne.lerp(vt.from.polar,vt.to.polar,Mt)});else{r.position.lerpVectors(vt.fromPos,vt.pose.pos,Mt),r.quaternion.slerpQuaternions(vt.fromQuat,vt.pose.quat,Mt);const J=Ne.lerp(vt.fromFov,vt.pose.fov,Mt);J!==r.fov&&(r.fov=J,r.updateProjectionMatrix())}w(),vt.t>=1&&(B=null,Z(),vt.resolve(!0))}return h.add(It),p(),new ResizeObserver(p).observe(n),document.addEventListener("visibilitychange",()=>w(3)),{renderer:e,scene:s,camera:r,controls:a,labelRenderer:o,hemi:c,sun:l,center:va,quality:t,insets:g,invalidate:w,invalidateShadows(){e.shadowMap.needsUpdate=!0,w()},onFrame(ct){return h.add(ct),()=>h.delete(ct)},flyView:mt,flyPose:At,viewPose:k,cancelFlight:rt,getView:D,get flying(){return!!B},setInsets(ct){Object.assign(g,ct),w()},start(){e.setAnimationLoop(E)},pause(){e.setAnimationLoop(null)},resume(){v.getDelta(),e.setAnimationLoop(E),w(3)}}}function Qs(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new sn;let l=0;for(let u=0;u<n.length;++u){const f=n[u];let d=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const g in f.attributes){if(!i.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+g+'" attribute exists among all geometries, or in none of them.'),null;r[g]===void 0&&(r[g]=[]),r[g].push(f.attributes[g]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const g in f.morphAttributes){if(!s.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[g]===void 0&&(o[g]=[]),o[g].push(f.morphAttributes[g])}if(t){let g;if(e)g=f.index.count;else if(f.attributes.position!==void 0)g=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,g,u),l+=g}}if(e){let u=0;const f=[];for(let d=0;d<n.length;++d){const g=n[d].index;for(let m=0;m<g.count;++m)f.push(g.getX(m)+u);u+=n[d].attributes.position.count}c.setIndex(f)}for(const u in r){const f=Gu(r[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,f)}for(const u in o){const f=o[u][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<f;++d){const g=[];for(let x=0;x<o[u].length;++x)g.push(o[u][x][d]);const m=Gu(g);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(m)}}}return c}function Gu(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){const u=n[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new _n(o,e,i);let c=0;for(let l=0;l<n.length;++l){const u=n[l];if(u.isInterleavedBufferAttribute){const f=c/e;for(let d=0,g=u.count;d<g;d++)for(let m=0;m<e;m++){const x=u.getComponent(d,m);a.setComponent(d+f,m,x)}}else o.set(u.array,c);c+=u.count*e}return s!==void 0&&(a.gpuType=s),a}const Si=2.7,ch=.2,uh=.12,$i=n=>(n.x1-n.x0)*(n.z1-n.z0),st={templateId:"",bedrooms:2,scale:1,size:{w:10,d:7},rooms:[],walls:[],placements:[],area:0,totalArea:0,floors:[],floorId:"main",custom:!1};function dh(n){st.templateId=n.templateId,st.bedrooms=n.bedrooms,st.scale=n.scale??1,st.size=n.size,st.rooms=n.rooms,st.walls=n.walls,st.placements=n.placements,st.area=n.rooms.reduce((t,e)=>t+$i(e),0),st.floors=n.floors??[{id:"main",name:"Tầng 1",area:st.area}],st.floorId=n.floorId??"main",st.totalArea=n.totalArea??st.area,st.custom=!!n.custom}const Sl=2.1,zx=.9,hh=2.1,Bx=2.3;function li(n,t=256){const e=document.createElement("canvas");e.width=e.height=t,n(e.getContext("2d"),t);const i=new kd(e);return i.wrapS=i.wrapT=nr,i.colorSpace=Qe,i.anisotropy=8,i}const kx=()=>{const n={h:0,s:0,l:0};return new Ht(j.floorWood).getHSL(n),li((t,e)=>{const s=e/8;for(let r=0;r<8;r++){const o=Math.round(n.l*100)-3+r*37%7;t.fillStyle=`hsl(${Math.round(n.h*360)} ${Math.round(n.s*100)}% ${o}%)`,t.fillRect(0,r*s,e,s),t.fillStyle="rgba(60,35,15,0.07)";for(let a=0;a<14;a++)t.fillRect((r*53+a*37)%e,r*s+a*29%s,30+a*17%60,1);t.fillStyle="rgba(60,35,15,0.30)",t.fillRect(0,r*s,e,1.5),t.fillRect(r*97%e,r*s,1.5,s)}})},Gx=()=>li((n,t)=>{n.fillStyle="#e9eef2",n.fillRect(0,0,t,t),n.strokeStyle="#c8d1da",n.lineWidth=3,n.strokeRect(0,0,t,t),n.strokeRect(t/2,0,.1,t),n.strokeRect(0,t/2,t,.1)}),cr=n=>()=>(n=(n*1664525+1013904223)%4294967296,n/4294967296),Hx=()=>li((n,t)=>{const e=cr(7);n.fillStyle="#efece6",n.fillRect(0,0,t,t),n.lineCap="round";for(let i=0;i<9;i++){n.strokeStyle=`rgba(120,115,110,${.12+e()*.2})`,n.lineWidth=.6+e()*1.6,n.beginPath();let s=e()*t,r=0;n.moveTo(s,r);for(let o=0;o<6;o++)s+=(e()-.5)*70,r+=t/6,n.lineTo(s,r);n.stroke()}n.strokeStyle="rgba(190,185,178,0.7)",n.lineWidth=1.5,n.strokeRect(0,0,t,t)}),Vx=()=>li((n,t)=>{const e=cr(11);n.fillStyle="#b9bcc0",n.fillRect(0,0,t,t);for(let i=0;i<2200;i++){const s=150+Math.floor(e()*70);n.fillStyle=`rgba(${s},${s},${s+4},0.35)`,n.fillRect(e()*t,e()*t,1+e()*2,1+e()*2)}n.strokeStyle="rgba(90,92,96,0.45)",n.lineWidth=2,n.strokeRect(0,0,t,t)}),Wx=()=>li((n,t)=>{const e=cr(3);n.fillStyle="#c9bfb2",n.fillRect(0,0,t,t);for(let i=0;i<4200;i++){const s=175+Math.floor(e()*45);n.fillStyle=`rgba(${s},${s-8},${s-20},0.55)`,n.fillRect(e()*t,e()*t,1,2)}}),Xx=()=>li((n,t)=>{const e=cr(21),i=6,s=t/i;for(let r=0;r<i;r++){const o=17+Math.floor(e()*6);n.fillStyle=`hsl(22 38% ${o}%)`,n.fillRect(0,r*s,t,s),n.fillStyle="rgba(0,0,0,0.18)";for(let a=0;a<10;a++)n.fillRect(e()*t,r*s+e()*s,30+e()*80,1);n.fillStyle="rgba(0,0,0,0.5)",n.fillRect(0,r*s,t,1.5),n.fillRect(r*83%t,r*s,1.5,s)}}),$x=()=>li((n,t)=>{const e=cr(31);n.fillStyle="#6f7378",n.fillRect(0,0,t,t);for(let i=0;i<3200;i++){const s=70+Math.floor(e()*130);n.fillStyle=`rgba(${s},${s},${s+3},0.6)`,n.fillRect(e()*t,e()*t,1+e()*2.2,1+e()*2.2)}n.strokeStyle="rgba(30,32,36,0.55)",n.lineWidth=2,n.strokeRect(0,0,t,t)}),qx=()=>li((n,t)=>{n.fillStyle="#f2f3f1",n.fillRect(0,0,t,t),n.strokeStyle="rgba(160,165,160,0.35)",n.lineWidth=1,n.strokeRect(0,0,t,t)}),Yx=()=>li((n,t)=>{n.fillStyle="#cfe9f2",n.fillRect(0,0,t,t),n.strokeStyle="rgba(90,120,135,0.9)",n.lineWidth=5,n.strokeRect(0,0,t,t),n.strokeStyle="rgba(255,255,255,0.55)",n.lineWidth=3,n.beginPath(),n.moveTo(t*.15,t*.85),n.lineTo(t*.55,t*.15),n.stroke()}),Hu={wood:[kx,2.2,.55],darkwood:[Xx,2.2,.5],tile:[Gx,1.2,.3],marble:[Hx,1.6,.15],granite:[$x,1.6,.25],concrete:[Vx,2,.85],epoxy:[qx,2,.08],carpet:[Wx,1,1],glass:[Yx,1.2,.05,{transparent:!0,opacity:.42,depthWrite:!1,metalness:.1}]},Vu=new Map;function jx(n,t){const e=n==="wood"?`wood|${j.floorWood}`:n;let i=Vu.get(e);return i||(i=t(),Vu.set(e,i)),i}function Kx(n){const t=Hu[n.floor]?n.floor:"wood",[e,i,s,r]=Hu[t],o=jx(t,e).clone();return o.needsUpdate=!0,o.repeat.set((n.x1-n.x0)/i,(n.z1-n.z0)/i),new Ge({map:o,roughness:s,...r??{}})}const ro=[];function Wu(n,t,e,i,s,r,o,a,c,l){if(i-e<1e-4||r-s<1e-4||a-o<1e-4)return;const u=new fe(i-e,r-s,a-o);u.translate((e+i)/2,(s+r)/2,(o+a)/2),ro.push({material:c,geo:u}),l&&t.push({x0:e,x1:i,z0:o,z1:a})}function Zx(n){const t=Dn(j.frame);for(const i of[...n.children])if(i.isMesh&&i.material===t){i.updateMatrix();const s=i.geometry.clone().applyMatrix4(i.matrix);ro.push({material:t,geo:s}),i.geometry.dispose(),n.remove(i)}const e=new Map;for(const{material:i,geo:s}of ro)e.has(i)||e.set(i,[]),e.get(i).push(s);for(const[i,s]of e){const r=new $t(Qs(s,!1),i);r.castShadow=!0,r.receiveShadow=!0,r.userData.blocker=!0,n.add(r);for(const o of s)o.dispose()}ro.length=0}function Jx(n,t,e){const{dir:i,at:s,t:r}=n,o=r/2,a=n.from-o,c=n.to+o,l=r>=.2,u=Dn(l?j.wallExt:j.wall),f=[...n.openings].map(m=>({...m,s:m.c-m.w/2,e:m.c+m.w/2})).sort((m,x)=>m.s-x.s),d=(m,x,_,h,v)=>{i==="x"?Wu(t,e,m,x,_,h,s-o,s+o,u,v):Wu(t,e,s-o,s+o,_,h,m,x,u,v)};let g=a;for(const m of f){if(d(g,m.s,0,Si,!0),m.type==="window"){const x=m.sill??zx;d(m.s,m.e,0,x,!0),d(m.s,m.e,hh,Si,!1),Qx(t,i,s,m,x)}else m.type==="door"?(d(m.s,m.e,Sl,Si,!1),tv(t,i,s,m,l||m.entrance===!0)):d(m.s,m.e,Bx,Si,!1);g=m.e}d(g,c,0,Si,!0)}function Qx(n,t,e,i,s){const r=hh-s,o=t==="x"?[i.w,r,.03]:[.03,r,i.w],a=new $t(new fe(...o),Ml()),c=s+r/2;t==="x"?a.position.set(i.c,c,e):a.position.set(e,c,i.c),n.add(a);const l=i.w>1.1?1:0,u=Dn(j.frame);for(let d=-1;d<=l;d+=2){const g=l?0:d<0?-i.w/2:i.w/2,m=new $t(new fe(...t==="x"?[.04,r,.06]:[.06,r,.04]),u);t==="x"?m.position.set(i.c+g,c,e):m.position.set(e,c,i.c+g),n.add(m)}const f=new $t(new fe(...t==="x"?[i.w,.04,.08]:[.08,.04,i.w]),u);t==="x"?f.position.set(i.c,s+.02,e):f.position.set(e,s+.02,i.c),n.add(f)}function tv(n,t,e,i,s){const r=i.w-.04,o=new $t(new fe(r,Sl-.03,.045),Dn(s?j.doorEntrance:j.doorLeaf,{roughness:.5}));o.position.set(r/2,(Sl-.03)/2,0),o.castShadow=!0;const a=new te;a.add(o),t==="x"?(a.position.set(i.s+.02,0,e),a.rotation.y=s?0:-1.3):(a.position.set(e,0,i.s+.02),a.rotation.y=-Math.PI/2+(s?0:1.3)),n.add(a)}function ev(n){const t=document.createElement("button");t.type="button",t.className="room-label",t.dataset.room=n.id,t.innerHTML=`<b>${n.name}</b><span>${$i(n).toFixed(0)} m²</span>`;const e=new oh(t);return e.position.set((n.x0+n.x1)/2,.5,(n.z0+n.z1)/2),e}const nv=new Xi({visible:!1}),iv={window:"Cửa sổ",door:"Cửa đi",open:"Ô thông"};function sv(n){const t=[];for(const e of st.walls)for(const i of e.openings){if(!i.id)continue;const s=e.t+.3,r=e.dir==="x"?[i.w,.9,s]:[s,.9,i.w],o=new $t(new fe(...r),nv);e.dir==="x"?o.position.set(i.c,.45,e.at):o.position.set(e.at,.45,i.c),o.userData.ref={type:"opening",id:i.id},o.userData.label=iv[i.type]??"Cửa",n.add(o),t.push({id:i.id,mesh:o})}return t}function rv(){const n=new te,t=new te,e=[],i=new $t(new Wl(60,48),Dn(j.ground,{roughness:1}));i.rotation.x=-Math.PI/2,i.position.set(st.size.w/2,-.21,st.size.d/2),i.receiveShadow=!0,n.add(i);const s=new $t(new fe(st.size.w+.9,.2,st.size.d+.9),Dn(14932176));s.position.set(st.size.w/2,-.1,st.size.d/2),s.receiveShadow=!0,s.castShadow=!0,n.add(s);const r=[],o=new Map;for(const f of st.rooms){const d=new $t(new fe(f.x1-f.x0,.04,f.z1-f.z0),Kx(f));d.position.set((f.x0+f.x1)/2,.02,(f.z0+f.z1)/2),d.receiveShadow=!0,d.userData.ref={type:"room",id:f.id},o.set(f.id,d),n.add(d);const g=ev(f);n.add(g),r.push(g)}for(const f of st.walls)Jx(f,t,e);Zx(t),n.add(t);const a=new te;n.add(a);const c=sv(a),l=new $t(new fe(st.size.w+.2,.1,st.size.d+.2),Dn(j.trim,{roughness:.95}));l.position.set(st.size.w/2,Si+.05,st.size.d/2),l.castShadow=!0,l.receiveShadow=!0,l.visible=!1,n.add(l);const u=st.rooms.map(f=>{const d=new $d(16773336,7,8,2);return d.position.set((f.x0+f.x1)/2,Si-.3,(f.z0+f.z1)/2),n.add(d),d});return{root:n,walls:t,ceiling:l,labels:r,lamps:u,colliders:e,floors:o,openings:c}}function gt(n,t,e,i,s,r,o,a,c){const l=new $t(new fe(t,e,i),typeof s=="object"?s:Dn(s,c));return l.position.set(r,o+e/2,a),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function Ce(n,t,e,i,s,r,o,a,c,l=24){const u=new $t(new lr(t,e,i,l),Dn(s,c));return u.position.set(r,o+i/2,a),u.castShadow=!0,u.receiveShadow=!0,n.add(u),u}function oo(n,t,e,i,s,r,o=1,a=1,c=1){const l=new $t(new ws(t,16,12),Dn(e));return l.position.set(i,s,r),l.scale.set(o,a,c),l.castShadow=!0,n.add(l),l}const Te=(n,t,e,i={})=>({group:n,w:t,d:e,...i});function ov(n=2.4){const t=new te,e=.95;gt(t,n,.16,e,j.sofaDark,0,.08,0);const i=3,s=(n-.3)/i;for(let r=0;r<i;r++)gt(t,s-.02,.2,.68,j.sofa,-n/2+.15+s*(r+.5),.24,.1);gt(t,n,.5,.22,j.sofa,0,.24,-e/2+.11);for(const r of[-1,1])gt(t,.15,.36,e,j.sofa,r*(n/2-.075),.24,0);return gt(t,.45,.4,.12,j.accent,-n/2+.55,.44,-.2),gt(t,.45,.4,.12,j.fabricBeige,n/2-.55,.44,-.2),Te(t,n,e)}function av(){const n=new te;gt(n,.85,.16,.85,j.sofaDark,0,.08,0),gt(n,.6,.18,.6,j.fabricBeige,0,.24,.07),gt(n,.85,.5,.2,j.fabricBeige,0,.24,-.325);for(const t of[-1,1])gt(n,.13,.34,.85,j.fabricBeige,t*.36,.24,0);return Te(n,.85,.85)}function lv(){const n=new te;gt(n,1.1,.04,.6,j.woodLight,0,.38,0);for(const t of[-1,1])for(const e of[-1,1])gt(n,.05,.38,.05,j.woodDark,t*.5,0,e*.25);return gt(n,.3,.05,.2,j.white,-.2,.42,0),Ce(n,.06,.05,.1,j.accent,.25,.42,.05),Te(n,1.1,.6)}function cv(n=1.8){const t=new te;return gt(t,n,.45,.4,j.woodMid,0,0,0),gt(t,n-.1,.02,.38,j.woodDark,0,.22,.01),gt(t,1.35,.78,.05,j.black,0,.55,0),gt(t,.25,.1,.12,j.black,0,.45,0),Te(t,n,.4)}function uv(n,t,e=j.rug){e==="beige"&&(e=j.fabricBeige);const i=new te;return gt(i,n,.015,t,e,0,.04,0),gt(i,n-.3,.017,t-.3,j.fabricGrey,0,.04,0),Te(i,n,t,{solid:!1})}function dv(n=1){const t=new te;return Ce(t,.18*n,.13*n,.32*n,j.pot,0,0,0),oo(t,.3*n,j.leaf,0,.62*n,0,1,1.2,1),oo(t,.2*n,j.leafDark,.12*n,.85*n,.05*n),oo(t,.18*n,j.leaf,-.1*n,.95*n,-.05*n),Te(t,.4*n,.4*n)}function hv(){const n=new te;Ce(n,.12,.12,.03,j.black,0,0,0),Ce(n,.012,.012,1.5,j.black,0,.03,0);const t=Ce(n,.15,.22,.28,16773590,0,1.45,0,{emissive:16769704,emissiveIntensity:.6});return t.castShadow=!1,Te(n,.3,.3)}function fv(n=1){const t=new te;gt(t,n,.04,.3,j.woodMid,0,.78,0),gt(t,n-.04,.5,.28,j.cabinet,0,.28,0);for(const e of[-1,1])gt(t,.04,.28,.04,j.woodDark,e*(n/2-.05),0,0);return Ce(t,.07,.05,.16,j.pot,-.25,.82,0),gt(t,.22,.02,.15,j.accent,.2,.82,0),Te(t,n,.3)}function pv(n=1.6,t=2){const e=new te;gt(e,n+.1,.25,t+.05,j.woodDark,0,0,0),gt(e,n,.22,t,j.bedding,0,.25,.02),gt(e,n,.04,t*.55,j.blanket,0,.46,t*.2),gt(e,n+.1,.95,.08,j.woodMid,0,0,-t/2-0);for(const i of[-1,1])gt(e,.55,.12,.35,j.white,i*n*.25,.47,-t/2+.3);return Te(e,n+.1,t+.05)}function mv(){const n=new te;gt(n,.45,.5,.4,j.woodLight,0,0,0),gt(n,.4,.01,.01,j.woodDark,0,.3,.2);const t=Ce(n,.09,.12,.16,16773590,0,.5,0,{emissive:16769704,emissiveIntensity:.5});return t.castShadow=!1,Te(n,.45,.4)}function gv(n=1.4,t=2.2){const e=new te;gt(e,n,t,.6,j.cabinet,0,0,0);const i=Math.max(2,Math.round(n/.7));for(let s=1;s<i;s++)gt(e,.012,t-.1,.01,j.cabinetDark,-n/2+n/i*s,.05,.305);for(let s=0;s<i;s++){const r=-n/2+n/i*(s+.5);gt(e,.025,.28,.02,j.steel,r+(s%2?-.1:.1),1,.31)}return Te(e,n,.6)}function _v(){const n=new te;gt(n,1.2,.04,.6,j.woodLight,0,.72,0);for(const t of[-1,1])gt(n,.04,.72,.55,j.woodDark,t*.56,0,0);return gt(n,.5,.3,.03,j.black,0,.9,-.12),gt(n,.06,.18,.06,j.black,0,.76,-.12),gt(n,.4,.015,.14,j.white,0,.76,.1),Te(n,1.2,.6)}function xv(){const n=new te;gt(n,.42,.04,.42,j.woodLight,0,.44,0);for(const t of[-1,1])for(const e of[-1,1])gt(n,.035,.44,.035,j.woodDark,t*.18,0,e*.18);return gt(n,.42,.42,.04,j.woodLight,0,.48,-.19),Te(n,.42,.42)}function vv(){const n=new te;gt(n,1.4,.05,.8,j.woodLight,0,.72,0);for(const t of[-1,1])for(const e of[-1,1])gt(n,.06,.72,.06,j.woodDark,t*.64,0,e*.34);return Ce(n,.11,.08,.16,j.white,0,.77,0),oo(n,.1,j.accent,0,1,0),Te(n,1.4,.8)}function Mv(n=3,t=!0){const e=new te,i=.6;gt(e,n,.86,i,j.cabinet,0,0,0),gt(e,n+.02,.04,i+.04,j.counter,0,.86,.02);for(let s=1;s<Math.round(n/.6);s++)gt(e,.01,.8,.01,j.cabinetDark,-n/2+s*.6,.03,i/2+.005);gt(e,.7,.012,.42,j.steel,-n*.25,.9,.02),Ce(e,.015,.015,.28,j.steel,-n*.25,.9,-.2),gt(e,.012,.012,.14,j.steel,-n*.25,1.17,-.13),gt(e,.6,.012,.5,j.black,n*.2,.9,.02);for(const[s,r]of[[-.14,-.1],[.14,-.1],[-.14,.12],[.14,.12]])Ce(e,.08,.08,.008,j.cabinetDark,n*.2+s,.9,.02+r,{},20);return gt(e,n,.7,.35,j.cabinet,0,1.5,-.125),gt(e,.75,.12,.4,j.steel,n*.2,1.38,-.1),Te(e,n,i)}function bv(){const n=new te;return gt(n,.7,1.85,.7,j.steel,0,0,0,{metalness:.35,roughness:.4}),gt(n,.68,.012,.01,j.cabinetDark,0,.62,.355),gt(n,.025,.5,.03,j.cabinetDark,.28,1.1,.36),gt(n,.025,.3,.03,j.cabinetDark,.28,.25,.36),Te(n,.7,.7)}function Sv(n=1.2){const t=new te,e=.32,i=2;gt(t,.03,i,e,j.woodMid,-n/2+.015,0,0),gt(t,.03,i,e,j.woodMid,n/2-.015,0,0),gt(t,n,.02,.01,j.woodDark,0,0,-e/2+.005),gt(t,n,i,.015,j.woodDark,0,0,-e/2+.01);const s=5,r=[j.accent,j.sofa,j.fabricBeige,j.leaf,j.blanket];for(let o=0;o<=s;o++)gt(t,n,.025,e,j.woodMid,0,(i-.025)*(o/s),0);for(let o=0;o<s;o++){const a=(i-.025)*(o/s)+.025;let c=-n/2+.07;for(let l=0;c<n/2-.12;l++){const u=.04+(o*7+l*5)%4*.012,f=.22+(o*3+l*7)%5*.025;gt(t,u,f,e*.7,r[(o+l)%r.length],c+u/2,a,.02),c+=u+.008,l%6===5&&(c+=.18)}}return Te(t,n,e)}function yv(){const n=new te;gt(n,1,.8,.45,j.woodLight,0,.05,0);for(const t of[-1,1])for(const e of[-1,1])gt(n,.04,.05,.04,j.woodDark,t*.45,0,e*.19);for(let t=0;t<3;t++)gt(n,.92,.002,.01,j.woodDark,0,.05+.26*(t+1)-.02,.226),gt(n,.1,.02,.025,j.steel,0,.05+.26*t+.13,.235);return Ce(n,.07,.06,.12,j.pot,-.3,.85,0),gt(n,.22,.03,.16,j.accent,.25,.85,0),Te(n,1,.45)}function Ev(){const n=new te;return Ce(n,.24,.24,.03,j.woodLight,0,.47,0,{},28),Ce(n,.015,.015,.47,j.black,0,0,0),Ce(n,.15,.15,.02,j.black,0,0,0),Ce(n,.05,.04,.09,j.pot,.06,.5,.03),Te(n,.5,.5)}function Tv(){const n=new te;return Ce(n,.28,.3,.38,j.fabricBeige,0,.02,0,{},28),Ce(n,.29,.29,.04,j.sofaDark,0,.38,0,{},28),Te(n,.6,.6)}function wv(){const n=new te;return Ce(n,.17,.17,.05,j.woodLight,0,.62,0,{},24),Ce(n,.014,.014,.62,j.black,0,0,0),Ce(n,.15,.15,.02,j.black,0,0,0),Te(n,.36,.36)}function Av(){const n=new te;return gt(n,.6,1.7,.04,j.woodDark,0,.05,0),gt(n,.5,1.6,.012,13624303,0,.1,.022,{metalness:.9,roughness:.08}),gt(n,.04,.5,.2,j.woodDark,-.2,0,-.12),gt(n,.04,.5,.2,j.woodDark,.2,0,-.12),Te(n,.6,.3)}function Rv(){const n=new te;return gt(n,.38,.4,.2,j.white,0,.35,-.2),gt(n,.36,.38,.5,j.white,0,0,0),gt(n,.36,.04,.4,j.white,0,.38,.05),Te(n,.4,.62)}function Cv(){const n=new te;return gt(n,.6,.78,.5,j.cabinet,0,0,0),gt(n,.64,.04,.54,j.counter,0,.78,0),gt(n,.34,.01,.28,j.white,0,.82,.02),Ce(n,.012,.012,.16,j.steel,0,.82,-.18),gt(n,.5,.7,.02,j.glass,0,1.15,-.24,{transparent:!0,opacity:.55,metalness:.8,roughness:.05}),Te(n,.64,.54)}function Pv(){const n=new te;gt(n,.9,.06,.9,j.white,0,0,0);const t=new $t(new fe(.9,1.95,.025),Ml());t.position.set(0,.06+.975,.45),n.add(t);const e=new $t(new fe(.025,1.95,.9),Ml());return e.position.set(.45,.06+.975,0),n.add(e),Ce(n,.012,.012,1.1,j.steel,-.38,1,-.38),Ce(n,.09,.09,.015,j.steel,-.3,2.05,-.38),Te(n,.9,.9)}function Lv(n,t,e,i,s,r=0){if(e.group.position.set(i,0,s),e.group.rotation.y=r,n.add(e.group),e.solid===!1)return e.group;const o=Math.abs(Math.sin(r))>.5,a=o?e.d:e.w,c=o?e.w:e.d;return t.push({x0:i-a/2,x1:i+a/2,z0:s-c/2,z1:s+c/2}),e.group}const Dv={sofa:ov,armchair:av,coffeeTable:lv,tvUnit:cv,rug:uv,plant:dv,floorLamp:hv,console:fv,bed:pv,nightstand:mv,wardrobe:gv,desk:_v,chair:xv,diningTable:vv,kitchenRun:Mv,fridge:bv,toilet:Rv,vanity:Cv,shower:Pv,bookshelf:Sv,dresser:yv,sideTable:Ev,ottoman:Tv,barStool:wv,standingMirror:Av};function Iv(n){n.updateMatrixWorld(!0);const t=new Map;for(const e of[...n.children]){if(!e.isMesh)continue;const i=e.material.uuid+(e.castShadow?"c":"n");t.has(i)||t.set(i,{material:e.material,cast:e.castShadow,geos:[]});const s=e.geometry.clone();s.applyMatrix4(e.matrix),t.get(i).geos.push(s),e.geometry.dispose(),n.remove(e)}for(const e of t.values()){const i=e.geos.length>1?Qs(e.geos,!1):e.geos[0];if(e.geos.length>1)for(const r of e.geos)r.dispose();const s=new $t(i,e.material);s.castShadow=e.cast,s.receiveShadow=!0,n.add(s)}}function Nv(){const n=new te,t=[],e=new Map;for(const i of st.placements){const s=Dv[i.kind];if(!s)throw new Error("Thiếu builder nội thất: "+i.kind);const r=s(...i.args??[]);(i.pick===!1||i.hidden)&&(r.solid=!1),Iv(r.group);const o=Lv(n,t,r,i.x,i.z,i.rot??0);o.name=i.id,i.hidden&&(o.visible=!1),e.set(i.id,o)}return{root:n,colliders:t,groups:e}}const ki={room:new Map,item:new Map,opening:new Map},Uv={window:"Cửa sổ",door:"Cửa đi",open:"Ô thông"};function fh(n,t){return st.rooms.find(e=>n>=e.x0&&n<=e.x1&&t>=e.z0&&t<=e.z1)??null}function ph(){ki.room=new Map(st.rooms.map(n=>[n.id,{...n,type:"room",area:$i(n)}])),ki.item=new Map(st.placements.filter(n=>n.pick).map(n=>[n.id,{...n,type:"item",roomId:fh(n.x,n.z)?.id??null,dims:null}])),ki.opening=new Map(st.walls.flatMap(n=>n.openings.filter(t=>t.id).map(t=>[t.id,{...t,kind:t.type,type:"opening",name:Ov(t.type),dir:n.dir,at:n.at,wallFrom:n.from,wallTo:n.to,roomId:null}])))}const Ov=n=>Uv[n]??"Cửa",pe={get:(n,t)=>ki[n]?.get(t)??null,list:n=>[...ki[n]?.values()??[]],itemsIn:n=>[...ki.item.values()].filter(t=>t.roomId===n),room:n=>ki.room.get(n)??null},Vr=.14,Fv=new Ht(15985891),zv=new Ht(15913909),Bv=new Ht(16758904),kv=new Ht(16775406);function Gv(n){const t=[];n.traverse(e=>{e.isCSS2DObject&&t.push(e)});for(const e of t)e.removeFromParent()}function Hv(n){n.traverse(t=>{t.isMesh&&(t.geometry?.dispose(),t.material?.map&&(t.material.map.dispose(),t.material.dispose()))})}function Vv(n){const{scene:t,sun:e,hemi:i,quality:s}=n;let r=null,o=null,a=[];const c=new Map,l=new Map,u=[],f=[];let d=!1;const g=[],m=[],x=(M,E)=>`${M}:${E}`;let _=Vr,h=Vr,v=1.5,y=!1,T=10;function L(){for(const M of[r?.root,o?.root])M&&(Gv(M),t.remove(M),Hv(M));r=o=null,a=[],c.clear(),l.clear(),u.length=0,f.length=0,g.length=0,m.length=0}function C(){const M=st.size.w,E=st.size.d;n.center.set(M/2,0,E/2),e.target.position.copy(n.center);const R=Math.max(M,E)*.9,P=e.shadow.camera;P.left=-R,P.right=R,P.top=R,P.bottom=-R,P.updateProjectionMatrix()}function w(){if(r=rv(),o=Nv(),t.add(r.root,o.root),!s.pointLights)for(const E of r.lamps)r.root.remove(E);a=s.pointLights?r.lamps:[];for(const E of pe.list("room")){const R=r.floors.get(E.id);c.set(x("room",E.id),R),u.push(R),l.set(x("room",E.id),new yn(new U(E.x0,0,E.z0),new U(E.x1,.08,E.z1)))}const M=new U;for(const E of pe.list("item")){const R=o.groups.get(E.id);if(!R)continue;R.userData.ref={type:"item",id:E.id},c.set(x("item",E.id),R),u.push(R);const P=new yn().setFromObject(R);l.set(x("item",E.id),P),P.getSize(M),E.dims={w:M.x,d:M.z,h:M.y}}for(const E of r.openings)c.set(x("opening",E.id),E.mesh),l.set(x("opening",E.id),new yn().setFromObject(E.mesh)),f.push(E.mesh);d&&u.push(...f),g.push(...r.walls.children.filter(E=>E.isMesh)),m.push(...r.colliders,...o.colliders),C(),p.snapWalking(y),p.setHour(T)}const p={pickables:u,blockers:g,colliders:m,get walls(){return r?.walls},get ceiling(){return r?.ceiling},get labels(){return r?.labels??[]},getObject:(M,E)=>c.get(x(M,E))??null,getBox:(M,E=new yn)=>{const R=l.get(x(M.type,M.id));return R?E.copy(R):null},getEntityPosition(M,E,R=new U){const P=l.get(x(M,E));return P?P.getCenter(R):null},setEditing(M){d=M;for(const E of f){const R=u.indexOf(E);M&&R<0&&u.push(E),!M&&R>=0&&u.splice(R,1)}},moveItem(M,E,R){const P=c.get(x("item",M));if(!P)return;P.position.x=E,P.position.z=R;const D=l.get(x("item",M));D&&D.setFromObject(P),n.invalidate()},rebuild(){L(),w(),n.invalidateShadows()},setWalking(M){y=M,_=M?1:Vr,v=M?16:1.5,t.environmentIntensity=M?.8:.25,!M&&r&&(r.ceiling.visible=!1),n.invalidate(3)},setCeiling(M){r&&(r.ceiling.visible=M),n.invalidateShadows()},setHour(M){T=M;const R=Ne.clamp((M-6)/12,0,1)*Math.PI,P=Math.sin(R),D=n.center;e.position.set(D.x-Math.cos(R)*16,3+P*15,D.z+8),e.intensity=.7+2.3*P,e.color.lerpColors(Bv,kv,Math.min(1,P*1.6)),i.intensity=.7+.6*P,t.background.lerpColors(zv,Fv,Math.min(1,P*1.6)),t.fog.color.copy(t.background),n.invalidateShadows()},update(M){r&&h!==_&&(h+=(_-h)*Math.min(1,M*5),Math.abs(_-h)<.002&&(h=_),r.walls.scale.y=h,n.invalidateShadows());for(const E of a)E.intensity!==v&&(E.intensity+=(v-E.intensity)*Math.min(1,M*4),Math.abs(v-E.intensity)<.02&&(E.intensity=v),n.invalidate())},snapWalking(M){y=M,h=_=M?1:Vr,v=M?16:1.5,t.environmentIntensity=M?.8:.25,r&&(r.walls.scale.y=h,r.ceiling.visible=M);for(const E of a)E.intensity=v;n.invalidateShadows()},wallHeight:Si};return w(),p}const mh=1.62,Xu=.28,Wv=1.9,Xv=3.4,$u=.0036,Wr=.3,qu={KeyW:[0,-1],ArrowUp:[0,-1],KeyS:[0,1],ArrowDown:[0,1],KeyA:[-1,0],KeyD:[1,0]},Ma={ArrowLeft:1,ArrowRight:-1,KeyQ:1,KeyE:-1};function ba(n,t,e){for(const i of n){const s=Math.max(i.x0,Math.min(t,i.x1)),r=Math.max(i.z0,Math.min(e,i.z1)),o=t-s,a=e-r;if(o*o+a*a<Xu*Xu)return!0}return!1}function $v({camera:n,dom:t,colliders:e}){const i={x:5,z:.7,yaw:Math.PI,pitch:0,enabled:!1},s=new Set;let r=null,o=null;const a={x:0,z:0},c=g=>{!i.enabled||/^(INPUT|TEXTAREA|SELECT)$/.test(g.target?.tagName??"")||(qu[g.code]||Ma[g.code]||g.code==="ShiftLeft")&&(s.add(g.code),g.preventDefault())},l=g=>s.delete(g.code),u=()=>s.clear();window.addEventListener("keydown",c),window.addEventListener("keyup",l),window.addEventListener("blur",u),t.addEventListener("pointerdown",g=>{i.enabled&&(r={id:g.pointerId,x:g.clientX,y:g.clientY},t.setPointerCapture(g.pointerId))}),t.addEventListener("pointermove",g=>{!r||g.pointerId!==r.id||(i.yaw-=(g.clientX-r.x)*$u,i.pitch=Ne.clamp(i.pitch-(g.clientY-r.y)*$u,-1.25,1.25),r.x=g.clientX,r.y=g.clientY)});const f=g=>{r&&g.pointerId===r.id&&(r=null)};t.addEventListener("pointerup",f),t.addEventListener("pointercancel",f);function d(){n.position.set(i.x,mh,i.z),n.rotation.set(i.pitch,i.yaw,0,"YXZ")}return{state:i,set(g,m,x,_=0){i.x=g,i.z=m,i.yaw=x,i.pitch=_},setEnabled(g){i.enabled=g,o=null,g||(s.clear(),r=null,a.x=a.z=0)},setAxis(g,m){a.x=g,a.z=m},press(g,m){m?s.add(g):s.delete(g)},update(g){if(!i.enabled)return!1;for(const v of s)Ma[v]&&(i.yaw+=Ma[v]*1.8*g);let m=a.x,x=a.z;for(const v of s){const y=qu[v];y&&(m+=y[0],x+=y[1])}if(m||x){const v=Math.max(1,Math.hypot(m,x));m/=v,x/=v;const y=(s.has("ShiftLeft")?Xv:Wv)*g,T=Math.sin(i.yaw),L=Math.cos(i.yaw),C=(m*L+x*T)*y,w=(-m*T+x*L)*y,p=Ne.clamp(i.x+C,Wr,st.size.w-Wr),M=Ne.clamp(i.z+w,Wr,st.size.d-Wr),E=ba(e,i.x,i.z);(E||!ba(e,p,i.z))&&(i.x=p),(E||!ba(e,i.x,M))&&(i.z=M)}d();const _=i.x+i.z*31+i.yaw*57+i.pitch*91,h=_!==o;return o=_,h},applyToCamera:d,dispose(){window.removeEventListener("keydown",c),window.removeEventListener("keyup",l),window.removeEventListener("blur",u)}}}const qv={mode:"overview",roomId:null,selection:null,hover:null,hour:10,playing:!1,menu:null,searchQuery:"",editable:!1,editing:!1,tool:null,listingArea:0,floorId:null,editPanel:null,designs:[],designId:null};function Yv(n){let t={...n};const e=new Set;return{get state(){return t},set(i){const s=t,r=Object.keys(i).filter(o=>!Object.is(s[o],i[o]));if(r.length){t={...s,...i};for(const o of[...e])o(t,s,r)}},subscribe(i){return e.add(i),()=>e.delete(i)}}}const q=Yv(qv);q.select=function(t){if(!t)return q.set({selection:null});const e=pe.get(t.type,t.id);if(!e)return;const i=t.type==="opening"?q.state.roomId:e.roomId??e.id;q.set({selection:{type:t.type,id:t.id},roomId:i,menu:null})};function jv(){const n=new Map;return{on(t,e){return n.has(t)||n.set(t,new Set),n.get(t).add(e),()=>n.get(t)?.delete(e)},emit(t,e){for(const i of[...n.get(t)??[]])i(e)}}}const Nt=jv();function Xr(){const{w:n,d:t}=st.size;return{target:{x:n/2,y:0,z:t/2},distance:Math.max(n,t)*1.1+7.5,azimuth:Math.PI-.5,polar:.95}}function Kv(){for(const n of st.walls){const t=n.openings.find(e=>e.entrance);if(t)return n.dir==="x"?{x:t.c,z:n.at+.75,yaw:n.at===0?Math.PI:0}:{x:n.at+.75,z:t.c,yaw:n.at===0?-Math.PI/2:Math.PI/2}}return{x:st.size.w/2,z:st.size.d/2,yaw:Math.PI}}const Zv={zoomIn:.75,zoomOut:1.33},$r=Math.PI/6,qr=.12;function Jv(n,t,e){const{camera:i,controls:s}=n,r=new U;let o=!1,a=null;const c=()=>a??n.getView();function l(w,p){const M={...n.getView(),...w,target:w.target??s.target.clone()};a=M,n.flyView(w,p).then(()=>{a===M&&(a=null)})}function u(w){const p=c(),M=w.x1-w.x0,E=w.z1-w.z0;return{target:{x:(w.x0+w.x1)/2,y:0,z:(w.z0+w.z1)/2},distance:Math.max(M,E)*1.45+3.5,azimuth:p.azimuth,polar:Ne.clamp(p.polar,.7,1.1)}}function f(w,p=8){const M=t.getEntityPosition(w.type,w.id,new U);if(!M)return null;const E=c();return{target:{x:M.x,y:0,z:M.z},distance:p,azimuth:E.azimuth,polar:Ne.clamp(E.polar,.7,1.1)}}function d({x:w,z:p,yaw:M,pitch:E=0}){const R=new ai().setFromEuler(new Wn(E,M,0,"YXZ"));return{pos:new U(w,mh,p),quat:R,fov:Bu}}async function g(w,p=1.4){s.enabled=!1,e.setEnabled(!1),t.setWalking(!0),e.set(w.x,w.z,w.yaw,0),!(!await n.flyPose(d(w),{duration:p})||q.state.mode!=="walk")&&(t.setCeiling(!0),e.setEnabled(!0),n.invalidate())}async function m(w=Xr(),p=1.4){e.setEnabled(!1),t.setWalking(!1);const M=n.viewPose({...w,target:w.target});!await n.flyPose(M,{duration:p})||q.state.mode!=="overview"||(n.camera.fov=M.fov,n.camera.updateProjectionMatrix(),s.target.set(w.target.x,0,w.target.z),s.enabled=!0,s.update(),n.invalidate())}function x(w){return w?.stand??Kv()}function _(w){const p=pe.room(q.state.roomId);w==="walk"?g(x(p)):m(p?u(p):Xr())}function h(w){const p=pe.room(w);if(p)if(q.set({roomId:w}),q.state.mode==="walk"){e.setEnabled(!1);const M=x(p);e.set(M.x,M.z,M.yaw,0),n.flyPose(d(M),{duration:1}).then(E=>{E&&q.state.mode==="walk"&&e.setEnabled(!0)})}else l(u(p),{duration:1.1})}function v(w){if(i.updateMatrixWorld(),r.copy(w).project(i),r.z>1)return null;const p=n.renderer.domElement.clientWidth,M=n.renderer.domElement.clientHeight,{left:E,right:R,top:P,bottom:D}=n.insets,G=(r.x+1)/2*p,N=(1-r.y)/2*M,k=Math.max(1,p-E-R),B=Math.max(1,M-P-D);return{fx:(G-E)/k,fy:(N-P)/B}}function y(w){if(q.state.mode!=="overview"||n.flying)return;const p=t.getEntityPosition(w.type,w.id,new U);if(!p)return;const M=n.getView(),E=v(p.clone().setY(.4));if(E&&E.fx>qr&&E.fx<1-qr&&E.fy>qr&&E.fy<1-qr&&M.distance<22)return;const P=f(w,Math.min(M.distance,9));P&&l(P,{duration:.9})}function T(w){const p=t.getEntityPosition(w.type,w.id,new U);if(p)if(q.state.mode==="walk"){const M=pe.room(q.state.roomId)??pe.room(fh(p.x,p.z)?.id),E=M?(M.x0+M.x1)/2:p.x,R=M?(M.z0+M.z1)/2:p.z,P=new Gt(E-p.x,R-p.z);P.lengthSq()<1e-4&&P.set(0,1),P.normalize();const D={x:Ne.clamp(p.x+P.x*1.9,.35,9.65),z:Ne.clamp(p.z+P.y*1.9,.35,6.65)},G=Math.atan2(-(p.x-D.x),-(p.z-D.z));e.setEnabled(!1),e.set(D.x,D.z,G,-.12),n.flyPose(d({...D,yaw:G,pitch:-.12}),{duration:.9}).then(N=>{N&&q.state.mode==="walk"&&e.setEnabled(!0)})}else{const M=f(w,w.type==="room"?12:6.5);M&&l(M,{duration:1})}}function L({cmd:w}={}){if(q.state.mode==="walk"){w==="rotateLeft"||w==="rotateRight"?(e.state.yaw+=w==="rotateLeft"?$r:-$r,n.invalidate()):w==="home"&&h(q.state.roomId??"living");return}const p=c(),M={target:p.target,distance:p.distance,azimuth:p.azimuth,polar:p.polar};switch(w){case"zoomIn":case"zoomOut":return l({...M,distance:p.distance*Zv[w]},{duration:.45});case"rotateLeft":case"rotateRight":return l({...M,azimuth:p.azimuth+(w==="rotateLeft"?-$r:$r)},{duration:.6});case"home":return l(Xr(),{duration:1.1})}}const C=[q.subscribe((w,p,M)=>{n.invalidate(),M.includes("mode")&&!o?_(w.mode):M.includes("selection")&&w.selection&&w.selection.type==="item"&&!w.editing&&y(w.selection)}),Nt.on("room:go",({id:w})=>h(w)),Nt.on("camera:locate",w=>w.type==="room"?h(w.id):T(w)),Nt.on("camera:cmd",L)];return{start({walk:w=!1,room:p=null}={}){a=null;const M=p?pe.room(p):null;if(M&&q.set({roomId:M.id}),w){o=!0,q.set({mode:"walk"}),o=!1,s.enabled=!1;const E=x(M);e.set(E.x,E.z,E.yaw,0),e.applyToCamera(),i.fov=Bu,i.updateProjectionMatrix(),t.snapWalking(!0),e.setEnabled(!0)}else o=!0,q.set({mode:"overview"}),o=!1,e.setEnabled(!1),i.fov=bl,i.updateProjectionMatrix(),t.snapWalking(!1),s.enabled=!0,n.flyView(M?u(M):Xr(),{duration:0})},update(){q.state.mode==="overview"&&s.enabled&&!n.flying&&s.update()},dispose(){C.forEach(w=>w())}}}const Yu=6,Qv=.12,tM=.05,gh=(n,t)=>n===t||!!n&&!!t&&n.type===t.type&&n.id===t.id;function eM(n,t){const e=new te;e.name="interaction-overlay",n.scene.add(e);const i=nM(n,t),s=ju(e,"selected"),r=ju(e,"hover"),o=()=>{const{hover:c,selection:l}=q.state;s.show(l,t),r.show(gh(c,l)?null:c,t),n.invalidate()},a=q.subscribe((c,l,u)=>{(u.includes("selection")||u.includes("hover"))&&o()});return{refresh:o,update(c){i.update(c)},dispose(){a(),i.dispose(),n.scene.remove(e)}}}function nM(n,t){const e=n.renderer.domElement,i=new Kl,s=new Gt;let r=null,o=null,a=!1,c=0;function l(h,v){const y=e.getBoundingClientRect();s.set((h-y.left)/y.width*2-1,-((v-y.top)/y.height)*2+1),i.setFromCamera(s,n.camera);const T=i.intersectObjects([...t.pickables,...t.blockers],!0);for(const L of T){if(L.object.userData.blocker)return null;const C=iM(L.object);if(C)return C}return null}function u(h){gh(h,q.state.hover)||q.set({hover:h?{type:h.type,id:h.id}:null})}const f=h=>{h.pointerType==="mouse"&&(r={x:h.clientX,y:h.clientY},a=!0,o&&!o.dragging&&Math.hypot(h.clientX-o.x,h.clientY-o.y)>Yu&&(o.dragging=!0,u(null)))},d=h=>{o={id:h.pointerId,x:h.clientX,y:h.clientY,button:h.button,dragging:!1}},g=h=>{const v=o;if(o=null,!v||v.id!==h.pointerId||v.dragging||v.button!==0||Math.hypot(h.clientX-v.x,h.clientY-v.y)>Yu)return;const y=l(h.clientX,h.clientY);y?q.select(y):h.pointerType!=="mouse"&&q.select(null)},m=()=>{o=null},x=()=>{r=null,o||u(null)},_=h=>{h.key!=="Escape"||/^(INPUT|TEXTAREA|SELECT)$/.test(h.target?.tagName??"")||q.state.selection&&q.select(null)};return e.addEventListener("pointermove",f),e.addEventListener("pointerdown",d),e.addEventListener("pointerup",g),e.addEventListener("pointercancel",m),e.addEventListener("pointerleave",x),window.addEventListener("keydown",_),{update(h){if(c+=h,!r||o?.dragging||!a||c<Qv||n.flying)return;a=!1,c=0;const v=l(r.x,r.y);u(v),o||(e.style.cursor=v?"pointer":"")},dispose(){e.removeEventListener("pointermove",f),e.removeEventListener("pointerdown",d),e.removeEventListener("pointerup",g),e.removeEventListener("pointercancel",m),e.removeEventListener("pointerleave",x),window.removeEventListener("keydown",_)}}}function iM(n){for(let t=n;t;t=t.parent){if(t.visible===!1)return null;if(t.userData?.ref&&pe.get(t.userData.ref.type,t.userData.ref.id))return t.userData.ref}return null}function sM(n=.22){const t=[];for(const i of[-.5,.5])for(const s of[-.5,.5])for(const r of[-.5,.5])t.push(i,s,r,i-Math.sign(i)*n,s,r),t.push(i,s,r,i,s-Math.sign(s)*n,r),t.push(i,s,r,i,s,r-Math.sign(r)*n);const e=new sn;return e.setAttribute("position",new we(t,3)),e}const rM=sM(),oM=new fe(1,1,1),aM={hover:{color:14262412,opacity:.6,fill:.06},selected:{color:12999226,opacity:1,fill:.14}};function ju(n,t){const e=aM[t],i=new te;i.visible=!1;const s=new dp(rM,new zd({color:e.color,transparent:!0,opacity:e.opacity,depthTest:!1,toneMapped:!1}));s.renderOrder=20;const r=new $t(oM,new Xi({color:e.color,transparent:!0,opacity:e.fill,depthWrite:!1,toneMapped:!1}));r.renderOrder=19,i.add(r,s),n.add(i);const o=document.createElement("div");o.className=`pill pill--${t}`;const a=new oh(o);a.visible=!1,n.add(a);const c=new yn,l=new U,u=new U;let f=null;return{show(d,g){if(!d||!g.getBox(d,c)){f=null,i.visible=!1,a.visible=!1;return}f=d,c.getSize(l).addScalar(tM*2),c.getCenter(u),i.position.copy(u),i.scale.copy(l),i.visible=!0;const m=pe.get(d.type,d.id);o.textContent=m?.name??"",a.visible=d.type==="item",a.position.set(u.x,c.max.y+.18,u.z)},get current(){return f}}}const Ku={bare:0,partial:1,full:2},ji={sofa:[2.2],armchair:[],ottoman:[],coffeeTable:[],sideTable:[],tvUnit:[1.5],bookshelf:[1.2],dresser:[],wardrobe:[1.2,2.2],bed:[],nightstand:[],desk:[],chair:[],diningTable:[],barStool:[],console:[1],plant:[1],floorLamp:[],standingMirror:[],rug:[2.4,1.6],kitchenRun:[2.4],fridge:[],toilet:[],vanity:[],shower:[]},Rs={sofa:{name:"Sofa 3 chỗ",category:"Sofa & ghế",material:"Vải bọc, khung gỗ",note:"Đệm dày, hai gối tựa kèm theo.",tier:1},armchair:{name:"Ghế bành",category:"Sofa & ghế",material:"Vải bọc",note:"Góc thư giãn trong phòng khách.",tier:2},coffeeTable:{name:"Bàn trà",category:"Bàn",material:"Gỗ sồi",note:"Đặt giữa sofa và kệ TV.",tier:1},tvUnit:{name:'Kệ TV + TV 55"',category:"Điện tử",material:"Gỗ công nghiệp",note:"TV đặt trên kệ thấp, đối diện sofa.",tier:1},rug:{name:"Thảm",category:"Trang trí",material:"Sợi dệt",note:"",tier:2,pick:!1},plant:{name:"Cây trong nhà",category:"Trang trí",material:"Chậu gốm",note:"Cây lá lớn tạo điểm nhấn xanh.",tier:2},floorLamp:{name:"Đèn cây",category:"Chiếu sáng",material:"Kim loại đen",note:"Ánh sáng vàng ấm buổi tối.",tier:2},console:{name:"Bàn console",category:"Bàn",material:"Gỗ + tủ thấp",note:"Để chìa khoá, thư từ ở lối vào.",tier:2},bed:{name:"Giường đôi 1m6",category:"Giường",material:"Khung gỗ, nệm bông ép",note:"Kèm ga gối và chăn.",tier:1},nightstand:{name:"Tab đầu giường",category:"Tủ",material:"Gỗ sồi",note:"Kèm đèn ngủ.",tier:2},wardrobe:{name:"Tủ quần áo",category:"Tủ",material:"Gỗ công nghiệp",note:"Tủ cao sát trần, nhiều ngăn.",tier:0},desk:{name:"Bàn làm việc",category:"Bàn",material:"Gỗ sồi",note:"Kèm màn hình.",tier:2},chair:{name:"Ghế",category:"Sofa & ghế",material:"Gỗ sồi",note:"",tier:1},diningTable:{name:"Bàn ăn 4 chỗ",category:"Bàn",material:"Gỗ sồi",note:"Gần cửa sổ, đón sáng buổi sáng.",tier:1},kitchenRun:{name:"Bộ bếp",category:"Bếp",material:"Tủ gỗ + mặt đá",note:"Bồn rửa inox, bếp từ, tủ treo phía trên.",tier:0},fridge:{name:"Tủ lạnh",category:"Bếp",material:"Inox",note:"Tủ lạnh hai cánh đặt cuối dãy bếp.",tier:1},bookshelf:{name:"Tủ sách",category:"Tủ",material:"Gỗ công nghiệp",note:"Nhiều ngăn mở cho sách và đồ trang trí.",tier:2},dresser:{name:"Tủ ngăn kéo",category:"Tủ",material:"Gỗ sồi",note:"Cất đồ lặt vặt, đặt thêm gương hoặc đèn.",tier:2},sideTable:{name:"Bàn phụ",category:"Bàn",material:"Gỗ + kim loại",note:"Đặt cạnh sofa hoặc đầu giường.",tier:2},ottoman:{name:"Ghế đôn",category:"Sofa & ghế",material:"Vải bọc",note:"Kê chân hoặc ngồi thêm khi có khách.",tier:2},barStool:{name:"Ghế quầy bar",category:"Sofa & ghế",material:"Gỗ + kim loại",note:"Ngồi bên quầy bếp.",tier:2},standingMirror:{name:"Gương đứng",category:"Trang trí",material:"Kính + khung gỗ",note:"Gương soi toàn thân.",tier:2},toilet:{name:"Bệ xí",category:"Vệ sinh",material:"Sứ",note:"Két nước liền khối.",tier:0},vanity:{name:"Tủ lavabo + gương",category:"Vệ sinh",material:"Tủ gỗ + mặt đá",note:"Gương treo trên lavabo.",tier:0},shower:{name:"Buồng tắm kính",category:"Vệ sinh",material:"Kính cường lực",note:"Vòi sen cây, khay đáy thấp.",tier:0}},Jl=["wood","darkwood","tile","marble","granite","concrete","epoxy","carpet","glass"],Co=["window","door","open"],ie={idPattern:/^[A-Za-z0-9_-]{1,48}$/,overrides:120,extras:60,floors:5,roomsPerFloor:24,openingsPerFloor:60,coordMin:-2,coordMax:40,roomMin:1.2,roomMax:40,openingMin:.5,openingMax:4,sillMax:2.4,nameMax:40},ur=(n,t)=>Math.round(n*t)/t,dr=n=>typeof n=="number"&&Number.isFinite(n),Ln=n=>dr(n)&&n>=ie.coordMin&&n<=ie.coordMax?ur(n,1e3):void 0,Zu=n=>dr(n)?ur(n%(Math.PI*2),1e4):void 0,ii=n=>typeof n=="string"&&ie.idPattern.test(n),Ql=n=>typeof n=="string"&&n.trim()?n.trim().slice(0,ie.nameMax):void 0,lM=n=>{if(!Array.isArray(n)||n.length===0||n.length>3)return;const t=n.map(e=>dr(e)&&e>=.2&&e<=8?ur(e,100):null);return t.every(e=>e!==null)?t:void 0},_h=n=>Jl.includes(n)?n:void 0,xh=n=>Co.includes(n)?n:void 0,vh=n=>dr(n)&&n>=ie.openingMin&&n<=ie.openingMax?ur(n,100):void 0;function Mh(n){if(!n||typeof n!="object"||!ii(n.id)||n.dir!=="x"&&n.dir!=="z")return null;const t=Ln(n.at),e=Ln(n.c),i=vh(n.w),s=xh(n.type);if(t===void 0||e===void 0||i===void 0||!s)return null;const r={id:n.id,dir:n.dir,at:t,c:e,w:i,type:s};return s==="window"&&dr(n.sill)&&n.sill>=0&&n.sill<=ie.sillMax&&(r.sill=ur(n.sill,100)),s==="door"&&n.entrance===!0&&(r.entrance=!0),r}function cM(n){if(!n||typeof n!="object"||!ii(n.id))return null;const t=Ql(n.name),e=Ln(n.x0),i=Ln(n.x1),s=Ln(n.z0),r=Ln(n.z1);if(!t||[e,i,s,r].some(c=>c===void 0||c<0))return null;const o=i-e,a=r-s;return o<ie.roomMin-1e-9||a<ie.roomMin-1e-9||o>ie.roomMax||a>ie.roomMax?null:{id:n.id,name:t,x0:e,x1:i,z0:s,z1:r,floor:_h(n.floor)??"wood"}}function bh(n,t){return Math.min(n.x1,t.x1)-Math.max(n.x0,t.x0)>.01&&Math.min(n.z1,t.z1)-Math.max(n.z0,t.z0)>.01}function uM(n){if(!n||typeof n!="object"||!ii(n.id))return null;const t=[],e=new Set;for(const r of(Array.isArray(n.rooms)?n.rooms:[]).slice(0,ie.roomsPerFloor)){const o=cM(r);!o||e.has(o.id)||t.some(a=>bh(o,a))||(e.add(o.id),t.push(o))}if(!t.length)return null;const i=[],s=new Set;for(const r of(Array.isArray(n.openings)?n.openings:[]).slice(0,ie.openingsPerFloor)){const o=Mh(r);!o||s.has(o.id)||(s.add(o.id),i.push(o))}return{id:n.id,name:Ql(n.name)??"Tầng",rooms:t,openings:i}}function dM(n){if(!n||typeof n!="object"||!Array.isArray(n.floors))return null;const t=[],e=new Set;for(const i of n.floors.slice(0,ie.floors)){const s=uM(i);!s||e.has(s.id)||(e.add(s.id),t.push(s))}return t.length?{floors:t}:null}function hM(n){const t={};if(!n||typeof n!="object"||Array.isArray(n))return t;for(const[e,i]of Object.entries(n).slice(0,ie.overrides)){if(!ii(e)||!i||typeof i!="object")continue;const s={},r=Ql(i.name),o=_h(i.floor);r&&(s.name=r),o&&(s.floor=o),Object.keys(s).length&&(t[e]=s)}return t}function fM(n){const t={removed:[],moved:{},added:[]};if(!n||typeof n!="object")return t;if(Array.isArray(n.removed))for(const e of n.removed.slice(0,ie.overrides))ii(e)&&!t.removed.includes(e)&&t.removed.push(e);if(n.moved&&typeof n.moved=="object"&&!Array.isArray(n.moved))for(const[e,i]of Object.entries(n.moved).slice(0,ie.overrides)){if(!ii(e)||!i||typeof i!="object")continue;const s={},r=Ln(i.c),o=vh(i.w),a=xh(i.type);r!==void 0&&(s.c=r),o!==void 0&&(s.w=o),a&&(s.type=a),Object.keys(s).length&&(t.moved[e]=s)}if(Array.isArray(n.added)){const e=new Set;for(const i of n.added.slice(0,ie.openingsPerFloor)){const s=Mh(i);!s||e.has(s.id)||(e.add(s.id),t.added.push(s))}}return t}const pM=n=>n.removed.length>0||Object.keys(n.moved).length>0||n.added.length>0;function Ae(n){const t={items:{},extras:[]};if(!n||typeof n!="object")return t;if(n.items&&typeof n.items=="object"&&!Array.isArray(n.items))for(const[r,o]of Object.entries(n.items).slice(0,ie.overrides)){if(!ii(r)||!o||typeof o!="object")continue;const a={},c=Ln(o.x),l=Ln(o.z),u=Zu(o.rot);c!==void 0&&(a.x=c),l!==void 0&&(a.z=l),u!==void 0&&(a.rot=u),o.hidden===!0&&(a.hidden=!0),Object.keys(a).length&&(t.items[r]=a)}if(Array.isArray(n.extras)){const r=new Set;for(const o of n.extras.slice(0,ie.extras)){if(!o||typeof o!="object"||!ii(o.id)||r.has(o.id)||!Object.prototype.hasOwnProperty.call(ji,o.kind))continue;const a=Ln(o.x),c=Ln(o.z);if(a===void 0||c===void 0)continue;r.add(o.id);const l={id:o.id,kind:o.kind,x:a,z:c,rot:Zu(o.rot)??0},u=lM(o.args);u&&(l.args=u),o.hidden===!0&&(l.hidden=!0),ii(o.floor)&&(l.floor=o.floor),t.extras.push(l)}}const e=hM(n.rooms);Object.keys(e).length&&(t.rooms=e);const i=fM(n.openings);pM(i)&&(t.openings=i);const s=dM(n.custom);return s&&(t.custom=s),t}const Cs={modern:{label:"Hiện đại",palette:{floor:13608570,wall:16052714,wood:12159838,sofa:6258598,accent:15246141}},nordic:{label:"Bắc Âu",palette:{floor:14929832,wall:16316662,wood:13808780,sofa:9414844,accent:7317664}},warm:{label:"Ấm cúng",palette:{floor:12158040,wall:15918287,wood:10251075,sofa:12874842,accent:14254635}},luxury:{label:"Sang trọng",palette:{floor:9069892,wall:15262422,wood:7031344,sofa:3096149,accent:13214282}},industrial:{label:"Công nghiệp",palette:{floor:9271911,wall:13817305,wood:8216387,sofa:4869975,accent:14250795}}},xo=Object.keys(Cs),mM=["floor","wall","wood","sofa","accent"],gM=/^#?([0-9a-f]{6})$/i;function _M(n){if(typeof n=="number"&&Number.isInteger(n)&&n>=0&&n<=16777215)return n;if(typeof n!="string")return null;const t=gM.exec(n.trim());return t?parseInt(t[1],16):null}function tc(n){if(!n||typeof n!="object")return null;const t=typeof n.id=="string"?n.id.trim():"",e=typeof n.name=="string"?n.name.trim().slice(0,60):"";if(!t||!e)return null;const i={};if(n.palette&&typeof n.palette=="object")for(const r of mM){const o=_M(n.palette[r]);o!==null&&(i[r]=o)}const s=Number(n.defaultHour);return{id:t,name:e,description:typeof n.description=="string"?n.description.slice(0,200):"",theme:xo.includes(n.theme)?n.theme:"modern",palette:i,furnishing:["bare","partial","full"].includes(n.furnishing)?n.furnishing:null,defaultHour:Number.isFinite(s)?Math.min(18,Math.max(6,s)):10,layout:Ae(n.layout)}}function Sh(n){return{...Cs[n?.theme]?.palette??Cs.modern.palette,...n?.palette??{}}}function xM(n){let t=0;for(const i of String(n))t=t*31+i.charCodeAt(0)>>>0;const e=xo[t%xo.length];return tc({id:"default",name:`Phong cách ${Cs[e].label}`,theme:e})}const vM=60,Ju=.25,Qu=.05,MM=Math.PI*2,Ns=n=>Ae(JSON.parse(JSON.stringify(Ae(n)))),_s=(n,t)=>n/(t||1);function td(n,t){const e=Math.min(t-Ju,Math.max(Ju,n));return Math.round(e/Qu)*Qu}function bM(n,t){return n.extras.some(e=>e.id===t)}function SM(n,t,e,i,s){const r=Ns(n),o=r.extras.find(a=>a.id===t);if(o)o.x=_s(e,s),o.z=_s(i,s);else{const a=r.items[t]??={};a.x=_s(e,s),a.z=_s(i,s)}return Ae(r)}function yM(n,t,e=0){const i=Ns(n),s=(e+Math.PI/2)%MM,r=i.extras.find(o=>o.id===t);return r?r.rot=s:(i.items[t]??={}).rot=s,Ae(i)}function EM(n,t){const e=Ns(n),i=e.extras.find(s=>s.id===t)??(e.items[t]??={});return i.hidden?delete i.hidden:i.hidden=!0,Ae(e)}function TM(n,t){const e=Ns(n);return e.extras.some(i=>i.id===t)?(e.extras=e.extras.filter(i=>i.id!==t),Ae(e)):e}function wM(n,t){const e=Ns(n),i=e.items[t];return i&&(delete i.x,delete i.z,delete i.rot),Ae(e)}function AM(n,t,e,i,s,r,o=Math.random){if(!Object.prototype.hasOwnProperty.call(ji,t))return null;const a=Ns(n);if(a.extras.length>=vM)return null;const c=new Set([...r,...a.extras.map(u=>u.id)]);let l;do l=`extra-${o().toString(36).slice(2,8).padEnd(6,"0")}`;while(c.has(l));return a.extras.push({id:l,kind:t,x:_s(e,s),z:_s(i,s),rot:0}),{layout:Ae(a),id:l}}const ed=.1,yh=n=>Math.round(n/ed)*ed,js=n=>Math.round(n*1e3)/1e3;function RM(n,t,e,i=.5){let s=null;for(const r of n){const o=r.dir==="x"?t:e,a=r.dir==="x"?e:t;if(o<r.from+.1||o>r.to-.1)continue;const c=Math.abs(a-r.at);c<=i&&(!s||c<s.dist)&&(s={wall:r,c:js(o),dist:c})}return s?{wall:s.wall,c:s.c}:null}function CM(n){const t=(n.x0+n.x1)/2,e=(n.z0+n.z1)/2;return{x0:{x:n.x0,z:e},x1:{x:n.x1,z:e},z0:{x:t,z:n.z0},z1:{x:t,z:n.z1}}}function PM(n,t,e){const i={x0:n.x0,x1:n.x1,z0:n.z0,z1:n.z1},s=ie.roomMin,r=yh(e);return t==="x0"?i.x0=Math.max(0,Math.min(r,i.x1-s)):t==="x1"?i.x1=Math.min(ie.coordMax,Math.max(r,i.x0+s)):t==="z0"?i.z0=Math.max(0,Math.min(r,i.z1-s)):t==="z1"&&(i.z1=Math.min(ie.coordMax,Math.max(r,i.z0+s))),{x0:js(i.x0),x1:js(i.x1),z0:js(i.z0),z1:js(i.z1)}}const LM=(n,t,e)=>t>=n.x0&&t<=n.x1&&e>=n.z0&&e<=n.z1,Yr=yh,jr=1e-6,tr=n=>n.toFixed(3),qi=n=>Math.round(n*1e3)/1e3,nd=n=>String(n).replace(/[^A-Za-z0-9]/g,"p");function Eh(n,t=[]){const e=new Map,i=(r,o,a,c)=>{const l=`${r}|${tr(o)}`;e.has(l)||e.set(l,{dir:r,at:o,edges:[]}),e.get(l).edges.push([a,c])};for(const r of n)i("x",r.z0,r.x0,r.x1),i("x",r.z1,r.x0,r.x1),i("z",r.x0,r.z0,r.z1),i("z",r.x1,r.z0,r.z1);const s=[];for(const{dir:r,at:o,edges:a}of e.values()){const c=[...new Set(a.flatMap(([u,f])=>[tr(u),tr(f)]))].map(Number).sort((u,f)=>u-f),l=[];for(let u=0;u+1<c.length;u++){const f=c[u],d=c[u+1];if(d-f<jr)continue;const g=a.filter(([x,_])=>x<=f+jr&&_>=d-jr).length;if(g===0)continue;const m=l[l.length-1];m&&m.count===g&&Math.abs(m.to-f)<jr?m.to=d:l.push({from:f,to:d,count:g})}for(const u of l)s.push({dir:r,at:o,from:u.from,to:u.to,t:u.count>=2?uh:ch,interior:u.count>=2,openings:[]})}for(const r of t){const o=s.find(a=>a.dir===r.dir&&Math.abs(a.at-r.at)<.06&&r.c-r.w/2>=a.from+.05&&r.c+r.w/2<=a.to-.05);o&&o.openings.push({...r})}for(const r of s)r.openings.sort((o,a)=>o.c-a.c);return s.sort((r,o)=>r.dir===o.dir?r.at-o.at||r.from-o.from:r.dir<o.dir?-1:1)}function DM(n,t=.2){const e=Math.max(...n.map(s=>s.x1))+t,i=Math.max(...n.map(s=>s.z1))+t;return{w:qi(e),d:qi(i)}}const Th=n=>qi(n.reduce((t,e)=>t+$i(e),0)),ec=n=>qi(n.reduce((t,e)=>t+Th(e.rooms),0));function IM(n,t=[],e=1.4){return Eh(n,t).filter(s=>s.interior&&s.to-s.from>=e&&s.openings.length===0).map(s=>({dir:s.dir,at:s.at,from:s.from,to:s.to}))}function nc(n,t=[],e=[]){const i=new Set([...e,...t.map(r=>r.id)]),s=[];for(const r of IM(n,t)){const o=qi((r.from+r.to)/2);let a=`auto-${r.dir}${nd(tr(r.at))}-${nd(tr(o))}`.slice(0,48);i.has(a)||(i.add(a),s.push({id:a,dir:r.dir,at:qi(r.at),c:o,w:.9,type:"door"}))}return[...t,...s]}function ic(n,t,e=null){const i=t.x1-t.x0,s=t.z1-t.z0;return i<ie.roomMin-1e-9||s<ie.roomMin-1e-9||i>ie.roomMax||s>ie.roomMax||t.x0<0||t.z0<0||t.x1>ie.coordMax||t.z1>ie.coordMax?!1:!n.some(r=>r.id!==e&&bh(r,t))}function NM(n,t){const e=ec(n);if(!(e>0)||!(t>0))return{factor:1,before:e,after:e};const i=Math.min(2,Math.max(.5,Math.sqrt(t/e)));return{factor:i,before:e,after:qi(e*i*i)}}const id=.15,sd=.1,Ee=n=>Math.round(n*1e3)/1e3,xs=n=>Math.round(n/sd)*sd,Mn=n=>JSON.parse(JSON.stringify(Ae(n))),vo=(n,t)=>Ee(n/(t.scale||1)),sc=(n,t,e=Math.random)=>{let i;do i=`${n}-${e().toString(36).slice(2,8).padEnd(6,"0")}`;while(t.has(i));return i},ci=(n,t)=>{const e=Ae(t);return JSON.stringify(e)===JSON.stringify(Ae(n))?n:e},Us=(n,t)=>n.custom?.floors.find(e=>e.id===t.floorId)??n.custom?.floors[0];function UM(n,t,e,i){if(!Jl.includes(i))return n;const s=Mn(n);if(t.custom){const r=Us(s,t)?.rooms.find(o=>o.id===e);if(!r)return n;r.floor=i}else{if(!t.rooms.some(r=>r.id===e))return n;s.rooms={...s.rooms??{},[e]:{...s.rooms?.[e]??{},floor:i}}}return ci(n,s)}function OM(n,t,e,i){const s=String(i??"").trim().slice(0,ie.nameMax);if(!s)return n;const r=Mn(n);if(t.custom){const o=Us(r,t)?.rooms.find(a=>a.id===e);if(!o)return n;o.name=s}else{if(!t.rooms.some(o=>o.id===e))return n;r.rooms={...r.rooms??{},[e]:{...r.rooms?.[e]??{},name:s}}}return ci(n,r)}function FM(n,t,e,i){return n.walls.find(s=>s.dir===t&&Math.abs(s.at-e)<.06&&i>=s.from&&i<=s.to)}function wh(n,t,e){const i=n.from+e/2+id,s=n.to-e/2-id;return s<i?null:Ee(Math.min(s,Math.max(i,t)))}const zM=(n,t)=>n.walls.find(e=>e.openings.some(i=>i.id===t)),Ah=(n,t)=>n.walls.flatMap(e=>e.openings).find(e=>e.id===t);function rc(n,t,e,i){const s=zM(t,e),r=Ah(t,e);if(!s||!r)return n;const o=i.w??r.w,a=wh(s,i.c??r.c,o);if(a===null||o<ie.openingMin||o>ie.openingMax)return n;const c=i.type??r.type;if(!Co.includes(c))return n;const l=Mn(n);if(t.custom){const u=Us(l,t)?.openings.find(f=>f.id===e);if(!u)return n;Object.assign(u,{c:a,w:Ee(o),type:c}),c!=="window"?delete u.sill:u.sill===void 0&&(u.sill=.9),c!=="door"&&delete u.entrance}else{const u=l.openings?.added?.find(f=>f.id===e);if(u)Object.assign(u,{c:vo(a,t),w:Ee(o),type:c}),c!=="window"&&delete u.sill,c!=="door"&&delete u.entrance;else{l.openings??={removed:[],moved:{},added:[]};const f={...l.openings.moved[e]??{}};(i.c!==void 0||i.w!==void 0)&&(f.c=vo(a,t)),i.w!==void 0&&(f.w=Ee(o)),i.type!==void 0&&(f.type=c),l.openings.moved[e]=f}}return ci(n,l)}const BM=(n,t,e,i)=>rc(n,t,e,{c:i}),kM=(n,t,e,i)=>rc(n,t,e,{w:i}),GM=(n,t,e,i)=>rc(n,t,e,{type:i});function HM(n,t,e){if(!Ah(t,e))return n;const i=Mn(n);if(t.custom){const s=Us(i,t);if(!s)return n;s.openings=s.openings.filter(r=>r.id!==e)}else i.openings?.added?.some(s=>s.id===e)?i.openings.added=i.openings.added.filter(s=>s.id!==e):(i.openings??={removed:[],moved:{},added:[]},i.openings.removed.includes(e)||i.openings.removed.push(e),delete i.openings.moved[e]);return ci(n,i)}function VM(n,t,{dir:e,at:i,c:s,w:r=.9,type:o="door"},a=Math.random){if(!Co.includes(o)||e!=="x"&&e!=="z")return null;const c=FM(t,e,i,s);if(!c)return null;const l=wh(c,s,r);if(l===null||c.openings.some(m=>Math.abs(m.c-l)<(m.w+r)/2+.05))return null;const u=Mn(n),f=new Set(t.walls.flatMap(m=>m.openings.map(x=>x.id))),d=sc("op",f,a);if(t.custom){const m=Us(u,t);if(!m||m.openings.length>=ie.openingsPerFloor)return null;m.openings.push({id:d,dir:e,at:Ee(c.at),c:l,w:Ee(r),type:o,...o==="window"?{sill:.9}:{}})}else{if(u.openings??={removed:[],moved:{},added:[]},u.openings.added.length>=ie.openingsPerFloor)return null;u.openings.added.push({id:d,dir:e,at:vo(c.at,t),c:vo(l,t),w:Ee(r),type:o,...o==="window"?{sill:.9}:{}})}return{layout:Ae(u),id:d}}const rd=n=>{if(!Array.isArray(n))return;const t=[];for(const e of n){if(typeof e!="number"||!(e>=.2&&e<=8))break;t.push(Math.round(e*100)/100)}return t.length?t.slice(0,3):void 0};function WM(n,t){const i=t.rooms.map(a=>({id:a.id,name:a.name,x0:a.x0,x1:a.x1,z0:a.z0,z1:a.z1,floor:a.floor})),s=t.walls.flatMap(a=>a.openings.map(c=>({id:c.id,dir:a.dir,at:a.at,c:c.c,w:c.w,type:c.type,...c.sill!==void 0?{sill:c.sill}:{},...c.entrance?{entrance:!0}:{}}))),r=t.placements.filter(a=>Object.prototype.hasOwnProperty.call(ji,a.kind)).map(a=>({id:a.id,kind:a.kind,x:a.x,z:a.z,rot:a.rot??0,floor:"f1",...a.hidden?{hidden:!0}:{},...rd(a.args)?{args:rd(a.args)}:{}}));return Ae({items:{},extras:r,custom:{floors:[{id:"f1",name:"Tầng 1",rooms:i,openings:s}]}})}function XM(){return Ae(null)}const Po=(n,t)=>Us(n,t);function $M(n,t){const e=xs(Math.min(n.x,t.x)),i=xs(Math.max(n.x,t.x)),s=xs(Math.min(n.z,t.z)),r=xs(Math.max(n.z,t.z));return{x0:Ee(e),x1:Ee(i),z0:Ee(s),z1:Ee(r)}}function qM(n,t,e,{name:i,floor:s="wood"}={},r=Math.random){if(!t.custom)return null;const o=Mn(n),a=Po(o,t);if(!a||a.rooms.length>=ie.roomsPerFloor)return null;const c={...e};if(!ic(a.rooms,c))return null;const l=sc("room",new Set(a.rooms.map(f=>f.id)),r),u={id:l,name:i??`Phòng ${a.rooms.length+1}`,...c,floor:s};return a.rooms.push(u),a.openings=nc(a.rooms,a.openings),{layout:Ae(o),id:l}}const oc=(n,t,e)=>t>=n.x0&&t<=n.x1&&e>=n.z0&&e<=n.z1;function YM(n,t){for(const e of n.extras){if((e.floor??n.custom.floors[0].id)!==t.id||t.rooms.some(s=>oc(s,e.x,e.z)))continue;let i=null;for(const s of t.rooms){const r=Math.min(s.x1-.2,Math.max(s.x0+.2,e.x)),o=Math.min(s.z1-.2,Math.max(s.z0+.2,e.z)),a=Math.hypot(r-e.x,o-e.z);(!i||a<i.d)&&(i={x:r,z:o,d:a})}i&&(e.x=Ee(i.x),e.z=Ee(i.z))}}function jM(n,t,e,i){if(!t.custom)return n;const s=Mn(n),r=Po(s,t),o=r?.rooms.find(c=>c.id===e);if(!o)return n;const a={...o,...i};return ic(r.rooms,a,e)?(Object.assign(o,i),r.openings=nc(r.rooms,ac(r)),YM(s,r),ci(n,s)):n}function KM(n,t,e,i,s){if(!t.custom)return n;const r=Mn(n),o=Po(r,t),a=o?.rooms.find(m=>m.id===e);if(!a)return n;const c=xs(i),l=xs(s);if(c===0&&l===0)return n;const u={...a,x0:Ee(a.x0+c),x1:Ee(a.x1+c),z0:Ee(a.z0+l),z1:Ee(a.z1+l)};if(!ic(o.rooms,u,e))return n;const f=r.custom.floors[0].id;for(const m of r.extras)(m.floor??f)===o.id&&oc(a,m.x,m.z)&&(m.x=Ee(m.x+c),m.z=Ee(m.z+l));const d=m=>m.dir==="x"&&(Math.abs(m.at-a.z0)<.06||Math.abs(m.at-a.z1)<.06)&&m.c>a.x0&&m.c<a.x1||m.dir==="z"&&(Math.abs(m.at-a.x0)<.06||Math.abs(m.at-a.x1)<.06)&&m.c>a.z0&&m.c<a.z1,g=m=>o.rooms.some(x=>x.id!==e&&Rh(x,m));for(const m of o.openings)d(m)&&!g(m)&&(m.dir==="x"?(m.at=Ee(m.at+l),m.c=Ee(m.c+c)):(m.at=Ee(m.at+c),m.c=Ee(m.c+l)));return Object.assign(a,u),o.openings=nc(o.rooms,ac(o)),ci(n,r)}const Rh=(n,t)=>t.dir==="x"&&(Math.abs(t.at-n.z0)<.06||Math.abs(t.at-n.z1)<.06)&&t.c>n.x0&&t.c<n.x1||t.dir==="z"&&(Math.abs(t.at-n.x0)<.06||Math.abs(t.at-n.x1)<.06)&&t.c>n.z0&&t.c<n.z1;function ac(n){return n.openings.filter(t=>n.rooms.some(e=>Rh(e,t)))}function ZM(n,t,e){if(!t.custom)return n;const i=Mn(n),s=Po(i,t),r=s?.rooms.find(a=>a.id===e);if(!r||s.rooms.length<=1)return n;const o=i.custom.floors[0].id;for(const a of i.extras)(a.floor??o)===s.id&&oc(r,a.x,a.z)&&(a.hidden=!0);return s.rooms=s.rooms.filter(a=>a.id!==e),s.openings=ac(s),ci(n,i)}function JM(n,t,e,i=Math.random){if(!t.custom)return null;const s=Mn(n);if(s.custom.floors.length>=ie.floors)return null;const r=sc("f",new Set(s.custom.floors.map(o=>o.id)),i);return s.custom.floors.push({id:r,name:String(e??"").trim()||`Tầng ${s.custom.floors.length+1}`,rooms:[{id:"room-1",name:"Phòng 1",x0:1,x1:7,z0:1,z1:6,floor:"wood"}],openings:[]}),{layout:Ae(s),id:r}}function QM(n,t,e,i){const s=String(i??"").trim().slice(0,ie.nameMax);if(!t.custom||!s)return n;const r=Mn(n),o=r.custom.floors.find(a=>a.id===e);return o?(o.name=s,ci(n,r)):n}function tb(n,t,e){if(!t.custom)return n;const i=Mn(n);if(i.custom.floors.length<=1||!i.custom.floors.some(o=>o.id===e))return n;const s=i.custom.floors[0].id;i.custom.floors=i.custom.floors.filter(o=>o.id!==e);const r=i.custom.floors[0].id;return i.extras=i.extras.filter(o=>(o.floor??s)!==e).map(o=>({...o,floor:o.floor??r})),ci(n,i)}function eb(n,t,e){if(!t.custom)return{layout:n,factor:1,before:0,after:0};const i=Ae(n),{factor:s,before:r,after:o}=NM(i.custom.floors,e);if(Math.abs(s-1)<1e-6)return{layout:n,factor:1,before:r,after:r};const a=Mn(i),c=f=>Ee(f*s);for(const f of a.custom.floors){for(const d of f.rooms)Object.assign(d,{x0:c(d.x0),x1:c(d.x1),z0:c(d.z0),z1:c(d.z1)});for(const d of f.openings)Object.assign(d,{at:c(d.at),c:c(d.c)})}for(const f of a.extras)Object.assign(f,{x:c(f.x),z:c(f.z)});const l=Ae(a),u=l.custom?ec(l.custom.floors):o;return{layout:l,factor:s,before:r,after:u}}const od=.03,nb=.17,ib=new Set(["door","window","open"]);function sb(n,t,e,i){const s=n.renderer.domElement,r=n.controls,o=new Kl,a=new Gt,c=new Jn(new U(0,1,0),0),l=new U;let u=null;const f=new te;f.name="editor-overlay",n.scene.add(f);const d=new $t(new fe(1,.06,1),new Xi({color:14178863,transparent:!0,opacity:.35,depthWrite:!1}));d.visible=!1,f.add(d);const g=new Xi({color:14178863,depthTest:!1}),m={};for(const P of["x0","x1","z0","z1"]){const D=new $t(new ws(nb,16,12),g);D.renderOrder=10,D.visible=!1,D.userData.edge=P,f.add(D),m[P]=D}function x(P,D=!0){d.visible=!0,d.scale.set(Math.max(.01,P.x1-P.x0),1,Math.max(.01,P.z1-P.z0)),d.position.set((P.x0+P.x1)/2,.05,(P.z0+P.z1)/2),d.material.color.set(D?14178863:12597547),n.invalidate()}const _=()=>{d.visible&&(d.visible=!1,n.invalidate())},h=()=>{const P=q.state.selection;return P?.type==="room"?pe.get("room",P.id):null};function v(){const P=q.state.editing&&!q.state.tool&&i.isCustom?.()?h():null,D=P?CM(P):null;for(const[G,N]of Object.entries(m))N.visible=!!D,D&&N.position.set(D[G].x,.2,D[G].z);n.invalidate()}function y(P){const D=s.getBoundingClientRect();a.set((P.clientX-D.left)/D.width*2-1,-((P.clientY-D.top)/D.height)*2+1),o.setFromCamera(a,n.camera)}function T(P,D){return y(P),o.ray.intersectPlane(c,D)}function L(P){if(!m.x0.visible)return null;y(P);const D=o.intersectObjects(Object.values(m),!1)[0];return D?D.object.userData.edge:null}function C(P){y(P);const D=o.intersectObjects(t.pickables,!0);for(const G of D)for(let N=G.object;N&&N.visible!==!1;N=N.parent){const k=N.userData?.ref;if(k?.type==="item"&&pe.get("item",k.id)||k?.type==="opening"&&pe.get("opening",k.id))return k}return null}function w(P,D,G="grabbing"){u={pointerId:P.pointerId,...D},r.enabled=!1,n.cancelFlight(),s.setPointerCapture(P.pointerId),s.style.cursor=G,P.stopImmediatePropagation()}const p=P=>{if(!q.state.editing||q.state.mode!=="overview"||P.button!==0)return;const D=q.state.tool;if(ib.has(D)){if(!T(P,l))return;const Z=RM(st.walls,l.x,l.z,.6);P.stopImmediatePropagation(),Z?i.onOpeningAdd({dir:Z.wall.dir,at:Z.wall.at,c:Z.c,type:D}):i.onReject?.("Bấm vào một đoạn tường để đặt cửa.");return}if(D==="room"){if(!T(P,l))return;const Z={x:Yr(l.x),z:Yr(l.z)};w(P,{kind:"draw",start:Z,rect:null},"crosshair");return}const G=L(P),N=G?h():null;if(N&&T(P,l)){w(P,{kind:"resize",id:N.id,edge:G,room:N,rect:null},"ew-resize");return}const k=C(P);if(k?.type==="opening"){const Z=t.getObject("opening",k.id),rt=st.walls.find(It=>It.openings.some(ct=>ct.id===k.id));if(!Z||!rt||!T(P,l))return;const mt=rt.dir==="x"?l.x:l.z,At=rt.dir==="x"?Z.position.x:Z.position.z;q.select(k),w(P,{kind:"opening",id:k.id,mesh:Z,wall:rt,offset:At-mt,start:At,c:At});return}if(k?.type==="item"){const Z=t.getObject("item",k.id);if(!Z||!T(P,l))return;q.select(k),w(P,{kind:"item",id:k.id,group:Z,offsetX:Z.position.x-l.x,offsetZ:Z.position.z-l.z,startX:Z.position.x,startZ:Z.position.z});return}const B=i.isCustom?.()?h():null;B&&T(P,l)&&LM(B,l.x,l.z)&&w(P,{kind:"room",id:B.id,room:B,startPt:{x:l.x,z:l.z},dx:0,dz:0})},M=P=>{if(!(!u||P.pointerId!==u.pointerId)&&T(P,l)){if(u.kind==="item"){const D=td(l.x+u.offsetX,st.size.w),G=td(l.z+u.offsetZ,st.size.d);t.moveItem(u.id,D,G),e.refresh()}else if(u.kind==="opening"){const D=(u.wall.dir==="x"?l.x:l.z)+u.offset,G=u.wall.from+.5,N=u.wall.to-.5;u.c=Math.round(Math.min(N,Math.max(G,D))*20)/20,u.wall.dir==="x"?u.mesh.position.x=u.c:u.mesh.position.z=u.c,x(u.wall.dir==="x"?{x0:u.c-.45,x1:u.c+.45,z0:u.wall.at-.1,z1:u.wall.at+.1}:{x0:u.wall.at-.1,x1:u.wall.at+.1,z0:u.c-.45,z1:u.c+.45})}else if(u.kind==="draw")u.rect=$M(u.start,{x:l.x,z:l.z}),x(u.rect);else if(u.kind==="resize"){const D=u.edge[0]==="x"?l.x:l.z;u.rect=PM(u.room,u.edge,D),x(u.rect)}else if(u.kind==="room"){u.dx=Yr(l.x-u.startPt.x),u.dz=Yr(l.z-u.startPt.z);const D=u.room;x({x0:D.x0+u.dx,x1:D.x1+u.dx,z0:D.z0+u.dz,z1:D.z1+u.dz})}}},E=P=>{if(!u||P.pointerId!==u.pointerId)return;const D=u;if(u=null,r.enabled=q.state.mode==="overview",s.style.cursor="",_(),P.type==="pointercancel"){i.onCancel?.();return}if(D.kind==="item"){const G=D.group.position.x,N=D.group.position.z;Math.hypot(G-D.startX,N-D.startZ)>=od&&i.onMove(D.id,G,N)}else D.kind==="opening"?Math.abs(D.c-D.start)>=od&&i.onOpeningMove(D.id,D.c):D.kind==="draw"?D.rect&&i.onRoomDraw(D.rect):D.kind==="resize"?D.rect&&i.onRoomResize(D.id,D.rect):D.kind==="room"&&(D.dx||D.dz)&&i.onRoomMove(D.id,D.dx,D.dz)};s.addEventListener("pointerdown",p,{capture:!0}),s.addEventListener("pointermove",M),s.addEventListener("pointerup",E),s.addEventListener("pointercancel",E);const R=q.subscribe((P,D,G)=>{(G.includes("tool")||G.includes("selection")||G.includes("editing"))&&v(),G.includes("tool")&&(s.style.cursor=P.tool?"crosshair":"")});return{setEditing(P){r.mouseButtons=P?{LEFT:Xe.PAN,MIDDLE:Xe.DOLLY,RIGHT:Xe.ROTATE}:{LEFT:Xe.ROTATE,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN},r.touches=P?{ONE:dn.PAN,TWO:dn.DOLLY_ROTATE}:{ONE:dn.ROTATE,TWO:dn.DOLLY_PAN},r.screenSpacePanning=P,v()},sync:v,dispose(){R(),s.removeEventListener("pointerdown",p,{capture:!0}),s.removeEventListener("pointermove",M),s.removeEventListener("pointerup",E),s.removeEventListener("pointercancel",E),n.scene.remove(f)}}}const Sa=n=>String(n??"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d");function rb(n,t=8){const e=Sa(n).trim();if(!e)return[];const i=[];for(const s of pe.list("room"))Sa(s.name).includes(e)&&i.push({type:"room",id:s.id,title:s.name,sub:`${s.area.toFixed(0)} m²`});for(const s of pe.list("item")){const r=pe.room(s.roomId);if(Sa(`${s.name} ${s.category} ${r?.name??""} ${s.material??""}`).includes(e)&&i.push({type:"item",id:s.id,title:s.name,sub:`${s.category} · ${r?.name??""}`}),i.length>=t)break}return i.slice(0,t)}const ob=n=>n?`${n.w.toFixed(2)} × ${n.d.toFixed(2)} × ${n.h.toFixed(2)} m`:"",ab={plus:"M12 5v14M5 12h14",minus:"M5 12h14",rotateLeft:"M3 12a9 9 0 1 0 3-6.7M3 4v5h5",rotateRight:"M21 12a9 9 0 1 1-3-6.7M21 4v5h-5",home:"M4 11 12 4l8 7M6 10v10h12V10",close:"M6 6l12 12M18 6 6 18",search:"M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",moon:"M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",sun:"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4",play:"M7 5v14l11-7z",pause:"M8 5v14M16 5v14",walk:"M13 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM10 21l2-6-3-2 1-5 3 2 2 3M12 15l3 6",cube:"M12 3 4 7.5v9L12 21l8-4.5v-9zM4 7.5 12 12l8-4.5M12 12v9",pin:"M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10zM12 8.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",expand:"M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",shrink:"M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5",pencil:"M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16zM13.5 6.5l4 4",eyeOff:"M3 3l18 18M10.6 5.2A10 10 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 4M6.2 6.2A17 17 0 0 0 2 12s4 7 10 7a9.7 9.7 0 0 0 4.2-1M9.9 9.9a3 3 0 0 0 4.2 4.2",trash:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",list:"M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",undo:"M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3",eye:"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"};function re(n,t=18,e=1.8){return`<svg class="ico" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ab[n]??""}"/></svg>`}const Xt=n=>String(n??"").replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`),yl=1,ad=8,lb=1e3,cb=20,Ps=()=>!!window.ReactNativeWebView,Mo=()=>Ps()||window.parent!==window;function xn(n,t){const e=t===void 0?{version:yl,type:n}:{version:yl,type:n,payload:t};if(window.ReactNativeWebView){window.ReactNativeWebView.postMessage(JSON.stringify(e));return}window.parent!==window&&window.parent.postMessage(e,window.location.origin)}function lc(n){if(!n||typeof n!="object")return null;const t=typeof n.apartmentId=="string"?n.apartmentId.trim():"",e=Number(n.bedrooms),i=Number(n.bathrooms),s=Number(n.areaM2);if(!t||!Number.isFinite(e)||e<0||e>ad||!Number.isFinite(i)||i<0||i>ad||!Number.isFinite(s)||s<=0||s>lb||!["bare","partial","full"].includes(n.furnishing))return null;const r=Array.isArray(n.designs)?n.designs.slice(0,cb).map(tc).filter(Boolean):[];return{apartmentId:t,bedrooms:Math.floor(e),bathrooms:Math.floor(i),areaM2:s,furnishing:n.furnishing,designs:r,designId:typeof n.designId=="string"?n.designId:null,editable:n.editable===!0&&!Ps()}}function ub(n){const t=window.location.origin,e=i=>{if(!(!!window.ReactNativeWebView&&(!i.origin||i.origin==="null"))&&(i.origin!==t||i.source!==window.parent))return;let r=i.data;if(typeof r=="string")try{r=JSON.parse(r)}catch{return}if(!(!r||r.version!==yl))if(r.type==="FLOORPLAN_INIT"){const o=lc(r.payload);o?n.init(o):xn("FLOORPLAN_ERROR",{code:"INVALID_CONFIG"})}else r.type==="FLOORPLAN_CAMPUS_INIT"?n.campus?.(r.payload):r.type==="FLOORPLAN_EXPANDED"?n.expanded?.(!!r.payload?.expanded):r.type==="FLOORPLAN_PAUSE"?n.pause():r.type==="FLOORPLAN_RESUME"?n.resume():r.type==="FLOORPLAN_RESET"&&n.reset()};return window.addEventListener("message",e),document.addEventListener("message",e),()=>{window.removeEventListener("message",e),document.removeEventListener("message",e)}}function db(n,t){const e=(s,r)=>n.has(s)?Number(n.get(s)):r,i=["bare","partial","full"].includes(n.get("furnishing"))?n.get("furnishing"):"full";return lc({apartmentId:n.get("id")??"demo",bedrooms:e("bedrooms",2),bathrooms:e("bathrooms",1),areaM2:e("area",70),furnishing:i,designs:t,designId:n.get("design")})}const hb=n=>{const t=Math.floor(n),e=Math.round((n-t)*60);return`${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`};function fb(n){n.innerHTML=`
    <div class="brand">
      <span class="brand__mark">${re("cube",18,2)}</span>
      <div class="brand__text"><b id="brand-title"></b><small id="brand-sub"></small></div>
    </div>

    <div class="search">
      <span class="search__icon">${re("search",16)}</span>
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
        ${re("sun",18)}<span id="hour-text"></span>
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
      <button role="tab" data-mode="overview" type="button">${re("cube",15)}<span>Tổng quan</span></button>
      <button role="tab" data-mode="walk" type="button">${re("walk",15)}<span>Đi vào</span></button>
    </div>`;const t=n.querySelector("#q"),e=n.querySelector(".search__menu"),i=n.querySelector("#hour"),s=n.querySelector("#sun-pop"),r=n.querySelector("#sun-btn"),o=n.querySelector("#play");function a(){const p=q.state.searchQuery,M=rb(p);e.hidden=!p.trim(),e.innerHTML=M.length?M.map(E=>`
        <li><button type="button" data-type="${E.type}" data-id="${Xt(E.id)}">
          <span class="res__ico">${re(E.type==="room"?"home":"pin",15)}</span>
          <span class="res__txt"><b>${Xt(E.title)}</b><small>${Xt(E.sub)}</small></span>
        </button></li>`).join(""):'<li class="res__empty">Không tìm thấy</li>'}t.addEventListener("input",()=>{q.set({searchQuery:t.value}),a()}),t.addEventListener("focus",a),t.addEventListener("keydown",p=>{p.key==="Escape"&&(t.value="",q.set({searchQuery:""}),e.hidden=!0,t.blur()),p.key==="Enter"&&e.querySelector("button")?.click()}),e.addEventListener("click",p=>{const M=p.target.closest("button[data-id]");if(!M)return;const E={type:M.dataset.type,id:M.dataset.id};t.value="",q.set({searchQuery:""}),e.hidden=!0,t.blur(),E.type==="room"&&Nt.emit("room:go",{id:E.id}),q.select(E),E.type==="item"&&Nt.emit("camera:locate",E)}),document.addEventListener("pointerdown",p=>{n.querySelector(".search").contains(p.target)||(e.hidden=!0),n.querySelector(".sunwrap").contains(p.target)||n.querySelector("#design-wrap").contains(p.target)||q.set({menu:null})}),r.addEventListener("click",()=>q.set({menu:q.state.menu==="sun"?null:"sun"})),i.addEventListener("input",()=>q.set({hour:Number(i.value),playing:!1})),o.addEventListener("click",()=>q.set({playing:!q.state.playing})),n.querySelector(".seg").addEventListener("click",p=>{const M=p.target.closest("[data-mode]");M&&M.dataset.mode!==q.state.mode&&q.set({mode:M.dataset.mode})});const c=n.querySelector("#fs-btn"),l=!!(document.fullscreenEnabled||document.webkitFullscreenEnabled),u=Mo()&&!Ps();let f=!1;function d(){c.innerHTML=re(f?"shrink":"expand",18);const p=f?"Thoát toàn màn hình":"Toàn màn hình";c.setAttribute("aria-label",p),c.title=p}c.hidden=Ps()||!(l||u),c.addEventListener("click",()=>{if(l){const p=document.documentElement.requestFullscreen??document.documentElement.webkitRequestFullscreen,M=document.exitFullscreen??document.webkitExitFullscreen;document.fullscreenElement??document.webkitFullscreenElement?M.call(document):p.call(document.documentElement)}else xn("FLOORPLAN_EXPAND_TOGGLE")});const g=()=>{f=!!(document.fullscreenElement??document.webkitFullscreenElement),d()};document.addEventListener("fullscreenchange",g),document.addEventListener("webkitfullscreenchange",g),Nt.on("host:expanded",({expanded:p})=>{f=p,d()}),d();const m=n.querySelector("#edit-btn");m.addEventListener("click",()=>q.set({editing:!q.state.editing}));function x(p){m.hidden=!(p.editable&&p.mode==="overview"),m.setAttribute("aria-pressed",String(p.editing)),m.classList.toggle("active",p.editing);const M=p.editing?"Xong chỉnh sửa":"Chỉnh bố cục";m.innerHTML=`${re("pencil",18)}<span>${M}</span>`,m.setAttribute("aria-label",M),m.title=M}const _=n.querySelector("#design-wrap"),h=n.querySelector("#design-btn"),v=n.querySelector("#design-pop");let y="";function T(p){const M=Sh(p);return[M.floor,M.wall,M.sofa,M.accent].map(E=>`<i style="background:#${E.toString(16).padStart(6,"0")}"></i>`).join("")}function L(p){const{designs:M,designId:E}=p;_.hidden=M.length<2;const R=M.find(D=>D.id===E)??M[0];n.querySelector("#design-name").textContent=R?.name??"",n.querySelector("#design-swatch").innerHTML=R?T(R):"",h.setAttribute("aria-expanded",String(p.menu==="designs")),v.hidden=p.menu!=="designs";const P=M.map(D=>D.id+D.name).join("|")+"#"+E;P!==y&&(y=P,v.innerHTML=M.map(D=>`<li><button type="button" role="option" data-design="${Xt(D.id)}" aria-selected="${D.id===E}" class="${D.id===E?"active":""}">
          <span class="swatches">${T(D)}</span>
          <span class="res__txt"><b>${Xt(D.name)}</b><small>${Xt(D.description||Cs[D.theme]?.label||"")}</small></span>
        </button></li>`).join(""))}h.addEventListener("click",()=>q.set({menu:q.state.menu==="designs"?null:"designs"})),v.addEventListener("click",p=>{const M=p.target.closest("[data-design]");M&&(q.set({menu:null}),Nt.emit("design:select",{id:M.dataset.design}))});function C(){n.querySelector("#brand-title").textContent=st.bedrooms===0?"Căn hộ studio":`Căn hộ ${st.bedrooms} phòng ngủ`,n.querySelector("#brand-sub").textContent=st.custom?`${st.totalArea.toFixed(0)} m²${st.floors.length>1?` · ${st.floors.length} tầng`:""} · Mặt bằng tuỳ chỉnh`:`${st.area.toFixed(0)} m² · Bố cục minh hoạ`}Nt.on("plan:loaded",C),C();function w(p){L(p),x(p);for(const M of n.querySelectorAll("[data-mode]")){const E=M.dataset.mode===p.mode;M.classList.toggle("active",E),M.setAttribute("aria-selected",String(E))}n.querySelector("#hour-text").textContent=hb(p.hour),document.activeElement!==i&&(i.value=String(p.hour)),s.hidden=p.menu!=="sun",r.setAttribute("aria-expanded",String(p.menu==="sun")),o.innerHTML=`${re(p.playing?"pause":"play",14)}<span>${p.playing?"Dừng":"Tua ngày"}</span>`}q.subscribe(p=>w(p)),w(q.state)}function pb(n){n.innerHTML=`
    <div class="card rooms" data-inset="rooms">
      <button type="button" class="rooms__title" aria-expanded="true" aria-controls="rooms-list">Các phòng <span aria-hidden="true">▾</span></button>
      <div class="floors" role="tablist" aria-label="Tầng" hidden></div>
      <ul class="rooms__list" id="rooms-list" role="list"></ul>
    </div>`;const t=n.querySelector(".rooms__list"),e=n.querySelector(".floors");function i(){e.hidden=st.floors.length<2,e.innerHTML=st.floors.map(a=>`<button type="button" role="tab" class="floorbtn${a.id===st.floorId?" on":""}" aria-selected="${a.id===st.floorId}" data-floor="${Xt(a.id)}">${Xt(a.name)}</button>`).join(""),t.innerHTML=pe.list("room").map(a=>`
          <li><button type="button" class="room" data-room="${Xt(a.id)}">
            <span class="room__row"><b>${Xt(a.name)}</b><span>${a.area.toFixed(0)} m²</span></span>
            <small>${Xt(a.note)}</small>
          </button></li>`).join(""),o(q.state)}const s=n.querySelector(".rooms"),r=n.querySelector(".rooms__title");window.innerWidth>=720&&window.innerWidth<1100&&(s.classList.add("is-collapsed"),r.setAttribute("aria-expanded","false")),r.addEventListener("click",()=>{const a=s.classList.toggle("is-collapsed");r.setAttribute("aria-expanded",String(!a))}),q.subscribe((a,c,l)=>{!l.includes("editing")||!a.editing||(s.classList.add("is-collapsed"),r.setAttribute("aria-expanded","false"))}),n.addEventListener("click",a=>{const c=a.target.closest("[data-floor]");if(c)return Nt.emit("plan:floor-select",{id:c.dataset.floor});const l=a.target.closest("[data-room]");l&&(q.set({selection:null}),Nt.emit("room:go",{id:l.dataset.room}))});function o(a){for(const c of n.querySelectorAll("[data-room]")){const l=c.dataset.room===a.roomId;c.classList.toggle("active",l),l&&window.matchMedia("(max-width: 719px)").matches&&c.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"})}}q.subscribe((a,c,l)=>l.includes("roomId")&&o(a)),Nt.on("plan:loaded",i),i()}const ld=(n,t)=>t?`<div class="kv"><dt>${n}</dt><dd>${Xt(t)}</dd></div>`:"";function mb(n){const t=pe.room(n.roomId);return`
    <header class="detail__head">
      <div>
        <span class="tag">${Xt(n.category)}</span>
        <h2>${Xt(n.name)}</h2>
        ${t?`<button type="button" class="link" data-go-room="${Xt(t.id)}">${re("pin",13)} ${Xt(t.name)}</button>`:""}
      </div>
      <button type="button" class="iconbtn" data-close aria-label="Đóng">${re("close",18)}</button>
    </header>
    <dl class="kvs">
      ${ld("Kích thước",ob(n.dims))}
      ${ld("Chất liệu",n.material)}
    </dl>
    ${n.note?`<p class="detail__note">${Xt(n.note)}</p>`:""}
    <div class="detail__actions">
      <button type="button" class="btn btn--primary" data-locate>${re("eye",16)} Xem gần</button>
    </div>`}function gb(n){const t=pe.itemsIn(n.id);return`
    <header class="detail__head">
      <div>
        <span class="tag">Phòng</span>
        <h2>${Xt(n.name)}</h2>
        <small class="muted">${n.area.toFixed(0)} m² · ${t.length} món nội thất</small>
      </div>
      <button type="button" class="iconbtn" data-close aria-label="Đóng">${re("close",18)}</button>
    </header>
    <p class="detail__note">${Xt(n.note)}</p>
    <ul class="chips" role="list">
      ${t.map(e=>`<li><button type="button" class="chip" data-item="${Xt(e.id)}">${Xt(e.name)}</button></li>`).join("")}
    </ul>
    <div class="detail__actions">
      <button type="button" class="btn btn--primary" data-go-room="${Xt(n.id)}">${re("eye",16)} Đến phòng này</button>
    </div>`}function _b(n){n.innerHTML='<aside class="card detail" data-inset="detail" hidden aria-live="polite"></aside>';const t=n.firstElementChild;t.addEventListener("click",i=>{if(i.target.closest("[data-close]"))return q.select(null);const s=i.target.closest("[data-go-room]");if(s)return Nt.emit("room:go",{id:s.dataset.goRoom});const r=i.target.closest("[data-item]");if(r){const o={type:"item",id:r.dataset.item};return q.select(o),Nt.emit("camera:locate",o)}i.target.closest("[data-locate]")&&q.state.selection&&Nt.emit("camera:locate",q.state.selection)});function e(i){const s=i.selection,r=s&&pe.get(s.type,s.id);if(!r){t.hidden=!0,t.innerHTML="";return}t.innerHTML=r.type==="room"?gb(r):mb(r),t.hidden=!1}q.subscribe((i,s,r)=>r.includes("selection")&&e(i)),e(q.state)}const xb=[[{cmd:"zoomIn",icon:"plus",label:"Phóng to"},{cmd:"zoomOut",icon:"minus",label:"Thu nhỏ"}],[{cmd:"rotateLeft",icon:"rotateLeft",label:"Xoay trái"},{cmd:"rotateRight",icon:"rotateRight",label:"Xoay phải"}],[{cmd:"home",icon:"home",label:"Về góc nhìn ban đầu"}]];function vb(n){n.innerHTML=`<nav class="card mapctl" aria-label="Điều khiển camera">${xb.map(t=>t.map(e=>`<button class="mapctl__btn" type="button" data-cmd="${e.cmd}" title="${e.label}" aria-label="${e.label}">${re(e.icon,17)}</button>`).join("")).join('<span class="mapctl__sep" aria-hidden="true"></span>')}</nav>`,n.addEventListener("click",t=>{const e=t.target.closest("[data-cmd]");e&&Nt.emit("camera:cmd",{cmd:e.dataset.cmd})})}const $s=46;function Mb(n,t){n.innerHTML=`
    <canvas class="minimap card" width="220" height="154" aria-label="Sơ đồ vị trí"></canvas>
    <div class="joy" aria-hidden="true"><div class="joy__knob"></div></div>
    <p class="toast" role="status" hidden></p>`;const e=n.querySelector(".minimap"),i=e.getContext("2d"),s=n.querySelector(".joy"),r=n.querySelector(".joy__knob"),o=n.querySelector(".toast");let a=null;const c=(x,_)=>{r.style.transform=`translate(${x}px, ${_}px)`};function l(x){const _=s.getBoundingClientRect();let h=x.clientX-(_.left+_.width/2),v=x.clientY-(_.top+_.height/2);const y=Math.hypot(h,v);y>$s&&(h=h/y*$s,v=v/y*$s),c(h,v),t.setAxis(h/$s,v/$s)}s.addEventListener("pointerdown",x=>{a=x.pointerId,s.setPointerCapture(a),l(x)}),s.addEventListener("pointermove",x=>x.pointerId===a&&l(x));const u=x=>{x.pointerId===a&&(a=null,c(0,0),t.setAxis(0,0))};s.addEventListener("pointerup",u),s.addEventListener("pointercancel",u);function f(){const{width:x,height:_}=e,h=12,v=Math.min((x-h*2)/st.size.w,(_-h*2)/st.size.d),y=(x-st.size.w*v)/2,T=(_-st.size.d*v)/2;i.clearRect(0,0,x,_),i.font="11px system-ui, sans-serif",i.textAlign="center";for(const R of st.rooms){const P=R.id===q.state.roomId;i.fillStyle=P?"#f5e3dc":"#fffdf9",i.strokeStyle="#c9b8ae",i.lineWidth=1.5,i.fillRect(y+R.x0*v,T+R.z0*v,(R.x1-R.x0)*v,(R.z1-R.z0)*v),i.strokeRect(y+R.x0*v,T+R.z0*v,(R.x1-R.x0)*v,(R.z1-R.z0)*v),i.fillStyle="#7a6a61",i.fillText(R.name,y+(R.x0+R.x1)/2*v,T+(R.z0+R.z1)/2*v+4)}const{x:L,z:C,yaw:w}=t.state,p=y+L*v,M=T+C*v,E=Math.atan2(-Math.cos(w),-Math.sin(w));i.fillStyle="rgba(198,90,58,0.25)",i.beginPath(),i.moveTo(p,M),i.arc(p,M,26,E-.6,E+.6),i.closePath(),i.fill(),i.fillStyle="#c65a3a",i.beginPath(),i.arc(p,M,5,0,Math.PI*2),i.fill()}let d=0;function g(x){o.textContent=x,o.hidden=!1,clearTimeout(d),d=setTimeout(()=>{o.hidden=!0},5e3)}function m(x){const _=x.mode==="walk";if(n.hidden=!_,document.body.classList.toggle("walking",_),_){const h=window.matchMedia("(pointer: coarse)").matches;g(h?"Dùng cần bên trái để đi, kéo màn hình để nhìn quanh.":"WASD hoặc phím mũi tên để đi, Shift để chạy, kéo chuột để nhìn quanh.")}}return q.subscribe((x,_,h)=>h.includes("mode")&&m(x)),m(q.state),{draw:f,notify:g}}const bb={wood:"Gỗ sáng",darkwood:"Gỗ tối",tile:"Gạch",marble:"Đá hoa",granite:"Granite",concrete:"Bê tông",epoxy:"Epoxy trắng",carpet:"Thảm",glass:"Kính"},Sb={door:"Cửa đi",window:"Cửa sổ",open:"Lối mở"},cd=[.7,.9,1.2,1.5,2,2.5,3],Gi=n=>`${(Math.round(n*10)/10).toLocaleString("vi-VN")} m²`,ya=(n,t,e,i)=>`<div class="chips-row">${n.map(s=>`<button type="button" class="chipbtn${s===t?" on":""}" ${e}="${Xt(s)}">${Xt(i(s))}</button>`).join("")}</div>`;function yb(n){const t=(e,i,s)=>`<button type="button" class="chipbtn${n.tool===e?" on":""}" data-tool="${e}">${re(s,15)} ${i}</button>`;return`<section><h3>Thêm vào mặt bằng</h3><div class="chips-row">
      ${t("door","Cửa đi","plus")}${t("window","Cửa sổ","plus")}${t("open","Lối mở","plus")}
      ${st.custom?t("room","Vẽ phòng","pencil"):""}
    </div>${n.tool?`<p class="plan__hint">${n.tool==="room"?"Kéo trên sàn để vẽ phòng chữ nhật.":"Bấm vào một đoạn tường để đặt."} Bấm lại nút để thôi.</p>`:""}</section>`}function Eb(n){const t=n.selection,e=t&&pe.get(t.type,t.id);return e?.type==="room"?`<section><h3>Phòng đang chọn</h3>
      <label class="plan__field">Tên phòng
        <input type="text" maxlength="40" value="${Xt(e.name)}" data-room-name="${Xt(e.id)}" />
      </label>
      <div class="plan__label">Vật liệu sàn</div>
      ${ya(Jl,e.floor??"wood","data-room-floor",i=>bb[i])}
      <p class="plan__hint">${Gi(e.area)}${st.custom?" · kéo chấm cam để đổi cạnh, kéo sàn để dời phòng":""}</p>
      ${st.custom?`<button type="button" class="rbtn rbtn--danger" data-room-delete="${Xt(e.id)}">${re("trash",16)}<span>Xoá phòng</span></button>`:""}
    </section>`:e?.type==="opening"?`<section><h3>${Xt(e.name)} đang chọn</h3>
      ${ya(Co,e.kind,"data-op-type",i=>Sb[i])}
      <div class="plan__label">Bề rộng</div>
      ${ya(cd,cd.find(i=>Math.abs(i-e.w)<.01),"data-op-width",i=>`${i} m`)}
      <p class="plan__hint">Kéo khối cửa dọc tường để dời.</p>
      <button type="button" class="rbtn rbtn--danger" data-op-delete="${Xt(e.id)}">${re("trash",16)}<span>Xoá</span></button>
    </section>`:'<p class="plan__hint">Bấm một phòng, hoặc một cửa, để chỉnh sàn / tên / kích thước.</p>'}function Tb(n){return st.custom?`<section><h3>Tầng · tổng ${Gi(st.totalArea)}</h3>
    <div class="chips-row">${st.floors.map(t=>`<button type="button" class="chipbtn${t.id===st.floorId?" on":""}" data-floor="${Xt(t.id)}">${Xt(t.name)} · ${Gi(t.area)}</button>`).join("")}
      <button type="button" class="chipbtn" data-floor-add>${re("plus",15)} Thêm tầng</button></div>
    <label class="plan__field">Tên tầng đang xem
      <input type="text" maxlength="40" value="${Xt(st.floors.find(t=>t.id===st.floorId)?.name??"")}" data-floor-name="${Xt(st.floorId)}" />
    </label>
    ${st.floors.length>1?`<button type="button" class="rbtn rbtn--danger" data-floor-remove="${Xt(st.floorId)}">${re("trash",16)}<span>Xoá tầng này</span></button>`:""}
  </section>`:""}function wb(n){if(!st.custom)return`<section><h3>Mặt bằng</h3>
      <p class="plan__hint">Đang dùng mặt bằng mẫu theo diện tích tin đăng (${Gi(st.area)}). Có thể đổi sàn, thêm/dời cửa. Muốn tự vẽ phòng và thêm tầng, hãy chuyển sang tự thiết kế.</p>
      <button type="button" class="rbtn" data-plan-convert>${re("pencil",16)}<span>Tự thiết kế mặt bằng</span></button>
    </section>`;const t=n.listingArea,e=t?Math.abs(st.totalArea-t):0;return`<section><h3>Diện tích</h3>
    <p class="plan__hint">Tầng này ${Gi(st.area)} · tổng ${Gi(st.totalArea)}${t?` · tin đăng ${Gi(t)}`:""}</p>
    ${t?`<button type="button" class="rbtn" data-plan-fit="${t}" ${e<.5?"disabled":""}>${re("cube",16)}<span>Khớp diện tích tin đăng</span></button>`:""}
    <button type="button" class="rbtn rbtn--danger" data-plan-revert>${re("undo",16)}<span>Quay về mặt bằng mẫu</span></button>
  </section>`}function Ab(n){let t=!1;function e(){const i=q.state;i.editPanel==="plan"&&(n.innerHTML=[wb(i),Tb(),yb(i),Eb(i)].join(""),t=!1)}return n.addEventListener("click",i=>{const s=i.target.closest("button");if(!s)return;const r=s.dataset;if(r.tool)return Nt.emit("tool:set",{tool:r.tool}),q.set({editPanel:null});if("planConvert"in r)return Nt.emit("plan:convert");if("planRevert"in r){if(!t){t=!0,s.querySelector("span").textContent="Bấm lần nữa để xác nhận (mất mặt bằng tự vẽ)";return}return Nt.emit("plan:revert")}if("planFit"in r)return Nt.emit("plan:fit",{target:Number(r.planFit)});if(r.floor)return Nt.emit("plan:floor-select",{id:r.floor});if("floorAdd"in r)return Nt.emit("plan:floor-add",{});if(r.floorRemove)return Nt.emit("plan:floor-remove",{id:r.floorRemove});if(r.roomFloor)return Nt.emit("plan:room-floor",{id:q.state.selection.id,floor:r.roomFloor});if(r.roomDelete)return Nt.emit("plan:room-delete",{id:r.roomDelete});if(r.opType)return Nt.emit("plan:opening-type",{id:q.state.selection.id,type:r.opType});if(r.opWidth)return Nt.emit("plan:opening-width",{id:q.state.selection.id,w:Number(r.opWidth)});if(r.opDelete)return Nt.emit("plan:opening-delete",{id:r.opDelete})}),n.addEventListener("change",i=>{const s=i.target.closest("input");s&&(s.dataset.roomName&&Nt.emit("plan:room-name",{id:s.dataset.roomName,name:s.value}),s.dataset.floorName&&Nt.emit("plan:floor-rename",{id:s.dataset.floorName,name:s.value}))}),q.subscribe((i,s,r)=>{["editPanel","selection","tool","floorId","listingArea"].some(o=>r.includes(o))&&e()}),Nt.on("plan:loaded",e),{render:e}}const Rb=60,Cb="Kéo đồ để dời · kéo nền để dịch khung · chuột phải để xoay",Pb={door:"Bấm vào tường để đặt cửa đi",window:"Bấm vào tường để đặt cửa sổ",open:"Bấm vào tường để tạo lối mở",room:"Kéo trên sàn để vẽ phòng"};function Lb(){const n=new Map;for(const t of Object.keys(ji)){const e=Rs[t];e&&(n.has(e.category)||n.set(e.category,[]),n.get(e.category).push({kind:t,name:e.name}))}return[...n].map(([t,e])=>({category:t,kinds:e}))}function Db(n){const t=Lb();n.innerHTML=`
    <div class="rail" role="toolbar" aria-label="Công cụ chỉnh bố cục" hidden>
      <div class="drawer" data-drawer="catalog" role="dialog" aria-label="Danh mục đồ nội thất" hidden>
        ${t.map(x=>`<section><h3>${Xt(x.category)}</h3><div class="drawer__grid">${x.kinds.map(_=>`<button type="button" class="tile" data-add="${Xt(_.kind)}">${Xt(_.name)}</button>`).join("")}</div></section>`).join("")}
      </div>
      <div class="drawer" data-drawer="inventory" role="dialog" aria-label="Danh sách đồ trong căn hộ" hidden>
        <ul class="inv" role="list"></ul>
      </div>
      <div class="drawer drawer--plan" data-drawer="plan" role="dialog" aria-label="Mặt bằng" hidden><div class="plan"></div></div>
      <div class="rail__row">
        <button type="button" class="rbtn" data-panel="catalog" aria-expanded="false">${re("plus",18)}<span>Thêm đồ</span></button>
        <button type="button" class="rbtn" data-panel="plan" aria-expanded="false">${re("cube",18)}<span class="plan-label">Mặt bằng</span></button>
        <button type="button" class="rbtn" data-panel="inventory" aria-expanded="false">${re("list",18)}<span>Danh sách đồ</span></button>
        <span class="rail__ctx" hidden>
          <b class="rail__name"></b>
          <button type="button" class="rbtn rbtn--icon" data-act="rotate" aria-label="Xoay 90 độ" title="Xoay 90°">${re("rotateRight",18)}</button>
          <button type="button" class="rbtn rbtn--icon" data-act="toggle" aria-label="Ẩn đồ" title="Ẩn / hiện"></button>
          <button type="button" class="rbtn rbtn--icon" data-act="reset" aria-label="Đặt lại vị trí" title="Đặt lại vị trí" hidden>${re("undo",18)}</button>
          <button type="button" class="rbtn rbtn--icon rbtn--danger" data-act="remove" aria-label="Xoá đồ đã thêm" title="Xoá" hidden>${re("trash",18)}</button>
        </span>
        <p class="rail__hint">Kéo đồ để dời · kéo nền để dịch khung · chuột phải để xoay</p>
      </div>
    </div>`;const e=n.querySelector(".rail"),i=n.querySelector(".rail__ctx"),s=n.querySelector(".rail__hint"),r=n.querySelector(".rail__name"),o=n.querySelector('[data-act="toggle"]'),a=n.querySelector('[data-act="reset"]'),c=n.querySelector('[data-act="remove"]'),l=n.querySelector(".inv");let u="";const f=Ab(n.querySelector(".plan")),d=()=>{const x=q.state.selection;return x?.type==="item"?pe.get("item",x.id):null};function g(){const x=pe.list("item"),_=x.map(v=>`${v.id}:${v.hidden?1:0}`).join("|");if(_===u)return;u=_;const h=x.filter(v=>v.extra).length;l.innerHTML=x.map(v=>`<li class="inv__row${v.hidden?" is-hidden":""}">
            <button type="button" class="inv__name" data-pick="${Xt(v.id)}">${Xt(v.name)}${v.extra?" <small>(thêm)</small>":""}</button>
            <button type="button" class="rbtn rbtn--icon" data-vis="${Xt(v.id)}" aria-label="${v.hidden?"Hiện":"Ẩn"} ${Xt(v.name)}">${re(v.hidden?"eyeOff":"eye",18)}</button>
          </li>`).join("")+`<li class="inv__foot">${x.length} món · ${h}/${Rb} đồ thêm</li>`}function m(x){const _=x.editing&&x.editable&&x.mode==="overview";if(e.hidden=!_,!_)return;n.querySelector(".plan-label").textContent=`Mặt bằng · ${st.totalArea.toFixed(0)} m²${st.floors.length>1?` · ${st.floors.length} tầng`:""}`;const h=d();i.hidden=!h,s.hidden=!!h,h&&(r.textContent=h.name,o.innerHTML=re(h.hidden?"eyeOff":"eye",18),o.setAttribute("aria-label",h.hidden?`Hiện ${h.name}`:`Ẩn ${h.name}`),a.hidden=!h.moved,c.hidden=!h.extra);for(const v of n.querySelectorAll("[data-panel]")){const y=x.editPanel===v.dataset.panel;v.setAttribute("aria-expanded",String(y)),v.classList.toggle("active",y)}for(const v of n.querySelectorAll("[data-drawer]"))v.hidden=v.dataset.drawer!==x.editPanel;x.editPanel==="inventory"&&g(),x.editPanel==="plan"&&f.render(),s.textContent=Pb[x.tool]??Cb}n.addEventListener("click",x=>{const _=x.target.closest("[data-panel]");if(_){q.set({editPanel:q.state.editPanel===_.dataset.panel?null:_.dataset.panel});return}const h=x.target.closest("[data-add]");if(h)return Nt.emit("edit:add",{kind:h.dataset.add});const v=x.target.closest("[data-pick]");if(v){const C={type:"item",id:v.dataset.pick};return q.select(C),Nt.emit("camera:locate",C)}const y=x.target.closest("[data-vis]");if(y)return u="",Nt.emit("edit:toggle",{id:y.dataset.vis});const T=x.target.closest("[data-act]"),L=d();T&&L&&Nt.emit(`edit:${T.dataset.act}`,{id:L.id})}),n.addEventListener("keydown",x=>{x.key==="Escape"&&q.state.editPanel&&q.set({editPanel:null})}),q.subscribe((x,_,h)=>{["editing","editable","mode","selection","editPanel","tool"].some(v=>h.includes(v))&&m(x)}),Nt.on("plan:loaded",()=>{u="",m(q.state)}),m(q.state)}const Ea=n=>!!n&&n.width>0&&n.height>0;function Ib({width:n,height:t},{topbar:e,rooms:i,detail:s,detailShown:r=!0},o=720){const a={left:0,right:0,top:0,bottom:0},c=n>=o;Ea(e)&&(a.top=Math.max(0,e.bottom)),Ea(i)&&(c?a.left=Math.max(0,i.right):a.bottom=Math.max(a.bottom,t-i.top)),r&&Ea(s)&&(c?a.right=Math.max(0,n-s.left):a.bottom=Math.max(a.bottom,t-s.top));const l=n*.6,u=t*.6;if(a.left+a.right>l){const f=l/(a.left+a.right);a.left*=f,a.right*=f}if(a.top+a.bottom>u){const f=u/(a.top+a.bottom);a.top*=f,a.bottom*=f}return a}const Nb=[["header","ui-topbar"],["nav","ui-rooms"],["div","ui-detail"],["div","ui-mapctl"],["div","ui-hud"],["div","ui-edit"]];function Ub(n,{app:t,walker:e}){const i={};for(const[c,l]of Nb){const u=document.createElement(c);u.id=l,u.className="region",n.append(u),i[l]=u}fb(i["ui-topbar"]),pb(i["ui-rooms"]),_b(i["ui-detail"]),vb(i["ui-mapctl"]);const s=Mb(i["ui-hud"],e);Db(i["ui-edit"]);let r=0;function o(){r=0;const c=n.querySelector('[data-inset="detail"]');t.setInsets(Ib({width:window.innerWidth,height:window.innerHeight},{topbar:i["ui-topbar"].getBoundingClientRect(),rooms:n.querySelector('[data-inset="rooms"]')?.getBoundingClientRect(),detail:c?.getBoundingClientRect(),detailShown:!!c&&!c.hidden&&!document.body.classList.contains("editing")}))}const a=()=>{r||(r=requestAnimationFrame(o))};return window.addEventListener("resize",a),q.subscribe((c,l,u)=>{(u.includes("selection")||u.includes("mode")||u.includes("editing"))&&(a(),setTimeout(a,320))}),a(),setTimeout(a,400),{hud:s,els:i}}const pt=Math.PI,ce=(n,t,e)=>({c:n,w:t,type:"window",...e?{sill:e}:{}}),mn=(n,t=.9)=>({c:n,w:t,type:"door"}),Lo=(n,t=1)=>({c:n,w:t,type:"door",entrance:!0}),Do=(n,t)=>({c:n,w:t,type:"open"}),et=(n,t,e,i=0,s,r)=>({kind:n,x:t,z:e,rot:i,...s?{args:s}:{},...r?{name:r}:{}}),en=(n,t,e,i,s)=>({dir:n,at:t,from:e,to:i,t:ch,openings:s}),$e=(n,t,e,i,s=[])=>({dir:n,at:t,from:e,to:i,t:uh,openings:s}),Ob={id:"studio",bedrooms:0,bathrooms:1,size:{w:7,d:5.5},rooms:[{id:"living",name:"Phòng ở & ngủ",x0:0,x1:7,z0:0,z1:3.5,floor:"wood",stand:{x:3.4,z:.7,yaw:pt},note:"Khu ngủ và tiếp khách chung một không gian"},{id:"kitchen",name:"Bếp",x0:0,x1:4,z0:3.5,z1:5.5,floor:"tile",stand:{x:2.2,z:4.3,yaw:pt/2+.5},note:"Bếp một dãy, lối vào căn hộ"},{id:"bath",name:"Vệ sinh",x0:4,x1:7,z0:3.5,z1:5.5,floor:"tile",stand:{x:5.5,z:4,yaw:pt},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[en("x",0,0,7,[ce(2.2,2.4)]),en("x",5.5,0,7,[ce(5.5,.6,1.5)]),en("z",0,0,5.5,[ce(1.75,1.6),Lo(4.5)]),en("z",7,0,5.5,[ce(1.75,1.6)]),$e("x",3.5,0,7,[Do(1.3,2),mn(5.5)]),$e("z",4,3.5,5.5)],placements:[et("rug",3.05,2,0,[2.6,1.8]),et("sofa",3.05,1.5,0,[2.2]),et("coffeeTable",3.05,2.5),et("tvUnit",3.05,3.24,pt,[1.2]),et("bed",5.6,1.17,0),et("nightstand",4.4,.35,0),et("wardrobe",6.64,2.8,-pt/2,[1.2,2.3]),et("plant",.5,.5,0,[1]),et("floorLamp",.5,3),et("kitchenRun",1.9,5.1,pt,[2.6]),et("fridge",3.55,5.06,pt),et("shower",6.4,5,0),et("toilet",4.8,5.08,pt),et("vanity",4.33,4.2,pt/2)]},Fb={id:"1pn",bedrooms:1,bathrooms:1,size:{w:8,d:6.5},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:5,z0:0,z1:4,floor:"wood",stand:{x:3.4,z:.7,yaw:pt},note:"Sofa, TV, cửa sổ đón sáng"},{id:"kitchen",name:"Bếp & ăn",x0:5,x1:8,z0:0,z1:3,floor:"tile",stand:{x:5.8,z:.9,yaw:-pt/2-.4},note:"Bếp chữ I, bàn ăn 4 chỗ"},{id:"study",name:"Góc làm việc",x0:5,x1:8,z0:3,z1:6.5,floor:"wood",stand:{x:5.7,z:3.6,yaw:-pt/2+.3},note:"Bàn làm việc, tủ sách"},{id:"bed1",name:"Phòng ngủ",x0:0,x1:3.4,z0:4,z1:6.5,floor:"wood",stand:{x:2.6,z:4.5,yaw:pt/2+.3},note:"Giường đôi, tủ áo"},{id:"bath",name:"Vệ sinh",x0:3.4,x1:5,z0:4,z1:6.5,floor:"tile",stand:{x:4.2,z:4.6,yaw:pt},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[en("x",0,0,8,[ce(1.6,2.2),Lo(4.2),ce(6.5,1.6)]),en("x",6.5,0,8,[ce(1.7,1.4),ce(4.2,.6,1.5),ce(6.5,1.8)]),en("z",0,0,6.5,[ce(2,1.8),ce(5.25,1.4)]),en("z",8,0,6.5,[ce(1.5,1.2),ce(4.75,1.6)]),$e("z",5,0,6.5,[Do(1.5,2),mn(3.5)]),$e("x",3,5,8),$e("x",4,0,5,[mn(1.7),mn(3.95)]),$e("z",3.4,4,6.5)],placements:[et("rug",2.8,2.7,0,[3,2]),et("sofa",2.8,1.6,0,[2.2]),et("coffeeTable",2.8,2.8),et("tvUnit",2.8,3.74,pt,[1.2]),et("armchair",.9,2.75,pt/2),et("plant",.4,3.7,0,[1.1]),et("floorLamp",4.55,3.1),et("console",1.5,.28,0,[1]),et("plant",.45,.45,0,[.8],"Cây lối vào"),et("kitchenRun",6.2,2.64,pt,[1.9]),et("fridge",7.55,2.58,pt),et("diningTable",6.8,1),et("chair",6.35,.4,0),et("chair",7.25,.4,0),et("chair",6.35,1.6,pt),et("chair",7.25,1.6,pt),et("rug",1.7,5.5,pt/2,[2.2,1.6,"beige"]),et("bed",1.17,5.5,pt/2),et("nightstand",.33,4.42,pt/2),et("wardrobe",3.04,5.5,-pt/2,[1.4,2.3]),et("toilet",3.8,6.09,pt),et("shower",4.47,5.6,0),et("vanity",4.66,4.6,-pt/2),et("desk",7.6,4.75,-pt/2),et("chair",7.1,4.75,pt/2,void 0,"Ghế làm việc"),et("bookshelf",6.4,6.24,pt,[1.4]),et("plant",5.3,6.1,0,[1])]},zb={id:"2pn",bedrooms:2,bathrooms:1,size:{w:10,d:7},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:6,z0:0,z1:4.5,floor:"wood",stand:{x:3.4,z:.7,yaw:pt},note:"Sofa, TV, cửa sổ đón sáng hướng Nam"},{id:"kitchen",name:"Bếp & ăn",x0:6,x1:10,z0:0,z1:3,floor:"tile",stand:{x:6.8,z:.9,yaw:-pt/2-.4},note:"Bếp chữ I, bàn ăn 4 chỗ"},{id:"bed2",name:"Phòng ngủ 2",x0:6,x1:10,z0:3,z1:7,floor:"wood",stand:{x:6.9,z:3.9,yaw:-pt/2+.2},note:"Giường đôi, tủ áo, bàn làm việc"},{id:"bed1",name:"Phòng ngủ 1",x0:0,x1:4,z0:4.5,z1:7,floor:"wood",stand:{x:2.8,z:5.1,yaw:pt/2+.3},note:"Giường đôi, tủ áo âm tường"},{id:"bath",name:"Vệ sinh",x0:4,x1:6,z0:4.5,z1:7,floor:"tile",stand:{x:5,z:5.2,yaw:pt},note:"Buồng tắm kính, bồn rửa, bệ xí"}],walls:[en("x",0,0,10,[ce(2.2,2.4),Lo(5),ce(8,1.6)]),en("x",7,0,10,[ce(2,1.4),ce(5,.6,1.5),ce(8,2)]),en("z",0,0,7,[ce(2.5,1.8),ce(5.75,1.4)]),en("z",10,0,7,[ce(1.5,1.2),ce(5,1.6)]),$e("z",6,0,7,[Do(1.5,2),mn(3.9)]),$e("x",3,6,10),$e("x",4.5,0,6,[mn(2),mn(5)]),$e("z",4,4.5,7)],placements:[et("rug",3.5,2.7,0,[3,2]),et("sofa",3.5,1.6,0,[2.4]),et("coffeeTable",3.5,2.9),et("ottoman",2.2,2.9),et("tvUnit",3.5,4.24,pt,[1.8]),et("armchair",1,3.3,pt/2),et("plant",.5,4,0,[1.1]),et("floorLamp",5.5,3.3),et("console",3.9,.3,0,[1]),et("plant",5.55,.45,0,[.8],"Cây lối vào"),et("kitchenRun",7.63,2.64,pt,[2.95]),et("fridge",9.5,2.58,pt),et("diningTable",8,1.1),et("chair",7.55,.5,0),et("chair",8.45,.5,0),et("chair",7.55,1.7,pt),et("chair",8.45,1.7,pt),et("rug",1.7,6.05,pt/2,[2.2,1.6,"beige"]),et("bed",1.17,6.05,pt/2),et("nightstand",.33,5,pt/2),et("wardrobe",3.64,5.75,-pt/2,[1.4,2.3]),et("shower",4.55,6.5,0),et("toilet",5.5,6.62,pt),et("vanity",5.69,5.3,-pt/2),et("rug",8,4.4,0,[2.4,1.6,"beige"]),et("bed",8,4.1,0),et("nightstand",6.95,3.35,0),et("nightstand",9.05,3.35,0),et("wardrobe",6.36,6,pt/2,[1.4,2.3]),et("desk",9.6,5,-pt/2),et("chair",9.1,5,pt/2,void 0,"Ghế làm việc"),et("dresser",9.55,6.45,-pt/2)]},Bb={id:"3pn",bedrooms:3,bathrooms:2,size:{w:13,d:8},rooms:[{id:"living",name:"Phòng khách",x0:0,x1:7,z0:0,z1:5,floor:"wood",stand:{x:5.8,z:.8,yaw:pt-.5},note:"Phòng khách rộng, kết hợp bàn ăn"},{id:"kitchen",name:"Bếp",x0:7,x1:13,z0:0,z1:3.5,floor:"tile",stand:{x:7.9,z:.9,yaw:-pt/2-.4},note:"Bếp chữ I, bàn ăn"},{id:"hall",name:"Sảnh",x0:7,x1:9,z0:3.5,z1:5.5,floor:"wood",stand:{x:7.6,z:4,yaw:-pt/2},note:"Sảnh trung tâm dẫn tới phòng ngủ chính"},{id:"master",name:"Phòng ngủ chính",x0:9,x1:13,z0:3.5,z1:8,floor:"wood",stand:{x:9.7,z:4.4,yaw:-pt/2-.2},note:"Giường đôi, tủ áo lớn"},{id:"bath2",name:"Vệ sinh chung",x0:7,x1:9,z0:5.5,z1:8,floor:"tile",stand:{x:8,z:6,yaw:pt},note:"Buồng tắm kính, bồn rửa"},{id:"bed2",name:"Phòng ngủ 2",x0:0,x1:3.5,z0:5,z1:8,floor:"wood",stand:{x:2.7,z:5.5,yaw:pt/2+.3},note:"Giường đôi, tủ áo"},{id:"bed3",name:"Phòng ngủ 3",x0:3.5,x1:5.6,z0:5,z1:8,floor:"wood",stand:{x:4.55,z:5.5,yaw:pt},note:"Phòng ngủ nhỏ cho con / khách"},{id:"bath1",name:"Vệ sinh 2",x0:5.6,x1:7,z0:5,z1:8,floor:"tile",stand:{x:6.3,z:5.5,yaw:pt},note:"Vệ sinh gần phòng khách"}],walls:[en("x",0,0,13,[ce(2.5,2.6),Lo(5.8),ce(10,2)]),en("x",8,0,13,[ce(1.75,1.6),ce(4.5,1.2),ce(6.3,.6,1.5),ce(8,.6,1.5),ce(11.6,1.6)]),en("z",0,0,8,[ce(2.5,2),ce(6.5,1.6)]),en("z",13,0,8,[ce(1.75,1.4),ce(5.75,1.6)]),$e("z",7,0,8,[Do(1.75,2.2),mn(4.2)]),$e("x",3.5,7,13),$e("z",9,3.5,8,[mn(4.4)]),$e("x",5.5,7,9,[mn(8)]),$e("x",5,0,7,[mn(1.6),mn(4.55),mn(6.3)]),$e("z",3.5,5,8),$e("z",5.6,5,8)],placements:[et("rug",3.1,3,0,[3,2]),et("sofa",3.1,1.9,0,[2.4]),et("coffeeTable",3.1,3.1),et("ottoman",1.95,3.1),et("tvUnit",3.1,4.74,pt,[1.8]),et("armchair",1,3.6,pt/2),et("armchair",5.3,3.6,-pt/2),et("plant",.5,4.5,0,[1.1]),et("floorLamp",5.9,4.4),et("console",4.3,.3,0,[1]),et("plant",6.6,.5,0,[.8],"Cây lối vào"),et("diningTable",5.2,1.9),et("chair",4.75,1.3,0),et("chair",5.65,1.3,0),et("chair",4.75,2.5,pt),et("chair",5.65,2.5,pt),et("kitchenRun",9.6,3.14,pt,[3.6]),et("fridge",11.85,3.08,pt),et("diningTable",9.8,1.3),et("chair",9.35,.7,0),et("chair",10.25,.7,0),et("chair",9.35,1.9,pt),et("chair",10.25,1.9,pt),et("plant",8.6,3.9,0,[.9]),et("rug",11.9,5.75,-pt/2,[2.4,1.6,"beige"]),et("bed",11.87,5.75,-pt/2),et("nightstand",12.7,4.7,-pt/2),et("nightstand",12.7,6.8,-pt/2),et("wardrobe",9.8,7.65,pt,[1.4,2.3]),et("plant",12.55,7.5,0,[1]),et("dresser",9.35,6.2,pt/2),et("toilet",7.5,7.6,pt),et("shower",8.45,7.45,0),et("vanity",7.33,6.4,pt/2),et("rug",1.8,6.5,pt/2,[2.2,1.6,"beige"]),et("bed",1.17,6.5,pt/2),et("nightstand",.33,5.35,pt/2),et("wardrobe",3.14,6.5,-pt/2,[1.2,2.3]),et("bed",4.55,6.85,pt),et("toilet",5.97,6.4,pt/2),et("vanity",6.67,6.6,-pt/2),et("shower",6.4,7.4,0)]},ud=[Ob,Fb,zb,Bb],kb=.9,Gb=1.3,Kr=.15,dd=.9;function Hb(n){const t=Math.max(0,Math.min(3,Math.floor(n)));return ud.find(e=>e.bedrooms===t)??ud[2]}const qe=(n,t)=>Math.round(n*t*1e3)/1e3;function Vb(n,t){return n.map(e=>({...e,at:qe(e.at,t),from:qe(e.from,t),to:qe(e.to,t),openings:e.openings.map(i=>({...i,c:qe(i.c,t),at:i.at===void 0?void 0:qe(i.at,t)}))}))}function Wb(n,t){return n.map(e=>({...e,x0:qe(e.x0,t),x1:qe(e.x1,t),z0:qe(e.z0,t),z1:qe(e.z1,t),stand:{...e.stand,x:qe(e.stand.x,t),z:qe(e.stand.z,t)}}))}function Xb(n){return n.map((t,e)=>({...t,openings:t.openings.map((i,s)=>({...i,id:`w${e}o${s}`,dir:t.dir,at:t.at}))}))}function $b(n,t){if(!t)return n;const e=new Set(t.removed??[]),i=t.moved??{},s=n.map(r=>{const o=c=>c.w/2+Kr,a=[];for(const c of r.openings){if(e.has(c.id))continue;const l=i[c.id],u=l?{...c,...l.c!==void 0?{c:l.c}:{},...l.w!==void 0?{w:l.w}:{},...l.type?{type:l.type}:{}}:c;u.type==="window"&&u.sill===void 0&&(u.sill=dd),u.type!=="window"&&delete u.sill,u.type!=="door"&&delete u.entrance,u.c=Math.min(r.to-o(u),Math.max(r.from+o(u),u.c)),!(r.to-r.from<u.w+Kr*2)&&a.push(u)}return{...r,openings:a}});for(const r of t.added??[]){const o=s.find(u=>u.dir===r.dir&&Math.abs(u.at-r.at)<.06);if(!o)continue;const a={...r};a.type!=="window"?delete a.sill:a.sill===void 0&&(a.sill=dd),a.type!=="door"&&delete a.entrance;const c=o.from+a.w/2+Kr,l=o.to-a.w/2-Kr;l<c||(a.c=Math.min(l,Math.max(c,a.c)),o.openings.push(a))}for(const r of s)r.openings.sort((o,a)=>o.c-a.c);return s}function qb(n,t){return t?n.map(e=>{const i=t[e.id];return i?{...e,...i.name?{name:i.name}:{},...i.floor?{floor:i.floor}:{}}:e}):n}function Yb(n){const t=Rs[n];return{name:t.name,category:t.category,material:t.material,note:t.note}}function Ch(n,t,e){Rs[n.kind];const i=ji[n.kind],s=n.args&&n.args.length?n.args:i.length?i:void 0;return{id:n.id,kind:n.kind,args:s,x:qe(n.x,t),z:qe(n.z,t),rot:n.rot??0,...Yb(n.kind),pick:!0,hidden:!!n.hidden,moved:!1,extra:!0,floor:e}}function jb(n){return n.map(t=>({id:t.id,name:t.name,area:Th(t.rooms)}))}function Kb(n,t,{editable:e,floorId:i}){const s=t.layout.custom.floors,r=s.find(l=>l.id===i)??s[0],o=r.rooms.map(l=>({...l,stand:{x:hd((l.x0+l.x1)/2),z:hd((l.z0+l.z1)/2),yaw:Math.PI},note:`${$i(l).toFixed(0)} m²`})),a=Eh(r.rooms,r.openings),c=[];for(const l of t.layout.extras??[])!((l.floor??s[0].id)===r.id)||!Rs[l.kind]||!Object.prototype.hasOwnProperty.call(ji,l.kind)||l.hidden&&!e||c.push(Ch(l,1,r.id));return{templateId:"custom",bedrooms:n.bedrooms,size:DM(r.rooms),rooms:o,walls:a,placements:c,scale:1,floors:jb(s),floorId:r.id,totalArea:ec(s),custom:!0}}const hd=n=>Math.round(n*100)/100;function Zb(n,t,{editable:e=!1,floorId:i}={}){if(t?.layout?.custom)return Kb(n,t,{editable:e,floorId:i});const s=Hb(n.bedrooms),r=s.rooms.reduce((x,_)=>x+$i(_),0),o=Math.sqrt(Math.max(1,n.areaM2)/r),a=Math.min(Gb,Math.max(kb,o)),c=Ku[t?.furnishing??n.furnishing]??Ku.full,l=t?.layout?.items??{},u=new Map,f=[];for(const x of s.placements){const _=Rs[x.kind];if(!_)continue;const h=(u.get(x.kind)??0)+1;if(u.set(x.kind,h),_.tier>c)continue;const v=`${x.kind}-${h}`,y=l[v],T=!!y?.hidden;T&&!e||f.push({id:v,kind:x.kind,args:x.args,x:qe(y?.x??x.x,a),z:qe(y?.z??x.z,a),rot:y?.rot??x.rot,name:x.name??_.name,category:_.category,material:_.material,note:_.note,pick:_.pick!==!1,hidden:T,moved:y!==void 0&&(y.x!==void 0||y.z!==void 0||y.rot!==void 0),extra:!1})}for(const x of t?.layout?.extras??[])!Rs[x.kind]||!Object.prototype.hasOwnProperty.call(ji,x.kind)||x.hidden&&!e||f.push(Ch(x,a));const d=Wb(qb(s.rooms,t?.layout?.rooms),a),g=Vb($b(Xb(s.walls),t?.layout?.openings),a),m=d.reduce((x,_)=>x+$i(_),0);return{templateId:s.id,bedrooms:s.bedrooms,size:{w:qe(s.size.w,a),d:qe(s.size.d,a)},rooms:d,walls:g,placements:f,scale:a,floors:[{id:"main",name:"Tầng 1",area:Math.round(m*1e3)/1e3}],floorId:"main",totalArea:Math.round(m*1e3)/1e3,custom:!1}}const bo=.9,Ui=1.2,Mi=6,Ta=24,wa=1.35,Aa=.58,Zr=1.5,Ph=4,Jb=12,Qb=60,tS=2e3,er=(n,t)=>typeof n=="string"?n.trim().slice(0,t):"",Ks=(n,t,e,i)=>{const s=Math.floor(Number(n));return Number.isFinite(s)&&s>=t&&s<=e?s:i};function eS(n,t){if(!n||typeof n!="object")return null;const e=er(n.apartmentId,80),i=Ks(n.floor,1,t,0),s=Ks(n.slot,0,Ph-1,-1);if(!e||!i||s<0)return null;const r=Number(n.areaM2);return{apartmentId:e,floor:i,slot:s,label:er(n.label,40)||e,bedrooms:Ks(n.bedrooms,0,8,2),bathrooms:Ks(n.bathrooms,0,8,1),areaM2:Number.isFinite(r)&&r>0&&r<=1e3?r:70,furnishing:["bare","partial","full"].includes(n.furnishing)?n.furnishing:"full",has3d:n.has3d===!0}}function nS(n){if(!n||typeof n!="object"||!Array.isArray(n.buildings))return null;const t=[],e=new Set;for(const i of n.buildings.slice(0,Jb)){if(!i||typeof i!="object")continue;const s=er(i.id,40),r=Ks(i.floors,1,Qb,0);if(!s||!r||e.has(s))continue;e.add(s);const o=new Set,a=[];for(const c of(Array.isArray(i.units)?i.units:[]).slice(0,tS)){const l=eS(c,r),u=l&&`${l.floor}:${l.slot}`;!l||o.has(u)||(o.add(u),a.push(l))}t.push({id:s,name:er(i.name,40)||s,floors:r,units:a})}return t.length?{name:er(n.name,80),buildings:t}:null}const iS=n=>({apartmentId:n.apartmentId,bedrooms:n.bedrooms,bathrooms:n.bathrooms,areaM2:n.areaM2,furnishing:n.furnishing,designs:[]});function sS(n){const t=n<=6?7:9,e=(t-1)/2,i=[];for(let a=0;a<t;a++)for(let c=0;c<t;c++)Math.max(Math.abs(a-e),Math.abs(c-e))<=2&&i.push([a,c]);let s=n*7919+13;const r=()=>(s=s*1664525+1013904223>>>0)/4294967296;for(let a=i.length-1;a>0;a--){const c=Math.floor(r()*(a+1));[i[a],i[c]]=[i[c],i[a]]}const o=i.slice(0,n);return{size:t,block:Ta,owner:new Set(o.map(([a,c])=>`${a},${c}`)),pos:o.map(([a,c])=>({x:(a-e)*Ta,z:(c-e)*Ta}))}}function fd(n,t={x:0,z:0}){const e=Ui+(n.floor-1)*bo+bo/2,i=Mi/2+.04;return n.slot<2?{x:t.x+(n.slot===0?-Zr:Zr),y:e,z:t.z+i,ry:0}:{x:t.x+i,y:e,z:t.z+(n.slot===2?Zr:-Zr),ry:Math.PI/2}}const pd=[[9,1],[14,2],[6,0],[16,3],[8,1]];function rS(){return{name:"TH PropTech Residence",buildings:[14,18,10,20,12].map((i,s)=>[String.fromCharCode(65+s),`Tòa ${String.fromCharCode(65+s)}`,i]).map(([i,s,r],o)=>{const a=[];for(let c=1;c<=r;c++)for(let l=0;l<Ph;l++){const u=`${i}-${String(c).padStart(2,"0")}0${l+1}`;a.push({apartmentId:`demo-${u}`,floor:c,slot:l,label:u,bedrooms:1+(c+l)%3,bathrooms:1+(c+l)%2,areaM2:45+l*12+(c+o)%3*5,furnishing:["bare","partial","full"][(c+l)%3],has3d:c===pd[o][0]&&l===pd[o][1]})}return{id:i,name:s,floors:r,units:a}})}}const Jr=Math.PI/4,md=1,oS=30,Ra=15659771,ao=19,aS=2.4,lS=1.6,cS=new Ht(988979),uS=new U(70,130,90),dS=new U(-70,110,60),hS=new Ht(16777215),fS=new Ht(10204415),pS=new Ht(14673658),mS=new Ht(3489899),gd=[14242639,3900100,15905076,4171638,9333695,14711609,3094080],Lh=ao/2-.8,gS=8*Lh;function _S(n,t){const e=(n%(8*t)+8*t)%(8*t),i=Math.floor(e/(2*t)),s=e-i*2*t-t;return i===0?[s,-t]:i===1?[t,s]:i===2?[-s,t]:[-t,-s]}const xS=n=>()=>(n=n*1664525+1013904223>>>0)/4294967296;function Dh(n,t){const e=document.createElement("canvas");e.width=e.height=64,n(e.getContext("2d"));const i=new kd(e);return i.wrapS=i.wrapT=nr,t&&i.repeat.set(...t),i.colorSpace=Qe,i.anisotropy=4,i}const vS=()=>Dh(n=>{n.fillStyle="#f4f6fd",n.fillRect(0,0,64,64),n.fillStyle="#c3cef4",n.fillRect(0,16,64,16),n.fillStyle="#f4f6fd";for(let t=0;t<64;t+=16)n.fillRect(t+14,16,2,16)}),MS=n=>Dh(t=>{t.fillStyle="#fff",t.fillRect(0,0,64,64),t.fillStyle="#b9c7ea",t.fillRect(0,60,64,4)},[1,n]);function _d(n,t,e,i,s,r){const o=new fe(n,t,e),a=o.attributes.uv,c=[[e,t],[e,t],null,null,[n,t],[n,t]];for(let u=0;u<6;u++)for(let f=0;f<4;f++){const d=u*4+f;c[u]?a.setXY(d,a.getX(d)*c[u][0]/aS,a.getY(d)*c[u][1]/lS):a.setXY(d,.5,.06)}o.translate(i,t/2,s);const l=new Float32Array(72);for(let u=0;u<24;u++)l.set([r,r,r],u*3);return o.setAttribute("color",new _n(l,3)),o}function vi(n,t,e){const i=new Hl(n,t,Math.max(1,e.length));i.count=e.length;const s=new Pe;return e.forEach((r,o)=>{s.position.set(r.x,r.y,r.z),s.rotation.set(0,r.ry??0,0),s.scale.setScalar(r.s??1),s.updateMatrix(),i.setMatrixAt(o,s.matrix)}),i.instanceMatrix.needsUpdate=!0,i}function bS(n){n.traverse(t=>{t.geometry?.dispose?.();const e=Array.isArray(t.material)?t.material:t.material?[t.material]:[];for(const i of e)i.map?.dispose(),i.dispose()})}function SS(n,t={},e=lh()){const i=new ih({antialias:!e.coarse,powerPreference:"high-performance",stencil:!1});i.setPixelRatio(Math.min(window.devicePixelRatio||1,e.coarse?1.25:1.75)),i.outputColorSpace=Qe,i.toneMapping=yo,i.shadowMap.enabled=!0,i.shadowMap.type=vs,i.shadowMap.autoUpdate=!1,Object.assign(i.domElement.style,{display:"block",width:"100%",height:"100%",touchAction:"none",outline:"none",cursor:"grab"});const s=new Gl,r=new Ht(Ra);s.background=new Ht(Ra),s.fog=new To(Ra,320,760);const o=new un(oS,1,2,1400);n.append(i.domElement);const a=new rh(o,i.domElement);a.enableDamping=!0,a.dampingFactor=.1,a.rotateSpeed=.5,a.panSpeed=1.1,a.minDistance=8,a.maxDistance=360,a.minPolarAngle=.35,a.maxPolarAngle=1.5,a.minAzimuthAngle=Jr-md,a.maxAzimuthAngle=Jr+md,a.screenSpacePanning=!1,a.touches={ONE:dn.PAN,TWO:dn.DOLLY_ROTATE},a.addEventListener("change",()=>Z()),a.mouseButtons={LEFT:Xe.PAN,MIDDLE:Xe.DOLLY,RIGHT:Xe.ROTATE};const c=new Vd(16777215,14673658,1.55);s.add(c);const l=new qd(16777215,1.9);l.castShadow=!0,l.shadow.mapSize.set(e.shadowSize,e.shadowSize),l.shadow.bias=-6e-4,l.shadow.normalBias=.05;const u=l.shadow.camera;u.left=-110,u.right=110,u.top=110,u.bottom=-110,u.near=1,u.far=400,l.position.set(70,130,90),s.add(l,l.target);const f=new Ge({color:2179199,roughness:.25,metalness:.2}),d=new Ge({color:16766346,emissive:16754234,emissiveIntensity:1,roughness:.4}),g=new Ge({color:1782118,roughness:.7}),m=new Ge({color:16757575,emissive:16751135,emissiveIntensity:.9,roughness:.4}),x=new $t(new fe(wa+.3,Aa+.3,.12),new Xi({color:16777215,transparent:!0,opacity:.6,depthTest:!1}));x.renderOrder=10,x.visible=!1,s.add(x);let _=null,h=null,v=null,y={h:100},T=[],L=[],C=[],w=null,p=null,M=!0,E=0,R=0,P=0,D=0,G=null,N={w:1,h:1},k=3,B=0;const Z=(K=2)=>{K>k&&(k=K)},rt=new fe(wa,Aa,.08),mt=new fe(wa+.18,Aa+.18,.05),At=(()=>{const K=new ws(.75,14,10).translate(0,1.5,0),W=new Xl(.62,1.3,14).rotateX(Math.PI).translate(0,.65,0);return Qs([K.toNonIndexed(),W.toNonIndexed()])})();function It(){const K=R;s.background.lerpColors(r,cS,K),s.fog.color.copy(s.background),c.intensity=Ne.lerp(1.55,.5,K),c.groundColor.lerpColors(pS,mS,K),l.intensity=Ne.lerp(1.9,.65,K),l.color.lerpColors(hS,fS,K),l.position.lerpVectors(uS,dS,K),i.shadowMap.needsUpdate=!0}function ct(K,W){const wt=Math.min(120,Math.round(K.length*1.6));if(!wt)return;const A=Qs([new lr(.15,.19,.72,6).translate(0,.52,0).toNonIndexed(),new ws(.16,6,5).translate(0,1.04,0).toNonIndexed()]),b=new Hl(A,new Ge({color:16777215,roughness:.9}),wt),z=new Ht,X=[];for(let it=0;it<wt;it++){const[at,lt]=K[Math.floor(W()*K.length)];X.push({bx:at,bz:lt,s:W()*gS,dir:W()<.5?1:-1,speed:.9+W()*.8,phase:W()*6}),b.setColorAt(it,z.setHex(gd[Math.floor(W()*gd.length)]))}b.frustumCulled=!1,G={mesh:b,walkers:X,dummy:new Pe},_.add(b),vt(0)}function vt(K){if(!G)return;const{mesh:W,walkers:wt,dummy:A}=G;wt.forEach((b,z)=>{b.s+=b.dir*b.speed*K;const[X,it]=_S(b.s,Lh);A.position.set(b.bx+X,.12+Math.abs(Math.sin(E*6+b.phase))*.05,b.bz+it),A.updateMatrix(),W.setMatrixAt(z,A.matrix)}),W.instanceMatrix.needsUpdate=!0}function Mt(K,W){const wt=new te,A=v.pos[W];wt.position.set(A.x,0,A.z);const b=K.floors*bo,z=new $t(new fe(Mi+1.6,Ui,Mi+1.6),new Ge({color:14936571,roughness:.8}));z.position.y=Ui/2;const X=new $t(new fe(Mi,b,Mi),new Ge({color:4883186,map:MS(K.floors),roughness:.8,emissive:0}));X.position.y=Ui+b/2;const it=new $t(new fe(Mi-.8,.5,Mi-.8),new Ge({color:3105494,roughness:.8}));it.position.y=Ui+b+.25;const at=new $t(new fe(3.2,.8,.06),new Ge({color:1782118,roughness:.3}));at.position.set(0,.45,(Mi+1.6)/2+.03);for(const Rt of[z,X,it,at])Rt.castShadow=!0,Rt.receiveShadow=!0;wt.add(z,at,X,it),X.userData={building:K},z.userData={building:K},L.push(X);const lt=K.units.filter(Rt=>Rt.has3d),Y=K.units.filter(Rt=>!Rt.has3d),tt=Rt=>Rt.map(I=>fd(I)),_t=new Set(K.units.map(Rt=>`${Rt.floor}:${Rt.slot}`)),Et=[];for(let Rt=1;Rt<=K.floors;Rt++)for(let I=0;I<4;I++)_t.has(`${Rt}:${I}`)||Et.push({floor:Rt,slot:I});const dt=vi(mt,g,tt([...K.units,...Et])),ut=vi(rt,f,tt(Et)),kt=vi(rt,f,tt(Y)),Dt=vi(rt,d,tt(lt));if(kt.userData={building:K,units:Y},Dt.userData={building:K,units:lt},wt.add(dt,ut,kt,Dt),T.push(Dt,kt,X,z),lt.length){const Rt=new $t(At,m);Rt.position.set(0,Ui+b+1.2,0),Rt.userData.baseY=Rt.position.y,Rt.userData.phase=W*1.3,wt.add(Rt),C.push(Rt)}return wt}function J(){const{size:K,block:W}=v,wt=(K-1)/2,A=K*W/2;y={h:A};const b=new $t(new Ts(K*W+600,K*W+600),new Ge({color:14673400,roughness:1}));b.rotation.x=-Math.PI/2,b.receiveShadow=!0,_.add(b);const z=[];for(let Dt=0;Dt<=K;Dt++){const Rt=(Dt-K/2)*W;for(let I=-A;I<A;I+=3.2)z.push({x:I+1.6,y:.02,z:Rt},{x:Rt,y:.02,z:I+1.6,ry:Math.PI/2})}_.add(vi(new Ts(1.3,.16).rotateX(-Math.PI/2),new Ge({color:16251391}),z));const X=xS(23),it=[],at=[],lt=[],Y=[],tt=[];for(let Dt=0;Dt<K;Dt++)for(let Rt=0;Rt<K;Rt++){const I=(Dt-wt)*W,ot=(Rt-wt)*W,Q=v.owner.has(`${Dt},${Rt}`),St=!Q&&X()<.1;(St?at:it).push({x:I,y:.06,z:ot});const ft=Math.hypot(Dt-wt,Rt-wt)/wt;if(St||tt.push([I,ot]),!St&&!Q)if(X()<.18){const nt=12+X()*4;lt.push(_d(nt,2.4+X()*1.2,7+X()*3,I+(X()-.5)*2,ot+(X()-.5)*3,.96))}else for(const[nt,Ct]of[[-5,-5],[5,-5],[-5,5],[5,5]]){if(X()<.2)continue;const qt=4.4+X()*3.4,Re=4.4+X()*3.4,de=2.6+X()**2*11*Math.max(.35,1.25-ft*.7);lt.push(_d(qt,de,Re,I+nt+(X()-.5)*1.4,ot+Ct+(X()-.5)*1.4,.93+X()*.07))}if(!Q&&X()<.75){const nt=ao/2-.5;for(let Ct=-nt+1.5;Ct<=nt-1.5;Ct+=3.4)X()<.25||Y.push({x:I+Ct,z:ot+nt},{x:I+Ct,z:ot-nt},{x:I+nt,z:ot+Ct},{x:I-nt,z:ot+Ct})}if(St)for(let nt=0;nt<14;nt++)Y.push({x:I+(X()-.5)*15,z:ot+(X()-.5)*15})}const _t=new fe(ao,.12,ao),Et=vi(_t,new Ge({color:15856892,roughness:1}),it),dt=vi(_t,new Ge({color:13890016,roughness:1}),at);if(Et.receiveShadow=dt.receiveShadow=!0,_.add(Et,dt),lt.length){const Dt=new $t(Qs(lt),new Ge({map:vS(),vertexColors:!0,roughness:.9}));Dt.castShadow=!0,Dt.receiveShadow=!0,_.add(Dt)}const ut=new Ht,kt=vi(new ql(.48,0),new Ge({color:16777215,roughness:.9}),Y.map(Dt=>({x:Dt.x,y:.6,z:Dt.z,s:.8+X()*.6})));Y.forEach((Dt,Rt)=>kt.setColorAt(Rt,ut.setHSL(.38+X()*.04,.6,.5+X()*.1))),kt.instanceColor&&(kt.instanceColor.needsUpdate=!0),_.add(kt),ct(tt,X)}function xt(){_&&(s.remove(_),bS(_),_=null,T=[],L=[],C=[],G=null,w=null,x.visible=!1)}const ht=()=>{const K=o.position.clone().sub(a.target),W=new _o().setFromVector3(K);return{target:a.target.clone(),distance:W.radius,azimuth:W.theta,polar:W.phi}},Bt=K=>{a.target.copy(K.target),o.position.copy(K.target).add(new U().setFromSphericalCoords(K.distance,K.polar,K.azimuth)),o.lookAt(K.target)};let zt=null;function Vt(K,W=1){zt?.resolve(!1);const wt=ht();return W>0?new Promise(A=>{zt={from:wt,to:K,duration:W,resolve:A,t:0}}):(Bt(K),zt=null,Promise.resolve(!0))}a.addEventListener("start",()=>{zt&&(zt.resolve(!1),zt=null)});const be=()=>{const K=N.w/N.h;return{target:new U(0,0,0),distance:Math.min(340,Math.max(120,190*Math.max(1,1.3/K))),azimuth:Jr,polar:.95}},Jt=K=>h?.buildings.findIndex(W=>W.id===K)??-1;function ue(){N={w:n.clientWidth||window.innerWidth,h:n.clientHeight||window.innerHeight},i.setSize(N.w,N.h,!1),o.aspect=N.w/N.h,o.updateProjectionMatrix(),Z()}new ResizeObserver(ue).observe(n),ue();const ge=new Kl,Kt=new Gt;function Le(K){const W=i.domElement.getBoundingClientRect();Kt.set((K.clientX-W.left)/W.width*2-1,-((K.clientY-W.top)/W.height)*2+1),ge.setFromCamera(Kt,o);const wt=ge.intersectObjects(T,!1)[0];if(!wt)return null;const A=wt.object.userData;return A.units?{type:"unit",unit:A.units[wt.instanceId],building:A.building,object:wt.object,instanceId:wt.instanceId}:{type:"building",building:A.building}}function Se(K){if(!(w&&K&&w.type===K.type&&w.building===K.building&&w.unit===K.unit)){w=K;for(const wt of L)wt.material.emissive.setHex(K&&K.building===wt.userData.building?1451597:0);if(K?.type==="unit"){const wt=new me;K.object.getMatrixAt(K.instanceId,wt),wt.premultiply(K.object.parent.matrixWorld),wt.decompose(x.position,x.quaternion,x.scale),x.visible=!0}else x.visible=!1;i.domElement.style.cursor=K?"pointer":"grab",Z()}}let Be=null;i.domElement.addEventListener("pointerdown",K=>{Be={x:K.clientX,y:K.clientY}});let O=null;i.domElement.addEventListener("pointermove",K=>{K.buttons||K.pointerType==="touch"||(O||requestAnimationFrame(()=>{const W=O;O=null;const wt=Le(W);Se(wt),t.onHover?.(wt,W.clientX,W.clientY)}),O=K)}),i.domElement.addEventListener("pointerleave",()=>{Se(null),t.onHover?.(null,0,0)}),i.domElement.addEventListener("pointerup",K=>{!Be||Math.hypot(K.clientX-Be.x,K.clientY-Be.y)>5||(Be=null,t.onClick?.(Le(K),K.clientX,K.clientY))});const De=new Yd;function ee(){const K=Math.min(.1,De.getDelta());if(E+=K,R!==P&&(R=R<P?Math.min(P,R+K/1.6):Math.max(P,R-K/1.6),It(),Z()),zt){const W=zt;W.t=Math.min(1,W.t+K/W.duration);const wt=ah(W.t);Bt({target:W.from.target.clone().lerp(W.to.target,wt),distance:Math.exp(Ne.lerp(Math.log(W.from.distance),Math.log(W.to.distance),wt)),azimuth:Ne.lerp(W.from.azimuth,W.to.azimuth,wt),polar:Ne.lerp(W.from.polar,W.to.polar,wt)}),W.t>=1&&(zt=null,W.resolve(!0))}else{a.update()&&Z();const W=a.target;W.x=Ne.clamp(W.x,-y.h,y.h),W.z=Ne.clamp(W.z,-y.h,y.h),W.y=Ne.clamp(W.y,0,60)}if(zt&&Z(),B+=K,D+=K,B>=1/24){B=0,d.emissiveIntensity=(1.05+.55*Math.sin(E*2.4))*(1+R*1.4),vt(D),D=0;for(const W of C)W.position.y=W.userData.baseY+Math.sin(E*2+W.userData.phase)*.35,W.rotation.y=E*1.2+W.userData.phase;Z(1)}k>0&&(k--,i.render(s,o))}return{domElement:i.domElement,setData(K){xt(),h=K,_=new te,s.add(_),v=sS(K.buildings.length),J(),K.buildings.forEach((W,wt)=>_.add(Mt(W,wt))),i.shadowMap.needsUpdate=!0,Z(3),p=null,Bt(be())},home:(K=1)=>(p=null,Vt(be(),K)),focusBuilding(K,W=1){const wt=Jt(K);if(wt<0)return this.home(W);p=K;const b=h.buildings[wt].floors*bo;return Vt({target:new U(v.pos[wt].x,Ui+b*.42,v.pos[wt].z+1),distance:Math.max(36,b*2.3),azimuth:Jr,polar:1.2},W)},flyToUnit(K,W,wt=.9){const A=fd(K,v.pos[Jt(W.id)]);return Vt({target:new U(A.x,A.y,A.z),distance:7,azimuth:K.slot<2?.05:Math.PI/2-.05,polar:1.45},wt)},setNight(K){P=K?1:0,Z(3)},get night(){return P===1},get focusedId(){return p},get paused(){return M},pause(){M=!0,i.setAnimationLoop(null)},resume(){M=!1,De.getDelta(),Z(3),i.setAnimationLoop(ee)}}}const yS=360;function ES(n,{onEnterUnit:t}){n.innerHTML=`
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
    <div class="campus-fade"></div>`;const e=p=>n.querySelector(p),i=e("#campus-tip"),s=e("#campus-panel"),r=e(".campus-fade");let o=null,a=!1,c=0;const l=p=>`Tầng ${p.floor} · ${p.bedrooms} PN · ${p.areaM2} m²`;function u(p,M,E){i.innerHTML=p,i.hidden=!1;const R=14,P=i.offsetWidth;i.style.transform=`translate(${Math.min(M+R,window.innerWidth-P-8)}px, ${Math.max(8,E-i.offsetHeight-R)}px)`}const f=()=>{i.hidden=!0};function d(p){u(Xt(p),window.innerWidth/2-100,window.innerHeight/2),clearTimeout(c),c=setTimeout(()=>{c=0,f()},1800)}const g=SS(e(".campus-stage"),{onHover(p,M,E){if(!(c&&p==null)){if(!p)return f();if(clearTimeout(c),c=0,p.type==="unit"){const R=p.unit;u(`<b>${Xt(R.label)}</b><span>${Xt(l(R))}</span><em class="${R.has3d?"on":""}">${R.has3d?"Bấm để xem 3D":"Chưa có mô hình 3D"}</em>`,M,E)}else f()}},onClick(p){if(!a){if(!p)return L();if(p.type==="building")return C(p.building);if(p.unit.has3d)return w(p.unit,p.building);g.focusedId!==p.building.id&&C(p.building),d(`${p.unit.label}: chưa có mô hình 3D`)}}}),m=e("#campus-night");function x(){const p=g.night;m.innerHTML=re(p?"moon":"sun",18);const M=p?"Chuyển sang ban ngày":"Chuyển sang ban đêm";m.setAttribute("aria-label",M),m.setAttribute("aria-pressed",String(p)),m.title=M}m.addEventListener("click",()=>{g.setNight(!g.night),x()}),x();const _=e("#campus-fs"),h=!!(document.fullscreenEnabled||document.webkitFullscreenEnabled);_.hidden=Ps()||!(h||Mo()&&!Ps());let v=!1;function y(){_.innerHTML=re(v?"shrink":"expand",18);const p=v?"Thoát toàn màn hình":"Toàn màn hình";_.setAttribute("aria-label",p),_.title=p}_.addEventListener("click",()=>{if(h){const p=document.documentElement,M=p.requestFullscreen??p.webkitRequestFullscreen,E=document.exitFullscreen??document.webkitExitFullscreen;document.fullscreenElement??document.webkitFullscreenElement?E.call(document):M.call(p)}else xn("FLOORPLAN_EXPAND_TOGGLE")});const T=()=>{v=!!(document.fullscreenElement??document.webkitFullscreenElement),y()};document.addEventListener("fullscreenchange",T),document.addEventListener("webkitfullscreenchange",T),Nt.on("host:expanded",({expanded:p})=>{v=p,y()}),y();function L(){s.hidden=!0,g.focusedId&&g.home()}function C(p){f();const M=p.units.filter(E=>E.has3d).sort((E,R)=>R.floor-E.floor||E.slot-R.slot);s.hidden=!1,s.innerHTML=`
      <header><div><b>${Xt(p.name)}</b><small>${p.floors} tầng · ${M.length}/${p.units.length} căn có 3D</small></div>
        <button class="iconbtn" type="button" data-close aria-label="Đóng">${re("close",16)}</button></header>
      <ul>${M.length?M.map(E=>`<li><button type="button" data-id="${Xt(E.apartmentId)}">
            <span class="campus-dot campus-dot--on"></span>
            <span class="campus-unit"><b>${Xt(E.label)}</b><small>${Xt(l(E))}</small></span>
            <span class="tag">3D</span></button></li>`).join(""):'<li class="campus-empty">Tòa này chưa có căn nào có mô hình 3D.</li>'}</ul>`,s.querySelector("[data-close]").onclick=L,s.querySelectorAll("[data-id]").forEach(E=>{E.onclick=()=>w(M.find(R=>R.apartmentId===E.dataset.id),p)}),g.focusBuilding(p.id)}async function w(p,M){a=!0,f(),await g.flyToUnit(p,M),r.style.transition="",r.classList.add("on"),await new Promise(E=>setTimeout(E,yS)),t(p,M),a=!1}return{setData(p){o=p,e("#campus-title").textContent=p.name||"Khu căn hộ";const M=p.buildings.reduce((E,R)=>E+R.units.filter(P=>P.has3d).length,0);e("#campus-sub").textContent=`${M} căn có 3D`,s.hidden=!0,g.setData(p)},get hasData(){return!!o},pause:()=>g.pause(),resume(){g.resume(),g.focusedId&&g.focusBuilding(g.focusedId,.9),r.style.transition="none",r.classList.add("on"),r.offsetWidth,r.style.transition="",r.classList.remove("on")}}}const Ti=new URLSearchParams(location.search),je=Fx(document.getElementById("viewport"));dh({templateId:"",bedrooms:2,size:{w:10,d:7},rooms:[],walls:[],placements:[]});ph();const Nn=Vv(je),yi=$v({camera:je.camera,dom:je.renderer.domElement,colliders:Nn.colliders}),Os=Jv(je,Nn,yi),hr=eM(je,Nn),En=Ub(document.getElementById("ui"),{app:je,walker:yi});let ar=null,si=[],El="",ae=Ae(null);const xd=n=>JSON.stringify(Ae(n)),cc=()=>si.find(n=>n.id===q.state.designId)??si[0];function Ai(){const n=cc(),t=Zb(ar,{...n,layout:ae},{editable:q.state.editing,floorId:q.state.floorId??void 0});Ox(Sh(n)),dh(t),ph(),Nn.rebuild(),q.state.floorId!==st.floorId&&q.set({floorId:st.floorId}),Nh.sync(),Nt.emit("plan:loaded"),je.invalidateShadows(),En.hud.draw()}function Ih(n,{keepView:t=!1}={}){const e=si.find(s=>s.id===n)??si[0];ae=Ae(e.layout);const i=q.state.mode==="walk";return q.set({designs:si,designId:e.id,selection:null,hover:null,roomId:null,menu:null,editPanel:null}),Ai(),t||q.set({hour:e.defaultHour}),Nn.setHour(q.state.hour),Os.start({walk:i}),e}function Tl(n,t,e){return JSON.stringify([{...n,designs:void 0},t.map(i=>i.id===e?{...i,layout:void 0}:i)])}function uc(n){const t=n.designs.length?n.designs:[xM(n.apartmentId)],e=!ar,i=e?null:q.state.designId;if(q.set({editable:n.editable,listingArea:n.areaM2}),!n.editable&&q.state.editing&&q.set({editing:!1}),!e&&Tl(n,t,i)===El){const a=t.find(c=>c.id===i);a&&xd(a.layout)!==xd(ae)&&(si=t,ae=Ae(a.layout),q.set({designs:si}),Ai());return}ar=n,si=t;const s=!e&&q.state.designs.some(o=>o.id===q.state.designId),r=Ih(n.designId??(s?q.state.designId:null),{keepView:!e});El=Tl(n,t,r.id),e&&TS()}function TS(){const n=Number(Ti.get("hour"));n>=6&&n<=18&&q.set({hour:n}),Nn.setHour(q.state.hour);const t=Ti.get("room"),e=Ti.get("mode")==="walk";(e||t)&&Os.start({walk:e,room:t});const i=Ti.get("select");i&&pe.get("item",i)&&q.select({type:"item",id:i})}Nt.on("design:select",({id:n})=>{const t=Ih(n,{keepView:!1});El=Tl(ar,si,t.id),xn("FLOORPLAN_DESIGN_SELECTED",{designId:t.id})});const an=()=>({custom:st.custom,scale:st.scale,floorId:st.floorId,walls:st.walls,rooms:st.rooms,placements:st.placements});function In(n,{select:t,rejected:e="Không thực hiện được thao tác này ở vị trí đó."}={}){return n===ae||n==null?(En.hud.notify(e),hr.refresh(),Ai(),!1):(vn(n,t===void 0?{}:{select:t}),!0)}function wS(n,t,e){if(!q.state.editable)return;const i=SM(ae,n,t,e,st.scale),s=st.placements.find(o=>o.id===n),r=pe.get("item",n);if(!s||!r)return vn(i);ae=i;for(const o of[s,r])Object.assign(o,{x:t,z:e,moved:!0});hr.refresh(),je.invalidateShadows(),q.set({selection:{type:"item",id:n}}),xn("FLOORPLAN_LAYOUT_CHANGED",{designId:cc().id,layout:ae})}const Nh=sb(je,Nn,hr,{isCustom:()=>st.custom,onMove:(n,t,e)=>wS(n,t,e),onReject:n=>En.hud.notify(n),onCancel:()=>Ai(),onOpeningMove:(n,t)=>In(BM(ae,an(),n,t),{select:{type:"opening",id:n},rejected:"Cửa không đặt được ở đó (tường quá ngắn)."}),onOpeningAdd:({dir:n,at:t,c:e,type:i})=>{const s=VM(ae,an(),{dir:n,at:t,c:e,type:i});if(!s)return En.hud.notify("Không đặt được ở đó: tường quá ngắn hoặc đã có cửa.");vn(s.layout,{select:{type:"opening",id:s.id}}),q.set({tool:null})},onRoomDraw:n=>{const t=qM(ae,an(),n);if(!t)return En.hud.notify("Không vẽ được phòng ở đó: quá nhỏ (tối thiểu 1,2 m), chồng lên phòng khác hoặc đã đủ số phòng."),Ai();vn(t.layout,{select:{type:"room",id:t.id}}),q.set({tool:null})},onRoomResize:(n,t)=>In(jM(ae,an(),n,t),{select:{type:"room",id:n},rejected:"Không đổi được kích thước: phòng sẽ quá nhỏ hoặc chồng lên phòng khác."}),onRoomMove:(n,t,e)=>In(KM(ae,an(),n,t,e),{select:{type:"room",id:n},rejected:"Không dời được phòng: sẽ chồng lên phòng khác."})});function vn(n,{select:t}={}){if(!q.state.editable)return;const e=t!==void 0?t:q.state.selection,i={...st.size};ae=n,Ai(),(Math.abs(st.size.w-i.w)>.4||Math.abs(st.size.d-i.d)>.4)&&Nt.emit("camera:cmd",{cmd:"home"}),e&&pe.get(e.type,e.id)?q.set({selection:e}):q.set({selection:null}),hr.refresh(),xn("FLOORPLAN_LAYOUT_CHANGED",{designId:cc().id,layout:ae})}Nt.on("edit:rotate",({id:n})=>{const t=st.placements.find(e=>e.id===n);t&&vn(yM(ae,n,t.rot??0))});Nt.on("edit:toggle",({id:n})=>vn(EM(ae,n)));Nt.on("edit:reset",({id:n})=>vn(wM(ae,n)));Nt.on("edit:remove",({id:n})=>{bM(ae,n)&&vn(TM(ae,n),{select:null})});function AS(n){const t=n??{x0:0,x1:st.size.w,z0:0,z1:st.size.d},e=(t.x0+t.x1)/2,i=(t.z0+t.z1)/2,s=pe.list("item").filter(o=>!o.hidden);let r={x:e,z:i,score:-1/0};for(let o=t.x0+.7;o<=t.x1-.7;o+=.4)for(let a=t.z0+.7;a<=t.z1-.7;a+=.4){let c=1/0;for(const u of s){const f=(u.dims?.w??.6)/2+.45,d=(u.dims?.d??.6)/2+.45;c=Math.min(c,Math.max(Math.abs(o-u.x)-f,Math.abs(a-u.z)-d))}const l=Math.min(c,1)*3-Math.hypot(o-e,a-i)*.15;l>r.score&&(r={x:o,z:a,score:l})}return{x:Math.round(r.x*20)/20,z:Math.round(r.z*20)/20}}Nt.on("edit:add",({kind:n})=>{const t=pe.room(q.state.roomId)??st.rooms[0],{x:e,z:i}=AS(t),s=st.placements.map(a=>a.id),r=AM(ae,n,e,i,st.scale,s);if(!r)return;let o=r.layout;st.custom&&(o=Ae({...o,extras:o.extras.map(a=>a.id===r.id?{...a,floor:st.floorId}:a)})),vn(o,{select:{type:"item",id:r.id}}),q.set({editPanel:null})});const fr=()=>q.state.selection;Nt.on("plan:convert",()=>{st.custom||In(WM(ae,{rooms:st.rooms,walls:st.walls,placements:st.placements}),{select:null,rejected:"Không chuyển được sang mặt bằng tuỳ chỉnh."})});Nt.on("plan:revert",()=>{vn(XM(),{select:null}),q.set({floorId:null})});Nt.on("plan:room-floor",({id:n,floor:t})=>In(UM(ae,an(),n,t),{select:fr()}));Nt.on("plan:room-name",({id:n,name:t})=>In(OM(ae,an(),n,t),{select:fr(),rejected:"Tên phòng không được để trống."}));Nt.on("plan:room-delete",({id:n})=>In(ZM(ae,an(),n),{select:null,rejected:"Mỗi tầng phải còn ít nhất một phòng."}));Nt.on("plan:opening-type",({id:n,type:t})=>In(GM(ae,an(),n,t),{select:fr()}));Nt.on("plan:opening-width",({id:n,w:t})=>In(kM(ae,an(),n,t),{select:fr(),rejected:"Cửa rộng quá so với đoạn tường này."}));Nt.on("plan:opening-delete",({id:n})=>In(HM(ae,an(),n),{select:null}));Nt.on("plan:floor-add",({name:n})=>{const t=JM(ae,an(),n);if(!t)return En.hud.notify("Đã đạt số tầng tối đa (5 tầng).");q.set({floorId:t.id}),vn(t.layout,{select:null})});Nt.on("plan:floor-select",({id:n})=>{n!==st.floorId&&(q.set({floorId:n,selection:null,roomId:null}),Ai(),Os.start({walk:!1}))});Nt.on("plan:floor-rename",({id:n,name:t})=>In(QM(ae,an(),n,t),{select:fr()}));Nt.on("plan:floor-remove",({id:n})=>{const t=tb(ae,an(),n);if(t===ae)return En.hud.notify("Phải giữ lại ít nhất một tầng.");q.set({floorId:null}),vn(t,{select:null})});Nt.on("plan:fit",({target:n})=>{const t=eb(ae,an(),Number(n));if(t.layout===ae)return En.hud.notify("Diện tích đã khớp tin đăng.");vn(t.layout,{select:null}),En.hud.notify(`Đã co dãn mặt bằng: ${t.before.toFixed(1)} → ${t.after.toFixed(1)} m².`)});Nt.on("tool:set",({tool:n})=>q.set({tool:q.state.tool===n?null:n}));q.subscribe((n,t,e)=>{e.includes("mode")&&n.mode==="walk"&&n.editing&&q.set({editing:!1}),e.includes("editing")&&(document.body.classList.toggle("editing",n.editing),Nh.setEditing(n.editing),Nn.setEditing(n.editing),q.set({editPanel:null,selection:null,tool:null}),ar&&Ai())});q.subscribe((n,t,e)=>{e.includes("hour")&&Nn.setHour(n.hour),(e.includes("mode")||e.includes("roomId"))&&En.hud.draw(),e.includes("selection")&&n.selection?.type==="room"&&xn("FLOORPLAN_ROOM_SELECTED",{roomId:n.selection.id})});document.addEventListener("click",n=>{const t=n.target.closest?.(".room-label");t&&(Nt.emit("room:go",{id:t.dataset.room}),q.select({type:"room",id:t.dataset.room}))});let Qr=0;je.onFrame(n=>{if(Nn.update(n),hr.update(n),Os.update(n),q.state.playing&&(Qr+=n,Qr>.05)){let t=q.state.hour+Qr*.75;t>18&&(t=6),Qr=0,q.set({hour:Math.round(t*100)/100})}if(q.state.mode==="walk"&&yi.update(n)){je.invalidate(),En.hud.draw();const t=pe.list("room").find(e=>yi.state.x>=e.x0&&yi.state.x<=e.x1&&yi.state.z>=e.z0&&yi.state.z<=e.z1);t&&t.id!==q.state.roomId&&q.set({roomId:t.id})}});let wl="unit",Hi=null;const Ki=document.createElement("button");Ki.type="button";Ki.className="iconbtn back-campus";Ki.hidden=!0;Ki.innerHTML=`${re("home",16)}<span>Sa bàn</span>`;En.els["ui-topbar"].prepend(Ki);Ki.addEventListener("click",()=>{xn("FLOORPLAN_CAMPUS_BACK"),pr("campus")});function pr(n){n==="campus"&&!Hi?.hasData||(wl=n,document.body.dataset.view=n,n==="campus"?(je.pause(),Hi.resume()):(Hi?.pause(),je.resume()))}function dc(n){const t=nS(n);if(!t)return xn("FLOORPLAN_ERROR",{code:"INVALID_CAMPUS"});Hi??=ES(document.getElementById("campus"),{onEnterUnit:RS}),Hi.setData(t),Ki.hidden=!1,pr("campus")}function RS(n){xn("FLOORPLAN_UNIT_SELECTED",{apartmentId:n.apartmentId});const t=lc(iS(n));if(!t)return xn("FLOORPLAN_ERROR",{code:"INVALID_UNIT"});uc(t),Os.start({walk:!1}),pr("unit")}ub({init:n=>{uc(n),pr("unit")},campus:dc,pause:()=>wl==="campus"?Hi?.pause():je.pause(),resume:()=>wl==="campus"?Hi?.resume():je.resume(),reset:()=>Nt.emit("camera:cmd",{cmd:"home"}),expanded:n=>Nt.emit("host:expanded",{expanded:n})});je.start();try{xn("FLOORPLAN_READY")}catch{xn("FLOORPLAN_ERROR",{code:"WEBGL_INIT_FAILED"})}const CS=Ti.get("view")==="campus"||[...Ti.keys()].length===0;if(!Mo()&&CS)dc(rS());else if(!Mo()){const n=xo.map(e=>tc({id:e,name:Cs[e].label,theme:e})),t=db(Ti,n);t&&uc({...t,editable:Ti.get("edit")==="1"})}window.__apt={setView:pr,applyCampus:dc,app:je,world:Nn,walker:yi,director:Os,store:q,plan:st,bus:Nt};
