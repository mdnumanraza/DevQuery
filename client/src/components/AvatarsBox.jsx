import React from 'react'
import { avatars} from '../assets/avatars'

const AvatarsBox = ({setAvatar}) => {
    const {b1,b2,b3,b4,b5,g1,g2,g3,g4,g5} = avatars;
    const styles = {
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        gap:'2px',
        width:'150px'
    }
    
  return (
    <div style={styles} >
        <img src={b1} alt="boy1" onClick={()=>setAvatar(b1)} width={'40px'} style={{cursor:'pointer'}} />
        <img src={b2} alt="boy2" onClick={()=>setAvatar(b2)} width={'40px'} style={{cursor:'pointer'}} />
        <img src={b3} alt="boy3" onClick={()=>setAvatar(b3)} width={'40px'} style={{cursor:'pointer'}} />
        <img src={b4} alt="boy4" onClick={()=>setAvatar(b4)} width={'40px'} style={{cursor:'pointer'}} />
        <img src={b5} alt="boy5" onClick={()=>setAvatar(b5)} width={'40px'} style={{cursor:'pointer'}} />
        <img src={g1} alt="girl1" onClick={()=>setAvatar(g1)} width={'40px'} style={{cursor:'pointer'}} />
        <img src={g2} alt="girl2" onClick={()=>setAvatar(g2)} width={'40px'} style={{cursor:'pointer'}} />
        <img src={g3} alt="girl3" onClick={()=>setAvatar(g3)} width={'40px'} style={{cursor:'pointer'}} />
        <img src={g4} alt="girl4" onClick={()=>setAvatar(g4)} width={'40px'} style={{cursor:'pointer'}} />
        <img src={g5} alt="girl5" onClick={()=>setAvatar(g5)} width={'40px'} style={{cursor:'pointer'}} />
    </div>
  )
}

export default AvatarsBox
