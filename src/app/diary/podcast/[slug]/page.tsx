
'use client';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPodcastBySlug, type Podcast } from '@/lib/podcasts';
import { notFound, useParams } from 'next/navigation';
import {
  Activity, BadgeCheck, Cast, Headphones, Heart, ListMusic, MoreHorizontal,
  Music, Pause, Play, Repeat1, Settings, Share2, Shuffle, SkipBack, SkipForward,
  Volume2, X as XIcon, LoaderCircle
} from 'lucide-react';
import placeholderData from '@/lib/placeholder-images.json';
import Image from 'next/image';

const PodcastPlayerPage = () => {
    const params = useParams();
    const slug = params.slug as string;
    const [podcast, setPodcast] = useState<Podcast | null | undefined>(undefined);

    useEffect(() => {
        const fetchPodcast = async () => {
            const fetchedPodcast = await getPodcastBySlug(slug);
            setPodcast(fetchedPodcast);
        };
        if (slug) {
            fetchPodcast();
        }
    }, [slug]);

    useEffect(() => {
        if (!podcast) return;

        let currentTrackIndex = podcast.id -1;

        const audio = document.getElementById('audio') as HTMLAudioElement;
        const btnPlay = document.getElementById('btnPlay');
        const btnPrev = document.getElementById('btnPrev');
        const btnNext = document.getElementById('btnNext');
        const btnLike = document.getElementById('btnLike');
        const btnShuffle = document.getElementById('btnShuffle');
        const btnRepeat = document.getElementById('btnRepeat');
        const btnMute = document.getElementById('btnMute');
        const btnQueue = document.getElementById('btnQueue');
        const currentTimeEl = document.getElementById('currentTime');
        const totalDurationEl = document.getElementById('totalDuration');
        const miniTimeEl = document.getElementById('miniTime');
        const progressBar = document.getElementById('progressBar');
        const progressThumb = document.getElementById('progressThumb');
        const seekArea = document.getElementById('seekArea');
        const playerCard = document.getElementById('playerCard');
        const waveContainer = document.getElementById('waveContainer');
        const trackSelector = document.getElementById('trackSelector');
        const closeTracks = document.getElementById('closeTracks');
        const albumArtContainer = document.getElementById('albumArtContainer');
        const trackTitle = document.getElementById('trackTitle');
        const trackArtist = document.getElementById('trackArtist');
        const trackAlbum = document.getElementById('trackAlbum');
        const trackYear = document.getElementById('trackYear');
        const trackTags = document.getElementById('trackTags');
        const trackPlays = document.getElementById('trackPlays');
        const trackReleaseDate = document.getElementById('trackReleaseDate');
        const albumArt = document.getElementById('albumArt') as HTMLImageElement;
        const artistAvatar = document.getElementById('artistAvatar');

        const formatTime = (t: number) => {
        if (!isFinite(t)) return '0:00';
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
        };

        function createWaveRipple(clientX: number) {
        const ripple = document.getElementById('waveRipple');
        if (!ripple || !waveContainer) return;
        const rect = waveContainer.getBoundingClientRect();
        const x = clientX - rect.left;
        
        ripple.style.background = `radial-gradient(circle at ${x}px 50%, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.2) 30%, transparent 70%)`;
        ripple.style.opacity = '1';
        
        setTimeout(() => {
            ripple.style.opacity = '0';
        }, 300);
        }

        function createButtonRipple(button: HTMLElement, e: MouseEvent) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.className = 'absolute rounded-full bg-white/20 pointer-events-none animate-ping';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.transform = 'translate(-50%, -50%)';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        }

        function loadTrack(track: typeof podcast) {
        if (!playerCard || !trackTitle || !trackArtist || !trackAlbum || !trackYear || !trackPlays || !trackReleaseDate || !albumArt || !artistAvatar || !totalDurationEl || !miniTimeEl || !trackTags || !waveContainer || !audio || !progressBar || !progressThumb || !currentTimeEl) return;
        if (!track) return;
        
        playerCard.classList.add('animate-pulse');
        
        const productImage = placeholderData.placeholderImages.find(p => p.id === track.imageId);

        setTimeout(() => {
            trackTitle.textContent = track.title;
            trackArtist.textContent = track.artist;
            trackAlbum.textContent = track.album;
            trackYear.textContent = track.year;
            trackPlays.textContent = `🎵 ${track.plays} plays`;
            trackReleaseDate.textContent = track.releaseDate;
            if(productImage) albumArt.src = productImage.imageUrl;
            albumArt.alt = `${track.title} album art`;
            artistAvatar.textContent = track.artistAvatar;
            totalDurationEl.textContent = track.duration;
            miniTimeEl.textContent = `0:00 / ${track.duration}`;
            
            track.tags = track.tags || [];
            trackTags.innerHTML = track.tags.map((tag, index) => 
            `<span class="px-2.5 py-1 text-[10px] font-medium bg-${tag.color}-500/20 text-${tag.color}-300 rounded-lg ring-1 ring-${tag.color}-500/30 hover:bg-${tag.color}-500/30 hover:scale-105 transition-all duration-200 animate-tag-pop" style="animation-delay: ${index * 0.1}s;">${tag.name}</span>`
            ).join('');
            
            track.waveform = track.waveform || [];
            updateWaveform(track.waveform);
            
            audio.src = track.audioSrc;
            audio.load();
            
            progressBar.style.width = '0%';
            progressThumb.style.left = '0%';
            currentTimeEl.textContent = '0:00';
            
            playerCard.classList.remove('animate-pulse');
        }, 300);
        }

        function updateWaveform(heights: number[]) {
            if(!waveContainer) return;
        const bars = waveContainer.children;
        heights.forEach((height, index) => {
            const bar = bars[index] as HTMLElement;
            if (bar && bar.classList.contains('wave-bar')) {
            bar.style.height = `${height}px`;
            bar.style.animationDelay = `${index * 40}ms`;
            }
        });
        }

        function createTrackSelector() {
        if (!trackSelector) return;
        const trackList = trackSelector.querySelector('.flex-1') as HTMLElement;
        if (!trackList) return;
        // This is not needed on the detail page, we just show one track.
        trackList.innerHTML = '';
        }

        function showTrackSelector() {
        if (!trackSelector) return;
        trackSelector.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
        trackSelector.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
        createTrackSelector();
        }

        function closeTrackSelector() {
        if (!trackSelector) return;
        trackSelector.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
        trackSelector.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
        }

        let playIcon: SVGElement | null, pauseIcon: SVGElement | null;
        
        function initializeIcons() {
        if (!btnPlay) return;
        playIcon = btnPlay.querySelector('[data-lucide="play"]');
        pauseIcon = btnPlay.querySelector('[data-lucide="pause"]');
        }

        function setPlayingUI(playing: boolean) {
        if (!playerCard || !btnPlay) return;
        if (playing) {
            playerCard.classList.add('is-playing');
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'inline';
            btnPlay.setAttribute('aria-label', 'Pause');
        } else {
            playerCard.classList.remove('is-playing');
            if (playIcon) playIcon.style.display = 'inline';
            if (pauseIcon) pauseIcon.style.display = 'none';
            btnPlay.setAttribute('aria-label', 'Play');
        }
        }

        function updateProgress() {
        if (!audio || !progressBar || !progressThumb || !currentTimeEl || !miniTimeEl || !totalDurationEl) return;
        const percent = (audio.currentTime / (audio.duration || 1)) * 100;
        progressBar.style.width = percent + '%';
        progressThumb.style.left = `calc(${percent}% - 12px)`;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        miniTimeEl.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration || 0)}`;
        if (!audio.paused) {
            requestAnimationFrame(updateProgress);
        }
        }

        const onPlayClick = (e: MouseEvent) => {
            if(!btnPlay) return;
            createButtonRipple(btnPlay, e);
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        };
        
        const onWaveContainerClick = (e: MouseEvent) => createWaveRipple(e.clientX);

        const onWaveContainerMouseMove = (e: MouseEvent) => {
            if(!waveContainer) return;
            const rect = waveContainer.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            const children = Array.from(waveContainer.children).filter(child => child.classList.contains('wave-bar'));
            
            children.forEach((bar, idx) => {
                const t = idx / children.length;
                const dist = Math.abs(t - ratio);
                const boost = Math.max(0, 1 - dist * 6);
                (bar as HTMLElement).style.transform = `scaleY(${1 + boost * 0.4}) scaleX(${1 + boost * 0.2})`;
                (bar as HTMLElement).style.filter = `brightness(${1 + boost * 0.7}) saturate(${1 + boost * 0.5})`;
            });
        };

        const onWaveContainerMouseLeave = () => {
            if(!waveContainer) return;
            const children = Array.from(waveContainer.children).filter(child => child.classList.contains('wave-bar'));
            children.forEach((bar) => {
                (bar as HTMLElement).style.transform = '';
                (bar as HTMLElement).style.filter = '';
            });
        };
        
        const onAudioPlay = () => {
            setPlayingUI(true);
            requestAnimationFrame(updateProgress);
        };

        const onAudioPause = () => {
            setPlayingUI(false);
            updateProgress();
        };

        const onAudioEnded = () => {
            if (btnRepeat && btnRepeat.getAttribute('aria-pressed') === 'true') {
                audio.currentTime = 0;
                audio.play();
            } else {
                // For a single track page, we can just stop or replay from start
                setPlayingUI(false);
            }
        };

        const onAudioLoadedMetadata = () => {
            if (!totalDurationEl || !miniTimeEl || !audio) return;
            totalDurationEl.textContent = formatTime(audio.duration);
            miniTimeEl.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
            updateProgress();
        };

        let seeking = false;
        const seekTo = (clientX: number) => {
            if(!seekArea || !audio) return;
            const rect = seekArea.getBoundingClientRect();
            const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
            const ratio = x / rect.width;
            audio.currentTime = ratio * (audio.duration || 0);
            updateProgress();
        };

        const onSeekPointerDown = (e: PointerEvent) => {
            seeking = true;
            seekArea?.setPointerCapture(e.pointerId);
            seekTo(e.clientX);
        };

        const onSeekPointerMove = (e: PointerEvent) => {
            if (seeking) seekTo(e.clientX);
        };

        const onSeekPointerUp = (e: PointerEvent) => {
            seeking = false;
            seekArea?.releasePointerCapture(e.pointerId);
        };

        const onLikeClick = (e: MouseEvent) => {
            if(!btnLike) return;
            createButtonRipple(btnLike, e);
            const pressed = btnLike.getAttribute('aria-pressed') === 'true';
            btnLike.setAttribute('aria-pressed', String(!pressed));
            btnLike.classList.toggle('text-rose-400', !pressed);
            btnLike.classList.toggle('bg-rose-500/10', !pressed);
            btnLike.classList.toggle('ring-1', !pressed);
            btnLike.classList.toggle('ring-rose-500/20', !pressed);
        };

        const onShuffleClick = (e: MouseEvent) => {
            if(!btnShuffle) return;
            createButtonRipple(btnShuffle, e as MouseEvent);
        };

        const onRepeatClick = (e: MouseEvent) => {
            if(!btnRepeat) return;
            createButtonRipple(btnRepeat, e as MouseEvent);
            const pressed = btnRepeat.getAttribute('aria-pressed') === 'true';
            btnRepeat.setAttribute('aria-pressed', String(!pressed));
            btnRepeat.classList.toggle('bg-purple-500/20', !pressed);
            btnRepeat.classList.toggle('text-purple-300', !pressed);
            btnRepeat.classList.toggle('ring-1', !pressed);
            btnRepeat.classList.toggle('ring-purple-500/30', !pressed);
        };

        let lastVolume = 1;
        const onMuteClick = (e: MouseEvent) => {
            if(!btnMute || !audio) return;
            createButtonRipple(btnMute, e as MouseEvent);
            if (audio.muted || audio.volume === 0) {
                audio.muted = false;
                audio.volume = lastVolume || 1;
                btnMute.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 stroke-[1.5] group-hover/volume:animate-bounce transition-transform"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path></svg><span class="hidden sm:inline">Vol</span>';
            } else {
                lastVolume = audio.volume;
                audio.muted = true;
                audio.volume = 0;
                btnMute.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 stroke-[1.5] group-hover/volume:animate-bounce transition-transform"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><line x1="22" x2="16" y1="9" y2="15"></line><line x1="16" x2="22" y1="9" y2="15"></line></svg><span class="hidden sm:inline">Muted</span>';
            }
        };

        if(btnPlay) btnPlay.addEventListener('click', onPlayClick as EventListener);
        if(btnNext) btnNext.style.display = 'none'; // No next on single page
        if(btnPrev) btnPrev.style.display = 'none'; // No prev on single page
        if(waveContainer) waveContainer.addEventListener('click', onWaveContainerClick as EventListener);
        if(waveContainer) waveContainer.addEventListener('mousemove', onWaveContainerMouseMove as EventListener);
        if(waveContainer) waveContainer.addEventListener('mouseleave', onWaveContainerMouseLeave as EventListener);
        if(audio) audio.addEventListener('play', onAudioPlay);
        if(audio) audio.addEventListener('pause', onAudioPause);
        if(audio) audio.addEventListener('ended', onAudioEnded);
        if(audio) audio.addEventListener('loadedmetadata', onAudioLoadedMetadata);
        if(seekArea) seekArea.addEventListener('pointerdown', onSeekPointerDown as EventListener);
        if(seekArea) seekArea.addEventListener('pointermove', onSeekPointerMove as EventListener);
        if(seekArea) seekArea.addEventListener('pointerup', onSeekPointerUp as EventListener);
        if(btnLike) btnLike.addEventListener('click', onLikeClick as EventListener);
        if(btnShuffle) btnShuffle.addEventListener('click', onShuffleClick as EventListener);
        if(btnRepeat) btnRepeat.addEventListener('click', onRepeatClick as EventListener);
        if(btnMute) btnMute.addEventListener('click', onMuteClick as EventListener);
        if(albumArtContainer) albumArtContainer.style.cursor = 'default';
        if(btnQueue) btnQueue.style.display = 'none';
        if(closeTracks) closeTracks.style.display = 'none';
        
        initializeIcons();
        loadTrack(podcast);

        return () => {
            if(btnPlay) btnPlay.removeEventListener('click', onPlayClick as EventListener);
            if(waveContainer) waveContainer.removeEventListener('click', onWaveContainerClick as EventListener);
            if(waveContainer) waveContainer.removeEventListener('mousemove', onWaveContainerMouseMove as EventListener);
            if(waveContainer) waveContainer.removeEventListener('mouseleave', onWaveContainerMouseLeave as EventListener);
            if(audio) audio.removeEventListener('play', onAudioPlay);
            if(audio) audio.removeEventListener('pause', onAudioPause);
            if(audio) audio.removeEventListener('ended', onAudioEnded);
            if(audio) audio.removeEventListener('loadedmetadata', onAudioLoadedMetadata);
            if(seekArea) seekArea.removeEventListener('pointerdown', onSeekPointerDown as EventListener);
            if(seekArea) seekArea.removeEventListener('pointermove', onSeekPointerMove as EventListener);
            if(seekArea) seekArea.removeEventListener('pointerup', onSeekPointerUp as EventListener);
            if(btnLike) btnLike.removeEventListener('click', onLikeClick as EventListener);
            if(btnShuffle) btnShuffle.removeEventListener('click', onShuffleClick as EventListener);
            if(btnRepeat) btnRepeat.removeEventListener('click', onRepeatClick as EventListener);
            if(btnMute) btnMute.removeEventListener('click', onMuteClick as EventListener);
        };

    }, [podcast]);

    if (podcast === undefined) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <LoaderCircle className="w-12 h-12 animate-spin" />
                </main>
                <Footer />
            </div>
        );
    }

    if (podcast === null) {
        notFound();
    }
    
    const productImage = placeholderData.placeholderImages.find(p => p.id === podcast.imageId);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="antialiased min-h-screen flex items-center justify-center selection:bg-indigo-500/30 selection:text-white relative overflow-hidden text-white bg-[#0a0b10] p-6" style={{fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif'}}>
        <div className="spline-container fixed inset-0 -z-10">
            <iframe src="https://my.spline.design/3dgradient-f6b0b72a08892d5345d8b548651a54c9/" frameBorder="0" width="100%" height="100%"></iframe>
        </div>
        
        <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse floating-orb" style={{animationDuration: '8s'}}></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse floating-orb" style={{animationDuration: '12s', animationDelay: '2s'}}></div>
            <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-fuchsia-500/6 rounded-full blur-3xl animate-pulse floating-orb" style={{animationDuration: '10s', animationDelay: '4s'}}></div>
            
            <div className="floating-particle absolute w-2 h-2 bg-indigo-400/30 rounded-full" style={{top: '20%', left: '15%', animationDelay: '0s'}}></div>
            <div className="floating-particle absolute w-1 h-1 bg-purple-400/40 rounded-full" style={{top: '60%', left: '80%', animationDelay: '2s'}}></div>
            <div className="floating-particle absolute w-1.5 h-1.5 bg-fuchsia-400/35 rounded-full" style={{top: '30%', right: '20%', animationDelay: '4s'}}></div>
            <div className="floating-particle absolute w-1 h-1 bg-cyan-400/40 rounded-full" style={{top: '80%', left: '30%', animationDelay: '6s'}}></div>
            <div className="floating-particle absolute w-2 h-2 bg-pink-400/30 rounded-full" style={{top: '10%', right: '40%', animationDelay: '8s'}}></div>
        </div>

        <div className="w-full max-w-md mx-auto relative z-10">
            <div id="trackSelector" className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl rounded-3xl opacity-0 pointer-events-none transition-all duration-500 overflow-hidden transform scale-95">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none"></div>
            
            <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold tracking-tight glow-text">Choose Track</h2>
                <button id="closeTracks" className="rounded-xl p-2 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 hover:rotate-90">
                    <XIcon className="h-5 w-5" strokeWidth={1.5}/>
                </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2" style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent'}}>
                </div>
            </div>
            </div>

            <div id="playerCard" className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl ring-1 ring-black/5 shadow-2xl shadow-black/25 hover:shadow-indigo-500/10 transition-all duration-500">
            <div className="pointer-events-none absolute -inset-40 opacity-30 blur-3xl transition-all duration-1000 group-[.is-playing]:opacity-50 group-[.is-playing]:animate-pulse-glow" aria-hidden="true" style={{background: 'radial-gradient(60% 60% at 30% 30%, rgba(99,102,241,0.35) 0%, rgba(168,85,247,0.25) 35%, rgba(236,72,153,0.15) 70%, transparent 100%)'}}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 rounded-3xl opacity-0 group-[.is-playing]:opacity-100 transition-opacity duration-1000 border-glow"></div>

            <div className="relative z-20 p-6">
                <div className="flex items-start gap-5">
                <div className="relative shrink-0 group/art" id="albumArtContainer">
                    <div className="h-32 w-32 overflow-hidden rounded-2xl ring-2 ring-white/20 shadow-2xl shadow-black/40 relative group-[.is-playing]:animate-slow-spin">
                    <Image id="albumArt" src={productImage?.imageUrl || ''} alt="Album art" fill className="object-cover transition-all duration-500 group-hover/art:scale-110 group-[.is-playing]:brightness-110" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20"></div>
                    <div className="absolute inset-0 opacity-0 group-hover/art:opacity-100 group-[.is-playing]:opacity-60 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shine"></div>
                    </div>
                    
                    <div className="absolute -bottom-2 -right-2 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 rounded-xl bg-black/40 backdrop-blur-md px-2.5 py-1.5 ring-1 ring-white/20 shadow-lg animate-float" style={{animationDelay: '0s'}}>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-fast"></div>
                        <span className="text-[10px] font-medium text-white/90">LIVE</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-xl bg-black/40 backdrop-blur-md px-2.5 py-1.5 ring-1 ring-white/20 shadow-lg animate-float" style={{animationDelay: '1s'}}>
                        <Headphones className="h-3 w-3 text-indigo-300 stroke-[1.5] animate-wiggle" />
                        <span className="text-[10px] font-medium text-white/70">Spatial</span>
                    </div>
                    </div>
                    
                    <div className="absolute inset-0 ring-2 ring-indigo-400/0 group-[.is-playing]:ring-indigo-400/30 transition-all duration-500 group-[.is-playing]:animate-pulse-rainbow bg-cover rounded-2xl bg-[url(https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/199b7f0b-63c0-4f20-921a-05c62d6e5827_800w.jpg)] bg-center"></div>
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.1em] text-white/50 font-medium animate-fade-in">Now playing</span>
                        <div className="w-1 h-1 rounded-full bg-indigo-400 animate-bounce group-[.is-playing]:animate-ping-slow"></div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button id="btnLike" className="rounded-xl p-2 text-white/60 hover:text-rose-400 hover:bg-white/10 hover:ring-1 hover:ring-rose-400/20 transition-all duration-200 group/like hover:scale-110" aria-label="Like">
                        <Heart className="h-4 w-4 stroke-[1.5] group-hover/like:animate-heartbeat transition-transform" />
                        </button>
                        <button className="rounded-xl p-2 text-white/60 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/10 transition-all duration-200 group/more hover:scale-110" aria-label="More">
                        <MoreHorizontal className="h-4 w-4 stroke-[1.5] group-hover/more:animate-wiggle transition-transform" />
                        </button>
                    </div>
                    </div>

                    <h1 id="trackTitle" className="text-[26px] leading-tight tracking-tight font-semibold text-white mb-1 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text animate-slide-up"></h1>
                    
                    <div className="flex items-center gap-2 text-[13px] text-white/70 mb-3 animate-slide-up" style={{animationDelay: '0.1s'}}>
                    <div className="flex items-center gap-1.5">
                        <div id="artistAvatar" className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center text-[10px] font-bold text-white animate-spin-slow"></div>
                        <span id="trackArtist" className="font-medium"></span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-white/30 animate-pulse"></span>
                    <span id="trackAlbum"></span>
                    <span className="w-1 h-1 rounded-full bg-white/30 animate-pulse" style={{animationDelay: '0.5s'}}></span>
                    <span id="trackYear" className=""></span>
                    </div>
                    <div id="trackTags" className="flex flex-wrap gap-1 sm:gap-1.5 items-center animate-slide-up" style={{animationDelay: '0.2s'}}></div>
                </div>
                </div>
            </div>

            <div className="relative z-20 px-6 mb-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm p-4 shadow-inner hover:bg-black/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3 text-[11px] text-white/60">
                    <div className="flex items-center gap-2">
                    <Activity className="h-3.5 w-3.5 stroke-[1.5] group-[.is-playing]:animate-pulse" />
                    <span>Waveform</span>
                    </div>
                    <div className="flex items-center gap-1">
                    <span className="text-indigo-300 font-mono animate-flicker">192kHz</span>
                    <span>/</span>
                    <span className="text-emerald-300 font-mono animate-flicker" style={{animationDelay: '0.5s'}}>24bit</span>
                    </div>
                </div>
                
                <div id="waveContainer" className="relative h-16 w-full flex items-end justify-between cursor-pointer gap-px group/wave">
                    {Array.from({ length: 22 }).map((_, i) => (
                    <div key={i} className="wave-bar w-2 rounded-full bg-gradient-to-t from-indigo-400/60 to-indigo-300/80 group-[.is-playing]:animate-wave-dance shadow-sm transition-all duration-200 hover:scale-110"></div>
                    ))}
                    <div id="waveRipple" className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"></div>
                </div>
                </div>
            </div>

            <div className="relative z-20 px-6 mb-4">
                <div className="flex items-center justify-between text-[11px] text-white/60 mb-3">
                <div className="flex items-center gap-2 font-mono">
                    <span id="currentTime" className="text-indigo-300 animate-digital-flicker">0:00</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                    <span id="totalDuration" className="text-white/50"></span>
                </div>
                </div>
                
                <div id="seekArea" className="group/seek relative h-2 rounded-full bg-white/10 hover:bg-white/15 transition-all duration-200 cursor-pointer ring-1 ring-inset ring-white/5 overflow-hidden">
                <div id="progressBar" className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 shadow-sm shadow-indigo-500/25 transition-all duration-200 group-[.is-playing]:animate-progress-glow" style={{width: '0%'}}></div>
                <div id="progressThumb" className="absolute -top-2 h-6 w-6 rounded-full bg-white shadow-xl ring-4 ring-indigo-500/20 opacity-0 group-[.is-playing]:opacity-100 group-hover/seek:opacity-100 transition-all duration-200 group-hover/seek:scale-110 animate-bounce-subtle" style={{left: 'calc(0% - 12px)'}}></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400/0 via-purple-400/20 to-fuchsia-400/0 opacity-0 group-hover/seek:opacity-100 transition-opacity duration-300 animate-pulse-slow"></div>
                </div>
            </div>

            <div className="relative z-20 px-6 mb-4">
                <div className="flex items-center justify-center">
                <div className="flex items-center gap-4">
                    <button id="btnPrev" className="group/prev rounded-full p-3 text-white/70 hover:text-white hover:bg-white/10 hover:ring-2 hover:ring-white/20 transition-all duration-200 hover:scale-105 hover:rotate-12" aria-label="Previous">
                    <SkipBack className="h-5 w-5 stroke-[1.5] group-hover/prev:animate-wiggle transition-transform" />
                    </button>

                    <button id="btnPlay" className="group/play relative inline-flex items-center justify-center rounded-full h-16 w-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-400 hover:to-purple-500 hover:ring-4 ring-indigo-500/25 focus:outline-none transition-all duration-300 hover:scale-105 shadow-xl shadow-indigo-500/25 group-[.is-playing]:animate-pulse-button" aria-label="Play">
                    <Play className="h-7 w-7 stroke-[1.5] translate-x-[1px] group-hover/play:scale-110 transition-transform" />
                    <Pause className="hidden h-7 w-7 stroke-[1.5] group-hover/play:scale-110 transition-transform" />
                    <div className="absolute inset-0 rounded-full ring-2 ring-indigo-400/0 group-[.is-playing]:ring-indigo-400/50 group-[.is-playing]:animate-ping-rainbow"></div>
                    <div className="absolute inset-0 rounded-full ring-4 ring-purple-400/0 group-[.is-playing]:ring-purple-400/30 group-[.is-playing]:animate-ping" style={{animationDelay: '0.5s'}}></div>
                    </button>

                    <button id="btnNext" className="group/next rounded-full p-3 text-white/70 hover:text-white hover:bg-white/10 hover:ring-2 hover:ring-white/20 transition-all duration-200 hover:scale-105 hover:-rotate-12" aria-label="Next">
                    <SkipForward className="h-5 w-5 stroke-[1.5] group-hover/next:animate-wiggle transition-transform" />
                    </button>
                </div>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-1">
                    <button id="btnShuffle" className="group/shuffle rounded-xl px-3 py-2 text-[12px] font-medium text-white/70 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20 transition-all duration-200 flex items-center gap-2 hover:scale-105" aria-pressed="false" aria-label="Shuffle">
                    <Shuffle className="h-4 w-4 stroke-[1.5] group-hover/shuffle:animate-shake transition-transform" />
                    <span className="hidden sm:inline">Shuffle</span>
                    </button>
                    <button id="btnRepeat" className="group/repeat rounded-xl px-3 py-2 text-[12px] font-medium text-white/70 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20 transition-all duration-200 flex items-center gap-2 hover:scale-105" aria-pressed="false" aria-label="Repeat">
                    <Repeat1 className="h-4 w-4 stroke-[1.5] group-hover/repeat:animate-spin transition-transform" />
                    <span className="hidden sm:inline">Repeat</span>
                    </button>
                </div>

                <div className="flex items-center gap-1">
                    <button id="btnMute" className="group/volume rounded-xl px-3 py-2 text-[12px] font-medium text-white/70 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20 transition-all duration-200 flex items-center gap-2 hover:scale-105" aria-label="Mute">
                    <Volume2 className="h-4 w-4 stroke-[1.5] group-hover/volume:animate-bounce transition-transform" />
                    <span className="hidden sm:inline">Vol</span>
                    </button>
                </div>
                </div>
            </div>

            <div className="relative z-20 px-6 mb-4">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent blur-sm animate-pulse-slow"></div>
                </div>
            </div>

            <div className="relative z-20 px-6 pb-6">
                <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-xl bg-emerald-500/10 px-3 py-2 ring-1 ring-emerald-500/20 hover:bg-emerald-500/20 hover:scale-105 transition-all duration-300 animate-float" style={{animationDelay: '0s'}}>
                    <BadgeCheck className="h-3.5 w-3.5 stroke-[1.5] text-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-medium text-emerald-300">Lossless</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-xl bg-blue-500/10 px-3 py-2 ring-1 ring-blue-500/20 hover:bg-blue-500/20 hover:scale-105 transition-all duration-300 animate-float" style={{animationDelay: '0.5s'}}>
                    <Headphones className="h-3.5 w-3.5 stroke-[1.5] text-blue-400 animate-wiggle" />
                    <span className="text-[11px] font-medium text-blue-300">Spatial</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-1">
                    <button id="btnQueue" className="group/queue rounded-xl p-2.5 text-white/60 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20 transition-all duration-200 hover:scale-110" aria-label="Queue">
                    <ListMusic className="h-4.5 w-4.5 stroke-[1.5] group-hover/queue:animate-bounce transition-transform" />
                    </button>
                    <button className="group/cast rounded-xl p-2.5 text-white/60 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20 transition-all duration-200 hover:scale-110" aria-label="Cast">
                    <Cast className="h-4.5 w-4.5 stroke-[1.5] group-hover/cast:animate-pulse transition-transform" />
                    </button>
                    <button className="group/share rounded-xl p-2.5 text-white/60 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20 transition-all duration-200 hover:scale-110" aria-label="Share">
                    <Share2 className="h-4.5 w-4.5 stroke-[1.5] group-hover/share:animate-spin transition-transform" />
                    </button>
                    <button className="group/settings rounded-xl p-2.5 text-white/60 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20 transition-all duration-200 hover:scale-110" aria-label="Settings">
                    <Settings className="h-4.5 w-4.5 stroke-[1.5] group-hover/settings:animate-spin transition-transform" />
                    </button>
                </div>
                </div>

                <div className="flex flex-col items-center gap-3 text-[10px] text-white/50">
                <div className="flex items-center gap-3 animate-fade-in" style={{animationDelay: '0.3s'}}>
                    <span id="trackPlays" className="animate-number-count"></span>
                    <span id="trackReleaseDate" className="animate-fade-in" style={{animationDelay: '0.2s'}}></span>
                </div>
                <div className="flex items-center gap-3 animate-slide-up" style={{animationDelay: '0.4s'}}>
                    <span className="px-2 py-1 bg-white/5 rounded-md hover:bg-white/10 transition-colors duration-200 animate-glow">320kbps</span>
                    <span id="miniTime" className="font-mono animate-digital-flicker">0:00 / 0:00</span>
                </div>
                </div>
            </div>
            <audio id="audio" preload="metadata"></audio>
            </div>
        </div>
        <style jsx>{`
            .glow-text {
            text-shadow: 0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(99,102,241,0.2);
            }

            .flex-1::-webkit-scrollbar {
            width: 6px;
            }
            
            .flex-1::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 3px;
            }
            
            .flex-1::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, rgba(99,102,241,0.5), rgba(168,85,247,0.5));
            border-radius: 3px;
            }
            
            .flex-1::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, rgba(99,102,241,0.7), rgba(168,85,247,0.7));
            }

            .group/track:hover {
            transform: translateY(-2px);
            }

            @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            }
        `}</style>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PodcastPlayerPage;
