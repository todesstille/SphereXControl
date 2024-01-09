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

    function calculateFlow() public {
        temp = PATTERN_START;

        enter(hex"ac9650d8"); // multicall

            // enter(hex"430c885a");
            // exit(hex"430c885a");

            enter(hex"544df02c");

                for (uint i = 0; i < 15; i++) {
                enter(hex"7fde4424");
                exit(hex"7fde4424");
                }

                enter(hex"5f884296");
                exit(hex"5f884296");

                enter(hex"30132f5e");
                exit(hex"30132f5e");

                enter(hex"154b3db0");
                exit(hex"154b3db0");

            exit(hex"544df02c");

        exit(hex"ac9650d8");
        bytes memory bytesFlow = abi.encode(flow);
        console.logBytes(abi.encodePacked(hex"04539062", bytesFlow));
        
        delete(flow);
        temp = 0;
    }

}

// multicall ( 0xac9650d8 )
//     vote ( 0x544df02c )
//         unlockTokens ( 0x7fde4424 )
//         unlockTokens ( 0x7fde4424 )
//         unlockTokens ( 0x7fde4424 )
//         unlockTokens ( 0x7fde4424 )
//         unlockTokens ( 0x7fde4424 )
//         updateMaxTokenLockedAmount ( 0x5f884296 )
//         updateNftPowers ( 0x30132f5e )
//         lockTokens ( 0x154b3db0 )
