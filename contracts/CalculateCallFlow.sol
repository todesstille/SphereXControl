// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

import "hardhat/console.sol";

contract CalculateCallFlow {
    uint216 internal constant PATTERN_START = 1;

    uint216 internal temp;
    uint216[] flow;

    function enter(bytes4 selector) public {
        int256 t = int256(uint256(uint32(selector)));
        temp = uint216(bytes27(keccak256(abi.encode(t, temp))));
    }

    function exit(bytes4 selector) public {
        int256 t =  -int256(uint256(uint32(selector)));
        temp = uint216(bytes27(keccak256(abi.encode(t, temp))));
        flow.push(temp);
    }

    function calculateFlow() public returns (bytes memory) {
        temp = PATTERN_START;

        enter(hex"fe0d94c1"); // execute

            // enter(hex"430c885a");
            // exit(hex"430c885a");

            enter(hex"6a6effda");
            exit(hex"6a6effda");

            enter(hex"ce6c2d91");

                enter(hex"40c10f19");
                exit(hex"40c10f19");
                enter(hex"40c10f19");
                exit(hex"40c10f19");

            exit(hex"ce6c2d91");

        exit(hex"fe0d94c1");
        bytes memory bytesFlow = abi.encode(flow);
        
        delete(flow);
        temp = 0;
         return(abi.encodePacked(hex"04539062", bytesFlow));
    }

    function calculateMultiplierMint(uint256 cycles) public returns (bytes memory) {
        temp = PATTERN_START;

        enter(hex"fe0d94c1"); // multicall

            // enter(hex"430c885a");
            // exit(hex"430c885a");

            for (uint i = 0; i < cycles; i++) {
            enter(hex"af2d2333");
            exit(hex"af2d2333");
            }

        exit(hex"fe0d94c1");
        bytes memory bytesFlow = abi.encode(flow);
        
        delete(flow);
        temp = 0;
         return(abi.encodePacked(hex"04539062", bytesFlow));
    }

    function calculateMultiplierMintAndValidate(uint256 cycles) public returns (bytes memory) {
        temp = PATTERN_START;

        enter(hex"fe0d94c1"); // multicall

            enter(hex"430c885a");
            exit(hex"430c885a");

            for (uint i = 0; i < cycles; i++) {
            enter(hex"af2d2333");
            exit(hex"af2d2333");
            }

        exit(hex"fe0d94c1");
        bytes memory bytesFlow = abi.encode(flow);
        
        delete(flow);
        temp = 0;
         return(abi.encodePacked(hex"04539062", bytesFlow));
    }

    function calculateWhitelist(uint256 cycles) public returns (bytes memory) {
        temp = PATTERN_START;

        enter(hex"fe0d94c1"); // execute

            // enter(hex"430c885a");
            // exit(hex"430c885a");

            enter(hex"6a6effda");
            exit(hex"6a6effda");

            enter(hex"ce6c2d91");

                for (uint i = 0; i < cycles; i++) {
                enter(hex"40c10f19");
                exit(hex"40c10f19");
                }

            exit(hex"ce6c2d91");

        exit(hex"fe0d94c1");
        bytes memory bytesFlow = abi.encode(flow);
        
        delete(flow);
        temp = 0;
         return(abi.encodePacked(hex"04539062", bytesFlow));
    }

    function calculateWhitelistValidate(uint256 cycles) public returns (bytes memory) {
        temp = PATTERN_START;

        enter(hex"fe0d94c1"); // execute

            enter(hex"430c885a");
            exit(hex"430c885a");

            enter(hex"6a6effda");
            exit(hex"6a6effda");

            enter(hex"ce6c2d91");

                for (uint i = 0; i < cycles; i++) {
                enter(hex"40c10f19");
                exit(hex"40c10f19");
                }

            exit(hex"ce6c2d91");

        exit(hex"fe0d94c1");
        bytes memory bytesFlow = abi.encode(flow);
        
        delete(flow);
        temp = 0;
         return(abi.encodePacked(hex"04539062", bytesFlow));
    }

}

// execute ( 0xfe0d94c1 )
//     executeExternalProposal ( 0x430c885a )
//     createTiers ( 0x6a6effda )
//     addToWhitelist ( 0xce6c2d91 )
//         mint ( 0x40c10f19 )
//         mint ( 0x40c10f19 )
