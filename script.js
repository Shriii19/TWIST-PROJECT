        // Initialize player functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const leftSection = document.getElementById('leftSection');
            
            mobileMenuBtn.addEventListener('click', function() {
                leftSection.classList.toggle('active');
            });
            
            // Song list selection
            const songItems = document.querySelectorAll('.songlists li');
            songItems.forEach(item => {
                item.addEventListener('click', function() {
                    // Remove active class from all items
                    songItems.forEach(i => i.classList.remove('active'));
                    
                    // Add active class to clicked item
                    this.classList.add('active');
                    
                    // Update now playing section
                    const songName = this.textContent;
                    document.querySelector('.now-playing-title').textContent = songName;
                    document.querySelector('.song-name').textContent = songName;
                    
                    // Update play/pause button
                    const playPauseBtn = document.querySelector('.play-pause');
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                });
            });
            
            // Play/Pause functionality
            const playPauseBtn = document.querySelector('.play-pause');
            playPauseBtn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-play')) {
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                } else {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                }
            });
            
            // Card play buttons
            const cardPlayBtns = document.querySelectorAll('.play-btn');
            cardPlayBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const card = this.closest('.card');
                    const songTitle = card.querySelector('.card-title').textContent;
                    
                    // Update now playing section
                    document.querySelector('.now-playing-title').textContent = songTitle;
                    document.querySelector('.song-name').textContent = songTitle;
                    
                    // Update play/pause button
                    const playPauseBtn = document.querySelector('.play-pause');
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    
                    // Set active song
                    songItems.forEach(item => {
                        if (item.textContent.includes(songTitle)) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                });
            });
            
            // Upload button functionality
            const uploadBtn = document.getElementById('uploadBtn');
            const songUploader = document.getElementById('songUploader');
            
            uploadBtn.addEventListener('click', function() {
                songUploader.click();
            });
            
            songUploader.addEventListener('change', function(e) {
                if (this.files.length > 0) {
                    // In a real app, you would handle the file upload here
                    alert(`Added ${this.files.length} new song(s) to your library!`);
                    
                    // Reset the input
                    this.value = '';
                }
            });
            
            // Progress bar functionality
            const progressBar = document.querySelector('.progress-bar');
            const progress = document.querySelector('.progress');
            
            progressBar.addEventListener('click', function(e) {
                const pos = (e.pageX - this.getBoundingClientRect().left) / this.offsetWidth;
                progress.style.width = `${pos * 100}%`;
            });
            
            // Volume bar functionality
            const volumeBar = document.querySelector('.volume-bar');
            const volumeLevel = document.querySelector('.volume-level');
            
            volumeBar.addEventListener('click', function(e) {
                const pos = (e.pageX - this.getBoundingClientRect().left) / this.offsetWidth;
                volumeLevel.style.width = `${pos * 100}%`;
            });
            
            // Simulate song progress
            setInterval(() => {
                const progress = document.querySelector('.progress');
                const width = parseFloat(progress.style.width || '30');
                const newWidth = width + 0.15;
                
                if (newWidth < 100) {
                    progress.style.width = `${newWidth}%`;
                } else {
                    progress.style.width = '0%';
                }
            }, 1000);
        });
