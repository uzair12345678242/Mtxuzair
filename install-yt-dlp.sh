#!/bin/bash
set -e

# yt-dlp ko install karein
curl -L https://github.com/yt-dlp/yt-dlp/releases/download/2024.09.13/yt-dlp_linux_amd64 -o /usr/local/bin/yt-dlp
chmod a+rx /usr/local/bin/yt-dlp
