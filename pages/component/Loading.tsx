import {Circle} from "better-react-spinkit";
 
function Loading() {
    return (
        <div>
            <div>
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
                    style={{marginButtom: "10px"}}
                    height={200}
                />
            </div> 
            <Circle color="red" size={60}></Circle>       
        </div>
    );
  }
  
  export default Loading;
  