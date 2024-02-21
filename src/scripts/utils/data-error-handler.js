const DataErrorHandler = (container) => {
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = 'Gagal Memuat Data';
  if (container) {
    container.appendChild(errorMessage);
  }
};

export default DataErrorHandler;
