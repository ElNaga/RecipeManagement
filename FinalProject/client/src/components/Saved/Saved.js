import './saved.css'
import PortalReactDOM from 'react-dom'
import { useEffect, useState } from 'react';

export const Saved = () => {

  const [showComponent, setShowComponent] = useState(true);



  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponent(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);


    return PortalReactDOM.createPortal (
    <div className="saved--Overwrapper">
        <div className='saved--wrapper'>
            <h3 className='saved--Note'>Changes Saved ✔</h3>
            </div>

    </div>,
    document.getElementById("portal")
  )
}
