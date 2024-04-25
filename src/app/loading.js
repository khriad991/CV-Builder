export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="InitLoader fixed left-0 top-0 z-[99999] bg-btn">
            <div className="fingerprint-spinner">
                <div className="spinner-ring" />
                <div className="spinner-ring" />
                <div className="spinner-ring" />
                <div className="spinner-ring" />
                <div className="spinner-ring" />
                <div className="spinner-ring" />
                <div className="spinner-ring" />
                <div className="spinner-ring" />
                <div className="spinner-ring" />
            </div>
        </div>
    );
}
