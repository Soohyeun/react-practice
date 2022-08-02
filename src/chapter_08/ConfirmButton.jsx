import React, { useState } from "react";

  // Class component
// class ConfirmButton extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isConfirmed: false,
//     };

     //way1. function
    // this.handleConfirm = this.handleConfirm.bind(this);
//   }
  
     //way1. function
//   handleConfirm() {
//     this.setState((prevState) => ({
//       isConfirmed: !prevState.isConfirmed,
//     }));
//   }
    //way2. arrow function
// handleConfirm = () => {
//     this.setState((prevState) => ({
//         isConfirmed: !prevState.isConfirmed
//     }));
// }
//   render() {
//     return (
//       <button onClick={this.handleConfirm} disabled={this.state.isConfirmed}>
//         {this.state.isConfirmed ? "Confirmed" : "Confirm?"}
//       </button>
//     );
//   }
// }


// Function Component
function ConfirmButton(props) {
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleConfirm = () => {
        setIsConfirmed((prevIsConfirmed) => !prevIsConfirmed);
    };

    return (
        <button onClick={handleConfirm} disabled={isConfirmed}>
            {isConfirmed ? "Confirmed": "Confirm?"}
        </button>
    )
}

export default ConfirmButton;
