/* eslint-disable object-shorthand */
import { QuestionTree } from "./types";
import { _getYesNoValidator, _integerValidator, _outputDirQuestion } from "./common";

const _outputUserInputs: QuestionTree = {
  name: "userinput",
  prompt: "Export your answers to file? Default: y",
};
_outputUserInputs.transformerValidator = _getYesNoValidator(_outputUserInputs, _outputDirQuestion, "y");

const _tesseraQuestion: QuestionTree = {
  name: "tessera",
  prompt: "Generate tessera config file? Default: y",
};
_tesseraQuestion.transformerValidator = _getYesNoValidator(_tesseraQuestion, _outputUserInputs, "y");

const _permissionQuestion: QuestionTree = {
  name: "permissions",
  prompt: "Generate permissions config file? Default: y",
};
_permissionQuestion.transformerValidator = _getYesNoValidator(_permissionQuestion, _tesseraQuestion, "y");

const _staticNodesQuestion: QuestionTree = {
  name: "staticnodes",
  prompt: "Generate static node config file? Default: y",
};
_staticNodesQuestion.transformerValidator = _getYesNoValidator(_staticNodesQuestion, _permissionQuestion, "y");

const _curveQuestion: QuestionTree = {
  name: "curve",
  prompt: "Choose your encryption curve: Default: [1]",
  options: [
    { label: "secp256k1", value: "k1", nextQuestion: _staticNodesQuestion, default: true },
    { label: "secp256r1", value: "r1", nextQuestion: _staticNodesQuestion }
  ]
};

const _bootnodesQuestion: QuestionTree = {
  name: "bootnodes",
  prompt: "Choose number of bootnode node keys to generate: (integer) Default: 2",
};
_bootnodesQuestion.transformerValidator = _integerValidator(_bootnodesQuestion, _curveQuestion, 2);

const _membersQuestion: QuestionTree = {
  name: "members",
  prompt: "Choose number of member node keys to generate: (integer)",
};
_membersQuestion.transformerValidator = _integerValidator(_membersQuestion, _bootnodesQuestion, 1);

const _validatorsQuestion: QuestionTree = {
  name: "validators",
  prompt: "Choose number of validator node keys to generate: (integer) Default: 4",
};
_validatorsQuestion.transformerValidator = _integerValidator(_validatorsQuestion, _membersQuestion, 4);

const _txnSizeLimitQuestion: QuestionTree = {
  name: "txnsize",
  prompt: "Set your transaction size limit value: (integer)",
};
_txnSizeLimitQuestion.transformerValidator = _integerValidator(_txnSizeLimitQuestion, _validatorsQuestion);

const _maxCodeSizeQuestion: QuestionTree = {
  name: "maxsize",
  prompt: "Set your max code size value: (integer)",
};
_maxCodeSizeQuestion.transformerValidator = _integerValidator(_maxCodeSizeQuestion, _txnSizeLimitQuestion);

const _coinbaseQuestion: QuestionTree = {
  name: "coinbase",
  prompt: "Set your coinbase address for rewards: (hex)",
};
_coinbaseQuestion.transformerValidator = _integerValidator(_coinbaseQuestion, _maxCodeSizeQuestion);

const _gasLimitQuestion: QuestionTree = {
  name: "gaslimit",
  prompt: "Set your gas limit value: (integer)",
};
_gasLimitQuestion.transformerValidator = _integerValidator(_gasLimitQuestion, _coinbaseQuestion);

const _difficultyQuestion: QuestionTree = {
  name: "difficulty",
  prompt: "Set your difficulty: (integer) Default: 1",
};
_difficultyQuestion.transformerValidator = _integerValidator(_difficultyQuestion, _gasLimitQuestion, 1);

export const _chainIDQuestion: QuestionTree = {
  name: "chainID",
  prompt: "Set your chainID value: (integer)",
};
_chainIDQuestion.transformerValidator = _integerValidator(_chainIDQuestion, _difficultyQuestion);
