{ pkgs }:

let
  pythonEnv = pkgs.python3.withPackages (ps: with ps; [
    asteval
    flask
    ipython
    psutil
    pwntools
    pycryptodome
    pyroute2
    r2pipe
    requests
    ropper
    scapy
    selenium
    beautifulsoup4
    
    # Packages needed for AI dojo
    pandas
    scikit-learn
    tensorflow
  ]);

in
{
  packages = with pkgs; [
    (lib.hiPrio pythonEnv)

    gcc
    gnumake

    qemu

    strace
    gdb
    pwndbg
    gef

    openssh
    netcat-openbsd

    vim
    neovim
    emacs
    nano

    tmux
    screen

    ghidra
    ida-free
    radare2
    angr-management
    binaryninja-free

    wireshark
    termshark
    nmap
    tcpdump
    nftables
    firefox
    geckodriver
    burpsuite

    aflplusplus
    rappel
    ropgadget
    # TODO: rp++

    sage

    jupyter

    # TODO: apt-tools
  ];
}
