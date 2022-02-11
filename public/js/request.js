$(document).ready(() =>  {
    $('#getotp').on('click', (e) => {
        e.preventDefault();
        const aadharId = $('#aadhar').val();
        const voterId = $('#voterid').val();
        $.post('http://localhost:8501/user/otp',{aadharId, voterId}, (data) => {
            if(data.success) {
                console.log(data.data);
                alert(data.data);
            }
            else{
                console.log("Invalid OTP");
            }
        })
    });
    $('#submitotp').on('click', (e) => {
        e.preventDefault();
        const aadharId = $('#aadhar').val();
        const voterId = $('#voterid').val();
        const otp = $('#otp').val()
        $.post('http://localhost:8501/user/login',{aadharId, voterId, otp}, (data) => {
            if(data.success) {
                window.location.href = "http://localhost:8501/votingpage.html";
            }
            else{
                alert("Invlaid OTP")
            }
        })
        
    })

})

