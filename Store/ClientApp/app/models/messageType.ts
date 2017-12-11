/**
 * I could use an emum by in typescript 2.3 enums are number based.
 * TODO: change to enum after upgrade to 2.4
 */
export class MessageType {
    static SUCCESS: string = "alert-success";
    static INFO: string = "alert-info";
    static WARNING: string = "alert-warning";
    static ERROR: string = "alert-danger";
}