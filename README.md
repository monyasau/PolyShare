# Polyshare

**Description**:  A local-network file share system


  - **Technology stack**: HTML, CSS, Javascript, NodeJS
  - **Status**:  still in development, Beta version available [CHANGELOG](CHANGELOG.md).

## Installation

Refer to [INSTALL](INSTALL.md) document.
Installation is straight forward non persistent process, run the executable in any directory/folder and polyshare will create a folder called "shared_files" there, any files in the "shared_files" folder will become sharable. you can also add files to the folder by uploading via browser interface.

# Building the executables

## Executable Generation

This project uses `pkg` to generate executables for different platforms. Below are the commands to generate the binaries for **Windows (32-bit and 64-bit)**, **Linux (32-bit and 64-bit)**, and **macOS (64-bit and ARM64)**.

### Prerequisites

Ensure that `pkg` is installed globally on your system:
```
npm install -g pkg
```

To generate the 64-bit binaries/executables for **Windows**, **Linux**, and **macOS**.

```
pkg  --targets node16-win-x64,node16-linux-x64,node16-macos-x64 --output polyShare
```
or simply ``npm run build``
This will create the following executables:
 - ``polyShare-win-x64.exe`` for Windows 64-bit
 - ``polyShare-linux-x64`` for Linux 64-bit
 - ``polyShare-macos-x64`` for macOS 64-bit


**Generating Specific Executables**
To generate platform-specific executables, run the following commands.

**1. Windows 64-bit Executable**

```
pkg  --targets node16-win-x64 --output polyShare-win-x64.exe
```
**2. Windows 32-bit Executable**
```
pkg  --targets node16-win-x86 --output polyShare-win-x86.exe
```
**3. Linux 64-bit Executable**
```
pkg  --targets node16-linux-x64 --output polyShare-linux-x64
```
**4. Linux 32-bit Executable**
```
pkg  --targets node16-linux-x86 --output polyShare-linux-x86
```
**5. macOS 64-bit Executable**
```
pkg  --targets node16-macos-x64 --output polyShare-macos-x64
```
**6. macOS ARM64 Executable (for Apple M1/M2 chips)**
```
pkg  --targets node16-macos-arm64 --output polyShare-macos-arm64
```


## Dependencies

No dependencies as the ones needed are bundled with the executable

## Configuration

The web port is configurable with a .env file in the root directory

## Usage

After downloading the executable, simply run the executable file for your operating system, and PolyShare will start a local server for file sharing within the network.
### Run PolyShare, By:
#### Gui:
 Double click the executable file.

#### CLI/Terminal:

- On Windows: ``./polyShare-win-x64.exe``
- On Linux: ``./polyShare-linux-x64``
- On macOS: ``./polyShare-macos-x64``

## Key Features

- **File sharing up to 100 GB+:** Easily transfer files of any size, with the limit set by your network's bandwidth and storage capacity.

- **High-speed transfer:** Achieve upload and download speeds up to 450+ MB/s, making it ideal for large file transfers.
- **Cross-platform support:** Seamless file sharing across Android, IOS, Windows, Linux, and macOS.

- **Simple UI**: Intuitive, browser-based interface to upload and download files, view transfer history, and manage settings.
- **Resume interrupted transfers:** Allows resumption of file transfers in case of interruption.

## Additional Features

- **No internet connection needed:** PolyShare works over the local network, making it a secure and offline solution for file transfers.
- **Drag-and-drop support:** Easily drag files directly into the browser window for instant sharing.
- **Real-time progress updates:** Track file transfer progress with real-time updates in the browser UI.

## Known Issues

**Network firewall restrictions:** In some environments( first time run on windows), firewalls may block local file sharing. Ensure proper configuration of your firewall on host device to allow PolyShare traffic.

**macOS permissions:** On macOS, you may need to grant permissions for network file sharing in the system preferences.

## Getting help

...
If you have questions, concerns, bug reports, etc, please file an issue in this repository's Issue Tracker.

## Getting involved

... [CONTRIBUTING](CONTRIBUTING.md).

## Why i built this

I went through hell trying to transfer stuffs from my windows device to ios and a couple other devices,
so i built PolyShare to offer a fast, user-friendly way of sharing large files across devices on the same network without relying on third-party cloud services or external storage. Its speed and simplicity make it ideal for local file sharing in offices, homes, and educational environments.
