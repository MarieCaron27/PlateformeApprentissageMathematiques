const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', function(event) 
{
    event.preventDefault();

    sessionStorage.clear();
    
    window.location.href = 'index.php';
});