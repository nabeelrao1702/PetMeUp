
import { useLocation } from "react-router-dom";

const PrivacyPolicies = () => {
  const { pathname } = useLocation();
  const url = "/doctor/privacy-policies";
  const url2 = "/user/privacy-policies";

  return (
    <div>
      <div
        className={
          pathname.includes(url) || pathname.includes(url2)
            ? "bg-lightblue py-9 px-4"
            : "bg-lightblue py-40 lg:py-24 px-4"
        }
      >
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row ">
          <h2 className="mr-8 w-full md:w-1/3 text-3xl font-extrabold leading-9 mb-8">
            Privacy Policy
          </h2>

          <dl className="w-full md:w-2/3">
            <dt className="mb-4">
              <h3 className="text-xl font-semibold">1. Data Collection</h3>
            </dt>
            <dd className="mb-16">
              <p>
              We collect and store information provided by users during the registration process and when creating pet profiles. This information includes your name, email address, location, and details about your pets.
              </p>
            </dd>
            <dt className="mb-4">
              <h3 className="text-xl font-semibold">
                2. Data Usage
              </h3>
            </dt>
            <dd className="mb-16">
              <p>
              We use your data to facilitate pet matchmaking and enhance your user experience. This includes suggesting potential matches based on your pet's characteristics and location.
              </p>
            </dd>
            <dt className="mb-4">
              <h3 className="text-xl font-semibold">3. Data Sharing</h3>
            </dt>
            <dd className="mb-16">
              <p>
              Your information will not be shared with third parties without your consent. We may share non-identifiable, aggregated data for analysis and research purposes.

              </p>
            </dd>
            <dt className="mb-4">
              <h3 className="text-xl font-semibold">
                4.  Security
              </h3>
            </dt>
            <dd className="mb-16">
              <p>
              We implement industry-standard security measures to protect your data. However, no online platform can guarantee 100% security, so use our services with caution.
              </p>
            </dd>
            <dt className="mb-4">
              <h3 className="text-xl font-semibold">
                5.  Communication
              </h3>
            </dt>
            <dd className="mb-16">
              <p>
              We may send you updates, service notifications, and newsletters. You can opt out of these communications at any time.
              </p>
            </dd>
            <dt className="mb-4">
              <h3 className="text-xl font-semibold">6.  User Rights</h3>
            </dt>
            <dd className="mb-16">
              <p>
              You have the right to access, modify, or delete your personal information. Contact us if you wish to exercise these rights.
              </p>
            </dd>
            <dt className="mb-4">
              <h3 className="text-xl font-semibold">
                10. Age Restrictions
              </h3>
            </dt>
            <dd className="mb-16">
              <p>
              Users must be of legal age to use our platform. We do not knowingly collect data from individuals under the age of 13.
              </p>
            </dd>
            <dt className="mb-4">
              <h3 className="text-xl font-semibold">
                11. Changes to Policy
              </h3>
            </dt>
            <dd className="mb-16">
              <p>
              We may update our privacy policy. Users will be notified of significant changes, and the latest policy will always be accessible on our website.
              </p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicies;
