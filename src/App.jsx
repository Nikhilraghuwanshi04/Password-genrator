import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllow,setNumAllow]=useState(false);
  const [charAllow,setCharAllow]=useState(false);
  const [password,setPassword]=useState("");
  const passwordRef=useRef(null);

  const PasswordGenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllow) str+="0123456789";
    if(charAllow) str+="!@#$%^&*()_+{}|?/.,";
    for(let i=1;i<=length;i++){
     let char=Math.floor(Math.random()*str.length);
     pass+=str.charAt(char);
    }
    setPassword(pass);
  },[length,numAllow,charAllow,setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    const el = passwordRef.current;
    if (el) {
      el.select();
      document.execCommand("copy");
    }
  }, [passwordRef]);

  useEffect(()=>{
    PasswordGenerator();
  },[length,numAllow,charAllow,PasswordGenerator])

  return (
    <>
   <h1 className='flex-auto text-lg font-semibold text-slate-900 font-medium items-center max-w-md mx-auto px-4 my-10 text-5xl'>password genrator</h1>
     <div className=''>
      <div className=''><input type="text" value={password} className='outline-none w-full py-1 px-3 w-80 bg-white shadow rounded' placeholder='password' readOnly ref={passwordRef} />
      <button onClick={copyPasswordToClipboard}
      className=''>Copy</button>
      </div>
      <div className='flex-text-sm gap-x-2'>
        <div className='flex items-center gap-x-1 my-2'>
          <input type="range" min={10} max={100}  value={length} className='cursor-pointer'
          onChange={(e)=>{
            setLength(e.target.value)
          }}/>
          <label>Length :{length}</label>
        </div>
        <div className=''>
          <input type="checkbox" defaultChecked={numAllow} id="numberInput" className='cursor-pointer'
          onChange={()=>{
            setNumAllow((prev)=>!prev);
          }}/>
          <label>number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllow} id="numberInput" className='cursor-pointer'
          onChange={()=>{
            setCharAllow((prev)=>!prev);
          }}/>
          <label>Charcter</label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
